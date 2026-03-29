import { createContext, useContext, useReducer } from "react";
import { uid } from "../utils/uid.js";

// ── Helpers ──────────────────────────────────────────────────────────────────
const mkCol = (heading = "") => ({
  id: uid(),
  heading,
  fields: [{ id: uid(), key: "", value: "" }],
  photos: [],
  photoLayout: 0,
});

const mkSection = () => ({
  id: uid(),
  twoCol: false,
  columns: [mkCol(), mkCol()],
});

// ── Templates ────────────────────────────────────────────────────────────────
const TEMPLATES = [
  { id: "royal", label: "Royal Gold", primary: "#7B2D3E", accent: "#C9972A", bg: "#FDF8F0" },
  { id: "floral", label: "Rose Pink", primary: "#8B2252", accent: "#D4895E", bg: "#FFF5F7" },
  { id: "emerald", label: "Emerald", primary: "#1A4A3A", accent: "#9B7B2A", bg: "#F5FBF7" },
  { id: "navy", label: "Navy Classic", primary: "#1B2A5E", accent: "#B8933F", bg: "#F8F9FF" },
];

// ── Typography defaults ──────────────────────────────────────────────────────
const TYPO_DEFAULTS = {
  secSize: 14.5,
  secLH: 1.3,
  secBold: true,
  keySize: 11.5,
  keyLH: 1.4,
  keyBold: true,
  valSize: 12,
  valLH: 1.4,
  valBold: false,
};

// ── Default sections ─────────────────────────────────────────────────────────
const defaultSections = [
  {
    id: uid(),
    twoCol: false,
    columns: [
      {
        id: uid(),
        heading: "Personal Details",
        fields: [
          { id: uid(), key: "Full Name", value: "" },
          { id: uid(), key: "Date of Birth", value: "" },
          { id: uid(), key: "Religion / Caste", value: "" },
          { id: uid(), key: "Height", value: "" },
        ],
        photos: [],
        photoLayout: 0,
      },
      mkCol(),
    ],
  },
  {
    id: uid(),
    twoCol: true,
    columns: [
      {
        id: uid(),
        heading: "Education & Career",
        fields: [
          { id: uid(), key: "Education", value: "" },
          { id: uid(), key: "Occupation", value: "" },
          { id: uid(), key: "Annual Income", value: "" },
        ],
        photos: [],
        photoLayout: 0,
      },
      {
        id: uid(),
        heading: "Contact",
        fields: [
          { id: uid(), key: "Mobile", value: "" },
          { id: uid(), key: "Email", value: "" },
          { id: uid(), key: "City", value: "" },
        ],
        photos: [],
        photoLayout: 0,
      },
    ],
  },
];

// ── Initial state ────────────────────────────────────────────────────────────
const initialState = {
  template: TEMPLATES[0],
  customTheme: {
    id: "custom",
    label: "Custom",
    primary: "#7B2D3E",
    accent: "#C9972A",
    bg: "#FDF8F0",
  },
  layout: "classic",
  title: "Marriage Biodata",
  profilePic: "",
  profilePicOriginal: "",
  showProfile: true,
  showBorder: true,
  themeOpen: false,
  designOpen: false,
  dataOpen: true,
  customBg: "",
  bgOpacity: 0.15,
  bgBlur: 0,
  bgSize: "cover",
  bgPosition: "center",
  marginTop: 46,
  marginLeft: 50,
  marginRight: 50,
  brTL: 0,
  brTR: 0,
  brBL: 0,
  brBR: 0,
  typo: { ...TYPO_DEFAULTS },
  TYPO_DEFAULTS,
  fontFamily: "lora",
  language: "en",
  valColor: "",
  watermark: { text: "", opacity: 0.15, enabled: false },
  sections: defaultSections,
  activeSection: null,
  photoEditor: null,
  downloading: false,
  showDlMenu: false,
};

// ── Section / column helpers ─────────────────────────────────────────────────
function updSec(sections, id, fn) {
  return sections.map((sec) => (sec.id === id ? fn(sec) : sec));
}

function updCol(sections, sid, ci, fn) {
  return updSec(sections, sid, (sec) => ({
    ...sec,
    columns: sec.columns.map((col, i) => (i === ci ? fn(col) : col)),
  }));
}

