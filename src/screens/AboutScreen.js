

import React, { useEffect, useMemo, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';
import CommonFooter from '../components/CommonFooter';

function StatCard({ value, label }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function InfoPill({ label, primary = false }) {
  return (
    <View style={[styles.infoPill, primary && styles.infoPillPrimary]}>
      <Text style={[styles.infoPillText, primary && styles.infoPillTextPrimary]}>
        {label}
      </Text>
    </View>
  );
}

function ValueItem({ title, text }) {
  return (
    <View style={styles.valueItem}>
      <View style={styles.valueDot} />
      <View style={styles.valueTextWrap}>
        <Text style={styles.valueTitle}>{title}</Text>
        <Text style={styles.valueText}>{text}</Text>
      </View>
    </View>
  );
}

function TimelineItem({ step, title, text, last = false }) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineRailWrap}>
        <View style={styles.timelineDot} />
        {!last ? <View style={styles.timelineLine} /> : null}
      </View>

      <View style={styles.timelineContent}>
        <Text style={styles.timelineYear}>{step}</Text>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.timelineText}>{text}</Text>
      </View>
    </View>
  );
}

function ServiceCard({ eyebrow, title, text }) {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
      style={styles.serviceCard}
    >
      <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceText}>{text}</Text>
    </LinearGradient>
  );
}

function AudienceTag({ label }) {
  return (
    <View style={styles.audienceTag}>
      <Text style={styles.audienceTagText}>{label}</Text>
    </View>
  );
}

