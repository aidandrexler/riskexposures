import { Link } from 'react-router-dom'
import { C } from '../tokens.js'

export default function Footer() {
  return (
    <footer style={{
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      padding: '2.5rem 2rem',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <svg width="22" height="26" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12 Q4 8 8 6 L24 0 L40 6 Q44 8 44 12 L44 36 Q44 50 24 56 Q4 50 4 36 Z"
                  fill="none" stroke={C.accent} strokeWidth="2"/>
                <line x1="10" y1="44" x2="38" y2="14" stroke={C.accent} strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="10" cy="44" r="2.8" fill={C.accent}/>
                <circle cx="38" cy="14" r="2.8" fill="none" stroke={C.accent} strokeWidth="1.6"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', lineHeight: 1 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: C.text, lineHeight: 1 }}>Risk</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 500, color: C.accent, letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 1 }}>Exposures</span>
              </div>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem',
              color: C.textDim,
              lineHeight: 1.65,
              maxWidth: '320px',
            }}>
              A structural risk diagnostic built on the analytical framework used by Florida's leading asset protection attorneys.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.textMuted, marginBottom: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>Tools</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/diagnostic" style={{ fontSize: '0.83rem', color: C.textMid, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>Risk Diagnostic</Link>
                <Link to="/blog" style={{ fontSize: '0.83rem', color: C.textMid, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>Resources</Link>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.textMuted, marginBottom: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>Company</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/about" style={{ fontSize: '0.83rem', color: C.textMid, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>About</Link>
                <Link to="/privacy" style={{ fontSize: '0.83rem', color: C.textMid, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: C.textMuted, lineHeight: 1.65, maxWidth: '600px' }}>
            This website provides educational and informational content only. Nothing on this site constitutes legal advice or creates an attorney-client relationship. Results of the diagnostic tool are for educational purposes and should not be relied upon as legal opinions. Always consult a licensed attorney for advice specific to your situation.
          </p>
          <Link to="/privacy" style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
