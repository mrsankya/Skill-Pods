import os
import sys
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

# Palette
PRIMARY = colors.HexColor("#3c0091")       # Deep SIH Purple
SECONDARY = colors.HexColor("#6d4ec7")     # Vibrant Purple
ACCENT = colors.HexColor("#0284c7")        # Blue
SUCCESS = colors.HexColor("#059669")       # Emerald
WARNING = colors.HexColor("#d97706")       # Amber
DARK_TEXT = colors.HexColor("#0f172a")     # Slate 900
BODY_TEXT = colors.HexColor("#334155")     # Slate 700
MUTED_TEXT = colors.HexColor("#64748b")    # Slate 500
LIGHT_BG = colors.HexColor("#f8fafc")      # Slate 50
CARD_BG = colors.HexColor("#f1f5f9")       # Slate 100
BORDER_COLOR = colors.HexColor("#cbd5e1")  # Slate 300
HEADER_BG = colors.HexColor("#1e1b4b")     # Indigo 950
WHITE = colors.HexColor("#ffffff")

def draw_header_footer(canvas_obj, doc):
    canvas_obj.saveState()
    w, h = landscape(A4) # 841.89 x 595.27 pt
    
    # Top Header Banner
    canvas_obj.setFillColor(HEADER_BG)
    canvas_obj.rect(0, h - 45, w, 45, fill=1, stroke=0)
    
    # Header Content
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.setFillColor(WHITE)
    canvas_obj.drawString(40, h - 28, "SMART INDIA HACKATHON 2026")
    
    canvas_obj.setFont("Helvetica", 9)
    canvas_obj.setFillColor(colors.HexColor("#c7d2fe"))
    canvas_obj.drawString(225, h - 28, "|  Problem Statement ID: SIH26043  |  Govt of Jharkhand & MIC")
    
    canvas_obj.setFont("Helvetica-Bold", 9)
    canvas_obj.setFillColor(colors.HexColor("#34d399"))
    canvas_obj.drawRightString(w - 40, h - 28, "PROJECT: SKILL-PODS")
    
    # Bottom Footer Banner
    canvas_obj.setFillColor(LIGHT_BG)
    canvas_obj.rect(0, 0, w, 35, fill=1, stroke=0)
    canvas_obj.setStrokeColor(BORDER_COLOR)
    canvas_obj.setLineWidth(1)
    canvas_obj.line(40, 35, w - 40, 35)
    
    canvas_obj.setFont("Helvetica-Bold", 9)
    canvas_obj.setFillColor(PRIMARY)
    canvas_obj.drawString(40, 14, "TEAM: [Your Team Name]")
    
    canvas_obj.setFont("Helvetica", 8.5)
    canvas_obj.setFillColor(MUTED_TEXT)
    canvas_obj.drawCentredString(w / 2.0, 14, "Demand-Driven Societal Innovation Collaboration Portal | NEP 2020 Aligned")
    
    canvas_obj.setFont("Helvetica-Bold", 9)
    canvas_obj.setFillColor(DARK_TEXT)
    canvas_obj.drawRightString(w - 40, 14, f"Slide {doc.page} of 6")
    
    canvas_obj.restoreState()


