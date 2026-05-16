export const assets = {
  logo: "/figma/logo.png",
  heroPattern: "/figma/hero-pattern.svg",
  coach: "/figma/coach.png",
  phoneComposite: "/figma/phone-composite.png",
  phoneHand: "/figma/phone-hand.png",
  appScreen: "/figma/app-screen.png",
  bullet: "/figma/bullet.svg",
  bibiStanding: "/figma/bibi-standing.png",
  coachPattern: "/figma/coach-pattern.svg",
  coachPhone: "/figma/coach-phone.png",
  coachScreen: "/figma/coach-screen.png",
  iphoneAir: "/figma/iphone-air.png",
  taskThumb: "/figma/task-thumb.png",
  bibiDifferent: "/figma/bibi-different.png",
  x2NutritionCard: "/figma/2x_nutrition.png",
  x2NutritionCard1: "/figma/2x_nutrition1.png",
  x2NutritionCard2: "/figma/2x_nutrition2.png",
  x2FrameworkPattern: "/figma/x2-framework-pattern.svg",
  x2SystemPattern: "/figma/x2-system-pattern.svg",
  remainingBibiCoachScreen: "/figma/remaining-bibi-coach-screen.png",
  remainingDailySystemScreen: "/figma/remaining-daily-system-screen.png",
  remainingCommunityScreen: "/figma/remaining-community-screen.png",
  remainingIphoneAir: "/figma/remaining-iphone-air.png",
  remainingWeHearYouCardPattern:
    "/figma/remaining-we-hear-you-card-pattern.svg",
  finalBibi: "/figma/final-bibi.png",
  finalFooterLogo: "/figma/final-footer-logo.png",
  finalBlackPattern: "/figma/final-black-pattern.svg",
  finalOrangePattern: "/figma/final-orange-pattern.svg",
  whatsappIcon: "/figma/whatsapp.png",
} as const;

export const healthScoreActivities = [
  {
    activity: "Morning Hydration",
    description:
      "500ml of water kickstarts metabolism and reduces false hunger",
    points: "5 pts",
  },
  {
    activity: "Intermittent Fasting",
    description: "16 hours of low insulin keeps your body burning stored fat",
    points: "10 pts",
  },
  {
    activity: "Home Workout",
    description: "Bibi selects your session. Builds muscle. Burns calories.",
    points: "10 pts",
  },
  {
    activity: "Coffee Break",
    description:
      "Moderate caffeine at 10am extends fat burning within your fast",
    points: "10 pts",
  },
  {
    activity: "First Meal — 12pm",
    description: "Bibi-guided CVP meal. Logged and scored instantly.",
    points: "25 pts",
  },
  {
    activity: "Second Meal — 7pm",
    description: "Final CVP meal closes your eating window perfectly",
    points: "25 pts",
  },
  {
    activity: "10,000 Daily Steps",
    description: "Burns 300–500 extra calories. Tracked by Bibi daily.",
    points: "10 pts",
  },
  {
    activity: "Weight Loss Drink",
    description: "Heals your gut and enhances fat burning overnight",
    points: "5 pts",
  },
] as const;

export const x2NutritionCards = [
  {
    text: "Most diets tell you what to eat",
    description:
      "The X2 Nutrition System teaches you how to eat so you never need a meal plan again.",
    image: {
      alt: "2X Nutrition System scoring card",
      height: 716,
      src: assets.x2NutritionCard,
      width: 1147,
    },
  },
  {
    text: "Score every meal clearly",
    description:
      "Bibi turns each meal into a simple score so you can see what is balanced and what needs work.",
    image: {
      alt: "2X Nutrition System scoring card placeholder",
      height: 716,
      src: assets.x2NutritionCard1,
      width: 1147,
    },
  },
  {
    text: "Know what to fix next",
    description:
      "Every card can explain the next small change, from carbs to vegetables, protein and portion balance.",
    image: {
      alt: "2X Nutrition System scoring card placeholder",
      height: 716,
      src: assets.x2NutritionCard1,
      width: 1147,
    },
  },
  {
    text: "Repeat the system daily",
    description:
      "Use the same framework meal after meal until healthy choices become easier to repeat.",
    image: {
      alt: "2X Nutrition System scoring card placeholder",
      height: 716,
      src: assets.x2NutritionCard1,
      width: 1147,
    },
  },
] as const;

export const healthScorePayoffCards = [
  {
    text: "",
    description:
      "Every activity earns Health Score points — up to 100 per day. Your cumulative score determines your renewal discount.",
    image: {
      alt: "Health Score progress card placeholder",
      height: 716,
      src: assets.x2NutritionCard2,
      width: 1147,
    },
  },
  {
    text: "Turn consistency into discounts",
    description:
      "The more points you earn before renewal, the bigger your discount becomes. Showing up now lowers what you pay later.",
    image: {
      alt: "Health Score renewal discount card placeholder",
      height: 716,
      src: assets.x2NutritionCard2,
      width: 1147,
    },
  },
] as const;

