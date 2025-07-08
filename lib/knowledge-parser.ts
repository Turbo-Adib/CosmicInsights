import { readFileSync } from 'fs';
import { join } from 'path';

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

// Singleton instance for knowledge base
let knowledgeCache: NumerologyKnowledge | null = null;

export function loadKnowledgeBase(): NumerologyKnowledge {
  if (knowledgeCache) return knowledgeCache;

  try {
    // Load the main knowledge base file
    const knowledgePath = join(process.cwd(), 'docs/pigbank-knowledge/pigbank knowledge base.md');
    const content = readFileSync(knowledgePath, 'utf-8');
    
    // Parse the content
    knowledgeCache = parseKnowledgeContent(content);
    return knowledgeCache;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    // Return default structure if file not found
    return getDefaultKnowledge();
  }
}

function parseKnowledgeContent(content: string): NumerologyKnowledge {
  // This is a simplified parser - in production, you'd want more robust parsing
  const sections = content.split(/^#+\s+/m);
  
  const lifePathMeanings = parseLifePathSection(content);
  const compatibility = parseCompatibilitySection(content);
  const personalYears = parsePersonalYearSection(content);
  const universalDays = parseUniversalDaySection(content);
  const relationships = parseRelationshipSection(content);

  return {
    lifePathMeanings,
    compatibility,
    personalYears,
    universalDays,
    relationships,
  };
}

function parseLifePathSection(content: string): Record<number, LifePathDetails> {
  const lifePathData: Record<number, LifePathDetails> = {};
  
  // Extract Life Path meanings using regex patterns
  const lifePathPattern = /Life Path (\d+)[:\s-]+([^\n]+)\n([\s\S]+?)(?=Life Path \d+|$)/gi;
  let match;
  
  while ((match = lifePathPattern.exec(content)) !== null) {
    const number = parseInt(match[1]);
    const title = match[2].trim();
    const details = match[3];
    
    lifePathData[number] = {
      number,
      title,
      description: extractDescription(details),
      strengths: extractListItems(details, 'Strengths'),
      challenges: extractListItems(details, 'Challenges'),
      purpose: extractSection(details, 'Purpose') || '',
      careers: extractListItems(details, 'Careers'),
      relationships: extractSection(details, 'Relationships') || '',
      spiritualPath: extractSection(details, 'Spiritual') || '',
    };
  }

  // Add default data for common life paths if not found
  const defaults = getDefaultLifePaths();
  Object.keys(defaults).forEach(key => {
    const num = parseInt(key);
    if (!lifePathData[num]) {
      lifePathData[num] = defaults[num];
    }
  });

  return lifePathData;
}

function parseCompatibilitySection(content: string): CompatibilityData {
  // Extract compatibility patterns
  const compatData: CompatibilityData = {
    soulmates: {},
    compatible: {},
    challenging: {},
    karmic: {},
  };

  // Parse soulmate numbers
  const soulmatePattern = /(\d+)\s*[-–]\s*Soulmates?:?\s*([0-9,\s]+)/gi;
  let match;
  
  while ((match = soulmatePattern.exec(content)) !== null) {
    const number = parseInt(match[1]);
    const matches = match[2].split(/[,\s]+/).map(n => parseInt(n)).filter(n => !isNaN(n));
    compatData.soulmates[number] = matches;
  }

  // Add default compatibility if not found
  if (Object.keys(compatData.soulmates).length === 0) {
    compatData.soulmates = {
      1: [2, 3, 5],
      2: [1, 4, 6],
      3: [1, 5, 9],
      4: [2, 6, 8],
      5: [1, 3, 7],
      6: [2, 4, 9],
      7: [5, 7, 11],
      8: [4, 8, 22],
      9: [3, 6, 9],
    };
  }

  return compatData;
}

function parsePersonalYearSection(content: string): Record<number, PersonalYearInfo> {
  const yearData: Record<number, PersonalYearInfo> = {};
  
  // Default personal year meanings
  const yearMeanings = [
    { year: 1, theme: 'New Beginnings', focus: ['Independence', 'Leadership', 'Innovation'] },
    { year: 2, theme: 'Cooperation', focus: ['Partnerships', 'Balance', 'Patience'] },
    { year: 3, theme: 'Expression', focus: ['Creativity', 'Communication', 'Joy'] },
    { year: 4, theme: 'Foundation', focus: ['Hard work', 'Organization', 'Building'] },
    { year: 5, theme: 'Freedom', focus: ['Change', 'Adventure', 'Expansion'] },
    { year: 6, theme: 'Responsibility', focus: ['Family', 'Home', 'Service'] },
    { year: 7, theme: 'Introspection', focus: ['Spirituality', 'Analysis', 'Wisdom'] },
    { year: 8, theme: 'Achievement', focus: ['Success', 'Material goals', 'Recognition'] },
    { year: 9, theme: 'Completion', focus: ['Endings', 'Giving back', 'Wisdom'] },
  ];

  yearMeanings.forEach(({ year, theme, focus }) => {
    yearData[year] = {
      year,
      theme,
      focus,
      opportunities: [`${theme} brings new opportunities`],
      challenges: [`Navigating ${theme.toLowerCase()} energy`],
      months: {},
    };
  });

  return yearData;
}

function parseUniversalDaySection(content: string): Record<number, DayEnergy> {
  const dayData: Record<number, DayEnergy> = {};
  
  // Default universal day meanings
  for (let day = 1; day <= 9; day++) {
    dayData[day] = {
      day,
      energy: `Day ${day} Energy`,
      good: [`Activities aligned with ${day} energy`],
      avoid: [`Activities contrary to ${day} energy`],
    };
  }

  return dayData;
}

function parseRelationshipSection(content: string): RelationshipPatterns {
  return {
    dynamics: {
      '1-1': {
        combination: '1-1',
        description: 'Double Leadership Dynamic',
        strengths: ['Mutual understanding', 'Shared ambition'],
        challenges: ['Power struggles', 'Competition'],
        advice: ['Take turns leading', 'Respect boundaries'],
      },
      // Add more combinations as needed
    },
    advice: {
      general: ['Communication is key', 'Respect differences', 'Find common ground'],
    },
  };
}

// Helper functions
function extractDescription(text: string): string {
  const lines = text.split('\n').filter(line => line.trim());
  return lines[0] || '';
}

function extractListItems(text: string, section: string): string[] {
  const pattern = new RegExp(`${section}:?\\s*([\\s\\S]+?)(?=\\n\\n|\\w+:|$)`, 'i');
  const match = text.match(pattern);
  if (!match) return [];
  
  return match[1]
    .split(/[-•]\s*/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

function extractSection(text: string, section: string): string | null {
  const pattern = new RegExp(`${section}:?\\s*([\\s\\S]+?)(?=\\n\\n|\\w+:|$)`, 'i');
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

function getDefaultLifePaths(): Record<number, LifePathDetails> {
  return {
    1: {
      number: 1,
      title: 'The Leader',
      description: 'Independent, pioneering, and innovative. Natural born leaders who forge their own path.',
      strengths: ['Leadership', 'Innovation', 'Independence', 'Determination'],
      challenges: ['Stubbornness', 'Impatience', 'Self-centeredness'],
      purpose: 'To lead and innovate, bringing new ideas into the world',
      careers: ['Entrepreneur', 'CEO', 'Inventor', 'Pioneer'],
      relationships: 'Needs a partner who respects their independence',
      spiritualPath: 'Learning to balance independence with connection',
    },
    2: {
      number: 2,
      title: 'The Peacemaker',
      description: 'Cooperative, sensitive, and diplomatic. Masters of partnership and collaboration.',
      strengths: ['Cooperation', 'Diplomacy', 'Sensitivity', 'Partnership'],
      challenges: ['Indecisiveness', 'Over-sensitivity', 'Dependency'],
      purpose: 'To bring harmony and balance through cooperation',
      careers: ['Mediator', 'Counselor', 'Diplomat', 'Partner'],
      relationships: 'Thrives in partnerships, needs emotional connection',
      spiritualPath: 'Learning to maintain identity within partnerships',
    },
    // Add more life paths...
  };
}

function getDefaultKnowledge(): NumerologyKnowledge {
  return {
    lifePathMeanings: getDefaultLifePaths(),
    compatibility: {
      soulmates: { 1: [2, 3, 5] },
      compatible: { 1: [4, 6, 7] },
      challenging: { 1: [8, 9] },
      karmic: { 1: [11, 22] },
    },
    personalYears: {},
    universalDays: {},
    relationships: {
      dynamics: {},
      advice: {},
    },
  };
}

// Export specific knowledge getters
export function getLifePathMeaning(lifePathNumber: number): LifePathDetails | null {
  const knowledge = loadKnowledgeBase();
  return knowledge.lifePathMeanings[lifePathNumber] || null;
}

export function getCompatibility(number1: number, number2: number): RelationshipDynamic | null {
  const knowledge = loadKnowledgeBase();
  const key = `${Math.min(number1, number2)}-${Math.max(number1, number2)}`;
  return knowledge.relationships.dynamics[key] || null;
}

export function getPersonalYearMeaning(year: number): PersonalYearInfo | null {
  const knowledge = loadKnowledgeBase();
  return knowledge.personalYears[year] || null;
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
  const knowledge = loadKnowledgeBase();
  
  // Calculate compatibility based on life path numbers
  const lifePath1 = person1Numbers.lifePathNumber;
  const lifePath2 = person2Numbers.lifePathNumber;
  
  let overallScore = 50; // Base score
  const dynamics: string[] = [];
  const strengths: string[] = [];
  const challenges: string[] = [];
  const advice: string[] = [];
  
  // Check if soulmates
  if (knowledge.compatibility.soulmates[lifePath1]?.includes(lifePath2)) {
    overallScore += 30;
    dynamics.push('Soulmate connection');
    strengths.push('Natural understanding and harmony');
  }
  
  // Check if compatible
  if (knowledge.compatibility.compatible[lifePath1]?.includes(lifePath2)) {
    overallScore += 20;
    dynamics.push('Compatible energies');
    strengths.push('Complementary strengths');
  }
  
  // Check if challenging
  if (knowledge.compatibility.challenging[lifePath1]?.includes(lifePath2)) {
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