# Biodata Generator — User Guide

This guide walks you through every feature of Biodata Generator so you can create the perfect marriage biodata.

---

## Getting Started

When you open the app, you'll see a split-screen layout:
- **Left panel** — The editor where you configure everything
- **Right panel** — A live preview of your biodata document

On mobile, use the **Edit / Preview** tabs at the top to switch between panels.

The left panel has three collapsible sections: **Theme**, **Design**, and **Data**. Click on any section header to expand or collapse it.

The top bar also has **Undo/Redo** buttons, a **Share** button, and a **Download** button.

---

## 1. Theme

Expand the **Theme** panel to change the visual layout, colors, and toggle decorative borders.

### Layout Templates

Choose from 8 distinct visual layouts:

| Layout | Description |
|--------|-------------|
| **Classic** | Corner ornaments, fine borders, diagonal texture, decorative motifs |
| **Floral** | SVG floral vine borders, rose dividers, soft feminine aesthetic |
| **Minimalist** | No borders, generous whitespace, hairline dividers, ultra-clean |
| **Modern Card** | Card-style sections with shadows, colored banner header |
| **Traditional** | Heavy double borders, mandala/paisley corners, ornamental flourishes |
| **Elegant** | Thin double-line border, calligraphic swirl dividers, diamond ornaments |
| **Royal** | Dark header band with crest motif, two-tone design, crown accents |
| **Contemporary** | Asymmetric sidebar layout — profile on left, content on right |

Click any layout card to switch. The preview updates instantly.

### Color Themes

Click any of the colored dots to apply a preset color theme:
- **Royal Gold** — Deep maroon with gold accents on warm ivory
- **Rose Pink** — Rich pink with copper accents on soft blush
- **Emerald** — Forest green with gold accents on mint
- **Navy Classic** — Deep navy with gold accents on cool white

### Custom Theme

Click the dot with the **pencil icon** to create a custom theme. It starts with the colors of your currently selected theme. Three color pickers appear:
- **Primary** — Headings, labels, and text color
- **Accent** — Decorative elements, borders, photo frames
- **Background** — Document sheet background color

### Borders Toggle

The **Borders** toggle controls all decorative elements (ornaments, borders, motifs, dividers). Turn off when using a custom background image for a clean look.

---

## 2. Design

Expand the **Design** panel to control background images, spacing, corners, typography, fonts, language, and watermark.

### Background Image
- Click **+ Upload Image** to select an image
- Controls appear after upload:
  - **Opacity** — 0% (invisible) to 100% (fully visible). Start at 15-25% for subtle textures.
  - **Blur** — 0-20px. Makes text more readable over busy images.
  - **Size** — Cover, Contain, Stretch, or Original
  - **Position** — Center, Top, Bottom, Left, Right, or any corner
- Click **Change** to replace, or **X** to remove

### Padding
Three sliders control inner spacing:
- **Top pad** — Space above title (default: 46px)
- **Left pad** — Left margin (default: 50px)
- **Right pad** — Right margin (default: 50px)

### Corners
Four sliders for independent border radius on each corner (0-40px).

### Typography
Fine-tune three text elements independently:

**Section Heading** (e.g., "Personal Details")
- Size: 8-28px (default: 14.5px)
- Line spacing: 0.8-2.5 (default: 1.3)
- **B** button to toggle bold

**Label** (e.g., "Full Name")
- Size: 8-22px (default: 11.5px)
- Line spacing: 0.8-2.5 (default: 1.4)
- **B** button to toggle bold

**Value** (the data you enter)
- Size: 8-22px (default: 12px)
- Line spacing: 0.8-2.5 (default: 1.4)
- **B** button to toggle bold

Click **Reset** to restore all typography defaults.

### Font Family
Choose from 8 font families:
- Lora, Playfair Display, Cormorant Garamond (serif)
- Poppins, Mukta (sans-serif)
- Noto Serif, Noto Sans Devanagari, Tiro Devanagari (multi-script)

Use Noto or Tiro fonts for Hindi, Gujarati, Marathi, or other Devanagari-script languages.

