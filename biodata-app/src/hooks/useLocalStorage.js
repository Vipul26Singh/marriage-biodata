import { useEffect, useRef } from "react";

const STORAGE_KEY = "biodata-app-state";

// Fields to exclude from persistence
const SKIP_KEYS = ["photoEditor", "downloading"];

function cleanForStorage(state) {
  const cleaned = {};
  for (const key of Object.keys(state)) {
    if (!SKIP_KEYS.includes(key)) {
      cleaned[key] = state[key];
    }
  }
  return cleaned;
}

export function useLocalStorage(state, dispatch) {
  const timerRef = useRef(null);
  const mountedRef = useRef(false);

  // On mount, load saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        dispatch({ type: "LOAD_STATE", payload: saved });
      }
    } catch (e) {
      console.warn("Failed to load saved biodata state:", e);
    }
    mountedRef.current = true;
  }, [dispatch]);

  // On state change, debounce save
  useEffect(() => {
    if (!mountedRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      try {
        const data = cleanForStorage(state);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn("Failed to save biodata state:", e);
      }
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [state]);
}
