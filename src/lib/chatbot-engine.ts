type Intent = {
  keywords: string[];
  response: string;
};

/* =========================
   BASE INTENTS (UNCHANGED)
   ========================= */

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

/* =========================
   LEARNING STORAGE
   ========================= */

type LearnedData = {
  keywordHits: Record<string, number>;
  unknownQueries: string[];
};

const STORAGE_KEY = "__smart_ai_memory__";

const memory: LearnedData = loadMemory();

function loadMemory(): LearnedData {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY) || "") || {
        keywordHits: {},
        unknownQueries: [],
      }
    );
  } catch {
    return { keywordHits: {}, unknownQueries: [] };
  }
}

function saveMemory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
}

/* =========================
   UTILITIES
   ========================= */

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function matches(keywords: string[], input: string) {
  return keywords.some((k) => input.includes(k));
}

function learnFromMatch(intent: Intent, input: string) {
  const words = input.split(/\s+/);

  for (const word of words) {
    if (word.length < 3) continue;

    // boost known keywords
    if (intent.keywords.includes(word)) {
      memory.keywordHits[word] = (memory.keywordHits[word] || 0) + 2;
    } else {
      // softly learn new useful words
      memory.keywordHits[word] = (memory.keywordHits[word] || 0) + 1;
    }
  }

  saveMemory();
}

/* =========================
   MAIN AI FUNCTION
   ========================= */

export function getSmartReply(query: string): string {
  const input = normalize(query);

  // 1️⃣ Greeting
  if (matches(GREETINGS.keywords, input)) {
    learnFromMatch(GREETINGS, input);
    return GREETINGS.response;
  }

  // 2️⃣ Small talk
  for (const intent of SMALL_TALK) {
    if (matches(intent.keywords, input)) {
      learnFromMatch(intent, input);
      return intent.response;
    }
  }

  // 3️⃣ Identity
  if (matches(IDENTITY.keywords, input)) {
    learnFromMatch(IDENTITY, input);
    return IDENTITY.response;
  }

  // 4️⃣ Business logic (enhanced score-based)
  let bestMatch: Intent | null = null;
  let bestScore = 0;

  for (const intent of BUSINESS_FAQS) {
    let score = 0;

    for (const keyword of intent.keywords) {
      if (input.includes(keyword)) {
        score += 2;
      }
    }

    // learned keyword boost
    for (const word in memory.keywordHits) {
      if (input.includes(word)) {
        score += memory.keywordHits[word];
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  }

  if (bestMatch && bestScore > 0) {
    learnFromMatch(bestMatch, input);
    return bestMatch.response;
  }

  // 5️⃣ Fallback (learning unknowns)
  memory.unknownQueries.push(input);
  if (memory.unknownQueries.length > 50) {
    memory.unknownQueries.shift();
  }
  saveMemory();

  return "I can help with our services, licenses, experience, or government projects. Try asking something related to Suprabha Electricals.";
}
