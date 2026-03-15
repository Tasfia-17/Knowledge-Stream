import { Article, Interest } from "@/context/AppContext";

export const DEMO_ARTICLES: Article[] = [
  {
    id: "demo-1",
    title: "The Rise of Artificial General Intelligence: What Experts Are Saying",
    source: "MIT Technology Review",
    category: "AI" as Interest,
    readingTime: 8,
    wordCount: 2100,
    addedAt: Date.now() - 3600000,
    isRead: false,
    url: "https://example.com",
    content: `Artificial General Intelligence (AGI) has long been the holy grail of AI research — a system capable of performing any intellectual task that a human can do. Recent breakthroughs in large language models have reignited debate about how close we are to achieving this milestone.

Leading researchers at major AI labs are now suggesting that AGI could arrive within the next decade, a timeline that would have seemed wildly optimistic just five years ago. The rapid progression from GPT-3 to GPT-4 to increasingly capable multimodal models has demonstrated an acceleration that few predicted.

Sam Altman of OpenAI has been notably candid about his belief that AGI may be approaching sooner than society is prepared for. He has called for proactive governance and safety research to ensure that the transition is managed responsibly. Anthropic, DeepMind, and other frontier labs echo similar sentiments, investing heavily in alignment research.

The technical debate centers on whether current architectures can scale to AGI, or whether fundamentally new approaches are needed. Some researchers argue that transformer-based models, despite their impressive capabilities, lack the kind of causal reasoning and world modeling that true general intelligence would require. Others point to the emergent capabilities that arise with scale as evidence that we may already be on the right path.

The economic implications are staggering. McKinsey estimates that AGI could add $13 trillion to global economic output by 2030. However, this potential windfall comes with enormous disruption risks, particularly for knowledge workers whose jobs may be fully automated.

Governments worldwide are scrambling to establish regulatory frameworks. The EU AI Act represents the most comprehensive attempt to date, establishing risk tiers and compliance requirements. The United States has moved more cautiously, relying primarily on voluntary commitments from major labs.

Perhaps most crucially, the question of AGI safety looms large. The alignment problem — ensuring that a superintelligent system pursues goals aligned with human values — remains unsolved. Researchers at organizations like MIRI, ARC, and within the major labs are working urgently on this challenge, knowing that the stakes could not be higher.

What is clear is that the pace of AI development shows no signs of slowing. Whether AGI arrives in five years or fifty, the transformations it will bring will reshape virtually every aspect of human civilization. The time to prepare is now.`,
    summaryOneSentence: "AI researchers predict AGI could arrive within a decade, with massive economic and safety implications that require urgent preparation.",
    summary30s: "Leading AI labs now believe Artificial General Intelligence — systems matching human-level reasoning across all domains — may arrive within 10 years. Recent model scaling has accelerated progress beyond expectations. While the economic upside could reach $13 trillion globally, alignment safety remains unsolved, prompting urgent regulatory action worldwide.",
    summary2min: "The artificial general intelligence debate has shifted from 'if' to 'when', with major labs now openly discussing sub-decade timelines. Large language models have surprised even experts with emergent capabilities, and the trajectory from GPT-3 to current frontier models suggests exponential rather than linear progress.\n\nTechnically, the field is divided: some believe transformer scaling will reach AGI; others argue fundamentally new architectures are needed for causal reasoning. Both camps agree that the pace of capability growth has outstripped alignment research.\n\nEconomically, the McKinsey projection of $13 trillion added GDP by 2030 masks enormous distributional concerns. Knowledge workers face the highest displacement risk. Governments from Brussels to Washington are rushing to establish governance frameworks, though progress is uneven.\n\nThe safety dimension is most urgent. The alignment problem — how to ensure a system far smarter than humans pursues beneficial goals — remains open. Organizations like Anthropic, DeepMind Safety, and ARC are racing against the capability curve. The decisions made in the next few years will likely determine the trajectory for decades.",
    insights: [
      "AGI timelines have compressed dramatically — from 50+ years to potentially under 10 years in just half a decade",
      "The emergent capabilities of LLMs at scale have surprised even their creators, suggesting progress may be faster than predicted",
      "The alignment problem remains unsolved, creating a dangerous gap between capability and safety research",
      "Economic projections of $13 trillion added GDP may be optimistic and mask severe disruption for knowledge workers",
      "No country has established comprehensive AGI governance — regulatory frameworks are racing behind the technology",
    ],
    whyMatters: "AGI would be the most transformative technology in human history, fundamentally altering work, warfare, scientific discovery, and governance. Understanding the timeline and risks now allows individuals, businesses, and policymakers to prepare rather than react.",
  },
  {
    id: "demo-2",
    title: "Y Combinator's W24 Batch: The Startups Building Tomorrow",
    source: "TechCrunch",
    category: "Startups" as Interest,
    readingTime: 5,
    wordCount: 1350,
    addedAt: Date.now() - 7200000,
    isRead: false,
    url: "https://example.com",
    content: `Y Combinator's Winter 2024 batch has wrapped up, and the cohort offers a revealing window into where the most ambitious founders are placing their bets. With AI infrastructure, healthcare automation, and climate tech dominating the lineup, this batch signals a maturation in how founders are thinking about building durable companies.

Unlike the previous generation of YC companies that often targeted consumer apps and marketplaces, W24 skews heavily toward deep tech and vertical SaaS. Roughly 60% of companies have some AI component — but notably, most are building AI-powered tools for specific industries rather than horizontal AI platforms.

Healthcare stands out as a particularly hot sector. Multiple W24 companies are tackling prior authorization, medical coding, and clinical documentation — unsexy problems that represent enormous friction in the US healthcare system. The founders in these companies often have clinical or health system backgrounds, suggesting a sophistication that earlier healthcare tech waves lacked.

Climate tech continues its multi-year run as a YC priority. Companies in this space range from carbon accounting software to novel materials startups and grid optimization tools. The sophistication of the climate plays has increased substantially — founders are now building at the infrastructure layer rather than consumer-facing apps.

Defense tech is perhaps the most striking new entrant. Several W24 companies are explicitly targeting US government and defense contracts, a domain that would have been culturally taboo in Silicon Valley just a few years ago. The Ukraine conflict and heightened geopolitical tensions have accelerated this shift.

The median W24 team size is smaller than previous batches — often just two technical founders. This reflects both the lower startup costs enabled by AI tooling and YC's continued preference for lean, fast-moving teams.

Fundraising conditions remain challenging compared to 2021 peaks, but W24 companies are reportedly seeing strong demo day interest from a core group of active investors. Tiger Global and SoftBank, once omnipresent, are largely absent. The new active investors include several sector-specific funds that have emerged to fill the generalist void.`,
    summaryOneSentence: "YC's W24 batch reveals a shift toward deep tech and vertical AI with healthcare, climate, and defense emerging as dominant sectors.",
    summary30s: "Y Combinator's Winter 2024 cohort is dominated by vertical AI tools, healthcare automation, and climate tech — a significant departure from consumer apps. Defense tech has emerged as a culturally accepted sector for the first time. Lean two-person technical teams leveraging AI tooling are the norm, amid tighter but targeted fundraising conditions.",
    summary2min: "The W24 YC batch marks a clear maturation in startup building philosophy. Where previous cohorts chased large consumer markets with thin margins, W24 founders are targeting high-value, complex problems in regulated industries.\n\nHealthcare automation represents the biggest opportunity cluster. Prior authorization alone costs the US healthcare system an estimated $35 billion annually. W24 companies attacking this with AI-powered automation have a clear ROI story that resonates with both health systems and investors.\n\nClimate tech's evolution is instructive. Early climate startups often built B2C apps with limited impact. W24 climate companies are building grid software, industrial process optimization, and materials science tools — the infrastructure layer that actually moves the needle on emissions.\n\nThe defense tech shift is culturally significant. The tech-military relationship has been strained since the Google Project Maven controversy. W24's defense startups suggest a generational shift, with younger founders viewing national security as a legitimate and urgent problem to solve.\n\nFor investors, the bar to lead a Series A has risen. The generalist mega-funds that dominated 2021 are largely inactive. Successful W24 fundraises are going to sector specialists who can add value beyond capital.",
    insights: [
      "60% of W24 companies have AI components, but most target vertical industries rather than horizontal AI platforms",
      "Healthcare prior authorization represents $35B in annual friction — a clear AI automation opportunity",
      "Defense tech has become culturally acceptable for Silicon Valley founders, reversing a post-Google Maven taboo",
      "Two-person technical founding teams are the new YC norm, enabled by AI coding and productivity tools",
      "Sector-specialist VCs are filling the void left by generalist mega-funds in post-peak startup funding",
    ],
    whyMatters: "YC cohorts have historically predicted technology trends 2-5 years in advance. Understanding where top founders are building helps anticipate which sectors will see the most innovation and investment in coming years.",
  },
  {
    id: "demo-3",
    title: "The Fed's Rate Decision and What It Means for Your Portfolio",
    source: "Wall Street Journal",
    category: "Finance" as Interest,
    readingTime: 6,
    wordCount: 1600,
    addedAt: Date.now() - 10800000,
    isRead: true,
    url: "https://example.com",
    content: `The Federal Reserve's latest rate decision has sent ripples through financial markets, with investors recalibrating their expectations for the path of monetary policy through the rest of the year. The central bank held rates steady at its most recent meeting while signaling that the number of anticipated cuts this year may be fewer than previously projected.

For ordinary investors, the implications are multifaceted and depend heavily on portfolio composition, time horizon, and risk tolerance. Understanding the transmission mechanisms through which Fed policy affects various asset classes is essential for making informed decisions.

Bond markets have been the most immediate responder. The yield curve, which had briefly flattened, has resumed a more normal slope as markets price in a "higher for longer" rate environment. For bond investors, this means existing holdings with long duration will continue to face mark-to-market losses, while new bond purchases at current yields offer attractive income relative to recent history.

Equity markets have shown more resilience than many predicted during the rate hiking cycle. The S&P 500 has reached new all-time highs despite the highest rates in 15 years. This reflects the dominance of mega-cap technology companies with strong balance sheets and pricing power — precisely the companies least affected by high borrowing costs. Small and mid-cap stocks, which rely more heavily on debt financing, have underperformed substantially.

Real estate presents the most complex picture. Residential real estate remains frozen by a "lock-in" effect — homeowners with 3% mortgages have no incentive to sell and finance a new purchase at 7%. Commercial real estate, particularly office space, faces a reckoning as refinancing at current rates is often uneconomical for properties with declining occupancy.

For individuals with significant cash holdings or short-term bonds, the current environment is unusually favorable. Money market funds and Treasuries are offering yields unseen since the early 2000s. The opportunity cost of holding cash has virtually disappeared compared to the near-zero rate era.

The Fed's credibility is also on the line. Having badly misjudged inflation as "transitory" in 2021, policymakers are now arguably over-correcting by being too hawkish for too long. The lag effects of monetary policy mean that rate changes implemented 18 months ago are still working through the system.`,
    summaryOneSentence: "The Fed holding rates higher for longer creates divergent impacts across asset classes — bonds face pressure while cash yields become attractive.",
    summary30s: "The Federal Reserve's \"higher for longer\" rate posture is reshaping investment landscapes. Bonds face duration pressure, equities show bifurcated performance between mega-cap and small-cap, and real estate is locked in a frozen market. Meanwhile, cash and short-term treasuries are offering their best yields in 20 years, making conservative positioning more attractive than in recent memory.",
    summary2min: "The Fed's rate posture has created one of the most complex portfolio environments in recent memory. The divergence between asset classes has rarely been wider, requiring investors to think carefully about positioning.\n\nThe most counterintuitive development is equity market strength despite high rates. The S&P 500 at all-time highs reflects the extreme concentration in mega-cap tech. The equal-weighted S&P tells a different story — most stocks have significantly underperformed. This bifurcation is unsustainable long-term.\n\nThe bond opportunity is real but misunderstood. Many retail investors fled bonds in 2022 as rates rose and prices fell. At current yields, the math has shifted. A 10-year Treasury at 4.5% provides inflation-beating returns for most historical inflation scenarios — something that seemed impossible three years ago.\n\nReal estate may be the most consequential long-term effect. Housing affordability is at historic lows, combining high home prices with high mortgage rates. This is creating political pressure that will eventually result in policy responses — either through monetary easing or housing supply reform.\n\nThe key question for investors: how long can higher rates persist? Labor market strength and sticky services inflation suggest the Fed cannot cut as aggressively as markets hoped. Positioning for a \"soft landing\" scenario means balanced allocations across asset classes rather than concentrated bets.",
    insights: [
      "S&P 500 strength masks extreme concentration — equal-weighted index tells a more bearish story",
      "Money market funds and short treasuries now offer yields not seen since early 2000s — cash is no longer trash",
      "Real estate lock-in effect: 30M+ homeowners with sub-4% mortgages won't sell, freezing housing supply",
      "Fed rate policy lags 12-18 months — the full effect of 2023 hikes is still working through the economy",
      "Small-cap stocks offer the highest potential upside if rates normalize — and highest downside if they don't",
    ],
    whyMatters: "Monetary policy is the most powerful force in financial markets. Understanding how rate decisions ripple through bonds, equities, and real estate helps individuals make better portfolio decisions at every wealth level.",
  },
  {
    id: "demo-4",
    title: "CRISPR's Next Frontier: Editing the Epigenome",
    source: "Nature",
    category: "Science" as Interest,
    readingTime: 7,
    wordCount: 1850,
    addedAt: Date.now() - 14400000,
    isRead: false,
    url: "https://example.com",
    content: `The first generation of CRISPR therapies has proven that gene editing can be therapeutic, with Casgevy — the first approved CRISPR treatment — offering potential cures for sickle cell disease and beta thalassemia. But researchers are already looking beyond editing the DNA sequence itself to an even more subtle and potentially powerful frontier: the epigenome.

The epigenome consists of chemical modifications to DNA and the proteins around which DNA is wrapped. Unlike the genome itself, these modifications are reversible and change throughout life in response to environment, aging, and disease. Crucially, epigenetic changes can alter gene expression without changing the underlying DNA sequence — a distinction with profound therapeutic implications.

Tools like CRISPRoff, developed at the Salk Institute, can silence genes without cutting DNA at all, by deploying epigenetic modifications that are heritable through cell division. This approach eliminates some of the most serious risks of traditional CRISPR editing — off-target cuts that can potentially cause cancer. CRISPRon offers the inverse: activating silenced genes by removing repressive epigenetic marks.

The therapeutic applications span an enormous range. In oncology, many cancers are driven not by genetic mutations but by aberrant epigenetic programs that silence tumor suppressors or activate oncogenes. Epigenetic editing could theoretically reprogram cancer cells without the toxicity of current chemotherapy regimens.

Neurological diseases represent another compelling frontier. Many psychiatric and neurodegenerative conditions have epigenetic underpinnings — depression, for instance, is associated with specific methylation patterns in stress-response genes. While the brain is technically challenging to reach, intrathecal delivery methods are advancing rapidly.

Perhaps most intriguingly, epigenetic reprogramming could address aging itself. The Yamanaka factors that earned Shinya Yamanaka a Nobel Prize are epigenetic reprogrammers. Companies like Altos Labs and Calico are investing hundreds of millions in understanding how to safely partially reprogram aging cells to a more youthful epigenetic state.

The field faces significant challenges. Epigenetic editing specificity — targeting the right cells with the right modifications — remains difficult. Delivery of editing machinery to relevant tissues outside the liver (which is easy to reach with lipid nanoparticles) is a persistent challenge. And the long-term effects of epigenetic modifications are not yet well characterized.

Despite these hurdles, the epigenetic editing field has attracted extraordinary investment and talent. A new generation of biotechs including Epic Bio, Tune Therapeutics, and Navega Therapeutics are building platforms specifically around epigenetic editing. The next decade may see the full flowering of this approach into approved therapies.`,
    summaryOneSentence: "Epigenetic editing tools like CRISPRoff can silence or activate genes without cutting DNA, opening new frontiers in cancer, neurological disease, and even aging research.",
    summary30s: "Beyond traditional gene editing, scientists are now targeting the epigenome — reversible chemical modifications that control gene expression without altering DNA itself. CRISPRoff and similar tools can silence genes without the cancer risks of DNA cuts. Applications range from reprogramming tumor cells to potentially reversing epigenetic aging, with billions flowing into the space from investors and major biotech labs.",
    summary2min: "Epigenetic editing represents a paradigm shift in the gene therapy field, moving from irreversible DNA cutting to reversible, programmable control of gene expression. This distinction matters enormously for both safety and therapeutic scope.\n\nThe safety profile of epigenetic editing is fundamentally different from traditional CRISPR. By avoiding double-strand DNA breaks, CRISPRoff and similar tools eliminate the primary mechanism of off-target mutagenesis — the main barrier to broad clinical adoption of gene editing. This could unlock applications in healthy individuals, not just those with severe genetic diseases.\n\nThe cancer applications are particularly exciting. Most cancers are not simply genetic diseases — they are failures of gene regulation. Epigenetic reprogramming of tumor suppressor genes that have been silenced could complement or replace toxic chemotherapy. Early preclinical work shows promise, though clinical translation remains years away.\n\nThe aging angle may be the most transformative long-term. The discovery that aging has an epigenetic component — that cells essentially \"forget\" their youthful programming — suggests that partial epigenetic reprogramming could be a general anti-aging intervention. Companies like Altos Labs have raised over $3 billion specifically to pursue this thesis.\n\nKey challenges: tissue specificity, delivery beyond the liver, and long-term safety monitoring. These are solvable engineering problems, but they will take a decade or more to address fully. Investors and researchers entering now are making a long-term bet on transformative outcomes.",
    insights: [
      "Epigenetic editing avoids DNA double-strand breaks, eliminating the main cancer risk of traditional CRISPR therapies",
      "Many cancers are driven by epigenetic silencing of tumor suppressors — potentially reversible without chemotherapy",
      "CRISPRoff modifications are heritable through cell division, meaning a single treatment could have permanent effects",
      "The aging epigenome is being targeted by companies like Altos Labs, which has raised over $3B on this thesis",
      "Delivery outside the liver remains the primary technical barrier to broad epigenetic therapy applications",
    ],
    whyMatters: "Epigenetic editing could enable treatments for diseases previously considered untreatable — including common cancers, psychiatric conditions, and potentially aging itself — while offering a safer profile than first-generation gene editing approaches.",
  },
  {
    id: "demo-5",
    title: "The Deep Work Paradox: Why Productivity Culture Is Failing Us",
    source: "Harvard Business Review",
    category: "Productivity" as Interest,
    readingTime: 5,
    wordCount: 1300,
    addedAt: Date.now() - 18000000,
    isRead: false,
    url: "https://example.com",
    content: `Cal Newport coined the term "deep work" to describe the state of distraction-free concentration that produces our most cognitively demanding output. The concept resonated so powerfully that it spawned an entire genre of productivity literature, apps, and corporate programs. Yet despite the proliferation of these tools and frameworks, most knowledge workers report feeling more distracted, fragmented, and overwhelmed than ever.

The paradox cuts deep: at the precise moment when we have more knowledge about effective cognitive work, we seem to be doing less of it. What explains this gap between knowledge and practice?

The answer lies in a fundamental misunderstanding of where the problem originates. Most productivity frameworks treat distraction as a personal failing — an individual's inability to resist the siren call of notifications and social media. The solutions they prescribe are correspondingly personal: digital detoxes, phone-free hours, meditation apps.

But the structural sources of fragmented work are rarely addressed. Open office plans, always-on communication cultures, and collaboration tools that create an expectation of immediate responsiveness are organizational choices that fractures the workday into small, reactive chunks. These choices are typically made by leaders who would intellectually endorse deep work while operationally making it impossible.

The measurement problem is equally important. Most organizations measure visible activity — meeting attendance, email response time, Slack presence — rather than actual output quality. This creates systematic pressure to optimize for legibility over substance. Being seen to work crowds out actually working.

Economic incentives further entrench shallow work patterns. Open offices reduce real estate costs. Synchronous collaboration tools enable tighter management control. Rapid responsiveness cultures create a sense of organizational dynamism that impresses clients even if it exhausts employees.

Real change requires organizational rather than individual transformation. Companies like Basecamp have famously eliminated most internal meetings and async communication. GitLab operates 1,300 employees across 65 countries with virtually no synchronous communication. The evidence from these cases is that deep work cultures can be built — but they require leadership commitment that goes far beyond offering employees "focus time" blocks.

The individual is not powerless. Negotiating explicit deep work time, becoming technically irreplaceable in ways that create autonomy, and choosing employers who value output over presence are all viable strategies. But they require recognizing that the productivity problem is primarily structural, not personal.`,
    summaryOneSentence: "Productivity culture fails because distraction is structural and organizational, not a personal failing that individual tools can fix.",
    summary30s: "Despite decades of productivity research and a booming industry of focus tools, knowledge workers are more distracted than ever. The reason: open offices, always-on communication expectations, and management cultures that reward visible busyness over actual output are organizational choices that make deep work structurally impossible. Individual tools cannot fix institutional problems — only leadership transformation can.",
    summary2min: "The deep work paradox is a case study in how good ideas fail in implementation. Newport's research on focused work is sound — the evidence that distraction-free periods produce superior cognitive output is robust. The failure is in the system into which these ideas are deployed.\n\nThe measurement problem is central. What gets measured gets managed, and most organizations measure inputs (time, meetings attended, messages sent) rather than outputs (quality of decisions, depth of analysis, innovation rate). This creates a perverse incentive structure where appearing busy is rational even when it undermines actual productivity.\n\nOpen offices deserve particular scrutiny. Originally justified as collaboration enablers, a decade of research shows they primarily increase distractions and illness while reducing collaboration quality. Yet they persist because they are cheap and create the visual appearance of a dynamic, bustling organization.\n\nThe async-first companies represent proof points that alternatives are viable. Basecamp, GitLab, and others have demonstrated that eliminating meetings and synchronous communication requirements doesn't reduce collaboration quality — it improves it by forcing more careful, written thinking.\n\nFor individuals navigating traditional organizations, the key insight is that productivity optimization is primarily a negotiation problem, not a personal discipline problem. The most effective knowledge workers aren't those with the best focus techniques — they're those who have successfully negotiated working conditions that allow sustained concentration. This requires either organizational power or becoming technically irreplaceable enough to demand autonomy.",
    insights: [
      "Most organizations measure visible activity (meetings, Slack presence) rather than output quality, systematically rewarding shallow work",
      "Open offices reduce collaboration quality while increasing distraction — the opposite of their intended purpose",
      "Async-first companies like GitLab (1,300 employees, 65 countries) prove deep work cultures scale globally without synchronous communication",
      "The real productivity optimization is negotiating working conditions, not personal focus techniques",
      "Leadership teams that endorse deep work while creating always-on cultures are the primary obstacle to organizational change",
    ],
    whyMatters: "Knowledge work productivity is the primary economic lever for individuals and organizations in the modern economy. Understanding why current approaches fail — and what actually works — has immediate impact on career effectiveness and organizational performance.",
  },
];

export const DAILY_BRIEFING_ARTICLES = DEMO_ARTICLES.slice(0, 5);
