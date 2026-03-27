import { useBiodata, useDispatch, TEMPLATES } from "../../context/BiodataContext";
import Toggle from "../shared/Toggle";
import "./ThemePanel.css";

const LAYOUTS = [
  { id: "classic", label: "Classic" },
  { id: "floral", label: "Floral" },
  { id: "minimalist", label: "Minimalist" },
  { id: "modern-card", label: "Modern Card" },
  { id: "traditional", label: "Traditional" },
  { id: "elegant", label: "Elegant" },
  { id: "royal", label: "Royal" },
  { id: "contemporary", label: "Contemporary" },
];

export default function ThemePanel() {
  const { template, customTheme, showBorder, layout } = useBiodata();
  const dispatch = useDispatch();

  const handleCustomClick = () => {
    if (template.id !== "custom") {
      const n = {
        id: "custom",
        label: "Custom",
        primary: template.primary,
        accent: template.accent,
        bg: template.bg,
      };
      dispatch({ type: "SET_CUSTOM_THEME", payload: n });
      dispatch({ type: "SET_TEMPLATE", payload: n });
    }
  };

  const updateCustomColor = (field, value) => {
    const n = { ...customTheme, [field]: value };
    dispatch({ type: "SET_CUSTOM_THEME", payload: n });
    dispatch({ type: "SET_TEMPLATE", payload: n });
  };

  return (
    <>
      {/* Theme dots + borders toggle */}
      <div className="tmpl-row">
        <span style={{ fontSize: 9, color: "#7a6040", textTransform: "uppercase", letterSpacing: 1 }}>Theme</span>
        {TEMPLATES.map((tp) => (
          <div
            key={tp.id}
            className={`tmpl-dot ${template.id === tp.id ? "sel" : ""}`}
            style={{ background: `linear-gradient(135deg, ${tp.primary}, ${tp.accent})` }}
            onClick={() => dispatch({ type: "SET_TEMPLATE", payload: tp })}
            title={tp.label}
          />
        ))}
        <div
          className={`tmpl-dot ${template.id === "custom" ? "sel" : ""}`}
          style={{
            background: `linear-gradient(135deg, ${customTheme.primary}, ${customTheme.accent})`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#fff",
          }}
          onClick={handleCustomClick}
          title="Custom"
        >
          ✎
        </div>
        <span style={{ fontSize: 9, color: "#7a6040", textTransform: "uppercase", letterSpacing: 1, marginLeft: "auto" }}>Borders</span>
        <Toggle
          checked={showBorder}
          onChange={() => dispatch({ type: "TOGGLE_BORDER" })}
        />
      </div>

      {/* Custom theme color pickers */}
      {template.id === "custom" && (
        <div className="custom-colors">
          <div className="section-label">Custom Theme Colors</div>
          {[
            { field: "primary", label: "Primary" },
            { field: "accent", label: "Accent" },
            { field: "bg", label: "Background" },
          ].map(({ field, label }) => (
            <div key={field} className="g-row">
              <span className="g-lbl">{label}</span>
              <input
                type="color"
                value={customTheme[field]}
                onChange={(e) => updateCustomColor(field, e.target.value)}
                style={{ width: 32, height: 26, border: "1px solid #3a2810", borderRadius: 4, background: "none", cursor: "pointer", padding: 0 }}
              />
              <span style={{ fontSize: 11, color: "#9a8468" }}>{customTheme[field]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Layout picker */}
      <div className="layout-picker">
        <div className="section-label">Layout</div>
        <div className="layout-grid">
          {LAYOUTS.map((l) => (
            <div
              key={l.id}
              className={`layout-card ${layout === l.id ? "active" : ""}`}
              onClick={() => dispatch({ type: "SET_LAYOUT", payload: l.id })}
            >
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
