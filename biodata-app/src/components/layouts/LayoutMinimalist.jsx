import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import './LayoutMinimalist.css';

export default function LayoutMinimalist({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="lm-sheet"
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
          className="lm-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      <div
        className="lm-inner"
        style={{
          paddingTop: state.marginTop,
          paddingLeft: state.marginLeft,
          paddingRight: state.marginRight,
        }}
      >
        <div className="lm-title" style={{ color: t.primary }}>
          {state.title || 'Marriage Biodata'}
        </div>
        <div className="lm-title-line" style={{ background: t.accent }} />

        {/* Profile photo */}
        {state.showProfile && (
          <div className="lm-pf-row">
            {state.profilePic
              ? <img src={state.profilePic} className="lm-pf-img" alt="Profile" />
              : <div className="lm-pf-ph" style={{ borderColor: t.accent + '44' }}>&#9737;</div>
            }
          </div>
        )}

        {/* Sections */}
        {state.sections.map((sec, si) => (
          <div key={sec.id}>
            {si > 0 && <div className="lm-divider" />}
            <div className="lm-p-sec">
              <div className={`lm-p-grid ${sec.twoCol ? 'lm-two' : ''}`}>
                {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                  const col = sec.columns[ci];
                  const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                  if (!hasAny && !sec.twoCol) return null;
                  return (
                    <div key={ci}>
                      {col.heading && (
                        <div className="lm-p-ch">
                          <span
                            className="lm-p-ch-text"
                            style={{
                              fontSize: typo.secSize,
                              lineHeight: typo.secLH,
                              fontWeight: typo.secBold ? 600 : 400,
                              color: t.primary,
                            }}
                          >
                            {col.heading}
                          </span>
                          <div className="lm-p-ch-line" style={{ background: t.accent }} />
                        </div>
                      )}
                      <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                      {col.fields.map(f =>
                        (f.key || f.value) ? (
                          <div key={f.id} className="lm-p-kv">
                            {f.key && (
                              <span
                                className="lm-p-key"
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
                            {f.key && <span className="lm-p-sep">:</span>}
                            <span
                              className={`lm-p-val${f.value ? '' : ' lm-empty'}`}
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

        {state.watermark.enabled && state.watermark.text && (
          <div className="lm-watermark" style={{ opacity: state.watermark.opacity, color: t.primary }}>
            {state.watermark.text}
          </div>
        )}
      </div>
    </div>
  );
}
