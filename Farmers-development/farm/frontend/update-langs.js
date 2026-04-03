const fs = require('fs');
const path = require('path');

const translations = {
  pa: {
    heroTitle1: 'ਸਮਾਰਟ ਪਸ਼ੂਧਨ ਦੇਖਭਾਲ',
    heroTitle2: 'ਇੱਥੇ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ',
    heroDesc: 'ਸਧਾਰਨ, ਸਮਾਰਟ ਨਿਗਰਾਨੀ ਨਾਲ ਆਪਣੇ ਪਸ਼ੂਆਂ ਅਤੇ ਮੁਰਗੀਆਂ ਨੂੰ ਸਿਹਤਮੰਦ ਰੱਖੋ। ਐਗਰੋਆਰਮਰ ਆਧੁਨਿਕ ਖੇਤੀ ਲਈ ਲੋੜੀਂਦੇ ਸਹੀ ਉਪਕਰਣ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।'
  },
  ta: {
    heroTitle1: 'ஸ்மார்ட் கால்நடை பராமரிப்பு',
    heroTitle2: 'இங்கு தொடங்குகிறது',
    heroDesc: 'எளிய, ஸ்மார்ட் கண்காணிப்பு மூலம் உங்கள் கால்நடைகள் மற்றும் கோழிகளை ஆரோக்கியமாக வைத்திருங்கள். நவீன விவசாயத்திற்கு தேவையான துல்லியமான கருவிகளை அக்ரோ ஆர்மர் வழங்குகிறது.'
  },
  mr: {
    heroTitle1: 'स्मार्ट पशुधन काळजी',
    heroTitle2: 'येथे सुरू होते',
    heroDesc: 'सोप्या, स्मार्ट देखरेखीसह आपले गुरे आणि पोल्ट्री निरोगी ठेवा. ॲग्रोआर्मर आधुनिक शेतीसाठी आवश्यक असलेली अचूक साधने पुरवते.'
  },
  or: {
    heroTitle1: 'ସ୍ମାର୍ଟ ପଶୁପାଳନ ଯତ୍ନ',
    heroTitle2: 'ଏଠାରୁ ଆରମ୍ଭ ହୁଏ',
    heroDesc: 'ସରଳ, ସ୍ମାର୍ଟ ମନିଟରିଂ ସହିତ ଆପଣଙ୍କର ଗାଈଗୋରୁ ଏବଂ କୁକୁଡ଼ାମାନଙ୍କୁ ସୁସ୍ଥ ରଖନ୍ତୁ। ଆଗ୍ରୋଆର୍ମର ଆଧୁନିକ ଚାଷ ପାଇଁ ଆବଶ୍ୟକ ସଠିକ୍ ଉପକରଣ ପ୍ରଦାନ କରେ।'
  },
  ml: {
    heroTitle1: 'സ്മാർട്ട് കന്നുകാലി പരിപാലനം',
    heroTitle2: 'ഇവിടെ തുടങ്ങുന്നു',
    heroDesc: 'ലളിതവും സ്മാർട്ടുമായ നിരീക്ഷണത്തിലൂടെ നിങ്ങളുടെ കന്നുകാലികളെയും കോഴികളെയും ആരോഗ്യത്തോടെ സംരക്ഷിക്കുക. ആധുനിക കൃഷിക്ക് ആവശ്യമായ കൃത്യമായ ഉപകരണങ്ങൾ അഗ്രോആർമർ നൽകുന്നു.'
  },
  kn: {
    heroTitle1: 'ಸ್ಮಾರ್ಟ್ ಜಾನುವಾರು ಆರೈಕೆ',
    heroTitle2: 'ಇಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ',
    heroDesc: 'ಸರಳ, ಸ್ಮಾರ್ಟ್ ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಜಾನುವಾರು ಮತ್ತು ಕೋಳಿಗಳನ್ನು ಆರೋಗ್ಯಕರವಾಗಿರಿಸಿ. ಆಧುನಿಕ ಕೃಷಿಗೆ ಅಗತ್ಯವಿರುವ ನಿಖರ ಸಾಧನಗಳನ್ನು ಆಗ್ರೋಆರ್ಮರ್ ಒದಗಿಸುತ್ತದೆ.'
  },
  gu: {
    heroTitle1: 'સ્માર્ટ પશુધન સંભાળ',
    heroTitle2: 'અહીંથી શરૂ થાય છે',
    heroDesc: 'સરળ, સ્માર્ટ મોનિટરિંગ સાથે તમારા પશુઓ અને મરઘાંને સ્વસ્થ રાખો. એગ્રોઆર્મર આધુનિક ખેતી માટે જરૂરી ચોક્કસ સાધનો પૂરા પાડે છે.'
  },
  bn: {
    heroTitle1: 'স্মার্ট পশুপালন যত্ন',
    heroTitle2: 'এখানে শুরু হয়',
    heroDesc: 'সহজ, স্মার্ট পর্যবেক্ষণের সাথে আপনার গবাদি পশু এবং হাঁস-মুরগিকে সুস্থ রাখুন। অ্যাগ্রোআর্মার আধুনিক কৃষির জন্য প্রয়োজনীয় নির্ভুল সরঞ্জাম সরবরাহ করে।'
  }
};

Object.keys(translations).forEach(lang => {
  const filePath = path.join(__dirname, 'src', 'i18n', `${lang}.ts`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('heroTitle1')) {
      const texts = translations[lang];
      const replacement = `subtitle: ${content.match(/subtitle:\s*"(.*?)",/)?.[0].split(':')[1].trim()}\n  heroTitle1: "${texts.heroTitle1}",\n  heroTitle2: "${texts.heroTitle2}",\n  heroDesc: "${texts.heroDesc}",`;
      
      content = content.replace(/subtitle:\s*".*",/, replacement);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${lang}.ts`);
    } else {
      console.log(`${lang}.ts already has hero keys.`);
    }
  } else {
    console.log(`File ${lang}.ts not found!`);
  }
});