### Language
Switch default labels between 8 languages:
- English, Hindi, Gujarati, Tamil, Marathi, Punjabi, Bengali, Telugu

This affects default labels when creating new sections. Existing user-typed values are never changed.

### Watermark
- **Toggle** — Enable/disable the watermark
- **Text** — Custom watermark text (e.g., your studio name)
- **Opacity** — How visible the watermark is

---

## 3. Data

Expand the **Data** panel to manage your biodata content.

### Title
Type your document title. Default is "Marriage Biodata".

### Profile Photo
- **Toggle** — Show/hide the profile photo section
- **Upload** — Select a photo from your device
- **Change** — Replace the current photo
- **X** — Remove the photo

### Save / Load Controls

| Button | Action |
|--------|--------|
| **Save** | Explicitly saves to browser storage |
| **Load Sample** | Fills in realistic sample data for instant demo |
| **Export JSON** | Downloads your biodata data as a .json file for backup |
| **Import JSON** | Loads a previously exported .json file |

Note: Your work is also auto-saved every few seconds.

### Sections

Each section appears as a collapsible card. Click the header to expand.

**Header controls:**
- **Up/Down arrows** — Reorder sections
- **X** — Delete a section

**Inside a section:**
- **Two Column toggle** — Split into two side-by-side columns
- **Heading** — Section title shown on the document
- **Fields** — Key-value pairs (Label + Value). Click **+ Add Field** to add more.
- **Photos** — Add photos within a section using the layout picker

**Adding sections:** Click **Add Section** at the bottom.

### Photo Editor

When you upload or edit a photo, a modal editor opens:
- **Zoom** — Zoom in/out
- **Rotate** — Rotate the image
- **Pan** — Click and drag to reposition
- **Shape** — Circle or square crop
- **Grid** — Rule-of-thirds overlay for composition
- **Confirm/Cancel** — Apply or discard

---

## 4. Download & Share

### Download
Click the **Download** button in the top bar. Choose:
- **PNG Image** — Lossless, supports transparency
- **JPG Image** — Smaller file size, good for sharing
- **PDF Document** — A4-proportioned, ideal for printing

All exports are rendered at 2x resolution for crisp output.

### Share
Click the **Share** button:
- **WhatsApp** — Opens WhatsApp with a share link
- **Email** — Opens your email client with pre-filled subject

On mobile devices with Web Share API support, native sharing is used automatically.

### Print
Use your browser's print function (Ctrl/Cmd + P). The app has dedicated print CSS — only the biodata document prints, not the editor.

---

## 5. Undo / Redo

The **↩** (undo) and **↪** (redo) buttons in the top bar let you step back and forth through your changes. Rapid text typing is grouped into single undo entries for efficiency.

---

## Tips for Great Results

1. **Start with a layout** — Choose the layout that matches your vision, then adjust colors.
2. **Try "Load Sample"** — See how a complete biodata looks before entering your own data.
3. **Keep backgrounds subtle** — 10-25% opacity for background images ensures readability.
4. **Use Devanagari fonts** — Switch to Noto Sans Devanagari or Tiro Devanagari when using Hindi, Gujarati, or Marathi.
5. **Turn off borders with backgrounds** — Decorative borders can clash with custom images.
6. **Export JSON regularly** — Keep backups of your work beyond browser storage.
7. **Try Contemporary layout** — Its sidebar design works especially well for modern profiles.

---

## Keyboard Shortcuts

| Action       | Shortcut       |
|--------------|----------------|
| Print / PDF  | Ctrl/Cmd + P   |
| Undo         | Click ↩ button |
| Redo         | Click ↪ button |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Photos look blurry | Upload higher resolution images and use zoom to fit |
| Text too small | Increase font sizes in Typography section |
| Background image too distracting | Lower opacity or increase blur |
| Content overflows | Reduce padding, font sizes, or remove some fields |
| Can't see Devanagari text | Switch font family to Noto Sans Devanagari or Tiro Devanagari |
| Lost my work | Check if auto-save is working; use Export JSON for manual backups |
| Layout looks different on mobile | The document always renders at 680px width; use Preview tab to see it |
