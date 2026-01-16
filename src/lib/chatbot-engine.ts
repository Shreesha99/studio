type Intent = {
  keywords: string[];
  response: string;
};

const GREETINGS: Intent = {
  keywords: ["hi", "hello", "hey", "good morning", "good evening"],
  response: "Hey! How can I help you?",
};

const SMALL_TALK: Intent[] = [
  {
    keywords: ["how are you", "how r u"],
    response: "I’m doing good. How can I help you today?",
  },
  {
    keywords: ["what's up", "whats up"],
    response: "Not much 🙂 How can I help?",
  },
];

const IDENTITY: Intent = {
  keywords: ["who are you", "what is this", "what are you"],
  response:
    "I’m the virtual assistant for Suprabha Electricals. I can help you with information about our services, licenses, experience, and government projects.",
};

const BUSINESS_FAQS: Intent[] = [
  {
    keywords: ["services", "what do you do", "work", "offer"],
    response:
      "We are a Government Licensed Class-1 Electrical Contractor handling HT & LT electrical works up to 33KV, DG sets, panels, transformers, cable laying, earthing, and annual maintenance for government and institutional projects.",
  },
  {
    keywords: ["government", "psu", "tender", "public"],
    response:
      "We work exclusively on government, PSU, and institutional electrical projects across Karnataka.",
  },
  {
    keywords: ["experience", "years", "how long"],
    response:
      "Suprabha Electricals has over 25 years of experience executing large-scale and compliant electrical infrastructure projects.",
  },
  {
    keywords: ["license", "licensed", "approval", "grade"],
    response:
      "We are a Government Licensed Class-1 Electrical Contractor and hold a Super Grade Electrical License for high-value and critical infrastructure projects.",
  },
  {
    keywords: ["contact", "reach", "phone", "email"],
    response:
      "You can contact us through the Contact section on this website for enquiries, tenders, or consultations.",
  },
  {
    keywords: ["location", "where", "karnataka"],
    response:
      "We operate across Karnataka and undertake electrical infrastructure projects throughout the state.",
  },
];

/* Utility */
function matches(keywords: string[], input: string) {
  return keywords.some((k) => input.includes(k));
}

export function getSmartReply(query: string): string {
  const input = query.toLowerCase().trim();

  // 1️⃣ Greeting
  if (matches(GREETINGS.keywords, input)) {
    return GREETINGS.response;
  }

  // 2️⃣ Small talk
  for (const intent of SMALL_TALK) {
    if (matches(intent.keywords, input)) {
      return intent.response;
    }
  }

  // 3️⃣ Identity
  if (matches(IDENTITY.keywords, input)) {
    return IDENTITY.response;
  }

  // 4️⃣ Business logic (score-based)
  let bestMatch: Intent | null = null;
  let score = 0;

  for (const intent of BUSINESS_FAQS) {
    const hits = intent.keywords.filter((k) => input.includes(k)).length;
    if (hits > score) {
      score = hits;
      bestMatch = intent;
    }
  }

  if (bestMatch) {
    return bestMatch.response;
  }

  // 5️⃣ Fallback
  return "I can help with our services, licenses, experience, or government projects. Try asking something related to Suprabha Electricals.";
}
