const STORAGE_KEY = "biodata-app-state";

/**
 * Save application state to localStorage.
 * Strips base64 photo data to keep storage size manageable.
 */
export const saveToLocal = (state) => {
  try {
    const cleaned = JSON.parse(JSON.stringify(state));

    // Strip base64 photo src and originalSrc from sections
    if (cleaned.sections) {
      cleaned.sections.forEach((sec) => {
        sec.columns?.forEach((col) => {
          col.photos?.forEach((photo) => {
            if (photo) {
              if (photo.src && photo.src.startsWith("data:")) {
                photo.src = "";
              }
              if (photo.originalSrc && photo.originalSrc.startsWith("data:")) {
                photo.originalSrc = "";
              }
            }
          });
        });
      });
    }

    // Strip base64 profile pic and custom background
    if (cleaned.profilePic && cleaned.profilePic.startsWith("data:")) {
      cleaned.profilePic = "";
    }
    if (cleaned.customBg && cleaned.customBg.startsWith("data:")) {
      cleaned.customBg = "";
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
  }
};

/**
 * Load application state from localStorage.
 * Returns parsed state object or null if not found.
 */
export const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
    return null;
  }
};

/**
 * Clear saved state from localStorage.
 */
export const clearLocal = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear localStorage:", e);
  }
};

/**
 * Export state as a downloadable .json file.
 */
export const exportToJSON = (state) => {
  try {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "biodata-export.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Failed to export state as JSON:", e);
  }
};

/**
 * Import state from a .json file.
 * Returns a Promise that resolves with the parsed state object.
 */
export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};
