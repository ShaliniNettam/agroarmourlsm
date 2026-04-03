const fs = require('fs');
const path = require('path');

const translations = {
  hi: {
    heroTitle1: "स्मार्ट पशुधन देखभाल",
    heroTitle2: "यहाँ से शुरू होती है",
    heroSubtitle: "सरल, स्मार्ट निगरानी के साथ अपने मवेशियों और मुर्गियों को स्वस्थ रखें। एग्रोआर्मर आपको आधुनिक खेती के लिए आवश्यक सटीक उपकरण प्रदान करता है।",
    getStarted: "शुरू करें",
    
    newcastleDisease: "न्यूकैसल रोग (Newcastle Disease)",
    newcastleSymptoms: "सांस लेने में कठिनाई, खांसना, छींकना, पक्षाघात (paralysis) और हरे रंग का दस्त।",
    newcastleTreatment: "कोई विशेष इलाज नहीं। तुरंत अन्य पक्षियों से अलग करें और पशु चिकित्सक से संपर्क करें।",
    newcastlePrevention: "नियमित टीकाकरण, बायोसिक्योरिटी बढ़ाएं और बाहरी पक्षियों के संपर्क से बचें।",
    
    fowlPox: "फाउल पॉक्स (Fowl Pox)",
    fowlPoxSymptoms: "चेहरे, कंघी और वाटल पर मस्से जैसे दाने; चोंच और मुंह के अंदर पीले धब्बे।",
    fowlPoxTreatment: "कोई सटीक इलाज नहीं। एंटीसेप्टिक का उपयोग दाने पर करें और संक्रमित को अलग करें।",
    fowlPoxPrevention: "चूजों का टीकाकरण करें और फार्म के आस-पास मच्छरों को पनपने से रोकें।",
    
    coccidiosis: "कौक्सीडायोसिस (Coccidiosis)",
    coccidiosisSymptoms: "खूनी दस्त, पंखों का झड़ना, सुस्ती और तेज़ी से वजन कम होना।",
    coccidiosisTreatment: "पानी में एंटी-कौक्सीडियल दवाइयां (anti-coccidial drugs) मिलाएं। तुरंत अलगाव करें।",
    coccidiosisPrevention: "बिछावन (litter) को सूखा रखें, भीड़भाड़ से बचें और दवाई युक्त चारा दें।",

    fmd: "खुरपका-मुंहपका रोग (FMD)",
    fmdSymptoms: "तेज़ बुखार, मुंह, खुर और स्तनों पर छाले (blisters) आना, भारी लार टपकना।",
    fmdTreatment: "छालों को फिटकरी/लाल दवा से धोएं। डॉक्टर की सलाह से एंटीबायोटिक दें।",
    fmdPrevention: "साल में दो बार टीकाकरण कराएं। फार्म में किसी भी बाहरी जानवर का प्रवेश रोकें।",

    mastitis: "थनैला रोग (Mastitis)",
    mastitisSymptoms: "स्तन या थन में सूजन, गर्मी और दर्द; दूध में खून आना या दूध का फटना (clots)।",
    mastitisTreatment: "डॉक्टर द्वारा एंटीबायोटिक ट्यूब्स का थनों में उपयोग; ठंडी और गर्म सिंकाई।",
    mastitisPrevention: "दूध दूहने से पहले और बाद में थनों को एंटीसेप्टिक (टीट डिप) से साफ़ करें और स्वच्छता रखें।",

    blackQuarter: "लंगड़ा बुखार (Black Quarter)",
    blackQuarterSymptoms: "मांसपेशियों (खासकर जांघ के ऊपरी हिस्से) में सूजन, लंगड़ाना, तेज बुखार, दबाने पर कड़कड़ाहट की आवाज़।",
    blackQuarterTreatment: "यह बहुत तेजी से फैलता है, तुरंत भारी मात्रा में पेनिसिलिन (पशु चिकित्सक द्वारा) आवश्यक है।",
    blackQuarterPrevention: "मानसून से ठीक पहले वार्षिक टीकाकरण कराएं और मृत जानवर को गहराई में गाड़ें।"
  },
  bn: {
    heroTitle1: "স্মার্ট পশুপালন",
    heroTitle2: "এখান থেকেই শুরু হয়",
    heroSubtitle: "সহজ, স্মার্ট মনিটরিংয়ের মাধ্যমে আপনার গবাদি পশু এবং মুরগিকে সুস্থ রাখুন। অ্যাগ্রোআর্মার আধুনিক কৃষির জন্য প্রয়োজনীয় সরঞ্জাম সরবরাহ করে।",
    getStarted: "শুরু করুন",
    newcastleDisease: "রানীক্ষেত রোগ (Newcastle)",
    newcastleSymptoms: "শ্বাসকষ্ট, কাশি, হাঁচি, পক্ষাঘাত এবং সবুজ রঙের ডায়রিয়া।",
    newcastleTreatment: "নির্দিষ্ট কোনো প্রতিকার নেই। সংক্রামিতদের বিচ্ছিন্ন করুন।",
    newcastlePrevention: "নিয়মিত টিকাদান এবং ফার্মে জৈব নিরাপত্তা বৃদ্ধি করুন।",
    fowlPox: "ফাউল পক্স (Fowl Pox)",
    fowlPoxSymptoms: "মুখে, চিরুনি এবং গলায় আঁচিলের মতো নোডুলস; মুখের ভিতরে হলুদ দাগ।",
    fowlPoxTreatment: "নির্দিষ্ট কোনো প্রতিকার নেই। ক্ষতের উপর আয়োডিন ব্যবহার করুন।",
    fowlPoxPrevention: "বাচ্চাদের টিকাদান করুন। খামারের আশেপাশে মশা নিয়ন্ত্রণ করুন।",
    coccidiosis: "ককসিডিওসিস (Coccidiosis)",
    coccidiosisSymptoms: "রক্তাক্ত ডায়রিয়া, কুঁচকানো পালক, অলসতা এবং ওজন হ্রাস।",
    coccidiosisTreatment: "অবিলম্বে পানিতে অ্যান্টি-কক্সিডিয়াল ড্রাগ ব্যবহার করুন।",
    coccidiosisPrevention: "লিটার শুকনো রাখুন। অতিরিক্ত ভিড় এড়িয়ে চলুন।",
    fmd: "ক্ষুরা রোগ (FMD)",
    fmdSymptoms: "তীব্র জ্বর, মুখ ও ক্ষুরে ফোসকা (blisters) এবং অতিরিক্ত লালা পড়া।",
    fmdTreatment: "অ্যান্টিসেপটিক দিয়ে ক্ষত পরিষ্কার করুন। পশু চিকিৎসকের পরামর্শ নিন।",
    fmdPrevention: "বছরে দুবার টিকা দিন। বাইরের প্রাণীর প্রবেশ বন্ধ করুন।",
    mastitis: "ম্যাস্টাইটিস / ওলান প্রদাহ (Mastitis)",
    mastitisSymptoms: "ওলানে ফোলা, লাল হওয়া এবং ব্যথা; দুধে রক্ত বা জমাট বাঁধা অংশ দেখা যাওয়া।",
    mastitisTreatment: "পশু চিকিৎসকের পরামর্শে ইন্ট্রা-ম্যামারি টিউব ব্যবহার করুন।",
    mastitisPrevention: "দোহনের আগে ও পরে ওলান পরিষ্কার রাখুন (টিট ডিপ)। পরিচ্ছন্নতা বজায় রাখুন।",
    blackQuarter: "ব্ল্যাক কোয়ার্টার বা গালগোলা (Black Quarter)",
    blackQuarterSymptoms: "তীব্র জ্বর, খোঁড়ানো, পেশিতে ফোলা এবং চাপ দিলে মড়মড় শব্দ হওয়া।",
    blackQuarterTreatment: "তাত্ক্ষণিক পশু চিকিৎসা এবং পেনিসিলিন প্রয়োজন।",
    blackQuarterPrevention: "বর্ষার আগে নিয়মিত টিকাদান সম্পন্ন করুন।"
  },
  te: {
    heroTitle1: "స్మార్ట్ లైవ్‌స్టాక్ కేర్",
    heroTitle2: "ఇక్కడే ప్రారంభం",
    heroSubtitle: "సులభమైన, స్మార్ట్ పర్యవేక్షణతో మీ పశువులు మరియు కోళ్లను ఆరోగ్యంగా ఉంచండి. ఆధునిక వ్యవసాయానికి అవసరమైన సాధనాలను AgroArmor అందిస్తుంది.",
    getStarted: "ప్రారంభించండి",
    newcastleDisease: "కొత్తకోట వ్యాధి (Newcastle)",
    newcastleSymptoms: "శ్వాస తీసుకోవడంలో ఇబ్బంది, పచ్చని విరేచనాలు, పక్షవాతం.",
    newcastleTreatment: "ప్రత్యేక చికిత్స లేదు. వ్యాధి సోకిన వాటిని వెంటనే వేరు చేయండి.",
    newcastlePrevention: "రెగ్యులర్ టీకాలు వేయించడం మరియు బయోసెక్యూరిటీ పాటించడం.",
    fowlPox: "ఫౌల్ పాక్స్ / మశూచి (Fowl Pox)",
    fowlPoxSymptoms: "ముఖం పై మొటిమలు లేదా బొబ్బలు; నోటిలో పసుపు రంగు పుండ్లు.",
    fowlPoxTreatment: "పుండ్ల పై అయోడిన్ పూయండి మరియు వాటిని వేరుగా ఉంచండి.",
    fowlPoxPrevention: "కోడి పిల్లలకు టీకాలు వేయించండి, దోమలను నివారించండి.",
    coccidiosis: "కాక్సిడియోసిస్ / రక్త పారుడు వ్యాధి",
    coccidiosisSymptoms: "రక్త విరేచనాలు, ఈకలు రాలిపోవడం మరియు బరువు తగ్గడం.",
    coccidiosisTreatment: "నీటిలో యాంటీ - కాక్సిడియల్ మందులను కలపండి.",
    coccidiosisPrevention: "నేలను (లిట్టర్) పొడిగా ఉంచండి. ఎక్కువ కోళ్లను ఒకే చోట బంధించవద్దు.",
    fmd: "గాలికుంటు వ్యాధి (FMD)",
    fmdSymptoms: "తీవ్రమైన జ్వరం, నోరు మరియు గిట్టల వద్ద బొబ్బలు, అధికంగా చొంగ కార్చడం.",
    fmdTreatment: "గాయాలను యాంటీసెప్టిక్ తో కడగండి. డాక్టర్‌ని సంప్రదించండి.",
    fmdPrevention: "సంవత్సరానికి రెండు సార్లు టీకాలు వేయించండి.",
    mastitis: "పొదుగు వాపు వ్యాధి (Mastitis)",
    mastitisSymptoms: "పొదుగు వాపు, వెచ్చదనం మరియు నొప్పి; పాలలో రక్తం లేదా గడ్డలు.",
    mastitisTreatment: "డాక్టర్ సలహాతో మందులు వాడండి, శుభ్రంగా కడగండి.",
    mastitisPrevention: "పాలు పితకడానికి ముందు, తర్వాత పొదుగును డిప్‌తో శుభ్రం చేయండి.",
    blackQuarter: "జబ్బ వాపు వ్యాధి (Black Quarter)",
    blackQuarterSymptoms: "కండరాలలో వాపు, కుంటుపడటం, నొక్కినప్పుడు శబ్దం రావడం, తీవ్రమైన జ్వరం.",
    blackQuarterTreatment: "వెంటనే వెటర్నరీ డాక్టర్‌ను సంప్రదించి పెన్సిలిన్ ఇప్పించండి.",
    blackQuarterPrevention: "వర్షాకాలానికి ముందు తప్పనిసరిగా టీకాలు వేయించండి."
  },
  ta: {
    heroTitle1: "அறிவார்ந்த கால்நடை பராமரிப்பு",
    heroTitle2: "இங்கே தொடங்குகிறது",
    heroSubtitle: "எளிய மற்றும் அறிவார்ந்த கண்காணிப்புடன் உங்கள் கால்நடை மற்றும் கோழிகளை ஆரோக்கியமாக வைத்திருங்கள்.",
    getStarted: "தொடங்குங்கள்",
    newcastleDisease: "வெள்ளைக்கழிச்சல் நோய் (Newcastle)",
    newcastleSymptoms: "சுவாச சிரமம், இருமல், முடக்கம் மற்றும் பச்சை நிற வயிற்றுப்போக்கு.",
    newcastleTreatment: "குறிப்பிட்ட சிகிச்சை இல்லை. உடனடியாக நோயுற்ற கோழிகளை தனிமைப்படுத்தவும்.",
    newcastlePrevention: "முறையான தடுப்பூசிகள் மற்றும் உயிர் பாதுகாப்பு முறைகளை பின்பற்றவும்.",
    fowlPox: "அம்மை நோய் (Fowl Pox)",
    fowlPoxSymptoms: "முகம் மற்றும் கொண்டையில் மரு போன்ற காயங்கள்; வாயின் உள்ளே மஞ்சள் நிற படலம்.",
    fowlPoxTreatment: "குறிப்பிட்ட சிகிச்சை இல்லை. புண்கள் மீது அயோடின் பயன்படுத்தவும்.",
    fowlPoxPrevention: "தடுப்பூசி போடவும். கொசுக்களை கட்டுப்படுத்தவும்.",
    coccidiosis: "காக்சிடியோசிஸ் (Coccidiosis)",
    coccidiosisSymptoms: "ரத்தக் கழிச்சல், எடை குறைதல் மற்றும் சோர்வு.",
    coccidiosisTreatment: "குடிநீரில் மருந்து கலந்து உடனடியாக கொடுக்கவும்.",
    coccidiosisPrevention: "கோழி கொட்டகையை உலர்வாக வைத்திருக்கவும் அதிக நெரிசலை தவிர்க்கவும்.",
    fmd: "கோமாரி நோய் (FMD)",
    fmdSymptoms: "அதிக காய்ச்சல், வாய் மற்றும் குளம்புகளில் கொப்புளங்கள், அதிக உமிழ்நீர் வடிதல்.",
    fmdTreatment: "கொப்புளங்களை கிருமிநாசினி கொண்டு கழுவவும். கால்நடை மருத்துவரை அணுகவும்.",
    fmdPrevention: "ஆண்டுக்கு இருமுறை தடுப்பூசி போடவும்.",
    mastitis: "மடிநோய் (Mastitis)",
    mastitisSymptoms: "மடியில் வீக்கம், வலி, பால் கெட்டுப்போதல் மற்றும் பாலில் ரத்தம்.",
    mastitisTreatment: "மருத்துவரின் ஆலோசனையின் பேரில் மடிக்கு உள்ளே மருந்து செலுத்தப்படும்.",
    mastitisPrevention: "பால் கறப்பதற்கு முன்னும் பின்னும் மடியை கிருமி நாசினி கொண்டு சுத்தம் செய்யவும்.",
    blackQuarter: "சப்பை நோய் (Black Quarter)",
    blackQuarterSymptoms: "காய்ச்சல், தசை வீக்கம் மற்றும் தசையை அழுத்தினால் சத்தம் வருதல்.",
    blackQuarterTreatment: "உடனடியாக மருத்துவரை அணுகி சிகிச்சை (Penicillin) பெற வேண்டும்.",
    blackQuarterPrevention: "மழைக்காலத்திற்கு முன்னதாக தடுப்பூசி செலுத்த வேண்டும்."
  },
  kn: {
    heroTitle1: "ಸ್ಮಾರ್ಟ್ ಜಾನುವಾರು ಆರೈಕೆ",
    heroTitle2: "ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭ",
    heroSubtitle: "ಸರಳ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಜಾನುವಾರು ಮತ್ತು ಕೋಳಿಗಳನ್ನು ಆರೋಗ್ಯವಾಗಿಡಿ.",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    newcastleDisease: "ರಾಣಿಖೇತ್ ಕಾಯಿಲೆ (Newcastle)",
    newcastleSymptoms: "ಉಸಿರಾಟದ ತೊಂದರೆ, ಪಾರ್ಶ್ವವಾಯು ಮತ್ತು ಹಸಿರು ಬಣ್ಣದ ಭೇದಿ.",
    newcastleTreatment: "ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ. ಅನಾರೋಗ್ಯದ ಹಕ್ಕಿಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ.",
    newcastlePrevention: "ನಿಯಮಿತ ಲಸಿಕೆ ಮತ್ತು ಜೈವಿಕ ಸುರಕ್ಷತೆ.",
    fowlPox: "ಸಿಡುಬು ರೋಗ (Fowl Pox)",
    fowlPoxSymptoms: "ಮುಖ ಮತ್ತು ಜುಟ್ಟಿನ ಮೇಲೆ ಗುಳ್ಳೆಗಳು; ಬಾಯಿಯೊಳಗೆ ಹಳದಿ ಕಲೆಗಳು.",
    fowlPoxTreatment: "ನಿರ್ದಿಷ್ಟ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ. ಗಾಯಗಳ ಮೇಲೆ ಅಯೋಡಿನ್ ಬಳಸಿ.",
    fowlPoxPrevention: "ಲಸಿಕೆ ನೀಡಿ ಮತ್ತು ಸೊಳ್ಳೆಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ.",
    coccidiosis: "ರಕ್ತಭೇದಿ (Coccidiosis)",
    coccidiosisSymptoms: "ರಕ್ತಭೇದಿ, ತೂಕ ಇಳಿಕೆ ಮತ್ತು ಸುಸ್ತು.",
    coccidiosisTreatment: "ತಕ್ಷಣ ನೀರಿನಲ್ಲಿ ಔಷಧಿ ನೀಡಿರಿ.",
    coccidiosisPrevention: "ನೆಲವನ್ನು (Litter) ಒಣಗಿರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    fmd: "ಕಾಲು ಮತ್ತು ಬಾಯಿ ರೋಗ (FMD)",
    fmdSymptoms: "ಜ್ವರ, ಬಾಯಿ ಮತ್ತು ಕಾಲುಗಳಲ್ಲಿ ಗುಳ್ಳೆಗಳು, ಜೊಲ್ಲು ಸುರಿಸುವುದು.",
    fmdTreatment: "ಗುಳ್ಳೆಗಳನ್ನು ಆಂಟಿಸೆಪ್ಟಿಕ್‌ನಿಂದ ತೊಳೆಯಿರಿ. ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    fmdPrevention: "ವರ್ಷಕ್ಕೆ ಎರಡು ಬಾರಿ ಲಸಿಕೆ ನೀಡಿರಿ.",
    mastitis: "ಕೆಚ್ಚಲು ಬಾವು (Mastitis)",
    mastitisSymptoms: "ಕೆಚ್ಚಲು ಊತ, ನೋವು; ಹಾಲಿನಲ್ಲಿ ರಕ್ತ ಅಥವಾ ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ.",
    mastitisTreatment: "ವೈದ್ಯರ ಸಲಹೆಯಂತೆ ಆಂಟಿಬಯೋಟಿಕ್ ಟ್ಯೂಬ್ ಬಳಸಿ.",
    mastitisPrevention: "ಹಾಲು ಕರೆಯುವ ಮುನ್ನ ಮತ್ತು ನಂತರ ಕೆಚ್ಚಲನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ.",
    blackQuarter: "ಚಪ್ಪೆ ರೋಗ (Black Quarter)",
    blackQuarterSymptoms: "ಮಾಂಸಖಂಡಗಳಲ್ಲಿ ಊತ, ಕುಂಟುವಿಕೆ, ಒತ್ತಿದಾಗ ಶಬ್ದ ಬರುವುದು.",
    blackQuarterTreatment: "ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಿ ಪೆನ್ಸಿಲಿನ್ ನೀಡಿ.",
    blackQuarterPrevention: "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಲಸಿಕೆ ಹಾಕಿಸಿ."
  }
};

const otherLangs = ['gu', 'ml', 'mr', 'or', 'pa'];
otherLangs.forEach(lang => {
  translations[lang] = translations['hi']; // Fallback to Hindi to clear english text
});

const i18nDir = path.join(__dirname, 'src', 'i18n');

Object.keys(translations).forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`File ${lang}.ts not found, skipping.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const t = translations[lang];

  let newKeys = '';
  for (const [key, value] of Object.entries(t)) {
    if (!content.includes(`${key}:`)) {
      newKeys += `  ${key}: ${JSON.stringify(value)},\n`;
    } else {
      // It exists, maybe replace it if it's currently hardcoded english? 
      // Let's just do a replace for the target string.
      const regex = new RegExp(`^\\s*${key}:\\s*".*",?$`, 'gm');
      content = content.replace(regex, `  ${key}: ${JSON.stringify(value)},`);
    }
  }

  if (newKeys) {
    content = content.replace(/};\s*$/, `${newKeys}};`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${lang}.ts`);
});
console.log('Script completed');
