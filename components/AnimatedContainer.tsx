import React from 'react';
import { View, ViewProps } from 'react-native';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'scale' | 'bounce';

interface AnimatedContainerProps extends ViewProps {
  type: AnimationType;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  type,
  delay = 0,
  duration = 300,
  children,
  style,
  ...props
}) => {
  // Version simplifiée sans animations pour éviter les problèmes de compatibilité
  return (
    <View style={[style]} {...props}>
      {children}
    </View>
  );
};

export default AnimatedContainer;
