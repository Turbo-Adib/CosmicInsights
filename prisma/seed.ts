import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test user with profile
  const testUser = await prisma.user.create({
    data: {
      email: 'test@cosmicinsights.com',
      name: 'Test User',
      emailVerified: new Date(),
      profile: {
        create: {
          birthDate: new Date('1990-01-01T10:30:00Z'),
          birthTime: '10:30',
          birthPlace: 'New York, NY, USA',
          birthLatitude: 40.7128,
          birthLongitude: -74.0060,
          timezone: 'America/New_York',
          fullName: 'Test User',
          firstName: 'Test',
          lastName: 'User',
          middleName: null,
          currentName: null,
          gender: 'PREFER_NOT_TO_SAY',
          // Calculated values (example)
          sunSign: 'Capricorn',
          moonSign: 'Pisces',
          risingSign: 'Aquarius',
          lifePathNumber: 3,
          expressionNumber: 7,
          soulUrgeNumber: 9,
          personalityNumber: 5,
          birthDayNumber: 1,
        }
      },
      subscriptions: {
        create: {
          status: 'ACTIVE',
          plan: 'FREE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        }
      }
    },
    include: {
      profile: true,
      subscriptions: true,
    }
  })

  console.log('✅ Created test user:', testUser.email)

  // Create sample reports
  const birthChartReport = await prisma.report.create({
    data: {
      userId: testUser.id,
      type: 'BIRTH_CHART',
      title: 'Your Complete Birth Chart Analysis',
      content: {
        summary: 'Sun in Capricorn, Moon in Pisces, Aquarius Rising',
        planets: {
          sun: { sign: 'Capricorn', house: 11, degree: 10 },
          moon: { sign: 'Pisces', house: 1, degree: 15 },
          mercury: { sign: 'Capricorn', house: 11, degree: 5 },
          venus: { sign: 'Sagittarius', house: 10, degree: 28 },
          mars: { sign: 'Taurus', house: 3, degree: 12 },
        },
        aspects: [
          { planet1: 'sun', planet2: 'moon', type: 'sextile', orb: 5 },
          { planet1: 'mercury', planet2: 'venus', type: 'semisextile', orb: 3 },
        ],
        interpretation: {
          personality: 'Your Capricorn Sun gives you ambition and discipline...',
          emotions: 'With Moon in Pisces, you have deep emotional sensitivity...',
          communication: 'Mercury in Capricorn makes you a practical communicator...',
        }
      },
      summary: 'A unique blend of earth practicality and water intuition defines your cosmic blueprint.',
      isPremium: false,
    }
  })

  const numerologyReport = await prisma.report.create({
    data: {
      userId: testUser.id,
      type: 'NUMEROLOGY_PROFILE',
      title: 'Your Numerology Profile',
      content: {
        lifePathNumber: 3,
        expressionNumber: 7,
        soulUrgeNumber: 9,
        personalityNumber: 5,
        birthDayNumber: 1,
        interpretations: {
          lifePath: 'As a Life Path 3, you are creative, expressive, and optimistic...',
          expression: 'Your Expression Number 7 indicates a deep thinker and seeker of truth...',
          soulUrge: 'With Soul Urge 9, you have a humanitarian heart...',
          personality: 'Personality Number 5 makes you appear adventurous and free-spirited...',
          birthDay: 'Born on the 1st, you are a natural leader...',
        }
      },
      summary: 'Your numbers reveal a creative soul with deep wisdom and humanitarian values.',
      isPremium: false,
    }
  })

  console.log('✅ Created sample reports')

  // Create today's daily insight
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dailyInsight = await prisma.dailyInsight.create({
    data: {
      userId: testUser.id,
      date: today,
      content: {
        overview: "Today's cosmic energies support new beginnings and creative expression.",
        guidance: {
          career: "Take initiative on that project you've been considering.",
          relationships: "Open communication leads to deeper connections.",
          personal: "Trust your intuition when making decisions today.",
        },
        luckyNumbers: [3, 7, 21],
        luckyColors: ['purple', 'gold'],
        affirmation: "I am aligned with the universe's abundance and wisdom.",
      },
      moonPhase: 'Waxing Crescent',
      planetaryTransits: {
        current: [
          { planet: 'Mercury', sign: 'Aquarius', aspect: 'Direct' },
          { planet: 'Venus', sign: 'Pisces', aspect: 'Direct' },
        ]
      },
      personalDay: 5,
      universalDay: 8,
    }
  })

  console.log('✅ Created daily insight for today')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })