

export type LanguageCode = 'en' | 'fa' | 'fr' | 'pt-PT' | 'pt-BR' | 'ar' | 'hi' | 'de';

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

export interface ReferralLog {
  date: string;
  coins: number;
  message: string;
}

export interface User {
  email: string;
  name: string;
  isPremium: boolean;
  coins: number;
  lastShareDate?: string;
  history: ReadingResult[];
  language?: LanguageCode;
  profileImage?: string;
  redeemedReferral?: boolean;
  referralCode?: string;
  shareCount?: number;
  referralLogs?: ReferralLog[];
}

export interface AppFormData {
  // System
  language: LanguageCode;
  
  // General
  name: string;
  email: string;
  gender?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  location?: string;
  job?: string;
  
  isPremium?: boolean;

  // Partner Info
  partnerName?: string;
  partnerBirthDate?: string;
  partnerGender?: string;
  partnerJob?: string;

  // Specific Fields
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
  
  pastLifeEra?: string;
  personalSymbol?: string;
  recurringDream?: string;
  
  userImage?: string; // Base64 for Past Life

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

export interface ReadingResult {
  id: string;
  date: string;
  type: ModuleType;
  title: string;
  content: string;
  images?: string[];
  status?: 'completed' | 'pending_payment';
  savedFormData?: AppFormData;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  coins: number;
  isRecommended?: boolean;
  isSpecial?: boolean; // New: For starter packs (Marketing)
}

// SEO & Content Marketing
export interface BlogPost {
    id: string;
    slug: string;
    image: string;
    date: string;
    tags: string[];
    title: Record<LanguageCode, string>;
    excerpt: Record<LanguageCode, string>;
    content: Record<LanguageCode, string>; // Markdown supported
}

export interface FAQItem {
    question: Record<LanguageCode, string>;
    answer: Record<LanguageCode, string>;
}

export type FieldType = 'text' | 'date' | 'time' | 'select' | 'textarea' | 'file' | 'email' | 'checkbox';

export interface FormField {
  name: keyof AppFormData;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export interface ModuleConfig {
  type: ModuleType;
  title: string;
  description: string;
  image: string;
  icon: string;
  isPremium: boolean;
  theme: {
    backgroundImage: string;
    primaryColor: string;
    accentColor: string;
    glassColor: string;
    textColor: string;
  };
  fields: FormField[];
}
