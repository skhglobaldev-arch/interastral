
import { readFileSync } from 'fs';
import path from 'path';
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import express, { NextFunction } from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';
import type Stripe from 'stripe';
import dotenv from 'dotenv';
import type { GoogleGenAI, Schema } from "@google/genai";


// Load environment variables
dotenv.config();

// --- CONFIGURATION ---
const app = express();
const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

let adminInitialized = false;
let aiClient: GoogleGenAI | undefined;
let stripeClient: Stripe | undefined;
let mailTransporter: any;

const ensureAdmin = () => {
  if (adminInitialized) return;

  try {
    const serviceAccountPath = path.join(process.cwd(), 'backend', 'serviceAccountKey.json');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.warn('Could not load serviceAccountKey.json, falling back to default initialization', error);
    admin.initializeApp();
  }

  adminInitialized = true;
};

const getDb = () => {
  ensureAdmin();
  return admin.firestore();
};

const getAi = async () => {
  if (!aiClient) {
    const { GoogleGenAI } = await import("@google/genai");
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
  }
  return aiClient;
};

const getStripe = async () => {
  if (!stripeClient) {
    const { default: Stripe } = await import('stripe');
    const stripeSecret = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
    stripeClient = new Stripe(stripeSecret, {
      apiVersion: '2023-10-16' as any,
    });
  }
  return stripeClient;
};

const getTransporter = async () => {
  if (!mailTransporter) {
    const nodemailer = await import('nodemailer');
    mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  return mailTransporter;
};

// --- MIDDLEWARE ---
app.use(cors({ origin: true })); 

// Use JSON parser for all routes EXCEPT the Stripe webhook
app.use((req: any, res: any, next: NextFunction) => {
  const requestPaths = [req.originalUrl, req.url, req.path].filter(Boolean);
  const isStripeWebhook = requestPaths.some((requestPath: string) => {
    const cleanPath = requestPath.split('?')[0];
    return cleanPath.endsWith('/payment/webhook');
  });

  if (isStripeWebhook) {
    next();
  } else {
    // Increase limit for base64 images
    express.json({ limit: '50mb' })(req, res, next);
  }
});

// --- TYPES (Inlined to ensure backend stability) ---
export enum ModuleType {
  LOVE = 'LOVE',
  CAFE = 'CAFE',
  PAST_LIFE = 'PAST_LIFE',
  DAILY = 'DAILY',
  TAROT = 'TAROT',
  WEALTH = 'WEALTH',
  RETURN_LOVE = 'RETURN_LOVE',
  DREAM = 'DREAM',
  NATAL_CHART = 'NATAL_CHART'
}

export interface AppFormData {
  language: string;
  name: string;
  email: string;
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  location?: string;
  job?: string;
  isPremium?: boolean;
  partnerName?: string;
  partnerBirthDate?: string;
  partnerGender?: string;
  relationshipStatus?: string;
  feelingsTowardsPartner?: string;
  bigQuestion?: string;
  currentEmotion?: string;
  lifeArea?: string;
  openAdvice?: string;
  financialWish?: string;
  financialBlockage?: string;
  desiredEnergy?: string;
  tarotFocus?: string;
  situationSummary?: string;
  dreamDate?: string;
  dreamEmotion?: string;
  dreamDescription?: string;
  isRecurringDream?: string;
  interpretationStyle?: string;
  todaysWorry?: string;
  todaysDesire?: string;
  importantThought?: string;
  timeApart?: string;
  breakupReason?: string;
  relationshipDesire?: string;
  motherName?: string;
  personalSymbol?: string;
  recurringDream?: string;
  userImage?: string;
  unknownTime?: boolean;
  chartYear?: string;
  birthTimeAccuracy?: string;
  natalFocus?: string;
  educationLevel?: string;
  studyField?: string;
  careerStage?: string;
  lovePattern?: string;
  stillThinkingOfSomeone?: string;
  loveGoal?: string;
  careerSatisfaction?: string;
  biggestYearGoal?: string;
  progressBlocker?: string;
  oneLifeChange?: string;
  professionalExtras?: string;
  careerQuestion?: string;
  loveQuestion?: string;
  familyQuestion?: string;
  moneyQuestion?: string;
  educationQuestion?: string;
  healthQuestion?: string;
  spiritualQuestion?: string;
  currentChallenge?: string;
  majorGoal2026?: string;
  majorGoal2027?: string;
  desiredOutcome?: string;
}

// --- AUTH MIDDLEWARE ---
const validateFirebaseIdToken = async (req: any, res: any, next: NextFunction) => {
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    return res.status(403).send('Unauthorized');
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    idToken = req.cookies.__session;
  }

  try {
    ensureAdmin();
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(403).send('Unauthorized');
  }
};

// --- ROUTER SETUP ---
const router = express.Router();



// --- CONSTANTS ---
const COIN_PACKAGES = {
  'starter': { coins: 50, price: 199 },
  'basic': { coins: 100, price: 599 },
  'premium': { coins: 300, price: 1099 },
  'gold': { coins: 1000, price: 2999 }
};

const READING_COSTS: Record<string, number> = {
  'DAILY': 25, 'DREAM': 25, 'TAROT': 40, 'LOVE': 40, 'WEALTH': 40,
  'RETURN_LOVE': 40, 'CAFE': 70, 'PAST_LIFE': 70, 'NATAL_CHART': 70
};

const BRAND_LOGO_IMAGE_URL = 'https://interastral.vision/assets/brand/interastral-logo.png';

const COSMIC_QUOTES = [
  "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself. – Carl Sagan",
  "Look up at the stars and not down at your feet. – Stephen Hawking",
  "Yours is the light by which my spirit's born: - you are my sun, my moon, and all my stars. – E.E. Cummings",
  "The universe is not outside of you. Look inside yourself; everything that you want, you already are. – Rumi"
];

// --- TRANSLATIONS FOR EMAILS ---
const EMAIL_TRANSLATIONS: any = {
    en: {
        welcomeTitle: "Welcome to the Stars",
        welcomeBody: "You have successfully connected to the Interastral Portal.",
        yourCode: "Your Cosmic Key",
        shareText: "Share this code with a friend. When they join, you BOTH receive 10 Stardust.",
        enterVoid: "ENTER THE VOID",
        footer: "THE COSMOS AWAITS",
        referralTitle: "Cosmic Connection Made! ✨",
        referralBody: "A new soul has joined the cosmos using your guidance.",
        referralReward: "You have received **10 Stardust**.",
        readingReadyTitle: "Your Vision is Ready 🔮",
        readingReadyBody: "The stars have aligned and your revelation has been transcribed.",
        pendingTitle: "The Stars Are Waiting... ⏳",
        pendingBody: "You started a journey into the unknown, but the connection was not completed.",
        pendingAction: "Complete your offering to reveal the message meant for you."
    },
    fa: {
        welcomeTitle: "به ستارگان خوش آمدید",
        welcomeBody: "شما با موفقیت به دروازه اینتراسترال متصل شدید.",
        yourCode: "کلید کیهانی شما",
        shareText: "این کد را با دوستان خود به اشتراک بگذارید. با ورود آنها، هر دو ۱۰ گرد ستاره دریافت می‌کنید.",
        enterVoid: "ورود به خلاء",
        footer: "کیهان در انتظار است",
        referralTitle: "اتصال کیهانی برقرار شد! ✨",
        referralBody: "یک روح جدید با راهنمایی شما به کیهان پیوست.",
        referralReward: "شما **۱۰ گرد ستاره** دریافت کردید.",
        readingReadyTitle: "مکاشفه شما آماده است 🔮",
        readingReadyBody: "ستارگان هم‌تراز شده‌اند و پیام شما ترجمه شده است.",
        pendingTitle: "ستارگان منتظرند... ⏳",
        pendingBody: "شما سفری را به ناشناخته‌ها آغاز کردید، اما ارتباط کامل نشد.",
        pendingAction: "برای دریافت پیامی که برای شما مقدر شده، فرآیند را تکمیل کنید."
    }
};

