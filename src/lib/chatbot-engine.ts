/* =========================================================
   SMART CHATBOT ENGINE – ADVANCED & LEARNING
   File: chatbot-engine.ts
   ========================================================= */

/* =========================
   TYPES
   ========================= */

type EnquiryDraft = {
  name?: string;
  email?: string;
  location?: string;
  message?: string;
};

type BotMode = "normal" | "enquiry";

type Intent = {
  id: string;
  keywords: string[];
  response: string;
  followUps?: string[];
};

type ConversationState = {
  lastIntent?: string;
  lastTopic?: string;
  stage: "greeting" | "discovery" | "detail" | "action";
  turns: number;

  mode?: BotMode;
  enquiryStep?: "name" | "email" | "location" | "message" | "confirm";
  enquiryDraft?: EnquiryDraft;
};

type LearnedMemory = {
  keywordScores: Record<string, number>;
  intentHints: Record<string, string>;
  unknownQueries: string[];
};

/* =========================
     STORAGE KEYS
     ========================= */

const STATE_KEY = "__chatbot_state__";
const MEMORY_KEY = "__chatbot_learning__";

/* =========================
     LOAD / SAVE
     ========================= */

function loadState(): ConversationState {
  try {
    return (
      JSON.parse(sessionStorage.getItem(STATE_KEY) || "") || {
        stage: "greeting",
        turns: 0,
      }
    );
  } catch {
    return { stage: "greeting", turns: 0 };
  }
}

function saveState(state: ConversationState) {
  sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function loadMemory(): LearnedMemory {
  try {
    return (
      JSON.parse(localStorage.getItem(MEMORY_KEY) || "") || {
        keywordScores: {},
        intentHints: {},
        unknownQueries: [],
      }
    );
  } catch {
    return { keywordScores: {}, intentHints: {}, unknownQueries: [] };
  }
}

function saveMemory(memory: LearnedMemory) {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

/* =========================
     UTILS
     ========================= */

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}

function tokenize(text: string) {
  return text.split(/\s+/).filter((w) => w.length > 2);
}

/* =========================
     INTENTS (UNCHANGED)
     ========================= */

const INTENTS: Intent[] = [
  {
    id: "project_enquiry",
    keywords: [
      "project enquiry",
      "project inquiry",
      "contact you",
      "submit enquiry",
      "new project",
      "quotation",
      "estimate",
    ],
    response: "Sure. I’ll help you submit a project enquiry. Let’s start.",
  },

  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good evening"],
    response: "Hello 👋 How can I assist you today?",
  },

  {
    id: "identity",
    keywords: ["who are you", "what is this", "what do you do"],
    response:
      "I’m the virtual assistant for Suprabha Electricals. I help with services, licenses, experience, and government projects.",
  },

  {
    id: "services",
    keywords: ["services", "what do you do", "work", "offer"],
    response:
      "We handle government-grade electrical contracting including HT & LT works, panels, transformers, DG sets, cabling, earthing, and AMC.",
    followUps: [
      "Is this for a government project or institutional facility?",
      "Are you looking for installation, maintenance, or turnkey execution?",
    ],
  },

  {
    id: "government",
    keywords: ["government", "psu", "tender", "public"],
    response:
      "We specialize in government, PSU, and institutional electrical projects across Karnataka.",
    followUps: [
      "Is this related to a tender or vendor registration?",
      "Do you need eligibility or past project details?",
    ],
  },

  {
    id: "license",
    keywords: ["license", "licensed", "approval", "grade"],
    response:
      "We are a Government Licensed Class-1 Electrical Contractor with Super Grade authorization.",
    followUps: ["Is this for tender eligibility or compliance verification?"],
  },

  {
    id: "experience",
    keywords: ["experience", "years", "how long"],
    response:
      "Suprabha Electricals has over 25 years of experience delivering compliant electrical infrastructure.",
    followUps: [
      "Would you like to know about similar government projects we’ve executed?",
    ],
  },

  {
    id: "contact",
    keywords: ["contact", "reach", "phone", "email"],
    response:
      "You can reach us through the Contact section on this website for enquiries, tenders, or consultations.",
  },

  {
    id: "location",
    keywords: ["location", "where", "bangalore", "karnataka"],
    response:
      "We operate across Karnataka and handle projects throughout the state.",
  },
];

