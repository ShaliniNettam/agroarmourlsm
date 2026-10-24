export const getAnimalHealthResponse = (text: string, t: any) => {
  const lowerText = text.toLowerCase().trim();
  
  // Helper to get translation with fallback
  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  // 1. Specific Disease Detection (High Priority)
  // Newcastle
  if (lowerText.includes("newcastle") || lowerText.includes("ncd") || lowerText.includes("न्यूकैसल")) {
    const name = getT('newcastleDisease', "Newcastle Disease");
    const sym = getT('newcastleSymptoms', "Respiratory distress, greenish diarrhea.");
    const treat = getT('newcastleTreatment', "Consult a vet for vaccination.");
    return `${name}: ${sym} ${treat}`;
  }
  // Pox
  if (lowerText.includes("pox") || lowerText.includes("पॉक्स") || lowerText.includes("माता")) {
    const name = getT('fowlPox', "Fowl Pox");
    const sym = getT('fowlPoxSymptoms', "Wart-like lesions on face and comb.");
    const treat = getT('fowlPoxTreatment', "Apply iodine to lesions and isolate birds.");
    return `${name}: ${sym} ${treat}`;
  }
  // FMD
  if (lowerText.includes("fmd") || lowerText.includes("foot") || lowerText.includes("mouth") || lowerText.includes("khurpaka") || lowerText.includes("मुंहपका") || lowerText.includes("खुरपका")) {
    const name = getT('fmd', "Foot and Mouth Disease");
    const sym = getT('fmdSymptoms', "High fever, blisters in mouth and on feet.");
    const treat = getT('fmdTreatment', "Supportive care and regular vaccination.");
    return `${name}: ${sym} ${treat}`;
  }
  // Mastitis
  if (lowerText.includes("mastitis") || lowerText.includes("thanaila") || lowerText.includes("थनैला") || lowerText.includes("swelling") || lowerText.includes("सूजन")) {
    const name = getT('mastitis', "Mastitis");
    const sym = getT('mastitisSymptoms', "Swelling of udder, drop in milk yield.");
    const treat = getT('mastitisTreatment', "Frequent milking and antibiotics.");
    return `${name}: ${sym} ${treat}`;
  }
  // Coccidiosis
  if (lowerText.includes("coccidiosis") || lowerText.includes("diarrhea") || lowerText.includes("पेचिश")) {
    const name = getT('coccidiosis', "Coccidiosis");
    const sym = getT('coccidiosisSymptoms', "Bloody diarrhea, weight loss.");
    const treat = getT('coccidiosisTreatment', "Anti-coccidial drugs in water.");
    return `${name}: ${sym} ${treat}`;
  }

  // 2. Navigation & Feature Detection
  if (lowerText.includes("vaccine") || lowerText.includes("टीका") || lowerText.includes("इंजेक्शन")) {
    return "We have Newcastle, FMD, and Lumpy Skin vaccines available in our Marketplace. Please check the Marketplace page.";
  }

  if (lowerText.includes("market") || lowerText.includes("buy") || lowerText.includes("price") || lowerText.includes("shop") || lowerText.includes("बाजार")) {
    return "Visit our Marketplace to buy animal feed, vaccines, and equipment with up to 30% discount.";
  }

  if (lowerText.includes("gps") || lowerText.includes("doctor") || lowerText.includes("vet") || lowerText.includes("nearby") || lowerText.includes("डॉक्टर")) {
    return "Use our GPS Tracking tool to find veterinary doctors and clinics near you.";
  }

  if (lowerText.includes("hygiene") || lowerText.includes("clean") || lowerText.includes("test") || lowerText.includes("सफाई")) {
    return "Take our Hygiene Assessment test to audit your farm's safety standards.";
  }

  if (lowerText.includes("community") || lowerText.includes("farmer") || lowerText.includes("ask") || lowerText.includes("help")) {
    return "Join our Farmer Community to ask experts and share knowledge with others.";
  }

  // 3. Category fallbacks
  const isPoultry = lowerText.includes("hen") || lowerText.includes("chicken") || lowerText.includes("bird") || lowerText.includes("मुर्गी");
  const isCattle = lowerText.includes("cow") || lowerText.includes("cattle") || lowerText.includes("buffalo") || lowerText.includes("गाय") || lowerText.includes("भैंस");

  if (isPoultry) {
    return "You're asking about poultry. I can give info on Newcastle, Fowl Pox, or Coccidiosis. What do you need?";
  }

  if (isCattle) {
    return "You're asking about cattle. I can help with FMD, Mastitis, or Black Quarter info. Ask me about symptoms or vaccines.";
  }

  // 4. Greetings
  if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("namaste") || lowerText.includes("नमस्ते")) {
    return "Hello! I am your AgroArmor Assistant. Ask me about animal diseases, vaccines, find doctors, or use our farm tools.";
  }

  return ""; 
};