const getTranslation = (lang: string) => {
    return EMAIL_TRANSLATIONS[lang] || EMAIL_TRANSLATIONS['en'];
};

// --- HELPER FUNCTIONS ---
const generateReferralCode = (email: string) => {
  const prefix = email.split('@')[0].substring(0, 4).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${random}`;
};

const getClientIp = (req: any) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    return (xForwardedFor as string).split(',')[0].trim();
  }
  return req.connection.remoteAddress || req.ip;
};

// --- EMAIL STYLES ---
const getEmailStyles = () => `
  body { margin: 0; padding: 0; font-family: Verdana, Geneva, sans-serif; background-color: #050214; color: #e0e0e0; -webkit-font-smoothing: antialiased; }
  .container { max-width: 600px; margin: 20px auto; background: linear-gradient(180deg, #0a0514 0%, #1a0b2e 100%); border: 1px solid #4c1d95; border-radius: 16px; overflow: hidden; box-shadow: 0 0 30px rgba(168, 85, 247, 0.2); }
  .header { background-color: #000000; padding: 25px; text-align: center; border-bottom: 1px solid #4c1d95; }
  .logo { width: 70px; height: 70px; border-radius: 50%; border: 2px solid #a855f7; box-shadow: 0 0 15px #a855f7; }
  .content { padding: 30px 25px; text-align: center; line-height: 1.6; }
  .title { color: #f0abfc; font-size: 22px; margin-bottom: 20px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
  .text { color: #d1d5db; font-size: 15px; margin-bottom: 25px; }
  .quote-box { background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px; border-left: 4px solid #e879f9; margin: 25px 0; font-style: italic; color: #fbbf24; font-size: 14px; }
  .referral-box { background: linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); border: 1px dashed #d8b4fe; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; }
  .referral-code { font-size: 24px; letter-spacing: 4px; font-weight: bold; color: #fdf2f8; text-shadow: 0 0 10px #ec4899; margin: 10px 0; display: block; font-family: 'Courier New', Courier, monospace; }
  .btn { display: inline-block; padding: 14px 30px; background: linear-gradient(90deg, #7e22ce, #db2777); color: #ffffff !important; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 15px; font-size: 14px; box-shadow: 0 4px 15px rgba(219, 39, 119, 0.4); }
  .footer { padding: 20px; text-align: center; font-size: 11px; color: #6b7280; border-top: 1px solid #4c1d95; background-color: #000000; font-family: sans-serif; }
  .reward { font-size: 18px; color: #fbbf24; font-weight: bold; border: 1px dashed #fbbf24; padding: 10px 20px; display: inline-block; margin-top: 10px; border-radius: 8px; background: rgba(251, 191, 36, 0.1); }
`;

// --- EMAIL SENDERS ---
const sendWelcomeEmail = async (email: string, name: string, code: string, lang: string) => {
  const t = getTranslation(lang);
  const styles = getEmailStyles();
  const html = `<!DOCTYPE html><html><head><style>${styles}</style></head><body><div class="container"><div class="header"><img src="${BRAND_LOGO_IMAGE_URL}" alt="Interastral" class="logo"></div><div class="content"><div class="title">${t.welcomeTitle}</div><div class="text">Greetings, ${name}.</div><div class="text">${t.welcomeBody}</div><div class="referral-box"><span style="display:block; font-size:12px; color:#d8b4fe; letter-spacing:2px; text-transform:uppercase;">${t.yourCode}</span><span class="referral-code">${code}</span><span style="display:block; font-size:11px; color:#9ca3af; margin-top:5px;">${t.shareText}</span></div><div class="quote-box">"${COSMIC_QUOTES[Math.floor(Math.random() * COSMIC_QUOTES.length)]}"</div><a href="https://interastral.vision" class="btn">${t.enterVoid}</a></div><div class="footer">${t.footer} <br>Interastral Vision © 2025</div></div></body></html>`;
  await (await getTransporter()).sendMail({ from: '"Interastral Vision" <no-reply@interastral.vision>', to: email, subject: `✨ ${t.welcomeTitle}`, html: html });
};

const sendReadingEmail = async (email: string, reading: any, lang: string, status: 'pending' | 'completed') => {
    const t = getTranslation(lang);
    const styles = getEmailStyles();
    const isCompleted = status === 'completed';
    const title = isCompleted ? t.readingReadyTitle : t.pendingTitle;
    const body = isCompleted ? t.readingReadyBody : t.pendingBody;
    const actionText = isCompleted ? t.enterVoid : t.pendingAction;
    let snippet = "";
    if (isCompleted && reading.content) { snippet = reading.content.replace(/---EMAIL_START---[\s\S]*---EMAIL_END---/, '').replace(/[#*`]/g, '').substring(0, 150) + "..."; }
    const html = `<!DOCTYPE html><html><head><style>${styles}</style></head><body><div class="container"><div class="header"><img src="${BRAND_LOGO_IMAGE_URL}" alt="Interastral" class="logo"></div><div class="content"><div class="title">${title}</div><div class="text">${body}</div>${isCompleted ? `<div class="quote-box">"${reading.title}" <br><span style="font-size:12px; color:#d1d5db; margin-top:5px; display:block;">${snippet}</span></div>` : ''}<a href="https://interastral.vision" class="btn">${actionText}</a></div><div class="footer">${t.footer}</div></div></body></html>`;
    await (await getTransporter()).sendMail({ from: '"Interastral Vision" <no-reply@interastral.vision>', to: email, subject: title, html: html });
};

const sendReferralEmail = async (email: string, lang: string) => {
    const t = getTranslation(lang);
    const styles = getEmailStyles();
    const html = `<!DOCTYPE html><html><head><style>${styles}</style></head><body><div class="container"><div class="header"><img src="${BRAND_LOGO_IMAGE_URL}" alt="Interastral" class="logo"></div><div class="content"><div class="title">${t.referralTitle}</div><div class="text">${t.referralBody}</div><div class="reward">${t.referralReward}</div><br><a href="https://interastral.vision" class="btn">${t.enterVoid}</a></div><div class="footer">${t.footer}</div></div></body></html>`;
    await (await getTransporter()).sendMail({ from: '"Interastral Vision" <no-reply@interastral.vision>', to: email, subject: t.referralTitle, html: html });
};


// --- USER PROVIDED GEMINI LOGIC START ---

// Helper to generate Sacred Texts Tarot URL
const getTarotImage = (suit: string, number: number): string => {
  const baseUrl = "https://www.sacred-texts.com/tarot/pkt/img";
  let prefix = "";
  
  switch (suit.toLowerCase()) {
    case 'major': prefix = 'ar'; break;
    case 'wands': prefix = 'wa'; break;
    case 'cups': prefix = 'cu'; break;
    case 'swords': prefix = 'sw'; break;
    case 'pentacles': prefix = 'pe'; break;
    default: return "https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(1).jpg?alt=media&token=1a2f6099-e7b0-4132-a1ad-a125b8239ff8"; // Fallback
  }

  const numStr = number.toString().padStart(2, '0');
  return `${baseUrl}/${prefix}${numStr}.jpg`;
};

const GeminiType = {
  OBJECT: 'OBJECT',
  ARRAY: 'ARRAY',
  STRING: 'STRING',
  INTEGER: 'INTEGER'
} as const;

// Tarot JSON Schema
const tarotSchema: Schema = {
  type: GeminiType.OBJECT as any,
  properties: {
    cards: {
      type: GeminiType.ARRAY as any,
      description: "Three tarot cards drawn for Past, Present, Future or the user's specific question.",
      items: {
        type: GeminiType.OBJECT as any,
        properties: {
          suit: { 
            type: GeminiType.STRING as any,
            enum: ["Major", "Wands", "Cups", "Swords", "Pentacles"],
            description: "The suit of the card. Use 'Major' for Major Arcana." 
          },
          number: { 
            type: GeminiType.INTEGER as any,
            description: "Card number. For Major: 0-21. For Minor: 1 (Ace) to 14 (King)." 
          },
          nameEnglish: { type: GeminiType.STRING as any, description: "e.g., The Fool, Ace of Cups" },
          nameLocal: { type: GeminiType.STRING as any, description: "Card name in the requested language" },
          interpretation: { type: GeminiType.STRING as any, description: "Interpretation of this specific card in the context of the user's question, in the requested language." }
        },
        required: ["suit", "number", "nameEnglish", "nameLocal", "interpretation"]
      }
    },
    summary: { type: GeminiType.STRING as any, description: "A final summary and advice combining all 3 cards in the requested language." },
    mysticalGuidance: { 
      type: GeminiType.STRING as any,
      description: "A mysterious inspirational sentence or step-by-step roadmap in the requested language." 
    },
    chronography: {
      type: GeminiType.STRING as any,
      description: "A list of actions to take and actions to avoid, written in the requested language."
    },
    emailContent: {
      type: GeminiType.STRING as any,
      description: "HTML content for an email summary in the requested language. Includes a motivational quote, brief summary, and a button linking back to the site."
    }
  },
  required: ["cards", "summary", "mysticalGuidance", "chronography", "emailContent"]
};

// --- General Prompt Helper ---

const READING_LANGUAGE_UI: Record<string, {
  name: string;
  nativeName: string;
  cta: string;
  tarotTitle: string;
  card: string;
  guidance: string;
  chronography: string;
  silent: string;
  silentMoment: string;
}> = {
  en: {
    name: 'English',
    nativeName: 'English',
    cta: 'Get New Reading',
    tarotTitle: 'Tarot Reading',
    card: 'Card',
    guidance: 'Guidance',
    chronography: 'Cosmic Chronography',
    silent: 'The stars are silent today...',
    silentMoment: 'The stars are silent momentarily. Please try again.'
  },
  fa: {
    name: 'Persian (Farsi)',
    nativeName: 'فارسی',
    cta: 'دریافت فال جدید',
    tarotTitle: 'پاسخ تاروت',
    card: 'کارت',
    guidance: 'راهنمایی',
    chronography: 'زمان‌نگاری کیهانی',
    silent: 'امروز ستارگان ساکت‌اند...',
    silentMoment: 'ستارگان برای لحظه‌ای ساکت‌اند. لطفا دوباره تلاش کنید.'
  },
  fr: {
    name: 'French',
    nativeName: 'français',
    cta: 'Obtenir une nouvelle lecture',
    tarotTitle: 'Lecture de Tarot',
    card: 'Carte',
    guidance: 'Guidance',
    chronography: 'Chronographie cosmique',
    silent: 'Les étoiles sont silencieuses aujourd’hui...',
    silentMoment: 'Les étoiles sont silencieuses un instant. Veuillez réessayer.'
  },
  'pt-BR': {
    name: 'Brazilian Portuguese',
    nativeName: 'português do Brasil',
    cta: 'Receber nova leitura',
    tarotTitle: 'Leitura de Tarot',
    card: 'Carta',
    guidance: 'Orientação',
    chronography: 'Cronografia cósmica',
    silent: 'As estrelas estão em silêncio hoje...',
    silentMoment: 'As estrelas ficaram em silêncio por um momento. Tente novamente.'
  },
  'pt-PT': {
    name: 'European Portuguese',
    nativeName: 'português de Portugal',
    cta: 'Receber nova leitura',
    tarotTitle: 'Leitura de Tarot',
    card: 'Carta',
    guidance: 'Orientação',
    chronography: 'Cronografia cósmica',
    silent: 'As estrelas estão em silêncio hoje...',
    silentMoment: 'As estrelas ficaram em silêncio por um momento. Tente novamente.'
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    cta: 'احصل على قراءة جديدة',
    tarotTitle: 'قراءة التارو',
    card: 'البطاقة',
    guidance: 'الإرشاد',
    chronography: 'التسلسل الزمني الكوني',
    silent: 'النجوم صامتة اليوم...',
    silentMoment: 'النجوم صامتة للحظة. يرجى المحاولة مرة أخرى.'
  },
  hi: {
    name: 'Hindi (Devanagari script)',
    nativeName: 'हिन्दी',
    cta: 'नई रीडिंग पाएं',
    tarotTitle: 'टैरो रीडिंग',
    card: 'कार्ड',
    guidance: 'मार्गदर्शन',
    chronography: 'कॉस्मिक क्रोनोग्राफी',
    silent: 'आज सितारे मौन हैं...',
    silentMoment: 'सितारे क्षण भर मौन हैं. कृपया फिर कोशिश करें.'
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    cta: 'Neue Deutung erhalten',
    tarotTitle: 'Tarot-Deutung',
    card: 'Karte',
    guidance: 'Führung',
    chronography: 'Kosmische Chronografie',
    silent: 'Die Sterne schweigen heute...',
    silentMoment: 'Die Sterne schweigen für einen Moment. Bitte versuche es erneut.'
  }
};

const getReadingLanguageUi = (lang?: string) => READING_LANGUAGE_UI[lang || 'en'] || READING_LANGUAGE_UI.en;

const getStrictLanguageInstruction = (lang?: string) => {
  const language = getReadingLanguageUi(lang);
  const rtlNote = lang === 'fa' || lang === 'ar'
    ? 'Use natural right-to-left phrasing and punctuation for this language.'
    : '';

  return `
    OUTPUT LANGUAGE RULE:
    Write every user-facing word strictly in ${language.name} (${language.nativeName}).
    This includes all headings, section titles, month names, tarot headings, affirmations, warnings, chronography, email summary text, and CTA button text.
    Do not switch to English except for brand names, URLs, proper nouns, and names provided by the user.
    If an input value is an English code, translate its meaning naturally before reflecting it back.
    ${rtlNote}
  `;
};

const humanizeFormValue = (value?: string) => {
  if (!value) return '';
  return value
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
};

const humanizeFormList = (value?: string) => {
  if (!value) return '';
  return value
    .split(',')
    .map(item => humanizeFormValue(item))
    .filter(Boolean)
    .join(', ');
};

const getGroundedPersonalizationStandard = () => `
  PERSONALIZATION AND CREDIBILITY STANDARD:
  - Treat every answer as meaningful evidence about this person's current context. Explicitly connect at least three details they provided into the interpretation.
  - Avoid generic templates, vague reassurance, repeated wording, and unsupported certainty.
  - Offer one or two surprising but plausible insights by explaining the pattern behind their words, emotions, choices, relationships, goals, or worries.
  - Use psychology as reflective guidance grounded in recognizable human patterns. Never invent statistics, clinical diagnoses, studies, or scientific evidence.
  - Use astrology, tarot, coffee symbols, dreams, or spiritual language as symbolic frameworks and timing reflections, not scientific proof or guaranteed fate.
  - Separate what the user stated from what you interpret, and phrase uncertainty honestly and gently.
  - Be emotionally resonant, clear, practical, and empowering. Give concrete next steps or reflection prompts suited to this individual.
  - Never exploit heartbreak, fear, dependency, grief, or financial anxiety. Do not claim the universe objectively sent a message; make it feel personally meaningful through specificity and care.
`;

const createPrompt = (type: ModuleType, data: AppFormData): string => {
  const lang = data.language || 'en';
  const languageUi = getReadingLanguageUi(lang);
  
  const getRole = () => {
      switch(lang) {
          case 'hi': return 'You are a Vedic Astrologer and ancient Sage (Rishi). Use metaphors from Hindu mythology and Vedic astrology.';
          case 'ar': return 'You are a mystical Sufi mystic and stargazer. Use poetic, deep, and wise Arabic terminology.';
          case 'fr': return 'You are a Parisian esoteric medium. Be sophisticated, poetic, and emotionally deep.';
          case 'pt-BR': return 'You are an intuitive mystic with the warmth of Brazilian spirituality. Be emotional, supportive, and mystical.';
          case 'pt-PT': return 'You are an ancient European oracle. Be formal, mysterious, and profound.';
          case 'fa': return 'You are an ancient Persian mystic (Aref). Use metaphors from Hafez and Rumi.';
          case 'de': return 'You are a wise and profound German philosopher-mystic, inspired by the likes of Goethe and Jung. Be deep, precise, and poetic.';
          default: return 'You are an ancient Cosmic Oracle. Be mysterious, empowering, and wise.';
      }
  };

  const getLangInstruction = () => {
     return getStrictLanguageInstruction(lang);
  };
  
  let baseInfo = `
    Seeker Info:
    Name: ${data.name || 'Unknown'}
    Birth Date: ${data.birthDate || 'Unknown'}
    ${data.gender ? `Gender: ${data.gender}` : ''}
    ${data.job ? `Job: ${data.job}` : ''}
    ${data.birthTime ? `Birth Time: ${data.birthTime}` : ''}
    ${data.birthPlace ? `Birth Place: ${data.birthPlace}` : ''}
    ${data.location ? `Current Residence: ${data.location}` : ''}
  `;

  if (data.motherName) {
      baseInfo += `User's Mother's Name: ${data.motherName}\n`;
  }

  if (data.partnerName) {
    baseInfo += `
    Partner Info:
    Name: ${data.partnerName}
    Birth Date: ${data.partnerBirthDate}
    ${data.partnerGender ? `Partner Gender: ${data.partnerGender}` : ''}
    `;
  }

  let specificInstruction = '';
  let specificData = '';

  switch (type) {
    case ModuleType.LOVE:
      specificData = `Relationship Status: ${humanizeFormValue(data.relationshipStatus)}, Feelings: ${humanizeFormValue(data.feelingsTowardsPartner)}, Question: ${data.bigQuestion}`;
      specificInstruction = `
      Task:
      1. Analyze the synastry and emotional bond.
      2. Reveal the partner's true feelings.
      3. Answer the main question with compassion and reality.
      4. Provide a 3-month timeline forecast.
      `;
      break;

    case ModuleType.CAFE:
      specificData = `Current Emotion: ${humanizeFormValue(data.currentEmotion)}, Focus Areas: ${humanizeFormList(data.lifeArea)}, Question: ${data.bigQuestion}, Open to Advice: ${humanizeFormValue(data.openAdvice)}`;
      specificInstruction = `
      Task:
      You are giving a professional coffee cup reading that feels emotionally real, personal, and memorable.
      Do not make it generic. Use the user's current emotion, selected focus areas, question, birth data, and life context.

      1. Visualize a coffee cup reading and describe meaningful symbols in the "bottom", "sides", and "rim" of the cup.
      2. Connect each symbol directly to the selected focus areas: ${humanizeFormList(data.lifeArea) || 'general life'}.
      3. Explain what the user's current emotion (${humanizeFormValue(data.currentEmotion) || 'unknown'}) may be trying to reveal, not just what may happen.
      4. Answer the user's question (${data.bigQuestion}) with warmth, emotional intelligence, and practical direction.
      5. Make the reading touch the heart: name the hidden fear, the quiet hope, and the pattern they may be repeating.
      6. Give realistic hope and motivation without over-promising. The user should feel seen, thoughtful, and gently awakened.
      7. Include 3 short timing windows or signs to watch for, based on coffee symbols and life-pattern analysis.
      8. End with a grounding message and one small action they can take this week.

      Tone:
      Warm, intimate, wise, grounded, reflective, and hopeful. Like a gifted coffee reader who also understands psychology and real life.
      `;
      break;

    case ModuleType.WEALTH:
      specificData = `Financial Wish: ${data.financialWish}, Blockage: ${data.financialBlockage}, Desired Energy: ${data.desiredEnergy}`;
      specificInstruction = `
      Task:
      1. Analyze the energetic/karmic root of the financial blockage.
      2. Predict wealth potential based on astrological indicators (birth date).
      3. Give 3 metaphysical remedies (crystals, mantras, actions) to attract ${data.financialWish}.
      `;
      break;

    case ModuleType.DREAM:
      specificData = `Description: ${data.dreamDescription}, Emotion: ${data.dreamEmotion}, Date: ${data.dreamDate}, Recurring: ${data.isRecurringDream}, Style: ${data.interpretationStyle}`;
      if (data.isPremium) {
          specificInstruction = `
          Task (Advanced Interpretation):
          1. Extract key symbols and explain their deep archetypal meaning.
          2. Decode the subconscious message or warning.
          3. Address the recurring nature if applicable.
          4. Provide a spiritual action plan based on the user's emotion.
          `;
      } else {
          specificInstruction = `
          Task (Summary):
          1. Provide a short, core interpretation of the dream.
          2. Max 3 lines.
          3. Focus on the main message only.
          `;
      }
      break;

    case ModuleType.DAILY:
      specificData = `Worry: ${data.todaysWorry}, Desire: ${data.todaysDesire}, Current Mood: ${humanizeFormValue(data.currentEmotion)}, Thought: ${data.importantThought}`;
      specificInstruction = `
      Task:
      1. Provide a daily horoscope based on birth date and current cosmic energy.
      2. Directly reflect the user's present mood (${humanizeFormValue(data.currentEmotion) || 'not specified'}) with emotional intelligence and without generic wording.
      3. Address today's worry (${data.todaysWorry}) and desire (${data.todaysDesire}) in a realistic, encouraging way.
      4. Create a personalized Affirmation/Mantra and one small practical action for today.
      `;
      break;

    case ModuleType.RETURN_LOVE:
      specificData = `Current Residence: ${data.location || 'Not provided'}, Time Apart: ${data.timeApart}, Separation Context: ${data.breakupReason}, User's Mother's Name: ${data.motherName || 'Not provided'}, Deepest Desire: ${data.relationshipDesire}`;
      specificInstruction = `
      Task:
      1. Treat this as an ex-partner and possible reconnection reading with emotional maturity, not certainty or promises of return.
      2. Identify the likely attachment pattern, unresolved wound, quiet hope, and realistic obstacle using their specific separation story, time apart, desire, and present context.
      3. Discuss signs of a healthy reconnection versus signs that closure, distance, or stronger boundaries may protect the user's wellbeing.
      4. Weave symbolic astrology and spiritual language gently while grounding the advice in relationship psychology and observable behavior.
      5. Give an honest but compassionate directional answer, one action for the next 7 days, and one longer-term self-respecting path.
      `;
      break;

    case ModuleType.NATAL_CHART:
      specificData = `
        Requested Chart Type / Year: ${data.chartYear || 'Not specified'}
        Name to use in reading: ${data.name}
        Birth Date: ${data.birthDate}
        Birth Time: ${data.birthTime || 'Not provided / optional'}
        Birth City & Country: ${data.birthPlace}
        Current Emotional State / Life Phase: ${data.currentEmotion || 'Unknown'}
        Main Analysis Focus: ${data.natalFocus || 'Balanced life analysis'}
        Relationship Status: ${data.relationshipStatus || 'Unknown'}
        Repeating Relationship Pattern: ${data.lovePattern || 'Not provided'}
        Still Thinking About Someone?: ${data.stillThinkingOfSomeone || 'Not provided'}
        Desired Love Outcome in Selected Year: ${data.loveGoal || 'Not provided'}
        Current Job / Career Path: ${data.job || 'Unknown'}
        Career Satisfaction: ${data.careerSatisfaction || 'Unknown'}
        Biggest Goal for Selected Year: ${data.biggestYearGoal || 'Not provided'}
        Main Progress Blocker: ${data.progressBlocker || 'Not provided'}
        One Thing They Want to Change in Life: ${data.oneLifeChange || 'Not provided'}
        Professional Extras Requested: ${data.professionalExtras || 'Not provided'}
      `;
      
      specificInstruction = `
      You are not a fortune teller. You are a deep psychological astrologer and life-pattern analyst.

      Your job is to create a highly personalized "natal-based yearly life analysis" for the user based on:
      - Birth data (date, time, place)
      - Emotional state
      - Relationship patterns
      - Career situation
      - Inner fears, desires, and current life phase

      The output must feel:
      - Deeply personal, like it was written only for this person
      - Emotionally intelligent
      - Insightful and reflective
      - Motivating but not fake-positive
      - Realistic, not generic

      IMPORTANT RULES:
      1. Never write generic astrology phrases.
      2. Refer to the user's answers and reflect them back intelligently.
      3. Identify patterns in their life, especially in love and career.
      4. Explain WHY certain events or changes may happen.
      5. Give a sense of direction, not just prediction.
      6. Use soft but confident language, not absolute claims.
      7. Create emotional resonance. The user should feel: "this is about me."
      8. Do not over-promise. Do not use vague, repetitive, or mystical-nonsense statements.
      9. If birth time is missing, mention that timing and houses are less precise, but still give a useful life-pattern reading.

      Selected year logic:
      - If chart type is "2026", focus from January 2026 through December 2026.
      - If chart type is "2027", focus from January 2027 through December 2027.
      - If chart type is "2026_2027", create a deeper combined analysis that covers both years and explains the transition between them.
      - If Professional Extras Requested is "yes", include month-by-month insights, deeper relationship analysis, and golden decision windows.
      - If Professional Extras Requested is "no", use phase-based insights instead of a full monthly section.

      STRUCTURE:
      Use this exact structure, but translate every heading and visible label into ${languageUi.name}.
      # Personal Natal-Based Yearly Life Analysis for ${data.name}

      ## 1. Opening: What This Year Is Asking From You
      Write an emotionally intelligent opening that reflects their current life phase and the one thing they want to change.

      ## 2. Personality & Life Pattern Analysis
      Blend birth data, symbolic astrology, psychology, temperament, emotional defenses, repeating patterns, strengths, and blind spots.

      ## 3. Love & Relationships
      Be deep and specific. Use relationship status, repeating relationship pattern, whether they still think about someone, and what they want in love.
      Explain the emotional pattern underneath the pattern, not only what may happen.

      ## 4. Career & Financial Direction
      Use their current job, career satisfaction, biggest goal, and progress blocker.
      Explain what kind of growth path makes sense and what kind of decisions may help.

      ## 5. Key Turning Points in the Selected Year
      Give meaningful turning points for the selected year or both years.
      For each turning point, explain why it matters emotionally and practically.

      ## 6. Monthly or Phase-Based Insights
      If professional extras are requested, provide month-by-month insights for the selected year(s).
      If not requested, provide 4-5 major phases instead.

      ## 7. Warnings & Growth Lessons
      Include gentle but clear warnings about self-sabotage, avoidance, unhealthy attachment, career hesitation, or repeating the past, based on their answers.

      ## 8. Closing Message
      End with a hopeful, empowering, meaningful message. It should feel human, warm, slightly poetic, but clear.

      Tone:
      Human, warm, slightly poetic but clear. A mix of psychology + astrology + life coaching + storytelling.
      The final result should feel like a deep personal reading, not a generic horoscope.
      `;
      break;

    case ModuleType.PAST_LIFE:
      specificData = `
        Current Location: ${data.location}
        Birth Place: ${data.birthPlace}
        Gender: ${data.gender}
        Predominant Emotion: ${data.currentEmotion}
        Recurring Dream: ${data.recurringDream}
        Personal Symbol: ${data.personalSymbol}
      `;
      specificInstruction = `
      Task:
      1. Based on the provided image (if available) and the user's energy inputs (Emotion: ${data.currentEmotion}, Symbol: ${data.personalSymbol}, Dream: ${data.recurringDream}), identify a specific historical era and geographical location where this soul lived.
      2. If an image is provided, incorporating the facial features is CRITICAL. Explicitly analyze the eyes, jaw, and expression in the story. Mention how their eyes today hold the same gaze as they did in the past.
      3. Narrate a **vivid, rich, and detailed** story (approx 150-200 words). Use sensory details (smell of the air, texture of clothes, sounds of the environment).
      4. Explain the karma carried over and the meaning of the symbol "${data.personalSymbol}".
      `;
      break;

    default:
      specificInstruction = 'Provide wise, mystical guidance.';
  }

  return `
    ${getRole()}
    ${getLangInstruction()}
    ${getGroundedPersonalizationStandard()}
    
    Inputs:
    ${baseInfo}
    ${specificData}

    Output Rules:
    - Use Markdown formatting.
    - Tone: Mystical, Empathetic, Profound.
    - NEVER say "I am an AI". Stay in character.
    - ALWAYS Include a localized **"${languageUi.chronography}"** section at the end of the reading. This must be a list of helpful actions to take and actions to avoid based on the user's situation, astrology, psychology, and location.
    
    ${specificInstruction}

    IMPORTANT:
    After the main reading and chronography, you MUST generate a separate, hidden block of content for an email.
    Wrap this block EXACTLY with these delimiters: ---EMAIL_START--- and ---EMAIL_END---
    Inside the delimiters, provide HTML code for an email summary.
    The email HTML must:
    1. Be dark themed (background #050214, text white).
    2. Have a mystical, hopeful tone.
    3. Include a short summary of the reading or a motivational quote.
    4. Include a Call-To-Action button "${languageUi.cta}" linking to "https://interastral.vision".
    5. Be fully self-contained HTML.
  `;
};

const generateReading = async (type: ModuleType, data: AppFormData): Promise<{ text: string, images?: string[] }> => {
  // --- 1. TAROT (JSON MODE) ---
  if (type === ModuleType.TAROT) {
    const lang = data.language || 'en';
    const languageUi = getReadingLanguageUi(lang);
    const focusAreas = humanizeFormList(data.tarotFocus);
    const currentEmotion = humanizeFormValue(data.currentEmotion);
    const prompt = `
      You are a master Tarot Reader, symbolic psychologist, and grounded life-pattern analyst.
      ${getStrictLanguageInstruction(lang)}
      ${getGroundedPersonalizationStandard()}
      User Intent / Situation: ${data.situationSummary || languageUi.guidance}
      Selected Focus Aspects: ${focusAreas || languageUi.guidance}
      Current Emotional State: ${currentEmotion || 'Not specified'}
      Birth Date: ${data.birthDate || 'Unknown'}
      
      Draw 3 specific cards (Past/Situation, Present/Action, Future/Outcome), but do not give a generic card meaning.
      The reading must feel:
      - Deeply personal and emotionally intelligent.
      - Connected to the user's selected focus aspects, especially when they selected multiple areas.
      - Grounded, realistic, and hopeful without over-promising.
      - Like it touches the heart, makes the user think, and gives them motivation.

      For each card interpretation:
      1. Explain what this card says about the user's current emotional state (${currentEmotion || 'unknown'}).
      2. Connect it directly to the selected focus aspects: ${focusAreas || 'general guidance'}.
      3. Name one hidden fear, quiet desire, or repeating pattern that may be underneath the situation.
      4. Give one practical reflection or action that feels doable.

      In the summary:
      - Synthesize all 3 cards into a clear emotional story.
      - Answer what the user most needs to understand now.
      - Include realistic hope and a sense of direction.

      In mysticalGuidance:
      - Write a warm, memorable message, not a vague quote.

      In chronography:
      - Include signs to watch for, actions to take, actions to avoid, and a short timing/roadmap section.

      Provide JSON strictly matching schema.
      All JSON fields shown to the user must be written in ${languageUi.name}: summary, nameLocal, interpretation, mysticalGuidance, chronography, and emailContent.
      The nameEnglish field is only for internal card mapping and may remain English, but do not display it to non-English users.
      Include the localized ${languageUi.chronography} and Email Content in the JSON fields.
    `;

    try {
      const response = await (await getAi()).models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: tarotSchema
        }
      });

      const result = JSON.parse(response.text || '{}');
      const cards = result.cards || [];
      const imageUrls: string[] = [];
      
      let markdownOutput = `# 🔮 ${languageUi.tarotTitle}${data.name ? ` - ${data.name}` : ''}\n\n`;

      if (result.summary) {
        markdownOutput += `_${result.summary}_\n\n---\n\n`;
      }

      cards.forEach((card: any, index: number) => {
        const img = getTarotImage(card.suit, card.number);
        imageUrls.push(img);
        
        const visibleCardName = lang === 'en' && card.nameEnglish ? `${card.nameLocal || card.nameEnglish} (${card.nameEnglish})` : (card.nameLocal || card.nameEnglish);
        markdownOutput += `### ${languageUi.card} ${index + 1}: **${visibleCardName}**\n\n`;
        markdownOutput += `> ${card.interpretation}\n\n`;
      });

      if (result.mysticalGuidance) {
        markdownOutput += `\n---\n\n### 🗝️ ${languageUi.guidance}\n\n${result.mysticalGuidance}\n`;
      }

      if (result.chronography) {
        markdownOutput += `\n---\n\n### ⏳ ${languageUi.chronography}\n\n${result.chronography}\n`;
      }

      // Append Email Content hidden block for consistency with other modules
      if (result.emailContent) {
        markdownOutput += `\n\n---EMAIL_START---\n${result.emailContent}\n---EMAIL_END---`;
      }

      return {
        text: markdownOutput,
        images: imageUrls
      };

    } catch (e) {
      console.error("Tarot generation failed", e);
      return { text: languageUi.silentMoment };
    }
  }

  // --- 2. PAST LIFE (Story + Facial Analysis + Image Generation) ---
  if (type === ModuleType.PAST_LIFE) {
    let storyText = "";
    // Default prompt just in case image analysis fails completely
    let imageGenPrompt = `A mysterious historical portrait of a soul from a past era, holding a ${data.personalSymbol || 'symbol'}, photorealistic, cinematic lighting, 8k.`; 

    try {
        let analysisResponse;

        // Step 1: Text & Analysis (Multimodal)
        // We use gemini-2.5-flash for the analysis as it is good at multimodal tasks.
        if (data.userImage && data.userImage.includes('base64,')) {
            try {
                // Correctly extract base64 data and mimeType
                const parts = data.userImage.split(';');
                if (parts.length > 1) {
                    const mimeType = parts[0].split(':')[1];
                    const base64Data = parts[1].split(',')[1];
                    
                    if (mimeType && base64Data) {
                        const languageUi = getReadingLanguageUi(data.language);
                        const textSystemConfig = `
                          You are a master Akashic Record Reader and Visual Artist.
                          ${getStrictLanguageInstruction(data.language)}

                          **Phase 1: Deep Facial Analysis**
                          Analyze the uploaded face with extreme precision. Note the specific shape of the eyes, the curve of the lips, the nose structure, the jawline, and the unique gaze. These are the "Soul Signatures" that must persist across lifetimes.

                          **Phase 2: The Past Life Narrative**
                          Identify a specific historical era and location (e.g., Ancient Sumeria, 1920s Paris, Ming Dynasty China) that matches the user's energy and "Personal Symbol" (${data.personalSymbol}).
                          Write a **vivid, rich, and immersive story** (approx. 200 words) in ${languageUi.name}. 
                          - Use sensory details (scents, sounds, textures).
                          - *Crucially*: Connect their current physical features to this past life (e.g., "That same determined jawline you have today was once set against the desert winds...").
                          - Explain the karmic lesson.

                          **Phase 3: The Image Prompt Generation**
                          Create a special tag [IMAGE_PROMPT] followed by a HIGHLY DETAILED English prompt for an image generator.
                          The goal is to recreate the USER'S FACE exactly, but styled in that historical era.
                          
                          Structure of [IMAGE_PROMPT]:
                          "A hyper-realistic, cinematic portrait of [Gender] from [Era/Location]. [DETAILED FACIAL DESCRIPTION FROM UPLOADED IMAGE - mention specific eye shape, nose, lips, skin tone, hair texture]. Wearing authentic [Era] clothing [Describe details]. Holding a ${data.personalSymbol}. Atmospheric lighting, 8k resolution, highly detailed texture, looking directly at viewer."

                          **Output Format:**
                          [Write the Story Here in ${languageUi.name}]
                          
                          [IMAGE_PROMPT] ... (The English prompt)
                        `;

                        analysisResponse = await (await getAi()).models.generateContent({
                            model: 'gemini-2.5-flash',
                            contents: {
                                parts: [
                                    { inlineData: { mimeType: mimeType, data: base64Data } },
                                    { text: createPrompt(type, data) + "\n\n" + textSystemConfig }
                                ]
                            }
                        });
                    } else {
                       throw new Error("Invalid base64 structure");
                    }
                } else {
                    throw new Error("Invalid image format string");
                }
            } catch (imgError) {
                console.warn("Image analysis failed, falling back to text-only generation", imgError);
                // Fallback: Generate story without image analysis if image parsing fails
                analysisResponse = await (await getAi()).models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: createPrompt(type, data) + "\n\nProvide [IMAGE_PROMPT] A historical portrait based on the user's energy."
                });
            }
        } else {
            // No image provided
             analysisResponse = await (await getAi()).models.generateContent({
                model: 'gemini-2.5-flash',
                contents: createPrompt(type, data) + "\n\nProvide [IMAGE_PROMPT] A historical portrait based on the user's energy."
            });
        }
        
        const fullResponse = analysisResponse.text || "The Akashic Records are cloudy...";
        
        // Parse the response to separate story and image prompt
        storyText = fullResponse;
        const promptMatch = fullResponse.match(/\[IMAGE_PROMPT\]([\s\S]*)/);
        if (promptMatch && promptMatch[1]) {
            imageGenPrompt = promptMatch[1].trim();
            // Remove the prompt tag and the prompt itself from the user-facing text
            storyText = fullResponse.replace(/\[IMAGE_PROMPT\][\s\S]*/, '').replace('[READING]', '').trim();
        }

        // Step 2: Image Generation using gemini-2.5-flash-image (Nano Banana)
        let generatedImage = null;
        try {
            const imageResponse = await (await getAi()).models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: imageGenPrompt }],
                },
                config: {
                    imageConfig: {
                       aspectRatio: '3:4' // Standard portrait for people
                    }
                }
            });

            // Extract image from response safely
            const parts = imageResponse.candidates?.[0]?.content?.parts;
            if (parts) {
                for (const part of parts) {
                    if (part.inlineData) {
                        generatedImage = `data:image/png;base64,${part.inlineData.data}`;
                        break;
                    }
                }
            }
        } catch (imgGenErr) {
            console.error("Past Life Image Gen Error:", imgGenErr);
        }

        return {
            text: storyText,
            images: generatedImage ? [generatedImage] : undefined
        };

    } catch (e) {
        console.error("Past life critical error", e);
        return { text: getReadingLanguageUi(data.language).silentMoment };
    }
  }

  // --- 3. NATAL CHART (Text + Soul Art for Premium) ---
  if (type === ModuleType.NATAL_CHART) {
    const prompt = createPrompt(type, data);
    
    // 1. Generate Text Reading
    const response = await (await getAi()).models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    const textReading = response.text || getReadingLanguageUi(data.language).silent;

    let soulArtImage = undefined;
    
    // 2. If Premium, Generate Natal Chart Diagram using gemini-2.5-flash-image
    if (data.isPremium) {
        try {
		            const imagePrompt = `
		              A highly detailed, scientific-looking astrological natal chart and yearly transit diagram for ${data.name}, born on ${data.birthDate} ${data.birthTime ? `at ${data.birthTime}` : ''} in ${data.birthPlace}. The selected analysis period is ${data.chartYear || 'the requested year'}.
	              
	              Visual Elements:
	              - A dark indigo parchment background representing the night sky.
	              - A golden complex circular zodiac wheel with 12 houses clearly defined.
	              - A subtle double-ring transit overlay suggesting the years 2026 and 2027.
	              - Detailed astrological glyphs/symbols for planets (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto) placed in specific segments.
	              - Geometric aspect lines (trines, squares, oppositions) in thin gold and silver lines connecting the center.
	              - Mathematical and mystical aesthetic, high resolution, cinematic lighting.
	              - Minimal decorative labels only; prioritize symbols, houses, and aspect lines.
	            `;

            const imageResponse = await (await getAi()).models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: imagePrompt }],
                },
                config: {
                    imageConfig: { aspectRatio: '1:1' }
                }
            });

            const parts = imageResponse.candidates?.[0]?.content?.parts;
            if (parts) {
                for (const part of parts) {
                    if (part.inlineData) {
                        soulArtImage = `data:image/png;base64,${part.inlineData.data}`;
                        break;
                    }
                }
            }
        } catch (e) {
            console.error("Natal Chart image generation failed", e);
        }
    }

    return { 
        text: textReading,
        images: soulArtImage ? [soulArtImage] : undefined
    };
  }

  // --- 4. STANDARD MODULES (Text Only) ---
  const prompt = createPrompt(type, data);
  const response = await (await getAi()).models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { thinkingConfig: { thinkingBudget: 0 } }
  });

  return { text: response.text || getReadingLanguageUi(data.language).silent };
};

