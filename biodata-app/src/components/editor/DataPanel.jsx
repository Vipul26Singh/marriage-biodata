import { useRef } from "react";
import { useBiodata, useDispatch } from "../../context/BiodataContext";
import Toggle from "../shared/Toggle";
import SectionCard from "./SectionCard";
import { saveToLocal, exportToJSON, importFromJSON } from "../../utils/storage";
import { SAMPLE_DATA_EN } from "../../data/sampleData";
import "./DataPanel.css";

export default function DataPanel() {
  const state = useBiodata();
  const dispatch = useDispatch();
  const profileRef = useRef();
  const importRef = useRef();

  const { title, profilePic, profilePicOriginal, showProfile, sections } = state;

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Open photo editor with the uploaded image
      dispatch({ type: "SET_PHOTO_EDITOR", payload: { src: ev.target.result, isProfile: true } });
    };
    reader.readAsDataURL(file);
  };

  const handleEditProfilePic = () => {
    if (profilePicOriginal) {
      dispatch({ type: "SET_PHOTO_EDITOR", payload: { src: profilePicOriginal, isProfile: true } });
    }
  };

  const handleSave = () => {
    saveToLocal(state);
  };

  const handleLoadSample = () => {
    dispatch({ type: "SET_TITLE", payload: SAMPLE_DATA_EN.title });
    dispatch({ type: "SET_SECTIONS", payload: SAMPLE_DATA_EN.sections });
  };

  const handleExportJSON = () => {
    exportToJSON(state);
  };

  const handleImportJSON = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await importFromJSON(file);
      dispatch({ type: "LOAD_STATE", payload: data });
    } catch (err) {
      console.error("Import failed:", err);
    }
    // Reset the input so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <>
      {/* Title & Profile */}
      <div className="g-set">
        <div className="g-row">
          <span className="g-lbl">Title</span>
          <input
            className="g-inp"
            value={title}
            onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
            placeholder="Marriage Biodata"
          />
        </div>
        <div className="g-row">
          <span className="g-lbl">Profile</span>
          <Toggle
            checked={showProfile}
            onChange={() => dispatch({ type: "TOGGLE_PROFILE" })}
          />
          {showProfile && (
            <>
              {profilePic && <img src={profilePic} className="prof-th" alt="" />}
              <button className="g-btn" onClick={() => profileRef.current.click()}>
                {profilePic ? "Change" : "+ Upload Photo"}
              </button>
              {profilePic && (
                <button className="g-btn" onClick={handleEditProfilePic}>Edit</button>
              )}
              {profilePic && (
                <button className="g-btn" onClick={() => dispatch({ type: "SET_PROFILE_PIC", payload: { cropped: "", original: "" } })} style={{ color: "#e05c5c", borderColor: "#e05c5c44" }}>
                  ✕
                </button>
              )}
            </>
          )}
          <input ref={profileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleProfilePic} />
        </div>
      </div>

      {/* Save / Load controls */}
      <div className="save-load-row">
        <button className="g-btn" onClick={handleSave}>Save</button>
        <button className="g-btn" onClick={handleLoadSample}>Load Sample</button>
        <button className="g-btn" onClick={handleExportJSON}>Export JSON</button>
        <button className="g-btn" onClick={() => importRef.current.click()}>Import JSON</button>
        <input ref={importRef} type="file" accept=".json,application/json" style={{ display: "none" }} onChange={handleImportJSON} />
      </div>

      {/* Sections list */}
      <div className="ed-body">
        {sections.map((sec, si) => (
          <SectionCard key={sec.id} section={sec} index={si} />
        ))}
      </div>

      {/* Add section */}
      <button
        className="add-sec"
        onClick={() => {
          dispatch({ type: "ADD_SECTION" });
          dispatch({ type: "SET_ACTIVE_SECTION", payload: null });
        }}
      >
        ✦ Add Section
      </button>
    </>
  );
}
