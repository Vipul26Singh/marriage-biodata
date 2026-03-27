import { useState } from "react";
import html2canvas from "html2canvas";
import { shareWhatsApp, shareEmail, shareNative } from "../../utils/share";
import "./ShareMenu.css";

export default function ShareMenu({ sheetRef }) {
  const [open, setOpen] = useState(false);
  const [sharing, setSharing] = useState(false);

  const captureBlob = async () => {
    const element = sheetRef?.current || sheetRef;
    if (!element) return null;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: null });
    return new Promise(resolve => canvas.toBlob(resolve, "image/png"));
  };

  const handleWhatsApp = async () => {
    setOpen(false);
    setSharing(true);
    try {
      const blob = await captureBlob();
      const shared = blob && await shareNative("Marriage Biodata", "Here is my biodata", blob);
      if (!shared) {
        shareWhatsApp("Here is my Marriage Biodata");
      }
    } catch (e) {
      console.error("WhatsApp share failed:", e);
      shareWhatsApp("Here is my Marriage Biodata");
    }
    setSharing(false);
  };

  const handleEmail = async () => {
    setOpen(false);
    setSharing(true);
    try {
      shareEmail("Marriage Biodata", "Please find my marriage biodata attached.");
    } catch (e) {
      console.error("Email share failed:", e);
    }
    setSharing(false);
  };

  return (
    <div className="sh-wrap">
      <button className="sh-btn" disabled={sharing} onClick={() => setOpen(v => !v)}>
        {sharing ? "Sharing..." : "Share \u25BE"}
      </button>
      {open && (
        <div className="sh-menu">
          <button className="sh-opt" onClick={handleWhatsApp}>WhatsApp</button>
          <button className="sh-opt" onClick={handleEmail}>Email</button>
        </div>
      )}
    </div>
  );
}
