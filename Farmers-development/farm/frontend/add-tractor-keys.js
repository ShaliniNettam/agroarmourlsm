const fs = require('fs');
const path = require('path');

const tractorFertilizerKeys = {
  hi: {
    tractorName: "हैवी-ड्यूटी फार्म ट्रैक्टर",
    tractorDesc: "50 HP इंजन वाला आधुनिक ट्रैक्टर जुताई और खेती के लिए।",
    tractorF1: "50 HP इंजन",
    tractorF2: "पावर स्टीयरिंग",
    tractorF3: "अटैचमेंट शामिल",
    tractorB1: "उच्च दक्षता",
    tractorB2: "ईंधन की बचत",
    tractorB3: "लंबा जीवनकाल",
    fertilizerName: "जैविक नाइट्रोजन खाद",
    fertilizerDesc: "तेज़ फसल वृद्धि के लिए 100% जैविक खाद।",
    fertilizerF1: "100% जैविक",
    fertilizerF2: "तेज़ असर",
    fertilizerF3: "मिट्टी के अनुकूल",
    fertilizerB1: "उपज बढ़ाता है",
    fertilizerB2: "मिट्टी की सेहत सुधारता है",
    fertilizerB3: "पर्यावरण अनुकूल",
  },
  te: {
    tractorName: "హెవీ-డ్యూటీ ఫార్మ్ ట్రాక్టర్",
    tractorDesc: "దున్నడానికి మరియు దమ్ముకు 50HP ఇంజిన్‌తో ఆధునిక ట్రాక్టర్.",
    tractorF1: "50 HP ఇంజిన్",
    tractorF2: "పవర్ స్టీరింగ్",
    tractorF3: "అటాచ్‌మెంట్లు చేర్చబడ్డాయి",
    tractorB1: "అధిక సామర్థ్యం",
    tractorB2: "ఇంధనం ఆదా",
    tractorB3: "దీర్ఘ జీవితకాలం",
    fertilizerName: "అర్గానిక్ నైట్రోజన్ ఎరువు",
    fertilizerDesc: "వేగంగా పంట వృద్ధికి 100% అర్గానిక్ ఎరువు.",
    fertilizerF1: "100% అర్గానిక్",
    fertilizerF2: "వేగంగా విడుదల",
    fertilizerF3: "మట్టికి అనుకూలం",
    fertilizerB1: "దిగుబడి పెరుగుతుంది",
    fertilizerB2: "మట్టి ఆరోగ్యం మెరుగవుతుంది",
    fertilizerB3: "పర్యావరణ అనుకూలం",
  },
  ta: {
    tractorName: "கனரக பண்ணை டிராக்டர்",
    tractorDesc: "உழவு மற்றும் தரிசு நிலத்திற்கு 50HP இயந்திரம் கொண்ட நவீன டிராக்டர்.",
    tractorF1: "50 HP இயந்திரம்",
    tractorF2: "அதிகாரம் திசைதிருப்பல்",
    tractorF3: "இணைப்புகள் உள்ளன",
    tractorB1: "உயர் திறன்",
    tractorB2: "எரிபொருள் சேமிப்பு",
    tractorB3: "நீண்ட ஆயுள்",
    fertilizerName: "இயற்கை நைட்ரஜன் உரம்",
    fertilizerDesc: "விரைவான பயிர் வளர்ச்சிக்கு 100% இயற்கை உரம்.",
    fertilizerF1: "100% இயற்கை",
    fertilizerF2: "வேகமாக வெளியீடு",
    fertilizerF3: "மண்ணுக்கு நட்பு",
    fertilizerB1: "விளைச்சல் அதிகரிக்கும்",
    fertilizerB2: "மண் ஆரோக்கியம் மேம்படும்",
    fertilizerB3: "சுற்றுச்சூழல் நட்பு",
  },
  mr: {
    tractorName: "हेवी-ड्युटी शेती ट्रॅक्टर",
    tractorDesc: "नांगरणी आणि कुळवणीसाठी 50HP इंजिन असलेला आधुनिक ट्रॅक्टर.",
    tractorF1: "50 HP इंजिन",
    tractorF2: "पॉवर स्टीयरिंग",
    tractorF3: "जोडणी उपकरणे समाविष्ट",
    tractorB1: "उच्च कार्यक्षमता",
    tractorB2: "इंधन बचत",
    tractorB3: "दीर्घ आयुष्य",
    fertilizerName: "सेंद्रिय नायट्रोजन खत",
    fertilizerDesc: "जलद पीक वाढीसाठी 100% सेंद्रिय खत.",
    fertilizerF1: "100% सेंद्रिय",
    fertilizerF2: "जलद प्रभाव",
    fertilizerF3: "मातीसाठी अनुकूल",
    fertilizerB1: "उत्पन्न वाढवते",
    fertilizerB2: "मातीचे आरोग्य सुधारते",
    fertilizerB3: "पर्यावरणपूरक",
  },
  pa: {
    tractorName: "ਹੈਵੀ-ਡਿਊਟੀ ਫਾਰਮ ਟਰੈਕਟਰ",
    tractorDesc: "ਵਾਹੁਣ ਅਤੇ ਖੇਤੀ ਲਈ 50HP ਇੰਜਣ ਵਾਲਾ ਆਧੁਨਿਕ ਟਰੈਕਟਰ।",
    tractorF1: "50 HP ਇੰਜਣ",
    tractorF2: "ਪਾਵਰ ਸਟੀਅਰਿੰਗ",
    tractorF3: "ਅਟੈਚਮੈਂਟ ਸ਼ਾਮਲ",
    tractorB1: "ਉੱਚ ਕੁਸ਼ਲਤਾ",
    tractorB2: "ਬਾਲਣ ਦੀ ਬੱਚਤ",
    tractorB3: "ਲੰਮੀ ਉਮਰ",
    fertilizerName: "ਜੈਵਿਕ ਨਾਈਟ੍ਰੋਜਨ ਖਾਦ",
    fertilizerDesc: "ਤੇਜ਼ ਫ਼ਸਲ ਵਿਕਾਸ ਲਈ 100% ਜੈਵਿਕ ਖਾਦ।",
    fertilizerF1: "100% ਜੈਵਿਕ",
    fertilizerF2: "ਤੇਜ਼ ਪ੍ਰਭਾਵ",
    fertilizerF3: "ਮਿੱਟੀ ਦੇ ਅਨੁਕੂਲ",
    fertilizerB1: "ਪੈਦਾਵਾਰ ਵਧਾਉਂਦੀ ਹੈ",
    fertilizerB2: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਸੁਧਾਰਦੀ ਹੈ",
    fertilizerB3: "ਵਾਤਾਵਰਨ-ਅਨੁਕੂਲ",
  },
  ml: {
    tractorName: "ഹെവി-ഡ്യൂട്ടി ഫാം ട്രാക്ടർ",
    tractorDesc: "ഉഴവ് ചെയ്യലിനും കൃഷിക്കും 50HP എഞ്ചിൻ ഉള്ള ആധുനിക ട്രാക്ടർ.",
    tractorF1: "50 HP എഞ്ചിൻ",
    tractorF2: "പവർ സ്റ്റിയറിംഗ്",
    tractorF3: "അറ്റാച്ച്മെന്റുകൾ ഉൾപ്പെടുന്നു",
    tractorB1: "ഉയർന്ന കാര്യക്ഷമത",
    tractorB2: "ഇന്ധന ലാഭം",
    tractorB3: "ദീർഘ ആയുർദൈർഘ്യം",
    fertilizerName: "ജൈവ നൈട്രജൻ വളം",
    fertilizerDesc: "വേഗമേറിയ വിള വളർച്ചക്ക് 100% ജൈവ വളം.",
    fertilizerF1: "100% ജൈവ",
    fertilizerF2: "വേഗം പ്രകാശനം",
    fertilizerF3: "മണ്ണ് സൗഹൃദം",
    fertilizerB1: "വിളവ് വർദ്ധിക്കുന്നു",
    fertilizerB2: "മണ്ണിന്റെ ആരോഗ്യം മെച്ചപ്പെടുന്നു",
    fertilizerB3: "പരിസ്ഥിതി സൗഹൃദം",
  },
  kn: {
    tractorName: "ಹೆವಿ-ಡ್ಯೂಟಿ ಕೃಷಿ ಟ್ರ್ಯಾಕ್ಟರ್",
    tractorDesc: "ಉಳುಮೆ ಮತ್ತು ಹರಗಲು 50HP ಎಂಜಿನ್ ಇರುವ ಆಧುನಿಕ ಟ್ರ್ಯಾಕ್ಟರ್.",
    tractorF1: "50 HP ಎಂಜಿನ್",
    tractorF2: "ಪವರ್ ಸ್ಟೀರಿಂಗ್",
    tractorF3: "ಲಗತ್ತುಗಳು ಸೇರಿವೆ",
    tractorB1: "ಹೆಚ್ಚಿನ ದಕ್ಷತೆ",
    tractorB2: "ಇಂಧನ ಉಳಿತಾಯ",
    tractorB3: "ದೀರ್ಘ ಜೀವಿತಾವಧಿ",
    fertilizerName: "ಸಾವಯವ ನೈಟ್ರೋಜನ್ ಗೊಬ್ಬರ",
    fertilizerDesc: "ತ್ವರಿತ ಬೆಳೆ ಬೆಳವಣಿಗೆಗಾಗಿ 100% ಸಾವಯವ ಗೊಬ್ಬರ.",
    fertilizerF1: "100% ಸಾವಯವ",
    fertilizerF2: "ತ್ವರಿತ ಬಿಡುಗಡೆ",
    fertilizerF3: "ಮಣ್ಣು ಸ್ನೇಹಿ",
    fertilizerB1: "ಇಳುವರಿ ಹೆಚ್ಚಿಸುತ್ತದೆ",
    fertilizerB2: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸುಧಾರಿಸುತ್ತದೆ",
    fertilizerB3: "ಪರಿಸರ ಸ್ನೇಹಿ",
  },
  gu: {
    tractorName: "હેવી-ડ્યૂટી ફાર્મ ટ્રેક્ટર",
    tractorDesc: "ખેડ અને ખેતી માટે 50HP એન્જિન ધરાવતો આધુનિક ટ્રેક્ટર.",
    tractorF1: "50 HP એન્જિન",
    tractorF2: "પાવર સ્ટિયરિંગ",
    tractorF3: "જોડાણ સ્ટ્રક્ચર સહિત",
    tractorB1: "ઉચ્ચ કાર્યયક્ષમતા",
    tractorB2: "ઇંધણ બચત",
    tractorB3: "લાંબુ આયુ",
    fertilizerName: "ઓર્ગેનિક નાઇટ્રોજન ખાતર",
    fertilizerDesc: "ઝડપી પાક વૃદ્ધિ માટે 100% ઓર્ગેનિક ખાતર.",
    fertilizerF1: "100% ઓર્ગેનિક",
    fertilizerF2: "ઝડપી અસર",
    fertilizerF3: "જમીન-મૈત્રીપૂર્ણ",
    fertilizerB1: "ઉત્પાદન વધારે છે",
    fertilizerB2: "જમીનનું આરોગ્ય સુધારે છે",
    fertilizerB3: "પર્યાવરણ-મૈત્રીપૂર્ણ",
  },
  bn: {
    tractorName: "ভারী কৃষি ট্র্যাক্টর",
    tractorDesc: "চাষ ও কর্ষণের জন্য ৫০ HP ইঞ্জিনযুক্ত আধুনিক ট্র্যাক্টর।",
    tractorF1: "৫০ HP ইঞ্জিন",
    tractorF2: "পাওয়ার স্টিয়ারিং",
    tractorF3: "সংযুক্তি অন্তর্ভুক্ত",
    tractorB1: "উচ্চ দক্ষতা",
    tractorB2: "জ্বালানি সাশ্রয়",
    tractorB3: "দীর্ঘ আয়ুষ্কাল",
    fertilizerName: "জৈব নাইট্রোজেন সার",
    fertilizerDesc: "দ্রুত ফসল বৃদ্ধির জন্য ১০০% জৈব সার।",
    fertilizerF1: "১০০% জৈব",
    fertilizerF2: "দ্রুত মুক্তি",
    fertilizerF3: "মাটি বান্ধব",
    fertilizerB1: "ফলন বাড়ায়",
    fertilizerB2: "মাটির স্বাস্থ্য উন্নত করে",
    fertilizerB3: "পরিবেশ বান্ধব",
  },
  or: {
    tractorName: "ଭାରୀ ଖାମାର ଟ୍ରାକ୍ଟର",
    tractorDesc: "ଚାଷ ଓ ଘଷା ପାଇଁ 50HP ଇଞ୍ଜିନ ସହ ଆଧୁନିକ ଟ୍ରାକ୍ଟର।",
    tractorF1: "50 HP ଇଞ୍ଜିନ",
    tractorF2: "ପାୱାର ଷ୍ଟିୟରିଂ",
    tractorF3: "ଆଟାଚ୍‌ମେଣ୍ଟ ସହିତ",
    tractorB1: "ଉଚ୍ଚ ଦକ୍ଷତା",
    tractorB2: "ଇନ୍ଧନ ସଞ୍ଚୟ",
    tractorB3: "ଦୀର୍ଘ ଜୀବନ",
    fertilizerName: "ଜୈବ ନାଇଟ୍ରୋଜେନ ସାର",
    fertilizerDesc: "ଦ୍ରୁତ ଫସଲ ବୃଦ୍ଧି ପାଇଁ 100% ଜୈବ ସାର।",
    fertilizerF1: "100% ଜୈବ",
    fertilizerF2: "ଦ୍ରୁତ ନିଷ୍କ୍ରିୟ",
    fertilizerF3: "ମାଟି-ବନ୍ଧୁ",
    fertilizerB1: "ଅମଳ ବଢ଼ାଏ",
    fertilizerB2: "ମାଟିର ସ୍ୱାସ୍ଥ୍ୟ ଉନ୍ନତ କରେ",
    fertilizerB3: "ପରିବେଶ-ବନ୍ଧୁ",
  },
};

const i18nDir = path.join(__dirname, 'src', 'i18n');

Object.keys(tractorFertilizerKeys).forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`File ${lang}.ts not found.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const keys = tractorFertilizerKeys[lang];

  const lastIdx = content.lastIndexOf('};');
  if (lastIdx === -1) {
    console.log(`Could not find closing }; in ${lang}.ts`);
    return;
  }

  let toAdd = '';
  Object.entries(keys).forEach(([key, val]) => {
    if (!content.includes(`  ${key}:`)) {
      toAdd += `  ${key}: "${val}",\n`;
    }
  });

  if (toAdd) {
    content = content.substring(0, lastIdx) + toAdd + content.substring(lastIdx);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${lang}.ts`);
  } else {
    console.log(`⏭️  ${lang}.ts already up to date`);
  }
});

console.log('\nDone! Tractor & fertilizer keys added to all language files.');
