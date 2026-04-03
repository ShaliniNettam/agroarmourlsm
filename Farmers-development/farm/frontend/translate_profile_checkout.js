const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    personalInfoTitle: "Personal Information",
    personalInfoDesc: "Update your personal details here.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    edit: "Edit",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    saving: "Saving...",
    myOrdersDesc: "View your recent purchases",
    checkoutTitle: "Secure Checkout",
    checkoutDescription: "Complete your purchase securely.",
    shippingDetails: "Shipping Details",
    enterFullName: "Enter your full name",
    phoneNumber: "Phone Number",
    enterPhone: "Enter your phone number",
    address: "Address",
    enterAddress: "Enter your delivery address",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    gst: "GST (18%)",
    total: "Total",
    proceedToPayment: "Proceed to Payment"
  },
  hi: {
    personalInfoTitle: "व्यक्तिगत जानकारी",
    personalInfoDesc: "अपना व्यक्तिगत विवरण यहाँ अपडेट करें।",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    edit: "संपादित करें",
    cancel: "रद्द करें",
    saveChanges: "परिवर्तन सहेजें",
    saving: "सहेजा जा रहा है...",
    myOrdersDesc: "अपनी हाल की खरीदारी देखें",
    checkoutTitle: "सुरक्षित चेकआउट",
    checkoutDescription: "सुरक्षित रूप से अपनी खरीदारी पूरी करें।",
    shippingDetails: "शिपिंग विवरण",
    enterFullName: "अपना पूरा नाम दर्ज करें",
    phoneNumber: "फ़ोन नंबर",
    enterPhone: "अपना फ़ोन नंबर दर्ज करें",
    address: "पता",
    enterAddress: "अपना वितरण पता दर्ज करें",
    orderSummary: "आदेश का सारांश",
    subtotal: "उप-योग",
    gst: "जीएसटी (18%)",
    total: "कुल",
    proceedToPayment: "भुगतान के लिए आगे बढ़ें"
  },
  mr: {
    personalInfoTitle: "वैयक्तिक माहिती",
    personalInfoDesc: "तुमचे वैयक्तिक तपशील येथे अपडेट करा.",
    fullName: "पूर्ण नाव",
    emailAddress: "ईमेल पत्ता",
    edit: "संपादित करा",
    cancel: "रद्द करा",
    saveChanges: "बदल जतन करा",
    saving: "जतन करत आहे...",
    myOrdersDesc: "तुमची अलीकडील खरेदी पहा",
    checkoutTitle: "सुरक्षित चेकआउट",
    checkoutDescription: "तुमची खरेदी सुरक्षितपणे पूर्ण करा.",
    shippingDetails: "वितरण तपशील",
    enterFullName: "तुमचे पूर्ण नाव प्रविष्ट करा",
    phoneNumber: "फोन नंबर",
    enterPhone: "तुमचा फोन नंबर प्रविष्ट करा",
    address: "पत्ता",
    enterAddress: "तुमचा वितरण पत्ता प्रविष्ट करा",
    orderSummary: "ऑर्डर सारांश",
    subtotal: "उप-एकूण",
    gst: "जीएसटी (18%)",
    total: "एकूण",
    proceedToPayment: "पेमेंटसाठी पुढे जा"
  },
  bn: {
    personalInfoTitle: "ব্যক্তিগত তথ্য",
    personalInfoDesc: "এখানে আপনার ব্যক্তিগত বিবরণ আপডেট করুন।",
    fullName: "পুরো নাম",
    emailAddress: "ইমেইল ঠিকানা",
    edit: "সম্পাদনা",
    cancel: "বাতিল করুন",
    saveChanges: "পরিবর্তন সংরক্ষণ করুন",
    saving: "সংরক্ষণ করা হচ্ছে...",
    myOrdersDesc: "আপনার সাম্প্রতিক কেনাকাটা দেখুন",
    checkoutTitle: "নিরাপদ চেকআউট",
    checkoutDescription: "নিরাপদে আপনার কেনাকাটা সম্পন্ন করুন।",
    shippingDetails: "পরিবহন বিবরণ",
    enterFullName: "আপনার পুরো নাম লিখুন",
    phoneNumber: "ফোন নম্বর",
    enterPhone: "আপনার ফোন নম্বর লিখুন",
    address: "ঠিকানা",
    enterAddress: "আপনার ডেলিভারি ঠিকানা লিখুন",
    orderSummary: "অর্ডার সারাংশ",
    subtotal: "সাবটোটাল",
    gst: "জিএসটি (১৮%)",
    total: "মোট",
    proceedToPayment: "অর্থপ্রদানের জন্য এগিয়ে যান"
  },
  te: {
    personalInfoTitle: "వ్యక్తిగత సమాచారం",
    personalInfoDesc: "మీ వ్యక్తిగత వివరాలను ఇక్కడ నవీకరించండి.",
    fullName: "పూర్తి పేరు",
    emailAddress: "ఇమెయిల్ చిరునామా",
    edit: "సవరించు",
    cancel: "రద్దు చేయండి",
    saveChanges: "మార్పులను భద్రపరుచు",
    saving: "సేవ్ అవుతోంది...",
    myOrdersDesc: "మీ ఇటీవలి కొనుగోళ్లను వీక్షించండి",
    checkoutTitle: "సురక్షిత చెక్అవుట్",
    checkoutDescription: "మీ కొనుగోలును సురక్షితంగా పూర్తి చేయండి.",
    shippingDetails: "షిప్పింగ్ వివరాలు",
    enterFullName: "మీ పూర్తి పేరును నమోదు చేయండి",
    phoneNumber: "ఫోన్ నంబర్",
    enterPhone: "మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
    address: "చిరునామా",
    enterAddress: "మీ డెలివరీ చిరునామాను నమోదు చేయండి",
    orderSummary: "ఆర్డర్ సారాంశం",
    subtotal: "ఉపమొత్తం",
    gst: "జీఎస్టీ (18%)",
    total: "మొత్తం",
    proceedToPayment: "చెల్లింపు కోసం కొనసాగండి"
  },
  ta: {
    personalInfoTitle: "தனிப்பட்ட தகவல்",
    personalInfoDesc: "உங்கள் தனிப்பட்ட விவரங்களை இங்கே புதுப்பிக்கவும்.",
    fullName: "முழு பெயர்",
    emailAddress: "மின்னஞ்சல் முகவரி",
    edit: "தொகு",
    cancel: "ரத்து செய்",
    saveChanges: "மாற்றங்களைச் சேமிக்கவும்",
    saving: "சேமிக்கிறது...",
    myOrdersDesc: "உங்கள் சமீபத்திய வாங்குதல்களைக் காண்க",
    checkoutTitle: "பாதுகாப்பான செக்அவுட்",
    checkoutDescription: "உங்கள் வாங்குதலைப் பாதுகாப்பாக முடிக்கவும்.",
    shippingDetails: "கப்பல் விவரங்கள்",
    enterFullName: "உங்கள் முழுப் பெயரை உள்ளிடவும்",
    phoneNumber: "தொலைபேசி எண்",
    enterPhone: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
    address: "முகவரி",
    enterAddress: "உங்கள் விநியோக முகவரியை உள்ளிடவும்",
    orderSummary: "ஆர்டர் சுருக்கம்",
    subtotal: "துணை மொத்தம்",
    gst: "ஜிஎஸ்டி (18%)",
    total: "மொத்தம்",
    proceedToPayment: "கட்டணத்தைச் செலுத்த செல்லவும்"
  },
  kn: {
    personalInfoTitle: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    personalInfoDesc: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ನವೀಕರಿಸಿ.",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    emailAddress: "ಇಮೇಲ್ ವಿಳಾಸ",
    edit: "ತಿದ್ದು",
    cancel: "ರದ್ದುಮಾಡಿ",
    saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    myOrdersDesc: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಖರೀದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    checkoutTitle: "ಸುರಕ್ಷಿತ ಚೆಕ್ಔಟ್",
    checkoutDescription: "ನಿಮ್ಮ ಖರೀದಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿ.",
    shippingDetails: "ಶಿಪ್ಪಿಂಗ್ ವಿವರಗಳು",
    enterFullName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    enterPhone: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
    address: "ವಿಳಾಸ",
    enterAddress: "ನಿಮ್ಮ ವಿತರಣಾ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ",
    orderSummary: "ಆದೇಶದ ಸಾರಾಂಶ",
    subtotal: "ಉಪ-ಒಟ್ಟು",
    gst: "ಜಿಎಸ್ಟಿ (18%)",
    total: "ಒಟ್ಟು",
    proceedToPayment: "ಪಾವತಿಗಾಗಿ ಮುಂದುವರಿಯಿರಿ"
  }
};

const otherLangs = ['gu', 'ml', 'or', 'pa'];
otherLangs.forEach(lang => {
  translations[lang] = translations['hi']; // Fallback to Hindi
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
console.log('Profile and Checkout Translation Payload Injected Successfully');
