const fs = require('fs');
const path = require('path');

const translations = {
  ta: {
    heroTitle1: 'ஸ்மார்ட் கால்நடை பராமரிப்பு',
    heroTitle2: 'இங்கே தொடங்குகிறது',
    heroDesc: 'எளிய, ஸ்மார்ட் கண்காணிப்புடன் உங்கள் கால்நடைகளை ஆரோக்கியமாக வைத்திருங்கள்.',
    recommendedForYou: 'உங்களுக்காக பரிந்துரைக்கப்படுகிறது',
    recommendationReason: 'உங்கள் சமீபத்திய பண்ணை சுயவிவரத்தின் அடிப்படையில்',
    bestMatchBadge: 'சிறந்த பொருத்தம்',
    checkoutDescription: 'பாதுகாப்பான விநியோகத்துடன் உங்கள் ஆர்டரை முடிக்கவும்',
    enterFullName: 'முழு பெயர்',
    enterPhone: 'தொலைபேசி எண்',
    enterAddress: 'விநியோக முகவரி',
    enterPincode: 'பின்கோடு',
    enterCity: 'நகரம்',
    coccidiosis: 'காக்சிடியோசிஸ்',
    coccidiosisSymptoms: 'இரத்தப்போக்குடன் வயிற்றுப்போக்கு',
    coccidiosisTreatment: 'தண்ணீரில் ஆம்புரோலியம்',
    coccidiosisPrevention: 'உலர்ந்த கூளத்தை பராமரிப்பது',
    fowlPoxTreatment: 'குறிப்பிட்ட சிகிச்சை இல்லை',
    fowlPoxPrevention: 'கொசுக்காலத்திற்கு முன் தடுப்பூசி'
  },
  kn: {
    heroTitle1: 'ಸ್ಮಾರ್ಟ್ ಜಾನುವಾರು ಆರೈಕೆ',
    heroTitle2: 'ಇಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ',
    heroDesc: 'ಸರಳ, ಸ್ಮಾರ್ಟ್ ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಜಾನುವಾರು ಮತ್ತು ಕೋಳಿಗಳನ್ನು ಆರೋಗ್ಯವಾಗಿರಿಸಿಕೊಳ್ಳಿ.',
    recommendedForYou: 'ನಿಮಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ',
    recommendationReason: 'ನಿಮ್ಮ ಕೃಷಿ ಪ್ರೊಫೈಲ್ ಆಧರಿಸಿ',
    bestMatchBadge: 'ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ',
    checkoutDescription: 'ಉತ್ತಮ ವಿತರಣೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಆದೇಶವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ',
    enterFullName: 'ಪೂರ್ಣ ಹೆಸರು',
    enterPhone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    enterAddress: 'ವಿತರಣಾ ವಿಳಾಸ',
    enterPincode: 'ಪಿನ್‌ಕೋಡ್',
    enterCity: 'ನಗರ',
    coccidiosis: 'ಕಾಕ್ಸಿಡಿಯೋಸಿಸ್',
    coccidiosisSymptoms: 'ರಕ್ತಸಿಕ್ತ ಭೇದಿ',
    coccidiosisTreatment: 'ನೀರಿನಲ್ಲಿ ಆಂಪ್ರೋಲಿಯಂ',
    coccidiosisPrevention: 'ಒಣಗಿದ ಕಸ ನಿರ್ವಹಣೆ',
    fowlPoxTreatment: 'ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ',
    fowlPoxPrevention: 'ಸೊಳ್ಳೆ ಕಾಲಮಾನಕ್ಕೂ ಮುನ್ನ ಲಸಿಕೆ'
  },
  mr: {
    heroTitle1: 'स्मार्ट पशुधन काळजी',
    heroTitle2: 'येथे सुरू होते',
    heroDesc: 'सोप्या, स्मार्ट देखरेखीसह आपले गुरे आणि पोल्ट्री निरोगी ठेवा.',
    recommendedForYou: 'तुमच्यासाठी शिफारस केलेले',
    recommendationReason: 'तुमच्या अलीकडील प्रोफाइलच्या आधारे',
    bestMatchBadge: 'सर्वोत्तम जुळणी',
    checkoutDescription: 'तुमची ऑर्डर पूर्ण करा',
    enterFullName: 'पूर्ण नाव',
    enterPhone: 'फोन नंबर',
    enterAddress: 'पत्ता',
    enterPincode: 'पिनकोड',
    enterCity: 'शहर',
    coccidiosis: 'कॉक्सिडिओसिस',
    coccidiosisSymptoms: 'रक्तमिश्रित जुलाब',
    coccidiosisTreatment: 'पाण्यात ॲम्प्रोलियम',
    coccidiosisPrevention: 'कोरडा कचरा राखा',
    fowlPoxTreatment: 'कोणताही विशिष्ट उपचार नाही',
    fowlPoxPrevention: 'डासांच्या हंगामापूर्वी लसीकरण'
  },
  gu: {
    heroTitle1: 'સ્માર્ટ પશુધન સંભાળ',
    heroTitle2: 'અહીંથી શરૂ થાય છે',
    heroDesc: 'તમારા પશુઓ અને મરઘાંને સરળ મોનિટરિંગથી સ્વસ્થ રાખો.',
    recommendedForYou: 'તમારા માટે ભલામણ કરેલ',
    recommendationReason: 'તમારી પ્રોફાઇલના આધારે',
    bestMatchBadge: 'શ્રેષ્ઠ મેચ',
    checkoutDescription: 'તમારો ઓર્ડર પૂર્ણ કરો',
    enterFullName: 'પૂરું નામ',
    enterPhone: 'ફોન નંબર',
    enterAddress: 'સરનામું',
    enterPincode: 'પિનકોડ',
    enterCity: 'શહેર',
    coccidiosis: 'કોક્સિડીયોસિસ',
    coccidiosisSymptoms: 'લોહીવાળા ઝાડા',
    coccidiosisTreatment: 'પાણીમાં એમ્પોલિયમ',
    coccidiosisPrevention: 'સૂકો કચરો જાળવો',
    fowlPoxTreatment: 'કોઈ ચોક્કસ સારવાર નથી',
    fowlPoxPrevention: 'મચ્છરની ઋતુ પહેલા રસીકરણ'
  },
  pa: {
    heroTitle1: 'ਸਮਾਰਟ ਪਸ਼ੂ ਸੰਭਾਲ',
    heroTitle2: 'ਇੱਥੇ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ',
    heroDesc: 'ਆਪਣੇ ਪਸ਼ੂਆਂ ਅਤੇ ਮੁਰਗੀਆਂ ਨੂੰ ਸਿਹਤਮੰਦ ਰੱਖੋ।',
    recommendedForYou: 'ਤੁਹਾਡੇ ਲਈ ਸਿਫਾਰਸ਼',
    recommendationReason: 'ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਦੇ ਅਧਾਰ ਤੇ',
    bestMatchBadge: 'ਸਭ ਤੋਂ ਵਧੀਆ',
    checkoutDescription: 'ਆਪਣਾ ਆਰਡਰ ਪੂਰਾ ਕਰੋ',
    enterFullName: 'ਪੂਰਾ ਨਾਮ',
    enterPhone: 'ਫੋਨ ਨੰਬਰ',
    enterAddress: 'ਪਤਾ',
    enterPincode: 'ਪਿਨਕੋਡ',
    enterCity: 'ਸ਼ਹਿਰ',
    coccidiosis: 'ਕੋਕਸੀਡੀਓਸਿਸ',
    coccidiosisSymptoms: 'ਖੂਨੀ ਦਸਤ',
    coccidiosisTreatment: 'ਪਾਣੀ ਵਿੱਚ ਐਮਪਰੋਲੀਅਮ',
    coccidiosisPrevention: 'ਸੁੱਕਾ ਕੂੜਾ ਬਣਾਈ ਰੱਖੋ',
    fowlPoxTreatment: 'ਕੋਈ ਖਾਸ ਇਲਾਜ ਨਹੀਂ',
    fowlPoxPrevention: 'ਮੱਛਰ ਦੇ ਮੌਸਮ ਤੋਂ ਪਹਿਲਾਂ ਟੀਕਾਕਰਨ'
  },
  bn: {
    heroTitle1: 'স্মার্ট পশুসম্পদ যত্ন',
    heroTitle2: 'এখানে শুরু হয়',
    heroDesc: 'আপনার পশু এবং পোল্ট্রিকে সুস্থ রাখুন।',
    recommendedForYou: 'আপনার জন্য প্রস্তাবিত',
    recommendationReason: 'আপনার প্রোফাইলের উপর ভিত্তি করে',
    bestMatchBadge: 'সেরা ম্যাচ',
    checkoutDescription: 'আপনার অর্ডার সম্পূর্ণ করুন',
    enterFullName: 'পুরো নাম',
    enterPhone: 'ফোন নম্বর',
    enterAddress: 'ঠিকানা',
    enterPincode: 'পিনকোড',
    enterCity: 'শহর',
    coccidiosis: 'ককসিডিওসিস',
    coccidiosisSymptoms: 'রক্তাক্ত ডায়রিয়া',
    coccidiosisTreatment: 'পানিতে এম্পোলিয়াম',
    coccidiosisPrevention: 'শুকনো আবর্জনা বজায় রাখুন',
    fowlPoxTreatment: 'কোন নির্দিষ্ট চিকিৎসা নেই',
    fowlPoxPrevention: 'মশার মৌসুমের আগে টিকা'
  },
  ml: {
    heroTitle1: 'സ്മാർട്ട് കന്നുകാലി പരിപാലനം',
    heroTitle2: 'ഇവിടെ തുടങ്ങുന്നു',
    heroDesc: 'നിങ്ങളുടെ കന്നുകാലികളെയും കോഴികളെയും ആരോഗ്യത്തോടെ സൂക്ഷിക്കുക.',
    recommendedForYou: 'നിങ്ങൾക്കായി ശുപാർശ ചെയ്യുന്നു',
    recommendationReason: 'നിങ്ങളുടെ പ്രൊഫൈൽ അടിസ്ഥാനമാക്കി',
    bestMatchBadge: 'മികച്ച ചേർച്ച',
    checkoutDescription: 'നിങ്ങളുടെ ഓർഡർ പൂർത്തിയാക്കുക',
    enterFullName: 'മുഴുവൻ പേര്',
    enterPhone: 'ഫോൺ നമ്പർ',
    enterAddress: 'വിലാസം',
    enterPincode: 'പിൻകോഡ്',
    enterCity: 'നഗരം',
    coccidiosis: 'കോക്സിഡിയോസിസ്',
    coccidiosisSymptoms: 'രക്തം കലർന്ന വയറിളക്കം',
    coccidiosisTreatment: 'വെള്ളത്തിൽ ആംപ്രോളിയം',
    coccidiosisPrevention: 'ഉണങ്ങിയ മാലിന്യങ്ങൾ സൂക്ഷിക്കുക',
    fowlPoxTreatment: 'പ്രത്യേക ചികിത്സയില്ല',
    fowlPoxPrevention: 'കൊതുക് സീസണിന് മുമ്പ് വാക്സിനേഷൻ'
  },
  or: {
    heroTitle1: 'ସ୍ମାର୍ଟ ପଶୁସମ୍ପଦ ଯତ୍ନ',
    heroTitle2: 'ଏଠାରେ ଆରମ୍ଭ ହୁଏ',
    heroDesc: 'ଆପଣଙ୍କର ଗାଈ ଏବଂ କୁକୁଡ଼ାକୁ ସୁସ୍ଥ ରଖନ୍ତୁ।',
    recommendedForYou: 'ଆପଣଙ୍କ ପାଇଁ ସୁପାରିଶ କରାଯାଇଛି',
    recommendationReason: 'ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ୍ ଉପରେ ଆଧାର କରି',
    bestMatchBadge: 'ସର୍ବୋତ୍ତମ ମେଳ',
    checkoutDescription: 'ଆପଣଙ୍କର ଅର୍ଡର ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
    enterFullName: 'ପୂରା ନାମ',
    enterPhone: 'ଫୋନ୍ ନମ୍ବର',
    enterAddress: 'ଠିକଣା',
    enterPincode: 'ପିନକୋଡ୍',
    enterCity: 'ସହର',
    coccidiosis: 'କକ୍ସିଡିଓସିସ୍',
    coccidiosisSymptoms: 'ରକ୍ତାକ୍ତ ଝାଡ଼ା',
    coccidiosisTreatment: 'ପାଣିରେ ଆମ୍ପ୍ରୋଲିୟମ୍',
    coccidiosisPrevention: 'ଶୁଖିଲା ଆବର୍ଜନା ରଖନ୍ତୁ',
    fowlPoxTreatment: 'କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଚିକିତ୍ସା ନାହିଁ',
    fowlPoxPrevention: 'ମଶା ଋତୁ ପୂର୍ବରୁ ଟୀକାକରଣ'
  }
};

const i18nDir = path.join(__dirname, 'src', 'i18n');

for (const [lang, vars] of Object.entries(translations)) {
  const filePath = path.join(i18nDir, lang + '.ts');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('heroTitle1')) {
      const injectionStr = Object.entries(vars).map(([k, v]) => '  ' + k + ': "' + v + '",').join('\n');
      
      const lastBraceIndex = content.lastIndexOf('}');
      if (lastBraceIndex !== -1) {
        content = content.slice(0, lastBraceIndex) + '\n  // Added by update script\n' + injectionStr + '\n' + content.slice(lastBraceIndex);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', lang + '.ts');
      }
    } else {
      console.log('Already updated', lang + '.ts');
    }
  }
}
