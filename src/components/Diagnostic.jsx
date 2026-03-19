import { useState, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:         "#faf8f4",
  surface:    "#ffffff",
  surfaceAlt: "#f5f2ec",
  border:     "#e2ddd6",
  borderDark: "#c8c0b4",
  accent:     "#9a7c4a",
  accentLight:"#c8a96e",
  accentBg:   "#fdf6ec",
  red:        "#b84040",
  redBg:      "#fdf2f2",
  yellow:     "#9a6e20",
  yellowBg:   "#fdf8ec",
  green:      "#2e7a52",
  greenBg:    "#f0f9f4",
  text:       "#1a1714",
  textMid:    "#4a4540",
  textDim:    "#7a7268",
  textMuted:  "#a8a098",
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .dg-body { font-family: 'DM Sans', sans-serif; color: ${C.text}; background: ${C.bg}; min-height: 100vh; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .fade-up  { animation: fuA 0.5s cubic-bezier(.22,.68,0,1.2) both; }
  .fade-up-1{ animation: fuA 0.5s cubic-bezier(.22,.68,0,1.2) 0.08s both; }
  .fade-up-2{ animation: fuA 0.5s cubic-bezier(.22,.68,0,1.2) 0.16s both; }
  .fade-up-3{ animation: fuA 0.5s cubic-bezier(.22,.68,0,1.2) 0.24s both; }
  .fade-up-4{ animation: fuA 0.5s cubic-bezier(.22,.68,0,1.2) 0.32s both; }
  .fade-up-5{ animation: fuA 0.5s cubic-bezier(.22,.68,0,1.2) 0.40s both; }
  @keyframes fuA { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  .slide-q  { animation: slQ 0.22s ease both; }
  @keyframes slQ { from{opacity:0;transform:translateX(14px)} to{opacity:1;transform:translateX(0)} }
  .opt-btn {
    width:100%; background:${C.surface}; border:1.5px solid ${C.border};
    color:${C.text}; padding:0.875rem 1.1rem; text-align:left; cursor:pointer;
    transition:all 0.14s ease; font-family:'DM Sans',sans-serif; font-size:0.9rem;
    line-height:1.5; display:flex; align-items:center; gap:0.75rem; border-radius:4px;
  }
  .opt-btn:hover { background:${C.accentBg}; border-color:${C.accentLight}; transform:translateX(3px); }
  .opt-btn:hover .opt-dot { background:${C.accent}; }
  .opt-dot { width:7px;height:7px;border-radius:50%;background:${C.border};flex-shrink:0;transition:background 0.14s; }
  .pri-btn {
    background:${C.accent}; color:#fff; border:none; padding:0.875rem 2rem;
    font-family:'DM Sans',sans-serif; font-size:0.84rem; font-weight:500;
    letter-spacing:0.08em; text-transform:uppercase; cursor:pointer;
    transition:all 0.18s ease; border-radius:3px; text-decoration:none; display:inline-block;
  }
  .pri-btn:hover { background:#7a6038; transform:translateY(-1px); box-shadow:0 4px 14px rgba(154,124,74,.24); }
  .email-inp {
    background:${C.surface}; border:1.5px solid ${C.border}; color:${C.text};
    padding:0.85rem 1rem; font-family:'DM Sans',sans-serif; font-size:0.9rem;
    flex:1; outline:none; transition:border-color 0.14s; border-radius:3px 0 0 3px;
  }
  .email-inp:focus { border-color:${C.accent}; }
  .email-inp::placeholder { color:${C.textMuted}; }
  .notes-inp {
    width:100%; background:${C.surface}; border:1.5px solid ${C.border}; color:${C.text};
    padding:0.9rem 1rem; font-family:'DM Sans',sans-serif; font-size:0.9rem;
    line-height:1.65; resize:vertical; min-height:100px; outline:none;
    transition:border-color 0.14s; border-radius:4px;
  }
  .notes-inp:focus { border-color:${C.accent}; }
  .notes-inp::placeholder { color:${C.textMuted}; }
  .tag { display:inline-block; font-size:0.63rem; font-weight:500; letter-spacing:0.13em;
         text-transform:uppercase; padding:0.22rem 0.55rem; border-radius:2px; }
  .progress-bar  { height:3px; background:${C.border}; }
  .progress-fill { height:100%; background:${C.accent}; transition:width 0.4s ease; }
`;

// ─── QUESTIONS ─────────────────────────────────────────────────────────────────
const QS = [
  {id:"advisor_mode",section:"Before We Begin",
   question:"Are you completing this for yourself, or on behalf of a client?",
   subtext:"This helps us frame the results appropriately.",
   options:[
     {label:"For myself — I want to understand my own exposure",value:"self",flags:[]},
     {label:"I'm a CPA, financial advisor, or attorney reviewing this for a client",value:"advisor",flags:["ADVISOR_MODE"]},
   ]},
  {id:"trigger",section:"What Brought You Here",
   question:"What prompted you to look into this today?",
   subtext:"Your answer determines urgency. Be honest — it changes what we show you.",
   options:[
     {label:"I was sued or received a demand letter",value:"lawsuit",flags:["ACTIVE_LITIGATION"],urgency:5},
     {label:"A lawsuit was threatened but not yet filed",value:"threat",flags:["ACTIVE_LITIGATION"],urgency:4},
     {label:"A colleague or peer was sued and it made me think",value:"peer",flags:[],urgency:2},
     {label:"I own or am buying investment real estate",value:"realestate",flags:[],urgency:2},
     {label:"I recently crossed a major wealth milestone",value:"wealth",flags:[],urgency:2},
     {label:"I'm selling or exiting a business",value:"liquidity",flags:["LIQUIDITY_EVENT"],urgency:3},
     {label:"Divorce or relationship concerns",value:"divorce",flags:["DIVORCE_RISK"],urgency:4},
     {label:"I'm just being proactive",value:"proactive",flags:[],urgency:1},
     {label:"Something else",value:"other",flags:[],urgency:1},
   ]},
  {id:"profession",section:"Who You Are",
   question:"Which best describes your primary occupation or role?",
   subtext:"Different professions carry fundamentally different liability profiles. A surgeon and a business owner face different threats even at identical net worth.",
   options:[
     {label:"Physician / Medical Practice Owner",value:"physician",flags:["HIGH_RISK","PHYSICIAN"],profMod:2},
     {label:"Surgeon — orthopedic, neuro, cardiovascular, or spine",value:"surgeon",flags:["HIGH_RISK","PHYSICIAN","NUCLEAR_VERDICT"],profMod:3},
     {label:"Real Estate Developer / Investor / Contractor",value:"realestate_pro",flags:["HIGH_RISK"],profMod:2},
     {label:"Attorney or Financial Advisor",value:"professional",flags:["HIGH_RISK"],profMod:1},
     {label:"Business Owner (non-medical)",value:"business",flags:[],profMod:1},
     {label:"High-Income W-2 Employee",value:"w2",flags:[],profMod:0},
     {label:"Multiple of the above",value:"multiple",flags:["HIGH_RISK"],profMod:2},
   ]},
  {id:"net_worth",section:"Who You Are",
   question:"Approximate net worth — total assets minus total debts?",
   subtext:"This calibrates the stakes. The same structural gap at $800K and at $8M are completely different planning problems.",
   options:[
     {label:"Under $500K",value:"u500",nwM:0.5},
     {label:"$500K – $2M",value:"500_2m",nwM:1.0},
     {label:"$2M – $5M",value:"2_5m",nwM:1.4},
     {label:"$5M – $10M",value:"5_10m",nwM:1.8,flags:["OFFSHORE_THRESHOLD"]},
     {label:"Over $10M",value:"o10m",nwM:2.2,flags:["OFFSHORE_THRESHOLD","ESTATE_TAX"]},
   ]},
  {id:"state",section:"Who You Are",
   question:"What state do you primarily reside in?",
   subtext:"State law determines which exemptions are available — and which strategies are off the table entirely.",
   options:[
     {label:"Florida",value:"florida",flags:["FL"]},
     {label:"Texas",value:"texas",flags:["TX"]},
     {label:"Nevada",value:"nevada",flags:[]},
     {label:"California",value:"california",flags:["CA"]},
     {label:"New York",value:"newyork",flags:[]},
     {label:"Other state",value:"other",flags:[]},
   ]},
  {id:"marital",section:"Who You Are",
   question:"What is your marital status?",
   subtext:"Marital status is one of the most underutilized planning variables in Florida — and one of the most important creditor attack surfaces.",
   options:[
     {label:"Married — first marriage",value:"married_1",flags:["MARRIED","TBE_POSSIBLE"]},
     {label:"Married — second or subsequent marriage",value:"married_2",flags:["MARRIED","TBE_POSSIBLE","BLENDED"]},
     {label:"Single / divorced / widowed",value:"single",flags:[]},
     {label:"Domestic partnership",value:"partner",flags:[]},
   ]},
  {id:"tbe",section:"Who You Are",
   question:"Do you and your spouse hold significant joint assets titled specifically as Tenancy by the Entireties?",
   subtext:"Florida TBE titling provides complete protection from one spouse's individual creditors. Most married couples hold assets as 'joint tenants' — which provides none of this protection.",
   showIf:a=>a.marital==="married_1"||a.marital==="married_2",
   options:[
     {label:"Yes — specifically titled as TBE",value:"yes",flags:["TBE"]},
     {label:"We hold things jointly but I'm not sure of the exact titling",value:"unsure",flags:["TBE_UNKNOWN"],gapPts:6},
     {label:"Assets are separate or we haven't addressed titling",value:"no",flags:["TBE_MISSED"],gapPts:8},
   ]},
  {id:"has_entity",section:"Your Structure",
   question:"Do you operate your business or practice through a formal legal entity?",
   subtext:"An LLC, corporation, or professional association — not a DBA or sole proprietorship.",
   options:[
     {label:"Yes",value:"yes",flags:[]},
     {label:"No — I operate personally or as a sole proprietor",value:"no",flags:["NO_ENTITY"],gapPts:15},
     {label:"Not sure",value:"unsure",flags:["NO_ENTITY"],gapPts:12},
   ]},
  {id:"entity_type",section:"Your Structure",
   question:"What type of entity do you use?",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Single-member LLC",value:"smllc",flags:["SMLLC"],gapPts:4},
     {label:"Multi-member LLC",value:"mmllc",flags:["MMLLC"]},
     {label:"S-Corporation",value:"scorp",flags:["SCORP_RISK"],gapPts:10,trap:true},
     {label:"C-Corporation",value:"ccorp",flags:[]},
     {label:"Professional Association (PA)",value:"pa",flags:["SCORP_RISK","PA"],gapPts:10,trap:true},
     {label:"Multiple entities",value:"multi",flags:["MULTI_ENTITY"]},
     {label:"Not sure of the type",value:"unsure",flags:["ENTITY_UNKNOWN"],gapPts:8},
   ]},
  {id:"liability_dir",section:"Your Structure",
   question:"What is your primary concern — protecting personal assets if your business is sued, or protecting your business if you personally face a judgment?",
   subtext:"Inside liability and outside liability attack from opposite directions and require completely different structures.",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Protecting personal assets from a business lawsuit (inside liability)",value:"inside",flags:["INSIDE"]},
     {label:"Protecting business/investment assets from a personal judgment (outside liability)",value:"outside",flags:["OUTSIDE"]},
     {label:"Both directions — I have exposure either way",value:"both",flags:["INSIDE","OUTSIDE"]},
     {label:"I'm not sure I understand the difference",value:"unsure",flags:["INSIDE","OUTSIDE"],gapPts:5},
   ]},
  {id:"operating_agreement",section:"Your Structure",
   question:"Do you have a current operating agreement reviewed by an attorney within the last two years?",
   subtext:"A template or outdated operating agreement is treated identically to no operating agreement when courts test entity legitimacy.",
   showIf:a=>a.entity_type==="smllc"||a.entity_type==="mmllc",
   options:[
     {label:"Yes — reviewed and updated within 2 years",value:"current",flags:[]},
     {label:"Yes — but over 2 years old",value:"stale",flags:["STALE_OA","TIME_DECAY"],gapPts:5},
     {label:"I have a downloaded template",value:"template",flags:["STALE_OA","TIME_DECAY"],gapPts:9},
     {label:"No operating agreement",value:"none",flags:["NO_OA"],gapPts:11},
     {label:"Not sure",value:"unsure",flags:["STALE_OA"],gapPts:6},
   ]},
  {id:"formalities",section:"Your Structure",
   question:"Does your entity hold annual meetings, document major decisions in writing, and maintain records separate from your personal affairs?",
   subtext:"Failure to observe corporate formalities is the primary basis courts use to pierce the veil and hold owners personally responsible for entity debts.",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Yes — fully maintained with documented minutes and resolutions",value:"yes",flags:[]},
     {label:"Mostly — some documentation but inconsistently maintained",value:"mostly",flags:["FORMALITY_GAP"],gapPts:6},
     {label:"No — no formal record-keeping",value:"no",flags:["FORMALITY_GAP","VEIL_PIERCE"],gapPts:13},
     {label:"I didn't know this was required",value:"unknown",flags:["FORMALITY_GAP","VEIL_PIERCE"],gapPts:13},
   ]},
  {id:"commingling",section:"Your Structure",
   question:"Do your personal and business finances ever mix?",
   subtext:"Commingling is the single most common reason entity protection collapses in court. A creditor who proves commingling doesn't need to pierce the veil — you've already done it.",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Never — completely separate with no exceptions",value:"never",flags:[]},
     {label:"Occasionally — minor items here and there",value:"occasionally",flags:["COMMINGLING"],gapPts:8},
     {label:"Regularly — not strictly separated",value:"regularly",flags:["COMMINGLING","VEIL_PIERCE"],gapPts:16},
     {label:"Not sure",value:"unsure",flags:["COMMINGLING"],gapPts:7},
   ]},
  {id:"salary_dist",section:"Your Structure",
   question:"If you own your business entity, how do you primarily pay yourself?",
   subtext:"This affects a creditor protection you may not know exists — the federal wage garnishment exemption covers authorized salary but not distributions.",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Authorized salary — regular documented payroll",value:"salary",flags:[]},
     {label:"Distributions or draws — no formal salary",value:"dist",flags:["SALARY_GAP"],gapPts:8},
     {label:"Mix of both",value:"mixed",flags:[]},
     {label:"Not sure how it's classified",value:"unsure",flags:["SALARY_GAP"],gapPts:6},
   ]},
  {id:"owns_re",section:"Your Assets",
   question:"Do you own real estate beyond your primary residence?",
   subtext:"Investment property, commercial real estate, or land.",
   options:[
     {label:"Yes",value:"yes",flags:[]},
     {label:"No",value:"no",flags:[]},
   ]},
  {id:"re_held",section:"Your Assets",
   question:"How do you hold your investment real estate?",
   subtext:"This is where we see some of the most consequential — and most correctable — structural errors.",
   showIf:a=>a.owns_re==="yes",
   options:[
     {label:"In my own name personally",value:"personal",flags:["RE_PERSONAL"],gapPts:14},
     {label:"One LLC holds multiple properties",value:"one_llc",flags:["RE_CONCENTRATED"],gapPts:8},
     {label:"Separate LLC per property",value:"sep_llc",flags:[]},
     {label:"Inside a revocable trust",value:"rev_trust",flags:["RE_REV_TRUST"],gapPts:8,trap:true},
     {label:"Inside an irrevocable trust",value:"irrev_trust",flags:[]},
     {label:"Mix of personal and entity",value:"mix",flags:["RE_PERSONAL","RE_CONCENTRATED"],gapPts:12},
     {label:"Not sure",value:"unsure",flags:["RE_PERSONAL"],gapPts:10},
   ]},
  {id:"fl_homestead",section:"Your Assets",
   question:"Is your primary residence in Florida, and how is it held?",
   subtext:"Florida's constitutional homestead exemption is unlimited in value — but it is also one of the most easily destroyed protections in the state.",
   showIf:a=>a.state==="florida",
   options:[
     {label:"Yes — in my name, homestead exemption filed",value:"fl_hs",flags:["FL_HOMESTEAD"]},
     {label:"Yes — in my name, exemption not filed",value:"fl_no_hs",flags:["FL_NO_HOMESTEAD"],gapPts:10},
     {label:"Yes — but held inside an LLC",value:"fl_llc",flags:["FL_HOMESTEAD_DESTROYED"],gapPts:18,trap:true},
     {label:"Yes — inside a revocable or living trust",value:"fl_rev",flags:["FL_HS_TRUST_RISK"],gapPts:6},
     {label:"I rent or my primary residence is not in Florida",value:"fl_none",flags:[]},
   ]},
  {id:"retirement",section:"Your Assets",
   question:"Do you have retirement accounts — 401(k), IRA, pension, or profit-sharing plan?",
   subtext:"Properly structured ERISA-qualified plans are among the strongest creditor protections available. But not all retirement accounts are equally protected.",
   options:[
     {label:"Yes — primarily in a 401(k), pension, or ERISA plan",value:"erisa",flags:["ERISA"]},
     {label:"Yes — primarily in an IRA",value:"ira",flags:["IRA"]},
     {label:"Yes — mix of both",value:"mixed",flags:["ERISA"]},
     {label:"No retirement accounts",value:"none",flags:["NO_RETIRE"],gapPts:5},
   ]},
  {id:"life_insurance",section:"Your Assets",
   question:"Do you carry permanent life insurance with accumulated cash value?",
   subtext:"In Florida, life insurance cash value and annuity values are fully exempt from creditor claims under Fla. Stat. §222.14 — unlimited in value.",
   options:[
     {label:"Yes — significant cash value (over $100K)",value:"high",flags:["FL_INS_EXEMPT"]},
     {label:"Yes — modest cash value (under $100K)",value:"low",flags:["FL_INS_EXEMPT"]},
     {label:"Term life only — no cash value",value:"term",flags:[]},
     {label:"No life insurance",value:"none",flags:[]},
   ]},
  {id:"existing_trusts",section:"Your Assets",
   question:"Do you have any irrevocable trusts, self-settled asset protection trusts, or life insurance trusts in place?",
   subtext:"Existing structures need validation. A trust funded within the last 10 years may still be inside the federal lookback window under 11 U.S.C. §548(e).",
   options:[
     {label:"Yes — irrevocable trust funded more than 10 years ago",value:"old_irrev",flags:["IRREV_TRUST"]},
     {label:"Yes — irrevocable trust funded within the last 10 years",value:"recent_irrev",flags:["IRREV_TRUST","DAPT_SEASON"],gapPts:6},
     {label:"Yes — a self-settled / domestic asset protection trust (DAPT)",value:"dapt",flags:["DAPT","DAPT_SEASON"],gapPts:4},
     {label:"Yes — a life insurance trust (ILIT)",value:"ilit",flags:[]},
     {label:"No irrevocable structures",value:"none",flags:[]},
   ]},
  {id:"umbrella",section:"Your Coverage",
   question:"Do you carry a personal umbrella liability insurance policy?",
   subtext:"Umbrella coverage is the first line of defense. The gap between your policy limits and a nuclear verdict is often the most important number in this entire diagnostic.",
   options:[
     {label:"Yes — $5M or more",value:"high",flags:[]},
     {label:"Yes — $1M to $5M",value:"mid",flags:[]},
     {label:"Yes — under $1M",value:"low",flags:["UNDERINSURED"],gapPts:7},
     {label:"No umbrella policy",value:"none",flags:["NO_UMBRELLA"],gapPts:12},
     {label:"Not sure what I have",value:"unsure",flags:["NO_UMBRELLA"],gapPts:9},
   ]},
  {id:"ins_strategy",section:"Your Coverage",
   question:"What role does insurance play in your protection strategy?",
   options:[
     {label:"Insurance is my primary strategy — my main plan is to be well insured",value:"primary",flags:["INS_ONLY"],gapPts:8},
     {label:"Insurance plus structural protections",value:"mixed",flags:[]},
     {label:"Structural planning is primary — insurance fills gaps",value:"structural",flags:[]},
     {label:"I haven't thought about it in those terms",value:"unsure",flags:["INS_ONLY"],gapPts:6},
   ]},
  // PHYSICIAN BRANCH
  {id:"mal_type",section:"Practice Risk",
   question:"What type of malpractice insurance do you carry?",
   subtext:"Claims-made policies create an invisible gap most physicians discover only after a policy change.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Occurrence-based — covers any incident during the policy period regardless of when filed",value:"occurrence",flags:[]},
     {label:"Claims-made — with tail coverage confirmed in writing",value:"claims_tail",flags:[]},
     {label:"Claims-made — tail coverage not yet arranged",value:"claims_no_tail",flags:["TAIL_GAP"],gapPts:14},
     {label:"Not sure which type",value:"unsure",flags:["TAIL_GAP"],gapPts:10},
     {label:"No malpractice insurance",value:"none",flags:["NO_MAL"],gapPts:22},
   ]},
  {id:"carrier_rating",section:"Practice Risk",
   question:"Do you know your malpractice carrier's AM Best financial strength rating?",
   subtext:"A financially insolvent or non-state-registered carrier means your policy may be worthless at claim time. This is Gassman's Catastrophic Error #2.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Yes — A or A+ rated",value:"strong",flags:[]},
     {label:"Yes — B-rated or lower",value:"weak",flags:["CARRIER_RISK"],gapPts:14},
     {label:"I don't know my carrier's rating",value:"unknown",flags:["CARRIER_RISK"],gapPts:10},
     {label:"I use a captive or risk retention group",value:"captive",flags:["CAPTIVE"]},
   ]},
  {id:"payer_conc",section:"Practice Risk",
   question:"What percentage of your practice revenue comes from your top 2 insurance payers combined?",
   subtext:"Payer concentration is the leading cause of physician practice financial collapse in Florida — a single audit notice triggers a cascade that cannot be interrupted once it begins.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Under 30% — well diversified",value:"low",flags:[]},
     {label:"30% to 60%",value:"mid",flags:["PAYER_CONC"],gapPts:8},
     {label:"Over 60%",value:"high",flags:["PAYER_CONC","FOUNDING_CASE"],gapPts:16},
     {label:"Medicare or Medicaid is my largest payer (over 30%)",value:"govt",flags:["PAYER_CONC","GOVT_PAYER"],gapPts:12},
     {label:"Not sure",value:"unsure",flags:["PAYER_CONC"],gapPts:8},
   ]},
  {id:"billing_review",section:"Practice Risk",
   question:"When did you last have an independent billing and coding review — conducted through an attorney to preserve privilege?",
   subtext:"A billing review done outside attorney-client privilege creates documentation auditors can subpoena. The same review done through counsel is protected.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Within 12 months — through an attorney",value:"recent_priv",flags:[]},
     {label:"Within 12 months — not through an attorney",value:"recent_unpriv",flags:["BILLING_PRIV_GAP"],gapPts:6},
     {label:"1 to 3 years ago",value:"old",flags:["BILLING_GAP"],gapPts:8},
     {label:"Never or more than 3 years ago",value:"never",flags:["BILLING_GAP"],gapPts:12},
   ]},
  {id:"payroll_tax",section:"Practice Risk",
   question:"Are all payroll tax deposits for your practice fully current — no outstanding 941 obligations?",
   subtext:"The IRS Trust Fund Recovery Penalty (IRC §6672) is personal, 100%, non-dischargeable in bankruptcy, and overrides the Florida homestead. This is the one liability no structure can shield against after the fact.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Yes — fully current, no issues",value:"current",flags:[]},
     {label:"Not fully sure — may be outstanding amounts",value:"unsure",flags:["PAYROLL_TAX"],gapPts:18},
     {label:"We have outstanding payroll tax obligations",value:"delinquent",flags:["PAYROLL_TAX","PAYROLL_CRITICAL"],gapPts:25},
   ]},
  {id:"buy_sell",section:"Practice Risk",
   question:"If you co-own your practice, do you have a funded buy-sell agreement reviewed within the last 3 years?",
   subtext:"An unfunded or outdated buy-sell can force a practice sale or valuation dispute at the worst possible time.",
   showIf:a=>(a.profession==="physician"||a.profession==="surgeon")&&(a.entity_type==="mmllc"||a.entity_type==="pa"||a.entity_type==="multi"),
   options:[
     {label:"Yes — funded and reviewed within 3 years",value:"current",flags:[]},
     {label:"Yes — but not reviewed in over 3 years",value:"stale",flags:["STALE_BS"],gapPts:8},
     {label:"No buy-sell agreement",value:"none",flags:["NO_BS"],gapPts:10},
     {label:"Not sure",value:"unsure",flags:["STALE_BS"],gapPts:7},
   ]},
  {id:"stark",section:"Practice Risk",
   question:"If your practice involves physician referrals to in-house services, are compensation arrangements documented quarterly in advance?",
   subtext:"Failure to document Stark Law compensation arrangements quarterly in advance is a felony exposure issue — not a compliance technicality.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Yes — documented quarterly in advance with counsel review",value:"yes",flags:[]},
     {label:"We have documentation but not done quarterly in advance",value:"partial",flags:["STARK"],gapPts:12},
     {label:"No — not formally documented",value:"no",flags:["STARK"],gapPts:16},
     {label:"Our practice doesn't involve in-house referrals",value:"na",flags:[]},
   ]},
  // GUARANTEES
  {id:"guarantees",section:"Your Liabilities",
   question:"Have you personally guaranteed any business loans, commercial leases, or lines of credit?",
   subtext:"A personal guarantee is a direct creditor attachment point that bypasses every entity structure you have built.",
   options:[
     {label:"Yes — under $100K total",value:"low",flags:["GUARANTEE"],gapPts:5},
     {label:"Yes — $100K to $500K",value:"mid",flags:["GUARANTEE"],gapPts:10},
     {label:"Yes — over $500K",value:"high",flags:["GUARANTEE","GUARANTEE_CRIT"],gapPts:16},
     {label:"No personal guarantees",value:"none",flags:[]},
     {label:"Not sure",value:"unsure",flags:["GUARANTEE"],gapPts:7},
   ]},
  // TRANSFERS
  {id:"transfers",section:"Transfer History",
   question:"Have you transferred significant assets — real estate, business interests, or substantial cash — to a spouse, family member, or trust in the last 4 years?",
   subtext:"Florida's Voidable Transactions Act (Fla. Stat. §726.105) gives creditors a 4-year window to reverse transfers. For self-settled trusts, 11 U.S.C. §548(e) extends this to 10 years.",
   options:[
     {label:"Yes",value:"yes",flags:[]},
     {label:"No",value:"no",flags:[]},
     {label:"Not sure",value:"unsure",flags:[]},
   ]},
  {id:"transfer_timing",section:"Transfer History",
   question:"Were any of those transfers made after a lawsuit was filed, threatened, or when you knew a claim was likely?",
   showIf:a=>a.transfers==="yes",
   options:[
     {label:"Yes",value:"yes",flags:["BADGES_FRAUD","FT_CRITICAL"],gapPts:22},
     {label:"No — all transfers preceded any known claims",value:"no",flags:[]},
     {label:"Not sure",value:"unsure",flags:["FT_RISK"],gapPts:10},
   ]},
  {id:"transfer_value",section:"Transfer History",
   question:"Were those transfers made for fair market value, or were they gifts?",
   showIf:a=>a.transfers==="yes",
   options:[
     {label:"Fair market value — I received equivalent consideration",value:"fmv",flags:[]},
     {label:"Gifts or below market value",value:"gift",flags:["FT_CONSTRUCTIVE"],gapPts:8},
     {label:"Mix",value:"mix",flags:["FT_CONSTRUCTIVE"],gapPts:6},
     {label:"Not sure",value:"unsure",flags:["FT_CONSTRUCTIVE"],gapPts:6},
   ]},
  // FOREIGN
  {id:"foreign",section:"Your Assets",
   question:"Do you hold any assets, accounts, or business interests outside the United States?",
   subtext:"Foreign assets create planning opportunities and significant compliance obligations. FBAR non-compliance gives opposing counsel powerful enforcement leverage.",
   options:[
     {label:"Yes — and I am current on all FBAR and foreign reporting",value:"yes_ok",flags:["FOREIGN"]},
     {label:"Yes — but I'm not sure if reporting is fully current",value:"yes_unsure",flags:["FOREIGN","FBAR_RISK"],gapPts:14},
     {label:"No foreign assets or accounts",value:"no",flags:[]},
   ]},
  // SUCCESSION
  {id:"incapacity",section:"Continuity Planning",
   question:"If you became incapacitated tomorrow, is there a named successor trustee or durable power of attorney with legal authority to manage your assets and business?",
   subtext:"Assets frozen during incapacity while creditors continue collecting is a recurring catastrophic failure pattern.",
   options:[
     {label:"Yes — fully documented with named successor trustee and DPOA",value:"yes",flags:[]},
     {label:"Partially — some documents but not fully coordinated",value:"partial",flags:["SUCCESSION_GAP"],gapPts:6},
     {label:"No — nothing formal in place",value:"no",flags:["SUCCESSION_GAP","INCAPACITY"],gapPts:12},
     {label:"I didn't know this was a planning gap",value:"unknown",flags:["SUCCESSION_GAP","INCAPACITY"],gapPts:12},
   ]},
  {id:"beneficiaries",section:"Continuity Planning",
   question:"Have you reviewed beneficiary designations on retirement accounts and life insurance within the last 3 years?",
   subtext:"Beneficiary designations override your will, your trust, and your estate plan entirely. A 1998 designation naming a prior spouse is still legally binding today.",
   options:[
     {label:"Yes — reviewed and updated within 3 years",value:"current",flags:[]},
     {label:"Set originally but never reviewed since",value:"stale",flags:["STALE_BENE"],gapPts:8},
     {label:"Never reviewed or not sure",value:"never",flags:["STALE_BENE"],gapPts:10},
   ]},
  {id:"advisor_coord",section:"Continuity Planning",
   question:"Do your CPA, financial advisor, and estate planning attorney actively coordinate with each other on your overall structure?",
   subtext:"The most preventable catastrophic planning errors result from advisors working in silos — your tax strategy contradicting your estate plan, your insurance conflicting with your entity structure.",
   options:[
     {label:"Yes — they communicate regularly, I have coordinated reviews",value:"yes",flags:[]},
     {label:"They know of each other but don't actively coordinate",value:"partial",flags:["ADVISOR_SILO"],gapPts:5},
     {label:"Each operates independently — no coordination",value:"no",flags:["ADVISOR_SILO"],gapPts:8},
     {label:"I don't have all three types of advisors",value:"missing",flags:["ADVISOR_SILO","ADVISOR_GAP"],gapPts:8},
   ]},
  // LITIGATION
  {id:"litigation",section:"Current Exposure",
   question:"Are you currently named as a defendant in a lawsuit, or have you received a formal demand letter?",
   options:[
     {label:"Yes — active lawsuit filed",value:"active",flags:["ACTIVE_LIT","WINDOW_CLOSED"],gapPts:22},
     {label:"Yes — demand letter or formal threat",value:"threat",flags:["ACTIVE_LIT"],gapPts:16},
     {label:"No, but I was sued in the last 5 years",value:"prior",flags:["PRIOR_LIT"],gapPts:5},
     {label:"No current or recent litigation",value:"none",flags:[]},
   ]},
  // MISCONCEPTION TRAPS
  {id:"rev_trust_belief",section:"What You Believe",
   question:"Do you have a revocable living trust, and do you believe it protects your assets from creditors?",
   subtext:"This is the most expensive misconception in wealth planning.",
   options:[
     {label:"Yes — and I believe it protects me from creditors",value:"yes_wrong",flags:["REV_TRUST_MYTH"],gapPts:10,trap:true},
     {label:"Yes — but I understand it is for estate planning only, not creditor protection",value:"yes_right",flags:[]},
     {label:"No revocable trust",value:"no",flags:[]},
     {label:"Not sure",value:"unsure",flags:[]},
   ]},
  // NOTES
  {id:"notes",section:"Anything Else",
   question:"Is there anything else about your situation we should know?",
   subtext:"A pending transaction, a specific concern, a recent event — anything you think is relevant. This goes directly to the specialist who reviews your profile.",
   type:"text",
   options:[]},
  // GUT CHECK
  {id:"gut_check",section:"The Bottom Line",
   question:"If a creditor's attorney pulled your public records tomorrow — entity filings, property records, UCC searches — how confident are you in what they would find?",
   options:[
     {label:"Confident — I have a current reviewed structure and know exactly what is and isn't protected",value:"confident",flags:[]},
     {label:"Somewhat — I have structures but haven't verified they would hold",value:"partial",flags:["UNVERIFIED"],gapPts:5},
     {label:"Not confident — I know there are gaps I haven't addressed",value:"low",flags:["UNVERIFIED","UNREVIEWED"],gapPts:8},
     {label:"I didn't know public records revealed this much",value:"unaware",flags:["UNVERIFIED","UNREVIEWED"],gapPts:10},
   ]},
  {id:"last_review",section:"The Bottom Line",
   question:"When did you last have an attorney conduct a structural review specifically for creditor exposure?",
   options:[
     {label:"Within the last year",value:"recent",flags:[]},
     {label:"1 to 3 years ago",value:"mid",flags:["STALE_REVIEW"]},
     {label:"Over 3 years ago",value:"old",flags:["STALE_REVIEW"]},
     {label:"Never",value:"never",flags:["NEVER_REVIEWED"]},
     {label:"I didn't know that was something people did",value:"unknown",flags:["NEVER_REVIEWED"]},
   ]},
];

// ─── ANALYSIS ENGINE ──────────────────────────────────────────────────────────
function analyze(answers) {
  let gapPts = 0;
  const F = new Set();

  QS.forEach(q => {
    if (q.showIf && !q.showIf(answers)) return;
    const val = answers[q.id];
    if (!val || q.type==="text") return;
    const opt = q.options.find(o=>o.value===val);
    if (!opt) return;
    if (opt.gapPts) gapPts += opt.gapPts;
    if (opt.flags) opt.flags.forEach(f=>F.add(f));
  });

  const nwOpt = QS.find(q=>q.id==="net_worth")?.options.find(o=>o.value===answers.net_worth);
  const nwM = nwOpt?.nwM||1.0;
  gapPts = Math.round(gapPts * nwM);
  const score = Math.min(100, gapPts);

  let tier, tColor, tLabel;
  if (score<=18){tier=1;tColor=C.green;tLabel="STRUCTURED";}
  else if (score<=42){tier=2;tColor=C.yellow;tLabel="GAPS PRESENT";}
  else if (score<=68){tier=3;tColor=C.accent;tLabel="SIGNIFICANTLY EXPOSED";}
  else{tier=4;tColor=C.red;tLabel="CRITICAL";}

  // Urgency
  let urgency,uLabel,uColor;
  if(F.has("ACTIVE_LIT")||F.has("WINDOW_CLOSED")||F.has("PAYROLL_CRITICAL")){urgency="closing";uLabel="CLOSING";uColor=C.red;}
  else if(F.has("FOUNDING_CASE")||F.has("BADGES_FRAUD")||F.has("LIQUIDITY_EVENT")||F.has("DIVORCE_RISK")||score>=50){urgency="narrowing";uLabel="NARROWING";uColor=C.yellow;}
  else{urgency="open";uLabel="OPEN";uColor=C.green;}

  // Findings
  const findings=[];

  if(F.has("NO_ENTITY"))findings.push({sev:"critical",title:"No Structural Barrier Between You and Creditors",
    body:"Operating without a formal entity means every business liability is your personal liability — no legal separation exists between what you've built and what a creditor can take. A judgment creditor can immediately pursue your personal bank accounts, investments, and real estate with no additional procedural barrier.",
    cite:"Fla. Stat. §48.081; personal liability default rule"});

  if(F.has("SCORP_RISK"))findings.push({sev:"critical",title:"Your Entity Type Provides Zero Charging Order Protection",
    body:"S-corporation shares and Professional Association interests are directly attachable by personal creditors — a creditor becomes a full shareholder with inspection, accounting, and dissolution rights. Unlike LLC membership interests, there is no charging-order-only remedy. This is the most frequently missed structural error in Florida planning and it is fully correctable.",
    cite:"Adkisson & Riser, Asset Protection, Ch. 17, p. 189-194; Fla. Stat. §605.0503 (charging order applies to LLCs only)",
    trap:true, trapLabel:"Structural Misconception Identified"});

  if(F.has("FL_HOMESTEAD_DESTROYED"))findings.push({sev:"critical",title:"Placing Your Home in an LLC Destroyed Your Homestead Protection",
    body:"Florida's constitutional homestead exemption — unlimited in value — requires ownership by a natural person who permanently resides on the property. Transferring it into an LLC eliminates this protection entirely. A home worth $3M held correctly is untouchable by most creditors. That same home in an LLC is a direct creditor asset. This is correctable with careful title work and reassessment planning.",
    cite:"Art. X, §4, Fla. Const.; Fla. Stat. §196.031; Snyder v. Davis, 699 So.2d 999 (Fla. 1997)",
    trap:true, trapLabel:"Critical Misconception Identified"});

  if(F.has("REV_TRUST_MYTH"))findings.push({sev:"critical",title:"A Revocable Trust Provides Zero Creditor Protection",
    body:"A revocable living trust is a probate avoidance tool, not a creditor protection tool. Because you can revoke it at any time, creditors treat those assets as legally yours. Florida courts consistently hold that revocable trust assets are fully reachable. This misconception leads people to believe they are protected when they are completely exposed.",
    cite:"Fla. Stat. §736.0505(1); Restatement (Third) of Trusts §25",
    trap:true, trapLabel:"Dangerous Misconception Identified"});

  if(F.has("PAYROLL_TAX")||F.has("PAYROLL_CRITICAL"))findings.push({sev:"critical",title:"Payroll Tax Exposure — Every Asset Is At Risk Including Your Home",
    body:"The IRS Trust Fund Recovery Penalty (IRC §6672) is personal, 100% of the unpaid amount, non-dischargeable in bankruptcy, and federal preemption overrides every Florida state exemption — including the unlimited homestead. The IRS can force the sale of your Florida home to collect delinquent payroll taxes. No asset protection structure implemented after the fact provides any protection against this liability.",
    cite:"IRC §6672; U.S. v. Craft, 535 U.S. 274 (2002); United States v. National Bank of Commerce, 472 U.S. 713 (1985)"});

  if(F.has("COMMINGLING")||F.has("VEIL_PIERCE"))findings.push({sev:"critical",title:"Commingling Creates Veil-Piercing Exposure",
    body:"Courts apply a two-part test: (1) unity of interest — the entity and owner are effectively one; and (2) fundamental inequity — allowing the owner to hide behind the entity. Commingling essentially concedes the first element, reducing the creditor's burden to near zero. Your entity exists on paper but may not exist in court.",
    cite:"Dania Jai-Alai Palace v. Sykes, 450 So.2d 1114 (Fla. 1984); Adkisson & Riser, Ch. 16, p. 180-181"});

  if(F.has("FOUNDING_CASE"))findings.push({sev:"critical",title:"Founding Case Risk — Multi-Front Cascade Identified",
    body:"Your profile shows conditions consistent with Gassman's Founding Case Pattern: payer concentration exceeding 60% means a single audit notice triggers simultaneous payer clawback, personal guarantee enforcement, and practice entity exposure in sequence. Each phase accelerates the next. Once the first audit notice arrives, the sequence cannot be interrupted. The window for structural pre-positioning closes at that moment.",
    cite:"Gassman, Creditor Protection for Florida Physicians (2020), Ch. 3 — The Founding Case Pattern"});

  if(F.has("BADGES_FRAUD")||F.has("FT_CRITICAL"))findings.push({sev:"critical",title:"Post-Litigation Transfers — Creditor Clawback Highly Probable",
    body:"Under Fla. Stat. §726.105, transfers made with intent to hinder, delay, or defraud a creditor are voidable for 4 years, extended by the discovery rule. A post-litigation transfer satisfies the intent element with near-certainty. Courts infer intent from the 11 badges of fraud; a transfer after a known claim carries at minimum badges 1 (insider), 4 (pending litigation), and 8 (no equivalent value). These transfers can be reversed by court order.",
    cite:"Fla. Stat. §726.105(1)(a); §726.110(1) (4-year limit + discovery rule); 11 U.S.C. §548(a)(1)(A)"});

  if(F.has("TAIL_GAP"))findings.push({sev:"high",title:"Malpractice Coverage Gap — Claims-Made Without Confirmed Tail",
    body:"A claims-made policy covers only claims filed while the policy is active. When you retire, switch carriers, or your practice closes, any claim from a prior procedure filed after the policy lapses is completely uninsured. Tail coverage must be explicitly arranged and confirmed in writing. Most physicians discover this gap when it is too late to correct it.",
    cite:"Gassman, Creditor Protection for Florida Physicians, Ch. 2 — Catastrophic Error #3"});

  if(F.has("CARRIER_RISK"))findings.push({sev:"high",title:"Malpractice Carrier Financial Strength Not Confirmed",
    body:"A financially insolvent or non-state-registered carrier means your policy may be worthless when you need it most. Florida requires malpractice carriers to be registered with the Department of Financial Services. An A-rated carrier by AM Best has sufficient reserves; a B-rated or unrated carrier may not. Gassman identifies this as Catastrophic Error #2 — discovered only at claim time.",
    cite:"Gassman, Creditor Protection for Florida Physicians, Ch. 2; Fla. Stat. §627.357"});

  if(F.has("FBAR_RISK"))findings.push({sev:"high",title:"Foreign Asset Reporting Non-Compliance Creates Enforcement Leverage",
    body:"FBAR non-compliance carries civil penalties exceeding $10,000 per violation and criminal exposure up to $500,000 and 10 years imprisonment. In judgment enforcement, a creditor's attorney who discovers unreported foreign accounts transforms a negotiable settlement into a collection proceeding backed by federal criminal exposure. The 11th Circuit has held that U.S. courts can subpoena foreign bank records through U.S. branches.",
    cite:"31 U.S.C. §5314; 31 C.F.R. §1010.350; U.S. v. Bank of Nova Scotia, 740 F.2d 817 (11th Cir. 1984)"});

  if(F.has("DAPT_SEASON"))findings.push({sev:"high",title:"Existing Trust May Still Be Inside the Federal 10-Year Lookback Window",
    body:"A self-settled asset protection trust funded within the last 10 years remains inside the federal lookback window under 11 U.S.C. §548(e). Nevada and South Dakota market 2-year state-law lookbacks — those are real but irrelevant in federal bankruptcy, where the 10-year rule governs. This is the most frequently omitted disclosure in DAPT planning.",
    cite:"11 U.S.C. §548(e) — 10-year lookback for self-settled trusts; In re Mortensen, 09-90036 (Bankr. D. Alaska 2011)",
    trap:true, trapLabel:"Planning Gap Identified"});

  if(F.has("GUARANTEE")||F.has("GUARANTEE_CRIT"))findings.push({sev:"high",title:"Personal Guarantees Bypass Your Entire Entity Structure",
    body:"A personal guarantee is an independent obligation — the creditor holding it does not need to pierce any veil or pursue any equitable theory. You have already consented to personal liability. Every guaranteed obligation must be inventoried, quantified, and factored into your structural planning as a direct exposure item that no LLC, trust, or corporation can block.",
    cite:"Restatement (Third) of Suretyship & Guaranty §1; personal guarantee as independent obligation"});

  if(F.has("STARK"))findings.push({sev:"high",title:"Stark Law Documentation Gap — Felony Exposure",
    body:"The Stark Law (42 U.S.C. §1395nn) prohibits physician self-referral to entities with financial relationships unless specific exceptions apply. Those exceptions require compensation arrangements documented in writing, in advance, quarterly, and consistent with fair market value. Failure to document quarterly in advance is a felony exposure issue, not a technical compliance matter — it creates qui tam relator risk from any informed employee.",
    cite:"42 U.S.C. §1395nn; 42 C.F.R. §411.357; Gassman, A Practical Guide to Kickback and Self-Referral Laws for Florida Physicians"});

  if(F.has("RE_PERSONAL"))findings.push({sev:"high",title:"Personally Held Investment Real Estate Is Directly Exposed",
    body:"Real estate in your individual name is directly attachable by any judgment creditor through levy and forced sale. Tenant claims, environmental liability, construction defect actions, and lease disputes flow directly to your personal balance sheet. This is one of the most straightforward structural corrections available.",
    cite:"Fla. Stat. §56.061 (levy on real property); Fla. Stat. §55.10 (judgment lien on real property)"});

  if(F.has("TBE_UNKNOWN")||F.has("TBE_MISSED"))findings.push({sev:"medium",title:"Tenancy by the Entireties Protection May Be Unclaimed",
    body:"In Florida, married couples holding assets as Tenancy by the Entireties receive complete protection from one spouse's individual creditors. Most couples hold assets as 'joint tenants with right of survivorship' — which provides none of this protection. A home worth $3M, bank accounts, and investment accounts retitled as TBE are completely invisible to a single-spouse creditor. The fix is a retitling, not a structural overhaul.",
    cite:"Fla. Stat. §689.115; Beal Bank v. Almand and Associates, 780 So.2d 45 (Fla. 2001)"});

  if(F.has("INS_ONLY"))findings.push({sev:"medium",title:"Insurance-Only Strategy — The Gap Between Policy Limits and Reality",
    body:"Insurance doesn't cover intentional acts, certain professional errors, punitive damages in many jurisdictions, and verdicts above your limits. In high-liability professions, nuclear verdicts exceeding $10M occur with increasing frequency. A strategy relying entirely on insurance means one verdict above your limits reaches your personal assets with no structural barrier. As Jon Alper frames it: the goal is to make collection so costly and uncertain that a creditor settles at pennies on the dollar — not to rely on insurance to absorb the full amount.",
    cite:"Asset protection planning principle; settlement economics framework"});

  if(F.has("ADVISOR_SILO"))findings.push({sev:"medium",title:"Advisor Coordination Failure — Gassman's Most Preventable Error",
    body:"The most common catastrophic planning failures result not from bad individual advice but from advisors working in silos. Your CPA's tax strategy may contradict your estate plan. Your insurance may conflict with your entity structure. Your financial advisor may be recommending strategies that undo your structural protections. Gassman identifies advisor silo failures as appearing in nearly every complex engagement he reviews.",
    cite:"Gassman, Creditor Protection for Florida Physicians, Ch. 2 — Nine Catastrophic Errors in Protection Planning"});

  if(F.has("STALE_BENE"))findings.push({sev:"medium",title:"Beneficiary Designations Override Your Entire Estate Plan",
    body:"A beneficiary designation on a retirement account or life insurance policy passes that asset directly to the named beneficiary — outside your will, outside your trust, outside your estate plan. A 1998 designation naming a prior spouse is still legally binding today. This is a 30-minute review that eliminates a significant coordination failure.",
    cite:"Fla. Stat. §222.13 (life insurance beneficiary); Egelhoff v. Egelhoff, 532 U.S. 141 (2001) (ERISA preemption of state law)"});

  if(F.has("SUCCESSION_GAP")||F.has("INCAPACITY"))findings.push({sev:"medium",title:"Incapacity Planning Gap — Assets May Freeze When You Need Them Most",
    body:"Without a Durable Power of Attorney and named successor trustee, your assets may require court-supervised guardianship before anyone can manage them. During that period — which takes months — creditors continue collecting, business decisions cannot be made, and assets freeze. This is the death-or-incapacity scenario stress-tested in sophisticated planning and it is entirely preventable.",
    cite:"Fla. Stat. §709.2101 et seq. (Florida Power of Attorney Act); Fla. Stat. §736.0704 (successor trustee)"});

  const displayFindings = findings.slice(0,6);

  // Attack narrative
  const profLabel = {physician:"physician practice",surgeon:"surgical practice",realestate_pro:"real estate portfolio",professional:"professional practice",business:"business",w2:"personal",multiple:"business"}[answers.profession]||"assets";
  const entityLabel = {smllc:"single-member LLC",mmllc:"multi-member LLC",scorp:"S-corporation",pa:"Professional Association",ccorp:"C-corporation",multi:"multiple entities",unsure:"entity"}[answers.entity_type]||"structure";

  let atk = `As opposing counsel, my first action is a public records pull — Florida Division of Corporations, the county property appraiser, and UCC filings. `;
  if(F.has("NO_ENTITY")){atk+=`You have no entity structure. I file for a writ of execution against your personal assets immediately — there is nothing in my way. `;}
  else if(F.has("SCORP_RISK")){atk+=`Your ${entityLabel} shares are directly attachable — I move for attachment of your ${profLabel} equity in the same motion as the judgment. No charging order required. `;}
  else{atk+=`I identify your ${entityLabel} and file a charging order motion. `;
    if(F.has("COMMINGLING")||F.has("VEIL_PIERCE")){atk+=`Your bank records show commingling — I add a veil-piercing count and subpoena five years of personal and business statements simultaneously. `;}}
  if(F.has("RE_PERSONAL")){atk+=`Your investment real estate is in your name — I place a judgment lien under Fla. Stat. §55.10 and pursue forced sale. `;}
  if(F.has("GUARANTEE")||F.has("GUARANTEE_CRIT")){atk+=`I pull your personal guarantees from the UCC filings and pursue each as an independent obligation — your entity structure is irrelevant to these. `;}
  if(F.has("BADGES_FRAUD")||F.has("FT_CRITICAL")){atk+=`The recent transfers appear in the deed records. I file a fraudulent transfer action under §726.105 and move for reversal. `;}
  if(F.has("PAYROLL_TAX")){atk+=`I refer your payroll tax situation to the IRS — they can reach your homestead. You cannot stop that. `;}
  if(F.has("FOUNDING_CASE")){atk+=`Your payer concentration means one audit referral triggers the full cascade — practice collapse and personal exposure arrive simultaneously. `;}
  if(F.has("FBAR_RISK")){atk+=`I see foreign accounts in discovery. Unreported FBAR accounts give me criminal exposure leverage that changes every settlement conversation. `;}
  atk+=`This is not a hypothetical. This is the checklist a judgment creditor's attorney runs in the first 72 hours after a verdict.`;

  // Routing
  const isPhys = F.has("PHYSICIAN");
  const isOffshore = F.has("OFFSHORE_THRESHOLD") && tier>=3;
  const isComplex = isPhys||F.has("ESTATE_TAX")||F.has("LIQUIDITY_EVENT");

  let ref;
  if(isPhys||isComplex){
    ref={name:"Alan Gassman",firm:"Gassman, Denicolo & Ketron, P.A.",location:"Clearwater, FL",
      url:"https://gassmanlaw.com",phone:"(727) 442-1200",email:"agassman@gassmanpa.com",
      reason:isPhys?"Gassman is Florida's leading physician planning attorney — his practice covers practice structuring, malpractice gap analysis, payer risk, Stark Law compliance, buy-sell agreements, and personal asset protection. He has written the definitive Florida physician protection treatise and has represented hundreds of Florida physicians. He has been named Bloomberg Tax's Contributor of the Year.":"Your profile indicates a need for comprehensive planning across estate, tax, business structure, and creditor protection. Gassman's firm handles all of these in a coordinated engagement — eliminating the advisor coordination failure that creates most catastrophic planning outcomes.",
      secondary:isOffshore?{name:"Jon Alper",firm:"Alper Law",url:"https://alperlaw.com",note:"Your net worth profile also warrants a conversation about offshore planning. Jon Alper at Alper Law is one of Florida's leading offshore trust attorneys — a pure asset protection practice operating since 1991."}:null};
  } else {
    ref={name:"Jon Alper",firm:"Alper Law",location:"Lake Mary, FL — virtual consultations available",
      url:"https://www.alperlaw.com/schedule/",phone:"(407) 444-0404",email:"help@alperlaw.com",
      reason:"Alper Law is a pure asset protection practice — no generalist services, no associate hand-offs. Jon and Gideon Alper personally handle every consultation. If your structure has gaps, they will identify them with precision. If it doesn't, they will tell you that too — they regularly turn away clients who don't need them. Pure, honest, specialist counsel since 1991.",
      secondary:null};
  }

  // Intake summary
  const profMap={physician:"Physician/Practice Owner",surgeon:"Surgeon",realestate_pro:"RE Developer/Investor",professional:"Attorney/Fin. Advisor",business:"Business Owner",w2:"W-2 Employee",multiple:"Multiple"};
  const nwMap={u500:"Under $500K","500_2m":"$500K–$2M","2_5m":"$2M–$5M","5_10m":"$5M–$10M",o10m:"Over $10M"};
  const tMap={lawsuit:"Active lawsuit",threat:"Formal threat",peer:"Peer was sued",realestate:"RE purchase",wealth:"Wealth milestone",liquidity:"Business exit",divorce:"Divorce concerns",proactive:"Proactive",other:"Other"};
  const flagList=[...F].filter(f=>!["FL","TX","CA","MARRIED","TBE_POSSIBLE","ERISA","FL_HOMESTEAD","FL_INS_EXEMPT"].includes(f));
  const summary=`RISKEXPOSURES.COM — INTAKE SUMMARY\n${"─".repeat(52)}\nDate: ${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}\nRisk Tier: ${tLabel} (Score: ${score}/100)\nPlanning Window: ${uLabel}\n${F.has("ADVISOR_MODE")?"⚑ PROFESSIONAL REFERRAL — submitted by CPA/advisor\n":""}\nPROFILE\nProfession: ${profMap[answers.profession]||answers.profession||"Not specified"}\nNet Worth: ${nwMap[answers.net_worth]||"Not specified"}\nState: ${answers.state||"Not specified"}\nMarital Status: ${answers.marital||"Not specified"}\nTrigger: ${tMap[answers.trigger]||answers.trigger||"Not specified"}\n\nTOP FLAGS\n${flagList.slice(0,12).map(f=>`• ${f.replace(/_/g," ")}`).join("\n")}\n\nKEY FINDINGS (${displayFindings.length})\n${displayFindings.map((f,i)=>`${i+1}. [${f.sev.toUpperCase()}] ${f.title}`).join("\n")}\n\n${answers.notes?`ADDITIONAL NOTES FROM CLIENT\n"${answers.notes}"\n`:""}\nMATCHED SPECIALIST: ${ref.name} — ${ref.firm}\n${ref.phone} | ${ref.email}\n${ref.url}\n${"─".repeat(52)}\nFor attorney review only. Not for client distribution.`;

  return {score,tier,tColor,tLabel,urgency,uLabel,uColor,findings:displayFindings,attack:atk,ref,summary,flags:[...F]};
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function RiskExposures() {
  const [answers, setAnswers]   = useState({});
  const [idx, setIdx]           = useState(0);
  const [phase, setPhase]       = useState("intro");
  const [results, setResults]   = useState(null);
  const [email, setEmail]       = useState("");
  const [emailDone, setEmailDone] = useState(false);
  const [sliding, setSliding]   = useState(false);
  const [noteText, setNoteText] = useState("");

  const visQ = QS.filter(q=>!q.showIf||q.showIf(answers));
  const curQ = visQ[idx];
  const progress = visQ.length>0?(idx/visQ.length)*100:0;

  const advance = (newA) => {
    setSliding(true);
    setTimeout(()=>{
      const nv = QS.filter(q=>!q.showIf||q.showIf(newA));
      if(idx<nv.length-1){setIdx(i=>i+1);}
      else{const r=analyze(newA);setResults(r);setPhase("results");}
      setSliding(false);
    },170);
  };

  const handleAnswer = v => {
    const na={...answers,[curQ.id]:v};
    setAnswers(na); advance(na);
  };

  const handleTextNext = () => {
    const na={...answers,[curQ.id]:noteText||""};
    setAnswers(na); advance(na);
  };

  const reset = () => {
    setAnswers({});setIdx(0);setPhase("intro");
    setResults(null);setEmail("");setEmailDone(false);setNoteText("");
  };

  const sc = s=>s==="critical"?C.red:s==="high"?C.yellow:C.accent;
  const sb = s=>s==="critical"?C.redBg:s==="high"?C.yellowBg:C.accentBg;

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if(phase==="intro") return (
    <div className="dg-body"><style>{STYLES}</style>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem"}}>
        <div style={{maxWidth:"600px",width:"100%"}} className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"2.5rem"}}>
            <div style={{width:"32px",height:"2px",background:C.accent}}/>
            <span style={{fontSize:"0.68rem",letterSpacing:"0.2em",textTransform:"uppercase",color:C.accent}}>RiskExposures.com</span>
          </div>
          <h1 className="serif" style={{fontSize:"clamp(2.2rem,5vw,3.2rem)",fontWeight:600,lineHeight:1.12,color:C.text,marginBottom:"1.5rem"}}>
            How exposed are<br/>you, <em>really?</em>
          </h1>
          <p style={{fontSize:"1.05rem",lineHeight:1.78,color:C.textMid,marginBottom:"1rem"}}>
            Most people with significant wealth believe their structure protects them. Most are wrong about at least one critical thing — and the ones who are most confidently wrong are the most dangerous cases.
          </p>
          <p style={{fontSize:"0.95rem",lineHeight:1.75,color:C.textDim,marginBottom:"2.5rem"}}>
            This diagnostic surfaces the specific gaps in your structure — the ones a creditor's attorney finds first. Built on the same analytical framework used by Florida's leading asset protection attorneys.
          </p>
          <div style={{display:"flex",gap:"2.5rem",marginBottom:"2.5rem",flexWrap:"wrap"}}>
            {[["5–8 min","to complete"],["Free","no account needed"],["Confidential","your data stays yours"]].map(([v,l])=>(
              <div key={v}>
                <div className="serif" style={{fontSize:"1.1rem",color:C.accent}}>{v}</div>
                <div style={{fontSize:"0.7rem",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.1em"}}>{l}</div>
              </div>
            ))}
          </div>
          <button className="pri-btn" onClick={()=>setPhase("quiz")}>Begin Your Diagnostic</button>
          <p style={{fontSize:"0.72rem",color:C.textMuted,marginTop:"1.5rem",lineHeight:1.65}}>
            This tool provides a structural diagnostic, not legal advice. Results are educational and do not create an attorney-client relationship.
          </p>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if(phase==="quiz"&&curQ) return (
    <div className="dg-body"><style>{STYLES}</style>
      <div className="progress-bar"><div className="progress-fill" style={{width:`${progress}%`}}/></div>
      <div style={{padding:"1rem 2rem",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:"0.68rem",letterSpacing:"0.16em",textTransform:"uppercase",color:C.accent}}>RiskExposures.com</span>
        <span style={{fontSize:"0.75rem",color:C.textMuted}}>{idx+1} / {visQ.length}</span>
      </div>
      <div style={{minHeight:"calc(100vh - 52px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem"}}>
        <div className={sliding?"":"slide-q"} style={{maxWidth:"640px",width:"100%",opacity:sliding?0:1,transition:"opacity 0.15s"}}>
          <p style={{fontSize:"0.66rem",letterSpacing:"0.16em",textTransform:"uppercase",color:C.textMuted,marginBottom:"0.6rem"}}>{curQ.section}</p>
          <h2 className="serif" style={{fontSize:"clamp(1.2rem,3vw,1.65rem)",fontWeight:500,lineHeight:1.3,color:C.text,marginBottom:curQ.subtext?"0.75rem":"1.5rem"}}>{curQ.question}</h2>
          {curQ.subtext&&(
            <p style={{fontSize:"0.845rem",color:C.textDim,lineHeight:1.68,marginBottom:"1.5rem",borderLeft:`2px solid ${C.accentLight}`,paddingLeft:"0.875rem"}}>{curQ.subtext}</p>
          )}
          {curQ.type==="text"?(
            <div>
              <textarea className="notes-inp" placeholder="Optional — share anything relevant to your situation..." value={noteText} onChange={e=>setNoteText(e.target.value)}/>
              <div style={{marginTop:"1rem",display:"flex",gap:"0.75rem",alignItems:"center"}}>
                <button className="pri-btn" onClick={handleTextNext}>Continue →</button>
                <button onClick={handleTextNext} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:"0.82rem"}}>Skip</button>
              </div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
              {curQ.options.map(opt=>(
                <button key={opt.value} className="opt-btn" onClick={()=>handleAnswer(opt.value)}>
                  <span className="opt-dot"/><span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
          {idx>0&&<button onClick={()=>setIdx(i=>i-1)} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:"0.78rem",marginTop:"1.25rem",padding:0}}>← Back</button>}
        </div>
      </div>
    </div>
  );

  // ── RESULTS ────────────────────────────────────────────────────────────────
  if(phase==="results"&&results){
    const {score,tColor,tLabel,urgency,uLabel,uColor,findings,attack,ref,summary}=results;
    const circ=2*Math.PI*52;
    const offset=circ-(score/100)*circ;

    return (
      <div className="dg-body"><style>{STYLES}</style>

        {/* Sticky CTA */}
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,padding:"0.875rem 2rem",display:"flex",justifyContent:"center",alignItems:"center",gap:"1.5rem",zIndex:100,flexWrap:"wrap"}}>
          <span style={{fontSize:"0.83rem",color:C.textMid}}>Ready to address what we found?</span>
          <a href={ref.url} target="_blank" rel="noopener noreferrer" className="pri-btn">Speak with a Specialist →</a>
        </div>

        <div style={{maxWidth:"760px",margin:"0 auto",padding:"3rem 2rem 9rem"}}>

          {/* Header */}
          <div className="fade-up" style={{marginBottom:"2.5rem",paddingBottom:"2rem",borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.25rem"}}>
              <div style={{width:"28px",height:"2px",background:C.accent}}/>
              <span style={{fontSize:"0.66rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent}}>RiskExposures.com — Your Results</span>
            </div>
            <h1 className="serif" style={{fontSize:"clamp(1.6rem,4vw,2.4rem)",fontWeight:600,color:C.text,lineHeight:1.2}}>Your Risk Exposure Analysis</h1>
            <p style={{marginTop:"0.5rem",fontSize:"0.82rem",color:C.textDim}}>Built on the analytical framework used by Florida's leading asset protection attorneys. The findings below reflect real legal exposure, not generalized risk categories.</p>
          </div>

          {/* Score + Tier */}
          <div className="fade-up-1" style={{display:"flex",gap:"2rem",alignItems:"flex-start",marginBottom:"2.5rem",flexWrap:"wrap"}}>
            <div style={{position:"relative",flexShrink:0}}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke={C.border} strokeWidth="5"/>
                <circle cx="60" cy="60" r="52" fill="none" stroke={tColor} strokeWidth="5"
                  strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                  transform="rotate(-90 60 60)" style={{transition:"stroke-dashoffset 1.2s ease"}}/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <span className="serif" style={{fontSize:"1.9rem",fontWeight:600,color:tColor,lineHeight:1}}>{score}</span>
                <span style={{fontSize:"0.62rem",color:C.textMuted,letterSpacing:"0.08em"}}>/100</span>
              </div>
            </div>
            <div style={{flex:1,minWidth:"200px"}}>
              <div style={{fontSize:"0.66rem",letterSpacing:"0.16em",textTransform:"uppercase",color:C.textMuted,marginBottom:"0.4rem"}}>Risk Tier</div>
              <div className="serif" style={{fontSize:"1.7rem",fontWeight:600,color:tColor,marginBottom:"0.75rem"}}>{tLabel}</div>
              {/* Urgency */}
              <div style={{display:"flex",alignItems:"flex-start",gap:"0.75rem",padding:"0.875rem 1rem",background:uColor===C.green?C.greenBg:uColor===C.yellow?C.yellowBg:C.redBg,border:`1px solid ${uColor}40`,borderLeft:`3px solid ${uColor}`,borderRadius:"0 3px 3px 0"}}>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:uColor,flexShrink:0,marginTop:"3px"}}/>
                <div>
                  <span style={{fontSize:"0.67rem",letterSpacing:"0.14em",textTransform:"uppercase",color:uColor,fontWeight:500}}>Planning Window: {uLabel}</span>
                  <div style={{fontSize:"0.8rem",color:C.textMid,marginTop:"0.25rem",lineHeight:1.55}}>
                    {urgency==="closing"&&"Active litigation or a critical compliance failure is present. Most protective transfers are now presumptively fraudulent. Every day without counsel is a day opposing counsel is preparing their case."}
                    {urgency==="narrowing"&&"A triggering event or pending transaction is in your profile. The window for protective planning is still open but narrowing. Most of the gaps identified above can be addressed structurally before any creditor event occurs — after one, your options narrow significantly."}
                    {urgency==="open"&&"No active triggering events identified. This is the optimal moment for structural review — planning done proactively costs a fraction of planning done reactively, and protection put in place now seasons over time."}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settlement economics framing */}
          <div className="fade-up-2" style={{background:C.accentBg,border:`1px solid ${C.accentLight}40`,borderLeft:`3px solid ${C.accentLight}`,borderRadius:"0 3px 3px 0",padding:"1.25rem 1.5rem",marginBottom:"2.5rem"}}>
            <p style={{fontSize:"0.67rem",letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:"0.5rem"}}>What This Diagnostic Is Actually For</p>
            <p style={{fontSize:"0.875rem",color:C.textMid,lineHeight:1.72}}>
              The goal of structural planning isn't to be judgment-proof — it's to make collecting from you more expensive and uncertain than settling with you. A creditor facing a well-structured defendant has less leverage, which consistently leads to resolution at a fraction of the judgment amount. The findings below identify where your current structure gives that leverage away.
            </p>
          </div>

          {/* Attack surface */}
          <div className="fade-up-2" style={{marginBottom:"2.5rem"}}>
            <h2 className="serif" style={{fontSize:"1.25rem",fontWeight:500,color:C.text,marginBottom:"1rem",paddingBottom:"0.75rem",borderBottom:`1px solid ${C.border}`}}>Your Specific Attack Surface</h2>
            <div style={{background:C.redBg,border:`1px solid ${C.red}20`,borderLeft:`3px solid ${C.red}`,borderRadius:"0 3px 3px 0",padding:"1.25rem 1.5rem"}}>
              <p style={{fontSize:"0.66rem",letterSpacing:"0.14em",textTransform:"uppercase",color:C.red,marginBottom:"0.6rem"}}>From Opposing Counsel's Perspective</p>
              <p style={{fontSize:"0.875rem",color:C.textMid,lineHeight:1.72}}>{attack}</p>
            </div>
          </div>

          {/* Findings */}
          {findings.length>0&&(
            <div className="fade-up-3" style={{marginBottom:"2.5rem"}}>
              <h2 className="serif" style={{fontSize:"1.25rem",fontWeight:500,color:C.text,marginBottom:"1rem",paddingBottom:"0.75rem",borderBottom:`1px solid ${C.border}`}}>
                Findings — {findings.length} Issue{findings.length!==1?"s":""} Identified
              </h2>
              {findings.map((f,i)=>(
                <div key={i} style={{background:sb(f.sev),border:`1px solid ${sc(f.sev)}25`,borderLeft:`3px solid ${sc(f.sev)}`,borderRadius:"0 3px 3px 0",padding:"1.25rem 1.5rem",marginBottom:"0.75rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.5rem",flexWrap:"wrap"}}>
                    <span className="tag" style={{background:`${sc(f.sev)}18`,color:sc(f.sev)}}>{f.sev}</span>
                    {f.trap&&<span className="tag" style={{background:C.accentBg,color:C.accent}}>{f.trapLabel||"Misconception Identified"}</span>}
                  </div>
                  <h3 style={{fontSize:"0.925rem",fontWeight:500,color:C.text,marginBottom:"0.5rem"}}>{f.title}</h3>
                  <p style={{fontSize:"0.845rem",color:C.textMid,lineHeight:1.7,marginBottom:"0.5rem"}}>{f.body}</p>
                  <p style={{fontSize:"0.72rem",color:C.textMuted,fontStyle:"italic"}}>{f.cite}</p>
                </div>
              ))}
            </div>
          )}

          {/* Efficacy pyramid note */}
          <div className="fade-up-3" style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:"3px",padding:"1.25rem 1.5rem",marginBottom:"2.5rem"}}>
            <p style={{fontSize:"0.67rem",letterSpacing:"0.14em",textTransform:"uppercase",color:C.textMuted,marginBottom:"0.5rem"}}>On Structure Effectiveness</p>
            <p style={{fontSize:"0.845rem",color:C.textMid,lineHeight:1.7}}>
              Not all protective structures perform equally in court. Planning professionals distinguish between <strong>Tier 1 — Efficacy Resolved</strong> strategies (statutory exemptions courts consistently uphold: Florida homestead, ERISA retirement plans, life insurance cash value, TBE titling) and <strong>Tier 2 — Efficacy Challenged</strong> strategies that creditors actively contest (DAPTs, FLPs, offshore trusts). A plan built primarily on Efficacy Challenged structures without a Tier 1 base is a single-point-of-failure plan. Every recommendation you receive should identify which tier each strategy occupies — and what happens to your plan if that tier is defeated in court.
            </p>
          </div>

          {/* Referral */}
          <div className="fade-up-4" style={{background:C.surface,border:`1px solid ${C.borderDark}`,borderRadius:"4px",padding:"2rem",marginBottom:"2.5rem"}}>
            <p style={{fontSize:"0.67rem",letterSpacing:"0.16em",textTransform:"uppercase",color:C.accent,marginBottom:"0.6rem"}}>Matched Specialist</p>
            <h3 className="serif" style={{fontSize:"1.5rem",fontWeight:500,color:C.text,marginBottom:"0.2rem"}}>{ref.name}</h3>
            <p style={{fontSize:"0.83rem",color:C.textMuted,marginBottom:"1rem"}}>{ref.firm} · {ref.location}</p>
            <p style={{fontSize:"0.875rem",color:C.textMid,lineHeight:1.7,marginBottom:"1.5rem"}}>{ref.reason}</p>
            {ref.secondary&&(
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:"1rem",marginBottom:"1.5rem"}}>
                <p style={{fontSize:"0.845rem",color:C.textMid,lineHeight:1.65}}><strong>{ref.secondary.name}</strong> — {ref.secondary.note}</p>
              </div>
            )}
            <a href={ref.url} target="_blank" rel="noopener noreferrer" className="pri-btn">Speak with a Specialist →</a>
          </div>

          {/* Email capture */}
          <div className="fade-up-5" style={{border:`1px solid ${C.border}`,borderRadius:"4px",padding:"1.75rem 2rem",marginBottom:"2rem"}}>
            {!emailDone?(
              <>
                <h3 className="serif" style={{fontSize:"1.15rem",fontWeight:500,color:C.text,marginBottom:"0.4rem"}}>Get your full report</h3>
                <p style={{fontSize:"0.855rem",color:C.textDim,lineHeight:1.65,marginBottom:"1.25rem"}}>
                  Enter your email and we'll send your complete Risk Exposure Analysis — all findings with legal citations, your scoring breakdown, and your matched specialist's contact information.
                </p>
                <div style={{display:"flex",flexWrap:"wrap"}}>
                  <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} className="email-inp"/>
                  <button onClick={async()=>{
                    if(!email.includes("@")) return;
                    try {
                      await fetch("https://formspree.io/f/xvzwldoa", {
                        method:"POST",
                        headers:{"Content-Type":"application/json","Accept":"application/json"},
                        body: JSON.stringify({
                          email: email,
                          intake_summary: results?.summary || "",
                          score: results?.score,
                          tier: results?.tLabel,
                          planning_window: results?.uLabel,
                        })
                      });
                    } catch(e){ console.error(e); }
                    setEmailDone(true);
                  }} className="pri-btn" style={{borderRadius:"0 3px 3px 0",padding:"0 1.5rem"}}>Send Report</button>
                </div>
              </>
            ):(
              <div style={{textAlign:"center",padding:"0.5rem 0"}}>
                <div className="serif" style={{fontSize:"1.1rem",color:C.green,marginBottom:"0.4rem"}}>Report on its way.</div>
                <p style={{fontSize:"0.855rem",color:C.textDim}}>Check {email} for your complete Risk Exposure Analysis.</p>
              </div>
            )}
          </div>

          <div style={{textAlign:"center"}}>
            <button onClick={reset} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:"0.78rem"}}>Start over</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
