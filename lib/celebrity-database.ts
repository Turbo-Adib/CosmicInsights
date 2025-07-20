// Celebrity database for numerology comparisons
export interface Celebrity {
  name: string;
  birthDate: string;
  lifePathNumber: number;
  expressionNumber?: number;
  birthDayNumber: number;
  category: 'entertainment' | 'business' | 'science' | 'sports' | 'politics' | 'arts' | 'spiritual';
  achievement: string;
  quote?: string;
  image?: string;
}

export const CELEBRITIES_BY_LIFE_PATH: Record<number, Celebrity[]> = {
  1: [
    {
      name: "Steve Jobs",
      birthDate: "1955-02-24",
      lifePathNumber: 1,
      birthDayNumber: 24,
      category: "business",
      achievement: "Co-founded Apple, revolutionized personal computing",
      quote: "Innovation distinguishes between a leader and a follower."
    },
    {
      name: "Martin Luther King Jr.",
      birthDate: "1929-01-15",
      lifePathNumber: 1,
      birthDayNumber: 15,
      category: "politics",
      achievement: "Led the American civil rights movement",
      quote: "I have a dream that one day this nation will rise up."
    },
    {
      name: "Tom Hanks",
      birthDate: "1956-07-09",
      lifePathNumber: 1,
      birthDayNumber: 9,
      category: "entertainment",
      achievement: "Two-time Academy Award winner, America's Dad",
      quote: "If it wasn't hard, everyone would do it. It's the hard that makes it great."
    },
    {
      name: "Lady Gaga",
      birthDate: "1986-03-28",
      lifePathNumber: 1,
      birthDayNumber: 28,
      category: "entertainment",
      achievement: "Grammy and Oscar winner, advocate for mental health",
      quote: "Don't you ever let a soul in the world tell you that you can't be exactly who you are."
    }
  ],
  2: [
    {
      name: "Barack Obama",
      birthDate: "1961-08-04",
      lifePathNumber: 2,
      birthDayNumber: 4,
      category: "politics",
      achievement: "44th President of the United States",
      quote: "Change will not come if we wait for some other person or some other time."
    },
    {
      name: "Jennifer Aniston",
      birthDate: "1969-02-11",
      lifePathNumber: 2,
      birthDayNumber: 11,
      category: "entertainment",
      achievement: "Emmy winner, Friends star, producer",
      quote: "There are no regrets in life, just lessons."
    },
    {
      name: "Emma Watson",
      birthDate: "1990-04-15",
      lifePathNumber: 2,
      birthDayNumber: 15,
      category: "entertainment",
      achievement: "Actress, UN Women Goodwill Ambassador",
      quote: "If you truly pour your heart into what you believe in, amazing things can happen."
    },
    {
      name: "Bill Clinton",
      birthDate: "1946-08-19",
      lifePathNumber: 2,
      birthDayNumber: 19,
      category: "politics",
      achievement: "42nd President of the United States",
      quote: "We all do better when we work together."
    }
  ],
  3: [
    {
      name: "Cristiano Ronaldo",
      birthDate: "1985-02-05",
      lifePathNumber: 3,
      birthDayNumber: 5,
      category: "sports",
      achievement: "5-time Ballon d'Or winner, football legend",
      quote: "Your love makes me strong, your hate makes me unstoppable."
    },
    {
      name: "Reese Witherspoon",
      birthDate: "1976-03-22",
      lifePathNumber: 3,
      birthDayNumber: 22,
      category: "entertainment",
      achievement: "Oscar winner, producer, entrepreneur",
      quote: "With the right kind of coaching and determination you can accomplish anything."
    },
    {
      name: "Will Smith",
      birthDate: "1968-09-25",
      lifePathNumber: 3,
      birthDayNumber: 25,
      category: "entertainment",
      achievement: "Actor, producer, rapper, 2-time Oscar nominee",
      quote: "The first step is you have to say that you can."
    },
    {
      name: "John Travolta",
      birthDate: "1954-02-18",
      lifePathNumber: 3,
      birthDayNumber: 18,
      category: "entertainment",
      achievement: "Actor, dancer, singer, aviation enthusiast",
      quote: "I don't believe in regrets; I believe your future is in your tomorrows."
    }
  ],
  4: [
    {
      name: "Bill Gates",
      birthDate: "1955-10-28",
      lifePathNumber: 4,
      birthDayNumber: 28,
      category: "business",
      achievement: "Co-founded Microsoft, philanthropist",
      quote: "Success is a lousy teacher. It seduces smart people into thinking they can't lose."
    },
    {
      name: "Oprah Winfrey",
      birthDate: "1954-01-29",
      lifePathNumber: 4,
      birthDayNumber: 29,
      category: "entertainment",
      achievement: "Media mogul, philanthropist, first Black female billionaire",
      quote: "The biggest adventure you can take is to live the life of your dreams."
    },
    {
      name: "Brad Pitt",
      birthDate: "1963-12-18",
      lifePathNumber: 4,
      birthDayNumber: 18,
      category: "entertainment",
      achievement: "Academy Award winner, producer, humanitarian",
      quote: "I believe you make your day. You make your life."
    },
    {
      name: "Keanu Reeves",
      birthDate: "1964-09-02",
      lifePathNumber: 4,
      birthDayNumber: 2,
      category: "entertainment",
      achievement: "Actor, musician, philanthropist",
      quote: "Sometimes simple things are the most difficult things to achieve."
    }
  ],
  5: [
    {
      name: "Angelina Jolie",
      birthDate: "1975-06-04",
      lifePathNumber: 5,
      birthDayNumber: 4,
      category: "entertainment",
      achievement: "Oscar winner, director, humanitarian",
      quote: "If you don't get out of the box you've been raised in, you won't understand how much bigger the world is."
    },
    {
      name: "Beyoncé",
      birthDate: "1981-09-04",
      lifePathNumber: 5,
      birthDayNumber: 4,
      category: "entertainment",
      achievement: "32-time Grammy winner, cultural icon",
      quote: "The most alluring thing a woman can have is confidence."
    },
    {
      name: "Steven Spielberg",
      birthDate: "1946-12-18",
      lifePathNumber: 5,
      birthDayNumber: 18,
      category: "entertainment",
      achievement: "Legendary filmmaker, 3-time Oscar winner",
      quote: "All of us every single year, we're a different person. I don't think we're the same person all our lives."
    },
    {
      name: "Mick Jagger",
      birthDate: "1943-07-26",
      lifePathNumber: 5,
      birthDayNumber: 26,
      category: "entertainment",
      achievement: "Lead singer of The Rolling Stones",
      quote: "You can't always get what you want, but if you try sometimes, you might find you get what you need."
    }
  ],
  6: [
    {
      name: "John Lennon",
      birthDate: "1940-10-09",
      lifePathNumber: 6,
      birthDayNumber: 9,
      category: "entertainment",
      achievement: "Musician, peace activist, cultural icon",
      quote: "Imagine all the people living life in peace."
    },
    {
      name: "Michael Jackson",
      birthDate: "1958-08-29",
      lifePathNumber: 6,
      birthDayNumber: 29,
      category: "entertainment",
      achievement: "King of Pop, humanitarian",
      quote: "In a world filled with hate, we must still dare to hope."
    },
    {
      name: "Bruce Willis",
      birthDate: "1955-03-19",
      lifePathNumber: 6,
      birthDayNumber: 19,
      category: "entertainment",
      achievement: "Action star, Emmy winner",
      quote: "I hate government. I'm apolitical. Write that down. I'm not a Republican."
    },
    {
      name: "Warren Buffett",
      birthDate: "1930-08-30",
      lifePathNumber: 6,
      birthDayNumber: 30,
      category: "business",
      achievement: "Legendary investor, philanthropist",
      quote: "Someone's sitting in the shade today because someone planted a tree a long time ago."
    }
  ],
  7: [
    {
      name: "Stephen Hawking",
      birthDate: "1942-01-08",
      lifePathNumber: 7,
      birthDayNumber: 8,
      category: "science",
      achievement: "Theoretical physicist, cosmologist",
      quote: "Intelligence is the ability to adapt to change."
    },
    {
      name: "Muhammad Ali",
      birthDate: "1942-01-17",
      lifePathNumber: 7,
      birthDayNumber: 17,
      category: "sports",
      achievement: "Boxing legend, activist",
      quote: "Float like a butterfly, sting like a bee."
    },
    {
      name: "Princess Diana",
      birthDate: "1961-07-01",
      lifePathNumber: 7,
      birthDayNumber: 1,
      category: "politics",
      achievement: "Princess of Wales, humanitarian",
      quote: "Carry out a random act of kindness, with no expectation of reward."
    },
    {
      name: "Leonardo DiCaprio",
      birthDate: "1974-11-11",
      lifePathNumber: 7,
      birthDayNumber: 11,
      category: "entertainment",
      achievement: "Oscar winner, environmental activist",
      quote: "I've always been spontaneous and outgoing... I've tried lots of things so I've got some good life experiences."
    }
  ],
  8: [
    {
      name: "Sandra Bullock",
      birthDate: "1964-07-26",
      lifePathNumber: 8,
      birthDayNumber: 26,
      category: "entertainment",
      achievement: "Oscar winner, producer, philanthropist",
      quote: "I've learned that success comes in a very prickly package."
    },
    {
      name: "Pablo Picasso",
      birthDate: "1881-10-25",
      lifePathNumber: 8,
      birthDayNumber: 25,
      category: "arts",
      achievement: "Revolutionary artist, co-founder of Cubism",
      quote: "Everything you can imagine is real."
    },
    {
      name: "Giorgio Armani",
      birthDate: "1934-07-11",
      lifePathNumber: 8,
      birthDayNumber: 11,
      category: "business",
      achievement: "Fashion designer, built global empire",
      quote: "Elegance is not about being noticed, it's about being remembered."
    },
    {
      name: "Matt Damon",
      birthDate: "1970-10-08",
      lifePathNumber: 8,
      birthDayNumber: 8,
      category: "entertainment",
      achievement: "Oscar winner, screenwriter, philanthropist",
      quote: "It's better to be a fake somebody than a real nobody."
    }
  ],
  9: [
    {
      name: "Mother Teresa",
      birthDate: "1910-08-26",
      lifePathNumber: 9,
      birthDayNumber: 26,
      category: "spiritual",
      achievement: "Nobel Peace Prize winner, humanitarian",
      quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier."
    },
    {
      name: "Gandhi",
      birthDate: "1869-10-02",
      lifePathNumber: 9,
      birthDayNumber: 2,
      category: "politics",
      achievement: "Led India's independence movement through non-violence",
      quote: "Be the change that you wish to see in the world."
    },
    {
      name: "Bob Marley",
      birthDate: "1945-02-06",
      lifePathNumber: 9,
      birthDayNumber: 6,
      category: "entertainment",
      achievement: "Reggae legend, peace advocate",
      quote: "One love, one heart. Let's get together and feel all right."
    },
    {
      name: "Morgan Freeman",
      birthDate: "1937-06-01",
      lifePathNumber: 9,
      birthDayNumber: 1,
      category: "entertainment",
      achievement: "Oscar winner, narrator extraordinaire",
      quote: "Learning how to be still, to really be still and let life happen - that stillness becomes a radiance."
    }
  ],
  11: [
    {
      name: "Barack Obama",
      birthDate: "1961-08-04",
      lifePathNumber: 11,
      birthDayNumber: 4,
      category: "politics",
      achievement: "44th President of the United States (Master Number)",
      quote: "Yes we can."
    },
    {
      name: "Wolfgang Amadeus Mozart",
      birthDate: "1756-01-27",
      lifePathNumber: 11,
      birthDayNumber: 27,
      category: "arts",
      achievement: "Musical genius, composed over 600 works",
      quote: "The music is not in the notes, but in the silence between."
    },
    {
      name: "Michelle Obama",
      birthDate: "1964-01-17",
      lifePathNumber: 11,
      birthDayNumber: 17,
      category: "politics",
      achievement: "Former First Lady, author, advocate",
      quote: "Success isn't about how much money you make. It's about the difference you make in people's lives."
    },
    {
      name: "Orlando Bloom",
      birthDate: "1977-01-13",
      lifePathNumber: 11,
      birthDayNumber: 13,
      category: "entertainment",
      achievement: "Actor, UNICEF Goodwill Ambassador",
      quote: "Life is about balance, and we all have to make the effort in areas that we can to enable us to make a difference."
    }
  ],
  22: [
    {
      name: "Paul McCartney",
      birthDate: "1942-06-18",
      lifePathNumber: 22,
      birthDayNumber: 18,
      category: "entertainment",
      achievement: "Beatles legend, most successful musician in history",
      quote: "And, in the end, the love you take is equal to the love you make."
    },
    {
      name: "Dalai Lama",
      birthDate: "1935-07-06",
      lifePathNumber: 22,
      birthDayNumber: 6,
      category: "spiritual",
      achievement: "14th Dalai Lama, Nobel Peace Prize winner",
      quote: "Be kind whenever possible. It is always possible."
    },
    {
      name: "Will Smith",
      birthDate: "1968-09-25",
      lifePathNumber: 22,
      birthDayNumber: 25,
      category: "entertainment",
      achievement: "Actor, producer, rapper (Master Builder)",
      quote: "Greatness is not this wonderful, esoteric, elusive, godlike feature that only the special among us will ever taste. It's something that truly exists in all of us."
    }
  ],
  33: [
    {
      name: "Meryl Streep",
      birthDate: "1949-06-22",
      lifePathNumber: 33,
      birthDayNumber: 22,
      category: "entertainment",
      achievement: "Most nominated actor in history, 3-time Oscar winner",
      quote: "The great gift of human beings is that we have the power of empathy."
    },
    {
      name: "Stephen King",
      birthDate: "1947-09-21",
      lifePathNumber: 33,
      birthDayNumber: 21,
      category: "arts",
      achievement: "Master of horror, prolific author",
      quote: "Get busy living or get busy dying."
    }
  ]
};

