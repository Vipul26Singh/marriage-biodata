import { useBiodata, useDispatch } from "../../context/BiodataContext";
import { uid } from "../../utils/uid";
import FieldRow from "./FieldRow";
import "./SectionCard.css";

// ── Layout picker icon (inline) ──
function LayoutIcon({ n, max, active, onClick }) {
  if (n > max) return null;
  return (
    <div
      onClick={onClick}
      title={n === 0 ? "No photos" : `${n} photo${n > 1 ? "s" : ""}`}
      style={{
        padding: "5px 6px",
        borderRadius: 6,
        cursor: "pointer",
        transition: "all .15s",
        border: `1px solid ${active ? "#c9972a" : "#3a2810"}`,
        background: active ? "#6b3a1477" : "#110900",
        display: "flex",
        flexWrap: n === 4 ? "wrap" : "nowrap",
        gap: 2,
        minWidth: 36,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {n === 0 ? (
        <span style={{ fontSize: 9, color: active ? "#e8c87a" : "#5a4020", whiteSpace: "nowrap" }}>None</span>
      ) : (
        Array(n)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                width: n <= 2 ? 12 : 9,
                height: n <= 3 ? 14 : 9,
                background: active ? "#c9972a55" : "#3a2810",
                border: `1px solid ${active ? "#c9972a" : "#4a3820"}`,
                borderRadius: 2,
              }}
            />
          ))
      )}
    </div>
  );
}

export default function SectionCard({ section: sec, index: si }) {
  const { activeSection, photoEditor } = useBiodata();
  const dispatch = useDispatch();

  const isAct = activeSection === sec.id;
  const name = sec.columns[0].heading || sec.columns[1].heading || "Section";

  const openUploader = (secId, ci, slotIdx) => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) =>
        dispatch({ type: "SET_PHOTO_EDITOR", payload: { secId, ci, slotIdx, src: ev.target.result } });
      reader.readAsDataURL(file);
    };
    inp.click();
  };

  const editPhoto = (secId, ci, slotIdx) => {
    const photo = sec.columns[ci]?.photos[slotIdx];
    if (photo) {
      dispatch({ type: "SET_PHOTO_EDITOR", payload: { secId, ci, slotIdx, src: photo.originalSrc } });
    }
  };

  return (
    <div className={`sc ${isAct ? "act" : ""}`}>
      <div className="sc-hd" onClick={() => dispatch({ type: "SET_ACTIVE_SECTION", payload: isAct ? null : sec.id })}>
        <span className="sc-num">&sect;{si + 1}</span>
        <span className="sc-nm">{name}</span>
        {sec.twoCol && <span className="sc-badge">2 col</span>}
        <button className="sb" onClick={(e) => { e.stopPropagation(); dispatch({ type: "MOVE_SECTION", payload: { id: sec.id, dir: -1 } }); }}>
          &uarr;
        </button>
        <button className="sb" onClick={(e) => { e.stopPropagation(); dispatch({ type: "MOVE_SECTION", payload: { id: sec.id, dir: 1 } }); }}>
          &darr;
        </button>
        <button className="sb del" onClick={(e) => { e.stopPropagation(); dispatch({ type: "REMOVE_SECTION", payload: sec.id }); }}>
          ✕
        </button>
      </div>

      {isAct && (
        <div className="sc-body" onClick={(e) => e.stopPropagation()}>
          {/* Two-col toggle */}
          <div className="two-tog">
            <span className="tg-lbl">Split into 2 columns</span>
            <label className="tgl">
              <input type="checkbox" checked={sec.twoCol} onChange={() => dispatch({ type: "TOGGLE_TWO_COL", payload: sec.id })} />
              <span className="tgl-sl" />
            </label>
          </div>

          {/* Columns */}
          {[0, ...(sec.twoCol ? [1] : [])].map((ci) => {
            const col = sec.columns[ci];
            const maxPhotos = sec.twoCol ? 2 : 4;
            return (
              <div key={ci}>
                {sec.twoCol && <div className="col-lbl">Column {ci + 1}</div>}

                {/* Heading */}
                <input
                  className="h-inp"
                  placeholder="Section heading (optional)..."
                  value={col.heading}
                  onChange={(e) => dispatch({ type: "SET_HEADING", payload: { secId: sec.id, ci, value: e.target.value } })}
                />

                {/* Fields */}
                <div className="flds">
                  {col.fields.map((f) => (
                    <FieldRow
                      key={f.id}
                      field={f}
                      secId={sec.id}
                      ci={ci}
                      onUpdate={(fieldId, key, value) =>
                        dispatch({ type: "UPDATE_FIELD", payload: { secId: sec.id, ci, fieldId, key, value } })
                      }
                      onRemove={(fieldId) =>
                        dispatch({ type: "REMOVE_FIELD", payload: { secId: sec.id, ci, fieldId } })
                      }
                    />
                  ))}
                </div>
                <button className="add-f" onClick={() => dispatch({ type: "ADD_FIELD", payload: { secId: sec.id, ci } })}>
                  + Add Field
                </button>

                {/* Photo section */}
                <div className="ph-sec">
                  <div className="ph-sec-title">Photos (max {maxPhotos})</div>
                  <div className="lay-row">
                    {[0, 1, 2, ...(maxPhotos > 2 ? [3, 4] : [])].map((n) => (
                      <LayoutIcon
                        key={n}
                        n={n}
                        max={maxPhotos}
                        active={col.photoLayout === n}
                        onClick={() => dispatch({ type: "SET_PHOTO_LAYOUT", payload: { secId: sec.id, ci, count: n } })}
                      />
                    ))}
                  </div>
                  {col.photoLayout > 0 && (
                    <div className="ph-slots">
                      {Array.from({ length: col.photoLayout }, (_, slotIdx) => {
                        const photo = col.photos[slotIdx];
                        return (
                          <div key={slotIdx} className="ph-slot">
                            {photo ? (
                              <>
                                <img
                                  src={photo.src}
                                  className={`ph-img ${photo.shape === "circle" ? "circ" : ""}`}
                                  alt=""
                                />
                                <button className="sl-edit" onClick={() => editPhoto(sec.id, ci, slotIdx)}>✎</button>
                                <button className="sl-del" onClick={() => dispatch({ type: "REMOVE_PHOTO", payload: { secId: sec.id, ci, slotIdx } })}>
                                  ✕
                                </button>
                              </>
                            ) : (
                              <div className="ph-add" onClick={() => openUploader(sec.id, ci, slotIdx)}>+</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {sec.twoCol && ci === 0 && <div className="col-div" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
