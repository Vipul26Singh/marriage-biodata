import { useState, useRef, useCallback, Suspense } from "react";
import { BiodataProvider, useBiodata, useDispatch } from "./context/BiodataContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useUndoRedo } from "./hooks/useUndoRedo";
import { LAYOUTS } from "./data/layouts";
import EditorPanel from "./components/editor/EditorPanel";
import PhotoEditorModal from "./components/shared/PhotoEditorModal";
import "./App.css";

// ── Preview renders the active layout ────────────────────────────────────────
function Preview({ sheetRef }) {
  const state = useBiodata();
  const layoutDef = LAYOUTS.find(l => l.id === state.layout) || LAYOUTS[0];
  const LayoutComponent = layoutDef.component;

  return (
    <div className="preview">
      <Suspense fallback={<div style={{ color: "#9a8468", padding: 40 }}>Loading layout...</div>}>
        <LayoutComponent state={state} sheetRef={sheetRef} />
      </Suspense>
    </div>
  );
}

// ── Main App (inside provider) ───────────────────────────────────────────────
function AppInner() {
  const state = useBiodata();
  const rawDispatch = useDispatch();
  const sheetRef = useRef();
  const [mobileTab, setMobileTab] = useState("edit");

  // Undo/redo wrapping
  const stateRef = useRef(state);
  stateRef.current = state;
  const { dispatch, undo, redo, canUndo, canRedo } = useUndoRedo(
    rawDispatch,
    useCallback(() => stateRef.current, [])
  );

  // Auto-save to localStorage
  useLocalStorage(state, dispatch);

  // Photo editor confirm handler
  const handlePhotoConfirm = ({ src, shape, originalSrc }) => {
    const { secId, ci, slotIdx } = state.photoEditor;
    dispatch({
      type: "SET_PHOTO",
      payload: { secId, ci, slotIdx, photo: { src, shape, originalSrc } },
    });
    dispatch({ type: "SET_PHOTO_EDITOR", payload: null });
  };

  return (
    <>
      {/* Photo editor overlay */}
      {state.photoEditor && (
        <div className="photo-editor-overlay">
          <PhotoEditorModal
            src={state.photoEditor.src}
            onConfirm={handlePhotoConfirm}
            onCancel={() => dispatch({ type: "SET_PHOTO_EDITOR", payload: null })}
          />
        </div>
      )}

      {/* Mobile tab bar */}
      <div className="mobile-tabs">
        <button
          className={`mobile-tab ${mobileTab === "edit" ? "active" : ""}`}
          onClick={() => setMobileTab("edit")}
        >
          Edit
        </button>
        <button
          className={`mobile-tab ${mobileTab === "preview" ? "active" : ""}`}
          onClick={() => setMobileTab("preview")}
        >
          Preview
        </button>
      </div>

      <div className="app">
        <div className={mobileTab === "preview" ? "hidden" : ""} style={{ display: "contents" }}>
          <EditorPanel
            sheetRef={sheetRef}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </div>
        <div className={mobileTab === "edit" ? "hidden-mobile" : ""} style={{ display: "contents" }}>
          <Preview sheetRef={sheetRef} />
        </div>
      </div>
    </>
  );
}

// ── Root with Provider ───────────────────────────────────────────────────────
export default function App() {
  return (
    <BiodataProvider>
      <AppInner />
    </BiodataProvider>
  );
}
