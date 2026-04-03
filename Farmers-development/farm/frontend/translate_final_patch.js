const fs = require('fs');
const path = require('path');

// Final patch: keys that exist in en.ts but are missing in other language files
const translations = {
  en: {
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    close: "Close",
    buyNow: "Buy Now",
    addBtn: "Add",
    heroTitle1: "Smarter Livestock Care",
    heroTitle2: "Starts Here",
    heroSubtitle: "Keep your cattle and poultry healthy with simple, smart monitoring. AgroArmor provides the precision tools you need for modern farming.",
    getStarted: "Get Started",
  },
  hi: {
    addToCart: "कार्ट में जोड़ें",
    viewDetails: "विवरण देखें",
    close: "बंद करें",
    buyNow: "अभी खरीदें",
    addBtn: "जोड़ें",
    heroTitle1: "स्मार्ट पशुधन देखभाल",
    heroTitle2: "यहाँ से शुरू होती है",
    heroSubtitle: "सरल, स्मार्ट निगरानी के साथ अपने मवेशियों और मुर्गियों को स्वस्थ रखें। एग्रोआर्मर आपको आधुनिक खेती के लिए आवश्यक सटीक उपकरण प्रदान करता है।",
    getStarted: "शुरू करें",
  },
  mr: {
    addToCart: "कार्टमध्ये जोडा",
    viewDetails: "तपशील पहा",
    close: "बंद करा",
    buyNow: "आता खरेदी करा",
    addBtn: "जोडा",
    heroTitle1: "स्मार्ट पशुधन काळजी",
    heroTitle2: "येथून सुरू होते",
    heroSubtitle: "सोप्या, स्मार्ट देखरेखीसह तुमचे गुरे आणि कोंबड्या निरोगी ठेवा.",
    getStarted: "सुरू करा",
  },
  bn: {
    addToCart: "কার্টে যোগ করুন",
    viewDetails: "বিস্তারিত দেখুন",
    close: "বন্ধ করুন",
    buyNow: "এখনই কিনুন",
    addBtn: "যোগ",
    heroTitle1: "স্মার্ট পশুপালন",
    heroTitle2: "এখান থেকেই শুরু হয়",
    heroSubtitle: "সহজ, স্মার্ট পর্যবেক্ষণের মাধ্যমে আপনার গবাদি পশু এবং মুরগিকে সুস্থ রাখুন।",
    getStarted: "শুরু করুন",
  },
  te: {
    addToCart: "కార్ట్‌కు జోడించండి",
    viewDetails: "వివరాలు చూడండి",
    close: "మూసివేయండి",
    buyNow: "ఇప్పుడే కొనుగోలు చేయండి",
    addBtn: "జోడించు",
    heroTitle1: "స్మార్ట్ లైవ్‌స్టాక్ కేర్",
    heroTitle2: "ఇక్కడే ప్రారంభం",
    heroSubtitle: "సులభమైన, స్మార్ట్ పర్యవేక్షణతో మీ పశువులు మరియు కోళ్లను ఆరోగ్యంగా ఉంచండి.",
    getStarted: "ప్రారంభించండి",
  },
  ta: {
    addToCart: "வண்டியில் சேர்",
    viewDetails: "விவரங்களைக் காண்க",
    close: "மூடு",
    buyNow: "இப்போது வாங்கவும்",
    addBtn: "சேர்",
    heroTitle1: "அறிவார்ந்த கால்நடை பராமரிப்பு",
    heroTitle2: "இங்கே தொடங்குகிறது",
    heroSubtitle: "எளிய மற்றும் அறிவார்ந்த கண்காணிப்புடன் உங்கள் கால்நடை மற்றும் கோழிகளை ஆரோக்கியமாக வைத்திருங்கள்.",
    getStarted: "தொடங்குங்கள்",
  },
  kn: {
    addToCart: "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    close: "ಮುಚ್ಚು",
    buyNow: "ಈಗ ಖರೀದಿಸಿ",
    addBtn: "ಸೇರಿಸು",
    heroTitle1: "ಸ್ಮಾರ್ಟ್ ಜಾನುವಾರು ಆರೈಕೆ",
    heroTitle2: "ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭ",
    heroSubtitle: "ಸರಳ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಜಾನುವಾರು ಮತ್ತು ಕೋಳಿಗಳನ್ನು ಆರೋಗ್ಯವಾಗಿಡಿ.",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
  },
  gu: {
    addToCart: "કાર્ટમાં ઉમેરો",
    viewDetails: "વિગતો જુઓ",
    close: "બંધ કરો",
    buyNow: "હવે ખરીદો",
    addBtn: "ઉમેરો",
    heroTitle1: "સ્માર્ટ પશુપાલન સંભાળ",
    heroTitle2: "અહીંથી શરૂ થાય છે",
    heroSubtitle: "સરળ, સ્માર્ટ દેખરેખ સાથે તમારા પશુધન અને મરઘાંને તંદુરસ્ત રાખો.",
    getStarted: "શરૂ કરો",
  },
  ml: {
    addToCart: "കാർട്ടിലേക്ക് ചേർക്കുക",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    close: "അടയ്ക്കുക",
    buyNow: "ഇപ്പോൾ വാങ്ങുക",
    addBtn: "ചേർക്കുക",
    heroTitle1: "സ്മാർട്ട് കന്നുകാലി പരിപാലനം",
    heroTitle2: "ഇവിടെ ആരംഭിക്കുന്നു",
    heroSubtitle: "ലളിതവും സ്മാർട്ടുമായ നിരീക്ഷണത്തിലൂടെ നിങ്ങളുടെ കന്നുകാലികളെയും കോഴികളെയും ആരോഗ്യകരമായി നിലനിർത്തൂ.",
    getStarted: "ആരംഭിക്കുക",
  },
  or: {
    addToCart: "କାର୍ଟରେ ଯୋଗ କରନ୍ତୁ",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    close: "ବନ୍ଦ କରନ୍ତୁ",
    buyNow: "ବର୍ତ୍ତମାନ କିଣନ୍ତୁ",
    addBtn: "ଯୋଗ",
    heroTitle1: "ସ୍ମାର୍ଟ ପଶୁପାଳନ ଯତ୍ନ",
    heroTitle2: "ଏଠୁ ଆରମ୍ଭ ହୁଏ",
    heroSubtitle: "ସରଳ, ସ୍ମାର୍ଟ ନିରୀକ୍ଷଣ ସହ ଆପଣଙ୍କ ଗୋରୁ ଏବଂ କୁକୁଡ଼ାମାନଙ୍କୁ ସୁସ୍ଥ ରଖନ୍ତୁ.",
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
  },
  pa: {
    addToCart: "ਕਾਰਟ ਵਿੱਚ ਪਾਓ",
    viewDetails: "ਵੇਰਵੇ ਵੇਖੋ",
    close: "ਬੰਦ ਕਰੋ",
    buyNow: "ਹੁਣੇ ਖਰੀਦੋ",
    addBtn: "ਜੋੜੋ",
    heroTitle1: "ਸਮਾਰਟ ਪਸ਼ੂ ਪਾਲਣ ਦੇਖਭਾਲ",
    heroTitle2: "ਇੱਥੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ",
    heroSubtitle: "ਸਰਲ, ਸਮਾਰਟ ਨਿਗਰਾਨੀ ਨਾਲ ਆਪਣੇ ਪਸ਼ੂ ਅਤੇ ਮੁਰਗੀਆਂ ਨੂੰ ਸਿਹਤਮੰਦ ਰੱਖੋ.",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
  }
};

const i18nDir = path.join(__dirname, 'src', 'i18n');

let totalUpdated = 0;
Object.keys(translations).forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`File ${lang}.ts not found, skipping.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const t = translations[lang];

  let newKeys = '';
  let updatedCount = 0;
  for (const [key, value] of Object.entries(t)) {
    const keyRegex = new RegExp(`^\\s*${key}:\\s`, 'm');
    if (!keyRegex.test(content)) {
      newKeys += `  ${key}: ${JSON.stringify(value)},\n`;
      updatedCount++;
    }
  }

  if (newKeys) {
    content = content.replace(/};\s*$/, `${newKeys}};`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${lang}.ts — added ${updatedCount} keys`);
    totalUpdated += updatedCount;
  } else {
    console.log(`${lang}.ts — all keys present`);
  }
});

console.log(`\nDone! Total new keys added: ${totalUpdated}`);
