'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Tag, TrendingUp, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { GradientText } from '@/components/ui/GradientText';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  gradientClass: string;
}

function StatCard({ title, value, icon, trend, gradientClass }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden"
    >
      <Card hover className="relative">
        <div className={`absolute top-0 right-0 w-24 h-24 ${gradientClass} opacity-10 rounded-full -mr-12 -mt-12`} />
        
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${gradientClass} bg-opacity-10`}>
              {icon}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold"
            >
              <GradientText>{value}</GradientText>
            </motion.div>
            
            {trend !== undefined && (
              <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-4 h-4" />
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Statistics() {
  const stats = [
    {
      title: 'Total Notes',
      value: 42,
      icon: <FileText className="w-5 h-5 text-primary-start" />,
      trend: 12,
      gradientClass: 'bg-gradient-primary',
    },
    {
      title: 'Tags Used',
      value: 18,
      icon: <Tag className="w-5 h-5 text-accent-start" />,
      trend: 5,
      gradientClass: 'bg-gradient-accent',
    },
    {
      title: 'This Week',
      value: 8,
      icon: <Clock className="w-5 h-5 text-secondary-start" />,
      trend: -3,
      gradientClass: 'bg-gradient-secondary',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
}
