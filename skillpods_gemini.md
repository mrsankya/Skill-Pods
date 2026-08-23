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