// ── Reducer ──────────────────────────────────────────────────────────────────
function biodataReducer(state, action) {
  switch (action.type) {
    case "SET_TEMPLATE":
      return { ...state, template: action.payload };

    case "SET_CUSTOM_THEME":
      return { ...state, customTheme: action.payload };

    case "SET_LAYOUT":
      return { ...state, layout: action.payload };

    case "SET_TITLE":
      return { ...state, title: action.payload };

    case "SET_PROFILE_PIC":
      return {
        ...state,
        profilePic: action.payload.cropped || action.payload,
        profilePicOriginal: action.payload.original || action.payload.cropped || action.payload,
      };

    case "TOGGLE_PROFILE":
      return { ...state, showProfile: !state.showProfile };

    case "TOGGLE_BORDER":
      return { ...state, showBorder: !state.showBorder };

    case "TOGGLE_PANEL": {
      const panel = action.payload; // "themeOpen" | "designOpen" | "dataOpen"
      return { ...state, [panel]: !state[panel] };
    }

    case "SET_CUSTOM_BG":
      return { ...state, customBg: action.payload };

    case "SET_BG_PROP":
      return { ...state, [action.payload.key]: action.payload.value };

    case "SET_MARGIN":
      return { ...state, [action.payload.key]: action.payload.value };

    case "SET_CORNER":
      return { ...state, [action.payload.key]: action.payload.value };

    case "SET_TYPO":
      return { ...state, typo: { ...state.typo, ...action.payload } };

    case "RESET_TYPO":
      return { ...state, typo: { ...state.TYPO_DEFAULTS } };

    case "SET_FONT":
      return { ...state, fontFamily: action.payload };

    case "SET_LANGUAGE":
      return { ...state, language: action.payload };

    case "SET_VAL_COLOR":
      return { ...state, valColor: action.payload };

    case "SET_WATERMARK":
      return { ...state, watermark: { ...state.watermark, ...action.payload } };

    case "SET_SECTIONS":
      return { ...state, sections: action.payload };

    case "ADD_SECTION":
      return { ...state, sections: [...state.sections, mkSection()] };

    case "REMOVE_SECTION":
      return {
        ...state,
        sections: state.sections.filter((sec) => sec.id !== action.payload),
      };

    case "MOVE_SECTION": {
      const { id, dir } = action.payload;
      const arr = [...state.sections];
      const i = arr.findIndex((sec) => sec.id === id);
      const ni = i + dir;
      if (ni < 0 || ni >= arr.length) return state;
      [arr[i], arr[ni]] = [arr[ni], arr[i]];
      return { ...state, sections: arr };
    }

    case "TOGGLE_TWO_COL":
      return {
        ...state,
        sections: updSec(state.sections, action.payload, (sec) => ({
          ...sec,
          twoCol: !sec.twoCol,
        })),
      };

    case "UPDATE_COLUMN": {
      const { secId, ci, changes } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => ({
          ...col,
          ...changes,
        })),
      };
    }

    case "ADD_FIELD": {
      const { secId, ci } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => ({
          ...col,
          fields: [...col.fields, { id: uid(), key: "", value: "" }],
        })),
      };
    }

    case "REMOVE_FIELD": {
      const { secId, ci, fieldId } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => ({
          ...col,
          fields: col.fields.filter((f) => f.id !== fieldId),
        })),
      };
    }

    case "UPDATE_FIELD": {
      const { secId, ci, fieldId, key, value } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => ({
          ...col,
          fields: col.fields.map((f) =>
            f.id === fieldId ? { ...f, [key]: value } : f
          ),
        })),
      };
    }

    case "SET_HEADING": {
      const { secId, ci, value } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => ({
          ...col,
          heading: value,
        })),
      };
    }

    case "SET_PHOTO_LAYOUT": {
      const { secId, ci, count } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => ({
          ...col,
          photoLayout: count,
          photos: col.photos.slice(0, count),
        })),
      };
    }

    case "SET_PHOTO": {
      const { secId, ci, slotIdx, photo } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => {
          const photos = [...col.photos];
          photos[slotIdx] = {
            id: photos[slotIdx]?.id || uid(),
            ...photo,
          };
          return { ...col, photos };
        }),
      };
    }

    case "REMOVE_PHOTO": {
      const { secId, ci, slotIdx } = action.payload;
      return {
        ...state,
        sections: updCol(state.sections, secId, ci, (col) => ({
          ...col,
          photos: col.photos.filter((_, i) => i !== slotIdx),
          photoLayout: Math.max(0, col.photoLayout - 1),
        })),
      };
    }

    case "SET_ACTIVE_SECTION":
      return { ...state, activeSection: action.payload };

    case "SET_PHOTO_EDITOR":
      return { ...state, photoEditor: action.payload };

    case "SET_DOWNLOADING":
      return { ...state, downloading: action.payload };

    case "TOGGLE_DL_MENU":
      return { ...state, showDlMenu: !state.showDlMenu };

    case "LOAD_STATE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────
const BiodataStateContext = createContext(null);
const BiodataDispatchContext = createContext(null);

export function BiodataProvider({ children }) {
  const [state, dispatch] = useReducer(biodataReducer, initialState);

  return (
    <BiodataStateContext.Provider value={state}>
      <BiodataDispatchContext.Provider value={dispatch}>
        {children}
      </BiodataDispatchContext.Provider>
    </BiodataStateContext.Provider>
  );
}

export function useBiodata() {
  const ctx = useContext(BiodataStateContext);
  if (ctx === null) {
    throw new Error("useBiodata must be used within a BiodataProvider");
  }
  return ctx;
}

export function useDispatch() {
  const ctx = useContext(BiodataDispatchContext);
  if (ctx === null) {
    throw new Error("useDispatch must be used within a BiodataProvider");
  }
  return ctx;
}

export { TEMPLATES, TYPO_DEFAULTS, mkCol, mkSection };
