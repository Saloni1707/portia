import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "saloni-portfolio-flowers";
const MAX_FLOWERS = 40;
const CANVAS_SIZE = 180;

interface Flower {
  id: string;
  dataUrl: string;
  x: number; // percent 0-100 across garden
}

function loadFlowers(): Flower[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFlowers(flowers: Flower[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flowers));
  } catch {}
}

export default function FlowerGarden() {
  const [flowers, setFlowers] = useState<Flower[]>(loadFlowers);
  const [open, setOpen] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Setup canvas when modal opens
  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = "#FAF9F6";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = "#0D0D0D";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setHasStrokes(false);
  }, [open]);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDrawing(true);
    setHasStrokes(true);
    const pos = getPos(e, canvas);
    lastPos.current = pos;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 1, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas || !lastPos.current) return;
    const pos = getPos(e, canvas);
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }, [drawing]);

  const endDraw = useCallback(() => {
    setDrawing(false);
    lastPos.current = null;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = "#FAF9F6";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setHasStrokes(false);
  };

  const plantFlower = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasStrokes) return;
    const dataUrl = canvas.toDataURL("image/png");
    const newFlower: Flower = {
      id: Date.now().toString(),
      dataUrl,
      x: Math.random() * 90 + 5,
    };
    const updated = [...flowers, newFlower].slice(-MAX_FLOWERS);
    setFlowers(updated);
    saveFlowers(updated);
    setOpen(false);
  };

  return (
    <div className="border-t border-border mt-8 pt-6">
      {/* Garden display */}
      <div className="relative min-h-[72px] flex flex-wrap items-end gap-1 mb-4">
        <AnimatePresence>
          {flowers.map((f) => (
            <motion.img
              key={f.id}
              src={f.dataUrl}
              alt="visitor flower"
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="w-10 h-10 object-contain"
              title="A flower from a visitor"
            />
          ))}
        </AnimatePresence>
        {flowers.length === 0 && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground italic">
            No flowers yet — be the first to plant one.
          </p>
        )}
      </div>

      {/* Plant button */}
      <button
        onClick={() => setOpen(true)}
        data-testid="button-plant-flower"
        className="font-mono text-xs uppercase tracking-widest border border-dashed border-border px-4 py-2 hover:border-foreground hover:bg-foreground/[0.03] transition-colors duration-200 flex items-center gap-2"
      >
        <span>🌸</span> Plant a flower
      </button>

      {/* Drawing modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="bg-background border border-border p-6 flex flex-col gap-4 max-w-xs w-full mx-4"
            >
              <div>
                <p className="font-serif text-xl mb-1">Draw a cute little flower</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Then plant it in the garden below
                </p>
              </div>

              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
                className="w-full border border-border touch-none cursor-crosshair"
                style={{ imageRendering: "pixelated" }}
                data-testid="canvas-draw-flower"
              />

              <div className="flex gap-3">
                <button
                  onClick={clearCanvas}
                  className="flex-1 font-mono text-xs uppercase tracking-widest border border-border py-2 hover:bg-foreground/5 transition-colors"
                  data-testid="button-clear-flower"
                >
                  Clear
                </button>
                <button
                  onClick={plantFlower}
                  disabled={!hasStrokes}
                  className="flex-1 font-mono text-xs uppercase tracking-widest border border-foreground py-2 bg-foreground text-background disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
                  data-testid="button-confirm-plant"
                >
                  Plant it 🌱
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