// --- USER PROVIDED GEMINI LOGIC END ---

// --- ROUTES ---

// 1. GENERATE READING (SECURE BACKEND ENDPOINT)
router.post('/generate-reading', validateFirebaseIdToken, async (req: any, res: any): Promise<any> => {
    try {
        const { type, data } = req.body;
        // Use the new helper function
        const result = await generateReading(type, data);
        return res.json(result);
    } catch (error: any) {
        console.error("Generative AI Error:", error);
        return res.status(500).json({ error: "Transmission failed. The stars are realigning." });
    }
});


// 1. GET USER DATA (With IP Device Limit)
router.get('/user/:email', async (req: any, res: any): Promise<any> => {
  try {
    const { email } = req.params;
    const lang = req.query.lang as string || 'en'; // Capture language
    
    if (!email) return res.status(400).json({ error: 'Email required' });

    // --- FRAUD PROTECTION ---
    const ip = getClientIp(req);
    const sanitizedIp = ip.replace(/[\/\.]/g, '_').replace(/:/g, '-');
    const ipRef = getDb().collection('ip_tracking').doc(sanitizedIp);
    
    await getDb().runTransaction(async (t) => {
        const ipDoc = await t.get(ipRef);
        let accounts: string[] = [];
        if (ipDoc.exists) accounts = ipDoc.data()?.accounts || [];
        if (!accounts.includes(email)) {
            if (accounts.length >= 3) throw new Error("DEVICE_LIMIT_REACHED");
            t.set(ipRef, { accounts: [...accounts, email], lastAccess: new Date().toISOString() }, { merge: true });
        }
    });
    // ------------------------

    const userRef = getDb().collection('users').doc(email);
    const doc = await userRef.get();

    if (!doc.exists) {
      const name = email.split('@')[0];
      const code = generateReferralCode(email);
      const newUser = {
        email,
        name: name, 
        coins: 20, 
        history: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        referralCode: code,
        shareCount: 0,
        referralLogs: [],
        language: lang // Save language
      };
      await userRef.set(newUser);
      
      // SEND WELCOME EMAIL
      sendWelcomeEmail(email, name, code, lang).catch(err => console.error("Email trigger failed", err));

      return res.json(newUser);
    }

    const userData = doc.data();
    
    // Update language if it changed
    if (userData?.language !== lang) {
        await userRef.update({ language: lang });
    }

    // Migration
    if (!userData?.referralCode || userData?.shareCount === undefined) {
       const updates: any = {};
       if (!userData?.referralCode) updates.referralCode = generateReferralCode(email);
       if (userData?.shareCount === undefined) updates.shareCount = 0;
       await userRef.update(updates);
       return res.json({ ...userData, ...updates, language: lang });
    }

    return res.json({ ...userData, language: lang });
  } catch (error: any) {
    if (error.message === "DEVICE_LIMIT_REACHED") {
        return res.status(403).json({ error: 'Device limit reached. Max 3 accounts per device allowed.' });
    }
    console.error('Error fetching/creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. CREATE STRIPE CHECKOUT SESSION
router.post('/payment/create-checkout-session', async (req: any, res: any): Promise<any> => {
  try {
    const { planId, email, returnUrl } = req.body;
    if (!returnUrl) return res.status(400).json({ error: 'Return URL is required' });
    // @ts-ignore
    const packageInfo = COIN_PACKAGES[planId];
    if (!packageInfo) return res.status(400).json({ error: 'Invalid plan ID' });
    const session = await (await getStripe()).checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'eur', product_data: { name: `${packageInfo.coins} Stardust`, description: `Interastral Package: ${planId.toUpperCase()}`, }, unit_amount: packageInfo.price, }, quantity: 1, },],
      mode: 'payment',
      success_url: `${returnUrl}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?payment=cancel`,
      metadata: { email: email, coinsToAdd: packageInfo.coins.toString() }
    });
    return res.json({ url: session.url });
  } catch (error: any) { console.error('Stripe Checkout error:', error); return res.status(500).json({ error: 'Payment initialization failed' }); }
});

