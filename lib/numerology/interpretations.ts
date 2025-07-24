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

export const birthDayNumberMeanings: Record<number, {
  title: string;
  specialGift: string;
  overview: string;
  talents: string[];
  lifeLessons: string[];
  careerStrengths: string[];
  relationshipGifts: string;
  challenges: string[];
  advice: string;
}> = {
  1: {
    title: "Born to Lead (Day 1)",
    specialGift: "Natural-born leadership and pioneering spirit",
    overview: "Being born on the 1st gives you an extra dose of independence and leadership abilities. You're meant to be first, to innovate, and to show others the way forward.",
    talents: [
      "Natural leadership that others instinctively follow",
      "Innovation and original thinking",
      "Strong determination and willpower",
      "Ability to initiate and start new ventures",
      "Self-reliance and independence"
    ],
    lifeLessons: [
      "Learning patience with those who move slower",
      "Balancing independence with collaboration",
      "Developing empathy alongside strength",
      "Understanding that true leadership serves others"
    ],
    careerStrengths: ["Entrepreneurship", "Executive roles", "Innovation", "Solo ventures", "Pioneering fields"],
    relationshipGifts: "You bring strength, protection, and stability to relationships. Your partner can count on you to take charge when needed.",
    challenges: ["Stubbornness", "Impatience", "Difficulty delegating", "Tendency to dominate"],
    advice: "Your leadership gift is powerful. Use it to empower others, not just to achieve personal goals."
  },
  2: {
    title: "Born to Harmonize (Day 2)",
    specialGift: "Natural diplomacy and partnership abilities",
    overview: "Born on the 2nd, you have a special gift for bringing people together. You're a natural peacemaker with heightened sensitivity to others' needs.",
    talents: [
      "Exceptional diplomatic skills",
      "Intuitive understanding of others",
      "Natural partnership abilities",
      "Gift for creating harmony",
      "Emotional intelligence"
    ],
    lifeLessons: [
      "Learning to value your own needs equally",
      "Developing confidence in your decisions",
      "Balancing sensitivity with strength",
      "Finding your voice in partnerships"
    ],
    careerStrengths: ["Mediation", "Counseling", "Team collaboration", "Customer relations", "Arts"],
    relationshipGifts: "You bring deep emotional understanding and create a harmonious home. Your sensitivity helps you anticipate your partner's needs.",
    challenges: ["Over-sensitivity", "Indecisiveness", "People-pleasing", "Self-doubt"],
    advice: "Your sensitivity is a superpower. Trust it, but don't let it override your own needs and desires."
  },
  3: {
    title: "Born to Express (Day 3)",
    specialGift: "Natural creativity and communication abilities",
    overview: "Being born on the 3rd blessed you with exceptional creative and communication gifts. You're meant to bring joy and inspiration to the world.",
    talents: [
      "Natural creativity and artistic abilities",
      "Exceptional communication skills",
      "Ability to inspire and uplift others",
      "Social magnetism and charm",
      "Quick wit and humor"
    ],
    lifeLessons: [
      "Learning to focus creative energy",
      "Developing discipline alongside inspiration",
      "Balancing expression with listening",
      "Completing projects instead of just starting them"
    ],
    careerStrengths: ["Arts", "Writing", "Speaking", "Entertainment", "Marketing", "Teaching"],
    relationshipGifts: "You bring joy, laughter, and creative spark to relationships. Life with you is never boring.",
    challenges: ["Scattered focus", "Mood swings", "Superficiality", "Procrastination"],
    advice: "Your creative gifts can change the world. Channel them with purpose and discipline for maximum impact."
  },
  4: {
    title: "Born to Build (Day 4)",
    specialGift: "Natural organization and building abilities",
    overview: "Born on the 4th, you have a special talent for creating order from chaos and building things that last. You're the foundation others can rely on.",
    talents: [
      "Exceptional organizational abilities",
      "Natural problem-solving skills",
      "Strong work ethic and reliability",
      "Attention to detail",
      "Ability to create lasting structures"
    ],
    lifeLessons: [
      "Learning flexibility within structure",
      "Balancing work with play",
      "Embracing change when necessary",
      "Trusting intuition alongside logic"
    ],
    careerStrengths: ["Management", "Engineering", "Finance", "Architecture", "Systems design"],
    relationshipGifts: "You bring stability, loyalty, and dependability. Your partner always knows they can count on you.",
    challenges: ["Rigidity", "Workaholism", "Resistance to change", "Over-criticism"],
    advice: "Your ability to build and organize is a gift. Remember that the strongest structures have flexibility built in."
  },
  5: {
    title: "Born to Explore (Day 5)",
    specialGift: "Natural freedom and adventure spirit",
    overview: "Being born on the 5th gives you an insatiable curiosity and love of freedom. You're meant to explore, experience, and expand horizons.",
    talents: [
      "Natural adaptability and versatility",
      "Gift for communication and languages",
      "Ability to thrive in change",
      "Magnetic personality",
      "Progressive thinking"
    ],
    lifeLessons: [
      "Learning commitment within freedom",
      "Balancing adventure with responsibility",
      "Developing focus amid many interests",
      "Understanding that true freedom requires discipline"
    ],
    careerStrengths: ["Sales", "Travel industry", "Communications", "Marketing", "Consulting"],
    relationshipGifts: "You bring excitement, adventure, and growth to relationships. Life with you is an adventure.",
    challenges: ["Restlessness", "Commitment issues", "Impulsiveness", "Scattered energy"],
    advice: "Your need for freedom is valid. Create a life that honors this while maintaining meaningful connections."
  },
  6: {
    title: "Born to Nurture (Day 6)",
    specialGift: "Natural healing and nurturing abilities",
    overview: "Born on the 6th, you have an exceptional gift for nurturing and creating beauty. You're a natural healer and caretaker.",
    talents: [
      "Natural nurturing and healing abilities",
      "Strong sense of responsibility",
      "Artistic and aesthetic gifts",
      "Ability to create harmony",
      "Teaching abilities"
    ],
    lifeLessons: [
      "Learning to receive as well as give",
      "Setting healthy boundaries",
      "Balancing perfectionism with acceptance",
      "Nurturing yourself alongside others"
    ],
    careerStrengths: ["Healthcare", "Teaching", "Counseling", "Arts", "Interior design", "Social work"],
    relationshipGifts: "You bring deep caring, beauty, and a nurturing home environment. Your love heals and transforms.",
    challenges: ["Over-responsibility", "Perfectionism", "Self-sacrifice", "Control issues"],
    advice: "Your nurturing gift is precious. Remember that you can't pour from an empty cup - care for yourself too."
  },
  7: {
    title: "Born to Seek (Day 7)",
    specialGift: "Natural wisdom and spiritual abilities",
    overview: "Being born on the 7th gives you a natural connection to the mysteries of life. You're a seeker of truth with profound intuitive gifts.",
    talents: [
      "Deep analytical abilities",
      "Natural spiritual connection",
      "Exceptional intuition",
      "Research and investigation skills",
      "Philosophical thinking"
    ],
    lifeLessons: [
      "Learning to trust others",
      "Balancing solitude with connection",
      "Sharing your wisdom accessibly",
      "Integrating spiritual and material worlds"
    ],
    careerStrengths: ["Research", "Analysis", "Spiritual teaching", "Writing", "Investigation", "Technology"],
    relationshipGifts: "You bring depth, wisdom, and spiritual connection. Your partner grows through your insights.",
    challenges: ["Isolation", "Overthinking", "Trust issues", "Perfectionism"],
    advice: "Your seeking nature leads to profound truths. Share them with humility and make them practical for others."
  },
  8: {
    title: "Born to Achieve (Day 8)",
    specialGift: "Natural business acumen and material mastery",
    overview: "Born on the 8th, you have exceptional abilities for material success and achievement. You're meant to demonstrate ethical use of power.",
    talents: [
      "Natural business and financial abilities",
      "Strong leadership qualities",
      "Ability to manifest goals",
      "Excellent judgment",
      "Organizational skills"
    ],
    lifeLessons: [
      "Learning to balance material and spiritual",
      "Using power to serve others",
      "Developing patience with slower progress",
      "Understanding that true wealth includes relationships"
    ],
    careerStrengths: ["Business", "Finance", "Real estate", "Law", "Management", "Politics"],
    relationshipGifts: "You bring security, ambition, and the ability to build a prosperous life together.",
    challenges: ["Workaholism", "Materialism", "Control issues", "Impatience"],
    advice: "Your ability to achieve is remarkable. Use it to create value that benefits many, not just yourself."
  },
  9: {
    title: "Born to Serve (Day 9)",
    specialGift: "Natural humanitarian and wisdom gifts",
    overview: "Being born on the 9th gives you old soul wisdom and a humanitarian heart. You're meant to serve humanity with your gifts.",
    talents: [
      "Deep compassion and empathy",
      "Natural wisdom beyond your years",
      "Artistic and creative abilities",
      "Global perspective",
      "Healing presence"
    ],
    lifeLessons: [
      "Learning personal boundaries",
      "Balancing idealism with practicality",
      "Accepting human imperfection",
      "Taking care of personal needs"
    ],
    careerStrengths: ["Non-profit work", "Teaching", "Arts", "Healing", "Environmental work", "Philosophy"],
    relationshipGifts: "You bring deep understanding, unconditional love, and spiritual depth to relationships.",
    challenges: ["Martyrdom", "Disappointment in others", "Boundary issues", "Escapism"],
    advice: "Your humanitarian spirit is beautiful. Remember that you serve best when you're also taking care of yourself."
  },
  10: {
    title: "Born to Pioneer (Day 10)",
    specialGift: "Leadership with added intuition",
    overview: "Born on the 10th, you combine the leadership of 1 with the intuition of 0. You're a pioneering leader with spiritual awareness.",
    talents: [
      "Inspired leadership abilities",
      "Original thinking",
      "Intuitive decision-making",
      "Ability to inspire others",
      "Natural confidence"
    ],
    lifeLessons: [
      "Balancing confidence with humility",
      "Including others in your vision",
      "Patience with collective progress",
      "Integrating intuition with logic"
    ],
    careerStrengths: ["Entrepreneurship", "Innovation", "Leadership roles", "Motivational fields", "Pioneering ventures"],
    relationshipGifts: "You bring inspired leadership and help your partner believe in their own potential.",
    challenges: ["Impatience", "Ego issues", "Difficulty following", "Restlessness"],
    advice: "Your pioneering spirit combined with intuition is powerful. Lead from the heart as well as the head."
  },
  11: {
    title: "Born to Illuminate (Day 11)",
    specialGift: "Master number intuition and inspiration",
    overview: "Being born on the 11th makes you a natural channel for divine inspiration. You have heightened intuitive and psychic abilities.",
    talents: [
      "Exceptional intuitive abilities",
      "Natural inspiration and vision",
      "Psychic sensitivity",
      "Ability to uplift others",
      "Spiritual leadership"
    ],
    lifeLessons: [
      "Grounding spiritual energy practically",
      "Managing sensitive nervous system",
      "Trusting your intuitive gifts",
      "Balancing inspiration with action"
    ],
    careerStrengths: ["Spiritual teaching", "Intuitive counseling", "Arts", "Healing", "Inspirational speaking"],
    relationshipGifts: "You bring spiritual depth and help your partner connect with their higher self.",
    challenges: ["Nervous anxiety", "Over-sensitivity", "Impracticality", "Self-doubt"],
    advice: "Your intuitive gifts are meant to inspire humanity. Trust them and ground them in practical service."
  },
  12: {
    title: "Born to Create Harmony (Day 12)",
    specialGift: "Creative expression with partnership ability",
    overview: "Born on the 12th, you combine creativity (3) with cooperation (1+2). You excel at creative partnerships and collaborative expression.",
    talents: [
      "Creative collaboration abilities",
      "Natural mediator in creative fields",
      "Ability to inspire teamwork",
      "Artistic expression",
      "Social creativity"
    ],
    lifeLessons: [
      "Balancing individual and group expression",
      "Maintaining creative focus",
      "Asserting your creative vision",
      "Completing collaborative projects"
    ],
    careerStrengths: ["Collaborative arts", "Team leadership", "Creative direction", "Teaching arts", "Entertainment"],
    relationshipGifts: "You bring creative spark and the ability to create together. Relationships are your canvas.",
    challenges: ["Scattered focus", "People-pleasing", "Creative blocks", "Indecision"],
    advice: "Your gift lies in creative collaboration. You achieve more together than alone."
  },
  13: {
    title: "Born to Transform (Day 13)",
    specialGift: "Transformation through hard work",
    overview: "Born on the 13th, you have the power to transform challenges into achievements through dedication. Often misunderstood, 13 is actually a powerful number.",
    talents: [
      "Ability to transform difficulties",
      "Strong work ethic",
      "Practical creativity",
      "Determined focus",
      "Building from the ground up"
    ],
    lifeLessons: [
      "Seeing challenges as opportunities",
      "Balancing work with joy",
      "Trusting the transformation process",
      "Celebrating small victories"
    ],
    careerStrengths: ["Renovation/transformation fields", "Crisis management", "Building businesses", "Reform work"],
    relationshipGifts: "You bring the ability to work through challenges and create something beautiful from difficulty.",
    challenges: ["Pessimism", "Workaholism", "Fear of change", "Self-limitation"],
    advice: "Your ability to transform is your superpower. What seems like limitation becomes your liberation."
  },
  14: {
    title: "Born to Experience (Day 14)",
    specialGift: "Freedom through emotional intelligence",
    overview: "Born on the 14th, you combine freedom (5) with emotional depth. You're meant to explore life while maintaining meaningful connections.",
    talents: [
      "Emotional adaptability",
      "Communication across differences",
      "Risk-taking with wisdom",
      "Magnetic charisma",
      "Learning through experience"
    ],
    lifeLessons: [
      "Freedom within commitment",
      "Learning from experiences",
      "Balancing adventure with stability",
      "Emotional responsibility"
    ],
    careerStrengths: ["International business", "Travel writing", "Cross-cultural work", "Sales", "Communications"],
    relationshipGifts: "You bring excitement and emotional depth. Adventures are more meaningful with you.",
    challenges: ["Restlessness", "Emotional volatility", "Commitment fears", "Excess"],
    advice: "Your need for experience is valid. Create a life that provides both adventure and emotional connection."
  },
  15: {
    title: "Born to Love (Day 15)",
    specialGift: "Nurturing with personal magnetism",
    overview: "Born on the 15th, you combine nurturing (6) with magnetism and charm. You have a special gift for creating beauty and harmony.",
    talents: [
      "Magnetic nurturing presence",
      "Creating beautiful environments",
      "Natural counseling abilities",
      "Artistic expression",
      "Family leadership"
    ],
    lifeLessons: [
      "Independence within family",
      "Self-care alongside others",
      "Releasing control",
      "Accepting imperfection"
    ],
    careerStrengths: ["Family counseling", "Interior design", "Hospitality", "Arts", "Community leadership"],
    relationshipGifts: "You create a beautiful, harmonious home and have a magnetic quality that draws love.",
    challenges: ["Over-attachment", "Perfectionism", "Martyrdom", "Control"],
    advice: "Your ability to create beauty and harmony is a gift. Use it to nurture yourself as well as others."
  },
  16: {
    title: "Born to Awaken (Day 16)",
    specialGift: "Spiritual awakening through challenge",
    overview: "Born on the 16th, you have a karmic path of spiritual awakening, often through unexpected changes. You're meant to find the spiritual in the material.",
    talents: [
      "Spiritual resilience",
      "Deep introspection",
      "Ability to rebuild",
      "Finding meaning in challenge",
      "Teaching through experience"
    ],
    lifeLessons: [
      "Trusting life's process",
      "Finding stability within change",
      "Spiritual vs material balance",
      "Releasing the past"
    ],
    careerStrengths: ["Spiritual counseling", "Crisis support", "Transformation coaching", "Rebuilding projects"],
    relationshipGifts: "You bring depth and the ability to support partners through any challenge.",
    challenges: ["Fear of change", "Attachment issues", "Pride", "Isolation"],
    advice: "Your path includes sudden awakenings. Trust that every ending is a new beginning in disguise."
  },
  17: {
    title: "Born to Excel (Day 17)",
    specialGift: "Material success with spiritual awareness",
    overview: "Born on the 17th, you combine material mastery (8) with spiritual seeking. You're meant to achieve success while maintaining spiritual values.",
    talents: [
      "Business with integrity",
      "Spiritual leadership",
      "Quality over quantity focus",
      "Independent success",
      "Teaching through achievement"
    ],
    lifeLessons: [
      "Balancing material and spiritual",
      "Sharing success with others",
      "Patience with progress",
      "Inner success matters most"
    ],
    careerStrengths: ["Ethical business", "Quality brands", "Spiritual entrepreneurship", "Investment", "Consulting"],
    relationshipGifts: "You bring both material security and spiritual depth, creating a balanced life.",
    challenges: ["Workaholism", "Isolation", "Perfectionism", "Material attachment"],
    advice: "Your path to success includes spiritual awareness. This combination makes you unstoppable."
  },
  18: {
    title: "Born to Serve Humanity (Day 18)",
    specialGift: "Humanitarian service with material resources",
    overview: "Born on the 18th, you combine humanitarian spirit (9) with the ability to manifest resources. You're meant to serve humanity practically.",
    talents: [
      "Practical humanitarianism",
      "Business for good",
      "Global perspective",
      "Resource management",
      "Inspiring generosity"
    ],
    lifeLessons: [
      "Balancing personal and universal",
      "Sustainable giving",
      "Accepting human nature",
      "Self-care within service"
    ],
    careerStrengths: ["Non-profit management", "Social enterprise", "Global business", "Philanthropy", "Teaching"],
    relationshipGifts: "You bring a generous spirit and the ability to create a life of meaningful service together.",
    challenges: ["Burnout", "Disappointment", "Boundaries", "Martyrdom"],
    advice: "Your humanitarian spirit combined with practical abilities can change the world. Start where you are."
  },
  19: {
    title: "Born to Lead Independently (Day 19)",
    specialGift: "Independent leadership with completion ability",
    overview: "Born on the 19th, you have strong leadership combined with the wisdom to complete cycles. You're meant to lead while honoring endings.",
    talents: [
      "Independent leadership",
      "Completion abilities",
      "Self-reliance",
      "Teaching leadership",
      "Karmic understanding"
    ],
    lifeLessons: [
      "Leadership through service",
      "Accepting support",
      "Patience with others",
      "Completing before starting new"
    ],
    careerStrengths: ["Independent consulting", "Leadership training", "Solo enterprises", "Project completion", "Coaching"],
    relationshipGifts: "You bring strong leadership while understanding the importance of allowing space for growth.",
    challenges: ["Isolation", "Impatience", "Pride", "Difficulty delegating"],
    advice: "Your independent spirit is strong. Remember that true leaders also know when to follow and when to complete."
  },
  20: {
    title: "Born to Cooperate (Day 20)",
    specialGift: "Enhanced sensitivity and cooperation",
    overview: "Born on the 20th, you have heightened sensitivity and cooperative abilities. You're a master at understanding and working with others.",
    talents: [
      "Exceptional cooperation",
      "Emotional intelligence",
      "Team building",
      "Diplomatic skills",
      "Intuitive understanding"
    ],
    lifeLessons: [
      "Valuing your sensitivity",
      "Speaking your truth",
      "Individual within partnership",
      "Confidence in decisions"
    ],
    careerStrengths: ["Team facilitation", "Counseling", "Human resources", "Mediation", "Collaborative arts"],
    relationshipGifts: "You bring exceptional understanding and create deep emotional bonds.",
    challenges: ["Over-sensitivity", "Codependency", "Indecision", "Self-doubt"],
    advice: "Your sensitivity allows you to understand what others miss. Trust it as your guidance system."
  },
  21: {
    title: "Born to Express Joy (Day 21)",
    specialGift: "Creative expression with broad impact",
    overview: "Born on the 21st, you have enhanced creative abilities meant to reach many. You're here to spread joy and inspiration widely.",
    talents: [
      "Broad creative impact",
      "Multiple creative outlets",
      "Social creativity",
      "Inspiring joy",
      "Communication gifts"
    ],
    lifeLessons: [
      "Focusing creative energy",
      "Depth over surface",
      "Completing creative projects",
      "Authentic expression"
    ],
    careerStrengths: ["Mass media", "Entertainment", "Social media", "Teaching creativity", "Public arts"],
    relationshipGifts: "You bring constant joy, creativity, and the ability to keep relationships fresh and exciting.",
    challenges: ["Scattered energy", "Superficiality", "Mood swings", "Overcommitment"],
    advice: "Your creative joy is meant to touch many lives. Focus it with intention for maximum impact."
  },
  22: {
    title: "Born to Build Dreams (Day 22)",
    specialGift: "Master builder abilities",
    overview: "Born on the 22nd, you have master number abilities to build dreams into reality. You're meant to create lasting structures that serve many.",
    talents: [
      "Visionary building abilities",
      "Large-scale thinking",
      "Practical idealism",
      "System creation",
      "Legacy building"
    ],
    lifeLessons: [
      "Patience with manifestation",
      "Step-by-step progress",
      "Delegating effectively",
      "Self-care under pressure"
    ],
    careerStrengths: ["Large-scale projects", "System architecture", "Global initiatives", "Infrastructure", "Legacy creation"],
    relationshipGifts: "You bring the ability to build a meaningful life legacy together.",
    challenges: ["Overwhelming pressure", "Impatience", "Perfectionism", "Burnout"],
    advice: "Your master builder abilities are rare. Take time to build your dreams - they're meant to last generations."
  },
  23: {
    title: "Born to Communicate Freedom (Day 23)",
    specialGift: "Communication that liberates",
    overview: "Born on the 23rd, you combine communication gifts with a love of freedom. You're meant to use words to liberate and inspire.",
    talents: [
      "Liberating communication",
      "Multiple languages/styles",
      "Adventure writing/speaking",
      "Progressive ideas",
      "Network building"
    ],
    lifeLessons: [
      "Responsible communication",
      "Freedom with purpose",
      "Completing messages",
      "Depth in expression"
    ],
    careerStrengths: ["Travel writing", "Freedom advocacy", "International communication", "Progressive media", "Network marketing"],
    relationshipGifts: "You bring exciting communication and help your partner experience new perspectives.",
    challenges: ["Restlessness", "Inconsistency", "Superficial connections", "Overextension"],
    advice: "Your words have the power to free minds. Use them wisely to expand consciousness."
  },
  24: {
    title: "Born to Support (Day 24)",
    specialGift: "Nurturing support with practical skills",
    overview: "Born on the 24th, you combine nurturing with practical abilities. You excel at providing both emotional and practical support.",
    talents: [
      "Practical nurturing",
      "Family business skills",
      "Teaching practical skills",
      "Creating security",
      "Reliable support"
    ],
    lifeLessons: [
      "Receiving support too",
      "Personal dreams matter",
      "Flexibility in support",
      "Self-nurturing"
    ],
    careerStrengths: ["Family business", "Practical counseling", "Education", "Healthcare administration", "Support services"],
    relationshipGifts: "You provide both emotional and practical support, creating a secure, nurturing environment.",
    challenges: ["Self-neglect", "Rigidity", "Over-responsibility", "Worry"],
    advice: "Your supportive nature builds strong foundations for others. Remember to build your own dreams too."
  },
  25: {
    title: "Born to Seek and Analyze (Day 25)",
    specialGift: "Intuitive analysis and research",
    overview: "Born on the 25th, you combine analytical abilities with intuition. You excel at research that includes both logic and inner knowing.",
    talents: [
      "Intuitive research",
      "Analytical intuition",
      "Hidden pattern detection",
      "Spiritual analysis",
      "Deep investigation"
    ],
    lifeLessons: [
      "Trusting intuition equally",
      "Sharing findings accessibly",
      "Connecting with others",
      "Practical application"
    ],
    careerStrengths: ["Research", "Investigation", "Spiritual science", "Analysis", "Detective work"],
    relationshipGifts: "You bring depth of understanding and help your partner see hidden patterns and meanings.",
    challenges: ["Overthinking", "Isolation", "Perfectionism", "Skepticism"],
    advice: "Your ability to combine intuition with analysis is rare. Use it to bridge the spiritual and material worlds."
  },
  26: {
    title: "Born to Lead with Love (Day 26)",
    specialGift: "Leadership through service and love",
    overview: "Born on the 26th, you combine material success with nurturing. You're meant to lead through love and create abundance for many.",
    talents: [
      "Nurturing leadership",
      "Business with heart",
      "Creating abundance",
      "Family enterprises",
      "Community building"
    ],
    lifeLessons: [
      "Power through love",
      "Success includes everyone",
      "Delegation with trust",
      "Personal needs matter"
    ],
    careerStrengths: ["Family business", "Community leadership", "Social enterprise", "Nurturing corporations", "Hospitality"],
    relationshipGifts: "You create both material success and emotional warmth, building an abundant life.",
    challenges: ["Control issues", "Overwork", "Perfectionism", "Emotional suppression"],
    advice: "Your ability to lead with love creates lasting success. Build enterprises that nurture all involved."
  },
  27: {
    title: "Born to Inspire Compassion (Day 27)",
    specialGift: "Spiritual compassion with broad reach",
    overview: "Born on the 27th, you combine humanitarian spirit with spiritual depth. You're meant to inspire compassion on a large scale.",
    talents: [
      "Inspirational compassion",
      "Spiritual teaching",
      "Global consciousness",
      "Artistic expression",
      "Healing presence"
    ],
    lifeLessons: [
      "Grounded spirituality",
      "Personal boundaries",
      "Practical compassion",
      "Self-compassion first"
    ],
    careerStrengths: ["Spiritual leadership", "Global humanitarian work", "Inspirational arts", "Teaching", "Healing"],
    relationshipGifts: "You bring spiritual depth and help expand your partner's consciousness and compassion.",
    challenges: ["Idealism", "Boundaries", "Grounding", "Disappointment"],
    advice: "Your compassionate spirit can heal many. Stay grounded to maximize your impact."
  },
  28: {
    title: "Born to Lead Independently (Day 28)",
    specialGift: "Independent leadership with cooperative ability",
    overview: "Born on the 28th, you combine strong leadership with the ability to work with others. You lead best through cooperative independence.",
    talents: [
      "Cooperative leadership",
      "Independent collaboration",
      "Building partnerships",
      "Diplomatic strength",
      "Win-win creation"
    ],
    lifeLessons: [
      "Leadership includes others",
      "Strength in cooperation",
      "Patience with consensus",
      "Shared success"
    ],
    careerStrengths: ["Partnership ventures", "Cooperative leadership", "Joint enterprises", "Team building", "Alliance creation"],
    relationshipGifts: "You bring leadership that includes and empowers your partner, creating success together.",
    challenges: ["Control", "Impatience", "Trust issues", "Ego balance"],
    advice: "Your leadership style of cooperative independence is the future. Show others how it's done."
  },
  29: {
    title: "Born to Master Intuition (Day 29)",
    specialGift: "Master number intuition with humanitarian spirit",
    overview: "Born on the 29th, you have highly developed intuition combined with humanitarian ideals. You're meant to serve through spiritual gifts.",
    talents: [
      "Exceptional intuition",
      "Humanitarian vision",
      "Spiritual leadership",
      "Inspirational abilities",
      "Collective consciousness"
    ],
    lifeLessons: [
      "Grounding visions",
      "Practical spirituality",
      "Personal care",
      "Patience with humanity"
    ],
    careerStrengths: ["Intuitive counseling", "Spiritual teaching", "Visionary leadership", "Humanitarian work", "Inspiration"],
    relationshipGifts: "You bring profound spiritual connection and help elevate the relationship to higher purpose.",
    challenges: ["Over-sensitivity", "Idealism", "Nervous energy", "Boundaries"],
    advice: "Your intuitive gifts are meant to serve humanity. Ground them in practical action for greatest impact."
  },
  30: {
    title: "Born to Express Truth (Day 30)",
    specialGift: "Creative expression of universal truths",
    overview: "Born on the 30th, you have enhanced creative abilities meant to express universal truths. Your creativity carries spiritual messages.",
    talents: [
      "Truth through creativity",
      "Inspirational expression",
      "Multiple creative channels",
      "Joyful wisdom",
      "Universal communication"
    ],
    lifeLessons: [
      "Focused expression",
      "Truth with compassion",
      "Completing works",
      "Authentic voice"
    ],
    careerStrengths: ["Inspirational arts", "Spiritual creativity", "Truth-telling media", "Teaching through art", "Conscious entertainment"],
    relationshipGifts: "You bring creative joy that also carries depth and meaning, enriching life together.",
    challenges: ["Scattered focus", "Message clarity", "Procrastination", "Self-doubt"],
    advice: "Your creative gifts carry important truths. Focus them to create works that uplift and transform."
  },
  31: {
    title: "Born to Work Creatively (Day 31)",
    specialGift: "Creative manifestation through dedicated work",
    overview: "Born on the 31st, you combine creativity with strong work ethic. You manifest creative visions through dedication and practical effort.",
    talents: [
      "Creative discipline",
      "Artistic craftsmanship",
      "Manifesting visions",
      "Practical creativity",
      "Building beauty"
    ],
    lifeLessons: [
      "Joy in the process",
      "Creativity needs structure",
      "Patience with creation",
      "Celebrating progress"
    ],
    careerStrengths: ["Artistic crafts", "Creative businesses", "Quality creation", "Teaching crafts", "Practical arts"],
    relationshipGifts: "You bring the ability to create a beautiful life through consistent creative effort.",
    challenges: ["Perfectionism", "Work-life balance", "Creative blocks", "Self-criticism"],
    advice: "Your ability to manifest creativity through work is powerful. Remember that joy in creation is as important as the result."
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
export const expressionNumberMeanings: Record<number, {
  title: string;
  keywords: string[];
  overview: string;
  talents: string[];
  lifePurpose: string;
  careers: string[];
  relationshipStyle: string;
  challenges: string[];
  spiritualGifts: string[];
  advice: string;
}> = {
  1: {
    title: "The Natural Leader",
    keywords: ["Leadership", "Innovation", "Independence", "Originality"],
    overview: "Your Expression Number 1 reveals a destiny of leadership and innovation. You're meant to break new ground, pioneer new ideas, and inspire others through your unique vision and determination.",
    talents: [
      "Natural leadership abilities that inspire confidence",
      "Original thinking and innovative problem-solving",
      "Strong will and determination to succeed",
      "Ability to work independently and self-motivate",
      "Entrepreneurial spirit and business acumen"
    ],
    lifePurpose: "To lead by example, innovate in your field, and inspire others to believe in themselves. You're here to show that individuality and self-reliance can create positive change.",
    careers: ["CEO/Founder", "Inventor", "Military Leader", "Politician", "Solo Entrepreneur", "Motivational Speaker", "Director"],
    relationshipStyle: "You need a partner who respects your independence and supports your ambitions. You express love through acts of service and providing security.",
    challenges: [
      "Learning to collaborate without losing autonomy",
      "Balancing confidence with humility",
      "Developing patience with slower-paced individuals",
      "Avoiding domineering or aggressive behavior"
    ],
    spiritualGifts: ["Manifestation power", "Divine masculine energy", "Ability to initiate new cycles", "Leadership consciousness"],
    advice: "Your path requires courage to stand alone when necessary. Trust your vision, but remember that true leadership includes lifting others up."
  },
  2: {
    title: "The Diplomatic Peacemaker",
    keywords: ["Cooperation", "Harmony", "Sensitivity", "Partnership"],
    overview: "Expression Number 2 indicates a destiny of creating harmony and balance. You're a natural mediator, meant to bring people together and create peace through understanding and cooperation.",
    talents: [
      "Exceptional diplomatic and mediation skills",
      "Highly developed intuition and empathy",
      "Natural ability to see all sides of a situation",
      "Gift for creating harmony in any environment",
      "Excellent listening and counseling abilities"
    ],
    lifePurpose: "To create bridges between people, heal divisions, and demonstrate the power of cooperation. You're here to show that gentleness and understanding can transform conflicts.",
    careers: ["Mediator", "Counselor", "Diplomat", "Human Resources", "Therapist", "Artist", "Musician", "Teacher"],
    relationshipStyle: "You thrive in close partnerships and express love through emotional support and deep understanding. You need a harmonious, peaceful relationship.",
    challenges: [
      "Overcoming indecisiveness and self-doubt",
      "Setting healthy boundaries without guilt",
      "Speaking up for your own needs",
      "Avoiding codependency in relationships"
    ],
    spiritualGifts: ["Emotional healing abilities", "Divine feminine energy", "Psychic sensitivity", "Peace-bringing presence"],
    advice: "Your sensitivity is your strength. Trust your intuition and remember that creating peace sometimes requires standing firm in your truth."
  },
  3: {
    title: "The Creative Communicator",
    keywords: ["Creativity", "Expression", "Joy", "Communication"],
    overview: "Expression Number 3 reveals a destiny of creative expression and communication. You're meant to inspire, entertain, and uplift others through your unique creative gifts and joyful presence.",
    talents: [
      "Natural creativity and artistic abilities",
      "Exceptional communication and storytelling skills",
      "Infectious enthusiasm and optimism",
      "Social magnetism and charm",
      "Ability to inspire and motivate others"
    ],
    lifePurpose: "To bring joy, beauty, and inspiration to the world through creative expression. You're here to remind others that life is meant to be enjoyed and celebrated.",
    careers: ["Artist", "Writer", "Actor", "Musician", "Marketing Director", "Public Speaker", "Teacher", "Social Media Influencer"],
    relationshipStyle: "You need mental stimulation and fun in relationships. You express love through words, creativity, and bringing joy to your partner's life.",
    challenges: [
      "Maintaining focus on long-term goals",
      "Managing emotional ups and downs",
      "Avoiding superficiality in pursuits",
      "Completing projects instead of starting new ones"
    ],
    spiritualGifts: ["Channel for divine creativity", "Joy-bringing presence", "Ability to uplift collective consciousness", "Creative manifestation"],
    advice: "Your creativity is a divine gift. Channel it with discipline and purpose, and you'll inspire transformation in countless lives."
  },
  4: {
    title: "The Master Builder",
    keywords: ["Stability", "Organization", "Dedication", "Foundation"],
    overview: "Expression Number 4 indicates a destiny of building lasting foundations. You're meant to create stability, order, and practical solutions that stand the test of time.",
    talents: [
      "Exceptional organizational and planning abilities",
      "Strong work ethic and reliability",
      "Practical problem-solving skills",
      "Ability to create systems and structures",
      "Natural talent for manifesting ideas into reality"
    ],
    lifePurpose: "To build solid foundations that support and benefit many. You're here to demonstrate that dedication, hard work, and integrity create lasting value.",
    careers: ["Engineer", "Architect", "Project Manager", "Financial Planner", "Systems Analyst", "Builder", "Administrator", "Quality Controller"],
    relationshipStyle: "You express love through loyalty, stability, and practical support. You need a partner who values commitment and building a life together.",
    challenges: [
      "Embracing flexibility and spontaneity",
      "Avoiding rigidity in thinking",
      "Balancing work with play and rest",
      "Learning to delegate and trust others"
    ],
    spiritualGifts: ["Grounding energy", "Manifestation through form", "Earth wisdom", "Ability to anchor spiritual concepts"],
    advice: "Your dedication creates miracles. Remember that the strongest foundations include flexibility - bend so you don't break."
  },
  5: {
    title: "The Freedom Explorer",
    keywords: ["Freedom", "Adventure", "Change", "Experience"],
    overview: "Expression Number 5 reveals a destiny of exploration and freedom. You're meant to experience life fully, break boundaries, and inspire others to embrace change and adventure.",
    talents: [
      "Natural adaptability and versatility",
      "Excellent communication across cultures",
      "Innovative and progressive thinking",
      "Magnetic personality and charisma",
      "Ability to thrive in change and uncertainty"
    ],
    lifePurpose: "To explore all life has to offer and share your discoveries. You're here to show others that freedom and adventure lead to wisdom and growth.",
    careers: ["Travel Writer", "International Sales", "Entrepreneur", "Pilot", "Photographer", "Consultant", "Tour Guide", "Foreign Correspondent"],
    relationshipStyle: "You need freedom and variety in relationships. You express love through sharing adventures and introducing your partner to new experiences.",
    challenges: [
      "Developing discipline and commitment",
      "Avoiding excess and overindulgence",
      "Creating stability while maintaining freedom",
      "Finishing what you start"
    ],
    spiritualGifts: ["Catalyst for change", "Bridge between worlds", "Expansion consciousness", "Freedom activation"],
    advice: "Your need for freedom is sacred. Create a life that honors this while building bridges rather than burning them."
  },
  6: {
    title: "The Nurturing Healer",
    keywords: ["Service", "Responsibility", "Love", "Healing"],
    overview: "Expression Number 6 indicates a destiny of service and nurturing. You're meant to heal, teach, and create beauty while taking responsibility for the wellbeing of others.",
    talents: [
      "Natural healing and nurturing abilities",
      "Strong sense of responsibility and duty",
      "Artistic and aesthetic gifts",
      "Exceptional teaching abilities",
      "Magnetic presence that attracts those in need"
    ],
    lifePurpose: "To serve humanity through love, healing, and creating beauty. You're here to demonstrate that caring for others is a sacred calling.",
    careers: ["Healer", "Teacher", "Counselor", "Artist", "Interior Designer", "Chef", "Social Worker", "Nurse", "Community Leader"],
    relationshipStyle: "You express love through nurturing, creating a beautiful home, and taking care of your loved ones. Family is extremely important to you.",
    challenges: [
      "Setting boundaries without guilt",
      "Avoiding perfectionism and control",
      "Taking care of your own needs",
      "Releasing the need to fix everyone"
    ],
    spiritualGifts: ["Healing hands", "Heart wisdom", "Divine mother/father energy", "Beauty creation"],
    advice: "Your nurturing gifts heal the world. Remember that sometimes the greatest service is teaching others to care for themselves."
  },
  7: {
    title: "The Mystic Seeker",
    keywords: ["Wisdom", "Spirituality", "Analysis", "Truth"],
    overview: "Expression Number 7 reveals a destiny of seeking truth and wisdom. You're meant to dive deep into life's mysteries and share your spiritual insights with the world.",
    talents: [
      "Exceptional analytical and research abilities",
      "Natural spiritual and psychic gifts",
      "Deep wisdom and understanding",
      "Ability to see beyond surface appearances",
      "Gift for teaching complex concepts"
    ],
    lifePurpose: "To seek truth, understand life's mysteries, and share wisdom that elevates consciousness. You're here to bridge the spiritual and material worlds.",
    careers: ["Researcher", "Philosopher", "Spiritual Teacher", "Psychologist", "Writer", "Scientist", "Mystic", "Professor", "Analyst"],
    relationshipStyle: "You need deep, meaningful connections. You express love through sharing wisdom, spiritual growth, and intellectual intimacy.",
    challenges: [
      "Overcoming isolation and loneliness",
      "Trusting others and opening up",
      "Balancing spiritual and material needs",
      "Avoiding cynicism and superiority"
    ],
    spiritualGifts: ["Direct spiritual connection", "Prophetic abilities", "Truth detection", "Wisdom channeling"],
    advice: "Your quest for truth is noble. Share your discoveries with humility, knowing that the deepest truths unite rather than divide."
  },
  8: {
    title: "The Powerful Achiever",
    keywords: ["Power", "Success", "Authority", "Material Mastery"],
    overview: "Expression Number 8 indicates a destiny of material mastery and achievement. You're meant to succeed greatly and use your power to benefit many.",
    talents: [
      "Natural business acumen and leadership",
      "Ability to manifest material success",
      "Strong organizational abilities",
      "Excellent judgment of character",
      "Power to influence and inspire"
    ],
    lifePurpose: "To achieve material success and demonstrate the responsible use of power. You're here to show that wealth and influence can serve the highest good.",
    careers: ["CEO", "Investment Banker", "Real Estate Developer", "Judge", "Business Owner", "Film Producer", "Politician", "Venture Capitalist"],
    relationshipStyle: "You express love through providing security and sharing success. You need a partner who understands ambition and supports your goals.",
    challenges: [
      "Balancing material and spiritual values",
      "Avoiding workaholism and burnout",
      "Using power ethically and wisely",
      "Maintaining humility in success"
    ],
    spiritualGifts: ["Manifestation mastery", "Karmic understanding", "Power channeling", "Abundance consciousness"],
    advice: "Your power to manifest is extraordinary. Use it to create a legacy that serves humanity long after you're gone."
  },
  9: {
    title: "The Universal Humanitarian",
    keywords: ["Compassion", "Service", "Wisdom", "Universal Love"],
    overview: "Expression Number 9 reveals a destiny of universal service. You're meant to love unconditionally, serve humanity, and demonstrate the power of selfless giving.",
    talents: [
      "Deep compassion and understanding",
      "Natural wisdom and broad perspective",
      "Artistic and creative abilities",
      "Healing presence and charisma",
      "Ability to inspire on a large scale"
    ],
    lifePurpose: "To serve humanity with unconditional love and demonstrate that we are all connected. You're here to be a living example of universal compassion.",
    careers: ["Humanitarian", "Teacher", "Artist", "Healer", "Non-profit Director", "Environmental Activist", "Spiritual Leader", "Philanthropist"],
    relationshipStyle: "You love deeply and universally. You express love through compassion, wisdom, and helping your partner grow spiritually.",
    challenges: [
      "Setting personal boundaries",
      "Avoiding martyr complex",
      "Dealing with disappointment in humanity",
      "Balancing giving with receiving"
    ],
    spiritualGifts: ["Universal love channel", "Collective healing", "Old soul wisdom", "Transformation catalyst"],
    advice: "Your love can heal the world. Give generously but wisely, remembering that teaching others to give multiplies your impact."
  },
  11: {
    title: "The Intuitive Illuminator",
    keywords: ["Intuition", "Inspiration", "Spiritual Mastery", "Illumination"],
    overview: "Master Number 11 indicates a destiny of spiritual illumination. You're meant to channel higher wisdom and inspire humanity through your intuitive gifts.",
    talents: [
      "Exceptional intuition and psychic abilities",
      "Natural inspirational leadership",
      "Visionary and prophetic gifts",
      "Ability to channel higher wisdom",
      "Magnetic presence that uplifts others"
    ],
    lifePurpose: "To illuminate the path for others through your spiritual gifts and inspire humanity to reach higher consciousness.",
    careers: ["Spiritual Teacher", "Intuitive Counselor", "Visionary Artist", "Inspirational Speaker", "Energy Healer", "Mystic", "Channel", "Inventor"],
    relationshipStyle: "You need a spiritually aware partner who understands your sensitivity. You express love through spiritual connection and inspiration.",
    challenges: [
      "Grounding spiritual energy in practical life",
      "Managing nervous energy and anxiety",
      "Trusting your intuitive gifts",
      "Avoiding escapism and illusion"
    ],
    spiritualGifts: ["Direct divine connection", "Prophetic visions", "Energy transmission", "Light bearing"],
    advice: "You carry a high frequency. Ground your gifts in practical service, and you'll illuminate paths for countless souls."
  },
  22: {
    title: "The Master Architect",
    keywords: ["Vision", "Manifestation", "Global Impact", "Master Building"],
    overview: "Master Number 22 reveals a destiny of building on a grand scale. You're meant to manifest visionary projects that transform society and leave lasting legacies.",
    talents: [
      "Ability to manifest visions into reality",
      "Natural leadership on a large scale",
      "Combining intuition with practical skills",
      "Systems thinking and organization",
      "Power to influence global change"
    ],
    lifePurpose: "To build something of lasting value that serves humanity on a grand scale. You're here to demonstrate that dreams can become reality.",
    careers: ["Global CEO", "Architect of Systems", "International Leader", "Humanitarian Organizer", "Master Builder", "Social Reformer", "Visionary Entrepreneur"],
    relationshipStyle: "You need a partner who supports your grand vision and understands the pressure you carry. You express love through building a legacy together.",
    challenges: [
      "Managing the pressure of your potential",
      "Balancing vision with current reality",
      "Avoiding burnout from high expectations",
      "Staying grounded while thinking big"
    ],
    spiritualGifts: ["Master manifestation", "Bridge between worlds", "Collective transformation", "Legacy creation"],
    advice: "Your ability to build is unmatched. Stay connected to your heart's vision, and you'll create miracles in physical form."
  },
  33: {
    title: "The Master Teacher",
    keywords: ["Teaching", "Healing", "Unconditional Love", "Service Mastery"],
    overview: "Master Number 33 indicates the highest destiny of teaching and healing through unconditional love. You're meant to be a living example of divine love in action.",
    talents: [
      "Profound wisdom and compassion",
      "Master teaching abilities",
      "Healing through pure love",
      "Ability to see divine perfection in all",
      "Transformational presence"
    ],
    lifePurpose: "To embody and teach unconditional love, demonstrating that service to others is the highest calling.",
    careers: ["Spiritual Master", "Master Healer", "Global Teacher", "Humanitarian Leader", "Transformational Speaker", "Divine Mother/Father Figure"],
    relationshipStyle: "You love unconditionally and need a spiritually evolved partner. You express love through selfless service and spiritual growth.",
    challenges: [
      "Maintaining personal boundaries",
      "Avoiding burnout from giving",
      "Staying grounded in human experience",
      "Balancing service with self-care"
    ],
    spiritualGifts: ["Christ consciousness", "Unconditional love channel", "Master healing", "Divine teaching"],
    advice: "You carry the highest vibration. Honor this gift by taking care of yourself, so you can continue serving from fullness."
  }
};

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