export const remainingSystemPanels = [
  {
    id: "remaining-bibi-coach",
    title: "Bibi — Your AI Coach",
    featureTop: 181,
    featureGap: 20,
    phone: {
      alt: "Bibi AI coach app screen",
      bottom: -25,
      height: 545,
      right: 72,
      src: assets.remainingBibiCoachScreen,
      width: 371,
    },
    features: [
      {
        title: "Bibi Suggest",
        body: "personalised CVP meals from whatever you have at home",
      },
      {
        title: "Meal Logging",
        body: "Photo based analysis and instant scoring",
      },
      {
        title: "Meal Scoring",
        body: "CVP Ratio and portion size scored out of 25 point per meal",
      },
      {
        title: "Bibi’s Feedback",
        body: "personalised remarks tied to your health conditions",
      },
      {
        title: "Tips for Next Time",
        body: "forward-looking coaching on smarter habits",
      },
      {
        title: "Meal History",
        body: "every meal graded and stored for your learning",
      },
    ],
  },
  {
    id: "remaining-daily-system",
    title: "The Daily System",
    featureTop: 211,
    featureGap: 32,
    phone: {
      alt: "Daily task system app screen",
      bottom: 0,
      height: 516,
      right: 103,
      src: assets.remainingDailySystemScreen,
      width: 340,
    },
    features: [
      {
        title: "Home Workouts",
        body: "Bibi selects your session daily. No gym. No equipment.",
      },
      {
        title: "Intermittent Fasting",
        body: "automatic 16/8 window tracking from 8pm to 12pm",
      },
      {
        title: "Daily Steps",
        body: "10,000 steps tracked and rewarded with Health Score points",
      },
      {
        title: "all tracked and scored",
        body: "Morning Hydration, Coffee Break & Weight Loss Drink",
      },
    ],
  },
  {
    cta: true,
    id: "remaining-community",
    title: "Community",
    featureTop: 211,
    featureGap: 32,
    phone: {
      alt: "Community screen inside Fitness Space app",
      bottom: -18,
      height: 511,
      right: 121,
      src: assets.remainingCommunityScreen,
      width: 322,
    },
    features: [
      {
        title: "Expert coaches",
        body: "answer your questions in real time every single day",
      },
      {
        title: "20,000+  members",
        body: "in tribes built around shared goals",
      },
      {
        title: "Accountability",
        body: "that keeps you consistent when motivation drops",
      },
    ],
  },
] as const;

export const remainingCommunitySupportCards = [
  {
    text: "Members share meals, Bibi scores and progress",
    width: 361,
  },
  {
    text: "Coaches answer your questions in real time every day",
    width: 414,
  },
  {
    text: "Join tribes: 10k Steps Gang, No Fried Food Trybe, Nutrient Fasting Trybe and more",
    width: 605,
  },
] as const;

export const remainingWeHearYouCards = [
  {
    id: "food",
    lines: [
      {
        text: "“I love food too much to diet.”",
        color: "#FFB900",
      },
      {
        text: "You will not diet. You will eat jollof rice, eba, beans and plantain. Bibi just shows you how to balance them.",
        color: "#FFFFFF",
      },
    ],
    textWidth: 630,
  },
  {
    id: "tried-everything",
    lines: [
      {
        text: "“I have tried everything and nothing works.”",
        color: "#FFB900",
      },
      {
        text: "You have tried meal plans. Bibi is not a meal plan. She is a system built around how your body actually works — with Nigerian food, Nigerian life and Nigerian budgets.",
        color: "#FFFFFF",
      },
    ],
    textWidth: 725,
  },
  {
    id: "ai-health",
    lines: [
      {
        text: "“I don’t trust AI with my health.”",
        color: "#FFB900",
      },
      {
        text: "Bibi is a nutrition and habit coach — not a doctor. Human coaches are always inside the community when you need them.",
        color: "#FFFFFF",
      },
    ],
    textWidth: 630,
  },
  {
    id: "no-time",
    lines: [
      {
        text: "“I do not have time to exercise.”",
        color: "#FFB900",
      },
      {
        text: "Your daily system fits real life. Bibi gives you simple home workouts, fasting, hydration and steps one day at a time.",
        color: "#FFFFFF",
      },
    ],
    textWidth: 680,
  },
  {
    id: "special-food",
    lines: [
      {
        text: "“I cannot afford special foods.”",
        color: "#FFB900",
      },
      {
        text: "Bibi works with what you already have at home and shows you how to balance Nigerian meals without expensive ingredients.",
        color: "#FFFFFF",
      },
    ],
    textWidth: 680,
  },
  {
    id: "fall-off",
    lines: [
      {
        text: "“I always fall off after a few days.”",
        color: "#FFB900",
      },
      {
        text: "That is why Fitness Space gives you Bibi, coaches and community accountability so consistency is built into the system.",
        color: "#FFFFFF",
      },
    ],
    textWidth: 680,
  },
] as const;

