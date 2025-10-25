import React from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';

type AnySource = ImageSourcePropType | string | number | { uri?: string };

interface SmartImageProps extends Omit<ImageProps, 'source'> {
  source: AnySource;
  contain?: boolean; // default true
}

export default function SmartImage({ source, contain = true, style, resizeMode, ...rest }: SmartImageProps) {
  let resolvedSource: ImageSourcePropType;

  if (typeof source === 'string') {
    resolvedSource = { uri: source } as ImageSourcePropType;
  } else {
    // number (require) or already an object
    resolvedSource = source as ImageSourcePropType;
  }

  const finalResizeMode = resizeMode ?? (contain ? 'contain' : 'cover');

  return (
    <Image
      source={resolvedSource}
      resizeMode={finalResizeMode as any}
      style={[{ alignSelf: 'center' } as StyleProp<ImageStyle>, style]}
      {...rest}
    />
  );
}
