import { useBiodata, useDispatch } from "../../context/BiodataContext";
import CollapsiblePanel from "../shared/CollapsiblePanel";
import DownloadMenu from "../shared/DownloadMenu";
import ShareMenu from "../shared/ShareMenu";
import ThemePanel from "./ThemePanel";
import DesignPanel from "./DesignPanel";
import DataPanel from "./DataPanel";
import "./EditorPanel.css";

export default function EditorPanel({ sheetRef, onUndo, onRedo, canUndo, canRedo }) {
  const { themeOpen, designOpen, dataOpen } = useBiodata();
  const dispatch = useDispatch();

  return (
    <div className="ed">
      {/* Header */}
      <div className="ed-hd">
        <div>
          <div className="ed-title">✦ Biodata Builder</div>
          <div className="ed-sub">Craft your marriage biodata visually</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="undo-bar">
            <button className="undo-btn" disabled={!canUndo} onClick={onUndo} title="Undo">↩</button>
            <button className="undo-btn" disabled={!canRedo} onClick={onRedo} title="Redo">↪</button>
          </div>
          <ShareMenu sheetRef={sheetRef} />
          <DownloadMenu sheetRef={sheetRef} />
        </div>
      </div>

      {/* Collapsible panels */}
      <CollapsiblePanel
        title="Theme"
        open={themeOpen}
        onToggle={() => dispatch({ type: "TOGGLE_PANEL", payload: "themeOpen" })}
      >
        <ThemePanel />
      </CollapsiblePanel>

      <CollapsiblePanel
        title="Design"
        open={designOpen}
        onToggle={() => dispatch({ type: "TOGGLE_PANEL", payload: "designOpen" })}
      >
        <DesignPanel />
      </CollapsiblePanel>

      <CollapsiblePanel
        title="Data"
        open={dataOpen}
        onToggle={() => dispatch({ type: "TOGGLE_PANEL", payload: "dataOpen" })}
      >
        <DataPanel />
      </CollapsiblePanel>
    </div>
  );
}
