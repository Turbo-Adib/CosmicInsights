"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, AlertCircle } from "lucide-react";

interface CompatibilityWheelProps {
  userLifePath: number;
  onNumberClick?: (number: number) => void;
  lockedNumbers?: number[];
}

export function CompatibilityWheel({ 
  userLifePath, 
  onNumberClick,
  lockedNumbers = []
}: CompatibilityWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  // Compatibility data
  const compatibilityScores: Record<number, number> = {
    1: userLifePath === 1 ? 100 : [2, 3, 5].includes(userLifePath) ? 85 : [4, 6, 7, 9].includes(userLifePath) ? 65 : 45,
    2: userLifePath === 2 ? 100 : [1, 4, 6, 8].includes(userLifePath) ? 85 : [3, 5, 9].includes(userLifePath) ? 65 : 45,
    3: userLifePath === 3 ? 100 : [1, 5, 6, 9].includes(userLifePath) ? 85 : [2, 4, 7, 8].includes(userLifePath) ? 65 : 45,
    4: userLifePath === 4 ? 100 : [2, 6, 7, 8].includes(userLifePath) ? 85 : [1, 3, 5, 9].includes(userLifePath) ? 65 : 45,
    5: userLifePath === 5 ? 100 : [1, 3, 5, 7].includes(userLifePath) ? 85 : [2, 4, 6, 8, 9].includes(userLifePath) ? 65 : 45,
    6: userLifePath === 6 ? 100 : [2, 3, 6, 9].includes(userLifePath) ? 85 : [1, 4, 5, 7, 8].includes(userLifePath) ? 65 : 45,
    7: userLifePath === 7 ? 100 : [4, 5, 7].includes(userLifePath) ? 85 : [1, 3, 6, 8, 9].includes(userLifePath) ? 65 : 45,
    8: userLifePath === 8 ? 100 : [2, 4, 8].includes(userLifePath) ? 85 : [3, 5, 6, 7, 9].includes(userLifePath) ? 65 : 45,
    9: userLifePath === 9 ? 100 : [3, 6, 9].includes(userLifePath) ? 85 : [1, 2, 4, 5, 7, 8].includes(userLifePath) ? 65 : 45,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 120;

    // Draw compatibility wheel
    for (let i = 1; i <= 9; i++) {
      const angle = ((i - 1) * 40 - 90) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const score = compatibilityScores[i];
      const isLocked = lockedNumbers.includes(i);
      
      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = score >= 85 ? '#10b981' : score >= 65 ? '#3b82f6' : '#f59e0b';
      ctx.lineWidth = hoveredNumber === i ? 3 : 1;
      ctx.stroke();

      // Draw number circle
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = i === userLifePath ? '#8b5cf6' : 
                      score >= 85 ? '#10b981' : 
                      score >= 65 ? '#3b82f6' : 
                      '#f59e0b';
      ctx.fill();
      
      if (isLocked) {
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw number
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), x, y);
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#8b5cf6';
    ctx.fill();

    // Draw user's number in center
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(userLifePath.toString(), centerX, centerY);

  }, [userLifePath, hoveredNumber, lockedNumbers, compatibilityScores]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;

    // Check which number was clicked
    for (let i = 1; i <= 9; i++) {
      const angle = ((i - 1) * 40 - 90) * (Math.PI / 180);
      const numX = centerX + radius * Math.cos(angle);
      const numY = centerY + radius * Math.sin(angle);

      const distance = Math.sqrt((x - numX) ** 2 + (y - numY) ** 2);
      if (distance <= 25) {
        setSelectedNumber(i);
        if (onNumberClick && !lockedNumbers.includes(i)) {
          onNumberClick(i);
        }
        break;
      }
    }
  };

  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;

    let found = false;
    for (let i = 1; i <= 9; i++) {
      const angle = ((i - 1) * 40 - 90) * (Math.PI / 180);
      const numX = centerX + radius * Math.cos(angle);
      const numY = centerY + radius * Math.sin(angle);

      const distance = Math.sqrt((x - numX) ** 2 + (y - numY) ** 2);
      if (distance <= 25) {
        setHoveredNumber(i);
        canvas.style.cursor = 'pointer';
        found = true;
        break;
      }
    }

    if (!found) {
      setHoveredNumber(null);
      canvas.style.cursor = 'default';
    }
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 85) return "Soulmate Match";
    if (score >= 65) return "Compatible";
    return "Growth Partner";
  };

  const getCompatibilityIcon = (score: number) => {
    if (score >= 85) return <Heart className="h-4 w-4 text-green-600" />;
    if (score >= 65) return <Sparkles className="h-4 w-4 text-blue-600" />;
    return <AlertCircle className="h-4 w-4 text-amber-600" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Compatibility Wheel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <motion.canvas
            ref={canvasRef}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasHover}
            onMouseLeave={() => setHoveredNumber(null)}
            className="rounded-lg"
          />

          {selectedNumber && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2"
            >
              <p className="text-sm font-medium">
                Life Path {userLifePath} × Life Path {selectedNumber}
              </p>
              <div className="flex items-center justify-center gap-2">
                {getCompatibilityIcon(compatibilityScores[selectedNumber])}
                <Badge variant={
                  compatibilityScores[selectedNumber] >= 85 ? "default" :
                  compatibilityScores[selectedNumber] >= 65 ? "secondary" :
                  "outline"
                }>
                  {compatibilityScores[selectedNumber]}% - {getCompatibilityLabel(compatibilityScores[selectedNumber])}
                </Badge>
              </div>
              {lockedNumbers.includes(selectedNumber) && (
                <p className="text-xs text-muted-foreground">
                  Unlock full analysis in premium report
                </p>
              )}
            </motion.div>
          )}

          <div className="grid grid-cols-3 gap-2 text-xs mt-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded-full" />
              <span>Soulmate (85%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span>Compatible (65%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-600 rounded-full" />
              <span>Growth (45%+)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}