def build_clean_pdf():
    pdf_path = "SkillPods_SIH26043_Official_Presentation.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=landscape(A4),
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=45
    )
    
    styles = getSampleStyleSheet()
    
    style_slide_title = ParagraphStyle(
        'SlideTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=PRIMARY,
        spaceAfter=2
    )
    
    style_slide_subtitle = ParagraphStyle(
        'SlideSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=MUTED_TEXT,
        spaceAfter=8
    )
    
    style_card_title = ParagraphStyle(
        'CardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=PRIMARY,
        spaceAfter=4
    )
    
    style_card_body = ParagraphStyle(
        'CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=BODY_TEXT,
        spaceAfter=3
    )
    
    style_hero_title = ParagraphStyle(
        'HeroTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=21,
        leading=25,
        textColor=PRIMARY,
        alignment=TA_CENTER
    )
    
    style_hero_sub = ParagraphStyle(
        'HeroSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=MUTED_TEXT,
        alignment=TA_CENTER
    )

    story = []

    # =========================================================================
    # SLIDE 1: COVER
    # =========================================================================
    story.append(Spacer(1, 10))
    
    badge = Paragraph("<font color='#3c0091'><b>MINISTRY OF EDUCATION'S INNOVATION CELL (MIC) &bull; GOVERNMENT OF JHARKHAND</b></font>", ParagraphStyle('B1', fontName='Helvetica-Bold', fontSize=9, alignment=TA_CENTER))
    t_b = Table([[badge]], colWidths=[760])
    t_b.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#ede9fe")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#c4b5fd")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_b)
    story.append(Spacer(1, 12))
    
    story.append(Paragraph("SKILL-PODS: DEMAND-FIRST SOCIETAL INNOVATION ENGINE", style_hero_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("A Digital Platform to Crowdsource Societal Challenges & Facilitate Collaborative Problem-Solving through Universities and Industry Partnerships", style_hero_sub))
    story.append(Spacer(1, 14))

    m_left = [
        Paragraph("<b>PROBLEM STATEMENT SPECIFICATION</b>", style_card_title),
        Spacer(1, 2),
        Paragraph("• <b>Problem Statement ID:</b> <font color='#059669'><b>SIH26043</b></font>", style_card_body),
        Paragraph("• <b>Problem Creator:</b> Sarim Moin", style_card_body),
        Paragraph("• <b>Organization:</b> Government of Jharkhand", style_card_body),
        Paragraph("• <b>Department:</b> Ministry of Education's Innovation Cell (MIC)", style_card_body),
        Paragraph("• <b>Theme:</b> Smart Education, Rural Livelihoods, Water, Agriculture & Public Services", style_card_body),
    ]

    m_right = [
        Paragraph("<b>EXECUTIVE SOLUTION SUMMARY</b>", style_card_title),
        Spacer(1, 2),
        Paragraph("• <b>Citizen Crowdsourcing:</b> Ingests hyper-local challenges via Web, Mobile & Voice-to-PRD.", style_card_body),
        Paragraph("• <b>GURU AI Matching:</b> Automatic 10-domain categorization & routing to university labs.", style_card_body),
        Paragraph("• <b>Multidisciplinary Pods:</b> Student engineers + faculty + industry mentor sprint pods.", style_card_body),
        Paragraph("• <b>NEP 2020 Skill Passports:</b> Verifiable SHA-256 digital proof-of-work for academic credits.", style_card_body),
        Paragraph("• <b>Live Prototype:</b> <font color='#6d4ec7'><b>https://skill-pods.pages.dev</b></font>", style_card_body)
    ]

    t_m = Table([[m_left, m_right]], colWidths=[370, 370])
    t_m.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_m)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION
    # =========================================================================
    story.append(Paragraph("📌 Slide 2 – Idea Title & Proposed Solution", style_slide_title))
    story.append(Paragraph("Skill-Pods: Demand-Driven Societal Innovation Collaboration Engine with Verifiable Stage-Gates", style_slide_subtitle))

    c1 = [
        Paragraph("<b>1. Detailed Solution</b>", style_card_title),
        Paragraph("• <b>Citizen Ingestion:</b> Citizens, Panchayats, & ULBs submit ground challenges with GPS, multimedia evidence, and voice audio.", style_card_body),
        Paragraph("• <b>AI Domain Routing:</b> Categorizes challenges into 10 state themes (Agriculture, Water, Healthcare, Rural Livelihoods, Urban Infra, etc.) and allocates them to matching universities.", style_card_body),
        Paragraph("• <b>Multidisciplinary Pods:</b> Cross-functional student teams build working solutions under faculty and industry guidance.", style_card_body),
        Paragraph("• <b>Escrow Milestone Gating:</b> Industry/CSR funds locked in escrow, released automatically upon mentor verification.", style_card_body)
    ]

    c2 = [
        Paragraph("<b>2. How It Addresses Problem</b>", style_card_title),
        Paragraph("• <b>Eliminates Fragmentation:</b> Bridges rural grassroot challenges directly with Higher Education Institutions (HEIs).", style_card_body),
        Paragraph("• <b>Stage-Gate Accountability:</b> 5-stage sprint gates guarantee that student projects don't end after viva, but graduate into deployable pilot software.", style_card_body),
        Paragraph("• <b>Rural Inclusivity:</b> Spoken regional voice-to-text PRD generation empowers non-technical rural citizens and Panchayat leaders.", style_card_body),
        Paragraph("• <b>Measurable Impact:</b> Direct tracking of solve rates across Jharkhand's 24 districts.", style_card_body)
    ]

    c3 = [
        Paragraph("<b>3. Innovation & Uniqueness</b>", style_card_title),
        Paragraph("• <b>🪪 Verifiable Skill Passport:</b> Cryptographic SHA-256 stamped record of student PRs, LOC, and mentor stamps for NEP 2020 credits.", style_card_body),
        Paragraph("• <b>🎙️ Voice-to-PRD AI:</b> Ingests spoken regional audio and generates technical PRDs with budget estimates.", style_card_body),
        Paragraph("• <b>🔒 Milestone Escrow Vault:</b> Zero-loss fund locking for CSR & MSME sponsors with automated milestone release.", style_card_body),
        Paragraph("• <b>🏫 NAAC & NIRF Exporter:</b> 1-click audit certificates for institutional criteria 3.5.1 and 5.2.1.", style_card_body)
    ]

    t_s2 = Table([[c1, c2, c3]], colWidths=[246, 246, 246])
    t_s2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_s2)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 3: TECHNICAL APPROACH
    # =========================================================================
    story.append(Paragraph("📌 Slide 3 – Technical Approach & Implementation Methodology", style_slide_title))
    story.append(Paragraph("Production Full-Stack Cloud Architecture & 5-Stage Innovation Pipeline", style_slide_subtitle))

    t_left = [
        Paragraph("<b>TECHNOLOGY STACK BREAKDOWN</b>", style_card_title),
        Paragraph("• <b>Frontend Layer:</b> React 19, TypeScript, Tailwind CSS v4, Motion (smooth animations), Three.js Canvas avatars, Lucide iconography.", style_card_body),
        Paragraph("• <b>Backend & APIs:</b> Node.js / Express.js REST APIs with TypeScript runtime (TSX), rate-limiting middleware, input sanitization.", style_card_body),
        Paragraph("• <b>AI & NLP Engine:</b> Gemini / GenAI multi-modal models for voice-to-text PRD translation, AST code inspection, and pod synergy matching.", style_card_body),
        Paragraph("• <b>Database & Security:</b> MongoDB Atlas / SQLite persistence, SHA-256 cryptographic session signing, PBKDF2 password hashing, AES-256 vault.", style_card_body),
        Paragraph("• <b>Cloud & Real-Time:</b> Docker containers, WebRTC mesh video pods, GitHub Actions CI/CD pipelines, Cloudflare Pages hosting.", style_card_body)
    ]

    t_right = [
        Paragraph("<b>5-STAGE IMPLEMENTATION METHODOLOGY</b>", style_card_title),
        Paragraph("<b>1. Citizen Ingestion:</b> Multimedia evidence, district geo-tagging, & voice audio submitted via portal.", style_card_body),
        Paragraph("<b>2. AI Deduplication & HEI Routing:</b> Natural Language processing categorizes thematic domain and routes to matching university.", style_card_body),
        Paragraph("<b>3. Multidisciplinary Pod Sprints:</b> Student engineers assemble into 3-5 member pods with assigned faculty & industry mentor.", style_card_body),
        Paragraph("<b>4. Milestone Gate & Escrow Release:</b> Sprint deliverables (architecture, code, tests) inspected before unlocking milestone bounties.", style_card_body),
        Paragraph("<b>5. Field Pilot & Tech Transfer:</b> Deployment to local Panchayat / ULB + IP registration on institutional registry.", style_card_body)
    ]

    t_s3 = Table([[t_left, t_right]], colWidths=[370, 370])
    t_s3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_s3)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 4: FEASIBILITY & VIABILITY
    # =========================================================================
    story.append(Paragraph("📌 Slide 4 – Feasibility, Risk Analysis & Mitigation Strategy", style_slide_title))
    story.append(Paragraph("Multi-Tier Risk Assessment & Operational Viability for State-Wide Rollout", style_slide_subtitle))

    f1 = [
        Paragraph("<b>1. Feasibility Analysis</b>", style_card_title),
        Paragraph("• <b>Technical Feasibility:</b> Built on lightweight containerized microservices and responsive mobile-friendly views requiring low bandwidth (<50ms API latency).", style_card_body),
        Paragraph("• <b>Operational Feasibility:</b> Seamlessly integrates with existing university academic calendars, semester major projects, and NEP 2020 internship requirements.", style_card_body),
        Paragraph("• <b>Financial Viability:</b> Self-sustaining escrow & CSR sponsorship model. Universities earn institutional IP royalties, students earn milestone stipends, and MSMEs receive cost-effective R&D.", style_card_body)
    ]

    f2 = [
        Paragraph("<b>2. Challenges & Risks</b>", style_card_title),
        Paragraph("• <b>Risk A (Rural Digital Divide):</b> Citizens in remote Jharkhand blocks may struggle with written technical English submissions.", style_card_body),
        Paragraph("• <b>Risk B (Project Abandonment):</b> Projects historically get abandoned after academic viva examinations.", style_card_body),
        Paragraph("• <b>Risk C (Unverified Deliverables):</b> Code quality issues and AI hallucinations in student submissions.", style_card_body),
        Paragraph("• <b>Risk D (Industry Reluctance):</b> MSMEs hesitant to collaborate without clear IP rights and delivery guarantees.", style_card_body)
    ]

    f3 = [
        Paragraph("<b>3. Mitigation Strategies</b>", style_card_title),
        Paragraph("• <b>Fix A (Voice AI & CSCs):</b> Spoken regional audio-to-PRD converter and integration with Common Service Centres (CSCs).", style_card_body),
        Paragraph("• <b>Fix B (Milestone Escrow):</b> Financial bounties released in tranches + verifiable Skill Passport required for university graduation.", style_card_body),
        Paragraph("• <b>Fix C (Mandatory CI/CD Gates):</b> Automated test coverage (>80%) and formal mentor inspection before passing stage-gates.", style_card_body),
        Paragraph("• <b>Fix D (Dual IP Framework):</b> Sponsors receive 100% commercial usage rights; students retain open portfolio demo rights.", style_card_body)
    ]

    t_s4 = Table([[f1, f2, f3]], colWidths=[246, 246, 246])
    t_s4.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_s4)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 5: IMPACT AND BENEFITS
    # =========================================================================
    story.append(Paragraph("📌 Slide 5 – Social, Economic & Academic Impact", style_slide_title))
    story.append(Paragraph("Empowering 24 Districts of Jharkhand through Transformative University-Industry Synergies", style_slide_subtitle))

    i_left = [
        Paragraph("<b>1. STAKEHOLDER IMPACT</b>", style_card_title),
        Paragraph("• <b>Citizens & Panchayats:</b> Transparent tracking of local problems from submission to on-the-ground deployment.", style_card_body),
        Paragraph("• <b>Students & Researchers:</b> Real-world problem-solving experience, financial sprint stipends (₹10,000–₹50,000), and verified industry endorsements.", style_card_body),
        Paragraph("• <b>Higher Education Institutions:</b> Elevated NIRF & NAAC scores, improved campus placement readiness, and commercial software royalties.", style_card_body),
        Paragraph("• <b>MSMEs & Startups:</b> Access to agile R&D talent and ready-to-deploy digital solutions at fraction of corporate IT cost.", style_card_body)
    ]

    i_right = [
        Paragraph("<b>2. MULTI-DIMENSIONAL BENEFITS</b>", style_card_title),
        Paragraph("• <b>Social Benefits:</b> Accelerated solutions in public health, rural water monitoring, education accessibility, and smart agriculture.", style_card_body),
        Paragraph("• <b>Economic Benefits:</b> Direct wealth creation for student builders and modernization of local MSMEs across Jharkhand.", style_card_body),
        Paragraph("• <b>Academic NEP 2020 Benefits:</b> Fulfills mandatory multidisciplinary experiential learning and credit bank transfer requirements.", style_card_body),
        Paragraph("• <b>Governance Benefits:</b> Real-time dashboard for Government of Jharkhand / MIC showing district-wise innovation metrics.", style_card_body)
    ]

    t_s5 = Table([[i_left, i_right]], colWidths=[370, 370])
    t_s5.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_s5)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 6: RESEARCH AND REFERENCES
    # =========================================================================
    story.append(Paragraph("📌 Slide 6 – Research, References & Project Assets", style_slide_title))
    story.append(Paragraph("Evidence-Based Pedagogical Standards, Government Frameworks & Live Verification Links", style_slide_subtitle))

    r_left = [
        Paragraph("<b>1. POLICY & ACADEMIC FRAMEWORKS</b>", style_card_title),
        Paragraph("• <b>NEP 2020 (National Education Policy):</b> Section 11 & 12 on Experiential Learning, Multidisciplinary R&D, and Industry Linkages.", style_card_body),
        Paragraph("• <b>AICTE & MIC Guidelines:</b> National Innovation and Startup Policy (NISP) for Students and Faculty in HEIs.", style_card_body),
        Paragraph("• <b>NAAC Accreditation Manual:</b> Criterion 3 (Research, Innovations & Extension - 3.5.1 Collaboration) & Criterion 5 (Student Progression - 5.2.1).", style_card_body),
        Paragraph("• <b>Academic Literature:</b> Chesbrough, H. (Open Innovation Models), IEEE Transactions on Engineering Management (Distributed Sprint Orchestration).", style_card_body)
    ]

    r_right = [
        Paragraph("<b>2. LIVE PROTOTYPE & SOURCE CODE ASSETS</b>", style_card_title),
        Paragraph("• <b>🌐 Live Production URL:</b> <font color='#6d4ec7'><b>https://skill-pods.pages.dev</b></font>", style_card_body),
        Paragraph("• <b>🐙 GitHub Open Repository:</b> <font color='#6d4ec7'><b>https://github.com/Sakshi-patil48/Skill-Pods.git</b></font>", style_card_body),
        Paragraph("• <b>👑 SuperAdmin Telemetry Console:</b> sanketbhende0@gmail.com", style_card_body),
        Paragraph("• <b>🧪 Pre-Seeded Evaluation Portals:</b> Student, Mentor, SME Company, College Dean, SuperAdmin.", style_card_body),
        Paragraph("• <b>📑 Technical Dossier:</b> /SkillPods_Prototype_Technical_Dossier.pdf", style_card_body)
    ]

    t_s6 = Table([[r_left, r_right]], colWidths=[370, 370])
    t_s6.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_s6)

    # Build Document using page callbacks
    doc.build(story, onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)
    print(f"Clean PDF generated successfully at {pdf_path}")

if __name__ == '__main__':
    build_clean_pdf()
