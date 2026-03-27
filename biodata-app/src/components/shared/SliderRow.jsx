import "./SliderRow.css";

export default function SliderRow({ label, min, max, step, value, onChange, suffix = "" }) {
  return (
    <div className="sr-row">
      <span className="sr-label">{label}</span>
      <input
        className="sr-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
      />
      <span className="sr-value">{value}{suffix}</span>
    </div>
  );
}
