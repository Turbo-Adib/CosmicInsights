// Client-safe knowledge base without fs dependencies
// This file contains the numerology and astrology knowledge that can be used in client components

// Types for parsed knowledge content
export interface NumerologyKnowledge {
  lifePathMeanings: Record<number, LifePathDetails>;
  compatibility: CompatibilityData;
  personalYears: Record<number, PersonalYearInfo>;
  universalDays: Record<number, DayEnergy>;
  relationships: RelationshipPatterns;
}

export interface LifePathDetails {
  number: number;
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  purpose: string;
  careers: string[];
  relationships: string;
  spiritualPath: string;
}

export interface CompatibilityData {
  soulmates: Record<number, number[]>;
  compatible: Record<number, number[]>;
  challenging: Record<number, number[]>;
  karmic: Record<number, number[]>;
}

export interface PersonalYearInfo {
  year: number;
  theme: string;
  focus: string[];
  opportunities: string[];
  challenges: string[];
  months: Record<number, string>;
}

export interface DayEnergy {
  day: number;
  energy: string;
  good: string[];
  avoid: string[];
}

export interface RelationshipPatterns {
  dynamics: Record<string, RelationshipDynamic>;
  advice: Record<string, string[]>;
}

export interface RelationshipDynamic {
  combination: string;
  description: string;
  strengths: string[];
  challenges: string[];
  advice: string[];
}

