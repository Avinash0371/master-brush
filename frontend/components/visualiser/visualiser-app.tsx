"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type PointerEvent as ReactPointerEvent } from 'react';
import toast from 'react-hot-toast';

import { api } from '../../lib/api';

export type Stroke = {
  x: number;
  y: number;
  size: number;
  color: string;
};

export type VisualiserProjectState = {
  id?: string;
  title: string;
  project_json?: {
    strokes?: Stroke[];
    brushSize?: number;
    brushColor?: string;
    imageSource?: string;
    imageWidth?: number;
    imageHeight?: number;
  };
  thumbnail_url?: string | null;
};

type VisualiserAppProps = {
  defaultColour?: string;
  initialProject?: VisualiserProjectState;
};

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

const sampleRooms = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=960&h=540&fit=crop',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=960&h=540&fit=crop',
  'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=960&h=540&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=960&h=540&fit=crop',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=960&h=540&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=960&h=540&fit=crop'
];

const colourTokens = [
  { hex: '#F0D9B5', name: 'Cream' },
  { hex: '#2A7ABF', name: 'Ocean Blue' },
  { hex: '#EE6C4D', name: 'Coral' },
  { hex: '#6BCB77', name: 'Mint Green' },
  { hex: '#C77DFF', name: 'Lavender' },
  { hex: '#1F2937', name: 'Charcoal' }
];

