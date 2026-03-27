export const FONT_FAMILIES = [
  { id: "lora", label: "Lora", family: "'Lora', serif", url: "Lora:ital,wght@0,400;0,500;1,400" },
  { id: "playfair", label: "Playfair Display", family: "'Playfair Display', serif", url: "Playfair+Display:ital,wght@0,400;0,600;0,700;1,400" },
  { id: "cormorant", label: "Cormorant Garamond", family: "'Cormorant Garamond', serif", url: "Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400" },
  { id: "poppins", label: "Poppins", family: "'Poppins', sans-serif", url: "Poppins:wght@300;400;500;600" },
  { id: "notoSerif", label: "Noto Serif", family: "'Noto Serif', serif", url: "Noto+Serif:ital,wght@0,400;0,700;1,400" },
  { id: "mukta", label: "Mukta", family: "'Mukta', sans-serif", url: "Mukta:wght@300;400;500;600" },
  { id: "tiroDevanagari", label: "Tiro Devanagari", family: "'Tiro Devanagari', serif", url: "Tiro+Devanagari:ital@0;1" },
  { id: "notoSansDevanagari", label: "Noto Sans Devanagari", family: "'Noto Sans Devanagari', sans-serif", url: "Noto+Sans+Devanagari:wght@400;500;600" },
];

export const buildFontUrl = (ids) => {
  const families = FONT_FAMILIES.filter(f => ids.includes(f.id)).map(f => f.url).join('&family=');
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
};
