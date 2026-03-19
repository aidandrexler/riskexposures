import { useParams, Link, Navigate } from 'react-router-dom'
import { C } from '../tokens.js'

const ARTICLES = {
  'llc-myth-florida-physicians': {
    title: 'The LLC Myth That Costs Business Owners and Physicians the Most',
    date: 'March 19, 2026',
    readTime: '6 min read',
    description: 'Entity structure only protects you if it is maintained correctly. Here is what creditor attorneys actually look for — and how most entities fail the test.',
    content: `
Most people who own a business or professional practice believe their LLC is protecting them. They set it up on the advice of an accountant or general practice attorney, pay their annual filing fees, and proceed with a general sense of structural security.

That sense is frequently wrong — and the specific way it is wrong matters enormously.

## What an LLC Actually Does

A Florida LLC creates two distinct protections. First, it creates a liability barrier for inside liability — if your entity is sued, that liability generally stays inside the entity and does not automatically flow to your personal assets. Second, it provides charging order protection for outside liability — if you personally are sued and a creditor obtains a judgment against you individually, that creditor's remedy against your LLC membership interest is limited to a charging order. They can receive distributions if and when distributions are made, but cannot seize your membership interest or force the LLC to distribute.

Both protections are real. But both fail under conditions that are extremely common.

## The Commingling Problem

The most common reason entity protection collapses in court has nothing to do with the entity structure itself. It is what happens after the entity is formed.

Florida courts apply a two-part test for piercing the corporate veil: (1) unity of interest — the entity and owner are so intermingled they are effectively one; and (2) fundamental inequity — allowing the owner to hide behind the entity would be unjust. Commingling personal and business finances — paying personal bills from the business account, depositing business revenue into personal accounts, failing to maintain separate records — essentially proves the first element automatically.

In *Dania Jai-Alai Palace v. Sykes*, 450 So.2d 1114 (Fla. 1984), the Florida Supreme Court established this framework. It has been applied consistently since. A plaintiff's attorney who subpoenas five years of bank records and finds routine commingling has a straightforward path to holding you personally liable for entity debts.

## The Entity Type Problem

Not all entities provide the same protection. S-corporation shares and Professional Association (PA) interests — which many business owners and physicians use — are directly attachable by personal creditors. Unlike LLC membership interests, which are protected by the charging order statute under Fla. Stat. §605.0503, S-corp and PA shares carry no such protection. A creditor who obtains a judgment against you personally can become a full shareholder with inspection, accounting, and derivative action rights.

This distinction is consistently missed. It is one of the most consequential structural errors in Florida business planning and it is fully correctable.

## What a Creditor Attorney Actually Does

When a plaintiff's attorney obtains a judgment against a Florida business owner or professional, the standard playbook is straightforward. First, they pull entity filings from the Florida Division of Corporations and determine your entity type. If it is an S-corp or PA, they file for attachment of shares immediately — no charging order required.

Second, they subpoena five years of personal and business bank records looking for commingling and veil-piercing predicate facts. Third, they pull property appraiser records for real estate held in your name. Fourth, they pull UCC filings for personal guarantees you have signed, which they pursue as independent obligations bypassing your entity entirely.

The average time from judgment entry to first levy attempt for a plaintiff's attorney who knows what they are doing is less than 30 days.

## What Actually Works

A properly structured and maintained multi-member LLC — with a current operating agreement, strict separation of personal and business finances, documented corporate formalities, and adequate capitalization — provides meaningful protection. The entity type choice matters. The ongoing maintenance matters as much as the initial formation. And the broader picture needs to be coordinated: insurance coverage, exempt asset utilization, and entity structure are not separate decisions.

The diagnostic tool on this site identifies specific gaps in your current structure. If findings surface an issue, the appropriate next step is a conversation with a qualified asset protection attorney — not a generalist, and not the accountant who set up the LLC.
    `.trim(),
  },

  'florida-homestead-trap': {
    title: 'How Putting Your Home in an LLC Destroys the Most Powerful Protection in Florida Law',
    date: 'March 19, 2026',
    readTime: '5 min read',
    description: "Florida's unlimited homestead exemption protects your home from virtually any creditor — but one extremely common mistake eliminates it entirely.",
    content: `
Florida's homestead exemption is extraordinary. Under Article X, Section 4 of the Florida Constitution, a Florida resident's primary residence is completely exempt from forced sale by most creditors — with no dollar cap on value. A home worth $10 million held correctly by a Florida resident is untouchable by a judgment creditor. A home worth $200,000 receives identical protection.

This is the most powerful single creditor protection available to any Florida resident. It requires no planning, no trust, no attorney. It exists by operation of constitutional law.

And it is one of the most frequently destroyed protections in Florida wealth planning.

## The LLC Transfer Mistake

The mistake is straightforward: a homeowner who has heard that LLCs provide asset protection decides to transfer their primary residence into an LLC. The reasoning seems logical — if an LLC protects business assets, why not use it to protect the home?

The problem is that the Florida homestead exemption has a specific ownership requirement. Under the Florida Constitution and the cases interpreting it — including the Florida Supreme Court's decision in *Snyder v. Davis*, 699 So.2d 999 (Fla. 1997) — the exemption requires that the property be owned by a natural person who uses it as a permanent residence.

An LLC is not a natural person. When title transfers from an individual to an LLC, the constitutional homestead protection is eliminated. The unlimited exemption disappears the moment the deed is recorded. What replaces it? The home is now an asset of the LLC, subject to creditor claims that the exemption previously blocked.

## The Tax Consequence

Florida's homestead exemption also provides a property tax benefit under Fla. Stat. §196.031. The Save Our Homes cap, which limits the annual increase in assessed value for homestead property, applies only to qualifying homestead property. When a home transfers to an LLC, the cap is lost and the property is reassessed at full market value. Depending on how long the homeowner has held the property and how much values have appreciated, the resulting tax increase can be significant.

Additionally, Fla. Stat. §196.011 imposes penalties for improperly claimed homestead exemptions — up to 50% of unpaid taxes per year, recoverable for up to 10 years. If the exemption was on file when the transfer occurred and was not immediately removed, the property appraiser can pursue back taxes plus penalties.

## The Correct Structure

The correct approach for a Florida homeowner is to hold the primary residence in individual name — or in a qualifying trust that meets homestead requirements — claim the exemption, and keep the property out of any business entity.

The homestead exemption already accomplishes what the LLC transfer was intended to accomplish. Taking away that protection and substituting a weaker one is the precise opposite of sound planning.

For homeowners who have already transferred their home into an LLC, the correction requires retransferring title back to individual ownership, which triggers reassessment and requires careful handling of any exemption history. An attorney with Florida real property and homestead experience should handle the correction.

The diagnostic tool on this site includes a specific question about how your primary residence is held and flags this issue when it identifies the relevant answer combination.
    `.trim(),
  },

  'revocable-trust-myth': {
    title: 'Your Revocable Trust Does Not Protect You From Creditors. Not Even a Little.',
    date: 'March 19, 2026',
    readTime: '4 min read',
    description: 'The most expensive misconception in wealth planning — and the one most likely to leave someone who thinks they are protected completely exposed.',
    content: `
There is a misconception so widespread, so consistently reinforced by well-meaning but non-specialist advisors, that it may be the single most expensive belief in American wealth planning. It is this: that a revocable living trust protects assets from creditors.

It does not. It cannot. The structure of a revocable trust makes creditor protection legally impossible, and no amount of drafting skill changes that fact.

## Why a Revocable Trust Cannot Protect Assets

A revocable living trust is a trust that you, the grantor, can revoke, amend, or terminate at any time. You retain complete control over the assets in the trust. You can add assets, remove assets, change beneficiaries, or dissolve the trust entirely whenever you choose.

Florida law — specifically Fla. Stat. §736.0505(1) — reflects the legal reality that follows from this structure: the assets of a revocable trust remain subject to the claims of the grantor's creditors. Because you can take those assets back at any time, creditors treat them as legally yours. The trust wrapper changes nothing from a creditor's perspective.

This is not a technical loophole. It is the foundational principle. A grantor cannot achieve creditor protection by transferring assets to a trust over which they retain complete control, because that control means the transfer is not genuinely complete. The Restatement (Third) of Trusts §25 confirms this principle, and Florida courts have applied it consistently.

## What a Revocable Trust Actually Does

A revocable living trust is a probate avoidance tool. When you die, assets held in a properly funded revocable trust pass directly to your beneficiaries without going through the Florida probate process. This is genuinely valuable — Florida probate is public, can be slow, and involves court costs and attorney fees. Avoiding it has real benefits.

A revocable trust also provides a mechanism for managing assets during incapacity. If you become unable to manage your affairs, a named successor trustee can step in immediately without court-supervised guardianship proceedings.

These are meaningful estate planning benefits. But they have nothing to do with creditor protection, and conflating the two leads people to believe they have protection they do not have.

## How the Misconception Spreads

The misconception typically originates from a combination of sources. A financial advisor who is not an attorney mentions that a trust is part of a good estate plan. A general practice attorney drafts a revocable trust without explaining its limitations. An online article about estate planning mentions trusts alongside asset protection without distinguishing between revocable and irrevocable structures. The client synthesizes these inputs into the belief that the trust protects them.

The confusion between revocable and irrevocable trusts is the core of the problem. An irrevocable trust — structured correctly, funded at the right time, with appropriate trustee independence — can provide genuine creditor protection. A revocable trust provides none. They are fundamentally different instruments that are frequently conflated in casual discussion.

## What Actually Provides Protection

For someone who genuinely wants creditor protection through trust planning, the relevant structures are irrevocable trusts, including properly structured domestic asset protection trusts (DAPTs) in states with favorable statutes, and third-party irrevocable trusts for estate planning purposes. Each has specific requirements, lookback windows, and limitations that need to be understood before implementation.

The diagnostic tool on this site asks specifically about revocable trusts and whether the person completing it believes the trust provides creditor protection. If that belief is present, it surfaces as a finding with the specific legal citation confirming why it does not.
    `.trim(),
  },

  'personal-guarantee-trap': {
    title: 'The Personal Guarantee Bypass: Why Your Entity Structure Has a Built-In Hole',
    date: 'March 19, 2026',
    readTime: '5 min read',
    description: 'A personal guarantee is a direct creditor attachment point that no LLC, corporation, or trust can block. Most business owners have more of them than they realize.',
    content: `
One of the most important things to understand about entity structures — LLCs, corporations, professional associations — is what they do not protect against. They create barriers between business liabilities and personal assets. They provide charging order protection against judgment creditors. They survive most routine business disputes.

What they do not protect against is a personal guarantee you have already signed.

## What a Personal Guarantee Does

A personal guarantee is a separate contractual obligation. When you sign a personal guarantee on a business loan, commercial lease, equipment financing agreement, or line of credit, you are agreeing that if the business entity fails to perform, you will personally satisfy the obligation. The entity structure is irrelevant to this promise — you made it in your individual capacity.

Under the Restatement (Third) of Suretyship and Guaranty §1, a guarantor's obligation is independent of the principal debtor's obligation. This means a creditor holding your personal guarantee does not need to first exhaust remedies against your business entity before pursuing you personally. They can bypass the entity entirely and come directly for your personal assets.

No LLC operating agreement, no corporate structure, no trust document changes this. You made an independent promise. The creditor can enforce it independently.

## How Widespread the Problem Is

Most business owners dramatically undercount their personal guarantee exposure. The obvious ones are business loans — most small and mid-size business bank loans require a personal guarantee from the principal owner. But the less obvious ones accumulate quietly.

Commercial leases almost universally require personal guarantees from business owners, particularly for early-stage or growing businesses where the entity alone lacks sufficient credit history. Equipment financing agreements frequently include personal guarantee provisions in the standard terms that many signatories do not read carefully. Business lines of credit, merchant processing agreements, and vendor credit accounts often carry personal guarantee language.

Over the course of operating a business for several years, the aggregate personal guarantee exposure can reach amounts that dwarf what the business owner believes they have at risk.

## The Interaction With Entity Structure

Personal guarantee exposure interacts with entity structure in a specific way that matters for planning purposes. Inside liability — claims arising within the entity — is the exposure your entity structure is designed to limit. Outside liability — creditors pursuing your personal assets based on personal obligations — is the exposure your entity structure cannot address.

A personal guarantee converts what would otherwise be inside liability (a business debt) into outside liability (a personal obligation). Once that conversion happens through the guarantee, the entity's protective function for that specific obligation is gone.

This is why a comprehensive structural review needs to inventory personal guarantees as a distinct category — not as business liabilities but as personal liabilities that exist alongside and independent of the entity structure.

## What Can Be Done

The most effective approach to personal guarantee exposure is prevention — negotiating guarantee limitations or eliminations when signing new agreements, particularly as a business matures and the entity establishes its own credit history and financial track record.

For existing guarantees, the planning focus shifts to ensuring that other personal assets are positioned correctly relative to exempt asset rules, entity structures for investment property, and the overall creditor exposure picture. A personal guarantee is not a catastrophe by itself — it is a factor that needs to be integrated into the structural analysis alongside everything else.

The diagnostic tool on this site asks specifically about personal guarantee exposure and uses the amounts to calibrate the overall risk score. If the findings surface a guarantee concern, the appropriate response is a structural review that addresses the specific guaranteed obligations in context.
    `.trim(),
  },

  'payer-concentration-risk': {
    title: 'The Audit That Ends a Practice: Understanding Payer Concentration Risk for Physicians',
    date: 'March 19, 2026',
    readTime: '7 min read',
    description: "When more than 60% of a medical practice's revenue flows through two payers, a single audit notice can trigger a financial cascade that cannot be stopped once it begins.",
    content: `
Most physician practice owners think about their financial risk in terms of malpractice — a catastrophic verdict that exceeds their coverage limits. That is a real risk. But for a significant portion of Florida physician practices, the more likely path to financial destruction runs through their payers, not their patients.

Payer concentration risk is the condition in which a practice depends on a small number of insurance contracts for the majority of its revenue. When that concentration reaches a critical level, the practice becomes structurally vulnerable to a type of enforcement cascade that is distinct from malpractice liability — and in many ways more difficult to defend against.

## The Anatomy of a Payer Audit

A payer audit begins when an insurance company — or a government program like Medicare or Medicaid — flags a practice for billing pattern review. The trigger can be a statistical anomaly, a complaint from a patient or employee, a random audit program, or a targeted investigation.

The audit is a retroactive review of claims already submitted and paid. When the payer identifies discrepancies — and in any large practice with years of claims history, they almost always find something — they issue a demand for recoupment. Under most provider agreements, the payer has the contractual right to offset future payments against the alleged overpayment, meaning they stop paying current claims until the demand is satisfied.

That offset is where the cascade begins.

## The Revenue Cliff

Consider a practice generating $3 million annually, with 65% flowing from two payers. Those two contracts represent approximately $162,500 per month. When one payer begins offsetting against a $400,000 recoupment demand, monthly collections drop to near zero from that payer — immediately, with no court process and no opportunity for prior review.

The practice now faces a cash flow crisis while simultaneously managing audit defense, which requires legal counsel, a billing compliance expert, and significant physician time. Fixed costs — payroll, rent, equipment financing — do not adjust. If the practice cannot cover payroll from remaining revenue, the physician-owner faces the most structurally destructive decision available: borrowing payroll taxes.

## The Payroll Tax Tripwire

Failing to remit employee withholding and employer FICA contributions while using that money to fund operations triggers the IRS Trust Fund Recovery Penalty under IRC §6672. This liability is personal, 100% of the unremitted amount, non-dischargeable in bankruptcy, and overrides Florida's constitutional homestead exemption through federal preemption. The IRS can force the sale of a Florida homestead to collect payroll tax debt — an asset no other creditor can typically reach.

The cascade at this point has three simultaneous fronts: payer recoupment and ongoing offset, IRS personal liability, and collapsing practice value. Each makes the others harder to manage.

## The Structural Response

Protection against payer concentration risk is primarily a diversification strategy executed before any crisis event, combined with structural planning that limits personal exposure to practice-level failures. The target is no single payer exceeding 25-30% of revenue and no two payers combined exceeding 50%.

From a structural standpoint: the entity type chosen for the practice matters — an LLC provides charging order protection that a PA does not. Strict separation of practice and personal assets matters. Personal guarantees on practice obligations should be minimized where possible. And billing compliance documentation — specifically, a privileged review conducted through counsel — matters because the same review done outside attorney-client privilege creates a document auditors can subpoena.

For practices with significant Medicare or Medicaid exposure, the False Claims Act whistleblower provisions under 31 U.S.C. §3729 add an additional layer. Any employee with knowledge of billing irregularities can file a sealed complaint with the government and receive 15-30% of any recovery. These complaints are filed and investigated under seal, sometimes for years, before the practice receives any notice.

The diagnostic tool on this site includes specific questions about payer concentration, billing review history, entity structure, and payroll tax status for physician practice owners. If the findings identify elevated payer risk, the appropriate response is a conversation with an attorney who handles both healthcare compliance and structural planning as a coordinated engagement.
    `.trim(),
  },
}
export default function ArticlePage() {
  const { slug } = useParams()
  const article = ARTICLES[slug]

  if (!article) return <Navigate to="/blog" replace />

  const paragraphs = article.content.split('\n\n')

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>

        {/* Breadcrumb */}
        <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
          <Link to="/blog" style={{
            fontSize: '0.78rem', color: C.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>← Back to Research</Link>
        </div>

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{article.date}</span>
            <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>·</span>
            <span style={{ fontSize: '0.72rem', color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{article.readTime}</span>
          </div>
          <h1 className="serif" style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 600, color: C.text, lineHeight: 1.2, marginBottom: '1rem',
          }}>{article.title}</h1>
          <p style={{
            fontSize: '1.05rem', color: C.textDim, lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif",
          }}>{article.description}</p>
        </div>

        {/* Content */}
        <div className="fade-up-1">
          {paragraphs.map((para, i) => {
            if (para.startsWith('## ')) {
              return (
                <h2 key={i} className="serif" style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 500,
                  color: C.text, margin: '2.5rem 0 1rem', lineHeight: 1.25,
                }}>{para.replace('## ', '')}</h2>
              )
            }
            return (
              <p key={i} style={{
                fontSize: '0.96rem', color: C.textMid, lineHeight: 1.82,
                fontFamily: "'DM Sans', sans-serif", marginBottom: '1.25rem',
              }}>{para}</p>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '4rem',
          background: C.accentBg,
          border: `1px solid ${C.accentLight}40`,
          borderLeft: `3px solid ${C.accent}`,
          borderRadius: '0 3px 3px 0',
          padding: '1.75rem 2rem',
        }}>
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
