import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import './LayoutContemporary.css';

export default function LayoutContemporary({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="lct-sheet"
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
          className="lct-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      <div className="lct-layout">
        {/* Left sidebar */}
        <div className="lct-sidebar" style={{ background: t.primary }}>
          {/* Profile photo */}
          {state.showProfile && (
            <div className="lct-pf-row">
              {state.profilePic
                ? <img src={state.profilePic} className="lct-pf-img" alt="Profile" />
                : <div className="lct-pf-ph">&#9679;</div>
              }
            </div>
          )}

          <div className="lct-sidebar-title" style={{ color: t.accent }}>
            {state.title || 'Marriage Biodata'}
          </div>

          <div className="lct-sidebar-line" style={{ background: t.accent }} />

          {/* Decorative element */}
          {state.showBorder && (
            <div className="lct-sidebar-decor">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke={t.accent} strokeWidth="0.5" opacity="0.2" />
                <circle cx="30" cy="30" r="20" stroke={t.accent} strokeWidth="0.5" opacity="0.15" />
                <circle cx="30" cy="30" r="12" stroke={t.accent} strokeWidth="0.5" opacity="0.1" />
                <circle cx="30" cy="30" r="3" fill={t.accent} opacity="0.2" />
              </svg>
            </div>
          )}
        </div>

        {/* Right content area */}
        <div
          className="lct-content"
          style={{
            paddingTop: state.marginTop,
            paddingRight: state.marginRight,
          }}
        >
          {/* Sections */}
          {state.sections.map((sec, si) => (
            <div key={sec.id}>
              {si > 0 && <div className="lct-divider" />}
              <div className="lct-p-sec">
                <div className={`lct-p-grid ${sec.twoCol ? 'lct-two' : ''}`}>
                  {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                    const col = sec.columns[ci];
                    const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                    if (!hasAny && !sec.twoCol) return null;
                    return (
                      <div key={ci}>
                        {col.heading && (
                          <div
                            className="lct-p-ch"
                            style={{
                              fontSize: typo.secSize,
                              lineHeight: typo.secLH,
                              fontWeight: typo.secBold ? 600 : 400,
                              color: t.primary,
                              borderLeftColor: t.accent,
                            }}
                          >
                            {col.heading}
                          </div>
                        )}
                        <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                        {col.fields.map(f =>
                          (f.key || f.value) ? (
                            <div key={f.id} className="lct-p-kv">
                              {f.key && (
                                <span
                                  className="lct-p-key"
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
                              {f.key && <span className="lct-p-sep" style={{ color: t.accent }}>:</span>}
                              <span
                                className={`lct-p-val${f.value ? '' : ' lct-empty'}`}
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
        </div>
      </div>

      {state.watermark.enabled && state.watermark.text && (
        <div className="lct-watermark" style={{ opacity: state.watermark.opacity, color: t.primary }}>
          {state.watermark.text}
        </div>
      )}
    </div>
  );
}
