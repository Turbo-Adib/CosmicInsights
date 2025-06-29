// Numerology calculation utilities based on pigbank-knowledge

export interface NumerologyProfile {
  lifePath: number;
  dayNumber: number;
  expressionNumber: number;
  attitudeNumber: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  universalDay: number;
  lifeStage: number;
  currentLifeStage: {
    number: number;
    stage: number;
    description: string;
  };
}

// Calculate Life Path Number
export function calculateLifePath(birthDate: string): number {
  const dateStr = birthDate.replace(/-/g, "");
  let sum = dateStr.split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // Never reduce master numbers
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// Calculate Day Number (Karmic Number)
export function calculateDayNumber(birthDate: string): number {
  const day = parseInt(birthDate.split("-")[2]);
  if (day <= 9) return day;
  if (day === 11 || day === 22) return day; // Master numbers
  return day.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Calculate Expression Number from full name
export function calculateExpressionNumber(fullName: string): number {
  const letterValues: { [key: string]: number } = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };
  
  let sum = fullName.toUpperCase().split('').reduce((acc, letter) => {
    return acc + (letterValues[letter] || 0);
  }, 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// Calculate Attitude Number (month + day)
export function calculateAttitudeNumber(birthDate: string): number {
  const [year, month, day] = birthDate.split("-").map(Number);
  let sum = month + day;
  
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// Calculate Personal Year
export function calculatePersonalYear(birthDate: string, currentYear: number = new Date().getFullYear()): number {
  const [_, month, day] = birthDate.split("-");
  const personalYearDate = `${currentYear}-${month}-${day}`;
  let sum = personalYearDate.replace(/-/g, "").split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  
  while (sum > 9) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// Calculate Personal Month
export function calculatePersonalMonth(personalYear: number, currentMonth: number = new Date().getMonth() + 1): number {
  let sum = personalYear + currentMonth;
  
  while (sum > 9) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// Calculate Personal Day
export function calculatePersonalDay(personalYear: number, currentDate: Date = new Date()): number {
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  let sum = personalYear + month + day;
  
  while (sum > 9) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// Calculate Universal Day
export function calculateUniversalDay(date: Date = new Date()): number {
  const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  let sum = dateStr.split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// Calculate Life Stage
export function calculateLifeStage(lifePath: number, age: number): { number: number; stage: number; description: string } {
  // Based on pigbank-knowledge: 4 life stages, calculated differently for each life path
  const stageLength = Math.ceil(36 / lifePath);
  const currentStage = Math.min(Math.ceil(age / stageLength), 4);
  
  const stages = [
    "Foundation & Learning",
    "Building & Establishing", 
    "Harvesting & Sharing",
    "Wisdom & Legacy"
  ];
  
  return {
    number: lifePath,
    stage: currentStage,
    description: stages[currentStage - 1] || stages[3]
  };
}

// Get complete numerology profile
export function getNumerologyProfile(
  birthDate: string,
  fullName: string,
  currentDate: Date = new Date()
): NumerologyProfile {
  const lifePath = calculateLifePath(birthDate);
  const birthYear = parseInt(birthDate.split("-")[0]);
  const age = currentDate.getFullYear() - birthYear;
  
  return {
    lifePath,
    dayNumber: calculateDayNumber(birthDate),
    expressionNumber: calculateExpressionNumber(fullName),
    attitudeNumber: calculateAttitudeNumber(birthDate),
    personalYear: calculatePersonalYear(birthDate),
    personalMonth: calculatePersonalMonth(calculatePersonalYear(birthDate)),
    personalDay: calculatePersonalDay(calculatePersonalYear(birthDate)),
    universalDay: calculateUniversalDay(),
    lifeStage: age,
    currentLifeStage: calculateLifeStage(lifePath, age)
  };
}