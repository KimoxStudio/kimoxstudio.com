'use client';

// Extracted verbatim from LandingClient's TeamCardPhoto so the team-grid
// template (TSX) can reuse the exact canvas scratch-erase / 3D-tilt behavior
// without re-typing DOM/canvas code under strict TS. Props unchanged.
import React, { useEffect, useRef, useState } from 'react';

export default function TeamCardPhoto({ initials, index, lang, photoSerious, photoFun, photoFunOffsetY, photoFunScale, objectPositionSerious, objectPositionFun }) {
  const photoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const stateRef = useRef({
    erasing: false,
    hovering: false,
    lastX: null,
    lastY: null,
    rafId: null,
    x: 0,
    y: 0,
  });
  const [imgReady, setImgReady] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Load the "serious" image into memory so we can paint it onto the canvas.
  useEffect(() => {
    if (!photoSerious) return;
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      imgRef.current = img;
      setImgReady(true);
    };
    img.src = photoSerious;
  }, [photoSerious]);

  // Re-paint the serious image to fully cover the canvas (used for initial
  // paint, after resize, and as the "reset" action).
  const paint = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    const desiredW = Math.round(rect.width * dpr);
    const desiredH = Math.round(rect.height * dpr);
    if (canvas.width !== desiredW || canvas.height !== desiredH) {
      canvas.width = desiredW;
      canvas.height = desiredH;
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Replicate CSS object-fit: cover + object-position.
    let posX = 50;
    let posY = 50;
    if (objectPositionSerious) {
      const m = objectPositionSerious.match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
      if (m) {
        posX = parseFloat(m[1]);
        posY = parseFloat(m[2]);
      }
    }
    const cw = rect.width;
    const ch = rect.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) * (posX / 100);
    const dy = (ch - dh) * (posY / 100);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [objectPositionSerious]);

  useEffect(() => {
    if (imgReady) paint();
  }, [imgReady, paint]);

  // Repaint when the photo box is resized (viewport changes, grid reflow).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => paint());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [paint]);

  // Pointer-driven erase + 3D tilt + parallax highlight.
  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;
    const state = stateRef.current;

    const eraseSegment = (clientX, clientY) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 70;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.beginPath();
      if (state.lastX != null) {
        ctx.moveTo(state.lastX, state.lastY);
      } else {
        // Tiny offset so the very first move still strokes a dot.
        ctx.moveTo(px - 0.01, py - 0.01);
      }
      ctx.lineTo(px, py);
      ctx.stroke();
      state.lastX = px;
      state.lastY = py;
      setDirty(true);
    };

    const updateTilt = () => {
      state.rafId = null;
      const r = photo.getBoundingClientRect();
      const rx = Math.max(-1.4, Math.min(1.4, (state.x - (r.left + r.width / 2)) / (r.width / 2)));
      const ry = Math.max(-1.4, Math.min(1.4, (state.y - (r.top + r.height / 2)) / (r.height / 2)));
      photo.style.setProperty('--rx', rx.toFixed(3));
      photo.style.setProperty('--ry', ry.toFixed(3));
    };
    const scheduleTilt = () => {
      if (state.rafId == null) state.rafId = requestAnimationFrame(updateTilt);
    };

    const onEnter = (e) => {
      // Hover only powers the 3D tilt + parallax highlight. Erasing is
      // gated on a button being held (pointerdown).
      state.hovering = true;
      state.x = e.clientX;
      state.y = e.clientY;
      scheduleTilt();
    };
    const onLeave = () => {
      state.hovering = false;
      state.erasing = false;
      state.lastX = null;
      photo.style.setProperty('--rx', '0');
      photo.style.setProperty('--ry', '0');
    };
    const onMove = (e) => {
      if (!state.hovering && !state.erasing) return;
      state.x = e.clientX;
      state.y = e.clientY;
      scheduleTilt();
      if (state.erasing) eraseSegment(e.clientX, e.clientY);
    };
    const onDown = (e) => {
      // Mouse: erase only while primary button is held. Touch / pen:
      // erase while the contact is down.
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      state.erasing = true;
      state.lastX = null;
      state.x = e.clientX;
      state.y = e.clientY;
      eraseSegment(e.clientX, e.clientY);
      if (e.preventDefault) e.preventDefault();
    };
    const onUp = () => {
      state.erasing = false;
      state.lastX = null;
    };
    const blockDrag = (e) => e.preventDefault();

    photo.addEventListener('pointerenter', onEnter);
    photo.addEventListener('pointerleave', onLeave);
    photo.addEventListener('pointermove', onMove);
    photo.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
    photo.addEventListener('dragstart', blockDrag);

    return () => {
      photo.removeEventListener('pointerenter', onEnter);
      photo.removeEventListener('pointerleave', onLeave);
      photo.removeEventListener('pointermove', onMove);
      photo.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
      photo.removeEventListener('dragstart', blockDrag);
      if (state.rafId != null) cancelAnimationFrame(state.rafId);
    };
  }, []);

  const hasPhotos = !!(photoSerious && photoFun);
  const resetLabel = lang === 'ja' ? 'リセット' : lang === 'en' ? 'Reset' : 'Resetear';

  return (
    <div className={`photo${hasPhotos ? ' has-photos' : ''}`} ref={photoRef}>
      {hasPhotos ? (
        <>
          <img
            className="photo-fun"
            src={photoFun}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={(() => {
              const s = {};
              const transforms = [];
              if (photoFunOffsetY) {
                transforms.push(`translateY(${photoFunOffsetY}px)`);
                s.height = `calc(100% + ${Math.abs(photoFunOffsetY)}px)`;
              }
              if (photoFunScale && photoFunScale !== 1) {
                transforms.push(`scale(${photoFunScale})`);
              }
              if (transforms.length) s.transform = transforms.join(' ');
              if (objectPositionFun) s.objectPosition = objectPositionFun;
              return Object.keys(s).length ? s : undefined;
            })()}
          />
          <canvas className="photo-canvas" ref={canvasRef} aria-hidden="true" />
          {dirty && (
            <button
              type="button"
              className="photo-reset"
              onClick={(e) => {
                e.stopPropagation();
                paint();
                setDirty(false);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={resetLabel}
              title={resetLabel}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v5h5" />
              </svg>
            </button>
          )}
        </>
      ) : (
        <>
          <span className="badge">
            {lang === 'ja' ? '写真' : lang === 'en' ? 'PHOTO' : 'FOTO'} 0{index + 1}
          </span>
          <span className="index">REPLACE_ME.JPG</span>
          <div className="stripes"></div>
          <div className="face">
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="mouth"></div>
            <div className="initial">{initials}</div>
          </div>
        </>
      )}
    </div>
  );
}
