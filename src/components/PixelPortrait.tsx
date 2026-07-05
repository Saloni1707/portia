import { useEffect, useRef } from "react";

interface Pixel {
  x: number;
  y: number;
  color: string;
  ox: number; // origin x
  oy: number; // origin y
  vx: number; // velocity x
  vy: number; // velocity y
  dx: number; // current displacement x
  dy: number; // current displacement y
}

interface PixelPortraitProps {
  src: string;
  pixelSize?: number;
  className?: string;
}

export default function PixelPortrait({ src, pixelSize = 6, className = "" }: PixelPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const readyRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPRING = 0.08;
    const DAMPING = 0.75;
    const REPEL_RADIUS = 80;
    const REPEL_FORCE = 6;

    const buildPixels = () => {
      const displayW = canvas.offsetWidth;
      const displayH = canvas.offsetHeight;
      if (!displayW || !displayH) return;

      canvas.width = displayW;
      canvas.height = displayH;

      const img = new Image();
      img.onload = () => {
        const cols = Math.floor(displayW / pixelSize);
        const rows = Math.floor(displayH / pixelSize);

        const off = document.createElement("canvas");
        off.width = cols;
        off.height = rows;
        const offCtx = off.getContext("2d")!;

        const imgAspect = img.width / img.height;
        const canvasAspect = cols / rows;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (imgAspect > canvasAspect) {
          sw = img.height * canvasAspect;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / canvasAspect;
          sy = (img.height - sh) / 2;
        }
        offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
        const data = offCtx.getImageData(0, 0, cols, rows);

        const pixels: Pixel[] = [];
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const i = (row * cols + col) * 4;
            const a = data.data[i + 3];
            if (a < 20) continue;
            const r = data.data[i];
            const g = data.data[i + 1];
            const b = data.data[i + 2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            const ox = col * pixelSize;
            const oy = row * pixelSize;
            pixels.push({ x: ox, y: oy, ox, oy, color: `rgb(${gray},${gray},${gray})`, vx: 0, vy: 0, dx: 0, dy: 0 });
          }
        }
        pixelsRef.current = pixels;
        readyRef.current = true;
      };
      img.src = src;
    };

    buildPixels();

    const draw = () => {
      if (!readyRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const displayW = canvas.offsetWidth;
      const displayH = canvas.offsetHeight;
      if (canvas.width !== displayW || canvas.height !== displayH) {
        readyRef.current = false;
        buildPixels();
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const pixels = pixelsRef.current;
      const ps1 = pixelSize - 1;

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        if (mouse) {
          const cx = p.ox + pixelSize / 2;
          const cy = p.oy + pixelSize / 2;
          const distX = cx - mouse.x;
          const distY = cy - mouse.y;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
            p.vx += (distX / dist) * force * REPEL_FORCE;
            p.vy += (distY / dist) * force * REPEL_FORCE;
          }
        }

        // Spring back to origin
        p.vx += -p.dx * SPRING;
        p.vy += -p.dy * SPRING;

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        p.dx += p.vx;
        p.dy += p.vy;

        p.x = p.ox + p.dx;
        p.y = p.oy + p.dy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, ps1, ps1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = null; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [src, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", cursor: "none" }}
      data-testid="pixel-portrait"
    />
  );
}