// Static knowledge base data
const LIFE_PATH_MEANINGS: Record<number, LifePathDetails> = {
  1: {
    number: 1,
    title: 'The Leader',
    description: 'Independent, pioneering, and innovative. Natural born leaders who forge their own path.',
    strengths: ['Leadership', 'Innovation', 'Independence', 'Determination', 'Originality'],
    challenges: ['Stubbornness', 'Impatience', 'Self-centeredness', 'Domineering tendencies'],
    purpose: 'To lead and innovate, bringing new ideas into the world',
    careers: ['Entrepreneur', 'CEO', 'Inventor', 'Pioneer', 'Director', 'Freelancer'],
    relationships: 'Needs a partner who respects their independence while providing emotional support',
    spiritualPath: 'Learning to balance independence with connection and ego with service',
  },
  2: {
    number: 2,
    title: 'The Peacemaker',
    description: 'Cooperative, sensitive, and diplomatic. Masters of partnership and collaboration.',
    strengths: ['Cooperation', 'Diplomacy', 'Sensitivity', 'Partnership', 'Intuition'],
    challenges: ['Indecisiveness', 'Over-sensitivity', 'Dependency', 'Self-doubt'],
    purpose: 'To bring harmony and balance through cooperation',
    careers: ['Mediator', 'Counselor', 'Diplomat', 'Partner', 'Therapist', 'Artist'],
    relationships: 'Thrives in partnerships, needs emotional connection and mutual support',
    spiritualPath: 'Learning to maintain identity within partnerships and trust intuition',
  },
  3: {
    number: 3,
    title: 'The Communicator',
    description: 'Creative, expressive, and socially gifted. Natural entertainers and artists.',
    strengths: ['Creativity', 'Communication', 'Optimism', 'Charisma', 'Imagination'],
    challenges: ['Scattered energy', 'Superficiality', 'Mood swings', 'Procrastination'],
    purpose: 'To express and create, bringing joy and inspiration to others',
    careers: ['Artist', 'Writer', 'Actor', 'Teacher', 'Marketing', 'Public Speaker'],
    relationships: 'Needs intellectual stimulation and creative expression in partnerships',
    spiritualPath: 'Learning to channel creative energy constructively and find deeper meaning',
  },
  4: {
    number: 4,
    title: 'The Builder',
    description: 'Practical, hardworking, and detail-oriented. The foundation builders of society.',
    strengths: ['Reliability', 'Organization', 'Dedication', 'Persistence', 'Pragmatism'],
    challenges: ['Rigidity', 'Stubbornness', 'Narrow-mindedness', 'Workaholic tendencies'],
    purpose: 'To build lasting foundations and bring order to chaos',
    careers: ['Engineer', 'Architect', 'Accountant', 'Manager', 'Analyst', 'Craftsperson'],
    relationships: 'Values stability and loyalty, needs a practical and committed partner',
    spiritualPath: 'Learning flexibility and to see beyond material accomplishments',
  },
  5: {
    number: 5,
    title: 'The Explorer',
    description: 'Adventurous, freedom-loving, and versatile. Seekers of experience and change.',
    strengths: ['Adaptability', 'Curiosity', 'Versatility', 'Progressive thinking', 'Charisma'],
    challenges: ['Restlessness', 'Impulsiveness', 'Lack of commitment', 'Excess'],
    purpose: 'To experience freedom and inspire others to embrace change',
    careers: ['Travel writer', 'Entrepreneur', 'Sales', 'Pilot', 'Photographer', 'Consultant'],
    relationships: 'Needs freedom and variety, attracted to independent partners',
    spiritualPath: 'Learning responsible use of freedom and finding stability in change',
  },
  6: {
    number: 6,
    title: 'The Nurturer',
    description: 'Caring, responsible, and family-oriented. Natural healers and protectors.',
    strengths: ['Compassion', 'Responsibility', 'Nurturing', 'Harmony', 'Service'],
    challenges: ['Worry', 'Perfectionism', 'Self-sacrifice', 'Control issues'],
    purpose: 'To nurture and heal, creating harmony in family and community',
    careers: ['Teacher', 'Counselor', 'Nurse', 'Chef', 'Interior Designer', 'Social Worker'],
    relationships: 'Devoted partner, needs emotional security and family connection',
    spiritualPath: 'Learning to balance giving with receiving and releasing control',
  },
  7: {
    number: 7,
    title: 'The Seeker',
    description: 'Spiritual, analytical, and introspective. Seekers of truth and wisdom.',
    strengths: ['Intuition', 'Analysis', 'Spirituality', 'Wisdom', 'Research'],
    challenges: ['Isolation', 'Cynicism', 'Secretiveness', 'Perfectionism'],
    purpose: 'To seek truth and share spiritual insights with the world',
    careers: ['Researcher', 'Philosopher', 'Scientist', 'Mystic', 'Analyst', 'Writer'],
    relationships: 'Needs intellectual and spiritual connection, values depth over surface',
    spiritualPath: 'Learning to trust and open up while maintaining spiritual connection',
  },
  8: {
    number: 8,
    title: 'The Achiever',
    description: 'Ambitious, material-minded, and powerful. Natural business leaders and visionaries.',
    strengths: ['Leadership', 'Vision', 'Determination', 'Business acumen', 'Authority'],
    challenges: ['Materialism', 'Workaholism', 'Control', 'Ruthlessness'],
    purpose: 'To achieve material and spiritual mastery',
    careers: ['CEO', 'Investor', 'Judge', 'Administrator', 'Producer', 'Politician'],
    relationships: 'Needs an equal partner who understands ambition and success',
    spiritualPath: 'Learning to balance material success with spiritual values',
  },
  9: {
    number: 9,
    title: 'The Humanitarian',
    description: 'Compassionate, idealistic, and generous. Universal lovers serving humanity.',
    strengths: ['Compassion', 'Wisdom', 'Generosity', 'Idealism', 'Universal love'],
    challenges: ['Impracticality', 'Scattered efforts', 'Emotional intensity', 'Disappointment'],
    purpose: 'To serve humanity and inspire universal love',
    careers: ['Humanitarian', 'Teacher', 'Artist', 'Healer', 'Environmentalist', 'Philanthropist'],
    relationships: 'Needs a partner who shares humanitarian values and emotional depth',
    spiritualPath: 'Learning to release and transform, embodying universal love',
  },
  11: {
    number: 11,
    title: 'The Intuitive',
    description: 'Spiritually aware, sensitive, and inspiring. Master teachers and visionaries.',
    strengths: ['Intuition', 'Inspiration', 'Sensitivity', 'Vision', 'Healing abilities'],
    challenges: ['Nervous tension', 'Self-doubt', 'Impracticality', 'Emotional volatility'],
    purpose: 'To inspire and uplift humanity through spiritual insights',
    careers: ['Spiritual teacher', 'Healer', 'Artist', 'Musician', 'Counselor', 'Visionary'],
    relationships: 'Needs deep spiritual connection and understanding partner',
    spiritualPath: 'Learning to ground spiritual insights in practical reality',
  },
  22: {
    number: 22,
    title: 'The Master Builder',
    description: 'Visionary, practical, and capable of great achievements. Builders of lasting legacies.',
    strengths: ['Vision', 'Leadership', 'Practicality', 'Determination', 'Manifestation'],
    challenges: ['Overwhelming responsibility', 'Self-pressure', 'Impatience', 'Control'],
    purpose: 'To build great works that benefit humanity',
    careers: ['Architect', 'Global leader', 'Inventor', 'Humanitarian leader', 'System builder'],
    relationships: 'Needs a supportive partner who understands their grand vision',
    spiritualPath: 'Learning to manifest spiritual vision in material form',
  },
  33: {
    number: 33,
    title: 'The Master Teacher',
    description: 'Compassionate, devoted, and spiritually evolved. Teachers of universal love.',
    strengths: ['Compassion', 'Healing', 'Teaching', 'Service', 'Spiritual mastery'],
    challenges: ['Self-sacrifice', 'Martyrdom', 'Unrealistic expectations', 'Burnout'],
    purpose: 'To embody and teach unconditional love',
    careers: ['Spiritual leader', 'Healer', 'Teacher', 'Counselor', 'Artist', 'Guide'],
    relationships: 'Needs a spiritually evolved partner who shares service orientation',
    spiritualPath: 'Learning to balance service with self-care and human needs',
  },
};

