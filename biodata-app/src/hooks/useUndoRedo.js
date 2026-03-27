import { useRef, useCallback, useState } from "react";

// Actions that should NOT create undo entries
const SKIP_ACTIONS = new Set([
  "SET_ACTIVE_SECTION",
  "SET_PHOTO_EDITOR",
  "SET_DOWNLOADING",
  "TOGGLE_DL_MENU",
  "TOGGLE_PANEL",
]);

const UPDATE_FIELD_DEBOUNCE = 300;

export function useUndoRedo(rawDispatch, getState) {
  const past = useRef([]);
  const future = useRef([]);
  const updateFieldTimer = useRef(null);
  const pendingSnapshot = useRef(null);
  const [, forceRender] = useState(0);

  const pushUndo = useCallback(
    (snapshot) => {
      past.current = [...past.current, snapshot];
      future.current = [];
      forceRender((n) => n + 1);
    },
    []
  );

  const dispatch = useCallback(
    (action) => {
      const currentState = getState();

      // Skip recording for non-undoable actions
      if (SKIP_ACTIONS.has(action.type)) {
        rawDispatch(action);
        return;
      }

      // Debounce UPDATE_FIELD so rapid typing creates one undo entry
      if (action.type === "UPDATE_FIELD") {
        if (!pendingSnapshot.current) {
          // Capture state before the first keystroke in this burst
          pendingSnapshot.current = currentState;
        }
        if (updateFieldTimer.current) {
          clearTimeout(updateFieldTimer.current);
        }
        rawDispatch(action);
        updateFieldTimer.current = setTimeout(() => {
          if (pendingSnapshot.current) {
            past.current = [...past.current, pendingSnapshot.current];
            future.current = [];
            pendingSnapshot.current = null;
            forceRender((n) => n + 1);
          }
        }, UPDATE_FIELD_DEBOUNCE);
        return;
      }

      // Flush any pending UPDATE_FIELD snapshot before recording a new action
      if (pendingSnapshot.current) {
        past.current = [...past.current, pendingSnapshot.current];
        future.current = [];
        pendingSnapshot.current = null;
        if (updateFieldTimer.current) {
          clearTimeout(updateFieldTimer.current);
          updateFieldTimer.current = null;
        }
      }

      // Record current state before applying the action
      pushUndo(currentState);
      rawDispatch(action);
    },
    [rawDispatch, getState, pushUndo]
  );

  const undo = useCallback(() => {
    if (past.current.length === 0) return;
    const currentState = getState();
    const prev = past.current[past.current.length - 1];
    past.current = past.current.slice(0, -1);
    future.current = [...future.current, currentState];
    rawDispatch({ type: "LOAD_STATE", payload: prev });
    forceRender((n) => n + 1);
  }, [rawDispatch, getState]);

  const redo = useCallback(() => {
    if (future.current.length === 0) return;
    const currentState = getState();
    const next = future.current[future.current.length - 1];
    future.current = future.current.slice(0, -1);
    past.current = [...past.current, currentState];
    rawDispatch({ type: "LOAD_STATE", payload: next });
    forceRender((n) => n + 1);
  }, [rawDispatch, getState]);

  return {
    dispatch,
    undo,
    redo,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
  };
}