// 3. MANUAL VERIFICATION ENDPOINT
router.post('/payment/verify', async (req: any, res: any): Promise<any> => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'Session ID required' });
    const processedRef = getDb().collection('processed_payments').doc(sessionId);
    const processedDoc = await processedRef.get();
    if (processedDoc.exists) return res.status(200).json({ success: true, message: 'Already processed' });
    const session = await (await getStripe()).checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return res.status(400).json({ error: 'Payment not paid' });
    // @ts-ignore
    const { email, coinsToAdd } = session.metadata || {};
    if (!email || !coinsToAdd) return res.status(400).json({ error: 'Invalid session metadata' });
    const coins = parseInt(coinsToAdd);
    const userRef = getDb().collection('users').doc(email);
    await getDb().runTransaction(async (t) => {
      t.set(processedRef, { email, amount: session.amount_total, coins, processedAt: new Date().toISOString() });
      t.set(userRef, { email: email, coins: admin.firestore.FieldValue.increment(coins), lastPaymentDate: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    });
    return res.json({ success: true, coinsAdded: coins, email: email });
  } catch (error: any) { console.error('Verification Error:', error); return res.status(500).json({ error: error.message || 'Verification failed' }); }
});

// 4. STRIPE WEBHOOK
router.post('/payment/webhook', express.raw({ type: 'application/json' }) as any, async (req: any, res: any): Promise<any> => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;
  const webhookBody = req.rawBody || req.body;
  try { event = (await getStripe()).webhooks.constructEvent(webhookBody, sig, process.env.STRIPE_WEBHOOK_SECRET as string); } catch (err: any) { return res.status(400).send(`Webhook Error: ${err.message}`); }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // @ts-ignore
    const { email, coinsToAdd } = session.metadata || {};
    const sessionId = session.id;
    const processedRef = getDb().collection('processed_payments').doc(sessionId);
    const doc = await processedRef.get();
    if (doc.exists) return res.json({ received: true, message: 'Already processed via API' });
    if (email && coinsToAdd) {
      const coins = parseInt(coinsToAdd);
      const userRef = getDb().collection('users').doc(email);
      await getDb().runTransaction(async (t) => {
        t.set(processedRef, { email, method: 'webhook', processedAt: new Date().toISOString() });
        t.set(userRef, { coins: admin.firestore.FieldValue.increment(coins), lastPaymentDate: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
      });
    }
  }
  return res.json({ received: true });
});