const COMPATIBILITY_DATA: CompatibilityData = {
  soulmates: {
    1: [2, 3, 5],
    2: [1, 4, 6, 8],
    3: [1, 5, 6, 9],
    4: [2, 6, 7, 8],
    5: [1, 3, 5, 7],
    6: [2, 3, 6, 9],
    7: [4, 5, 7],
    8: [2, 4, 8],
    9: [3, 6, 9],
    11: [2, 4, 11, 22],
    22: [4, 8, 11, 22],
    33: [6, 9, 11, 33],
  },
  compatible: {
    1: [4, 6, 7, 9],
    2: [3, 5, 9],
    3: [2, 4, 7, 8],
    4: [1, 3, 5, 9],
    5: [2, 4, 6, 8, 9],
    6: [1, 4, 5, 7, 8],
    7: [1, 3, 6, 8, 9],
    8: [3, 5, 6, 7, 9],
    9: [1, 2, 4, 5, 7, 8],
    11: [3, 5, 6, 7, 8, 9],
    22: [2, 3, 5, 6, 7, 9],
    33: [1, 2, 3, 4, 5, 7, 8],
  },
  challenging: {
    1: [8, 11],
    2: [7, 11],
    3: [11, 22],
    4: [11, 22, 33],
    5: [11, 22, 33],
    6: [11, 22],
    7: [2, 11, 22],
    8: [1, 11],
    9: [11, 22, 33],
    11: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    22: [3, 4, 5, 7],
    33: [4, 5],
  },
  karmic: {
    1: [11, 22],
    2: [11, 22, 33],
    3: [33],
    4: [22, 33],
    5: [11, 33],
    6: [33],
    7: [11, 22],
    8: [22],
    9: [11, 33],
    11: [1, 2, 5, 7, 9],
    22: [1, 4, 7, 8],
    33: [2, 3, 6, 9],
  },
};

