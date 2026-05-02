
import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme';

export default function CommonFooter({ app = null }) {
  const navigation = useNavigation();

  const footerLinkPressStyle = ({ pressed }) => [pressed && styles.footerLinkPressed];

  const safeNavigate = (routeName, params) => {
    try {
      navigation.navigate(routeName, params);
    } catch (e) {
      const parentNav = navigation.getParent?.();
      if (parentNav) {
        try {
          parentNav.navigate(routeName, params);
          return;
        } catch (err) {}
      }

      Alert.alert(
        'Navigation Error',
        `Screen "${routeName}" is not registered in your navigator.`
      );
    }
  };

  const handleEmailPress = async () => {
    const email = 'hello@appsMarket.com';
    const subject = 'Inquiry from Apps Marketplace';
    const body = 'Hi, I would like to know more about your apps and services.';
    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      const supported = await Linking.canOpenURL(mailUrl);
      if (supported) {
        await Linking.openURL(mailUrl);
      } else {
        Alert.alert('Email App Not Found', 'No email app is available on this device.');
      }
    } catch (error) {
      Alert.alert(
        'Unable to Open Email',
        'Something went wrong while trying to open the email app.'
      );
    }
  };

  return (
    <LinearGradient
      colors={[
        'rgba(255,255,255,0.12)',
        'rgba(255,255,255,0.05)',
        'rgba(255,255,255,0.02)',
      ]}
      style={styles.footer}
    >
      <View style={styles.glassOverlay} />
      <View style={styles.topShine} />

      <View style={styles.footerBrandSection}>
        <View style={styles.footerBrandWrap}>
          <LinearGradient
            colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.footerBrandDot}
          />
          <Text style={styles.footerBrand}>Apps Marketplace</Text>
        </View>

        <Text style={styles.footerText}>
          Premium marketplace for modern business applications, digital products,
          and scalable custom solutions.
        </Text>
      </View>

      <View style={styles.footerGrid}>
        <View style={styles.footerColumn}>
          <Text style={styles.footerHeading}>Company</Text>

          <Pressable onPress={() => safeNavigate('Home')} style={footerLinkPressStyle}>
            <Text style={styles.footerLink}>Home</Text>
          </Pressable>

          <Pressable onPress={() => safeNavigate('About')} style={footerLinkPressStyle}>
            <Text style={styles.footerLink}>About</Text>
          </Pressable>

          <Pressable onPress={() => safeNavigate('Apps')} style={footerLinkPressStyle}>
            <Text style={styles.footerLink}>Marketplace</Text>
          </Pressable>

          <Pressable onPress={() => safeNavigate('Contact')} style={footerLinkPressStyle}>
            <Text style={styles.footerLink}>Contact Us</Text>
          </Pressable>
        </View>

        <View style={styles.footerColumn}>
          <Text style={styles.footerHeading}>Products</Text>

          <Pressable
            onPress={() => safeNavigate('BusinessApps')}
            style={footerLinkPressStyle}
          >
            <Text style={styles.footerLink}>Business Apps</Text>
          </Pressable>

          <Pressable
            onPress={() => safeNavigate('CommerceSolutions')}
            style={footerLinkPressStyle}
          >
            <Text style={styles.footerLink}>Commerce Solutions</Text>
          </Pressable>

          <Pressable
            onPress={() => safeNavigate('ManagementPlatforms')}
            style={footerLinkPressStyle}
          >
            <Text style={styles.footerLink}>Management Platforms</Text>
          </Pressable>
        </View>

        <View style={styles.footerColumn}>
          <Text style={styles.footerHeading}>Support</Text>

          <Pressable
            onPress={() =>
              safeNavigate(
                'Contact',
                app ? { app, inquiryType: 'Request Demo' } : { inquiryType: 'Request Demo' }
              )
            }
            style={footerLinkPressStyle}
          >
            <Text style={styles.footerLink}>Request Demo</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              safeNavigate(
                'Contact',
                app ? { app, inquiryType: 'Custom Project' } : { inquiryType: 'Custom Project' }
              )
            }
            style={footerLinkPressStyle}
          >
            <Text style={styles.footerLink}>Custom Project</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              safeNavigate(
                'Contact',
                app ? { app, inquiryType: 'Sales Inquiry' } : { inquiryType: 'Sales Inquiry' }
              )
            }
            style={footerLinkPressStyle}
          >
            <Text style={styles.footerLink}>Sales Inquiry</Text>
          </Pressable>
        </View>

        <View style={styles.footerColumn}>
          <Text style={styles.footerHeading}>Contact</Text>

          <Pressable onPress={handleEmailPress} style={footerLinkPressStyle}>
            <Text style={styles.footerContactText}>blissierra177@gmail.com</Text>
          </Pressable>

          <Pressable onPress={() => safeNavigate('Contact')} style={footerLinkPressStyle}>
            <Text style={styles.footerContactText}>+91 98765 43210</Text>
          </Pressable>

          <Pressable onPress={() => safeNavigate('Contact')} style={footerLinkPressStyle}>
            <Text style={styles.footerContactText}>Hyderabad, India</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.footerBottomBar}>
        <Text style={styles.footerCopy}>© 2026 Apps Marketplace. All rights reserved.</Text>

        <View style={styles.footerBottomLinks}>
          <Pressable onPress={() => safeNavigate('About')} style={footerLinkPressStyle}>
            <Text style={styles.footerMiniLink}>Privacy</Text>
          </Pressable>

          <Text style={styles.footerMiniDivider}>•</Text>

          <Pressable onPress={() => safeNavigate('About')} style={footerLinkPressStyle}>
            <Text style={styles.footerMiniLink}>Terms</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 18,
    marginTop: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
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
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  footerBrandSection: {
    marginBottom: 20,
    zIndex: 2,
  },

  footerBrandWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  footerBrandDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    marginRight: 9,
  },

  footerBrand: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  footerText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    lineHeight: 19,
    maxWidth: '94%',
  },

  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
    marginBottom: 20,
    zIndex: 2,
  },

  footerColumn: {
    minWidth: '28%',
  },

  footerHeading: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 10,
  },

  footerLink: {
    color: '#67E6E8',
    fontSize: 12,
    lineHeight: 24,
    fontWeight: '600',
  },

  footerLinkPressed: {
    opacity: 0.7,
    transform: [{ translateX: 1 }],
  },

  footerContactText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    lineHeight: 22,
    fontWeight: '500',
  },

  footerBottomBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    zIndex: 2,
  },

  footerCopy: {
    color: 'rgba(255,255,255,0.42)',
    fontSize: 10,
    lineHeight: 16,
  },

  footerBottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerMiniLink: {
    color: 'rgba(255,255,255,0.60)',
    fontSize: 10,
    fontWeight: '600',
  },

  footerMiniDivider: {
    color: 'rgba(255,255,255,0.32)',
    marginHorizontal: 6,
    fontSize: 10,
  },
});