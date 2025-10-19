import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  height?: number;
}

export default function ProgressBar({ 
  current, 
  total, 
  color = '#1e90ff', 
  height = 6 
}: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <View 
      className="bg-secondary rounded-full overflow-hidden"
      style={{ height }}
    >
      <View 
        className="rounded-full"
        style={{ 
          width: `${percentage}%`, 
          height: '100%',
          backgroundColor: color 
        }}
      />
    </View>
  );
}