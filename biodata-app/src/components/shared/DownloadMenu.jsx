import { useState } from "react";
import { downloadAs } from "../../utils/download";
import "./DownloadMenu.css";

export default function DownloadMenu({ sheetRef }) {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format) => {
    setOpen(false);
    setDownloading(true);
    try {
      await downloadAs(format, sheetRef);
    } catch (e) {
      console.error("Download failed:", e);
    }
    setDownloading(false);
  };

  return (
    <div className="dl-wrap">
      <button className="dl-btn" disabled={downloading} onClick={() => setOpen(v => !v)}>
        {downloading ? "Exporting..." : "Download \u25BE"}
      </button>
      {open && (
        <div className="dl-menu">
          <button className="dl-opt" onClick={() => handleDownload("png")}>PNG Image</button>
          <button className="dl-opt" onClick={() => handleDownload("jpg")}>JPG Image</button>
          <button className="dl-opt" onClick={() => handleDownload("pdf")}>PDF Document</button>
        </div>
      )}
    </div>
  );
}
