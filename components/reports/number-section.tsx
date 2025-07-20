"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NumberSectionProps {
  title: string;
  number: number;
  icon: any;
  color: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function NumberSection({ 
  title, 
  number, 
  icon: Icon, 
  color, 
  isExpanded, 
  onToggle,
  children 
}: NumberSectionProps) {
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
}