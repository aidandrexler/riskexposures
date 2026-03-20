import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { C } from '../tokens.js'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .fade-up { animation: fuA 0.55s cubic-bezier(.22,.68,0,1.2) both; }
  @keyframes fuA { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  .pri-btn {
    background: #9a7c4a; color: #fff; border: none; padding: 0.875rem 2rem;
    font-family: 'DM Sans', sans-serif; font-size: 0.84rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
    transition: all 0.18s ease; border-radius: 3px; text-decoration: none; display: inline-block;
  }
  .pri-btn:hover { background: #7a6038; transform: translateY(-1px); }
`

export default function AboutPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <Helmet>
        <title>About Risk Exposures — Free Structural Risk Diagnostic</title>
        <meta name="description" content="Risk Exposures is a free public diagnostic tool for high-net-worth individuals, business owners, and professionals. Built on the analytical framework used by Florida's leading asset protection attorneys." />
        <link rel="canonical" href="https://riskexposures.com/about" />
      </Helmet>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>

        <div className="fade-up" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '28px', height: '2px', background: C.accent }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, fontFamily: "'DM Sans', sans-serif" }}>About This Tool</span>
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, color: C.text, lineHeight: 1.15, marginBottom: '1rem' }}>
            What this is and why it exists
          </h1>
        </div>

        <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '1rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
            Risk Exposures is a free public diagnostic tool for high-net-worth individuals, business owners, physicians, and professionals who want to understand their structural risk exposure — honestly, specifically, and without a sales pitch.
          </p>
          <p style={{ fontSize: '1rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
            The tool runs a 30+ question assessment covering entity structure, asset titling, transfer history, insurance gaps, Florida-specific exemptions, and — for physician practice owners — practice-level risks including payer concentration, billing compliance, and malpractice coverage. It produces a personalized risk score with specific findings, legal citations, and a matched specialist referral based on the profile.
          </p>
          <p style={{ fontSize: '1rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
            It is built on the analytical frameworks used by Florida's leading asset protection and physician planning attorneys — including the FMEA-based risk scoring methodology, the Founding Case Pattern for physician practice risk, and the Florida creditor protection exemption architecture.
          </p>
        </div>

        <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: '3px', padding: '1.5rem 1.75rem', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.67rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent, marginBottom: '0.6rem', fontFamily: "'DM Sans', sans-serif" }}>What this tool is not</p>
          <p style={{ fontSize: '0.9rem', color: C.textMid, lineHeight: 1.72, fontFamily: "'DM Sans', sans-serif" }}>
            This diagnostic does not provide legal advice and does not create an attorney-client relationship. It is an educational tool designed to help you understand your structural exposure so you can have a more informed conversation with the right specialist. The findings are based on your answers to a standardized assessment — they are not a substitute for a formal legal review of your specific documents and circumstances.
          </p>
        </div>

        <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
          <h2 className="serif" style={{ fontSize: '1.4rem', fontWeight: 500, color: C.text, marginBottom: '1rem' }}>How the referral works</h2>
          <p style={{ fontSize: '0.96rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
            When you complete the diagnostic and submit your email, a full intake summary is reviewed and — if the profile is a genuine fit — forwarded to the matched specialist with a personal note. Every referral gets a unique reference number tied to the date of the diagnostic. Nothing is forwarded automatically and nothing reaches the specialist without a human review first.
          </p>
          <p style={{ fontSize: '0.96rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
            The referral specialists — Jon Alper at Alper Law and Alan Gassman at Gassman, Denicolo & Ketron — are independent attorneys who are not affiliated with this tool and do not pay for referrals. They are matched based on profile fit, not commercial arrangement.
          </p>
        </div>

        <div className="fade-up" style={{ marginBottom: '3rem' }}>
          <h2 className="serif" style={{ fontSize: '1.4rem', fontWeight: 500, color: C.text, marginBottom: '1rem' }}>Built by</h2>
          <p style={{ fontSize: '0.96rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem' }}>
            Risk Exposures was built by Aidan Drexler, a law student with focused studies in estate planning, taxation, business law, bankruptcy and exemption law, and creditor-debtor law. This tool is a small part of a larger effort to make structural risk analysis more accessible to high-net-worth individuals, business owners, high-liability professionals, and physician practice owners — people who carry real exposure and often don't find out until it's too late.
          </p>
          <p style={{ fontSize: '0.96rem', color: C.textMid, lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif" }}>
            Questions or feedback: the best way to reach out is through the diagnostic itself — complete the assessment and use the notes field.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/diagnostic" className="pri-btn">Run Your Diagnostic →</Link>
          <Link to="/blog" style={{ fontSize: '0.84rem', color: C.accent, fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', padding: '0.875rem 0', textDecoration: 'none' }}>Read the Research →</Link>
        </div>

      </div>
    </div>
  )
}
