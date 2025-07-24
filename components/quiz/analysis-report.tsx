"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, TrendingUp, Heart, Brain, Calendar, AlertCircle, 
  Target, Users, Briefcase, Star, ArrowRight 
} from "lucide-react";
import { 
  lifePathMeanings, 
  birthDayNumberMeanings, 
  personalYearMeanings,
  compatibilityChart 
} from "@/lib/numerology/interpretations";
import { getNumerologyProfile } from "@/lib/numerology/calculations";

interface AnalysisReportProps {
  name: string;
  birthDate: string;
  quizData: any;
  lifePath: number;
  dayNumber: number;
  expressionNumber: number;
}

export function AnalysisReport({ 
  name, 
  birthDate, 
  quizData, 
  lifePath, 
  dayNumber, 
  expressionNumber 
}: AnalysisReportProps) {
  // Get full numerology profile
  const profile = getNumerologyProfile(birthDate, name);
  const lifePathInfo = lifePathMeanings[lifePath] || lifePathMeanings[1];
  const dayInfo = birthDayNumberMeanings[dayNumber] || birthDayNumberMeanings[1];
  const yearInfo = personalYearMeanings[profile.personalYear] || personalYearMeanings[1];
  const compatibility = compatibilityChart[lifePath] || compatibilityChart[1];

  // Calculate age for life stage
  const birthYear = parseInt(birthDate.split("-")[0]);
  const age = new Date().getFullYear() - birthYear;

  // Personality insights based on quiz answers
  const getPersonalityInsights = () => {
    const insights = [];
    
    // Energy source alignment
    if (quizData.energySource === "social" && [3, 5, 8].includes(lifePath)) {
      insights.push({
        type: "strength",
        text: "Your social energy perfectly aligns with your Life Path, amplifying your natural charisma and leadership abilities."
      });
    } else if (quizData.energySource === "solitude" && [7, 4, 2].includes(lifePath)) {
      insights.push({
        type: "strength", 
        text: "Your preference for solitude supports your Life Path's need for deep thinking and introspection."
      });
    } else if (quizData.energySource === "social" && [7, 4].includes(lifePath)) {
      insights.push({
        type: "growth",
        text: "While you enjoy social energy, your Life Path suggests developing comfort with solitude for deeper insights."
      });
    }

    // Decision style insights
    if (quizData.decisionStyle === "logic" && [1, 4, 8].includes(lifePath)) {
      insights.push({
        type: "strength",
        text: "Your logical decision-making perfectly complements your Life Path's practical nature."
      });
    } else if (quizData.decisionStyle === "intuition" && [2, 7, 11].includes(lifePath)) {
      insights.push({
        type: "strength",
        text: "Trust your intuition - it's one of your Life Path's greatest gifts."
      });
    }

    // Career alignment
    if (quizData.careerMotivation === "leadership" && [1, 8, 22].includes(lifePath)) {
      insights.push({
        type: "strength",
        text: "You're naturally aligned for leadership. Embrace opportunities to guide and inspire others."
      });
    } else if (quizData.careerMotivation === "creativity" && [3, 5, 11].includes(lifePath)) {
      insights.push({
        type: "strength",
        text: "Creative expression is essential for your fulfillment. Make it a daily priority."
      });
    } else if (quizData.careerMotivation === "service" && [2, 6, 9, 33].includes(lifePath)) {
      insights.push({
        type: "strength",
        text: "Your desire to serve others aligns perfectly with your Life Path's mission."
      });
    }

    // Current challenges
    if (quizData.currentChallenge === "career" && profile.personalYear === 1) {
      insights.push({
        type: "timing",
        text: "Perfect timing! Your Personal Year 1 supports new career ventures. Take bold action now."
      });
    } else if (quizData.currentChallenge === "love" && profile.personalYear === 6) {
      insights.push({
        type: "timing",
        text: "Excellent timing for love! Your Personal Year 6 enhances relationships and commitments."
      });
    } else if (quizData.currentChallenge === "career" && profile.personalYear === 7) {
      insights.push({
        type: "warning",
        text: "Personal Year 7 suggests focusing on planning rather than launching. Research and prepare now."
      });
    }

    return insights;
  };

  const personalityInsights = getPersonalityInsights();

  // Calculate cosmic alignment score
  const getAlignmentScore = () => {
    let score = 60; // Base score
    
    // Life Path and career alignment
    if (quizData.careerMotivation === "leadership" && [1, 8, 22].includes(lifePath)) score += 10;
    if (quizData.careerMotivation === "creativity" && [3, 5].includes(lifePath)) score += 10;
    if (quizData.careerMotivation === "service" && [2, 6, 9].includes(lifePath)) score += 10;
    
    // Energy alignment
    if (quizData.energySource === "social" && [3, 5, 8].includes(lifePath)) score += 10;
    if (quizData.energySource === "solitude" && [7, 4].includes(lifePath)) score += 10;
    
    // Relationship style alignment
    if (quizData.relationshipStyle === "independent" && [1, 5, 7].includes(lifePath)) score += 10;
    if (quizData.relationshipStyle === "partnership" && [2, 6].includes(lifePath)) score += 10;
    
    return Math.min(score, 100);
  };

  const alignmentScore = getAlignmentScore();

  return (
    <div className="space-y-6">
      {/* Header with Numbers */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Your Cosmic Blueprint Analysis</CardTitle>
          <CardDescription>Based on ancient numerology wisdom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-2">
                <span className="text-2xl font-bold text-purple-600">{lifePath}</span>
              </div>
              <p className="text-sm font-medium">Life Path</p>
              <p className="text-xs text-muted-foreground">Core Mission</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/20 mb-2">
                <span className="text-2xl font-bold text-pink-600">{expressionNumber}</span>
              </div>
              <p className="text-sm font-medium">Expression</p>
              <p className="text-xs text-muted-foreground">Natural Talents</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-2">
                <span className="text-2xl font-bold text-blue-600">{dayNumber}</span>
              </div>
              <p className="text-sm font-medium">Day Number</p>
              <p className="text-xs text-muted-foreground">Karmic Gifts</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-2">
                <span className="text-2xl font-bold text-green-600">{profile.personalYear}</span>
              </div>
              <p className="text-sm font-medium">Personal Year</p>
              <p className="text-xs text-muted-foreground">Current Cycle</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cosmic Alignment Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Cosmic Alignment Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your Current Alignment</span>
              <span className="font-bold">{alignmentScore}%</span>
            </div>
            <Progress value={alignmentScore} className="h-3" />
          </div>
          <p className="text-sm text-muted-foreground">
            {alignmentScore >= 80 
              ? "Excellent! You're living in strong alignment with your cosmic blueprint."
              : alignmentScore >= 60
              ? "Good alignment! Some adjustments could enhance your cosmic flow."
              : "There's room for growth. Following your cosmic guidance will improve alignment."}
          </p>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="lifepath" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="lifepath">Life Path</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="timing">Cosmic Timing</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
        </TabsList>

        {/* Life Path Analysis */}
        <TabsContent value="lifepath" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                {lifePathInfo.title}
              </CardTitle>
              <CardDescription>{lifePathInfo.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Your Life Mission</h4>
                <p className="text-sm text-muted-foreground">{lifePathInfo.mission}</p>
              </div>
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Natural Strengths
                  </h4>
                  <ul className="space-y-1">
                    {lifePathInfo.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    Growth Areas
                  </h4>
                  <ul className="space-y-1">
                    {lifePathInfo.challenges.map((challenge, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  Ideal Career Paths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lifePathInfo.careers.map((career, i) => (
                    <Badge key={i} variant="secondary">{career}</Badge>
                  ))}
                </div>
              </div>
              
              {/* Day Number Karma */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Day Number {dayNumber} Influence</h4>
                <p className="text-sm text-muted-foreground mb-2">{dayInfo.overview}</p>
                <div className="flex flex-wrap gap-2">
                  {dayInfo.talents.map((talent: string, i: number) => (
                    <Badge key={i} variant="outline">{talent}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personality Analysis */}
        <TabsContent value="personality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-pink-600" />
                Personality Profile Analysis
              </CardTitle>
              <CardDescription>
                How your choices align with your cosmic blueprint
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {personalityInsights.map((insight, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-lg ${
                    insight.type === 'strength' 
                      ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
                      : insight.type === 'growth'
                      ? 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800'
                      : insight.type === 'timing'
                      ? 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800'
                      : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800'
                  }`}
                >
                  <p className="text-sm">{insight.text}</p>
                </div>
              ))}
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Your Energy Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    {quizData.energySource === "social" 
                      ? "You thrive in social environments and draw energy from interactions."
                      : quizData.energySource === "solitude"
                      ? "You recharge through quiet reflection and solo activities."
                      : quizData.energySource === "nature"
                      ? "Nature and outdoor activities restore your vital energy."
                      : "Creative expression fuels your soul and brings you alive."}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Decision Making Style</h4>
                  <p className="text-sm text-muted-foreground">
                    {quizData.decisionStyle === "logic"
                      ? "You rely on facts and logical analysis to guide your choices."
                      : quizData.decisionStyle === "intuition"
                      ? "Your gut feelings and inner knowing guide you well."
                      : quizData.decisionStyle === "others"
                      ? "You consider the impact on others when making decisions."
                      : "Past experiences inform your current choices and direction."}
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Life Approach</h4>
                <p className="text-sm">
                  {quizData.lifeApproach === "planner"
                    ? "Your structured approach to life supports manifestation, especially in Personal Years 1, 4, and 8."
                    : quizData.lifeApproach === "spontaneous"
                    ? "Your flexible nature thrives in Personal Years 3, 5, and 9 when change is favorable."
                    : quizData.lifeApproach === "balanced"
                    ? "Your balanced approach serves you well in all personal year cycles."
                    : "Following universal signs aligns you with cosmic timing naturally."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cosmic Timing */}
        <TabsContent value="timing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Personal Year {profile.personalYear}: {yearInfo.theme}
              </CardTitle>
              <CardDescription>{yearInfo.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-green-600">Opportunities</h4>
                  <ul className="space-y-1">
                    {yearInfo.opportunities.map((opp, i) => (
                      <li key={i} className="text-sm flex items-start">
                        <ArrowRight className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-amber-600">Cautions</h4>
                  <ul className="space-y-1">
                    {yearInfo.warnings.map((warning, i) => (
                      <li key={i} className="text-sm flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Best Months for Action</h4>
                <div className="flex gap-2">
                  {yearInfo.bestMonths.map((month, i) => (
                    <Badge key={i} variant="default">
                      {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Current Life Stage</h4>
                <p className="text-sm mb-2">
                  At age {age}, you're in stage {profile.currentLifeStage.stage} of 4: 
                  <span className="font-semibold"> {profile.currentLifeStage.description}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  This stage emphasizes {
                    profile.currentLifeStage.stage === 1 ? "learning and foundation building" :
                    profile.currentLifeStage.stage === 2 ? "establishing your path and building momentum" :
                    profile.currentLifeStage.stage === 3 ? "harvesting rewards and sharing wisdom" :
                    "legacy building and spiritual mastery"
                  }.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{profile.personalMonth}</p>
                  <p className="text-xs text-muted-foreground">Personal Month</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-2xl font-bold text-pink-600">{profile.personalDay}</p>
                  <p className="text-xs text-muted-foreground">Personal Day</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{profile.universalDay}</p>
                  <p className="text-xs text-muted-foreground">Universal Day</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relationships */}
        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Relationship Compatibility Guide
              </CardTitle>
              <CardDescription>{lifePathInfo.relationships}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Soulmate Numbers</h4>
                    <div className="flex gap-2">
                      {compatibility.soulmates.map((num, i) => (
                        <Badge key={i} className="bg-green-100 text-green-800 dark:bg-green-900/20">
                          Life Path {num}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Deep spiritual connection and understanding
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-600">Friend Numbers</h4>
                    <div className="flex gap-2">
                      {compatibility.friends.map((num, i) => (
                        <Badge key={i} className="bg-blue-100 text-blue-800 dark:bg-blue-900/20">
                          Life Path {num}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Natural harmony and mutual support
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2 text-amber-600">Challenge Numbers</h4>
                    <div className="flex gap-2">
                      {compatibility.challenges.map((num, i) => (
                        <Badge key={i} className="bg-amber-100 text-amber-800 dark:bg-amber-900/20">
                          Life Path {num}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Growth opportunities through friction
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">Avoid Numbers</h4>
                    <div className="flex gap-2">
                      {compatibility.avoid.map((num, i) => (
                        <Badge key={i} className="bg-red-100 text-red-800 dark:bg-red-900/20">
                          Life Path {num}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fundamental incompatibilities
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Your Relationship Style</h4>
                <p className="text-sm mb-2">
                  {quizData.relationshipStyle === "independent"
                    ? "You need space and autonomy in relationships. Partners who respect your independence while maintaining connection work best."
                    : quizData.relationshipStyle === "partnership"
                    ? "You thrive in close partnerships with deep emotional bonds. Seek partners who value commitment and togetherness."
                    : quizData.relationshipStyle === "variety"
                    ? "You enjoy dynamic relationships with excitement and growth. Partners who embrace change and adventure suit you."
                    : "You value stability and tradition in relationships. Partners who share your commitment to building lasting bonds work well."}
                </p>
                
                {quizData.primaryGoal === "love" && (
                  <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded">
                    <p className="text-sm font-semibold text-pink-600">Love Goal Guidance:</p>
                    <p className="text-sm mt-1">
                      {profile.personalYear === 6 
                        ? "Perfect timing! Personal Year 6 strongly supports new relationships and commitments."
                        : profile.personalYear === 2
                        ? "Good year for partnerships. Focus on patience and allowing relationships to develop naturally."
                        : profile.personalYear === 7
                        ? "This year favors self-love and inner work. The right person will appear when you're aligned."
                        : `Focus on becoming the partner you seek. Your Personal Year ${profile.personalYear} supports self-development.`}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Steps */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Your Personalized Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quizData.primaryGoal === "love" && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-4 w-4 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Love & Relationships</p>
                <p className="text-sm text-muted-foreground">
                  Focus on Life Path {compatibility.soulmates[0]} or {compatibility.soulmates[1]} partners. 
                  {yearInfo.theme.includes("Love") ? " This year especially favors romantic connections." : ""}
                </p>
              </div>
            </div>
          )}
          
          {quizData.primaryGoal === "success" && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Career Success</p>
                <p className="text-sm text-muted-foreground">
                  Align your career with: {lifePathInfo.careers.slice(0, 2).join(", ")}. 
                  {[1, 8].includes(profile.personalYear) ? " Excellent timing for career moves!" : ""}
                </p>
              </div>
            </div>
          )}
          
          {quizData.primaryGoal === "growth" && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Personal Growth</p>
                <p className="text-sm text-muted-foreground">
                  Focus on your Life Path mission: {lifePathInfo.mission}
                  {profile.personalYear === 7 ? " Perfect year for spiritual development!" : ""}
                </p>
              </div>
            </div>
          )}
          
          {quizData.primaryGoal === "abundance" && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Financial Abundance</p>
                <p className="text-sm text-muted-foreground">
                  {[8, 1, 4].includes(profile.personalYear) 
                    ? "Excellent timing! Your Personal Year supports material success."
                    : `Build foundations now for abundance in Personal Year 8 (${8 - profile.personalYear} years away).`}
                </p>
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-1">Next Steps:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Review your Life Path {lifePath} careers and align your work</li>
              <li>Use Personal Year {profile.personalYear} energy for {yearInfo.opportunities[0].toLowerCase()}</li>
              <li>Connect with Life Path {compatibility.soulmates[0]} or {compatibility.friends[0]} people</li>
              <li>Schedule important actions during your power months: {yearInfo.bestMonths.map(m => 
                new Date(2024, m - 1).toLocaleString('default', { month: 'short' })
              ).join(", ")}</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}