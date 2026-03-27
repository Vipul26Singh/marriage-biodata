/**
 * Open WhatsApp with a pre-filled message.
 * @param {string} text - The message text to share.
 */
export const shareWhatsApp = (text) => {
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${encoded}`, "_blank");
};

/**
 * Open the default email client with a pre-filled subject and body.
 * @param {string} subject - Email subject line.
 * @param {string} body - Email body text.
 */
export const shareEmail = (subject, body) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  window.open(`mailto:?subject=${encodedSubject}&body=${encodedBody}`, "_self");
};

/**
 * Use the Web Share API (if available) to share content natively.
 * @param {string} title - Share dialog title.
 * @param {string} text - Text content to share.
 * @param {Blob} [blob] - Optional file blob to share (e.g., an image).
 * @returns {Promise<boolean>} - true if shared successfully, false otherwise.
 */
export const shareNative = async (title, text, blob) => {
  if (!navigator.share) {
    return false;
  }

  try {
    const shareData = { title, text };

    if (blob) {
      const file = new File([blob], "biodata.png", { type: blob.type || "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        shareData.files = [file];
      }
    }

    await navigator.share(shareData);
    return true;
  } catch (e) {
    // User cancelled or share failed
    if (e.name !== "AbortError") {
      console.error("Native share failed:", e);
    }
    return false;
  }
};
