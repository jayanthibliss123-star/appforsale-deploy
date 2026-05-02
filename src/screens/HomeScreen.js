
import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  Pressable, Animated, Easing, Dimensions, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useMarketplace } from '../context/MarketplaceContext';
import { useNotifications } from '../context/NotificationContext';
import CommonFooter from '../components/CommonFooter';
import CommonHeader from '../components/common/CommonHeader';
import SharedImageCarousel from '../components/SharedImageCarousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_W     = Math.min(268, SCREEN_WIDTH * 0.72);
const CARD_SPACE = 14;

// ── Header CTA Button ─────────────────────────────────────────
function HeaderButton({ title, onPress, primary = false, compact = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.headerButton,
        compact && styles.headerButtonCompact,
        primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
        pressed && styles.pressed,
      ]}
    >
      {primary ? (
        <LinearGradient
          colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={[styles.headerButtonPrimaryFill, compact && styles.headerButtonCompact]}
        >
          <Text style={[styles.headerButtonText, styles.headerButtonTextPrimary]}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={[styles.headerButtonText, styles.headerButtonTextSecondary]}>{title}</Text>
      )}
    </Pressable>
  );
}

// ── App Showcase Card ─────────────────────────────────────────
function AppShowcaseCard({ item, onPress, animatedStyle }) {
  const formattedPrice = item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : 'Free';

  const images = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
    ? item.imageUrls
    : item.imageUrl ? [item.imageUrl] : [];

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
          style={styles.appCard}
        >
          <View style={styles.cardGlassOverlay} />
          <View style={styles.cardTopShine} />
          <View style={styles.appImageWrap}>
            <SharedImageCarousel images={images} width={CARD_W} height={160} />
            <View style={styles.appImageShade} pointerEvents="none" />
          </View>
          <View style={styles.appContent}>
            <View style={styles.appTopMetaRow}>
              <View style={styles.appChip}><Text style={styles.appChipText}>{item.category}</Text></View>
              <View style={styles.launchMiniBadge}><Text style={styles.launchMiniBadgeText}>Launch Offer</Text></View>
            </View>
            <Text style={styles.appTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.appDesc}  numberOfLines={3}>{item.description}</Text>
            <View style={styles.offerStrip}>
              <Text style={styles.offerStripText}>Free for the first 3 months</Text>
            </View>
            <View style={styles.appFooter}>
              <View style={styles.priceBlock}>
                <Text style={styles.appPriceLabel}>Starting from</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.appOldPrice}>{formattedPrice}</Text>
                  <Text style={styles.appFreePrice}>Free</Text>
                </View>
                <Text style={styles.appPriceSubtext}>Then standard pricing applies after 3 months</Text>
              </View>
              <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
                <LinearGradient
                  colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.viewBtn}
                >
                  <View style={styles.buttonTopShine} />
                  <Text style={styles.viewBtnText}>View</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

