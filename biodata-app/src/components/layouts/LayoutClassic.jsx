import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import './LayoutClassic.css';

export default function LayoutClassic({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="lc-sheet"
      style={{
        '--primary': t.primary,
        '--accent': t.accent,
        '--bg': t.bg,
        '--accent-border': t.accent + '66',
        '--accent-soft': t.accent + '1e',
        fontFamily: font.family,
        borderRadius: `${state.brTL}px ${state.brTR}px ${state.brBR}px ${state.brBL}px`,
        overflow: 'hidden',
      }}
    >
      {/* Diagonal texture */}
      <svg className="lc-texture">
        <defs>
          <pattern id="lc-diag" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="20" stroke={t.accent} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lc-diag)" />
      </svg>

      {/* Custom background */}
      {state.customBg && (
        <div
          className="lc-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      {/* Border decorations */}
      {state.showBorder && (
        <>
          <div className="lc-fb" />
          <div className="lc-fbi" />
          <div className="lc-corner lc-c-tl" />
          <div className="lc-corner lc-c-tr" />
          <div className="lc-corner lc-c-bl" />
          <div className="lc-corner lc-c-br" />
        </>
      )}

      <div
        className="lc-inner"
        style={{
          paddingTop: state.marginTop,
          paddingLeft: state.marginLeft,
          paddingRight: state.marginRight,
        }}
      >
        {state.showBorder && <div className="lc-motif">&#10022; &#10087; &#10022;</div>}
        <div className="lc-title" style={{ color: t.primary }}>{state.title || 'Marriage Biodata'}</div>
        {state.showBorder && (
          <div className="lc-divider">
            <div className="lc-dv-line" />
            <div className="lc-dv-dia" style={{ background: t.accent }} />
            <div className="lc-dv-line" />
          </div>
        )}

        {/* Profile photo */}
        {state.showProfile && (
          <div className="lc-pf-row">
            {state.profilePic
              ? <img src={state.profilePic} className="lc-pf-img" alt="Profile" />
              : <div className="lc-pf-ph">&#10022;</div>
            }
          </div>
        )}

        {/* Sections */}
        {state.sections.map((sec, si) => (
          <div key={sec.id}>
            {si > 0 && <div className="lc-s-hr" />}
            <div className="lc-p-sec">
              <div className={`lc-p-grid ${sec.twoCol ? 'lc-two' : ''}`}>
                {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                  const col = sec.columns[ci];
                  const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                  if (!hasAny && !sec.twoCol) return null;
                  return (
                    <div key={ci}>
                      {col.heading && (
                        <div
                          className="lc-p-ch"
                          style={{
                            fontSize: typo.secSize,
                            lineHeight: typo.secLH,
                            fontWeight: typo.secBold ? 600 : 400,
                          }}
                        >
                          {col.heading}
                        </div>
                      )}
                      <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                      {col.fields.map(f =>
                        (f.key || f.value) ? (
                          <div key={f.id} className="lc-p-kv">
                            {f.key && (
                              <span
                                className="lc-p-key"
                                style={{
                                  fontSize: typo.keySize,
                                  lineHeight: typo.keyLH,
                                  fontWeight: typo.keyBold ? 600 : 400,
                                }}
                              >
                                {f.key}
                              </span>
                            )}
                            {f.key && <span className="lc-p-sep">:</span>}
                            <span
                              className={`lc-p-val${f.value ? '' : ' lc-empty'}`}
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
          <div className="lc-footer">
            <div className="lc-footer-m">&#10022; &#10087; &#10022;</div>
          </div>
        )}

        {/* Watermark */}
        {state.watermark.enabled && state.watermark.text && (
          <div className="lc-watermark" style={{ opacity: state.watermark.opacity }}>
            {state.watermark.text}
          </div>
        )}
      </div>
    </div>
  );
}
