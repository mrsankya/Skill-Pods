export type Language = 'en' | 'hi' | 'mr';

export interface TranslationDict {
  portalTitle: string;
  portalSubtitle: string;
  backHome: string;
  quickReport: string;
  formalForm: string;
  heroBadge: string;
  heroHeadline: string;
  heroDesc: string;
  totalChallenges: string;
  universityPods: string;
  csrGrants: string;
  beneficiaries: string;
  quickIntakeTitle: string;
  aiChatbot: string;
  aiChatbotDesc: string;
  voiceNote: string;
  voiceNoteDesc: string;
  photos: string;
  photosDesc: string;
  videoClip: string;
  videoClipDesc: string;
  trackerTitle: string;
  trackerPlaceholder: string;
  trackButton: string;
  nationalPsHeader: string;
  nationalPsDesc: string;
  allThemes: string;
  softwareOnly: string;
  hardwareOnly: string;
  exportForHackathon: string;
  searchPlaceholder: string;
  districtLabel: string;
  allDistricts: string;
  showingChallenges: string;
  liveSynced: string;
  upvote: string;
  upvotes: string;
  pilotGrant: string;
  stage1: string;
  stage2: string;
  stage3: string;
  stage4: string;
  stage5: string;
  submitter: string;
  assignedPod: string;
  communityImpact: string;
  copyPs: string;
  copied: string;
  takeForHackathon: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    portalTitle: 'SkillPods Public Portal',
    portalSubtitle: 'Govt of Jharkhand & MIC Open Innovation Platform',
    backHome: 'Back to Home',
    quickReport: '+ Quick Report (Easy)',
    formalForm: 'Formal PRD Form',
    heroBadge: 'Open Innovation Public Transparency Hub',
    heroHeadline: 'Crowdsourcing Societal Challenges & SIH Hackathon Bank',
    heroDesc: 'Connecting grassroots issues across Jharkhand and 231 National Smart India Hackathon problem statements with multidisciplinary university student pods, faculty mentors, and CSR grants.',
    totalChallenges: 'Total Challenges',
    universityPods: 'University Pods',
    csrGrants: 'CSR Grants Active',
    beneficiaries: 'Beneficiaries',
    quickIntakeTitle: 'Submit Any Problem in Simple Non-Tech Form:',
    aiChatbot: 'AI Chatbot',
    aiChatbotDesc: 'Chat in simple language',
    voiceNote: 'Voice Note',
    voiceNoteDesc: 'Speak & auto-transcribe',
    photos: 'Photos',
    photosDesc: 'Snap & upload evidence',
    videoClip: 'Video Clip',
    videoClipDesc: 'Record 15-60s video',
    trackerTitle: 'Citizen Tracker: Check Your Submitted Issue Status',
    trackerPlaceholder: 'Enter Ticket ID (e.g. JH-WATER-2026-081), Village, or District...',
    trackButton: 'Track Status',
    nationalPsHeader: 'Smart India Hackathon (SIH) 2026 Problem Statements Bank (231 PS Loaded)',
    nationalPsDesc: 'Universities and colleges can browse, filter, and adopt official ministry problem statements directly for hackathons, capstones, and student pods.',
    allThemes: 'All Themes',
    softwareOnly: 'Software',
    hardwareOnly: 'Hardware',
    exportForHackathon: 'Export for Hackathon',
    searchPlaceholder: 'Search challenges by keyword, ministry, PS number, or district...',
    districtLabel: 'District:',
    allDistricts: 'All 24 Districts of Jharkhand',
    showingChallenges: 'Showing',
    liveSynced: 'Govt of Jharkhand & MIC Engine Synced',
    upvote: 'Upvote',
    upvotes: 'Upvotes',
    pilotGrant: 'Pilot Grant / Bounty',
    stage1: '1. Submitted',
    stage2: '2. Triaged',
    stage3: '3. Pod Assigned',
    stage4: '4. Field Pilot',
    stage5: '5. Deployed',
    submitter: 'Submitter / Ministry:',
    assignedPod: 'Assigned Pod & University:',
    communityImpact: 'Community Impact:',
    copyPs: 'Adopt for Hackathon',
    copied: 'Adopted to Clipboard! ✓',
    takeForHackathon: 'Adopt this PS for Hackathon / Pod'
  },
  hi: {
    portalTitle: 'स्किलपॉड्स सार्वजनिक मंच',
    portalSubtitle: 'झारखंड सरकार एवं शिक्षा मंत्रालय नवाचार प्रकोष्ठ (MIC)',
    backHome: 'होम पेज पर जाएं',
    quickReport: '+ आसान रिपोर्टिंग (सरल)',
    formalForm: 'विस्तृत PRD फॉर्म',
    heroBadge: 'खुला नवाचार एवं जन पारदर्शिता मंच',
    heroHeadline: 'झारखंड सामाजिक चुनौतियां एवं राष्ट्रीय हैकाथॉन बैंक',
    heroDesc: 'झारखंड के सभी 24 जिलों की जमीनी समस्याओं एवं 231 राष्ट्रीय स्मार्ट इंडिया हैकाथॉन समस्याओं को विश्वविद्यालय छात्रों, प्राध्यापकों और CSR अनुदान से जोड़ना।',
    totalChallenges: 'कुल समस्याएं',
    universityPods: 'विश्वविद्यालय पॉड्स',
    csrGrants: 'सक्रिय CSR अनुदान',
    beneficiaries: 'लाभार्थी नागरिक',
    quickIntakeTitle: 'कोई भी समस्या बिना तकनीकी परेशानी के दर्ज करें:',
    aiChatbot: 'एआई चैटबॉट',
    aiChatbotDesc: 'बातचीत करके बताएं',
    voiceNote: 'वॉइस नोट',
    voiceNoteDesc: 'बोलकर रिकॉर्ड करें',
    photos: 'फोटो अपलोड',
    photosDesc: 'फोटो खींचकर भेजें',
    videoClip: 'वीडियो क्लिप',
    videoClipDesc: '15-60 सेकंड का वीडियो',
    trackerTitle: 'नागरिक ट्रैकर: अपनी दर्ज समस्या की स्थिति जांचें',
    trackerPlaceholder: 'टिकट संख्या (उदा. JH-WATER-2026-081), गांव या जिला दर्ज करें...',
    trackButton: 'स्थिति देखें',
    nationalPsHeader: 'स्मार्ट इंडिया हैकाथॉन 2026 समस्या बैंक (231 समस्याएं उपलब्ध)',
    nationalPsDesc: 'कॉलेज और संस्थान अपने हैकाथॉन और फाइनल ईयर प्रोजेक्ट्स के लिए सीधे यहां से मंत्रालय की समस्याएं चुन सकते हैं।',
    allThemes: 'सभी थीम्स',
    softwareOnly: 'सॉफ्टवेयर',
    hardwareOnly: 'हार्डवेयर',
    exportForHackathon: 'हैकाथॉन के लिए डाउनलोड',
    searchPlaceholder: 'कीवर्ड, मंत्रालय, PS संख्या या जिले से खोजें...',
    districtLabel: 'जिला:',
    allDistricts: 'झारखंड के सभी 24 जिले',
    showingChallenges: 'दिखाए जा रहे हैं',
    liveSynced: 'झारखंड सरकार एवं MIC द्वारा प्रमाणित',
    upvote: 'समर्थन दें (Upvote)',
    upvotes: 'वोट',
    pilotGrant: 'पायलट अनुदान',
    stage1: '1. दर्ज हुआ',
    stage2: '2. जांच पूरी',
    stage3: '3. पॉड आवंटित',
    stage4: '4. फील्ड पायलट',
    stage5: '5. तैनात व प्रमाणित',
    submitter: 'समस्या प्रस्तुतकर्ता / मंत्रालय:',
    assignedPod: 'आवंटित पॉड व कॉलेज:',
    communityImpact: 'सामाजिक प्रभाव:',
    copyPs: 'हैकाथॉन हेतु चुनें',
    copied: 'कॉपी हो गया! ✓',
    takeForHackathon: 'इस समस्या को अपने हैकाथॉन के लिए अपनाएं'
  },
  mr: {
    portalTitle: 'स्किलपॉड्स सार्वजनिक मंच',
    portalSubtitle: 'झारखंड सरकार आणि शिक्षण मंत्रालय इनोव्हेशन सेल (MIC)',
    backHome: 'मुख्य पृष्ठावर जा',
    quickReport: '+ सोपी नोंदणी (Aasan)',
    formalForm: 'सविस्तर फॉर्म',
    heroBadge: 'ओपन इनोव्हेशन आणि पारदर्शकता पोर्टल',
    heroHeadline: 'सामाजिक समस्या सोडवणूक व राष्ट्रीय हॅकाथॉन बँक',
    heroDesc: 'स्थानिक ग्रामीण व नागरिक समस्या आणि 231 राष्ट्रीय स्मार्ट इंडिया हॅकाथॉन समस्यांचे तंत्रज्ञान विद्यापीठे व CSR अनुदानातून निराकरण.',
    totalChallenges: 'एकूण समस्या',
    universityPods: 'विद्यापीठ पॉड्स',
    csrGrants: 'सक्रिय CSR निधी',
    beneficiaries: 'लाभार्थी नागरिक',
    quickIntakeTitle: 'कोणतीही समस्या सोप्या पद्धतीने नोंदवा:',
    aiChatbot: 'एआय चॅटबॉट',
    aiChatbotDesc: 'संभाषण करून सांगा',
    voiceNote: 'व्हॉइस नोट',
    voiceNoteDesc: 'बोलून रेकॉर्ड करा',
    photos: 'फोटो पुरावा',
    photosDesc: 'फोटो काढून पाठवा',
    videoClip: 'व्हिडिओ क्लिप',
    videoClipDesc: 'लहान व्हिडिओ पाठवा',
    trackerTitle: 'नागरिक ट्रॅकर: नोंदवलेल्या समस्येची स्थिती तपासा',
    trackerPlaceholder: 'तिकीट क्रमांक (उदा. JH-WATER-2026-081), गाव किंवा जिल्हा टाका...',
    trackButton: 'स्थिती तपासा',
    nationalPsHeader: 'स्मार्ट इंडिया हॅकाथॉन 2026 समस्या बँक (231 समस्या समाविष्ट)',
    nationalPsDesc: 'महाविद्यालये व संस्था हॅकाथॉन व प्रोजेक्टसाठी थेट सरकारी मंत्रालयांच्या समस्या येथून स्वीकारू शकतात.',
    allThemes: 'सर्व थीम्स',
    softwareOnly: 'सॉफ्टवेअर',
    hardwareOnly: 'हार्डवेअर',
    exportForHackathon: 'हॅकाथॉनसाठी एक्सपोर्ट करा',
    searchPlaceholder: 'कीवर्ड, मंत्रालय, PS नंबर किंवा जिल्ह्याद्वारे शोधा...',
    districtLabel: 'जिल्हा:',
    allDistricts: 'झारखंडचे सर्व 24 जिल्हे',
    showingChallenges: 'दाखवत आहे',
    liveSynced: 'झारखंड सरकार व MIC द्वारे प्रमाणित',
    upvote: 'पाठिंबा द्या (Upvote)',
    upvotes: 'मते',
    pilotGrant: 'पायलट अनुदान',
    stage1: '1. नोंदणीकृत',
    stage2: '2. तपासणी पूर्ण',
    stage3: '3. पॉड नियुक्त',
    stage4: '4. फील्ड पायलट',
    stage5: '5. तैनात व यशस्वी',
    submitter: 'सादरकर्ता / मंत्रालय:',
    assignedPod: 'नियुक्त पॉड व कॉलेज:',
    communityImpact: 'सामाजिक प्रभाव:',
    copyPs: 'हॅकाथॉनसाठी निवडा',
    copied: 'कॉपी झाले! ✓',
    takeForHackathon: 'हॅकाथॉन किंवा पॉडसाठी ही समस्या निवडा'
  }
};
