import { FONT_FAMILIES } from '../../data/fonts';
import PhotoGrid from '../shared/PhotoGrid';
import Watermark from '../shared/Watermark';
import './LayoutModernCard.css';

export default function LayoutModernCard({ state, sheetRef }) {
  const t = state.template;
  const font = FONT_FAMILIES.find(f => f.id === state.fontFamily) || FONT_FAMILIES[0];
  const typo = state.typo;

  return (
    <div
      ref={sheetRef}
      className="lmc-sheet"
      style={{
        fontFamily: font.family,
        borderRadius: `${state.brTL}px ${state.brTR}px ${state.brBR}px ${state.brBL}px`,
        overflow: 'hidden',
      }}
    >
      {/* Custom background */}
      {state.customBg && (
        <div
          className="lmc-custom-bg"
          style={{
            backgroundImage: `url(${state.customBg})`,
            backgroundSize: state.bgSize,
            backgroundPosition: state.bgPosition,
            opacity: state.bgOpacity,
            filter: state.bgBlur ? `blur(${state.bgBlur}px)` : 'none',
          }}
        />
      )}

      {/* Full-width colored banner header */}
      <div className="lmc-banner" style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.primary}dd)` }}>
        <div className="lmc-banner-accent" style={{ background: t.accent }} />
        {state.showProfile && state.profilePic && (
          <img src={state.profilePic} className="lmc-banner-photo" style={{ borderColor: t.accent }} alt="Profile" />
        )}
        {state.showProfile && !state.profilePic && (
          <div className="lmc-banner-photo-ph" style={{ borderColor: t.accent + '66', color: t.accent }}>&#9679;</div>
        )}
        <div className="lmc-banner-title">{state.title || 'Marriage Biodata'}</div>
        <div className="lmc-banner-line" style={{ background: t.accent + '88' }} />
      </div>

      {/* Cards area */}
      <div
        className="lmc-body"
        style={{
          paddingLeft: state.marginLeft,
          paddingRight: state.marginRight,
          paddingBottom: state.marginTop,
        }}
      >
        {/* Section cards */}
        {state.sections.map((sec) => (
          <div key={sec.id} className="lmc-card" style={{ borderLeftColor: t.accent }}>
            <div className={`lmc-grid ${sec.twoCol ? 'lmc-two' : ''}`}>
              {[0, ...(sec.twoCol ? [1] : [])].map(ci => {
                const col = sec.columns[ci];
                const hasAny = col.heading || col.photos.length || col.fields.some(f => f.key || f.value);
                if (!hasAny && !sec.twoCol) return null;
                return (
                  <div key={ci}>
                    {col.heading && (
                      <div
                        className="lmc-ch"
                        style={{
                          fontSize: typo.secSize + 1,
                          lineHeight: typo.secLH,
                          fontWeight: typo.secBold ? 600 : 400,
                          color: t.primary,
                        }}
                      >
                        <span className="lmc-ch-icon" style={{ background: t.accent }}>&#9670;</span>
                        {col.heading}
                      </div>
                    )}
                    <PhotoGrid photos={col.photos} photoLayout={col.photoLayout} accent={t.accent} />
                    {col.fields.map(f =>
                      (f.key || f.value) ? (
                        <div key={f.id} className="lmc-kv">
                          {f.key && (
                            <span
                              className="lmc-key"
                              style={{
                                fontSize: typo.keySize,
                                lineHeight: typo.keyLH,
                                fontWeight: typo.keyBold ? 500 : 400,
                                color: t.primary + 'cc',
                              }}
                            >
                              {f.key}
                            </span>
                          )}
                          <span
                            className={`lmc-val${f.value ? '' : ' lmc-empty'}`}
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
        ))}
      </div>

      <Watermark text={state.watermark.text} opacity={state.watermark.opacity} enabled={state.watermark.enabled} />
    </div>
  );
}
