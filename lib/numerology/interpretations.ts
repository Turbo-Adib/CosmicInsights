// Numerology interpretations based on pigbank-knowledge

export const lifePathMeanings: Record<number, {
  title: string;
  keywords: string[];
  description: string;
  mission: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
  relationships: string;
}> = {
  1: {
    title: "The Independent Leader",
    keywords: ["Leadership", "Independence", "Innovation", "Pioneering"],
    description: "You are a natural-born leader with a pioneering spirit. Your path is about independence, innovation, and breaking new ground.",
    mission: "To lead by example and inspire others through your originality and determination.",
    strengths: [
      "Natural leadership abilities",
      "Strong will and determination", 
      "Original thinking and innovation",
      "Self-reliance and independence"
    ],
    challenges: [
      "Can be overly dominant or aggressive",
      "Difficulty accepting help from others",
      "Tendency toward stubbornness",
      "May struggle with collaboration"
    ],
    careers: ["CEO/Entrepreneur", "Inventor", "Military Officer", "Politician", "Solo Practitioner"],
    relationships: "You need a partner who respects your independence. Works best with 3, 5, and 9."
  },
  2: {
    title: "The Harmonious Partner",
    keywords: ["Cooperation", "Balance", "Diplomacy", "Partnership"],
    description: "You are the peacemaker and diplomat, naturally attuned to others' needs. Your path involves partnership, cooperation, and creating harmony.",
    mission: "To bring people together and create harmony through cooperation and understanding.",
    strengths: [
      "Natural diplomat and mediator",
      "Highly intuitive and empathetic",
      "Excellent team player",
      "Detail-oriented and patient"
    ],
    challenges: [
      "Can be overly sensitive",
      "Difficulty making decisions alone",
      "May become codependent",
      "Tendency to avoid confrontation"
    ],
    careers: ["Counselor", "Diplomat", "Teacher", "Healer", "Artist", "Musician"],
    relationships: "You thrive in partnerships. Most compatible with 6, 8, and 9."
  },
  3: {
    title: "The Creative Communicator",
    keywords: ["Creativity", "Communication", "Joy", "Expression"],
    description: "You are blessed with creativity, charm, and communication skills. Your path is about expressing yourself and bringing joy to others.",
    mission: "To inspire and uplift others through creative expression and joyful communication.",
    strengths: [
      "Natural creativity and artistic talent",
      "Excellent communication skills",
      "Optimistic and enthusiastic",
      "Charismatic and socially gifted"
    ],
    challenges: [
      "Can be scattered or unfocused",
      "Tendency toward superficiality",
      "May struggle with discipline",
      "Prone to mood swings"
    ],
    careers: ["Artist", "Writer", "Actor", "Marketing", "Public Relations", "Teacher"],
    relationships: "You need mental stimulation and fun. Compatible with 1, 5, and 7."
  },
  4: {
    title: "The Practical Builder",
    keywords: ["Stability", "Hard Work", "Foundation", "Discipline"],
    description: "You are the builder and foundation-layer, creating stability through hard work and dedication. Your path involves creating lasting structures.",
    mission: "To build solid foundations that stand the test of time through dedication and hard work.",
    strengths: [
      "Extremely reliable and trustworthy",
      "Strong work ethic",
      "Practical and grounded",
      "Excellent organizational skills"
    ],
    challenges: [
      "Can be rigid or inflexible",
      "Tendency toward workaholism",
      "May struggle with change",
      "Can be overly critical"
    ],
    careers: ["Engineer", "Architect", "Accountant", "Manager", "Builder", "Administrator"],
    relationships: "You value stability and loyalty. Most compatible with 2, 6, and 8."
  },
  5: {
    title: "The Freedom Seeker",
    keywords: ["Freedom", "Adventure", "Change", "Experience"],
    description: "You are the adventurer and freedom-seeker, constantly in motion and seeking new experiences. Your path is about freedom and expansion.",
    mission: "To experience life fully and inspire others to embrace freedom and adventure.",
    strengths: [
      "Adaptable and versatile",
      "Natural curiosity and love of learning",
      "Excellent at networking",
      "Progressive and forward-thinking"
    ],
    challenges: [
      "Can be restless or irresponsible",
      "Difficulty with commitment",
      "Tendency toward excess",
      "May lack focus or direction"
    ],
    careers: ["Travel Writer", "Sales", "Public Speaker", "Entrepreneur", "Pilot", "Journalist"],
    relationships: "You need freedom and variety. Works well with 1, 3, and 7."
  },
  6: {
    title: "The Nurturing Caregiver",
    keywords: ["Responsibility", "Love", "Nurturing", "Service"],
    description: "You are the nurturer and caregiver, with a deep sense of responsibility for others. Your path involves service, love, and creating harmony.",
    mission: "To serve others with love and create beauty and harmony in the world.",
    strengths: [
      "Natural caregiver and healer",
      "Strong sense of responsibility",
      "Artistic and creative",
      "Magnetic personality"
    ],
    challenges: [
      "Can be overly responsible for others",
      "Tendency toward perfectionism",
      "May become martyrs",
      "Difficulty saying no"
    ],
    careers: ["Doctor", "Nurse", "Teacher", "Counselor", "Artist", "Interior Designer"],
    relationships: "You're devoted and caring. Most compatible with 2, 4, and 8."
  },
  7: {
    title: "The Spiritual Seeker",
    keywords: ["Spirituality", "Analysis", "Wisdom", "Solitude"],
    description: "You are the seeker of truth and wisdom, with a deep need to understand life's mysteries. Your path involves spiritual growth and analysis.",
    mission: "To seek truth and wisdom, and share your insights with the world.",
    strengths: [
      "Highly analytical and intuitive",
      "Natural spiritual inclination",
      "Independent thinker",
      "Excellent researcher"
    ],
    challenges: [
      "Can be aloof or withdrawn",
      "Difficulty trusting others",
      "May become too isolated",
      "Tendency toward perfectionism"
    ],
    careers: ["Researcher", "Philosopher", "Spiritual Teacher", "Analyst", "Writer", "Scientist"],
    relationships: "You need intellectual and spiritual connection. Compatible with 3, 5, and 7."
  },
  8: {
    title: "The Material Master",
    keywords: ["Power", "Success", "Authority", "Achievement"],
    description: "You are the powerhouse with natural authority and business acumen. Your path involves material mastery and achieving great success.",
    mission: "To achieve material success and use your power to benefit others.",
    strengths: [
      "Natural business acumen",
      "Strong leadership qualities",
      "Ambitious and goal-oriented",
      "Excellent judge of character"
    ],
    challenges: [
      "Can be materialistic",
      "Tendency toward workaholism",
      "May be too controlling",
      "Struggle with work-life balance"
    ],
    careers: ["CEO", "Business Owner", "Finance", "Real Estate", "Law", "Politics"],
    relationships: "You need a strong, independent partner. Works with 2, 4, and 6."
  },
  9: {
    title: "The Humanitarian",
    keywords: ["Compassion", "Service", "Wisdom", "Universal Love"],
    description: "You are the humanitarian with a global consciousness. Your path involves serving humanity and spreading universal love.",
    mission: "To serve humanity with compassion and make the world a better place.",
    strengths: [
      "Deeply compassionate and caring",
      "Natural wisdom and understanding",
      "Creative and artistic",
      "Charismatic leader"
    ],
    challenges: [
      "Can be too idealistic",
      "Difficulty with boundaries",
      "May neglect personal needs",
      "Tendency toward martyrdom"
    ],
    careers: ["Humanitarian", "Teacher", "Healer", "Artist", "Counselor", "Non-profit Leader"],
    relationships: "You love deeply and universally. Compatible with 1, 2, and 6."
  },
  11: {
    title: "The Intuitive Illuminator",
    keywords: ["Intuition", "Illumination", "Inspiration", "Spiritual Master"],
    description: "You are a master number with heightened intuition and spiritual gifts. Your path involves inspiring and illuminating others.",
    mission: "To inspire humanity through your intuitive gifts and spiritual understanding.",
    strengths: [
      "Extremely intuitive and psychic",
      "Natural inspirational leader",
      "Visionary and idealistic",
      "Highly creative"
    ],
    challenges: [
      "Can be overly sensitive",
      "Nervous energy and anxiety",
      "Difficulty grounding ideas",
      "May feel misunderstood"
    ],
    careers: ["Spiritual Teacher", "Psychic", "Artist", "Inventor", "Inspirational Speaker"],
    relationships: "You need deep spiritual connection. Best with 2, 6, and 8."
  },
  22: {
    title: "The Master Builder",
    keywords: ["Vision", "Manifestation", "Leadership", "Global Impact"],
    description: "You are the master builder with the ability to turn dreams into reality on a grand scale. Your path involves creating lasting impact.",
    mission: "To build something of lasting value that benefits all of humanity.",
    strengths: [
      "Visionary with practical skills",
      "Natural leader and organizer",
      "Can manifest on large scale",
      "Combines intuition with logic"
    ],
    challenges: [
      "Enormous pressure to achieve",
      "Can be overwhelming",
      "May struggle with self-doubt",
      "Tendency toward extremes"
    ],
    careers: ["CEO of Global Company", "World Leader", "Architect", "Engineer", "Humanitarian Leader"],
    relationships: "You need a supportive, understanding partner. Works with 4, 6, and 8."
  },
  33: {
    title: "The Master Teacher",
    keywords: ["Teaching", "Healing", "Unconditional Love", "Service"],
    description: "You are the master teacher with a mission to uplift humanity through love and wisdom. This is the most rare and evolved path.",
    mission: "To teach and heal humanity through unconditional love and selfless service.",
    strengths: [
      "Profound wisdom and compassion",
      "Natural teacher and healer",
      "Selfless service to others",
      "Extremely high vibration"
    ],
    challenges: [
      "Extremely high standards",
      "Can neglect self-care",
      "May feel isolated",
      "Heavy responsibility"
    ],
    careers: ["Spiritual Leader", "Master Teacher", "Healer", "Humanitarian", "Author"],
    relationships: "You need a spiritually evolved partner. Best with 6, 9, and other master numbers."
  }
};

