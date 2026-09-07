# Skill-Pods Project Context & Memory

## Overview
**Skill-Pods** is a full-stack platform designed to connect SMEs (Small & Medium Enterprises), Students, Mentors, and Colleges. It turns real SME problem statements into production-ready software solutions built by student skill pods guided by industry mentors, featuring real-time telemetry, verifiable skill passports, project marketplace monetization, sprint milestone gating, and cross-department placement intelligence.

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (framer-motion v12), Lucide React icons, Canvas 3D character avatars (`StudentCharacter3D`, `MentorCharacter3D`, `SmeCharacter3D`, `CollegeCharacter3D`, `HeroShader`).
- **Backend**: Express.js with custom Vite middleware integration (`server.ts` & `server/app.ts`), Node.js / TSX.
- **Database & Auth**: Persistent JSON/SQLite file database (`data/skillpods.json` via `server/db.ts`) with Node `crypto` PBKDF2/SHA-512 password hashing and token session management (`/api/auth/register`, `/api/auth/login`, `/api/auth/google`, `/api/auth/me`, `/api/auth/logout`).
- **Security & DDoS Protection (`server/security.ts`)**: Enterprise Rate Limiter (sliding window brute-force defense), Security HTTP headers (no-sniff, SAMEORIGIN frame defense, XSS-Protection, HSTS), HMAC-SHA256 JWT cryptographic session signing, input sanitization against XSS, and Security Audit Logging (`/api/admin/security-audit`).
- **Google OAuth 2.0 Identity**: Dedicated Google Sign-In pipeline with automatic role provisioning (`/api/auth/google`).
- **Deployment**: Vercel ready (`vercel.json`, `api/index.ts`), Docker containerized (`Dockerfile`, `.dockerignore`), Render / Railway / Cloud Run ready (`npm run build && npm start`).
- **Design Tokens**: Dark luxury purple cyberpunk canvas (`#08070d`, `#171422`, `#201c2e`, `#261543`), glowing lavender glassmorphism (`.lavender-glass-card`, `.theme-lavender-canvas`, `.lavender-pill-btn-dark`), high-contrast accessible typography and glowing pill badges.

## Pre-Seeded Evaluation Accounts (1-Click Demo Logins)
- 🎓 **Student**: `dev.patel@skillpods.io` / `password123` (Dev Patel - Computer Science & Engineering)
- 🏢 **SME Company**: `kestrel@freight.com` / `password123` (Kestrel Freight & Logistics)
- 👨‍🏫 **Industry Mentor**: `sarah.chen@cloudflare.com` / `password123` (Sarah Chen - Staff Eng @ Cloudflare)
- 🏫 **College Dean**: `dean@nit.edu` / `password123` (National Institute of Technology)

## Role Dashboards & Features

### 1. Student Dashboard (`StudentDashboard.tsx`)
- 🤖 **AI Skill Match (`StudentAiSkillMatch.tsx`)**: Automated problem matching with fit scoring (96% Match, 91% Match), matched & missing competencies breakdown, and 1-click match application.
- 📊 **Pod Match Score Engine**: Real-time synergy scoring benchmarks student verified competencies against open SME problems.
- 💼 **Project Marketplace & 💰 Monetization (`StudentMarketplace.tsx`)**: Dedicated marketplace for students to list college and capstone projects under 3 monetization models: *Commercial License*, *Full IP Buyout*, or *SME Pilot Upgrade*.
- 📈 **Project Interest Analytics**: Inbound corporate buyer views, inquiries counter, shortlisted tracker, and offer manager.
- 🪪 **Verified Skill Passport & 🏆 Contribution Score (`StudentSkillPassport.tsx`)**: Cryptographically stamped digital passport with SHA-256 hash, verified industry mentor stamps (*Sarah Chen @ Cloudflare*, *Marcus Vance @ Datadog*), and measurable contribution score (94/100, 42 PRs, 18.4k lines of code).
- 🔄 **Project Reuse / Upgrade**: Enterprise v2.0 upgrade engine to spin up student pods for commercial modernization.
- 💵 **Earnings Wallet (`StudentEarningsWallet.tsx`)**: Financial ledger tracking sprint stipends, commercial software licensing royalties, escrow balances, and instant withdrawal modal.
- 🎓 **Academic Scorecard & Document Vault**: Official CGPA standing (e.g. `9.24 / 10.00`), semester class, placement eligibility badge, verified industry certificates vault, and official semester marksheet/transcript uploader with full-screen document lightbox previewer.
- 🌐 **Community Network Directory (`CommunityNetworkModal.tsx`)**: LinkedIn-style professional community hub allowing Students, SMEs, Mentors, and Admins to browse verified profiles, search by skills/institution/company, filter by roles, and inspect verified marksheet/certificate vaults.
- 💬 **Private Direct 1-on-1 Messaging System (`DirectMessagingModal.tsx`)**: End-to-end private messaging between Students, SMEs, and Mentors with quick icebreaker prompts, active thread management, and real-time message exchange.
- 🛡️ **SuperAdmin Exclusive Chat Supervision (`/api/admin/all-chats`)**: Strict privacy architecture where no ordinary user can access another's chat, but SuperAdmin (`sanketbhende0@gmail.com`) has a dedicated Global Audit View for safety, anti-fraud, and compliance monitoring.

