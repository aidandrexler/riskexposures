import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { C } from '../tokens.js'
import matter from 'gray-matter'

const markdownFiles = import.meta.glob('/content/blog/*.md', { as: 'raw', eager: true })

const ARTICLES = Object.fromEntries(
  Object.entries(markdownFiles).map(([path, raw]) => {
    const { data, content } = matter(raw)
    const slug = path.replace('/content/blog/', '').replace('.md', '')
    return [slug, { ...data, content }]
  })
)

export default function ArticlePage() {
  const { slug } = useParams()
  const article = ARTICLES[slug]

  if (!article) return <Navigate to="/blog" replace />

  const paragraphs = article.content.trim().split('\n\n')

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <Helmet>
        <title>{article.title} — Risk Exposures</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={`https://riskexposures.com/blog/${slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={`https://riskexposures.com/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.description,
          "datePublished": article.date,
          "publisher": { "@type": "Organization", "name": "Risk Exposures", "url": "https://riskexposures.com" },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://riskexposures.com/blog/${slug}` }
        })}</script>
      </Helmet>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>

        <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
          <Link to="/blog" style={{ fontSize: '0.78rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>← Back to Research</Link>
        </div>

        <div className="fade-up" style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{article.date}</span>
            {article.readTime && <><span style={{ fontSize: '0.72rem', color: C.textMuted }}>·</span><span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{article.readTime}</span></>}
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 600, color: C.text, lineHeight: 1.2, marginBottom: '1rem' }}>{article.title}</h1>
          <p style={{ fontSize: '1.05rem', color: C.textDim, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{article.description}</p>
        </div>

        <div className="fade-up-1">
          {paragraphs.map((para, i) => {
            const trimmed = para.trim()
            if (!trimmed) return null
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={i} className="serif" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 500, color: C.text, margin: '2.5rem 0 1rem', lineHeight: 1.25 }}>
                  {trimmed.replace('## ', '')}
                </h2>
              )
            }
            if (trimmed.startsWith('# ')) {
              return (
                <h2 key={i} className="serif" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 600, color: C.text, margin: '2.5rem 0 1rem', lineHeight: 1.2 }}>
                  {trimmed.replace('# ', '')}
                </h2>
              )
            }
            // Handle inline italic *text*
            const parts = trimmed.split(/(\*[^*]+\*)/g)
            return (
              <p key={i} style={{ fontSize: '0.96rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
                {parts.map((part, j) =>
                  part.startsWith('*') && part.endsWith('*')
                    ? <em key={j}>{part.slice(1, -1)}</em>
                    : part
                )}
              </p>
            )
          })}
        </div>

        <div style={{ marginTop: '4rem', background: C.accentBg, border: `1px solid ${C.accentLight}40`, borderLeft: `3px solid ${C.accent}`, borderRadius: '0 3px 3px 0', padding: '1.75rem 2rem' }}>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent, marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>Find your specific gaps</p>
          <p style={{ fontSize: '0.95rem', color: C.textMid, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
            The issues described in this article are detectable through structural analysis. Run the diagnostic to find out if they apply to your situation.
          </p>
          <Link to="/diagnostic" className="pri-btn">Run Your Diagnostic →</Link>
        </div>

      </div>
    </div>
  )
}
