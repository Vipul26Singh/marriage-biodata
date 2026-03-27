import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import './LayoutElegant.css';

function SwirlDivider({ color }) {
  return (
    <div className="le-swirl-divider">
      <svg width="240" height="20" viewBox="0 0 240 20" fill="none">
        <path d="M0 10 L60 10" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <path d="M180 10 L240 10" stroke={color} strokeWidth="0.5" opacity="0.3" />
        {/* Calligraphic swirl */}
        <path d="M65 10 C70 3, 80 3, 85 10 C90 17, 95 17, 100 10 C105 3, 110 3, 120 10 C130 17, 135 17, 140 10 C145 3, 150 3, 155 10 C160 17, 170 17, 175 10" stroke={color} strokeWidth="1" fill="none" opacity="0.45" />
        <path d="M70 10 C75 5, 82 5, 87 10 C92 15, 97 15, 102 10 C107 5, 112 5, 120 10 C128 15, 133 15, 138 10 C143 5, 148 5, 153 10 C158 15, 165 15, 170 10" stroke={color} strokeWidth="0.5" fill="none" opacity="0.25" />
      </svg>
    </div>
  );
}

function DiamondOrnament({ color }) {
  return (
    <div className="le-diamond-ornament">
      <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
        <line x1="0" y1="7" x2="14" y2="7" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <rect x="16" y="3" width="8" height="8" transform="rotate(45 20 7)" fill={color} opacity="0.3" />
        <line x1="26" y1="7" x2="40" y2="7" stroke={color} strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
}

export default function LayoutElegant({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="le-sheet"
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
          className="le-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      {/* Double-line border */}
      {state.showBorder && (
        <>
          <div className="le-border-outer" style={{ borderColor: t.accent }} />
          <div className="le-border-inner" style={{ borderColor: t.accent + '55' }} />
        </>
      )}

      <div
        className="le-inner"
        style={{
          paddingTop: state.marginTop,
          paddingLeft: state.marginLeft,
          paddingRight: state.marginRight,
        }}
      >
        <div className="le-title" style={{ color: t.primary }}>
          {state.title || 'Marriage Biodata'}
        </div>

        {state.showBorder && <SwirlDivider color={t.accent} />}

        {/* Profile photo */}
        {state.showProfile && (
          <div className="le-pf-row">
            {state.profilePic
              ? <img src={state.profilePic} className="le-pf-img" style={{ borderColor: t.accent + '88' }} alt="Profile" />
              : <div className="le-pf-ph" style={{ borderColor: t.accent + '44', color: t.accent }}>&#10022;</div>
            }
          </div>
        )}

        {/* Sections */}
        {state.sections.map((sec, si) => (
          <div key={sec.id}>
            {si > 0 && state.showBorder && <SwirlDivider color={t.accent} />}
            {si > 0 && !state.showBorder && <div className="le-s-hr" />}
            <div className="le-p-sec">
              <div className={`le-p-grid ${sec.twoCol ? 'le-two' : ''}`}>
                {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                  const col = sec.columns[ci];
                  const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                  if (!hasAny && !sec.twoCol) return null;
                  return (
                    <div key={ci}>
                      {col.heading && (
                        <div className="le-p-ch-wrap">
                          <div
                            className="le-p-ch"
                            style={{
                              fontSize: typo.secSize,
                              lineHeight: typo.secLH,
                              fontWeight: typo.secBold ? 600 : 400,
                              color: t.primary,
                            }}
                          >
                            {col.heading}
                          </div>
                          {state.showBorder && <DiamondOrnament color={t.accent} />}
                        </div>
                      )}
                      <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                      {col.fields.map(f =>
                        (f.key || f.value) ? (
                          <div key={f.id} className="le-p-kv">
                            {f.key && (
                              <span
                                className="le-p-key"
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
                            {f.key && <span className="le-p-sep" style={{ color: t.accent }}>:</span>}
                            <span
                              className={`le-p-val${f.value ? '' : ' le-empty'}`}
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
          <div className="le-footer">
            <SwirlDivider color={t.accent} />
          </div>
        )}

        {state.watermark.enabled && state.watermark.text && (
          <div className="le-watermark" style={{ opacity: state.watermark.opacity, color: t.primary }}>
            {state.watermark.text}
          </div>
        )}
      </div>
    </div>
  );
}