export const dayNumberMeanings: Record<number, {
  title: string;
  karma: string;
  talents: string[];
  warning: string;
}> = {
  1: {
    title: "The Pioneer Day",
    karma: "Learning to lead without dominating",
    talents: ["Natural leadership", "Innovation", "Independence"],
    warning: "Avoid being overly aggressive or selfish"
  },
  2: {
    title: "The Cooperative Day",
    karma: "Learning to balance giving and receiving",
    talents: ["Diplomacy", "Intuition", "Partnership"],
    warning: "Don't lose yourself in others"
  },
  3: {
    title: "The Creative Day",
    karma: "Learning to express authentically",
    talents: ["Communication", "Creativity", "Joy"],
    warning: "Avoid superficiality and scattered energy"
  },
  4: {
    title: "The Builder Day",
    karma: "Learning flexibility within structure",
    talents: ["Organization", "Dedication", "Reliability"],
    warning: "Don't become too rigid or workaholic"
  },
  5: {
    title: "The Freedom Day",
    karma: "Learning responsible freedom",
    talents: ["Adaptability", "Communication", "Adventure"],
    warning: "Avoid excess and irresponsibility"
  },
  6: {
    title: "The Nurturer Day",
    karma: "Learning healthy boundaries in service",
    talents: ["Nurturing", "Beauty", "Responsibility"],
    warning: "Don't become a martyr or perfectionist"
  },
  7: {
    title: "The Mystic Day",
    karma: "Learning to trust and connect",
    talents: ["Analysis", "Intuition", "Spirituality"],
    warning: "Avoid isolation and over-analysis"
  },
  8: {
    title: "The Authority Day",
    karma: "Learning ethical use of power",
    talents: ["Business sense", "Authority", "Material mastery"],
    warning: "Don't become materialistic or controlling"
  },
  9: {
    title: "The Humanitarian Day",
    karma: "Learning personal boundaries in universal love",
    talents: ["Compassion", "Wisdom", "Artistic gifts"],
    warning: "Avoid losing yourself in others' needs"
  },
  11: {
    title: "The Intuitive Day",
    karma: "Learning to ground spiritual gifts",
    talents: ["Psychic abilities", "Inspiration", "Teaching"],
    warning: "Stay grounded and avoid nervous energy"
  },
  22: {
    title: "The Master Day",
    karma: "Learning to manifest vision practically",
    talents: ["Visionary abilities", "Building", "Leadership"],
    warning: "Don't let pressure overwhelm you"
  }
};

export const personalYearMeanings: Record<number, {
  theme: string;
  description: string;
  opportunities: string[];
  warnings: string[];
  bestMonths: number[];
}> = {
  1: {
    theme: "New Beginnings & Leadership",
    description: "A year to plant seeds, start fresh, and take initiative. The universe supports new ventures.",
    opportunities: [
      "Starting a business or project",
      "Taking leadership roles",
      "Making independent decisions",
      "Setting new life direction"
    ],
    warnings: [
      "Don't be impatient with results",
      "Avoid being too aggressive",
      "Seeds planted now bloom in year 3"
    ],
    bestMonths: [1, 5, 7]
  },
  2: {
    theme: "Cooperation & Patience",
    description: "A year for partnership, patience, and behind-the-scenes work. Focus on relationships.",
    opportunities: [
      "Building partnerships",
      "Developing patience",
      "Detailed planning",
      "Nurturing relationships"
    ],
    warnings: [
      "Progress may feel slow",
      "Don't force outcomes",
      "Avoid major launches"
    ],
    bestMonths: [2, 4, 8]
  },
  3: {
    theme: "Expression & Expansion",
    description: "A year of joy, creativity, and social expansion. Your efforts from year 1 begin to bloom.",
    opportunities: [
      "Creative projects flourish",
      "Social life expands",
      "Communication projects",
      "Travel and fun"
    ],
    warnings: [
      "Don't scatter your energy",
      "Avoid overindulgence",
      "Stay focused on priorities"
    ],
    bestMonths: [3, 6, 9]
  },
  4: {
    theme: "Foundation & Hard Work",
    description: "A year to build solid foundations through discipline and hard work. No shortcuts.",
    opportunities: [
      "Building lasting structures",
      "Establishing routines",
      "Health improvements",
      "Long-term planning"
    ],
    warnings: [
      "May feel restrictive",
      "Health needs attention",
      "Avoid get-rich-quick schemes"
    ],
    bestMonths: [4, 8, 10]
  },
  5: {
    theme: "Freedom & Change",
    description: "A year of freedom, adventure, and unexpected changes. Embrace flexibility.",
    opportunities: [
      "Travel and adventure",
      "New experiences",
      "Breaking free from restrictions",
      "Networking and promotion"
    ],
    warnings: [
      "Avoid impulsive decisions",
      "Don't burn bridges",
      "Watch for excess"
    ],
    bestMonths: [5, 7, 9]
  },
  6: {
    theme: "Responsibility & Love",
    description: "A year focused on home, family, and responsibilities. Love and service are highlighted.",
    opportunities: [
      "Home improvements",
      "Family harmony",
      "Marriage or commitment",
      "Community service"
    ],
    warnings: [
      "Don't take on too much",
      "Avoid perfectionism",
      "Set healthy boundaries"
    ],
    bestMonths: [6, 9, 12]
  },
  7: {
    theme: "Reflection & Spirituality",
    description: "A year for inner work, spiritual growth, and solitude. Go within for answers.",
    opportunities: [
      "Spiritual development",
      "Education and study",
      "Research projects",
      "Health improvements"
    ],
    warnings: [
      "Not ideal for new relationships",
      "Business may slow",
      "Avoid isolation"
    ],
    bestMonths: [7, 11, 12]
  },
  8: {
    theme: "Power & Achievement",
    description: "A year of material success, recognition, and achievement. Your efforts pay off.",
    opportunities: [
      "Financial gains",
      "Career advancement",
      "Recognition and awards",
      "Business expansion"
    ],
    warnings: [
      "Stay ethical",
      "Don't be ruthless",
      "Balance material and spiritual"
    ],
    bestMonths: [8, 10, 12]
  },
  9: {
    theme: "Completion & Release",
    description: "A year of endings, completions, and preparing for new cycle. Let go of what's done.",
    opportunities: [
      "Completing major projects",
      "Humanitarian work",
      "Sharing wisdom",
      "Clearing old patterns"
    ],
    warnings: [
      "Not ideal for new starts",
      "Emotions may be intense",
      "Focus on giving, not getting"
    ],
    bestMonths: [9, 11, 12]
  }
};