const PERSONAL_YEAR_DATA: Record<number, PersonalYearInfo> = {
  1: {
    year: 1,
    theme: 'New Beginnings',
    focus: ['Independence', 'Leadership', 'Innovation', 'Self-discovery'],
    opportunities: ['Starting new ventures', 'Taking leadership roles', 'Personal reinvention'],
    challenges: ['Impatience', 'Self-doubt', 'Fear of change'],
    months: {
      1: 'Double new beginning energy - perfect for major life changes',
      2: 'Focus on partnerships within your new direction',
      3: 'Express your new vision creatively',
      4: 'Build foundations for your new beginnings',
      5: 'Embrace freedom and adventure in your new path',
      6: 'Balance new ventures with responsibilities',
      7: 'Reflect on your progress and adjust course',
      8: 'Take charge and manifest your vision',
      9: 'Complete initial phase before moving forward',
      10: 'New cycle within the year begins',
      11: 'Spiritual insights guide your path',
      12: 'Express creativity in your new venture',
    },
  },
  2: {
    year: 2,
    theme: 'Cooperation & Balance',
    focus: ['Partnerships', 'Patience', 'Diplomacy', 'Emotional awareness'],
    opportunities: ['Forming partnerships', 'Developing patience', 'Enhancing relationships'],
    challenges: ['Indecision', 'Over-sensitivity', 'Dependency'],
    months: {
      1: 'New partnerships begin',
      2: 'Double cooperation energy - ideal for collaboration',
      3: 'Creative partnerships flourish',
      4: 'Build stable foundations in relationships',
      5: 'Freedom within partnerships',
      6: 'Nurture close relationships',
      7: 'Inner reflection on partnerships',
      8: 'Power dynamics in relationships',
      9: 'Complete partnership cycles',
      10: 'New relationship phase',
      11: 'Spiritual connections deepen',
      12: 'Express feelings creatively',
    },
  },
  3: {
    year: 3,
    theme: 'Creative Expression',
    focus: ['Creativity', 'Communication', 'Joy', 'Social connections'],
    opportunities: ['Creative projects', 'Social expansion', 'Self-expression'],
    challenges: ['Scattered energy', 'Superficiality', 'Overindulgence'],
    months: {
      1: 'New creative beginnings',
      2: 'Collaborate creatively',
      3: 'Peak creative expression',
      4: 'Structure your creativity',
      5: 'Freedom of expression',
      6: 'Create for/with family',
      7: 'Inner creative exploration',
      8: 'Manifest creative visions',
      9: 'Complete creative projects',
      10: 'New creative cycle',
      11: 'Spiritual creativity',
      12: 'Triple creative energy',
    },
  },
  4: {
    year: 4,
    theme: 'Foundation Building',
    focus: ['Hard work', 'Organization', 'Discipline', 'Practical goals'],
    opportunities: ['Building foundations', 'Creating structure', 'Long-term planning'],
    challenges: ['Rigidity', 'Overwork', 'Resistance to change'],
    months: {
      1: 'Start building new foundations',
      2: 'Partner in building efforts',
      3: 'Creative approach to structure',
      4: 'Double foundation energy - major building time',
      5: 'Flexibility within structure',
      6: 'Build for family/community',
      7: 'Analyze and refine structures',
      8: 'Powerful manifestation of plans',
      9: 'Complete foundational work',
      10: 'New building phase',
      11: 'Spiritual foundations',
      12: 'Express through your creations',
    },
  },
  5: {
    year: 5,
    theme: 'Freedom & Change',
    focus: ['Adventure', 'Freedom', 'Travel', 'New experiences'],
    opportunities: ['Travel', 'New experiences', 'Breaking free from limitations'],
    challenges: ['Restlessness', 'Impulsiveness', 'Lack of focus'],
    months: {
      1: 'New adventures begin',
      2: 'Share adventures with others',
      3: 'Creative adventures',
      4: 'Structure your freedom',
      5: 'Peak freedom and change',
      6: 'Balance freedom with responsibility',
      7: 'Inner journey and exploration',
      8: 'Manifest through change',
      9: 'Complete adventure cycles',
      10: 'New freedom phase',
      11: 'Spiritual adventures',
      12: 'Express your experiences',
    },
  },
  6: {
    year: 6,
    theme: 'Responsibility & Service',
    focus: ['Family', 'Home', 'Service', 'Healing'],
    opportunities: ['Strengthening family bonds', 'Home improvements', 'Serving others'],
    challenges: ['Over-responsibility', 'Self-sacrifice', 'Control issues'],
    months: {
      1: 'New family beginnings',
      2: 'Partnership focus in family',
      3: 'Creative family activities',
      4: 'Build family foundations',
      5: 'Freedom within responsibility',
      6: 'Peak nurturing energy',
      7: 'Inner reflection on service',
      8: 'Empower through service',
      9: 'Complete service cycles',
      10: 'New phase of responsibility',
      11: 'Spiritual service',
      12: 'Creative nurturing',
    },
  },
  7: {
    year: 7,
    theme: 'Introspection & Spirituality',
    focus: ['Inner growth', 'Spirituality', 'Study', 'Solitude'],
    opportunities: ['Spiritual development', 'Deep study', 'Inner wisdom'],
    challenges: ['Isolation', 'Cynicism', 'Overthinking'],
    months: {
      1: 'New spiritual beginnings',
      2: 'Spiritual partnerships',
      3: 'Creative spirituality',
      4: 'Structure spiritual practice',
      5: 'Freedom in spirituality',
      6: 'Nurture spiritual growth',
      7: 'Peak introspection',
      8: 'Manifest spiritual insights',
      9: 'Complete spiritual cycles',
      10: 'New spiritual phase',
      11: 'Master spiritual insights',
      12: 'Express spiritual wisdom',
    },
  },
  8: {
    year: 8,
    theme: 'Achievement & Recognition',
    focus: ['Material success', 'Authority', 'Recognition', 'Power'],
    opportunities: ['Career advancement', 'Financial gains', 'Leadership roles'],
    challenges: ['Materialism', 'Power struggles', 'Workaholism'],
    months: {
      1: 'New success ventures',
      2: 'Partnership in business',
      3: 'Creative business ideas',
      4: 'Build business foundations',
      5: 'Freedom through success',
      6: 'Balance success and family',
      7: 'Analyze achievements',
      8: 'Peak manifestation power',
      9: 'Complete business cycles',
      10: 'New achievement phase',
      11: 'Spiritual approach to success',
      12: 'Express through achievements',
    },
  },
  9: {
    year: 9,
    theme: 'Completion & Wisdom',
    focus: ['Endings', 'Wisdom', 'Service', 'Universal love'],
    opportunities: ['Completing cycles', 'Sharing wisdom', 'Humanitarian service'],
    challenges: ['Letting go', 'Emotional intensity', 'Clinging to past'],
    months: {
      1: 'Begin completion process',
      2: 'Complete partnerships',
      3: 'Creative completions',
      4: 'Structured endings',
      5: 'Freedom through release',
      6: 'Family completions',
      7: 'Inner wisdom integration',
      8: 'Powerful transformations',
      9: 'Ultimate completion energy',
      10: 'Transition phase',
      11: 'Spiritual completions',
      12: 'Express wisdom gained',
    },
  },
};