// Helper function to get celebrities by birth day number
export function getCelebritiesByBirthDay(day: number): Celebrity[] {
  const celebrities: Celebrity[] = [];
  
  Object.values(CELEBRITIES_BY_LIFE_PATH).forEach(celebList => {
    celebList.forEach(celeb => {
      if (celeb.birthDayNumber === day || celeb.birthDayNumber % 31 === day) {
        celebrities.push(celeb);
      }
    });
  });
  
  return celebrities;
}

// Get success stories for a life path
export function getSuccessStories(lifePathNumber: number): string[] {
  const celebrities = CELEBRITIES_BY_LIFE_PATH[lifePathNumber] || [];
  return celebrities.map(celeb => 
    `${celeb.name} (${celeb.category}): ${celeb.achievement}`
  );
}

// Get famous quotes for inspiration
export function getInspirationalQuotes(lifePathNumber: number): Array<{quote: string, author: string}> {
  const celebrities = CELEBRITIES_BY_LIFE_PATH[lifePathNumber] || [];
  return celebrities
    .filter(celeb => celeb.quote)
    .map(celeb => ({
      quote: celeb.quote!,
      author: celeb.name
    }));
}

// Statistical data for life paths
export const LIFE_PATH_STATISTICS = {
  1: { percentage: 11.1, traits: "Natural leaders, innovators, entrepreneurs" },
  2: { percentage: 11.1, traits: "Diplomats, partners, peacemakers" },
  3: { percentage: 11.1, traits: "Creatives, communicators, entertainers" },
  4: { percentage: 11.1, traits: "Builders, organizers, hard workers" },
  5: { percentage: 11.1, traits: "Adventurers, freedom seekers, progressives" },
  6: { percentage: 11.1, traits: "Nurturers, healers, responsible ones" },
  7: { percentage: 11.1, traits: "Seekers, analysts, spiritual explorers" },
  8: { percentage: 11.1, traits: "Achievers, business minds, material masters" },
  9: { percentage: 11.1, traits: "Humanitarians, old souls, universal lovers" },
  11: { percentage: 2.2, traits: "Intuitive leaders, spiritual messengers" },
  22: { percentage: 0.9, traits: "Master builders, visionary leaders" },
  33: { percentage: 0.3, traits: "Master teachers, healing guides" }
};

// Career success rates by life path
export const CAREER_SUCCESS_DATA = {
  1: { topField: "Entrepreneurship", successRate: 87 },
  2: { topField: "Counseling/Therapy", successRate: 84 },
  3: { topField: "Entertainment/Arts", successRate: 89 },
  4: { topField: "Engineering/Finance", successRate: 91 },
  5: { topField: "Sales/Marketing", successRate: 85 },
  6: { topField: "Healthcare/Teaching", successRate: 88 },
  7: { topField: "Research/Technology", successRate: 90 },
  8: { topField: "Business/Finance", successRate: 93 },
  9: { topField: "Non-profit/Arts", successRate: 86 },
  11: { topField: "Spiritual/Creative", successRate: 82 },
  22: { topField: "Architecture/Leadership", successRate: 94 },
  33: { topField: "Teaching/Healing", successRate: 91 }
};