export const finalTrialFacts = [
  {
    text: "Standard subscription: ₦5,000 per month",
    width: 332,
  },
  {
    text: "Health Score discounts of up to 50% at renewal",
    width: 414,
  },
  {
    text: "The more you show up, the cheaper it gets",
    width: 339,
  },
  {
    text: "Cancel anytime. No pressure. No tricks",
    width: 306,
  },
] as const;

export const finalTestimonials = [
  {
    id: "rahmah",
    name: "Rahmah",
    quote:
      "I lost 8kg in 6 weeks eating my normal meals. I finally understood how to balance my plate.”",
    rotation: 11.34,
    wrapper: {
      height: 430,
      left: 118,
      top: 122,
      width: 380,
    },
  },
  {
    id: "wendy",
    name: "Wendy",
    quote:
      "By week 2 my clothes were fitting differently. I had not changed what I ate just how I ate it.",
    rotation: -7.73,
    wrapper: {
      height: 414,
      left: 819,
      top: 161,
      width: 360,
    },
  },
] as const;

export const benefitCards = [
  "Works with any Nigerian food",
  "Works even when motivation drops",
  "Personalised to your health conditions and goals",
  "No gym. No expensive meal plans. No completed routines",
] as const;

export const coachingPillars = [
  {
    title: "What You Eat",
    rotation: "-rotate-[5deg]",
    notifications: [
      ["Tuesday - 1,037 kcal", "Avocado toast -> grilled chicken -> salmon"],
      ["Wednesday - 1,920 kcal", "Oatmeal -> Caesar salad -> rice"],
      ["New Task", "You just completed your daily 12k steps!"],
    ],
    body: "Tell Bibi what you have at home. She instantly builds a balanced CVP meal around it: the right carb, vegetables and protein for your body.",
  },
  {
    title: "How You Move",
    rotation: "rotate-[5deg]",
    notifications: [
      ["Next Task", "30 mins workout by 5:30pm"],
      ["Good Job!", "You just completed your morning workout"],
      ["New Task", "Daily 12k steps completed"],
    ],
    body: "Bibi selects your daily home workout based on your fitness level, goals and health data. No gym. No equipment. Just a session built for you.",
  },
  {
    title: "When You Eat",
    rotation: "-rotate-[5deg]",
    notifications: [
      ["Fasting: 0/16 hrs", "Ongoing"],
      ["Workout: 50%", "Incomplete"],
      ["Meal plan: 2/2", "Completed"],
    ],
    body: "Bibi guides your fasting window and tracks it automatically, helping your body burn stored fat while giving your gut time to rest.",
  },
  {
    title: "How Much You Move",
    rotation: "rotate-[5deg]",
    notifications: [
      ["Congratulations", "You completed your daily 12k steps!"],
      ["Reminder", "Complete 12k steps today"],
      ["Reminder", "Keep your movement streak alive"],
    ],
    body: "Bibi tracks your daily steps. Every step counts toward your Health Score and keeps your fat-burning engine running all day.",
  },
] as const;

export const coachingCardImages = [
  {
    height: 2321,
    src: "/figma/coach_card_2.png",
    title: "What You Eat",
    width: 1974,
  },
  {
    height: 579,
    src: "/figma/coach_card_3.png",
    title: "How You Move",
    width: 499,
  },
  {
    height: 2321,
    src: "/figma/coach_card_1.png",
    title: "When You Eat",
    width: 1974,
  },
  {
    height: 2336,
    src: "/figma/coach_card_4.png",
    title: "How Much You Move",
    width: 1995,
  },
] as const;

export const coachingCardPairs = [
  [coachingCardImages[0], coachingCardImages[1]],
  [coachingCardImages[2], coachingCardImages[3]],
] as const;

export const powerfulFeatures = [
  {
    number: "01",
    title: "Bibi Suggest",
    body: "Tell Bibi what complex carb you have at home. She builds the perfect meal around it instantly. Personalized to your health and goals every time.",
    active: true,
  },
  {
    number: "02",
    title: "Meal Logging",
    body: "Take a photo of your meal. Bibi analyses the image, identifies every food item and scores it immediately. She sees what you actually ate — not what you typed.",
    active: false,
  },
  {
    number: "03",
    title: "Meal Scoring",
    body: "Every meal scored out of 25 points: Carbs (5pts), Veggies (5pts), Protein (10pts), Portion Size (5pts). Two meals daily. Up to 50 meal points per day.",
    active: false,
  },
  {
    number: "04",
    title: "Bibi’s Feedback",
    body: "After every meal Bibi tells you exactly what is missing, why it matters and how to fix it. Always tied to your health conditions. Always warm. Never judgmental.",
    active: false,
  },
  {
    number: "05",
    title: "Tips For Next Time",
    body: "Forward-looking coaching on smarter pairings, better cooking methods and eating habits that unlock more nutritional value from your food.",
    active: false,
  },
  {
    number: "06",
    title: "Meal History",
    body: "Every meal you have logged — scored, graded and remarked. Go back anytime to track your progress and learn your patterns.",
    active: false,
  },
] as const;
