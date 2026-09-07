import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

# ==========================================
# PALETTE DEFINITIONS (Cyberpunk Luxury Theme)
# ==========================================
PRIMARY = colors.HexColor("#1e1b4b")       # Indigo 950 (Deep Luxury Purple)
PRIMARY_LIGHT = colors.HexColor("#312e81") # Indigo 900
ACCENT_PURPLE = colors.HexColor("#6366f1") # Indigo 500
ACCENT_LAVENDER = colors.HexColor("#8b5cf6")# Violet 500
ACCENT_CYAN = colors.HexColor("#0284c7")   # Sky 600
ACCENT_EMERALD = colors.HexColor("#059669")# Emerald 600
ACCENT_AMBER = colors.HexColor("#d97706")  # Amber 600
ACCENT_ROSE = colors.HexColor("#e11d48")   # Rose 600

DARK_TEXT = colors.HexColor("#0f172a")     # Slate 900
BODY_TEXT = colors.HexColor("#334155")     # Slate 700
MUTED_TEXT = colors.HexColor("#64748b")    # Slate 500
LIGHT_BG = colors.HexColor("#f8fafc")      # Slate 50
CARD_BG = colors.HexColor("#f1f5f9")       # Slate 100
CARD_BORDER = colors.HexColor("#cbd5e1")   # Slate 300
CALLOUT_BG = colors.HexColor("#eef2ff")    # Indigo 50
CALLOUT_BORDER = colors.HexColor("#818cf8")# Indigo 400
WHITE = colors.HexColor("#ffffff")

# Status Colors
CONFIRMED_BG = colors.HexColor("#ecfdf5")
CONFIRMED_TXT = colors.HexColor("#047857")
SIMULATED_BG = colors.HexColor("#fffbeb")
SIMULATED_TXT = colors.HexColor("#b45309")
ROADMAP_BG = colors.HexColor("#eff6ff")
ROADMAP_TXT = colors.HexColor("#1d4ed8")

PAGE_W, PAGE_H = A4
PRINTABLE_W = PAGE_W - 72  # 523.27 pt (36 pt margins on each side)


class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and render total page count
    along with running headers and footers on every page.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        w, h = PAGE_W, PAGE_H

        # Page 1 is the Title / Cover Page: has a custom full-bleed banner
        if self._pageNumber == 1:
            # Top accent stripe
            self.setFillColor(PRIMARY)
            self.rect(0, h - 8, w, 8, fill=1, stroke=0)
            # Bottom accent stripe
            self.setFillColor(ACCENT_PURPLE)
            self.rect(0, 0, w, 6, fill=1, stroke=0)
            self.restoreState()
            return

        # Running Header for Page 2+
        self.setFillColor(LIGHT_BG)
        self.rect(0, h - 38, w, 38, fill=1, stroke=0)
        self.setStrokeColor(CARD_BORDER)
        self.setLineWidth(0.75)
        self.line(36, h - 38, w - 36, h - 38)

        # Header Typography
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(PRIMARY)
        self.drawString(36, h - 24, "SKILL-PODS : COMPLETE TECHNOLOGY MAP & SYSTEM ARCHITECTURE")

        self.setFont("Helvetica", 7.5)
        self.setFillColor(MUTED_TEXT)
        self.drawRightString(w - 36, h - 24, "TECHNICAL SPECIFICATION & ROADMAP | SIH26043")

        # Running Footer
        self.setFillColor(LIGHT_BG)
        self.rect(0, 0, w, 32, fill=1, stroke=0)
        self.setStrokeColor(CARD_BORDER)
        self.setLineWidth(0.75)
        self.line(36, 32, w - 36, 32)

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(ACCENT_PURPLE)
        self.drawString(36, 12, "CONFIDENTIAL & PROPRIETARY")

        self.setFont("Helvetica", 7.5)
        self.setFillColor(MUTED_TEXT)
        self.drawCentredString(w / 2.0, 12, "Skill-Pods Platform — Systematic Architecture & Evolution Inventory")

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(DARK_TEXT)
        self.drawRightString(w - 36, 12, f"Page {self._pageNumber} of {page_count}")

        self.restoreState()


