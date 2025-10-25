import React from 'react';
import { View } from 'react-native';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  height?: number;
}

export default function ProgressBar({ 
  current, 
  total, 
  color = colors.primary, 
  height = 6 
}: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <View 
      className="rounded-full bg-surface overflow-hidden"
      style={{
        borderRadius: height,
        height,
      }}
    >
      <View 
        className="rounded-full bg-primary"
        style={{ 
          width: `${percentage}%`, 
          height: '100%',
          backgroundColor: undefined, // dynamic color handled via inline prop when necessary
        }}
      />
    </View>
  );
}