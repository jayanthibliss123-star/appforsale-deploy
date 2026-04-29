// components/SharedImageCarousel.js
// Shared carousel component — used in AppsScreen, AdminHomeScreen, HomeScreen

import React, { useState, useRef } from 'react';
import {
  View, Image, Pressable, Text, StyleSheet, Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * SharedImageCarousel
 *
 * Props:
 *   images      — string[]   — array of image URIs
 *   width       — number     — carousel width (defaults to SCREEN_WIDTH - 36)
 *   height      — number     — carousel height (default 176)
 *   borderRadius— number     — (default 0, card handles it)
 */
export default function SharedImageCarousel({
  images,
  width,
  height = 176,
  borderRadius = 0,
}) {
  const [activeImg, setActiveImg] = useState(0);
  const carouselWidth = width || SCREEN_WIDTH - 36;

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, images.length - 1));
    setActiveImg(clamped);
  };

  // ── No images ──────────────────────────────────────────────
  if (!images || images.length === 0) {
    return (
      <View style={[styles.wrap, { width: carouselWidth, height, borderRadius }]}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>📷</Text>
          <Text style={styles.placeholderLabel}>No Image</Text>
        </View>
      </View>
    );
  }

  // ── Single image ───────────────────────────────────────────
  if (images.length === 1) {
    return (
      <View style={[styles.wrap, { width: carouselWidth, height, borderRadius }]}>
        <Image
          source={{ uri: images[0] }}
          style={[styles.img, { width: carouselWidth, height }]}
          resizeMode="cover"
        />
      </View>
    );
  }

  // ── Multi-image ────────────────────────────────────────────
  return (
    <View style={[styles.wrap, { width: carouselWidth, height, borderRadius }]}>
      {/* Current image */}
      <Image
        source={{ uri: images[activeImg] }}
        style={[styles.img, { width: carouselWidth, height }]}
        resizeMode="cover"
      />

      {/* Counter badge — top right */}
      <View style={styles.counter}>
        <Text style={styles.counterText}>{activeImg + 1}/{images.length}</Text>
      </View>

      {/* Arrow — left */}
      {activeImg > 0 && (
        <Pressable
          style={styles.arrowLeft}
          onPress={() => goTo(activeImg - 1)}
          hitSlop={8}
        >
          <View style={styles.arrowBtn}>
            <Text style={styles.arrowText}>‹</Text>
          </View>
        </Pressable>
      )}

      {/* Arrow — right */}
      {activeImg < images.length - 1 && (
        <Pressable
          style={styles.arrowRight}
          onPress={() => goTo(activeImg + 1)}
          hitSlop={8}
        >
          <View style={styles.arrowBtn}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </Pressable>
      )}

      {/* Dot row — tappable */}
      <View style={styles.dotRow}>
        {images.map((_, idx) => (
          <Pressable key={idx} onPress={() => goTo(idx)} hitSlop={8}>
            <View style={[styles.dot, activeImg === idx && styles.dotActive]} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
    position: 'relative',
  },
  img: {
    // width/height passed inline
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  placeholderIcon:  { fontSize: 32, marginBottom: 6 },
  placeholderLabel: { color: 'rgba(255,255,255,0.30)', fontSize: 12, fontWeight: '600' },

  // Counter
  counter: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  counterText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },

  // Arrows
  arrowLeft:  { position: 'absolute', left: 8,  top: '50%', marginTop: -18 },
  arrowRight: { position: 'absolute', right: 8, top: '50%', marginTop: -18 },
  arrowBtn: {
    width: 32,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.50)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  arrowText: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', lineHeight: 26 },

  // Dots
  dotRow: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot:       { width: 6,  height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.40)' },
  dotActive: { width: 16,            borderRadius: 3, backgroundColor: '#67E6E8' },
});