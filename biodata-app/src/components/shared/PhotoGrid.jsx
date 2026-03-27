import "./PhotoGrid.css";

export default function PhotoGrid({ photos, photoLayout, accent }) {
  if (!photoLayout) return null;
  const slots = Array.from({ length: photoLayout }, (_, i) => photos[i] || null);
  const cols = photoLayout === 1 ? "1fr" : photoLayout === 2 ? "1fr 1fr" : photoLayout === 3 ? "1fr 1fr 1fr" : "1fr 1fr";
  const h    = photoLayout === 1 ? 150 : photoLayout === 4 ? 80 : 110;

  return (
    <div className="pg-grid" style={{ gridTemplateColumns: cols }}>
      {slots.map((photo, i) => (
        <div key={i} className="pg-slot" style={{
          height: h,
          background: photo ? "transparent" : `${accent}11`,
          borderRadius: photo?.shape === "circle" ? "50%" : 6,
          border: photo ? "none" : `1px dashed ${accent}44`,
        }}>
          {photo
            ? <img src={photo.src} className="pg-img" style={{ borderRadius: photo.shape === "circle" ? "50%" : 0 }} alt="" />
            : <span className="pg-placeholder" style={{ color: accent }}>✦</span>
          }
        </div>
      ))}
    </div>
  );
}
