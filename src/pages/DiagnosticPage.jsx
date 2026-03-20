import { Helmet } from 'react-helmet-async'
import RiskExposures from '../components/Diagnostic.jsx'

export default function DiagnosticPage() {
  return (
    <>
      <Helmet>
        <title>Free Asset Protection Risk Diagnostic — Risk Exposures</title>
        <meta name="description" content="Run your free structural risk diagnostic. 30+ questions covering entity structure, real estate titling, transfer history, insurance gaps, and Florida-specific traps. Get a personalized risk score with specific legal findings." />
        <link rel="canonical" href="https://riskexposures.com/diagnostic" />
        <meta property="og:title" content="Free Asset Protection Risk Diagnostic" />
        <meta property="og:description" content="Find out exactly what's vulnerable in your wealth structure. Personalized risk score, specific findings with legal citations, matched specialist referral." />
        <meta property="og:url" content="https://riskexposures.com/diagnostic" />
      </Helmet>
      <RiskExposures />
    </>
  )
}
