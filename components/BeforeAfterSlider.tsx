"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  /**
   * Path to the "before" image.
   * Replace with your actual before image, e.g. "/images/brows-before.jpg"
   */
  beforeImage: string;
  /**
   * Path to the "after" image.
   * Replace with your actual after image, e.g. "/images/brows-after.jpg"
   */
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Starting slider position as a percentage (0–100). Default: 45 */
  initialPosition?: number;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before brow enhancement",
  afterAlt = "After brow enhancement",
  initialPosition = 45,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const getPositionFromEvent = useCallback((clientX: number): number => {
    const container = containerRef.current;
    if (!container) return 50;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    return Math.min(Math.max(pct, 2), 98);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleContainerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setPosition(getPositionFromEvent(e.clientX));
    },
    [getPositionFromEvent]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => setPosition(getPositionFromEvent(e.clientX));
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) setPosition(getPositionFromEvent(e.touches[0].clientX));
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, getPositionFromEvent]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-black/70"
      style={{ border: "1px solid rgba(201,168,76,0.25)" }}
      onMouseDown={handleContainerMouseDown}
      onTouchStart={(e) => {
        if (e.touches[0]) {
          setIsDragging(true);
          setPosition(getPositionFromEvent(e.touches[0].clientX));
        }
      }}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(2, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(98, p + 2));
      }}
    >
      {/* AFTER image — full-width background */}
      {/* Replace afterImage prop: "/images/brows-after.jpg" or "/images/lip-after.jpg" */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-[#1A1A1A]"
        style={{ backgroundImage: afterImage ? `url(${afterImage})` : undefined }}
        aria-hidden="true"
      >
        {!afterImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#444] text-sm font-medium tracking-widest uppercase">After</span>
          </div>
        )}
      </div>

      {/* BEFORE image — clipped to left side */}
      {/* Replace beforeImage prop: "/images/brows-before.jpg" or "/images/lip-before.jpg" */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-[#111]"
          style={{
            backgroundImage: beforeImage ? `url(${beforeImage})` : undefined,
            width: `${(100 / position) * 100}%`,
            maxWidth: `${10000 / position}%`,
          }}
        >
          {!beforeImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#555] text-sm font-medium tracking-widest uppercase">Before</span>
            </div>
          )}
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none z-20"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.9) 15%, rgba(255,255,255,0.9) 85%, transparent)",
          boxShadow: "0 0 12px rgba(255,255,255,0.3)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform duration-100 ${
            isDragging ? "scale-110" : "scale-100"
          }`}
          style={{
            boxShadow: "0 0 0 3px rgba(201,168,76,0.8), 0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 9l-4 3 4 3M16 9l4 3-4 3"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Before label */}
      <div className="absolute bottom-4 left-4 z-20 bg-[#0A0A0A]/85 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full pointer-events-none">
        Before
      </div>

      {/* After label */}
      <div className="absolute bottom-4 right-4 z-20 backdrop-blur-sm text-[#0A0A0A] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full pointer-events-none" style={{ background: "rgba(201,168,76,0.92)" }}>
        After
      </div>

      {/* Drag hint — fades when dragging starts */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${
          isDragging ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-xs font-medium tracking-wide flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
          Drag to compare
        </div>
      </div>
    </div>
  );
}