function ActionButton({ title, onPress, primary = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.buttonPressed]}
    >
      <LinearGradient
        colors={
          primary
            ? ['#67E6E8', '#42DDE2', '#1FCFD6']
            : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
        }
        style={[styles.actionButton, !primary && styles.actionButtonSecondary]}
      >
        <Text
          style={[
            styles.actionButtonText,
            primary ? styles.actionButtonTextPrimary : styles.actionButtonTextSecondary,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

export default function AboutScreen({ navigation }) {
  const headerAnim = useRef(new Animated.Value(0)).current;
  const heroAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const storyAnim = useRef(new Animated.Value(0)).current;
  const servicesAnim = useRef(new Animated.Value(0)).current;
  const timelineAnim = useRef(new Animated.Value(0)).current;
  const audienceAnim = useRef(new Animated.Value(0)).current;
  const valuesAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(heroAnim, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(storyAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(servicesAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(timelineAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(audienceAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(valuesAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(ctaAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    sequence.start();
    return () => sequence.stop();
  }, [
    headerAnim,
    heroAnim,
    statsAnim,
    storyAnim,
    servicesAnim,
    timelineAnim,
    audienceAnim,
    valuesAnim,
    ctaAnim,
    footerAnim,
  ]);

  const fadeUp = (anim, distance = 16) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
    ],
  });

  const values = useMemo(
    () => [
      {
        title: 'Premium Product Thinking',
        text: 'We focus on polished presentation, cleaner structure, and practical product usability.',
      },
      {
        title: 'Custom Solution Building',
        text: 'Every solution can be adapted to match your business model, workflow, audience, and branding.',
      },
      {
        title: 'Scalable Delivery',
        text: 'We build with future growth in mind, so your product can expand with modules, admin tools, and new features.',
      },
      {
        title: 'Long-Term Value',
        text: 'Our goal is not only launch, but also clarity, maintainability, and stronger long-term business relevance.',
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        step: 'Step 01',
        title: 'Understand the business',
        text: 'We begin by understanding your product goal, your users, and the business problem the solution should address.',
      },
      {
        step: 'Step 02',
        title: 'Define the structure',
        text: 'We shape the product flow, information hierarchy, and the most important experience your users should have.',
      },
      {
        step: 'Step 03',
        title: 'Build with clarity',
        text: 'We turn the concept into a polished digital product with cleaner UI, stronger flow, and reusable structure.',
      },
      {
        step: 'Step 04',
        title: 'Prepare for growth',
        text: 'We keep the solution ready for future features, admin controls, branding improvements, and expansion.',
      },
    ],
    []
  );

  const audiences = useMemo(
    () => [
      'Startups',
      'Business Owners',
      'Founders',
      'Internal Teams',
      'Service Companies',
      'Operations Teams',
      'Digital Product Teams',
      'Marketplace Businesses',
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Animated.View style={fadeUp(headerAnim, 10)}>
          <LinearGradient
            colors={['rgba(20,20,22,0.92)', 'rgba(20,20,22,0.82)']}
            style={styles.topBar}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>

            <View style={styles.topBarCenter}>
              <Text style={styles.topBarTitle}>About Us</Text>
              <Text style={styles.topBarSubtitle}>A real brand story page</Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate('Contact')}
              style={({ pressed }) => [styles.topAction, pressed && styles.pressed]}
            >
              <Text style={styles.topActionText}>Contact</Text>
            </Pressable>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(heroAnim, 14)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
            style={styles.heroBlock}
          >
            <Text style={styles.heroEyebrow}>ABOUT APPS MARKETPLACE</Text>
            <Text style={styles.heroTitle}>
              We build digital products that feel stronger, cleaner, and more useful
            </Text>
            <Text style={styles.heroSubtitle}>
              Apps Marketplace is more than a showcase. It represents a business-focused
              product approach where design, structure, usability, and future scale are
              treated as part of the same solution.
            </Text>

            <View style={styles.heroPills}>
              <InfoPill label="Premium Apps" primary />
              <InfoPill label="Custom Solutions" />
              <InfoPill label="Web & Mobile" />
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(statsAnim, 12)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
            style={styles.statsRow}
          >
            <StatCard value="20+" label="Solutions" />
            <View style={styles.statDivider} />
            <StatCard value="10+" label="Categories" />
            <View style={styles.statDivider} />
            <StatCard value="100%" label="Custom Focus" />
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(storyAnim, 14)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
            style={styles.storyBlock}
          >
            <Text style={styles.sectionEyebrow}>OUR STORY</Text>
            <Text style={styles.sectionTitle}>A marketplace built around real business needs</Text>
            <Text style={styles.storyText}>
              This page should feel like a real About section, not just a placeholder.
              Our goal is to show that the marketplace is driven by practical digital
              product thinking, not only by visuals.
            </Text>
            <Text style={styles.storyText}>
              We focus on business apps, internal platforms, management solutions,
              marketplace-style products, and custom digital experiences that need to
              look refined while still solving real operational and customer-facing needs.
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(servicesAnim, 14)}>
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionEyebrow}>WHAT WE DO</Text>
            <Text style={styles.sectionTitle}>Core areas we work on</Text>
          </View>

          <View style={styles.servicesGrid}>
            <ServiceCard
              eyebrow="CUSTOM APPS"
              title="Business-focused application development"
              text="We create premium digital products shaped around real business workflows, users, and operational needs."
            />
            <ServiceCard
              eyebrow="ADMIN & OPS"
              title="Platforms for management and control"
              text="We build structured systems for internal teams, dashboards, admin panels, tracking flows, and organized operations."
            />
            <ServiceCard
              eyebrow="MARKETPLACE"
              title="Catalog and product showcase experiences"
              text="We design marketplace-style experiences that present products more clearly and improve discovery, trust, and conversion."
            />
            <ServiceCard
              eyebrow="UI/UX"
              title="Cleaner product presentation"
              text="We improve how digital products look, feel, and flow so they become easier to use and stronger to present."
            />
          </View>
        </Animated.View>

        <Animated.View style={fadeUp(timelineAnim, 14)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
            style={styles.timelineBlock}
          >
            <Text style={styles.sectionEyebrow}>HOW WE WORK</Text>
            <Text style={styles.sectionTitle}>A more grounded process</Text>

            <View style={styles.timelineList}>
              {timeline.map((item, index) => (
                <TimelineItem
                  key={item.step}
                  step={item.step}
                  title={item.title}
                  text={item.text}
                  last={index === timeline.length - 1}
                />
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(audienceAnim, 14)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
            style={styles.audienceBlock}
          >
            <Text style={styles.sectionEyebrow}>WHO WE BUILD FOR</Text>
            <Text style={styles.sectionTitle}>Teams, founders, and businesses that need stronger digital products</Text>
            <Text style={styles.audienceText}>
              We usually work best where there is a clear business use case, a need for
              better product clarity, and a desire to move from generic interfaces to
              more polished, useful, and scalable experiences.
            </Text>

            <View style={styles.audienceTagsWrap}>
              {audiences.map((item) => (
                <AudienceTag key={item} label={item} />
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(valuesAnim, 14)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
            style={styles.valuesBlock}
          >
            <Text style={styles.sectionEyebrow}>OUR VALUES</Text>
            <Text style={styles.sectionTitle}>What guides our work</Text>

            <View style={styles.valuesList}>
              {values.map((item) => (
                <ValueItem key={item.title} title={item.title} text={item.text} />
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(valuesAnim, 12)}>
          <View style={styles.dualRow}>
            <LinearGradient
              colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
              style={styles.infoCard}
            >
              <Text style={styles.sectionEyebrow}>MISSION</Text>
              <Text style={styles.infoCardTitle}>Create digital products that sell and scale</Text>
              <Text style={styles.infoCardText}>
                We help businesses move from an idea into a polished product experience
                with stronger clarity, better presentation, and practical business value.
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
              style={styles.infoCard}
            >
              <Text style={styles.sectionEyebrow}>VISION</Text>
              <Text style={styles.infoCardTitle}>Become a stronger product partner</Text>
              <Text style={styles.infoCardText}>
                Our vision is to build future-ready product ecosystems that help
                companies launch better, present better, and grow with more confidence.
              </Text>
            </LinearGradient>
          </View>
        </Animated.View>

        <Animated.View style={fadeUp(ctaAnim, 14)}>
          <LinearGradient
            colors={['rgba(20,20,22,0.96)', 'rgba(20,20,22,0.88)']}
            style={styles.ctaBlock}
          >
            <Text style={styles.ctaEyebrow}>WORK WITH US</Text>
            <Text style={styles.ctaTitle}>
              Need a more real and stronger digital presence for your product?
            </Text>
            <Text style={styles.ctaText}>
              Let’s build a cleaner, more structured, and more meaningful experience
              for your business with stronger product storytelling and better usability.
            </Text>

            <View style={styles.ctaButtons}>
              <ActionButton
                title="Contact Us"
                primary
                onPress={() => navigation.navigate('Contact')}
              />
              <ActionButton
                title="Browse Apps"
                onPress={() => navigation.navigate('Apps')}
              />
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(footerAnim, 14)}>
          <CommonFooter navigation={navigation} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.92,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 44,
    backgroundColor: COLORS.background,
  },

  topBar: {
    minHeight: 62,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  backButton: {
    minWidth: 58,
    minHeight: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  topBarCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  topBarTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  topBarSubtitle: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  topAction: {
    minWidth: 64,
    minHeight: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  topActionText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },

  heroBlock: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 16,
    overflow: 'hidden',
  },
  heroEyebrow: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 31,
    marginBottom: 10,
    maxWidth: '94%',
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
    maxWidth: '96%',
  },
  heroPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  infoPill: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  infoPillPrimary: {
    backgroundColor: 'rgba(103,232,240,0.16)',
    borderColor: 'rgba(66,221,226,0.28)',
  },
  infoPillText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  infoPillTextPrimary: {
    color: '#67E6E8',
  },

  statsRow: {
    minHeight: 68,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },

  storyBlock: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 16,
  },
  sectionEyebrow: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 27,
    marginBottom: 10,
  },
  storyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },

  sectionGroup: {
    marginBottom: 12,
  },
  servicesGrid: {
    gap: 14,
    marginBottom: 16,
  },
  serviceCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
  },
  serviceTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  serviceText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  timelineBlock: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 16,
  },
  timelineList: {
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineRailWrap: {
    width: 26,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: '#67E6E8',
    marginTop: 4,
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginTop: 6,
    marginBottom: 6,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 18,
    paddingLeft: 4,
  },
  timelineYear: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  timelineTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  timelineText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  audienceBlock: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 16,
  },
  audienceText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  audienceTagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  audienceTag: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  audienceTagText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },

  valuesBlock: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 16,
  },
  valuesList: {
    gap: 14,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  valueDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: '#67E6E8',
    marginTop: 7,
    marginRight: 10,
  },
  valueTextWrap: {
    flex: 1,
  },
  valueTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  valueText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  dualRow: {
    gap: 14,
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
  },
  infoCardTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  infoCardText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  ctaBlock: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 16,
  },
  ctaEyebrow: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  ctaTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 8,
  },
  ctaText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  ctaButtons: {
    gap: 10,
  },

  actionButton: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actionButtonSecondary: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  actionButtonTextPrimary: {
    color: '#12343A',
  },
  actionButtonTextSecondary: {
    color: COLORS.textPrimary,
  },
});