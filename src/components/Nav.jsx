import { Link, useLocation } from 'react-router-dom'
import { C, BASE_STYLES } from '../tokens.js'

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <>
      <style>{BASE_STYLES}</style>
      <nav style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        position: 'sticky',
        top: 0,
        zIndex: 200,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          {/* Shield mark */}
          <svg width="28" height="32" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 12 Q4 8 8 6 L24 0 L40 6 Q44 8 44 12 L44 36 Q44 50 24 56 Q4 50 4 36 Z"
              fill="none"
              stroke={C.accent}
              strokeWidth="2"
            />
            <line x1="10" y1="44" x2="38" y2="14" stroke={C.accent} strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="10" cy="44" r="2.8" fill={C.accent}/>
            <circle cx="38" cy="14" r="2.8" fill="none" stroke={C.accent} strokeWidth="1.6"/>
          </svg>
          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.2rem',
              fontWeight: 600,
              color: C.text,
              lineHeight: 1,
              letterSpacing: '0.01em',
            }}>Risk</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.58rem',
              fontWeight: 500,
              color: C.accent,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>Exposures</span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[
            { label: 'Diagnostic', path: '/diagnostic' },
            { label: 'Blog', path: '/blog' },
            { label: 'About', path: '/about' },
          ].map(({ label, path }) => (
            <Link key={path} to={path} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem',
              color: pathname === path ? C.accent : C.textMid,
              fontWeight: pathname === path ? 500 : 400,
              transition: 'color 0.15s',
              letterSpacing: '0.02em',
            }}
              onMouseOver={e => e.target.style.color = C.accent}
              onMouseOut={e => e.target.style.color = pathname === path ? C.accent : C.textMid}
            >{label}</Link>
          ))}
          <Link to="/diagnostic" className="pri-btn" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
            Run Your Diagnostic
          </Link>
        </div>
      </nav>
    </>
  )
}
