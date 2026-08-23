import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { MongoClient, Db } from 'mongodb';
import {
  PodData,
  MarketplaceProject,
  VerifiedSkillPassport,
  MilestoneGateItem,
  CollegeIPRegistryItem,
  DepartmentAnalytics,
  UserRole,
  CertificateItem,
  MarksheetItem,
  CommunityMember,
  DirectMessage
} from '../src/types';

export interface UserAccount {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  name: string;
  role: UserRole;
  avatar?: string;
  photoUrl?: string;
  bio?: string;
  googleId?: string;
  authProvider?: 'local' | 'google';
  organization?: string;
  department?: string;
  college?: string;
  rollNo?: string;
  gradYear?: string;
  cgpa?: string;
  semester?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  certificates?: CertificateItem[];
  marksheets?: MarksheetItem[];
  lastLogin?: string;
  createdAt: string;
}

export interface UserSession {
  token: string;
  userId: string;
  email: string;
  role: UserRole;
  createdAt: string;
  expiresAt: string;
}

export interface SecurityAuditLog {
  id: string;
  userId?: string;
  userEmail?: string;
  action: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'REGISTER' | 'GOOGLE_AUTH' | 'LOGOUT' | 'UNAUTHORIZED_ACCESS' | 'SKILL_VERIFIED' | 'ESCROW_RELEASE';
  ip: string;
  status: 'SUCCESS' | 'BLOCKED' | 'WARNING';
  details?: string;
  timestamp: string;
}

export interface WalletTransaction {
  id: string;
  userEmail: string;
  title: string;
  source: string;
  category: 'Licensing' | 'Bounties' | 'Grants';
  amount: string;
  status: string;
  reference: string;
  date: string;
}

interface DatabaseSchema {
  users: UserAccount[];
  sessions: UserSession[];
  securityLogs: SecurityAuditLog[];
  pods: PodData[];
  marketplaceProjects: MarketplaceProject[];
  skillPassports: VerifiedSkillPassport[];
  milestoneGates: MilestoneGateItem[];
  collegeIpRegistry: CollegeIPRegistryItem[];
  departmentAnalytics: DepartmentAnalytics[];
  walletTransactions: WalletTransaction[];
  messages: DirectMessage[];
  metrics: {
    uptimeSla: number;
    avgLatencyMs: number;
    projectsShipped: number;
    apiRequestsToday: number;
    activePods: number;
    activeStudents: number;
    industryMentors: number;
    liveSmeProblems: number;
  };
}

const DATA_DIR = process.env.VERCEL ? path.resolve('/tmp', 'data') : path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'skillpods.json');

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {
  // Silent fallback for restricted environments
}

// Password hashing using Node crypto PBKDF2
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const calculated = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    const calcBuf = Buffer.from(calculated, 'hex');
    const hashBuf = Buffer.from(hash, 'hex');
    if (calcBuf.length !== hashBuf.length) return false;
    return crypto.timingSafeEqual(calcBuf, hashBuf);
  } catch {
    return false;
  }
}

