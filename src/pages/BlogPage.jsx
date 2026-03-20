import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { C } from '../tokens.js'
import matter from 'gray-matter'

const markdownFiles = import.meta.glob('/content/blog/*.md', { as: 'raw', eager: true })

const ARTICLES = Object.entries(markdownFiles)
  .map(([path, raw]) => {
    const { data } = matter(raw)
    const slug = path.replace('/content/blog/', '').replace('.md', '')
    return { slug, ...data }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export default function BlogPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <Helmet>
        <title>Asset Protection Resources & Research — Risk Exposures</title>
        <meta name="description" content="Plain-language analysis of the structural mistakes that expose wealth to creditors — and how to fix them." />
        <link rel="canonical" href="https://riskexposures.com/blog" />
        <meta property="og:title" content="Asset Protection Resources & Research — Risk Exposures" />
        <meta property="og:url" content="https://riskexposures.com/blog" />
      </Helmet>
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
            <Link key={slug} to={`/blog/${slug}`} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: '1.75rem 2rem', borderRadius: '3px', display: 'block', transition: 'border-color 0.15s, transform 0.15s', textDecoration: 'none' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{date}</span>
                {readTime && <><span style={{ fontSize: '0.72rem', color: C.textMuted }}>·</span><span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{readTime}</span></>}
              </div>
              <h2 className="serif" style={{ fontSize: '1.15rem', fontWeight: 500, color: C.text, lineHeight: 1.3, marginBottom: '0.5rem' }}>{title}</h2>
              <p style={{ fontSize: '0.875rem', color: C.textDim, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