// 5. SAVE READING & DEDUCT COINS
router.post('/readings/save', async (req: any, res: any): Promise<any> => {
  try {
    const { email, readingData, moduleType } = req.body;
    
    if (!email || !readingData || !moduleType) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const isPending = readingData.status === 'pending_payment';
    const cost = READING_COSTS[moduleType];
    const userLang = readingData.savedFormData?.language || 'en';

    if (cost === undefined) return res.status(400).json({ error: 'Invalid module type' });

    // --- HANDLE BASE64 IMAGE UPLOAD TO STORAGE ---
    if (readingData.images && Array.isArray(readingData.images)) {
        const processedImages: string[] = [];
        ensureAdmin();
        const bucket = admin.storage().bucket();
        for (const imgStr of readingData.images) {
            if (typeof imgStr === 'string' && imgStr.startsWith('data:image')) {
                try {
                    const matches = imgStr.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
                    if (matches) {
                        const ext = matches[1];
                        const base64Data = matches[2];
                        const buffer = Buffer.from(base64Data, 'base64');
                        const filename = `readings/${email.replace(/[^a-zA-Z0-9]/g, '_')}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
                        const file = bucket.file(filename);
                        await file.save(buffer, { metadata: { contentType: `image/${ext}` }, public: true });
                        const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2099' });
                        processedImages.push(url);
                    }
                } catch (imgErr) { console.error("Failed to upload image to storage:", imgErr); }
            } else { processedImages.push(imgStr); }
        }
        readingData.images = processedImages;
    }
    // ---------------------------------------------

    const userRef = getDb().collection('users').doc(email);

    await getDb().runTransaction(async (t) => {
      const doc = await t.get(userRef);
      if (!doc.exists) throw new Error("User not found");

      const userData = doc.data();
      const currentCoins = userData?.coins || 0;

      if (isPending) {
          t.update(userRef, {
            history: admin.firestore.FieldValue.arrayUnion({ ...readingData, savedAt: new Date().toISOString() }),
            language: userLang // Update lang preference
          });
      } else {
          if (currentCoins < cost) throw new Error("Insufficient Stardust");
          t.update(userRef, {
            coins: currentCoins - cost,
            history: admin.firestore.FieldValue.arrayUnion({ ...readingData, savedAt: new Date().toISOString() }),
            language: userLang
          });
      }
    });

    // --- SEND EMAIL ---
    sendReadingEmail(email, readingData, userLang, isPending ? 'pending' : 'completed').catch(console.error);

    return res.json({ success: true, message: isPending ? 'Draft saved' : 'Reading saved and coins deducted' });

  } catch (error: any) {
    console.error('Save error:', error);
    if (error.message === "Insufficient Stardust") {
      return res.status(403).json({ error: 'Not enough coins' });
    }
    return res.status(500).json({ error: 'Failed to save reading' });
  }
});

// 5.5 DELETE READING
router.post('/readings/delete', async (req: any, res: any): Promise<any> => {
    try {
        const { email, readingId } = req.body;
        if (!email || !readingId) return res.status(400).json({ error: 'Missing data' });
        const userRef = getDb().collection('users').doc(email);
        await getDb().runTransaction(async (t) => {
            const doc = await t.get(userRef);
            if (!doc.exists) throw new Error("User not found");
            const history = doc.data()?.history || [];
            const newHistory = history.filter((item: any) => item.id !== readingId);
            t.update(userRef, { history: newHistory });
        });
        return res.json({ success: true, message: 'Deleted' });
    } catch (e) { console.error("Delete error", e); return res.status(500).json({ error: 'Failed to delete' }); }
});

// 6. REDEEM REFERRAL CODE
router.post('/user/redeem', async (req: any, res: any): Promise<any> => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'Email and Code required' });

    // --- DEVICE CHECK ---
    const ip = getClientIp(req);
    const sanitizedIp = ip.replace(/[\/\.]/g, '_').replace(/:/g, '-');
    const ipRef = getDb().collection('ip_tracking').doc(sanitizedIp);
    const ipDoc = await ipRef.get();
    const currentRedemptions = ipDoc.exists ? (ipDoc.data()?.redeemCount || 0) : 0;
    if (currentRedemptions >= 2) return res.status(403).json({ error: 'Device limit reached for redemptions.' });
    // -------------------

    const redeemerRef = getDb().collection('users').doc(email);
    const redeemerDoc = await redeemerRef.get();
    if (!redeemerDoc.exists) return res.status(404).json({ error: 'User not found' });
    if (redeemerDoc.data()?.redeemedReferral) return res.status(400).json({ error: 'Already redeemed' });

    const referrersSnapshot = await getDb().collection('users').where('referralCode', '==', code).limit(1).get();
    
    if (!referrersSnapshot.empty) {
        const referrerDoc = referrersSnapshot.docs[0];
        if (referrerDoc.id === email) return res.status(400).json({ error: 'Cannot redeem your own code' });

        const referrerRef = referrerDoc.ref;
        const referrerData = referrerDoc.data();
        const referrerLang = referrerData.language || 'en'; // Get referrer's language

        await getDb().runTransaction(async (t) => {
            t.update(referrerRef, {
                coins: admin.firestore.FieldValue.increment(10),
                referralLogs: admin.firestore.FieldValue.arrayUnion({ date: new Date().toISOString(), coins: 10, message: 'Friend joined via code' })
            });
            t.update(redeemerRef, { coins: admin.firestore.FieldValue.increment(10), redeemedReferral: true });
            t.set(ipRef, { redeemCount: admin.firestore.FieldValue.increment(1), lastRedeem: new Date().toISOString() }, { merge: true });
        });
        
        // Notify Referrer (User A)
        sendReferralEmail(referrerDoc.id, referrerLang).catch(console.error);
        
        return res.json({ success: true, coinsAdded: 10, message: 'Code accepted! Both you and your friend got 10 coins.' });

    } else if (code === 'COSMOS2025') {
        await getDb().runTransaction(async (t) => {
            t.update(redeemerRef, { coins: admin.firestore.FieldValue.increment(50), redeemedReferral: true });
            t.set(ipRef, { redeemCount: admin.firestore.FieldValue.increment(1), lastRedeem: new Date().toISOString() }, { merge: true });
        });
        return res.json({ success: true, coinsAdded: 50, message: 'Global code accepted!' });
    } else {
        return res.status(400).json({ error: 'Invalid code' });
    }
  } catch (e) { console.error("Redeem error", e); return res.status(500).json({ error: 'Redemption failed' }); }
});

// 7. TRACK SHARE
router.post('/user/share', async (req: any, res: any): Promise<any> => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const userRef = getDb().collection('users').doc(email);
    let bonusAwarded = false;
    await getDb().runTransaction(async (t) => {
        const doc = await t.get(userRef);
        if (!doc.exists) throw new Error("User not found");
        const data = doc.data();
        const currentShares = (data?.shareCount || 0) + 1;
        const updates: any = { shareCount: currentShares };
        if (currentShares % 5 === 0) {
            updates.coins = admin.firestore.FieldValue.increment(10);
            bonusAwarded = true;
        }
        t.update(userRef, updates);
    });
    return res.json({ success: true, bonusAwarded });
  } catch (error) { console.error('Share tracking error:', error); return res.status(500).json({ error: 'Failed to track share' }); }
});

app.use('/api', router);
app.use('/', router);

export const api = onRequest({ cors: true, secrets: [stripeSecretKey, stripeWebhookSecret] }, app as any);
export const expressApp = app;