export function VisualiserApp({ defaultColour, initialProject }: VisualiserAppProps) {
  const baseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const paintCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeImage, setActiveImage] = useState<HTMLImageElement | null>(null);
  const [projectTitle, setProjectTitle] = useState(initialProject?.title ?? 'My Room Refresh');
  const [brushColor, setBrushColor] = useState(initialProject?.project_json?.brushColor ?? defaultColour ?? '#EE6C4D');
  const [brushSize, setBrushSize] = useState(initialProject?.project_json?.brushSize ?? 30);
  const [strokes, setStrokes] = useState<Stroke[]>(initialProject?.project_json?.strokes ?? []);
  const [history, setHistory] = useState<Stroke[][]>([initialProject?.project_json?.strokes ?? []]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isPainting, setIsPainting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projectLink, setProjectLink] = useState<string | null>(initialProject?.id ? `/visualiser/${initialProject.id}` : null);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(initialProject?.project_json?.imageSource ?? sampleRooms[0]);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!initialProject) return;
    setProjectTitle(initialProject.title ?? 'My Room Refresh');
    setBrushColor(initialProject.project_json?.brushColor ?? defaultColour ?? '#EE6C4D');
    setBrushSize(initialProject.project_json?.brushSize ?? 30);
    if (initialProject.id) {
      setProjectLink(`/visualiser/${initialProject.id}`);
    }
  }, [initialProject, defaultColour]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Redo: Ctrl+Y or Cmd+Shift+Z
      if (((e.ctrlKey || e.metaKey) && e.key === 'y') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        handleRedo();
      }
      // Clear: Ctrl+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleClear();
      }
      // Brush size: [ and ]
      if (e.key === '[') {
        e.preventDefault();
        setBrushSize(prev => Math.max(5, prev - 5));
      }
      if (e.key === ']') {
        e.preventDefault();
        setBrushSize(prev => Math.min(80, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  const addToHistory = useCallback((newStrokes: Stroke[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newStrokes);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousStrokes = history[newIndex];
      setStrokes(previousStrokes);
      clearOverlay(false);
      renderStrokes(previousStrokes);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextStrokes = history[newIndex];
      setStrokes(nextStrokes);
      clearOverlay(false);
      renderStrokes(nextStrokes);
    }
  }, [historyIndex, history]);

  const handleClear = useCallback(() => {
    clearOverlay(true);
    addToHistory([]);
  }, [addToHistory]);

  const clearOverlay = useCallback((resetState = true) => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (resetState) {
      setStrokes([]);
    }
  }, []);

  const renderStrokes = useCallback((strokeList: Stroke[]) => {
    if (!strokeList.length) return;
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    strokeList.forEach(({ x, y, size, color }) => {
      ctx.fillStyle = `${color}80`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  const loadImage = useCallback(
    (src: string, hydratedStrokes: Stroke[] = []) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setActiveImage(img);
          const baseCanvas = baseCanvasRef.current;
          if (baseCanvas) {
            const context = baseCanvas.getContext('2d');
            if (context) {
              baseCanvas.width = CANVAS_WIDTH;
              baseCanvas.height = CANVAS_HEIGHT;
              context.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
              const ratio = Math.min(baseCanvas.width / img.width, baseCanvas.height / img.height);
              const width = img.width * ratio;
              const height = img.height * ratio;
              const offsetX = (baseCanvas.width - width) / 2;
              const offsetY = (baseCanvas.height - height) / 2;
              context.drawImage(img, offsetX, offsetY, width, height);
            }
          }
          clearOverlay(false);
          if (hydratedStrokes.length) {
            renderStrokes(hydratedStrokes);
            setStrokes(hydratedStrokes);
          } else {
            setStrokes([]);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
        setCurrentImageSrc(src);
      }),
    [clearOverlay, renderStrokes]
  );

  useEffect(() => {
    const initialStrokes = initialProject?.project_json?.strokes ?? [];
    const initialImage = initialProject?.project_json?.imageSource ?? sampleRooms[0];
    void loadImage(initialImage, initialStrokes);
  }, [initialProject, loadImage]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return;
      const src = typeof reader.result === 'string' ? reader.result : String(reader.result);
      setProjectLink(null);
      void loadImage(src);
    };
    reader.readAsDataURL(file);
  };

  const paintAt = (event: PointerEvent) => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

    ctx.fillStyle = `${brushColor}80`;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    setStrokes((prev: Stroke[]) => [...prev, { x, y, size: brushSize, color: brushColor }]);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    setIsPainting(true);
    paintAt(event.nativeEvent);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
    setCursorPosition({ x, y });

    if (!isPainting) return;
    paintAt(event.nativeEvent);
  };

  const onPointerUp = () => {
    if (isPainting) {
      setIsPainting(false);
      addToHistory(strokes);
    }
  };

  const onPointerLeave = () => {
    setCursorPosition(null);
    if (isPainting) {
      setIsPainting(false);
      addToHistory(strokes);
    }
  };

  const handleColorChange = (color: string) => {
    setBrushColor(color);
    setRecentColors(prev => {
      const filtered = prev.filter(c => c !== color);
      return [color, ...filtered].slice(0, 5);
    });
  };

  const handleSaveProject = async () => {
    if (!activeImage) {
      toast.error('Load a room image first.');
      return;
    }
    setSaving(true);
    try {
      const composite = document.createElement('canvas');
      composite.width = CANVAS_WIDTH;
      composite.height = CANVAS_HEIGHT;
      const compositeContext = composite.getContext('2d');
      const base = baseCanvasRef.current;
      const overlay = paintCanvasRef.current;
      if (compositeContext) {
        if (base) compositeContext.drawImage(base, 0, 0);
        if (overlay) compositeContext.drawImage(overlay, 0, 0);
      }

      const payload = {
        title: projectTitle.trim() || 'My Room Refresh',
        project_json: {
          strokes,
          brushSize,
          brushColor,
          imageSource: currentImageSrc,
          imageWidth: activeImage.naturalWidth || CANVAS_WIDTH,
          imageHeight: activeImage.naturalHeight || CANVAS_HEIGHT
        },
        thumbnail_url: compositeContext ? composite.toDataURL('image/png') : undefined
      };
      const response = await api.post('/visualiser', payload);
      const projectId = response.data?.data?.id ?? response.data?.data?.share_token;
      setProjectLink(projectId ? `/visualiser/${projectId}` : null);
      toast.success('Visual saved. Share the link with your clients.');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const base = baseCanvasRef.current;
    if (!base) {
      toast.error('Load a room image first.');
      return;
    }
    const composite = document.createElement('canvas');
    composite.width = CANVAS_WIDTH;
    composite.height = CANVAS_HEIGHT;
    const ctx = composite.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(base, 0, 0);
    const overlay = paintCanvasRef.current;
    if (overlay) ctx.drawImage(overlay, 0, 0);
    const link = document.createElement('a');
    link.download = `${projectTitle.replace(/\s+/g, '-')}.png`;
    link.href = composite.toDataURL('image/png');
    link.click();
    toast.success('Image downloaded!');
  };

  const handleToggleOverlay = () => {
    setShowOverlay((prev: boolean) => !prev);
  };

  const handleCopyLink = () => {
    if (resolvedProjectLink) {
      navigator.clipboard.writeText(resolvedProjectLink);
      toast.success('Link copied to clipboard!');
    }
  };

  const resolvedProjectLink = typeof window !== 'undefined' && projectLink ? new URL(projectLink, window.location.origin).toString() : projectLink;

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="space-y-6">
      {/* Enhanced Toolbar - Mobile Optimized */}
      <div className="sticky top-0 z-10 rounded-2xl border-2 border-slate-200 bg-white/95 backdrop-blur-lg p-3 md:p-5 shadow-xl">
        <div className="flex flex-col gap-3 md:gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Project Title */}
          <div className="flex-1 max-w-full lg:max-w-md">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Project Name</label>
            <input
              value={projectTitle}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setProjectTitle(event.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
              aria-label="Project title"
              placeholder="My Room Refresh"
            />
          </div>

          {/* Controls - Mobile Optimized */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Undo/Redo/Clear - Compact on mobile */}
            <div className="flex items-center gap-1 md:gap-2 rounded-xl bg-slate-50 p-1 md:p-1.5">
              <button
                type="button"
                onClick={handleUndo}
                disabled={!canUndo}
                className="group relative rounded-lg p-1.5 md:p-2.5 text-slate-600 transition-all hover:bg-white hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                title="Undo (Ctrl+Z)"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleRedo}
                disabled={!canRedo}
                className="group relative rounded-lg p-1.5 md:p-2.5 text-slate-600 transition-all hover:bg-white hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                title="Redo (Ctrl+Y)"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                </svg>
              </button>
              <div className="h-4 md:h-6 w-px bg-slate-200" />
              <button
                type="button"
                onClick={handleClear}
                className="group relative rounded-lg p-1.5 md:p-2.5 text-slate-600 transition-all hover:bg-white hover:text-red-500"
                title="Clear All (Ctrl+K)"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Brush Size - Compact on mobile */}
            <div className="flex items-center gap-2 md:gap-3 rounded-xl bg-slate-50 px-3 md:px-4 py-2 md:py-2.5">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-500 hidden sm:block">Size</label>
              <input
                type="range"
                min={5}
                max={80}
                value={brushSize}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setBrushSize(Number(event.target.value))}
                className="h-2 w-20 md:w-32 cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-primary"
              />
              <span className="text-xs md:text-sm font-bold text-slate-700 w-6 md:w-8 text-right">{brushSize}</span>
            </div>

            {/* Toggle Paint - Compact on mobile */}
            <button
              type="button"
              onClick={handleToggleOverlay}
              className={`rounded-xl border-2 px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-bold transition-all ${showOverlay
                ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
            >
              {showOverlay ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Canvas Area */}
        <div className="flex-1 space-y-5">
          {/* Canvas */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-2 border-slate-200 bg-slate-900 shadow-2xl">
            <canvas ref={baseCanvasRef} className="absolute inset-0 h-full w-full" aria-label="Base room" />
            <canvas
              ref={paintCanvasRef}
              className={`absolute inset-0 h-full w-full cursor-crosshair transition-opacity duration-300 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
              aria-label="Paint overlay"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerLeave}
              onPointerCancel={onPointerUp}
            />
            {/* Brush Preview Cursor */}
            {cursorPosition && showOverlay && (
              <div
                className="absolute pointer-events-none rounded-full border-2 border-white shadow-lg"
                style={{
                  left: `${(cursorPosition.x / CANVAS_WIDTH) * 100}%`,
                  top: `${(cursorPosition.y / CANVAS_HEIGHT) * 100}%`,
                  width: `${(brushSize * 2 / CANVAS_WIDTH) * 100}%`,
                  height: `${(brushSize * 2 / CANVAS_HEIGHT) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: `${brushColor}40`
                }}
              />
            )}
            {!activeImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                <p className="text-lg font-medium text-white">Select a room or upload your own to start painting</p>
              </div>
            )}
          </div>

          {/* Enhanced Color Picker */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Paint Colors</h3>
            <div className="flex flex-wrap items-center gap-3">
              {colourTokens.map((token) => (
                <button
                  key={token.hex}
                  style={{ backgroundColor: token.hex }}
                  onClick={() => handleColorChange(token.hex)}
                  className={`group relative h-14 w-14 rounded-xl border-4 shadow-md transition-all hover:scale-110 ${brushColor === token.hex ? 'border-brand-primary ring-4 ring-brand-primary/30 scale-110' : 'border-white'
                    }`}
                  aria-label={`Select ${token.name}`}
                  type="button"
                  title={token.name}
                />
              ))}
              <div className="h-10 w-px bg-slate-200 mx-1" />
              <div className="relative">
                <input
                  type="color"
                  value={brushColor}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleColorChange(event.target.value)}
                  className="h-14 w-14 cursor-pointer overflow-hidden rounded-xl border-4 border-white shadow-md transition-all hover:scale-110"
                  aria-label="Pick custom colour"
                  title="Custom Color"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-slate-200" />
              </div>
              {recentColors.length > 0 && (
                <>
                  <div className="h-10 w-px bg-slate-200 mx-1" />
                  {recentColors.map((color, index) => (
                    <button
                      key={`${color}-${index}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setBrushColor(color)}
                      className={`h-12 w-12 rounded-lg border-3 shadow-sm transition-all hover:scale-110 ${brushColor === color ? 'border-brand-primary ring-2 ring-brand-primary/30' : 'border-white'
                        }`}
                      type="button"
                      title="Recent color"
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-96 space-y-5">
          {/* Upload */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
            <h3 className="text-base font-bold text-slate-900">Upload Your Room</h3>
            <p className="mt-1 text-sm text-slate-500">JPEG or PNG up to 5 MB</p>
            <label className="mt-4 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-10 transition-all hover:border-brand-primary hover:bg-brand-primary/5">
              <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="mt-3 text-sm font-semibold text-slate-600">Click to upload</span>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          </div>

          {/* Sample Templates */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
            <h3 className="text-base font-bold text-slate-900 mb-4">Sample Templates</h3>
            <div className="grid grid-cols-2 gap-3">
              {sampleRooms.map((room) => (
                <button
                  key={room}
                  type="button"
                  onClick={() => {
                    setProjectLink(null);
                    void loadImage(room);
                  }}
                  className="group relative aspect-video overflow-hidden rounded-xl border-2 border-slate-200 transition-all hover:border-brand-primary hover:shadow-lg"
                >
                  <img src={room} alt="Sample room" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
            <button
              type="button"
              onClick={handleSaveProject}
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-dark px-5 py-4 text-base font-bold text-white shadow-xl shadow-brand-primary/30 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Project
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="w-full rounded-xl border-2 border-slate-200 px-5 py-4 text-base font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Image
              </span>
            </button>
            {resolvedProjectLink && (
              <div className="mt-4 rounded-xl bg-gradient-to-br from-brand-light to-brand-secondary/10 p-5 border-2 border-brand-secondary/20">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Share Link</p>
                <div className="flex items-center gap-2">
                  <a href={resolvedProjectLink} target="_blank" rel="noreferrer" className="flex-1 truncate text-sm font-semibold text-brand-primary hover:text-brand-dark transition-colors">
                    {resolvedProjectLink}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="rounded-lg bg-brand-primary p-2 text-white transition-all hover:bg-brand-dark"
                    title="Copy link"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-lg">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Keyboard Shortcuts</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Undo</span>
                <kbd className="rounded bg-slate-200 px-2 py-1 font-mono font-semibold text-slate-700">Ctrl+Z</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Redo</span>
                <kbd className="rounded bg-slate-200 px-2 py-1 font-mono font-semibold text-slate-700">Ctrl+Y</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Clear All</span>
                <kbd className="rounded bg-slate-200 px-2 py-1 font-mono font-semibold text-slate-700">Ctrl+K</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Brush Size</span>
                <div className="flex gap-1">
                  <kbd className="rounded bg-slate-200 px-2 py-1 font-mono font-semibold text-slate-700">[</kbd>
                  <kbd className="rounded bg-slate-200 px-2 py-1 font-mono font-semibold text-slate-700">]</kbd>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
