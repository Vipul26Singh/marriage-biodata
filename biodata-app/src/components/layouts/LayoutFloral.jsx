import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import './LayoutFloral.css';

function FloralCorner({ color, className }) {
  return (
    <svg className={className} width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Curved vine */}
      <path d="M5 85 C5 45, 20 20, 85 5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M10 85 C10 50, 25 28, 80 10" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* Leaves */}
      <path d="M20 65 C25 55, 35 55, 30 65 C25 75, 15 75, 20 65Z" fill={color} opacity="0.25" />
      <path d="M35 50 C40 40, 50 40, 45 50 C40 60, 30 60, 35 50Z" fill={color} opacity="0.2" />
      <path d="M50 35 C55 25, 65 25, 60 35 C55 45, 45 45, 50 35Z" fill={color} opacity="0.2" />
      {/* Small flowers (circles) */}
      <circle cx="15" cy="70" r="3" fill={color} opacity="0.35" />
      <circle cx="30" cy="55" r="2.5" fill={color} opacity="0.3" />
      <circle cx="45" cy="40" r="3" fill={color} opacity="0.35" />
      <circle cx="60" cy="28" r="2" fill={color} opacity="0.25" />
      <circle cx="70" cy="18" r="2.5" fill={color} opacity="0.3" />
      {/* Flower petals at key points */}
      <circle cx="15" cy="70" r="5" fill={color} opacity="0.1" />
      <circle cx="45" cy="40" r="5" fill={color} opacity="0.1" />
    </svg>
  );
}

function FloralBorderTop({ color }) {
  return (
    <svg className="lf-border-top" width="680" height="16" viewBox="0 0 680 16" fill="none" preserveAspectRatio="none">
      <path d="M0 8 Q85 2, 170 8 T340 8 T510 8 T680 8" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M0 10 Q85 4, 170 10 T340 10 T510 10 T680 10" stroke={color} strokeWidth="0.5" fill="none" opacity="0.2" />
      {[85, 170, 255, 340, 425, 510, 595].map(x => (
        <circle key={x} cx={x} cy="8" r="2" fill={color} opacity="0.25" />
      ))}
    </svg>
  );
}

function FloralBorderBottom({ color }) {
  return (
    <svg className="lf-border-bottom" width="680" height="16" viewBox="0 0 680 16" fill="none" preserveAspectRatio="none">
      <path d="M0 8 Q85 14, 170 8 T340 8 T510 8 T680 8" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M0 6 Q85 12, 170 6 T340 6 T510 6 T680 6" stroke={color} strokeWidth="0.5" fill="none" opacity="0.2" />
      {[85, 170, 255, 340, 425, 510, 595].map(x => (
        <circle key={x} cx={x} cy="8" r="2" fill={color} opacity="0.25" />
      ))}
    </svg>
  );
}

function FloralBorderLeft({ color }) {
  return (
    <svg className="lf-border-left" width="16" height="100%" viewBox="0 0 16 960" preserveAspectRatio="none" fill="none">
      <path d="M8 0 Q2 120, 8 240 T8 480 T8 720 T8 960" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      {[120, 240, 360, 480, 600, 720, 840].map(y => (
        <circle key={y} cx="8" cy={y} r="2" fill={color} opacity="0.25" />
      ))}
    </svg>
  );
}

function FloralBorderRight({ color }) {
  return (
    <svg className="lf-border-right" width="16" height="100%" viewBox="0 0 16 960" preserveAspectRatio="none" fill="none">
      <path d="M8 0 Q14 120, 8 240 T8 480 T8 720 T8 960" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      {[120, 240, 360, 480, 600, 720, 840].map(y => (
        <circle key={y} cx="8" cy={y} r="2" fill={color} opacity="0.25" />
      ))}
    </svg>
  );
}