// Export the static knowledge base
export const KNOWLEDGE_BASE: NumerologyKnowledge = {
  lifePathMeanings: LIFE_PATH_MEANINGS,
  compatibility: COMPATIBILITY_DATA,
  personalYears: PERSONAL_YEAR_DATA,
  universalDays: {
    1: { day: 1, energy: 'Leadership & New Beginnings', good: ['Starting projects', 'Taking charge'], avoid: ['Following others', 'Procrastination'] },
    2: { day: 2, energy: 'Cooperation & Balance', good: ['Partnerships', 'Diplomacy'], avoid: ['Going solo', 'Confrontation'] },
    3: { day: 3, energy: 'Creativity & Communication', good: ['Creative work', 'Socializing'], avoid: ['Isolation', 'Routine tasks'] },
    4: { day: 4, energy: 'Building & Structure', good: ['Planning', 'Hard work'], avoid: ['Taking risks', 'Spontaneity'] },
    5: { day: 5, energy: 'Freedom & Adventure', good: ['Travel', 'New experiences'], avoid: ['Routine', 'Commitment'] },
    6: { day: 6, energy: 'Service & Harmony', good: ['Helping others', 'Family time'], avoid: ['Selfishness', 'Discord'] },
    7: { day: 7, energy: 'Reflection & Spirituality', good: ['Meditation', 'Study'], avoid: ['Crowds', 'Superficiality'] },
    8: { day: 8, energy: 'Power & Achievement', good: ['Business', 'Leadership'], avoid: ['Submission', 'Small thinking'] },
    9: { day: 9, energy: 'Completion & Service', good: ['Finishing projects', 'Helping humanity'], avoid: ['Starting new', 'Selfishness'] },
  },
  relationships: {
    dynamics: {},
    advice: {
      general: ['Communication is key', 'Respect differences', 'Find common ground'],
    },
  },
};