// Compatibility based on pigbank-knowledge
export const compatibilityChart: Record<number, {
  soulmates: number[];
  friends: number[];
  challenges: number[];
  avoid: number[];
}> = {
  1: { soulmates: [5, 7], friends: [3, 9], challenges: [4, 8], avoid: [6] },
  2: { soulmates: [6, 8], friends: [4, 9], challenges: [1, 5], avoid: [7] },
  3: { soulmates: [1, 5], friends: [7, 9], challenges: [4, 8], avoid: [2, 6] },
  4: { soulmates: [2, 8], friends: [6, 7], challenges: [1, 5], avoid: [3, 9] },
  5: { soulmates: [1, 3], friends: [7, 9], challenges: [2, 6], avoid: [4, 8] },
  6: { soulmates: [2, 8], friends: [4, 9], challenges: [1, 5], avoid: [3, 7] },
  7: { soulmates: [1, 5], friends: [3, 4], challenges: [8, 9], avoid: [2, 6] },
  8: { soulmates: [2, 4], friends: [6], challenges: [1, 5], avoid: [3, 7, 9] },
  9: { soulmates: [3, 6], friends: [1, 2, 5], challenges: [7], avoid: [4, 8] },
  11: { soulmates: [2, 6], friends: [8, 9], challenges: [1, 5], avoid: [4, 7] },
  22: { soulmates: [4, 8], friends: [2, 6], challenges: [3, 5], avoid: [1, 7] },
  33: { soulmates: [6, 9], friends: [2, 11], challenges: [4, 8], avoid: [1, 5] }
};