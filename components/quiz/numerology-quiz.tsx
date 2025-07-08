"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { LocationSearch } from "@/components/ui/location-search";
import { TimezoneSelect } from "@/components/ui/timezone-select";
import { ArrowLeft, ArrowRight, Calendar, User, Sparkles, Check, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizData {
  // Basic Info
  firstName: string;
  middleName: string;
  lastName: string;
  currentName: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  birthLatitude?: number;
  birthLongitude?: number;
  birthTimezone?: string;
  
  // Personality Questions
  energySource: string;
  decisionStyle: string;
  lifeApproach: string;
  stressResponse: string;
  relationshipStyle: string;
  careerMotivation: string;
  spiritualBeliefs: string;
  
  // Life Questions
  currentChallenge: string;
  lifePhase: string;
  primaryGoal: string;
}

const questions = [
  {
    id: "name",
    type: "input",
    title: "What's your birth name?",
    description: "Your legal name at birth is essential for accurate numerology calculations",
    fields: ["firstName", "middleName", "lastName"],
  },
  {
    id: "currentName",
    type: "input",
    title: "Do you use a different name now?",
    description: "If you've changed your name through marriage or legally, enter it here (or skip)",
    fields: ["currentName"],
    optional: true,
  },
  {
    id: "birthDate",
    type: "date",
    title: "When were you born?",
    description: "Your birth date reveals your Life Path Number",
    fields: ["birthDate"],
  },
  {
    id: "birthTime",
    type: "time",
    title: "What time were you born?",
    description: "Birth time helps calculate your rising sign (optional but recommended)",
    fields: ["birthTime"],
    optional: true,
  },
  {
    id: "birthPlace",
    type: "location",
    title: "Where were you born?",
    description: "Your birth location affects your astrological houses",
    fields: ["birthPlace", "birthLatitude", "birthLongitude", "birthTimezone"],
    optional: true,
  },
  {
    id: "energySource",
    type: "choice",
    title: "Where do you get your energy?",
    description: "This helps understand your numerological expression",
    field: "energySource",
    options: [
      { value: "social", label: "Being around people energizes me", icon: "👥" },
      { value: "solitude", label: "I recharge best in solitude", icon: "🧘" },
      { value: "nature", label: "Nature and outdoors revitalize me", icon: "🌿" },
      { value: "creative", label: "Creative activities fuel my soul", icon: "🎨" },
    ],
  },
  {
    id: "decisionStyle",
    type: "choice",
    title: "How do you make important decisions?",
    description: "Your decision-making style reveals your soul urge number traits",
    field: "decisionStyle",
    options: [
      { value: "logic", label: "I analyze facts and use logic", icon: "🧠" },
      { value: "intuition", label: "I trust my gut feelings", icon: "💫" },
      { value: "others", label: "I consider how it affects others", icon: "💝" },
      { value: "experience", label: "I rely on past experiences", icon: "📚" },
    ],
  },
  {
    id: "lifeApproach",
    type: "choice",
    title: "How do you approach life?",
    description: "This aligns with your Life Path energy",
    field: "lifeApproach",
    options: [
      { value: "planner", label: "I plan everything carefully", icon: "📅" },
      { value: "spontaneous", label: "I go with the flow", icon: "🌊" },
      { value: "balanced", label: "Mix of planning and spontaneity", icon: "⚖️" },
      { value: "guided", label: "I follow signs from the universe", icon: "✨" },
    ],
  },
  {
    id: "stressResponse",
    type: "choice",
    title: "When stressed, you tend to...",
    description: "Understanding your stress patterns helps with personal year predictions",
    field: "stressResponse",
    options: [
      { value: "action", label: "Take immediate action to fix it", icon: "🚀" },
      { value: "withdraw", label: "Need space to process alone", icon: "🏠" },
      { value: "talk", label: "Talk it out with others", icon: "💬" },
      { value: "spiritual", label: "Turn to meditation or prayer", icon: "🙏" },
    ],
  },
  {
    id: "relationshipStyle",
    type: "choice",
    title: "In relationships, you are...",
    description: "Your relationship style connects to your compatibility numbers",
    field: "relationshipStyle",
    options: [
      { value: "independent", label: "Independent and need space", icon: "🦅" },
      { value: "partnership", label: "Thrive in close partnership", icon: "💑" },
      { value: "variety", label: "Enjoy variety and excitement", icon: "🎭" },
      { value: "stable", label: "Seek stability and tradition", icon: "🏛️" },
    ],
  },
  {
    id: "careerMotivation",
    type: "choice",
    title: "What drives your career choices?",
    description: "Career motivations align with expression number vibrations",
    field: "careerMotivation",
    options: [
      { value: "leadership", label: "Leading and inspiring others", icon: "👑" },
      { value: "creativity", label: "Creative expression and innovation", icon: "🎨" },
      { value: "service", label: "Helping and healing others", icon: "🤲" },
      { value: "stability", label: "Security and financial success", icon: "💰" },
    ],
  },
  {
    id: "spiritualBeliefs",
    type: "choice",
    title: "Your spiritual perspective?",
    description: "Spiritual alignment affects how you receive cosmic guidance",
    field: "spiritualBeliefs",
    options: [
      { value: "traditional", label: "Traditional religious beliefs", icon: "⛪" },
      { value: "spiritual", label: "Spiritual but not religious", icon: "🔮" },
      { value: "scientific", label: "Science-based worldview", icon: "🔬" },
      { value: "open", label: "Open to all possibilities", icon: "🌈" },
    ],
  },
  {
    id: "currentChallenge",
    type: "choice",
    title: "What's your biggest challenge right now?",
    description: "Current challenges reveal your personal year themes",
    field: "currentChallenge",
    options: [
      { value: "career", label: "Career direction or growth", icon: "💼" },
      { value: "love", label: "Love and relationships", icon: "❤️" },
      { value: "purpose", label: "Finding life purpose", icon: "🎯" },
      { value: "balance", label: "Work-life balance", icon: "⚖️" },
    ],
  },
  {
    id: "lifePhase",
    type: "choice",
    title: "What phase of life are you in?",
    description: "Life phases correspond to numerological cycles",
    field: "lifePhase",
    options: [
      { value: "building", label: "Building foundations", icon: "🏗️" },
      { value: "exploring", label: "Exploring possibilities", icon: "🗺️" },
      { value: "establishing", label: "Establishing my path", icon: "🌱" },
      { value: "transforming", label: "Major life transition", icon: "🦋" },
    ],
  },
  {
    id: "primaryGoal",
    type: "choice",
    title: "Your primary goal for the next year?",
    description: "Goals help us customize your cosmic guidance",
    field: "primaryGoal",
    options: [
      { value: "love", label: "Find or deepen love", icon: "💕" },
      { value: "success", label: "Achieve career success", icon: "🏆" },
      { value: "growth", label: "Personal growth & healing", icon: "🌟" },
      { value: "abundance", label: "Create financial abundance", icon: "💎" },
    ],
  },
];

export function NumerologyQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    firstName: "",
    middleName: "",
    lastName: "",
    currentName: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    birthLatitude: undefined,
    birthLongitude: undefined,
    birthTimezone: undefined,
    energySource: "",
    decisionStyle: "",
    lifeApproach: "",
    stressResponse: "",
    relationshipStyle: "",
    careerMotivation: "",
    spiritualBeliefs: "",
    currentChallenge: "",
    lifePhase: "",
    primaryGoal: "",
  });
  const [result, setResult] = useState<any>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved quiz data on mount
  useEffect(() => {
    const savedQuizData = sessionStorage.getItem('quizData');
    const savedResult = sessionStorage.getItem('quizResult');
    
    if (savedQuizData && savedResult) {
      // Quiz was completed before, restore the state
      setQuizData(JSON.parse(savedQuizData));
      setResult(JSON.parse(savedResult));
      setCurrentStep(questions.length); // Set to end of quiz
    }
    
    setIsLoading(false);
  }, []);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChoice = (field: string, value: string) => {
    setQuizData({ ...quizData, [field]: value });
    // Auto-advance after selection
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const calculateLifePath = (birthDate: string): number => {
    const dateStr = birthDate.replace(/-/g, "");
    let sum = dateStr.split("").reduce((acc, digit) => acc + parseInt(digit), 0);
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
  };

  const calculateDayNumber = (birthDate: string): number => {
    const day = parseInt(birthDate.split("-")[2]);
    if (day <= 9) return day;
    if (day === 11 || day === 22) return day;
    return day.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  };

  const calculateExpressionNumber = (fullName: string): number => {
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
  };

  const calculateResults = async () => {
    const fullName = `${quizData.firstName} ${quizData.middleName} ${quizData.lastName}`.trim();
    const lifePath = calculateLifePath(quizData.birthDate);
    const dayNumber = calculateDayNumber(quizData.birthDate);
    const expressionNumber = calculateExpressionNumber(fullName);
    
    const lifePathDescriptions: Record<number, string> = {
      1: "The Leader - Independent, pioneering, and driven to succeed",
      2: "The Diplomat - Cooperative, sensitive, and partnership-oriented",
      3: "The Communicator - Creative, expressive, and socially gifted",
      4: "The Builder - Practical, hardworking, and detail-oriented",
      5: "The Explorer - Adventurous, freedom-loving, and versatile",
      6: "The Nurturer - Caring, responsible, and family-oriented",
      7: "The Seeker - Spiritual, analytical, and introspective",
      8: "The Achiever - Ambitious, material-minded, and powerful",
      9: "The Humanitarian - Compassionate, idealistic, and generous",
      11: "The Intuitive - Spiritually aware, sensitive, and inspiring",
      22: "The Master Builder - Visionary, practical, and capable of great achievements",
      33: "The Master Teacher - Compassionate, devoted, and spiritually evolved",
    };

    // Generate personalized insights based on quiz answers
    const personalizedInsights = generatePersonalizedInsights(lifePath, quizData);

    // Store result but don't show it yet
    const calculatedResult = {
      name: fullName,
      lifePath,
      dayNumber,
      expressionNumber,
      description: lifePathDescriptions[lifePath] || "A unique path of self-discovery",
      insights: personalizedInsights,
      recommendations: generateRecommendations(lifePath, dayNumber, quizData),
    };

    setResult(calculatedResult);

    // Save quiz data to sessionStorage to persist it
    sessionStorage.setItem('quizData', JSON.stringify(quizData));
    sessionStorage.setItem('quizResult', JSON.stringify(calculatedResult));

    // Always show email capture for one-time purchase flow
    setShowEmailCapture(true);
  };

  const saveQuizData = async (lifePath: number, dayNumber: number, expressionNumber: number, userEmail?: string) => {
    try {
      const response = await fetch("/api/quiz/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...quizData,
          lifePathNumber: lifePath,
          birthDayNumber: dayNumber,
          expressionNumber,
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Save quiz response:", data); // Debug log
      
      if (data.success && data.reportId) {
        // Clear any session storage before redirect
        sessionStorage.removeItem('quizData');
        sessionStorage.removeItem('quizResult');
        // Redirect to the report page - handle both local and GitHub Codespaces environments
        const redirectUrl = `/reports/${data.reportId}?new=true`;
        console.log("Redirecting to:", redirectUrl);
        
        // Get the base URL to handle GitHub Codespaces or other environments
        const baseUrl = window.location.origin;
        const fullUrl = `${baseUrl}${redirectUrl}`;
        
        // Use replace to ensure we don't create a back button loop
        window.location.replace(fullUrl);
        // Add a fallback timeout in case redirect fails
        setTimeout(() => {
          if (window.location.pathname !== redirectUrl) {
            console.error("Redirect failed, showing fallback");
            sessionStorage.setItem("quizCompleted", "true");
            setShowEmailCapture(false);
          }
        }, 3000);
      } else {
        // Log the issue for debugging
        console.error("Unexpected response structure:", data);
        alert("Unable to save your report. Please check the console for details.");
        // Fallback to showing inline report
        sessionStorage.setItem("quizCompleted", "true");
        setShowEmailCapture(false);
      }
    } catch (error) {
      console.error("Failed to save quiz data:", error);
      alert(`Error saving quiz: ${error instanceof Error ? error.message : 'Unknown error'}. Check if the database is running.`);
      // Fallback to showing inline report
      sessionStorage.setItem("quizCompleted", "true");
      setShowEmailCapture(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    console.log("Submitting email:", email);
    await saveQuizData(result.lifePath, result.dayNumber, result.expressionNumber, email);
  };

  const skipEmailCapture = async () => {
    console.log("Skipping email capture");
    await saveQuizData(result.lifePath, result.dayNumber, result.expressionNumber);
  };

  const generatePersonalizedInsights = (lifePath: number, data: QuizData) => {
    const insights = [];
    
    // Energy source insights
    if (data.energySource === "social" && [3, 5, 8].includes(lifePath)) {
      insights.push("Your social energy aligns perfectly with your Life Path, enhancing your natural charisma.");
    } else if (data.energySource === "solitude" && [7, 4, 2].includes(lifePath)) {
      insights.push("Your need for solitude supports your Life Path's introspective nature.");
    }
    
    // Relationship insights
    if (data.relationshipStyle === "independent" && [1, 5, 7].includes(lifePath)) {
      insights.push("Your independent nature is a core strength of your Life Path.");
    } else if (data.relationshipStyle === "partnership" && [2, 6, 8].includes(lifePath)) {
      insights.push("Your partnership-oriented approach enhances your Life Path's collaborative energy.");
    }
    
    // Career insights
    if (data.careerMotivation === "leadership" && [1, 8, 22].includes(lifePath)) {
      insights.push("You're naturally aligned for leadership roles - embrace opportunities to guide others.");
    } else if (data.careerMotivation === "creativity" && [3, 5, 11].includes(lifePath)) {
      insights.push("Creative expression is essential for your fulfillment - make it a priority.");
    }
    
    // Current phase insights
    if (data.lifePhase === "transforming") {
      insights.push("You're in a powerful transformation phase - trust the process and embrace change.");
    }
    
    return insights;
  };

  const generateRecommendations = (lifePath: number, dayNumber: number, data: QuizData) => {
    const recommendations = [];
    
    if ([7, 9].includes(dayNumber)) {
      recommendations.push("Your day number suggests being selective in relationships - quality over quantity.");
    }
    
    if (dayNumber === 6) {
      recommendations.push("Your day number 6 enhances your natural magnetism - use it wisely in relationships.");
    }
    
    if ([11, 22, 33].includes(lifePath)) {
      recommendations.push("As a master number, you have heightened spiritual responsibilities and potential.");
    }
    
    // Goal-specific recommendations
    if (data.primaryGoal === "love") {
      recommendations.push("Focus on self-love first - your ideal partner will appear when you're aligned.");
    } else if (data.primaryGoal === "success") {
      recommendations.push("Success comes through aligning with your Life Path purpose, not fighting against it.");
    }
    
    recommendations.push("Book a full consultation for deeper insights into your cosmic blueprint");
    
    return recommendations;
  };

  const isCurrentStepValid = () => {
    const question = questions[currentStep];
    
    if (question.optional) return true;
    
    switch (question.type) {
      case "input":
        if (question.id === "name") {
          return quizData.firstName.trim() !== "" && quizData.lastName.trim() !== "";
        }
        return true;
      case "date":
        return quizData.birthDate !== "";
      case "choice":
        return quizData[question.field as keyof QuizData] !== "";
      default:
        return true;
    }
  };

  // Don't render inline results anymore - wait for email capture or redirect
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If quiz is completed and we have a result, show a message
  if (currentStep >= questions.length && result && !showEmailCapture) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Quiz Completed!</h3>
              <p className="text-muted-foreground">
                Your cosmic insights are being prepared...
              </p>
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    // Clear saved data and restart
                    sessionStorage.removeItem('quizData');
                    sessionStorage.removeItem('quizResult');
                    setResult(null);
                    setCurrentStep(0);
                    setQuizData({
                      firstName: "",
                      middleName: "",
                      lastName: "",
                      currentName: "",
                      birthDate: "",
                      birthTime: "",
                      birthPlace: "",
                      birthLatitude: undefined,
                      birthLongitude: undefined,
                      birthTimezone: undefined,
                      energySource: "",
                      decisionStyle: "",
                      lifeApproach: "",
                      stressResponse: "",
                      relationshipStyle: "",
                      careerMotivation: "",
                      spiritualBeliefs: "",
                      currentChallenge: "",
                      lifePhase: "",
                      primaryGoal: "",
                    });
                  }}
                  variant="outline"
                >
                  Take Quiz Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Progress value={progress} className="mb-8" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>{currentQuestion.title}</CardTitle>
              <CardDescription>{currentQuestion.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentQuestion.type === "input" && (
                  <div className="space-y-4">
                    {currentQuestion.id === "name" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={quizData.firstName}
                            onChange={(e) => setQuizData({ ...quizData, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="middleName">Middle name (optional)</Label>
                          <Input
                            id="middleName"
                            type="text"
                            placeholder="Enter your middle name"
                            value={quizData.middleName}
                            onChange={(e) => setQuizData({ ...quizData, middleName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={quizData.lastName}
                            onChange={(e) => setQuizData({ ...quizData, lastName: e.target.value })}
                          />
                        </div>
                      </>
                    )}
                    {currentQuestion.id === "currentName" && (
                      <div className="space-y-2">
                        <Label htmlFor="currentName">Current name</Label>
                        <Input
                          id="currentName"
                          type="text"
                          placeholder="Leave blank if same as birth name"
                          value={quizData.currentName}
                          onChange={(e) => setQuizData({ ...quizData, currentName: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                )}

                {currentQuestion.type === "date" && (
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth date</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={quizData.birthDate}
                      onChange={(e) => setQuizData({ ...quizData, birthDate: e.target.value })}
                    />
                  </div>
                )}

                {currentQuestion.type === "time" && (
                  <div className="space-y-2">
                    <Label htmlFor="birthTime">Birth time</Label>
                    <Input
                      id="birthTime"
                      type="time"
                      value={quizData.birthTime}
                      onChange={(e) => setQuizData({ ...quizData, birthTime: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Don't know? Skip this for now
                    </p>
                  </div>
                )}

                {currentQuestion.type === "location" && (
                  <>
                    <LocationSearch
                      label="Birth place"
                      value={quizData.birthPlace}
                      latitude={quizData.birthLatitude}
                      longitude={quizData.birthLongitude}
                      onLocationSelect={(location) => {
                        setQuizData({
                          ...quizData,
                          birthPlace: location.placeName,
                          birthLatitude: location.latitude,
                          birthLongitude: location.longitude,
                          birthTimezone: location.timezone,
                        });
                      }}
                    />
                    <TimezoneSelect
                      value={quizData.birthTimezone}
                      onValueChange={(tz) => setQuizData({ ...quizData, birthTimezone: tz })}
                      birthDate={quizData.birthDate}
                      detectFromLocation={!!quizData.birthLatitude && !!quizData.birthLongitude}
                      latitude={quizData.birthLatitude}
                      longitude={quizData.birthLongitude}
                    />
                  </>
                )}

                {currentQuestion.type === "choice" && (
                  <div className="grid gap-3">
                    {currentQuestion.options?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChoice(currentQuestion.field!, option.value)}
                        className={`
                          group relative flex items-center gap-4 w-full p-4 rounded-lg border-2 transition-all
                          ${quizData[currentQuestion.field as keyof QuizData] === option.value
                            ? "border-purple-600 bg-purple-50 dark:bg-purple-950/20"
                            : "border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600"
                          }
                        `}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="text-left flex-1 font-medium">{option.label}</span>
                        {quizData[currentQuestion.field as keyof QuizData] === option.value && (
                          <Check className="h-5 w-5 text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  {currentQuestion.type !== "choice" && (
                    <Button
                      onClick={handleNext}
                      disabled={!isCurrentStepValid()}
                      className="flex-1"
                    >
                      {currentStep === questions.length - 1 ? "Get My Results" : "Next"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                  {currentQuestion.optional && currentQuestion.type !== "choice" && (
                    <Button
                      variant="ghost"
                      onClick={handleNext}
                    >
                      Skip
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      {/* Email Capture Modal - Shows BEFORE results */}
      <AnimatePresence>
        {showEmailCapture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Card className="max-w-lg w-full">
                <CardHeader className="text-center">
                  <motion.div 
                    className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="h-10 w-10 text-purple-600" />
                  </motion.div>
                  <CardTitle className="text-2xl">Your Report is Ready!</CardTitle>
                  <CardDescription className="text-base">
                    Life Path {result?.lifePath} - {result?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    {/* Preview of what they'll get */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Your Personalized Insights Include:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Complete Life Path {result?.lifePath} analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Your Expression Number {result?.expressionNumber} meaning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Personalized recommendations for {quizData.primaryGoal}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Compatibility insights & timing forecasts</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Enter your email to see your full report</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={emailError ? "border-red-500" : ""}
                        autoFocus
                      />
                      {emailError && (
                        <p className="text-sm text-red-500">{emailError}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        size="lg"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Get My Free Report
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-xs"
                        onClick={skipEmailCapture}
                      >
                        Skip for now (you'll miss personalized updates)
                      </Button>
                    </div>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      🔒 Your privacy is protected. Unsubscribe anytime.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}