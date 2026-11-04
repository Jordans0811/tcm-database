/* ============================================================================
   TCM VISUAL OCCLUSION STUDIO MODULE (tcm-occlusion.js) -- V18.3 PRODUCTION
   - Zero external Panzoom dependency (Built-in Native Transform Engine)
   - Deferred / Offline-Resilient PDF.js loader + Cache API pre-caching
   - Full Multi-Photo (JPEG, PNG, WebP) & PDF Occlusion + Google Sheets Sync
   ============================================================================ */

(function () {
  const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7G6eHk7DVfJgK-rmI8AEscdHGpQWuGbIYECO5oTZZfBa0D14_NfC1Ee12NyybX2So/exec";
  const PDFJS_CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
  const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  let cloudSyncTimer = null;

  // --- BUILT-IN ZERO-DEPENDENCY PAN & ZOOM ENGINE ---
  function createNativePanZoom(targetEl) {
    let scale = 1;
    let panX = 0;
    let panY = 0;
    const minScale = 0.25;
    const maxScale = 6;
    const step = 0.25;

    function apply(animate = false) {
      if (!targetEl) return;
      targetEl.style.transition = animate ? "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none";
      targetEl.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
    }

    return {
      getScale: () => scale,
      getPan: () => ({ x: panX, y: panY }),
      pan: (x, y, opts) => {
        panX = Number.isFinite(x) ? x : 0;
        panY = Number.isFinite(y) ? y : 0;
        apply(Boolean(opts && opts.animate));
      },
      zoom: (s, opts) => {
        scale = Math.max(minScale, Math.min(maxScale, Number.isFinite(s) ? s : 1));
        apply(Boolean(opts && opts.animate));
      },
      zoomIn: () => {
        scale = Math.min(maxScale, scale * (1 + step));
        apply(true);
      },
      zoomOut: () => {
        scale = Math.max(minScale, scale / (1 + step));
        apply(true);
      },
      zoomWithWheel: (e) => {
        e.preventDefault();
        if (!targetEl) return;
        const rect = targetEl.getBoundingClientRect();
        const originCenterX = (rect.left + rect.width / 2) - scale * panX;
        const originCenterY = (rect.top + rect.height / 2) - scale * panY;

        const delta = e.deltaY < 0 ? 1.12 : 0.89;
        const nextScale = Math.max(minScale, Math.min(maxScale, scale * delta));

        panX = panX + (e.clientX - originCenterX) / nextScale - (e.clientX - originCenterX) / scale;
        panY = panY + (e.clientY - originCenterY) / nextScale - (e.clientY - originCenterY) / scale;
        scale = nextScale;
        apply(false);
      }
    };
  }

  // Ensure PDF.js is loaded and cached for offline use without blocking main PWA boot
  async function ensurePdfJsLoaded() {
    if (typeof window.pdfjsLib !== "undefined") {
      if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      }
      return true;
    }
    return new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = PDFJS_CDN_URL;
      s.onload = () => {
        if (typeof window.pdfjsLib !== "undefined") {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
          resolve(true);
        } else {
          resolve(false);
        }
      };
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }


  // --- 1. INJECT SCOPED STYLES & MODAL DOM ---
  function injectOcclusionStudioDOM() {
    if (document.getElementById("occStudioModal")) return;

    const style = document.createElement("style");
    style.textContent = `
      #occStudioModal {
        --occ-header-height: 112px;
        --occ-bg-app: #f2f2f7;
        --occ-bg-workspace: #e5e5ea;
        --occ-surface: rgba(255, 255, 255, 0.95);
        --occ-surface-solid: #ffffff;
        --occ-surface-elevated: #f9f9fb;
        --occ-border: rgba(60, 60, 67, 0.15);
        --occ-text: #1c1c1e;
        --occ-text-sub: #636366;
        --occ-accent: #007aff;
        --occ-accent-soft: rgba(0, 122, 255, 0.14);
        --occ-danger: #ff3b30;
        --occ-success: #34c759;
        --occ-warning: #ff9500;
        --occ-red: rgb(168, 22, 22);
        --occ-yellow: rgb(196, 138, 8);
        --occ-green: rgb(18, 122, 42);
        --occ-spotlight: #00d2ff;

        display: none;
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        height: 100dvh;
        background: var(--occ-bg-app);
        color: var(--occ-text);
        z-index: 10018;
        overflow: hidden;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
      }

      @media (prefers-color-scheme: dark) {
        #occStudioModal, #occSearchModal, #occLibraryModal {
          --occ-bg-app: #000000;
          --occ-bg-workspace: #111114;
          --occ-surface: rgba(28, 28, 30, 0.95);
          --occ-surface-solid: #1c1c1e;
          --occ-surface-elevated: #2c2c2e;
          --occ-border: rgba(255, 255, 255, 0.14);
          --occ-text: #f2f2f7;
          --occ-text-sub: #98989d;
          --occ-accent: #0a84ff;
          --occ-accent-soft: rgba(10, 132, 255, 0.22);
        }
      }

      #occStudioModal * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

      #occHeader {
        position: absolute;
        top: 0; left: 0; right: 0;
        background: var(--occ-surface);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        z-index: 100;
        border-bottom: 1px solid var(--occ-border);
        padding: calc(8px + env(safe-area-inset-top)) 0 8px 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      }

      .occ-header-top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
        gap: 6px 10px;
      }

      .occ-title-wrap {
        display: flex;
        flex-direction: column;
        min-width: 0;
        flex: 1 1 auto;
        order: 1;
      }

      .occ-title {
        font-size: 16px;
        margin: 0;
        font-weight: 800;
        letter-spacing: -0.4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--occ-text);
      }

      #occDocSubtitle {
        font-size: 11px;
        color: var(--occ-text-sub);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 220px;
      }

      #occPageNavBar {
        display: flex;
        align-items: center;
        gap: 8px;
        order: 2;
        flex-shrink: 0;
      }

      .occ-page-controls {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        color: var(--occ-text-sub);
        font-weight: 700;
        flex-shrink: 0;
        background: var(--occ-surface-elevated);
        padding: 3px 8px;
        border-radius: 10px;
        border: 1px solid var(--occ-border);
      }

      .occ-mini-btn {
        background: var(--occ-surface-solid);
        color: var(--occ-text);
        border: 1px solid var(--occ-border);
        border-radius: 7px;
        width: 28px;
        height: 26px;
        font-weight: 800;
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .occ-mini-btn:active { opacity: 0.6; transform: scale(0.94); }

      #occPageInput {
        width: 40px;
        text-align: center;
        border: 1px solid var(--occ-border);
        border-radius: 6px;
        padding: 2px 3px;
        font-size: 13px;
        font-weight: 700;
        background: var(--occ-surface-solid);
        color: var(--occ-text);
        -webkit-appearance: none;
      }

      .occ-header-actions {
        display: flex;
        gap: 5px;
        align-items: center;
        flex-shrink: 0;
        order: 3;
      }

      .occ-icon-btn {
        height: 34px;
        min-width: 34px;
        padding: 0 8px;
        border-radius: 10px;
        border: 1px solid var(--occ-border);
        background: var(--occ-surface-elevated);
        color: var(--occ-text);
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
        font-weight: 700;
      }
      .occ-icon-btn:active { transform: scale(0.94); }
      .occ-icon-btn .occ-btn-lbl { font-size: 12px; display: none; }
      @media (min-width: 860px) {
        .occ-icon-btn .occ-btn-lbl { display: inline; }
      }

      .occ-btn-primary { background: var(--occ-accent); color: #fff; border-color: var(--occ-accent); }
      .occ-btn-danger { color: var(--occ-danger); background: rgba(255, 59, 48, 0.1); border-color: rgba(255, 59, 48, 0.25); }
      .occ-btn-success { color: var(--occ-success); background: rgba(52, 199, 89, 0.12); border-color: rgba(52, 199, 89, 0.25); }
      .occ-btn-orange { color: #cc5500; background: rgba(204, 85, 0, 0.12); border-color: rgba(204, 85, 0, 0.28); }

      @media (max-width: 740px) {
        .occ-title-wrap { order: 1; max-width: 36vw; }
        .occ-header-actions { order: 2; gap: 4px; }
        #occPageNavBar {
          order: 3;
          width: 100%;
          justify-content: space-between;
          padding-top: 2px;
        }
        .occ-page-controls {
          flex: 1;
          justify-content: space-between;
          padding: 4px 10px;
        }
        .occ-mini-btn { width: 34px; height: 28px; font-size: 16px; }
        .occ-icon-btn { height: 32px; min-width: 30px; padding: 0 6px; font-size: 13.5px; }
      }

      .occ-pill-nav {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 12px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        white-space: nowrap;
      }
      .occ-pill-nav::-webkit-scrollbar { display: none; }

      .occ-pill {
        padding: 6px 13px;
        background: var(--occ-surface-elevated);
        border: 1px solid var(--occ-border);
        border-radius: 18px;
        font-size: 13px;
        font-weight: 700;
        color: var(--occ-text);
        white-space: nowrap;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
      }
      .occ-pill:active { transform: scale(0.96); }
      .occ-pill.active {
        background: var(--occ-accent);
        color: #ffffff;
        border-color: var(--occ-accent);
      }
      .occ-pill-warn {
        background: rgba(255, 149, 0, 0.12);
        border-color: rgba(255, 149, 0, 0.4);
        color: var(--occ-warning);
      }
      .occ-pill-divider {
        width: 1px;
        height: 20px;
        background: var(--occ-border);
        flex-shrink: 0;
        margin: 0 2px;
      }

      #occStudyToolbar {
        display: none;
        align-items: center;
        gap: 8px;
        padding: 0 12px;
        width: 100%;
      }

      .occ-mastery-pills {
        display: none;
        align-items: center;
        gap: 4px;
        background: var(--occ-surface-elevated);
        padding: 4px 8px;
        border-radius: 12px;
        border: 1px solid var(--occ-border);
        font-size: 11px;
        font-weight: 800;
        flex-shrink: 0;
      }
      #occStudioModal.occ-study-mode .occ-mastery-pills { display: inline-flex; }
      .occ-m-dot {
        display: inline-flex;
        align-items: center;
        padding: 2px 7px;
        border-radius: 8px;
        color: #fff;
      }
      .occ-m-dot.red { background: var(--occ-red); }
      .occ-m-dot.yellow { background: var(--occ-yellow); }
      .occ-m-dot.green { background: var(--occ-green); }

      #occWorkspace {
        position: absolute;
        top: var(--occ-header-height);
        bottom: 0; left: 0; right: 0;
        overflow: hidden;
        background: var(--occ-bg-workspace);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        touch-action: none;
      }

      #occContainer {
        position: relative;
        background: #ffffff;
        transform-origin: center center;
        will-change: transform;
        backface-visibility: hidden;
        box-shadow: 0 12px 36px rgba(0,0,0,0.22);
        border-radius: 2px;
        touch-action: none;
      }

      #occCanvas {
        display: block;
        pointer-events: none;
        transition: filter 0.2s;
      }
      #occStudioModal.occ-invert-canvas #occCanvas {
        filter: invert(0.92) hue-rotate(180deg);
      }

      #occOverlay {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        touch-action: none;
      }

      #occEmptyState {
        position: absolute;
        inset: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        z-index: 25;
      }
      .occ-empty-card {
        background: var(--occ-surface);
        backdrop-filter: blur(12px);
        border: 2px dashed var(--occ-border);
        border-radius: 22px;
        padding: 28px 22px;
        max-width: 440px;
        width: 100%;
        box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
      .occ-empty-card.drag-over {
        border-color: var(--occ-accent);
        background: var(--occ-accent-soft);
      }
      .occ-cta-btn {
        padding: 11px 18px;
        border-radius: 12px;
        border: none;
        font-weight: 800;
        font-size: 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        background: var(--occ-accent);
        color: #fff;
      }
      .occ-cta-btn.secondary {
        background: var(--occ-surface-elevated);
        color: var(--occ-text);
        border: 1px solid var(--occ-border);
      }

      #occStudioModal .occlusion-box {
        position: absolute;
        cursor: pointer;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        transform-origin: top left;
        border: 1.5px solid rgba(255,255,255,0.45);
        transition: background-color 0.12s, opacity 0.12s, box-shadow 0.12s;
        touch-action: none;
      }
      #occStudioModal .occlusion-box.revealed {
        background-color: transparent !important;
        border-style: dashed !important;
        border-width: 1.5px !important;
        opacity: 1 !important;
      }
      #occStudioModal.occ-peek-active .occlusion-box[data-boxtype="occlusion"] {
        background-color: rgba(0, 0, 0, 0.06) !important;
        border-style: dotted !important;
      }
      #occStudioModal.occ-peek-active .occlusion-box[data-boxtype="occlusion"] .hint-text {
        opacity: 0.15 !important;
      }
      #occStudioModal.occ-study-mode .occlusion-box.revealed .hint-text { display: none !important; }
      #occStudioModal.occ-edit-mode .occlusion-box.revealed .hint-text {
        display: flex !important;
        background-color: rgba(0, 0, 0, 0.42);
        border-radius: 3px;
      }
      #occStudioModal.occ-study-mode .occlusion-box.filtered-out {
        background-color: transparent !important;
        border: 1px dotted rgba(128, 128, 128, 0.35) !important;
        pointer-events: none !important;
      }
      #occStudioModal.occ-study-mode .occlusion-box.filtered-out .hint-text,
      #occStudioModal.occ-study-mode .occlusion-box.filtered-out .group-badge {
        display: none !important;
      }
      #occStudioModal.occ-study-mode .occlusion-box.study-target {
        box-shadow: 0 0 0 3px var(--occ-spotlight), 0 0 18px rgba(0, 210, 255, 0.75) !important;
        border-color: #ffffff !important;
        z-index: 950 !important;
        animation: occTargetPulse 1.3s infinite ease-in-out;
      }
      @keyframes occTargetPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.025); }
      }
      #occStudioModal.occ-edit-mode .occlusion-box { pointer-events: all; }
      #occStudioModal.occ-edit-mode .occlusion-box.selected {
        border: 2px solid var(--occ-accent) !important;
        box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.25);
        z-index: 1000;
      }

      #occStudioModal .resize-handle {
        position: absolute;
        width: 12px;
        height: 12px;
        background: #ffffff;
        border: 2.5px solid var(--occ-accent);
        border-radius: 50%;
        z-index: 1010;
        box-shadow: 0 1px 4px rgba(0,0,0,0.35);
        touch-action: none;
      }
      #occStudioModal .resize-handle::after { content: ''; position: absolute; inset: -8px; }
      #occStudioModal .resize-handle.nw { top: -6px; left: -6px; cursor: nwse-resize; }
      #occStudioModal .resize-handle.ne { top: -6px; right: -6px; cursor: nesw-resize; }
      #occStudioModal .resize-handle.sw { bottom: -6px; left: -6px; cursor: nesw-resize; }
      #occStudioModal .resize-handle.se { bottom: -6px; right: -6px; cursor: nwse-resize; }
      #occStudioModal .resize-handle.n  { top: -6px; left: calc(50% - 6px); cursor: ns-resize; }
      #occStudioModal .resize-handle.s  { bottom: -6px; left: calc(50% - 6px); cursor: ns-resize; }
      #occStudioModal .resize-handle.w  { left: -6px; top: calc(50% - 6px); cursor: ew-resize; }
      #occStudioModal .resize-handle.e  { right: -6px; top: calc(50% - 6px); cursor: ew-resize; }

      #occStudioModal .hint-text {
        color: #ffffff;
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        pointer-events: none;
        text-shadow: 0 1px 3px rgba(0,0,0,0.85);
        width: 100%; height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 3px 5px;
        line-height: 1.18;
        word-break: break-word;
      }

      #occStudioModal .group-badge {
        position: absolute;
        top: -7px; right: -7px;
        background: #34c759;
        color: #ffffff;
        border-radius: 10px;
        min-width: 15px;
        height: 15px;
        padding: 0 4px;
        font-size: 9px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        z-index: 10;
      }

      #occStudioModal .occlusion-box[data-boxtype="note"] {
        background-color: rgba(254, 240, 138, 0.92) !important;
        border: 1.5px solid #eab308 !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      }
      #occStudioModal .occlusion-box[data-boxtype="note"] .hint-text {
        color: #1f2937;
        text-shadow: none;
        font-weight: 700;
        background: transparent !important;
      }
      #occStudioModal.occ-study-mode .occlusion-box[data-boxtype="note"] {
        pointer-events: none;
        opacity: 1 !important;
      }
      #occStudioModal .occlusion-box[data-boxtype="note"] .group-badge { display: none; }

      #occStudioModal .marquee-box {
        position: absolute;
        border: 1.5px dashed var(--occ-accent);
        background: rgba(0, 122, 255, 0.14);
        pointer-events: none;
        z-index: 2000;
      }

      #occStudioModal .search-highlight {
        position: absolute;
        background-color: rgba(255, 235, 59, 0.42);
        border: 2px solid #f59e0b;
        border-radius: 4px;
        pointer-events: none;
        z-index: 500;
      }

      #occEditPanel {
        position: fixed;
        bottom: calc(14px + env(safe-area-inset-bottom));
        left: 50%;
        transform: translateX(-50%);
        width: min(94vw, 560px);
        background: var(--occ-surface);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 10px 12px;
        border-radius: 18px;
        display: none;
        flex-direction: column;
        gap: 8px;
        z-index: 120;
        border: 1px solid var(--occ-border);
        box-shadow: 0 12px 32px rgba(0,0,0,0.22);
      }
      .occ-insp-header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
      .occ-insp-title { font-size: 12px; font-weight: 800; color: var(--occ-text-sub); text-transform: uppercase; }
      .occ-chip-btn {
        border: 1px solid var(--occ-border);
        background: var(--occ-surface-elevated);
        color: var(--occ-text);
        border-radius: 8px;
        padding: 4px 9px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .occ-chip-btn.danger { background: rgba(255, 59, 48, 0.12); color: var(--occ-danger); border-color: rgba(255, 59, 48, 0.3); }
      .occ-chip-btn.done { background: var(--occ-accent); color: #fff; border-color: var(--occ-accent); }

      #occEditHint {
        width: 100%;
        padding: 8px 10px;
        border-radius: 10px;
        border: 1px solid var(--occ-border);
        background: var(--occ-surface-solid);
        color: var(--occ-text);
        font-size: 14px;
        font-family: inherit;
        resize: none;
        height: 36px;
      }
      .occ-insp-bottom {
        display: flex;
        align-items: center;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .occ-insp-bottom::-webkit-scrollbar { display: none; }
      .occ-group-chip {
        padding: 4px 9px;
        border-radius: 8px;
        border: 1px solid var(--occ-border);
        background: var(--occ-surface-elevated);
        color: var(--occ-text);
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
        flex-shrink: 0;
      }
      .occ-group-chip.active { background: var(--occ-success); color: #fff; border-color: var(--occ-success); }

      #occRatingBasket {
        position: fixed;
        opacity: 0;
        pointer-events: none;
        background: rgba(28, 28, 30, 0.96);
        backdrop-filter: blur(12px);
        color: white;
        padding: 8px 12px;
        border-radius: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 10px 28px rgba(0,0,0,0.45);
        border: 1px solid rgba(255,255,255,0.14);
        transition: opacity 0.14s ease-out;
        z-index: 130;
        transform: translateX(-50%);
      }
      #occRatingBasket.visible { opacity: 1; pointer-events: auto; }
      .occ-rate-btn {
        border: none;
        border-radius: 16px;
        padding: 7px 13px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 800;
        color: white;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .occ-rate-btn.red { background: #ff3b30; }
      .occ-rate-btn.yellow { background: #ffcc00; color: #1c1c1e; }
      .occ-rate-btn.green { background: #34c759; }
      .occ-kbd { font-size: 10px; opacity: 0.75; background: rgba(0,0,0,0.22); padding: 1px 4px; border-radius: 4px; }

      #occStudyStepper {
        position: fixed;
        bottom: calc(16px + env(safe-area-inset-bottom));
        right: 16px;
        background: var(--occ-surface);
        backdrop-filter: blur(14px);
        border: 1px solid var(--occ-border);
        border-radius: 24px;
        padding: 6px 10px;
        display: none;
        align-items: center;
        gap: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        z-index: 115;
      }
      #occStudioModal.occ-study-mode #occStudyStepper { display: flex; }
      .occ-stepper-btn {
        background: var(--occ-accent);
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 8px 15px;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
      }
      .occ-stepper-btn.secondary {
        background: var(--occ-surface-elevated);
        color: var(--occ-text);
        border: 1px solid var(--occ-border);
        padding: 8px 11px;
      }
      @media (max-width: 540px) {
        #occStudyStepper { right: 50%; transform: translateX(50%); width: max-content; }
      }

      #occSearchModal, #occLibraryModal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(5px);
        z-index: 10019;
        display: none;
        align-items: flex-start;
        justify-content: center;
        padding-top: calc(48px + env(safe-area-inset-top));
      }
      .occ-modal-card {
        background: var(--occ-surface-solid, #fff);
        color: var(--occ-text, #1c1c1e);
        width: min(92vw, 540px);
        max-height: 78vh;
        border-radius: 18px;
        border: 1px solid var(--occ-border);
        box-shadow: 0 20px 45px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .occ-modal-header {
        padding: 12px 15px;
        border-bottom: 1px solid var(--occ-border);
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: space-between;
      }
      .occ-modal-header input {
        flex: 1;
        border: none;
        font-size: 15px;
        background: transparent;
        color: inherit;
      }
      .occ-modal-body {
        padding: 0;
        overflow-y: auto;
        flex: 1;
      }
      .occ-list-item {
        padding: 12px 15px;
        border-bottom: 1px solid var(--occ-border);
        font-size: 14px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }
      .occ-list-status {
        padding: 20px 15px;
        font-size: 13px;
        color: var(--occ-text-sub);
        text-align: center;
      }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div id="occStudioModal" class="occ-edit-mode">
        <div id="occHeader">
          <div class="occ-header-top">
            <div class="occ-title-wrap">
              <div class="occ-title">🖼️ Occlusion Studio</div>
              <div id="occDocSubtitle">No file loaded</div>
            </div>

            <div id="occPageNavBar">
              <div class="occ-page-controls">
                <button class="occ-mini-btn" onclick="occChangePage(-1)" title="Previous Page">‹</button>
                <span>Page <input type="number" id="occPageInput" value="1" min="1"> of <span id="occTotalPages">0</span></span>
                <button class="occ-mini-btn" onclick="occChangePage(1)" title="Next Page">›</button>
                <span id="occBoxCounter" style="font-size:11px; color:var(--occ-accent); font-weight:800; margin-left:2px;"></span>
              </div>

              <div class="occ-mastery-pills" title="Page Mastery (Red / Yellow / Green)">
                <span class="occ-m-dot red" id="occStatRed">0</span>
                <span class="occ-m-dot yellow" id="occStatYellow">0</span>
                <span class="occ-m-dot green" id="occStatGreen">0</span>
              </div>
            </div>

            <div class="occ-header-actions">
              <button class="occ-icon-btn occ-btn-orange" onclick="if(typeof openQuickPeekSearch==='function') openQuickPeekSearch('');" title="Open Quick Peek Database Side-Sheet">⚡<span class="occ-btn-lbl">Peek DB</span></button>
              <button class="occ-icon-btn" onclick="occTriggerUndo()" title="Undo (Ctrl+Z)">↩️</button>
              <button class="occ-icon-btn" onclick="openOccSearchModal()" title="Search Hints & PDF Text">🔍</button>
              <button class="occ-icon-btn" onclick="openOccLibraryModal()" title="Saved Files Library">📚<span class="occ-btn-lbl">Library</span></button>

              <div id="occEditActions" style="display:flex; gap:4px; align-items:center;">
                <button class="occ-icon-btn" id="occSyncCloudBtn" onclick="occSyncFromCloud(false)" title="Pull from Google Sheets">☁️</button>
                <label class="occ-icon-btn" id="occLoadBtn" title="Open PDF or Photos">📂<span class="occ-btn-lbl">Open</span><input type="file" id="occFileUpload" accept="application/pdf,image/*" multiple style="display:none;" /></label>
                <label class="occ-icon-btn" id="occAddPageBtn" style="display:none;" title="Add Photo Page(s)">➕🖼️<input type="file" id="occAppendImageUpload" accept="image/*" multiple style="display:none;" /></label>
                <button class="occ-icon-btn occ-btn-success" id="occSaveCloudBtn" onclick="occForceSave()" title="Push to Google Sheets">💾</button>
                <button class="occ-icon-btn occ-btn-danger" id="occCloseFileBtn" onclick="occCloseDocument()" style="display:none;" title="Close File">✕</button>
              </div>

              <button class="occ-icon-btn occ-btn-primary" id="occModeToggleBtn" onclick="occToggleMode()" title="Switch Edit / Study Mode">🎓<span class="occ-btn-lbl">Study</span></button>
              <button class="occ-icon-btn" onclick="closeOcclusionStudioModal()" title="Exit Occlusion Studio (Esc)" style="font-weight:900;">✕</button>
            </div>
          </div>

          <div id="occEditToolbar" class="occ-pill-nav">
            <div class="occ-pill active" id="occ-tool-pan" onclick="occSetTool('pan')">🖐️ Pan</div>
            <div class="occ-pill" id="occ-tool-draw" onclick="occSetTool('draw')">➕ Draw Box</div>
            <div class="occ-pill" id="occ-tool-select" onclick="occSetTool('select')">👆 Multi-Select</div>
            <div class="occ-pill" id="occ-tool-pencil" onclick="occSetTool('pencil')">🖍️ Ink</div>
            <div class="occ-pill-divider"></div>
            <div class="occ-pill" onclick="occSelectAllOnPage()">☑️ All</div>
            <div class="occ-pill occ-pill-warn" id="occAutoBoxPill" onclick="occAutoBoxCurrentPage()">🤖 Auto-Box</div>
            <div class="occ-pill" onclick="occRevealAll()">👁️ Reveal</div>
            <div class="occ-pill" onclick="occHideAll()">🙈 Cover</div>
            <div class="occ-pill" onclick="occResetView()">🎯 Fit</div>
            <div class="occ-pill" id="occFilterBtnEdit" onclick="occTogglePageFilter()">📑 Skip Empty</div>
            <div class="occ-pill" onclick="occToggleInvert()">🌓 Invert</div>
          </div>

          <div id="occStudyToolbar">
            <div class="occ-pill-nav" style="padding:0; flex:1;">
              <div class="occ-pill active" id="occStudyFilterPill" onclick="occCycleStudyFilter()">🎯 Filter: All</div>
              <div class="occ-pill active" id="occToggleRatingBtn" onclick="occToggleRatingMode()">⭐ Rate: ON</div>
              <div class="occ-pill" onclick="occHideAll()">🙈 Reset Cover</div>
              <div class="occ-pill" onclick="occRevealAll()">👁️ Reveal All</div>
              <div class="occ-pill" onclick="occResetView()">🎯 Fit</div>
              <div class="occ-pill" id="occFilterBtnStudy" onclick="occTogglePageFilter()">📑 Skip Empty</div>
              <div class="occ-pill" onclick="occResetPageScores()">🔄 Reset Scores</div>
              <div class="occ-pill" onclick="occToggleInvert()">🌓 Invert</div>
            </div>
          </div>
        </div>

        <div id="occWorkspace">
          <div id="occEmptyState">
            <div class="occ-empty-card" id="occDropzoneCard">
              <div style="font-size:42px; line-height:1;">🖼️ 📄</div>
              <h2 style="font-size:18px; font-weight:800; margin:0;">Load PDF or Study Photos</h2>
              <p style="font-size:13px; color:var(--occ-text-sub); line-height:1.45; margin:0;">
                Open a PDF or select one or more photos (JPEG, PNG, WebP). You can also <strong>Drag & Drop</strong> files or press <strong>Ctrl/Cmd + V</strong> to paste an image.
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; width:100%; margin-top:4px;">
                <label class="occ-cta-btn">
                  📂 Choose PDF / Photos
                  <input type="file" id="occEmptyFileUpload" accept="application/pdf,image/*" multiple style="display:none;" />
                </label>
                <button class="occ-cta-btn secondary" onclick="openOccLibraryModal()">📚 Saved Library</button>
              </div>
            </div>
          </div>

          <div id="occContainer" style="display:none;">
            <canvas id="occCanvas"></canvas>
            <div id="occOverlay"></div>
          </div>

          <div id="occRatingBasket">
            <button class="occ-rate-btn red" onclick="occSubmitRating(0)">Again <span class="occ-kbd">Q</span></button>
            <button class="occ-rate-btn yellow" onclick="occSubmitRating(0.5)">Kinda <span class="occ-kbd">W</span></button>
            <button class="occ-rate-btn green" onclick="occSubmitRating(1)">Know <span class="occ-kbd">E</span></button>
          </div>

          <div id="occStudyStepper">
            <button class="occ-stepper-btn secondary" id="occPeekBtn" title="Hold to Peek (Key: P)">👁️ Peek</button>
            <button class="occ-stepper-btn secondary" onclick="occHandleUndoReveal()" title="Undo Last Reveal">↩️</button>
            <button class="occ-stepper-btn" id="occStepperMainBtn" onclick="occHandleSequentialStep()">▶️ Next Box (Space)</button>
          </div>

          <div id="occEditPanel">
            <div class="occ-insp-header">
              <span class="occ-insp-title" id="occPanelStats">Score: 0 (Red)</span>
              <div style="display:flex; gap:6px; align-items:center;">
                <button class="occ-chip-btn" onclick="occDuplicateSelected()">⧉ Duplicate</button>
                <button class="occ-chip-btn danger" onclick="occDeleteSelected()">🗑️ Delete</button>
                <button class="occ-chip-btn done" onclick="occCloseEditPanel()">✓ Done</button>
              </div>
            </div>
            <div>
              <textarea id="occEditHint" placeholder="Hint or label text..."></textarea>
            </div>
            <div class="occ-insp-bottom">
              <select id="occEditBoxType" style="padding:5px 8px; border-radius:8px; border:1px solid var(--occ-border); background:var(--occ-surface-elevated); color:var(--occ-text); font-size:12px; font-weight:700;">
                <option value="occlusion">🟥 Occlusion</option>
                <option value="note">🟨 Sticky Note</option>
              </select>
              <input type="text" id="occEditGroup" placeholder="Group #" style="width:70px; padding:5px 8px; border-radius:8px; border:1px solid var(--occ-border); background:var(--occ-surface-solid); color:var(--occ-text); font-size:12px; font-weight:700;">
              <button class="occ-group-chip" onclick="occSetQuickGroup('')">None</button>
              <button class="occ-group-chip" onclick="occSetQuickGroup('A')">A</button>
              <button class="occ-group-chip" onclick="occSetQuickGroup('B')">B</button>
              <button class="occ-group-chip" onclick="occSetQuickGroup('C')">C</button>
              <button class="occ-group-chip" onclick="occSetQuickGroup('D')">D</button>
              <button class="occ-group-chip" onclick="occSetQuickGroup('1')">1</button>
              <button class="occ-group-chip" onclick="occSetQuickGroup('2')">2</button>
              <button class="occ-group-chip" onclick="occSetQuickGroup('3')">3</button>
            </div>
          </div>
        </div>
      </div>

      <div id="occSearchModal" onclick="if(event.target===this) closeOccSearchModal()">
        <div class="occ-modal-card">
          <div class="occ-modal-header">
            <input type="text" id="occSearchInput" placeholder="Search hints, groups, and PDF text..." autocomplete="off">
            <button class="occ-chip-btn done" onclick="occTriggerSearch()">Search</button>
            <button class="occ-chip-btn danger" onclick="occClearAndCloseSearch()">Clear</button>
            <button class="occ-mini-btn" onclick="closeOccSearchModal()">✕</button>
          </div>
          <div id="occSearchResults" class="occ-modal-body">
            <div class="occ-list-status">Enter a keyword to search all occlusion hints, sticky notes, and PDF text.</div>
          </div>
        </div>
      </div>

      <div id="occLibraryModal" onclick="if(event.target===this) closeOccLibraryModal()">
        <div class="occ-modal-card">
          <div class="occ-modal-header">
            <strong style="font-size:15px;">📚 Saved Occlusion Library</strong>
            <button class="occ-mini-btn" onclick="closeOccLibraryModal()">✕</button>
          </div>
          <div id="occLibraryList" class="occ-modal-body">
            <div class="occ-list-status">Loading saved files...</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
    bindOcclusionStudioEvents();
  }

  // --- 2. MODULE STATE ---
  let docType = null; // 'pdf' | 'images'
  let pdfDoc = null;
  let imagePages = [];
  let pageNum = 1;
  let totalPages = 0;
  let renderTask = null;
  let liveEditTimer = null;

  let isEditMode = true;
  let editBoxesRevealed = true;
  let activeTool = "pan";
  let ratingEnabled = true;
  let studyFilterMode = "all";

  const pageCache = new Map();
  let allBoxes = [];
  let currentFileName = "";
  let filterEmptyPages = false;

  let sequentialRevealHistory = [];
  let currentTargetBoxId = null;
  let currentlyRatingGroup = null;
  let activeSearchHighlight = "";
  let selectedBoxes = [];

  let undoStack = [];
  const MAX_UNDO = 25;

  let panzoom = null;
  let db = null;

  function notify(msg) {
    if (typeof window.showToast === "function") window.showToast(msg);
  }

  function isOcclusionModalOpen() {
    const el = document.getElementById("occStudioModal");
    return Boolean(el && el.style.display === "flex");
  }

  function adjustOccLayout() {
    if (!isOcclusionModalOpen()) return;
    const headerEl = document.getElementById("occHeader");
    const modalEl = document.getElementById("occStudioModal");
    if (headerEl && modalEl) {
      modalEl.style.setProperty("--occ-header-height", headerEl.offsetHeight + "px");
    }
  }

  // --- 3. OPEN / CLOSE STUDIO MODAL ---
  window.openOcclusionStudioModal = async function () {
    injectOcclusionStudioDOM();
    if (typeof closeBottomSheet === "function") closeBottomSheet();

    const modal = document.getElementById("occStudioModal");
    modal.style.display = "flex";
    adjustOccLayout();

    await ensureOccDbOpened();
    if (docType) {
      await renderPage(pageNum);
    } else if (db) {
      autoLoadCachedDoc();
    }
  };

  window.closeOcclusionStudioModal = function () {
    if (currentFileName) saveToLocal();
    const modal = document.getElementById("occStudioModal");
    if (modal) modal.style.display = "none";

    const canvas = document.getElementById("occCanvas");
    if (canvas) {
      canvas.width = 1;
      canvas.height = 1;
    }
  };

  // --- 4. RENDER ENGINE (PDF & PHOTOS) ---
  async function renderPage(num) {
    if (!docType || !isOcclusionModalOpen()) return;
    const canvas = document.getElementById("occCanvas");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("occContainer");
    const workspace = document.getElementById("occWorkspace");
    const pixelRatio = Math.min(window.devicePixelRatio || 2, 3);

    if (docType === "pdf" && pdfDoc) {
      totalPages = pdfDoc.numPages;
      let page;
      if (pageCache.has(num)) {
        page = pageCache.get(num);
      } else {
        page = await pdfDoc.getPage(num);
        pageCache.set(num, page);
      }

      if (num < pdfDoc.numPages && !pageCache.has(num + 1)) {
        pdfDoc.getPage(num + 1).then(p => pageCache.set(num + 1, p));
      }

      const unscaledViewport = page.getViewport({ scale: 1 });
      const maxW = workspace.clientWidth * 0.94;
      const maxH = workspace.clientHeight * 0.92;
      const fitScale = Math.min(maxW / unscaledViewport.width, maxH / unscaledViewport.height, 2.2);
      const viewport = page.getViewport({ scale: fitScale });

      canvas.width = viewport.width * pixelRatio;
      canvas.height = viewport.height * pixelRatio;
      canvas.style.width = viewport.width + "px";
      canvas.style.height = viewport.height + "px";
      container.style.width = viewport.width + "px";
      container.style.height = viewport.height + "px";

      drawStoredBoxes();

      if (renderTask) await renderTask.cancel();
      const transform = [pixelRatio, 0, 0, pixelRatio, 0, 0];
      renderTask = page.render({ canvasContext: ctx, viewport, transform });

      try {
        await renderTask.promise;
        renderTask = null;
      } catch (err) {
        if (err.name !== "RenderingCancelledException") console.error("Render error:", err);
        return;
      }
    } else if (docType === "images" && imagePages.length > 0) {
      totalPages = imagePages.length;
      const imgEntry = imagePages[num - 1];
      if (!imgEntry) return;

      const img = await loadImageElement(imgEntry);
      const maxW = workspace.clientWidth * 0.94;
      const maxH = workspace.clientHeight * 0.90;
      const fitScale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 2.5);

      const dispW = Math.max(200, Math.round(img.naturalWidth * fitScale));
      const dispH = Math.max(200, Math.round(img.naturalHeight * fitScale));

      canvas.width = dispW * pixelRatio;
      canvas.height = dispH * pixelRatio;
      canvas.style.width = dispW + "px";
      canvas.style.height = dispH + "px";
      container.style.width = dispW + "px";
      container.style.height = dispH + "px";

      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      ctx.clearRect(0, 0, dispW, dispH);
      ctx.drawImage(img, 0, 0, dispW, dispH);
      ctx.restore();

      drawStoredBoxes();
    }

    document.getElementById("occPageInput").value = num;
    document.getElementById("occTotalPages").innerText = totalPages;

    updateSubtitle();
    adjustOccLayout();
    if (activeSearchHighlight && docType === "pdf") highlightPdfText(activeSearchHighlight);
  }

  function loadImageElement(imgEntry) {
    return new Promise((resolve, reject) => {
      if (imgEntry._imgEl) return resolve(imgEntry._imgEl);
      const img = new Image();
      if (!imgEntry.url && imgEntry.blob) {
        imgEntry.url = URL.createObjectURL(imgEntry.blob);
      }
      img.onload = () => {
        imgEntry._imgEl = img;
        resolve(img);
      };
      img.onerror = reject;
      img.src = imgEntry.url;
    });
  }

  function updateSubtitle() {
    const sub = document.getElementById("occDocSubtitle");
    if (!currentFileName) {
      sub.innerText = "No file loaded";
      return;
    }
    if (docType === "images" && imagePages[pageNum - 1]) {
      const subName = imagePages[pageNum - 1].name || `Photo ${pageNum}`;
      sub.innerText = `${currentFileName} • ${subName}`;
    } else {
      sub.innerText = currentFileName;
    }
  }

  // --- 5. NAVIGATION & TOOLS ---
  function saveStateForUndo() {
    undoStack.push(JSON.parse(JSON.stringify(allBoxes)));
    if (undoStack.length > MAX_UNDO) undoStack.shift();
  }

  window.occTriggerUndo = function () {
    if (undoStack.length === 0) {
      notify("Nothing to undo");
      return;
    }
    allBoxes = undoStack.pop();
    selectedBoxes = [];
    occCloseEditPanel();
    drawStoredBoxes();
    saveToLocal();
    notify("Undid last action");
  };

  function gotoPage(targetNum, retainHighlight = false) {
    if (!docType) return;
    const safeNum = Math.max(1, Math.min(targetNum, totalPages));
    if (safeNum === pageNum && !retainHighlight) return;

    pageNum = safeNum;
    currentTargetBoxId = null;
    sequentialRevealHistory = [];
    if (!retainHighlight) activeSearchHighlight = "";
    if (currentFileName) localStorage.setItem("tcm_page_" + currentFileName, pageNum);

    occCloseEditPanel();
    hideRatingBasket();
    renderPage(pageNum);
  }

  window.occTogglePageFilter = function () {
    if (!docType) return;
    filterEmptyPages = !filterEmptyPages;
    ["occFilterBtnEdit", "occFilterBtnStudy"].forEach(id => {
      document.getElementById(id)?.classList.toggle("active", filterEmptyPages);
    });
    if (filterEmptyPages && !allBoxes.some(b => b.page === pageNum && b.boxType !== "deleted")) {
      occChangePage(1);
      if (!allBoxes.some(b => b.page === pageNum && b.boxType !== "deleted")) occChangePage(-1);
    }
  };

  window.occChangePage = function (delta) {
    if (!docType) return;
    if (filterEmptyPages) {
      let nextNum = pageNum + delta;
      while (nextNum >= 1 && nextNum <= totalPages) {
        if (allBoxes.some(b => b.page === nextNum && b.boxType !== "deleted")) {
          gotoPage(nextNum);
          return;
        }
        nextNum += delta;
      }
      notify("No more pages with boxes");
    } else {
      gotoPage(pageNum + delta);
    }
  };

  window.occSetTool = function (tool) {
    activeTool = tool;
    ["pan", "draw", "select", "pencil"].forEach(t => {
      document.getElementById(`occ-tool-${t}`)?.classList.toggle("active", t === tool);
    });
  };

  window.occSelectAllOnPage = function () {
    selectedBoxes = allBoxes.filter(b => b.page === pageNum && b.boxType !== "deleted").map(b => b.id);
    drawStoredBoxes();
    showEditPanel();
  };

  window.occRevealAll = function () {
    editBoxesRevealed = true;
    currentTargetBoxId = null;
    document.querySelectorAll('#occOverlay .occlusion-box[data-boxtype="occlusion"]').forEach(b => {
      b.classList.add("revealed");
      b.classList.remove("study-target");
    });
    hideRatingBasket();
    updateStudyStepperLabel();
  };

  window.occHideAll = function () {
    editBoxesRevealed = false;
    sequentialRevealHistory = [];
    currentTargetBoxId = null;
    document.querySelectorAll('#occOverlay .occlusion-box[data-boxtype="occlusion"]').forEach(b => {
      b.classList.remove("revealed", "study-target");
    });
    hideRatingBasket();
    updateStudyStepperLabel();
  };

  window.occResetView = function () {
    if (!docType || !panzoom) return;
    panzoom.zoom(1, { animate: true });
    panzoom.pan(0, 0, { animate: true });
  };

  window.occToggleInvert = function () {
    document.getElementById("occStudioModal")?.classList.toggle("occ-invert-canvas");
  };

  window.occToggleMode = function () {
    if (!docType) return;
    isEditMode = !isEditMode;
    currentTargetBoxId = null;
    const modal = document.getElementById("occStudioModal");

    if (isEditMode) {
      modal.classList.remove("occ-study-mode");
      modal.classList.add("occ-edit-mode");
      document.getElementById("occEditActions").style.display = "flex";
      document.getElementById("occEditToolbar").style.display = "flex";
      document.getElementById("occStudyToolbar").style.display = "none";
      document.getElementById("occModeToggleBtn").innerHTML = '🎓<span class="occ-btn-lbl">Study</span>';
      hideRatingBasket();
      occSetTool("pan");
      editBoxesRevealed = true;
    } else {
      modal.classList.remove("occ-edit-mode");
      modal.classList.add("occ-study-mode");
      occCloseEditPanel();
      hideRatingBasket();
      activeSearchHighlight = "";
      document.getElementById("occEditActions").style.display = "none";
      document.getElementById("occEditToolbar").style.display = "none";
      document.getElementById("occStudyToolbar").style.display = "flex";
      document.getElementById("occModeToggleBtn").innerHTML = '✏️<span class="occ-btn-lbl">Edit</span>';
    }

    adjustOccLayout();
    drawStoredBoxes();
    updateStudyStepperLabel();
  };

  // --- 6. BOX RENDERING & STUDY ENGINE ---
  function getBoxColor(points) {
    const pts = points || 0;
    if (pts < 2) return "var(--occ-red)";
    if (pts >= 2 && pts < 3) return "var(--occ-yellow)";
    return "var(--occ-green)";
  }

  function getBoxStatusText(points, boxType) {
    if (boxType === "note") return "Sticky Note";
    if (boxType === "drawing") return "Freehand Ink";
    const pts = points || 0;
    if (pts < 2) return `Score: ${pts} • Needs Review (Red)`;
    if (pts >= 2 && pts < 3) return `Score: ${pts} • Learning (Yellow)`;
    return `Score: ${pts} • Mastered (Green)`;
  }

  function isBoxFilteredOutInStudy(boxData) {
    if (isEditMode || boxData.boxType !== "occlusion") return false;
    const pts = boxData.points || 0;
    if (studyFilterMode === "unmastered" && pts >= 3) return true;
    if (studyFilterMode === "red" && pts >= 2) return true;
    return false;
  }

  window.occCycleStudyFilter = function () {
    const order = ["all", "unmastered", "red"];
    const labels = {
      all: "🎯 Filter: All",
      unmastered: "🎯 Filter: Red + Yellow",
      red: "🎯 Filter: Red Only"
    };
    studyFilterMode = order[(order.indexOf(studyFilterMode) + 1) % order.length];
    document.getElementById("occStudyFilterPill").innerText = labels[studyFilterMode];
    currentTargetBoxId = null;
    hideRatingBasket();
    drawStoredBoxes();
  };

  window.occResetPageScores = function () {
    if (!confirm("Reset all mastery scores on this page back to 0 (Red)?")) return;
    saveStateForUndo();
    allBoxes.forEach(b => {
      if (b.page === pageNum && b.boxType === "occlusion") b.points = 0;
    });
    drawStoredBoxes();
    saveToLocal();
    notify("Page scores reset");
  };

  function autoFitHintText(hintElement) {
    if (!hintElement) return;
    const isLargeScreen = window.innerWidth > 600;
    let size = isLargeScreen ? 15 : 11;
    const minSize = isLargeScreen ? 8 : 6;
    hintElement.style.fontSize = size + "px";
    while ((hintElement.scrollHeight > hintElement.clientHeight || hintElement.scrollWidth > hintElement.clientWidth) && size > minSize) {
      size -= 0.5;
      hintElement.style.fontSize = size + "px";
    }
  }

  function updateMasteryCounters() {
    const pageOcc = allBoxes.filter(b => b.page === pageNum && b.boxType === "occlusion");
    let r = 0, y = 0, g = 0;
    pageOcc.forEach(b => {
      const pts = b.points || 0;
      if (pts < 2) r++;
      else if (pts < 3) y++;
      else g++;
    });
    document.getElementById("occStatRed").innerText = r;
    document.getElementById("occStatYellow").innerText = y;
    document.getElementById("occStatGreen").innerText = g;
  }

  function drawStoredBoxes() {
    const overlay = document.getElementById("occOverlay");
    if (!overlay) return;

    const previouslyRevealedIds = new Set(
      Array.from(overlay.querySelectorAll(".occlusion-box.revealed")).map(el => el.dataset.id)
    );

    Array.from(overlay.children).forEach(child => {
      if (!child.classList.contains("search-highlight") && !child.classList.contains("marquee-box")) {
        child.remove();
      }
    });

    let boxesOnPage = 0;

    allBoxes.filter(b => b.page === pageNum && b.boxType !== "deleted").forEach(data => {
      boxesOnPage++;

      if (data.boxType === "drawing") {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "occlusion-box");
        svg.style.left = data.left || "0%";
        svg.style.top = data.top || "0%";
        svg.style.width = data.width || "100%";
        svg.style.height = data.height || "100%";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.border = "none";
        svg.style.background = "transparent";

        svg.setAttribute("viewBox", `0 0 ${overlay.offsetWidth || 800} ${overlay.offsetHeight || 1000}`);
        svg.setAttribute("preserveAspectRatio", "none");
        svg.dataset.id = data.id;
        svg.dataset.boxtype = "drawing";

        const hitBoxPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        hitBoxPath.setAttribute("d", data.pathData);
        hitBoxPath.setAttribute("stroke", "transparent");
        hitBoxPath.setAttribute("stroke-width", "32");
        hitBoxPath.setAttribute("fill", "none");
        hitBoxPath.setAttribute("stroke-linecap", "round");
        hitBoxPath.setAttribute("stroke-linejoin", "round");
        hitBoxPath.style.pointerEvents = isEditMode ? "stroke" : "none";

        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", data.pathData);
        pathElement.setAttribute("stroke", selectedBoxes.includes(data.id) && isEditMode ? "#007aff" : "rgba(255, 59, 48, 0.92)");
        pathElement.setAttribute("stroke-width", "4");
        pathElement.setAttribute("fill", "none");
        pathElement.setAttribute("stroke-linecap", "round");
        pathElement.setAttribute("stroke-linejoin", "round");
        pathElement.style.pointerEvents = "none";

        svg.appendChild(hitBoxPath);
        svg.appendChild(pathElement);
        overlay.appendChild(svg);
        return;
      }

      const box = document.createElement("div");
      box.className = "occlusion-box";

      const isSelected = selectedBoxes.includes(data.id) && isEditMode;
      if (isSelected) box.classList.add("selected");

      if (isEditMode && editBoxesRevealed && data.boxType !== "note") {
        box.classList.add("revealed");
      } else if (!isEditMode && previouslyRevealedIds.has(data.id)) {
        box.classList.add("revealed");
      }

      if (isBoxFilteredOutInStudy(data)) {
        box.classList.add("filtered-out", "revealed");
      }

      if (!isEditMode && currentTargetBoxId === data.id) {
        box.classList.add("study-target");
      }

      box.style.left = data.left;
      box.style.top = data.top;
      box.style.width = data.width;
      box.style.height = data.height;
      box.dataset.id = data.id;
      box.dataset.group = data.group || "";
      box.dataset.boxtype = data.boxType || "occlusion";

      if (box.dataset.boxtype === "occlusion") {
        const boxColor = getBoxColor(data.points);
        box.style.backgroundColor = boxColor;
        box.style.borderColor = boxColor;
      }

      if (data.hint) {
        const safeHint = String(data.hint).replace(/\n/g, "<br>");
        box.innerHTML += `<span class="hint-text">${safeHint}</span>`;
      }

      if (data.group && box.dataset.boxtype === "occlusion") {
        box.innerHTML += `<div class="group-badge">${data.group}</div>`;
      }

      if (isSelected && selectedBoxes.length === 1) {
        ["nw", "n", "ne", "e", "se", "s", "sw", "w"].forEach(dir => {
          const h = document.createElement("div");
          h.className = `resize-handle ${dir}`;
          h.dataset.handle = dir;
          h.dataset.id = data.id;
          box.appendChild(h);
        });
      }

      overlay.appendChild(box);
      const hintEl = box.querySelector(".hint-text");
      if (hintEl) autoFitHintText(hintEl);
    });

    document.getElementById("occBoxCounter").innerText = boxesOnPage > 0 ? `(${boxesOnPage})` : "";
    updateMasteryCounters();
    updateStudyStepperLabel();
  }

  function triggerStudyReveal(boxElement, data) {
    if (!boxElement || !data || data.boxType === "note") return;
    const overlay = document.getElementById("occOverlay");

    let boxesToReveal = [];
    if (data.group) {
      const safeGroup = CSS.escape(data.group);
      boxesToReveal = Array.from(overlay.querySelectorAll(`.occlusion-box[data-group="${safeGroup}"]`));
    } else {
      boxesToReveal = [boxElement];
    }

    const isCurrentlyRevealed = boxElement.classList.contains("revealed");
    overlay.querySelectorAll(".occlusion-box.study-target").forEach(el => el.classList.remove("study-target"));
    currentTargetBoxId = null;

    if (isCurrentlyRevealed) {
      boxesToReveal.forEach(b => b.classList.remove("revealed"));
      hideRatingBasket();
    } else {
      boxesToReveal.forEach(b => b.classList.add("revealed"));
      sequentialRevealHistory.push(boxesToReveal);

      if (ratingEnabled) {
        currentlyRatingGroup = data.group
          ? { isGroup: true, id: data.group, anchorEl: boxElement }
          : { isGroup: false, id: data.id, anchorEl: boxElement };
        showRatingBasket(boxElement);
      }
    }
    updateStudyStepperLabel();
  }

  function getRemainingHiddenBoxes() {
    const overlay = document.getElementById("occOverlay");
    const boxesOnPage = allBoxes.filter(b =>
      b.page === pageNum &&
      b.boxType === "occlusion" &&
      !isBoxFilteredOutInStudy(b)
    );
    return boxesOnPage.filter(b => {
      const domEl = overlay?.querySelector(`.occlusion-box[data-id="${b.id}"]`);
      return domEl && !domEl.classList.contains("revealed");
    }).sort((a, b) => {
      const topA = parseFloat(a.top), topB = parseFloat(b.top);
      const leftA = parseFloat(a.left), leftB = parseFloat(b.left);
      if (Math.abs(topA - topB) < 2.8) return leftA - leftB;
      return topA - topB;
    });
  }

  function updateStudyStepperLabel() {
    const btn = document.getElementById("occStepperMainBtn");
    if (!btn || isEditMode) return;
    const hidden = getRemainingHiddenBoxes();
    if (hidden.length === 0) {
      btn.innerHTML = "🎉 Page Complete (Reset)";
    } else if (currentTargetBoxId) {
      btn.innerHTML = "👁️ Reveal Target (Space)";
    } else {
      btn.innerHTML = `▶️ Focus Next (${hidden.length} left)`;
    }
  }

  window.occHandleSequentialStep = function () {
    const hidden = getRemainingHiddenBoxes();
    if (hidden.length === 0) {
      occHideAll();
      return;
    }
    if (currentTargetBoxId) {
      const targetData = allBoxes.find(b => b.id === currentTargetBoxId);
      const targetEl = document.querySelector(`#occOverlay .occlusion-box[data-id="${currentTargetBoxId}"]`);
      if (targetData && targetEl && !targetEl.classList.contains("revealed")) {
        triggerStudyReveal(targetEl, targetData);
        return;
      }
    }
    focusTargetBox(hidden[0]);
  };

  function focusTargetBox(boxData) {
    hideRatingBasket();
    document.querySelectorAll("#occOverlay .occlusion-box.study-target").forEach(el => el.classList.remove("study-target"));
    currentTargetBoxId = boxData.id;
    const targetEl = document.querySelector(`#occOverlay .occlusion-box[data-id="${boxData.id}"]`);
    if (targetEl) targetEl.classList.add("study-target");
    updateStudyStepperLabel();
  }

  function showRatingBasket(boxElement) {
    const basket = document.getElementById("occRatingBasket");
    if (window.innerWidth <= 600) {
      basket.style.left = "50%";
      basket.style.top = "auto";
      basket.style.bottom = "78px";
    } else if (boxElement) {
      const rect = boxElement.getBoundingClientRect();
      let leftPos = rect.left + rect.width / 2;
      let topPos = rect.bottom + 12;
      if (topPos + 60 > window.innerHeight) topPos = Math.max(120, rect.top - 56);
      const safeMargin = 160;
      leftPos = Math.max(safeMargin, Math.min(window.innerWidth - safeMargin, leftPos));
      basket.style.left = leftPos + "px";
      basket.style.top = topPos + "px";
      basket.style.bottom = "auto";
    }
    basket.classList.add("visible");
  }

  function hideRatingBasket() {
    document.getElementById("occRatingBasket")?.classList.remove("visible");
    currentlyRatingGroup = null;
  }

  window.occSubmitRating = function (addedPoints) {
    if (!currentlyRatingGroup) return;

    allBoxes.forEach(box => {
      if (box.page !== pageNum || box.boxType === "deleted") return;
      const matches = currentlyRatingGroup.isGroup
        ? box.group === currentlyRatingGroup.id
        : box.id === currentlyRatingGroup.id;

      if (matches && box.boxType === "occlusion") {
        if (addedPoints === 0) box.points = 0;
        else box.points = (box.points || 0) + addedPoints;

        const domBox = document.querySelector(`#occOverlay .occlusion-box[data-id="${box.id}"]`);
        if (domBox) {
          const newColor = getBoxColor(box.points);
          domBox.style.backgroundColor = newColor;
          domBox.style.borderColor = newColor;
        }
      }
    });

    updateMasteryCounters();
    saveToLocal();
    hideRatingBasket();

    const remaining = getRemainingHiddenBoxes();
    if (remaining.length > 0) focusTargetBox(remaining[0]);
    else updateStudyStepperLabel();
  };

  window.occHandleUndoReveal = function () {
    if (sequentialRevealHistory.length === 0) return;
    const lastRevealedElements = sequentialRevealHistory.pop();
    lastRevealedElements.forEach(el => el.classList.remove("revealed", "study-target"));
    if (lastRevealedElements[0]) {
      const id = lastRevealedElements[0].dataset.id;
      const bData = allBoxes.find(b => b.id === id);
      if (bData) focusTargetBox(bData);
    }
    hideRatingBasket();
    updateStudyStepperLabel();
  };

  window.occToggleRatingMode = function () {
    ratingEnabled = !ratingEnabled;
    const btn = document.getElementById("occToggleRatingBtn");
    if (btn) {
      btn.classList.toggle("active", ratingEnabled);
      btn.innerText = ratingEnabled ? "⭐ Rate: ON" : "⭐ Rate: OFF";
      if (!ratingEnabled) hideRatingBasket();
    }
  };

  // --- 7. UNIFIED 1-FINGER & 2-FINGER PAN / PINCH-ZOOM / DRAW ENGINE ---
  let interactionMode = null;
  let resizeHandleDir = null;
  let clickStartX = 0, clickStartY = 0;
  let panOriginX = 0, panOriginY = 0;
  let boxStartLeft = 0, boxStartTop = 0, boxStartWidth = 0, boxStartHeight = 0;
  let singleActionTarget = null;
  let tempNode = null;
  let currentPathData = "";
  let lastDrawingTime = 0;
  let lastDrawingId = null;

  const activeTouches = new Map();
  let wasMultiTouchGesture = false;
  let pinchStartMidX = 0, pinchStartMidY = 0, pinchStartDist = 0;
  let pinchStartScale = 1, pinchStartPanX = 0, pinchStartPanY = 0;
  let pinchOriginCenterX = 0, pinchOriginCenterY = 0;
  let isSpacebarHeld = false;

  function cancelTempInteraction() {
    if (tempNode) {
      tempNode.remove();
      tempNode = null;
      if (interactionMode === "draw" || interactionMode === "pencil") undoStack.pop();
    } else if ((interactionMode === "move" || interactionMode === "resize") && singleActionTarget) {
      const box = allBoxes.find(b => b.id === singleActionTarget);
      if (box) {
        box.left = boxStartLeft.toFixed(2) + "%";
        box.top = boxStartTop.toFixed(2) + "%";
        if (interactionMode === "resize") {
          box.width = boxStartWidth.toFixed(2) + "%";
          box.height = boxStartHeight.toFixed(2) + "%";
        }
      }
      undoStack.pop();
      drawStoredBoxes();
    }
    singleActionTarget = null;
    resizeHandleDir = null;
  }

  function initPinchPanState() {
    const pts = Array.from(activeTouches.values());
    if (pts.length < 2 || !panzoom) return;
    pinchStartMidX = (pts[0].x + pts[1].x) / 2;
    pinchStartMidY = (pts[0].y + pts[1].y) / 2;
    pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    pinchStartScale = panzoom.getScale();
    const curPan = panzoom.getPan();
    pinchStartPanX = curPan.x;
    pinchStartPanY = curPan.y;
    const container = document.getElementById("occContainer");
    const rect = container.getBoundingClientRect();
    pinchOriginCenterX = (rect.left + rect.width / 2) - pinchStartScale * pinchStartPanX;
    pinchOriginCenterY = (rect.top + rect.height / 2) - pinchStartScale * pinchStartPanY;
  }

  function handleWorkspacePointerDown(e) {
    if (!isOcclusionModalOpen() || !docType || !panzoom) return;
    if (
      e.target.closest("#occEditPanel") ||
      e.target.closest("#occRatingBasket") ||
      e.target.closest("#occStudyStepper") ||
      e.target.closest("#occEmptyState")
    ) {
      return;
    }

    const basket = document.getElementById("occRatingBasket");
    if (basket && basket.classList.contains("visible") && !e.target.closest(".occlusion-box")) {
      hideRatingBasket();
    }

    if (e.pointerType === "touch") {
      activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activeTouches.size >= 2) {
        e.preventDefault();
        wasMultiTouchGesture = true;
        cancelTempInteraction();
        interactionMode = "pinch-pan";
        initPinchPanState();
        return;
      }
    }

    const clickedHandle = e.target.closest(".resize-handle");
    const clickedBox = e.target.closest(".occlusion-box");
    const overlay = document.getElementById("occOverlay");
    const workspace = document.getElementById("occWorkspace");

    clickStartX = e.clientX;
    clickStartY = e.clientY;

    if (!isEditMode) {
      e.preventDefault();
      const curPan = panzoom.getPan();
      panOriginX = curPan.x;
      panOriginY = curPan.y;
      singleActionTarget = clickedBox ? clickedBox.dataset.id : null;
      interactionMode = "pan-canvas";
      return;
    }

    if (clickedHandle) {
      e.preventDefault();
      saveStateForUndo();
      interactionMode = "resize";
      resizeHandleDir = clickedHandle.dataset.handle;
      singleActionTarget = clickedHandle.dataset.id;
      const bData = allBoxes.find(b => b.id === singleActionTarget);
      boxStartLeft = parseFloat(bData.left);
      boxStartTop = parseFloat(bData.top);
      boxStartWidth = parseFloat(bData.width);
      boxStartHeight = parseFloat(bData.height);
      return;
    }

    if (activeTool === "pan" || e.button === 1 || isSpacebarHeld || (e.shiftKey && !clickedBox)) {
      e.preventDefault();
      const curPan = panzoom.getPan();
      panOriginX = curPan.x;
      panOriginY = curPan.y;
      singleActionTarget = clickedBox ? clickedBox.dataset.id : null;
      interactionMode = "pan-canvas";
      workspace.style.cursor = "grabbing";
      return;
    }

    const rect = overlay.getBoundingClientRect();
    const scale = panzoom.getScale();

    if (activeTool === "pencil") {
      e.preventDefault();
      interactionMode = "pencil";
      saveStateForUndo();

      const startX = (e.clientX - rect.left) / scale;
      const startY = (e.clientY - rect.top) / scale;
      currentPathData = `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;

      tempNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tempNode.setAttribute("class", "occlusion-box temp-drawing");
      tempNode.style.width = "100%";
      tempNode.style.height = "100%";
      tempNode.style.left = "0";
      tempNode.style.top = "0";
      tempNode.style.pointerEvents = "none";
      tempNode.style.border = "none";
      tempNode.style.background = "transparent";

      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("d", currentPathData);
      pathEl.setAttribute("stroke", "rgba(255, 59, 48, 0.92)");
      pathEl.setAttribute("stroke-width", "4");
      pathEl.setAttribute("fill", "none");
      pathEl.setAttribute("stroke-linecap", "round");
      pathEl.setAttribute("stroke-linejoin", "round");

      tempNode.appendChild(pathEl);
      overlay.appendChild(tempNode);
      return;
    }

    if (clickedBox) {
      e.preventDefault();
      const boxId = clickedBox.dataset.id;

      if (activeTool === "select" || e.shiftKey) {
        const idx = selectedBoxes.indexOf(boxId);
        if (idx > -1) selectedBoxes.splice(idx, 1);
        else selectedBoxes.push(boxId);
        interactionMode = null;
        drawStoredBoxes();
        showEditPanel();
        return;
      }

      saveStateForUndo();
      selectedBoxes = [boxId];
      singleActionTarget = boxId;
      interactionMode = "move";
      const bData = allBoxes.find(b => b.id === boxId);
      boxStartLeft = parseFloat(bData.left);
      boxStartTop = parseFloat(bData.top);
      boxStartWidth = parseFloat(bData.width);
      boxStartHeight = parseFloat(bData.height);
      drawStoredBoxes();
      showEditPanel();
      return;
    }

    if (activeTool === "draw") {
      e.preventDefault();
      interactionMode = "draw";
      saveStateForUndo();
      selectedBoxes = [];
      hideEditPanel();
      drawStoredBoxes();

      boxStartLeft = (e.clientX - rect.left) / scale;
      boxStartTop = (e.clientY - rect.top) / scale;

      tempNode = document.createElement("div");
      tempNode.className = "occlusion-box temp";
      if (editBoxesRevealed) tempNode.classList.add("revealed");
      tempNode.style.left = boxStartLeft + "px";
      tempNode.style.top = boxStartTop + "px";
      tempNode.style.width = "0px";
      tempNode.style.height = "0px";
      tempNode.style.backgroundColor = "var(--occ-red)";
      tempNode.style.borderColor = "var(--occ-red)";
      overlay.appendChild(tempNode);
    } else if (activeTool === "select") {
      e.preventDefault();
      interactionMode = "marquee";
      selectedBoxes = [];
      hideEditPanel();
      drawStoredBoxes();

      boxStartLeft = (e.clientX - rect.left) / scale;
      boxStartTop = (e.clientY - rect.top) / scale;

      tempNode = document.createElement("div");
      tempNode.className = "marquee-box";
      tempNode.style.left = boxStartLeft + "px";
      tempNode.style.top = boxStartTop + "px";
      tempNode.style.width = "0px";
      tempNode.style.height = "0px";
      overlay.appendChild(tempNode);
    }
  }

  function handleWorkspacePointerMove(e) {
    if (!isOcclusionModalOpen() || !panzoom) return;
    if (e.pointerType === "touch" && activeTouches.has(e.pointerId)) {
      activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }
    if (!interactionMode) return;

    if (interactionMode === "pinch-pan") {
      if (activeTouches.size < 2) return;
      e.preventDefault();
      const pts = Array.from(activeTouches.values());
      const curMidX = (pts[0].x + pts[1].x) / 2;
      const curMidY = (pts[0].y + pts[1].y) / 2;
      const curDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);

      const distRatio = pinchStartDist > 15 ? curDist / pinchStartDist : 1;
      const newScale = Math.max(0.25, Math.min(6, pinchStartScale * distRatio));

      const newPanX = pinchStartPanX + (curMidX - pinchOriginCenterX) / newScale - (pinchStartMidX - pinchOriginCenterX) / pinchStartScale;
      const newPanY = pinchStartPanY + (curMidY - pinchOriginCenterY) / newScale - (pinchStartMidY - pinchOriginCenterY) / pinchStartScale;

      panzoom.zoom(newScale, { animate: false });
      panzoom.pan(newPanX, newPanY, { animate: false });
      return;
    }

    if (interactionMode === "pan-canvas") {
      if (wasMultiTouchGesture) return;
      e.preventDefault();
      const scale = panzoom.getScale();
      const dx = (e.clientX - clickStartX) / scale;
      const dy = (e.clientY - clickStartY) / scale;
      panzoom.pan(panOriginX + dx, panOriginY + dy, { animate: false });
      return;
    }

    const overlay = document.getElementById("occOverlay");
    const scale = panzoom.getScale();
    const rect = overlay.getBoundingClientRect();

    if (interactionMode === "pencil" && tempNode) {
      e.preventDefault();
      const curX = (e.clientX - rect.left) / scale;
      const curY = (e.clientY - rect.top) / scale;
      currentPathData += ` L ${curX.toFixed(1)} ${curY.toFixed(1)}`;
      tempNode.querySelector("path").setAttribute("d", currentPathData);
      return;
    }

    const dx = (e.clientX - clickStartX) / scale;
    const dy = (e.clientY - clickStartY) / scale;
    const dxPct = (dx / overlay.offsetWidth) * 100;
    const dyPct = (dy / overlay.offsetHeight) * 100;

    if (interactionMode === "move" && singleActionTarget) {
      e.preventDefault();
      const box = allBoxes.find(b => b.id === singleActionTarget);
      if (!box) return;
      box.left = Math.max(0, Math.min(99, boxStartLeft + dxPct)).toFixed(2) + "%";
      box.top = Math.max(0, Math.min(99, boxStartTop + dyPct)).toFixed(2) + "%";
      const domEl = overlay.querySelector(`.occlusion-box[data-id="${singleActionTarget}"]`);
      if (domEl) {
        domEl.style.left = box.left;
        domEl.style.top = box.top;
      }
      return;
    }

    if (interactionMode === "resize" && singleActionTarget) {
      e.preventDefault();
      const box = allBoxes.find(b => b.id === singleActionTarget);
      if (!box) return;
      let newL = boxStartLeft, newT = boxStartTop, newW = boxStartWidth, newH = boxStartHeight;

      if (resizeHandleDir.includes("e")) newW = Math.max(1.2, boxStartWidth + dxPct);
      if (resizeHandleDir.includes("s")) newH = Math.max(1.0, boxStartHeight + dyPct);
      if (resizeHandleDir.includes("w")) {
        const possibleW = boxStartWidth - dxPct;
        if (possibleW >= 1.2) { newW = possibleW; newL = boxStartLeft + dxPct; }
      }
      if (resizeHandleDir.includes("n")) {
        const possibleH = boxStartHeight - dyPct;
        if (possibleH >= 1.0) { newH = possibleH; newT = boxStartTop + dyPct; }
      }

      box.left = newL.toFixed(2) + "%";
      box.top = newT.toFixed(2) + "%";
      box.width = newW.toFixed(2) + "%";
      box.height = newH.toFixed(2) + "%";

      const domEl = overlay.querySelector(`.occlusion-box[data-id="${singleActionTarget}"]`);
      if (domEl) {
        domEl.style.left = box.left;
        domEl.style.top = box.top;
        domEl.style.width = box.width;
        domEl.style.height = box.height;
        const hintEl = domEl.querySelector(".hint-text");
        if (hintEl) autoFitHintText(hintEl);
      }
      return;
    }

    if ((interactionMode === "draw" || interactionMode === "marquee") && tempNode) {
      e.preventDefault();
      const curX = boxStartLeft + dx;
      const curY = boxStartTop + dy;
      tempNode.style.width = Math.abs(curX - boxStartLeft) + "px";
      tempNode.style.height = Math.abs(curY - boxStartTop) + "px";
      tempNode.style.left = Math.min(curX, boxStartLeft) + "px";
      tempNode.style.top = Math.min(curY, boxStartTop) + "px";
    }
  }

  function handleWorkspacePointerUp(e) {
    if (!isOcclusionModalOpen() || !panzoom) return;
    const overlay = document.getElementById("occOverlay");
    const workspace = document.getElementById("occWorkspace");

    if (e && e.pointerType === "touch") {
      activeTouches.delete(e.pointerId);
      if (wasMultiTouchGesture) {
        if (activeTouches.size >= 2) {
          initPinchPanState();
        } else if (activeTouches.size === 1) {
          if (!isEditMode || activeTool === "pan") {
            const rem = Array.from(activeTouches.values())[0];
            clickStartX = rem.x;
            clickStartY = rem.y;
            const curPan = panzoom.getPan();
            panOriginX = curPan.x;
            panOriginY = curPan.y;
            wasMultiTouchGesture = false;
            singleActionTarget = null;
            interactionMode = "pan-canvas";
          }
        } else if (activeTouches.size === 0) {
          wasMultiTouchGesture = false;
          interactionMode = null;
        }
        return;
      }
    }

    if (!interactionMode) return;
    const finishedMode = interactionMode;
    const targetId = singleActionTarget;
    interactionMode = null;
    resizeHandleDir = null;
    singleActionTarget = null;
    if (workspace) workspace.style.cursor = isSpacebarHeld ? "grab" : "";

    if (finishedMode === "pan-canvas") {
      if (Math.hypot(e.clientX - clickStartX, e.clientY - clickStartY) < 8) {
        if (!isEditMode && targetId) {
          const boxData = allBoxes.find(b => b.id === targetId);
          const boxEl = overlay.querySelector(`.occlusion-box[data-id="${targetId}"]`);
          if (boxData && boxEl && boxData.boxType !== "note") {
            triggerStudyReveal(boxEl, boxData);
          }
        } else if (isEditMode && activeTool === "pan") {
          if (targetId) {
            selectedBoxes = [targetId];
            drawStoredBoxes();
            showEditPanel();
          } else {
            selectedBoxes = [];
            drawStoredBoxes();
            occCloseEditPanel();
          }
        }
      }
      return;
    }

    if (finishedMode === "move" || finishedMode === "resize") {
      saveToLocal();
      return;
    }

    if (finishedMode === "pencil") {
      if (!tempNode) return;
      const now = Date.now();
      if (now - lastDrawingTime < 1500 && lastDrawingId) {
        const lastDrawing = allBoxes.find(b => b.id === lastDrawingId && b.page === pageNum && b.left === "0%");
        if (lastDrawing && lastDrawing.boxType === "drawing") {
          lastDrawing.pathData += " " + currentPathData;
          lastDrawingTime = now;
          tempNode.remove();
          tempNode = null;
          drawStoredBoxes();
          saveToLocal();
          return;
        }
      }

      const newId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
      allBoxes.push({
        id: newId,
        page: pageNum,
        left: "0%", top: "0%", width: "100%", height: "100%",
        pathData: currentPathData,
        boxType: "drawing",
        points: 0
      });
      lastDrawingId = newId;
      lastDrawingTime = now;
      tempNode.remove();
      tempNode = null;
      drawStoredBoxes();
      saveToLocal();
      return;
    }

    if (finishedMode === "marquee" && tempNode) {
      const mLeft = (parseFloat(tempNode.style.left) / overlay.offsetWidth) * 100;
      const mTop = (parseFloat(tempNode.style.top) / overlay.offsetHeight) * 100;
      const mRight = mLeft + (parseFloat(tempNode.style.width) / overlay.offsetWidth) * 100;
      const mBottom = mTop + (parseFloat(tempNode.style.height) / overlay.offsetHeight) * 100;
      tempNode.remove();
      tempNode = null;

      if (mRight - mLeft > 1 && mBottom - mTop > 1) {
        selectedBoxes = allBoxes.filter(b => {
          if (b.page !== pageNum || b.boxType === "deleted" || b.boxType === "drawing") return false;
          const bL = parseFloat(b.left), bT = parseFloat(b.top);
          const bR = bL + parseFloat(b.width), bB = bT + parseFloat(b.height);
          return !(bL > mRight || bR < mLeft || bT > mBottom || bB < mTop);
        }).map(b => b.id);
        drawStoredBoxes();
        showEditPanel();
      }
      return;
    }

    if (finishedMode === "draw" && tempNode) {
      if (parseFloat(tempNode.style.width) < 6 || parseFloat(tempNode.style.height) < 6) {
        tempNode.remove();
        tempNode = null;
        undoStack.pop();
        return;
      }

      const boxData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        page: pageNum,
        left: (parseFloat(tempNode.style.left) / overlay.offsetWidth * 100).toFixed(2) + "%",
        top: (parseFloat(tempNode.style.top) / overlay.offsetHeight * 100).toFixed(2) + "%",
        width: (parseFloat(tempNode.style.width) / overlay.offsetWidth * 100).toFixed(2) + "%",
        height: (parseFloat(tempNode.style.height) / overlay.offsetHeight * 100).toFixed(2) + "%",
        hint: "",
        group: "",
        points: 0,
        boxType: "occlusion"
      };

      tempNode.remove();
      tempNode = null;
      allBoxes.push(boxData);
      selectedBoxes = [boxData.id];
      drawStoredBoxes();
      showEditPanel();
      saveToLocal();
    }
  }

  // --- 8. INSPECTOR & AUTO-BOX ---
  function showEditPanel() {
    if (selectedBoxes.length === 0) { hideEditPanel(); return; }
    document.getElementById("occEditPanel").style.display = "flex";
    const hintBox = document.getElementById("occEditHint");

    if (selectedBoxes.length === 1) {
      const data = allBoxes.find(b => b.id === selectedBoxes[0]);
      if (!data) return;
      document.getElementById("occPanelStats").innerText = getBoxStatusText(data.points, data.boxType);
      hintBox.value = data.hint || "";
      document.getElementById("occEditGroup").value = data.group || "";
      document.getElementById("occEditBoxType").value = data.boxType || "occlusion";
      highlightQuickGroupChip(data.group || "");
    } else {
      document.getElementById("occPanelStats").innerText = `${selectedBoxes.length} Boxes Selected`;
      hintBox.value = "";
      document.getElementById("occEditGroup").value = "";
      highlightQuickGroupChip(null);
    }
  }

  function highlightQuickGroupChip(groupVal) {
    document.querySelectorAll("#occEditPanel .occ-group-chip").forEach(btn => {
      const label = btn.innerText === "None" ? "" : btn.innerText;
      btn.classList.toggle("active", groupVal !== null && label === String(groupVal));
    });
  }

  window.occSetQuickGroup = function (groupVal) {
    document.getElementById("occEditGroup").value = groupVal;
    highlightQuickGroupChip(groupVal);
    liveUpdateBox("group", groupVal);
  };

  window.occDuplicateSelected = function () {
    if (selectedBoxes.length === 0) return;
    saveStateForUndo();
    const newSelection = [];
    selectedBoxes.forEach(id => {
      const orig = allBoxes.find(b => b.id === id);
      if (!orig || orig.boxType === "drawing") return;
      const copy = JSON.parse(JSON.stringify(orig));
      copy.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
      copy.left = Math.min(95, parseFloat(orig.left) + 1.5).toFixed(2) + "%";
      copy.top = Math.min(95, parseFloat(orig.top) + 2.0).toFixed(2) + "%";
      allBoxes.push(copy);
      newSelection.push(copy.id);
    });
    if (newSelection.length > 0) {
      selectedBoxes = newSelection;
      drawStoredBoxes();
      showEditPanel();
      saveToLocal();
      notify("Duplicated box");
    }
  };

  function hideEditPanel() {
    const p = document.getElementById("occEditPanel");
    if (p) p.style.display = "none";
  }

  window.occCloseEditPanel = function () {
    selectedBoxes = [];
    hideEditPanel();
    drawStoredBoxes();
  };

  function liveUpdateBox(type, value) {
    if (selectedBoxes.length === 0) return;
    selectedBoxes.forEach(id => {
      const box = allBoxes.find(b => b.id === id);
      if (box) {
        if (type === "hint") box.hint = value;
        if (type === "group") box.group = value;
        if (type === "boxType") box.boxType = value;
      }
    });

    if (selectedBoxes.length === 1 && type === "hint") {
      const targetDom = document.querySelector(`#occOverlay .occlusion-box[data-id="${selectedBoxes[0]}"]`);
      if (targetDom) {
        let hintSpan = targetDom.querySelector(".hint-text");
        if (!hintSpan && value) {
          hintSpan = document.createElement("span");
          hintSpan.className = "hint-text";
          targetDom.appendChild(hintSpan);
        }
        if (hintSpan) {
          if (!value) hintSpan.remove();
          else {
            hintSpan.innerHTML = String(value).replace(/\n/g, "<br>");
            autoFitHintText(hintSpan);
          }
        }
      }
      clearTimeout(liveEditTimer);
      liveEditTimer = setTimeout(() => { drawStoredBoxes(); saveToLocal(); }, 350);
    } else {
      drawStoredBoxes();
      saveToLocal();
    }
  }

  window.occDeleteSelected = function () {
    if (selectedBoxes.length === 0) return;
    saveStateForUndo();
    allBoxes.forEach(b => {
      if (selectedBoxes.includes(b.id)) b.boxType = "deleted";
    });
    selectedBoxes = [];
    occCloseEditPanel();
    saveToLocal();
    drawStoredBoxes();
    notify("Deleted");
  };

  window.occAutoBoxCurrentPage = async function () {
    if (docType !== "pdf" || !pdfDoc) {
      notify("Auto-Box requires a PDF with selectable text");
      return;
    }
    if (!confirm("Automatically generate occlusion boxes over text lines on this page?")) return;

    saveStateForUndo();
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const unscaledViewport = page.getViewport({ scale: 1 });
    const pdfWidth = unscaledViewport.width;
    const pdfHeight = unscaledViewport.height;

    const groupedItems = [];
    textContent.items.forEach(item => {
      if (!item.str || item.str.trim() === "") return;
      const tx = item.transform;
      const x = tx[4], y = tx[5], w = item.width, h = Math.abs(tx[3]) || 12;

      let merged = false;
      for (const g of groupedItems) {
        if (Math.abs(g.y - y) < 4 && (x - g.xMax < 40 && g.xMin - (x + w) < 40)) {
          g.xMin = Math.min(g.xMin, x);
          g.xMax = Math.max(g.xMax, x + w);
          g.h = Math.max(g.h, h);
          g.str += " " + item.str;
          merged = true;
          break;
        }
      }
      if (!merged) groupedItems.push({ xMin: x, xMax: x + w, y, h, str: item.str });
    });

    const pX = 0.2, pY = 0.5, dropOffset = 0.4;
    let newBoxesCount = 0;

    groupedItems.forEach(g => {
      let autoHint = "";
      const match = g.str.match(/^([^:]+):/);
      if (match && match[1].trim().split(" ").length <= 5) {
        autoHint = match[1].trim();
      }

      const textAscent = g.h * 0.75;
      const leftPct = (g.xMin / pdfWidth) * 100;
      const topPct = ((pdfHeight - g.y - textAscent) / pdfHeight) * 100;
      const widthPct = ((g.xMax - g.xMin) / pdfWidth) * 100;
      const heightPct = (g.h / pdfHeight) * 100;

      allBoxes.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        page: pageNum,
        left: Math.max(0, leftPct - pX).toFixed(2) + "%",
        top: Math.max(0, topPct - pY + dropOffset).toFixed(2) + "%",
        width: (widthPct + pX * 2).toFixed(2) + "%",
        height: (heightPct + pY * 2).toFixed(2) + "%",
        hint: autoHint,
        group: "",
        points: 0,
        boxType: "occlusion"
      });
      newBoxesCount++;
    });

    saveToLocal();
    drawStoredBoxes();
    notify(`Created ${newBoxesCount} boxes`);
  };

  // --- 9. INDEXEDDB, FILE LOAD, LIBRARY & GOOGLE SHEETS SYNC ---
  function ensureOccDbOpened() {
    if (db) return Promise.resolve(db);
    return new Promise((resolve) => {
      const dbRequest = indexedDB.open("OcclusionProDB", 3);

      dbRequest.onupgradeneeded = function (e) {
        const d = e.target.result;
        if (!d.objectStoreNames.contains("pdfCache")) d.createObjectStore("pdfCache");
        if (!d.objectStoreNames.contains("boxesCache")) d.createObjectStore("boxesCache");
        if (!d.objectStoreNames.contains("libraryCache")) d.createObjectStore("libraryCache", { keyPath: "name" });
      };

      dbRequest.onsuccess = function (e) {
        db = e.target.result;
        resolve(db);
      };

      dbRequest.onerror = function () {
        resolve(null);
      };
    });
  }

  async function getBoxesFromVault(fileName) {
    return new Promise(resolve => {
      if (!db) return resolve([]);
      const tx = db.transaction("boxesCache", "readonly");
      const req = tx.objectStore("boxesCache").get(fileName);
      req.onsuccess = () => resolve(req.result ? req.result.boxes : []);
      req.onerror = () => resolve([]);
    });
  }

  function saveFileToLibrary(entry) {
    if (!db) return;
    const tx = db.transaction(["pdfCache", "libraryCache"], "readwrite");
    tx.objectStore("pdfCache").put(entry, "currentPdf");
    tx.objectStore("libraryCache").put({ ...entry, updatedAt: Date.now() });
  }

  function autoLoadCachedDoc() {
    if (!db) return;
    const tx = db.transaction("pdfCache", "readonly");
    const req = tx.objectStore("pdfCache").get("currentPdf");
    req.onsuccess = async function () {
      if (req.result) await openStoredEntry(req.result);
    };
  }

  async function openStoredEntry(entry) {
    try {
      if (entry.docType !== "images") {
        const pdfReady = await ensurePdfJsLoaded();
        if (!pdfReady) {
          notify("⚠️ Offline: PDF engine not cached yet. Connect once to load PDFs, or open Photos.");
          return;
        }
      }

      currentFileName = entry.name;
      document.getElementById("occEmptyState").style.display = "none";
      document.getElementById("occContainer").style.display = "block";
      document.getElementById("occLoadBtn").style.display = "none";
      document.getElementById("occCloseFileBtn").style.display = "flex";

      let savedBoxes = await getBoxesFromVault(currentFileName);
      if (!savedBoxes || savedBoxes.length === 0) {
        await new Promise(r => setTimeout(r, 100));
        savedBoxes = await getBoxesFromVault(currentFileName);
      }
      allBoxes = savedBoxes || [];
      allBoxes.forEach(b => {
        if (b.points === undefined) b.points = 0;
        if (!b.boxType) b.boxType = "occlusion";
      });

      const savedPage = localStorage.getItem("tcm_page_" + currentFileName);
      pageNum = savedPage ? parseInt(savedPage, 10) : 1;

      if (entry.docType === "images" && entry.images) {
        docType = "images";
        if (pdfDoc) { pdfDoc.destroy(); pdfDoc = null; }
        imagePages = entry.images.map(img => ({
          name: img.name,
          blob: img.blob,
          url: URL.createObjectURL(img.blob)
        }));
        document.getElementById("occAddPageBtn").style.display = "flex";
        document.getElementById("occAutoBoxPill").style.display = "none";
      } else {
        docType = "pdf";
        imagePages = [];
        document.getElementById("occAddPageBtn").style.display = "none";
        document.getElementById("occAutoBoxPill").style.display = "inline-flex";
        let bufferToLoad = entry.data;
        if (bufferToLoad instanceof Blob) bufferToLoad = await bufferToLoad.arrayBuffer();
        pdfDoc = await window.pdfjsLib.getDocument(new Uint8Array(bufferToLoad)).promise;
      }

      pageCache.clear();
      occSetTool("pan");
      adjustOccLayout();
      await renderPage(Math.min(pageNum, docType === "pdf" ? pdfDoc.numPages : imagePages.length));
      occResetView();
      occSyncFromCloud(true);
    } catch (err) {
      console.error("Failed to open occlusion file:", err);
      notify("⚠️ Could not open file.");
      occCloseDocument();
    }
  }

  async function handleFilesSelected(fileList) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    const first = files[0];

    if (first.type === "application/pdf" || first.name.toLowerCase().endsWith(".pdf")) {
      const arrayBuffer = await first.arrayBuffer();
      const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
      const entry = { name: first.name, docType: "pdf", data: pdfBlob };
      saveFileToLibrary(entry);
      await openStoredEntry(entry);
      notify(`Loaded PDF: ${first.name}`);
    } else {
      const imageFiles = files.filter(f => f.type.startsWith("image/") || /\.(jpe?g|png|webp|gif|bmp|svg)$/i.test(f.name));
      if (imageFiles.length === 0) {
        notify("Please select a PDF or image files (JPEG, PNG, WebP).");
        return;
      }
      const deckName = imageFiles.length === 1
        ? imageFiles[0].name
        : `${imageFiles[0].name.replace(/\.[^.]+$/, "")} (+${imageFiles.length - 1} photos)`;

      const storedImages = imageFiles.map(f => ({
        name: f.name,
        blob: new Blob([f], { type: f.type || "image/png" })
      }));

      const entry = { name: deckName, docType: "images", images: storedImages };
      saveFileToLibrary(entry);
      await openStoredEntry(entry);
      notify(`Loaded ${imageFiles.length} photo${imageFiles.length > 1 ? "s" : ""}`);
    }
  }

  window.occCloseDocument = function () {
    if (currentFileName) saveToLocal();
    if (pdfDoc) { pdfDoc.destroy(); pdfDoc = null; }
    imagePages.forEach(p => { if (p.url) URL.revokeObjectURL(p.url); });
    imagePages = [];
    pageCache.clear();

    docType = null;
    pageNum = 1;
    totalPages = 0;
    allBoxes = [];
    currentFileName = "";
    selectedBoxes = [];
    activeSearchHighlight = "";

    const canvas = document.getElementById("occCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("occOverlay").innerHTML = "";
    document.getElementById("occContainer").style.display = "none";
    document.getElementById("occEmptyState").style.display = "flex";

    document.getElementById("occPageInput").value = 1;
    document.getElementById("occTotalPages").innerText = "0";
    document.getElementById("occBoxCounter").innerText = "";
    updateSubtitle();

    ["occFileUpload", "occEmptyFileUpload", "occAppendImageUpload"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    document.getElementById("occLoadBtn").style.display = "flex";
    document.getElementById("occAddPageBtn").style.display = "none";
    document.getElementById("occCloseFileBtn").style.display = "none";
    hideEditPanel();
    hideRatingBasket();
    if (!isEditMode) occToggleMode();

    if (db) {
      const tx = db.transaction("pdfCache", "readwrite");
      tx.objectStore("pdfCache").delete("currentPdf");
    }
  };

  window.openOccLibraryModal = function () {
    document.getElementById("occLibraryModal").style.display = "flex";
    renderLibraryList();
  };

  window.closeOccLibraryModal = function () {
    document.getElementById("occLibraryModal").style.display = "none";
  };

  function renderLibraryList() {
    const listEl = document.getElementById("occLibraryList");
    if (!db) { listEl.innerHTML = '<div class="occ-list-status">Database unavailable.</div>'; return; }

    const tx = db.transaction("libraryCache", "readonly");
    const req = tx.objectStore("libraryCache").getAll();
    req.onsuccess = async () => {
      const items = (req.result || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      if (items.length === 0) {
        listEl.innerHTML = '<div class="occ-list-status">No cached files yet. Open a PDF or Photo to add it to your library.</div>';
        return;
      }
      let html = "";
      for (const item of items) {
        const boxes = await getBoxesFromVault(item.name);
        const activeCount = (boxes || []).filter(b => b.boxType !== "deleted").length;
        const badge = item.docType === "images" ? `🖼️ ${item.images?.length || 1} Photo(s)` : "📄 PDF";
        const safeName = item.name.replace(/'/g, "\\'");
        html += `
          <div class="occ-list-item" onclick="occLoadFromLibrary('${safeName}')">
            <div style="min-width:0; flex:1;">
              <div style="font-weight:800; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</div>
              <div style="font-size:12px; color:var(--occ-text-sub); margin-top:2px;">${badge} • ${activeCount} boxes</div>
            </div>
            <button class="occ-chip-btn danger" onclick="event.stopPropagation(); occDeleteFromLibrary('${safeName}')">🗑️</button>
          </div>`;
      }
      listEl.innerHTML = html;
    };
  }

  window.occLoadFromLibrary = function (name) {
    if (!db) return;
    const tx = db.transaction("libraryCache", "readonly");
    const req = tx.objectStore("libraryCache").get(name);
    req.onsuccess = async () => {
      if (req.result) {
        saveFileToLibrary(req.result);
        closeOccLibraryModal();
        await openStoredEntry(req.result);
        notify(`Opened ${name}`);
      }
    };
  };

  window.occDeleteFromLibrary = function (name) {
    if (!confirm(`Remove "${name}" from local cached library?`)) return;
    const tx = db.transaction("libraryCache", "readwrite");
    tx.objectStore("libraryCache").delete(name);
    tx.oncomplete = () => renderLibraryList();
  };

  window.occForceSave = function () {
    if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
    pushToCloud(true);
  };

  async function saveToLocal(skipCloudPush = false) {
    if (!currentFileName) return;
    if (db) {
      const tx = db.transaction("boxesCache", "readwrite");
      tx.objectStore("boxesCache").put({ name: currentFileName, boxes: allBoxes }, currentFileName);
    }
    localStorage.setItem("tcm_page_" + currentFileName, pageNum);

    if (!skipCloudPush) {
      const saveBtn = document.getElementById("occSaveCloudBtn");
      if (saveBtn) saveBtn.innerHTML = "⏳";
      clearTimeout(cloudSyncTimer);
      cloudSyncTimer = setTimeout(() => pushToCloud(false), 1800);
    }
  }

  async function pushToCloud(manual = false) {
    if (!navigator.onLine || !currentFileName) {
      if (manual) notify("Offline -- saved locally");
      return;
    }
    try {
      const payload = { pdfName: currentFileName, boxes: allBoxes };
      await fetch(GOOGLE_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      const saveBtn = document.getElementById("occSaveCloudBtn");
      if (saveBtn) saveBtn.innerHTML = "💾";
      cloudSyncTimer = null;
      if (manual) notify("Synced to Google Sheets ☁️");
    } catch (e) {}
  }

  window.occSyncFromCloud = async function (isBackground = false) {
    if (!navigator.onLine || !currentFileName) {
      if (!isBackground) notify("Must be online with a file open to sync");
      return;
    }
    const syncBtn = document.getElementById("occSyncCloudBtn");
    if (syncBtn) syncBtn.innerHTML = "⏳";

    try {
      const url = GOOGLE_WEB_APP_URL + "?pdfName=" + encodeURIComponent(currentFileName);
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.boxes && data.boxes.length > 0) {
        const safeCSS = val => {
          if (val === undefined || val === null || val === "") return "10%";
          if (typeof val === "number") return val * 100 + "%";
          const str = String(val).trim();
          if (str.endsWith("%") || str.endsWith("px")) return str;
          const num = parseFloat(str);
          if (!isNaN(num)) return num <= 2 ? num * 100 + "%" : num + "%";
          return "10%";
        };

        const uniqueBoxes = new Map();
        data.boxes.forEach(b => {
          const boxId = String(b.ID !== undefined ? b.ID : b.id);
          uniqueBoxes.set(boxId, {
            id: boxId,
            page: parseInt(b.Page !== undefined ? b.Page : b.page, 10) || 1,
            left: safeCSS(b.Left !== undefined ? b.Left : b.left),
            top: safeCSS(b.Top !== undefined ? b.Top : b.top),
            width: safeCSS(b.Width !== undefined ? b.Width : b.width),
            height: safeCSS(b.Height !== undefined ? b.Height : b.height),
            hint: (b.Hint !== undefined ? b.Hint : b.hint) || "",
            group: (b.Group !== undefined ? b.Group : b.group) || "",
            points: parseFloat(b.Points !== undefined ? b.Points : b.points) || 0,
            boxType: (b["Box Type"] !== undefined ? b["Box Type"] : b.boxType) || "occlusion",
            pathData: b.pathData || b["Path Data"] || ""
          });
        });

        allBoxes = Array.from(uniqueBoxes.values());
        saveToLocal(true);
        drawStoredBoxes();
        if (!isBackground) notify("Pulled latest boxes from Google Sheets ☁️");
      } else if (!isBackground) {
        notify("No cloud boxes found for this file");
      }
    } catch (e) {
      console.error("Cloud pull failed:", e);
    } finally {
      if (syncBtn) syncBtn.innerHTML = "☁️";
    }
  };

  // Flush any pending occlusion saves if the user switches apps or locks their iPad/iPhone
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && currentFileName && cloudSyncTimer) {
      clearTimeout(cloudSyncTimer);
      pushToCloud(false);
    } else if (document.visibilityState === "visible" && isOcclusionModalOpen() && currentFileName) {
      occSyncFromCloud(true);
    }
  });

  // --- 10. SEARCH SUB-MODAL ---
  window.openOccSearchModal = function () {
    if (!docType) { notify("Load a PDF or Photo first"); return; }
    document.getElementById("occSearchModal").style.display = "flex";
    document.getElementById("occSearchInput").focus();
  };

  window.closeOccSearchModal = function () {
    document.getElementById("occSearchModal").style.display = "none";
  };

  window.occClearAndCloseSearch = function () {
    document.getElementById("occSearchInput").value = "";
    document.getElementById("occSearchResults").innerHTML = '<div class="occ-list-status">Enter a keyword to search all hints and PDF text.</div>';
    activeSearchHighlight = "";
    document.querySelectorAll("#occOverlay .search-highlight").forEach(el => el.remove());
    closeOccSearchModal();
  };

  window.occJumpToSearchResult = function (targetNum, query) {
    activeSearchHighlight = query;
    gotoPage(targetNum, true);
    closeOccSearchModal();
  };

  async function highlightPdfText(query) {
    if (docType !== "pdf" || !pdfDoc || !query) return;
    const overlay = document.getElementById("occOverlay");
    Array.from(overlay.children).forEach(child => {
      if (child.classList.contains("search-highlight")) child.remove();
    });

    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const unscaledViewport = page.getViewport({ scale: 1 });
    const pdfWidth = unscaledViewport.width, pdfHeight = unscaledViewport.height;
    const lowerQuery = query.toLowerCase();

    const groupedItems = [];
    textContent.items.forEach(item => {
      if (!item.str || item.str.trim() === "") return;
      const tx = item.transform;
      const x = tx[4], y = tx[5], w = item.width, h = Math.abs(tx[3]) || 12;
      let merged = false;
      for (const g of groupedItems) {
        if (Math.abs(g.y - y) < 4 && (x - g.xMax < 40 && g.xMin - (x + w) < 40)) {
          g.xMin = Math.min(g.xMin, x); g.xMax = Math.max(g.xMax, x + w); g.h = Math.max(g.h, h);
          g.str += " " + item.str; merged = true; break;
        }
      }
      if (!merged) groupedItems.push({ xMin: x, xMax: x + w, y, h, str: item.str });
    });

    groupedItems.forEach(g => {
      if (g.str.toLowerCase().includes(lowerQuery)) {
        const leftPct = (g.xMin / pdfWidth) * 100;
        const topPct = ((pdfHeight - g.y - g.h) / pdfHeight) * 100;
        const widthPct = ((g.xMax - g.xMin) / pdfWidth) * 100;
        const heightPct = (g.h / pdfHeight) * 100;
        const highlight = document.createElement("div");
        highlight.className = "search-highlight";
        highlight.style.left = `calc(${leftPct}% - 4px)`;
        highlight.style.top = `calc(${topPct}% - 4px)`;
        highlight.style.width = `calc(${widthPct}% + 8px)`;
        highlight.style.height = `calc(${heightPct}% + 8px)`;
        overlay.appendChild(highlight);
      }
    });
  }

  window.occTriggerSearch = async function () {
    const query = document.getElementById("occSearchInput").value.trim();
    if (!query) return;
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(`(${safeQuery})`, "gi");
    const lowerQuery = query.toLowerCase();

    const resContainer = document.getElementById("occSearchResults");
    resContainer.innerHTML = '<div class="occ-list-status">Searching... <span id="occPdfLoader">⏳</span></div>';

    const foundResults = [];
    const highlightStyle = "background-color:#ffcc00; color:#000; font-weight:800; border-radius:3px; padding:0 2px;";

    allBoxes.forEach(b => {
      if (b.boxType === "deleted") return;
      const safeHint = b.hint ? String(b.hint) : "";
      const safeGroup = b.group ? String(b.group) : "";
      if (safeHint.toLowerCase().includes(lowerQuery) || safeGroup.toLowerCase().includes(lowerQuery)) {
        const previewText = safeHint ? safeHint : `Group: ${safeGroup}`;
        foundResults.push({
          page: b.page,
          type: b.boxType === "note" ? "Sticky Note" : "Occlusion Box",
          preview: previewText.replace(searchRegex, `<span style="${highlightStyle}">$1</span>`)
        });
      }
    });

    if (docType === "pdf" && pdfDoc) {
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        if (document.getElementById("occSearchInput").value.trim() !== query) return;
        if (i % 10 === 0) {
          const loader = document.getElementById("occPdfLoader");
          if (loader) loader.innerText = `⏳ (Page ${i}/${pdfDoc.numPages})`;
          await new Promise(r => setTimeout(r, 1));
        }
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map(item => item.str).join(" ");
        const lowerText = text.toLowerCase();
        if (lowerText.includes(lowerQuery)) {
          const idx = lowerText.indexOf(lowerQuery);
          const start = Math.max(0, idx - 40);
          const end = Math.min(text.length, idx + query.length + 40);
          const snippet = (start > 0 ? "..." : "") + text.substring(start, end) + (end < text.length ? "..." : "");
          foundResults.push({
            page: i,
            type: "PDF Text",
            preview: snippet.replace(searchRegex, `<span style="${highlightStyle}">$1</span>`)
          });
        }
      }
    }

    foundResults.sort((a, b) => a.page - b.page);
    if (foundResults.length === 0) {
      resContainer.innerHTML = `<div class="occ-list-status">No matches found for "${query}".</div>`;
      return;
    }

    let html = `<div class="occ-list-item" style="pointer-events:none; font-weight:800; color:var(--occ-accent);">Found ${foundResults.length} Matches</div>`;
    foundResults.forEach(r => {
      html += `
        <div class="occ-list-item" onclick="occJumpToSearchResult(${r.page}, '${query.replace(/'/g, "\\'")}')">
          <div>
            <div style="font-weight:800; margin-bottom:3px;">Page ${r.page} <span style="color:var(--occ-text-sub); font-size:12px; font-weight:normal;">(${r.type})</span></div>
            <div style="color:var(--occ-text-sub); font-size:13px; line-height:1.35;">${r.preview}</div>
          </div>
        </div>`;
    });
    resContainer.innerHTML = html;
  };

  function handleDirectionalReveal(direction) {
    const hiddenBoxes = getRemainingHiddenBoxes();
    if (hiddenBoxes.length === 0) return;

    let currentFocus = null;
    if (currentTargetBoxId) {
      currentFocus = allBoxes.find(b => b.id === currentTargetBoxId);
    } else if (sequentialRevealHistory.length > 0) {
      const lastRevealed = sequentialRevealHistory[sequentialRevealHistory.length - 1];
      if (lastRevealed && lastRevealed[0]) {
        currentFocus = allBoxes.find(b => b.id === lastRevealed[0].dataset.id);
      }
    }

    if (!currentFocus) {
      occHandleSequentialStep();
      return;
    }

    const cX = parseFloat(currentFocus.left) + parseFloat(currentFocus.width) / 2;
    const cY = parseFloat(currentFocus.top) + parseFloat(currentFocus.height) / 2;

    let bestBox = null;
    let minScore = Infinity;

    hiddenBoxes.forEach(b => {
      if (b.id === currentFocus.id) return;
      const bX = parseFloat(b.left) + parseFloat(b.width) / 2;
      const bY = parseFloat(b.top) + parseFloat(b.height) / 2;
      const dx = bX - cX, dy = bY - cY;

      let valid = false, score = 0;
      if (direction === "right" && dx > 0) { valid = true; score = Math.hypot(dx, dy * 3); }
      else if (direction === "left" && dx < 0) { valid = true; score = Math.hypot(dx, dy * 3); }
      else if (direction === "down" && dy > 0) { valid = true; score = Math.hypot(dx * 3, dy); }
      else if (direction === "up" && dy < 0) { valid = true; score = Math.hypot(dx * 3, dy); }

      if (valid && score < minScore) {
        minScore = score;
        bestBox = b;
      }
    });

    if (bestBox) focusTargetBox(bestBox);
  }

  // --- 11. EVENT BINDINGS (STRICTLY SCOPED TO WHEN MODAL IS OPEN) ---
  function bindOcclusionStudioEvents() {
    const container = document.getElementById("occContainer");
    const workspace = document.getElementById("occWorkspace");

    // Initialize built-in zero-dependency pan/zoom controller
    panzoom = createNativePanZoom(container);
    workspace.addEventListener("wheel", panzoom.zoomWithWheel, { passive: false });

    document.querySelectorAll("#occStudioModal .occ-pill-nav, #occStudioModal .occ-insp-bottom").forEach(nav => {
      nav.addEventListener("wheel", e => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          nav.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    });

    window.addEventListener("resize", adjustOccLayout);
    if (window.ResizeObserver) {
      new ResizeObserver(adjustOccLayout).observe(document.getElementById("occHeader"));
    }

    const peekBtn = document.getElementById("occPeekBtn");
    const modal = document.getElementById("occStudioModal");
    if (peekBtn) {
      const startPeek = e => { e.preventDefault(); modal.classList.add("occ-peek-active"); };
      const endPeek = () => modal.classList.remove("occ-peek-active");
      peekBtn.addEventListener("pointerdown", startPeek);
      window.addEventListener("pointerup", endPeek);
      window.addEventListener("pointercancel", endPeek);
    }

    workspace.addEventListener("pointerdown", handleWorkspacePointerDown, { passive: false });
    window.addEventListener("pointermove", handleWorkspacePointerMove, { passive: false });
    window.addEventListener("pointerup", handleWorkspacePointerUp);
    window.addEventListener("pointercancel", handleWorkspacePointerUp);

    document.getElementById("occEditHint").addEventListener("input", e => liveUpdateBox("hint", e.target.value));
    document.getElementById("occEditGroup").addEventListener("input", e => {
      highlightQuickGroupChip(e.target.value);
      liveUpdateBox("group", e.target.value);
    });
    document.getElementById("occEditBoxType").addEventListener("change", e => liveUpdateBox("boxType", e.target.value));

    document.getElementById("occFileUpload").addEventListener("change", e => {
      handleFilesSelected(e.target.files);
      e.target.value = "";
    });
    document.getElementById("occEmptyFileUpload").addEventListener("change", e => {
      handleFilesSelected(e.target.files);
      e.target.value = "";
    });

    document.getElementById("occAppendImageUpload").addEventListener("change", async e => {
      if (docType !== "images" || !e.target.files.length) return;
      const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
      e.target.value = "";
      if (!newFiles.length) return;

      newFiles.forEach(f => {
        const blob = new Blob([f], { type: f.type || "image/png" });
        imagePages.push({ name: f.name, blob, url: URL.createObjectURL(blob) });
      });

      const storedImages = imagePages.map(p => ({ name: p.name, blob: p.blob }));
      saveFileToLibrary({ name: currentFileName, docType: "images", images: storedImages });
      gotoPage(imagePages.length);
      notify(`Added ${newFiles.length} photo page(s)`);
    });

    ["occPageInput", "occSearchInput"].forEach(id => {
      const inputEl = document.getElementById(id);
      if (!inputEl) return;
      if (id !== "occSearchInput") inputEl.addEventListener("change", e => gotoPage(parseInt(e.target.value, 10) || 1));
      inputEl.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (id === "occSearchInput") occTriggerSearch();
          else gotoPage(parseInt(e.target.value, 10) || 1);
          inputEl.blur();
        }
      });
    });

    window.addEventListener("dragover", e => {
      if (!isOcclusionModalOpen()) return;
      e.preventDefault();
      document.getElementById("occDropzoneCard")?.classList.add("drag-over");
    });
    window.addEventListener("dragleave", () => {
      if (!isOcclusionModalOpen()) return;
      document.getElementById("occDropzoneCard")?.classList.remove("drag-over");
    });
    window.addEventListener("drop", e => {
      if (!isOcclusionModalOpen()) return;
      e.preventDefault();
      document.getElementById("occDropzoneCard")?.classList.remove("drag-over");
      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        handleFilesSelected(e.dataTransfer.files);
      }
    });

    window.addEventListener("paste", async e => {
      if (!isOcclusionModalOpen()) return;
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (["input", "textarea"].includes(activeTag)) return;

      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          if (!blob) continue;
          const timestamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
          const fileName = `Clipboard-${timestamp}.png`;

          if (docType === "images") {
            if (confirm("Add pasted image as a new page to current photo set? (Cancel to open as a new separate file)")) {
              imagePages.push({ name: fileName, blob, url: URL.createObjectURL(blob) });
              const storedImages = imagePages.map(p => ({ name: p.name, blob: p.blob }));
              saveFileToLibrary({ name: currentFileName, docType: "images", images: storedImages });
              gotoPage(imagePages.length);
              notify("Pasted photo added as Page " + imagePages.length);
              return;
            }
          }
          const entry = { name: fileName, docType: "images", images: [{ name: fileName, blob }] };
          saveFileToLibrary(entry);
          await openStoredEntry(entry);
          notify("Loaded pasted clipboard image");
          return;
        }
      }
    });

    window.addEventListener("keydown", e => {
      if (!isOcclusionModalOpen()) return;
      if (typeof isQuickPeekOpen === "function" && isQuickPeekOpen()) return;
      if (document.getElementById("compareModal")?.style.display === "flex") return;
      if (document.getElementById("occSearchModal")?.style.display === "flex") return;
      if (document.getElementById("occLibraryModal")?.style.display === "flex") return;

      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (["input", "textarea", "select"].includes(activeTag)) return;

      if (isEditMode && (e.code === "Space" || e.key === " ")) {
        isSpacebarHeld = true;
        workspace.style.cursor = "grab";
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        occTriggerUndo();
        return;
      }
      if (isEditMode && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        occDuplicateSelected();
        return;
      }
      if (isEditMode && (e.key === "Delete" || e.key === "Backspace") && selectedBoxes.length > 0) {
        e.preventDefault();
        occDeleteSelected();
        return;
      }

      if (!isEditMode && e.key.toLowerCase() === "p") {
        modal.classList.add("occ-peek-active");
        return;
      }

      const ratingBasket = document.getElementById("occRatingBasket");
      const isRatingVisible = ratingBasket && ratingBasket.classList.contains("visible");

      if (!isEditMode && isRatingVisible) {
        if (e.key.toLowerCase() === "q" || e.key === "1") { e.preventDefault(); occSubmitRating(0); return; }
        if (e.key.toLowerCase() === "w" || e.key === "2") { e.preventDefault(); occSubmitRating(0.5); return; }
        if (e.key.toLowerCase() === "e" || e.key === "3") { e.preventDefault(); occSubmitRating(1); return; }
      }

      if (e.key === "=" || e.key === "+") { e.preventDefault(); panzoom.zoomIn(); return; }
      if (e.key === "-" || e.key === "_") { e.preventDefault(); panzoom.zoomOut(); return; }

      const panStep = 65;
      if (e.key.toLowerCase() === "w") { e.preventDefault(); const p = panzoom.getPan(); panzoom.pan(p.x, p.y + panStep); return; }
      if (e.key.toLowerCase() === "s") { e.preventDefault(); const p = panzoom.getPan(); panzoom.pan(p.x, p.y - panStep); return; }
      if (e.key.toLowerCase() === "a") { e.preventDefault(); const p = panzoom.getPan(); panzoom.pan(p.x + panStep, p.y); return; }
      if (e.key.toLowerCase() === "d") { e.preventDefault(); const p = panzoom.getPan(); panzoom.pan(p.x - panStep, p.y); return; }

      if (e.key === "ArrowRight" && e.shiftKey) { e.preventDefault(); occChangePage(1); return; }
      if (e.key === "ArrowLeft" && e.shiftKey) { e.preventDefault(); occChangePage(-1); return; }
      if (e.key === "ArrowUp" && e.shiftKey) { e.preventDefault(); occHandleUndoReveal(); return; }

      if (!isEditMode) {
        if (e.key === " " || e.code === "Space") {
          e.preventDefault();
          occHandleSequentialStep();
        } else if (e.key === "ArrowRight" && !e.shiftKey) {
          e.preventDefault(); handleDirectionalReveal("right");
        } else if (e.key === "ArrowLeft" && !e.shiftKey) {
          e.preventDefault(); handleDirectionalReveal("left");
        } else if (e.key === "ArrowDown" && !e.shiftKey) {
          e.preventDefault(); handleDirectionalReveal("down");
        } else if (e.key === "ArrowUp" && !e.shiftKey) {
          e.preventDefault(); handleDirectionalReveal("up");
        }
      }
    });

    window.addEventListener("keyup", e => {
      if (e.code === "Space" || e.key === " ") {
        isSpacebarHeld = false;
        if (workspace) workspace.style.cursor = "";
      }
      if (e.key.toLowerCase() === "p") {
        modal.classList.remove("occ-peek-active");
      }
    });
  }
})();