// Initial Seed Data
function getSeedData(): DatabaseSchema {
  const studentPw = hashPassword('password123');
  const smePw = hashPassword('password123');
  const mentorPw = hashPassword('password123');
  const collegePw = hashPassword('password123');
  const adminPw = hashPassword('password123');

  return {
    users: [
      {
        id: 'usr-superadmin-01',
        email: 'sanketbhende0@gmail.com',
        passwordHash: adminPw.hash,
        salt: adminPw.salt,
        name: 'Sanket Bhende (SuperAdmin)',
        role: 'admin',
        organization: 'SkillPods Core Operations',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-admin-01',
        email: 'admin.root@skillpods.io',
        passwordHash: adminPw.hash,
        salt: adminPw.salt,
        name: 'SuperAdmin Root',
        role: 'admin',
        organization: 'SkillPods Platform Operations',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-student-01',
        email: 'dev.patel@skillpods.io',
        passwordHash: studentPw.hash,
        salt: studentPw.salt,
        name: 'Dev Patel',
        role: 'student',
        department: 'Computer Science & Engineering',
        college: 'National Institute of Technology',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-sme-01',
        email: 'kestrel@freight.com',
        passwordHash: smePw.hash,
        salt: smePw.salt,
        name: 'Kestrel Freight & Logistics',
        role: 'sme',
        organization: 'Kestrel Freight Logistics Inc.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-mentor-01',
        email: 'sarah.chen@cloudflare.com',
        passwordHash: mentorPw.hash,
        salt: mentorPw.salt,
        name: 'Sarah Chen',
        role: 'mentor',
        organization: 'Cloudflare',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-college-01',
        email: 'dean@nit.edu',
        passwordHash: collegePw.hash,
        salt: collegePw.salt,
        name: 'National Institute of Technology',
        role: 'college',
        college: 'National Institute of Technology',
        createdAt: new Date().toISOString()
      }
    ],
    sessions: [],
    securityLogs: [
      {
        id: 'sec-01',
        userEmail: 'dev.patel@skillpods.io',
        action: 'LOGIN_SUCCESS',
        ip: '127.0.0.1',
        status: 'SUCCESS',
        details: 'Local password authenticated via SHA-512 PBKDF2',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'sec-02',
        userEmail: 'sarah.chen@cloudflare.com',
        action: 'SKILL_VERIFIED',
        ip: '127.0.0.1',
        status: 'SUCCESS',
        details: 'Cryptographic skill verification stamp issued to Dev Patel',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }
    ],
    metrics: {
      uptimeSla: 99.94,
      avgLatencyMs: 48,
      projectsShipped: 4839,
      apiRequestsToday: 10482910,
      activePods: 24,
      activeStudents: 642,
      industryMentors: 118,
      liveSmeProblems: 37,
    },
    pods: [
      {
        id: "pod-101",
        name: "Pod Apex-2",
        title: "AI Invoice & Ledger Auto-Reconciliation",
        sme: "Kestrel Logistics & Freight",
        stage: 3,
        stageName: "Prototype & MVP",
        progress: 68,
        mentor: "Sarah Chen (Staff Eng @ Cloudflare)",
        students: [
          { name: "Dev Patel", role: "Full-Stack Lead" },
          { name: "Maya Lin", role: "Backend / Golang" },
          { name: "Rohan Gupta", role: "AI Pipeline" }
        ],
        techStack: ["React", "FastAPI", "PostgreSQL", "Docker", "Tailwind"],
        latency: "42ms",
        health: "Operational",
        lastCommit: "feat: implemented webhook deduplication and OCR confidence scores",
        updatedAt: new Date().toISOString(),
        demoUrl: "https://demo.kestrel-recon.skillpods.io",
        matchScore: 96,
        matchReasons: [
          "100% FastAPI & Vector Search synergy",
          "Lead Dev Patel built DocuQuery AI RAG pipeline",
          "Sarah Chen (Cloudflare) assigned as Principal Mentor"
        ],
        healthAlert: "None (Velocity 94/100, 2 days ahead of schedule)",
        milestoneGateStatus: "APPROVED"
      },
      {
        id: "pod-102",
        name: "Pod Nova-7",
        title: "Cold Chain Telemetry & Sensor Mesh",
        sme: "Verdant Organics Cold Storage",
        stage: 4,
        stageName: "Testing & Iteration",
        progress: 86,
        mentor: "Marcus Vance (Principal Architect @ Datadog)",
        students: [
          { name: "Elena Rostova", role: "IoT Firmware" },
          { name: "Alex Thorne", role: "Frontend Visualization" },
          { name: "Kavya Nair", role: "Time-Series DB" }
        ],
        techStack: ["React 19", "TimescaleDB", "MQTT", "Go", "WebSockets"],
        latency: "38ms",
        health: "Operational",
        lastCommit: "fix: threshold alert backoff during network partitions",
        updatedAt: new Date().toISOString(),
        demoUrl: "https://demo.verdant-iot.skillpods.io",
        matchScore: 92,
        matchReasons: [
          "Deep timeseries & TimescaleDB compression expertise",
          "Low-latency MQTT broker connection pooling",
          "Marcus Vance (Datadog) assigned as mentor"
        ],
        healthAlert: "Velocity dropped 22% &mdash; 3 PRs blocked on TimescaleDB hypertables migration",
        milestoneGateStatus: "PENDING_REVIEW"
      },
      {
        id: "pod-103",
        name: "Pod Horizon-5",
        title: "Local Delivery Dispatch & Route Optimization",
        sme: "Metropolis Artisan Bakeries Co.",
        stage: 5,
        stageName: "Launch & Scale",
        progress: 98,
        mentor: "David Kim (VP Eng @ Stripe)",
        students: [
          { name: "Samir Al-Mansoor", role: "Lead Systems" },
          { name: "Chloe Zheng", role: "Mobile PWA" },
          { name: "Liam O'Connor", role: "DevOps & CI/CD" }
        ],
        techStack: ["Next.js", "Express", "Redis", "Google Maps API", "Docker"],
        latency: "51ms",
        health: "Operational",
        lastCommit: "release: v1.0.0 production deployment onto AWS ECS",
        updatedAt: new Date().toISOString(),
        demoUrl: "https://demo.metropolis-routes.skillpods.io",
        matchScore: 89,
        matchReasons: [
          "High throughput distributed caching in Redis",
          "Geospatial PostGIS sub-50ms query routing",
          "David Kim (Stripe) architecture supervision"
        ],
        healthAlert: "Optimal Health (Production deploy validated)",
        milestoneGateStatus: "APPROVED"
      }
    ],
    marketplaceProjects: [
      {
        id: "mkt-01",
        title: "DocuQuery AI - Enterprise Multi-Modal RAG Document Search",
        creatorStudent: "Dev Patel",
        studentEmail: "dev.patel@skillpods.io",
        college: "National Institute of Technology",
        category: "AI",
        description: "High-throughput semantic document search with hybrid BM25 + dense embeddings and citation verification. Proven for 500k+ enterprise contracts.",
        techStack: ["FastAPI", "Python", "React 19", "Qdrant", "Docker"],
        monetizationModel: "Commercial License",
        licensePrice: "₹1,15,000 ($1,450)",
        buyoutPrice: "₹4,60,000 ($5,800)",
        views: 342,
        inquiriesCount: 14,
        shortlistedCount: 8,
        offersReceived: 3,
        mentorVerified: true,
        mentorName: "Sarah Chen",
        mentorCompany: "Staff Eng @ Cloudflare",
        verifiedSkills: ["FastAPI", "Vector Search", "Docker", "React 19"],
        liveDemoUrl: "https://demo.docuquery.skillpods.io",
        githubUrl: "https://github.com/skillpods/docuquery-ai",
        rating: 4.9,
        commercialReadinessScore: 94,
        status: "Available",
        upgradeSuggestions: [
          "Upgrade to v2.0 for Kestrel Freight Invoice Pipeline",
          "Add multi-tenant RBAC for enterprise ERPs"
        ],
        inquiries: [
          {
            id: "inq-01",
            companyName: "Kestrel Freight & Logistics",
            contactPerson: "Rahul Verma (VP Operations)",
            type: "License",
            message: "Looking to deploy DocuQuery AI for 1,200 daily freight manifests.",
            offeredAmount: "₹1,15,000",
            date: "Aug 20, 2026"
          }
        ]
      },
      {
        id: "mkt-02",
        title: "EdgeSensor Mesh & High-Velocity MQTT Gateway",
        creatorStudent: "Elena Rostova",
        studentEmail: "elena.rostova@skillpods.io",
        college: "National Institute of Technology",
        category: "IoT",
        description: "Low-latency MQTT sensor ingest broker with automatic backpressure handling and TimescaleDB streaming compression.",
        techStack: ["Go", "TimescaleDB", "MQTT", "WebSockets", "React"],
        monetizationModel: "Full IP Buyout",
        licensePrice: "₹75,000 ($950)",
        buyoutPrice: "₹3,35,000 ($4,200)",
        views: 289,
        inquiriesCount: 11,
        shortlistedCount: 6,
        offersReceived: 2,
        mentorVerified: true,
        mentorName: "Marcus Vance",
        mentorCompany: "Principal Architect @ Datadog",
        verifiedSkills: ["Go", "MQTT", "TimescaleDB", "System Architecture"],
        liveDemoUrl: "https://demo.edgesensor.skillpods.io",
        githubUrl: "https://github.com/skillpods/edgesensor-mesh",
        rating: 4.8,
        commercialReadinessScore: 91,
        status: "Inquiry Received",
        upgradeSuggestions: [
          "Add LoRaWAN gateway support for outdoor cold rooms",
          "Integrate SMS failover alert bridge"
        ]
      }
    ],
    skillPassports: [
      {
        id: "pass-01",
        studentName: "Dev Patel",
        studentEmail: "dev.patel@skillpods.io",
        rollNo: "CS21B042",
        department: "Computer Science & Engineering",
        college: "National Institute of Technology",
        placementReadinessScore: 94,
        totalContributionScore: 94,
        totalPullRequests: 42,
        totalLinesOfCode: 18450,
        codeQualityRating: 4.95,
        signatureHash: "0x8F4A9C2B1E7D03A4E5B8C1D2E3F4A5B6C7D8E9F0",
        issuedAt: "Aug 18, 2026",
        verifiedSkills: [
          {
            name: "FastAPI & Microservices",
            category: "Backend",
            level: "Expert",
            mentorName: "Sarah Chen",
            mentorCompany: "Staff Eng @ Cloudflare",
            projectAttribution: "DocuQuery AI (Pod Apex-2)",
            verifiedDate: "Aug 18, 2026",
            linesOfCode: 6840,
            evidenceNotes: "Idempotent webhook queue with 0 memory leaks in stress testing.",
            isVerified: true
          },
          {
            name: "React 19 & State Architecture",
            category: "Frontend",
            level: "Expert",
            mentorName: "Marcus Vance",
            mentorCompany: "Principal Architect @ Datadog",
            projectAttribution: "Fleet Telemetry Hub",
            verifiedDate: "Jul 29, 2026",
            linesOfCode: 5200,
            evidenceNotes: "Optimized React 19 concurrent render loop with sub-16ms frames.",
            isVerified: true
          }
        ],
        projectContributions: [
          {
            podName: "Pod Apex-2",
            projectTitle: "DocuQuery AI - Enterprise Multi-Modal RAG Document Search",
            role: "Full-Stack Pod Lead",
            contributionPercentage: 48,
            prsMerged: 28,
            peerReviewScore: 4.9,
            mentorEndorsement: "Dev demonstrated production-tier architecture rigor in handling asynchronous OCR queues with high idempotency."
          }
        ]
      }
    ],
    milestoneGates: [
      {
        id: "gate-101",
        podId: "pod-101",
        podName: "Pod Apex-2",
        projectTitle: "AI Invoice & Ledger Auto-Reconciliation",
        sprintNumber: 3,
        milestoneTitle: "Stage 3 -> Stage 4 Gate: OCR Accuracy & Idempotency Sign-off",
        currentStage: "Stage 3: Prototype & MVP",
        nextStage: "Stage 4: Testing & Iteration",
        status: "APPROVED",
        deliverables: [
          "OCR Extraction pipeline with 99.2% confidence on logistics manifests",
          "PostgreSQL schema migration with pgvector ledger balancing tables",
          "Cypress E2E stress test suite with 94.2% test coverage"
        ],
        testCoverage: "94.2%",
        ciCdPassing: true,
        mentorNotes: "Architecture review passed. Webhook deduplication validated under network partition tests. Approved for Stage 4 live testing.",
        submittedAt: "Yesterday at 4:30 PM",
        unlockedAt: "Today at 10:15 AM"
      },
      {
        id: "gate-102",
        podId: "pod-102",
        podName: "Pod Nova-7",
        projectTitle: "Cold Chain Telemetry & Sensor Mesh",
        sprintNumber: 4,
        milestoneTitle: "Stage 4 -> Stage 5 Gate: Production Load Testing & Failover Sign-off",
        currentStage: "Stage 4: Testing & Iteration",
        nextStage: "Stage 5: Launch & Scale",
        status: "PENDING_REVIEW",
        deliverables: [
          "TimescaleDB data retention policy and compression benchmarks (sub-40ms queries)",
          "SMS escalation gateway with Twilio LTE failover when primary link drops",
          "Security audit for MQTT broker TLS certificates"
        ],
        testCoverage: "91.8%",
        ciCdPassing: true,
        mentorNotes: "Awaiting final 12,000 req/sec stress test report before unlocking Production Launch.",
        submittedAt: "Today at 9:00 AM"
      }
    ],
    collegeIpRegistry: [
      {
        id: "ip-01",
        title: "DocuQuery AI - Enterprise Multi-Modal RAG Document Search",
        department: "CSE",
        leadStudent: "Dev Patel",
        teamSize: 3,
        mentor: "Sarah Chen (Staff Eng @ Cloudflare)",
        industryPartner: "Kestrel Freight & Logistics",
        status: "🚀 Commercialized",
        ipCategory: "AI Model Architecture",
        valuationOrGrant: "₹1,15,000 ($1,450)",
        commercialStatusNote: "Commercial License deployed for 1,200 daily freight manifests.",
        lastUpdated: "Jul 15, 2026"
      }
    ],
    departmentAnalytics: [
      {
        department: "Computer Science & Engineering",
        studentCount: 240,
        activeInPods: 198,
        verifiedProjectsCount: 8,
        industryEngagementScore: 82.5,
        placementReadinessScore: 91.2,
        topSkills: ["FastAPI", "React 19", "PostgreSQL", "Docker", "Redis"],
        avgBountyEarned: "₹52,500"
      },
      {
        department: "Information Technology",
        studentCount: 180,
        activeInPods: 142,
        verifiedProjectsCount: 5,
        industryEngagementScore: 78.8,
        placementReadinessScore: 86.4,
        topSkills: ["Go", "MQTT", "TimescaleDB", "AWS", "WebSockets"],
        avgBountyEarned: "₹44,000"
      }
    ],
    walletTransactions: [
      {
        id: "tx-101",
        userEmail: "dev.patel@skillpods.io",
        title: "DocuQuery AI Commercial License Fee",
        source: "Kestrel Logistics & Freight",
        category: "Licensing",
        amount: "₹1,15,000 ($1,450)",
        date: "Aug 21, 2026",
        status: "Paid Out ✓",
        reference: "Licensing Contract #KESTREL-RAG-01"
      },
      {
        id: "tx-102",
        userEmail: "dev.patel@skillpods.io",
        title: "Pod Apex-2 Sprint 3 Milestone Sign-off Bounty",
        source: "SkillPods Escrow (ABC Retail Pilot)",
        category: "Bounties",
        amount: "₹12,500",
        date: "Aug 18, 2026",
        status: "Paid Out ✓",
        reference: "Mentor Sarah Chen Approval Gate #101"
      }
    ],
    messages: []
  };
}

