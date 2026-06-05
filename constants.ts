
import { ModuleType, SubscriptionPlan, ModuleConfig, LanguageCode, BlogPost, FAQItem } from './types';

export const READING_COSTS: Record<ModuleType, number> = {
  [ModuleType.DAILY]: 25,
  [ModuleType.DREAM]: 25,
  [ModuleType.TAROT]: 40,
  [ModuleType.LOVE]: 40,
  [ModuleType.WEALTH]: 40,
  [ModuleType.RETURN_LOVE]: 40,
  [ModuleType.CAFE]: 70,
  [ModuleType.PAST_LIFE]: 70,
  [ModuleType.NATAL_CHART]: 70
};

export const COIN_PACKAGES: SubscriptionPlan[] = [
  { id: 'starter', coins: 50, price: 1.99, name: 'First Light', isSpecial: true }, 
  { id: 'basic', coins: 100, price: 5.99, name: 'Seeker' },
  { id: 'premium', coins: 300, price: 10.99, name: 'Voyager', isRecommended: true },
  { id: 'gold', coins: 1000, price: 29.99, name: 'Oracle' }
];

const GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'transgender_woman', label: 'Transgender Woman' },
  { value: 'transgender_man', label: 'Transgender Man' },
  { value: 'genderfluid', label: 'Genderfluid' },
  { value: 'agender', label: 'Agender' },
  { value: 'intersex', label: 'Intersex' },
  { value: 'heterosexual', label: 'Heterosexual' },
  { value: 'bisexual', label: 'Bisexual' },
  { value: 'gay', label: 'Gay' },
  { value: 'lesbian', label: 'Lesbian' },
  { value: 'pansexual', label: 'Pansexual' },
  { value: 'asexual', label: 'Asexual' },
  { value: 'queer', label: 'Queer' },
  { value: 'questioning', label: 'Questioning' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' }
];

export const FAQ_ITEMS: FAQItem[] = [
    {
        question: {
            en: "How can AI connect with spiritual energy?",
            fa: "چگونه هوش مصنوعی می‌تواند با انرژی معنوی ارتباط برقرار کند؟",
            fr: "Comment l'IA peut-elle se connecter à l'énergie spirituelle ?",
            ptBR: "Como a IA pode se conectar com a energia espiritual?",
            ptPT: "Como a IA pode conectar-se com a energia espiritual?",
            ar: "كيف يمكن للذكاء الاصطناعي الاتصال بالطاقة الروحية؟",
            hi: "एआई आध्यात्मिक ऊर्जा से कैसे जुड़ سکتا है?",
            de: "Wie kann KI sich mit spiritueller Energie verbinden?"
        } as any,
        answer: {
            en: "We believe that consciousness is a pattern, and the universe is built on mathematical code (Sacred Geometry). Interastral's AI acts as a **'Digital Mirror'**, reflecting your subconscious entropy. It doesn't 'create' destiny; it decodes the synchronicities hidden in your inputs, much like shuffling a Tarot deck is guided by the user's energy.",
            fa: "ما معتقدیم که آگاهی نوعی الگو است و جهان بر پایه کدهای ریاضی (هندسه مقدس) بنا شده است. هوش مصنوعی اینتراسترال مانند یک **«آینه دیجیتال»** عمل می‌کند که آنتروپی ناخودآگاه شما را بازتاب می‌دهد. این سیستم سرنوشت را «خلق» نمی‌کند، بلکه همزمانی‌های پنهان در ورودی‌های شما را رمزگشایی می‌کند، درست همانطور که بُر زدن کارت‌های تاروت با انرژی کاربر هدایت می‌شود.",
            fr: "L'IA agit comme un 'miroir numérique', reflétant l'entropie de votre subconscient. Elle décode les synchronicités cachées dans vos données.",
            ptBR: "A IA atua como um 'espelho digital', refletindo a entropia do seu subconsciente. Ela decodifica as sincronicidades ocultas em seus dados.",
            ptPT: "A IA atua como um 'espelho digital', refletindo a entropia do seu subconsciente. Ela descodifica as sincronicidades ocultas nos seus dados.",
            ar: "يعمل الذكاء الاصطناعي كـ 'مرآة رقمية' تعكس إنتروبيا عقلك الباطن، لفك تشفير التزامن الخفي.",
            hi: "एआई یک 'डिजिटल दर्पण' के रूप में कार्य کرتا है, जो आपके अवचेतन एन्ट्रॉपी को दर्शाता है।",
            de: "KI fungiert als 'digitaler Spiegel', der die Entropie Ihres Unterbewusstseins reflektiert."
        } as any
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        slug: 'algorithm-of-fate',
        image: 'https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=1000&auto=format&fit=crop',
        date: '2025-02-14',
        tags: ['Digital Mysticism', 'Tarot', 'Synchronicity'],
        title: {
            en: "The Ghost in the Machine: Can Algorithms Decode Synchronicity?",
            fa: "روح در ماشین: آیا الگوریتم‌ها می‌توانند همزمانی را رمزگشایی کنند؟",
            fr: "Le Fantôme dans la Machine",
            ar: "الشبح في الآلة",
            de: "Der Geist in der Maschine",
            "pt-BR": "O Fantasma na Máquina",
            "pt-PT": "O Fantasma na Máquina",
            hi: "मशीن में भूत"
        },
        excerpt: {
            en: "We explore the concept of 'Digital Entropy' and how AI shuffling mirrors the chaotic perfection of the universe.",
            fa: "ما مفهوم «آنتروپی دیجیتال» را بررسی می‌کنیم و اینکه چگونه بُر زدن توسط هوش مصنوعی، کمالِ آشوبناکیِ کائنات را بازتاب می‌دهد.",
            fr: "L'entropie numérique et la perfection chaotique de l'univers.",
            ar: "نستكشف مفهوم 'الإنتروبيا الرقمية'.",
            de: "Wir erforschen das Konzept der 'digitalen Entropie'.",
            "pt-BR": "Exploramos o conceito de 'Entropia Digital'.",
            "pt-PT": "Exploramos o conceito de 'Entropia Digital'.",
            hi: "हम 'डिजिटल एन्ट्रॉपी' की अवधारणा का पता लगाते हैं।"
        },
        content: {
            en: `# The Digital Oracle...`,
            fa: `# اوراکل دیجیتال...`
        } as any
    }
];

