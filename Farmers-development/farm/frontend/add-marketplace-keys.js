const fs = require('fs');
const path = require('path');

const newKeys = {
  hi: {
    buyNowSafely: "अभी सुरक्षित खरीदें",
    shopTab: "दुकान",
    myOrders: "मेरे ऑर्डर",
    inStockReady: "स्टॉक में है और तैयार",
    brandLabel: "ब्रांड",
    agroArmorCertified: "AgroArmor प्रमाणित",
    skuLabel: "SKU",
    keyFeatures: "मुख्य विशेषताएं",
    noOrdersTitle: "कोई सक्रिय ऑर्डर नहीं मिला",
    noOrdersDesc: "आपने अभी तक कोई ऑर्डर नहीं दिया है। अपने फार्म के लिए मार्केटप्लेस में देखें।",
    startShopping: "खरीदारी शुरू करें",
    estimatedDelivery: "अनुमानित डिलीवरी:",
    orderTotal: "कुल",
    orderPlaced: "ऑर्डर सफलतापूर्वक दिया गया!",
    orderPlacedDescription: "आपका ऑर्डर की पुष्टि हो गई है और जल्द ही डिलीवर होगा।",
    verifiedSeller: "सत्यापित विक्रेता"
  },
  te: {
    buyNowSafely: "ఇప్పుడే సురక్షితంగా కొనండి",
    shopTab: "షాప్",
    myOrders: "నా ఆర్డర్లు",
    inStockReady: "స్టాక్‌లో ఉంది & సిద్ధంగా ఉంది",
    brandLabel: "బ్రాండ్",
    agroArmorCertified: "AgroArmor ధృవీకరించబడింది",
    skuLabel: "SKU",
    keyFeatures: "ముఖ్య లక్షణాలు",
    noOrdersTitle: "చురుకైన ఆర్డర్లు ఏవీ లేవు",
    noOrdersDesc: "మీరు ఇంకా ఏ ఆర్డర్ ఇవ్వలేదు. మీ ఫార్మ్‌కు సరుకు కొనుగోలు చేయండి.",
    startShopping: "కొనుగోలు ప్రారంభించండి",
    estimatedDelivery: "అంచనా డెలివరీ:",
    orderTotal: "మొత్తం",
    orderPlaced: "ఆర్డర్ విజయవంతంగా ఇవ్వబడింది!",
    orderPlacedDescription: "మీ ఆర్డర్ ధృవీకరించబడింది మరియు త్వరలో డెలివరీ అవుతుంది.",
    verifiedSeller: "ధృవీకరించబడిన విక్రేత"
  },
  ta: {
    buyNowSafely: "இப்போது பாதுகாப்பாக வாங்கு",
    shopTab: "கடை",
    myOrders: "என் ஆர்டர்கள்",
    inStockReady: "கையிருப்பில் உள்ளது & தயார்",
    brandLabel: "பிராண்ட்",
    agroArmorCertified: "AgroArmor சான்றளிக்கப்பட்டது",
    skuLabel: "SKU",
    keyFeatures: "முக்கிய அம்சங்கள்",
    noOrdersTitle: "செயலில் உள்ள ஆர்டர்கள் இல்லை",
    noOrdersDesc: "நீங்கள் இன்னும் எந்த ஆர்டரும் செய்யவில்லை. உங்கள் பண்ணைக்கு தேவையானவற்றை வாங்குங்கள்.",
    startShopping: "ஷாப்பிங் தொடங்குங்கள்",
    estimatedDelivery: "மதிப்பிடப்பட்ட டெலிவரி:",
    orderTotal: "மொத்தம்",
    orderPlaced: "ஆர்டர் வெற்றிகரமாக செய்யப்பட்டது!",
    orderPlacedDescription: "உங்கள் ஆர்டர் உறுதிப்படுத்தப்பட்டது மற்றும் விரைவில் டெலிவரி ஆகும்.",
    verifiedSeller: "சரிபார்க்கப்பட்ட விற்பனையாளர்"
  },
  mr: {
    buyNowSafely: "आता सुरक्षितपणे खरेदी करा",
    shopTab: "दुकान",
    myOrders: "माझे ऑर्डर",
    inStockReady: "स्टॉकमध्ये आहे & तयार आहे",
    brandLabel: "ब्रँड",
    agroArmorCertified: "AgroArmor प्रमाणित",
    skuLabel: "SKU",
    keyFeatures: "मुख्य वैशिष्ट्ये",
    noOrdersTitle: "कोणतेही सक्रिय ऑर्डर सापडले नाहीत",
    noOrdersDesc: "तुम्ही अजून कोणताही ऑर्डर दिलेला नाही. तुमच्या शेतासाठी बाजारपेठ एक्सप्लोर करा.",
    startShopping: "खरेदी सुरू करा",
    estimatedDelivery: "अंदाजे डिलिव्हरी:",
    orderTotal: "एकूण",
    orderPlaced: "ऑर्डर यशस्वीरित्या दिला गेला!",
    orderPlacedDescription: "तुमच्या ऑर्डरची पुष्टी झाली आहे आणि लवकरच डिलीव्हर होईल.",
    verifiedSeller: "प्रमाणित विक्रेता"
  },
  pa: {
    buyNowSafely: "ਹੁਣੇ ਸੁਰੱਖਿਅਤ ਖਰੀਦੋ",
    shopTab: "ਦੁਕਾਨ",
    myOrders: "ਮੇਰੇ ਆਰਡਰ",
    inStockReady: "ਸਟਾਕ ਵਿੱਚ ਹੈ & ਤਿਆਰ ਹੈ",
    brandLabel: "ਬ੍ਰਾਂਡ",
    agroArmorCertified: "AgroArmor ਪ੍ਰਮਾਣਿਤ",
    skuLabel: "SKU",
    keyFeatures: "ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    noOrdersTitle: "ਕੋਈ ਸਰਗਰਮ ਆਰਡਰ ਨਹੀਂ ਮਿਲਿਆ",
    noOrdersDesc: "ਤੁਸੀਂ ਅਜੇ ਤੱਕ ਕੋਈ ਆਰਡਰ ਨਹੀਂ ਦਿੱਤਾ। ਆਪਣੇ ਫਾਰਮ ਲਈ ਮਾਰਕੀਟਪਲੇਸ ਦੇਖੋ।",
    startShopping: "ਖਰੀਦਦਾਰੀ ਸ਼ੁਰੂ ਕਰੋ",
    estimatedDelivery: "ਅਨੁਮਾਨਿਤ ਡਿਲੀਵਰੀ:",
    orderTotal: "ਕੁੱਲ",
    orderPlaced: "ਆਰਡਰ ਸਫਲਤਾਪੂਰਵਕ ਦਿੱਤਾ ਗਿਆ!",
    orderPlacedDescription: "ਤੁਹਾਡੇ ਆਰਡਰ ਦੀ ਪੁਸ਼ਟੀ ਕੀਤੀ ਗਈ ਹੈ ਅਤੇ ਜਲਦ ਹੀ ਡਿਲੀਵਰ ਕੀਤਾ ਜਾਵੇਗਾ।",
    verifiedSeller: "ਪ੍ਰਮਾਣਿਤ ਵਿਕਰੇਤਾ"
  },
  ml: {
    buyNowSafely: "ഇപ്പോൾ സുരക്ഷിതമായി വാങ്ങൂ",
    shopTab: "ഷോപ്പ്",
    myOrders: "എന്റെ ഓർഡറുകൾ",
    inStockReady: "സ്റ്റോക്കിൽ ഉണ്ട് & തയ്യാർ",
    brandLabel: "ബ്രാൻഡ്",
    agroArmorCertified: "AgroArmor സർട്ടിഫൈഡ്",
    skuLabel: "SKU",
    keyFeatures: "പ്രധാന സവിശേഷതകൾ",
    noOrdersTitle: "സജീവ ഓർഡറുകളൊന്നും കണ്ടെത്തിയില്ല",
    noOrdersDesc: "നിങ്ങൾ ഇതുവരെ ഒരു ഓർഡറും നൽകിയിട്ടില്ല. നിങ്ങളുടെ ഫാർമിനായി മാർക്കറ്റ്‌പ്ലേസ് പര്യവേക്ഷണം ചെയ്യൂ.",
    startShopping: "ഷോപ്പിംഗ് ആരംഭിക്കൂ",
    estimatedDelivery: "കണക്കാക്കിയ ഡെലിവറി:",
    orderTotal: "ആകെ",
    orderPlaced: "ഓർഡർ വിജയകരമായി നൽകി!",
    orderPlacedDescription: "നിങ്ങളുടെ ഓർഡർ സ്ഥിരീകരിച്ചു, ഉടൻ ഡെലിവർ ചെയ്യും.",
    verifiedSeller: "സ്ഥിരീകരിച്ച വിൽപ്പനക്കാരൻ"
  },
  kn: {
    buyNowSafely: "ಈಗ ಸುರಕ್ಷಿತವಾಗಿ ಖರೀದಿಸಿ",
    shopTab: "ಅಂಗಡಿ",
    myOrders: "ನನ್ನ ಆರ್ಡರ್‌ಗಳು",
    inStockReady: "ಸ್ಟಾಕ್‌ನಲ್ಲಿದೆ & ಸಿದ್ಧ",
    brandLabel: "ಬ್ರ್ಯಾಂಡ್",
    agroArmorCertified: "AgroArmor ಪ್ರಮಾಣೀಕೃತ",
    skuLabel: "SKU",
    keyFeatures: "ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು",
    noOrdersTitle: "ಯಾವುದೇ ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    noOrdersDesc: "ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್ ಮಾಡಿಲ್ಲ. ನಿಮ್ಮ ಫಾರ್ಮ್‌ಗಾಗಿ ಮಾರ್ಕೆಟ್‌ಪ್ಲೇಸ್ ಅನ್ವೇಷಿಸಿ.",
    startShopping: "ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ",
    estimatedDelivery: "ಅಂದಾಜು ವಿತರಣೆ:",
    orderTotal: "ಒಟ್ಟು",
    orderPlaced: "ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ಮಾಡಲಾಗಿದೆ!",
    orderPlacedDescription: "ನಿಮ್ಮ ಆರ್ಡರ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ ಮತ್ತು ಶೀಘ್ರದಲ್ಲೇ ವಿತರಿಸಲಾಗುತ್ತದೆ.",
    verifiedSeller: "ಪರಿಶೀಲಿಸಿದ ವ್ಯಾಪಾರಿ"
  },
  gu: {
    buyNowSafely: "હવે સુરક્ષિત ખરીદો",
    shopTab: "દુકાન",
    myOrders: "મારા ઓર્ડર",
    inStockReady: "સ્ટૉકમાં છે & તૈયાર",
    brandLabel: "બ્રાન્ડ",
    agroArmorCertified: "AgroArmor પ્રમાણિત",
    skuLabel: "SKU",
    keyFeatures: "મુખ્ય વિશેષતાઓ",
    noOrdersTitle: "કોઈ સક્રિય ઓર્ડર મળ્યો નહીં",
    noOrdersDesc: "તમે હજી સુધી કોઈ ઓર્ડર આપ્યો નથી. તમારા ફાર્મ માટે માર્કેટપ્લેસ એક્સ્પ્લોર કરો.",
    startShopping: "ખરીદી શરૂ કરો",
    estimatedDelivery: "અંદાજિત ડિલિવરી:",
    orderTotal: "કુલ",
    orderPlaced: "ઓર્ડર સફળતાપૂર્વક આપ્યો!",
    orderPlacedDescription: "તમારા ઓર્ડરની પુષ્ટિ થઈ ગઈ છે અને ટૂંક સમયમાં ડિલિવર કરવામાં આવશે.",
    verifiedSeller: "ચકાસાયેલ વિક્રેતા"
  },
  bn: {
    buyNowSafely: "এখনই নিরাপদে কিনুন",
    shopTab: "দোকান",
    myOrders: "আমার অর্ডার",
    inStockReady: "স্টকে আছে এবং প্রস্তুত",
    brandLabel: "ব্র্যান্ড",
    agroArmorCertified: "AgroArmor সার্টিফাইড",
    skuLabel: "SKU",
    keyFeatures: "মূল বৈশিষ্ট্যসমূহ",
    noOrdersTitle: "কোনো সক্রিয় অর্ডার পাওয়া যায়নি",
    noOrdersDesc: "আপনি এখনো কোনো অর্ডার দেননি। আপনার খামারের জন্য মার্কেটপ্লেস দেখুন।",
    startShopping: "কেনাকাটা শুরু করুন",
    estimatedDelivery: "আনুমানিক ডেলিভারি:",
    orderTotal: "মোট",
    orderPlaced: "অর্ডার সফলভাবে দেওয়া হয়েছে!",
    orderPlacedDescription: "আপনার অর্ডার নিশ্চিত হয়েছে এবং শীঘ্রই ডেলিভারি করা হবে।",
    verifiedSeller: "যাচাইকৃত বিক্রেতা"
  },
  or: {
    buyNowSafely: "ଏବେ ସୁରକ୍ଷିତ ଭାବରେ କିଣନ୍ତୁ",
    shopTab: "ଦୋକାନ",
    myOrders: "ମୋ ଅର୍ଡର",
    inStockReady: "ଷ୍ଟକ୍‌ରେ ଅଛି & ପ୍ରସ୍ତୁତ",
    brandLabel: "ବ୍ରାଣ୍ଡ",
    agroArmorCertified: "AgroArmor ଯାଞ୍ଚ ହୋଇଛି",
    skuLabel: "SKU",
    keyFeatures: "ମୁଖ୍ୟ ବୈଶିଷ୍ଟ୍ୟ",
    noOrdersTitle: "କୌଣସି ସକ୍ରିୟ ଅର୍ଡର ମିଳିଲା ନାହିଁ",
    noOrdersDesc: "ଆପଣ ଏ ପର୍ଯ୍ୟନ୍ତ କୌଣସି ଅର୍ଡର ଦେଇ ନାହାଁନ୍ତି। ଆପଣଙ୍କ ଫାର୍ମ ପାଇଁ ମାର୍କେଟଭ୍ ଏକ୍ସ୍ ଓ ।",
    startShopping: "କିଣିବା ଆରମ୍ଭ କରନ୍ତୁ",
    estimatedDelivery: "ଅନୁମାନିତ ଡେଲିଭାରୀ:",
    orderTotal: "ମୋଟ",
    orderPlaced: "ଅର୍ଡର ସଫଳତାପୂର୍ବକ ଦିଆଗଲା!",
    orderPlacedDescription: "ଆପଣଙ୍କ ଅର୍ଡର ନିଶ୍ଚିତ ହୋଇଛି ଏବଂ ଶୀଘ୍ର ଡେଲିଭାରୀ ହେବ।",
    verifiedSeller: "ଯାଞ୍ଚ ହୋଇଥିବା ବିକ୍ରେତା"
  }
};

const i18nDir = path.join(__dirname, 'src', 'i18n');

Object.keys(newKeys).forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`File ${lang}.ts not found.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const keys = newKeys[lang];

  // Insert new keys before the closing }; 
  const insertBefore = '};';
  const lastIdx = content.lastIndexOf(insertBefore);
  if (lastIdx === -1) {
    console.log(`Could not find closing }; in ${lang}.ts`);
    return;
  }

  // Check which keys are missing
  let toAdd = '';
  Object.entries(keys).forEach(([key, val]) => {
    if (!content.includes(`${key}:`)) {
      toAdd += `  ${key}: "${val}",\n`;
    }
  });

  if (toAdd) {
    content = content.substring(0, lastIdx) + toAdd + content.substring(lastIdx);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${lang}.ts`);
  } else {
    console.log(`⏭️  ${lang}.ts already has all keys`);
  }
});
console.log('\nDone!');