## Experimental Labs & Next-Gen Testing Suite (`[🧪 IN TESTING]` & `[⚡ BETA]`)
- 🎙️ **Real-Time WebRTC Pod Sprint Room (`LivePodRoomModal.tsx`)**: 4-participant video/audio room with screen-sharing, WebRTC mesh latency radar, and in-room chat.
- 🤖 **GURU AI Co-Pilot & Security Scanner (`GuruCopilotModal.tsx`)**: Automated problem decomposition into 5 developer Kanban tasks + AST pull request OWASP security scanner.
- 💼 **Corporate Recruiter & Talent Access Portal (`RecruiterHiringModal.tsx`)**: Direct student hiring interface filtered by verified LOC, placement readiness score, and mentor endorsements.
- 🎙️ **SME Voice Problem-to-PRD AI (`SmeVoicePrdModal.tsx`)**: In-browser speech-to-text converting spoken business pain points into technical PRDs with budget recommendations.
- 🏫 **NAAC & NIRF Accreditation Exporter (`NaacReportModal.tsx`)**: 1-click official audit certificate for NAAC Criterion 3.5.1 / 5.2.1 and NIRF metrics.
- 📊 **GURU AI Investor Pitch Deck (`PitchDeckModal.tsx`)**: 5-slide venture memo generator for student projects.
- 🏆 **National Skill Pods Leaderboard (`PodLeaderboardModal.tsx`)**: Weekly XP, commit velocity, and milestone completion streaks.
- 💻 **In-Browser API & Telemetry Testbench (`ApiSandboxModal.tsx`)**: Live REST endpoint tester with JSON response viewer and round-trip latency benchmarking.
- 📧 **Security Login Email Alert Dispatcher**: Automatic logging and security email dispatch upon user or SuperAdmin login.
- 💳 **Escrow Vault & UPI Gateway Simulator (`EscrowPaymentModal.tsx`)**: Milestone fund locking and automated release upon mentor sign-off.
- 📄 **Verified PDF Skill Passport & QR Code Scanner (`StudentSkillPassport.tsx`)**: Print-ready cryptographic certificate with scannable QR verification.
- 🔔 **Real-Time Notification Bell Dropdown (`Navbar.tsx`)**: Dropdown alert system for cohort events.

## Production Deployments & URLs
- 🌐 **Cloudflare Pages Production URL**: `https://skill-pods.pages.dev`
- 🐙 **GitHub Repository**: `https://github.com/Sakshi-patil48/Skill-Pods.git` (`main` branch)
- 🗄️ **MongoDB Atlas Cloud Cluster**: `cluster0.b7x8wdz.mongodb.net/skillpods`
- 👑 **SuperAdmin Account**: `sanketbhende0@gmail.com`

## Backend Deployment Guide (Render, Railway, Fly.io, or Vercel)
- **Frontend**: Live on Cloudflare Pages (`https://skill-pods.pages.dev`).
- **Backend Node.js/Express API**: The codebase has a unified `server.ts` / `server/app.ts` that can run standalone on **Render**, **Railway**, **Fly.io**, or **Vercel Serverless Functions**.
  - **Render / Railway**: Connect GitHub repo &rarr; Set Build Command: `npm install && npm run build` &rarr; Start Command: `node dist/server.cjs` &rarr; Set Environment Variable `MONGODB_URI`.

