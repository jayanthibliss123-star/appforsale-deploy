
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme';
import { useNotifications } from '../../context/NotificationContext';

const COMPANY_LOGO = require('../../../assets/images/apps/logo.png');

export default function CommonHeader({
  navigation,
  title,
  subtitle,
  showBack = false,
  rightLabel = 'Contact',
  onRightPress,
  onNotificationPress,
  onProfilePress,
  profileLabel = '👤',
  showNotifications = true,
  showProfile = true,
  showRightAction = true,
  showLogo = false,
}) {
  const { unreadCount } = useNotifications();

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  const { width } = Dimensions.get('window');
  const fontScale = width / 375;

  return (
    <SafeAreaView style={{ flex: 0 }}>
      <LinearGradient
        colors={[
          'rgba(255,255,255,0.12)',
          'rgba(255,255,255,0.05)',
          'rgba(255,255,255,0.02)',
        ]}
        style={[
          styles.topBar,
          {
            paddingTop: statusBarHeight + (Platform.OS === 'ios' ? 5 : 10),
          },
        ]}
      >
        <View style={styles.glassOverlay} />
        <View style={styles.topShine} />

        {/* Top row: Back on left, icons + Contact on right */}
        <View style={styles.topRow}>
          <View style={styles.leftSection}>
            {showBack ? (
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
              >
                <Text style={[styles.sideButtonText, { fontSize: 12 * fontScale }]}>
                  ← Back
                </Text>
              </Pressable>
            ) : null}
          </View>

          {showNotifications || showProfile || showRightAction ? (
            <View style={styles.rightSection}>
              {showNotifications ? (
                <Pressable
                  onPress={onNotificationPress || (() => navigation.navigate('Notifications'))}
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                >
                  <Text style={[styles.iconButtonText, { fontSize: 16 * fontScale }]}>
                    🔔
                  </Text>
                  {unreadCount > 0 ? (
                    <View style={styles.badge}>
                      <Text style={[styles.badgeText, { fontSize: 9 * fontScale }]}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Text>
                    </View>
                  ) : null}
                </Pressable>
              ) : null}

              {showProfile ? (
                <Pressable
                  onPress={onProfilePress || (() => navigation.navigate('Profile'))}
                  style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
                >
                  <LinearGradient
                    colors={['#F6C7A1', '#E8AE7E', '#D99563']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.profileGradient}
                  >
                    <Text style={[styles.profileButtonText, { fontSize: 16 * fontScale }]}>
                      {profileLabel}
                    </Text>
                  </LinearGradient>
                </Pressable>
              ) : null}

              {showRightAction ? (
                <Pressable
                  onPress={onRightPress || (() => navigation.navigate('Contact'))}
                  style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
                >
                  <Text style={[styles.sideButtonText, { fontSize: 12 * fontScale }]}>
                    {rightLabel}
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
        </View>

        {/* Bottom row: Logo + Title + Subtitle */}
        <View style={styles.titleRow}>
          {showLogo ? (
            <View style={styles.logoWrap}>
              <Image
                source={COMPANY_LOGO}
                style={[styles.companyLogo, { width: 40 * fontScale, height: 40 * fontScale }]}
                resizeMode="contain"
              />
            </View>
          ) : null}

          <View style={styles.brandTextWrap}>
            <Text style={[styles.title, { fontSize: 20 * fontScale }]}>{title}</Text>
            {!!subtitle && (
              <Text style={[styles.subtitle, { fontSize: 11 * fontScale }]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },

  topBar: {
    minHeight: 90,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingBottom: 14,
    flexDirection: 'column',
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    zIndex: 2,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 2,
  },

  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },

  topShine: {
    position: 'absolute',
    top: 0,
    left: '15%',
    right: '15%',
    height: 1.2,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
  },

  sideButton: {
    minWidth: 58,
    minHeight: 36,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: 10,
  },

  sideButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    position: 'relative',
  },

  iconButtonText: {
    fontSize: 16,
  },

  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D84B55',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  badgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    shadowColor: '#E8AE7E',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },

  profileGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },

  profileButtonText: {
    color: '#2E1C10',
    fontWeight: '800',
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  logoWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  companyLogo: {
    width: '100%',
    height: '100%',
  },

  brandTextWrap: {
    alignItems: 'flex-start',
    flexShrink: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  subtitle: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 3,
  },
});