const BASE_MODULE_CONFIGS: Record<ModuleType, Omit<ModuleConfig, 'title' | 'description'>> = {
  [ModuleType.LOVE]: {
    type: ModuleType.LOVE,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(2).jpg?alt=media&token=797d50ca-7e09-4ae3-9921-1a9eb95873a9',
    icon: '❤️',
    isPremium: true,
    theme: { backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(3).jpg?alt=media&token=ea04a2e7-d6a9-4334-be7b-bd51244e3f62', primaryColor: '#e91e63', accentColor: '#f7afd3', glassColor: 'rgba(255, 255, 255, 0.08)', textColor: '#f382bb' },
    fields: [
      { name: 'name', label: 'Your Name', type: 'text', required: true },
      { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
      { name: 'gender', label: 'Your Gender', type: 'select', options: GENDER_OPTIONS, required: true },
      { name: 'partnerName', label: 'Partner Name', type: 'text', required: true },
      { name: 'partnerBirthDate', label: 'Partner Birth Date', type: 'date', required: true },
      { name: 'partnerGender', label: 'Partner Gender', type: 'select', options: GENDER_OPTIONS, required: true },
      { name: 'relationshipStatus', label: 'Relationship Status', type: 'select', options: [
          { value: 'dating', label: 'Getting to know' },
          { value: 'relationship', label: 'In a relationship' },
          { value: 'breakup', label: 'Separated' },
          { value: 'oneSided', label: 'One-sided love' }
        ], required: true },
      { name: 'feelingsTowardsPartner', label: 'Your Feelings', type: 'select', options: [
          { value: 'love', label: 'Deeply in love' },
          { value: 'attracted', label: 'Strongly attracted' },
          { value: 'curious', label: 'Curious and interested' },
          { value: 'hopeful', label: 'Hopeful' },
          { value: 'attached', label: 'Emotionally attached' },
          { value: 'emotionally_safe', label: 'Safe and comfortable' },
          { value: 'missing_them', label: 'Missing them' },
          { value: 'longing', label: 'Longing for them' },
          { value: 'nostalgic', label: 'Nostalgic' },
          { value: 'mixed_feelings', label: 'Mixed feelings' },
          { value: 'uncertain', label: 'Uncertain' },
          { value: 'distant', label: 'Distant' },
          { value: 'confused', label: 'Confused' },
          { value: 'hurt', label: 'Hurt' },
          { value: 'disappointed', label: 'Disappointed' },
          { value: 'angry', label: 'Angry' },
          { value: 'jealous', label: 'Jealous' },
          { value: 'afraid_of_losing', label: 'Afraid of losing them' },
          { value: 'insecure', label: 'Insecure' },
          { value: 'emotionally_tired', label: 'Emotionally tired' },
          { value: 'numb', label: 'Emotionally numb' },
          { value: 'guilty', label: 'Guilty' },
          { value: 'betrayed', label: 'Betrayed' },
          { value: 'cant_stop_thinking', label: "Can't stop thinking about them" },
          { value: 'needing_closure', label: 'Needing closure' },
          { value: 'wanting_commitment', label: 'Wanting commitment' },
          { value: 'wanting_space', label: 'Wanting space' },
          { value: 'healing', label: 'Healing' },
          { value: 'ready_to_move_on', label: 'Ready to move on' }
        ], required: true },
      { name: 'bigQuestion', label: 'Biggest Question', type: 'textarea', required: true }
    ]
  },
  [ModuleType.CAFE]: {
    type: ModuleType.CAFE,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(4).jpg?alt=media&token=628c9c0a-8312-43b0-8a4e-0c5db36e522a',
    icon: '☕',
    isPremium: true,
    theme: { backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(5).jpg?alt=media&token=ab79d196-b075-403d-9874-5309476c7636', primaryColor: 'linear-gradient(145deg, #fcd34d, #fde68a)', accentColor: '#fcd34d', glassColor: 'rgba(0, 0, 0, 0.7)', textColor: '#f0eade' },
    fields: [
       { name: 'name', label: 'Your Name', type: 'text', required: true },
       { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
       { name: 'birthPlace', label: 'Place of Birth', type: 'text', required: true },
       { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
       { name: 'job', label: 'Occupation', type: 'text', required: false },
       { name: 'currentEmotion', label: 'Current Emotion', type: 'select', options: [
           { value: 'calm', label: 'Calm' },
           { value: 'anxious', label: 'Anxious' },
           { value: 'hopeful', label: 'Hopeful' },
           { value: 'confused', label: 'Confused' },
           { value: 'sad', label: 'Sad' },
           { value: 'lonely', label: 'Lonely' },
           { value: 'heartbroken', label: 'Heartbroken' },
           { value: 'nostalgic', label: 'Nostalgic' },
           { value: 'stressed', label: 'Stressed' },
           { value: 'overwhelmed', label: 'Overwhelmed' },
           { value: 'tired', label: 'Tired' },
           { value: 'restless', label: 'Restless' },
           { value: 'stuck', label: 'Stuck' },
           { value: 'waiting', label: 'Waiting for something' },
           { value: 'afraid', label: 'Afraid' },
           { value: 'angry', label: 'Angry' },
           { value: 'vulnerable', label: 'Vulnerable' },
           { value: 'curious', label: 'Curious' },
           { value: 'grateful', label: 'Grateful' },
           { value: 'peaceful', label: 'Peaceful' },
           { value: 'excited', label: 'Excited' },
           { value: 'determined', label: 'Determined' },
           { value: 'blocked', label: 'Blocked' },
           { value: 'needing_clarity', label: 'Needing clarity' },
           { value: 'ready_for_change', label: 'Ready for change' }
       ], required: true },
       { name: 'lifeArea', label: 'Focus Area', type: 'select', options: [
           { value: 'love', label: 'Love' },
           { value: 'career', label: 'Career' },
           { value: 'health', label: 'Health' },
           { value: 'spirituality', label: 'Spirituality' },
           { value: 'money_finance', label: 'Money & finances' },
           { value: 'family', label: 'Family' },
           { value: 'education', label: 'Education & exams' },
           { value: 'migration', label: 'Migration or relocation' },
           { value: 'home', label: 'Home & stability' },
           { value: 'decision', label: 'Important decision' },
           { value: 'personal_growth', label: 'Personal growth' },
           { value: 'friendship_social', label: 'Friendships & social life' },
           { value: 'marriage_commitment', label: 'Marriage or commitment' },
           { value: 'children', label: 'Children or parenting' },
           { value: 'future_timing', label: 'Future timing' },
           { value: 'protection_energy', label: 'Protection & energy' },
           { value: 'all_mixed', label: 'A mix of everything' }
       ], required: true },
       { name: 'bigQuestion', label: 'Your Question', type: 'textarea', required: true },
       { name: 'openAdvice', label: 'Open to advice?', type: 'select', options: [
           { value: 'yes', label: 'Yes' },
           { value: 'no', label: 'No' }
       ], required: true }
    ]
  },
  [ModuleType.WEALTH]: {
    type: ModuleType.WEALTH,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(6).jpg?alt=media&token=fd3e66ca-d31a-46ae-b33c-1ed92c07f1f4',
    icon: '💰',
    isPremium: true,
    theme: { backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(7).jpg?alt=media&token=63406af8-8310-4cd8-be0b-2f9c58c3f10c', primaryColor: '#8b4513', accentColor: '#fcd34d', glassColor: 'rgba(255, 255, 255, 0.1)', textColor: '#f0f0f0' },
    fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
        { name: 'job', label: 'Current Occupation', type: 'text', required: true },
        { name: 'location', label: 'City & Country', type: 'text', required: true },
        { name: 'financialWish', label: 'Your Greatest Financial Wish', type: 'textarea', required: true },
        { name: 'financialBlockage', label: 'What feels like a blockage?', type: 'textarea', required: true },
        { name: 'desiredEnergy', label: 'Energy you wish to attract', type: 'text', required: true, placeholder: 'e.g., Abundance, Stability' }
    ]
  },
  [ModuleType.TAROT]: {
    type: ModuleType.TAROT,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(1).jpg?alt=media&token=108f3f0e-eac6-4092-bbbf-a3cc46fa1dd5',
    icon: '🎴',
    isPremium: true,
    theme: { backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(1).jpg?alt=media&token=1a2f6099-e7b0-4132-a1ad-a125b8239ff8', primaryColor: 'linear-gradient(135deg, #fcd34d, #fde68a)', accentColor: '#fcd34d', glassColor: 'rgba(64, 63, 63, 0.483)', textColor: '#f0eade' },
    fields: [
        { name: 'name', label: 'Your Name', type: 'text', required: true },
        { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
        { name: 'tarotFocus', label: 'Life Aspect to Focus', type: 'select', options: [
            { value: 'love', label: 'Love' },
            { value: 'career', label: 'Career' },
            { value: 'health', label: 'Health' },
            { value: 'spirituality', label: 'Spirituality' },
            { value: 'money_finance', label: 'Money & finances' },
            { value: 'family', label: 'Family' },
            { value: 'education', label: 'Education & exams' },
            { value: 'migration', label: 'Migration or relocation' },
            { value: 'home', label: 'Home & stability' },
            { value: 'decision', label: 'Important decision' },
            { value: 'personal_growth', label: 'Personal growth' },
            { value: 'friendship_social', label: 'Friendships & social life' },
            { value: 'marriage_commitment', label: 'Marriage or commitment' },
            { value: 'children', label: 'Children or parenting' },
            { value: 'future_timing', label: 'Future timing' },
            { value: 'protection_energy', label: 'Protection & energy' },
            { value: 'all_mixed', label: 'A mix of everything' }
        ], required: true },
        { name: 'situationSummary', label: 'Briefly describe your situation', type: 'textarea', required: true },
        { name: 'currentEmotion', label: 'Current Vibrational State', type: 'select', options: [
            { value: 'calm', label: 'Calm' },
            { value: 'anxious', label: 'Anxious' },
            { value: 'hopeful', label: 'Hopeful' },
            { value: 'confused', label: 'Confused' },
            { value: 'sad', label: 'Sad' },
            { value: 'lonely', label: 'Lonely' },
            { value: 'heartbroken', label: 'Heartbroken' },
            { value: 'nostalgic', label: 'Nostalgic' },
            { value: 'stressed', label: 'Stressed' },
            { value: 'overwhelmed', label: 'Overwhelmed' },
            { value: 'tired', label: 'Tired' },
            { value: 'restless', label: 'Restless' },
            { value: 'stuck', label: 'Stuck' },
            { value: 'waiting', label: 'Waiting for something' },
            { value: 'afraid', label: 'Afraid' },
            { value: 'angry', label: 'Angry' },
            { value: 'vulnerable', label: 'Vulnerable' },
            { value: 'curious', label: 'Curious' },
            { value: 'grateful', label: 'Grateful' },
            { value: 'peaceful', label: 'Peaceful' },
            { value: 'excited', label: 'Excited' },
            { value: 'determined', label: 'Determined' },
            { value: 'blocked', label: 'Blocked' },
            { value: 'needing_clarity', label: 'Needing clarity' },
            { value: 'ready_for_change', label: 'Ready for change' }
        ], required: true }
    ]
  },
  [ModuleType.DREAM]: {
    type: ModuleType.DREAM,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(9).jpg?alt=media&token=6699ccc1-1aa7-4318-a992-ab2b261ae111',
    icon: '🌙',
    isPremium: false,
    theme: { backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/8THjUzP%20-%20Imgur%20(1).jpg?alt=media&token=645e9d49-ffc9-4e82-b5c4-7011d72a2a53', primaryColor: 'linear-gradient(145deg, #fcd34d, #fde68a)', accentColor: '#fcd34d', glassColor: 'rgba(124, 123, 123, 0.7)', textColor: '#f0eade' },
    fields: [
        { name: 'name', label: 'Your Name', type: 'text', required: true },
        { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
        { name: 'location', label: 'Where do you live?', type: 'text', required: true },
        { name: 'dreamDate', label: 'Date of the Dream', type: 'date', required: true },
        { name: 'dreamDescription', label: 'Describe the Dream in detail', type: 'textarea', required: true },
        { name: 'dreamEmotion', label: 'Emotion during the dream', type: 'text', required: true },
        { name: 'isRecurringDream', label: 'Is this a recurring dream?', type: 'select', options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ], required: true },
        { name: 'interpretationStyle', label: 'Preferred Interpretation Style', type: 'select', options: [
            { value: 'mystical', label: 'Mystical & Symbolic' },
            { value: 'direct', label: 'Psychological & Analytical' }
        ], required: true }
    ]
  },
  [ModuleType.DAILY]: {
    type: ModuleType.DAILY,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/76gE8Rp%20-%20Imgur.jpg?alt=media&token=2aaed7d5-25e3-4cec-93a3-6034b7a88651',
    icon: '🌞',
    isPremium: false,
    theme: { backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur.png?alt=media&token=3da865d3-f15e-4127-8c33-1c4e3974fa5c', primaryColor: 'linear-gradient(90deg, #8e2de2, #4a00e0)', accentColor: '#c79aff', glassColor: 'rgba(117, 114, 114, 0.085)', textColor: '#f0f0f0' },
    fields: [
        { name: 'name', label: 'Your Name', type: 'text', required: true },
        { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
        { name: 'job', label: 'Occupation', type: 'text', required: false },
        { name: 'location', label: 'City of Residence', type: 'text', required: true },
        { name: 'currentEmotion', label: 'Current Mood', type: 'select', options: [
            { value: 'calm', label: 'Calm' },
            { value: 'anxious', label: 'Anxious' },
            { value: 'hopeful', label: 'Hopeful' },
            { value: 'confused', label: 'Confused' },
            { value: 'sad', label: 'Sad' },
            { value: 'lonely', label: 'Lonely' },
            { value: 'heartbroken', label: 'Heartbroken' },
            { value: 'nostalgic', label: 'Nostalgic' },
            { value: 'stressed', label: 'Stressed' },
            { value: 'overwhelmed', label: 'Overwhelmed' },
            { value: 'tired', label: 'Tired' },
            { value: 'restless', label: 'Restless' },
            { value: 'stuck', label: 'Stuck' },
            { value: 'waiting', label: 'Waiting for something' },
            { value: 'afraid', label: 'Afraid' },
            { value: 'angry', label: 'Angry' },
            { value: 'vulnerable', label: 'Vulnerable' },
            { value: 'curious', label: 'Curious' },
            { value: 'grateful', label: 'Grateful' },
            { value: 'peaceful', label: 'Peaceful' },
            { value: 'excited', label: 'Excited' },
            { value: 'determined', label: 'Determined' },
            { value: 'blocked', label: 'Blocked' },
            { value: 'needing_clarity', label: 'Needing clarity' },
            { value: 'ready_for_change', label: 'Ready for change' }
        ], required: true },
        { name: 'todaysWorry', label: 'Main Worry for Today', type: 'text', required: true },
        { name: 'todaysDesire', label: 'Main Desire for Today', type: 'text', required: true }
    ]
  },
  [ModuleType.RETURN_LOVE]: {
    type: ModuleType.RETURN_LOVE,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(10).jpg?alt=media&token=3f69b80b-97ee-4340-92d8-dd57fe2f7d60',
    icon: '❤️‍🩹',
    isPremium: true,
    theme: { backgroundImage: '', primaryColor: 'linear-gradient(45deg, #ff56a0, #ff7bbe)', accentColor: '#f82b91', glassColor: 'rgba(44, 0, 62, 0.85)', textColor: '#f0e6f6' },
    fields: [
        { name: 'name', label: 'Your Full Name', type: 'text', required: true },
        { name: 'birthDate', label: 'Your Birth Date', type: 'date', required: true },
        { name: 'location', label: 'Where do you currently live?', type: 'text', required: true },
        { name: 'gender', label: 'Your Gender', type: 'select', options: GENDER_OPTIONS, required: true },
        { name: 'partnerName', label: 'Ex-Partner Name', type: 'text', required: true },
        { name: 'partnerBirthDate', label: 'Ex-Partner Birth Date', type: 'date', required: true },
        { name: 'partnerGender', label: 'Ex-Partner Gender', type: 'select', options: GENDER_OPTIONS, required: true },
        { name: 'timeApart', label: 'How long have you been apart?', type: 'text', required: true },
        { name: 'breakupReason', label: 'Brief reason for separation', type: 'textarea', required: true },
        { name: 'motherName', label: 'Your Mother\'s Name (Optional)', type: 'text', required: false },
        { name: 'relationshipDesire', label: 'What is your deepest desire?', type: 'textarea', required: true }
    ]
  },
  [ModuleType.PAST_LIFE]: {
    type: ModuleType.PAST_LIFE,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(1).png?alt=media&token=f1f59942-c2bd-452e-af72-62e87b4cd65e',
    icon: '⏳',
    isPremium: true,
    theme: { backgroundImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop', primaryColor: '#e84cc2', accentColor: '#ffb4f4', glassColor: 'rgba(255, 255, 255, 0.08)', textColor: '#f5dcff' },
    fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'birthDate', label: 'Birth Date', type: 'date', required: true },
        { name: 'birthPlace', label: 'Birth Place', type: 'text', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
        { name: 'location', label: 'Current Residence', type: 'text', required: true },
        { name: 'currentEmotion', label: 'Dominant Emotion in current life', type: 'text', required: true },
        { name: 'personalSymbol', label: 'A Symbol that attracts you', type: 'text', required: true, placeholder: 'e.g., Moon, Owl, Sword' },
        { name: 'recurringDream', label: 'Brief description of a recurring dream', type: 'textarea', required: false },
        { name: 'userImage', label: 'Upload Current Photo (For Soul Mapping)', type: 'file', required: false }
    ]
  },
  [ModuleType.NATAL_CHART]: {
    type: ModuleType.NATAL_CHART,
    image: 'https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/FtrcvXA%20-%20Imgur.jpg?alt=media&token=7865946a-cc25-4168-8d98-b7d79fe655d9',
    icon: '🌌',
    isPremium: true,
    theme: { backgroundImage: '', primaryColor: '#4f46e5', accentColor: '#c7d2fe', glassColor: 'rgba(30, 27, 75, 0.7)', textColor: '#e0e7ff' },
    fields: [
        { name: 'chartYear', label: 'Which analysis do you want to receive?', type: 'select', options: [
            { value: '2026', label: 'Complete 2026 chart, from the beginning to the end of the year' },
            { value: '2027', label: 'Complete 2027 chart' },
            { value: '2026_2027', label: 'Combined 2026 and 2027 analysis - professional recommendation' }
        ], required: true },
        { name: 'name', label: 'Name you want used in the reading', type: 'text', required: true },
        { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'birthTime', label: 'Birth Time (optional, improves accuracy)', type: 'time', required: false },
        { name: 'birthPlace', label: 'City & Country of Birth', type: 'text', required: true },
        { name: 'currentEmotion', label: 'Where are you emotionally right now?', type: 'select', options: [
            { value: 'new_path', label: 'I am starting a new path' },
            { value: 'confused', label: 'I feel confused' },
            { value: 'growing_changing', label: 'I am growing and changing' },
            { value: 'complex_relationship', label: 'I am in a complicated relationship' },
            { value: 'releasing_past', label: 'I am letting go of my past' }
        ], required: true },
        { name: 'natalFocus', label: 'Which life area should the analysis focus on?', type: 'select', options: [
            { value: 'love_relationships', label: 'Love and relationships' },
            { value: 'career_money', label: 'Career and money' },
            { value: 'life_purpose', label: 'Life path and purpose' },
            { value: 'migration_relocation', label: 'Migration or relocation' },
            { value: 'complete_mix', label: 'A balanced mix of everything' }
        ], required: true },
        { name: 'relationshipStatus', label: 'Relationship Status', type: 'select', options: [
            { value: 'single', label: 'Single' },
            { value: 'dating', label: 'Dating or getting to know someone' },
            { value: 'relationship', label: 'In a relationship' },
            { value: 'married', label: 'Married or committed' },
            { value: 'separated', label: 'Separated or healing' },
            { value: 'complicated', label: 'Complicated or unclear' },
            { value: 'prefer_not_to_say', label: 'Prefer not to say' }
        ], required: true },
        { name: 'lovePattern', label: 'What relationship pattern do you keep repeating?', type: 'textarea', required: true },
        { name: 'stillThinkingOfSomeone', label: 'Are you still thinking about someone?', type: 'select', options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'sometimes', label: 'Sometimes / not fully clear' }
        ], required: true },
        { name: 'loveGoal', label: 'What do you want in love during the selected year?', type: 'textarea', required: true },
        { name: 'job', label: 'Current job or career path', type: 'text', required: true },
        { name: 'careerSatisfaction', label: 'Are you satisfied with your current direction?', type: 'select', options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'mixed', label: 'Mixed feelings' },
            { value: 'searching', label: 'I am searching for a new direction' }
        ], required: true },
        { name: 'biggestYearGoal', label: 'Biggest goal for the selected year', type: 'textarea', required: true },
        { name: 'progressBlocker', label: 'What is blocking your progress?', type: 'textarea', required: true },
        { name: 'oneLifeChange', label: 'If one thing in your life could change, what would it be?', type: 'textarea', required: true },
        { name: 'professionalExtras', label: 'Include professional extras: month-by-month forecast, deeper relationship analysis, and golden decision windows?', type: 'select', options: [
            { value: 'yes', label: 'Yes, include the professional version' },
            { value: 'no', label: 'No, keep it focused' }
        ], required: true }
    ]
  }
};

const COMMON_LABELS = {
    name: { en: 'Your Name', fa: 'نام شما', fr: 'Votre Nom', ptBR: 'Seu Nome', ptPT: 'O Seu Nome', ar: 'اسمك', hi: 'आपका नाम', de: 'Dein Name' },
    birthDate: { en: 'Date of Birth', fa: 'تاریخ تولد', fr: 'Date de Naissance', ptBR: 'Data de Nascimento', ptPT: 'Data de Nascimento', ar: 'تاريخ الميلاد', hi: 'जन्म तिथि', de: 'Geburtsdatum' },
    birthTime: { en: 'Birth Time', fa: 'ساعت تولد', fr: 'Heure de Naissance', ptBR: 'Hora de Nascimento', ptPT: 'Hora de Nascimento', ar: 'وقت الولادة', hi: 'जन्म समय', de: 'Geburtszeit' },
    birthPlace: { en: 'Place of Birth', fa: 'محل تولد', fr: 'Lieu de Naissance', ptBR: 'Local de Nascimento', ptPT: 'Local de Nascimento', ar: 'مكان الميلاد', hi: 'जन्म स्थान', de: 'Geburtsort' },
    gender: { en: 'Gender', fa: 'جنسیت', fr: 'Genre', ptBR: 'Gênero', ptPT: 'Género', ar: 'الجنس', hi: 'लिंग', de: 'Geschlecht' },
    partnerGender: { en: 'Partner Gender', fa: 'جنسیت طرف مقابل', fr: 'Genre du partenaire', ptBR: 'Gênero da pessoa parceira', ptPT: 'Género da pessoa parceira', ar: 'جنس الشريك', hi: 'साथी का लिंग', de: 'Geschlecht der Partnerperson' },
    job: { en: 'Occupation', fa: 'شغل', fr: 'Profession', ptBR: 'Ocupação', ptPT: 'Profissão', ar: 'المهنة', hi: 'व्यवसाय', de: 'Beruf' },
    location: { en: 'City & Country', fa: 'شهر و کشور', fr: 'Ville et pays', ptBR: 'Cidade e país', ptPT: 'Cidade e país', ar: 'المدينة والبلد', hi: 'शहर और देश', de: 'Stadt und Land' },
    currentEmotion: { en: 'Current Emotion', fa: 'احساس فعلی', fr: 'Émotion actuelle', ptBR: 'Emoção atual', ptPT: 'Emoção atual', ar: 'الشعور الحالي', hi: 'वर्तमान भावना', de: 'Aktuelle Emotion' },
    dreamEmotion: { en: 'Emotion during the dream', fa: 'احساس هنگام خواب', fr: 'Émotion pendant le rêve', ptBR: 'Emoção durante o sonho', ptPT: 'Emoção durante o sonho', ar: 'الشعور أثناء الحلم', hi: 'सपने के दौरान भावना', de: 'Gefühl im Traum' },
    female: { en: 'Female', fa: 'زن', fr: 'Femme', ptBR: 'Feminino', ptPT: 'Feminino', ar: 'أنثى', hi: 'महिला', de: 'Weiblich' },
    male: { en: 'Male', fa: 'مرد', fr: 'Homme', ptBR: 'Masculino', ptPT: 'Masculino', ar: 'ذكر', hi: 'पुरुष', de: 'Männlich' },
    non_binary: { en: 'Non-binary', fa: 'غیردودویی', fr: 'Non-binaire', ptBR: 'Não binário', ptPT: 'Não binário', ar: 'غير ثنائي', hi: 'नॉन-बाइनरी', de: 'Nicht-binär' },
    transgender_woman: { en: 'Transgender Woman', fa: 'زن ترنس', fr: 'Femme transgenre', ptBR: 'Mulher transgênero', ptPT: 'Mulher transgénero', ar: 'امرأة عابرة جندريا', hi: 'ट्रांसजेंडर महिला', de: 'Transgender Frau' },
    transgender_man: { en: 'Transgender Man', fa: 'مرد ترنس', fr: 'Homme transgenre', ptBR: 'Homem transgênero', ptPT: 'Homem transgénero', ar: 'رجل عابر جندريا', hi: 'ट्रांसजेंडर पुरुष', de: 'Transgender Mann' },
    genderfluid: { en: 'Genderfluid', fa: 'جنسیت سیال', fr: 'Genre fluide', ptBR: 'Gênero fluido', ptPT: 'Género fluido', ar: 'جندر فلويد', hi: 'जेंडरफ्लुइड', de: 'Genderfluid' },
    agender: { en: 'Agender', fa: 'بی‌جنسیت', fr: 'Agenre', ptBR: 'Agênero', ptPT: 'Agénero', ar: 'لاجندري', hi: 'एजेंडर', de: 'Agender' },
    intersex: { en: 'Intersex', fa: 'بیناجنسی', fr: 'Intersexe', ptBR: 'Intersexo', ptPT: 'Intersexo', ar: 'ثنائي الجنس', hi: 'इंटरसेक्स', de: 'Intergeschlechtlich' },
    heterosexual: { en: 'Heterosexual', fa: 'دگرجنس‌گرا', fr: 'Hétérosexuel', ptBR: 'Heterossexual', ptPT: 'Heterossexual', ar: 'مغاير الجنس', hi: 'विषमलैंगिक', de: 'Heterosexuell' },
    bisexual: { en: 'Bisexual', fa: 'دوجنس‌گرا', fr: 'Bisexuel', ptBR: 'Bissexual', ptPT: 'Bissexual', ar: 'ثنائي الميول', hi: 'उभयलिंगी', de: 'Bisexuell' },
    gay: { en: 'Gay', fa: 'گی', fr: 'Gay', ptBR: 'Gay', ptPT: 'Gay', ar: 'مثلي', hi: 'गे', de: 'Schwul' },
    lesbian: { en: 'Lesbian', fa: 'لزبین', fr: 'Lesbienne', ptBR: 'Lésbica', ptPT: 'Lésbica', ar: 'مثلية', hi: 'लेस्बियन', de: 'Lesbisch' },
    pansexual: { en: 'Pansexual', fa: 'پنسکشوال', fr: 'Pansexuel', ptBR: 'Pansexual', ptPT: 'Pansexual', ar: 'شامل الميول', hi: 'पैनसेक्शुअल', de: 'Pansexuell' },
    asexual: { en: 'Asexual', fa: 'بی‌میل جنسی', fr: 'Asexuel', ptBR: 'Assexual', ptPT: 'Assexual', ar: 'لاجنسي', hi: 'अलैंगिक', de: 'Asexuell' },
    queer: { en: 'Queer', fa: 'کوئیر', fr: 'Queer', ptBR: 'Queer', ptPT: 'Queer', ar: 'كوير', hi: 'क्वीर', de: 'Queer' },
    questioning: { en: 'Questioning', fa: 'در حال شناخت', fr: 'En questionnement', ptBR: 'Em questionamento', ptPT: 'Em questionamento', ar: 'في طور التساؤل', hi: 'पहचान पर विचार कर रहा/रही', de: 'Noch unsicher' },
    other: { en: 'Other', fa: 'سایر', fr: 'Autre', ptBR: 'Outro', ptPT: 'Outro', ar: 'آخر', hi: 'अन्य', de: 'Divers' },
    prefer_not_to_say: { en: 'Prefer not to say', fa: 'ترجیح می‌دهم نگویم', fr: 'Je préfère ne pas répondre', ptBR: 'Prefiro não dizer', ptPT: 'Prefiro não dizer', ar: 'أفضل عدم القول', hi: 'न बताना पसंद करूंगा/करूंगी', de: 'Möchte ich nicht sagen' },
    yes: { en: 'Yes', fa: 'بله', fr: 'Oui', ptBR: 'Sim', ptPT: 'Sim', ar: 'نعم', hi: 'हाँ', de: 'Ja' },
    no: { en: 'No', fa: 'خیر', fr: 'Non', ptBR: 'Não', ptPT: 'Não', ar: 'لا', hi: 'नहीं', de: 'Nein' },
    love: { en: 'Love', fa: 'عشق', fr: 'Amour', ptBR: 'Amor', ptPT: 'Amor', ar: 'الحب', hi: 'प्रेम', de: 'Liebe' },
    career: { en: 'Career', fa: 'شغل و کار', fr: 'Carrière', ptBR: 'Carreira', ptPT: 'Carreira', ar: 'العمل', hi: 'کैरियर', de: 'Karriere' },
    health: { en: 'Health', fa: 'سلامتی', fr: 'Santé', ptBR: 'Saúde', ptPT: 'Saúde', ar: 'الصحة', hi: 'स्वास्थ्य', de: 'Gesundheit' },
    spirituality: { en: 'Spirituality', fa: 'معنویت', fr: 'Spiritualité', ptBR: 'Espiritualidade', ptPT: 'Espiritualidade', ar: 'الروحانية', hi: 'अध्यात्म', de: 'Spiritualität' },
    money_finance: { en: 'Money & finances', fa: 'پول و مسائل مالی', fr: 'Argent et finances', ptBR: 'Dinheiro e finanças', ptPT: 'Dinheiro e finanças', ar: 'المال والشؤون المالية', hi: 'धन और वित्त', de: 'Geld und Finanzen' },
    family: { en: 'Family', fa: 'خانواده', fr: 'Famille', ptBR: 'Família', ptPT: 'Família', ar: 'العائلة', hi: 'परिवार', de: 'Familie' },
    education: { en: 'Education & exams', fa: 'تحصیل و امتحان', fr: 'Études et examens', ptBR: 'Estudos e provas', ptPT: 'Estudos e exames', ar: 'الدراسة والامتحانات', hi: 'शिक्षा और परीक्षा', de: 'Bildung und Prüfungen' },
    migration: { en: 'Migration or relocation', fa: 'مهاجرت یا جابه‌جایی', fr: 'Migration ou déménagement', ptBR: 'Migração ou mudança', ptPT: 'Migração ou mudança', ar: 'الهجرة أو الانتقال', hi: 'प्रवास या स्थान परिवर्तन', de: 'Migration oder Umzug' },
    home: { en: 'Home & stability', fa: 'خانه و ثبات', fr: 'Foyer et stabilité', ptBR: 'Casa e estabilidade', ptPT: 'Casa e estabilidade', ar: 'البيت والاستقرار', hi: 'घर और स्थिरता', de: 'Zuhause und Stabilität' },
    decision: { en: 'Important decision', fa: 'تصمیم مهم', fr: 'Décision importante', ptBR: 'Decisão importante', ptPT: 'Decisão importante', ar: 'قرار مهم', hi: 'महत्वपूर्ण निर्णय', de: 'Wichtige Entscheidung' },
    personal_growth: { en: 'Personal growth', fa: 'رشد شخصی', fr: 'Croissance personnelle', ptBR: 'Crescimento pessoal', ptPT: 'Crescimento pessoal', ar: 'النمو الشخصي', hi: 'व्यक्तिगत विकास', de: 'Persönliches Wachstum' },
    friendship_social: { en: 'Friendships & social life', fa: 'دوستی و روابط اجتماعی', fr: 'Amitiés et vie sociale', ptBR: 'Amizades e vida social', ptPT: 'Amizades e vida social', ar: 'الصداقات والحياة الاجتماعية', hi: 'दोस्ती और सामाजिक जीवन', de: 'Freundschaften und Sozialleben' },
    marriage_commitment: { en: 'Marriage or commitment', fa: 'ازدواج یا تعهد', fr: 'Mariage ou engagement', ptBR: 'Casamento ou compromisso', ptPT: 'Casamento ou compromisso', ar: 'الزواج أو الالتزام', hi: 'विवाह या प्रतिबद्धता', de: 'Ehe oder Verbindlichkeit' },
    children: { en: 'Children or parenting', fa: 'فرزند یا والدگری', fr: 'Enfants ou parentalité', ptBR: 'Filhos ou parentalidade', ptPT: 'Filhos ou parentalidade', ar: 'الأطفال أو التربية', hi: 'बच्चे या पालन-पोषण', de: 'Kinder oder Elternschaft' },
    future_timing: { en: 'Future timing', fa: 'زمان‌بندی آینده', fr: 'Timing du futur', ptBR: 'Tempo certo no futuro', ptPT: 'Timing do futuro', ar: 'توقيت المستقبل', hi: 'भविष्य का समय', de: 'Zeitfenster der Zukunft' },
    protection_energy: { en: 'Protection & energy', fa: 'محافظت و انرژی', fr: 'Protection et énergie', ptBR: 'Proteção e energia', ptPT: 'Proteção e energia', ar: 'الحماية والطاقة', hi: 'सुरक्षा और ऊर्जा', de: 'Schutz und Energie' },
    all_mixed: { en: 'A mix of everything', fa: 'ترکیبی از همه', fr: 'Un mélange de tout', ptBR: 'Um pouco de tudo', ptPT: 'Um pouco de tudo', ar: 'مزيج من كل شيء', hi: 'सबका मिश्रण', de: 'Eine Mischung aus allem' },
    calm: { en: 'Calm', fa: 'آرام', fr: 'Calme', ptBR: 'Calmo', ptPT: 'Calmo', ar: 'هادئ', hi: 'शांत', de: 'Ruhig' },
    confused: { en: 'Confused', fa: 'گیج و سردرگم', fr: 'Confus', ptBR: 'Confuso', ptPT: 'Confuso', ar: 'مشوش', hi: 'उلझन में', de: 'Verwirrt' },
    hopeful: { en: 'Hopeful', fa: 'امیدوار', fr: 'Espoir', ptBR: 'Esperançoso', ptPT: 'Esperançoso', ar: 'متفائل', hi: 'आशाوان', de: 'Hoffnungsvoll' },
    anxious: { en: 'Anxious', fa: 'مضطرب', fr: 'Anxieux', ptBR: 'Ansioso', ptPT: 'Ansioso', ar: 'قلق', hi: 'चिंतित', de: 'Ängstlich' },
    grateful: { en: 'Grateful', fa: 'شکرگزار', fr: 'Reconnaissant', ptBR: 'Grato', ptPT: 'Grato', ar: 'ممتن', hi: 'आभारी', de: 'Dankbar' },
    sad: { en: 'Sad', fa: 'غمگین', fr: 'Triste', ptBR: 'Triste', ptPT: 'Triste', ar: 'حزين', hi: 'उदास', de: 'Traurig' },
    lonely: { en: 'Lonely', fa: 'تنها', fr: 'Seul(e)', ptBR: 'Solitário(a)', ptPT: 'Solitário(a)', ar: 'وحيد', hi: 'अकेला/अकेली', de: 'Einsam' },
    heartbroken: { en: 'Heartbroken', fa: 'دل‌شکسته', fr: 'Le cœur brisé', ptBR: 'De coração partido', ptPT: 'De coração partido', ar: 'مكسور القلب', hi: 'दिल टूटा हुआ', de: 'Mit gebrochenem Herzen' },
    nostalgic: { en: 'Nostalgic', fa: 'درگیر خاطرات', fr: 'Nostalgique', ptBR: 'Nostálgico(a)', ptPT: 'Nostálgico(a)', ar: 'حنين للماضي', hi: 'पुरानी यादों में', de: 'Nostalgisch' },
    stressed: { en: 'Stressed', fa: 'تحت فشار', fr: 'Stressé(e)', ptBR: 'Estressado(a)', ptPT: 'Stressado(a)', ar: 'متوتر', hi: 'तनाव में', de: 'Gestresst' },
    overwhelmed: { en: 'Overwhelmed', fa: 'درهم‌ریخته', fr: 'Submergé(e)', ptBR: 'Sobrecarregado(a)', ptPT: 'Sobrecarregado(a)', ar: 'مرهق ومثقل', hi: 'बहुत दबाव में', de: 'Überfordert' },
    tired: { en: 'Tired', fa: 'خسته', fr: 'Fatigué(e)', ptBR: 'Cansado(a)', ptPT: 'Cansado(a)', ar: 'متعب', hi: 'थका/थकी हुआ', de: 'Müde' },
    restless: { en: 'Restless', fa: 'بی‌قرار', fr: 'Agité(e)', ptBR: 'Inquieto(a)', ptPT: 'Inquieto(a)', ar: 'قلق وغير مستقر', hi: 'बेचैन', de: 'Unruhig' },
    stuck: { en: 'Stuck', fa: 'گیر کرده', fr: 'Bloqué(e)', ptBR: 'Travado(a)', ptPT: 'Bloqueado(a)', ar: 'عالق', hi: 'अटका/अटकी हुआ', de: 'Festgefahren' },
    waiting: { en: 'Waiting for something', fa: 'منتظر اتفاقی هستم', fr: 'Dans l’attente de quelque chose', ptBR: 'Esperando algo acontecer', ptPT: 'À espera de algo', ar: 'أنتظر شيئاً ما', hi: 'किसी चीज़ का इंतज़ार', de: 'Ich warte auf etwas' },
    afraid: { en: 'Afraid', fa: 'ترسیده', fr: 'Effrayé(e)', ptBR: 'Com medo', ptPT: 'Com medo', ar: 'خائف', hi: 'डरा/डरी हुआ', de: 'Ängstlich' },
    angry: { en: 'Angry', fa: 'عصبانی', fr: 'En colère', ptBR: 'Com raiva', ptPT: 'Com raiva', ar: 'غاضب', hi: 'गुस्सा', de: 'Wütend' },
    vulnerable: { en: 'Vulnerable', fa: 'آسیب‌پذیر', fr: 'Vulnérable', ptBR: 'Vulnerável', ptPT: 'Vulnerável', ar: 'هش وضعيف', hi: 'नाज़ुक महसूस कर रहा/रही', de: 'Verletzlich' },
    curious: { en: 'Curious', fa: 'کنجکاو', fr: 'Curieux(se)', ptBR: 'Curioso(a)', ptPT: 'Curioso(a)', ar: 'فضولي', hi: 'जिज्ञासु', de: 'Neugierig' },
    peaceful: { en: 'Peaceful', fa: 'در صلح و آرامش', fr: 'Paisible', ptBR: 'Em paz', ptPT: 'Em paz', ar: 'هادئ ومطمئن', hi: 'शांतिपूर्ण', de: 'Friedlich' },
    excited: { en: 'Excited', fa: 'هیجان‌زده', fr: 'Excité(e)', ptBR: 'Animado(a)', ptPT: 'Entusiasmado(a)', ar: 'متحمس', hi: 'उत्साहित', de: 'Aufgeregt' },
    determined: { en: 'Determined', fa: 'مصمم', fr: 'Déterminé(e)', ptBR: 'Determinado(a)', ptPT: 'Determinado(a)', ar: 'مصمم', hi: 'दृढ़ निश्चयी', de: 'Entschlossen' },
    blocked: { en: 'Blocked', fa: 'مسدود و بسته', fr: 'Bloqué(e) intérieurement', ptBR: 'Bloqueado(a)', ptPT: 'Bloqueado(a)', ar: 'مسدود داخلياً', hi: 'रुका हुआ', de: 'Blockiert' },
    needing_clarity: { en: 'Needing clarity', fa: 'نیاز به روشن شدن دارم', fr: 'Besoin de clarté', ptBR: 'Preciso de clareza', ptPT: 'Preciso de clareza', ar: 'أحتاج إلى وضوح', hi: 'स्पष्टता चाहिए', de: 'Ich brauche Klarheit' },
    ready_for_change: { en: 'Ready for change', fa: 'آماده تغییرم', fr: 'Prêt(e) au changement', ptBR: 'Pronto(a) para mudar', ptPT: 'Pronto(a) para mudar', ar: 'مستعد للتغيير', hi: 'बदलाव के लिए तैयार', de: 'Bereit für Veränderung' },
    userGender: { en: 'Your Gender', fa: 'جنسیت شما', fr: 'Votre Genre', ptBR: 'Seu Gênero', ptPT: 'Seu Género', ar: 'جنسك', hi: 'आपका लिंग', de: 'Dein Geschlecht' }
};

const getLabelKey = (lang: LanguageCode): keyof typeof COMMON_LABELS.name => {
    if (lang === 'pt-BR') return 'ptBR';
    if (lang === 'pt-PT') return 'ptPT';
    return lang as keyof typeof COMMON_LABELS.name;
};

const generateAppTranslations = (lang: LanguageCode) => {
    const k = getLabelKey(lang);
    return {
        appTitle: 'INTERASTRAL',
        tagline: {
            en: 'Voice of the Stars, Awareness Beyond Time',
            fa: 'صدای ستارگان، آگاهی فراتر از زمان',
            fr: 'La Voix des Étoiles, Conscience au-delà du Temps',
            ptBR: 'Voz das Estrelas, Consciência Além do Tempo',
            ptPT: 'Voz das Estrelas, Consciência Além do Tempo',
            ar: 'صوت النجوم، وعي يتجاوز الزمن',
            hi: 'सितारों की आवाज़, समय से परे चेतना',
            de: 'Stimme der Sterne, Bewusstsein jenseits der Zeit'
        }[k] || 'Voice of the Stars',
        login: { en: 'ENTER PORTAL', fa: 'ورود به پورتال', fr: 'ENTRER', ptBR: 'ENTRAR', ptPT: 'ENTRAR', ar: 'دخول', hi: 'प्रवेश करें', de: 'PORTAL BETRETEN' }[k],
        logout: { en: 'LOGOUT', fa: 'خروج', fr: 'DÉCONNEXION', ptBR: 'SAIR', ptPT: 'SAIR', ar: 'خروج', hi: 'لॉग आउट', de: 'ABMELDEN' }[k],
        home: { en: 'HOME', fa: 'خانه', fr: 'ACCUEIL', ptBR: 'INÍCIO', ptPT: 'INÍCIO', ar: 'الرئيسية', hi: 'होम', de: 'STARTSEITE' }[k],
        blog: { en: 'BLOG', fa: 'وبلاگ', fr: 'BLOG', ptBR: 'BLOG', ptPT: 'BLOG', ar: 'المدونة', hi: 'ब्लॉग', de: 'BLOG' }[k],
        pricing: { en: 'SHOP', fa: 'فروشگاه', fr: 'BOUTIQUE', ptBR: 'LOJA', ptPT: 'LOJA', ar: 'المتجر', hi: 'دکان', de: 'SHOP' }[k],
        dashboard: { en: 'DASHBOARD', fa: 'داشبورد', fr: 'TABLEAU DE BORD', ptBR: 'PAINEL', ptPT: 'PAINEL', ar: 'لوحة التحكم', hi: 'دباشبورد', de: 'DASHBOARD' }[k],
        loading: { en: 'Consulting the Cosmos...', fa: 'در حال ارتباط با کائنات...', fr: 'Consultation du Cosmos...', ptBR: 'Consultando o Cosmos...', ptPT: 'A Consultar o Cosmos...', ar: 'جارٍ استشارة الكون...', hi: 'ब्रह्मांड से परामर्श...', de: 'Konsultiere den Kosmos...' }[k],
        connecting: { en: 'Connecting...', fa: 'در حال اتصال...', fr: 'Connexion...', ptBR: 'Conectando...', ptPT: 'A ligar...', ar: 'جارٍ الاتصال...', hi: 'कनेक्ट हो रहा है...', de: 'Verbindung...' }[k],
        continueWithGoogle: { en: 'Continue with Google', fa: 'ادامه با گوگل', fr: 'Continuer avec Google', ptBR: 'Continuar com Google', ptPT: 'Continuar com Google', ar: 'المتابعة عبر Google', hi: 'Google से जारी रखें', de: 'Mit Google fortfahren' }[k],
        authHelp: { en: 'Note: If login fails or hangs, please open this app in a new tab.', fa: 'اگر ورود انجام نشد، لطفا برنامه را در یک تب جدید باز کنید.', fr: 'Si la connexion échoue, ouvrez l’application dans un nouvel onglet.', ptBR: 'Se o login falhar, abra o app em uma nova aba.', ptPT: 'Se o login falhar, abra a app num novo separador.', ar: 'إذا فشل تسجيل الدخول، افتح التطبيق في تبويب جديد.', hi: 'यदि लॉगिन अटक जाए, ऐप को नए टैब में खोलें.', de: 'Falls die Anmeldung hängt, öffne die App in einem neuen Tab.' }[k],
        start: { en: 'Begin Revelation', fa: 'شروع مکاشفه', fr: 'Commencer', ptBR: 'Iniciar Revelação', ptPT: 'Iniciar Revelação', ar: 'ابدأ الوحي', hi: 'रहस्योद्घाटन शुरू करें', de: 'Offenbarung beginnen' }[k],
        continue: { en: 'Continue', fa: 'ادامه', fr: 'Continuer', ptBR: 'Continuar', ptPT: 'Continuar', ar: 'متابعة', hi: 'जारी रखें', de: 'Weiter' }[k],
        locked: { en: 'STARDUST', fa: 'گرد ستاره', fr: 'POUSSIÈRE D\'ÉTOILE', ptBR: 'POEIRA ESTELAR', ptPT: 'POEIRA ESTELAR', ar: 'غبار النجوم', hi: 'स्टारडست', de: 'STARDUST' }[k],
        upload: { en: 'Upload Self Image', fa: 'آپلود تصویر (سلفی)', fr: 'Télécharger Selfie', ptBR: 'Enviar Selfie', ptPT: 'Carregar Selfie', ar: 'رفع صورة شخصية', hi: 'सेल्फी अपलोड करें', de: 'Selfie hochladen' }[k],
        uploadSuccess: { en: 'Image Received', fa: 'تصویر دریافت شد', fr: 'Image Reçue', ptBR: 'Imagem Recebida', ptPT: 'Imagem Recebida', ar: 'تم استلام الصورة', hi: 'छوی प्राप्त हुई', de: 'Bild empfangen' }[k],
        swipe: { en: 'Drag to Rotate • Tap to Select', fa: 'برای چرخاندن بکشید • برای انتخاب لمس کنید', fr: 'Glisser pour tourner • Appuyer pour choisir', ptBR: 'Arraste para Girar • Toque para Selecionar', ptPT: 'Arraste para Rodar • Toque para Selecionar', ar: 'اسحب للتدوير • اضغط للاختيار', hi: 'घुमाने के लिए खींचें • चुनने के लिए टैप करें', de: 'Zum Drehen ziehen • Zum Auswählen tippen' }[k],
        historyTitle: { en: 'Revelation History', fa: 'تاریخچه مکاشفات', fr: 'Historique des Révélations', ptBR: 'Histórico de Revelações', ptPT: 'Histórico de Revelações', ar: 'سجل الوحي', hi: 'रहस्योद्घाटन इतिहास', de: 'Historie der Offenbarungen' }[k],
        faqTitle: { en: 'Cosmic Inquiries', fa: 'سوالات کیهانی', fr: 'Questions cosmiques', ptBR: 'Perguntas cósmicas', ptPT: 'Perguntas cósmicas', ar: 'أسئلة كونية', hi: 'ब्रह्मांडीय प्रश्न', de: 'Kosmische Fragen' }[k],
        noHistory: { en: 'No messages from the stars yet.', fa: 'هنوز پیامی دریافت نشده است', fr: 'Aucun message des étoiles pour le moment.', ptBR: 'Nenhuma mensagem das estrelas ainda.', ptPT: 'Nenhuma mensagem das estrelas ainda.', ar: 'لا رسائل من النجوم بعد.', hi: 'सितारों से अभी तक کوئی संदेश नहीं।', de: 'Noch keine Nachrichten von den Sternen.' }[k],
        startFirst: { en: 'Start your first reading', fa: 'شروع اولین فال', fr: 'Commencer votre première lecture', ptBR: 'Inicie sua primeira leitura', ptPT: 'Inicie a sua primeira leitura', ar: 'ابدأ قراءتك الأولى', hi: 'अपनी पहली रीडिंग शुरू करें', de: 'Starte deine erste Lesung' }[k],
        activePlan: { en: 'ACTIVE', fa: 'فعال', fr: 'ACTIF', ptBR: 'ATIVO', ptPT: 'ATIVO', ar: 'نشط', hi: 'सक्रिय', de: 'AKTIV' }[k],
        ascend: { en: 'GET STARDUST', fa: 'دریافت گرد ستاره', fr: 'OBTENIR POUSSIÈRE', ptBR: 'OBTER POEIRA', ptPT: 'OBTER POEIRA', ar: 'الحصول على غبار النجوم', hi: 'स्टारडست प्राप्त करें', de: 'STARDUST ERHALTEN' }[k],
        chooseDestiny: { en: 'STAR SHOP', fa: 'فروشگاه ستارگان', fr: 'BOUTIQUE STELLAIRE', ptBR: 'LOJA ESTELAR', ptPT: 'LOJA ESTELAR', ar: 'متجر النجوم', hi: 'स्टार शॉप', de: 'STERNEN-SHOP' }[k],
        discoverDestiny: { en: 'Discover Your Destiny', fa: 'سرنوشت خود را کشف کنید', fr: 'Découvrez votre destin', ptBR: 'Descubra seu destino', ptPT: 'Descubra o seu destino', ar: 'اكتشف قدرك', hi: 'अपना भाग्य जानें', de: 'Entdecke dein Schicksal' }[k],
        authTitle: { en: 'STAR GATE', fa: 'دروازه ورود', fr: 'PORTE DES ÉTOILES', ptBR: 'PORTAL ESTELAR', ptPT: 'PORTAL ESTELAR', ar: 'بوابة النجوم', hi: 'स्टार गेट', de: 'STERNENTOR' }[k],
        cosmicName: { en: 'COSMIC NAME', fa: 'نام کیهانی', fr: 'NOM COSMIQUE', ptBR: 'NOME CÓSMICO', ptPT: 'NOME CÓSMICO', ar: 'الاسم الكوني', hi: 'लौकیک نام', de: 'KOSMISCHER NAME' }[k],
        soulEmail: { en: 'SOUL EMAIL', fa: 'ایمیل روح', fr: 'EMAIL DE L\'ÂME', ptBR: 'EMAIL DA ALMA', ptPT: 'EMAIL DA ALMA', ar: 'البريد الروحي', hi: 'आत्मा ईमेल', de: 'SEELEN-EMAIL' }[k],
        connect: { en: 'CONNECT', fa: 'اتصال', fr: 'CONNEXION', ptBR: 'CONECTAR', ptPT: 'LIGAR', ar: 'اتصال', hi: 'कनेक्ट करें', de: 'VERBINDEN' }[k],
        upgradeAlert: { en: 'Stardust added to your cosmic balance.', fa: 'گرد ستاره به موجودی شما اضافه شد.', fr: 'Poussière d\'étoile ajoutée à votre solde.', ptBR: 'Poeira estelar adicionada ao seu saldo.', ptPT: 'Poeira estelar adicionada ao seu saldo.', ar: 'تمت إضافة غبار النجوم إلى رصيدك.', hi: 'स्टारडस्ट आपके बैलेंस में जोड़ा गया।', de: 'Stardust zu deinem kosmischen Guthaben hinzugefügt.' }[k],
        back: { en: 'Return', fa: 'بازگشت', fr: 'Retour', ptBR: 'Voltar', ptPT: 'Voltar', ar: 'عودة', hi: 'वापसी', de: 'Zurück' }[k],
        returnToVoid: { en: 'Return to Void', fa: 'بازگشت به خلاء', fr: 'Retour au Vide', ptBR: 'Retornar au Vazio', ptPT: 'Regressar ao Vazio', ar: 'العودة إلى الفراغ', hi: 'شنی में वापसी', de: 'Zurück ins Leere' }[k],
        imageRestored: { en: 'Vision Restored', fa: 'تصویر بازسازی شده', fr: 'Vision Restaurée', ptBR: 'Visão Restaurada', ptPT: 'Visão Restaurada', ar: 'استعادة الرؤية', hi: 'दृष्टि बहाल', de: 'Vision wiederhergestellt' }[k],
        endMessage: { en: 'End of Transmission', fa: 'پایان پیام', fr: 'Fin de Transmission', ptBR: 'Fim da Transmissão', ptPT: 'Fim da Transmissão', ar: 'نهاية الإرسال', hi: 'संदेश समाप्त', de: 'Ende der Übertragung' }[k],
        transmissionReceived: { en: 'Interastral transmission received', fa: 'پیام اینتراسترال دریافت شد', fr: 'Transmission Interastral reçue', ptBR: 'Transmissão Interastral recebida', ptPT: 'Transmissão Interastral recebida', ar: 'تم استلام رسالة إنترأسترال', hi: 'इंटरएस्ट्रल संदेश प्राप्त हुआ', de: 'Interastral-Übertragung empfangen' }[k],
        share: { en: 'SHARE', fa: 'اشتراک‌گذاری', fr: 'PARTAGER', ptBR: 'COMPARTILHAR', ptPT: 'PARTILHAR', ar: 'مشاركة', hi: 'साझा करें', de: 'TEILEN' }[k],
        shareSuccess: { en: 'Shared successfully!', fa: 'با موفقیت اشتراک‌گذاری شد', fr: 'Partagé avec succès !', ptBR: 'Compartilhado com sucesso!', ptPT: 'Partilhado com sucesso!', ar: 'تمت المشاركة بنجاح!', hi: 'सफलतापूर्वक साझा किया गया!', de: 'Erfolgreich geteilt!' }[k],
        coins: { en: 'Stardust', fa: 'گرد ستاره', fr: 'Poussière', ptBR: 'Poeira', ptPT: 'Poeira', ar: 'غبار', hi: 'स्टारडست', de: 'Stardust' }[k],
        notEnough: { en: 'Not enough Stardust.', fa: 'گرد ستاره کافی نیست.', fr: 'Pas assez de Poussière.', ptBR: 'Poeira insuficiente.', ptPT: 'Poeira insuficiente.', ar: 'غبار النجوم غير كاف.', hi: 'पर्याप्त स्टारडست नहीं।', de: 'Nicht genug Stardust.' }[k],
        referral: { en: 'Referral Code', fa: 'کد معرف', fr: 'Code de Parrainage', ptBR: 'Código de Referência', ptPT: 'Código de Referência', ar: 'رمز الإحالة', hi: 'रेفرل कोड', de: 'Empfehlungscode' }[k],
        redeem: { en: 'Redeem', fa: 'ثبت', fr: 'Échanger', ptBR: 'Resgatar', ptPT: 'Resgatar', ar: 'استرداد', hi: 'भुनाएं', de: 'Einlösen' }[k],
        mostPopular: { en: 'Most Popular', fa: 'محبوب‌ترین', fr: 'Le plus populaire', ptBR: 'Mais popular', ptPT: 'Mais popular', ar: 'الأكثر شيوعاً', hi: 'सबसे लोकप्रिय', de: 'Am beliebtesten' }[k],
        oneTimeOffer: { en: 'One Time Offer', fa: 'پیشنهاد یک‌باره', fr: 'Offre unique', ptBR: 'Oferta única', ptPT: 'Oferta única', ar: 'عرض لمرة واحدة', hi: 'एक बार का प्रस्ताव', de: 'Einmaliges Angebot' }[k],
        processing: { en: 'Processing...', fa: 'در حال پردازش...', fr: 'Traitement...', ptBR: 'Processando...', ptPT: 'A processar...', ar: 'جارٍ المعالجة...', hi: 'प्रक्रिया जारी है...', de: 'Verarbeitung...' }[k],
        cosmicCodeTitle: { en: 'Have a Cosmic Code?', fa: 'کد کیهانی دارید؟', fr: 'Vous avez un code cosmique ?', ptBR: 'Tem um código cósmico?', ptPT: 'Tem um código cósmico?', ar: 'هل لديك رمز كوني؟', hi: 'क्या आपके पास कॉस्मिक कोड है?', de: 'Hast du einen kosmischen Code?' }[k],
        cosmicCodeDesc: { en: "Enter a friend's code to unlock 10 Stardust.", fa: 'کد دوستتان را وارد کنید تا ۱۰ گرد ستاره بگیرید.', fr: 'Entrez le code d’un ami pour débloquer 10 poussières d’étoile.', ptBR: 'Digite o código de um amigo para liberar 10 Stardust.', ptPT: 'Introduza o código de um amigo para desbloquear 10 Stardust.', ar: 'أدخل رمز صديق لتحصل على 10 من غبار النجوم.', hi: '10 Stardust पाने के लिए दोस्त का कोड डालें.', de: 'Gib den Code eines Freundes ein, um 10 Stardust freizuschalten.' }[k],
        code: { en: 'CODE', fa: 'کد', fr: 'CODE', ptBR: 'CÓDIGO', ptPT: 'CÓDIGO', ar: 'الرمز', hi: 'कोड', de: 'CODE' }[k],
        skipForNow: { en: 'Skip for now', fa: 'فعلا رد شو', fr: 'Ignorer pour l’instant', ptBR: 'Pular por agora', ptPT: 'Ignorar por agora', ar: 'تخطي الآن', hi: 'अभी छोड़ें', de: 'Vorerst überspringen' }[k],
        pendingReading: { en: 'Vision pending... The stars await your offering.', fa: 'فال در انتظار است... ستارگان منتظر تکمیل پرداخت شما هستند.', fr: 'Vision en attente... Les étoiles attendent votre offrande.', ptBR: 'Visão pendente... As estrelas aguardam sua oferta.', ptPT: 'Visão pendente... As estrelas aguardam a sua oferta.', ar: 'الرؤية قيد الانتظار... النجوم تنتظر قربانك.', hi: 'दर्शन प्रतीक्षा में है... सितारे आपकी अर्पणा की प्रतीक्षा कर रहे हैं.', de: 'Vision ausstehend... Die Sterne warten auf deine Gabe.' }[k],
        multiSelectHint: { en: 'Select one or more', fa: 'یک یا چند گزینه را انتخاب کنید', fr: 'Sélectionnez une ou plusieurs options', ptBR: 'Selecione uma ou mais opções', ptPT: 'Selecione uma ou mais opções', ar: 'اختر خياراً واحداً أو أكثر', hi: 'एक या अधिक विकल्प चुनें', de: 'Wähle eine oder mehrere Optionen' }[k],
        multiSelectError: { en: 'Please select at least one focus area.', fa: 'لطفا حداقل یک بخش تمرکز را انتخاب کنید.', fr: 'Veuillez sélectionner au moins un domaine.', ptBR: 'Selecione pelo menos uma área de foco.', ptPT: 'Selecione pelo menos uma área de foco.', ar: 'يرجى اختيار مجال تركيز واحد على الأقل.', hi: 'कृपया कम से कम एक फोकस क्षेत्र चुनें.', de: 'Bitte wähle mindestens einen Fokusbereich.' }[k],
        readMore: { en: 'Read More', fa: 'ادامه مطلب', fr: 'Lire la suite', ptBR: 'Leia mais', ptPT: 'Leia mais', ar: 'اقرأ المزيد', hi: 'और पढ़ें', de: 'Weiterlesen' }[k],
        legal: {
          terms: { en: "I agree to Terms & Privacy.", fa: "با شرایط و قوانین موافقم.", fr: "J'accepte les conditions.", ptBR: "Concordo com os Termos.", ptPT: "Concordo com os Termos.", ar: "أوافق على الشروط.", hi: "मैं शर्तों से सहमत हूं।", de: "Ich stimme den Bedingungen & Datenschutz zu." }[k],
          age: { en: "I am 18+ years old.", fa: "بالای ۱۸ سال سن دارم.", fr: "J'ai plus de 18 ans.", ptBR: "Tenho mais de 18 anos.", ptPT: "Tenho mais de 18 anos.", ar: "عمري 18+.", hi: "मेरी आयु 18+ है।", de: "Ich bin über 18 Jahre alt." }[k],
          entertainment: { en: "For entertainment only.", fa: "فقط برای سرگرمی.", fr: "Pour divertissement uniquement.", ptBR: "Apenas para entretenimento.", ptPT: "Apenas para entretenimento.", ar: "للترفيه فقط.", hi: "केवल मनोरंजन के लिए।", de: "Nur zur Unterhaltung." }[k]
        },
        modules: {
            [ModuleType.LOVE]: {
                title: { en: 'Mystical Love', fa: 'فال عشق و ازدواج', fr: 'Amour Mystique', ptBR: 'Amor Místico', ptPT: 'Amor Místico', ar: 'الحب الصوفي', hi: 'रहस्यमय प्रेम', de: 'Mystische Liebe' }[k],
                desc: { en: 'Discover emotional truths.', fa: 'رازهای قلب و سرنوشت.', fr: 'Découvrez les vérités émotionnelles.', ptBR: 'Descubra verdades emocionais.', ptPT: 'Descubra verdades emocionais.', ar: 'اكتشف حقائق عاطفية.', hi: 'भावनात्मक सत्य खोजें।', de: 'Entdecke emotionale Wahrheiten.' }[k],
                fields: {
                    partnerName: { en: 'Partner Name', fa: 'نام طرف مقابل', fr: 'Nom du Partenaire', ptBR: 'Nome do Parceiro', ptPT: 'Nome do Parceiro', ar: 'اسم الشريك', hi: 'साथी का نام', de: 'Name des Partners' }[k],
                    partnerBirthDate: { en: 'Partner Birth Date', fa: 'تولد طرف مقابل', fr: 'Date Naissance Partenaire', ptBR: 'Nascimento do Parceiro', ptPT: 'Nascimento do Parceiro', ar: 'تاريخ ميلاد الشريك', hi: 'साथी की जन्म तिथि', de: 'Geburtsdatum des Partners' }[k],
                    relationshipStatus: {
                        label: { en: 'Relationship Status', fa: 'وضعیت رابطه', fr: 'Statut Relationnel', ptBR: 'Status do Relacionamento', ptPT: 'Estado do Relacionamento', ar: 'حالة العلاقة', hi: 'रिश्ते की स्थिति', de: 'Beziehungsstatus' }[k],
                        opts: {
                            dating: { en: 'Getting to know', fa: 'آشنایی', fr: 'Apprendre à se connaître', ptBR: 'Nos conhecendo', ptPT: 'A conhecer-nos', ar: 'التعارف', hi: 'जान-पहचान', de: 'Kennenlernen' }[k],
                            relationship: { en: 'In a relationship', fa: 'در رابطه', fr: 'En couple', ptBR: 'Em um relacionamento', ptPT: 'Numa relação', ar: 'في علاقة', hi: 'रिश्ते में', de: 'In einer Beziehung' }[k],
                            breakup: { en: 'Separated', fa: 'جدا شده', fr: 'Séparé', ptBR: 'Separado', ptPT: 'Separado', ar: 'منفصل', hi: 'الگا हुआ', de: 'Getrennt' }[k],
                            oneSided: { en: 'One-sided love', fa: 'عشق یک طرفه', fr: 'Amour à sens unique', ptBR: 'Amor não correspondido', ptPT: 'Amor não correspondido', ar: 'حب من طرف واحد', hi: 'एक तरफा प्यार', de: 'Einseitige Liebe' }[k]
                        }
                    },
                    feelingsTowardsPartner: {
                        label: { en: 'Your Feelings', fa: 'احساسات شما', fr: 'Vos Sentiments', ptBR: 'Seus Sentimentos', ptPT: 'Os Seus Sentimentos', ar: 'مشاعرك', hi: 'आपकी भावनाएं', de: 'Deine Gefühle' }[k],
                        opts: {
                            love: { en: 'Deeply in love', fa: 'عاشقانه', fr: 'Profondément amoureux', ptBR: 'Profundamente apaixonado', ptPT: 'Profundamente apaixonado', ar: 'حب عميق', hi: 'गहरे प्यार में', de: 'Tief verliebt' }[k],
                            attracted: { en: 'Strongly attracted', fa: 'کشش شدید دارم', fr: 'Très attiré(e)', ptBR: 'Muito atraído(a)', ptPT: 'Muito atraído(a)', ar: 'منجذب بشدة', hi: 'गहरा आकर्षण महसूस करता/करती हूँ', de: 'Stark angezogen' }[k],
                            curious: { en: 'Curious and interested', fa: 'کنجکاو و علاقه‌مندم', fr: 'Curieux(se) et intéressé(e)', ptBR: 'Curioso(a) e interessado(a)', ptPT: 'Curioso(a) e interessado(a)', ar: 'فضولي ومهتم', hi: 'जिज्ञासु और रुचि रखता/रखती हूँ', de: 'Neugierig und interessiert' }[k],
                            hopeful: { en: 'Hopeful', fa: 'امیدوارم', fr: 'Plein(e) d’espoir', ptBR: 'Esperançoso(a)', ptPT: 'Esperançoso(a)', ar: 'متفائل', hi: 'आशावान', de: 'Hoffnungsvoll' }[k],
                            attached: { en: 'Emotionally attached', fa: 'وابستگی عاطفی دارم', fr: 'Attaché(e) émotionnellement', ptBR: 'Emocionalmente apegado(a)', ptPT: 'Emocionalmente apegado(a)', ar: 'مرتبط عاطفياً', hi: 'भावनात्मक रूप से जुड़ा/जुड़ी हूँ', de: 'Emotional gebunden' }[k],
                            emotionally_safe: { en: 'Safe and comfortable', fa: 'کنارش احساس امنیت و آرامش دارم', fr: 'En sécurité et à l’aise', ptBR: 'Seguro(a) e confortável', ptPT: 'Seguro(a) e confortável', ar: 'أشعر بالأمان والراحة', hi: 'सुरक्षित और सहज महसूस करता/करती हूँ', de: 'Sicher und geborgen' }[k],
                            missing_them: { en: 'Missing them', fa: 'دلتنگشم', fr: 'Il/elle me manque', ptBR: 'Sinto saudade', ptPT: 'Sinto saudade', ar: 'أشتاق إليه/إليها', hi: 'उनकी याद आती है', de: 'Ich vermisse sie/ihn' }[k],
                            longing: { en: 'Longing for them', fa: 'اشتیاق عمیق دارم', fr: 'Je le/la désire profondément', ptBR: 'Sinto muita vontade de estar perto', ptPT: 'Sinto muita vontade de estar perto', ar: 'أشعر بشوق عميق', hi: 'उनके लिए गहरी चाहत है', de: 'Tiefe Sehnsucht' }[k],
                            nostalgic: { en: 'Nostalgic', fa: 'درگیر خاطرات گذشته‌ام', fr: 'Nostalgique', ptBR: 'Nostálgico(a)', ptPT: 'Nostálgico(a)', ar: 'حنين للماضي', hi: 'पुरानी यादों में हूँ', de: 'Nostalgisch' }[k],
                            mixed_feelings: { en: 'Mixed feelings', fa: 'احساسات ضدونقیض دارم', fr: 'Sentiments partagés', ptBR: 'Sentimentos mistos', ptPT: 'Sentimentos mistos', ar: 'مشاعر مختلطة', hi: 'मिश्रित भावनाएँ', de: 'Gemischte Gefühle' }[k],
                            uncertain: { en: 'Uncertain', fa: 'مطمئن نیستم', fr: 'Incertain(e)', ptBR: 'Incerto(a)', ptPT: 'Incerto(a)', ar: 'غير متأكد', hi: 'अनिश्चित', de: 'Unsicher' }[k],
                            distant: { en: 'Distant', fa: 'احساس دوری', fr: 'Distant', ptBR: 'Distante', ptPT: 'Distante', ar: 'بعيد', hi: 'दूर', de: 'Distanziert' }[k],
                            confused: { en: 'Confused', fa: 'گیج', fr: 'Confus', ptBR: 'Confuso', ptPT: 'Confuso', ar: 'مشوش', hi: 'उलझन में', de: 'Verwirrt' }[k],
                            hurt: { en: 'Hurt', fa: 'آسیب دیده‌ام', fr: 'Blessé(e)', ptBR: 'Magoado(a)', ptPT: 'Magoado(a)', ar: 'مجروح عاطفياً', hi: 'आहत', de: 'Verletzt' }[k],
                            disappointed: { en: 'Disappointed', fa: 'ناامید و دلخورم', fr: 'Déçu(e)', ptBR: 'Decepcionado(a)', ptPT: 'Desiludido(a)', ar: 'خائب الأمل', hi: 'निराश', de: 'Enttäuscht' }[k],
                            angry: { en: 'Angry', fa: 'عصبانی‌ام', fr: 'En colère', ptBR: 'Com raiva', ptPT: 'Com raiva', ar: 'غاضب', hi: 'गुस्सा', de: 'Wütend' }[k],
                            jealous: { en: 'Jealous', fa: 'حسادت دارم', fr: 'Jaloux(se)', ptBR: 'Com ciúmes', ptPT: 'Com ciúmes', ar: 'غيور', hi: 'ईर्ष्या महसूस करता/करती हूँ', de: 'Eifersüchtig' }[k],
                            afraid_of_losing: { en: 'Afraid of losing them', fa: 'می‌ترسم از دستش بدهم', fr: 'Peur de le/la perdre', ptBR: 'Com medo de perder', ptPT: 'Com medo de perder', ar: 'أخاف أن أفقده/أفقدها', hi: 'उन्हें खोने का डर है', de: 'Angst, sie/ihn zu verlieren' }[k],
                            insecure: { en: 'Insecure', fa: 'احساس ناامنی دارم', fr: 'Insécure', ptBR: 'Inseguro(a)', ptPT: 'Inseguro(a)', ar: 'غير آمن عاطفياً', hi: 'असुरक्षित महसूस करता/करती हूँ', de: 'Unsicher' }[k],
                            emotionally_tired: { en: 'Emotionally tired', fa: 'از نظر احساسی خسته‌ام', fr: 'Fatigué(e) émotionnellement', ptBR: 'Emocionalmente cansado(a)', ptPT: 'Emocionalmente cansado(a)', ar: 'مرهق عاطفياً', hi: 'भावनात्मक रूप से थका/थकी हूँ', de: 'Emotional erschöpft' }[k],
                            numb: { en: 'Emotionally numb', fa: 'بی‌حس شده‌ام', fr: 'Émotionnellement engourdi(e)', ptBR: 'Emocionalmente anestesiado(a)', ptPT: 'Emocionalmente dormente', ar: 'خدر عاطفي', hi: 'भावनात्मक रूप से सुन्न', de: 'Emotional taub' }[k],
                            guilty: { en: 'Guilty', fa: 'احساس گناه دارم', fr: 'Coupable', ptBR: 'Com culpa', ptPT: 'Com culpa', ar: 'أشعر بالذنب', hi: 'दोषी महसूस करता/करती हूँ', de: 'Schuldig' }[k],
                            betrayed: { en: 'Betrayed', fa: 'احساس خیانت‌دیدگی دارم', fr: 'Trahi(e)', ptBR: 'Traído(a)', ptPT: 'Traído(a)', ar: 'أشعر بالخيانة', hi: 'विश्वासघात महसूस करता/करती हूँ', de: 'Betrogen' }[k],
                            cant_stop_thinking: { en: "Can't stop thinking about them", fa: 'نمی‌توانم به او فکر نکنم', fr: 'Je n’arrive pas à arrêter d’y penser', ptBR: 'Não consigo parar de pensar nessa pessoa', ptPT: 'Não consigo parar de pensar nessa pessoa', ar: 'لا أستطيع التوقف عن التفكير به/بها', hi: 'उनके बारे में सोचना बंद नहीं कर पा रहा/रही', de: 'Ich kann nicht aufhören, an sie/ihn zu denken' }[k],
                            needing_closure: { en: 'Needing closure', fa: 'نیاز به پایان‌بندی و روشن شدن دارم', fr: 'Besoin de clarté pour tourner la page', ptBR: 'Preciso de encerramento', ptPT: 'Preciso de encerramento', ar: 'أحتاج إلى خاتمة ووضوح', hi: 'समापन और स्पष्टता चाहिए', de: 'Ich brauche Abschluss' }[k],
                            wanting_commitment: { en: 'Wanting commitment', fa: 'تعهد جدی می‌خواهم', fr: 'Envie d’engagement', ptBR: 'Quero compromisso', ptPT: 'Quero compromisso', ar: 'أريد التزاماً', hi: 'प्रतिबद्धता चाहता/चाहती हूँ', de: 'Ich wünsche mir Verbindlichkeit' }[k],
                            wanting_space: { en: 'Wanting space', fa: 'به فاصله و فضا نیاز دارم', fr: 'Besoin d’espace', ptBR: 'Preciso de espaço', ptPT: 'Preciso de espaço', ar: 'أحتاج إلى مساحة', hi: 'मुझे दूरी और जगह चाहिए', de: 'Ich brauche Freiraum' }[k],
                            healing: { en: 'Healing', fa: 'در حال ترمیمم', fr: 'En guérison', ptBR: 'Em processo de cura', ptPT: 'Em processo de cura', ar: 'في مرحلة شفاء', hi: 'ठीक होने की प्रक्रिया में हूँ', de: 'In Heilung' }[k],
                            ready_to_move_on: { en: 'Ready to move on', fa: 'آماده‌ام عبور کنم', fr: 'Prêt(e) à avancer', ptBR: 'Pronto(a) para seguir em frente', ptPT: 'Pronto(a) para seguir em frente', ar: 'مستعد للمضي قدماً', hi: 'आगे बढ़ने के लिए तैयार', de: 'Bereit weiterzugehen' }[k]
                        }
                    },
                    bigQuestion: { en: 'Biggest Question', fa: 'بزرگترین سوال', fr: 'Grande Question', ptBR: 'Maior Pergunta', ptPT: 'Maior Pergunta', ar: 'السؤال الأكبر', hi: 'सबसे बड़ा سوال', de: 'Größte Frage' }[k]
                }
            },
            [ModuleType.CAFE]: {
                title: { en: 'Coffee Reading', fa: 'فال قهوه', fr: 'Marc de Café', ptBR: 'Leitura de Café', ptPT: 'Leitura de Café', ar: 'قراءة الفنجان', hi: 'कॉفی रीडिंग', de: 'Kaffeesatzlesen' }[k],
                desc: { en: 'Foresee your future.', fa: 'پیشگویی آینده.', fr: 'Prévoyez votre avenir.', ptBR: 'Preveja seu futuro.', ptPT: 'Preveja o seu futuro.', ar: 'توقع مستقبلك.', hi: 'अपने भविष्य को देखें।', de: 'Sieh deine Zukunft vorher.' }[k],
                fields: {
                    currentEmotion: {
                        label: { en: 'Current Emotion', fa: 'احساس فعلی', fr: 'Émotion Actuelle', ptBR: 'Emoção Atual', ptPT: 'Emoção Atual', ar: 'الشعور الحالي', hi: 'वर्तमान भावना', de: 'Aktuelle Emotion' }[k],
                        opts: {
                            calm: { en: 'Calm', fa: 'آرام', fr: 'Calme', ptBR: 'Calmo', ptPT: 'Calmo', ar: 'هادئ', hi: 'शांत', de: 'Ruhig' }[k],
                            anxious: { en: 'Anxious', fa: 'مضطرب', fr: 'Anxieux', ptBR: 'Ansioso', ptPT: 'Ansioso', ar: 'قلق', hi: 'चिंतित', de: 'Ängstlich' }[k],
                            hopeful: { en: 'Hopeful', fa: 'امیدوار', fr: 'Plein(e) d’espoir', ptBR: 'Esperançoso(a)', ptPT: 'Esperançoso(a)', ar: 'متفائل', hi: 'आशावान', de: 'Hoffnungsvoll' }[k],
                            confused: { en: 'Confused', fa: 'سردرگم', fr: 'Confus(e)', ptBR: 'Confuso(a)', ptPT: 'Confuso(a)', ar: 'مشوش', hi: 'उलझन में', de: 'Verwirrt' }[k],
                            sad: { en: 'Sad', fa: 'غمگین', fr: 'Triste', ptBR: 'Triste', ptPT: 'Triste', ar: 'حزين', hi: 'उदास', de: 'Traurig' }[k],
                            lonely: { en: 'Lonely', fa: 'تنها', fr: 'Seul(e)', ptBR: 'Solitário(a)', ptPT: 'Solitário(a)', ar: 'وحيد', hi: 'अकेला/अकेली', de: 'Einsam' }[k],
                            heartbroken: { en: 'Heartbroken', fa: 'دل‌شکسته', fr: 'Le cœur brisé', ptBR: 'De coração partido', ptPT: 'De coração partido', ar: 'مكسور القلب', hi: 'दिल टूटा हुआ', de: 'Mit gebrochenem Herzen' }[k],
                            nostalgic: { en: 'Nostalgic', fa: 'درگیر خاطرات', fr: 'Nostalgique', ptBR: 'Nostálgico(a)', ptPT: 'Nostálgico(a)', ar: 'حنين للماضي', hi: 'पुरानी यादों में', de: 'Nostalgisch' }[k],
                            stressed: { en: 'Stressed', fa: 'تحت فشار', fr: 'Stressé(e)', ptBR: 'Estressado(a)', ptPT: 'Stressado(a)', ar: 'متوتر', hi: 'तनाव में', de: 'Gestresst' }[k],
                            overwhelmed: { en: 'Overwhelmed', fa: 'درهم‌ریخته', fr: 'Submergé(e)', ptBR: 'Sobrecarregado(a)', ptPT: 'Sobrecarregado(a)', ar: 'مرهق ومثقل', hi: 'बहुत दबाव में', de: 'Überfordert' }[k],
                            tired: { en: 'Tired', fa: 'خسته', fr: 'Fatigué(e)', ptBR: 'Cansado(a)', ptPT: 'Cansado(a)', ar: 'متعب', hi: 'थका/थकी हुआ', de: 'Müde' }[k],
                            restless: { en: 'Restless', fa: 'بی‌قرار', fr: 'Agité(e)', ptBR: 'Inquieto(a)', ptPT: 'Inquieto(a)', ar: 'قلق وغير مستقر', hi: 'बेचैन', de: 'Unruhig' }[k],
                            stuck: { en: 'Stuck', fa: 'گیر کرده', fr: 'Bloqué(e)', ptBR: 'Travado(a)', ptPT: 'Bloqueado(a)', ar: 'عالق', hi: 'अटका/अटकी हुआ', de: 'Festgefahren' }[k],
                            waiting: { en: 'Waiting for something', fa: 'منتظر اتفاقی هستم', fr: 'Dans l’attente de quelque chose', ptBR: 'Esperando algo acontecer', ptPT: 'À espera de algo', ar: 'أنتظر شيئاً ما', hi: 'किसी चीज़ का इंतज़ार', de: 'Ich warte auf etwas' }[k],
                            afraid: { en: 'Afraid', fa: 'ترسیده', fr: 'Effrayé(e)', ptBR: 'Com medo', ptPT: 'Com medo', ar: 'خائف', hi: 'डरा/डरी हुआ', de: 'Ängstlich' }[k],
                            angry: { en: 'Angry', fa: 'عصبانی', fr: 'En colère', ptBR: 'Com raiva', ptPT: 'Com raiva', ar: 'غاضب', hi: 'गुस्सा', de: 'Wütend' }[k],
                            vulnerable: { en: 'Vulnerable', fa: 'آسیب‌پذیر', fr: 'Vulnérable', ptBR: 'Vulnerável', ptPT: 'Vulnerável', ar: 'هش وضعيف', hi: 'नाज़ुक महसूस कर रहा/रही', de: 'Verletzlich' }[k],
                            curious: { en: 'Curious', fa: 'کنجکاو', fr: 'Curieux(se)', ptBR: 'Curioso(a)', ptPT: 'Curioso(a)', ar: 'فضولي', hi: 'जिज्ञासु', de: 'Neugierig' }[k],
                            grateful: { en: 'Grateful', fa: 'شکرگزار', fr: 'Reconnaissant(e)', ptBR: 'Grato(a)', ptPT: 'Grato(a)', ar: 'ممتن', hi: 'आभारी', de: 'Dankbar' }[k],
                            peaceful: { en: 'Peaceful', fa: 'در صلح و آرامش', fr: 'Paisible', ptBR: 'Em paz', ptPT: 'Em paz', ar: 'هادئ ومطمئن', hi: 'शांतिपूर्ण', de: 'Friedlich' }[k],
                            excited: { en: 'Excited', fa: 'هیجان‌زده', fr: 'Excité(e)', ptBR: 'Animado(a)', ptPT: 'Entusiasmado(a)', ar: 'متحمس', hi: 'उत्साहित', de: 'Aufgeregt' }[k],
                            determined: { en: 'Determined', fa: 'مصمم', fr: 'Déterminé(e)', ptBR: 'Determinado(a)', ptPT: 'Determinado(a)', ar: 'مصمم', hi: 'दृढ़ निश्चयी', de: 'Entschlossen' }[k],
                            blocked: { en: 'Blocked', fa: 'مسدود و بسته', fr: 'Bloqué(e) intérieurement', ptBR: 'Bloqueado(a)', ptPT: 'Bloqueado(a)', ar: 'مسدود داخلياً', hi: 'रुका हुआ', de: 'Blockiert' }[k],
                            needing_clarity: { en: 'Needing clarity', fa: 'نیاز به روشن شدن دارم', fr: 'Besoin de clarté', ptBR: 'Preciso de clareza', ptPT: 'Preciso de clareza', ar: 'أحتاج إلى وضوح', hi: 'स्पष्टता चाहिए', de: 'Ich brauche Klarheit' }[k],
                            ready_for_change: { en: 'Ready for change', fa: 'آماده تغییرم', fr: 'Prêt(e) au changement', ptBR: 'Pronto(a) para mudar', ptPT: 'Pronto(a) para mudar', ar: 'مستعد للتغيير', hi: 'बदलाव के लिए तैयार', de: 'Bereit für Veränderung' }[k]
                        }
                    },
                    lifeArea: {
                        label: { en: 'Focus Area', fa: 'تـمرکز', fr: 'Domaine', ptBR: 'Área de Foco', ptPT: 'Área de Foco', ar: 'مجال التركيز', hi: 'فوقس क्षेत्र', de: 'Fokusbereich' }[k],
                        opts: {
                            love: { en: 'Love', fa: 'عشق', fr: 'Amour', ptBR: 'Amor', ptPT: 'Amor', ar: 'الحب', hi: 'प्याر', de: 'Liebe' }[k],
                            career: { en: 'Career', fa: 'شغل', fr: 'Carrière', ptBR: 'Carreira', ptPT: 'Carreira', ar: 'العمل', hi: 'कैरियर', de: 'Karriere' }[k],
                            health: { en: 'Health', fa: 'سلامتی', fr: 'Santé', ptBR: 'Saúde', ptPT: 'Saúde', ar: 'الصحة', hi: 'स्वास्थ्य', de: 'Gesundheit' }[k],
                            spirituality: { en: 'Spirituality', fa: 'معنویت', fr: 'Spiritualité', ptBR: 'Espiritualidade', ptPT: 'Espiritualidade', ar: 'الروحانية', hi: 'अध्यात्म', de: 'Spiritualität' }[k],
                            money_finance: { en: 'Money & finances', fa: 'پول و مسائل مالی', fr: 'Argent et finances', ptBR: 'Dinheiro e finanças', ptPT: 'Dinheiro e finanças', ar: 'المال والشؤون المالية', hi: 'धन और वित्त', de: 'Geld und Finanzen' }[k],
                            family: { en: 'Family', fa: 'خانواده', fr: 'Famille', ptBR: 'Família', ptPT: 'Família', ar: 'العائلة', hi: 'परिवार', de: 'Familie' }[k],
                            education: { en: 'Education & exams', fa: 'تحصیل و امتحان', fr: 'Études et examens', ptBR: 'Estudos e provas', ptPT: 'Estudos e exames', ar: 'الدراسة والامتحانات', hi: 'शिक्षा और परीक्षा', de: 'Bildung und Prüfungen' }[k],
                            migration: { en: 'Migration or relocation', fa: 'مهاجرت یا جابه‌جایی', fr: 'Migration ou déménagement', ptBR: 'Migração ou mudança', ptPT: 'Migração ou mudança', ar: 'الهجرة أو الانتقال', hi: 'प्रवास या स्थान परिवर्तन', de: 'Migration oder Umzug' }[k],
                            home: { en: 'Home & stability', fa: 'خانه و ثبات', fr: 'Foyer et stabilité', ptBR: 'Casa e estabilidade', ptPT: 'Casa e estabilidade', ar: 'البيت والاستقرار', hi: 'घर और स्थिरता', de: 'Zuhause und Stabilität' }[k],
                            decision: { en: 'Important decision', fa: 'تصمیم مهم', fr: 'Décision importante', ptBR: 'Decisão importante', ptPT: 'Decisão importante', ar: 'قرار مهم', hi: 'महत्वपूर्ण निर्णय', de: 'Wichtige Entscheidung' }[k],
                            personal_growth: { en: 'Personal growth', fa: 'رشد شخصی', fr: 'Croissance personnelle', ptBR: 'Crescimento pessoal', ptPT: 'Crescimento pessoal', ar: 'النمو الشخصي', hi: 'व्यक्तिगत विकास', de: 'Persönliches Wachstum' }[k],
                            friendship_social: { en: 'Friendships & social life', fa: 'دوستی و روابط اجتماعی', fr: 'Amitiés et vie sociale', ptBR: 'Amizades e vida social', ptPT: 'Amizades e vida social', ar: 'الصداقات والحياة الاجتماعية', hi: 'दोस्ती और सामाजिक जीवन', de: 'Freundschaften und Sozialleben' }[k],
                            marriage_commitment: { en: 'Marriage or commitment', fa: 'ازدواج یا تعهد', fr: 'Mariage ou engagement', ptBR: 'Casamento ou compromisso', ptPT: 'Casamento ou compromisso', ar: 'الزواج أو الالتزام', hi: 'विवाह या प्रतिबद्धता', de: 'Ehe oder Verbindlichkeit' }[k],
                            children: { en: 'Children or parenting', fa: 'فرزند یا والدگری', fr: 'Enfants ou parentalité', ptBR: 'Filhos ou parentalidade', ptPT: 'Filhos ou parentalidade', ar: 'الأطفال أو التربية', hi: 'बच्चे या पालन-पोषण', de: 'Kinder oder Elternschaft' }[k],
                            future_timing: { en: 'Future timing', fa: 'زمان‌بندی آینده', fr: 'Timing du futur', ptBR: 'Tempo certo no futuro', ptPT: 'Timing do futuro', ar: 'توقيت المستقبل', hi: 'भविष्य का समय', de: 'Zeitfenster der Zukunft' }[k],
                            protection_energy: { en: 'Protection & energy', fa: 'محافظت و انرژی', fr: 'Protection et énergie', ptBR: 'Proteção e energia', ptPT: 'Proteção e energia', ar: 'الحماية والطاقة', hi: 'सुरक्षा और ऊर्जा', de: 'Schutz und Energie' }[k],
                            all_mixed: { en: 'A mix of everything', fa: 'ترکیبی از همه', fr: 'Un mélange de tout', ptBR: 'Um pouco de tudo', ptPT: 'Um pouco de tudo', ar: 'مزيج من كل شيء', hi: 'सबका मिश्रण', de: 'Eine Mischung aus allem' }[k]
                        }
                    },
                    openAdvice: { en: 'Open to advice?', fa: 'پذیرش نصیحت؟', fr: 'Ouvert aux conseils ?', ptBR: 'Aberto a conselhos?', ptPT: 'Aberto a conselhos?', ar: 'متقبل للنصيحة؟', hi: 'सलाह के लिए खुले हैं?', de: 'Offen für Ratschläge?' }[k],
                    bigQuestion: { en: 'Your Question', fa: 'سوال شما', fr: 'Votre Question', ptBR: 'Sua Pergunta', ptPT: 'A Sua Pergunta', ar: 'سؤالك', hi: 'आपका प्रश्न', de: 'Deine Frage' }[k]
                }
            },
            [ModuleType.WEALTH]: {
                title: { en: 'Wealth & Abundance', fa: 'جذب ثروت', fr: 'Richesse & Abondance', ptBR: 'Riqueza e Abundância', ptPT: 'Riqueza e Abundância', ar: 'الثروة والوفرة', hi: 'धन और प्रचुरता', de: 'Wohlstand & Fülle' }[k],
                desc: { en: 'Unlock financial secrets.', fa: 'کشف رازهای مالی.', fr: 'Débloquez les secrets financiers.', ptBR: 'Desbloqueie segredos financeiros.', ptPT: 'Desbloqueie segredos financeiros.', ar: 'افتح أسرار المال.', hi: 'वित्तीय रहस्य खोलें।', de: 'Entsperre finanzielle Geheimnisse.' }[k],
                fields: {
                    location: { en: 'City & Country', fa: 'شهر و کشور', fr: 'Ville et pays', ptBR: 'Cidade e país', ptPT: 'Cidade e país', ar: 'المدينة والبلد', hi: 'शहर और देश', de: 'Stadt und Land' }[k],
                    financialWish: { en: 'Financial Wish', fa: 'آرزوی مالی', fr: 'Vœu Financier', ptBR: 'Desejo Financeiro', ptPT: 'Desejo Financeiro', ar: 'أمنية مالية', hi: 'वित्तीय इच्छा', de: 'Finanzieller Wunsch' }[k],
                    financialBlockage: { en: 'Perceived Blockage', fa: 'مانع ذهنی', fr: 'Blocage Perçu', ptBR: 'Bloqueio Percebido', ptPT: 'Bloqueio Percebido', ar: 'العائق المتصور', hi: 'रुकावट', de: 'Wahrgenommene Blockade' }[k],
                    desiredEnergy: { en: 'Desired Energy', fa: 'انرژی مورد نظر', fr: 'Énergie Désirée', ptBR: 'Energia Desejada', ptPT: 'Energia Desejada', ar: 'الطاقة المطلوبة', hi: 'वांछित ऊर्जा', de: 'Gewünschte Energie' }[k]
                }
            },
            [ModuleType.TAROT]: {
                title: { en: 'Mystical Tarot', fa: 'تاروت کبیر', fr: 'Tarot Mystique', ptBR: 'Tarot Místico', ptPT: 'Tarot Místico', ar: 'التارو الصوفي', hi: 'रहस्यमय टैरो', de: 'Mystisches Tarot' }[k],
                desc: { en: 'Unlock mysteries.', fa: 'کشف اسرار.', fr: 'Débloquez les mystères.', ptBR: 'Desvende mistérios.', ptPT: 'Desvende mistérios.', ar: 'كشف الأسرار.', hi: 'रहस्यों को खोलें।', de: 'Entschlüssele Geheimnisse.' }[k],
                fields: {
                    tarotFocus: {
                        label: { en: 'Focus Aspect', fa: 'جنبه تمرکز', fr: 'Aspect à explorer', ptBR: 'Aspecto de foco', ptPT: 'Aspeto de foco', ar: 'جانب التركيز', hi: 'केंद्रित पहलू', de: 'Fokusbereich' }[k],
                        opts: {
                            love: { en: 'Love', fa: 'عشق', fr: 'Amour', ptBR: 'Amor', ptPT: 'Amor', ar: 'الحب', hi: 'प्रेम', de: 'Liebe' }[k],
                            career: { en: 'Career', fa: 'شغل و کار', fr: 'Carrière', ptBR: 'Carreira', ptPT: 'Carreira', ar: 'العمل', hi: 'करियर', de: 'Karriere' }[k],
                            health: { en: 'Health', fa: 'سلامتی', fr: 'Santé', ptBR: 'Saúde', ptPT: 'Saúde', ar: 'الصحة', hi: 'स्वास्थ्य', de: 'Gesundheit' }[k],
                            spirituality: { en: 'Spirituality', fa: 'معنویت', fr: 'Spiritualité', ptBR: 'Espiritualidade', ptPT: 'Espiritualidade', ar: 'الروحانية', hi: 'अध्यात्म', de: 'Spiritualität' }[k]
                        }
                    },
                    situationSummary: { en: 'Briefly describe your situation', fa: 'وضعیت یا سوال خود را توضیح دهید', fr: 'Décrivez brièvement votre situation', ptBR: 'Descreva brevemente sua situação', ptPT: 'Descreva brevemente a sua situação', ar: 'صف وضعك باختصار', hi: 'अपनी स्थिति का संक्षिप्त वर्णन करें', de: 'Beschreibe kurz deine Situation' }[k],
                    currentEmotion: {
                        label: { en: 'How are you feeling right now?', fa: 'الان چه احساسی دارید؟', fr: 'Comment vous sentez-vous ?', ptBR: 'Como você está se sentindo?', ptPT: 'Como se sente agora?', ar: 'كيف تشعر الآن؟', hi: 'आप अभी कैसा महसूस कर रहे हैं?', de: 'Wie fühlst du dich gerade?' }[k],
                        opts: {
                            confused: { en: 'Confused', fa: 'سردرگم', fr: 'Confus(e)', ptBR: 'Confuso(a)', ptPT: 'Confuso(a)', ar: 'مشوش', hi: 'उलझन में', de: 'Verwirrt' }[k],
                            hopeful: { en: 'Hopeful', fa: 'امیدوار', fr: 'Plein(e) d’espoir', ptBR: 'Esperançoso(a)', ptPT: 'Esperançoso(a)', ar: 'متفائل', hi: 'आशावान', de: 'Hoffnungsvoll' }[k],
                            anxious: { en: 'Anxious', fa: 'مضطرب', fr: 'Anxieux(se)', ptBR: 'Ansioso(a)', ptPT: 'Ansioso(a)', ar: 'قلق', hi: 'चिंतित', de: 'Ängstlich' }[k],
                            grateful: { en: 'Grateful', fa: 'شکرگزار', fr: 'Reconnaissant(e)', ptBR: 'Grato(a)', ptPT: 'Grato(a)', ar: 'ممتن', hi: 'आभारी', de: 'Dankbar' }[k]
                        }
                    }
                }
            },
            [ModuleType.DREAM]: {
                title: { en: 'Dream Interpret', fa: 'تعبیر خواب', fr: 'Interprétation Rêves', ptBR: 'Interpretação Sonhos', ptPT: 'Interpretação Sonhos', ar: 'تفسير الأحلام', hi: 'स्वप्न व्याख्या', de: 'Traumdeutung' }[k],
                desc: { en: 'Hidden messages.', fa: 'پیام‌های پنهان.', fr: 'Messages cachés.', ptBR: 'Mensagens ocultas.', ptPT: 'Mensagens ocultas.', ar: 'رسائل خفية.', hi: 'छिपे हुए संदेश।', de: 'Verborgene Botschaften.' }[k],
                fields: {
                    location: { en: 'Where do you live?', fa: 'کجا زندگی می‌کنید؟', fr: 'Où vivez-vous ?', ptBR: 'Onde você mora?', ptPT: 'Onde vive?', ar: 'أين تعيش؟', hi: 'आप कहाँ रहते हैं?', de: 'Wo lebst du?' }[k],
                    dreamDate: { en: 'Dream Date', fa: 'تاریخ خواب', fr: 'Date du Rêve', ptBR: 'Data do Sonho', ptPT: 'Data do Sonho', ar: 'تاريخ الحلم', hi: 'स्वप्न तिथि', de: 'Traumdatum' }[k],
                    dreamDescription: { en: 'Describe the dream in detail', fa: 'خواب را با جزئیات شرح دهید', fr: 'Décrivez le rêve en détail', ptBR: 'Descreva o sonho em detalhes', ptPT: 'Descreva o sonho em detalhe', ar: 'صف الحلم بالتفصيل', hi: 'सपने का विस्तार से वर्णन करें', de: 'Beschreibe den Traum im Detail' }[k],
                    dreamEmotion: { en: 'Emotion during the dream', fa: 'احساس هنگام خواب', fr: 'Émotion pendant le rêve', ptBR: 'Emoção durante o sonho', ptPT: 'Emoção durante o sonho', ar: 'الشعور أثناء الحلم', hi: 'सपने के दौरान भावना', de: 'Gefühl im Traum' }[k],
                    isRecurringDream: {
                        label: { en: 'Recurring?', fa: 'تکرار شونده؟', fr: 'Récurrent ?', ptBR: 'Recorrente?', ptPT: 'Recorrente?', ar: 'متكرر؟', hi: 'आवर्ती?', de: 'Wiederkehrend?' }[k],
                        opts: { yes: { en: 'Yes', fa: 'بله', fr: 'Oui', ptBR: 'Sim', ptPT: 'Sim', ar: 'نعم', hi: 'हाँ', de: 'Ja' }[k], no: { en: 'No', fa: 'خیر', fr: 'Non', ptBR: 'Não', ptPT: 'Não', ar: 'لا', hi: 'नहीं', de: 'Nein' }[k] }
                    },
                    interpretationStyle: {
                        label: { en: 'Style', fa: 'سبک تعبیر', fr: 'Style', ptBR: 'Estilo', ptPT: 'Estilo', ar: 'النمط', hi: 'शैली', de: 'Stil' }[k],
                        opts: { mystical: { en: 'Mystical', fa: 'عرفانی', fr: 'Mystique', ptBR: 'Místico', ptPT: 'Místico', ar: 'صوفي', hi: 'रहस्यमय', de: 'Mystisch' }[k], direct: { en: 'Psychological', fa: 'روانشناسی', fr: 'Psychologique', ptBR: 'Psicológico', ptPT: 'Psicológico', ar: 'نفسي', hi: 'मनोवैज्ञानिक', de: 'Psychologisch' }[k] }
                    }
                }
            },
            [ModuleType.DAILY]: {
                title: { en: 'Daily Oracle', fa: 'اوراکل روزانه', fr: 'Oracle Quotidien', ptBR: 'Oráculo Diário', ptPT: 'Oráculo Diário', ar: 'أوراكل يومي', hi: 'दैनिक ओरैकल', de: 'Tägliches Orakel' }[k],
                desc: { en: 'Guidance for today.', fa: 'راهنمایی امروز.', fr: 'Conseils pour aujourd\'hui.', ptBR: 'Orientação para hoje.', ptPT: 'Orientação para hoje.', ar: 'توجيه لليوم.', hi: 'आज के लिए मार्गदर्शन।', de: 'Führung für heute.' }[k],
                fields: {
                    location: { en: 'City of Residence', fa: 'شهر محل زندگی', fr: 'Ville de résidence', ptBR: 'Cidade de residência', ptPT: 'Cidade de residência', ar: 'مدينة الإقامة', hi: 'निवास का शहर', de: 'Wohnort' }[k],
                    currentEmotion: {
                        label: { en: 'Current Mood', fa: 'حال و هوای فعلی', fr: 'Humeur actuelle', ptBR: 'Humor atual', ptPT: 'Estado de espírito atual', ar: 'المزاج الحالي', hi: 'वर्तमान मनोदशा', de: 'Aktuelle Stimmung' }[k],
                        opts: {
                            hopeful: { en: 'Hopeful', fa: 'امیدوار', fr: 'Plein(e) d’espoir', ptBR: 'Esperançoso(a)', ptPT: 'Esperançoso(a)', ar: 'متفائل', hi: 'आशावान', de: 'Hoffnungsvoll' }[k],
                            anxious: { en: 'Anxious', fa: 'مضطرب', fr: 'Anxieux(se)', ptBR: 'Ansioso(a)', ptPT: 'Ansioso(a)', ar: 'قلق', hi: 'चिंतित', de: 'Ängstlich' }[k],
                            grateful: { en: 'Grateful', fa: 'شکرگزار', fr: 'Reconnaissant(e)', ptBR: 'Grato(a)', ptPT: 'Grato(a)', ar: 'ممتن', hi: 'आभारी', de: 'Dankbar' }[k],
                            confused: { en: 'Confused', fa: 'سردرگم', fr: 'Confus(e)', ptBR: 'Confuso(a)', ptPT: 'Confuso(a)', ar: 'مشوش', hi: 'उलझन में', de: 'Verwirrt' }[k]
                        }
                    },
                    todaysWorry: { en: 'Today\'s Worry', fa: 'نگرانی امروز', fr: 'Souci du jour', ptBR: 'Preocupação de hoje', ptPT: 'Preocupação de hoje', ar: 'قلق اليوم', hi: 'आज की चिंता', de: 'Heutige Sorge' }[k],
                    todaysDesire: { en: 'Today\'s Desire', fa: 'خواسته امروز', fr: 'Désir du jour', ptBR: 'Desejo de hoje', ptPT: 'Desejo de hoje', ar: 'رغبة اليوم', hi: 'आज की इच्छा', de: 'Heutiger Wunsch' }[k]
                }
            },
            [ModuleType.RETURN_LOVE]: {
                title: { en: 'Ex Love', fa: 'عشق سابق', fr: 'Amour avec l’ex', ptBR: 'Amor com Ex', ptPT: 'Amor com Ex', ar: 'حب الشريك السابق', hi: 'पूर्व प्रेम', de: 'Ex-Liebe' }[k],
                desc: { en: 'Will they return?', fa: 'آیا او بازمی‌گردد؟', fr: 'Reviendront-ils ?', ptBR: 'Eles voltarão?', ptPT: 'Eles voltarão?', ar: 'هل سيعودون؟', hi: 'क्या वे वापस आएंगे?', de: 'Werden sie zurückkehren?' }[k],
                fields: {
                    name: { en: 'Your Full Name', fa: 'نام کامل شما', fr: 'Votre nom complet', ptBR: 'Seu nome completo', ptPT: 'O seu nome completo', ar: 'اسمك الكامل', hi: 'आपका पूरा नाम', de: 'Dein vollständiger Name' }[k],
                    birthDate: { en: 'Your Birth Date', fa: 'تاریخ تولد شما', fr: 'Votre date de naissance', ptBR: 'Sua data de nascimento', ptPT: 'A sua data de nascimento', ar: 'تاريخ ميلادك', hi: 'आपकी जन्म तिथि', de: 'Dein Geburtsdatum' }[k],
                    location: { en: 'Where do you currently live?', fa: 'اکنون کجا زندگی می‌کنید؟', fr: 'Où vivez-vous actuellement ?', ptBR: 'Onde você mora atualmente?', ptPT: 'Onde vive atualmente?', ar: 'أين تعيش حالياً؟', hi: 'आप अभी कहाँ रहते हैं?', de: 'Wo lebst du derzeit?' }[k],
                    partnerName: { en: 'Ex-Partner Name', fa: 'نام پارتنر سابق', fr: 'Nom de l’ex-partenaire', ptBR: 'Nome do(a) ex', ptPT: 'Nome do(a) ex', ar: 'اسم الشريك السابق', hi: 'पूर्व साथी का नाम', de: 'Name der Ex-Partnerperson' }[k],
                    partnerBirthDate: { en: 'Ex-Partner Birth Date', fa: 'تاریخ تولد پارتنر سابق', fr: 'Date de naissance de l’ex-partenaire', ptBR: 'Nascimento do(a) ex', ptPT: 'Nascimento do(a) ex', ar: 'تاريخ ميلاد الشريك السابق', hi: 'पूर्व साथी की जन्म तिथि', de: 'Geburtsdatum der Ex-Partnerperson' }[k],
                    partnerGender: { en: 'Ex-Partner Gender', fa: 'جنسیت پارتنر سابق', fr: 'Genre de l’ex-partenaire', ptBR: 'Gênero do(a) ex', ptPT: 'Género do(a) ex', ar: 'جنس الشريك السابق', hi: 'पूर्व साथी का लिंग', de: 'Geschlecht der Ex-Partnerperson' }[k],
                    timeApart: { en: 'Time Apart', fa: 'مدت جدایی', fr: 'Temps Séparé', ptBR: 'Tempo Separado', ptPT: 'Tempo Separado', ar: 'الوقت المنفصل', hi: 'अलग होने का समय', de: 'Getrennte Zeit' }[k],
                    breakupReason: { en: 'Breakup Reason', fa: 'دلیل جدایی', fr: 'Raison Rupture', ptBR: 'Razão do Término', ptPT: 'Razão da Separação', ar: 'سبب الانفصال', hi: 'ब्रेکअप का कारण', de: 'Trennungsgrund' }[k],
                    motherName: { en: 'Your Mother\'s Name (Optional)', fa: 'نام مادر شما (اختیاری)', fr: 'Nom de votre mère (optionnel)', ptBR: 'Nome da sua mãe (opcional)', ptPT: 'Nome da sua mãe (opcional)', ar: 'اسم والدتك (اختياري)', hi: 'आपकी माता का नाम (वैकल्पिक)', de: 'Name deiner Mutter (optional)' }[k],
                    relationshipDesire: { en: 'Your Desire', fa: 'خواسته شما', fr: 'Votre Désir', ptBR: 'Seu Desejo', ptPT: 'O Seu Desejo', ar: 'رغبتك', hi: 'आपकी इच्छा', de: 'Dein Wunsch' }[k]
                }
            },
            [ModuleType.PAST_LIFE]: {
                title: { en: 'Past Life', fa: 'زندگی گذشته', fr: 'Vie Antérieure', ptBR: 'Vidas Passadas', ptPT: 'Vidas Passadas', ar: 'الحياة الماضية', hi: 'पिछला जीवन', de: 'Früheres Leben' }[k],
                desc: { en: 'Who were you?', fa: 'شما چه کسی بودید؟', fr: 'Qui étiez-vous ?', ptBR: 'Quem foi você?', ptPT: 'Quem foi você?', ar: 'من كنت؟', hi: 'तुम कौन थे?', de: 'Wer warst du?' }[k],
                fields: {
                    birthPlace: { en: 'Birth Place', fa: 'محل تولد', fr: 'Lieu de naissance', ptBR: 'Local de nascimento', ptPT: 'Local de nascimento', ar: 'مكان الميلاد', hi: 'जन्म स्थान', de: 'Geburtsort' }[k],
                    location: { en: 'Current Residence', fa: 'محل زندگی فعلی', fr: 'Résidence actuelle', ptBR: 'Residência atual', ptPT: 'Residência atual', ar: 'مكان الإقامة الحالي', hi: 'वर्तमान निवास', de: 'Aktueller Wohnort' }[k],
                    currentEmotion: { en: 'Dominant emotion in current life', fa: 'احساس غالب در زندگی فعلی', fr: 'Émotion dominante dans votre vie actuelle', ptBR: 'Emoção dominante na vida atual', ptPT: 'Emoção dominante na vida atual', ar: 'الشعور الغالب في حياتك الحالية', hi: 'वर्तमान जीवन की प्रमुख भावना', de: 'Vorherrschendes Gefühl im jetzigen Leben' }[k],
                    personalSymbol: { en: 'Personal Symbol', fa: 'نماد شخصی', fr: 'Symbole Personnel', ptBR: 'Símbolo Pessoal', ptPT: 'Símbolo Pessoal', ar: 'رمز شخصي', hi: 'व्यक्तिगत प्रतीक', de: 'Persönliches Symbol' }[k],
                    recurringDream: { en: 'Brief description of a recurring dream', fa: 'شرح کوتاه خواب تکرارشونده', fr: 'Brève description d’un rêve récurrent', ptBR: 'Breve descrição de um sonho recorrente', ptPT: 'Breve descrição de um sonho recorrente', ar: 'وصف قصير لحلم متكرر', hi: 'आवर्ती सपने का संक्षिप्त वर्णन', de: 'Kurze Beschreibung eines wiederkehrenden Traums' }[k],
                    userImage: { en: 'Upload Current Photo (For Soul Mapping)', fa: 'آپلود عکس فعلی (برای نقشه روح)', fr: 'Télécharger une photo actuelle (cartographie de l’âme)', ptBR: 'Enviar foto atual (mapa da alma)', ptPT: 'Carregar foto atual (mapa da alma)', ar: 'ارفع صورة حالية (لرسم خريطة الروح)', hi: 'वर्तमान फोटो अपलोड करें (आत्मा मानचित्रण)', de: 'Aktuelles Foto hochladen (Seelenkartierung)' }[k]
                }
            },
            [ModuleType.NATAL_CHART]: {
                title: { en: 'Natal Chart', fa: 'چارت تولد', fr: 'Thème Astral', ptBR: 'Mapa Astral', ptPT: 'Mapa Astral', ar: 'الخريطة الفلكية', hi: 'जन्म कुंडली', de: 'Geburtshoroskop' }[k],
                desc: { en: 'Your cosmic map.', fa: 'نقشه کیهانی شما.', fr: 'Votre carte cosmique.', ptBR: 'Seu mapa cósmico.', ptPT: 'O seu mapa cósmico.', ar: 'خريطتك الكونية.', hi: 'आपका ब्रह्मांडीय नक्शा।', de: 'Deine kosmische Karte.' }[k],
                fields: {
                    chartYear: {
                        label: { en: 'Which analysis do you want to receive?', fa: 'کدام تحلیل را می‌خواهید دریافت کنید؟', fr: 'Quelle analyse voulez-vous recevoir ?', ptBR: 'Qual análise você quer receber?', ptPT: 'Que análise quer receber?', ar: 'ما التحليل الذي تريد استلامه؟', hi: 'आप कौन सा विश्लेषण चाहते हैं?', de: 'Welche Analyse möchtest du erhalten?' }[k],
                        opts: {
                            '2026': { en: 'Complete 2026 chart, from the beginning to the end of the year', fa: 'چارت کامل سال 2026، از ابتدای سال تا پایان', fr: 'Thème complet 2026', ptBR: 'Mapa completo de 2026', ptPT: 'Mapa completo de 2026', ar: 'خريطة كاملة لعام 2026', hi: 'पूर्ण 2026 चार्ट', de: 'Vollständige Analyse 2026' }[k],
                            '2027': { en: 'Complete 2027 chart', fa: 'چارت کامل سال 2027', fr: 'Thème complet 2027', ptBR: 'Mapa completo de 2027', ptPT: 'Mapa completo de 2027', ar: 'خريطة كاملة لعام 2027', hi: 'पूर्ण 2027 चार्ट', de: 'Vollständige Analyse 2027' }[k],
                            '2026_2027': { en: 'Combined 2026 and 2027 analysis - professional recommendation', fa: 'تحلیل ترکیبی 2026 و 2027 - پیشنهاد حرفه‌ای', fr: 'Analyse combinée 2026 et 2027', ptBR: 'Análise combinada 2026 e 2027', ptPT: 'Análise combinada 2026 e 2027', ar: 'تحليل مدمج 2026 و2027', hi: '2026 और 2027 संयुक्त विश्लेषण', de: 'Kombinierte Analyse 2026 und 2027' }[k]
                        }
                    },
                    name: { en: 'Name you want used in the reading', fa: 'نامی که دوست دارید در تحلیل استفاده شود', fr: 'Nom à utiliser dans l’analyse', ptBR: 'Nome que você quer usar na análise', ptPT: 'Nome que quer usar na análise', ar: 'الاسم الذي تريد استخدامه في التحليل', hi: 'रीडिंग में उपयोग किया जाने वाला नाम', de: 'Name, der in der Deutung verwendet werden soll' }[k],
                    birthTime: { en: 'Birth Time (optional, improves accuracy)', fa: 'ساعت تولد (اختیاری، برای دقت بیشتر)', fr: 'Heure de naissance (optionnelle)', ptBR: 'Hora de nascimento (opcional)', ptPT: 'Hora de nascimento (opcional)', ar: 'وقت الولادة (اختياري)', hi: 'जन्म समय (वैकल्पिक)', de: 'Geburtszeit (optional)' }[k],
                    birthPlace: { en: 'City & Country of Birth', fa: 'شهر و کشور تولد', fr: 'Ville et pays de naissance', ptBR: 'Cidade e país de nascimento', ptPT: 'Cidade e país de nascimento', ar: 'مدينة وبلد الولادة', hi: 'जन्म का शहर और देश', de: 'Geburtsstadt und Land' }[k],
                    birthTimeAccuracy: {
                        label: { en: 'Birth Time Accuracy', fa: 'دقت ساعت تولد', fr: 'Précision de l’heure', ptBR: 'Precisão da hora', ptPT: 'Precisão da hora', ar: 'دقة وقت الولادة', hi: 'जन्म समय की सटीकता', de: 'Genauigkeit der Geburtszeit' }[k],
                        opts: {
                            exact: { en: 'Exact from birth record', fa: 'دقیق طبق مدرک تولد', fr: 'Exacte selon l’acte', ptBR: 'Exata pelo registro', ptPT: 'Exata pelo registo', ar: 'دقيق من السجل', hi: 'रिकॉर्ड के अनुसार सटीक', de: 'Exakt laut Geburtsurkunde' }[k],
                            approximate: { en: 'Approximate', fa: 'تقریبی', fr: 'Approximative', ptBR: 'Aproximada', ptPT: 'Aproximada', ar: 'تقريبي', hi: 'लगभग', de: 'Ungefähr' }[k],
                            unknown: { en: 'Unknown', fa: 'نامشخص', fr: 'Inconnue', ptBR: 'Desconhecida', ptPT: 'Desconhecida', ar: 'غير معروف', hi: 'अज्ञात', de: 'Unbekannt' }[k]
                        }
                    },
                    relationshipStatus: {
                        label: { en: 'Relationship Status', fa: 'وضعیت رابطه عاطفی', fr: 'Statut amoureux', ptBR: 'Status amoroso', ptPT: 'Estado amoroso', ar: 'حالة العلاقة', hi: 'रिश्ते की स्थिति', de: 'Beziehungsstatus' }[k],
                        opts: {
                            single: { en: 'Single', fa: 'مجرد', fr: 'Célibataire', ptBR: 'Solteiro(a)', ptPT: 'Solteiro(a)', ar: 'أعزب', hi: 'अविवाहित', de: 'Single' }[k],
                            dating: { en: 'Dating / getting to know someone', fa: 'در مرحله آشنایی', fr: 'Rencontre / découverte', ptBR: 'Conhecendo alguém', ptPT: 'A conhecer alguém', ar: 'في مرحلة التعارف', hi: 'किसी को जान रहे हैं', de: 'Dating / Kennenlernen' }[k],
                            relationship: { en: 'In a relationship', fa: 'در رابطه', fr: 'En couple', ptBR: 'Em relacionamento', ptPT: 'Numa relação', ar: 'في علاقة', hi: 'रिश्ते में', de: 'In einer Beziehung' }[k],
                            married: { en: 'Married / committed partnership', fa: 'ازدواج یا رابطه جدی', fr: 'Marié / engagé', ptBR: 'Casamento / compromisso', ptPT: 'Casamento / compromisso', ar: 'زواج أو التزام', hi: 'विवाहित / प्रतिबद्ध', de: 'Verheiratet / feste Partnerschaft' }[k],
                            separated: { en: 'Separated / healing', fa: 'جدا شده / در حال ترمیم', fr: 'Séparé / guérison', ptBR: 'Separado / em cura', ptPT: 'Separado / em cura', ar: 'منفصل / في شفاء', hi: 'अलग / ठीक हो रहे हैं', de: 'Getrennt / Heilung' }[k],
                            complicated: { en: 'Complicated / unclear', fa: 'پیچیده / نامشخص', fr: 'Compliqué / flou', ptBR: 'Complicado / incerto', ptPT: 'Complicado / incerto', ar: 'معقد / غير واضح', hi: 'जटिल / अस्पष्ट', de: 'Kompliziert / unklar' }[k],
                            prefer_not_to_say: { en: 'Prefer not to say', fa: 'ترجیح می‌دهم نگویم', fr: 'Je préfère ne pas répondre', ptBR: 'Prefiro não dizer', ptPT: 'Prefiro não dizer', ar: 'أفضل عدم القول', hi: 'न बताना पसंद करूंगा/करूंगी', de: 'Möchte ich nicht sagen' }[k]
                        }
                    },
                    partnerName: { en: 'Partner / Crush Name (Optional)', fa: 'نام شریک عاطفی یا کراش (اختیاری)', fr: 'Nom du partenaire / coup de cœur', ptBR: 'Nome da pessoa amada', ptPT: 'Nome da pessoa amada', ar: 'اسم الشريك أو الإعجاب', hi: 'साथी / क्रश का नाम', de: 'Name von Partner/Schwarm' }[k],
                    partnerBirthDate: { en: 'Partner Birth Date (Optional)', fa: 'تاریخ تولد طرف مقابل (اختیاری)', fr: 'Date de naissance du partenaire', ptBR: 'Nascimento da pessoa parceira', ptPT: 'Nascimento da pessoa parceira', ar: 'تاريخ ميلاد الشريك', hi: 'साथी की जन्म तिथि', de: 'Geburtsdatum der Partnerperson' }[k],
                    careerStage: {
                        label: { en: 'Career Stage', fa: 'مرحله شغلی فعلی', fr: 'Étape professionnelle', ptBR: 'Fase profissional', ptPT: 'Fase profissional', ar: 'مرحلة العمل', hi: 'करियर चरण', de: 'Karrierephase' }[k],
                        opts: {
                            student: { en: 'Student / learning', fa: 'دانش‌آموز/دانشجو یا در حال یادگیری', fr: 'Étudiant / apprentissage', ptBR: 'Estudante / aprendendo', ptPT: 'Estudante / a aprender', ar: 'طالب / يتعلم', hi: 'विद्यार्थी / सीख रहे हैं', de: 'Studierend / lernend' }[k],
                            starting: { en: 'Starting out', fa: 'شروع مسیر', fr: 'Début de parcours', ptBR: 'Começando', ptPT: 'A começar', ar: 'بداية الطريق', hi: 'शुरुआत', de: 'Am Anfang' }[k],
                            growing: { en: 'Growing / changing direction', fa: 'رشد یا تغییر مسیر', fr: 'Croissance / changement', ptBR: 'Crescendo / mudando', ptPT: 'A crescer / mudar', ar: 'نمو أو تغيير اتجاه', hi: 'विकास / दिशा बदलना', de: 'Wachstum / Richtungswechsel' }[k],
                            established: { en: 'Established', fa: 'تثبیت‌شده', fr: 'Établi', ptBR: 'Estabelecido', ptPT: 'Estabelecido', ar: 'مستقر', hi: 'स्थापित', de: 'Etabliert' }[k],
                            blocked: { en: 'Blocked / searching', fa: 'گیر کرده / در جستجو', fr: 'Bloqué / en recherche', ptBR: 'Bloqueado / buscando', ptPT: 'Bloqueado / à procura', ar: 'عالق / يبحث', hi: 'रुका हुआ / खोज में', de: 'Blockiert / suchend' }[k]
                        }
                    },
                    educationLevel: {
                        label: { en: 'Education / Study Stage', fa: 'وضعیت تحصیل یا یادگیری', fr: 'Études / apprentissage', ptBR: 'Educação / estudos', ptPT: 'Educação / estudos', ar: 'مرحلة الدراسة', hi: 'शिक्षा / अध्ययन चरण', de: 'Ausbildung / Lernen' }[k],
                        opts: {
                            school: { en: 'School', fa: 'مدرسه', fr: 'École', ptBR: 'Escola', ptPT: 'Escola', ar: 'مدرسة', hi: 'स्कूल', de: 'Schule' }[k],
                            university: { en: 'University', fa: 'دانشگاه', fr: 'Université', ptBR: 'Universidade', ptPT: 'Universidade', ar: 'جامعة', hi: 'विश्वविद्यालय', de: 'Universität' }[k],
                            professional_training: { en: 'Professional training', fa: 'آموزش حرفه‌ای', fr: 'Formation professionnelle', ptBR: 'Formação profissional', ptPT: 'Formação profissional', ar: 'تدريب مهني', hi: 'व्यावसायिक प्रशिक्षण', de: 'Berufliche Weiterbildung' }[k],
                            self_study: { en: 'Self-study / skill building', fa: 'خودآموزی / مهارت‌آموزی', fr: 'Autoformation / compétences', ptBR: 'Autoestudo / habilidades', ptPT: 'Autoestudo / competências', ar: 'تعلم ذاتي / مهارات', hi: 'स्व-अध्ययन / कौशल', de: 'Selbststudium / Fähigkeiten' }[k],
                            not_studying: { en: 'Not studying now', fa: 'فعلا در حال تحصیل نیستم', fr: 'Pas d’études actuellement', ptBR: 'Não estudo agora', ptPT: 'Não estudo agora', ar: 'لا أدرس حاليا', hi: 'अभी पढ़ाई नहीं', de: 'Derzeit nicht in Ausbildung' }[k]
                        }
                    },
                    studyField: { en: 'Study Field or Skill Path', fa: 'رشته، مهارت یا مسیر آموزشی', fr: 'Domaine d’étude ou compétence', ptBR: 'Área de estudo ou habilidade', ptPT: 'Área de estudo ou competência', ar: 'مجال الدراسة أو المهارة', hi: 'अध्ययन या कौशल क्षेत्र', de: 'Studienfeld oder Fähigkeit' }[k],
                    natalFocus: {
                        label: { en: 'Which life area should the analysis focus on?', fa: 'می‌خواهید تحلیل شما بیشتر روی کدام بخش زندگی تمرکز کند؟', fr: 'Sur quel domaine voulez-vous vous concentrer ?', ptBR: 'Em qual área da vida focar?', ptPT: 'Em que área da vida focar?', ar: 'على أي مجال تريد التركيز؟', hi: 'विश्लेषण किस क्षेत्र पर केंद्रित हो?', de: 'Auf welchen Lebensbereich soll die Analyse fokussieren?' }[k],
                        opts: {
                            love_relationships: { en: 'Love and relationships', fa: 'عشق و روابط', fr: 'Amour et relations', ptBR: 'Amor e relacionamentos', ptPT: 'Amor e relacionamentos', ar: 'الحب والعلاقات', hi: 'प्रेम और संबंध', de: 'Liebe und Beziehungen' }[k],
                            career_money: { en: 'Career & money', fa: 'کار و پول', fr: 'Carrière & argent', ptBR: 'Carreira e dinheiro', ptPT: 'Carreira e dinheiro', ar: 'العمل والمال', hi: 'करियर और धन', de: 'Karriere & Geld' }[k],
                            life_purpose: { en: 'Life path and purpose', fa: 'مسیر زندگی و هدف', fr: 'Chemin de vie et but', ptBR: 'Caminho de vida e propósito', ptPT: 'Caminho de vida e propósito', ar: 'مسار الحياة والهدف', hi: 'जीवन पथ और उद्देश्य', de: 'Lebensweg und Sinn' }[k],
                            migration_relocation: { en: 'Migration or relocation', fa: 'مهاجرت و تغییر مکان', fr: 'Migration ou déménagement', ptBR: 'Migração ou mudança', ptPT: 'Migração ou mudança', ar: 'الهجرة أو الانتقال', hi: 'प्रवास या स्थान परिवर्तन', de: 'Migration oder Ortswechsel' }[k],
                            complete_mix: { en: 'A balanced mix of everything', fa: 'ترکیبی از همه', fr: 'Un mélange de tout', ptBR: 'Um pouco de tudo', ptPT: 'Um pouco de tudo', ar: 'مزيج من كل شيء', hi: 'सबका संतुलित मिश्रण', de: 'Eine Mischung aus allem' }[k]
                        }
                    },
                    currentEmotion: {
                        label: { en: 'Where are you emotionally right now?', fa: 'الان بیشتر در کدام وضعیت هستید؟', fr: 'Où en êtes-vous émotionnellement ?', ptBR: 'Como você está emocionalmente agora?', ptPT: 'Como está emocionalmente agora?', ar: 'أين أنت عاطفياً الآن؟', hi: 'अभी आप भावनात्मक रूप से कहाँ हैं?', de: 'Wo stehst du emotional gerade?' }[k],
                        opts: {
                            new_path: { en: 'I am starting a new path', fa: 'در حال شروع یک مسیر جدید', fr: 'Je commence un nouveau chemin', ptBR: 'Estou começando um novo caminho', ptPT: 'Estou a começar um novo caminho', ar: 'أبدأ مساراً جديداً', hi: 'मैं नया रास्ता शुरू कर रहा/रही हूँ', de: 'Ich beginne einen neuen Weg' }[k],
                            confused: { en: 'I feel confused', fa: 'احساس سردرگمی دارم', fr: 'Je me sens perdu(e)', ptBR: 'Sinto confusão', ptPT: 'Sinto confusão', ar: 'أشعر بالحيرة', hi: 'मैं उलझन महसूस करता/करती हूँ', de: 'Ich fühle mich verwirrt' }[k],
                            growing_changing: { en: 'I am growing and changing', fa: 'در حال رشد و تغییرم', fr: 'Je grandis et je change', ptBR: 'Estou crescendo e mudando', ptPT: 'Estou a crescer e mudar', ar: 'أنمو وأتغير', hi: 'मैं बढ़ रहा/रही और बदल रहा/रही हूँ', de: 'Ich wachse und verändere mich' }[k],
                            complex_relationship: { en: 'I am in a complicated relationship', fa: 'در یک رابطه پیچیده هستم', fr: 'Je suis dans une relation complexe', ptBR: 'Estou em uma relação complicada', ptPT: 'Estou numa relação complicada', ar: 'أنا في علاقة معقدة', hi: 'मैं एक जटिल रिश्ते में हूँ', de: 'Ich bin in einer komplizierten Beziehung' }[k],
                            releasing_past: { en: 'I am letting go of my past', fa: 'در حال رها کردن گذشته‌ام', fr: 'Je lâche mon passé', ptBR: 'Estou deixando o passado', ptPT: 'Estou a deixar o passado', ar: 'أترك الماضي', hi: 'मैं अतीत छोड़ रहा/रही हूँ', de: 'Ich lasse meine Vergangenheit los' }[k]
                        }
                    },
                    lovePattern: { en: 'What relationship pattern do you keep repeating?', fa: 'در روابط بیشتر چه الگویی را تکرار می‌کنید؟', fr: 'Quel schéma relationnel répétez-vous ?', ptBR: 'Que padrão você repete nos relacionamentos?', ptPT: 'Que padrão repete nos relacionamentos?', ar: 'ما النمط الذي تكرره في العلاقات؟', hi: 'रिश्तों में कौन सा पैटर्न दोहराते हैं?', de: 'Welches Beziehungsmuster wiederholst du?' }[k],
                    stillThinkingOfSomeone: {
                        label: { en: 'Are you still thinking about someone?', fa: 'آیا هنوز به کسی فکر می‌کنید؟', fr: 'Pensez-vous encore à quelqu’un ?', ptBR: 'Você ainda pensa em alguém?', ptPT: 'Ainda pensa em alguém?', ar: 'هل ما زلت تفكر في شخص ما؟', hi: 'क्या आप अभी भी किसी के बारे में सोचते हैं?', de: 'Denkst du noch an jemanden?' }[k],
                        opts: {
                            yes: { en: 'Yes', fa: 'بله', fr: 'Oui', ptBR: 'Sim', ptPT: 'Sim', ar: 'نعم', hi: 'हाँ', de: 'Ja' }[k],
                            no: { en: 'No', fa: 'خیر', fr: 'Non', ptBR: 'Não', ptPT: 'Não', ar: 'لا', hi: 'नहीं', de: 'Nein' }[k],
                            sometimes: { en: 'Sometimes / not fully clear', fa: 'گاهی / هنوز کاملا روشن نیست', fr: 'Parfois / pas clair', ptBR: 'Às vezes / não está claro', ptPT: 'Às vezes / não está claro', ar: 'أحياناً / غير واضح', hi: 'कभी-कभी / साफ नहीं', de: 'Manchmal / nicht ganz klar' }[k]
                        }
                    },
                    loveGoal: { en: 'What do you want in love during the selected year?', fa: 'در سال انتخابی چه چیزی در عشق می‌خواهید؟', fr: 'Que voulez-vous en amour cette année ?', ptBR: 'O que você quer no amor no ano escolhido?', ptPT: 'O que quer no amor no ano escolhido?', ar: 'ماذا تريد في الحب في السنة المختارة؟', hi: 'चुने हुए वर्ष में प्रेम में क्या चाहते हैं?', de: 'Was wünschst du dir in der Liebe im gewählten Jahr?' }[k],
                    job: { en: 'Current job or career path', fa: 'شغل فعلی یا مسیر کاری', fr: 'Emploi actuel ou parcours professionnel', ptBR: 'Trabalho atual ou caminho profissional', ptPT: 'Trabalho atual ou percurso profissional', ar: 'العمل الحالي أو المسار المهني', hi: 'वर्तमान काम या करियर पथ', de: 'Aktueller Job oder beruflicher Weg' }[k],
                    careerSatisfaction: {
                        label: { en: 'Are you satisfied with your current direction?', fa: 'آیا از مسیر فعلی راضی هستید؟', fr: 'Êtes-vous satisfait(e) de votre direction actuelle ?', ptBR: 'Você está satisfeito(a) com o caminho atual?', ptPT: 'Está satisfeito(a) com o caminho atual?', ar: 'هل أنت راضٍ عن مسارك الحالي؟', hi: 'क्या आप अपनी वर्तमान दिशा से संतुष्ट हैं?', de: 'Bist du mit deiner aktuellen Richtung zufrieden?' }[k],
                        opts: {
                            yes: { en: 'Yes', fa: 'بله', fr: 'Oui', ptBR: 'Sim', ptPT: 'Sim', ar: 'نعم', hi: 'हाँ', de: 'Ja' }[k],
                            no: { en: 'No', fa: 'خیر', fr: 'Non', ptBR: 'Não', ptPT: 'Não', ar: 'لا', hi: 'नहीं', de: 'Nein' }[k],
                            mixed: { en: 'Mixed feelings', fa: 'احساس دوگانه دارم', fr: 'Sentiments partagés', ptBR: 'Sentimentos mistos', ptPT: 'Sentimentos mistos', ar: 'مشاعر مختلطة', hi: 'मिश्रित भावनाएँ', de: 'Gemischte Gefühle' }[k],
                            searching: { en: 'I am searching for a new direction', fa: 'دنبال مسیر جدیدم', fr: 'Je cherche une nouvelle direction', ptBR: 'Procuro uma nova direção', ptPT: 'Procuro uma nova direção', ar: 'أبحث عن اتجاه جديد', hi: 'मैं नई दिशा खोज रहा/रही हूँ', de: 'Ich suche eine neue Richtung' }[k]
                        }
                    },
                    biggestYearGoal: { en: 'Biggest goal for the selected year', fa: 'بزرگ‌ترین هدف شما در سال انتخابی چیست؟', fr: 'Votre plus grand objectif pour l’année choisie', ptBR: 'Maior meta para o ano escolhido', ptPT: 'Maior meta para o ano escolhido', ar: 'أكبر هدف للسنة المختارة', hi: 'चुने हुए वर्ष का सबसे बड़ा लक्ष्य', de: 'Größtes Ziel für das gewählte Jahr' }[k],
                    progressBlocker: { en: 'What is blocking your progress?', fa: 'چه چیزی جلوی پیشرفت شما را گرفته؟', fr: 'Qu’est-ce qui bloque votre progression ?', ptBR: 'O que bloque seu progresso?', ptPT: 'O que bloqueia o seu progresso?', ar: 'ما الذي يعيق تقدمك؟', hi: 'आपकी प्रगति को क्या रोक रहा है?', de: 'Was blockiert deinen Fortschritt?' }[k],
                    oneLifeChange: { en: 'If one thing in your life could change, what would it be?', fa: 'اگر قرار باشد یک چیز در زندگی‌تان تغییر کند، آن چیست؟', fr: 'Si une chose pouvait changer dans votre vie, laquelle ?', ptBR: 'Se uma coisa pudesse mudar na sua vida, qual seria?', ptPT: 'Se uma coisa pudesse mudar na sua vida, qual seria?', ar: 'إذا تغيّر شيء واحد في حياتك، ما هو؟', hi: 'अगर जीवन में एक चीज बदलनी हो तो वह क्या होगी?', de: 'Wenn sich eine Sache in deinem Leben ändern könnte, welche wäre es?' }[k],
                    professionalExtras: {
                        label: { en: 'Include professional extras: month-by-month forecast, deeper relationship analysis, and golden decision windows?', fa: 'می‌خواهید تحلیل شامل پیش‌بینی ماه‌به‌ماه، تحلیل دقیق روابط و زمان‌های طلایی تصمیم‌گیری باشد؟', fr: 'Inclure les options professionnelles ?', ptBR: 'Incluir extras profissionais?', ptPT: 'Incluir extras profissionais?', ar: 'هل تريد تضمين الإضافات المهنية؟', hi: 'क्या पेशेवर अतिरिक्त भाग शामिल करें?', de: 'Professionelle Extras einschließen?' }[k],
                        opts: {
                            yes: { en: 'Yes, include the professional version', fa: 'بله، نسخه حرفه‌ای را می‌خواهم', fr: 'Oui, version professionnelle', ptBR: 'Sim, versão profissional', ptPT: 'Sim, versão profissional', ar: 'نعم، النسخة المهنية', hi: 'हाँ, पेशेवर संस्करण', de: 'Ja, professionelle Version' }[k],
                            no: { en: 'No, keep it focused', fa: 'خیر، تحلیل متمرکز کافی است', fr: 'Non, garder concentré', ptBR: 'Não, manter focado', ptPT: 'Não, manter focado', ar: 'لا، اجعله مركزاً', hi: 'नहीं, केंद्रित रखें', de: 'Nein, fokussiert halten' }[k]
                        }
                    },
                    bigQuestion: { en: 'Your Biggest Life Question', fa: 'بزرگترین سوال زندگی شما', fr: 'Votre grande question de vie', ptBR: 'Sua maior pergunta de vida', ptPT: 'A sua maior pergunta de vida', ar: 'أكبر سؤال في حياتك', hi: 'आपका सबसे बड़ा जीवन प्रश्न', de: 'Deine größte Lebensfrage' }[k],
                    loveQuestion: { en: 'Love, Marriage & Relationship Question', fa: 'سوال عشق، ازدواج و رابطه', fr: 'Question amour, mariage et relation', ptBR: 'Pergunta sobre amor e relacionamento', ptPT: 'Pergunta sobre amor e relacionamento', ar: 'سؤال الحب والزواج والعلاقة', hi: 'प्रेम, विवाह और संबंध प्रश्न', de: 'Frage zu Liebe, Ehe und Beziehung' }[k],
                    careerQuestion: { en: 'Career, Purpose & Wealth Question', fa: 'سوال شغل، رسالت و ثروت', fr: 'Question carrière, mission et richesse', ptBR: 'Pergunta sobre carreira e riqueza', ptPT: 'Pergunta sobre carreira e riqueza', ar: 'سؤال العمل والغاية والمال', hi: 'करियर, उद्देश्य और धन प्रश्न', de: 'Frage zu Karriere, Sinn und Wohlstand' }[k],
                    educationQuestion: { en: 'Education, Exams or Skill Question', fa: 'سوال تحصیل، آزمون یا مهارت', fr: 'Question études, examens ou compétences', ptBR: 'Pergunta sobre estudos ou habilidades', ptPT: 'Pergunta sobre estudos ou competências', ar: 'سؤال الدراسة أو المهارات', hi: 'शिक्षा, परीक्षा या कौशल प्रश्न', de: 'Frage zu Studium, Prüfungen oder Fähigkeiten' }[k],
                    familyQuestion: { en: 'Family, Home or Roots Question', fa: 'سوال خانواده، خانه یا ریشه‌ها', fr: 'Question famille, foyer ou racines', ptBR: 'Pergunta sobre família e lar', ptPT: 'Pergunta sobre família e lar', ar: 'سؤال العائلة والبيت والجذور', hi: 'परिवार, घर या जड़ों का प्रश्न', de: 'Frage zu Familie, Zuhause oder Wurzeln' }[k],
                    moneyQuestion: { en: 'Money & Abundance Question', fa: 'سوال پول و فراوانی', fr: 'Question argent & abondance', ptBR: 'Pergunta sobre dinheiro e abundância', ptPT: 'Pergunta sobre dinheiro e abundância', ar: 'سؤال المال والوفرة', hi: 'धन और समृद्धि प्रश्न', de: 'Frage zu Geld & Fülle' }[k],
                    healthQuestion: { en: 'Health & Energy Focus (Non-medical)', fa: 'تمرکز سلامت و انرژی (غیرپزشکی)', fr: 'Santé & énergie (non médical)', ptBR: 'Saúde e energia (não médico)', ptPT: 'Saúde e energia (não médico)', ar: 'الصحة والطاقة (غير طبي)', hi: 'स्वास्थ्य और ऊर्जा (चिकित्सकीय नहीं)', de: 'Gesundheit & Energie (nicht medizinisch)' }[k],
                    spiritualQuestion: { en: 'Spiritual / Personal Growth Question', fa: 'سوال رشد روحی و شخصی', fr: 'Question spirituelle / croissance personnelle', ptBR: 'Pergunta espiritual / crescimento', ptPT: 'Pergunta espiritual / crescimento', ar: 'سؤال النمو الروحي والشخصي', hi: 'आध्यात्मिक / व्यक्तिगत विकास प्रश्न', de: 'Spirituelle / persönliche Wachstumsfrage' }[k],
                    currentChallenge: { en: 'Main Challenge Right Now', fa: 'چالش اصلی همین الان', fr: 'Défi principal actuel', ptBR: 'Principal desafio atual', ptPT: 'Principal desafio atual', ar: 'التحدي الرئيسي الآن', hi: 'अभी की मुख्य चुनौती', de: 'Aktuelle Hauptherausforderung' }[k],
                    majorGoal2026: { en: 'Main Goal for 2026', fa: 'هدف اصلی برای سال ۲۰۲۶', fr: 'Objectif principal pour 2026', ptBR: 'Meta principal para 2026', ptPT: 'Meta principal para 2026', ar: 'الهدف الرئيسي لعام 2026', hi: '2026 का मुख्य लक्ष्य', de: 'Hauptziel für 2026' }[k],
                    majorGoal2027: { en: 'Main Goal for 2027', fa: 'هدف اصلی برای سال ۲۰۲۷', fr: 'Objectif principal pour 2027', ptBR: 'Meta principal para 2027', ptPT: 'Meta principal para 2027', ar: 'الهدف الرئيسي لعام 2027', hi: '2027 का मुख्य लक्ष्य', de: 'Hauptziel für 2027' }[k],
                    desiredOutcome: { en: 'What kind of hopeful guidance do you need?', fa: 'چه نوع راهنمایی امیدبخشی نیاز دارید؟', fr: 'Quel type de guidance pleine d’espoir voulez-vous ?', ptBR: 'Que orientação esperançosa você precisa?', ptPT: 'Que orientação esperançosa precisa?', ar: 'ما نوع الإرشاد المليء بالأمل الذي تحتاجه؟', hi: 'आपको किस तरह का आशापूर्ण मार्गदर्शन चाहिए?', de: 'Welche hoffnungsvolle Führung brauchst du?' }[k],
                    unknownTime: { en: 'Unknown Birth Time?', fa: 'ساعت تولد نامشخص؟', fr: 'Heure Inconnue ?', ptBR: 'Hora Desconhecida?', ptPT: 'Hora Desconhecida?', ar: 'وقت غير معروف؟', hi: 'अज्ञात जन्म समय?', de: 'Unbekannte Geburtszeit?' }[k],
                    motherName: { en: 'Mother\'s Name (Optional)', fa: 'نام مادر (اختیاری)', fr: 'Nom Mère', ptBR: 'Nome da Mãe', ptPT: 'Nome da Mãe', ar: 'اسم الأم', hi: 'माता کا نام', de: 'Name der Mutter' }[k]
                }
            }
        }
    };
};

export const getLocalizedModules = (lang: LanguageCode): ModuleConfig[] => {
    const translations = generateAppTranslations(lang);
    
    return Object.entries(BASE_MODULE_CONFIGS).map(([key, config]) => {
        const trans = translations.modules[key as ModuleType];
        
        const localizedFields = config.fields.map(field => {
             let label = field.label; 
             
             if (trans.fields && (trans.fields as any)[field.name]) {
                const fieldTrans = (trans.fields as any)[field.name];
                if (typeof fieldTrans === 'string') {
                    label = fieldTrans;
                } else if (fieldTrans.label) {
                    label = fieldTrans.label;
                }
             } else {
                 const k = getLabelKey(lang);
                 if ((COMMON_LABELS as any)[field.name]) {
                     label = (COMMON_LABELS as any)[field.name][k];
                 }
             }

             let options = field.options;
             if (options) {
                 options = options.map(opt => {
                     let optLabel = opt.label;
                     if (trans.fields && (trans.fields as any)[field.name] && (trans.fields as any)[field.name].opts && (trans.fields as any)[field.name].opts[opt.value]) {
                         optLabel = (trans.fields as any)[field.name].opts[opt.value];
                     } else {
                         const k = getLabelKey(lang);
                         if ((COMMON_LABELS as any)[opt.value]) {
                             optLabel = (COMMON_LABELS as any)[opt.value][k];
                         }
                     }
                     return { ...opt, label: optLabel };
                 });
             }

             return { ...field, label, options };
        });

        return {
            ...config,
            title: trans.title,
            description: trans.desc,
            fields: localizedFields
        };
    });
};

export const TRANSLATIONS = {
    en: generateAppTranslations('en'),
    fa: generateAppTranslations('fa'),
    fr: generateAppTranslations('fr'),
    'pt-PT': generateAppTranslations('pt-PT'),
    'pt-BR': generateAppTranslations('pt-BR'),
    ar: generateAppTranslations('ar'),
    hi: generateAppTranslations('hi'),
    de: generateAppTranslations('de'),
};
