import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import './LayoutRoyal.css';

function ShieldCrest({ color }) {
  return (
    <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
      {/* Shield shape */}
      <path d="M24 2 L44 10 L44 28 C44 40, 34 48, 24 50 C14 48, 4 40, 4 28 L4 10 Z" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M24 6 L40 12 L40 27 C40 37, 32 44, 24 46 C16 44, 8 37, 8 27 L8 12 Z" stroke={color} strokeWidth="0.6" fill="none" opacity="0.3" />
      {/* Inner cross/star */}
      <line x1="24" y1="14" x2="24" y2="38" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="14" y1="24" x2="34" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="24" cy="24" r="5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="24" cy="24" r="2" fill={color} opacity="0.35" />
    </svg>
  );
}

function CrownAccent({ color }) {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ verticalAlign: 'middle' }}>
      <path d="M2 10 L5 3 L8 7 L12 1 L16 7 L19 3 L22 10 Z" stroke={color} strokeWidth="1" fill={color} opacity="0.2" />
      <line x1="1" y1="10" x2="23" y2="10" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

export default function LayoutRoyal({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="lr-sheet"
      style={{
        '--primary': t.primary,
        '--accent': t.accent,
        '--bg': t.bg,
        fontFamily: font.family,
        borderRadius: `${state.brTL}px ${state.brTR}px ${state.brBR}px ${state.brBL}px`,
        overflow: 'hidden',
      }}
    >
      {/* Custom background */}
      {state.customBg && (
        <div
          className="lr-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      {/* Dark header band */}
      <div className="lr-header" style={{ background: t.primary }}>
        {state.showBorder && (
          <div className="lr-header-crest">
            <ShieldCrest color={t.accent} />
          </div>
        )}
        <div className="lr-header-title" style={{ color: t.accent, fontFamily: font.family }}>
          {state.title || 'Marriage Biodata'}
        </div>
        <div className="lr-header-line" style={{ background: t.accent }} />
      </div>

      {/* Body */}
      <div
        className="lr-body"
        style={{
          paddingLeft: state.marginLeft,
          paddingRight: state.marginRight,
          paddingBottom: state.marginTop,
        }}
      >
        {/* Profile photo */}
        {state.showProfile && (
          <div className="lr-pf-row">
            {state.profilePic
              ? <img src={state.profilePic} className="lr-pf-img" style={{ borderColor: t.accent }} alt="Profile" />
              : <div className="lr-pf-ph" style={{ borderColor: t.accent + '44', color: t.accent }}>&#9813;</div>
            }
          </div>
        )}

        {/* Sections */}
        {state.sections.map((sec, si) => (
          <div key={sec.id}>
            {si > 0 && (
              <div className="lr-sec-divider" style={{ background: `linear-gradient(to right, transparent, ${t.accent}44, transparent)` }} />
            )}
            <div className="lr-p-sec">
              <div className={`lr-p-grid ${sec.twoCol ? 'lr-two' : ''}`}>
                {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                  const col = sec.columns[ci];
                  const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                  if (!hasAny && !sec.twoCol) return null;
                  return (
                    <div key={ci}>
                      {col.heading && (
                        <div className="lr-p-ch-wrap">
                          {state.showBorder && <CrownAccent color={t.accent} />}
                          <span
                            className="lr-p-ch"
                            style={{
                              fontSize: typo.secSize,
                              lineHeight: typo.secLH,
                              fontWeight: typo.secBold ? 600 : 400,
                              color: t.primary,
                            }}
                          >
                            {col.heading}
                          </span>
                        </div>
                      )}
                      <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                      {col.fields.map(f =>
                        (f.key || f.value) ? (
                          <div key={f.id} className="lr-p-kv">
                            {f.key && (
                              <span
                                className="lr-p-key"
                                style={{
                                  fontSize: typo.keySize,
                                  lineHeight: typo.keyLH,
                                  fontWeight: typo.keyBold ? 600 : 400,
                                  color: t.primary,
                                }}
                              >
                                {f.key}
                              </span>
                            )}
                            {f.key && <span className="lr-p-sep" style={{ color: t.accent }}>:</span>}
                            <span
                              className={`lr-p-val${f.value ? '' : ' lr-empty'}`}
                              style={{
                                fontSize: typo.valSize,
                                lineHeight: typo.valLH,
                                fontWeight: typo.valBold ? 600 : 400,
                              }}
                            >
                              {f.value || '\u2014'}
                            </span>
                          </div>
                        ) : null
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {state.showBorder && (
          <div className="lr-footer">
            <ShieldCrest color={t.accent} />
          </div>
        )}

        {state.watermark.enabled && state.watermark.text && (
          <div className="lr-watermark" style={{ opacity: state.watermark.opacity, color: t.primary }}>
            {state.watermark.text}
          </div>
        )}
      </div>
    </div>
  );
}
