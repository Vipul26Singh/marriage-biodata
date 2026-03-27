import { useState, useRef, useEffect, useCallback } from "react";
import "./PhotoEditorModal.css";

const CV = 320, CR = 262; // canvas display size, crop zone size

export default function PhotoEditorModal({ src, onConfirm, onCancel }) {
  const canvasRef = useRef();
  const imgRef    = useRef(null);
  const [shape,  setShape]  = useState("circle");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom,   setZoom]   = useState(1);
  const [angle,  setAngle]  = useState(0);
  const [ready,  setReady]  = useState(false);
  const dragging = useRef(false);
  const last     = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const fit = Math.max(CR / img.naturalWidth, CR / img.naturalHeight) * 1.02;
      setZoom(fit); setOffset({ x:0, y:0 }); setAngle(0); setReady(true);
    };
    img.src = src;
  }, [src]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current || !ready) return;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    ctx.clearRect(0, 0, CV, CV);

    // Draw image with transform
    ctx.save();
    ctx.translate(CV/2 + offset.x, CV/2 + offset.y);
    ctx.rotate(angle);
    ctx.scale(zoom, zoom);
    ctx.drawImage(img, -img.naturalWidth/2, -img.naturalHeight/2);
    ctx.restore();

    // Dark overlay with cutout (even-odd winding)
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.58)";
    ctx.beginPath();
    ctx.rect(0, 0, CV, CV);
    if (shape === "circle") {
      ctx.arc(CV/2, CV/2, CR/2, 0, Math.PI*2, true);
    } else {
      ctx.rect(CV/2 - CR/2, CV/2 - CR/2, CR, CR);
    }
    ctx.fill("evenodd");
    ctx.restore();

    // Crop boundary
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 1.5;
    if (shape === "circle") {
      ctx.beginPath(); ctx.arc(CV/2, CV/2, CR/2, 0, Math.PI*2); ctx.stroke();
    } else {
      ctx.strokeRect(CV/2 - CR/2, CV/2 - CR/2, CR, CR);
    }
    ctx.restore();

    // Rule-of-thirds grid
    ctx.save();
    ctx.beginPath();
    if (shape === "circle") ctx.arc(CV/2, CV/2, CR/2, 0, Math.PI*2);
    else ctx.rect(CV/2 - CR/2, CV/2 - CR/2, CR, CR);
    ctx.clip();
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 0.7;
    for (let i = 1; i < 3; i++) {
      const x = CV/2 - CR/2 + (CR/3)*i;
      const y = CV/2 - CR/2 + (CR/3)*i;
      ctx.beginPath(); ctx.moveTo(x, CV/2-CR/2); ctx.lineTo(x, CV/2+CR/2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(CV/2-CR/2, y); ctx.lineTo(CV/2+CR/2, y); ctx.stroke();
    }
    ctx.restore();
  }, [offset, zoom, angle, shape, ready]);

  useEffect(() => { draw(); }, [draw]);

  const getXY = (e) => e.touches
    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
    : { x: e.clientX, y: e.clientY };

  const onDown = (e) => { e.preventDefault(); dragging.current = true; last.current = getXY(e); };
  const onMove = (e) => {
    e.preventDefault();
    if (!dragging.current) return;
    const p = getXY(e);
    setOffset(o => ({ x: o.x + p.x - last.current.x, y: o.y + p.y - last.current.y }));
    last.current = p;
  };
  const onUp = () => { dragging.current = false; };
  const onWheel = (e) => {
    e.preventDefault();
    setZoom(z => Math.max(0.05, Math.min(20, z * (1 - e.deltaY * 0.001))));
  };

  const confirm = () => {
    const OUT = 400;
    const ec = document.createElement("canvas");
    ec.width = OUT; ec.height = OUT;
    const ectx = ec.getContext("2d");
    const img = imgRef.current;
    const f = OUT / CR; // display-crop-size -> output-size scale
    if (shape === "circle") {
      ectx.beginPath(); ectx.arc(OUT/2, OUT/2, OUT/2, 0, Math.PI*2); ectx.clip();
    }
    ectx.translate(OUT/2 + offset.x*f, OUT/2 + offset.y*f);
    ectx.rotate(angle);
    ectx.scale(zoom*f, zoom*f);
    ectx.drawImage(img, -img.naturalWidth/2, -img.naturalHeight/2);
    onConfirm({ src: ec.toDataURL("image/png"), shape, originalSrc: src });
  };

  return (
    <div className="pem-overlay">
      <div className="pem-dialog">
        <div className="pem-title">✦ Adjust Photo</div>

        <canvas ref={canvasRef} width={CV} height={CV}
          className="pem-canvas"
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
          onWheel={onWheel}
        />

        {/* Shape toggle */}
        <div className="pem-shapes">
          {["circle","square"].map(s => (
            <button key={s} onClick={() => setShape(s)}
              className={`pem-shape-btn ${shape===s ? "pem-shape-btn--active" : "pem-shape-btn--inactive"}`}>
              {s === "circle" ? "\u2B24  Circle" : "\u25A0  Square"}
            </button>
          ))}
        </div>

        {/* Sliders */}
        {[
          ["Rotate", `${(angle*180/Math.PI).toFixed(0)}\u00B0`, -180, 180, 0.5, +(angle*180/Math.PI).toFixed(1), v => setAngle(v*Math.PI/180)],
          ["Zoom", `${Math.round(zoom*100)}%`, 5, 500, 1, Math.round(zoom*100), v => setZoom(v/100)],
        ].map(([lbl, val, min, max, step, cur, onChange]) => (
          <div key={lbl} className="pem-slider">
            <div className="pem-slider-header">
              <span className="pem-slider-label">{lbl}</span>
              <span className="pem-slider-value">{val}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={cur}
              onChange={e => onChange(+e.target.value)}
            />
          </div>
        ))}

        <div className="pem-help">
          Drag to reposition &middot; Scroll or pinch to zoom
        </div>

        <div className="pem-actions">
          <button className="pem-cancel" onClick={onCancel}>Cancel</button>
          <button className="pem-confirm" onClick={confirm}>Apply ✦</button>
        </div>
      </div>
    </div>
  );
}