// Export specific knowledge getters
export function getLifePathMeaning(lifePathNumber: number): LifePathDetails | null {
  return KNOWLEDGE_BASE.lifePathMeanings[lifePathNumber] || null;
}

export function getCompatibility(number1: number, number2: number): RelationshipDynamic | null {
  const key = `${Math.min(number1, number2)}-${Math.max(number1, number2)}`;
  return KNOWLEDGE_BASE.relationships.dynamics[key] || null;
}

export function getPersonalYearMeaning(year: number): PersonalYearInfo | null {
  return KNOWLEDGE_BASE.personalYears[year] || null;
}

// Get expression number meaning
export function getExpressionMeaning(expressionNumber: number) {
  // Import from interpretations file
  const { expressionNumberMeanings } = require('./numerology/interpretations');
  return expressionNumberMeanings[expressionNumber] || null;
}

// Get birth day meaning
export function getBirthDayMeaning(birthDay: number) {
  // Import from interpretations file
  const { birthDayNumberMeanings } = require('./numerology/interpretations');
  return birthDayNumberMeanings[birthDay] || null;
}

export function calculateRelationshipCompatibility(
  person1Numbers: any,
  person2Numbers: any
): {
  overallScore: number;
  dynamics: string[];
  strengths: string[];
  challenges: string[];
  advice: string[];
} {
  // Calculate compatibility based on life path numbers
  const lifePath1 = person1Numbers.lifePathNumber;
  const lifePath2 = person2Numbers.lifePathNumber;
  
  let overallScore = 50; // Base score
  const dynamics: string[] = [];
  const strengths: string[] = [];
  const challenges: string[] = [];
  const advice: string[] = [];
  
  // Check if soulmates
  if (KNOWLEDGE_BASE.compatibility.soulmates[lifePath1]?.includes(lifePath2)) {
    overallScore += 30;
    dynamics.push('Soulmate connection');
    strengths.push('Natural understanding and harmony');
  }
  
  // Check if compatible
  if (KNOWLEDGE_BASE.compatibility.compatible[lifePath1]?.includes(lifePath2)) {
    overallScore += 20;
    dynamics.push('Compatible energies');
    strengths.push('Complementary strengths');
  }
  
  // Check if challenging
  if (KNOWLEDGE_BASE.compatibility.challenging[lifePath1]?.includes(lifePath2)) {
    overallScore -= 10;
    dynamics.push('Growth-oriented relationship');
    challenges.push('Different approaches to life');
    advice.push('Focus on understanding differences');
  }
  
  // Add expression number compatibility
  if (person1Numbers.expressionNumber && person2Numbers.expressionNumber) {
    const expDiff = Math.abs(person1Numbers.expressionNumber - person2Numbers.expressionNumber);
    if (expDiff <= 2) {
      overallScore += 10;
      strengths.push('Similar communication styles');
    }
  }
  
  return {
    overallScore: Math.min(100, Math.max(0, overallScore)),
    dynamics,
    strengths,
    challenges,
    advice,
  };
}