function RoseDivider({ color }) {
  return (
    <div className="lf-rose-divider">
      <svg width="200" height="20" viewBox="0 0 200 20" fill="none">
        <line x1="0" y1="10" x2="70" y2="10" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <line x1="130" y1="10" x2="200" y2="10" stroke={color} strokeWidth="0.5" opacity="0.3" />
        {/* Rose/petal shape */}
        <ellipse cx="100" cy="10" rx="6" ry="4" fill={color} opacity="0.2" />
        <ellipse cx="100" cy="10" rx="4" ry="6" fill={color} opacity="0.2" />
        <circle cx="100" cy="10" r="2.5" fill={color} opacity="0.35" />
        {/* Small petals */}
        <ellipse cx="88" cy="10" rx="3" ry="2" fill={color} opacity="0.15" />
        <ellipse cx="112" cy="10" rx="3" ry="2" fill={color} opacity="0.15" />
      </svg>
    </div>
  );
}

export default function LayoutFloral({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="lf-sheet"
      style={{
        '--primary': t.primary,
        '--accent': t.accent,
        '--bg': t.bg,
        '--accent-border': t.accent + '44',
        '--accent-soft': t.accent + '1e',
        fontFamily: font.family,
        borderRadius: `${state.brTL}px ${state.brTR}px ${state.brBR}px ${state.brBL}px`,
        overflow: 'hidden',
      }}
    >
      {/* Custom background */}
      {state.customBg && (
        <div
          className="lf-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      {/* Floral borders along 4 edges */}
      {state.showBorder && (
        <>
          <FloralBorderTop color={t.accent} />
          <FloralBorderBottom color={t.accent} />
          <FloralBorderLeft color={t.accent} />
          <FloralBorderRight color={t.accent} />
          <FloralCorner color={t.accent} className="lf-corner lf-corner-tl" />
          <FloralCorner color={t.accent} className="lf-corner lf-corner-tr" />
          <FloralCorner color={t.accent} className="lf-corner lf-corner-bl" />
          <FloralCorner color={t.accent} className="lf-corner lf-corner-br" />
        </>
      )}

      <div
        className="lf-inner"
        style={{
          paddingTop: state.marginTop,
          paddingLeft: state.marginLeft,
          paddingRight: state.marginRight,
        }}
      >
        <div className="lf-title" style={{ color: t.primary }}>
          {state.title || 'Marriage Biodata'}
        </div>

        {state.showBorder && <RoseDivider color={t.accent} />}

        {/* Profile photo */}
        {state.showProfile && (
          <div className="lf-pf-row">
            {state.profilePic
              ? <img src={state.profilePic} className="lf-pf-img" alt="Profile" />
              : <div className="lf-pf-ph">&#10047;</div>
            }
          </div>
        )}

        {/* Sections */}
        {state.sections.map((sec, si) => (
          <div key={sec.id}>
            {si > 0 && state.showBorder && <RoseDivider color={t.accent} />}
            {si > 0 && !state.showBorder && <div className="lf-s-hr" />}
            <div className="lf-p-sec">
              <div className={`lf-p-grid ${sec.twoCol ? 'lf-two' : ''}`}>
                {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                  const col = sec.columns[ci];
                  const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                  if (!hasAny && !sec.twoCol) return null;
                  return (
                    <div key={ci}>
                      {col.heading && (
                        <div
                          className="lf-p-ch"
                          style={{
                            fontSize: typo.secSize,
                            lineHeight: typo.secLH,
                            fontWeight: typo.secBold ? 600 : 400,
                            color: t.primary,
                          }}
                        >
                          {col.heading}
                        </div>
                      )}
                      <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                      {col.fields.map(f =>
                        (f.key || f.value) ? (
                          <div key={f.id} className="lf-p-kv">
                            {f.key && (
                              <span
                                className="lf-p-key"
                                style={{
                                  fontSize: typo.keySize,
                                  lineHeight: typo.keyLH,
                                  fontWeight: typo.keyBold ? 600 : 400,
                                }}
                              >
                                {f.key}
                              </span>
                            )}
                            {f.key && <span className="lf-p-sep">:</span>}
                            <span
                              className={`lf-p-val${f.value ? '' : ' lf-empty'}`}
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
          <div className="lf-footer">
            <RoseDivider color={t.accent} />
          </div>
        )}

        {state.watermark.enabled && state.watermark.text && (
          <div className="lf-watermark" style={{ opacity: state.watermark.opacity }}>
            {state.watermark.text}
          </div>
        )}
      </div>
    </div>
  );
}
