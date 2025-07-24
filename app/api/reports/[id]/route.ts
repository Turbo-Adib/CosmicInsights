import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const reportId = params.id;

    // Fetch the report
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            subscriptions: {
              select: {
                plan: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Reports are accessible via direct link
    // No authentication required for one-time purchase model
    // 3. It's a recent quiz report (created within last 24 hours)
    // 4. User has the direct link (implicit permission)
    
    // Determine content access level based on payment status
    let accessLevel = 'teaser'; // Default to teaser
    
    if (report.isPaid) {
      accessLevel = 'premium';
    }

    // Filter content based on access level
    const filteredContent = filterReportContent(report.content as any, accessLevel);

    // Track report view
    await prisma.report.update({
      where: { id: reportId },
      data: {
        viewCount: { increment: 1 },
        lastViewedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      report: {
        id: report.id,
        title: report.title,
        type: report.type,
        createdAt: report.createdAt,
        content: filteredContent,
        accessLevel,
        isPaid: report.isPaid,
      },
      user: null, // No user data in anonymous model
      upgrade: {
        available: accessLevel !== 'premium',
        currentLevel: accessLevel,
        benefits: getUpgradeBenefits(accessLevel),
      },
    });

  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

function filterReportContent(content: any, accessLevel: string) {
  const { quizData, numerology, personalityProfile, lifeContext } = content || {};
  
  // Ensure we have the required data
  if (!quizData || !numerology) {
    return {
      error: 'Invalid report data',
      accessLevel
    };
  }
  
  switch (accessLevel) {
    case 'teaser':
      // Enhanced free content (60-70% of value) for anonymous/non-paying users
      const personalYear = calculatePersonalYear(quizData.birthDate);
      return {
        numerology: {
          lifePathNumber: numerology.lifePathNumber,
          lifePathSummary: getBasicLifePathMeaning(numerology.lifePathNumber),
          lifePathMeaning: getLifePathAnalysis(numerology.lifePathNumber),
          expressionNumber: numerology.expressionNumber,
          expressionMeaning: getExpressionNumberMeaning(numerology.expressionNumber),
          birthDayNumber: numerology.birthDayNumber,
          birthDayMeaning: getBirthDayMeaning(numerology.birthDayNumber),
          // Show full calculation to build trust
          lifePathCalculation: getLifePathCalculationExplanation(quizData.birthDate, numerology.lifePathNumber),
        },
        personalityProfile: {
          overview: generatePersonalityOverview(numerology, personalityProfile || {}),
          strengths: getPersonalityStrengths(personalityProfile || {}, numerology),
          challenges: getPersonalityChallenges(personalityProfile || {}, numerology),
          insights: getPersonalityInsights(personalityProfile || {}, numerology),
        },
        currentInfluences: {
          personalYear: personalYear,
          personalMonth: calculatePersonalMonth(quizData.birthDate),
          currentPhase: lifeContext?.lifePhase || 'discovering',
          recommendations: generateBasicRecommendations(personalYear, lifeContext || {}),
        },
        compatibility: {
          bestMatches: getCompatibilityDetails(numerology.lifePathNumber),
          relationshipStyle: getRelationshipStyle(numerology.lifePathNumber, personalityProfile?.relationshipStyle),
          tips: getRelationshipTips(numerology.lifePathNumber),
        },
        career: {
          overview: getCareerOverview(numerology.lifePathNumber, personalityProfile?.careerMotivation),
          topCareers: getBasicCareerGuidance(numerology.lifePathNumber).slice(0, 3), // Show 3 of 8
          workStyle: getWorkStyle(numerology.lifePathNumber),
        },
        // Clearly marked premium content to create desire
        lockedSections: {
          deepAnalysis: {
            title: '🔒 Deep Soul Mission & Karmic Patterns',
            preview: 'Uncover your soul\'s true purpose and past life influences',
            samples: [
              'Your karmic debt number reveals...',
              'Hidden talents waiting to emerge...',
              'Spiritual gifts you\'re meant to develop...'
            ],
          },
          advancedCompatibility: {
            title: '🔒 Complete Compatibility Analysis',
            preview: 'Detailed compatibility with all Life Path numbers',
            samples: [
              'Soulmate indicators and timing',
              'Karmic relationship patterns',
              'Compatibility percentage calculator'
            ],
          },
          monthByMonth: {
            title: '🔒 12-Month Personal Forecast',
            preview: 'Precise timing for love, money, and major decisions',
            samples: [
              `${getNextMonthName()}: Major opportunity for career advancement...`,
              'Lucky days for financial decisions',
              'Best months for finding love'
            ],
          },
          actionPlan: {
            title: '🔒 Your 90-Day Success Blueprint',
            preview: 'Step-by-step personalized action plan',
            samples: [
              'Week 1-2: Foundation building exercises',
              'Daily rituals for your Life Path',
              'Manifestation techniques for your numbers'
            ],
          },
        },
        upgradePrompt: {
          message: 'Unlock your complete cosmic blueprint',
          price: '$9',
          savings: 'Usually $49 - Save 80% today',
          bonuses: [
            '✨ Lifetime access to your full report',
            '📊 Monthly forecast updates',
            '💎 Bonus: Lucky numbers & crystals guide',
            '📧 Email support from our numerologists'
          ],
        },
        accessLevel: 'teaser',
      };
      
    case 'free':
      // Basic content for registered users
      return {
        numerology: {
          ...numerology,
          // Add partial insights to create desire for more
          lifePathAnalysis: {
            basic: getLifePathAnalysis(numerology.lifePathNumber),
            premium: '🔒 Unlock deep karmic patterns and soul mission',
          },
        },
        personalityProfile: {
          ...personalityProfile,
          insights: getPersonalityInsights(personalityProfile, numerology),
        },
        basicInsights: {
          lifePathMeaning: getBasicLifePathMeaning(numerology.lifePathNumber),
          currentPhase: lifeContext?.lifePhase || 'discovering',
          personalYear: calculatePersonalYear(quizData.birthDate),
          // Show one compatibility match to create interest
          topCompatibility: `Most compatible with Life Path ${getTopCompatibility(numerology.lifePathNumber)}`,
        },
        lockedContent: {
          monthByMonth: {
            preview: 'See your personal forecast for each month',
            sample: 'January: New beginnings in career...',
          },
          careerPaths: {
            preview: `Your top career matches as a Life Path ${numerology.lifePathNumber}`,
            count: 8,
          },
          soulMission: {
            preview: 'Your higher purpose and spiritual calling',
            teaser: 'You incarnated to master...',
          },
        },
        upgradePrompt: {
          message: 'You\'re only seeing 30% of your report',
          missingInsights: 42,
        },
        accessLevel: 'free',
      };
      
    case 'basic':
      // Enhanced content for basic subscribers
      return {
        quizData: {
          firstName: quizData.firstName,
          birthDate: quizData.birthDate,
        },
        numerology: {
          ...numerology,
          detailedAnalysis: getLifePathAnalysis(numerology.lifePathNumber),
        },
        personalityProfile,
        lifeContext,
        enhancedInsights: {
          lifePathAnalysis: getLifePathAnalysis(numerology.lifePathNumber),
          personalYearForecast: calculatePersonalYear(quizData.birthDate),
          compatibilityOverview: getBasicCompatibility(numerology.lifePathNumber),
          careerSuggestions: getBasicCareerGuidance(numerology.lifePathNumber),
          currentChallenges: getCurrentChallenges(lifeContext, numerology),
        },
        premiumTeaser: {
          spiritualPath: '🔒 Unlock your spiritual evolution path',
          monthlyTiming: '🔒 Get specific dates for important actions',
          deepCompatibility: '🔒 See karmic connections and past life bonds',
          actionPlan: '🔒 Get your personalized 90-day action plan',
        },
        accessLevel: 'basic',
      };
      
    case 'premium':
      // Full content for premium subscribers
      return {
        ...content,
        premiumInsights: {
          detailedLifePath: getDetailedLifePathAnalysis(numerology),
          relationshipCompatibility: getRelationshipCompatibility(numerology),
          careerGuidance: getCareerGuidance(numerology, personalityProfile),
          spiritualPath: getSpiritualInsights(numerology, personalityProfile),
          monthlyForecast: getMonthlyForecast(quizData.birthDate),
          actionPlan: generateActionPlan(content),
          bonusContent: {
            crystalsAndColors: getVibrationalMatches(numerology),
            luckyDates: calculateLuckyDates(quizData.birthDate),
            nameAnalysis: analyzeCurrentName(quizData),
            pastLifeInfluences: getPastLifePatterns(numerology),
          },
        },
        accessLevel: 'premium',
      };
      
    default:
      return { accessLevel: 'teaser' };
  }
}

function getUpgradeBenefits(currentLevel: string) {
  const allBenefits = {
    teaser: [
      '✨ Complete Life Path analysis with karmic lessons',
      '💕 Compatibility with all 12 Life Path numbers',
      '📅 Personal Year, Month & Day forecasts',
      '💼 Your top 8 ideal career paths',
      '🔮 Hidden talents and soul gifts',
      '📊 12-month timing forecast',
      '💎 Lucky numbers, colors & crystals',
    ],
    free: [
      '🌟 Deep dive into your Expression & Soul Urge numbers',
      '❤️ Soulmate numbers and karmic relationships',
      '📈 Month-by-month action plan for success',
      '🎯 Life purpose and mission clarity',
      '⏰ Best dates for love, money & major decisions',
      '🔥 Past life influences on current path',
      '💰 Financial success timing',
    ],
    basic: [
      '👁️ Spiritual evolution and ascension path',
      '💑 Deep compatibility analysis for specific partners',
      '🌙 Daily personal forecasts',
      '💫 Advanced manifestation techniques',
      '🎁 Bonus: Name change analysis',
      '📧 Priority support from numerologists',
      '🔄 Quarterly forecast updates',
    ],
  };
  
  return allBenefits[currentLevel as keyof typeof allBenefits] || [];
}

// Simplified helper functions - these would pull from the knowledge base
function getBasicLifePathMeaning(lifePathNumber: number): string {
  const meanings: Record<number, string> = {
    1: 'The Leader - Independent, pioneering, and innovative',
    2: 'The Peacemaker - Cooperative, sensitive, and diplomatic',
    3: 'The Communicator - Creative, expressive, and optimistic',
    4: 'The Builder - Practical, loyal, and hardworking',
    5: 'The Freedom Seeker - Adventurous, versatile, and progressive',
    6: 'The Nurturer - Responsible, caring, and protective',
    7: 'The Seeker - Analytical, introspective, and spiritual',
    8: 'The Achiever - Ambitious, organized, and material-focused',
    9: 'The Humanitarian - Compassionate, generous, and idealistic',
    11: 'The Intuitive - Visionary, inspiring, and spiritually aware',
    22: 'The Master Builder - Powerful, practical, and visionary',
    33: 'The Master Teacher - Selfless, devoted, and spiritually evolved',
  };
  
  return meanings[lifePathNumber] || 'Unique path requiring deeper analysis';
}

function getLifePathAnalysis(lifePathNumber: number): any {
  // This would pull from the knowledge base
  return {
    overview: getBasicLifePathMeaning(lifePathNumber),
    strengths: ['Leadership', 'Innovation', 'Independence'],
    challenges: ['Patience', 'Collaboration', 'Emotional expression'],
    opportunities: ['Starting new ventures', 'Leading teams', 'Breaking new ground'],
  };
}

function calculatePersonalYear(birthDate: string): any {
  // Simplified personal year calculation
  const birth = new Date(birthDate);
  const currentYear = new Date().getFullYear();
  const month = birth.getMonth() + 1;
  const day = birth.getDate();
  
  const personalYear = ((month + day + currentYear) % 9) || 9;
  
  return {
    year: personalYear,
    theme: `Personal Year ${personalYear}`,
    focus: 'New beginnings and fresh starts',
  };
}

function getDetailedLifePathAnalysis(numerology: any): any {
  // This would be much more comprehensive using the knowledge base
  return {
    coreMeaning: 'Detailed analysis from knowledge base',
    karmaLessons: 'Past life influences and current life purpose',
    soulMission: 'Your higher purpose and spiritual calling',
    hiddenTalents: 'Undiscovered abilities waiting to emerge',
  };
}

function getRelationshipCompatibility(numerology: any): any {
  // Pull from knowledge base compatibility charts
  return {
    soulmates: [2, 6, 9],
    compatible: [3, 5, 7],
    challenging: [4, 8],
    dynamicPairs: [[1, 1], [1, 5], [1, 7]],
  };
}

function getCareerGuidance(numerology: any, personality: any): any {
  return {
    idealCareers: ['Entrepreneur', 'CEO', 'Innovator'],
    workStyle: 'Independent and pioneering',
    teamDynamics: 'Natural leader who inspires others',
    successTiming: 'Best periods for career moves',
  };
}

function getSpiritualInsights(numerology: any, personality: any): any {
  return {
    spiritualGifts: 'Intuition and visionary abilities',
    practices: ['Meditation', 'Journaling', 'Nature connection'],
    evolution: 'Your spiritual growth trajectory',
  };
}

function getMonthlyForecast(birthDate: string): any {
  return {
    currentMonth: 'Favorable for new beginnings',
    nextMonth: 'Focus on relationships',
    keyDates: ['5th - Important decision', '15th - New opportunity'],
  };
}

function generateActionPlan(content: any): any {
  return {
    immediate: ['Start daily meditation practice', 'Journal your goals'],
    shortTerm: ['Launch that project', 'Strengthen key relationships'],
    longTerm: ['Build your legacy', 'Develop spiritual practice'],
  };
}

// New helper functions for enhanced content filtering
function getLifePathTeaser(lifePathNumber: number): string {
  const teasers: Record<number, string> = {
    1: 'leadership and pioneering innovation',
    2: 'partnership and diplomatic mastery',
    3: 'creative expression and communication',
    4: 'building lasting foundations',
    5: 'freedom and adventurous exploration',
    6: 'nurturing and healing others',
    7: 'spiritual wisdom and deep analysis',
    8: 'material success and achievement',
    9: 'humanitarian service and completion',
    11: 'intuitive mastery and inspiration',
    22: 'master building and grand visions',
    33: 'master teaching and healing',
  };
  return teasers[lifePathNumber] || 'extraordinary achievements';
}

function getCompatibilityTeaser(lifePathNumber: number): string {
  const compatibility: Record<number, string> = {
    1: '2, 3, and 5',
    2: '1, 4, and 8',
    3: '1, 5, and 9',
    4: '2, 6, and 8',
    5: '1, 3, and 7',
    6: '2, 4, and 9',
    7: '5, 7, and 11',
    8: '2, 4, and 6',
    9: '3, 6, and 9',
    11: '2, 7, and 22',
    22: '4, 8, and 11',
    33: '6, 9, and 33',
  };
  return compatibility[lifePathNumber] || '2, 6, and 9';
}

function getLifePathPreview(lifePathNumber: number): string {
  const previews: Record<number, string> = {
    1: 'you struggle with patience but excel at innovation',
    2: 'relationships are your greatest teacher and strength',
    3: 'your creativity needs daily expression for happiness',
    4: 'structure brings you freedom, not limitation',
    5: 'variety is essential for your soul\'s growth',
    6: 'service to others fulfills your life purpose',
    7: 'solitude unlocks your greatest insights',
    8: 'material success reflects your spiritual alignment',
    9: 'letting go opens doors to your highest potential',
    11: 'your intuition is your superpower',
    22: 'you can manifest dreams into reality',
    33: 'unconditional love is your path to mastery',
  };
  return previews[lifePathNumber] || 'your unique path holds special gifts';
}

function getPersonalityInsights(profile: any, numerology: any): any {
  const insights = [];
  
  // Energy alignment
  if (profile.energySource === 'social' && [3, 5, 8].includes(numerology.lifePathNumber)) {
    insights.push('Your social energy perfectly aligns with your Life Path');
  } else if (profile.energySource === 'solitude' && [7, 4, 2].includes(numerology.lifePathNumber)) {
    insights.push('Your need for solitude supports your spiritual growth');
  }
  
  // Decision style
  if (profile.decisionStyle === 'intuition' && [2, 7, 11].includes(numerology.lifePathNumber)) {
    insights.push('Trust your gut - it\'s aligned with your soul\'s wisdom');
  }
  
  return insights;
}

function getTopCompatibility(lifePathNumber: number): number {
  const topMatches: Record<number, number> = {
    1: 5, 2: 8, 3: 9, 4: 6, 5: 1, 6: 2, 7: 5, 8: 4, 9: 3, 11: 22, 22: 11, 33: 6,
  };
  return topMatches[lifePathNumber] || 6;
}

function getBasicCompatibility(lifePathNumber: number): any {
  return {
    bestMatches: getCompatibilityTeaser(lifePathNumber),
    challenging: 'Discover which numbers challenge your growth',
    karmic: 'Some connections are meant to teach specific lessons',
  };
}

function getBasicCareerGuidance(lifePathNumber: number): string[] {
  const careers: Record<number, string[]> = {
    1: ['Entrepreneur', 'CEO', 'Inventor'],
    2: ['Counselor', 'Diplomat', 'Teacher'],
    3: ['Artist', 'Writer', 'Speaker'],
    4: ['Engineer', 'Architect', 'Manager'],
    5: ['Travel Writer', 'Sales', 'Performer'],
    6: ['Healer', 'Teacher', 'Designer'],
    7: ['Researcher', 'Analyst', 'Spiritual Teacher'],
    8: ['Business Owner', 'Finance', 'Real Estate'],
    9: ['Humanitarian', 'Artist', 'Healer'],
    11: ['Spiritual Teacher', 'Psychic', 'Artist'],
    22: ['Architect', 'CEO', 'Global Leader'],
    33: ['Master Teacher', 'Healer', 'Spiritual Leader'],
  };
  return careers[lifePathNumber] || ['Leader', 'Creator', 'Helper'];
}

function getCurrentChallenges(lifeContext: any, numerology: any): any {
  return {
    primary: `Your current ${lifeContext?.currentChallenge || 'life'} challenge aligns with your growth`,
    opportunities: 'This phase brings hidden blessings',
    timing: 'Optimal resolution window opens soon',
  };
}

function getVibrationalMatches(numerology: any): any {
  return {
    colors: ['Purple', 'Gold', 'White'],
    crystals: ['Amethyst', 'Clear Quartz', 'Citrine'],
    elements: 'Fire and Air support your energy',
  };
}

function calculateLuckyDates(birthDate: string): any {
  const birth = new Date(birthDate);
  const day = birth.getDate();
  return {
    monthly: [day, day + 9, day + 18].filter(d => d <= 31),
    power: 'Days that match your birth day number',
  };
}

function analyzeCurrentName(quizData: any): any {
  if (!quizData.currentName || quizData.currentName === '') {
    return { using: 'birth name', impact: 'Original vibration intact' };
  }
  return {
    comparison: 'Name change shifted your expression',
    impact: 'New opportunities in communication',
  };
}

function getPastLifePatterns(numerology: any): any {
  return {
    karmaNumber: (numerology.lifePathNumber + 7) % 9 || 9,
    lessons: 'Mastery through repetition',
    gifts: 'Talents carried forward',
  };
}

// New helper functions for enhanced free content
function getExpressionNumberMeaning(expressionNumber: number): string {
  const meanings: Record<number, string> = {
    1: 'Natural born leader with innovative ideas',
    2: 'Diplomatic mediator who brings harmony',
    3: 'Creative communicator with artistic flair',
    4: 'Practical builder with strong work ethic',
    5: 'Dynamic adventurer seeking freedom',
    6: 'Nurturing caregiver who creates beauty',
    7: 'Deep thinker with spiritual wisdom',
    8: 'Ambitious achiever with business acumen',
    9: 'Compassionate humanitarian with global vision',
    11: 'Intuitive visionary with healing abilities',
    22: 'Master architect of grand visions',
    33: 'Master teacher spreading universal love',
  };
  return meanings[expressionNumber] || 'Unique expression of universal energy';
}

function getBirthDayMeaning(birthDay: number): string {
  if (birthDay <= 9) return `Day ${birthDay}: Strong independent energy, natural leadership`;
  if (birthDay === 11) return 'Master number 11: Heightened intuition and spiritual awareness';
  if (birthDay === 22) return 'Master number 22: Ability to manifest dreams into reality';
  if (birthDay >= 10 && birthDay <= 19) return `Teen number ${birthDay}: Karmic lessons around independence`;
  if (birthDay >= 20 && birthDay <= 29) return `Cooperative energy of 2 with ${birthDay % 10} influence`;
  return `Day ${birthDay}: Unique blend of energies creating special opportunities`;
}

function getLifePathCalculationExplanation(birthDate: string, lifePathNumber: number): string {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `Birth date ${month}/${day}/${year} → ${month} + ${day} + ${year} → Reduces to ${lifePathNumber}`;
}

function generatePersonalityOverview(numerology: any, profile: any): string {
  const { lifePathNumber, expressionNumber } = numerology;
  const { energySource, decisionStyle } = profile;
  
  return `As a Life Path ${lifePathNumber}, you possess ${getBasicLifePathMeaning(lifePathNumber).toLowerCase()}. ` +
    `Your ${energySource} energy source combined with your ${decisionStyle} decision-making style ` +
    `creates a unique approach to life that sets you apart.`;
}

function getPersonalityStrengths(profile: any, numerology: any): string[] {
  const strengths = [];
  const baseStrengths = getLifePathAnalysis(numerology.lifePathNumber).strengths || [];
  
  // Add personalized strengths based on quiz answers
  if (profile.energySource === 'social') strengths.push('Natural networking abilities');
  if (profile.decisionStyle === 'intuition') strengths.push('Strong inner guidance system');
  if (profile.careerMotivation === 'leadership') strengths.push('Inspiring others to greatness');
  
  return [...baseStrengths, ...strengths].slice(0, 5);
}

function getPersonalityChallenges(profile: any, numerology: any): string[] {
  const challenges = [];
  const baseChallenges = getLifePathAnalysis(numerology.lifePathNumber).challenges || [];
  
  // Add personalized challenges
  if (profile.stressResponse === 'withdraw') challenges.push('May isolate when support is needed');
  if (profile.lifeApproach === 'planner') challenges.push('Flexibility when plans change');
  
  return [...baseChallenges, ...challenges].slice(0, 4);
}

function calculatePersonalMonth(birthDate: string): any {
  const birth = new Date(birthDate);
  const now = new Date();
  const personalYear = calculatePersonalYear(birthDate).year;
  const currentMonth = now.getMonth() + 1;
  
  const personalMonth = ((personalYear + currentMonth - 1) % 9) + 1;
  
  return {
    month: personalMonth,
    theme: getPersonalMonthTheme(personalMonth),
    focus: getPersonalMonthFocus(personalMonth),
  };
}

function getPersonalMonthTheme(month: number): string {
  const themes: Record<number, string> = {
    1: 'New Beginnings',
    2: 'Cooperation & Patience',
    3: 'Creative Expression',
    4: 'Hard Work & Foundation',
    5: 'Change & Adventure',
    6: 'Responsibility & Love',
    7: 'Reflection & Spirituality',
    8: 'Achievement & Recognition',
    9: 'Completion & Release',
  };
  return themes[month] || 'Transition';
}

function getPersonalMonthFocus(month: number): string {
  const focuses: Record<number, string> = {
    1: 'Start new projects and take initiative',
    2: 'Build partnerships and practice patience',
    3: 'Express yourself creatively and socialize',
    4: 'Focus on work and build solid foundations',
    5: 'Embrace change and seek new experiences',
    6: 'Nurture relationships and home life',
    7: 'Meditate, study, and go within',
    8: 'Push for success and material goals',
    9: 'Complete projects and let go of the past',
  };
  return focuses[month] || 'Stay present and aware';
}

function generateBasicRecommendations(personalYear: any, lifeContext: any): string[] {
  const recommendations = [];
  
  // Personal year based recommendations
  if (personalYear.year <= 3) {
    recommendations.push('Focus on planting seeds for future growth');
  } else if (personalYear.year <= 6) {
    recommendations.push('Time to build upon your foundations');
  } else {
    recommendations.push('Prepare for completion and new cycles');
  }
  
  // Life phase recommendations
  if (lifeContext?.lifePhase === 'building') {
    recommendations.push('Invest in skills that will serve you long-term');
  } else if (lifeContext?.lifePhase === 'transforming') {
    recommendations.push('Trust the transformation process unfolding');
  }
  
  // Challenge-specific recommendations
  if (lifeContext?.currentChallenge === 'career') {
    recommendations.push('Your numbers support bold career moves this year');
  } else if (lifeContext?.currentChallenge === 'love') {
    recommendations.push('Romance is highlighted in your personal cycles');
  }
  
  return recommendations;
}

function getCompatibilityDetails(lifePathNumber: number): any {
  const compatibility = getRelationshipCompatibility({ lifePathNumber } as any);
  return {
    soulmates: compatibility.soulmates,
    compatible: compatibility.compatible,
    growth: compatibility.challenging, // Reframe as growth opportunities
    description: `As a Life Path ${lifePathNumber}, you connect best with numbers that ${
      lifePathNumber <= 3 ? 'match your energy and ambition' :
      lifePathNumber <= 6 ? 'appreciate your stability and care' :
      'respect your depth and wisdom'
    }`,
  };
}

function getRelationshipStyle(lifePathNumber: number, quizStyle: string): string {
  const baseStyles: Record<number, string> = {
    1: 'independent yet passionate',
    2: 'supportive and harmonious',
    3: 'playful and communicative',
    4: 'loyal and dependable',
    5: 'adventurous and freedom-loving',
    6: 'nurturing and protective',
    7: 'deep and selective',
    8: 'powerful and committed',
    9: 'compassionate and giving',
  };
  
  const baseStyle = baseStyles[lifePathNumber] || 'unique and evolving';
  return `Your relationship style is ${baseStyle}, enhanced by your ${quizStyle} approach to partnerships.`;
}

function getRelationshipTips(lifePathNumber: number): string[] {
  const tips: Record<number, string[]> = {
    1: ['Give your partner space to shine too', 'Balance independence with togetherness'],
    2: ['Speak up for your needs', 'Maintain your identity in relationships'],
    3: ['Deep conversations strengthen bonds', 'Balance fun with emotional depth'],
    4: ['Flexibility brings relationship growth', 'Express feelings, not just actions'],
    5: ['Commitment can coexist with freedom', 'Adventure together strengthens bonds'],
    6: ['Self-care enables better caregiving', 'Let others nurture you too'],
    7: ['Share your inner world gradually', 'Physical affection balances mental connection'],
    8: ['Vulnerability is a strength', 'Share power in the relationship'],
    9: ['Boundaries create healthier giving', 'Your needs matter too'],
  };
  
  return tips[lifePathNumber] || ['Communicate openly', 'Grow together'];
}

function getCareerOverview(lifePathNumber: number, careerMotivation: string): string {
  const overview = `Your Life Path ${lifePathNumber} thrives in careers that allow you to ${
    getLifePathTeaser(lifePathNumber)
  }. With your ${careerMotivation} career motivation, you're naturally drawn to roles where you can make a meaningful impact.`;
  
  return overview;
}

function getWorkStyle(lifePathNumber: number): string {
  const styles: Record<number, string> = {
    1: 'Independent self-starter who leads by example',
    2: 'Collaborative team player who creates harmony',
    3: 'Creative innovator who inspires others',
    4: 'Methodical planner who ensures quality',
    5: 'Dynamic multi-tasker who thrives on variety',
    6: 'Supportive mentor who builds strong teams',
    7: 'Strategic analyst who sees deeper patterns',
    8: 'Results-driven executive who achieves goals',
    9: 'Visionary humanitarian who serves the greater good',
  };
  
  return styles[lifePathNumber] || 'Unique contributor with special gifts';
}

function getNextMonthName(): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return months[nextMonth.getMonth()];
}