### 2. SME Dashboard (`SmeDashboard.tsx`)
- 🤖 **AI Pod Recommendation (`SmeAiPodRecommendation.tsx`)**: Matches and ranks top 3 student pods for posted business problems based on tech stack synergy, velocity, and mentor availability.
- 🎯 **Pod Comparison Tool**: Side-by-side comparison modal evaluating pods on Match %, Velocity, Test Coverage, Latency SLA, and Delivery ETA.
- 🛒 **Student Project Marketplace (`SmeStudentMarketplace.tsx`)**: SME buyer portal to inspect pre-built student solutions, test live demos, and submit direct licensing or buyout offers.
- 🔁 **Reuse Existing Project**: Option to adopt existing student repositories and fund an upgrade pod rather than building from scratch.
- 📦 **Project Acceptance Gate (`SmeAcceptanceGate.tsx`)**: Formal milestone delivery inspection room to inspect pull requests, Cypress test pass rates, Accept & Disburse Escrow Bounties, or Request Changes.

### 3. Mentor Dashboard (`MentorDashboard.tsx`)
- 🚦 **Milestone Gate (`MentorMilestoneGate.tsx`)**: Sprint blocking stage gates requiring explicit mentor inspection and sign-off before student pods can advance to subsequent development stages.
- 🧠 **Skill Verification & 📊 Contribution Verification (`MentorSkillVerification.tsx`)**: Mentors review student deliverables, grant "Verified ✓" competency stamps with evidence notes, and audit contribution score distributions.
- ⚠️ **Pod Health Alert System (`MentorPodHealthAlerts.tsx`)**: Real-time anomaly radar for slowing velocity, blocked PR dependencies, and uneven workload distribution.
- 📋 **Permanent Review History**: Permanent audit trail for all architecture and code passes.

### 4. College Dashboard (`CollegeDashboard.tsx`)
- 🪪 **Student Skill Passport Directory (`CollegeSkillPassportView.tsx`)**: Institutional roster of cryptographically signed student skill passports for dean and placement cell verification.
- 💡 **Innovation & IP Registry (`CollegeIpRegistry.tsx`)**: Tracks college software IP lifecycle (*Verified* &rarr; *Listed* &rarr; *Inquiry* &rarr; *Commercialized*), student inventors, and college fund royalties.
- 🏢 **Industry Engagement Score & 📊 Department Comparison (`CollegeDepartmentComparison.tsx`)**: Cross-department benchmark matrix (CSE vs IT vs AI/DS vs ECE), placement readiness indices, and total commercial software value generated.

## Backend REST API Endpoints (`server/app.ts` & `server/db.ts`)
- `POST /api/auth/register` — Create new student, SME, mentor, or college account.
- `POST /api/auth/login` — Authenticate and issue session token.
- `GET /api/auth/me` — Verify active token and retrieve session profile.
- `POST /api/auth/logout` — Invalidate user session.
- `GET /api/marketplace/projects` — Returns student projects listed on marketplace.
- `POST /api/marketplace/inquire` — Submits SME licensing and buyout inquiries.
- `GET /api/student/skill-passport` — Returns verified student passport with SHA-256 hash.
- `POST /api/mentor/verify-skill` — Grants mentor verification stamps on skills.
- `GET /api/mentor/milestone-gates` — Retrieves active sprint gating milestones.
- `POST /api/mentor/milestone-gate/approve` — Unlocks next sprint stage.
- `POST /api/mentor/milestone-gate/request-changes` — Submits mentor revision notes.
- `GET /api/college/ip-registry` — Returns institutional IP assets portfolio.
- `GET /api/college/departments` — Returns department engagement and placement analytics.
- `GET /api/sme/pod-recommendations` — Returns ranked AI pod recommendations for SME problems.

## Deployment Instructions

### 1. Local Development
```bash
# Double click run_project.bat OR run:
npm run dev
```

