import "./Toggle.css";

export default function Toggle({ checked, onChange, label }) {
  return (
    <div className="tgl-wrap">
      {label && <span className="tgl-label">{label}</span>}
      <label className="tgl">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="tgl-sl" />
      </label>
    </div>
  );
}
