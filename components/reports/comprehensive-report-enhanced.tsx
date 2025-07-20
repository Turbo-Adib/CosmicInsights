"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, TrendingUp, Heart, Brain, Calendar, AlertCircle, 
  Target, Users, Briefcase, Star, ArrowRight, Lock, Crown,
  Download, Share2, ChevronDown, ChevronUp, Gift,
  Zap, Shield, Timer, Check, BookOpen, Gem,
  Lightbulb, Compass, Mountain, Flame, Eye
} from "lucide-react";
import { getLifePathMeaning, getPersonalYearMeaning, calculateRelationshipCompatibility, getExpressionMeaning, getBirthDayMeaning } from "@/lib/knowledge-base";
import { getNumerologyProfile } from "@/lib/numerology/calculations";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ComprehensiveReportProps {
  reportId: string;
  reportData: any;
  accessLevel: 'teaser' | 'free' | 'basic' | 'premium';
}

// Component for expandable number sections
const NumberSection = ({ 
  title, 
  number, 
  icon: Icon, 
  color, 
  isExpanded, 
  onToggle,
  children 
}: {
  title: string;
  number: number;
  icon: any;
  color: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <Card className={`border-2 transition-all duration-300 ${isExpanded ? 'border-purple-300 dark:border-purple-700' : 'border-gray-200 dark:border-gray-800'}`}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>Your number is {number}</CardDescription>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </motion.div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export function ComprehensiveReport({ 
  reportId, 
  reportData, 
  accessLevel
}: ComprehensiveReportProps) {
  const router = useRouter();
  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('premium');
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    lifePath: true,
    expression: false,
    birthDay: false,
    personality: false,
    currentInfluences: false,
    compatibility: false,
    career: false
  });
  const [readingSections, setReadingSections] = useState<Record<string, number>>({});
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Extract data based on access level
  const { numerology, personalityProfile, quizData, lockedSections, teaserInsights, upgradePrompt } = reportData.content || {};
  const lifePathNumber = numerology?.lifePathNumber || 1;
  const expressionNumber = numerology?.expressionNumber || 5;
  const birthDayNumber = numerology?.birthDayNumber || 1;
  
  // Get interpretations from knowledge base
  const lifePathMeaning = getLifePathMeaning(lifePathNumber);
  const expressionMeaning = getExpressionMeaning(expressionNumber);
  const birthDayMeaning = getBirthDayMeaning(birthDayNumber);
  const personalYearInfo = quizData?.birthDate ? 
    getPersonalYearMeaning(getNumerologyProfile(quizData.birthDate, quizData.firstName).personalYear) : 
    null;

  // Track reading time per section
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
      
      // Track time spent in each expanded section
      Object.keys(expandedSections).forEach(section => {
        if (expandedSections[section]) {
          setReadingSections(prev => ({
            ...prev,
            [section]: (prev[section] || 0) + 1
          }));
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [expandedSections]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const windowHeight = window.innerHeight;
        const documentHeight = contentRef.current.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollDepth(Math.round(scrollPercentage));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatReadingTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const renderTeaserContent = () => {
    const { 
      numerology: enhancedNumerology, 
      personalityProfile, 
      currentInfluences, 
      compatibility, 
      career,
      lockedSections: premiumSections,
      upgradePrompt: upsellInfo 
    } = reportData.content || {};
    
    return (
      <div className="space-y-6" ref={contentRef}>
        {/* Reading Progress Bar */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm p-2 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Reading Progress</span>
            <span className="text-xs font-medium">{scrollDepth}%</span>
          </div>
          <Progress value={scrollDepth} className="h-2" />
        </div>

        {/* Main Numerology Analysis */}
        <Card className="border-2 border-purple-200 dark:border-purple-800 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Your Complete Numerology Analysis
            </CardTitle>
            <CardDescription>
              Click on each section to explore your numbers in depth
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Life Path Number Section */}
            <NumberSection
              title="Life Path Number"
              number={lifePathNumber}
              icon={Compass}
              color="bg-purple-100 dark:bg-purple-900/50 text-purple-600"
              isExpanded={expandedSections.lifePath}
              onToggle={() => toggleSection('lifePath')}
            >
              <div className="space-y-6">
                {/* Life Path Explanation */}
                <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">What is a Life Path Number?</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Your Life Path number is the most important number in numerology. It's calculated from your birth date and reveals your life's purpose, natural talents, and the lessons you're here to learn.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>How it's calculated:</strong> We add all digits of your birth date (month + day + year) and reduce to a single digit (1-9) or master number (11, 22, 33).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center py-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 mb-4"
                  >
                    <span className="text-3xl font-bold text-purple-600">{lifePathNumber}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{lifePathMeaning?.title}</h3>
                  <p className="text-muted-foreground">{lifePathMeaning?.description}</p>
                </div>
                
                {/* Detailed Analysis */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-purple-600" />
                      Your Life Purpose
                    </h4>
                    <Card className="bg-purple-50/50 dark:bg-purple-950/20">
                      <CardContent className="pt-4">
                        <p className="text-sm">{lifePathMeaning?.purpose}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Flame className="h-4 w-4 text-green-600" />
                        Core Strengths
                      </h5>
                      <div className="space-y-2">
                        {lifePathMeaning?.strengths?.map((strength: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        Growth Areas
                      </h5>
                      <div className="space-y-2">
                        {lifePathMeaning?.challenges?.map((challenge: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      Ideal Career Paths
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {lifePathMeaning?.careers?.slice(0, 4).map((career: string, i: number) => (
                        <Badge key={i} variant="secondary">{career}</Badge>
                      ))}
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-purple-50"
                        onClick={() => setShowUpsell(true)}
                      >
                        <Lock className="h-3 w-3 mr-1" />
                        +{(lifePathMeaning?.careers?.length || 0) - 4} more
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-600" />
                      Relationship Style
                    </h5>
                    <Card className="bg-pink-50/50 dark:bg-pink-950/20">
                      <CardContent className="pt-4">
                        <p className="text-sm">{lifePathMeaning?.relationships}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      Spiritual Path
                    </h5>
                    <Card className="bg-purple-50/50 dark:bg-purple-950/20">
                      <CardContent className="pt-4">
                        <p className="text-sm">{lifePathMeaning?.spiritualPath}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Reading time indicator */}
                <div className="text-center text-xs text-muted-foreground">
                  <Eye className="h-3 w-3 inline mr-1" />
                  Time spent reading: {formatReadingTime(readingSections.lifePath || 0)}
                </div>
              </div>
            </NumberSection>

            {/* Expression Number Section */}
            <NumberSection
              title="Expression Number"
              number={expressionNumber}
              icon={Gem}
              color="bg-green-100 dark:bg-green-900/50 text-green-600"
              isExpanded={expandedSections.expression}
              onToggle={() => toggleSection('expression')}
            >
              <div className="space-y-6">
                {/* Expression Number Explanation */}
                <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Brain className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">What is an Expression Number?</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Your Expression number (also called Destiny number) reveals your natural talents, abilities, and goals in life. It's calculated from your full birth name using the numerical value of each letter.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This number shows what you're meant to do and become in this lifetime - your destiny and the gifts you bring to the world.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {expressionMeaning ? (
                  <>
                    <div className="text-center py-6">
                      <Badge variant="secondary" className="text-lg p-4 mb-4">
                        Expression Number {expressionNumber}
                      </Badge>
                      <h4 className="text-lg font-semibold mb-2">{expressionMeaning.title}</h4>
                      <p className="text-muted-foreground">{expressionMeaning.overview}</p>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {expressionMeaning.keywords.map((keyword: string, i: number) => (
                        <Badge key={i} variant="outline">{keyword}</Badge>
                      ))}
                    </div>

                    {/* Detailed Content */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600" />
                          Natural Talents
                        </h5>
                        <div className="space-y-2">
                          {expressionMeaning.talents.map((talent: string, i: number) => (
                            <div key={i} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{talent}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          Life Purpose
                        </h5>
                        <Card className="bg-blue-50/50 dark:bg-blue-950/20">
                          <CardContent className="pt-4">
                            <p className="text-sm">{expressionMeaning.lifePurpose}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-purple-600" />
                            Career Paths
                          </h5>
                          <div className="space-y-1">
                            {expressionMeaning.careers.slice(0, 4).map((career: string, i: number) => (
                              <Badge key={i} variant="secondary" className="mr-2 mb-1">{career}</Badge>
                            ))}
                            {expressionMeaning.careers.length > 4 && (
                              <Badge 
                                variant="outline" 
                                className="cursor-pointer hover:bg-purple-50"
                                onClick={() => setShowUpsell(true)}
                              >
                                <Lock className="h-3 w-3 mr-1" />
                                +{expressionMeaning.careers.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            Challenges
                          </h5>
                          <div className="space-y-1">
                            {expressionMeaning.challenges.slice(0, 2).map((challenge: string, i: number) => (
                              <div key={i} className="text-sm text-muted-foreground">• {challenge}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-pink-600" />
                          Relationship Style
                        </h5>
                        <Card className="bg-pink-50/50 dark:bg-pink-950/20">
                          <CardContent className="pt-4">
                            <p className="text-sm">{expressionMeaning.relationshipStyle}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          Spiritual Gifts
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {expressionMeaning.spiritualGifts.map((gift: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">{gift}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-indigo-600" />
                          Advice
                        </h5>
                        <Card className="bg-indigo-50/50 dark:bg-indigo-950/20">
                          <CardContent className="pt-4">
                            <p className="text-sm italic">{expressionMeaning.advice}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Badge variant="secondary" className="text-lg p-4">
                      Expression Number {expressionNumber}
                    </Badge>
                    <p className="text-muted-foreground mt-4">{enhancedNumerology?.expressionMeaning}</p>
                  </div>
                )}

                {/* Reading time indicator */}
                <div className="text-center text-xs text-muted-foreground">
                  <Eye className="h-3 w-3 inline mr-1" />
                  Time spent reading: {formatReadingTime(readingSections.expression || 0)}
                </div>
              </div>
            </NumberSection>

            {/* Birth Day Number Section */}
            <NumberSection
              title="Birth Day Number"
              number={birthDayNumber}
              icon={Gift}
              color="bg-amber-100 dark:bg-amber-900/50 text-amber-600"
              isExpanded={expandedSections.birthDay}
              onToggle={() => toggleSection('birthDay')}
            >
              <div className="space-y-6">
                {/* Birth Day Number Explanation */}
                <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Gift className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">What is a Birth Day Number?</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Your Birth Day number is simply the day of the month you were born (1-31). This number reveals a special talent or gift you possess.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Unlike other numbers that are reduced, your birth day stands alone and adds a unique quality to your numerology profile.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {birthDayMeaning ? (
                  <>
                    <div className="text-center py-6">
                      <Badge variant="secondary" className="text-lg p-4 mb-4">
                        Born on Day {birthDayNumber}
                      </Badge>
                      <h4 className="text-lg font-semibold mb-2">{birthDayMeaning.title}</h4>
                      <p className="text-sm text-muted-foreground">{birthDayMeaning.specialGift}</p>
                    </div>

                    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                      <CardContent className="pt-4">
                        <p className="text-sm">{birthDayMeaning.overview}</p>
                      </CardContent>
                    </Card>

                    {/* Detailed Content */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-600" />
                          Special Talents
                        </h5>
                        <div className="space-y-2">
                          {birthDayMeaning.talents.map((talent: string, i: number) => (
                            <div key={i} className="flex items-start gap-2">
                              <Gem className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{talent}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          Life Lessons
                        </h5>
                        <div className="space-y-2">
                          {birthDayMeaning.lifeLessons.map((lesson: string, i: number) => (
                            <div key={i} className="flex items-start gap-2">
                              <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-purple-600" />
                            Career Strengths
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {birthDayMeaning.careerStrengths.map((career: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">{career}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            Challenges
                          </h5>
                          <div className="space-y-1">
                            {birthDayMeaning.challenges.slice(0, 2).map((challenge: string, i: number) => (
                              <div key={i} className="text-sm text-muted-foreground">• {challenge}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-pink-600" />
                          Relationship Gifts
                        </h5>
                        <Card className="bg-pink-50/50 dark:bg-pink-950/20">
                          <CardContent className="pt-4">
                            <p className="text-sm">{birthDayMeaning.relationshipGifts}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Compass className="h-4 w-4 text-indigo-600" />
                          Personal Advice
                        </h5>
                        <Card className="bg-indigo-50/50 dark:bg-indigo-950/20">
                          <CardContent className="pt-4">
                            <p className="text-sm italic">{birthDayMeaning.advice}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Badge variant="secondary" className="text-lg p-4">
                      Birth Day {birthDayNumber}
                    </Badge>
                    <p className="text-muted-foreground mt-4">{enhancedNumerology?.birthDayMeaning}</p>
                  </div>
                )}

                {/* Reading time indicator */}
                <div className="text-center text-xs text-muted-foreground">
                  <Eye className="h-3 w-3 inline mr-1" />
                  Time spent reading: {formatReadingTime(readingSections.birthDay || 0)}
                </div>
              </div>
            </NumberSection>

            <Separator className="my-6" />
            
            {/* Additional sections continue with the same expandable pattern */}
            {/* Personality Profile, Current Influences, Compatibility, Career sections would follow the same structure */}
            
            {/* Premium Content Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-600" />
                Unlock Your Complete Cosmic Blueprint
              </h3>
              
              <Card className="border-2 border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Ready for Deeper Insights?</h3>
                      <p className="text-muted-foreground mb-4">You've explored {Object.values(expandedSections).filter(v => v).length} sections so far!</p>
                      
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-purple-600">$9</span>
                        <span className="text-sm text-muted-foreground ml-2 line-through">$49</span>
                      </div>
                      
                      <div className="space-y-2 mb-6 max-w-sm mx-auto text-left">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">Complete analysis of all your numbers</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">12-month personal forecast</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">Compatibility with all life paths</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">90-day action plan</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      size="lg"
                      className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={() => router.push(`/checkout?plan=report&report=${reportId}&price=9`)}
                    >
                      Unlock Everything Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Shield className="h-3 w-3" />
                      30-day money-back guarantee • Secure payment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {accessLevel === 'teaser' && renderTeaserContent()}
      {/* Other access levels would have similar expandable sections */}
    </div>
  );
}