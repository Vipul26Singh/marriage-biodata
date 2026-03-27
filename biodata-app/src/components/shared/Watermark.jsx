import "./Watermark.css";

export default function Watermark({ text = "SAMPLE", opacity = 0.08, enabled = true }) {
  if (!enabled) return null;

  return (
    <div className="watermark" style={{ opacity }}>
      {text}
    </div>
  );
}
