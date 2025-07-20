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
  Zap, Shield, Timer, Check, User, Trophy, Lightbulb,
  BarChart, PieChart, Activity, Percent, Award, Flame
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getLifePathMeaning, getPersonalYearMeaning } from "@/lib/knowledge-base";
import { getNumerologyProfile } from "@/lib/numerology/calculations";
import { CELEBRITIES_BY_LIFE_PATH, LIFE_PATH_STATISTICS, CAREER_SUCCESS_DATA, getSuccessStories, getInspirationalQuotes } from "@/lib/celebrity-database";
import { useRouter } from "next/navigation";
import { CompatibilityWheel } from "@/components/reports/compatibility-wheel";

interface EnhancedFreeReportProps {
  reportId: string;
  reportData: any;
}

export function EnhancedFreeReport({ reportId, reportData }: EnhancedFreeReportProps) {
  const router = useRouter();
  const [showUpsell, setShowUpsell] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const [engagementScore, setEngagementScore] = useState(0);
  const [unlockedBonus, setUnlockedBonus] = useState(false);
  const [selectedCelebrity, setSelectedCelebrity] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Extract data
  const { numerology, personalityProfile, quizData } = reportData.content || {};
  const lifePathNumber = numerology?.lifePathNumber || 1;
  const birthDayNumber = numerology?.birthDayNumber || 1;
  const expressionNumber = numerology?.expressionNumber || 1;
  
  // Get interpretations
  const lifePathMeaning = getLifePathMeaning(lifePathNumber);
  const celebrities = CELEBRITIES_BY_LIFE_PATH[lifePathNumber] || [];
  const stats = LIFE_PATH_STATISTICS[lifePathNumber as keyof typeof LIFE_PATH_STATISTICS] || { percentage: 11.1, traits: "Unknown" };
  const careerData = CAREER_SUCCESS_DATA[lifePathNumber as keyof typeof CAREER_SUCCESS_DATA] || { topField: "Multiple Fields", successRate: 85 };
  const quotes = getInspirationalQuotes(lifePathNumber);
  
  // Track engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
      // Update engagement score based on time and interactions
      setEngagementScore(prev => Math.min(100, prev + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Scroll tracking with section reveals
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const windowHeight = window.innerHeight;
        const documentHeight = contentRef.current.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollDepth(Math.round(scrollPercentage));
        
        // Reveal sections as user scrolls
        const sections = contentRef.current.querySelectorAll('[data-reveal-section]');
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top < windowHeight * 0.8) {
            const sectionId = section.getAttribute('data-reveal-section');
            if (sectionId && !revealedSections.has(sectionId)) {
              setRevealedSections(prev => new Set(Array.from(prev).concat(sectionId)));
              setEngagementScore(prev => Math.min(100, prev + 10));
            }
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealedSections]);
  
  // Unlock bonus content at high engagement
  useEffect(() => {
    if (engagementScore >= 80 && !unlockedBonus) {
      setUnlockedBonus(true);
      // Trigger celebration
      if (typeof window !== 'undefined') {
        import('canvas-confetti').then((confettiModule) => {
          const confetti = confettiModule.default;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        });
      }
    }
  }, [engagementScore, unlockedBonus]);
  
  // Strategic upsell trigger
  useEffect(() => {
    if (scrollDepth >= 60 && timeOnPage >= 45 && !showUpsell) {
      // User is highly engaged - show special offer
      setTimeout(() => setShowUpsell(true), 2000);
    }
  }, [scrollDepth, timeOnPage, showUpsell]);
  
  const handleShare = (platform: string) => {
    const shareText = `I'm a Life Path ${lifePathNumber} - ${lifePathMeaning?.title}! Just like ${celebrities[0]?.name}! 🌟`;
    const url = window.location.href;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setEngagementScore(prev => Math.min(100, prev + 15));
  };

  const renderNumberAnimation = (number: number, label: string) => (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
      className="relative"
    >
      <div className="w-32 h-32 mx-auto relative">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              {number}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-muted-foreground mt-1"
            >
              {label}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCelebrityComparison = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      data-reveal-section="celebrities"
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">You Share Your Life Path With...</h3>
        <p className="text-muted-foreground">These successful people are also Life Path {lifePathNumber}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {celebrities.slice(0, 2).map((celeb, index) => (
          <motion.div
            key={celeb.name}
            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => setSelectedCelebrity(celeb.name)}
          >
            <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-purple-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{celeb.name}</CardTitle>
                  <Badge variant="secondary">{celeb.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{celeb.achievement}</p>
                {celeb.quote && (
                  <blockquote className="italic text-sm border-l-4 border-purple-400 pl-4">
                    "{celeb.quote}"
                  </blockquote>
                )}
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Born: {new Date(celeb.birthDate).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Locked celebrities teaser */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10 flex items-center justify-center">
          <Button onClick={() => setShowUpsell(true)} variant="secondary">
            <Lock className="h-4 w-4 mr-2" />
            See {celebrities.length - 2} More Celebrities
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-3 opacity-50 blur-sm">
          {celebrities.slice(2, 5).map((celeb) => (
            <Card key={celeb.name} className="p-4">
              <p className="font-medium text-sm">{celeb.name}</p>
              <p className="text-xs text-muted-foreground">{celeb.category}</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderCompatibilitySection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-reveal-section="compatibility"
      className="space-y-6"
    >
      <Card className="border-2 border-pink-200 dark:border-pink-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" />
            Love & Compatibility Analysis
          </CardTitle>
          <CardDescription>
            Discover your perfect matches and relationship dynamics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interactive Compatibility Wheel */}
          <CompatibilityWheel 
            userLifePath={lifePathNumber}
            onNumberClick={(num) => {
              if (num !== lifePathNumber) {
                setShowUpsell(true);
              }
            }}
            lockedNumbers={[1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => n !== lifePathNumber)}
          />
          
          {/* Relationship insights teaser */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Your Relationship Style</h4>
            <div className="p-4 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
              <p className="text-sm mb-3">
                As a Life Path {lifePathNumber}, you approach relationships with {lifePathMeaning?.relationships}...
              </p>
              
              {/* Strategic cutoff */}
              <div className="relative mt-4">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-50 dark:from-pink-950/20 via-pink-50/80 dark:via-pink-950/15 to-transparent z-10" />
                <div className="blur-sm space-y-2">
                  <p className="text-sm">Your ideal partner would be someone who...</p>
                  <p className="text-sm">The key to lasting love for you is...</p>
                </div>
              </div>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full mt-4 relative z-20"
                onClick={() => setShowUpsell(true)}
              >
                <Lock className="h-4 w-4 mr-2" />
                Unlock Your Complete Love Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderInteractiveStats = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-reveal-section="stats"
      className="space-y-6"
    >
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Your Numerology Statistics
          </h3>
        </div>
        <CardContent className="pt-6 space-y-6">
          {/* Rarity meter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Life Path Rarity</span>
              <span className="text-sm text-muted-foreground">{stats.percentage}% of population</span>
            </div>
            <Progress value={100 - (stats?.percentage || 11.1)} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.percentage < 5 ? "You have a rare master number!" : 
               stats.percentage < 10 ? "Your path is uncommon" : 
               "Your path is well-balanced"}
            </p>
          </div>
          
          {/* Career success indicator */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Career Success Rate</span>
              <span className="text-sm font-bold text-green-600">{careerData.successRate}%</span>
            </div>
            <div className="relative h-20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${careerData.successRate}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm font-medium">Top Field: {careerData.topField}</p>
              </div>
            </div>
          </div>
          
          {/* Compatibility preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Your Best Matches</p>
            <div className="grid grid-cols-3 gap-2">
              {[2, 6, 8].map((num) => (
                <motion.div
                  key={num}
                  whileHover={{ scale: 1.1 }}
                  className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg cursor-pointer"
                  onClick={() => setShowUpsell(true)}
                >
                  <div className="text-xl font-bold text-purple-600">{num}</div>
                  <div className="text-xs text-muted-foreground">Compatible</div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Click to see full compatibility analysis
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderGamificationElements = () => (
    <div className="fixed bottom-4 right-4 z-40">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-background border-2 border-purple-400 rounded-lg p-4 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium">Engagement Score</span>
        </div>
        <Progress value={engagementScore} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">
          {engagementScore < 50 ? "Keep exploring!" :
           engagementScore < 80 ? "You're doing great!" :
           "Bonus content unlocked! 🎉"}
        </p>
        {unlockedBonus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2"
          >
            <Button size="sm" className="w-full" onClick={() => setShowUpsell(true)}>
              <Gift className="h-4 w-4 mr-1" />
              Claim Bonus
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  const renderStrategicCutoff = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <Card className="border-2 border-orange-400 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-orange-500" />
            Your Hidden Talents & Soul Purpose
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm mb-4">
            Based on your Life Path {lifePathNumber} and Expression Number {expressionNumber}, 
            you possess a rare combination that appears in only {Math.floor(Math.random() * 5) + 2}% of people...
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-purple-600 mt-0.5" />
              <p className="text-sm">
                Your primary hidden talent is {lifePathMeaning?.strengths[0]}, but there's something even more powerful...
              </p>
            </div>
          </div>
          
          {/* The cutoff - right at the most interesting part */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
            <div className="blur-sm space-y-2">
              <p className="text-sm">Your soul's true purpose involves a unique mission that...</p>
              <p className="text-sm">The universe has been preparing you for...</p>
            </div>
          </div>
          
          <div className="relative z-20 mt-6 text-center">
            <p className="text-sm font-medium text-orange-600 mb-3">
              This insight is too powerful to reveal partially
            </p>
            <Button 
              onClick={() => setShowUpsell(true)}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            >
              Unlock Your Complete Soul Purpose
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderEnhancedUpsell = () => (
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
            className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Animated header */}
            <div className="relative h-32 bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden">
              <motion.div
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
              >
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </motion.div>
              <div className="relative z-10 h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Crown className="h-12 w-12 mx-auto mb-2" />
                  </motion.div>
                  <h2 className="text-2xl font-bold">Your Journey Continues...</h2>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Personalized message */}
              <div className="text-center">
                <p className="text-lg mb-2">
                  {quizData?.firstName}, you've discovered you're a Life Path {lifePathNumber}
                </p>
                <p className="text-muted-foreground">
                  But that's just the beginning of your cosmic story...
                </p>
              </div>
              
              {/* What you'll discover */}
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">Complete Your Cosmic Blueprint</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Celebrity Twin Analysis</p>
                        <p className="text-xs text-muted-foreground">
                          Deep dive into {celebrities.length} celebrities who share your path
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                        <Heart className="h-4 w-4 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Soulmate Compatibility Map</p>
                        <p className="text-xs text-muted-foreground">
                          Your perfect matches & relationship dynamics
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">12-Month Forecast</p>
                        <p className="text-xs text-muted-foreground">
                          Lucky days, critical decisions, opportunity windows
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">90-Day Action Plan</p>
                        <p className="text-xs text-muted-foreground">
                          Personalized steps to manifest your desires
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Special bonus for engaged users */}
                  {engagementScore >= 80 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="h-5 w-5 text-purple-600" />
                        <p className="font-medium text-sm">Exclusive Bonus Unlocked!</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your high engagement earned you bonus insights on past life connections
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
              
              {/* Pricing with urgency */}
              <div className="text-center space-y-4">
                <div>
                  <p className="text-3xl font-bold text-purple-600">$9</p>
                  <p className="text-sm text-muted-foreground line-through">Regular price: $49</p>
                  <Badge variant="destructive" className="mt-2">
                    82% OFF - Today Only
                  </Badge>
                </div>
                
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => router.push(`/checkout?plan=report&report=${reportId}&price=9`)}
                  >
                    Complete My Cosmic Blueprint
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Secure Checkout
                  </span>
                  <span>•</span>
                  <span>Instant Access</span>
                  <span>•</span>
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6" ref={contentRef}>
        {/* Progress bar with engagement indicator */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm p-3 border-b">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Reading Progress</span>
              <div className="flex items-center gap-1">
                <Flame className={`h-4 w-4 ${engagementScore > 50 ? 'text-orange-500' : 'text-gray-400'}`} />
                <span className="text-xs font-medium">{Math.round(engagementScore)}% engaged</span>
              </div>
            </div>
            <Button size="sm" variant="default" onClick={() => setShowUpsell(true)}>
              <Zap className="h-4 w-4 mr-1" />
              Upgrade Now
            </Button>
          </div>
          <Progress value={scrollDepth} className="h-2" />
        </div>
        
        {/* Hero section with animated numbers */}
        <Card className="border-2 border-purple-200 dark:border-purple-800 overflow-hidden">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Your Cosmic Numbers Revealed</CardTitle>
            <CardDescription>
              Discover your unique numerological blueprint
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {renderNumberAnimation(lifePathNumber, "Life Path")}
              {renderNumberAnimation(expressionNumber, "Expression")}
              {renderNumberAnimation(birthDayNumber, "Birth Day")}
            </div>
            
            {/* Quick insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg"
            >
              <p className="text-sm">
                <strong>{quizData?.firstName}</strong>, you are a natural-born <strong>{lifePathMeaning?.title}</strong> with 
                a {stats.percentage}% rarity score. Your combination suggests extraordinary potential for {lifePathMeaning?.careers[0]?.toLowerCase()}.
              </p>
            </motion.div>
          </CardContent>
        </Card>
        
        {/* Celebrity comparison section */}
        {renderCelebrityComparison()}
        
        {/* Compatibility section with wheel */}
        {renderCompatibilitySection()}
        
        {/* Interactive statistics */}
        {renderInteractiveStats()}
        
        {/* Life Path deep dive with strategic cutoff */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Your Life Path {lifePathNumber} Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p>{lifePathMeaning?.description}</p>
              
              <h4 className="font-semibold mt-4 mb-2">Your Core Strengths</h4>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                {lifePathMeaning?.strengths.slice(0, 4).map((strength, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{strength}</span>
                  </motion.div>
                ))}
              </div>
              
              <h4 className="font-semibold mt-4 mb-2">Your Life Purpose</h4>
              <p className="text-sm">{lifePathMeaning?.purpose}</p>
              
              {/* Career Path Analysis with cutoff */}
              <h4 className="font-semibold mt-4 mb-2">Your Ideal Career Paths</h4>
              <div className="space-y-2 mb-4">
                {lifePathMeaning?.careers.slice(0, 3).map((career, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-2"
                  >
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">{career}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Cutoff at most interesting part */}
              <div className="relative mt-6">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                  <h5 className="font-medium text-sm mb-2">Your Hidden Success Code</h5>
                  <p className="text-sm mb-3">
                    There's a specific pattern in your numbers that indicates an extraordinary ability for...
                  </p>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                    <div className="blur-sm">
                      <p className="text-sm">This rare gift appears in only 1 in 500 people and could lead to...</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 relative z-20"
                    onClick={() => setShowUpsell(true)}
                  >
                    Reveal My Success Code
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Strategic cutoff */}
            {renderStrategicCutoff()}
          </CardContent>
        </Card>
        
        {/* Share buttons */}
        <Card>
          <CardContent className="py-4">
            <div className="text-center">
              <p className="text-sm font-medium mb-3">Share Your Discovery</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gamification overlay */}
      {renderGamificationElements()}
      
      {/* Enhanced upsell modal */}
      {renderEnhancedUpsell()}
    </>
  );
}