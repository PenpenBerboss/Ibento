import React from 'react';
import { Text, TextProps } from 'react-native';

interface MangaTextProps extends TextProps {
  children: React.ReactNode;
}

export function MangaText({ children, style, ...props }: MangaTextProps) {
  return (
    <Text {...props} style={[{ fontFamily: 'Manga' }, style]}>
      {children}
    </Text>
  );
}
