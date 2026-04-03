const fs = require('fs');
const path = require('path');

const promoTranslations = {
  hi: {
    scheme: "🔥 विशेष छूट • सीमित समय",
    title: "फार्म जरूरतों पर 30% तक की छूट!",
    desc: "प्रमाणित किसानों के लिए वैक्सीन, चारा और उपकरणों पर विशेष ऑफर। जल्दी करें — यह ऑफर जल्द समाप्त हो रहा है!",
    button: "ऑफर पाएं"
  },
  te: {
    scheme: "🔥 ప్రత్యేక ఆఫర్ • పరిమిత సమయం",
    title: "ఫాం అవసరాలపై 30% వరకు తగ్గింపు!",
    desc: "ధృవీకరించిన రైతులకు టీకాలు, దాణా & పరికరాలపై ప్రత్యేక డీల్స్. తొందరపడండి — ఈ ఆఫర్ తక్కువ సమయానికి మాత్రమే!",
    button: "ఆఫర్ పొందండి"
  },
  ta: {
    scheme: "🔥 சிறப்பு சலுகை • குறைந்த நேரம்",
    title: "பண்ணை அத்தியாவசியங்களில் 30% வரை தள்ளுபடி!",
    desc: "சரிபார்க்கப்பட்ட விவசாயிகளுக்கு தடுப்பூசிகள், தீவனம் & உபகரணங்களில் சிறப்பு சலுகைகள். விரைந்து செய்யுங்கள் — இந்த சலுகை விரைவில் முடிகிறது!",
    button: "சலுகையை பெறுங்கள்"
  },
  mr: {
    scheme: "🔥 विशेष ऑफर • मर्यादित वेळ",
    title: "शेती गरजांवर 30% पर्यंत सूट!",
    desc: "प्रमाणित शेतकऱ्यांसाठी लस, चारा आणि उपकरणांवर विशेष योजना. घाई करा — हा ऑफर लवकरच संपतो!",
    button: "ऑफर मिळवा"
  },
  pa: {
    scheme: "🔥 ਵਿਸ਼ੇਸ਼ ਪੇਸ਼ਕਸ਼ • ਸੀਮਤ ਸਮਾਂ",
    title: "ਖੇਤੀ ਜ਼ਰੂਰੀ ਵਸਤਾਂ 'ਤੇ 30% ਤੱਕ ਛੋਟ!",
    desc: "ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨਾਂ ਲਈ ਟੀਕੇ, ਚਾਰਾ ਅਤੇ ਉਪਕਰਣਾਂ 'ਤੇ ਵਿਸ਼ੇਸ਼ ਡੀਲ। ਜਲਦੀ ਕਰੋ — ਇਹ ਪੇਸ਼ਕਸ਼ ਜਲਦ ਖਤਮ ਹੋ ਜਾਵੇਗੀ!",
    button: "ਪੇਸ਼ਕਸ਼ ਲਓ"
  },
  ml: {
    scheme: "🔥 പ്രത്യേക ഓഫർ • പരിമിത സമയം",
    title: "കൃഷി ആവശ്യങ്ങൾക്ക് 30% വരെ കിഴിവ്!",
    desc: "സ്ഥിരീകരിച്ച കർഷകർക്ക് വാക്‌സിൻ, തീറ്റ & ഉപകരണങ്ങളിൽ പ്രത്യേക ഡീലുകൾ. ധൃതിപ്പെടൂ — ഈ ഓഫർ ഉടൻ അവസാനിക്കും!",
    button: "ഓഫർ നേടൂ"
  },
  kn: {
    scheme: "🔥 ವಿಶೇಷ ಕೊಡುಗೆ • ಸೀಮಿತ ಸಮಯ",
    title: "ಕೃಷಿ ಅಗತ್ಯಗಳ ಮೇಲೆ 30% ವರೆಗೆ ರಿಯಾಯಿತಿ!",
    desc: "ಪರಿಶೀಲಿಸಿದ ರೈತರಿಗೆ ಲಸಿಕೆ, ಮೇವು & ಉಪಕರಣಗಳ ಮೇಲೆ ವಿಶೇಷ ಡೀಲ್‌ಗಳು. ಬೇಗ ಮಾಡಿ — ಈ ಕೊಡುಗೆ ಶೀಘ್ರದಲ್ಲಿ ಮುಗಿಯುತ್ತದೆ!",
    button: "ಕೊಡುಗೆ ಪಡೆಯಿರಿ"
  },
  gu: {
    scheme: "🔥 વિશેષ ઑફર • સીમિત સમય",
    title: "ખેતી જરૂરિયાતો પર 30% સુધી ડિસ્કાઉન્ટ!",
    desc: "ચકાસાયેલ ખેડૂતો માટે ટીકા, ઘાસચારો & ઉપકરણો પર ખાસ ડીલ. ઉતાવળ કરો — આ ઑફર ટૂંક સમયમાં સમાપ્ત થઈ જશે!",
    button: "ઑફર મેળવો"
  },
  bn: {
    scheme: "🔥 বিশেষ অফার • সীমিত সময়",
    title: "কৃষি প্রয়োজনে ৩০% পর্যন্ত ছাড়!",
    desc: "যাচাইকৃত কৃষকদের জন্য ভ্যাকসিন, খাবার ও যন্ত্রপাতিতে বিশেষ ডিল। দ্রুত করুন — এই অফার শীঘ্রই শেষ হয়ে যাচ্ছে!",
    button: "অফার নিন"
  },
  or: {
    scheme: "🔥 ବିଶେଷ ଅଫର • ସୀମିତ ସମୟ",
    title: "ଖାମାର ଆବଶ୍ୟକତାରେ ୩୦% ପର୍ଯ୍ୟନ୍ତ ଛାଡ!",
    desc: "ଯାଞ୍ଚ ହୋଇଥିବା କୃଷକଙ୍କ ପାଇଁ ଟୀକା, ଦାନା ଓ ଉପକରଣ ଉପରେ ବିଶେଷ ଡିଲ। ଶୀଘ୍ର କରନ୍ତୁ — ଏହି ଅଫର ଶୀଘ୍ର ଶେଷ ହେବ!",
    button: "ଅଫର ନିଅ"
  }
};

const i18nDir = path.join(__dirname, 'src', 'i18n');

Object.keys(promoTranslations).forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`File ${lang}.ts not found, skipping.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const t = promoTranslations[lang];

  // Replace marketplacePromoScheme
  content = content.replace(/marketplacePromoScheme:\s*"[^"]*"/, `marketplacePromoScheme: "${t.scheme}"`);
  // Replace marketplacePromoTitle
  content = content.replace(/marketplacePromoTitle:\s*"[^"]*"/, `marketplacePromoTitle: "${t.title}"`);
  // Replace marketplacePromoDesc
  content = content.replace(/marketplacePromoDesc:\s*"[^"]*"/, `marketplacePromoDesc: "${t.desc}"`);
  // Replace marketplacePromoButton
  content = content.replace(/marketplacePromoButton:\s*"[^"]*"/, `marketplacePromoButton: "${t.button}"`);

  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated ${lang}.ts`);
});

console.log('\nDone! All language files updated with offer-themed promo text.');