### 2. Vercel Deployment (1-Click)
- Push repository to GitHub.
- Import project into [Vercel](https://vercel.com).
- Build command: `vite build`
- Output directory: `dist`
- Serverless API handled automatically via `api/index.ts` and `vercel.json`.

### 3. Docker / Render / Railway / Cloud Run
```bash
# Build Docker image
docker build -t skillpods:latest .

# Run Docker container
docker run -p 3000:3000 -e PORT=3000 skillpods:latest
```

## Recent Interactive UI Enhancements (Localhost Tested)
- 🎡 **Parabolic Arc Continuous Orbital Animation (`InnovationCarousel.tsx`)**: 11 profile/builder cards continuously glide from left-to-right along the parametric quadratic Bézier curve with pause-on-hover, soft boundary wrap-around fading, and apex bloom elevation.
- 🔦 **Interactive 4-Stage Torch Lamp (`LoginPage.tsx`)**: The realistic overhead wall sconce lamp now acts as a multi-tap flashlight (Level 1: Soft Glow, Level 2: Bright, Level 3: Turbo Max High-Beam, Level 4: Stealth Darkness Mode OFF) with dynamic downlight cones, micro floating indicator pill badges, and realistic wall illumination.
- 🚀 **Official Brand Favicon (`index.html` & `public/favicon.jpg`)**: Integrated the official diamond-rocket SkillPods brand icon as the website favicon and Apple touch icon.
- 📑 **Complete Prototype Walkthrough & Technical Defense Dossier (`public/SkillPods_Prototype_Technical_Dossier.pdf` & `public/prototype_dossier.html`)**: Complete 4-page defense manual with simple English presenter scripts ("🗣️ What to say to the jury"), mathematical algorithm breakdowns, end-to-end prototype demo guide, and 12-question viva cheat sheet.
- 🗑️ **Portfolio & Resume Links Cleaned**: Removed developer portfolio modal and all portfolio trigger buttons across Navbar, Footer, Community Modal, and Student Dashboard for cleaner corporate portal presentation.
- 📸 **Real-World SME On-Site Discovery & Pod Cohorts Sliding Strip (`HeroImageShowcase.tsx`)**: Added a continuous left-to-right animated sliding photo marquee directly below the main hero CTA buttons featuring on-site SME manufacturing plant visits (Bhagyashree Polymers), computer lab sprint sessions, jury milestone defense presentations, and team cohort photographs with pause-on-hover and full-screen high-resolution lightbox modal.
- 📱 **Mobile Menu & Navigation Drawer (`Navbar.tsx`)**: Full mobile drawer supporting one-tap navigation to Community Directory, Direct Messaging, User Role Dashboard with session resumption, and animated responsive backdrop.
- 📇 **Clickable Email & Hotline Links (`DocsModal.tsx` & `Footer.tsx`)**: Upgraded all contact details with one-touch `mailto:` addresses (`sme-partners@skillpods.io`, `campus-cohorts@skillpods.io`, `mentorship@skillpods.io`, `support@skillpods.io`), toll-free phone hotlines (`tel:+918005557788`, `tel:+912067890123`), and WhatsApp business coordinator chat.
- 🚫 **Dedicated 404 Error & Recovery View (`NotFoundPage.tsx`)**: Created high-end cyberpunk 404 Not Found screen with diagnostic telemetry radar, route recovery buttons (Home, Workspace, Community), and fallback handling.
- 🏷️ **Dynamic Document Titles & Meta Descriptions (`App.tsx` & `index.html`)**: Real-time document title synchronization across landing, login, 404, and role-specific dashboards (Student, Mentor, SME, College, Admin), along with OpenGraph and Twitter Card metadata.
- 📦 **Modular Empty State Component (`EmptyState.tsx`)**: Reusable empty state view with customizable title, icon, description, and primary action triggers for zero-item lists and search states.
- 🔔 **Dismissable Toast Notifications & Alert System**: Upgraded toast feedback with auto-dismiss, pulse indicators, and manual close triggers.
- 📊 **Official SIH26043 6-Slide Executive Pitch Deck & PDF (`SkillPods_SIH26043_Official_Presentation.pdf` & `public/sih_presentation_deck.html`)**: Complete 6-slide landscape presentation generated and verified with ReportLab (`onFirstPage` / `onLaterPages` canvas callbacks) and HTML interactive deck for Problem Statement **SIH26043** (Govt of Jharkhand / MIC), covering Proposed Solution, Technical Approach & Stack, Feasibility & Risk Mitigation, Social/Economic/Academic Impact, and NEP 2020 & Open Innovation references.
- 🗺️ **Complete Technology Map & Systematic Technical Architecture PDF (`SkillPods_Complete_Technology_Map_and_Architecture.pdf` & `public/SkillPods_Complete_Technology_Map_and_Architecture.pdf`)**: Comprehensive 11-page publication-grade PDF generated via `generate_technology_map_pdf.py` using ReportLab and a two-pass `NumberedCanvas`. Formally documents all 14 structured architectural areas: 11 preserved core sections (Languages, Frontend, Backend, Database, Auth/Security, AI, Testing, Build/Deployment, Python Docs, File Assets, Prototype Audit of simulated README features) + Complete Final Multi-Tier Architecture + Confirmed Recent Interactive Features (Bézier Carousel, 4-Stage Lamp, Direct Messaging, Document Vault, Escrow Simulator) + Strategic 5-Phase Production Roadmap (LiveKit SFU, Postgres + pgvector, Razorpay, GitHub Webhooks, MQTT IoT).
- 📑 **Comprehensive Project Master Dossier & Ecosystem Flow PDF (`SkillPods_Complete_Project_Master_Dossier.pdf` & `Skill-Pods-main/public/SkillPods_Complete_Project_Master_Dossier.pdf`)**: Complete 6-page master specification answering all strategic, operational, technical, and ecosystem questions: (1) Core Platform functionality, (2) Pre-SkillPods problems vs Solutions, (3) Key innovations (Pod synergy, SHA-256 passports, Voice PRD AI, Escrow gating), (4) Full multi-tier technology architecture, (5) Stakeholder flows (SME, Student, University), (6) Roles & involvement matrix, (7) Technical feasibility & economic viability, (8) Expected impacts (3x placement, 80% SME cost reduction, NAAC Criteria 3.5.1/5.2.1), (9) Complete end-to-end 8-phase ecosystem lifecycle. Generated via `generate_master_dossier_pdf.py` with ReportLab and two-pass `MasterNumberedCanvas`.

## 🎯 SIH26043 Strategic Transformation Architecture (Govt of Jharkhand & MIC)
- **Problem Statement ID**: SIH26043
- **Title**: A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships
- **Creators**: Sarim Moin, Government of Jharkhand (Ministry of Education's Innovation Cell - MIC)
- **Core Pillars**:
  1. Citizen & Community Crowdsourcing (PRIs, ULBs, citizens across 24 Jharkhand districts, multimedia evidence, GPS location).
  2. AI Problem Management (10 thematic domains, semantic deduplication, automated HEI university routing).
  3. University & Multidisciplinary Pod Collaboration (Faculty mentors, 3-student pods, NEP 2020 experiential learning).
  4. Industry, Startup & CSR Partnership (CSR funding, MSMEs, prototyping, pilot testing, tech transfer).
  5. Project Lifecycle Management (Milestones, field testing, PRI validation, patent/IP generation).
  6. Government of Jharkhand & MIC Visual Analytics Dashboard (24-district heatmap, domain analytics, social ROI).
  7. Omnichannel Notification & Stakeholder Engagement.

### ✅ Completed SIH26043 Enhancements (Preserving SkillPods Core):
1. **Types & Data Contracts (`src/types.ts`)**: Added `ThematicDomain` (10 SIH domains), `JharkhandDistrict` (24 districts), `SubmitterType`, extended `SmeProblem` with societal fields, and added `societalImpactBadges` to `VerifiedSkillPassport`.
2. **Dual Problem Intake (`SubmitProblemModal.tsx`)**: Tabbed toggle between `🏢 SME / Enterprise Problem` and `🏛️ Societal Challenge (SIH26043)` with submitter authority selection, 10 thematic domains, 24 Jharkhand districts, and field evidence verification.
3. **Student AI Skill Match (`StudentAiSkillMatch.tsx`)**: Added category filter pills (`All`, `🏛️ Societal`, `🏢 SME`), authentic Jharkhand regional challenges (Khunti Water, Dumka Forest Produce/Millets), and real-world societal impact banners.
4. **Skill Passport Social Impact Audit (`StudentSkillPassport.tsx`)**: Dedicated `NEP 2020 Societal Innovation & Community Impact Audit` card with verified community impact hours, district of deployment, and mentor/PRI sign-off.
5. **College Regional Impact Hub (`CollegeSocietalImpactView.tsx` & `CollegeDashboard.tsx`)**: Added `🏛️ Societal Innovation (SIH26043)` tab in College Dashboard tracking 38 community challenges, 14 active student pods, ₹4.85L CSR grants, and NAAC 3.5.1 score (98/100).
6. **Hero Section Tagging (`HeroSection.tsx`)**: Added glowing SIH26043 Govt of Jharkhand & MIC badge and updated problem CTA.
7. **Public Societal Dashboard (`PublicSocietalDashboard.tsx`)**: Created a dedicated, unauthenticated public portal featuring live challenge cards across Jharkhand, 10-domain filter bar, 24-district selector, live upvoting counter, "Track My Issue" ticket lookup, and 5-stage community solution radar.
8. **Navigation & Route Wiring (`Navbar.tsx`, `HeroSection.tsx`, `App.tsx`)**: Wired `PUBLIC PORTAL (SIH26043)` button into Navbar and `PUBLIC DASHBOARD` CTA in HeroSection, plus `#public` / `/public` hash route integration in `App.tsx`.
9. **Production Build & Dev Server Verified**: `npm run build` compiled 2,130 modules with exit code 0. Dev server active and running on `http://localhost:3000`.
10. **Comprehensive Mobile Optimization**:
    - `PublicSocietalDashboard.tsx`: Header now wraps gracefully with compact logo and text; hero stats adapt to a responsive 2x2 grid; citizen tracking search form stacks vertically on phones; 10-domain filter bar features smooth horizontal touch-scrolling with a scroll hint; district dropdown expands to full width; challenge cards format upvote & grant pills cleanly; and 5-stage lifecycle radar uses responsive labels for zero horizontal overflow.
    - `SubmitProblemModal.tsx`: Dual-mode toggle tabs stack on small viewports with truncated labels; modal max height adjusted to `92vh` with inner scrolling; footer buttons adapt cleanly for full touch targets.
    - `CollegeSocietalImpactView.tsx`: Top banner stats adapt to 2x2 grid; search and district filter stack on mobile; grant badges adapt to flow naturally without layout breaks.
11. **Non-Tech Multi-Modal Citizen Problem Intake (`CitizenEasySubmitModal.tsx`)**:
    - Dedicated simplified intake built for ordinary villagers, Gram Pradhans, and non-tech citizens to upload challenges with zero technical friction.
    - **🤖 AI Chatbot Guide**: Conversational Hindi/English assistant with one-tap suggestion chips that guides citizens step-by-step (*"Namaste! Aapki samasya kis cheez se judi hai?"* &rarr; *District & Block* &rarr; *Automatic Triage*).
    - **🎙️ Voice Note Recording**: One-touch mic recorder allowing citizens to describe their problem in spoken language, automatically transcribed by AI into formal engineering PRDs.
    - **📸 Direct Photo Upload**: Multi-photo camera/gallery capture of broken handpumps, village roads, crops, and landfills for engineering pods to inspect.
    - **📹 Short Video Clip (15-60s)**: Video upload for on-site walk-throughs with audio explanations.
    - **📝 Simple 3-Field Form**: Ultra-simple alternative form requesting only District, Village Block, and optional phone number for SMS tracking.
    - **Immediate Live Integration**: Problems submitted via the modal immediately appear live at the top of the Public Societal Dashboard with an instant tracking ticket (e.g. `JH-KHU-7201`) and live upvoting.
12. **Production Verification**: `npm run build` cleanly compiled 2,132 modules with Exit Code 0. Dev server active on port 3000.
13. **Multi-Lingual Support & 231 National SIH Problem Statements Bank**:
    - **🌐 Multi-Lingual Engine (`src/data/translations.ts`)**: Built comprehensive dictionary supporting **English (`en`)**, **हिन्दी (`hi`)**, and **मराठी (`mr`)** for all portal labels, headers, filter pills, buttons, tracking alerts, and card metadata. Language switcher is pinned in the top navigation header for 1-tap switching.
    - **📑 All 231 Official SIH 2026 Problem Statements Ingested (`src/data/sih_problem_statements.json`)**: Extracted and parsed every problem statement from `c:\Users\sanke\Downloads\updated ps.pdf` across 20 pages. Fields include `id`, `ticketNo` (`SIH26001` - `SIH26231`), title, category (`Software` / `Hardware`), live submission count, and 17 official SIH themes. Includes Problem Statement #43 (`SIH26043` - Govt of Jharkhand).
    - **🎛️ 3-Tab Filter Navigation**: Seamless switching between:
      - `All Challenges (237+ Loaded)`
      - `🏛️ Local Jharkhand (Grassroots PRI/ULB Challenges)`
      - `🏆 SIH 2026 Hackathon Bank (231 Official National PS)`
    - **💻 / ⚡ Category Pill Toggles**: 1-click filtering between `Software (187 PS)` and `Hardware (44 PS)` with instant count indicators.
    - **🎯 1-Click PS Adoption for University Hackathons**: Every SIH problem card includes an `"Adopt for Hackathon"` button that copies the complete PS specification, ticket number, category, and theme directly to the clipboard with animated `"Adopted to Clipboard! ✓"` feedback.
    - **📥 Batch Export for College Hackathon Organizers**: Dedicated `"Export for Hackathon (.txt)"` button downloads the entire 231-problem statement bank as a formatted plain text file for internal college hackathon distributions.
    - **⚡ Smooth Mobile Pagination**: Added progressive loading (showing 24 cards initially with `"Load More (+24)"` and `"Show All"` buttons) to ensure instantaneous rendering and zero lag on mobile devices.