/* =========================
     LEARNING ENGINE
     ========================= */

function learnFromConversation(
  memory: LearnedMemory,
  input: string,
  intentId?: string
) {
  const words = tokenize(input);

  words.forEach((word) => {
    memory.keywordScores[word] = (memory.keywordScores[word] || 0) + 1;
    if (intentId) {
      memory.intentHints[word] = intentId;
    }
  });

  saveMemory(memory);
}

/* =========================
     MAIN CHAT FUNCTION
     ========================= */

export function getSmartReply(query: string): string {
  const input = normalize(query);
  const state = loadState();
  const memory = loadMemory();

  state.turns += 1;

  /* ================= ENQUIRY MODE ================= */
  if (state.mode === "enquiry") {
    state.enquiryDraft ||= {};

    switch (state.enquiryStep) {
      case "name":
        state.enquiryDraft.name = query;
        state.enquiryStep = "email";
        saveState(state);
        return "Thanks. Please share your email address.";

      case "email":
        state.enquiryDraft.email = query;
        state.enquiryStep = "location";
        saveState(state);
        return "Project location (city or site)? You can type 'skip'.";

      case "location":
        if (query.toLowerCase() !== "skip") {
          state.enquiryDraft.location = query;
        }
        state.enquiryStep = "message";
        saveState(state);
        return "Please describe your project requirements.";

      case "message":
        state.enquiryDraft.message = query;
        state.enquiryStep = "confirm";
        saveState(state);
        return `Please confirm:\n\nName: ${state.enquiryDraft.name}\nEmail: ${
          state.enquiryDraft.email
        }\nLocation: ${
          state.enquiryDraft.location || "Not provided"
        }\n\nType "send" to submit or "cancel".`;

      case "confirm":
        if (query.toLowerCase().includes("send")) {
          saveState(state);
          return "__SEND_ENQUIRY__";
        }

        state.mode = "normal";
        state.enquiryStep = undefined;
        state.enquiryDraft = undefined;
        saveState(state);
        return "Enquiry cancelled. How else can I help?";
    }
  }

  /* ================= INTENT MATCHING ================= */

  let bestIntent: Intent | null = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    let score = 0;

    intent.keywords.forEach((k) => {
      if (input.includes(k)) score += 3;
    });

    tokenize(input).forEach((word) => {
      if (memory.intentHints[word] === intent.id) {
        score += memory.keywordScores[word] || 1;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  /* ================= NO MATCH ================= */

  if (!bestIntent) {
    memory.unknownQueries.push(input);
    if (memory.unknownQueries.length > 100) {
      memory.unknownQueries.shift();
    }
    saveMemory(memory);
    saveState(state);

    if (state.lastIntent === "services") {
      return "Could you specify the type of electrical work you’re looking for?";
    }

    if (state.stage === "detail") {
      return "Would you like information on licenses, experience, or government projects?";
    }

    return "I can help with services, licenses, experience, or government projects. What would you like to know?";
  }

  /* ================= MATCH FOUND ================= */

  learnFromConversation(memory, input, bestIntent.id);

  /* 🔥 ADDITION — ENTER ENQUIRY MODE SAFELY */
  if (bestIntent.id === "project_enquiry") {
    saveState({
      ...state,
      mode: "enquiry",
      enquiryStep: "name",
      enquiryDraft: {},
    });
    return "Please share your name or organization.";
  }

  const nextStage =
    bestIntent.id === "contact"
      ? "action"
      : bestIntent.followUps
      ? "detail"
      : "discovery";

  saveState({
    lastIntent: bestIntent.id,
    lastTopic: bestIntent.id,
    stage: nextStage,
    turns: state.turns,
  });

  if (bestIntent.followUps && state.turns < 7) {
    const followUp =
      bestIntent.followUps[
        Math.floor(Math.random() * bestIntent.followUps.length)
      ];
    return `${bestIntent.response}\n\n${followUp}`;
  }

  return bestIntent.response;
}
