import { useRef } from "react";
import { useBiodata, useDispatch } from "../../context/BiodataContext";
import SliderRow from "../shared/SliderRow";
import Toggle from "../shared/Toggle";
import { FONT_FAMILIES } from "../../data/fonts";
import "./DesignPanel.css";

const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "hi", label: "\u0939\u093F\u0928\u094D\u0926\u0940" },
  { id: "gu", label: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0" },
  { id: "ta", label: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" },
  { id: "mr", label: "\u092E\u0930\u093E\u0920\u0940" },
  { id: "pa", label: "\u0A2A\u0A70\u0A1C\u0ABE\u0A2C\u0AC0" },
  { id: "bn", label: "\u09AC\u09BE\u0982\u09B2\u09BE" },
  { id: "te", label: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41" },
];

export default function DesignPanel() {
  const state = useBiodata();
  const dispatch = useDispatch();
  const bgInputRef = useRef();

  const {
    customBg, bgOpacity, bgBlur, bgSize, bgPosition,
    marginTop, marginLeft, marginRight,
    brTL, brTR, brBL, brBR,
    typo, fontFamily, language, watermark,
  } = state;

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => dispatch({ type: "SET_CUSTOM_BG", payload: ev.target.result });
    reader.readAsDataURL(file);
  };

  const setTypo = (changes) => dispatch({ type: "SET_TYPO", payload: changes });

  return (
    <>
      {/* Background image */}
      <div className="g-set">
        <div className="g-row">
          <span className="g-lbl">Background</span>
          {customBg && (
            <img src={customBg} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 5, border: "1px solid #3a2810" }} alt="" />
          )}
          <button className="g-btn" onClick={() => bgInputRef.current.click()}>
            {customBg ? "Change" : "+ Upload Image"}
          </button>
          {customBg && (
            <button className="g-btn" onClick={() => dispatch({ type: "SET_CUSTOM_BG", payload: "" })} style={{ color: "#e05c5c", borderColor: "#e05c5c44" }}>
              ✕
            </button>
          )}
          <input ref={bgInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgUpload} />
        </div>
        {customBg && (
          <>
            <div className="g-row">
              <span className="g-lbl">Opacity</span>
              <input type="range" min="0" max="1" step="0.01" value={bgOpacity}
                onChange={(e) => dispatch({ type: "SET_BG_PROP", payload: { key: "bgOpacity", value: +e.target.value } })}
                style={{ flex: 1, accentColor: "#c9972a" }} />
              <span style={{ fontSize: 11, color: "#9a8468", minWidth: 32, textAlign: "right" }}>{Math.round(bgOpacity * 100)}%</span>
            </div>
            <div className="g-row">
              <span className="g-lbl">Blur</span>
              <input type="range" min="0" max="20" step="1" value={bgBlur}
                onChange={(e) => dispatch({ type: "SET_BG_PROP", payload: { key: "bgBlur", value: +e.target.value } })}
                style={{ flex: 1, accentColor: "#c9972a" }} />
              <span style={{ fontSize: 11, color: "#9a8468", minWidth: 32, textAlign: "right" }}>{bgBlur}px</span>
            </div>
            <div className="g-row">
              <span className="g-lbl">Size</span>
              <select className="g-inp" value={bgSize} onChange={(e) => dispatch({ type: "SET_BG_PROP", payload: { key: "bgSize", value: e.target.value } })}>
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="100% 100%">Stretch</option>
                <option value="auto">Original</option>
              </select>
            </div>
            <div className="g-row">
              <span className="g-lbl">Position</span>
              <select className="g-inp" value={bgPosition} onChange={(e) => dispatch({ type: "SET_BG_PROP", payload: { key: "bgPosition", value: e.target.value } })}>
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top left">Top Left</option>
                <option value="top right">Top Right</option>
                <option value="bottom left">Bottom Left</option>
                <option value="bottom right">Bottom Right</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Padding sliders */}
      <div className="g-set">
        <SliderRow label="Top pad" min={10} max={120} step={1} value={marginTop} suffix="px"
          onChange={(v) => dispatch({ type: "SET_MARGIN", payload: { key: "marginTop", value: v } })} />
        <SliderRow label="Left pad" min={10} max={120} step={1} value={marginLeft} suffix="px"
          onChange={(v) => dispatch({ type: "SET_MARGIN", payload: { key: "marginLeft", value: v } })} />
        <SliderRow label="Right pad" min={10} max={120} step={1} value={marginRight} suffix="px"
          onChange={(v) => dispatch({ type: "SET_MARGIN", payload: { key: "marginRight", value: v } })} />

        <div className="design-section-label">Corners</div>
        <SliderRow label="Top L" min={0} max={40} step={1} value={brTL} suffix="px"
          onChange={(v) => dispatch({ type: "SET_CORNER", payload: { key: "brTL", value: v } })} />
        <SliderRow label="Top R" min={0} max={40} step={1} value={brTR} suffix="px"
          onChange={(v) => dispatch({ type: "SET_CORNER", payload: { key: "brTR", value: v } })} />
        <SliderRow label="Bot L" min={0} max={40} step={1} value={brBL} suffix="px"
          onChange={(v) => dispatch({ type: "SET_CORNER", payload: { key: "brBL", value: v } })} />
        <SliderRow label="Bot R" min={0} max={40} step={1} value={brBR} suffix="px"
          onChange={(v) => dispatch({ type: "SET_CORNER", payload: { key: "brBR", value: v } })} />
      </div>

      {/* Typography */}
      <div className="g-set">
        <div className="typo-header">
          <span className="design-section-label" style={{ margin: 0 }}>Typography</span>
          <button className="g-btn" style={{ padding: "2px 8px", fontSize: 9 }} onClick={() => dispatch({ type: "RESET_TYPO" })}>Reset</button>
        </div>

        {/* Section heading */}
        <div className="typo-group-label">
          <span>Section Heading</span>
          <button className="g-btn" style={{ padding: "1px 6px", fontSize: 9, fontWeight: typo.secBold ? 700 : 400, minWidth: 20 }}
            onClick={() => setTypo({ secBold: !typo.secBold })}>B</button>
        </div>
        <SliderRow label="Size" min={8} max={28} step={0.5} value={typo.secSize} suffix="px"
          onChange={(v) => setTypo({ secSize: v })} />
        <SliderRow label="Spacing" min={0.8} max={2.5} step={0.05} value={typo.secLH}
          onChange={(v) => setTypo({ secLH: v })} />

        {/* Label */}
        <div className="typo-group-label">
          <span>Label</span>
          <button className="g-btn" style={{ padding: "1px 6px", fontSize: 9, fontWeight: typo.keyBold ? 700 : 400, minWidth: 20 }}
            onClick={() => setTypo({ keyBold: !typo.keyBold })}>B</button>
        </div>
        <SliderRow label="Size" min={8} max={22} step={0.5} value={typo.keySize} suffix="px"
          onChange={(v) => setTypo({ keySize: v })} />
        <SliderRow label="Spacing" min={0.8} max={2.5} step={0.05} value={typo.keyLH}
          onChange={(v) => setTypo({ keyLH: v })} />

        {/* Value */}
        <div className="typo-group-label">
          <span>Value</span>
          <button className="g-btn" style={{ padding: "1px 6px", fontSize: 9, fontWeight: typo.valBold ? 700 : 400, minWidth: 20 }}
            onClick={() => setTypo({ valBold: !typo.valBold })}>B</button>
        </div>
        <SliderRow label="Size" min={8} max={22} step={0.5} value={typo.valSize} suffix="px"
          onChange={(v) => setTypo({ valSize: v })} />
        <SliderRow label="Spacing" min={0.8} max={2.5} step={0.05} value={typo.valLH}
          onChange={(v) => setTypo({ valLH: v })} />
      </div>

      {/* Font family */}
      <div className="g-set">
        <div className="g-row">
          <span className="g-lbl">Font</span>
          <select className="g-inp" value={fontFamily} onChange={(e) => dispatch({ type: "SET_FONT", payload: e.target.value })}>
            {FONT_FAMILIES.map((f) => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="g-row">
          <span className="g-lbl">Language</span>
          <select className="g-inp" value={language} onChange={(e) => dispatch({ type: "SET_LANGUAGE", payload: e.target.value })}>
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Watermark */}
      <div className="g-set">
        <div className="g-row">
          <span className="g-lbl">Watermark</span>
          <Toggle
            checked={watermark.enabled}
            onChange={() => dispatch({ type: "SET_WATERMARK", payload: { enabled: !watermark.enabled } })}
          />
        </div>
        {watermark.enabled && (
          <>
            <div className="g-row">
              <span className="g-lbl">Text</span>
              <input
                className="g-inp"
                value={watermark.text}
                onChange={(e) => dispatch({ type: "SET_WATERMARK", payload: { text: e.target.value } })}
                placeholder="Watermark text..."
              />
            </div>
            <div className="g-row">
              <span className="g-lbl">Opacity</span>
              <input type="range" min="0.01" max="0.5" step="0.01" value={watermark.opacity}
                onChange={(e) => dispatch({ type: "SET_WATERMARK", payload: { opacity: +e.target.value } })}
                style={{ flex: 1, accentColor: "#c9972a" }} />
              <span style={{ fontSize: 11, color: "#9a8468", minWidth: 32, textAlign: "right" }}>{Math.round(watermark.opacity * 100)}%</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
