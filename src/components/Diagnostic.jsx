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
     {label:"Under $500K",value:"u500",nwM:0.6},
     {label:"$500K – $2M",value:"500_2m",nwM:1.0},
     {label:"$2M – $5M",value:"2_5m",nwM:1.2},
     {label:"$5M – $10M",value:"5_10m",nwM:1.4,flags:["OFFSHORE_THRESHOLD"]},
     {label:"Over $10M",value:"o10m",nwM:1.6,flags:["OFFSHORE_THRESHOLD","ESTATE_TAX"]},
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
     {label:"I'm not sure I understand the difference",value:"unsure",flags:["INSIDE","OUTSIDE"]},
   ]},
  {id:"operating_agreement",section:"Your Structure",
   question:"Do you have a current operating agreement reviewed by an attorney within the last two years?",
   subtext:"A template or outdated operating agreement is treated identically to no operating agreement when courts test entity legitimacy.",
   showIf:a=>a.entity_type==="smllc"||a.entity_type==="mmllc",
   options:[
     {label:"Yes — reviewed and updated within 2 years",value:"current",flags:[]},
     {label:"Yes — but over 2 years old",value:"stale",flags:["STALE_OA","TIME_DECAY"],gapPts:4},
     {label:"I have a downloaded template",value:"template",flags:["STALE_OA","TIME_DECAY"],gapPts:7},
     {label:"No operating agreement",value:"none",flags:["NO_OA"],gapPts:8},
     {label:"Not sure",value:"unsure",flags:["STALE_OA"],gapPts:5},
   ]},
  {id:"formalities",section:"Your Structure",
   question:"Does your entity hold annual meetings, document major decisions in writing, and maintain records separate from your personal affairs?",
   subtext:"Failure to observe corporate formalities is the primary basis courts use to pierce the veil and hold owners personally responsible for entity debts.",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Yes — fully maintained with documented minutes and resolutions",value:"yes",flags:[]},
     {label:"Mostly — some documentation but inconsistently maintained",value:"mostly",flags:["FORMALITY_GAP"],gapPts:4},
     {label:"No — no formal record-keeping",value:"no",flags:["FORMALITY_GAP","VEIL_PIERCE"],gapPts:10},
     {label:"I didn't know this was required",value:"unknown",flags:["FORMALITY_GAP","VEIL_PIERCE"],gapPts:8},
     {label:"My entity is newly formed — less than 1 year old",value:"new",flags:[]},
   ]},
  {id:"commingling",section:"Your Structure",
   question:"Do your personal and business finances ever mix?",
   subtext:"Commingling is the single most common reason entity protection collapses in court. A creditor who proves commingling doesn't need to pierce the veil — you've already done it.",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Never — completely separate with no exceptions",value:"never",flags:[]},
     {label:"Occasionally — minor items here and there",value:"occasionally",flags:["COMMINGLING"],gapPts:6},
     {label:"Regularly — not strictly separated",value:"regularly",flags:["COMMINGLING","VEIL_PIERCE"],gapPts:12},
     {label:"Not sure",value:"unsure",flags:["COMMINGLING"],gapPts:5},
   ]},
  {id:"salary_dist",section:"Your Structure",
   question:"If you own your business entity, how do you primarily pay yourself?",
   subtext:"This affects a creditor protection you may not know exists — the federal wage garnishment exemption covers authorized salary but not distributions.",
   showIf:a=>a.has_entity==="yes",
   options:[
     {label:"Authorized salary — regular documented payroll",value:"salary",flags:[]},
     {label:"Distributions or draws — no formal salary",value:"dist",flags:["SALARY_GAP"],gapPts:6},
     {label:"Mix of both",value:"mixed",flags:[]},
     {label:"Not sure how it's classified",value:"unsure",flags:["SALARY_GAP"],gapPts:4},
     {label:"I don't own the entity / I receive a W-2 only",value:"w2_only",flags:[]},
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
     {label:"Yes — under $1M",value:"low",flags:["UNDERINSURED"],gapPts:5},
     {label:"No umbrella policy",value:"none",flags:["NO_UMBRELLA"],gapPts:8},
     {label:"Not sure what I have",value:"unsure",flags:["NO_UMBRELLA"],gapPts:6},
   ]},
  {id:"ins_strategy",section:"Your Coverage",
   question:"What role does insurance play in your protection strategy?",
   options:[
     {label:"Insurance is my primary strategy — my main plan is to be well insured",value:"primary",flags:["INS_ONLY"],gapPts:6},
     {label:"Insurance plus structural protections",value:"mixed",flags:[]},
     {label:"Structural planning is primary — insurance fills gaps",value:"structural",flags:[]},
     {label:"I haven't thought about it in those terms",value:"unsure",flags:["INS_ONLY"],gapPts:4},
   ]},
  // PHYSICIAN BRANCH
  {id:"mal_type",section:"Practice Risk",
   question:"What type of malpractice insurance do you carry?",
   subtext:"Claims-made policies create an invisible gap most physicians discover only after a policy change.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Occurrence-based — covers any incident during the policy period regardless of when filed",value:"occurrence",flags:[]},
     {label:"Claims-made — with tail coverage confirmed in writing",value:"claims_tail",flags:[]},
     {label:"Claims-made — tail coverage not yet arranged",value:"claims_no_tail",flags:["TAIL_GAP"],gapPts:10},
     {label:"Not sure which type",value:"unsure",flags:["TAIL_GAP"],gapPts:7},
     {label:"No malpractice insurance",value:"none",flags:["NO_MAL"],gapPts:20},
   ]},
  {id:"carrier_rating",section:"Practice Risk",
   question:"Do you know your malpractice carrier's AM Best financial strength rating?",
   subtext:"A financially insolvent or non-state-registered carrier means your policy may be worthless at claim time. This is Gassman's Catastrophic Error #2.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Yes — A or A+ rated",value:"strong",flags:[]},
     {label:"Yes — B-rated or lower",value:"weak",flags:["CARRIER_RISK"],gapPts:10},
     {label:"I don't know my carrier's rating",value:"unknown",flags:["CARRIER_RISK"],gapPts:8},
     {label:"I use a captive or risk retention group",value:"captive",flags:["CAPTIVE"]},
   ]},
  {id:"payer_conc",section:"Practice Risk",
   question:"What percentage of your practice revenue comes from your top 2 insurance payers combined?",
   subtext:"Payer concentration is the leading cause of physician practice financial collapse in Florida — a single audit notice triggers a cascade that cannot be interrupted once it begins.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Under 30% — well diversified",value:"low",flags:[]},
     {label:"30% to 60%",value:"mid",flags:["PAYER_CONC"],gapPts:6},
     {label:"Over 60%",value:"high",flags:["PAYER_CONC","FOUNDING_CASE"],gapPts:14},
     {label:"Medicare or Medicaid is my largest payer (over 30%)",value:"govt",flags:["PAYER_CONC","GOVT_PAYER"],gapPts:10},
     {label:"Not sure",value:"unsure",flags:["PAYER_CONC"],gapPts:6},
   ]},
  {id:"billing_review",section:"Practice Risk",
   question:"When did you last have an independent billing and coding review — conducted through an attorney to preserve privilege?",
   subtext:"A billing review done outside attorney-client privilege creates documentation auditors can subpoena. The same review done through counsel is protected.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Within 12 months — through an attorney",value:"recent_priv",flags:[]},
     {label:"Within 12 months — not through an attorney",value:"recent_unpriv",flags:["BILLING_PRIV_GAP"],gapPts:5},
     {label:"1 to 3 years ago",value:"old",flags:["BILLING_GAP"],gapPts:6},
     {label:"Never or more than 3 years ago",value:"never",flags:["BILLING_GAP"],gapPts:8},
   ]},
  {id:"payroll_tax",section:"Practice Risk",
   question:"Are all payroll tax deposits for your practice fully current — no outstanding 941 obligations?",
   subtext:"The IRS Trust Fund Recovery Penalty (IRC §6672) is personal, 100%, non-dischargeable in bankruptcy, and overrides the Florida homestead. This is the one liability no structure can shield against after the fact.",
   showIf:a=>a.profession==="physician"||a.profession==="surgeon",
   options:[
     {label:"Yes — fully current, no issues",value:"current",flags:[]},
     {label:"Not fully sure — may be outstanding amounts",value:"unsure",flags:["PAYROLL_TAX"],gapPts:15},
     {label:"We have outstanding payroll tax obligations",value:"delinquent",flags:["PAYROLL_TAX","PAYROLL_CRITICAL"],gapPts:25},
   ]},
  {id:"buy_sell",section:"Practice Risk",
   question:"If you co-own your practice, do you have a funded buy-sell agreement reviewed within the last 3 years?",
   subtext:"An unfunded or outdated buy-sell can force a practice sale or valuation dispute at the worst possible time.",
   showIf:a=>(a.profession==="physician"||a.profession==="surgeon")&&(a.entity_type==="mmllc"||a.entity_type==="pa"||a.entity_type==="multi"),
   options:[
     {label:"Yes — funded and reviewed within 3 years",value:"current",flags:[]},
     {label:"Yes — but not reviewed in over 3 years",value:"stale",flags:["STALE_BS"],gapPts:6},
     {label:"No buy-sell agreement",value:"none",flags:["NO_BS"],gapPts:8},
     {label:"I am the sole owner — no co-owners",value:"sole",flags:[]},
     {label:"Not sure",value:"unsure",flags:["STALE_BS"],gapPts:5},
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
  // OFFSHORE QUALIFICATION
  {id:"active_judgment",section:"Your Exposure Level",
   question:"Do you currently have a judgment entered against you, or is litigation at a stage where a judgment is likely?",
   subtext:"A judgment changes everything about what is possible structurally. Domestic planning options narrow significantly once a judgment exists — and offshore structures become a different kind of conversation.",
   options:[
     {label:"Yes — a judgment has been entered against me",value:"yes_judgment",flags:["ACTIVE_JUDGMENT","OFFSHORE_URGENT","ACTIVE_LIT"],gapPts:25},
     {label:"Litigation is active and a judgment is a real possibility",value:"likely",flags:["OFFSHORE_POSSIBLE","ACTIVE_LIT"],gapPts:16},
     {label:"No judgment and no active litigation",value:"no",flags:[]},
   ]},
  {id:"liquid_assets",section:"Your Exposure Level",
   question:"Do you have significant liquid assets — cash, brokerage accounts, or investments — outside of real estate and retirement accounts?",
   subtext:"Liquid assets are the primary target in judgment enforcement and the primary asset class for offshore planning. Real estate and retirement accounts are addressed through different tools.",
   showIf:a=>a.net_worth==="5_10m"||a.net_worth==="o10m"||a.active_judgment==="yes_judgment"||a.active_judgment==="likely",
   options:[
     {label:"Yes — over $1M in liquid assets",value:"over1m",flags:["LIQUID_SIGNIFICANT","OFFSHORE_QUALIFIED"]},
     {label:"Yes — $500K to $1M",value:"500k_1m",flags:["LIQUID_MODERATE"]},
     {label:"Under $500K liquid — most of my wealth is in real estate or business equity",value:"under500k",flags:[]},
     {label:"Not sure",value:"unsure",flags:[]},
   ]},
  {id:"domestic_exhausted",section:"Your Exposure Level",
   question:"Have you fully maximized Florida's domestic protections — homestead, TBE titling, retirement accounts, life insurance cash value, properly structured LLCs?",
   subtext:"Offshore planning makes sense only after domestic protections are maximized. An offshore trust on top of a weak domestic structure is an expensive solution to a problem that could be solved more simply.",
   showIf:a=>a.liquid_assets==="over1m"||a.active_judgment==="yes_judgment",
   options:[
     {label:"Yes — domestic planning is fully in place and reviewed",value:"yes",flags:[]},
     {label:"Partially — some domestic protections but gaps remain",value:"partial",flags:["DOMESTIC_GAPS"]},
     {label:"No — domestic planning has not been fully addressed",value:"no",flags:["DOMESTIC_GAPS","OFFSHORE_PREMATURE"]},
     {label:"Not sure what domestic options are available",value:"unsure",flags:["DOMESTIC_GAPS"]},
   ]},
  {id:"offshore_openness",section:"Your Exposure Level",
   question:"Are you open to the concept of assets held in a trust or LLC outside the United States, under a foreign trustee, if it provided significantly stronger protection?",
   subtext:"Offshore planning is not appropriate for everyone — it requires specific financial thresholds, compliance obligations, and comfort with international structures. It is also the most powerful creditor protection tool available when the profile warrants it.",
   showIf:a=>a.liquid_assets==="over1m"||a.active_judgment==="yes_judgment",
   options:[
     {label:"Yes — I am open to offshore structures if they make sense for my situation",value:"yes",flags:["OFFSHORE_OPEN"]},
     {label:"Possibly — I want to understand the options before deciding",value:"maybe",flags:["OFFSHORE_OPEN"]},
     {label:"No — I prefer to keep everything domestic",value:"no",flags:[]},
   ]},
  {id:"creditor_type",section:"Your Exposure Level",
   question:"Is your primary concern a specific known creditor or lawsuit, or general future liability from your profession or business?",
   subtext:"The answer determines which strategies are available and which are foreclosed. Once a specific creditor exists, the fraudulent transfer analysis changes everything.",
   showIf:a=>a.offshore_openness==="yes"||a.offshore_openness==="maybe"||a.active_judgment==="yes_judgment",
   options:[
     {label:"A specific known creditor, judgment, or active lawsuit",value:"specific",flags:["SPECIFIC_CREDITOR","OFFSHORE_URGENT"]},
     {label:"General professional or business liability — no specific creditor",value:"general",flags:["GENERAL_EXPOSURE"]},
     {label:"Both — I have an active situation and ongoing future exposure",value:"both",flags:["SPECIFIC_CREDITOR","GENERAL_EXPOSURE","OFFSHORE_URGENT"]},
   ]},
  // FOREIGN
  {id:"foreign",section:"Your Assets",
   question:"Do you hold any assets, accounts, or business interests outside the United States?",
   subtext:"Foreign assets create planning opportunities and significant compliance obligations. FBAR non-compliance gives opposing counsel powerful enforcement leverage.",
   options:[
     {label:"Yes — and I am current on all FBAR and foreign reporting",value:"yes_ok",flags:["FOREIGN"]},
     {label:"Yes — but I'm not sure if reporting is fully current",value:"yes_unsure",flags:["FOREIGN","FBAR_RISK"],gapPts:8},
     {label:"No foreign assets or accounts",value:"no",flags:[]},
   ]},
  // SUCCESSION
  {id:"incapacity",section:"Continuity Planning",
   question:"If you became incapacitated tomorrow, is there a named successor trustee or durable power of attorney with legal authority to manage your assets and business?",
   subtext:"Assets frozen during incapacity while creditors continue collecting is a recurring catastrophic failure pattern.",
   options:[
     {label:"Yes — fully documented with named successor trustee and DPOA",value:"yes",flags:[]},
     {label:"Partially — some documents but not fully coordinated",value:"partial",flags:["SUCCESSION_GAP"],gapPts:4},
     {label:"No — nothing formal in place",value:"no",flags:["SUCCESSION_GAP","INCAPACITY"],gapPts:8},
     {label:"I didn't know this was a planning gap",value:"unknown",flags:["SUCCESSION_GAP","INCAPACITY"],gapPts:8},
   ]},
  {id:"beneficiaries",section:"Continuity Planning",
   question:"Have you reviewed beneficiary designations on retirement accounts and life insurance within the last 3 years?",
   subtext:"Beneficiary designations override your will, your trust, and your estate plan entirely. A 1998 designation naming a prior spouse is still legally binding today.",
   options:[
     {label:"Yes — reviewed and updated within 3 years",value:"current",flags:[]},
     {label:"Set originally but never reviewed since",value:"stale",flags:["STALE_BENE"],gapPts:4},
     {label:"Never reviewed or not sure",value:"never",flags:["STALE_BENE"],gapPts:5},
     {label:"I don't have retirement accounts or life insurance",value:"na",flags:[]},
   ]},
  {id:"advisor_coord",section:"Continuity Planning",
   question:"Do your CPA, financial advisor, and estate planning attorney actively coordinate with each other on your overall structure?",
   subtext:"The most preventable catastrophic planning errors result from advisors working in silos — your tax strategy contradicting your estate plan, your insurance conflicting with your entity structure.",
   options:[
     {label:"Yes — they communicate regularly, I have coordinated reviews",value:"yes",flags:[]},
     {label:"They know of each other but don't actively coordinate",value:"partial",flags:["ADVISOR_SILO"],gapPts:4},
     {label:"Each operates independently — no coordination",value:"no",flags:["ADVISOR_SILO"],gapPts:6},
     {label:"I don't have all three types of advisors yet",value:"missing",flags:["ADVISOR_SILO","ADVISOR_GAP"],gapPts:4},
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
     {label:"Somewhat — I have structures but haven't verified they would hold",value:"partial",flags:["UNVERIFIED"],gapPts:4},
     {label:"Not confident — I know there are gaps I haven't addressed",value:"low",flags:["UNVERIFIED","UNREVIEWED"],gapPts:6},
     {label:"I didn't know public records revealed this much",value:"unaware",flags:["UNVERIFIED","UNREVIEWED"],gapPts:8},
   ]},
  {id:"last_review",section:"The Bottom Line",
   question:"When did you last have an attorney conduct a structural review specifically for creditor exposure?",
   options:[
     {label:"Within the last year",value:"recent",flags:[]},
     {label:"1 to 3 years ago",value:"mid",flags:["STALE_REVIEW"],gapPts:2},
     {label:"Over 3 years ago",value:"old",flags:["STALE_REVIEW"],gapPts:3},
     {label:"Never",value:"never",flags:["NEVER_REVIEWED"],gapPts:4},
     {label:"I didn't know that was something people did",value:"unknown",flags:["NEVER_REVIEWED"],gapPts:4},
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

  // Net worth multiplier applies only to gap points
  const nwOpt = QS.find(q=>q.id==="net_worth")?.options.find(o=>o.value===answers.net_worth);
  const nwM = nwOpt?.nwM||1.0;
  gapPts = Math.round(gapPts * nwM);
  const score = Math.min(100, gapPts);

  // Tier
  let tier, tColor, tLabel, tDesc;
  if(score<=22){
    tier=1;tColor=C.green;tLabel="STRUCTURED";
    tDesc="Your current structure shows meaningful baseline protection across the areas we reviewed. This does not mean there are no gaps — it means the critical failures that create immediate creditor vulnerability are not present. A formal attorney review would confirm what is working and what should be monitored as your situation evolves.";
  } else if(score<=48){
    tier=2;tColor=C.yellow;tLabel="GAPS PRESENT";
    tDesc="You have real structural vulnerabilities in specific areas identified below. These gaps will not announce themselves — they surface when a creditor event forces the issue. A determined plaintiff's attorney reviewing your public records would have at least one viable legal theory to pursue your personal assets right now.";
  } else if(score<=72){
    tier=3;tColor=C.accent;tLabel="SIGNIFICANTLY EXPOSED";
    tDesc="Multiple structural vulnerabilities exist across your profile. A creditor's attorney reviewing your situation would have several independent legal theories to pursue your personal assets — and would not need all of them to succeed. The findings below identify specifically what is exposed and why. Most can be corrected before a triggering event occurs. After one, your options narrow significantly.";
  } else {
    tier=4;tColor=C.red;tLabel="CRITICAL";
    tDesc="Your current structure has critical failures across multiple dimensions. A determined creditor's attorney would find significant exposed assets through straightforward legal procedures — no exotic theories required. Some of what you've built to protect yourself may be creating additional liability. Immediate professional review is not a suggestion at this tier. It is the difference between having options and not having them.";
  }

  // Urgency
  let urgency,uLabel,uColor,uDesc;
  if(F.has("ACTIVE_LIT")||F.has("WINDOW_CLOSED")||F.has("PAYROLL_CRITICAL")||F.has("ACTIVE_JUDGMENT")){
    urgency="closing";uLabel="CLOSING";uColor=C.red;
    uDesc="Active litigation or a judgment is present. Once a lawsuit is filed, most protective asset transfers become presumptively fraudulent under Florida law. Every day without counsel is a day the opposing side is building their case. The strategies available to you today will not all be available next month.";
  } else if(F.has("FOUNDING_CASE")||F.has("BADGES_FRAUD")||F.has("LIQUIDITY_EVENT")||F.has("DIVORCE_RISK")||F.has("SPECIFIC_CREDITOR")||score>=50){
    urgency="narrowing";uLabel="NARROWING";uColor=C.yellow;
    uDesc="A triggering event, pending transaction, or specific creditor concern is in your profile. The window for proactive planning is open but the conditions that close it are already in motion. Structures put in place now season over time — the same structure put in place after a claim arises faces immediate fraudulent transfer scrutiny.";
  } else {
    urgency="open";uLabel="OPEN";uColor=C.green;
    uDesc="No active triggering events identified. This is the optimal time for structural review — planning done proactively is dramatically more effective and dramatically less expensive than planning done after a creditor event. Structures built today season over time, making them harder to challenge as the years pass.";
  }

  // Findings with personal consequence
  const findings=[];
  const nwLabel = {u500:"under $500K","500_2m":"$500K–$2M","2_5m":"$2M–$5M","5_10m":"$5M–$10M",o10m:"over $10M"}[answers.net_worth]||"your net worth";

  if(F.has("NO_ENTITY"))findings.push({sev:"critical",
    title:"No Structural Barrier Between You and Creditors",
    body:"Operating without a formal entity means every business liability is your personal liability. There is no legal separation between what you've built and what a creditor can take.",
    consequence:`With a net worth of ${nwLabel} and no entity structure, a judgment creditor can immediately levy your personal bank accounts, investment accounts, and real estate through a writ of execution. There is no procedural barrier, no charging order process, and no additional step required. Everything you own outside of Florida's statutory exemptions is directly reachable the day after a judgment is entered.`,
    cite:"Fla. Stat. §48.081; personal liability default rule"});

  if(F.has("SCORP_RISK"))findings.push({sev:"critical",
    title:"Your Entity Type Provides Zero Charging Order Protection",
    body:"S-corporation shares and Professional Association interests are directly attachable by personal creditors. A judgment creditor becomes a full shareholder with inspection, accounting, and dissolution rights — no charging order required.",
    consequence:"This means a personal judgment against you — from a car accident, a personal debt, a divorce proceeding, anything unrelated to your business — gives the creditor direct access to your business equity. They do not need to pierce any veil. They can attach your shares, become a co-owner of your practice or business, and use shareholder rights to pressure a buyout. An LLC in the same situation provides charging order protection only — a fundamentally different outcome.",
    cite:"Adkisson & Riser, Asset Protection, Ch. 17, p. 189-194; Fla. Stat. §605.0503 (charging order applies to LLCs only)",
    trap:true, trapLabel:"Structural Misconception Identified"});

  if(F.has("FL_HOMESTEAD_DESTROYED"))findings.push({sev:"critical",
    title:"Placing Your Home in an LLC Destroyed Your Homestead Protection",
    body:"Florida's constitutional homestead exemption requires ownership by a natural person. Transferring your home into an LLC eliminates this protection entirely.",
    consequence:"Florida's homestead exemption is unlimited in value — a $4M home held correctly is completely untouchable by most creditors. That same home in an LLC is a direct creditor asset subject to levy and forced sale. You took the strongest single protection available under Florida law and traded it for an entity structure that provides weaker, qualified protection. This is correctable, but it requires careful title work, a reassessment event, and addressing any period of improperly claimed homestead exemption under Fla. Stat. §196.011.",
    cite:"Art. X, §4, Fla. Const.; Fla. Stat. §196.031; Snyder v. Davis, 699 So.2d 999 (Fla. 1997)",
    trap:true, trapLabel:"Critical Misconception Identified"});

  if(F.has("REV_TRUST_MYTH"))findings.push({sev:"critical",
    title:"A Revocable Trust Provides Zero Creditor Protection",
    body:"A revocable living trust is a probate avoidance tool. Because you retain the right to revoke it, creditors treat those assets as legally yours under Fla. Stat. §736.0505(1).",
    consequence:"Every asset you've moved into your revocable trust believing it was protected is fully reachable by a judgment creditor — the same as if it were sitting in your personal name. The trust accomplishes everything it was designed to do for estate planning purposes. It accomplishes nothing for creditor protection. If your primary protective strategy relies on this trust, you currently have no effective creditor protection at all.",
    cite:"Fla. Stat. §736.0505(1); Restatement (Third) of Trusts §25",
    trap:true, trapLabel:"Dangerous Misconception Identified"});

  if(F.has("PAYROLL_TAX")||F.has("PAYROLL_CRITICAL"))findings.push({sev:"critical",
    title:"Payroll Tax Exposure — The One Liability That Reaches Your Home",
    body:"The IRS Trust Fund Recovery Penalty (IRC §6672) is personal, 100%, non-dischargeable in bankruptcy, and federal preemption overrides every Florida state exemption including the homestead.",
    consequence:"Florida's homestead exemption — unlimited in value — protects your home from virtually every creditor. The IRS is the exception. Under U.S. v. Craft, 535 U.S. 274 (2002), the IRS can force the sale of a Florida homestead to collect delinquent payroll taxes. No asset protection structure — no LLC, no trust, no exempt asset planning — provides any protection against this liability once it exists. There is no cure after the fact. The only protection is prevention, and the only prevention is current 941 compliance.",
    cite:"IRC §6672; U.S. v. Craft, 535 U.S. 274 (2002)"});

  if(F.has("COMMINGLING")||F.has("VEIL_PIERCE"))findings.push({sev:"critical",
    title:"Commingling Has Likely Already Destroyed Your Entity Protection",
    body:"Florida courts pierce the veil when personal and business finances are intermingled. Commingling essentially concedes the unity-of-interest element of the two-part test established in Dania Jai-Alai Palace v. Sykes.",
    consequence:"Once a creditor's attorney subpoenas five years of your bank records and demonstrates routine commingling, the entity that was supposed to protect your personal assets may be disregarded entirely by the court. Your personal residence, brokerage accounts, investment properties, and everything else outside of Florida's statutory exemptions becomes exposed — not because your LLC was structured incorrectly, but because it wasn't maintained as a separate legal person. The entity exists on paper but may not exist in court.",
    cite:"Dania Jai-Alai Palace v. Sykes, 450 So.2d 1114 (Fla. 1984)"});

  if(F.has("FOUNDING_CASE"))findings.push({sev:"critical",
    title:"Payer Cascade Risk — Your Practice Has a Single Trigger Point",
    body:"Payer concentration exceeding 60% in two payers creates the conditions for Gassman's Founding Case Pattern — a multi-front enforcement cascade triggered by a single audit notice.",
    consequence:"Here is how the cascade runs: A payer audit notice arrives. The payer immediately begins offsetting current payments against the alleged overpayment — your monthly revenue from that payer drops to near zero with no court order required. Fixed costs continue. If the practice cannot make payroll from remaining revenue and borrows payroll taxes, the IRS Trust Fund Recovery Penalty activates — personal, 100%, non-dischargeable, reaches your homestead. Simultaneously, any personal guarantees on practice obligations are called. The sequence cannot be interrupted after Phase 1. Structural pre-positioning must happen before the audit notice arrives — which means now.",
    cite:"Gassman, Creditor Protection for Florida Physicians (2020), Ch. 3"});

  if(F.has("BADGES_FRAUD")||F.has("FT_CRITICAL"))findings.push({sev:"critical",
    title:"Recent Transfers Are Likely Reversible by a Creditor",
    body:"Transfers made after a lawsuit was filed or threatened carry the badges of fraud that courts use to reverse them under Florida's Voidable Transactions Act.",
    consequence:"A creditor who identifies these transfers in your deed records or UCC filings can file a fraudulent transfer action under Fla. Stat. §726.105 and ask the court to void the transfer — returning the asset to your name where it is directly reachable. The 4-year lookback window is extended by the discovery rule, meaning concealed transfers extend the exposure. Assets you moved believing they were protected may be returned to your personal balance sheet by court order, leaving you with both the original liability and the legal costs of defending the transfer.",
    cite:"Fla. Stat. §726.105(1)(a); §726.110(1); 11 U.S.C. §548(a)(1)(A)"});

  if(F.has("ACTIVE_JUDGMENT"))findings.push({sev:"critical",
    title:"Judgment Entered — Domestic Transfer Options Are Closed",
    body:"Once a judgment is entered, most protective transfers of assets face immediate fraudulent transfer scrutiny. The standard 4-year lookback window is irrelevant — transfers made with a known creditor are analyzed under actual fraud theory with no time limitation in some circumstances.",
    consequence:"Your situation requires immediate counsel — not to plan, but to assess what can still be done without creating additional liability. Certain domestic strategies remain viable even post-judgment: maximizing exempt assets already in your name, restructuring compensation arrangements, and evaluating whether offshore structures are appropriate given the specific creditor and judgment amount. These options require an attorney who handles post-judgment planning, not just proactive planning. Every day of delay narrows what is available.",
    cite:"Fla. Stat. §726.105; 11 U.S.C. §548; Alper Law, post-judgment planning framework"});

  if(F.has("TAIL_GAP"))findings.push({sev:"high",
    title:"Malpractice Coverage Gap — Claims-Made Without Confirmed Tail",
    body:"A claims-made policy covers only claims filed while the policy is active. Any claim arising from a prior procedure filed after you retire, switch carriers, or close the practice is completely uninsured.",
    consequence:"A malpractice judgment arising from an uninsured gap period is a personal liability — not a practice liability. If the practice entity is defunct at that point, you personally answer for the full judgment with no insurance and no active entity to buffer the exposure. Tail coverage is not expensive relative to this risk. The cost of discovering the gap at claim time — after the coverage period has closed — is the full amount of the judgment.",
    cite:"Gassman, Creditor Protection for Florida Physicians, Ch. 2 — Catastrophic Error #3"});

  if(F.has("CARRIER_RISK"))findings.push({sev:"high",
    title:"Malpractice Carrier Financial Strength Not Confirmed",
    body:"A financially insolvent or non-state-registered carrier may be unable to pay claims when they arise. Florida requires carrier registration with the Department of Financial Services.",
    consequence:"If your carrier is insolvent at claim time, the policy is worthless regardless of coverage limits. You are personally responsible for the full judgment. Verifying AM Best rating takes five minutes. Discovering an insolvent carrier after a $3M verdict takes everything you have. Gassman identifies this as Catastrophic Error #2 specifically because it is invisible until it is too late.",
    cite:"Gassman, Creditor Protection for Florida Physicians, Ch. 2; Fla. Stat. §627.357"});

  if(F.has("FBAR_RISK"))findings.push({sev:"high",
    title:"Foreign Asset Reporting Non-Compliance Creates Criminal Leverage",
    body:"FBAR non-compliance carries civil penalties exceeding $10,000 per violation and criminal penalties up to $500,000 and 10 years imprisonment.",
    consequence:"In judgment enforcement, a creditor's attorney who discovers unreported foreign accounts through discovery does not just find an asset — they find leverage. Unreported FBAR holdings transform a negotiable settlement into a collection proceeding backed by the credible threat of federal criminal referral. Under U.S. v. Bank of Nova Scotia, U.S. courts have subpoenaed foreign bank records through domestic branches. The foreign account you believed was unreachable may become the most powerful tool in opposing counsel's hands.",
    cite:"31 U.S.C. §5314; U.S. v. Bank of Nova Scotia, 740 F.2d 817 (11th Cir. 1984)"});

  if(F.has("DAPT_SEASON"))findings.push({sev:"high",
    title:"Your Existing Trust May Still Be Inside the Federal 10-Year Lookback",
    body:"Self-settled asset protection trusts funded within the last 10 years remain inside the federal lookback window under 11 U.S.C. §548(e), regardless of state-law seasoning claims.",
    consequence:"Nevada and South Dakota market 2-year state-law lookbacks. Those are real — but completely irrelevant in federal bankruptcy, where 11 U.S.C. §548(e) governs with a 10-year window. If you funded your DAPT 4 years ago, you have 6 more years of federal exposure on that transfer. A bankruptcy trustee can reach back and reverse it. The trust you believe is protecting your assets may not be protecting them at all for federal purposes. This is the most frequently omitted disclosure in DAPT planning.",
    cite:"11 U.S.C. §548(e); In re Mortensen, 09-90036 (Bankr. D. Alaska 2011)",
    trap:true, trapLabel:"Planning Gap Identified"});

  if(F.has("GUARANTEE")||F.has("GUARANTEE_CRIT"))findings.push({sev:"high",
    title:"Personal Guarantees Bypass Your Entire Structural Defense",
    body:"A personal guarantee is an independent legal obligation. The creditor holding it pursues you directly — no veil piercing, no charging order, no equitable theory required.",
    consequence:`Your personal guarantees represent direct personal liability that exists completely outside your entity structure. If your guarantee total is in the hundreds of thousands or more, that amount is reachable against your personal assets — your home (subject to homestead), your brokerage accounts, your investment properties — regardless of how well your entities are structured. Every personal guarantee must be inventoried, quantified, and factored into your structural plan as a direct line item. It is not a business liability. It is a personal one.`,
    cite:"Restatement (Third) of Suretyship & Guaranty §1"});

  if(F.has("STARK"))findings.push({sev:"high",
    title:"Stark Law Documentation Gap — Felony Exposure, Not a Technicality",
    body:"Stark Law compensation arrangement exceptions require documentation in writing, in advance, quarterly, at fair market value. Failure is not a compliance issue — it is a potential felony.",
    consequence:"Any employee who knows about undocumented in-house referral arrangements can file a sealed qui tam complaint under the False Claims Act and receive 15–30% of the government's recovery. The complaint is investigated under seal — you will not know it exists. When the investigation concludes, you may face simultaneous civil liability under the Stark Law, criminal exposure under the Anti-Kickback Statute, and Medicare/Medicaid exclusion. Quarterly advance documentation is not paperwork. It is the only thing standing between your practice and this outcome.",
    cite:"42 U.S.C. §1395nn; 31 U.S.C. §3730(b) (qui tam)"});

  if(F.has("RE_PERSONAL"))findings.push({sev:"high",
    title:"Investment Real Estate in Your Name Is a Direct Creditor Target",
    body:"Real estate held personally is directly attachable by any judgment creditor through levy and forced sale under Fla. Stat. §56.061.",
    consequence:"Every investment property in your personal name — rental properties, commercial real estate, land — is subject to an immediate judgment lien under Fla. Stat. §55.10 the moment a judgment is entered against you anywhere. The creditor does not need to prove anything additional. The property goes on the list of attachable assets automatically. Tenant liability at the property also flows directly to your personal balance sheet with no structural barrier. Transferring investment real estate into properly structured LLCs is one of the most straightforward structural corrections available.",
    cite:"Fla. Stat. §56.061; Fla. Stat. §55.10"});

  if(F.has("TBE_UNKNOWN")||F.has("TBE_MISSED"))findings.push({sev:"medium",
    title:"Tenancy by the Entireties Protection Is Likely Unclaimed",
    body:"Florida TBE titling provides complete protection from one spouse's individual creditors. Most married couples hold assets as 'joint tenants with right of survivorship' — which provides none of this protection.",
    consequence:"If your joint bank accounts, investment accounts, and real estate are titled as JTWROS rather than TBE, they are fully reachable by a creditor with a judgment against either spouse individually. The same assets retitled as TBE become completely invisible to a single-spouse creditor — not reduced, not partially protected, completely invisible. A creditor must hold a joint judgment against both spouses to reach TBE assets. This protection is available to you right now through a retitling — not a new structure, not an attorney engagement, just a titling correction. The question is whether you've done it.",
    cite:"Fla. Stat. §689.115; Beal Bank v. Almand and Associates, 780 So.2d 45 (Fla. 2001)"});

  if(F.has("INS_ONLY"))findings.push({sev:"medium",
    title:"Insurance-Only Strategy Leaves Catastrophic Exposure Above Policy Limits",
    body:"Insurance covers what it covers. It does not cover intentional acts, certain professional errors, punitive damages in many jurisdictions, or verdicts above policy limits.",
    consequence:"In high-liability professions, nuclear verdicts — jury awards exceeding $5M or $10M — occur with increasing frequency. If your policy limit is $2M and the verdict is $8M, you personally owe $6M with no structural barrier in place. A creditor's attorney collecting on that $6M has access to every non-exempt asset you own. The purpose of structural planning is not to duplicate what insurance does — it is to exist as a second layer for the scenario where insurance is not enough. Without that layer, one verdict above your limits is a personal catastrophe.",
    cite:"Asset protection planning principle"});

  if(F.has("ADVISOR_SILO"))findings.push({sev:"medium",
    title:"Your Advisors Are Working in Silos — The Most Preventable Failure Pattern",
    body:"The most common catastrophic planning failures result not from bad individual advice but from advisors who don't know what each other is doing.",
    consequence:"Your CPA's tax strategy may be creating assets in your name that your estate plan doesn't account for. Your financial advisor may be recommending moves that undo structural protections your attorney put in place. Your insurance coverage may be duplicating or conflicting with your entity structure in ways nobody has reviewed. None of these advisors is wrong individually — they're simply not coordinated. A single coordinated review that puts all three advisors in the same conversation typically surfaces multiple gaps that have been sitting unaddressed for years.",
    cite:"Gassman, Creditor Protection for Florida Physicians, Ch. 2 — Nine Catastrophic Errors"});

  if(F.has("STALE_BENE"))findings.push({sev:"medium",
    title:"Beneficiary Designations Override Your Entire Estate Plan",
    body:"A beneficiary designation passes that asset directly to the named person — outside your will, outside your trust, outside your estate plan entirely.",
    consequence:"A retirement account with a 2003 designation naming a prior spouse still passes to that prior spouse regardless of your current will, your current trust, your current marriage, and every document your estate planning attorney drafted. This is not a hypothetical — it is a recurring fact pattern in estate administration. The fix takes 30 minutes. The cost of not fixing it can be the entire account balance passing to the wrong person, or passing to your estate and going through probate, or triggering a taxable event that proper planning would have avoided.",
    cite:"Egelhoff v. Egelhoff, 532 U.S. 141 (2001) (ERISA preemption)"});

  if(F.has("SUCCESSION_GAP")||F.has("INCAPACITY"))findings.push({sev:"medium",
    title:"Incapacity Planning Gap — Your Assets Could Freeze at the Worst Moment",
    body:"Without a Durable Power of Attorney and named successor trustee, your assets may require court-supervised guardianship before anyone can manage them on your behalf.",
    consequence:"Guardianship proceedings in Florida take months. During that period, business decisions cannot be made, investment accounts may be frozen pending court approval for transactions, and your practice or business may lose value rapidly without authorized management. Creditors continue collecting throughout. This is the scenario that turns a temporary incapacity into a permanent financial disruption. A Durable Power of Attorney and successor trustee designation costs almost nothing to put in place and eliminates the entire risk.",
    cite:"Fla. Stat. §709.2101 et seq.; Fla. Stat. §736.0704"});

  const displayFindings = findings.slice(0,6);

  // What's At Risk — asset-by-asset vulnerability list
  const entityLabel = {smllc:"single-member LLC",mmllc:"multi-member LLC",scorp:"S-corporation",pa:"Professional Association",ccorp:"C-corporation",multi:"multiple entities",unsure:"your entity"}[answers.entity_type]||"your entity";
  const atRisk = [];

  if(F.has("NO_ENTITY")){
    atRisk.push({label:"Everything you own personally",why:"With no formal entity, every business liability is your personal liability. A judgment creditor can reach your bank accounts, investments, home equity, and any other non-exempt assets without any additional legal step."});
  }
  if(F.has("SCORP_RISK")){
    atRisk.push({label:"Your business or practice equity",why:"Your "+entityLabel+" shares are directly attachable by personal creditors — no veil piercing required, no charging order process. A creditor becomes a co-owner of your business with full shareholder rights."});
  }
  if(F.has("COMMINGLING")||F.has("VEIL_PIERCE")){
    atRisk.push({label:"Personal assets despite having an entity",why:"Commingled finances give a creditor's attorney the evidence needed to pierce the veil and treat your entity as if it doesn't exist. Your personal accounts, home equity, and investments become reachable."});
  }
  if(F.has("FL_HOMESTEAD_DESTROYED")){
    atRisk.push({label:"Your home",why:"Transferring a Florida home into an LLC eliminates the unlimited homestead exemption. A property that would have been completely untouchable is now a direct creditor asset subject to forced sale."});
  }
  if(F.has("RE_PERSONAL")){
    atRisk.push({label:"Your investment real estate",why:"Every property in your personal name is subject to an immediate judgment lien the day a verdict is entered. Forced sale is the next step."});
  }
  if(F.has("GUARANTEE")||F.has("GUARANTEE_CRIT")){
    atRisk.push({label:"Personal assets behind your guarantees",why:"Every personally guaranteed obligation bypasses your entity structure entirely. A creditor pursuing your guarantee goes directly to your personal assets — home equity, investments, accounts — with no structural barrier."});
  }
  if(F.has("BADGES_FRAUD")||F.has("FT_CRITICAL")){
    atRisk.push({label:"Assets you already transferred",why:"Transfers made after litigation was filed or threatened can be reversed by court order. Assets you moved believing they were protected may be returned to your personal name and become immediately reachable."});
  }
  if(F.has("PAYROLL_TAX")){
    atRisk.push({label:"Your home — including Florida homestead",why:"The IRS Trust Fund Recovery Penalty overrides Florida's constitutional homestead exemption through federal preemption. Delinquent payroll taxes reach every asset you own, including the home no other creditor could touch."});
  }
  if(F.has("FOUNDING_CASE")){
    atRisk.push({label:"Your practice value and personal assets simultaneously",why:"Payer concentration above 60% means a single audit triggers a financial cascade across payer clawback, personal guarantees, and entity exposure at the same time. Each front accelerates the others."});
  }
  if(F.has("FBAR_RISK")){
    atRisk.push({label:"Your negotiating position in any settlement",why:"Unreported foreign accounts give opposing counsel criminal leverage — turning a financial dispute into a proceeding where the threat of federal criminal referral changes every conversation."});
  }
  if(F.has("TAIL_GAP")){
    atRisk.push({label:"Your personal assets for past medical procedures",why:"Without confirmed tail coverage, a malpractice claim filed after your policy lapses is completely uninsured. That judgment becomes a personal liability with no entity buffer and no insurance to absorb it."});
  }
  if(F.has("REV_TRUST_MYTH")){
    atRisk.push({label:"Assets you believe are protected in your trust",why:"A revocable trust provides zero creditor protection. Every asset in it is legally yours in the eyes of a creditor — the trust wrapper changes nothing."});
  }
  if(F.has("TBE_UNKNOWN")||F.has("TBE_MISSED")){
    atRisk.push({label:"Joint assets you hold with your spouse",why:"Assets titled as joint tenants rather than Tenancy by the Entireties are fully reachable by a creditor with a judgment against either spouse individually. The same assets correctly titled would be completely unreachable."});
  }

  if(atRisk.length===0){
    atRisk.push({label:"No immediate high-priority exposure identified",why:"Your current profile does not flag critical structural failures. A formal attorney review would confirm what is working and identify any gaps not surfaced by this diagnostic."});
  }

  // ─── REFERRAL ROUTING ─────────────────────────────────────────────────────
  // TO CHANGE: edit the attorney objects below
  // TO ADD A NEW ATTORNEY: add a new condition above the default
  // TO ROUTE EVERYONE TO ONE ATTORNEY: set ref = ATTORNEYS.alper or ref = ATTORNEYS.gassman for all cases
  // OFFSHORE TRIGGER: fires when OFFSHORE_URGENT or (OFFSHORE_OPEN + OFFSHORE_QUALIFIED + tier >= 3)
  const isPhys = F.has("PHYSICIAN");
  const isOffshoreUrgent = F.has("OFFSHORE_URGENT")||F.has("ACTIVE_JUDGMENT");
  const isOffshoreQualified = (F.has("OFFSHORE_OPEN")&&F.has("OFFSHORE_QUALIFIED")&&tier>=3);
  const isOffshore = isOffshoreUrgent||isOffshoreQualified;
  const isComplex = isPhys||F.has("ESTATE_TAX")||F.has("LIQUIDITY_EVENT");

  // Build profile-specific referral reason
  const activeFlags = displayFindings.map(f=>f.title);
  const flagCount = activeFlags.length;

  let ref;
  if(isOffshoreUrgent){
    // Offshore urgent — Alper primary regardless of other profile
    const offshoreReason = F.has("ACTIVE_JUDGMENT")
      ? `Your profile shows an entered judgment with significant liquid assets — the specific combination Jon Alper described as the scenario worth calling him about. Post-judgment offshore planning is the most technically complex and time-sensitive work in asset protection. Alper Law has handled this pattern specifically and repeatedly. The window for what is still possible narrows from the date of this call.`
      : `Your profile combines a specific creditor threat with liquid assets above the threshold where offshore planning becomes cost-effective. This is the client profile Alper Law is built for — not a general high-net-worth individual looking for protection, but a specific situation where domestic options alone may be insufficient.`;
    ref={name:"Jon Alper",firm:"Alper Law",
      location:"Lake Mary, FL — virtual consultations available nationwide",
      url:"https://www.alperlaw.com/schedule/",phone:"(407) 444-0404",email:"help@alperlaw.com",
      reason:offshoreReason,
      secondary: isPhys||isComplex ? {name:"Alan Gassman",firm:"Gassman, Denicolo & Ketron, P.A.",url:"https://gassmanlaw.com",note:"Given your physician/comprehensive planning profile, Alan Gassman should also be consulted for the practice and estate planning dimensions of your situation."} : null};
  } else if(isPhys||isComplex){
    const physReason = isPhys
      ? `Your profile has ${flagCount} findings, ${displayFindings.filter(f=>f.sev==="critical").length} of which are critical. The specific combination — ${activeFlags.slice(0,2).join("; ")} — maps directly to the physician practice planning work Gassman's firm is built around. He has written the definitive Florida physician protection treatise, has represented hundreds of Florida physician practice owners, and has been named Bloomberg Tax's Contributor of the Year. This is not a generalist referral. The findings in your profile are the specific problems his practice handles.`
      : `Your profile indicates a need for coordinated planning across estate, tax, business structure, and creditor protection. Gassman's firm handles all of these dimensions in a single integrated engagement — which is specifically what eliminates the advisor coordination failures that create most of the catastrophic planning outcomes we see.`;
    ref={name:"Alan Gassman",firm:"Gassman, Denicolo & Ketron, P.A.",location:"Clearwater, FL",
      url:"https://gassmanlaw.com",phone:"(727) 442-1200",email:"agassman@gassmanpa.com",
      reason:physReason,
      secondary: isOffshoreQualified ? {name:"Jon Alper",firm:"Alper Law",url:"https://alperlaw.com",note:"Your net worth profile and openness to offshore structures also warrants a conversation with Jon Alper at Alper Law — Florida's leading offshore trust attorney."} : null};
  } else {
    const alperReason = `Your profile has ${flagCount} finding${flagCount!==1?"s":""} that require a pure asset protection specialist, not a generalist. ${activeFlags.length>0?`The primary issues — ${activeFlags.slice(0,2).join("; ")} — are exactly the structural problems Alper Law has been solving since 1991.`:"Alper Law handles pure asset protection work — no estate planning, no tax, no generalist services."} Jon and Gideon Alper personally handle every consultation. If your structure has gaps, they will identify them precisely. If it doesn't, they will tell you that too — they regularly turn away clients who don't need them.`;
    ref={name:"Jon Alper",firm:"Alper Law",
      location:"Lake Mary, FL — virtual consultations available nationwide",
      url:"https://www.alperlaw.com/schedule/",phone:"(407) 444-0404",email:"help@alperlaw.com",
      reason:alperReason,
      secondary:null};
  }

  // Human-readable flag labels for intake summary
  const FLAG_LABELS = {
    "NO_ENTITY":"No formal entity — personal liability exposure",
    "SCORP_RISK":"S-corp / PA shares — no charging order protection",
    "VEIL_PIERCE":"Veil-piercing risk — commingling detected",
    "COMMINGLING":"Personal/business finances mixed",
    "FORMALITY_GAP":"Corporate formalities not maintained",
    "FL_HOMESTEAD_DESTROYED":"Home in LLC — homestead exemption destroyed",
    "FL_NO_HOMESTEAD":"Homestead exemption not filed",
    "REV_TRUST_MYTH":"Revocable trust — creditor protection misconception",
    "ACTIVE_LIT":"Active litigation or demand letter",
    "ACTIVE_JUDGMENT":"Judgment entered — planning window closing",
    "WINDOW_CLOSED":"Active litigation — protective transfers foreclosed",
    "BADGES_FRAUD":"Post-litigation transfers — fraudulent transfer risk",
    "FT_CRITICAL":"Fraudulent transfer — badges of fraud present",
    "FT_CONSTRUCTIVE":"Below-market transfers — constructive fraud risk",
    "PAYROLL_TAX":"Payroll tax delinquency — IRS Trust Fund Risk",
    "PAYROLL_CRITICAL":"Outstanding payroll taxes — critical personal liability",
    "FOUNDING_CASE":"Payer concentration — Founding Case cascade risk",
    "PAYER_CONC":"Payer concentration above safe threshold",
    "GOVT_PAYER":"Medicare/Medicaid concentration — federal audit exposure",
    "TAIL_GAP":"Claims-made policy — no confirmed tail coverage",
    "CARRIER_RISK":"Malpractice carrier financial strength unconfirmed",
    "STARK":"Stark Law compensation — undocumented quarterly",
    "BILLING_GAP":"Billing review overdue — audit exposure",
    "BILLING_PRIV_GAP":"Billing review not through counsel — no privilege",
    "GUARANTEE":"Personal guarantees — direct liability exposure",
    "GUARANTEE_CRIT":"Personal guarantees over $500K — critical exposure",
    "RE_PERSONAL":"Investment real estate in personal name",
    "RE_CONCENTRATED":"Multiple properties in single LLC",
    "FBAR_RISK":"Foreign assets — FBAR reporting compliance unconfirmed",
    "DAPT_SEASON":"Existing DAPT — still inside federal 10-year lookback",
    "TBE_UNKNOWN":"TBE titling status unconfirmed — protection may be unclaimed",
    "TBE_MISSED":"Joint assets not titled as TBE — protection unclaimed",
    "NO_UMBRELLA":"No umbrella liability policy",
    "UNDERINSURED":"Umbrella coverage below $1M",
    "INS_ONLY":"Insurance-only strategy — no structural backup",
    "ADVISOR_SILO":"Advisors not coordinated — silo failure risk",
    "ADVISOR_GAP":"Missing advisor type(s) — coverage gap",
    "SUCCESSION_GAP":"No successor trustee or DPOA in place",
    "INCAPACITY":"Incapacity planning not established",
    "STALE_BENE":"Beneficiary designations not recently reviewed",
    "STALE_OA":"Operating agreement outdated or template",
    "NO_OA":"No operating agreement",
    "TIME_DECAY":"Entity maintenance lapsed — protection degrading",
    "STALE_REVIEW":"No attorney structural review in 3+ years",
    "NEVER_REVIEWED":"No attorney structural review — ever",
    "OFFSHORE_URGENT":"Offshore planning warranted — urgent profile",
    "OFFSHORE_QUALIFIED":"Offshore planning threshold met",
    "OFFSHORE_OPEN":"Client open to offshore structures",
    "SPECIFIC_CREDITOR":"Specific known creditor — planning window narrowing",
    "LIQUIDITY_EVENT":"Business sale / liquidity event pending",
    "DIVORCE_RISK":"Divorce or relationship concern flagged",
    "LIQUID_SIGNIFICANT":"Liquid assets over $1M — offshore threshold met",
    "DOMESTIC_GAPS":"Domestic planning not fully maximized",
  };

  const skipFlags = new Set(["FL","TX","CA","MARRIED","TBE_POSSIBLE","ERISA","FL_HOMESTEAD","FL_INS_EXEMPT","HIGH_RISK","PHYSICIAN","NUCLEAR_VERDICT","INSIDE","OUTSIDE","MULTI_ENTITY","SMLLC","MMLLC","PA","FOREIGN","BLENDED","CAPTIVE","PRIOR_LIT","UNVERIFIED","UNREVIEWED","GENERAL_EXPOSURE","OFFSHORE_POSSIBLE","LIQUID_MODERATE","DOMESTIC_GAPS"]);
  const flagList = [...F].filter(f=>!skipFlags.has(f)&&FLAG_LABELS[f]).map(f=>FLAG_LABELS[f]);

  const profMap={physician:"Physician/Practice Owner",surgeon:"Surgeon",realestate_pro:"RE Developer/Investor",professional:"Attorney/Fin. Advisor",business:"Business Owner",w2:"W-2 Employee",multiple:"Multiple"};
  const nwMap={u500:"Under $500K","500_2m":"$500K–$2M","2_5m":"$2M–$5M","5_10m":"$5M–$10M",o10m:"Over $10M"};
  const tMap={lawsuit:"Active lawsuit filed",threat:"Formal threat/demand letter",peer:"Peer was sued",realestate:"RE purchase/ownership",wealth:"Wealth milestone crossed",liquidity:"Business sale/exit",divorce:"Divorce/relationship concerns",proactive:"Proactive review",other:"Other"};

  const flagLines = flagList.map(f=>"• "+f).join("\n")||"• None beyond baseline";
  const findingLines = displayFindings.map((f,i)=>(i+1)+". ["+f.sev.toUpperCase()+"] "+f.title).join("\n");
  const notesLine = answers.notes?"ADDITIONAL NOTES FROM CLIENT\n\""+answers.notes+"\"\n\n":"";
  const secondaryLine = ref.secondary?"\n\nSECONDARY: "+ref.secondary.name+" — "+ref.secondary.firm+"\n"+ref.secondary.url:"";
  const divider = "─".repeat(54);
  const judgmentLine = F.has("ACTIVE_JUDGMENT")?"⚠ JUDGMENT ENTERED — POST-JUDGMENT PROFILE\n":"";
  const offshoreLine = (F.has("OFFSHORE_URGENT")||F.has("OFFSHORE_QUALIFIED"))?"★ OFFSHORE PLANNING INDICATORS PRESENT\n":"";
  const advisorLine = F.has("ADVISOR_MODE")?"⚑ PROFESSIONAL REFERRAL — submitted by CPA/advisor\n":"";
  const dateStr = new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
  const profStr = profMap[answers.profession]||answers.profession||"Not specified";
  const nwStr = nwMap[answers.net_worth]||"Not specified";
  const stateStr = answers.state?.toUpperCase()||"Not specified";
  const maritalStr = answers.marital||"Not specified";
  const triggerStr = tMap[answers.trigger]||answers.trigger||"Not specified";
  const summary = [
    "RISKEXPOSURES.COM — INTAKE SUMMARY",
    divider,
    "Date: "+dateStr,
    "Risk Tier: "+tLabel+" (Score: "+score+"/100)",
    "Planning Window: "+uLabel,
    advisorLine,
    "PROFILE",
    "Profession:    "+profStr,
    "Net Worth:     "+nwStr,
    "State:         "+stateStr,
    "Marital:       "+maritalStr,
    "Trigger:       "+triggerStr,
    judgmentLine+offshoreLine,
    "FLAGS FIRED ("+flagList.length+")",
    flagLines,
    "",
    "KEY FINDINGS ("+displayFindings.length+")",
    findingLines,
    "",
    notesLine+"MATCHED SPECIALIST: "+ref.name+" — "+ref.firm,
    ref.phone+" | "+ref.email,
    ref.url+secondaryLine,
    divider,
    "For attorney review only. Not for client distribution."
  ].join("\n");


  return {score,tier,tColor,tLabel,tDesc,urgency,uLabel,uColor,uDesc,findings:displayFindings,atRisk,ref,summary,flags:[...F]};
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
            This diagnostic exposes the specific gaps in your structure — the vulnerabilities a creditor's attorney identifies before you even know there's a problem. Built on the same analytical framework used by Florida's leading asset protection attorneys.
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
    const {score,tColor,tLabel,tDesc,urgency,uLabel,uColor,uDesc,findings,atRisk,ref,summary}=results;
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
              <div className="serif" style={{fontSize:"1.7rem",fontWeight:600,color:tColor,marginBottom:"0.5rem"}}>{tLabel}</div>
              <p style={{fontSize:"0.845rem",color:C.textMid,lineHeight:1.65,marginBottom:"0.75rem"}}>{tDesc}</p>
              {/* Urgency */}
              <div style={{display:"flex",alignItems:"flex-start",gap:"0.75rem",padding:"0.875rem 1rem",background:uColor===C.green?C.greenBg:uColor===C.yellow?C.yellowBg:C.redBg,border:`1px solid ${uColor}40`,borderLeft:`3px solid ${uColor}`,borderRadius:"0 3px 3px 0"}}>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:uColor,flexShrink:0,marginTop:"3px"}}/>
                <div>
                  <span style={{fontSize:"0.67rem",letterSpacing:"0.14em",textTransform:"uppercase",color:uColor,fontWeight:500}}>Planning Window: {uLabel}</span>
                  <div style={{fontSize:"0.8rem",color:C.textMid,marginTop:"0.25rem",lineHeight:1.55}}>{uDesc}</div>
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

          {/* What's At Risk */}
          <div className="fade-up-2" style={{marginBottom:"2.5rem"}}>
            <h2 className="serif" style={{fontSize:"1.25rem",fontWeight:500,color:C.text,marginBottom:"0.5rem",paddingBottom:"0.75rem",borderBottom:`1px solid ${C.border}`}}>What's At Risk</h2>
            <p style={{fontSize:"0.82rem",color:C.textDim,marginBottom:"1.25rem"}}>Based on your answers, here is what is structurally vulnerable in your current situation — and why.</p>
            {atRisk.map((item,i)=>(
              <div key={i} style={{display:"flex",gap:"1rem",padding:"1rem 0",borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:C.red,flexShrink:0,marginTop:"5px"}}/>
                <div>
                  <div style={{fontSize:"0.9rem",fontWeight:500,color:C.text,marginBottom:"0.3rem"}}>{item.label}</div>
                  <div style={{fontSize:"0.845rem",color:C.textMid,lineHeight:1.65}}>{item.why}</div>
                </div>
              </div>
            ))}
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
                  <p style={{fontSize:"0.845rem",color:C.textMid,lineHeight:1.7,marginBottom:"0.6rem"}}>{f.body}</p>
                  {f.consequence&&(
                    <div style={{borderTop:`1px solid ${sc(f.sev)}20`,paddingTop:"0.6rem",marginTop:"0.2rem",marginBottom:"0.5rem"}}>
                      <p style={{fontSize:"0.67rem",letterSpacing:"0.12em",textTransform:"uppercase",color:sc(f.sev),marginBottom:"0.3rem"}}>What This Means For You</p>
                      <p style={{fontSize:"0.835rem",color:C.textMid,lineHeight:1.7}}>{f.consequence}</p>
                    </div>
                  )}
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
