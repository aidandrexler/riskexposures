import { Link } from 'react-router-dom'
import { C } from '../tokens.js'

const ARTICLES = [
  {
    slug: 'florida-homestead-trap',
    title: 'How Putting Your Home in an LLC Destroys the Most Powerful Protection in Florida Law',
    description: "Florida's unlimited homestead exemption protects your home from virtually any creditor — but one extremely common mistake eliminates it entirely.",
    date: 'March 19, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'revocable-trust-myth',
    title: 'Your Revocable Trust Does Not Protect You From Creditors. Not Even a Little.',
    description: 'The most expensive misconception in wealth planning — and the one most likely to leave someone who thinks they are protected completely exposed.',
    date: 'March 19, 2026',
    readTime: '4 min read',
  },
  {
    slug: 'llc-myth-florida-physicians',
    title: 'The LLC Myth That Costs Business Owners and Physicians the Most',
    description: 'Entity structure only protects you if it is maintained correctly. Here is what creditor attorneys actually look for — and how most entities fail the test.',
    date: 'March 19, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'personal-guarantee-trap',
    title: 'The Personal Guarantee Bypass: Why Your Entity Structure Has a Built-In Hole',
    description: 'A personal guarantee is a direct creditor attachment point that no LLC, corporation, or trust can block. Most business owners have more of them than they realize.',
    date: 'March 19, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'payer-concentration-risk',
    title: 'The Audit That Ends a Practice: Understanding Payer Concentration Risk for Physicians',
    description: "When more than 60% of a medical practice's revenue flows through two payers, a single audit notice can trigger a financial cascade that cannot be stopped once it begins.",
    date: 'March 19, 2026',
    readTime: '7 min read',
  },
]

export default function BlogPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>

        <div className="fade-up" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '28px', height: '2px', background: C.accent }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, fontFamily: "'DM Sans', sans-serif" }}>Research & Analysis</span>
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: C.text, lineHeight: 1.15, marginBottom: '0.75rem' }}>
            What you don't know is what costs you.
          </h1>
          <p style={{ fontSize: '1rem', color: C.textDim, lineHeight: 1.72, fontFamily: "'DM Sans', sans-serif", maxWidth: '540px' }}>
            Plain-language analysis of the structural mistakes that expose wealth — and how creditor attorneys exploit them.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {ARTICLES.map(({ slug, title, description, date, readTime }) => (
            <Link key={slug} to={`/blog/${slug}`} style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              padding: '1.75rem 2rem',
              borderRadius: '3px',
              display: 'block',
              transition: 'border-color 0.15s, transform 0.15s',
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{date}</span>
                <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>·</span>
                <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{readTime}</span>
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 500, color: C.text, lineHeight: 1.3, marginBottom: '0.6rem' }}>{title}</h2>
              <p style={{ fontSize: '0.875rem', color: C.textDim, lineHeight: 1.68, fontFamily: "'DM Sans', sans-serif", marginBottom: '0.75rem' }}>{description}</p>
              <span style={{ fontSize: '0.8rem', color: C.accent, fontFamily: "'DM Sans', sans-serif" }}>Read article →</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '4rem',
          background: C.accentBg,
          border: `1px solid ${C.accentLight}40`,
          borderLeft: `3px solid ${C.accent}`,
          borderRadius: '0 3px 3px 0',
          padding: '1.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent, marginBottom: '0.4rem', fontFamily: "'DM Sans', sans-serif" }}>Ready to find your gaps?</p>
            <p style={{ fontSize: '0.95rem', color: C.textMid, fontFamily: "'DM Sans', sans-serif" }}>Run the diagnostic and find out specifically where you're exposed.</p>
          </div>
          <Link to="/diagnostic" className="pri-btn">Run Your Diagnostic →</Link>
        </div>

      </div>
    </div>
  )
}
