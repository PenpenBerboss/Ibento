import { Animated, Easing } from 'react-native';

// Fonction de fondu pour faire apparaître des éléments
export const fadeIn = (value: Animated.Value, duration = 300, delay = 0) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    delay,
    useNativeDriver: true,
    easing: Easing.out(Easing.cubic),
  });
};

// Animation de rebond pour les boutons et éléments interactifs
export const bounceAnimation = (value: Animated.Value) => {
  return Animated.sequence([
    Animated.spring(value, {
      toValue: 0.95,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }),
    Animated.spring(value, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    })
  ]);
};

// Animation d'entrée avec décalage pour les listes
export const staggeredFadeIn = (
  items: any[], 
  createAnimatedValue = () => new Animated.Value(0),
  duration = 400,
  staggerDelay = 50
) => {
  const animations = items.map((_, i) => {
    const animValue = createAnimatedValue();
    return {
      animValue,
      anim: Animated.timing(animValue, {
        toValue: 1,
        duration,
        delay: i * staggerDelay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      })
    };
  });
  
  return {
    values: animations.map(a => a.animValue),
    start: (callback?: Animated.EndCallback) => {
      Animated.stagger(
        staggerDelay,
        animations.map(a => a.anim)
      ).start(callback);
    }
  };
};

// Animation de slide pour les transitions d'écran
export const slideInHorizontal = (value: Animated.Value, fromRight = true) => {
  return Animated.spring(value, {
    toValue: 0,
    velocity: 3,
    tension: 30,
    friction: 8,
    useNativeDriver: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  });
};
