import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import Watermark from '../shared/Watermark';
import './LayoutOrnate.css';

/* SVG mandala-inspired corner piece */
function MandalaCorner({ color }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <path d="M0 0 L90 0 L90 12 Q50 12, 12 50 L12 90 L0 90 Z" fill={color} opacity="0.05" />
      <circle cx="14" cy="14" r="12" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="14" cy="14" r="7" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="14" cy="14" r="3" fill={color} opacity="0.35" />
      <path d="M28 5 Q42 5, 42 18" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M5 28 Q5 42, 18 42" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M34 9 Q44 9, 44 20" stroke={color} strokeWidth="0.6" fill="none" opacity="0.2" />
      <path d="M9 34 Q9 44, 20 44" stroke={color} strokeWidth="0.6" fill="none" opacity="0.2" />
      <circle cx="26" cy="6" r="1.8" fill={color} opacity="0.25" />
      <circle cx="6" cy="26" r="1.8" fill={color} opacity="0.25" />
      <circle cx="36" cy="12" r="1.2" fill={color} opacity="0.2" />
      <circle cx="12" cy="36" r="1.2" fill={color} opacity="0.2" />
      {/* paisley-like teardrop */}
      <path d="M20 20 Q28 12, 28 20 Q28 28, 20 20Z" stroke={color} strokeWidth="0.8" fill={color} fillOpacity="0.06" opacity="0.3" />
    </svg>
  );
}

/* Decorative flourish divider */
function OrnateFlourish({ color }) {
  return (
    <svg width="200" height="20" viewBox="0 0 200 20" fill="none" style={{ display: 'block', margin: '0 auto' }}>
      <path d="M0 10 Q30 0, 60 10" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M60 10 Q80 18, 100 10" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M100 10 Q120 2, 140 10" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M140 10 Q170 20, 200 10" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="100" cy="10" r="4" stroke={color} strokeWidth="1" fill="none" opacity="0.35" />
      <circle cx="100" cy="10" r="1.5" fill={color} opacity="0.4" />
      <circle cx="60" cy="10" r="1.5" fill={color} opacity="0.2" />
      <circle cx="140" cy="10" r="1.5" fill={color} opacity="0.2" />
    </svg>
  );
}

export default function LayoutOrnate({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="lo-sheet"
      style={{
        '--lo-primary': t.primary,
        '--lo-accent': t.accent,
        '--lo-bg': t.bg,
        fontFamily: font.family,
        borderRadius: `${state.brTL}px ${state.brTR}px ${state.brBR}px ${state.brBL}px`,
        overflow: 'hidden',
      }}
    >
      {/* Custom background */}
      {state.customBg && (
        <div
          className="lo-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      {/* Triple border frame */}
      {state.showBorder && (
        <>
          <div className="lo-border-1" style={{ borderColor: t.accent }} />
          <div className="lo-border-2" style={{ borderColor: t.accent + '55' }} />
          <div className="lo-border-3" style={{ borderColor: t.accent + '33' }} />
          <div className="lo-corner lo-corner-tl"><MandalaCorner color={t.accent} /></div>
          <div className="lo-corner lo-corner-tr"><MandalaCorner color={t.accent} /></div>
          <div className="lo-corner lo-corner-bl"><MandalaCorner color={t.accent} /></div>
          <div className="lo-corner lo-corner-br"><MandalaCorner color={t.accent} /></div>
        </>
      )}

      <div
        className="lo-inner"
        style={{
          paddingTop: state.marginTop + 10,
          paddingLeft: state.marginLeft + 10,
          paddingRight: state.marginRight + 10,
        }}
      >
        {/* Top ornament */}
        {state.showBorder && <OrnateFlourish color={t.accent} />}

        {/* Title with decorative lines */}
        <div className="lo-title-block">
          {state.showBorder && <div className="lo-title-line" style={{ background: `linear-gradient(to right, transparent, ${t.accent}88, transparent)` }} />}
          <div className="lo-title" style={{ color: t.primary }}>
            {state.title || 'Marriage Biodata'}
          </div>
          {state.showBorder && (
            <>
              <div className="lo-title-line" style={{ background: `linear-gradient(to right, transparent, ${t.accent}88, transparent)` }} />
              <div className="lo-title-line lo-title-line-thin" style={{ background: `linear-gradient(to right, transparent, ${t.accent}44, transparent)` }} />
            </>
          )}
        </div>

        {/* Profile photo with ornate frame */}
        {state.showProfile && (
          <div className="lo-pf-row">
            <div className="lo-pf-frame" style={{ borderColor: t.accent }}>
              {state.profilePic
                ? <img src={state.profilePic} className="lo-pf-img" alt="Profile" />
                : <div className="lo-pf-ph" style={{ color: t.accent }}>&#10022;</div>
              }
            </div>
          </div>
        )}

        {/* Sections */}
        {state.sections.map((sec, si) => (
          <div key={sec.id}>
            {si > 0 && state.showBorder && (
              <div className="lo-sec-divider"><OrnateFlourish color={t.accent} /></div>
            )}
            <div className="lo-sec">
              <div className={`lo-grid ${sec.twoCol ? 'lo-two' : ''}`}>
                {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                  const col = sec.columns[ci];
                  const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                  if (!hasAny && !sec.twoCol) return null;
                  return (
                    <div key={ci}>
                      {col.heading && (
                        <div className="lo-ch" style={{ color: t.primary, borderBottomColor: t.accent + '44' }}>
                          <span className="lo-ch-deco" style={{ color: t.accent }}>&#10087;</span>
                          <span
                            style={{
                              fontSize: typo.secSize,
                              lineHeight: typo.secLH,
                              fontWeight: typo.secBold ? 700 : 400,
                            }}
                          >
                            {col.heading}
                          </span>
                          <span className="lo-ch-deco" style={{ color: t.accent }}>&#10087;</span>
                        </div>
                      )}
                      <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                      {col.fields.map(f =>
                        (f.key || f.value) ? (
                          <div key={f.id} className="lo-kv">
                            {f.key && (
                              <span
                                className="lo-key"
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
                            {f.key && <span className="lo-sep" style={{ color: t.accent }}>:</span>}
                            <span
                              className={`lo-val${f.value ? '' : ' lo-empty'}`}
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

        {/* Bottom ornament */}
        {state.showBorder && (
          <div className="lo-footer">
            <OrnateFlourish color={t.accent} />
          </div>
        )}
      </div>

      <Watermark text={state.watermark.text} opacity={state.watermark.opacity} enabled={state.watermark.enabled} />
    </div>
  );
}