// ── Main Screen ───────────────────────────────────────────────
export default function HomeScreen({ navigation, route }) {
  const { apps, refreshApps, lastRefresh } = useMarketplace();

  // ✅ refreshUnreadCount — focus אַיינגעקומען bell count refresh
  const { refreshUnreadCount } = useNotifications();

  const user = useMemo(() =>
    route?.params?.user || {
      name: 'Guest User', fullName: 'Guest User',
      email: 'guest@example.com', role: 'User',
      phone: '', location: 'Hyderabad, India',
      company: 'Apps Marketplace', department: 'Member',
      bio: 'Welcome to your account.', image: null,
    },
  [route?.params?.user]);

  // ✅ Single useFocusEffect — refreshApps + refreshUnreadCount both
  useFocusEffect(
    useCallback(() => {
      if (refreshApps) refreshApps();
      // ✅ Every time screen focuses, refresh bell count from backend
      if (refreshUnreadCount) refreshUnreadCount(user?.email);
    }, [refreshApps, refreshUnreadCount, user?.email])
  );

  useEffect(() => {}, [lastRefresh]);

  const approvedApps = useMemo(() => {
    return (apps || [])
      .filter(item => String(item.status || '').trim().toLowerCase() === 'approved')
      .sort((a, b) => b.id - a.id);
  }, [apps]);

  const heroApp            = approvedApps[0] || null;
  const heroFormattedPrice = heroApp?.price ? `₹${Number(heroApp.price).toLocaleString('en-IN')}` : 'Free';

  const heroImages = heroApp
    ? (Array.isArray(heroApp.imageUrls) && heroApp.imageUrls.length > 0
        ? heroApp.imageUrls
        : heroApp.imageUrl ? [heroApp.imageUrl] : [])
    : [];

  // ── Animations ─────────────────────────────────────────────
  const headerAnim    = useRef(new Animated.Value(0)).current;
  const badgeAnim     = useRef(new Animated.Value(0)).current;
  const titleAnim     = useRef(new Animated.Value(0)).current;
  const subtitleAnim  = useRef(new Animated.Value(0)).current;
  const buttonsAnim   = useRef(new Animated.Value(0)).current;
  const metricsAnim   = useRef(new Animated.Value(0)).current;
  const previewAnim   = useRef(new Animated.Value(0)).current;
  const trustAnim     = useRef(new Animated.Value(0)).current;
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const sectionAnim   = useRef(new Animated.Value(0)).current;
  const valueAnim     = useRef(new Animated.Value(0)).current;
  const ctaAnim       = useRef(new Animated.Value(0)).current;
  const previewFloat  = useRef(new Animated.Value(0)).current;
  const scrollY       = useRef(new Animated.Value(0)).current;

  const cardsAnim = useMemo(
    () => approvedApps.map(() => new Animated.Value(0)),
    [approvedApps.length]
  );

  useEffect(() => {
    const intro = Animated.sequence([
      Animated.parallel([
        Animated.timing(headerAnim,   { toValue: 1, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(badgeAnim,    { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.timing(titleAnim,      { toValue: 1, duration: 480, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(subtitleAnim,   { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(buttonsAnim,    { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(metricsAnim,    { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(previewAnim,    { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(trustAnim,      { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(highlightAnim,  { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(sectionAnim,    { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.stagger(110, cardsAnim.map(a =>
        Animated.timing(a, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      )),
      Animated.timing(valueAnim,      { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(ctaAnim,        { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]);
    intro.start();

    const floatLoop = Animated.loop(Animated.sequence([
      Animated.timing(previewFloat, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(previewFloat, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    floatLoop.start();

    return () => { intro.stop(); floatLoop.stop(); };
  }, []);

  const headerScale      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.88],  extrapolate: 'clamp' });
  const headerTranslateY = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -8],    extrapolate: 'clamp' });
  const heroOpacity      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.02],  extrapolate: 'clamp' });
  const heroTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -72],   extrapolate: 'clamp' });
  const heroScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.9],   extrapolate: 'clamp' });
  const pageTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -90],   extrapolate: 'clamp' });
  const pageScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 1.04],  extrapolate: 'clamp' });

  const fadeUp = (anim, distance = 16) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
  });

  const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
    opacity: anim,
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) },
      { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [fromScale, 1] }) },
    ],
  });

  const previewAnimatedStyle = {
    opacity: previewAnim,
    transform: [
      {
        translateY: Animated.add(
          previewAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }),
          previewFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -4] })
        ),
      },
      { scale: previewAnim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
    ],
  };

  const goToDetails = (app) => {
    navigation.navigate('AppDetails', { app, user, allApps: approvedApps });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141B27" />
      <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.pageBg}>

        <Animated.View style={[styles.stickyHeaderWrap, fadeUp(headerAnim, 10), {
          transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
        }]}>
          {/* ✅ CommonHeader reads unreadCount from context — no extra props needed */}
          <CommonHeader
            navigation={navigation}
            title="Apps Marketplace" subtitle="Premium digital products"
            showBack={false} rightLabel="Contact"
            onNotificationPress={() => navigation.navigate('Notifications', { user })}
            onProfilePress={() => navigation.navigate('Profile', { user })}
          />
        </Animated.View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {/* ── Hero Section ── */}
          <Animated.View style={[styles.heroSection, {
            opacity: heroOpacity,
            transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
          }]}>
            <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
              <Text style={styles.launchOfferBadgeText}>LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS</Text>
            </Animated.View>

            <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>PREMIUM APP MARKETPLACE</Animated.Text>
            <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
              Premium apps for{'\n'}modern businesses
            </Animated.Text>
            <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
              Discover polished business applications, digital products, and custom software solutions.{'\n\n'}
              <Text style={styles.heroOfferText}>All apps free for the first 3 months.</Text>
            </Animated.Text>

            <Animated.View style={fadeUp(buttonsAnim, 12)}>
              <View style={styles.heroButtons}>
                <HeaderButton title="Explore Apps" primary onPress={() => navigation.navigate('Apps')} />
                <HeaderButton title="Upload App"         onPress={() => navigation.navigate('UploadApp')} />
                <HeaderButton title="Contact Us"         onPress={() => navigation.navigate('Contact')} />
              </View>
            </Animated.View>

            <Animated.View style={fadeUp(metricsAnim, 10)}>
              <LinearGradient
                colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
                style={styles.metricRow}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.cardTopShine} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{approvedApps.length}+</Text>
                  <Text style={styles.metricLabel}>Apps</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>10+</Text>
                  <Text style={styles.metricLabel}>Industries</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>3 Months</Text>
                  <Text style={styles.metricLabel}>Free Launch</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateY: pageTranslateY }, { scale: pageScale }] }}>

            {/* ── Hero Preview Card ── */}
            <Animated.View style={[previewAnimatedStyle, { marginBottom: 14 }]}>
              <LinearGradient
                colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
                style={styles.heroPreview}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.cardTopShine} />
                <SharedImageCarousel
                  images={heroImages}
                  width={SCREEN_WIDTH - 36}
                  height={Math.min(218, SCREEN_WIDTH * 0.55)}
                />
                <View style={styles.heroPreviewOverlay} pointerEvents="none" />
                <View style={styles.heroPreviewContent}>
                  <View style={styles.heroPreviewTopRow}>
                    <View style={styles.heroPreviewChip}>
                      <Text style={styles.heroPreviewChipText}>Featured Product</Text>
                    </View>
                    <View style={styles.heroPreviewOfferChip}>
                      <Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text>
                    </View>
                  </View>
                  <Text style={styles.heroPreviewTitle}>{heroApp?.title || 'Premium Business App'}</Text>
                  <Text style={styles.heroPreviewText} numberOfLines={2}>
                    {heroApp?.description || 'Modern product presentation for your company apps.'}
                  </Text>
                  <View style={styles.heroPreviewPriceRow}>
                    <Text style={styles.heroPreviewOldPrice}>{heroFormattedPrice}</Text>
                    <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* ── Trust Strip ── */}
            <Animated.View style={fadeUp(trustAnim, 10)}>
              <LinearGradient
                colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
                style={styles.trustStrip}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.cardTopShine} />
                <View style={styles.trustItem}><Text style={styles.trustValue}>Trusted</Text><Text style={styles.trustLabel}>by growing teams</Text></View>
                <View style={styles.trustDivider} />
                <View style={styles.trustItem}><Text style={styles.trustValue}>3 Months</Text><Text style={styles.trustLabel}>free launch period</Text></View>
                <View style={styles.trustDivider} />
                <View style={styles.trustItem}><Text style={styles.trustValue}>Fast</Text><Text style={styles.trustLabel}>deployment</Text></View>
              </LinearGradient>
            </Animated.View>

            {/* ── Highlight Block ── */}
            <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
              <LinearGradient
                colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
                style={styles.highlightBlock}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.cardTopShine} />
                <View style={styles.highlightTopRow}>
                  <View style={styles.highlightBadge}><Text style={styles.highlightBadgeText}>PREMIUM APP</Text></View>
                  <View style={styles.highlightMiniPill}><Text style={styles.highlightMiniPillText}>Best Seller</Text></View>
                </View>
                <Text style={styles.highlightTitle}>{heroApp?.title || 'Premium Business Suite'}</Text>
                <Text style={styles.highlightText}>
                  A flagship product in our catalog with advanced modules, cleaner business flows, and stronger customization potential.
                </Text>
                <View style={styles.offerBanner}>
                  <Text style={styles.offerBannerLabel}>Launch Offer</Text>
                  <Text style={styles.offerBannerText}>Free for the first 3 months on all app packages</Text>
                </View>
                <View style={styles.highlightTagsRow}>
                  <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Full Business Suite</Text></View>
                  <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Most Requested</Text></View>
                  <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Highly Customizable</Text></View>
                </View>
                <View style={styles.highlightBottomRow}>
                  <View>
                    <Text style={styles.highlightPriceLabel}>Premium Package</Text>
                    <View style={styles.highlightPriceRow}>
                      <Text style={styles.highlightOldPrice}>{heroFormattedPrice}</Text>
                      <Text style={styles.highlightFreePrice}>Free</Text>
                    </View>
                    <Text style={styles.highlightPriceSubtext}>Free for 3 months, then standard pricing applies</Text>
                  </View>
                  <HeaderButton
                    title="View Premium App" primary compact
                    onPress={() => heroApp ? goToDetails(heroApp) : null}
                  />
                </View>
              </LinearGradient>
            </Animated.View>

            {/* ── Featured Section Header ── */}
            <Animated.View style={fadeUp(sectionAnim, 10)}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <Text style={styles.sectionEyebrow}>ALL APPS</Text>
                  <Text style={styles.sectionTitle}>
                    {approvedApps.length > 0
                      ? `${approvedApps.length} solution${approvedApps.length !== 1 ? 's' : ''} available`
                      : 'Designed to sell better'}
                  </Text>
                </View>
                <Pressable onPress={() => navigation.navigate('Apps')}>
                  <Text style={styles.sectionAction}>See all</Text>
                </Pressable>
              </View>
            </Animated.View>

            {approvedApps.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsRow}
                nestedScrollEnabled={true}
              >
                {approvedApps.map((item, index) => (
                  <AppShowcaseCard
                    key={item.id}
                    item={item}
                    onPress={() => goToDetails(item)}
                    animatedStyle={scaleFade(cardsAnim[index] || new Animated.Value(1), 14, 0.985)}
                  />
                ))}
              </ScrollView>
            ) : (
              <LinearGradient
                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                style={styles.emptyAppsCard}
              >
                <Text style={styles.emptyAppsText}>No approved apps yet.</Text>
                <Text style={styles.emptyAppsSubtext}>Check back soon — new apps are reviewed daily.</Text>
              </LinearGradient>
            )}

            {/* ── Value Block ── */}
            <Animated.View style={fadeUp(valueAnim, 12)}>
              <LinearGradient
                colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
                style={styles.valueBlock}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.cardTopShine} />
                <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
                <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>
                <View style={styles.valueList}>
                  {[
                    'Premium marketplace presentation for your company apps',
                    'Stronger buyer confidence with polished product sections and pricing',
                    'Launch offer included: all apps free for the first 3 months',
                  ].map((text, i) => (
                    <View key={i} style={styles.valueItem}>
                      <View style={styles.valueDot} />
                      <Text style={styles.valueText}>{text}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </Animated.View>

            {/* ── CTA Block ── */}
            <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
              <LinearGradient
                colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
                style={styles.ctaBlock}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.cardTopShine} />
                <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>
                <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>
                <Text style={styles.ctaText}>
                  Build a cleaner, stronger catalog experience. Get started now — all apps free for the first 3 months.
                </Text>
                <View style={styles.ctaOfferPill}>
                  <Text style={styles.ctaOfferPillText}>Launch Offer • All Apps Free for the First 3 Months</Text>
                </View>
                <View style={styles.ctaButtons}>
                  <HeaderButton title="Start Project" primary onPress={() => navigation.navigate('Contact')} />
                  <HeaderButton title="Browse Apps"         onPress={() => navigation.navigate('Apps')} />
                </View>
              </LinearGradient>
            </Animated.View>

            <CommonFooter />
          </Animated.View>
        </Animated.ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressed:       { opacity: 0.92 },
  cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
  buttonPressed: { opacity: 0.9,  transform: [{ scale: 0.97 }] },
  safeArea:      { flex: 1, backgroundColor: '#141B27' },
  pageBg:        { flex: 1 },
  container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44 },
  stickyHeaderWrap: { zIndex: 50, elevation: 20 },
  heroSection:   { marginBottom: 10 },
  launchOfferBadge:     { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginBottom: 12 },
  launchOfferBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  heroBadge:     { alignSelf: 'flex-start', color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
  heroTitle:     { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: -0.4, marginBottom: 12, maxWidth: '90%' },
  heroSubtitle:  { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 18, maxWidth: '92%' },
  heroOfferText: { color: '#67E6E8', fontSize: 14, fontWeight: '700', lineHeight: 22 },
  heroButtons:   { gap: 10, marginBottom: 18 },
  headerButton:              { minHeight: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, overflow: 'hidden' },
  headerButtonCompact:       { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
  headerButtonPrimary:       { backgroundColor: 'transparent' },
  headerButtonPrimaryFill:   { minHeight: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
  headerButtonSecondary:     { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
  headerButtonText:          { fontSize: 14, fontWeight: '700' },
  headerButtonTextPrimary:   { color: '#12343A' },
  headerButtonTextSecondary: { color: '#FFFFFF' },
  metricRow:     { minHeight: 64, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, overflow: 'hidden' },
  metricItem:    { flex: 1, alignItems: 'center' },
  metricValue:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 3 },
  metricLabel:   { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
  metricDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.10)' },
  heroPreview:         { borderRadius: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)' },
  heroPreviewOverlay:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.18)' },
  heroPreviewContent:  { paddingHorizontal: 14, paddingBottom: 14, paddingTop: 10, backgroundColor: 'rgba(255,255,255,0.06)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  heroPreviewTopRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
  heroPreviewChip:          { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
  heroPreviewChipText:      { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
  heroPreviewOfferChip:     { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  heroPreviewOfferChipText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  heroPreviewTitle:    { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
  heroPreviewText:     { color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: 17 },
  heroPreviewPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  heroPreviewOldPrice: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600', textDecorationLine: 'line-through' },
  heroPreviewFreeText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },
  trustStrip:    { minHeight: 58, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 16, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
  trustItem:     { flex: 1, alignItems: 'center' },
  trustValue:    { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  trustLabel:    { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
  trustDivider:  { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.10)' },
  highlightBlock:        { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 16, marginBottom: 32, overflow: 'hidden' },
  highlightTopRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
  highlightBadge:        { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  highlightBadgeText:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  highlightMiniPill:     { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  highlightMiniPillText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
  highlightTitle:        { color: '#FFFFFF', fontSize: 21, fontWeight: '800', lineHeight: 26, marginBottom: 8 },
  highlightText:         { color: 'rgba(255,255,255,0.72)', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  offerBanner:           { backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16 },
  offerBannerLabel:      { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
  offerBannerText:       { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 19 },
  highlightTagsRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  highlightTag:          { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  highlightTagText:      { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
  highlightBottomRow:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
  highlightPriceLabel:   { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 4 },
  highlightPriceRow:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
  highlightOldPrice:     { color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: '600', textDecorationLine: 'line-through' },
  highlightFreePrice:    { color: '#67E6E8', fontSize: 24, fontWeight: '800' },
  highlightPriceSubtext: { color: 'rgba(255,255,255,0.72)', fontSize: 11, marginTop: 4, lineHeight: 16, maxWidth: 170 },
  sectionHeader:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  sectionHeaderLeft: { flex: 1, paddingRight: 12 },
  sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  sectionTitle:      { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27 },
  sectionAction:     { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
  cardsRow:      { paddingLeft: 18, paddingRight: 18, marginBottom: 32 },
  appCardWrap:   { marginRight: CARD_SPACE },
  appCard:       { width: CARD_W, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)' },
  appImageWrap:  { position: 'relative' },
  appImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.10)' },
  appContent:    { padding: 14 },
  appTopMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 },
  appChip:            { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  appChipText:        { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
  launchMiniBadge:     { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  launchMiniBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  appTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7, minHeight: 42 },
  appDesc:       { color: 'rgba(255,255,255,0.72)', fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
  offerStrip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
  offerStripText:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
  appFooter:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  priceBlock:    { flex: 1, paddingRight: 10 },
  appPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 4 },
  priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appOldPrice:   { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '600', textDecorationLine: 'line-through' },
  appFreePrice:  { color: '#67E6E8', fontSize: 20, fontWeight: '800' },
  appPriceSubtext:{ color: 'rgba(255,255,255,0.68)', fontSize: 10, marginTop: 4, lineHeight: 14 },
  viewBtn:       { minWidth: 76, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, overflow: 'hidden' },
  viewBtnText:   { color: '#12343A', fontSize: 12, fontWeight: '700' },
  emptyAppsCard:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 32, paddingHorizontal: 20, alignItems: 'center', marginBottom: 32 },
  emptyAppsText:    { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  emptyAppsSubtext: { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center' },
  valueBlock:    { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 32, backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
  valueTitle:    { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27, marginBottom: 14 },
  valueList:     { gap: 14 },
  valueItem:     { flexDirection: 'row', alignItems: 'flex-start' },
  valueDot:      { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 6, marginRight: 10 },
  valueText:     { flex: 1, color: 'rgba(255,255,255,0.72)', fontSize: 13, lineHeight: 20 },
  ctaBlock:      { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
  ctaEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  ctaTitle:      { color: '#FFFFFF', fontSize: 23, fontWeight: '800', lineHeight: 29, marginBottom: 10, maxWidth: '92%' },
  ctaText:       { color: 'rgba(255,255,255,0.72)', fontSize: 13, lineHeight: 20, marginBottom: 16, maxWidth: '94%' },
  ctaOfferPill:      { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16 },
  ctaOfferPillText:  { color: '#67E6E8', fontSize: 11, fontWeight: '800' },
  ctaButtons:    { gap: 10 },
  cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.02)' },
  cardTopShine:     { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.18)' },
  buttonTopShine:   { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
});