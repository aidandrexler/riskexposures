import { Helmet } from 'react-helmet-async'
import { C } from '../tokens.js'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .fade-up { animation: fuA 0.55s cubic-bezier(.22,.68,0,1.2) both; }
  @keyframes fuA { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
`

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 className="serif" style={{ fontSize: '1.25rem', fontWeight: 500, color: C.text, marginBottom: '0.75rem' }}>{title}</h2>
      <div style={{ fontSize: '0.92rem', color: C.textMid, lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>{children}</div>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <Helmet>
        <title>Privacy Policy — Risk Exposures</title>
        <meta name="description" content="Privacy policy for riskexposures.com — how we collect, use, and protect your information." />
        <link rel="canonical" href="https://riskexposures.com/privacy" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>

        <div className="fade-up" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '28px', height: '2px', background: C.accent }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, fontFamily: "'DM Sans', sans-serif" }}>Legal</span>
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 600, color: C.text, lineHeight: 1.15, marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ fontSize: '0.82rem', color: C.textDim, fontFamily: "'DM Sans', sans-serif" }}>Last updated: March 2026</p>
        </div>

        <div className="fade-up">

          <Section title="What we collect">
            <p style={{ marginBottom: '0.75rem' }}>When you complete the diagnostic and submit your email address, we collect:</p>
            <p style={{ marginBottom: '0.5rem' }}>· Your email address</p>
            <p style={{ marginBottom: '0.5rem' }}>· Your diagnostic answers and the resulting risk score, tier, and findings</p>
            <p style={{ marginBottom: '0.5rem' }}>· Any notes you voluntarily add in the free-text field</p>
            <p style={{ marginBottom: '0.75rem' }}>· A unique reference number tied to your diagnostic date</p>
            <p>We also collect standard analytics data through Google Analytics — page views, session duration, general geographic location (country/region level), and device type. This data is aggregated and anonymous.</p>
          </Section>

          <Section title="How we use it">
            <p style={{ marginBottom: '0.75rem' }}>Your diagnostic intake summary is reviewed by the site operator to determine whether your profile is a fit for a specialist referral. If it is, a summary may be forwarded to the matched specialist attorney — Jon Alper at Alper Law or Alan Gassman at Gassman, Denicolo &amp; Ketron — with a personal note. Nothing is forwarded automatically; only profiles that meet a meaningful threshold are forwarded.</p>
            <p style={{ marginBottom: '0.75rem' }}>No one will contact you directly as a result of completing this diagnostic. If you wish to speak with the matched specialist shown in your results, you must reach out to them independently using the contact information provided. The referral process is entirely one-directional — you initiate any conversation.</p>
            <p>Your email address is used only to identify your submission. We do not send marketing emails, newsletters, or promotional communications.</p>
          </Section>

          <Section title="Who we share it with">
            <p style={{ marginBottom: '0.75rem' }}>Your intake summary may be shared with the matched specialist attorney identified in your results, solely for the purpose of evaluating whether to schedule a consultation if you reach out. The reference number in your summary is your confirmation that the referral originated from this diagnostic on the date shown.</p>
            <p style={{ marginBottom: '0.75rem' }}>Your intake data is transmitted via encrypted connection and is not sold or shared with any party other than the matched specialist described above.</p>
            <p style={{ marginBottom: '0.75rem' }}>We use Formspree (formspree.io) to process form submissions. Formspree's privacy policy governs how they handle data in transit.</p>
            <p>We use Google Analytics to understand how people use the site. Google's privacy policy governs that data collection. You can opt out of Google Analytics tracking at tools.google.com/dlpage/gaoptout.</p>
          </Section>

          <Section title="How long we keep it">
            <p>Intake summaries are retained for up to 24 months for referral tracking and relationship management purposes. You can request deletion of your data at any time by emailing the site operator through the diagnostic's notes field.</p>
          </Section>

          <Section title="Cookies">
            <p>This site uses cookies only for Google Analytics. We do not use advertising cookies, tracking pixels, or third-party marketing cookies. You can disable cookies in your browser settings at any time.</p>
          </Section>

          <Section title="No legal advice">
            <p>Nothing on this site constitutes legal advice or creates an attorney-client relationship. The diagnostic results are educational and informational only. Always consult a licensed attorney for advice specific to your situation.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about this privacy policy or requests to delete your data can be submitted through the notes field in the diagnostic tool at riskexposures.com/diagnostic.</p>
          </Section>

        </div>
      </div>
    </div>
  )
}
