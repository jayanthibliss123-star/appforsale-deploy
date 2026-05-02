

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        pressed && styles.pressed,
        style,
      ]}
    >
      {isPrimary ? (
        <LinearGradient
          colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.primaryGradient}
        >
          <View style={styles.buttonTopShine} />
          <Text
            style={[
              styles.text,
              styles.primaryText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      ) : (
        <Text
          style={[
            styles.text,
            styles.secondaryText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  primaryButton: {
    backgroundColor: 'transparent',
  },

  primaryGradient: {
    minHeight: 54,
    width: '100%',
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  secondaryButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  buttonTopShine: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1.2,
    backgroundColor: 'rgba(255,255,255,0.32)',
  },

  text: {
    fontSize: TYPOGRAPHY.button,
    fontWeight: '700',
  },

  primaryText: {
    color: '#12343A',
  },

  secondaryText: {
    color: COLORS.textPrimary,
  },
});