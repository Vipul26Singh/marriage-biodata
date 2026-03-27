import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Download the biodata sheet as PNG, JPG, or PDF.
 * @param {"png" | "jpg" | "pdf"} format - The desired output format.
 * @param {React.RefObject} sheetRef - Ref to the DOM element to capture.
 * @returns {Promise<void>}
 */
export const downloadAs = async (format, sheetRef) => {
  const element = sheetRef?.current || sheetRef;
  if (!element) {
    console.error("downloadAs: no element to capture");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  if (format === "png" || format === "jpg") {
    const mime = format === "png" ? "image/png" : "image/jpeg";
    const link = document.createElement("a");
    link.download = `biodata.${format}`;
    link.href = canvas.toDataURL(mime, 0.95);
    link.click();
  } else if (format === "pdf") {
    const imgData = canvas.toDataURL("image/png");
    const cw = canvas.width;
    const ch = canvas.height;
    const pdfW = 210; // A4 width in mm
    const pdfH = (ch * pdfW) / cw;
    const pdf = new jsPDF({ unit: "mm", format: [pdfW, pdfH] });
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save("biodata.pdf");
  }
};
