import "./CollapsiblePanel.css";

export default function CollapsiblePanel({ title, open, onToggle, children }) {
  return (
    <>
      <div className="panel-hd" onClick={onToggle}>
        <span className="panel-lbl">{title}</span>
        <span className={`panel-arr ${open ? "open" : ""}`}>&#9654;</span>
      </div>
      {open && children}
    </>
  );
}