def build_styles():
    base = getSampleStyleSheet()
    
    styles = {
        'DocTitle': ParagraphStyle(
            'DocTitle',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=21,
            leading=25,
            textColor=PRIMARY,
            alignment=TA_LEFT,
            spaceAfter=4
        ),
        'DocSubtitle': ParagraphStyle(
            'DocSubtitle',
            parent=base['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=MUTED_TEXT,
            alignment=TA_LEFT,
            spaceAfter=12
        ),
        'MetaKey': ParagraphStyle(
            'MetaKey',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8,
            leading=11,
            textColor=PRIMARY
        ),
        'MetaVal': ParagraphStyle(
            'MetaVal',
            parent=base['Normal'],
            fontName='Helvetica',
            fontSize=8,
            leading=11,
            textColor=DARK_TEXT
        ),
        'SectionHeading': ParagraphStyle(
            'SectionHeading',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=12.5,
            leading=16,
            textColor=PRIMARY,
            spaceBefore=14,
            spaceAfter=6,
            keepWithNext=True
        ),
        'SubSectionHeading': ParagraphStyle(
            'SubSectionHeading',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=9.5,
            leading=13.5,
            textColor=ACCENT_PURPLE,
            spaceBefore=8,
            spaceAfter=3,
            keepWithNext=True
        ),
        'Body': ParagraphStyle(
            'Body',
            parent=base['Normal'],
            fontName='Helvetica',
            fontSize=8.5,
            leading=12,
            textColor=BODY_TEXT,
            alignment=TA_JUSTIFY,
            spaceAfter=5
        ),
        'BodyBold': ParagraphStyle(
            'BodyBold',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8.5,
            leading=12,
            textColor=DARK_TEXT
        ),
        'Bullet': ParagraphStyle(
            'Bullet',
            parent=base['Normal'],
            fontName='Helvetica',
            fontSize=8.5,
            leading=12,
            textColor=BODY_TEXT,
            leftIndent=12,
            firstLineIndent=-8,
            spaceAfter=3
        ),
        'CodeSnippet': ParagraphStyle(
            'CodeSnippet',
            parent=base['Normal'],
            fontName='Courier',
            fontSize=7.5,
            leading=10,
            textColor=PRIMARY_LIGHT
        ),
        'TableHeader': ParagraphStyle(
            'TableHeader',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8,
            leading=11,
            textColor=WHITE,
            alignment=TA_LEFT
        ),
        'TableCell': ParagraphStyle(
            'TableCell',
            parent=base['Normal'],
            fontName='Helvetica',
            fontSize=8,
            leading=11,
            textColor=BODY_TEXT
        ),
        'TableCellBold': ParagraphStyle(
            'TableCellBold',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8,
            leading=11,
            textColor=DARK_TEXT
        ),
        'BadgeConfirmed': ParagraphStyle(
            'BadgeConfirmed',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=7,
            leading=9,
            textColor=CONFIRMED_TXT,
            alignment=TA_CENTER
        ),
        'BadgeSimulated': ParagraphStyle(
            'BadgeSimulated',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=7,
            leading=9,
            textColor=SIMULATED_TXT,
            alignment=TA_CENTER
        ),
        'BadgeRoadmap': ParagraphStyle(
            'BadgeRoadmap',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=7,
            leading=9,
            textColor=ROADMAP_TXT,
            alignment=TA_CENTER
        ),
        'CalloutTitle': ParagraphStyle(
            'CalloutTitle',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=9,
            leading=12,
            textColor=PRIMARY,
            spaceAfter=2
        ),
        'CalloutText': ParagraphStyle(
            'CalloutText',
            parent=base['Normal'],
            fontName='Helvetica',
            fontSize=8,
            leading=11,
            textColor=DARK_TEXT
        ),
        'TocNumber': ParagraphStyle(
            'TocNumber',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8.5,
            leading=12,
            textColor=ACCENT_PURPLE
        ),
        'TocTitle': ParagraphStyle(
            'TocTitle',
            parent=base['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8.5,
            leading=12,
            textColor=DARK_TEXT
        ),
        'TocDesc': ParagraphStyle(
            'TocDesc',
            parent=base['Normal'],
            fontName='Helvetica',
            fontSize=8,
            leading=11,
            textColor=MUTED_TEXT
        )
    }
    return styles


def create_callout_box(title, text, styles, border_color=CALLOUT_BORDER, bg_color=CALLOUT_BG):
    content = [
        Paragraph(title, styles['CalloutTitle']),
        Paragraph(text, styles['CalloutText'])
    ]
    box_table = Table([[content]], colWidths=[PRINTABLE_W])
    box_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg_color),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    return box_table


def generate_pdf(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=42
    )

    styles = build_styles()
    story = []

    # =========================================================================
    # COVER / HEADER BANNER
    # =========================================================================
    story.append(Paragraph("SKILL-PODS PLATFORM SPECIFICATION", styles['SubSectionHeading']))
    story.append(Paragraph("Complete Technology Map & Systematic Technical Architecture", styles['DocTitle']))
    story.append(Paragraph(
        "A rigorous, end-to-end technical inventory covering confirmed codebase implementations, runtime mechanics, "
        "security layers, artificial intelligence modules, testing frameworks, document generators, prototype audits, "
        "and our upcoming enterprise production additions.",
        styles['DocSubtitle']
    ))

    # Metadata Grid
    meta_data = [
        [
            Paragraph("Document Scope:", styles['MetaKey']),
            Paragraph("Confirmed Stack, Prototype Audit & Evolution Roadmap", styles['MetaVal']),
            Paragraph("Classification:", styles['MetaKey']),
            Paragraph("Official SIH26043 Technical Architecture Spec", styles['MetaVal'])
        ],
        [
            Paragraph("Core Runtime:", styles['MetaKey']),
            Paragraph("Node 20 LTS | React 19 | TypeScript | Express.js", styles['MetaVal']),
            Paragraph("Deployment:", styles['MetaKey']),
            Paragraph("Cloudflare Pages + Docker / Render / Vercel Ready", styles['MetaVal'])
        ],
        [
            Paragraph("Target Roles:", styles['MetaKey']),
            Paragraph("Students, Industry Mentors, SMEs, College Deans, SuperAdmin", styles['MetaVal']),
            Paragraph("Author / Maintainer:", styles['MetaKey']),
            Paragraph("Skill-Pods Core Engineering & Architectural Guild", styles['MetaVal'])
        ]
    ]
    t_meta = Table(meta_data, colWidths=[75, 185, 75, 188])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('BOX', (0, 0), (-1, -1), 0.75, CARD_BORDER),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    # Executive Summary Callout
    story.append(create_callout_box(
        "Executive Summary & Architectural Scope",
        "This document provides a systematic, line-by-line technical audit of the Skill-Pods platform. "
        "It preserves all sections from the official technology map source, categorizes confirmed production technologies "
        "versus prototyped/simulated capabilities, formally resolves the truncated Final Architecture blueprint, "
        "and details the upcoming enterprise upgrade roadmap (WebSockets, LiveKit SFU, PostgreSQL + pgvector, "
        "and live UPI payment gateways).",
        styles
    ))
    story.append(Spacer(1, 8))

    # Table of Contents
    story.append(Paragraph("Systematic Architecture Contents", styles['SectionHeading']))
    toc_data = [
        [Paragraph("Sec.", styles['TableHeader']), Paragraph("Topic", styles['TableHeader']), Paragraph("Key Architectural Scope & Inventory", styles['TableHeader'])],
        [Paragraph("01", styles['TocNumber']), Paragraph("Programming Languages", styles['TocTitle']), Paragraph("TypeScript, TSX/JSX, JS, Python, GLSL, HTML, CSS, JSON, TOML, Markdown, XML", styles['TocDesc'])],
        [Paragraph("02", styles['TocNumber']), Paragraph("Frontend Technologies", styles['TocTitle']), Paragraph("React 19, Vite, Tailwind CSS 4, Motion v12, Lucide, Native SVG, WebGL HeroShader", styles['TocDesc'])],
        [Paragraph("03", styles['TocNumber']), Paragraph("Backend Technologies", styles['TocTitle']), Paragraph("Node.js 20, Express.js REST API, Vite Middleware Mode, TSX Execution, Routing", styles['TocDesc'])],
        [Paragraph("04", styles['TocNumber']), Paragraph("Database & Persistence", styles['TocTitle']), Paragraph("Embedded JSON DB (skillpods.json), MongoDB Driver, LocalStorage, In-Memory State", styles['TocDesc'])],
        [Paragraph("05", styles['TocNumber']), Paragraph("Authentication & Security", styles['TocTitle']), Paragraph("PBKDF2/SHA-512, Custom JWT (HMAC-SHA256), Google GIS, Rate Limiting, CSP/HSTS", styles['TocDesc'])],
        [Paragraph("06", styles['TocNumber']), Paragraph("AI Technologies", styles['TocTitle']), Paragraph("Google Gemini SDK (@google/genai), Guru Copilot, Problem Decomposer, Pitch Deck AI", styles['TocDesc'])],
        [Paragraph("07", styles['TocNumber']), Paragraph("Testing & Validation", styles['TocTitle']), Paragraph("Vitest Unit/Integration Tests, TypeScript Strict Compiler, esbuild Production Bundler", styles['TocDesc'])],
        [Paragraph("08", styles['TocNumber']), Paragraph("Build & Deployment", styles['TocTitle']), Paragraph("Docker Multi-Stage, Vercel Serverless, Cloudflare Pages, Wrangler, Env Config", styles['TocDesc'])],
        [Paragraph("09", styles['TocNumber']), Paragraph("Python Document Engine", styles['TocTitle']), Paragraph("python-docx XML OXML engine, ReportLab PDF generation (SIH presentation & docs)", styles['TocDesc'])],
        [Paragraph("10", styles['TocNumber']), Paragraph("File & Document Tech", styles['TocTitle']), Paragraph("HTML specs, PDF artifacts, DOCX proposals, JSON seed data, static asset vault", styles['TocDesc'])],
        [Paragraph("11", styles['TocNumber']), Paragraph("Prototype Audit (Not Fully Implemented)", styles['TocTitle']), Paragraph("Real-world audit of README features (WebSockets, WebRTC, Redis, pgvector, UPI)", styles['TocDesc'])],
        [Paragraph("12", styles['TocNumber']), Paragraph("Final Architecture & Data Flow", styles['TocTitle']), Paragraph("Complete end-to-end tier data flow (Client -> Gateway -> Security -> Logic -> DB)", styles['TocDesc'])],
        [Paragraph("13", styles['TocNumber']), Paragraph("Confirmed Recent Live Features", styles['TocTitle']), Paragraph("Bézier Carousel, 4-Stage Lamp, Direct Messaging, Document Vault, Escrow Simulator", styles['TocDesc'])],
        [Paragraph("14", styles['TocNumber']), Paragraph("Strategic Production Roadmap", styles['TocTitle']), Paragraph("5-Phase engineering plan: LiveKit SFU, Postgres+pgvector, Razorpay, GitHub Webhooks", styles['TocDesc'])],
    ]
    t_toc = Table(toc_data, colWidths=[28, 155, 340])
    t_toc.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_toc)

    # Page Break to Section 1
    story.append(PageBreak())

    # =========================================================================
    # SECTION 1: PROGRAMMING LANGUAGES
    # =========================================================================
    story.append(Paragraph("1. Programming Languages", styles['SectionHeading']))
    story.append(Paragraph(
        "The Skill-Pods codebase employs a cohesive multi-language paradigm designed for strict compile-time type safety, "
        "isomorphic JSON serialization between client and server, GPU-accelerated mathematical rendering, and deterministic "
        "headless document synthesis.",
        styles['Body']
    ))

    lang_data = [
        [Paragraph("Language", styles['TableHeader']), Paragraph("Primary Scope & Architectural Role", styles['TableHeader']), Paragraph("Repository Locations", styles['TableHeader']), Paragraph("Status", styles['TableHeader'])],
        [
            Paragraph("TypeScript", styles['TableCellBold']),
            Paragraph("Primary frontend, backend APIs, shared data types, security token encoding, and build configs.", styles['TableCell']),
            Paragraph("src/, server/, api/, server.ts, types.ts", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("TSX / JSX", styles['TableCellBold']),
            Paragraph("Declarative React UI components, interactive dashboard screens, modals, and SVG vector canvas wrappers.", styles['TableCell']),
            Paragraph("src/components/, src/App.tsx, src/main.tsx", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("JavaScript (ESM/CJS)", styles['TableCellBold']),
            Paragraph("Transpiled browser runtime bundle, esbuild CommonJS backend bundle, and build tool configuration scripts.", styles['TableCell']),
            Paragraph("dist/server.cjs, dist/assets/*.js", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("Python 3", styles['TableCellBold']),
            Paragraph("Headless document generation engine compiling Word (.docx) specifications and vector PDF presentations.", styles['TableCell']),
            Paragraph("generate_sih_doc.py, generate_sih_pdf.py", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GLSL (OpenGL ES)", styles['TableCellBold']),
            Paragraph("Hardware-accelerated vertex and fragment shaders calculating mathematical color fields and wave dynamics.", styles['TableCell']),
            Paragraph("src/components/HeroShader.tsx", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("HTML5", styles['TableCellBold']),
            Paragraph("Single Page Application (SPA) DOM root shell, Google GIS scripts, meta tags, and static HTML reports.", styles['TableCell']),
            Paragraph("index.html, public/prototype_dossier.html", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("CSS3", styles['TableCellBold']),
            Paragraph("Global design variables, dark cyberpunk lavender palette, glow effects, keyframe animations, glass cards.", styles['TableCell']),
            Paragraph("src/index.css, component inline styles", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("JSON", styles['TableCellBold']),
            Paragraph("Configuration manifests, persistent file database store, mock telemetry payloads, and REST API bodies.", styles['TableCell']),
            Paragraph("package.json, data/skillpods.json", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("TOML", styles['TableCellBold']),
            Paragraph("Cloudflare Pages and Wrangler CLI deployment orchestration and environment bindings.", styles['TableCell']),
            Paragraph("wrangler.toml", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("Markdown", styles['TableCellBold']),
            Paragraph("Project documentation, architectural specifications, SIH pitch details, and memory context files.", styles['TableCell']),
            Paragraph("README.md, skillpods_gemini.md", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("XML (OXML)", styles['TableCellBold']),
            Paragraph("Low-level OpenXML schema nodes modified programmatically for Word table borders, shading, and cell margins.", styles['TableCell']),
            Paragraph("Inside python-docx automation scripts", styles['CodeSnippet']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
    ]
    t_lang = Table(lang_data, colWidths=[70, 220, 160, 73])
    t_lang.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (3, 1), (3, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_lang)
    story.append(Spacer(1, 8))

    # =========================================================================
    # SECTION 2: FRONTEND TECHNOLOGIES
    # =========================================================================
    story.append(Paragraph("2. Frontend Technologies", styles['SectionHeading']))
    story.append(Paragraph(
        "The client architecture is engineered as a responsive, accessible Single Page Application (SPA) leveraging "
        "React 19, modern atomic Tailwind styling, and physics-based motion primitives without third-party heavy dependencies.",
        styles['Body']
    ))

    story.append(Paragraph("A. React 19 Core Framework & Lifecycle Architecture", styles['SubSectionHeading']))
    story.append(Paragraph(
        "React 19 serves as the foundation for the user interface. It powers all five primary role workspaces "
        "(Student, SME Enterprise, Industry Mentor, College Dean, and SuperAdmin). "
        "State management avoids cumbersome external state machines (e.g. Redux) in favor of localized, composable React hooks: "
        "<b>useState</b> for transient view states, <b>useEffect</b> for lifecycle data synchronization and API telemetry, "
        "<b>useCallback</b> for memoized event dispatchers, and <b>browser localStorage</b> for persistent cross-session identity. "
        "The DOM is mounted via <i>react-dom/client createRoot</i> in <code>src/main.tsx</code>.",
        styles['Body']
    ))

    story.append(Paragraph("B. Strongly-Typed Domain Modeling (TypeScript 5.x)", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Strict static interfaces are enforced throughout the client. Centralized in <code>src/types.ts</code>, "
        "these interfaces govern data consistency across pods, marketplace capstone projects, cryptographically signed "
        "skill passports, mentor milestone gates, college IP registries, and security audit records.",
        styles['Body']
    ))

    story.append(Paragraph("C. Vite 6 Build Engine & Dev Middleware", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Vite provides near-instant Hot Module Replacement (HMR) during development and optimizes production output into "
        "code-split, treeshaken ES modules. During local development, Vite operates in middleware mode directly within the "
        "Express server (<code>server.ts</code>), enabling unified full-stack execution on a single port.",
        styles['Body']
    ))

    story.append(Paragraph("D. Tailwind CSS v4 & Cyberpunk Design System", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Tailwind CSS v4 is integrated via the official Vite plugin. It enforces consistent layout spacing, responsive flex/grid "
        "breakouts, typography hierarchies, and dark glassmorphic cards. The color tokens center around an ultra-dark purple canvas "
        "(<code>#08070d</code>, <code>#171422</code>) complemented by vibrant neon lavender glows (<code>#8b5cf6</code>, <code>#6366f1</code>) "
        "and accessible slate typography.",
        styles['Body']
    ))

    story.append(Paragraph("E. Motion (Framer Motion v12) Physics Engine", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Smooth hardware-accelerated animations are driven by the <code>motion</code> library. Key implementations include: "
        "page transitions, modal springs, staggered list entrance animations, telemetry count-ups, and the continuous parabolic "
        "Bézier orbital animation showcased in the Innovation Carousel.",
        styles['Body']
    ))

    story.append(Paragraph("F. Native SVG 3D Character Avatars (Architecture Decision)", styles['SubSectionHeading']))
    story.append(Paragraph(
        "A deliberate architectural choice was made to implement interactive 3D character avatars (Student, Mentor, SME, College) "
        "using layered, mathematically calculated SVG vectors, CSS perspective transforms, and Motion springs rather than Three.js "
        "or React Three Fiber. This yields a sub-50KB bundle footprint, zero WebGL context crashes on low-end mobile devices, "
        "and instantaneous initial render times.",
        styles['Body']
    ))

    story.append(Paragraph("G. WebGL & GLSL HeroShader Engine", styles['SubSectionHeading']))
    story.append(Paragraph(
        "The landing page hero backdrop features a custom WebGL canvas (<code>HeroShader.tsx</code>) running raw GLSL vertex and "
        "fragment shaders. It calculates real-time trigonometric wave dynamics and chromatic dispersion directly on the GPU, "
        "delivering rich visual aesthetic without CPU main-thread degradation.",
        styles['Body']
    ))

    story.append(Paragraph("H. Native Browser APIs", styles['SubSectionHeading']))
    story.append(Paragraph(
        "The frontend relies on standard Web APIs: <code>localStorage</code> for cryptographic token caching; "
        "native <code>fetch()</code> for REST API calls; <code>window.location.hash</code> for lightweight, zero-dependency "
        "dashboard routing; <code>window.print()</code> for generating official hardcopy skill passports; and "
        "Google Identity Services (GIS) client scripts for 1-click Google OAuth.",
        styles['Body']
    ))

    # Page Break to Section 3 & 4
    story.append(PageBreak())

    # =========================================================================
    # SECTION 3: BACKEND TECHNOLOGIES
    # =========================================================================
    story.append(Paragraph("3. Backend Technologies", styles['SectionHeading']))
    story.append(Paragraph(
        "The Skill-Pods backend provides a high-throughput, asynchronous RESTful API built on Node.js 20 LTS and Express.js, "
        "featuring strict separation of concerns, comprehensive input sanitization, and dual development/production run modes.",
        styles['Body']
    ))

    story.append(Paragraph("A. Node.js 20 LTS & Express.js Application Server", styles['SubSectionHeading']))
    story.append(Paragraph(
        "The server application (<code>server/app.ts</code> and <code>server.ts</code>) handles JSON payload parsing, route dispatching, "
        "session verification, and static asset streaming. The official containerization targets <b>Node 20 Alpine</b> for minimal image size.",
        styles['Body']
    ))

    story.append(Paragraph("B. Comprehensive REST API Endpoints Inventory", styles['SubSectionHeading']))
    api_endpoints_data = [
        [Paragraph("HTTP Verb & Endpoint", styles['TableHeader']), Paragraph("Controller Handler & Business Purpose", styles['TableHeader']), Paragraph("Security Level", styles['TableHeader'])],
        [
            Paragraph("POST /api/auth/register", styles['CodeSnippet']),
            Paragraph("Creates a new user profile, hashes password via PBKDF2, provisions default roles.", styles['TableCell']),
            Paragraph("Rate Limited", styles['BadgeSimulated'])
        ],
        [
            Paragraph("POST /api/auth/login", styles['CodeSnippet']),
            Paragraph("Validates credentials with timing-safe comparison; issues signed HMAC-SHA256 bearer token.", styles['TableCell']),
            Paragraph("Rate Limited", styles['BadgeSimulated'])
        ],
        [
            Paragraph("POST /api/auth/google", styles['CodeSnippet']),
            Paragraph("Accepts Google GIS JWT, provisions account or matches existing email, issues session.", styles['TableCell']),
            Paragraph("Public OAuth", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/auth/me", styles['CodeSnippet']),
            Paragraph("Validates session bearer token and returns authenticated user identity and claims.", styles['TableCell']),
            Paragraph("Authenticated", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/marketplace/projects", styles['CodeSnippet']),
            Paragraph("Retrieves student software projects available for commercial licensing, buyout, or upgrade.", styles['TableCell']),
            Paragraph("Public / Cached", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("POST /api/marketplace/inquire", styles['CodeSnippet']),
            Paragraph("Registers SME commercial buyer licensing inquiries and IP buyout offers.", styles['TableCell']),
            Paragraph("Authenticated", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/student/skill-passport", styles['CodeSnippet']),
            Paragraph("Returns verified student passport with SHA-256 integrity hash and mentor signatures.", styles['TableCell']),
            Paragraph("Authenticated", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("POST /api/mentor/verify-skill", styles['CodeSnippet']),
            Paragraph("Authorizes industry mentor verification stamp and attaches verifiable evidence notes.", styles['TableCell']),
            Paragraph("Mentor Role", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/mentor/milestone-gates", styles['CodeSnippet']),
            Paragraph("Retrieves active sprint blocking stage gates across assigned student pods.", styles['TableCell']),
            Paragraph("Mentor Role", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("POST /api/mentor/milestone-gate/approve", styles['CodeSnippet']),
            Paragraph("Formally signs off sprint milestone, releasing next development stage & escrow.", styles['TableCell']),
            Paragraph("Mentor Role", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/college/ip-registry", styles['CodeSnippet']),
            Paragraph("Returns institutional intellectual property portfolio, commercial valuation, and student inventors.", styles['TableCell']),
            Paragraph("College Role", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/college/departments", styles['CodeSnippet']),
            Paragraph("Returns cross-department placement metrics, industry project volume, and faculty citations.", styles['TableCell']),
            Paragraph("College Role", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/sme/pod-recommendations", styles['CodeSnippet']),
            Paragraph("Runs AI matching algorithm ranking student pods for SME problem requirements.", styles['TableCell']),
            Paragraph("SME Role", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/admin/all-chats", styles['CodeSnippet']),
            Paragraph("SuperAdmin compliance audit endpoint allowing monitored review of 1-on-1 direct messages.", styles['TableCell']),
            Paragraph("SuperAdmin Only", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GET /api/admin/security-audit", styles['CodeSnippet']),
            Paragraph("Returns immutable event log of authentication attempts, blocked payloads, and IP telemetry.", styles['TableCell']),
            Paragraph("SuperAdmin Only", styles['BadgeConfirmed'])
        ],
    ]
    t_api = Table(api_endpoints_data, colWidths=[150, 273, 100])
    t_api.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (2, 1), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_api)
    story.append(Spacer(1, 8))

    story.append(Paragraph("C. Dual Runtime Execution Modes (Development vs. Production)", styles['SubSectionHeading']))
    story.append(Paragraph(
        "<b>Development Mode:</b> Executed via <code>tsx server.ts</code>. Vite runs as middleware inside Express, "
        "dynamically intercepting asset requests and providing instantaneous HMR without prior compilation steps.<br/>"
        "<b>Production Mode:</b> The frontend is compiled into <code>dist/</code> by Vite. The backend is bundled by "
        "<code>esbuild</code> into a single standalone CommonJS file (<code>dist/server.cjs</code>) which serves static assets "
        "and handles REST APIs with zero development dependencies.",
        styles['Body']
    ))
    story.append(Spacer(1, 8))

    # =========================================================================
    # SECTION 4: DATABASE AND PERSISTENCE
    # =========================================================================
    story.append(Paragraph("4. Database and Persistence Architecture", styles['SectionHeading']))
    story.append(Paragraph(
        "Skill-Pods features a flexible dual-persistence strategy designed for frictionless zero-config local evaluation "
        "while providing seamless production scale-out via MongoDB Atlas.",
        styles['Body']
    ))

    db_matrix = [
        [Paragraph("Persistence Layer", styles['TableHeader']), Paragraph("Implementation Mechanism", styles['TableHeader']), Paragraph("Data Types Handled", styles['TableHeader']), Paragraph("Status", styles['TableHeader'])],
        [
            Paragraph("Embedded JSON DB", styles['TableCellBold']),
            Paragraph("Atomic file I/O via Node <code>fs/promises</code> wrapped in <code>server/db.ts</code>; writes to <code>data/skillpods.json</code>.", styles['TableCell']),
            Paragraph("Users, sessions, audit logs, pods, projects, passports, gates, IP records.", styles['TableCell']),
            Paragraph("CONFIRMED (Default)", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("MongoDB & Atlas", styles['TableCellBold']),
            Paragraph("Native <code>mongodb</code> driver client; auto-activates when <code>MONGODB_URI</code> is defined in environment.", styles['TableCell']),
            Paragraph("Document collections mirroring JSON store with BSON ObjectID indexing.", styles['TableCell']),
            Paragraph("CONFIRMED (Driver)", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("Browser LocalStorage", styles['TableCellBold']),
            Paragraph("Client-side key-value cache in <code>App.tsx</code> and authentication components.", styles['TableCell']),
            Paragraph("Active JWT token, current user object, UI active tab, local filters.", styles['TableCell']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("In-Memory State", styles['TableCellBold']),
            Paragraph("Module-scoped JavaScript Maps and Arrays in server runtime.", styles['TableCell']),
            Paragraph("Transient metrics, rate limit sliding windows, live room presence.", styles['TableCell']),
            Paragraph("CONFIRMED", styles['BadgeConfirmed'])
        ],
    ]
    t_db = Table(db_matrix, colWidths=[100, 165, 175, 83])
    t_db.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (3, 1), (3, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_db)

    # Page Break to Section 5
    story.append(PageBreak())

    # =========================================================================
    # SECTION 5: AUTHENTICATION AND SECURITY
    # =========================================================================
    story.append(Paragraph("5. Authentication, Security & Cryptographic Integrity", styles['SectionHeading']))
    story.append(Paragraph(
        "Security is woven into every layer of the architecture. The platform implements enterprise-grade password hashing, "
        "tamper-proof cryptographic token signing, sliding-window rate limiting, and exhaustive input sanitization.",
        styles['Body']
    ))

    story.append(Paragraph("A. Password Hashing: PBKDF2 with SHA-512", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Passwords are never stored in plaintext. In <code>server/db.ts</code>, authentication leverages Node's native <code>crypto</code> "
        "library utilizing Password-Based Key Derivation Function 2 (PBKDF2) combined with SHA-512, 100,000 iterations, and a 64-byte "
        "cryptographically secure pseudorandom salt generated via <code>crypto.randomBytes(64)</code>.",
        styles['Body']
    ))

    story.append(Paragraph("B. Custom HMAC-SHA256 Cryptographic Bearer Tokens", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Instead of introducing bloated external JWT libraries, the project implements a hardened, zero-dependency token engine "
        "in <code>server/security.ts</code>. Tokens are structured as <code>base64url(header).base64url(payload).signature</code>, "
        "signed with HMAC-SHA256 using an environment secret (<code>JWT_SECRET</code>). Claims include user ID, role, issue time, "
        "and expiration timestamp.",
        styles['Body']
    ))

    story.append(Paragraph("C. Side-Channel Timing Attack Prevention", styles['SubSectionHeading']))
    story.append(Paragraph(
        "To defend against timing attacks on password verification and token validation, all buffer comparisons utilize "
        "<code>crypto.timingSafeEqual()</code>. This guarantees that comparison execution time remains constant regardless of the "
        "number of matching bytes.",
        styles['Body']
    ))

    story.append(Paragraph("D. Google Identity Services (GIS) OAuth 2.0 Integration", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Google Sign-In is embedded via the official GIS JavaScript SDK in <code>index.html</code> and handled in "
        "<code>LoginPage.tsx</code>. The backend endpoint <code>/api/auth/google</code> receives the credential token, extracts verified "
        "claims (email, full name, avatar), provisions the appropriate role, and issues a native platform session token. "
        "<i>(Note: In local demo mode, JWT signature verification is handled synchronously; production roadmap introduces official Google Auth Client library verification).</i>",
        styles['Body']
    ))

    story.append(Paragraph("E. Sliding-Window Rate Limiting", styles['SubSectionHeading']))
    story.append(Paragraph(
        "To mitigate brute-force credential stuffing and denial-of-service attempts, an in-memory sliding window rate limiter "
        "intercepts requests on authentication routes (<code>/api/auth/*</code>). It enforces strict IP-based thresholds "
        "(e.g. max 5 failed attempts per 15-minute window) and returns HTTP 429 Too Many Requests upon threshold violation.",
        styles['Body']
    ))

    story.append(Paragraph("F. Enterprise HTTP Security Headers", styles['SubSectionHeading']))
    story.append(Paragraph(
        "The security middleware in <code>server/security.ts</code> injects defensive headers on all HTTP responses: "
        "<b>X-Content-Type-Options: nosniff</b> (MIME-sniffing defense), <b>X-Frame-Options: SAMEORIGIN</b> (clickjacking defense), "
        "<b>X-XSS-Protection: 1; mode=block</b>, <b>Referrer-Policy: strict-origin-when-cross-origin</b>, "
        "<b>Permissions-Policy</b> (camera, microphone restrictions), Content Security Policy (CSP), and production HSTS.",
        styles['Body']
    ))

    story.append(Paragraph("G. Multi-Vector Input Sanitization", styles['SubSectionHeading']))
    story.append(Paragraph(
        "All incoming request payloads undergo deep recursive sanitization to neutralize malicious injection: "
        "stripping <code>&lt;script&gt;</code> tags and HTML event attributes (XSS defense); stripping <code>javascript:</code> pseudoprotocols; "
        "filtering MongoDB query operators prefixed with <code>$</code> (NoSQL injection defense); and stripping prototype pollution "
        "keys such as <code>__proto__</code>, <code>constructor</code>, and <code>prototype</code>.",
        styles['Body']
    ))

    story.append(Paragraph("H. Immutable Security Audit Logging", styles['SubSectionHeading']))
    story.append(Paragraph(
        "All security-critical events (login success, login failure, role changes, blocked injections, CSRF/rate limit triggers) "
        "are appended to an immutable audit log (<code>securityLogs</code> collection). Administrators can review incidents in "
        "real-time via <code>/api/admin/security-audit</code>.",
        styles['Body']
    ))
    story.append(Spacer(1, 8))

    # =========================================================================
    # SECTION 6: ARTIFICIAL INTELLIGENCE TECHNOLOGIES
    # =========================================================================
    story.append(Paragraph("6. Artificial Intelligence & Intelligent Automation", styles['SectionHeading']))
    story.append(Paragraph(
        "The platform integrates artificial intelligence to bridge the communication and technical gap between non-technical "
        "SME business owners and engineering students.",
        styles['Body']
    ))

    ai_matrix = [
        [Paragraph("AI Module", styles['TableHeader']), Paragraph("Implementation & Architectural Mechanics", styles['TableHeader']), Paragraph("Integration Status", styles['TableHeader'])],
        [
            Paragraph("Google Gemini SDK", styles['TableCellBold']),
            Paragraph("Integrated via <code>@google/genai</code> package; supports multimodal text and code reasoning using Gemini models.", styles['TableCell']),
            Paragraph("SDK INSTALLED", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("GURU AI Co-Pilot", styles['TableCellBold']),
            Paragraph("Automated problem decomposer converting vague business pain points into 5 structured developer Kanban tasks.", styles['TableCell']),
            Paragraph("ACTIVE UI & LOGIC", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("SME AI Pod Recommendation", styles['TableCellBold']),
            Paragraph("Multi-factor heuristic scoring matching open business problems with optimal student pods based on tech stack synergy.", styles['TableCell']),
            Paragraph("ACTIVE ALGORITHM", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("Student AI Skill Match", styles['TableCellBold']),
            Paragraph("Analyzes student verified competencies and outputs a percentage match against live SME problems with missing skill roadmaps.", styles['TableCell']),
            Paragraph("ACTIVE ALGORITHM", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("SME Voice Problem-to-PRD", styles['TableCellBold']),
            Paragraph("Speech-to-text pipeline allowing SME founders to speak business pain points and receive structured PRDs with budget estimates.", styles['TableCell']),
            Paragraph("PROTOTYPE LAB", styles['BadgeSimulated'])
        ],
        [
            Paragraph("Investor Pitch Deck AI", styles['TableCellBold']),
            Paragraph("Generates 5-slide venture pitch summaries for student capstones to pitch for angel funding or SME buyouts.", styles['TableCell']),
            Paragraph("PROTOTYPE LAB", styles['BadgeSimulated'])
        ],
        [
            Paragraph("AST PR Security Scanner", styles['TableCellBold']),
            Paragraph("Simulated static analysis tool inspecting pull request code for OWASP Top 10 vulnerabilities before milestone approval.", styles['TableCell']),
            Paragraph("PROTOTYPE LAB", styles['BadgeSimulated'])
        ],
    ]
    t_ai = Table(ai_matrix, colWidths=[120, 290, 113])
    t_ai.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (2, 1), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_ai)

    # Page Break to Section 7 & 8
    story.append(PageBreak())

    # =========================================================================
    # SECTION 7: TESTING AND VALIDATION
    # =========================================================================
    story.append(Paragraph("7. Testing and Validation Framework", styles['SectionHeading']))
    story.append(Paragraph(
        "Quality assurance is enforced through automated unit and integration test suites, static TypeScript compiler checks, "
        "and production build bundle verification.",
        styles['Body']
    ))

    story.append(Paragraph("A. Vitest Automated Testing Suite", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Vitest provides lightning-fast test execution using native Vite transforms. Test suites are located in <code>tests/</code>: "
        "<br/>&bull; <b>api_endpoints.test.ts:</b> Validates authentication endpoints, registration, login rejection, and role-based permissions."
        "<br/>&bull; <b>security.test.ts:</b> Tests PBKDF2 hash uniqueness, HMAC-SHA256 token verification, timing-safe equality, and XSS sanitization."
        "<br/>&bull; <b>state_persistence.test.ts:</b> Confirms JSON file database atomic writes, seeded data integrity, and session resumption.",
        styles['Body']
    ))

    story.append(Paragraph("B. TypeScript Strict Static Type Checking", styles['SubSectionHeading']))
    story.append(Paragraph(
        "Executed via <code>tsc --noEmit</code>. Configured in <code>tsconfig.json</code> with strict mode enabled, "
        "preventing implicit <code>any</code> types, enforcing null safety, and validating API contract signatures.",
        styles['Body']
    ))

    story.append(Paragraph("C. esbuild Production Bundling Verification", styles['SubSectionHeading']))
    story.append(Paragraph(
        "The production backend build runs <code>esbuild server.ts --bundle --platform=node --outfile=dist/server.cjs</code>. "
        "This compiles TypeScript down to a single optimized CommonJS file, verifying that all imports and server logic "
        "bundle without circular dependency or missing module errors.",
        styles['Body']
    ))
    story.append(Spacer(1, 8))

    # =========================================================================
    # SECTION 8: BUILD AND DEPLOYMENT TECHNOLOGIES
    # =========================================================================
    story.append(Paragraph("8. Build and Deployment Technologies", styles['SectionHeading']))
    story.append(Paragraph(
        "Skill-Pods is engineered for multi-cloud portability, supporting containerized environments, serverless edge networks, "
        "and traditional Linux VPS servers.",
        styles['Body']
    ))

    deploy_data = [
        [Paragraph("Deployment Target", styles['TableHeader']), Paragraph("Configuration & Automation Files", styles['TableHeader']), Paragraph("Execution Mechanism & Architecture", styles['TableHeader'])],
        [
            Paragraph("Docker Container", styles['TableCellBold']),
            Paragraph("Dockerfile, .dockerignore", styles['CodeSnippet']),
            Paragraph("Multi-stage build on Node 20 Alpine. Installs packages, builds Vite frontend, bundles backend with esbuild, exposes PORT 3000.", styles['TableCell'])
        ],
        [
            Paragraph("Cloudflare Pages", styles['TableCellBold']),
            Paragraph("wrangler.toml, public/_headers, public/_redirects", styles['CodeSnippet']),
            Paragraph("Edge CDN deployment serving static assets globally; SPA fallback routing via _redirects; security headers via _headers.", styles['TableCell'])
        ],
        [
            Paragraph("Vercel Serverless", styles['TableCellBold']),
            Paragraph("vercel.json, api/index.ts", styles['CodeSnippet']),
            Paragraph("Serverless function adapter wrapping Express API in api/index.ts with automatic rewrites to /api/* and frontend fallback.", styles['TableCell'])
        ],
        [
            Paragraph("Render / Railway", styles['TableCellBold']),
            Paragraph("package.json (npm run build && npm start)", styles['CodeSnippet']),
            Paragraph("Native Node web service running compiled dist/server.cjs connected to MongoDB Atlas via MONGODB_URI.", styles['TableCell'])
        ],
        [
            Paragraph("Environment Config", styles['TableCellBold']),
            Paragraph(".env, .env.example", styles['CodeSnippet']),
            Paragraph("Strict environment variable configuration: PORT, MONGODB_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GEMINI_API_KEY.", styles['TableCell'])
        ],
    ]
    t_deploy = Table(deploy_data, colWidths=[110, 160, 253])
    t_deploy.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_deploy)
    story.append(Spacer(1, 8))

    # =========================================================================
    # SECTION 9: PYTHON DOCUMENT GENERATION
    # =========================================================================
    story.append(Paragraph("9. Python Document Generation Pipeline", styles['SectionHeading']))
    story.append(Paragraph(
        "Python is utilized in the repository as a specialized headless document compiler producing high-fidelity Microsoft Word "
        "dossiers and vector PDF slide decks for Hackathon juries and institutional accreditation audits.",
        styles['Body']
    ))
    story.append(Paragraph(
        "&bull; <b>python-docx & docx.oxml:</b> Used in <code>generate_sih_doc.py</code> to build the official Technical Approach "
        "document (<code>SkillPods_SIH_Technical_Approach.docx</code>). Uses <code>oxml.parse_xml</code> for granular cell shading and borders.<br/>"
        "&bull; <b>ReportLab:</b> Used in <code>generate_sih_pdf.py</code> and <code>generate_technology_map_pdf.py</code> to generate "
        "publication-quality PDF presentations and technical maps with mathematical coordinate placement, custom palettes, "
        "and dynamic two-pass <code>NumberedCanvas</code> page accounting.",
        styles['Body']
    ))
    story.append(Spacer(1, 8))

    # =========================================================================
    # SECTION 10: FILE AND DOCUMENT TECHNOLOGIES
    # =========================================================================
    story.append(Paragraph("10. File and Document Technologies", styles['SectionHeading']))
    story.append(Paragraph(
        "The repository maintains a structured digital asset vault comprising: "
        "<b>HTML Specifications</b> (<code>public/prototype_dossier.html</code>, <code>public/sih_presentation_deck.html</code>); "
        "<b>PDF Presentations</b> (<code>SkillPods_SIH26043_Official_Presentation.pdf</code>); "
        "<b>DOCX Technical Manuals</b> (<code>SkillPods_SIH_Technical_Approach.docx</code>); "
        "<b>Visual Media</b> (high-res factory discovery photography, brand icons in <code>public/</code>); "
        "<b>Database Payloads</b> (<code>mock_database_payloads.json</code>, <code>data/skillpods.json</code>); and "
        "<b>Cloud Infrastructure Manifests</b> (<code>Dockerfile</code>, <code>wrangler.toml</code>, <code>vercel.json</code>).",
        styles['Body']
    ))

    # Page Break to Section 11
    story.append(PageBreak())

    # =========================================================================
    # SECTION 11: TECHNOLOGIES MENTIONED BUT NOT FULLY IMPLEMENTED (AUDIT)
    # =========================================================================
    story.append(Paragraph("11. Prototype Audit: Technologies Mentioned but Not Fully Implemented", styles['SectionHeading']))
    story.append(Paragraph(
        "In the spirit of absolute transparency and technical rigour required for enterprise reviews and SIH jury defenses, "
        "this section audits technologies referenced in marketing or README specifications that currently function as "
        "<b>prototype simulations, mock interfaces, or planned roadmap milestones</b> rather than production infrastructure.",
        styles['Body']
    ))

    proto_data = [
        [Paragraph("Referenced Technology", styles['TableHeader']), Paragraph("Current Repository Reality", styles['TableHeader']), Paragraph("Codebase Evidence & Analysis", styles['TableHeader']), Paragraph("Classification", styles['TableHeader'])],
        [
            Paragraph("WebSockets", styles['TableCellBold']),
            Paragraph("Simulated via REST polling and in-memory event buffers.", styles['TableCell']),
            Paragraph("No ws/socket.io server running; telemetry refreshed via interval fetch.", styles['TableCell']),
            Paragraph("SIMULATED", styles['BadgeSimulated'])
        ],
        [
            Paragraph("WebRTC (Video/Audio)", styles['TableCellBold']),
            Paragraph("Simulated interactive UI in LivePodRoomModal.tsx.", styles['TableCell']),
            Paragraph("Uses CSS animated video mockups; no RTCPeerConnection or STUN/TURN server.", styles['TableCell']),
            Paragraph("SIMULATED", styles['BadgeSimulated'])
        ],
        [
            Paragraph("Screen Sharing", styles['TableCellBold']),
            Paragraph("Simulated screen-capture toggle.", styles['TableCell']),
            Paragraph("Does not invoke navigator.mediaDevices.getDisplayMedia().", styles['TableCell']),
            Paragraph("SIMULATED", styles['BadgeSimulated'])
        ],
        [
            Paragraph("Redis", styles['TableCellBold']),
            Paragraph("Node.js in-memory Map objects used.", styles['TableCell']),
            Paragraph("No redis client or connection string configured in backend runtime.", styles['TableCell']),
            Paragraph("IN-MEMORY", styles['BadgeSimulated'])
        ],
        [
            Paragraph("PostgreSQL / TimescaleDB", styles['TableCellBold']),
            Paragraph("Not present in database layer.", styles['TableCell']),
            Paragraph("Data persisted in JSON store / MongoDB; no relational SQL schema active.", styles['TableCell']),
            Paragraph("ROADMAP", styles['BadgeRoadmap'])
        ],
        [
            Paragraph("pgvector / Qdrant", styles['TableCellBold']),
            Paragraph("Heuristic keyword/tag synergy used.", styles['TableCell']),
            Paragraph("Vector database embeddings not yet computed via live embedding models.", styles['TableCell']),
            Paragraph("ROADMAP", styles['BadgeRoadmap'])
        ],
        [
            Paragraph("MQTT", styles['TableCellBold']),
            Paragraph("Not present in current codebase.", styles['TableCell']),
            Paragraph("No MQTT broker client or IoT telemetry ingestion pipeline installed.", styles['TableCell']),
            Paragraph("ROADMAP", styles['BadgeRoadmap'])
        ],
        [
            Paragraph("Razorpay / UPI Gateway", styles['TableCellBold']),
            Paragraph("Interactive simulator in EscrowPaymentModal.tsx.", styles['TableCell']),
            Paragraph("Simulates QR generation and webhook callbacks; no live payment gateway keys.", styles['TableCell']),
            Paragraph("SIMULATED", styles['BadgeSimulated'])
        ],
        [
            Paragraph("GitHub Webhooks / Actions", styles['TableCellBold']),
            Paragraph("Simulated PR scanner in GuruCopilotModal.tsx.", styles['TableCell']),
            Paragraph("No live GitHub App webhook listener or automated CI action runner in repo.", styles['TableCell']),
            Paragraph("SIMULATED", styles['BadgeSimulated'])
        ],
        [
            Paragraph("Cypress / Playwright", styles['TableCellBold']),
            Paragraph("Vitest is active; E2E browsers not configured.", styles['TableCell']),
            Paragraph("No cypress.config.ts or playwright.config.ts present in project root.", styles['TableCell']),
            Paragraph("ROADMAP", styles['BadgeRoadmap'])
        ],
        [
            Paragraph("Three.js / React Three Fiber", styles['TableCellBold']),
            Paragraph("Replaced by SVG + Motion and WebGL GLSL.", styles['TableCell']),
            Paragraph("3D character avatars are rendered via native SVG vectors to optimize load time.", styles['TableCell']),
            Paragraph("ARCH DECISION", styles['BadgeConfirmed'])
        ],
        [
            Paragraph("Google Maps API", styles['TableCellBold']),
            Paragraph("Static campus/enterprise address badges.", styles['TableCell']),
            Paragraph("No Google Maps JavaScript SDK or Mapbox integration rendered.", styles['TableCell']),
            Paragraph("NOT IMPLEMENTED", styles['BadgeSimulated'])
        ],
        [
            Paragraph("SQLite", styles['TableCellBold']),
            Paragraph("JSON flat-file store used instead.", styles['TableCell']),
            Paragraph("No sqlite3 or better-sqlite3 native binaries compiled in server.", styles['TableCell']),
            Paragraph("NOT IMPLEMENTED", styles['BadgeSimulated'])
        ],
    ]
    t_proto = Table(proto_data, colWidths=[90, 140, 205, 88])
    t_proto.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (3, 1), (3, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_proto)

    # Page Break to Section 12 & 13
    story.append(PageBreak())

    # =========================================================================
    # SECTION 12: FINAL CONFIRMED SYSTEM ARCHITECTURE
    # =========================================================================
    story.append(Paragraph("12. Final Confirmed System Architecture & Data Flow", styles['SectionHeading']))
    story.append(Paragraph(
        "<i>Source Note: Resolves the truncated heading in original technology-map source documentation.</i>",
        styles['DocSubtitle']
    ))
    story.append(Paragraph(
        "The confirmed core architecture of Skill-Pods is structured as a resilient, multi-tiered enterprise application "
        "spanning four clearly delineated operational strata:",
        styles['Body']
    ))

    arch_tiers = [
        [Paragraph("Architecture Tier", styles['TableHeader']), Paragraph("Core Technology Stack", styles['TableHeader']), Paragraph("Operational Responsibility & Data Flow", styles['TableHeader'])],
        [
            Paragraph("1. Presentation & Interaction Tier", styles['TableCellBold']),
            Paragraph("React 19, TypeScript, Tailwind CSS 4, Motion v12, Lucide Icons, WebGL GLSL Shaders, SVG 3D Avatars", styles['TableCell']),
            Paragraph("Renders role-based interfaces (Student, SME, Mentor, College, SuperAdmin). Manages local view state, "
                      "dispatches asynchronous REST queries, executes orbital Bézier carousels, and renders printable skill passports.", styles['TableCell'])
        ],
        [
            Paragraph("2. Edge Routing & Gateway Tier", styles['TableCellBold']),
            Paragraph("Cloudflare Pages Global Anycast CDN, Vercel Serverless Edge, Express Static Middleware", styles['TableCell']),
            Paragraph("Performs edge TLS termination, asset caching, SPA URL rewriting, and routes API requests to backend endpoints.", styles['TableCell'])
        ],
        [
            Paragraph("3. Security & Application Logic Tier", styles['TableCellBold']),
            Paragraph("Node.js 20 LTS, Express.js Router, PBKDF2/SHA-512 Crypto, HMAC-SHA256 Token Engine, Sliding-Window Rate Limiter, Google GIS", styles['TableCell']),
            Paragraph("Enforces authentication and RBAC roles; sanitizes input payloads against XSS and NoSQL injection; "
                      "executes milestone gating workflows; calculates pod matching heuristics; maintains security audit logs.", styles['TableCell'])
        ],
        [
            Paragraph("4. Persistence & Intelligence Tier", styles['TableCellBold']),
            Paragraph("Embedded Atomic JSON Store (skillpods.json), MongoDB Native Driver / Atlas Cluster, Google Gemini SDK (@google/genai)", styles['TableCell']),
            Paragraph("Stores authoritative business entities (users, pods, projects, passports, IP registry); executes AI problem "
                      "decomposition and pitch generation via Gemini API.", styles['TableCell'])
        ],
    ]
    t_arch = Table(arch_tiers, colWidths=[115, 145, 263])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 10))

    # =========================================================================
    # SECTION 13: CONFIRMED RECENT LIVE FEATURES & ENHANCEMENTS
    # =========================================================================
    story.append(Paragraph("13. Confirmed Recent Interactive Features & Upgraded Implementations", styles['SectionHeading']))
    story.append(Paragraph(
        "Over the recent development sprints, several production-tested interactive features and role utilities were "
        "successfully integrated and verified across localhost and Cloudflare Pages deployments:",
        styles['Body']
    ))

    recent_features = [
        [Paragraph("Interactive Feature Module", styles['TableHeader']), Paragraph("Component / Endpoint", styles['TableHeader']), Paragraph("Confirmed Implementation & User Experience", styles['TableHeader'])],
        [
            Paragraph("Parabolic Bézier Orbital Carousel", styles['TableCellBold']),
            Paragraph("src/components/InnovationCarousel.tsx", styles['CodeSnippet']),
            Paragraph("11 builder cards continuously glide left-to-right along a parametric quadratic Bézier curve with pause-on-hover, soft boundary wrap-around, and apex elevation.", styles['TableCell'])
        ],
        [
            Paragraph("Interactive 4-Stage Wall Torch", styles['TableCellBold']),
            Paragraph("src/components/LoginPage.tsx", styles['CodeSnippet']),
            Paragraph("Realistic overhead wall sconce functioning as a multi-tap lamp (Soft Glow -> Bright -> Turbo High-Beam -> Stealth Darkness OFF) with dynamic light cones.", styles['TableCell'])
        ],
        [
            Paragraph("Cryptographically Stamped Passport", styles['TableCellBold']),
            Paragraph("src/components/StudentSkillPassport.tsx", styles['CodeSnippet']),
            Paragraph("Digital student credential stamped with SHA-256 integrity hash, verified industry mentor seals, and scannable QR verification code.", styles['TableCell'])
        ],
        [
            Paragraph("Academic Scorecard & Document Vault", styles['TableCellBold']),
            Paragraph("StudentDashboard.tsx & Lightbox", styles['CodeSnippet']),
            Paragraph("Official CGPA standing, placement readiness badge, verified semester transcript uploader, and full-screen document lightbox previewer.", styles['TableCell'])
        ],
        [
            Paragraph("Community Network Directory", styles['TableCellBold']),
            Paragraph("src/components/CommunityNetworkModal.tsx", styles['CodeSnippet']),
            Paragraph("LinkedIn-style professional directory allowing Students, SMEs, Mentors, and Admins to browse verified profiles, filter by skills, and inspect portfolios.", styles['TableCell'])
        ],
        [
            Paragraph("Private 1-on-1 Direct Messaging", styles['TableCellBold']),
            Paragraph("DirectMessagingModal.tsx & /api/admin/all-chats", styles['CodeSnippet']),
            Paragraph("End-to-end private messaging between Students, SMEs, and Mentors; SuperAdmin exclusive audit view for compliance and fraud detection.", styles['TableCell'])
        ],
        [
            Paragraph("SME On-Site Discovery Marquee", styles['TableCellBold']),
            Paragraph("src/components/HeroImageShowcase.tsx", styles['CodeSnippet']),
            Paragraph("Continuous animated sliding photo marquee showcasing real-world manufacturing plant discovery visits, sprint lab sessions, and jury defenses.", styles['TableCell'])
        ],
        [
            Paragraph("Escrow & UPI Gateway Simulator", styles['TableCellBold']),
            Paragraph("src/components/EscrowPaymentModal.tsx", styles['CodeSnippet']),
            Paragraph("Simulated milestone funding vault locking bounties in escrow and releasing upon mentor sign-off with simulated UPI QR payment codes.", styles['TableCell'])
        ],
        [
            Paragraph("NAAC & NIRF Accreditation Exporter", styles['TableCellBold']),
            Paragraph("src/components/NaacReportModal.tsx", styles['CodeSnippet']),
            Paragraph("1-click official audit report generation exporting verified industry collaboration metrics mapped to NAAC Criterion 3.5.1 and NIRF parameters.", styles['TableCell'])
        ],
        [
            Paragraph("Cyberpunk 404 Telemetry Radar", styles['TableCellBold']),
            Paragraph("src/components/NotFoundPage.tsx", styles['CodeSnippet']),
            Paragraph("High-tech error view featuring diagnostic telemetry radar, route recovery buttons (Home, Workspace, Community), and fallback handling.", styles['TableCell'])
        ],
    ]
    t_recent = Table(recent_features, colWidths=[120, 140, 263])
    t_recent.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
        ('GRID', (0, 0), (-1, -1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_recent)

    # Page Break to Section 14
    story.append(PageBreak())

    # =========================================================================
    # SECTION 14: STRATEGIC PRODUCTION ROADMAP (THINGS WE WILL ADD)
    # =========================================================================
    story.append(Paragraph("14. Strategic Production Roadmap: The Updated Things We Will Add", styles['SectionHeading']))
    story.append(Paragraph(
        "To elevate Skill-Pods from an advanced hackathon prototype to an enterprise-grade, nation-scale digital public infrastructure, "
        "the engineering team has defined a structured 5-Phase Production Evolution Plan. "
        "Each phase systematically addresses and replaces the simulated technologies identified in Section 11.",
        styles['Body']
    ))

    roadmap_phases = [
        [
            Paragraph("Phase 1: Real-Time Communication & Telemetry Infrastructure", styles['CalloutTitle']),
            Paragraph(
                "<b>Goal:</b> Transition from simulated video sprint rooms and interval polling to production real-time infrastructure.<br/>"
                "&bull; <b>Socket.io & WebSocket Gateway:</b> Deploy a dedicated WebSocket cluster backed by Redis Pub/Sub for instantaneous "
                "direct messaging, sprint telemetry, active participant presence, and live Kanban task updates.<br/>"
                "&bull; <b>LiveKit SFU / Coturn STUN/TURN:</b> Replace simulated video canvas with a production WebRTC Selective Forwarding Unit (SFU) "
                "via LiveKit Cloud or self-hosted Mediasoup. Enables sub-100ms multi-party audio/video conferencing, crystal-clear screen sharing, "
                "and native audio wave packet analysis.<br/>"
                "&bull; <b>Milestone:</b> Full production deployment of 4-participant live sprint rooms with zero latency dropouts.",
                styles['CalloutText']
            )
        ],
        [
            Paragraph("Phase 2: Hybrid Relational & Vector Persistence Engine", styles['CalloutTitle']),
            Paragraph(
                "<b>Goal:</b> Upgrade persistence from JSON flat-files to an enterprise hybrid database with semantic AI matching.<br/>"
                "&bull; <b>PostgreSQL 16 Multi-Tenant Store:</b> Establish strongly-typed relational schemas with ACID guarantees for financial ledgers, "
                "user authentication, college IP licensing contracts, and milestone gate state machines.<br/>"
                "&bull; <b>pgvector & Qdrant Vector Search:</b> Compute 768-dimensional text embeddings of student github repositories, "
                "coursework transcripts, and SME business problem statements using Gemini Embeddings. Perform cosine similarity searches to "
                "deliver sub-second semantic pod recommendations with 95%+ precision.<br/>"
                "&bull; <b>Redis Cache:</b> Implement Redis cluster for sub-millisecond session caching and sliding-window rate limiting.",
                styles['CalloutText']
            )
        ],
        [
            Paragraph("Phase 3: Production Payments & Milestone Escrow Smart-Vaults", styles['CalloutTitle']),
            Paragraph(
                "<b>Goal:</b> Replace simulated UPI payment flows with authorized banking gateway integration.<br/>"
                "&bull; <b>Razorpay / Cashfree Escrow Route:</b> Implement multi-party split payments where SME problem bounties are held in an "
                "RBI-compliant nodal escrow account upon sprint initiation.<br/>"
                "&bull; <b>Automated Milestone Disbursement:</b> Programmatic fund release triggered automatically when assigned industry mentors "
                "digitally sign off on milestone stage gates via <code>/api/mentor/milestone-gate/approve</code>.<br/>"
                "&bull; <b>Automated GST & TDS Invoicing:</b> Instant compilation and dispatch of GST tax invoices, college institutional royalty "
                "certificates, and student stipend payout receipts via the Python ReportLab engine.",
                styles['CalloutText']
            )
        ],
        [
            Paragraph("Phase 4: GitHub App Integration & Automated AST Security CI/CD", styles['CalloutTitle']),
            Paragraph(
                "<b>Goal:</b> Automate code contribution verification, PR scanning, and milestone gate validation.<br/>"
                "&bull; <b>Official Skill-Pods GitHub App:</b> Organizations and student pods install the Skill-Pods GitHub App. It listens to "
                "pull request webhooks (<code>pull_request.opened</code>, <code>pull_request.synchronize</code>, <code>push</code>).<br/>"
                "&bull; <b>Automated AST & OWASP Security Scanner:</b> Real AST analysis using Semgrep and SonarQube running in Dockerized worker queues. "
                "Automatically audits code for SQL injection, hardcoded secrets, and XSS before mentors review pull requests.<br/>"
                "&bull; <b>End-to-End Test Automation:</b> Implementation of Cypress and Playwright test suites covering full end-to-end role journeys.",
                styles['CalloutText']
            )
        ],
        [
            Paragraph("Phase 5: Industrial Hardware & IoT Edge Telemetry Pods", styles['CalloutTitle']),
            Paragraph(
                "<b>Goal:</b> Expand beyond pure software pods to support manufacturing, logistics, and embedded IoT problem statements.<br/>"
                "&bull; <b>MQTT Telemetry Ingestion:</b> Implement an EMQX / Eclipse Mosquitto MQTT broker accepting sensor telemetry from "
                "SME factory floors (e.g. Bhagyashree Polymers injection molding machines, vibration sensors, energy meters).<br/>"
                "&bull; <b>Edge TimescaleDB Timeseries Store:</b> Real-time ingestion of high-frequency time-series data for predictive maintenance "
                "and yield optimization student capstone challenges.",
                styles['CalloutText']
            )
        ],
    ]

    for item in roadmap_phases:
        t_phase = Table([[item[0]], [item[1]]], colWidths=[PRINTABLE_W])
        t_phase.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
            ('BOX', (0, 0), (-1, -1), 1, CARD_BORDER),
            ('TOPPADDING', (0, 0), (-1, -1), 3.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(t_phase)
        story.append(Spacer(1, 5))

    # Concluding Box
    story.append(Spacer(1, 5))
    story.append(create_callout_box(
        "Institutional Alignment & SIH Jury Defense Conclusion",
        "The Skill-Pods platform embodies the spirit of the National Education Policy (NEP 2020) and the Smart India Hackathon "
        "by breaking institutional silos. By uniting verified student engineering talent, SME industrial challenges, "
        "and veteran industry mentorship into a mathematically auditable digital ecosystem, Skill-Pods converts classroom academic "
        "projects into commercial intellectual property and production-grade software solutions.",
        styles,
        border_color=ACCENT_EMERALD,
        bg_color=colors.HexColor("#f0fdf4")
    ))

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated technology map PDF: {output_filename}")


if __name__ == "__main__":
    output_pdf = "SkillPods_Complete_Technology_Map_and_Architecture.pdf"
    if len(sys.argv) > 1:
        output_pdf = sys.argv[1]
    generate_pdf(output_pdf)