class DatabaseManager {
  private data: DatabaseSchema;
  private mongoClient?: MongoClient;
  private mongoDb?: Db;
  public isConnectedToMongo: boolean = false;

  constructor() {
    this.data = this.loadData();
    this.initMongo();
  }

  private async initMongo() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log('ℹ️ Local JSON document store active at:', DB_FILE);
      return;
    }

    try {
      this.mongoClient = new MongoClient(uri);
      await this.mongoClient.connect();
      this.mongoDb = this.mongoClient.db(process.env.MONGODB_DB_NAME || 'skillpods');
      this.isConnectedToMongo = true;
      console.log('✅ Connected to MongoDB Atlas Cloud Cluster!');
      await this.syncToMongo();
    } catch (err) {
      console.warn('⚠️ MongoDB Atlas connection skipped or failed, using local document store:', err);
      this.isConnectedToMongo = false;
    }
  }

  private async syncToMongo() {
    if (!this.isConnectedToMongo || !this.mongoDb) return;
    try {
      // Upsert collections
      const collections: (keyof DatabaseSchema)[] = [
        'users',
        'sessions',
        'securityLogs',
        'pods',
        'marketplaceProjects',
        'skillPassports',
        'milestoneGates',
        'collegeIpRegistry',
        'departmentAnalytics',
        'walletTransactions'
      ];

      for (const col of collections) {
        const items = this.data[col] as any[];
        if (items && items.length > 0) {
          const mongoCol = this.mongoDb.collection(col);
          for (const item of items) {
            const query = item.id ? { id: item.id } : item.token ? { token: item.token } : { email: item.email };
            await mongoCol.updateOne(query, { $set: item }, { upsert: true });
          }
        }
      }
    } catch (err) {
      console.error('Error syncing to MongoDB:', err);
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Could not read existing database file, initializing seed data.', err);
    }
    const seed = getSeedData();
    this.saveDataDirect(seed);
    return seed;
  }

  private saveDataDirect(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to database file:', err);
    }
  }

  public save() {
    this.saveDataDirect(this.data);
    if (this.isConnectedToMongo) {
      this.syncToMongo().catch(err => console.error('Mongo background save error:', err));
    }
  }

  // --- USER AUTHENTICATION & MANAGEMENT ---
  public getUserByEmail(email: string): UserAccount | undefined {
    const user = this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.email.toLowerCase() === 'sanketbhende0@gmail.com') {
      user.role = 'admin';
    }
    return user;
  }

  public getUserById(id: string): UserAccount | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(user: Omit<UserAccount, 'id' | 'createdAt'>): UserAccount {
    const isSuperAdmin = user.email.toLowerCase() === 'sanketbhende0@gmail.com';
    const newUser: UserAccount = {
      ...user,
      role: isSuperAdmin ? 'admin' : user.role,
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  public createSession(userId: string, email: string, role: UserRole): UserSession {
    // Generate secure random token
    const token = `sk_${crypto.randomBytes(32).toString('hex')}`;
    const isSuperAdmin = email.toLowerCase() === 'sanketbhende0@gmail.com';
    const session: UserSession = {
      token,
      userId,
      email,
      role: isSuperAdmin ? 'admin' : role,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };
    this.data.sessions.push(session);
    this.save();
    return session;
  }

  public getSession(token: string): UserSession | undefined {
    const session = this.data.sessions.find(s => s.token === token);
    if (!session) return undefined;
    if (new Date(session.expiresAt) < new Date()) {
      this.deleteSession(token);
      return undefined;
    }
    return session;
  }

  public deleteSession(token: string): void {
    this.data.sessions = this.data.sessions.filter(s => s.token !== token);
    this.save();
  }

  public findOrCreateGoogleUser(params: {
    googleId: string;
    email: string;
    name: string;
    avatar?: string;
    role?: UserRole;
    department?: string;
    college?: string;
    organization?: string;
  }): UserAccount {
    const isSuperAdmin = params.email.toLowerCase() === 'sanketbhende0@gmail.com' || params.email.toLowerCase().includes('admin.root');
    let user = this.data.users.find(
      u => (u.googleId && u.googleId === params.googleId) || u.email.toLowerCase() === params.email.toLowerCase()
    );

    if (user) {
      if (!user.googleId) user.googleId = params.googleId;
      if (!user.avatar && params.avatar) user.avatar = params.avatar;
      if (isSuperAdmin) user.role = 'admin';
      user.lastLogin = new Date().toISOString();
      this.save();
      return user;
    }

    const { hash, salt } = hashPassword(crypto.randomBytes(24).toString('hex'));
    const newUser: UserAccount = {
      id: `usr-g-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      email: params.email.toLowerCase(),
      name: params.name,
      avatar: params.avatar,
      googleId: params.googleId,
      authProvider: 'google',
      passwordHash: hash,
      salt,
      role: isSuperAdmin ? 'admin' : (params.role || 'student'),
      department: params.department || (params.role === 'student' ? 'Computer Science & Engineering' : undefined),
      college: params.college || (params.role === 'student' || params.role === 'college' ? 'National Institute of Technology' : undefined),
      organization: isSuperAdmin ? 'SkillPods SuperAdmin Core' : params.organization,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  public recordSecurityLog(log: Omit<SecurityAuditLog, 'id' | 'timestamp'>): SecurityAuditLog {
    if (!this.data.securityLogs) this.data.securityLogs = [];
    const newLog: SecurityAuditLog = {
      ...log,
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString()
    };
    this.data.securityLogs.unshift(newLog);
    if (this.data.securityLogs.length > 200) {
      this.data.securityLogs = this.data.securityLogs.slice(0, 200);
    }
    this.save();
    return newLog;
  }

  public getSecurityLogs(): SecurityAuditLog[] {
    return this.data.securityLogs || [];
  }

  // --- COMPREHENSIVE PROFILE & USER INPUT MUTATIONS ---
  public updateUserProfile(email: string, updates: Partial<UserAccount>): UserAccount | undefined {
    const user = this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return undefined;

    if (updates.name) user.name = updates.name;
    if (updates.avatar) user.avatar = updates.avatar;
    if (updates.photoUrl) user.photoUrl = updates.photoUrl;
    if (updates.bio !== undefined) user.bio = updates.bio;
    if (updates.college) user.college = updates.college;
    if (updates.department) user.department = updates.department;
    if (updates.rollNo !== undefined) user.rollNo = updates.rollNo;
    if (updates.gradYear !== undefined) user.gradYear = updates.gradYear;
    if (updates.cgpa !== undefined) user.cgpa = updates.cgpa;
    if (updates.semester !== undefined) user.semester = updates.semester;
    if (updates.github !== undefined) user.github = updates.github;
    if (updates.linkedin !== undefined) user.linkedin = updates.linkedin;
    if (updates.skills !== undefined) user.skills = updates.skills;
    if (updates.certificates !== undefined) user.certificates = updates.certificates;
    if (updates.marksheets !== undefined) user.marksheets = updates.marksheets;
    if (updates.organization) user.organization = updates.organization;

    this.save();
    return user;
  }

  public addSmeProblem(problem: any) {
    if (!this.data.pods) this.data.pods = [];
    const newPod: PodData = {
      id: `pod-${Date.now()}`,
      name: `Pod ${problem.title?.slice(0, 12) || 'Alpha'}`,
      title: problem.title,
      sme: problem.smeName || 'Verified Enterprise',
      stage: 1,
      stageName: 'Problem Scoping & AI Matching',
      progress: 15,
      mentor: 'Assigned on Cohort Kickoff',
      students: [],
      techStack: problem.skills || ['React', 'Node.js', 'FastAPI'],
      latency: '24ms',
      health: 'Operational',
      lastCommit: 'Sprint 0 Kickoff',
      updatedAt: 'Just now'
    };
    this.data.pods.unshift(newPod);
    this.save();
    return newPod;
  }

  // --- PODS ---
  public getPods(): PodData[] {
    return this.data.pods;
  }

  public getPodById(id: string): PodData | undefined {
    return this.data.pods.find(p => p.id === id);
  }

  public addPod(pod: PodData): void {
    this.data.pods.unshift(pod);
    this.save();
  }

  // --- MARKETPLACE ---
  public getMarketplaceProjects(): MarketplaceProject[] {
    return this.data.marketplaceProjects;
  }

  public addMarketplaceProject(project: MarketplaceProject): void {
    this.data.marketplaceProjects.unshift(project);
    this.save();
  }

  public addMarketplaceInquiry(projectId: string, inquiry: any): boolean {
    const project = this.data.marketplaceProjects.find(p => p.id === projectId);
    if (!project) return false;
    if (!project.inquiries) project.inquiries = [];
    project.inquiries.unshift(inquiry);
    project.inquiriesCount = (project.inquiriesCount || 0) + 1;
    project.offersReceived = (project.offersReceived || 0) + 1;
    this.save();
    return true;
  }

  // --- SKILL PASSPORTS ---
  public getSkillPassport(studentEmail: string): VerifiedSkillPassport | undefined {
    return this.data.skillPassports.find(p => p.studentEmail.toLowerCase() === studentEmail.toLowerCase()) || this.data.skillPassports[0];
  }

  public verifySkill(studentEmail: string, skillName: string, mentorName: string, mentorCompany: string, notes: string): boolean {
    const passport = this.data.skillPassports.find(p => p.studentEmail.toLowerCase() === studentEmail.toLowerCase());
    if (!passport) return false;
    const skill = passport.verifiedSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (skill) {
      skill.isVerified = true;
      skill.mentorName = mentorName;
      skill.mentorCompany = mentorCompany;
      skill.evidenceNotes = notes;
      skill.verifiedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } else {
      passport.verifiedSkills.push({
        name: skillName,
        category: 'Core Competency',
        level: 'Expert',
        mentorName,
        mentorCompany,
        projectAttribution: 'Skill Pods Project',
        verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        linesOfCode: 3500,
        evidenceNotes: notes,
        isVerified: true
      });
    }
    this.save();
    return true;
  }

  // --- MILESTONE GATES ---
  public getMilestoneGates(): MilestoneGateItem[] {
    return this.data.milestoneGates;
  }

  public updateMilestoneGate(gateId: string, status: 'APPROVED' | 'CHANGES_REQUESTED', notes: string): MilestoneGateItem | null {
    const gate = this.data.milestoneGates.find(g => g.id === gateId);
    if (!gate) return null;
    gate.status = status;
    gate.mentorNotes = notes;
    if (status === 'APPROVED') {
      gate.unlockedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      gate.changeRequests = [notes];
    }
    this.save();
    return gate;
  }

  // --- COMMUNITY NETWORK & DIRECTORY ---
  public getCommunityMembers(query?: string, roleFilter?: string): CommunityMember[] {
    const members: CommunityMember[] = this.data.users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar || u.photoUrl,
      bio: u.bio || (u.role === 'student' ? 'Full-stack student builder in Pod Apex-2' : u.role === 'mentor' ? 'Industry Mentor & Code Reviewer' : 'Enterprise Sponsor'),
      college: u.college || (u.role === 'student' ? 'National Institute of Technology' : undefined),
      organization: u.organization || (u.role === 'mentor' ? 'Razorpay' : u.role === 'sme' ? 'Kestrel Freight' : undefined),
      department: u.department || (u.role === 'student' ? 'Computer Science' : undefined),
      rollNo: u.rollNo,
      gradYear: u.gradYear,
      cgpa: u.cgpa || (u.role === 'student' ? '9.24 / 10.00' : undefined),
      semester: u.semester || (u.role === 'student' ? 'Semester 7 (Final Year)' : undefined),
      skills: u.skills || ['React 19', 'TypeScript', 'Node.js', 'FastAPI'],
      certificates: u.certificates || [
        {
          id: 'cert-1',
          title: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services (AWS)',
          date: 'July 2026',
          credentialUrl: 'https://aws.amazon.com/verification',
          verified: true,
          fileUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80'
        }
      ],
      marksheets: u.marksheets || [
        {
          id: 'mark-1',
          title: 'Semester 6 Official Grade Sheet',
          semester: 'Sem 6 (Spring 2026)',
          uploadDate: 'June 15, 2026',
          fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'
        }
      ],
      github: u.github || 'https://github.com',
      linkedin: u.linkedin || 'https://linkedin.com',
      onlineStatus: u.role === 'admin' ? 'online' : 'online',
      openForProjects: true,
      projectsCompleted: 3,
      podName: 'Pod Apex-2'
    }));

    const extraMentorsAndSmes: CommunityMember[] = [
      {
        id: 'mentor-priya',
        name: 'Priya Sharma',
        email: 'priya.sharma@razorpay.com',
        role: 'mentor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        bio: 'Staff Engineer & Architect @ Razorpay. Mentoring Pod Apex-2 on distributed payment systems and WebSocket architectures.',
        organization: 'Razorpay Engineering',
        skills: ['System Design', 'React 19', 'Payment Gateways', 'Distributed Systems', 'Go'],
        certificates: [
          {
            id: 'cert-m1',
            title: 'Kubernetes Certified Administrator (CKA)',
            issuer: 'Cloud Native Computing Foundation (CNCF)',
            date: 'Jan 2025',
            verified: true,
            fileUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80'
          }
        ],
        onlineStatus: 'online',
        openForProjects: true,
        projectsCompleted: 18,
        podName: 'Mentor Lead (Apex Cohort)'
      },
      {
        id: 'mentor-sarah',
        name: 'Sarah Chen',
        email: 'sarah.chen@cloudflare.com',
        role: 'mentor',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
        bio: 'Principal Architect @ Cloudflare. Specialized in edge compute workers, zero-trust security, and high-throughput WebSockets.',
        organization: 'Cloudflare',
        skills: ['Edge Compute', 'WebSockets', 'Telemetry', 'Go', 'High-QPS APIs'],
        onlineStatus: 'away',
        openForProjects: true,
        projectsCompleted: 24,
        podName: 'Security Gatekeeper'
      },
      {
        id: 'sme-kestrel',
        name: 'Rajesh Nair',
        email: 'kestrel@freight.com',
        role: 'sme',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        bio: 'VP of Technology @ Kestrel Freight & Logistics. Sponsoring real-world vehicle tracking and cold-chain monitoring problems.',
        organization: 'Kestrel Freight & Logistics',
        skills: ['Logistics Ops', 'Supply Chain Tech', 'IoT Telemetry', 'PRD Design'],
        onlineStatus: 'online',
        openForProjects: true,
        projectsCompleted: 8,
        podName: 'SME Sponsor (Apex-2)'
      },
      {
        id: 'student-maya',
        name: 'Maya Patel',
        email: 'maya.patel@nit.edu',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        bio: 'Backend & Cloud Engineer @ NIT. Focused on Go microservices, Redis caching, and PostgreSQL time-series modeling.',
        college: 'National Institute of Technology',
        department: 'Information Technology',
        rollNo: 'IT21B019',
        gradYear: '2027',
        cgpa: '9.48 / 10.00',
        semester: 'Semester 7 (Final Year)',
        skills: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis'],
        certificates: [
          {
            id: 'cert-maya-1',
            title: 'AWS Certified Developer Associate',
            issuer: 'Amazon Web Services',
            date: 'April 2026',
            verified: true,
            fileUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80'
          }
        ],
        marksheets: [
          {
            id: 'mark-maya-1',
            title: 'Semester 6 Grade Sheet (9.60 SGPA)',
            semester: 'Sem 6 (Spring 2026)',
            uploadDate: 'June 20, 2026',
            fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'
          }
        ],
        onlineStatus: 'online',
        openForProjects: true,
        projectsCompleted: 4,
        podName: 'Pod Apex-2'
      }
    ];

    let allMembers = [...members];
    for (const em of extraMentorsAndSmes) {
      if (!allMembers.some(m => m.email.toLowerCase() === em.email.toLowerCase())) {
        allMembers.push(em);
      }
    }

    if (roleFilter && roleFilter !== 'all') {
      allMembers = allMembers.filter(m => m.role === roleFilter);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase();
      allMembers = allMembers.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.skills?.some(s => s.toLowerCase().includes(q)) ||
        m.college?.toLowerCase().includes(q) ||
        m.organization?.toLowerCase().includes(q) ||
        m.department?.toLowerCase().includes(q)
      );
    }

    return allMembers;
  }

  public getMemberProfile(idOrEmail: string): CommunityMember | undefined {
    const members = this.getCommunityMembers();
    return members.find(m => m.id === idOrEmail || m.email.toLowerCase() === idOrEmail.toLowerCase());
  }

  // --- DIRECT MESSAGING SYSTEM ---
  public getDirectMessages(userEmail: string, otherEmail?: string): DirectMessage[] {
    if (!this.data.messages) {
      this.data.messages = this.getInitialSeedMessages();
      this.save();
    }

    const cleanUser = userEmail.toLowerCase();
    let msgs = this.data.messages.filter(m =>
      m.senderEmail.toLowerCase() === cleanUser || m.recipientEmail.toLowerCase() === cleanUser
    );

    if (otherEmail) {
      const cleanOther = otherEmail.toLowerCase();
      msgs = msgs.filter(m =>
        (m.senderEmail.toLowerCase() === cleanUser && m.recipientEmail.toLowerCase() === cleanOther) ||
        (m.senderEmail.toLowerCase() === cleanOther && m.recipientEmail.toLowerCase() === cleanUser)
      );
    }

    return msgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  public sendDirectMessage(messageData: Omit<DirectMessage, 'id' | 'timestamp' | 'read' | 'threadId'>): DirectMessage {
    if (!this.data.messages) this.data.messages = [];

    const senderEmail = messageData.senderEmail.toLowerCase();
    const recipientEmail = messageData.recipientEmail.toLowerCase();
    const threadId = [senderEmail, recipientEmail].sort().join('_');

    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      threadId,
      senderEmail,
      senderName: messageData.senderName,
      senderRole: messageData.senderRole,
      senderAvatar: messageData.senderAvatar,
      recipientEmail,
      recipientName: messageData.recipientName,
      recipientRole: messageData.recipientRole,
      text: messageData.text,
      timestamp: new Date().toISOString(),
      read: false
    };

    this.data.messages.push(newMsg);
    this.save();
    return newMsg;
  }

  // Admin exclusive global message inspector: strictly protected for compliance & safety auditing
  public getAllSystemMessagesForAdmin(requesterRole: UserRole): DirectMessage[] {
    if (requesterRole !== 'admin') {
      throw new Error('Access denied. Chat audit is restricted to SuperAdmin role only.');
    }
    if (!this.data.messages) {
      this.data.messages = this.getInitialSeedMessages();
      this.save();
    }
    return this.data.messages;
  }

  private getInitialSeedMessages(): DirectMessage[] {
    return [
      {
        id: 'msg-seed-1',
        threadId: 'priya.sharma@razorpay.com_sanketbhende0@gmail.com',
        senderEmail: 'priya.sharma@razorpay.com',
        senderName: 'Priya Sharma (Staff Engineer @ Razorpay)',
        senderRole: 'mentor',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        recipientEmail: 'sanketbhende0@gmail.com',
        recipientName: 'Sanket Bhende',
        recipientRole: 'admin',
        text: 'Hi Sanket! I reviewed Pod Apex-2 Sprint 2 deliverables. The WebSocket SKU telemetry architecture and test suite pass rate are outstanding. Verified stamp issued!',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        read: true
      },
      {
        id: 'msg-seed-2',
        threadId: 'priya.sharma@razorpay.com_sanketbhende0@gmail.com',
        senderEmail: 'sanketbhende0@gmail.com',
        senderName: 'Sanket Bhende',
        senderRole: 'admin',
        recipientEmail: 'priya.sharma@razorpay.com',
        recipientName: 'Priya Sharma',
        recipientRole: 'mentor',
        text: 'Thanks Priya! We also added the student academic marksheet and certificate vault for direct placement verification.',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        read: true
      },
      {
        id: 'msg-seed-3',
        threadId: 'kestrel@freight.com_sanketbhende0@gmail.com',
        senderEmail: 'kestrel@freight.com',
        senderName: 'Rajesh Nair (VP Tech @ Kestrel)',
        senderRole: 'sme',
        senderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        recipientEmail: 'sanketbhende0@gmail.com',
        recipientName: 'Sanket Bhende',
        recipientRole: 'admin',
        text: 'Hello! We are ready to lock ₹25,000 for Sprint 3 in the Escrow Vault once the cold-chain telemetry module begins.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: false
      }
    ];
  }

  // --- IP REGISTRY & DEPARTMENT ANALYTICS ---
  public getCollegeIpRegistry(): CollegeIPRegistryItem[] {
    return this.data.collegeIpRegistry;
  }

  public getDepartmentAnalytics(): DepartmentAnalytics[] {
    return this.data.departmentAnalytics;
  }

  public getMetrics() {
    return this.data.metrics;
  }
}

// Global Singleton Database Instance
export const db = new DatabaseManager();
