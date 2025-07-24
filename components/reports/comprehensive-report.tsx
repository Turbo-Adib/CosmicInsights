"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, TrendingUp, Heart, Brain, Calendar, AlertCircle, 
  Target, Users, Briefcase, Star, ArrowRight, Lock, Crown,
  Download, Share2, Mail, Eye, Clock, ChevronRight, Gift,
  Zap, Shield, Timer, Check
} from "lucide-react";
import { getLifePathMeaning, getPersonalYearMeaning, calculateRelationshipCompatibility } from "@/lib/knowledge-base";
import { getNumerologyProfile } from "@/lib/numerology/calculations";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EnhancedFreeReport } from "@/components/reports/enhanced-free-report";

interface ComprehensiveReportProps {
  reportId: string;
  reportData: any;
  accessLevel: 'teaser' | 'free' | 'basic' | 'premium';
}

export function ComprehensiveReport({ 
  reportId, 
  reportData, 
  accessLevel
}: ComprehensiveReportProps) {
  // Use enhanced report for teaser/free levels
  if (accessLevel === 'teaser' || accessLevel === 'free') {
    return <EnhancedFreeReport reportId={reportId} reportData={reportData} />;
  }
  const router = useRouter();
  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('premium');
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [limitedTimeOffer, setLimitedTimeOffer] = useState(true);
  const [offerTimeLeft, setOfferTimeLeft] = useState(86400); // 24 hours in seconds
  const [sharedOnSocial, setSharedOnSocial] = useState(false);
  const [unlockedSection, setUnlockedSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Extract data based on access level
  const { numerology, personalityProfile, quizData, lockedSections, teaserInsights, upgradePrompt } = reportData.content || {};
  const lifePathNumber = numerology?.lifePathNumber || 1;
  
  // Get interpretations from knowledge base
  const lifePathMeaning = getLifePathMeaning(lifePathNumber);
  const personalYearInfo = quizData?.birthDate ? 
    getPersonalYearMeaning(getNumerologyProfile(quizData.birthDate, quizData.firstName).personalYear) : 
    null;

  // Track user engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Smart upsell timing based on engagement
  // DISABLED: Auto-popup removed for better UX
  // Users will see upsell only when they interact with locked content
  /*
  useEffect(() => {
    if (accessLevel === 'teaser' || accessLevel === 'free') {
      // Show after 30 seconds OR 50% scroll depth
      if (timeOnPage >= 30 || scrollDepth >= 50) {
        setShowUpsell(true);
      }
    }
  }, [accessLevel, timeOnPage, scrollDepth]);
  */

  // Countdown timer for limited offer
  useEffect(() => {
    const timer = setInterval(() => {
      setOfferTimeLeft(prev => {
        if (prev <= 0) {
          setLimitedTimeOffer(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Social sharing functions
  const shareOnSocial = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const shareText = `I just discovered I'm a Life Path ${lifePathNumber}! 🌟 Get your free numerology report at CosmicInsights.`;
    const shareUrl = window.location.href;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
    
    // Track sharing and unlock a section
    if (!sharedOnSocial) {
      setSharedOnSocial(true);
      // Unlock the first locked section as a reward
      const firstLockedKey = Object.keys(lockedSections || {})[0];
      if (firstLockedKey) {
        setUnlockedSection(firstLockedKey);
      }
    }
  };

  const renderTeaserContent = () => {
    // Extract enhanced content from reportData
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

        {/* Main Numerology Analysis - 60-70% of value */}
        <Card className="border-2 border-purple-200 dark:border-purple-800 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Your Complete Numerology Analysis
            </CardTitle>
            <CardDescription>
              {enhancedNumerology?.lifePathCalculation}
            </CardDescription>
          </CardHeader>
        <CardContent className="space-y-4">
            {/* Core Numbers Display */}
            <Tabs defaultValue="lifepath" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lifepath">Life Path</TabsTrigger>
                <TabsTrigger value="expression">Expression</TabsTrigger>
                <TabsTrigger value="birthday">Birth Day</TabsTrigger>
              </TabsList>
              
              <TabsContent value="lifepath" className="space-y-4">
                {/* Life Path Explanation Box */}
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
                          <strong>How it's calculated:</strong> We add all digits of your birth date (month + day + year) and reduce to a single digit (1-9) or master number (11, 22, 33). For example: Dec 15, 1985 = 1+2+1+5+1+9+8+5 = 32 = 3+2 = 5.
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
                    <span className="text-3xl font-bold text-purple-600">{enhancedNumerology?.lifePathNumber}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Life Path {enhancedNumerology?.lifePathNumber}</h3>
                  <p className="text-muted-foreground mb-4">{enhancedNumerology?.lifePathSummary}</p>
                </div>
                
                {/* Life Path Detailed Analysis */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Your Life Path Meaning</h4>
                    <Card className="bg-purple-50/50 dark:bg-purple-950/20">
                      <CardContent className="pt-4">
                        <p className="text-sm">{enhancedNumerology?.lifePathMeaning?.overview}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Core Strengths</h5>
                      <div className="space-y-2">
                        {enhancedNumerology?.lifePathMeaning?.strengths?.map((strength: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Growth Areas</h5>
                      <div className="space-y-2">
                        {enhancedNumerology?.lifePathMeaning?.challenges?.map((challenge: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                            <span className="text-sm">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="expression" className="space-y-4">
                {/* Expression Number Explanation */}
                <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Brain className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">What is an Expression Number?</h4>
                        <p className="text-sm text-muted-foreground">
                          Your Expression number (also called Destiny number) reveals your natural talents, abilities, and goals in life. It's calculated from your full birth name using the numerical value of each letter (A=1, B=2, etc.). This number shows what you're meant to do and become in this lifetime.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center py-6">
                  <Badge variant="secondary" className="text-lg p-4">
                    Expression Number {enhancedNumerology?.expressionNumber}
                  </Badge>
                  <h4 className="text-lg font-semibold mt-4 mb-2">Your Natural Talents</h4>
                  <p className="text-muted-foreground">{enhancedNumerology?.expressionMeaning}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="birthday" className="space-y-4">
                {/* Birth Day Number Explanation */}
                <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Gift className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">What is a Birth Day Number?</h4>
                        <p className="text-sm text-muted-foreground">
                          Your Birth Day number is simply the day of the month you were born (1-31). This number reveals a special talent or gift you possess. Unlike other numbers that are reduced, your birth day stands alone and adds a unique quality to your numerology profile.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center py-6">
                  <Badge variant="secondary" className="text-lg p-4">
                    Birth Day {enhancedNumerology?.birthDayNumber}
                  </Badge>
                  <h4 className="text-lg font-semibold mt-4 mb-2">Your Special Gift</h4>
                  <p className="text-muted-foreground">{enhancedNumerology?.birthDayMeaning}</p>
                </div>
              </TabsContent>
            </Tabs>
          
            <Separator className="my-6" />
            
            {/* Personality Profile Section */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Your Personality Profile
              </h3>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                <p className="text-sm mb-4">{personalityProfile?.overview}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Your Strengths</h5>
                    <div className="space-y-1">
                      {personalityProfile?.strengths?.slice(0, 3).map((strength: string, i: number) => (
                        <Badge key={i} variant="secondary" className="mr-2 mb-1">{strength}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-2">Growth Opportunities</h5>
                    <div className="space-y-1">
                      {personalityProfile?.challenges?.slice(0, 2).map((challenge: string, i: number) => (
                        <Badge key={i} variant="outline" className="mr-2 mb-1">{challenge}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Influences */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Your Current Cosmic Influences
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Personal Year {currentInfluences?.personalYear?.year}</CardTitle>
                    <CardDescription>{currentInfluences?.personalYear?.theme}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{currentInfluences?.personalYear?.focus}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Personal Month {currentInfluences?.personalMonth?.month}</CardTitle>
                    <CardDescription>{currentInfluences?.personalMonth?.theme}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{currentInfluences?.personalMonth?.focus}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h5 className="font-medium mb-2">Recommendations for You</h5>
                <ul className="space-y-2">
                  {currentInfluences?.recommendations?.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Compatibility Section */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-600" />
                Love & Compatibility Insights
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm mb-4">{compatibility?.bestMatches?.description}</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Soulmates</p>
                      <div className="flex justify-center gap-1 mt-1">
                        {compatibility?.bestMatches?.soulmates?.map((num: number) => (
                          <Badge key={num} variant="secondary">{num}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Compatible</p>
                      <div className="flex justify-center gap-1 mt-1">
                        {compatibility?.bestMatches?.compatible?.slice(0, 2).map((num: number) => (
                          <Badge key={num} variant="outline">{num}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Growth</p>
                      <div className="flex justify-center gap-1 mt-1">
                        {compatibility?.bestMatches?.growth?.slice(0, 2).map((num: number) => (
                          <Badge key={num} variant="outline">{num}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <h5 className="font-medium text-sm mb-2">Your Relationship Style</h5>
                    <p className="text-sm text-muted-foreground mb-3">{compatibility?.relationshipStyle}</p>
                    <h5 className="font-medium text-sm mb-2">Tips for Success</h5>
                    <ul className="space-y-1">
                      {compatibility?.tips?.map((tip: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Career Insights */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-purple-600" />
                Career & Life Purpose
              </h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm mb-4">{career?.overview}</p>
                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2">Your Top Career Matches</h5>
                    <div className="space-y-2">
                      {career?.topCareers?.map((career: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">{career}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 opacity-50">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm italic">+5 more careers in full report</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-sm font-medium">Your Work Style</p>
                    <p className="text-sm text-muted-foreground mt-1">{career?.workStyle}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          
            <Separator className="my-6" />
            
            {/* Premium Content Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-600" />
                Unlock Your Complete Cosmic Blueprint
              </h3>
              
              {/* Premium sections grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(premiumSections || {}).map(([key, section]: [string, any]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-lg border-2 border-purple-200 dark:border-purple-800 cursor-pointer"
                    onClick={() => setShowUpsell(true)}
                  >
                    <div className="p-4">
                      <h4 className="font-medium mb-2">{section.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{section.preview}</p>
                      
                      {/* Sample content with blur */}
                      <div className="space-y-2 relative">
                        {section.samples?.map((sample: string, i: number) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            • {sample}
                          </div>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-purple-600/10 dark:bg-purple-600/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary">
                        <Lock className="h-4 w-4 mr-1" />
                        Unlock for {upsellInfo?.price}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Upgrade CTA */}
              <Card className="border-2 border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{upsellInfo?.message}</h3>
                      <p className="text-muted-foreground mb-4">Get instant access to all premium insights</p>
                      
                      {/* Price display */}
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-purple-600">{upsellInfo?.price}</span>
                        <span className="text-sm text-muted-foreground ml-2">{upsellInfo?.savings}</span>
                      </div>
                      
                      {/* Benefits list */}
                      <div className="space-y-2 mb-6 max-w-sm mx-auto text-left">
                        {upsellInfo?.bonuses?.map((bonus: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">{bonus}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      size="lg"
                      className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={() => setShowUpsell(true)}
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
        
        {/* Trust Indicators */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-around text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">4.9/5</p>
                <p className="text-xs text-muted-foreground">Customer Rating</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div>
                <p className="text-2xl font-bold text-purple-600">50K+</p>
                <p className="text-xs text-muted-foreground">Reports Created</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div>
                <p className="text-2xl font-bold text-purple-600">98%</p>
                <p className="text-xs text-muted-foreground">Accuracy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderFreeContent = () => (
    <div className="space-y-6" ref={contentRef}>
      {/* Progress and Upgrade Prompt */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm p-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Your Free Report</p>
            <p className="text-xs text-muted-foreground">{upgradePrompt?.message}</p>
          </div>
          <Button size="sm" variant="default" onClick={() => setShowUpsell(true)}>
            <Zap className="h-4 w-4 mr-1" />
            Upgrade Now
          </Button>
        </div>
      </div>

      <Tabs defaultValue="lifepath" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lifepath">Life Path</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="upgrade" className="relative">
            <Gift className="h-4 w-4 mr-1" />
            Unlock
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="lifepath" className="space-y-4">
          {/* Life Path Explanation for Free Users */}
          <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Understanding Your Life Path Number</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your Life Path number is numerology's most significant number, derived from your birth date. It reveals your life's purpose, natural abilities, and the key lessons you're meant to learn.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Calculation:</strong> Add all digits in your birth date until you get a single digit (1-9) or master number (11, 22, 33). For instance: June 3, 1990 = 6+3+1+9+9+0 = 28 = 2+8 = 10 = 1+0 = 1.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Life Path {lifePathNumber}: {lifePathMeaning?.title}</CardTitle>
              <CardDescription>{numerology?.lifePathAnalysis?.basic?.overview}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Analysis */}
              <div>
                <h4 className="font-semibold mb-2">Core Strengths</h4>
                <div className="flex flex-wrap gap-2">
                  {numerology?.lifePathAnalysis?.basic?.strengths?.slice(0, 3).map((strength: string, i: number) => (
                    <Badge key={i} variant="secondary">{strength}</Badge>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowUpsell(true)}
                  >
                    <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                      <Lock className="h-3 w-3 mr-1" />
                      +{(numerology?.lifePathAnalysis?.basic?.strengths?.length || 0) - 3} more
                    </Badge>
                  </motion.div>
                </div>
              </div>
              
              {/* Personal Year Teaser */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-sm">Your Personal Year</h5>
                  <Badge>{numerology?.basicInsights?.personalYear?.year}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {numerology?.basicInsights?.personalYear?.theme}
                </p>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-50 dark:from-blue-950/20 to-transparent z-10"></div>
                  <p className="text-xs text-muted-foreground blur-sm">
                    This year brings opportunities for... Unlock to see your complete forecast
                  </p>
                </div>
              </div>
              
              {/* Compatibility Teaser */}
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Relationship Compatibility
                </h5>
                <p className="text-sm text-muted-foreground mb-3">
                  {numerology?.basicInsights?.topCompatibility}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => setShowUpsell(true)}
                >
                  See All Compatible Numbers
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              {/* Locked Premium Content */}
              <div className="space-y-3">
                <h5 className="font-medium text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-600" />
                  Premium Insights Available
                </h5>
                {numerology?.lifePathAnalysis?.premium && (
                  <motion.div 
                    className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowUpsell(true)}
                  >
                    <p className="text-sm font-medium text-purple-600">
                      {numerology.lifePathAnalysis.premium}
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Personality Profile</CardTitle>
              <CardDescription>Based on your quiz responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Show actual insights if available */}
              {personalityProfile?.insights && personalityProfile.insights.length > 0 && (
                <div className="space-y-2">
                  {personalityProfile.insights.map((insight: string, i: number) => (
                    <div key={i} className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Energy Pattern */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Energy Source</h5>
                  <p className="text-sm text-muted-foreground">
                    {personalityProfile?.energySource || 'Your unique energy pattern'}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Decision Style</h5>
                  <p className="text-sm text-muted-foreground">
                    {personalityProfile?.decisionStyle || 'How you make choices'}
                  </p>
                </div>
              </div>
              
              {/* Locked Content Preview */}
              <div className="relative overflow-hidden rounded-lg border p-4">
                <div className="absolute inset-0 backdrop-blur-sm bg-background/50 z-10 flex items-center justify-center">
                  <Button size="sm" onClick={() => setShowUpsell(true)}>
                    <Lock className="h-4 w-4 mr-1" />
                    Unlock Full Analysis
                  </Button>
                </div>
                <div className="space-y-2 opacity-50">
                  <p className="text-sm font-medium">🔒 Career Alignment Analysis</p>
                  <p className="text-sm font-medium">🔒 Relationship Patterns</p>
                  <p className="text-sm font-medium">🔒 Personal Growth Path</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What You're Missing</CardTitle>
              <CardDescription>
                {upgradePrompt?.missingInsights} additional insights in your full report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Locked Content Grid */}
              {numerology?.lockedContent && Object.entries(numerology.lockedContent).map(([key, content]: [string, any]) => (
                <motion.div
                  key={key}
                  className="p-4 border rounded-lg cursor-pointer hover:border-purple-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowUpsell(true)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                    {content.count && <Badge variant="secondary">{content.count} items</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{content.preview}</p>
                  {content.sample && (
                    <p className="text-xs text-purple-600 italic">{content.sample}</p>
                  )}
                  {content.teaser && (
                    <p className="text-xs text-muted-foreground mt-1">{content.teaser}</p>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upgrade" className="space-y-4">
          <Card className="border-2 border-purple-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Special Offer Just for You
              </h3>
            </div>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Crown className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Unlock Your Complete Report</h3>
                <p className="text-muted-foreground">
                  Get instant access to all {upgradePrompt?.missingInsights || '40+'} premium insights
                </p>
              </div>
              
              {/* Pricing Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border rounded-lg text-center cursor-pointer"
                  onClick={() => { setSelectedPlan('basic'); setShowUpsell(true); }}
                >
                  <h4 className="font-bold">Basic Report</h4>
                  <p className="text-2xl font-bold mt-2">$19</p>
                  <p className="text-sm text-muted-foreground line-through">$39</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border-2 border-purple-600 rounded-lg text-center cursor-pointer relative"
                  onClick={() => { setSelectedPlan('premium'); setShowUpsell(true); }}
                >
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">BEST VALUE</Badge>
                  <h4 className="font-bold">Premium Report</h4>
                  <p className="text-2xl font-bold mt-2">$49</p>
                  <p className="text-sm text-muted-foreground line-through">$99</p>
                </motion.div>
              </div>
              
              <Button 
                onClick={() => setShowUpsell(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                size="lg"
              >
                Get My Full Report Now
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-3">
                🔒 Secure checkout • 💳 All cards accepted • ↩️ 30-day guarantee
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderPremiumContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Crown className="h-3 w-3 mr-1" />
          Premium Report
        </Badge>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lifepath">Life Path</TabsTrigger>
          <TabsTrigger value="relationships">Love</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="action">Action</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Cosmic Blueprint Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Core Numbers</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <span className="text-sm">Life Path</span>
                      <span className="font-bold">{numerology.lifePathNumber}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-pink-50 dark:bg-pink-950/20 rounded">
                      <span className="text-sm">Expression</span>
                      <span className="font-bold">{numerology.expressionNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <span className="text-sm">Birth Day</span>
                      <span className="font-bold">{numerology.birthDayNumber}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Life Overview</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Soul Mission:</strong> {lifePathMeaning?.purpose}</p>
                    <p><strong>Current Phase:</strong> {quizData?.lifePhase}</p>
                    <p><strong>Primary Goal:</strong> {quizData?.primaryGoal}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Complete Relationship Compatibility Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Compatibility Grid */}
                <div>
                  <h4 className="font-semibold mb-3">Your Compatibility Matrix</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
                      const compat = calculateRelationshipCompatibility(
                        { lifePathNumber },
                        { lifePathNumber: num }
                      );
                      return (
                        <div 
                          key={num}
                          className={`p-3 rounded-lg text-center ${
                            compat.overallScore >= 80 ? 'bg-green-50 dark:bg-green-950/20' :
                            compat.overallScore >= 60 ? 'bg-blue-50 dark:bg-blue-950/20' :
                            compat.overallScore >= 40 ? 'bg-amber-50 dark:bg-amber-950/20' :
                            'bg-red-50 dark:bg-red-950/20'
                          }`}
                        >
                          <p className="font-bold">LP {num}</p>
                          <p className="text-xs">{compat.overallScore}%</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Detailed Analysis */}
                <div>
                  <h4 className="font-semibold mb-2">Relationship Insights</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                      <p className="text-sm font-medium mb-1">Your Ideal Partner Profile:</p>
                      <p className="text-sm text-muted-foreground">
                        Based on your Life Path {lifePathNumber} and personality profile, 
                        you're most compatible with partners who value {lifePathMeaning?.relationships}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <p className="text-sm font-medium mb-1">Relationship Timing:</p>
                      <p className="text-sm text-muted-foreground">
                        {personalYearInfo ? 
                          `Your Personal Year ${personalYearInfo.year} ${
                            [2, 6].includes(personalYearInfo.year) ? 
                            'is excellent for new relationships!' : 
                            'suggests focusing on ' + personalYearInfo.focus[0].toLowerCase()
                          }` :
                          'Timing analysis based on your personal cycles'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Upsell Modal with enhanced features
  const renderUpsellModal = () => (
    <AnimatePresence>
      {showUpsell && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowUpsell(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Limited Time Banner */}
              {limitedTimeOffer && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 text-center">
                  <p className="text-sm font-medium flex items-center justify-center gap-2">
                    <Timer className="h-4 w-4" />
                    Limited Time: 50% OFF - Offer ends in {formatTimeLeft(offerTimeLeft)}
                  </p>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <Crown className="h-12 w-12 text-purple-600" />
                  </motion.div>
                </div>
                <CardTitle className="text-2xl">Unlock Your Complete Cosmic Blueprint</CardTitle>
                <CardDescription>
                  Join 50,000+ people who discovered their life purpose
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Social Proof */}
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.9/5 (2,847 reviews)</span>
                </div>
                
                {/* Single Pricing Option - Value-focused */}
                <div className="max-w-md mx-auto">
                  <Card className="border-2 border-purple-600">
                    <CardHeader>
                      <CardTitle className="text-xl text-center">Complete Report Access</CardTitle>
                      <div className="text-center">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-purple-600">$9</span>
                          <span className="text-muted-foreground line-through">$49</span>
                        </div>
                        <Badge variant="destructive" className="mt-2">LIMITED TIME - SAVE 80%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span><strong>Deep Soul Mission & Karmic Patterns</strong> - Discover your life's true purpose</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span><strong>Complete Compatibility Analysis</strong> - All 12 Life Path matches explained</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span><strong>12-Month Personal Forecast</strong> - Best dates for love, money & decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span><strong>90-Day Action Plan</strong> - Step-by-step guidance to manifest your desires</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span><strong>Career & Wealth Codes</strong> - Your top 8 ideal career paths</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span><strong>Bonus Content</strong> - Lucky numbers, crystals, past life influences</span>
                        </li>
                      </ul>
                      
                      <Separator className="my-4" />
                      
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">You've read 60% of your report</p>
                        <p className="text-sm font-medium">Unlock the premium 40% with deeper insights</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Testimonials */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-center">What Our Customers Say</h4>
                  <div className="grid gap-3">
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-sm italic">"This report was eerily accurate! It helped me understand why I've been struggling in my career and gave me clear direction."</p>
                      <p className="text-xs text-muted-foreground mt-1">- Sarah M., Life Path 7</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-sm italic">"Found my soulmate using the compatibility guide! We're both Life Path 3s and everything makes sense now."</p>
                      <p className="text-xs text-muted-foreground mt-1">- Michael R., Life Path 3</p>
                    </div>
                  </div>
                </div>
                
                {/* Benefits */}
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What You'll Discover:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div>✨ Your soul's true purpose</div>
                    <div>💑 Soulmate compatibility guide</div>
                    <div>📅 Best timing for major decisions</div>
                    <div>💰 Wealth and abundance codes</div>
                    <div>🎯 Personalized action plans</div>
                    <div>🔮 Hidden talents & gifts</div>
                  </div>
                </div>
                
                {/* Urgency Elements */}
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium">
                    ⚡ {Math.floor(Math.random() * 20) + 10} people are viewing this report right now
                  </p>
                </div>
                
                {/* CTA */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                    onClick={() => {
                      // Direct to checkout without authentication
                      router.push(`/checkout?plan=report&report=${reportId}&price=9`);
                    }}
                  >
                    Get Instant Access for $9
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setShowUpsell(false)}
                  >
                    I'll Miss Out on This Opportunity
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      SSL Secure
                    </span>
                    <span>•</span>
                    <span>30-day guarantee</span>
                    <span>•</span>
                    <span>Instant access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {(accessLevel === 'basic' || accessLevel === 'premium') && renderPremiumContent()}
      </div>
      
      {showUpsell && renderUpsellModal()}
    </>
  );
}