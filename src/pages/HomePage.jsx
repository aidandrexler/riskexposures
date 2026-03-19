import { Link } from 'react-router-dom'
import { C } from '../tokens.js'

const ARTICLES_PREVIEW = [
  {
    slug: 'florida-homestead-trap',
    title: 'How Putting Your Home in an LLC Destroys the Most Powerful Protection in Florida Law',
    description: "Florida's unlimited homestead exemption protects your home from virtually any creditor — but one extremely common mistake eliminates it entirely.",
    date: 'March 2026',
  },
  {
    slug: 'revocable-trust-myth',
    title: 'Your Revocable Trust Does Not Protect You From Creditors. Not Even a Little.',
    description: 'The most expensive misconception in wealth planning — and the one most likely to leave someone who thinks they are protected completely exposed.',
    date: 'March 2026',
  },
  {
    slug: 'llc-myth-florida-physicians',
    title: 'The LLC Myth That Costs Business Owners and Physicians the Most',
    description: 'Entity structure only protects you if it is maintained correctly. Here is what creditor attorneys actually look for — and how most entities fail the test.',
    date: 'March 2026',
  },
]

export default function HomePage() {
  return (
    <div style={{ background: C.bg }}>

      {/* HERO */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'clamp(4rem, 8vw, 7rem) 2rem clamp(3rem, 6vw, 5rem)',
      }}>
        <div className="fade-up" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <svg width="20" height="23" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12 Q4 8 8 6 L24 0 L40 6 Q44 8 44 12 L44 36 Q44 50 24 56 Q4 50 4 36 Z"
                fill="none" stroke="#9a7c4a" strokeWidth="2.5"/>
              <line x1="10" y1="44" x2="38" y2="14" stroke="#9a7c4a" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="10" cy="44" r="3" fill="#9a7c4a"/>
              <circle cx="38" cy="14" r="3" fill="none" stroke="#9a7c4a" strokeWidth="2"/>
            </svg>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: C.accent,
            }}>Structural Risk Diagnostic</span>
          </div>

          <h1 className="serif" style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            color: C.text,
            marginBottom: '1.5rem',
            maxWidth: '700px',
          }}>
            How exposed are<br />you, <em>really?</em>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.78,
            color: C.textMid,
            maxWidth: '560px',
            marginBottom: '1rem',
          }}>
            Most people with significant wealth believe their structure protects them. Most are wrong about at least one critical thing.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            lineHeight: 1.75,
            color: C.textDim,
            maxWidth: '540px',
            marginBottom: '2.5rem',
          }}>
            This diagnostic surfaces the specific gaps in your structure — the ones a creditor's attorney finds first. It takes 5–8 minutes and it's free.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/diagnostic" className="pri-btn">Run Your Diagnostic →</Link>
            <Link to="/blog" className="ghost-btn">Read the Research</Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="fade-up-1" style={{
          display: 'flex',
          gap: '0',
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: '2rem 0',
          flexWrap: 'wrap',
        }}>
          {[
            ['72 hours', 'Time a creditor attorney needs to map your exposed assets from public records'],
            ['4 years', 'Florida fraudulent transfer lookback window'],
            ['10 years', 'Federal lookback for self-settled trusts under 11 U.S.C. §548(e)'],
            ['Unlimited', 'Florida homestead exemption — but only if held correctly'],
          ].map(([val, label], i) => (
            <div key={i} style={{
              flex: '1',
              minWidth: '160px',
              padding: '0 2rem 0 0',
              borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
              marginRight: i < 3 ? '2rem' : '0',
            }}>
              <div className="serif" style={{ fontSize: '1.6rem', fontWeight: 600, color: C.accent, lineHeight: 1, marginBottom: '0.35rem' }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT THIS DOES */}
      <section style={{
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="fade-up" style={{ maxWidth: '560px', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, marginBottom: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>What This Tool Does</p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, color: C.text, lineHeight: 1.2 }}>
              A diagnostic built on how creditor attorneys actually think
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                n: '01',
                title: 'Structural Analysis',
                body: 'Evaluates your entity structure, asset titling, and holding arrangements against the specific attack vectors creditor attorneys use in Florida.',
              },
              {
                n: '02',
                title: 'Misconception Detection',
                body: 'Surfaces the most dangerous planning misconceptions — including traps that cause people with structures to believe they\'re protected when they aren\'t.',
              },
              {
                n: '03',
                title: 'Specialist Matching',
                body: 'Matches your profile to the right specialist based on your profession, net worth, and specific exposure — not a generic referral.',
              },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ borderTop: `2px solid ${C.accent}`, paddingTop: '1.25rem' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: C.textMuted, marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>{n}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 500, color: C.text, marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: C.textDim, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, marginBottom: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>Who This Is For</p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, color: C.text }}>
              Anyone who has built something worth protecting
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              'Physicians and surgeons',
              'Medical practice owners',
              'Real estate investors',
              'Business owners',
              'Real estate developers',
              'High-income professionals',
              'Attorneys and advisors',
              'Executives with equity',
            ].map(label => (
              <div key={label} style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                padding: '0.875rem 1rem',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: C.textMid, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>Recent Research</p>
              <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 500, color: C.text }}>What you don't know is what costs you</h2>
            </div>
            <Link to="/blog" className="ghost-btn">All Articles →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {ARTICLES_PREVIEW.map(({ slug, title, description, date }) => (
              <Link key={slug} to={`/blog/${slug}`} style={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                padding: '1.5rem',
                borderRadius: '3px',
                display: 'block',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <p style={{ fontSize: '0.68rem', color: C.textMuted, marginBottom: '0.6rem', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.08em' }}>{date}</p>
                <h3 className="serif" style={{ fontSize: '1.1rem', fontWeight: 500, color: C.text, lineHeight: 1.3, marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ fontSize: '0.835rem', color: C.textDim, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{description}</p>
                <p style={{ fontSize: '0.78rem', color: C.accent, marginTop: '1rem', fontFamily: "'DM Sans', sans-serif" }}>Read →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: C.text, marginBottom: '1rem', lineHeight: 1.2 }}>
            Find out where you actually stand.
          </h2>
          <p style={{ fontSize: '1rem', color: C.textDim, lineHeight: 1.72, marginBottom: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
            Five minutes. Free. No account required. The findings are specific to your structure — not a generic checklist.
          </p>
          <Link to="/diagnostic" className="pri-btn">Begin Your Diagnostic →</Link>
        </div>
      </section>

    </div>
  )
}
