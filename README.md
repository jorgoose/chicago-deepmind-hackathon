# Chicago DeepMind Hackathon

## Project Idea 1: Home Base Chicago

**Your AI-powered housing guide — built for everyday Chicagoans.**

Legal aid and a housing counselor in your pocket, free, for every Chicagoan.

---

### The Problem

Chicago has a housing crisis, but the people most affected by it — renters, first-time buyers, people facing eviction, families looking for assistance — are the least equipped to navigate the system. The information exists, but it's buried in:

- Dense legal text (Chicago's RLTO is 30+ pages of legalese)
- Government websites with broken links and outdated PDFs
- Program applications that require you to already know the program exists
- 3-hour zoning meetings where decisions are made without community awareness
- Phone lines that go to voicemail

**The result:** People don't know their rights. They don't know what help is available. They don't know what's being built on their block. And the housing crisis gets worse because everyday people are shut out of the process.

---

### The Vision

A simple, conversational tool where any Chicagoan can ask housing questions in plain language and get **actually useful, Chicago-specific, personalized answers** — not generic articles, not phone trees, not "consult a lawyer."

This is a grassroots tool. It's not for developers or investors. It's for:

- The renter whose landlord won't fix the heat
- The single mom trying to find an apartment she can afford
- The family behind on rent who doesn't know help exists
- The first-generation homebuyer who doesn't know where to start
- The longtime homeowner who doesn't know they qualify for property tax relief
- The neighbor who just wants to know what that construction project on their block is

---

### Core Features

#### 1. "Just Ask" — Conversational Housing Help

A chat interface where people describe their situation in plain language and get clear, actionable, Chicago-specific guidance.

**Example conversations:**

- *"I make $45K and I'm looking for a 2BR on the north side — what should I expect to pay and what help is out there?"*
- *"My landlord hasn't fixed my heat in 2 weeks. What can I do?"*
- *"I got an eviction notice. What are my rights? How much time do I have?"*
- *"How do I apply for Section 8 in Chicago?"*
- *"I want to buy a house but I only have $5,000 saved. Is that enough?"*
- *"My rent went up 20% — is that legal?"*

The AI is grounded in **real Chicago law and programs** via RAG — not generic national advice. It cites sources so people can verify. It gives next steps, not just information.

#### 2. Program Finder — "What Do I Qualify For?"

A simple screener (4-5 questions) that matches people to programs they likely qualify for. Asks:

- Are you renting or looking to buy?
- Household size?
- Approximate household income?
- What neighborhood/area?
- What's your situation? (looking for housing, struggling to pay, facing eviction, want to buy, need repairs)

**Output for each matched program:**
- What it is (one sentence, plain language)
- Whether you likely qualify (based on your answers)
- How much help / what it covers
- **Direct link to apply** — not a homepage, the actual application
- Phone number / walk-in location if applicable
- Current status (open, waitlisted, closed)

**Programs in scope:**

| Category | Programs |
|---|---|
| Rental assistance | Emergency Rental Assistance (ERA), IDHS Homeless Prevention, Chicago ERAP |
| Public housing | CHA Housing Choice Vouchers (Section 8), CHA public housing, Project-based vouchers |
| First-time buyer | IHDA first-time buyer programs, Chicago HomeBuyer Assistance, CDFI down payment programs |
| Property tax relief | Homeowner Exemption, Senior Exemption, Senior Freeze, Longtime Occupant Exemption, Assessment appeals |
| Utility help | LIHEAP, CEDA utility assistance, Peoples Gas/ComEd hardship programs |
| Tenant legal help | Metropolitan Tenants Organization, LAF (Legal Aid Foundation), CARPLS hotline |
| Home repair | IHDA home repair programs, Chicago bungalow grants, weatherization assistance |

#### 3. Know Your Rights — Tenant & Homeowner Rights Engine

People describe their situation conversationally, and the AI explains their specific rights under Chicago law with concrete next steps.

**Key areas covered:**

- **Eviction process:** Chicago requires written notice, has specific timelines by eviction type, tenants can cure. The AI walks through exact deadlines and defenses.
- **Security deposits:** Chicago requires interest payments, specific accounts, written receipts. Violations entitle tenants to 2x the deposit. Most landlords violate this.
- **Repair obligations:** Tenants can withhold rent, repair-and-deduct, or break the lease for code violations after proper notice. AI generates the notice letter.
- **Rent increases:** Chicago has no rent control, but increases require proper notice (30/60 days depending on lease terms). AI explains what's required.
- **Lockouts & retaliation:** Both are illegal. AI explains remedies and who to call.
- **Lead paint & bed bugs:** Specific Chicago ordinances with landlord obligations. AI explains what's required and how to file 311 complaints.

**What makes this different from a web search:**
- It's *interactive* — it knows your specific situation, not a generic FAQ
- It gives *next steps*, not just information ("Here's the template letter to send your landlord. Send it certified mail. Here's the nearest post office.")
- It connects to *real resources* — phone numbers, walk-in clinics, legal aid intake lines
- It's in *plain language* — no legal jargon

#### 4. My Neighborhood — What's Happening on My Block

Enter an address or neighborhood and see a plain-English feed of housing activity nearby:

- **New construction & permits:** "A 12-unit building was permitted at 1234 N. Western last month"
- **Zoning changes:** "A rezoning request for your block is scheduled for committee on April 3rd"
- **311 activity:** building complaints, code violations, vacant building reports
- **Rent trends:** median rents in your community area, how they've changed
- **Recent sales & assessments:** what homes are selling for nearby

All sourced from public City of Chicago data, translated by AI into something a normal person would actually read.

**The grassroots angle:** People can't advocate for their neighborhoods if they don't know what's happening. This turns public data into community awareness.

---

### Everyday People Scenarios

These are the real situations this tool is built for:

#### Scenario 1: Maria — Behind on Rent
Maria lost her job and is 2 months behind on rent. She's scared of eviction and doesn't know what to do.
- **Chat:** "I'm 2 months behind on rent and I'm scared I'm going to get evicted. What do I do?"
- **Response:** Explains that her landlord must give written notice before filing, she has time to cure, and connects her to Emergency Rental Assistance (with the direct application link), IDHS Homeless Prevention, and the LAF eviction defense hotline.

#### Scenario 2: James — First-Time Buyer
James makes $55K and has $8,000 saved. He wants to buy but thinks he can't afford it.
- **Screener:** Identifies he qualifies for IHDA first-time buyer programs (up to $10K down payment assistance), Chicago's HomeBuyer Assistance program, and FHA loans with 3.5% down.
- **Chat:** Walks him through the process step-by-step, explains what a housing counselor does (required for some programs), and links him to HUD-approved counseling agencies in his area.

#### Scenario 3: Diane — Landlord Won't Fix Heat
Diane's heat has been broken for 3 weeks in January. Her landlord won't respond.
- **Rights engine:** Explains her rights under RLTO and Chicago's heat ordinance (68F minimum Oct-May). Gives her three options: (1) Call 311 to report, (2) Send a 14-day notice and withhold rent, (3) Repair and deduct. Generates the notice letter for her. Gives her the Metropolitan Tenants Organization hotline.

#### Scenario 4: Robert — Property Taxes Crushing Him
Robert is 72, been in his Chatham home for 30 years, and his property taxes keep going up.
- **Screener:** Identifies he likely qualifies for the Senior Exemption, Senior Freeze, AND the Longtime Occupant Exemption — could save him $2,000+/year. Links directly to the Cook County Assessor's application forms.

#### Scenario 5: Neighborhood Group — What's Being Built?
A Logan Square community group wants to know what development is planned in their area.
- **Neighborhood feed:** Shows recent permit applications, any pending zoning changes, and recent 311 building complaints. The group can now show up to the right meetings with the right information.

---

### Data Sources & Knowledge Base

All data is public and free:

#### Legal & Policy Documents (for RAG)
- Chicago Residential Landlord Tenant Ordinance (RLTO)
- Chicago Municipal Code — building/housing sections
- Illinois Landlord-Tenant Act
- CHA program guides and eligibility criteria
- IHDA program guides (first-time buyer, home repair, rental assistance)
- Cook County property tax exemption guides
- HUD fair housing guidelines

#### City of Chicago Data Portal (APIs)
- Building permits (issued and applied)
- Zoning district boundaries (shapefiles)
- 311 service requests (building complaints, vacant buildings)
- Affordable housing locations
- Business licenses (for landlord lookup)

#### Other Public Data
- Cook County Assessor (property info, assessed values, exemptions)
- ACS / Census (income, rent burden by community area)
- HUD Fair Market Rents
- Zillow/Redfin rental estimates (for market context)

---

### Tech Stack (Google / DeepMind Ecosystem)

| Layer | Tech | Why |
|---|---|---|
| AI Model | **Gemini API** (Google DeepMind) | Long context window, multimodal, strong at nuanced Q&A — core of the hackathon |
| RAG / Search | **Vertex AI Search** or **Gemini grounding with Google Search** | Ground responses in real Chicago documents and live web results |
| Embeddings | **Vertex AI Embeddings** (text-embedding-005) | Embed Chicago housing documents for semantic retrieval |
| Vector Store | **AlloyDB AI** or **Firestore** with vector search | Store and query document embeddings, program directory |
| Frontend | **Flutter Web** or **Next.js on Firebase Hosting** | Cross-platform (web + mobile), Firebase integration |
| Backend | **Firebase Cloud Functions** (gen2) | Serverless, easy Gemini SDK integration, scales to zero |
| Database | **Firestore** | Program listings, user saved searches, neighborhood data cache |
| Maps | **Google Maps Platform** (Maps JS API) | Neighborhood view, permit locations, address autocomplete with Places API |
| Geocoding | **Google Maps Geocoding API** | Address → lat/lng → neighborhood/ward lookup |
| Hosting | **Firebase Hosting** | Free tier, CDN, easy deploys |
| Auth | **Firebase Auth** (optional) | Google sign-in for saving results, anonymous for no-friction access |
| Analytics | **Google Analytics / Firebase Analytics** | Track which programs people search for, common questions — useful for advocacy data |
| Translation | **Google Cloud Translation API** | Spanish language support (40% of Chicago's housing-insecure population is Spanish-speaking) |
| OCR (stretch) | **Google Document AI** | Let users photograph lease agreements or eviction notices and extract key info |

#### Key Google AI Features to Showcase

- **Gemini Function Calling**: The chat can call structured tools — look up an address, check program eligibility, pull permit data — all orchestrated by Gemini as tool calls
- **Gemini Grounding with Google Search**: For questions about current programs or recent policy changes, ground responses in live search results so information stays current
- **Vertex AI RAG**: Chicago legal documents (RLTO, municipal code) chunked and embedded for accurate retrieval — the AI cites its sources
- **Multimodal Input (stretch)**: Users photograph an eviction notice or lease → Gemini vision extracts the key details and explains what it means
- **Google Maps Integration**: Address autocomplete → instant neighborhood context, nearby permits, housing activity overlay

---

### Hackathon Scope (24-48 hours)

#### Must Have (MVP)
- [ ] Chat interface powered by **Gemini API** with streaming responses
- [ ] **Vertex AI RAG** knowledge base with 10-15 key documents (RLTO, top assistance programs, tenant rights summary, property tax exemptions)
- [ ] **Gemini Function Calling** to orchestrate program lookups and address-based queries
- [ ] Program finder screener (5 questions → matched programs with apply links)
- [ ] **Google Maps** address autocomplete + neighborhood context
- [ ] 3-5 polished example scenarios that demo well
- [ ] **Firebase** backend (Hosting + Cloud Functions + Firestore)

#### Nice to Have
- [ ] **Gemini Grounding with Google Search** for live program/policy info
- [ ] Neighborhood feed pulling live City of Chicago permit data on a **Google Maps** overlay
- [ ] Template letter generator for tenant notices
- [ ] **Google Cloud Translation** for Spanish language support
- [ ] **Gemini Vision** — photograph a lease or eviction notice, get it explained
- [ ] Save/share results with **Firebase Auth**

#### Out of Scope (Future)
- User accounts and case tracking
- Direct integration with city systems (311 filing, permit applications)
- SMS/text interface for people without smartphones
- Community organizing features (petitions, meeting coordination)
- Landlord ratings / reviews

---

### Why This Matters

Chicago doesn't just need more housing — it needs the people who live here to be empowered in the housing system. Right now:

- **60% of Chicago renters** don't know about the RLTO or their rights under it
- **Billions in assistance** goes unclaimed because people don't know it exists or can't navigate the applications
- **Property tax exemptions** worth thousands go unclaimed by seniors and longtime homeowners every year
- **Community opposition** to housing often comes from a lack of information, not genuine conflict

This tool doesn't build housing directly. It builds the **informed, empowered community** that makes more housing possible — by helping people find homes, keep homes, know their rights, access help, and understand what's happening in their neighborhoods.

---

---

## Project Idea 2: macOS Sandboxes as a Service for AI Coding Agents

**Cloud macOS environments purpose-built for AI agents developing Swift/iOS apps.**

Give every AI coding agent (Claude Code, Codex, Gemini CLI, Cursor) access to a Mac with Xcode — no hardware required.

---

### The Problem

AI coding agents are transforming software development, but they hit a wall with Apple platforms:

- **You need a Mac to build for Apple.** Swift compilation, Xcode projects, iOS Simulator, code signing — none of this works on Linux.
- **Cloud macOS is painful.** AWS EC2 Mac has a 24-hour minimum ($26+), MacStadium starts at $109/mo, and none of them are designed for AI agent workflows.
- **AI agent sandboxes don't support macOS.** E2B, Fly.io Sprites, Docker sandboxes — all Linux only. The best agent infrastructure in the world can't compile a Swift app.
- **Xcode 26.3 added MCP support** (agentic coding built-in), but it assumes you own a Mac. If you don't, you're locked out.

The result: AI agents can build Python, JavaScript, Rust, and Go apps in cloud sandboxes — but the entire Apple ecosystem (~28M developers) is excluded.

---

### What Exists Today

| Player | What They Do | Gap |
|---|---|---|
| **Daytona** ($24M Series A) | AI agent sandboxes, claims macOS support | macOS is secondary; not Xcode/Swift focused |
| **Cua** (YC X25) | Computer-use agent platform (GUI automation in sandboxed VMs) | **Different problem** — see detailed analysis below |
| **E2B / Fly.io Sprites** | Best-in-class agent sandboxes | Linux only |
| **AWS EC2 Mac** | Raw macOS VMs | $1.08/hr, 24hr min, no agent tooling, no MCP |
| **MacStadium / Tart** | macOS VM orchestration | Built for CI/CD pipelines, not interactive agent sessions |
| **Xcode 26.3 + MCP** | Native agentic coding in Xcode | Local only — requires owning a Mac |
| **ClodPod / SandVault** | Local macOS sandboxes for AI agents | Local only, not cloud |

#### Cua Deep Dive — Different Product, Different Problem

Cua is often cited as a competitor here, but on closer inspection **it's solving a fundamentally different problem:**

**What Cua actually is:** Infrastructure for **Computer-Use Agents** — AI agents that control desktop environments by *seeing the screen and performing mouse/keyboard actions*. Their tagline is "Docker for Computer-Use Agents." The core loop is: screenshot VM display → send to vision-language model → model returns click/type actions → execute → repeat.

**What Cua is NOT:** A cloud IDE, a coding sandbox with terminal access, or infrastructure for file-system/CLI-based coding agents like Claude Code or Codex.

**Cua's three layers:**

| Layer | Name | What It Does |
|---|---|---|
| Virtualization | **Lume** | Low-level VM management via Apple's Virtualization.Framework on Apple Silicon. Near-native performance (97% CPU speed). |
| Computer Interface | **CUI** | SDK for interacting with a VM's GUI — screenshots, mouse clicks, keyboard input, scrolling, accessibility tree extraction. The "eyes and hands" API. |
| Agent | **CUA** | High-level agent framework that orchestrates LLM reasoning loops on top of CUI. Plugs into OpenAI, Anthropic, Ollama, etc. The "brain" layer. |

**Key facts that distinguish Cua from this project idea:**

- **Cua's cloud has NO macOS.** Their cloud offering (launched May 2025) supports Linux and Windows only. macOS cloud is listed as "coming soon" but has not shipped as of March 2026.
- **Cua's local macOS support requires owning Apple Silicon hardware.** It's not a hosted service — it's open-source tooling you run on your own Mac.
- **Cua is built around the GUI/vision paradigm**, not terminal/file-system access. Their CuaBot feature can run Claude Code inside a sandbox, but it's a secondary feature wrapping coding agents in a GUI environment, not the core product.
- **Cua competes with Anthropic's computer-use API, Google Project Mariner, and e2b's desktop sandboxes** — not with a macOS-for-coding-agents service.

**Funding:** YC X25, $500K seed (June 2025). 3-4 employees. Open source (MIT license) with revenue from cloud platform.

**Bottom line:** Cua would not directly compete with a product offering cloud macOS environments for AI coding agents that work via terminal/files/MCP. The overlap is marginal. This actually *strengthens* the case that the gap identified by Project Idea 2 is real — even the closest-looking competitor is building something different.

**The gap: Nobody offers "API call → cloud macOS with Xcode → AI agent connects via MCP → build/test Swift → tear down" as a product.**

---

### The Steelman Case

#### Why This Could Be Massive

**1. Timing is perfect — Xcode 26.3 just created the demand.**
Apple shipped native MCP support in Xcode (Feb 2026), legitimizing AI agent coding for iOS/macOS. 20 built-in tools exposed via MCP: file creation, building, testing, preview snapshots, documentation search. Every AI coding agent can now plug into Xcode — *if they have access to a Mac.* This service would be the missing infrastructure layer.

**2. The 24-hour licensing constraint is actually a feature.**
Apple requires 24-hour minimum leases on Mac hardware. Instead of fighting this, lean into it: offer **persistent macOS dev environments** (not ephemeral). Your AI agent gets a Mac that's always warm, with your project loaded, dependencies cached, and Xcode ready. This is actually a better developer experience than ephemeral VMs — no cold starts, no re-downloading Xcode (12GB+) every time.

**3. AI agents are becoming the primary consumer of dev environments.**
The trajectory is clear: developers increasingly supervise agents rather than write code directly. The bottleneck shifts from "developer needs a machine" to "agent needs a machine." This is the CI/CD → agent-sandbox evolution. CI/CD for Mac is a proven market (Codemagic, Bitrise, CircleCI Mac) — agent sandboxes are the next iteration.

**4. Enterprise demand is real and underserved.**
Large companies adopting AI coding agents for their iOS teams face a hardware scaling problem: you can't spin up 50 Mac minis overnight for 50 agents. A cloud API solves this instantly. Enterprise mobile teams (banking, healthcare, retail — everyone has an iOS app) would pay premium prices for this.

**5. Education & accessibility.**
Millions of students and developers worldwide want to learn Swift / build iOS apps but can't afford a Mac ($1,299+). Cloud macOS sandboxes with AI assistance would democratize Apple platform development.

**6. Apple Silicon VMs are now technically viable.**
Apple's Virtualization.framework enables near-native performance (97% CPU speed per Cua's benchmarks). Tart/Orchard have proven you can orchestrate thousands of macOS VMs. The technical foundation exists — it just hasn't been productized for AI agents.

---

### TAM Analysis

#### Bottom-Up

| Segment | Size | Willingness to Pay | Annual Value |
|---|---|---|---|
| **iOS/macOS developers using AI agents** | ~5M of ~28M Apple devs (early adopters) | $50-200/mo | $3B-12B |
| **Enterprise mobile teams** (Fortune 500 iOS) | ~10,000 teams × 5-20 agent seats | $200-500/seat/mo | $120M-1.2B |
| **CI/CD migration** (existing Mac CI users) | ~500K developers on Codemagic/Bitrise/CircleCI Mac | $100-300/mo | $600M-1.8B |
| **Education** (CS students wanting iOS) | ~2M students globally | $10-30/mo | $240M-720M |
| **Indie / hobbyist (no Mac owners)** | ~3M developers | $20-50/mo | $720M-1.8B |

**Conservative TAM: $5B+ annually** in the cloud macOS + AI agent infrastructure market.

**Serviceable market (Year 1-2):** Enterprise mobile teams + power-user AI agent developers = ~$200M-500M.

#### Top-Down

- Cloud dev environments market: ~$15B by 2027 (Gartner)
- AI coding tools market: ~$12B by 2027
- macOS/iOS share of developer ecosystem: ~20-25%
- Overlap: $3-7B addressable

#### Comparable Valuations

- **Daytona** (AI agent sandboxes, Linux-focused): $24M Series A, early revenue
- **Cua** (macOS agent infra): YC-backed, pre-revenue
- **E2B** (Linux agent sandboxes): ~$10M raised
- **Replit** (cloud dev environments + AI): $1.16B valuation

---

### Use Cases

#### Primary: AI Agent Swift Development
An AI coding agent (Claude Code, Codex, Gemini CLI) receives a task: "Build me an iOS app that tracks my workouts." The agent:
1. Calls the API → gets a cloud Mac with Xcode
2. Connects via MCP (Xcode 26.3 native support)
3. Creates the project, writes Swift code, builds, runs tests
4. Returns the built .ipa or shares a Simulator preview
5. Environment persists for iteration

#### Secondary Use Cases

| Use Case | Description |
|---|---|
| **Enterprise fleet scaling** | Company has 200 iOS developers adopting Cursor/Claude Code. Instead of buying 200 Mac minis for agents, they use cloud Macs on-demand. |
| **Cross-platform agent workflows** | An agent building a full-stack app uses a Linux sandbox for the backend and a macOS sandbox for the iOS frontend — same API, same workflow. |
| **iOS CI/CD 2.0** | Replace traditional CI runners with agent-aware environments that can diagnose build failures, fix them, and retry — not just report red/green. |
| **App Store submission automation** | Agent handles code signing, provisioning profiles, App Store Connect upload, and metadata — the most hated part of iOS development. |
| **Swift education** | Student asks an AI tutor to "teach me SwiftUI." The tutor creates a project in a cloud Mac, makes changes, shows previews — all without the student owning a Mac. |
| **Open source iOS contributions** | A developer on Linux wants to contribute to an iOS open source project. Agent spins up a Mac sandbox, makes the change, runs tests, submits PR. |
| **Legacy app modernization** | Enterprise agent tasked with migrating an Objective-C app to Swift. Needs Xcode to incrementally build/test. Runs for days in a persistent sandbox. |

---

### The Case Against (Steelman)

#### 1. Apple Controls the Chokepoint — and They Might Just Do This Themselves
Apple shipped MCP support in Xcode 26.3. They're clearly watching the AI agent space. If cloud macOS sandboxes for agents become valuable, Apple could offer "Xcode Cloud for Agents" as a first-party service tomorrow. They already have Xcode Cloud (CI/CD), the hardware, the OS, and the developer relationships. You'd be building a business where your most existential competitor owns the operating system, the IDE, the hardware, and the licensing terms. Every Apple WWDC keynote is an extinction-level event for you.

#### 2. The Licensing Economics May Never Work
Apple's 24-hour minimum lease requirement isn't a technical constraint — it's a business decision Apple can change (or make worse) at any time. At ~$26/day minimum cost per environment, the unit economics are fundamentally different from Linux sandboxes (pennies per session). This means:
- You can't compete on price with E2B/Sprites for the 90% of agent tasks that don't need macOS
- Your margins are squeezed between Apple's hardware costs and what developers will pay
- Apple could tighten licensing terms at any time (they've done it before with Hackintosh, virtualization rules, etc.)

#### 3. The Market May Be Smaller Than It Looks
The TAM analysis assumes millions of developers want AI agents building Swift apps in the cloud. But:
- **Most iOS developers already own Macs** — that's a prerequisite for the job. The "developer who doesn't own a Mac but wants to build iOS apps" is a niche, not a market.
- **AI agents don't need persistent GUI environments for most coding tasks.** Claude Code and Codex work via terminal/file operations. You need macOS specifically for *compilation and testing*, which is a fraction of the agent's workflow. An agent could write Swift code on Linux and only use a Mac sandbox for build/test — reducing usage (and revenue) dramatically.
- **Cross-platform frameworks are eating native Swift.** Flutter, React Native, Kotlin Multiplatform, and now AI-generated cross-platform code reduce the share of developers who *must* use Xcode. The trend line is moving away from platform-specific tooling.

#### 4. Daytona Is Already Here (But Cua Is Not a Direct Competitor)
**Correction from earlier analysis:** Cua is a computer-use agent platform (GUI/vision-based automation), not a coding-agent sandbox service. It doesn't offer cloud macOS, and its architecture is fundamentally different (screenshot-and-click vs. terminal/file-system). See detailed Cua analysis above. **Cua does not directly compete with this idea.**

However, **Daytona** ($24M Series A) does claim macOS support and is purpose-built for AI agent sandboxes. If this market takes off, they have:
- 12-18 month head start
- Existing infrastructure and customers
- Established cloud provider relationships
- Engineering team already solving the hard problems

Additionally, any of the major cloud providers (AWS, GCP, Azure) or CI/CD platforms (Codemagic, Bitrise) could pivot their existing Mac infrastructure toward agent use cases. The barrier to entry is capital and hardware, not technology.

#### 5. The Technical Moat Is Thin
The underlying tech is commoditized or open source:
- Apple's Virtualization.framework is free and public
- Tart/Orchard (open source) already orchestrate macOS VMs at scale
- Xcode's MCP support is a standard protocol — no proprietary integration needed
- Any cloud provider with Mac hardware can replicate the stack

There's no proprietary model, no unique dataset, no network effect. The value is in operational excellence (uptime, boot speed, developer experience) — which is important but not defensible against bigger players with more capital.

#### 6. AI Agents Might Not Need Full macOS Environments
The assumption is that agents need a full macOS environment with Xcode. But:
- **Swift compiles on Linux** (Swift is open source and cross-platform). You can compile, test, and run Swift packages on Linux today. Only UIKit/SwiftUI apps strictly require macOS.
- **AI agents could generate Xcode projects and push to a lightweight CI** for build/test, rather than needing a persistent interactive macOS environment.
- **Apple's vision may be local-first.** Xcode 26.3's MCP support is designed for local Mac use. Apple may actively resist cloud Xcode environments to protect hardware sales — their business model depends on developers buying Macs.

#### 7. The "Education" Angle Is Overstated
"Students can't afford Macs" sounds compelling, but:
- Most CS programs have Mac labs or loaner programs
- Students learning Swift are typically already in the Apple ecosystem
- The serious alternative for budget-conscious students is to learn web/mobile dev with cross-platform tools, not to pay $50/mo for a cloud Mac
- Apple already offers steep education discounts and the Swift Playgrounds app on iPad ($349)

---

### Hackathon Fit Assessment

#### Arguments For
- Technically impressive if you can demo it
- Clear market gap with real demand
- Could use Gemini CLI as the AI agent in the demo
- Infra products win hackathons when the demo is compelling

#### Arguments Against
- **Google/DeepMind fit is weak** — this is fundamentally an Apple ecosystem product. Hard to showcase Gemini as the star vs. just a consumer of the infra.
- **Requires real Mac hardware** — can't fake a macOS sandbox. You'd need to bring/provision actual Macs and demo live VM orchestration.
- **Infrastructure-heavy** — 48 hours is tight for VM orchestration + API + agent integration + demo polish.
- **Demo risk** — live infra demos are fragile. If the VM takes 30 seconds to boot during the demo, the energy dies.
- **Audience mismatch** — hackathon judges may not viscerally relate to "AI agent needs a Mac" the way they would to a consumer-facing product.

#### Revised Competitive Assessment
The Cua deep-dive actually **strengthens** Project Idea 2's case on the competition front. The closest-looking competitor (Cua) is building something fundamentally different. The real competitive threat is Daytona (which has macOS on its roadmap but hasn't made it a focus) and the possibility of Apple or major cloud providers entering directly. The gap is more open than it initially appeared — but the other hackathon-fit concerns (infra-heavy, Google/DeepMind fit, demo risk) remain.

#### Verdict
**Strong startup idea. Weak hackathon project** — unless you pre-provision the infra and focus the hackathon time on the agent experience layer. Even then, the Google/DeepMind angle is a stretch.

---

### Likely Judge Questions & Blockers

Questions judges (or investors) would likely ask, with honest assessments:

#### "How is this different from just using a CI/CD Mac runner?"

**The real challenge here.** CI/CD runners (Codemagic, Bitrise, CircleCI Mac) already give you a Mac in the cloud that compiles Swift and runs tests. The difference is:
- CI runners are stateless and pipeline-oriented (trigger → build → report). Agent sandboxes need persistent, interactive sessions where an agent iterates.
- CI runners don't expose MCP endpoints or agent-friendly APIs.
- CI runners aren't optimized for the "agent writes code, builds, sees error, fixes, rebuilds" loop.

**But** — a skeptic would argue this is a thin UX layer on top of existing CI infrastructure, not a new category. You'd need to prove the agent-interactive workflow is meaningfully different enough to justify a new product vs. adding an API wrapper around Codemagic.

#### "Why wouldn't Apple just do this?"

No good answer. Apple has the hardware, OS, Xcode, Xcode Cloud, and developer relationships. If they see demand, they can ship "Xcode Cloud for Agents" as a first-party feature at WWDC. Your best defense is speed (move before they do) and that Apple historically moves slowly on cloud/infrastructure — but this is a hope, not a strategy. Any pitch needs to acknowledge this risk honestly.

#### "What are the unit economics? Can this be profitable?"

Tough. The cost floor is dictated by Apple hardware:
- Mac mini M4: ~$600 (amortized over 3 years = ~$0.023/hr hardware cost)
- Colocation / power / networking: ~$50-80/mo per machine
- Apple's 24-hour minimum means you can't pack multiple short sessions onto one machine efficiently
- Realistic cost to you: ~$0.10-0.15/hr per sandbox
- You'd need to charge $0.50-2.00/hr to have healthy margins
- Competitive pressure from AWS EC2 Mac at $1.08/hr (and they can subsidize)

Profitable but tight margins compared to Linux sandbox businesses where compute costs pennies.

#### "How do you handle Apple's licensing restrictions?"

Apple requires that macOS VMs run only on Apple hardware (no running macOS on generic x86/ARM servers). This means:
- You must own or lease physical Mac hardware (Mac minis, Mac Pros, Mac Studios)
- You cannot use standard cloud infrastructure (EC2 non-Mac, GCP, Azure generic VMs)
- The 24-hour Dedicated Host minimum on AWS applies
- Scaling means buying more Macs — you can't just spin up more VMs on existing servers

This is a real operational constraint. It limits how fast you can scale and increases capital requirements.

#### "What if AI agents get good enough to generate cross-platform code instead?"

A legitimate long-term risk. If AI agents become so capable that they can generate equivalent apps using Flutter/React Native/Kotlin Multiplatform instead of Swift, the need for macOS sandboxes shrinks. The counter-argument is:
- Apple actively pushes developers toward native Swift/SwiftUI with platform-specific features (widgets, intents, visionOS, etc.)
- Performance-sensitive and platform-specific apps will always need native development
- Apple's App Store review increasingly favors native apps

But the trend toward cross-platform is real and would compress the addressable market.

#### "What's your distribution strategy? How do developers find you?"

Agent sandboxes are infrastructure — developers don't search for them. You need to be where the agents are:
- **Integrations:** Plugin for Claude Code, Codex, Cursor, Gemini CLI
- **Marketplace listings:** VS Code extensions, JetBrains plugins
- **Developer content:** "How to build iOS apps with Claude Code" tutorials that naturally require your infra
- **Open source:** An open-source agent-to-Xcode bridge that works locally, with cloud as the upgrade path

This is solvable but requires focused GTM effort.

#### "Why can't someone just run Tart/Orchard (open source) on their own Macs?"

They can. And for teams with existing Mac hardware, they probably should. Your value prop is for:
- Teams that don't want to manage Mac hardware
- Developers who don't own Macs at all
- Burst capacity (50 agents need Macs right now, for 2 hours)
- The convenience/reliability premium (SLA, uptime, pre-configured Xcode)

This is similar to the "why use AWS instead of running your own servers" argument — valid, but you need to be honest that self-hosting is a viable alternative for many users.

#### "This is a Google DeepMind hackathon — where's the Google/DeepMind angle?"

**The hardest question for this specific hackathon.** Honest answer:
- Gemini CLI could be the demo agent, but it's interchangeable with Claude Code or Codex
- You could use Vertex AI for intelligent build-error diagnosis / auto-fix, but that's a feature, not the core product
- Google Cloud could be the control plane (GKE for orchestration, Cloud Run for API), but the actual sandboxes must run on Apple hardware
- There's no deep Gemini integration that makes this product fundamentally better — any LLM works

This is the weakest point for hackathon context specifically. The product doesn't *need* Google tech in a way that's core to its value.

---

### How This Compares to Existing Agent Sandboxes

#### The Current Landscape

Today, AI coding agents run in cloud sandboxes — but every single one is Linux-only:

| Platform | What It Is | Startup Time | Persistence | OS | Pricing |
|---|---|---|---|---|---|
| **OpenAI Codex Cloud** | Isolated Linux containers per task. You connect a GitHub repo, type a task, agent works autonomously, presents diffs + PR when done. | Seconds | None (ephemeral per task) | Linux | Included with ChatGPT Pro |
| **E2B** | Firecracker microVMs via API. `Sandbox.create()` → run code → destroy. Snapshot-based cold starts. | <200ms | Beta (unreliable) | Linux | ~$0.05/hr per vCPU |
| **Fly.io Sprites** | Persistent Firecracker VMs. Long-lived, auto-hibernate, checkpoint/restore. Claude Code pre-installed. | 1-2s (new), ~300ms (restore) | Indefinite | Linux | ~$0.12/hr idle, ~$0.46/4hr session |
| **Daytona** | AI agent sandboxes. Claims macOS/Windows/Linux. Full desktop environments. | Sub-90ms (Linux) | Yes | Linux, Windows, macOS (claimed) | Usage-based, $200 free |

**What they all have in common:** The agent gets a sandboxed environment, runs terminal commands, edits files, runs tests, and reports results. The isolation protects the host. The API makes it programmable.

**What none of them can do:** Compile a Swift app, run iOS Simulator, use Xcode, code-sign for App Store, or do anything that requires macOS.

#### What's Different About a macOS Agent Sandbox

The core product is the same *concept* as E2B/Sprites/Codex — give an AI agent a sandboxed environment to work in. The difference is that macOS sandboxes unlock an entire platform ecosystem that's currently impossible:

| Capability | Linux Sandbox | macOS Sandbox |
|---|---|---|
| Compile Swift packages | Yes (Swift is cross-platform) | Yes |
| Build iOS/macOS apps (UIKit, SwiftUI) | **No** | Yes |
| Run iOS Simulator | **No** | Yes |
| Xcode project management | **No** | Yes |
| Code signing & provisioning | **No** | Yes |
| Xcode 26.3 MCP tools (20 built-in) | **No** | Yes |
| App Store submission | **No** | Yes |
| SwiftUI previews / snapshots | **No** | Yes |
| Test on device simulators (iPhone, iPad, Watch, Vision Pro) | **No** | Yes |

#### How Agents Work in Sandboxes Today (Concrete Details)

**Codex Cloud flow:**
1. You connect a GitHub repo in the ChatGPT sidebar
2. Type a task: "Add dark mode support to the settings page"
3. Codex spins up a Linux container with your repo + dependencies pre-installed
4. Agent reads code, writes changes, runs tests — you see reasoning + terminal logs in real-time
5. When done, it presents diffs. You click "Open PR" → GitHub PR created
6. No internet in the sandbox by default. ~40-60% first-try success rate per real-world reviews

**E2B flow:**
```python
from e2b_code_interpreter import Sandbox

with Sandbox.create() as sandbox:       # Firecracker microVM in <200ms
    sandbox.run_code("pip install pandas")
    result = sandbox.run_code("import pandas; print(pandas.__version__)")
    print(result.text)
```

**Sprites flow:**
```bash
sprite create my-project               # persistent Linux VM in 1-2s
sprite exec my-project "git clone https://github.com/user/repo && cd repo && npm test"
# ... days later, VM auto-hibernated ...
sprite exec my-project "cd repo && npm test"   # auto-resumes in ~300ms
```

**Claude Code in a sandbox (today):**
- Run Claude Code in a Docker devcontainer or E2B sandbox
- Use `--dangerously-skip-permissions` flag (the container IS the security boundary)
- Agent works via terminal/file operations, completely headless
- A FastAPI wrapper can expose this over HTTP for programmatic control

#### What the macOS Equivalent Would Look Like

**The same DX, but for Apple platforms:**

```python
from macbox import Sandbox

# Create a macOS sandbox with Xcode pre-installed
sandbox = Sandbox.create(
    template="xcode-16",        # macOS 15 + Xcode 16 + iOS 18 Simulator
    persist=True                # 24hr minimum anyway, lean into persistence
)

# Clone a Swift project
sandbox.exec("git clone https://github.com/user/my-ios-app && cd my-ios-app")

# Connect an AI agent via MCP (Xcode 26.3 native support)
mcp_url = sandbox.get_mcp_endpoint()
# → "https://sandbox-a1b2c3.macbox.dev:8080/mcp"
# Hand this URL to Claude Code, Gemini CLI, Codex, Cursor — any MCP client

# Or run commands directly
sandbox.exec("cd my-ios-app && xcodebuild -scheme MyApp -sdk iphonesimulator build")
sandbox.exec("cd my-ios-app && xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'")

# Get build artifacts
sandbox.download("/Users/agent/my-ios-app/build/MyApp.ipa")

# Sandbox persists — agent can come back tomorrow and iterate
```

---

### The Demo (What You'd Actually Show)

#### The Pitch (One-Liner)

**"E2B for macOS — cloud sandboxes where AI agents build, test, and ship iOS apps."**

Or more aspirationally:

**"Any AI agent can now build an iPhone app. No Mac required."**

#### Actual Hackathon Demo Setup

**Hardware:** Your Windows laptop (the "client") + teammate's MacBook (the "cloud sandbox"). Connected over local network or tunnel.

```
┌──────────────────────┐       API / MCP / WebSocket       ┌──────────────────────┐
│  Windows Laptop      │  ──────────────────────────────→  │  Teammate's MacBook  │
│  (Logan)             │                                   │                      │
│                      │  ← streams build output,          │  - macOS + Xcode 16  │
│  - Demo UI / CLI     │    test results, simulator        │  - iOS Simulator     │
│  - Gemini agent      │    screenshots                    │  - MCP server        │
│  - "I have no Mac"   │                                   │  - API layer (Flask/ │
│                      │                                   │    FastAPI/Express)   │
└──────────────────────┘                                   └──────────────────────┘
```

**Why this setup is perfect:** The Windows laptop *literally cannot run Xcode*. This isn't a contrived demo — it's the exact problem the product solves, proven live on stage.

#### What to Build During the Hackathon (~20-24 hrs of work)

**On the MacBook — the "sandbox server" (~8-10 hrs):**
1. **API layer** (FastAPI or Express) — endpoints for:
   - `POST /sandbox/exec` — run a shell command, stream stdout/stderr back via WebSocket
   - `GET /sandbox/status` — sandbox health, Xcode version, disk space
   - `POST /sandbox/files` — upload/download files
   - `GET /sandbox/screenshot` — capture iOS Simulator screen and return image
2. **MCP bridge** — expose Xcode 26.3's built-in MCP tools over the network (or use XcodeBuildMCP from Sentry) so a remote agent can call them
3. **Tunnel** — Cloudflare Tunnel, ngrok, or Tailscale to make the MacBook reachable from anywhere (not just local network)

**On the Windows laptop — the "client" (~8-10 hrs):**
1. **Web dashboard** (Next.js or simple React app) showing:
   - Sandbox status (connected/disconnected, macOS version, Xcode version)
   - Live build log stream (WebSocket)
   - Agent reasoning / activity feed
   - iOS Simulator screenshot panel (updates as the app is built)
2. **Gemini agent integration** — Gemini CLI or custom Gemini API agent that connects to the MacBook's MCP endpoint and can:
   - Create Xcode projects
   - Write Swift files
   - Trigger builds
   - Read build errors and fix them
   - Run tests
3. **CLI wrapper** (optional) — a `macbox` CLI that wraps the API calls for the terminal demo moments

**Polish (~4 hrs):**
- Test the exact demo prompt 5+ times
- Record a backup video of the full demo in case of network failure
- Pre-cache all Swift/Xcode dependencies on the MacBook
- Pre-warm the Xcode project template so first build is fast

#### Demo Script (5 minutes)

**Beat 1: The Problem (30 seconds)**
*[On Windows laptop, visible to audience]*
"Every AI coding agent — Codex, Claude Code, Gemini — can build Python apps, web apps, Rust apps in cloud sandboxes. But ask any of them to build an iOS app, and they hit a wall. You need macOS. You need Xcode. You need a $1,300 Mac. I'm on Windows. I don't have one."

**Beat 2: Connect to a Cloud Mac (30 seconds)**
```bash
$ macbox connect --sandbox demo-app
✓ Connected to demo-app.macbox.dev
✓ macOS 15.2 + Xcode 16 + iOS 18 Simulator
✓ MCP endpoint ready
```
*[Dashboard lights up — shows macOS sandbox status, Xcode version, available simulators]*
"One command. I now have a Mac with Xcode in the cloud. Let's build an app."

**Beat 3: AI Agent Builds an iOS App (2 minutes)**
```bash
$ gemini --mcp https://demo-app.macbox.dev/mcp
> "Create a SwiftUI workout tracker app with a timer, exercise list, and history view. Build it and run the tests."
```
*[Dashboard shows live activity — agent reasoning on the left, build output streaming on the right]*
- Agent creates Xcode project via MCP
- Writes SwiftUI views
- Triggers build → `xcodebuild` output streams to the dashboard
- Build error → agent reads it → fixes the code → rebuilds → success
- Runs tests on iOS Simulator → all green

**Beat 4: The Result (1 minute)**
*[Dashboard shows iOS Simulator screenshot of the working app]*
- Show the built app running in Simulator (screenshot streamed from MacBook)
- Show test results (all passing)
- "This entire app was built by Gemini on a Mac I don't own, from a Windows laptop that can't run Xcode. The agent never saw a GUI — it worked entirely through our API and MCP."

**Beat 5: Why This Matters (1 minute)**
"28 million Apple developers. A $100 billion app economy. And every AI agent sandbox is Linux-only. We're the missing infrastructure layer. Any agent. Any iOS app. No Mac required."

#### Demo Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Network between laptops fails | Use Tailscale (peer-to-peer, works without internet). Also have a backup recording ready. |
| Agent writes bad code, build fails repeatedly | Pre-test the exact prompt 5+ times. The "agent fixes a build error" moment is actually compelling if it recovers — let it happen once, then succeed. |
| MacBook overheats / slows down | Keep Xcode and Simulator pre-launched. Use a simple single-view app. Close all other apps on the MacBook. |
| Xcode compilation is slow (audience gets bored) | Use a minimal app (1-2 views, no external dependencies). Pre-cache Swift module compilation. Show streaming build output so audience sees progress. |
| Demo takes too long for hackathon time slot | Have a "fast path" version: pre-created project, agent just adds one feature + builds. Can compress Beat 3 to 60 seconds. |
| Judges ask "is this really remote or just running locally?" | Show the Windows Task Manager — no Xcode process. Show the MacBook's Activity Monitor on a secondary view if needed. The whole point of using Windows is that this is provably remote. |

---

### The Concept — What This Product Actually Is

#### For Different Audiences

**For a developer:** "It's E2B / Sprites, but for macOS. Same API pattern — create a sandbox, run commands, connect your agent. But now your agent can use Xcode, build iOS apps, run Simulator tests, and ship to the App Store."

**For a founder/investor:** "Every AI coding agent needs a sandbox to work in. For Linux, that's solved (E2B, Sprites, Codex). For Apple platforms — 28M developers, $100B+ app economy — there's nothing. We're building the infrastructure layer."

**For a hackathon judge:** "We asked: what can't AI agents build today? The answer is iPhone apps — because every cloud sandbox is Linux. We built the first cloud macOS sandbox with Xcode, connected Gemini to it, and watched it build a working iOS app from a single prompt."

#### Product Tiers (If This Became a Real Product)

| Tier | Target | What They Get | Price |
|---|---|---|---|
| **Free** | Individual devs trying it out | 2 hours/month of sandbox time, 1 concurrent sandbox | $0 |
| **Pro** | Indie developers, small teams | 40 hours/month, 3 concurrent, persistent environments | $49/mo |
| **Team** | Startups, agencies | 200 hours/month, 10 concurrent, shared templates, team management | $199/mo |
| **Enterprise** | Large iOS teams | Unlimited, dedicated hardware, SLA, SSO, custom Xcode versions, on-prem option | Custom |

---

## Team

*[To be filled in]*

## License

MIT

*[To be filled in]*

## License

MIT
