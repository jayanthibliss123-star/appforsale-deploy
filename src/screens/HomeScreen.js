// import React, { useEffect, useMemo, useRef } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   Animated,
//   Easing,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';

// function HeaderButton({ title, onPress, primary = false, compact = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.headerButton,
//         compact && styles.headerButtonCompact,
//         primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
//         pressed && styles.pressed,
//       ]}
//     >
//       <Text
//         style={[
//           styles.headerButtonText,
//           primary ? styles.headerButtonTextPrimary : styles.headerButtonTextSecondary,
//         ]}
//       >
//         {title}
//       </Text>
//     </Pressable>
//   );
// }

// function AppShowcaseCard({ item, onPress, animatedStyle }) {
//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//           style={styles.appCard}
//         >
//           <View style={styles.appImageWrap}>
//             <Image source={item.image} style={styles.appImage} resizeMode="cover" />
//             <View style={styles.appImageShade} />
//           </View>

//           <View style={styles.appContent}>
//             <View style={styles.appTopMetaRow}>
//               <View style={styles.appChip}>
//                 <Text style={styles.appChipText}>{item.category}</Text>
//               </View>

//               <View style={styles.launchMiniBadge}>
//                 <Text style={styles.launchMiniBadgeText}>Launch Offer</Text>
//               </View>
//             </View>

//             <Text style={styles.appTitle} numberOfLines={2}>
//               {item.title}
//             </Text>

//             <Text style={styles.appDesc} numberOfLines={3}>
//               {item.description}
//             </Text>

//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>

//             <View style={styles.appFooter}>
//               <View style={styles.priceBlock}>
//                 <Text style={styles.appPriceLabel}>Starting from</Text>

//                 <View style={styles.priceRow}>
//                   <Text style={styles.appOldPrice}>{item.price}</Text>
//                   <Text style={styles.appFreePrice}>Free</Text>
//                 </View>

//                 <Text style={styles.appPriceSubtext}>
//                   Then standard pricing applies after 3 months
//                 </Text>
//               </View>

//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={[COLORS.primarySoft, COLORS.primary]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.viewBtn}
//                 >
//                   <Text style={styles.viewBtnText}>View</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function HomeScreen({ navigation, route }) {
//   const { apps } = useMarketplace();

//   const featuredApps = apps.slice(0, 3);
//   const heroApp = featuredApps[0];

//   const user = useMemo(
//     () =>
//       route?.params?.user || {
//         name: 'Guest User',
//         fullName: 'Guest User',
//         email: 'guest@example.com',
//         role: 'User',
//         phone: '',
//         location: 'Hyderabad, India',
//         company: 'Apps Marketplace',
//         department: 'Member',
//         bio: 'Welcome to your account.',
//         image: null,
//       },
//     [route?.params?.user]
//   );

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const badgeAnim = useRef(new Animated.Value(0)).current;
//   const titleAnim = useRef(new Animated.Value(0)).current;
//   const subtitleAnim = useRef(new Animated.Value(0)).current;
//   const buttonsAnim = useRef(new Animated.Value(0)).current;
//   const metricsAnim = useRef(new Animated.Value(0)).current;
//   const previewAnim = useRef(new Animated.Value(0)).current;
//   const trustAnim = useRef(new Animated.Value(0)).current;
//   const highlightAnim = useRef(new Animated.Value(0)).current;
//   const sectionAnim = useRef(new Animated.Value(0)).current;
//   const cardsAnim = useRef(featuredApps.map(() => new Animated.Value(0))).current;
//   const valueAnim = useRef(new Animated.Value(0)).current;
//   const ctaAnim = useRef(new Animated.Value(0)).current;
//   const previewFloat = useRef(new Animated.Value(0)).current;
//   const scrollY = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerAnim, {
//           toValue: 1,
//           duration: 350,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(badgeAnim, {
//           toValue: 1,
//           duration: 420,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(titleAnim, {
//         toValue: 1,
//         duration: 480,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(subtitleAnim, {
//         toValue: 1,
//         duration: 420,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(buttonsAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(metricsAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(previewAnim, {
//         toValue: 1,
//         duration: 500,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(trustAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(highlightAnim, {
//         toValue: 1,
//         duration: 420,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(sectionAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.stagger(
//         110,
//         cardsAnim.map((anim) =>
//           Animated.timing(anim, {
//             toValue: 1,
//             duration: 380,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: true,
//           })
//         )
//       ),
//       Animated.timing(valueAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(ctaAnim, {
//         toValue: 1,
//         duration: 400,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]);

//     intro.start();

//     const floatLoop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(previewFloat, {
//           toValue: 1,
//           duration: 2400,
//           easing: Easing.inOut(Easing.sin),
//           useNativeDriver: true,
//         }),
//         Animated.timing(previewFloat, {
//           toValue: 0,
//           duration: 2400,
//           easing: Easing.inOut(Easing.sin),
//           useNativeDriver: true,
//         }),
//       ])
//     );

//     floatLoop.start();

//     return () => {
//       intro.stop();
//       floatLoop.stop();
//     };
//   }, [
//     headerAnim,
//     badgeAnim,
//     titleAnim,
//     subtitleAnim,
//     buttonsAnim,
//     metricsAnim,
//     previewAnim,
//     trustAnim,
//     highlightAnim,
//     sectionAnim,
//     cardsAnim,
//     valueAnim,
//     ctaAnim,
//     previewFloat,
//   ]);

//   const headerScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 0.88],
//     extrapolate: 'clamp',
//   });

//   const headerTranslateY = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [0, -8],
//     extrapolate: 'clamp',
//   });

//   const heroOpacity = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 0.02],
//     extrapolate: 'clamp',
//   });

//   const heroTranslateY = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [0, -72],
//     extrapolate: 'clamp',
//   });

//   const heroScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 0.9],
//     extrapolate: 'clamp',
//   });

//   const pageTranslateY = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [0, -90],
//     extrapolate: 'clamp',
//   });

//   const pageScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 1.04],
//     extrapolate: 'clamp',
//   });

//   const heroImageScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1.06, 1.14],
//     extrapolate: 'clamp',
//   });

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [distance, 0],
//         }),
//       },
//     ],
//   });

//   const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [distance, 0],
//         }),
//       },
//       {
//         scale: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [fromScale, 1],
//         }),
//       },
//     ],
//   });

//   const previewAnimatedStyle = {
//     opacity: previewAnim,
//     transform: [
//       {
//         translateY: Animated.add(
//           previewAnim.interpolate({
//             inputRange: [0, 1],
//             outputRange: [18, 0],
//           }),
//           previewFloat.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, -4],
//           })
//         ),
//       },
//       {
//         scale: previewAnim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0.985, 1],
//         }),
//       },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <Animated.ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//         scrollEventThrottle={16}
//         stickyHeaderIndices={[0]}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//       >
//         <Animated.View
//           style={[
//             styles.stickyHeaderWrap,
//             fadeUp(headerAnim, 10),
//             {
//               transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//             },
//           ]}
//         >
//           <CommonHeader
//             navigation={navigation}
//             title="Apps Marketplace"
//             subtitle="Premium digital products"
//             showBack={false}
//             rightLabel="Contact"
//             onNotificationPress={() => navigation.navigate('Notifications')}
//             onProfilePress={() => navigation.navigate('Profile', { user })}
//           />
//         </Animated.View>

//         <Animated.View
//           style={[
//             styles.heroSection,
//             {
//               opacity: heroOpacity,
//               transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
//             },
//           ]}
//         >
//           <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
//             <Text style={styles.launchOfferBadgeText}>
//               LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS
//             </Text>
//           </Animated.View>

//           <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>
//             PREMIUM APP MARKETPLACE
//           </Animated.Text>

//           <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
//             Premium apps for{'\n'}modern businesses
//           </Animated.Text>

//           <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
//             Discover polished business applications, digital products, and custom
//             software solutions built to sell better and scale faster.{'\n\n'}
//             <Text style={styles.heroOfferText}>
//               Start today under our launch offer — all apps are free for the first 3
//               months.
//             </Text>
//           </Animated.Text>

//           <Animated.View style={fadeUp(buttonsAnim, 12)}>
//             <View style={styles.heroButtons}>
//               <HeaderButton
//                 title="Explore Apps"
//                 primary
//                 onPress={() => navigation.navigate('Apps')}
//               />
//               <HeaderButton
//                 title="Upload App"
//                 onPress={() => navigation.navigate('UploadApp')}
//               />
//               <HeaderButton
//                 title="Contact Us"
//                 onPress={() => navigation.navigate('Contact')}
//               />
//             </View>
//           </Animated.View>

//           <Animated.View style={fadeUp(metricsAnim, 10)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//               style={styles.metricRow}
//             >
//               <View style={styles.metricItem}>
//                 <Text style={styles.metricValue}>{apps.length}+</Text>
//                 <Text style={styles.metricLabel}>Apps</Text>
//               </View>

//               <View style={styles.metricDivider} />

//               <View style={styles.metricItem}>
//                 <Text style={styles.metricValue}>10+</Text>
//                 <Text style={styles.metricLabel}>Industries</Text>
//               </View>

//               <View style={styles.metricDivider} />

//               <View style={styles.metricItem}>
//                 <Text style={styles.metricValue}>3 Months</Text>
//                 <Text style={styles.metricLabel}>Free Launch</Text>
//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </Animated.View>

//         <Animated.View
//           style={{
//             transform: [{ translateY: pageTranslateY }, { scale: pageScale }],
//           }}
//         >
//           <Animated.View style={previewAnimatedStyle}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.025)']}
//               style={styles.heroPreview}
//             >
//               <Animated.Image
//                 source={heroApp?.image}
//                 style={[styles.heroPreviewImage, { transform: [{ scale: heroImageScale }] }]}
//                 resizeMode="cover"
//               />
//               <View style={styles.heroPreviewOverlay} />

//               <View style={styles.heroPreviewContent}>
//                 <View style={styles.heroPreviewTopRow}>
//                   <View style={styles.heroPreviewChip}>
//                     <Text style={styles.heroPreviewChipText}>Featured Product</Text>
//                   </View>

//                   <View style={styles.heroPreviewOfferChip}>
//                     <Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.heroPreviewTitle}>
//                   {heroApp?.title || 'Premium Business App'}
//                 </Text>

//                 <Text style={styles.heroPreviewText} numberOfLines={2}>
//                   {heroApp?.description ||
//                     'Modern product presentation for your company apps.'}
//                 </Text>

//                 <View style={styles.heroPreviewPriceRow}>
//                   <Text style={styles.heroPreviewOldPrice}>
//                     {heroApp?.price || '₹59,999'}
//                   </Text>
//                   <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
//                 </View>
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(trustAnim, 10)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//               style={styles.trustStrip}
//             >
//               <View style={styles.trustItem}>
//                 <Text style={styles.trustValue}>Trusted</Text>
//                 <Text style={styles.trustLabel}>by growing teams</Text>
//               </View>

//               <View style={styles.trustDivider} />

//               <View style={styles.trustItem}>
//                 <Text style={styles.trustValue}>3 Months</Text>
//                 <Text style={styles.trustLabel}>free launch period</Text>
//               </View>

//               <View style={styles.trustDivider} />

//               <View style={styles.trustItem}>
//                 <Text style={styles.trustValue}>Fast</Text>
//                 <Text style={styles.trustLabel}>deployment</Text>
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
//             <LinearGradient
//               colors={['rgba(184,122,86,0.12)', 'rgba(255,255,255,0.025)']}
//               style={styles.highlightBlock}
//             >
//               <View style={styles.highlightTopRow}>
//                 <View style={styles.highlightBadge}>
//                   <Text style={styles.highlightBadgeText}>PREMIUM APP</Text>
//                 </View>
//                 <View style={styles.highlightMiniPill}>
//                   <Text style={styles.highlightMiniPillText}>Best Seller</Text>
//                 </View>
//               </View>

//               <Text style={styles.highlightTitle}>
//                 {heroApp?.title || 'Premium Business Suite'}
//               </Text>

//               <Text style={styles.highlightText}>
//                 A flagship product in our catalog with advanced modules, cleaner
//                 business flows, and stronger customization potential compared to
//                 standard app packages.
//               </Text>

//               <View style={styles.offerBanner}>
//                 <Text style={styles.offerBannerLabel}>Launch Offer</Text>
//                 <Text style={styles.offerBannerText}>
//                   Free for the first 3 months on all app packages
//                 </Text>
//               </View>

//               <View style={styles.highlightTagsRow}>
//                 <View style={styles.highlightTag}>
//                   <Text style={styles.highlightTagText}>Full Business Suite</Text>
//                 </View>
//                 <View style={styles.highlightTag}>
//                   <Text style={styles.highlightTagText}>Most Requested</Text>
//                 </View>
//                 <View style={styles.highlightTag}>
//                   <Text style={styles.highlightTagText}>Highly Customizable</Text>
//                 </View>
//               </View>

//               <View style={styles.highlightBottomRow}>
//                 <View>
//                   <Text style={styles.highlightPriceLabel}>Premium Package</Text>

//                   <View style={styles.highlightPriceRow}>
//                     <Text style={styles.highlightOldPrice}>
//                       {heroApp?.price || '₹59,999'}
//                     </Text>
//                     <Text style={styles.highlightFreePrice}>Free</Text>
//                   </View>

//                   <Text style={styles.highlightPriceSubtext}>
//                     Free for the first 3 months, then standard plan pricing applies
//                   </Text>
//                 </View>

//                 <HeaderButton
//                   title="View Premium App"
//                   primary
//                   compact
//                   onPress={() =>
//                     heroApp
//                       ? navigation.navigate('AppDetails', { app: heroApp, user })
//                       : null
//                   }
//                 />
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(sectionAnim, 10)}>
//             <View style={styles.sectionHeader}>
//               <View style={styles.sectionHeaderLeft}>
//                 <Text style={styles.sectionEyebrow}>FEATURED APPS</Text>
//                 <Text style={styles.sectionTitle}>Designed to sell better</Text>
//               </View>

//               <Pressable onPress={() => navigation.navigate('Apps')}>
//                 <Text style={styles.sectionAction}>See all</Text>
//               </Pressable>
//             </View>
//           </Animated.View>

//           <Animated.ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.cardsRow}
//           >
//             {featuredApps.map((item, index) => (
//               <AppShowcaseCard
//                 key={item.id}
//                 item={item}
//                 onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                 animatedStyle={scaleFade(cardsAnim[index], 14, 0.985)}
//               />
//             ))}
//           </Animated.ScrollView>

//           <Animated.View style={fadeUp(valueAnim, 12)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//               style={styles.valueBlock}
//             >
//               <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
//               <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>

//               <View style={styles.valueList}>
//                 <View style={styles.valueItem}>
//                   <View style={styles.valueDot} />
//                   <Text style={styles.valueText}>
//                     Premium marketplace presentation for your company apps
//                   </Text>
//                 </View>

//                 <View style={styles.valueItem}>
//                   <View style={styles.valueDot} />
//                   <Text style={styles.valueText}>
//                     Stronger buyer confidence with polished product sections and pricing
//                   </Text>
//                 </View>

//                 <View style={styles.valueItem}>
//                   <View style={styles.valueDot} />
//                   <Text style={styles.valueText}>
//                     Launch offer included: all apps free for the first 3 months
//                   </Text>
//                 </View>
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
//             <LinearGradient
//               colors={['rgba(184,122,86,0.14)', 'rgba(255,255,255,0.03)']}
//               style={styles.ctaBlock}
//             >
//               <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>

//               <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>

//               <Text style={styles.ctaText}>
//                 Build a cleaner, stronger, glass-inspired catalog experience for your
//                 products. Get started now under our launch offer — all apps are free
//                 for the first 3 months.
//               </Text>

//               <View style={styles.ctaOfferPill}>
//                 <Text style={styles.ctaOfferPillText}>
//                   Launch Offer • All Apps Free for the First 3 Months
//                 </Text>
//               </View>

//               <View style={styles.ctaButtons}>
//                 <HeaderButton
//                   title="Start Project"
//                   primary
//                   onPress={() => navigation.navigate('Contact')}
//                 />
//                 <HeaderButton
//                   title="Browse Apps"
//                   onPress={() => navigation.navigate('Apps')}
//                 />
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <CommonFooter />
//         </Animated.View>
//       </Animated.ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: {
//     opacity: 0.92,
//   },
//   cardPressed: {
//     opacity: 0.96,
//     transform: [{ scale: 0.992 }],
//   },
//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },

//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 44,
//     backgroundColor: COLORS.background,
//   },

//   stickyHeaderWrap: {
//     zIndex: 50,
//     elevation: 20,
//   },

//   heroSection: {
//     marginBottom: 10,
//   },
//   launchOfferBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.14)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     marginBottom: 12,
//   },
//   launchOfferBadgeText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '800',
//     letterSpacing: 0.8,
//   },
//   heroBadge: {
//     alignSelf: 'flex-start',
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '600',
//     letterSpacing: 1,
//     marginBottom: 12,
//   },
//   heroTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 28,
//     fontWeight: '800',
//     lineHeight: 34,
//     letterSpacing: -0.4,
//     marginBottom: 12,
//     maxWidth: '90%',
//   },
//   heroSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 14,
//     fontWeight: '400',
//     lineHeight: 22,
//     marginBottom: 18,
//     maxWidth: '92%',
//   },
//   heroOfferText: {
//     color: COLORS.primary,
//     fontSize: 14,
//     fontWeight: '700',
//     lineHeight: 22,
//   },

//   heroButtons: {
//     gap: 10,
//     marginBottom: 18,
//   },
//   headerButton: {
//     minHeight: 48,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   headerButtonCompact: {
//     minHeight: 36,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//   },
//   headerButtonPrimary: {
//     backgroundColor: COLORS.primary,
//   },
//   headerButtonSecondary: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   headerButtonText: {
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   headerButtonTextPrimary: {
//     color: COLORS.textDark,
//   },
//   headerButtonTextSecondary: {
//     color: COLORS.textPrimary,
//   },

//   metricRow: {
//     minHeight: 64,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   metricItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   metricValue: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 3,
//   },
//   metricLabel: {
//     color: COLORS.textMuted,
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   metricDivider: {
//     width: 1,
//     height: 28,
//     backgroundColor: COLORS.border,
//   },

//   heroPreview: {
//     borderRadius: 24,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     height: 218,
//     marginBottom: 14,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//   },
//   heroPreviewImage: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: COLORS.elevated,
//   },
//   heroPreviewOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(10,12,16,0.30)',
//   },
//   heroPreviewContent: {
//     position: 'absolute',
//     left: 14,
//     right: 14,
//     bottom: 14,
//     backgroundColor: 'rgba(255,255,255,0.045)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   heroPreviewTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//     gap: 8,
//   },
//   heroPreviewChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.10)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 9,
//     paddingVertical: 5,
//   },
//   heroPreviewChipText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   heroPreviewOfferChip: {
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.14)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   heroPreviewOfferChipText: {
//     color: COLORS.textPrimary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   heroPreviewTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 5,
//   },
//   heroPreviewText: {
//     color: COLORS.platinum,
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 17,
//   },
//   heroPreviewPriceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 8,
//   },
//   heroPreviewOldPrice: {
//     color: 'rgba(255,255,255,0.65)',
//     fontSize: 12,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//   },
//   heroPreviewFreeText: {
//     color: COLORS.primary,
//     fontSize: 12,
//     fontWeight: '800',
//   },

//   trustStrip: {
//     minHeight: 58,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     marginBottom: 16,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   trustItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   trustValue: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   trustLabel: {
//     color: COLORS.textMuted,
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   trustDivider: {
//     width: 1,
//     height: 24,
//     backgroundColor: COLORS.border,
//   },

//   highlightBlock: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     padding: 16,
//     marginBottom: 32,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//   },
//   highlightTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//     gap: 10,
//   },
//   highlightBadge: {
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   highlightBadgeText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },
//   highlightMiniPill: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   highlightMiniPillText: {
//     color: COLORS.textPrimary,
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   highlightTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 21,
//     fontWeight: '800',
//     lineHeight: 26,
//     marginBottom: 8,
//   },
//   highlightText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 20,
//     marginBottom: 14,
//   },
//   offerBanner: {
//     alignSelf: 'stretch',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     marginBottom: 16,
//   },
//   offerBannerLabel: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '800',
//     letterSpacing: 0.8,
//     marginBottom: 4,
//     textTransform: 'uppercase',
//   },
//   offerBannerText: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//     lineHeight: 19,
//   },
//   highlightTagsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 16,
//   },
//   highlightTag: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   highlightTagText: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   highlightBottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: 14,
//   },
//   highlightPriceLabel: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     marginBottom: 4,
//   },
//   highlightPriceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   highlightOldPrice: {
//     color: COLORS.textMuted,
//     fontSize: 14,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//   },
//   highlightFreePrice: {
//     color: COLORS.primary,
//     fontSize: 24,
//     fontWeight: '800',
//   },
//   highlightPriceSubtext: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     marginTop: 4,
//     lineHeight: 16,
//     maxWidth: 170,
//   },

//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     marginBottom: 16,
//   },
//   sectionHeaderLeft: {
//     flex: 1,
//     paddingRight: 12,
//   },
//   sectionEyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '600',
//     letterSpacing: 1,
//     marginBottom: 6,
//   },
//   sectionTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 27,
//   },
//   sectionAction: {
//     color: COLORS.primary,
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   cardsRow: {
//     paddingRight: 18,
//     marginBottom: 32,
//   },
//   appCardWrap: {
//     marginRight: 14,
//   },
//   appCard: {
//     width: 258,
//     borderRadius: 22,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.035)',
//   },
//   appImageWrap: {
//     position: 'relative',
//   },
//   appImage: {
//     width: '100%',
//     height: 160,
//     backgroundColor: COLORS.elevated,
//   },
//   appImageShade: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.10)',
//   },
//   appContent: {
//     padding: 14,
//   },
//   appTopMetaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 8,
//   },
//   appChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.10)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   appChipText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   launchMiniBadge: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   launchMiniBadgeText: {
//     color: COLORS.textPrimary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   appTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 7,
//     minHeight: 42,
//   },
//   appDesc: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 18,
//     marginBottom: 12,
//     minHeight: 54,
//   },
//   offerStrip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.10)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     paddingVertical: 7,
//     marginBottom: 14,
//   },
//   offerStripText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '800',
//     lineHeight: 14,
//   },
//   appFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//   },
//   priceBlock: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   appPriceLabel: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     fontWeight: '400',
//     marginBottom: 4,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   appOldPrice: {
//     color: COLORS.textMuted,
//     fontSize: 13,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//   },
//   appFreePrice: {
//     color: COLORS.primary,
//     fontSize: 20,
//     fontWeight: '800',
//   },
//   appPriceSubtext: {
//     color: COLORS.textSecondary,
//     fontSize: 10,
//     marginTop: 4,
//     lineHeight: 14,
//   },
//   viewBtn: {
//     minWidth: 76,
//     minHeight: 38,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//   },
//   viewBtnText: {
//     color: COLORS.textDark,
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   valueBlock: {
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     marginBottom: 32,
//     backgroundColor: 'rgba(255,255,255,0.035)',
//   },
//   valueTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 27,
//     marginBottom: 14,
//   },
//   valueList: {
//     gap: 14,
//   },
//   valueItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   valueDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: COLORS.primary,
//     marginTop: 6,
//     marginRight: 10,
//   },
//   valueText: {
//     flex: 1,
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 20,
//   },

//   ctaBlock: {
//     borderRadius: 24,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//   },
//   ctaEyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '600',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   ctaTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 23,
//     fontWeight: '800',
//     lineHeight: 29,
//     marginBottom: 10,
//     maxWidth: '92%',
//   },
//   ctaText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 20,
//     marginBottom: 16,
//     maxWidth: '94%',
//   },
//   ctaOfferPill: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginBottom: 16,
//   },
//   ctaOfferPillText: {
//     color: COLORS.primary,
//     fontSize: 11,
//     fontWeight: '800',
//   },
//   ctaButtons: {
//     gap: 10,
//   },
// });

// import React, { useEffect, useMemo, useRef } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   Animated,
//   Easing,
//   Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';

// function HeaderButton({ title, onPress, primary = false, compact = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.headerButton,
//         compact && styles.headerButtonCompact,
//         primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
//         pressed && styles.pressed,
//       ]}
//     >
//       {primary ? (
//         <LinearGradient
//           colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.headerButtonPrimaryFill}
//         >
//           <Text style={[styles.headerButtonText, styles.headerButtonTextPrimary]}>
//             {title}
//           </Text>
//         </LinearGradient>
//       ) : (
//         <Text style={[styles.headerButtonText, styles.headerButtonTextSecondary]}>
//           {title}
//         </Text>
//       )}
//     </Pressable>
//   );
// }

// function AppShowcaseCard({ item, onPress, animatedStyle }) {
//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//           style={styles.appCard}
//         >
//           <View style={styles.cardGlassOverlay} />
//           <View style={styles.cardTopShine} />

//           <View style={styles.appImageWrap}>
//             <Image source={item.image} style={styles.appImage} resizeMode="cover" />
//             <View style={styles.appImageShade} />
//           </View>

//           <View style={styles.appContent}>
//             <View style={styles.appTopMetaRow}>
//               <View style={styles.appChip}>
//                 <Text style={styles.appChipText}>{item.category}</Text>
//               </View>

//               <View style={styles.launchMiniBadge}>
//                 <Text style={styles.launchMiniBadgeText}>Launch Offer</Text>
//               </View>
//             </View>

//             <Text style={styles.appTitle} numberOfLines={2}>
//               {item.title}
//             </Text>

//             <Text style={styles.appDesc} numberOfLines={3}>
//               {item.description}
//             </Text>

//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>

//             <View style={styles.appFooter}>
//               <View style={styles.priceBlock}>
//                 <Text style={styles.appPriceLabel}>Starting from</Text>

//                 <View style={styles.priceRow}>
//                   <Text style={styles.appOldPrice}>{item.price}</Text>
//                   <Text style={styles.appFreePrice}>Free</Text>
//                 </View>

//                 <Text style={styles.appPriceSubtext}>
//                   Then standard pricing applies after 3 months
//                 </Text>
//               </View>

//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.viewBtn}
//                 >
//                   <View style={styles.buttonTopShine} />
//                   <Text style={styles.viewBtnText}>View</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function HomeScreen({ navigation, route }) {
//   const { apps } = useMarketplace();
// const approvedApps = useMemo(() => {
//   return (apps || []).filter((item) =>
//     String(item.status || '').trim().toLowerCase() === 'approved'
//   );
// }, [apps]);

// const featuredApps = approvedApps.slice(0, 3);
// const heroApp = featuredApps[0];
//   const user = useMemo(
//     () =>
//       route?.params?.user || {
//         name: 'Guest User',
//         fullName: 'Guest User',
//         email: 'guest@example.com',
//         role: 'User',
//         phone: '',
//         location: 'Hyderabad, India',
//         company: 'Apps Marketplace',
//         department: 'Member',
//         bio: 'Welcome to your account.',
//         image: null,
//       },
//     [route?.params?.user]
//   );

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const badgeAnim = useRef(new Animated.Value(0)).current;
//   const titleAnim = useRef(new Animated.Value(0)).current;
//   const subtitleAnim = useRef(new Animated.Value(0)).current;
//   const buttonsAnim = useRef(new Animated.Value(0)).current;
//   const metricsAnim = useRef(new Animated.Value(0)).current;
//   const previewAnim = useRef(new Animated.Value(0)).current;
//   const trustAnim = useRef(new Animated.Value(0)).current;
//   const highlightAnim = useRef(new Animated.Value(0)).current;
//   const sectionAnim = useRef(new Animated.Value(0)).current;
//   const cardsAnim = useRef(featuredApps.map(() => new Animated.Value(0))).current;
//   const valueAnim = useRef(new Animated.Value(0)).current;
//   const ctaAnim = useRef(new Animated.Value(0)).current;
//   const previewFloat = useRef(new Animated.Value(0)).current;
//   const scrollY = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerAnim, {
//           toValue: 1,
//           duration: 350,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(badgeAnim, {
//           toValue: 1,
//           duration: 420,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(titleAnim, {
//         toValue: 1,
//         duration: 480,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(subtitleAnim, {
//         toValue: 1,
//         duration: 420,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(buttonsAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(metricsAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(previewAnim, {
//         toValue: 1,
//         duration: 500,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(trustAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(highlightAnim, {
//         toValue: 1,
//         duration: 420,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(sectionAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.stagger(
//         110,
//         cardsAnim.map((anim) =>
//           Animated.timing(anim, {
//             toValue: 1,
//             duration: 380,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: true,
//           })
//         )
//       ),
//       Animated.timing(valueAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(ctaAnim, {
//         toValue: 1,
//         duration: 400,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]);

//     intro.start();

//     const floatLoop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(previewFloat, {
//           toValue: 1,
//           duration: 2400,
//           easing: Easing.inOut(Easing.sin),
//           useNativeDriver: true,
//         }),
//         Animated.timing(previewFloat, {
//           toValue: 0,
//           duration: 2400,
//           easing: Easing.inOut(Easing.sin),
//           useNativeDriver: true,
//         }),
//       ])
//     );

//     floatLoop.start();

//     return () => {
//       intro.stop();
//       floatLoop.stop();
//     };
//   }, [
//     headerAnim,
//     badgeAnim,
//     titleAnim,
//     subtitleAnim,
//     buttonsAnim,
//     metricsAnim,
//     previewAnim,
//     trustAnim,
//     highlightAnim,
//     sectionAnim,
//     cardsAnim,
//     valueAnim,
//     ctaAnim,
//     previewFloat,
//   ]);

//   const headerScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 0.88],
//     extrapolate: 'clamp',
//   });

//   const headerTranslateY = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [0, -8],
//     extrapolate: 'clamp',
//   });

//   const heroOpacity = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 0.02],
//     extrapolate: 'clamp',
//   });

//   const heroTranslateY = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [0, -72],
//     extrapolate: 'clamp',
//   });

//   const heroScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 0.9],
//     extrapolate: 'clamp',
//   });

//   const pageTranslateY = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [0, -90],
//     extrapolate: 'clamp',
//   });

//   const pageScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1, 1.04],
//     extrapolate: 'clamp',
//   });

//   const heroImageScale = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [1.06, 1.14],
//     extrapolate: 'clamp',
//   });

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [distance, 0],
//         }),
//       },
//     ],
//   });

//   const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [distance, 0],
//         }),
//       },
//       {
//         scale: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [fromScale, 1],
//         }),
//       },
//     ],
//   });

//   const previewAnimatedStyle = {
//     opacity: previewAnim,
//     transform: [
//       {
//         translateY: Animated.add(
//           previewAnim.interpolate({
//             inputRange: [0, 1],
//             outputRange: [18, 0],
//           }),
//           previewFloat.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, -4],
//           })
//         ),
//       },
//       {
//         scale: previewAnim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0.985, 1],
//         }),
//       },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.pageBg}
//       >
//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//           scrollEventThrottle={16}
//           stickyHeaderIndices={[0]}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//         >
//           <Animated.View
//             style={[
//               styles.stickyHeaderWrap,
//               fadeUp(headerAnim, 10),
//               {
//                 transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//               },
//             ]}
//           >
//             <CommonHeader
//               navigation={navigation}
//               title="Apps Marketplace"
//               subtitle="Premium digital products"
//               showBack={false}
//               rightLabel="Contact"
//               onNotificationPress={() => navigation.navigate('Notifications')}
//               onProfilePress={() => navigation.navigate('Profile', { user })}
//             />
//           </Animated.View>

//           <Animated.View
//             style={[
//               styles.heroSection,
//               {
//                 opacity: heroOpacity,
//                 transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
//               },
//             ]}
//           >
//             <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
//               <Text style={styles.launchOfferBadgeText}>
//                 LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS
//               </Text>
//             </Animated.View>

//             <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>
//               PREMIUM APP MARKETPLACE
//             </Animated.Text>

//             <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
//               Premium apps for{'\n'}modern businesses
//             </Animated.Text>

//             <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
//               Discover polished business applications, digital products, and custom
//               software solutions built to sell better and scale faster.{'\n\n'}
//               <Text style={styles.heroOfferText}>
//                 Start today under our launch offer — all apps are free for the first 3
//                 months.
//               </Text>
//             </Animated.Text>

//             <Animated.View style={fadeUp(buttonsAnim, 12)}>
//               <View style={styles.heroButtons}>
//                 <HeaderButton
//                   title="Explore Apps"
//                   primary
//                   onPress={() => navigation.navigate('Apps')}
//                 />
//                 <HeaderButton
//                   title="Upload App"
//                   onPress={() => navigation.navigate('UploadApp')}
//                 />
//                 <HeaderButton
//                   title="Contact Us"
//                   onPress={() => navigation.navigate('Contact')}
//                 />
//               </View>
//             </Animated.View>

//             <Animated.View style={fadeUp(metricsAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.metricRow}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>{apps.length}+</Text>
//                   <Text style={styles.metricLabel}>Apps</Text>
//                 </View>

//                 <View style={styles.metricDivider} />

//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>10+</Text>
//                   <Text style={styles.metricLabel}>Industries</Text>
//                 </View>

//                 <View style={styles.metricDivider} />

//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>3 Months</Text>
//                   <Text style={styles.metricLabel}>Free Launch</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View
//             style={{
//               transform: [{ translateY: pageTranslateY }, { scale: pageScale }],
//             }}
//           >
//             <Animated.View style={previewAnimatedStyle}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.heroPreview}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <Animated.Image
//                   source={heroApp?.image}
//                   style={[styles.heroPreviewImage, { transform: [{ scale: heroImageScale }] }]}
//                   resizeMode="cover"
//                 />
//                 <View style={styles.heroPreviewOverlay} />

//                 <View style={styles.heroPreviewContent}>
//                   <View style={styles.heroPreviewTopRow}>
//                     <View style={styles.heroPreviewChip}>
//                       <Text style={styles.heroPreviewChipText}>Featured Product</Text>
//                     </View>

//                     <View style={styles.heroPreviewOfferChip}>
//                       <Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text>
//                     </View>
//                   </View>

//                   <Text style={styles.heroPreviewTitle}>
//                     {heroApp?.title || 'Premium Business App'}
//                   </Text>

//                   <Text style={styles.heroPreviewText} numberOfLines={2}>
//                     {heroApp?.description ||
//                       'Modern product presentation for your company apps.'}
//                   </Text>

//                   <View style={styles.heroPreviewPriceRow}>
//                     <Text style={styles.heroPreviewOldPrice}>
//                       {heroApp?.price || '₹59,999'}
//                     </Text>
//                     <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={fadeUp(trustAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.trustStrip}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>Trusted</Text>
//                   <Text style={styles.trustLabel}>by growing teams</Text>
//                 </View>

//                 <View style={styles.trustDivider} />

//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>3 Months</Text>
//                   <Text style={styles.trustLabel}>free launch period</Text>
//                 </View>

//                 <View style={styles.trustDivider} />

//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>Fast</Text>
//                   <Text style={styles.trustLabel}>deployment</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.highlightBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <View style={styles.highlightTopRow}>
//                   <View style={styles.highlightBadge}>
//                     <Text style={styles.highlightBadgeText}>PREMIUM APP</Text>
//                   </View>
//                   <View style={styles.highlightMiniPill}>
//                     <Text style={styles.highlightMiniPillText}>Best Seller</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.highlightTitle}>
//                   {heroApp?.title || 'Premium Business Suite'}
//                 </Text>

//                 <Text style={styles.highlightText}>
//                   A flagship product in our catalog with advanced modules, cleaner
//                   business flows, and stronger customization potential compared to
//                   standard app packages.
//                 </Text>

//                 <View style={styles.offerBanner}>
//                   <Text style={styles.offerBannerLabel}>Launch Offer</Text>
//                   <Text style={styles.offerBannerText}>
//                     Free for the first 3 months on all app packages
//                   </Text>
//                 </View>

//                 <View style={styles.highlightTagsRow}>
//                   <View style={styles.highlightTag}>
//                     <Text style={styles.highlightTagText}>Full Business Suite</Text>
//                   </View>
//                   <View style={styles.highlightTag}>
//                     <Text style={styles.highlightTagText}>Most Requested</Text>
//                   </View>
//                   <View style={styles.highlightTag}>
//                     <Text style={styles.highlightTagText}>Highly Customizable</Text>
//                   </View>
//                 </View>

//                 <View style={styles.highlightBottomRow}>
//                   <View>
//                     <Text style={styles.highlightPriceLabel}>Premium Package</Text>

//                     <View style={styles.highlightPriceRow}>
//                       <Text style={styles.highlightOldPrice}>
//                         {heroApp?.price || '₹59,999'}
//                       </Text>
//                       <Text style={styles.highlightFreePrice}>Free</Text>
//                     </View>

//                     <Text style={styles.highlightPriceSubtext}>
//                       Free for the first 3 months, then standard plan pricing applies
//                     </Text>
//                   </View>

//                   <HeaderButton
//                     title="View Premium App"
//                     primary
//                     compact
//                     onPress={() =>
//                       heroApp
//                         ? navigation.navigate('AppDetails', { app: heroApp, user })
//                         : null
//                     }
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={fadeUp(sectionAnim, 10)}>
//               <View style={styles.sectionHeader}>
//                 <View style={styles.sectionHeaderLeft}>
//                   <Text style={styles.sectionEyebrow}>FEATURED APPS</Text>
//                   <Text style={styles.sectionTitle}>Designed to sell better</Text>
//                 </View>

//                 <Pressable onPress={() => navigation.navigate('Apps')}>
//                   <Text style={styles.sectionAction}>See all</Text>
//                 </Pressable>
//               </View>
//             </Animated.View>

//             <Animated.ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//             >
//               {featuredApps.map((item, index) => (
//                 <AppShowcaseCard
//                   key={item.id}
//                   item={item}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={scaleFade(cardsAnim[index], 14, 0.985)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             <Animated.View style={fadeUp(valueAnim, 12)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.valueBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
//                 <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>

//                 <View style={styles.valueList}>
//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>
//                       Premium marketplace presentation for your company apps
//                     </Text>
//                   </View>

//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>
//                       Stronger buyer confidence with polished product sections and pricing
//                     </Text>
//                   </View>

//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>
//                       Launch offer included: all apps free for the first 3 months
//                     </Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.ctaBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>

//                 <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>

//                 <Text style={styles.ctaText}>
//                   Build a cleaner, stronger, glass-inspired catalog experience for your
//                   products. Get started now under our launch offer — all apps are free
//                   for the first 3 months.
//                 </Text>

//                 <View style={styles.ctaOfferPill}>
//                   <Text style={styles.ctaOfferPillText}>
//                     Launch Offer • All Apps Free for the First 3 Months
//                   </Text>
//                 </View>

//                 <View style={styles.ctaButtons}>
//                   <HeaderButton
//                     title="Start Project"
//                     primary
//                     onPress={() => navigation.navigate('Contact')}
//                   />
//                   <HeaderButton
//                     title="Browse Apps"
//                     onPress={() => navigation.navigate('Apps')}
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <CommonFooter />
//           </Animated.View>
//         </Animated.ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: {
//     opacity: 0.92,
//   },
//   cardPressed: {
//     opacity: 0.96,
//     transform: [{ scale: 0.992 }],
//   },
//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },

//   safeArea: {
//     flex: 1,
//     backgroundColor: '#141B27',
//   },
//   pageBg: {
//     flex: 1,
//   },
//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 44,
//     backgroundColor: 'transparent',
//   },

//   stickyHeaderWrap: {
//     zIndex: 50,
//     elevation: 20,
//     marginBottom: 8,
//   },

//   heroSection: {
//     marginBottom: 10,
//     position: 'relative',
//   },
//   launchOfferBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     marginBottom: 12,
//   },
//   launchOfferBadgeText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '800',
//     letterSpacing: 0.8,
//   },
//   heroBadge: {
//     alignSelf: 'flex-start',
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 12,
//   },
//   heroTitle: {
//     color: '#FFFFFF',
//     fontSize: 28,
//     fontWeight: '800',
//     lineHeight: 34,
//     letterSpacing: -0.4,
//     marginBottom: 12,
//     maxWidth: '90%',
//   },
//   heroSubtitle: {
//     color: 'rgba(255,255,255,0.72)',
//     fontSize: 14,
//     fontWeight: '400',
//     lineHeight: 22,
//     marginBottom: 18,
//     maxWidth: '92%',
//   },
//   heroOfferText: {
//     color: '#67E6E8',
//     fontSize: 14,
//     fontWeight: '700',
//     lineHeight: 22,
//   },

//   heroButtons: {
//     gap: 10,
//     marginBottom: 18,
//   },
//   headerButton: {
//     minHeight: 48,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//     overflow: 'hidden',
//   },
//   headerButtonCompact: {
//     minHeight: 38,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//   },
//   headerButtonPrimary: {
//     backgroundColor: 'transparent',
//   },
//   headerButtonPrimaryFill: {
//     minHeight: 48,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 16,
//     shadowColor: '#42DDE2',
//     shadowOpacity: 0.18,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 6,
//   },
//   headerButtonSecondary: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//   },
//   headerButtonText: {
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   headerButtonTextPrimary: {
//     color: '#12343A',
//   },
//   headerButtonTextSecondary: {
//     color: '#FFFFFF',
//   },

//   metricRow: {
//     minHeight: 64,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     overflow: 'hidden',
//   },
//   metricItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   metricValue: {
//     color: '#FFFFFF',
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 3,
//   },
//   metricLabel: {
//     color: 'rgba(255,255,255,0.60)',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   metricDivider: {
//     width: 1,
//     height: 28,
//     backgroundColor: 'rgba(255,255,255,0.10)',
//   },

//   heroPreview: {
//     borderRadius: 26,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     height: Math.min(218, SCREEN_WIDTH * 0.55),
//     marginBottom: 14,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//   },
//   heroPreviewImage: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#233044',
//   },
//   heroPreviewOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(10,12,16,0.34)',
//   },
//   heroPreviewContent: {
//     position: 'absolute',
//     left: 14,
//     right: 14,
//     bottom: 14,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     borderRadius: 18,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   heroPreviewTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//     gap: 8,
//   },
//   heroPreviewChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.26)',
//     borderRadius: 999,
//     paddingHorizontal: 9,
//     paddingVertical: 5,
//   },
//   heroPreviewChipText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   heroPreviewOfferChip: {
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.14)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   heroPreviewOfferChipText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   heroPreviewTitle: {
//     color: '#FFFFFF',
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 5,
//   },
//   heroPreviewText: {
//     color: 'rgba(255,255,255,0.78)',
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 17,
//   },
//   heroPreviewPriceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 8,
//   },
//   heroPreviewOldPrice: {
//     color: 'rgba(255,255,255,0.65)',
//     fontSize: 12,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//   },
//   heroPreviewFreeText: {
//     color: '#67E6E8',
//     fontSize: 12,
//     fontWeight: '800',
//   },

//   trustStrip: {
//     minHeight: 58,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     marginBottom: 16,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     overflow: 'hidden',
//   },
//   trustItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   trustValue: {
//     color: '#FFFFFF',
//     fontSize: 13,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   trustLabel: {
//     color: 'rgba(255,255,255,0.60)',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   trustDivider: {
//     width: 1,
//     height: 24,
//     backgroundColor: 'rgba(255,255,255,0.10)',
//   },

//   highlightBlock: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     padding: 16,
//     marginBottom: 32,
//     overflow: 'hidden',
//   },
//   highlightTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//     gap: 10,
//   },
//   highlightBadge: {
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.26)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   highlightBadgeText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },
//   highlightMiniPill: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   highlightMiniPillText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   highlightTitle: {
//     color: '#FFFFFF',
//     fontSize: 21,
//     fontWeight: '800',
//     lineHeight: 26,
//     marginBottom: 8,
//   },
//   highlightText: {
//     color: 'rgba(255,255,255,0.72)',
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 20,
//     marginBottom: 14,
//   },
//   offerBanner: {
//     alignSelf: 'stretch',
//     backgroundColor: 'rgba(103,232,240,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.24)',
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     marginBottom: 16,
//   },
//   offerBannerLabel: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '800',
//     letterSpacing: 0.8,
//     marginBottom: 4,
//     textTransform: 'uppercase',
//   },
//   offerBannerText: {
//     color: '#FFFFFF',
//     fontSize: 13,
//     fontWeight: '700',
//     lineHeight: 19,
//   },
//   highlightTagsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 16,
//   },
//   highlightTag: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   highlightTagText: {
//     color: 'rgba(255,255,255,0.75)',
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   highlightBottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: 14,
//   },
//   highlightPriceLabel: {
//     color: 'rgba(255,255,255,0.55)',
//     fontSize: 11,
//     marginBottom: 4,
//   },
//   highlightPriceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   highlightOldPrice: {
//     color: 'rgba(255,255,255,0.55)',
//     fontSize: 14,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//   },
//   highlightFreePrice: {
//     color: '#67E6E8',
//     fontSize: 24,
//     fontWeight: '800',
//   },
//   highlightPriceSubtext: {
//     color: 'rgba(255,255,255,0.72)',
//     fontSize: 11,
//     marginTop: 4,
//     lineHeight: 16,
//     maxWidth: 170,
//   },

//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     marginBottom: 16,
//   },
//   sectionHeaderLeft: {
//     flex: 1,
//     paddingRight: 12,
//   },
//   sectionEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 6,
//   },
//   sectionTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 27,
//   },
//   sectionAction: {
//     color: '#67E6E8',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   cardsRow: {
//     paddingLeft: 18,
//     paddingRight: 18,
//     marginBottom: 32,
//   },
//   appCardWrap: {
//     marginRight: 14,
//   },
//   appCard: {
//     width: Math.min(258, SCREEN_WIDTH * 0.72),
//     borderRadius: 24,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//   },
//   appImageWrap: {
//     position: 'relative',
//   },
//   appImage: {
//     width: '100%',
//     height: 160,
//     backgroundColor: '#233044',
//   },
//   appImageShade: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.14)',
//   },
//   appContent: {
//     padding: 14,
//   },
//   appTopMetaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 8,
//   },
//   appChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.24)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   appChipText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   launchMiniBadge: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   launchMiniBadgeText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   appTitle: {
//     color: '#FFFFFF',
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 7,
//     minHeight: 42,
//   },
//   appDesc: {
//     color: 'rgba(255,255,255,0.72)',
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 18,
//     marginBottom: 12,
//     minHeight: 54,
//   },
//   offerStrip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.24)',
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     paddingVertical: 7,
//     marginBottom: 14,
//   },
//   offerStripText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '800',
//     lineHeight: 14,
//   },
//   appFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//   },
//   priceBlock: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   appPriceLabel: {
//     color: 'rgba(255,255,255,0.55)',
//     fontSize: 11,
//     fontWeight: '400',
//     marginBottom: 4,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   appOldPrice: {
//     color: 'rgba(255,255,255,0.55)',
//     fontSize: 13,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//   },
//   appFreePrice: {
//     color: '#67E6E8',
//     fontSize: 20,
//     fontWeight: '800',
//   },
//   appPriceSubtext: {
//     color: 'rgba(255,255,255,0.68)',
//     fontSize: 10,
//     marginTop: 4,
//     lineHeight: 14,
//   },
//   viewBtn: {
//     minWidth: 76,
//     minHeight: 38,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//     overflow: 'hidden',
//     shadowColor: '#42DDE2',
//     shadowOpacity: 0.18,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 6,
//   },
//   viewBtnText: {
//     color: '#12343A',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   valueBlock: {
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     marginBottom: 32,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     overflow: 'hidden',
//   },
//   valueTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 27,
//     marginBottom: 14,
//   },
//   valueList: {
//     gap: 14,
//   },
//   valueItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   valueDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: '#67E6E8',
//     marginTop: 6,
//     marginRight: 10,
//   },
//   valueText: {
//     flex: 1,
//     color: 'rgba(255,255,255,0.72)',
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 20,
//   },

//   ctaBlock: {
//     borderRadius: 24,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     overflow: 'hidden',
//   },
//   ctaEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   ctaTitle: {
//     color: '#FFFFFF',
//     fontSize: 23,
//     fontWeight: '800',
//     lineHeight: 29,
//     marginBottom: 10,
//     maxWidth: '92%',
//   },
//   ctaText: {
//     color: 'rgba(255,255,255,0.72)',
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 20,
//     marginBottom: 16,
//     maxWidth: '94%',
//   },
//   ctaOfferPill: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.26)',
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginBottom: 16,
//   },
//   ctaOfferPillText: {
//     color: '#67E6E8',
//     fontSize: 11,
//     fontWeight: '800',
//   },
//   ctaButtons: {
//     gap: 10,
//   },

//   cardGlassOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.02)',
//   },
//   cardTopShine: {
//     position: 'absolute',
//     top: 0,
//     left: '15%',
//     right: '15%',
//     height: 1.2,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//   },
//   buttonTopShine: {
//     position: 'absolute',
//     top: 0,
//     left: 8,
//     right: 8,
//     height: 1.2,
//     backgroundColor: 'rgba(255,255,255,0.32)',
//   },
// });

// import React, { useEffect, useMemo, useRef, useCallback } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   Animated,
//   Easing,
//   Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';

// function HeaderButton({ title, onPress, primary = false, compact = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.headerButton,
//         compact && styles.headerButtonCompact,
//         primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
//         pressed && styles.pressed,
//       ]}
//     >
//       {primary ? (
//         <LinearGradient
//           colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.headerButtonPrimaryFill}
//         >
//           <Text style={[styles.headerButtonText, styles.headerButtonTextPrimary]}>
//             {title}
//           </Text>
//         </LinearGradient>
//       ) : (
//         <Text style={[styles.headerButtonText, styles.headerButtonTextSecondary]}>
//           {title}
//         </Text>
//       )}
//     </Pressable>
//   );
// }

// function AppShowcaseCard({ item, onPress, animatedStyle }) {
//   const formattedPrice = item.price
//     ? `₹${Number(item.price).toLocaleString('en-IN')}`
//     : 'Free';

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//           style={styles.appCard}
//         >
//           <View style={styles.cardGlassOverlay} />
//           <View style={styles.cardTopShine} />

//           <View style={styles.appImageWrap}>
//             {item.imageUrl ? (
//               <Image
//                 source={{ uri: item.imageUrl }}
//                 style={styles.appImage}
//                 resizeMode="cover"
//               />
//             ) : (
//               <View style={[styles.appImage, styles.appImagePlaceholder]}>
//                 <Text style={styles.appImagePlaceholderText}>📷</Text>
//               </View>
//             )}
//             <View style={styles.appImageShade} />
//           </View>

//           <View style={styles.appContent}>
//             <View style={styles.appTopMetaRow}>
//               <View style={styles.appChip}>
//                 <Text style={styles.appChipText}>{item.category}</Text>
//               </View>
//               <View style={styles.launchMiniBadge}>
//                 <Text style={styles.launchMiniBadgeText}>Launch Offer</Text>
//               </View>
//             </View>

//             <Text style={styles.appTitle} numberOfLines={2}>
//               {item.title}
//             </Text>

//             <Text style={styles.appDesc} numberOfLines={3}>
//               {item.description}
//             </Text>

//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>

//             <View style={styles.appFooter}>
//               <View style={styles.priceBlock}>
//                 <Text style={styles.appPriceLabel}>Starting from</Text>
//                 <View style={styles.priceRow}>
//                   <Text style={styles.appOldPrice}>{formattedPrice}</Text>
//                   <Text style={styles.appFreePrice}>Free</Text>
//                 </View>
//                 <Text style={styles.appPriceSubtext}>
//                   Then standard pricing applies after 3 months
//                 </Text>
//               </View>

//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.viewBtn}
//                 >
//                   <View style={styles.buttonTopShine} />
//                   <Text style={styles.viewBtnText}>View</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function HomeScreen({ navigation, route }) {
//   const { apps, refreshApps } = useMarketplace();

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter((item) =>
//       String(item.status || '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const featuredApps = approvedApps.slice(0, 3);
//   const heroApp = featuredApps[0];

//   const heroFormattedPrice = heroApp?.price
//     ? `₹${Number(heroApp.price).toLocaleString('en-IN')}`
//     : 'Free';

//   const user = useMemo(
//     () =>
//       route?.params?.user || {
//         name: 'Guest User',
//         fullName: 'Guest User',
//         email: 'guest@example.com',
//         role: 'User',
//         phone: '',
//         location: 'Hyderabad, India',
//         company: 'Apps Marketplace',
//         department: 'Member',
//         bio: 'Welcome to your account.',
//         image: null,
//       },
//     [route?.params?.user]
//   );

//   // ✅ Refresh on every screen focus
//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const badgeAnim = useRef(new Animated.Value(0)).current;
//   const titleAnim = useRef(new Animated.Value(0)).current;
//   const subtitleAnim = useRef(new Animated.Value(0)).current;
//   const buttonsAnim = useRef(new Animated.Value(0)).current;
//   const metricsAnim = useRef(new Animated.Value(0)).current;
//   const previewAnim = useRef(new Animated.Value(0)).current;
//   const trustAnim = useRef(new Animated.Value(0)).current;
//   const highlightAnim = useRef(new Animated.Value(0)).current;
//   const sectionAnim = useRef(new Animated.Value(0)).current;
//   const cardsAnim = useRef(featuredApps.map(() => new Animated.Value(0))).current;
//   const valueAnim = useRef(new Animated.Value(0)).current;
//   const ctaAnim = useRef(new Animated.Value(0)).current;
//   const previewFloat = useRef(new Animated.Value(0)).current;
//   const scrollY = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerAnim, {
//           toValue: 1, duration: 350,
//           easing: Easing.out(Easing.cubic), useNativeDriver: true,
//         }),
//         Animated.timing(badgeAnim, {
//           toValue: 1, duration: 420,
//           easing: Easing.out(Easing.cubic), useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(titleAnim, {
//         toValue: 1, duration: 480,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(subtitleAnim, {
//         toValue: 1, duration: 420,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(buttonsAnim, {
//         toValue: 1, duration: 380,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(metricsAnim, {
//         toValue: 1, duration: 380,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(previewAnim, {
//         toValue: 1, duration: 500,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(trustAnim, {
//         toValue: 1, duration: 340,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(highlightAnim, {
//         toValue: 1, duration: 420,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(sectionAnim, {
//         toValue: 1, duration: 340,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.stagger(
//         110,
//         cardsAnim.map((anim) =>
//           Animated.timing(anim, {
//             toValue: 1, duration: 380,
//             easing: Easing.out(Easing.cubic), useNativeDriver: true,
//           })
//         )
//       ),
//       Animated.timing(valueAnim, {
//         toValue: 1, duration: 380,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(ctaAnim, {
//         toValue: 1, duration: 400,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//     ]);

//     intro.start();

//     const floatLoop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(previewFloat, {
//           toValue: 1, duration: 2400,
//           easing: Easing.inOut(Easing.sin), useNativeDriver: true,
//         }),
//         Animated.timing(previewFloat, {
//           toValue: 0, duration: 2400,
//           easing: Easing.inOut(Easing.sin), useNativeDriver: true,
//         }),
//       ])
//     );

//     floatLoop.start();

//     return () => {
//       intro.stop();
//       floatLoop.stop();
//     };
//   }, [
//     headerAnim, badgeAnim, titleAnim, subtitleAnim, buttonsAnim,
//     metricsAnim, previewAnim, trustAnim, highlightAnim, sectionAnim,
//     cardsAnim, valueAnim, ctaAnim, previewFloat,
//   ]);

//   const headerScale = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [1, 0.88], extrapolate: 'clamp',
//   });
//   const headerTranslateY = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [0, -8], extrapolate: 'clamp',
//   });
//   const heroOpacity = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [1, 0.02], extrapolate: 'clamp',
//   });
//   const heroTranslateY = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [0, -72], extrapolate: 'clamp',
//   });
//   const heroScale = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [1, 0.9], extrapolate: 'clamp',
//   });
//   const pageTranslateY = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [0, -90], extrapolate: 'clamp',
//   });
//   const pageScale = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [1, 1.04], extrapolate: 'clamp',
//   });
//   const heroImageScale = scrollY.interpolate({
//     inputRange: [0, 220], outputRange: [1.06, 1.14], extrapolate: 'clamp',
//   });

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1], outputRange: [distance, 0],
//         }),
//       },
//     ],
//   });

//   const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1], outputRange: [distance, 0],
//         }),
//       },
//       {
//         scale: anim.interpolate({
//           inputRange: [0, 1], outputRange: [fromScale, 1],
//         }),
//       },
//     ],
//   });

//   const previewAnimatedStyle = {
//     opacity: previewAnim,
//     transform: [
//       {
//         translateY: Animated.add(
//           previewAnim.interpolate({
//             inputRange: [0, 1], outputRange: [18, 0],
//           }),
//           previewFloat.interpolate({
//             inputRange: [0, 1], outputRange: [0, -4],
//           })
//         ),
//       },
//       {
//         scale: previewAnim.interpolate({
//           inputRange: [0, 1], outputRange: [0.985, 1],
//         }),
//       },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.pageBg}
//       >
//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//           scrollEventThrottle={16}
//           stickyHeaderIndices={[0]}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//         >
//           <Animated.View
//             style={[
//               styles.stickyHeaderWrap,
//               fadeUp(headerAnim, 10),
//               {
//                 transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//               },
//             ]}
//           >
//             <CommonHeader
//               navigation={navigation}
//               title="Apps Marketplace"
//               subtitle="Premium digital products"
//               showBack={false}
//               rightLabel="Contact"
//               onNotificationPress={() => navigation.navigate('Notifications')}
//               onProfilePress={() => navigation.navigate('Profile', { user })}
//             />
//           </Animated.View>

//           <Animated.View
//             style={[
//               styles.heroSection,
//               {
//                 opacity: heroOpacity,
//                 transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
//               },
//             ]}
//           >
//             <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
//               <Text style={styles.launchOfferBadgeText}>
//                 LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS
//               </Text>
//             </Animated.View>

//             <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>
//               PREMIUM APP MARKETPLACE
//             </Animated.Text>

//             <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
//               Premium apps for{'\n'}modern businesses
//             </Animated.Text>

//             <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
//               Discover polished business applications, digital products, and custom
//               software solutions built to sell better and scale faster.{'\n\n'}
//               <Text style={styles.heroOfferText}>
//                 Start today under our launch offer — all apps are free for the first 3
//                 months.
//               </Text>
//             </Animated.Text>

//             <Animated.View style={fadeUp(buttonsAnim, 12)}>
//               <View style={styles.heroButtons}>
//                 <HeaderButton
//                   title="Explore Apps"
//                   primary
//                   onPress={() => navigation.navigate('Apps')}
//                 />
//                 <HeaderButton
//                   title="Upload App"
//                   onPress={() => navigation.navigate('UploadApp')}
//                 />
//                 <HeaderButton
//                   title="Contact Us"
//                   onPress={() => navigation.navigate('Contact')}
//                 />
//               </View>
//             </Animated.View>

//             <Animated.View style={fadeUp(metricsAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.metricRow}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>{approvedApps.length}+</Text>
//                   <Text style={styles.metricLabel}>Apps</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>10+</Text>
//                   <Text style={styles.metricLabel}>Industries</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>3 Months</Text>
//                   <Text style={styles.metricLabel}>Free Launch</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View
//             style={{
//               transform: [{ translateY: pageTranslateY }, { scale: pageScale }],
//             }}
//           >
//             <Animated.View style={previewAnimatedStyle}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.heroPreview}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 {heroApp?.imageUrl ? (
//                   <Animated.Image
//                     source={{ uri: heroApp.imageUrl }}
//                     style={[styles.heroPreviewImage, { transform: [{ scale: heroImageScale }] }]}
//                     resizeMode="cover"
//                   />
//                 ) : (
//                   <Animated.View
//                     style={[styles.heroPreviewImage, styles.heroPreviewPlaceholder, { transform: [{ scale: heroImageScale }] }]}
//                   >
//                     <Text style={styles.heroPreviewPlaceholderText}>📷</Text>
//                   </Animated.View>
//                 )}
//                 <View style={styles.heroPreviewOverlay} />

//                 <View style={styles.heroPreviewContent}>
//                   <View style={styles.heroPreviewTopRow}>
//                     <View style={styles.heroPreviewChip}>
//                       <Text style={styles.heroPreviewChipText}>Featured Product</Text>
//                     </View>
//                     <View style={styles.heroPreviewOfferChip}>
//                       <Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text>
//                     </View>
//                   </View>

//                   <Text style={styles.heroPreviewTitle}>
//                     {heroApp?.title || 'Premium Business App'}
//                   </Text>

//                   <Text style={styles.heroPreviewText} numberOfLines={2}>
//                     {heroApp?.description || 'Modern product presentation for your company apps.'}
//                   </Text>

//                   <View style={styles.heroPreviewPriceRow}>
//                     <Text style={styles.heroPreviewOldPrice}>
//                       {heroFormattedPrice}
//                     </Text>
//                     <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={fadeUp(trustAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.trustStrip}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>Trusted</Text>
//                   <Text style={styles.trustLabel}>by growing teams</Text>
//                 </View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>3 Months</Text>
//                   <Text style={styles.trustLabel}>free launch period</Text>
//                 </View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>Fast</Text>
//                   <Text style={styles.trustLabel}>deployment</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.highlightBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <View style={styles.highlightTopRow}>
//                   <View style={styles.highlightBadge}>
//                     <Text style={styles.highlightBadgeText}>PREMIUM APP</Text>
//                   </View>
//                   <View style={styles.highlightMiniPill}>
//                     <Text style={styles.highlightMiniPillText}>Best Seller</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.highlightTitle}>
//                   {heroApp?.title || 'Premium Business Suite'}
//                 </Text>

//                 <Text style={styles.highlightText}>
//                   A flagship product in our catalog with advanced modules, cleaner
//                   business flows, and stronger customization potential compared to
//                   standard app packages.
//                 </Text>

//                 <View style={styles.offerBanner}>
//                   <Text style={styles.offerBannerLabel}>Launch Offer</Text>
//                   <Text style={styles.offerBannerText}>
//                     Free for the first 3 months on all app packages
//                   </Text>
//                 </View>

//                 <View style={styles.highlightTagsRow}>
//                   <View style={styles.highlightTag}>
//                     <Text style={styles.highlightTagText}>Full Business Suite</Text>
//                   </View>
//                   <View style={styles.highlightTag}>
//                     <Text style={styles.highlightTagText}>Most Requested</Text>
//                   </View>
//                   <View style={styles.highlightTag}>
//                     <Text style={styles.highlightTagText}>Highly Customizable</Text>
//                   </View>
//                 </View>

//                 <View style={styles.highlightBottomRow}>
//                   <View>
//                     <Text style={styles.highlightPriceLabel}>Premium Package</Text>
//                     <View style={styles.highlightPriceRow}>
//                       <Text style={styles.highlightOldPrice}>{heroFormattedPrice}</Text>
//                       <Text style={styles.highlightFreePrice}>Free</Text>
//                     </View>
//                     <Text style={styles.highlightPriceSubtext}>
//                       Free for the first 3 months, then standard plan pricing applies
//                     </Text>
//                   </View>

//                   <HeaderButton
//                     title="View Premium App"
//                     primary
//                     compact
//                     onPress={() =>
//                       heroApp
//                         ? navigation.navigate('AppDetails', { app: heroApp, user })
//                         : null
//                     }
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={fadeUp(sectionAnim, 10)}>
//               <View style={styles.sectionHeader}>
//                 <View style={styles.sectionHeaderLeft}>
//                   <Text style={styles.sectionEyebrow}>FEATURED APPS</Text>
//                   <Text style={styles.sectionTitle}>Designed to sell better</Text>
//                 </View>
//                 <Pressable onPress={() => navigation.navigate('Apps')}>
//                   <Text style={styles.sectionAction}>See all</Text>
//                 </Pressable>
//               </View>
//             </Animated.View>

//             <Animated.ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//             >
//               {featuredApps.map((item, index) => (
//                 <AppShowcaseCard
//                   key={item.id}
//                   item={item}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={scaleFade(cardsAnim[index], 14, 0.985)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             <Animated.View style={fadeUp(valueAnim, 12)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.valueBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
//                 <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>

//                 <View style={styles.valueList}>
//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>
//                       Premium marketplace presentation for your company apps
//                     </Text>
//                   </View>
//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>
//                       Stronger buyer confidence with polished product sections and pricing
//                     </Text>
//                   </View>
//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>
//                       Launch offer included: all apps free for the first 3 months
//                     </Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.ctaBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>
//                 <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>
//                 <Text style={styles.ctaText}>
//                   Build a cleaner, stronger, glass-inspired catalog experience for your
//                   products. Get started now under our launch offer — all apps are free
//                   for the first 3 months.
//                 </Text>

//                 <View style={styles.ctaOfferPill}>
//                   <Text style={styles.ctaOfferPillText}>
//                     Launch Offer • All Apps Free for the First 3 Months
//                   </Text>
//                 </View>

//                 <View style={styles.ctaButtons}>
//                   <HeaderButton
//                     title="Start Project"
//                     primary
//                     onPress={() => navigation.navigate('Contact')}
//                   />
//                   <HeaderButton
//                     title="Browse Apps"
//                     onPress={() => navigation.navigate('Apps')}
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <CommonFooter />
//           </Animated.View>
//         </Animated.ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: { opacity: 0.92 },
//   cardPressed: { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },

//   safeArea: { flex: 1, backgroundColor: '#141B27' },
//   pageBg: { flex: 1 },
//   container: {
//     paddingHorizontal: 18, paddingTop: 10,
//     paddingBottom: 44, backgroundColor: 'transparent',
//   },

//   stickyHeaderWrap: { zIndex: 50, elevation: 20, marginBottom: 8 },

//   heroSection: { marginBottom: 10, position: 'relative' },
//   launchOfferBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)',
//     borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginBottom: 12,
//   },
//   launchOfferBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   heroBadge: { alignSelf: 'flex-start', color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
//   heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: -0.4, marginBottom: 12, maxWidth: '90%' },
//   heroSubtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: '400', lineHeight: 22, marginBottom: 18, maxWidth: '92%' },
//   heroOfferText: { color: '#67E6E8', fontSize: 14, fontWeight: '700', lineHeight: 22 },

//   heroButtons: { gap: 10, marginBottom: 18 },
//   headerButton: { minHeight: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, overflow: 'hidden' },
//   headerButtonCompact: { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
//   headerButtonPrimary: { backgroundColor: 'transparent' },
//   headerButtonPrimaryFill: { minHeight: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   headerButtonSecondary: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   headerButtonText: { fontSize: 14, fontWeight: '700' },
//   headerButtonTextPrimary: { color: '#12343A' },
//   headerButtonTextSecondary: { color: '#FFFFFF' },

//   metricRow: { minHeight: 64, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, overflow: 'hidden' },
//   metricItem: { flex: 1, alignItems: 'center' },
//   metricValue: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 3 },
//   metricLabel: { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   metricDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.10)' },

//   heroPreview: { borderRadius: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', height: Math.min(218, SCREEN_WIDTH * 0.55), marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.04)' },
//   heroPreviewImage: { width: '100%', height: '100%', backgroundColor: '#233044' },
//   heroPreviewPlaceholder: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   heroPreviewPlaceholderText: { fontSize: 32 },
//   heroPreviewOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.34)' },
//   heroPreviewContent: { position: 'absolute', left: 14, right: 14, bottom: 14, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10 },
//   heroPreviewTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
//   heroPreviewChip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
//   heroPreviewChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   heroPreviewOfferChip: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   heroPreviewOfferChipText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   heroPreviewTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   heroPreviewText: { color: 'rgba(255,255,255,0.78)', fontSize: 12, fontWeight: '400', lineHeight: 17 },
//   heroPreviewPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
//   heroPreviewOldPrice: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600', textDecorationLine: 'line-through' },
//   heroPreviewFreeText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },

//   trustStrip: { minHeight: 58, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 16, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
//   trustItem: { flex: 1, alignItems: 'center' },
//   trustValue: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   trustLabel: { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   trustDivider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.10)' },

//   highlightBlock: { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 16, marginBottom: 32, overflow: 'hidden' },
//   highlightTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
//   highlightBadge: { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
//   highlightMiniPill: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightMiniPillText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
//   highlightTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '800', lineHeight: 26, marginBottom: 8 },
//   highlightText: { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 14 },
//   offerBanner: { alignSelf: 'stretch', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16 },
//   offerBannerLabel: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
//   offerBannerText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 19 },
//   highlightTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
//   highlightTag: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightTagText: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
//   highlightBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
//   highlightPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 4 },
//   highlightPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   highlightOldPrice: { color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: '600', textDecorationLine: 'line-through' },
//   highlightFreePrice: { color: '#67E6E8', fontSize: 24, fontWeight: '800' },
//   highlightPriceSubtext: { color: 'rgba(255,255,255,0.72)', fontSize: 11, marginTop: 4, lineHeight: 16, maxWidth: 170 },

//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
//   sectionHeaderLeft: { flex: 1, paddingRight: 12 },
//   sectionEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27 },
//   sectionAction: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   cardsRow: { paddingLeft: 18, paddingRight: 18, marginBottom: 32 },
//   appCardWrap: { marginRight: 14 },
//   appCard: { width: Math.min(258, SCREEN_WIDTH * 0.72), borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)' },
//   appImageWrap: { position: 'relative' },
//   appImage: { width: '100%', height: 160, backgroundColor: '#233044' },
//   appImagePlaceholder: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   appImagePlaceholderText: { fontSize: 32 },
//   appImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.14)' },
//   appContent: { padding: 14 },
//   appTopMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 },
//   appChip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   appChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   launchMiniBadge: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   launchMiniBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   appTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7, minHeight: 42 },
//   appDesc: { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '400', lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   appFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
//   priceBlock: { flex: 1, paddingRight: 10 },
//   appPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '400', marginBottom: 4 },
//   priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   appOldPrice: { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '600', textDecorationLine: 'line-through' },
//   appFreePrice: { color: '#67E6E8', fontSize: 20, fontWeight: '800' },
//   appPriceSubtext: { color: 'rgba(255,255,255,0.68)', fontSize: 10, marginTop: 4, lineHeight: 14 },
//   viewBtn: { minWidth: 76, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, overflow: 'hidden', shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   viewBtnText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   valueBlock: { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 32, backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   valueTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27, marginBottom: 14 },
//   valueList: { gap: 14 },
//   valueItem: { flexDirection: 'row', alignItems: 'flex-start' },
//   valueDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 6, marginRight: 10 },
//   valueText: { flex: 1, color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20 },

//   ctaBlock: { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   ctaEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   ctaTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', lineHeight: 29, marginBottom: 10, maxWidth: '92%' },
//   ctaText: { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 16, maxWidth: '94%' },
//   ctaOfferPill: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16 },
//   ctaOfferPillText: { color: '#67E6E8', fontSize: 11, fontWeight: '800' },
//   ctaButtons: { gap: 10 },

//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.02)' },
//   cardTopShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.18)' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
// });


// import React, { useEffect, useMemo, useRef, useCallback } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   Animated,
//   Easing,
//   Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';

// function HeaderButton({ title, onPress, primary = false, compact = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.headerButton,
//         compact && styles.headerButtonCompact,
//         primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
//         pressed && styles.pressed,
//       ]}
//     >
//       {primary ? (
//         <LinearGradient
//           colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.headerButtonPrimaryFill}
//         >
//           <Text style={[styles.headerButtonText, styles.headerButtonTextPrimary]}>
//             {title}
//           </Text>
//         </LinearGradient>
//       ) : (
//         <Text style={[styles.headerButtonText, styles.headerButtonTextSecondary]}>
//           {title}
//         </Text>
//       )}
//     </Pressable>
//   );
// }

// function AppShowcaseCard({ item, onPress, animatedStyle }) {
//   const formattedPrice = item.price
//     ? `₹${Number(item.price).toLocaleString('en-IN')}`
//     : 'Free';

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//           style={styles.appCard}
//         >
//           <View style={styles.cardGlassOverlay} />
//           <View style={styles.cardTopShine} />

//           <View style={styles.appImageWrap}>
//             {item.imageUrl ? (
//               <Image
//                 source={{ uri: item.imageUrl }}
//                 style={styles.appImage}
//                 resizeMode="cover"
//               />
//             ) : (
//               <View style={[styles.appImage, styles.appImagePlaceholder]}>
//                 <Text style={styles.appImagePlaceholderText}>📷</Text>
//               </View>
//             )}
//             <View style={styles.appImageShade} />
//           </View>

//           <View style={styles.appContent}>
//             <View style={styles.appTopMetaRow}>
//               <View style={styles.appChip}>
//                 <Text style={styles.appChipText}>{item.category}</Text>
//               </View>
//               <View style={styles.launchMiniBadge}>
//                 <Text style={styles.launchMiniBadgeText}>Launch Offer</Text>
//               </View>
//             </View>

//             <Text style={styles.appTitle} numberOfLines={2}>
//               {item.title}
//             </Text>

//             <Text style={styles.appDesc} numberOfLines={3}>
//               {item.description}
//             </Text>

//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>

//             <View style={styles.appFooter}>
//               <View style={styles.priceBlock}>
//                 <Text style={styles.appPriceLabel}>Starting from</Text>
//                 <View style={styles.priceRow}>
//                   <Text style={styles.appOldPrice}>{formattedPrice}</Text>
//                   <Text style={styles.appFreePrice}>Free</Text>
//                 </View>
//                 <Text style={styles.appPriceSubtext}>
//                   Then standard pricing applies after 3 months
//                 </Text>
//               </View>

//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.viewBtn}
//                 >
//                   <View style={styles.buttonTopShine} />
//                   <Text style={styles.viewBtnText}>View</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function HomeScreen({ navigation, route }) {
//   const { apps, refreshApps, lastRefresh } = useMarketplace(); // ✅ add lastRefresh

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter((item) =>
//       // String(item.status || '').trim().toLowerCase() === 'approved'
//     (item.status || '').toLowerCase().includes('approved')
//     );
//   }, [apps]);

//   const featuredApps = approvedApps.slice(0, 3);
//   const heroApp = featuredApps[0];

//   const heroFormattedPrice = heroApp?.price
//     ? `₹${Number(heroApp.price).toLocaleString('en-IN')}`
//     : 'Free';

//   const user = useMemo(
//     () =>
//       route?.params?.user || {
//         name: 'Guest User',
//         fullName: 'Guest User',
//         email: 'guest@example.com',
//         role: 'User',
//         phone: '',
//         location: 'Hyderabad, India',
//         company: 'Apps Marketplace',
//         department: 'Member',
//         bio: 'Welcome to your account.',
//         image: null,
//       },
//     [route?.params?.user]
//   );

//   // ✅ REMOVE useFocusEffect — replace with this
//   // This fires every time lastRefresh changes (i.e. every time refreshApps is called)
//   useEffect(() => {
//     // apps already updated via context — no need to call refreshApps again
//     // this useEffect just ensures HomeScreen re-renders when lastRefresh changes
//   }, [lastRefresh]);

//   // ✅ KEEP this for when user manually navigates to HomeScreen
//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );
// // useEffect(() => {
// //   const interval = setInterval(() => {
// //     refreshApps();
// //   }, 5000);

// //   return () => clearInterval(interval);
// // }, []);
//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const badgeAnim = useRef(new Animated.Value(0)).current;
//   const titleAnim = useRef(new Animated.Value(0)).current;
//   const subtitleAnim = useRef(new Animated.Value(0)).current;
//   const buttonsAnim = useRef(new Animated.Value(0)).current;
//   const metricsAnim = useRef(new Animated.Value(0)).current;
//   const previewAnim = useRef(new Animated.Value(0)).current;
//   const trustAnim = useRef(new Animated.Value(0)).current;
//   const highlightAnim = useRef(new Animated.Value(0)).current;
//   const sectionAnim = useRef(new Animated.Value(0)).current;
//   // const cardsAnim = useRef(featuredApps.map(() => new Animated.Value(0))).current;
//   const cardsAnim = useMemo(
//   () => featuredApps.map(() => new Animated.Value(0)),
//   [featuredApps]
// );
//   const valueAnim = useRef(new Animated.Value(0)).current;
//   const ctaAnim = useRef(new Animated.Value(0)).current;
//   const previewFloat = useRef(new Animated.Value(0)).current;
//   const scrollY = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerAnim, { toValue: 1, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(badgeAnim,  { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(titleAnim,    { toValue: 1, duration: 480, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(subtitleAnim, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(buttonsAnim,  { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(metricsAnim,  { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(previewAnim,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(trustAnim,    { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(highlightAnim,{ toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(sectionAnim,  { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(110, cardsAnim.map((anim) =>
//         Animated.timing(anim, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(valueAnim, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(ctaAnim,   { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     intro.start();

//     const floatLoop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(previewFloat, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//         Animated.timing(previewFloat, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//       ])
//     );
//     floatLoop.start();

//     return () => { intro.stop(); floatLoop.stop(); };
//   }, [
//     headerAnim, badgeAnim, titleAnim, subtitleAnim, buttonsAnim,
//     metricsAnim, previewAnim, trustAnim, highlightAnim, sectionAnim,
//     cardsAnim, valueAnim, ctaAnim, previewFloat,
//   ]);

//   const headerScale     = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.88],   extrapolate: 'clamp' });
//   const headerTranslateY= scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -8],     extrapolate: 'clamp' });
//   const heroOpacity     = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.02],   extrapolate: 'clamp' });
//   const heroTranslateY  = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -72],    extrapolate: 'clamp' });
//   const heroScale       = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.9],    extrapolate: 'clamp' });
//   const pageTranslateY  = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -90],    extrapolate: 'clamp' });
//   const pageScale       = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 1.04],   extrapolate: 'clamp' });
//   const heroImageScale  = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1.06, 1.14],extrapolate: 'clamp' });

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
//     opacity: anim,
//     transform: [
//       { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) },
//       { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [fromScale, 1] }) },
//     ],
//   });

//   const previewAnimatedStyle = {
//     opacity: previewAnim,
//     transform: [
//       {
//         translateY: Animated.add(
//           previewAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }),
//           previewFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -4] })
//         ),
//       },
//       { scale: previewAnim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.pageBg}>
//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//           scrollEventThrottle={16}
//           stickyHeaderIndices={[0]}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//         >
//           <Animated.View
//             style={[styles.stickyHeaderWrap, fadeUp(headerAnim, 10), {
//               transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//             }]}
//           >
//             <CommonHeader
//               navigation={navigation}
//               title="Apps Marketplace"
//               subtitle="Premium digital products"
//               showBack={false}
//               rightLabel="Contact"
//               onNotificationPress={() => navigation.navigate('Notifications')}
//               onProfilePress={() => navigation.navigate('Profile', { user })}
//             />
//           </Animated.View>

//           <Animated.View
//             style={[styles.heroSection, {
//               opacity: heroOpacity,
//               transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
//             }]}
//           >
//             <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
//               <Text style={styles.launchOfferBadgeText}>
//                 LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS
//               </Text>
//             </Animated.View>

//             <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>
//               PREMIUM APP MARKETPLACE
//             </Animated.Text>

//             <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
//               Premium apps for{'\n'}modern businesses
//             </Animated.Text>

//             <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
//               Discover polished business applications, digital products, and custom
//               software solutions built to sell better and scale faster.{'\n\n'}
//               <Text style={styles.heroOfferText}>
//                 Start today under our launch offer — all apps are free for the first 3 months.
//               </Text>
//             </Animated.Text>

//             <Animated.View style={fadeUp(buttonsAnim, 12)}>
//               <View style={styles.heroButtons}>
//                 <HeaderButton title="Explore Apps" primary onPress={() => navigation.navigate('Apps')} />
//                 <HeaderButton title="Upload App"   onPress={() => navigation.navigate('UploadApp')} />
//                 <HeaderButton title="Contact Us"   onPress={() => navigation.navigate('Contact')} />
//               </View>
//             </Animated.View>

//             <Animated.View style={fadeUp(metricsAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.metricRow}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>{approvedApps.length}+</Text>
//                   <Text style={styles.metricLabel}>Apps</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>10+</Text>
//                   <Text style={styles.metricLabel}>Industries</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>3 Months</Text>
//                   <Text style={styles.metricLabel}>Free Launch</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View style={{ transform: [{ translateY: pageTranslateY }, { scale: pageScale }] }}>

//             <Animated.View style={previewAnimatedStyle}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.heroPreview}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 {heroApp?.imageUrl ? (
//                   <Animated.Image
//                     source={{ uri: heroApp.imageUrl }}
//                     style={[styles.heroPreviewImage, { transform: [{ scale: heroImageScale }] }]}
//                     resizeMode="cover"
//                   />
//                 ) : (
//                   <Animated.View
//                     style={[styles.heroPreviewImage, styles.heroPreviewPlaceholder, { transform: [{ scale: heroImageScale }] }]}
//                   >
//                     <Text style={styles.heroPreviewPlaceholderText}>📷</Text>
//                   </Animated.View>
//                 )}
//                 <View style={styles.heroPreviewOverlay} />

//                 <View style={styles.heroPreviewContent}>
//                   <View style={styles.heroPreviewTopRow}>
//                     <View style={styles.heroPreviewChip}>
//                       <Text style={styles.heroPreviewChipText}>Featured Product</Text>
//                     </View>
//                     <View style={styles.heroPreviewOfferChip}>
//                       <Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text>
//                     </View>
//                   </View>
//                   <Text style={styles.heroPreviewTitle}>
//                     {heroApp?.title || 'Premium Business App'}
//                   </Text>
//                   <Text style={styles.heroPreviewText} numberOfLines={2}>
//                     {heroApp?.description || 'Modern product presentation for your company apps.'}
//                   </Text>
//                   <View style={styles.heroPreviewPriceRow}>
//                     <Text style={styles.heroPreviewOldPrice}>{heroFormattedPrice}</Text>
//                     <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={fadeUp(trustAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.trustStrip}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>Trusted</Text>
//                   <Text style={styles.trustLabel}>by growing teams</Text>
//                 </View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>3 Months</Text>
//                   <Text style={styles.trustLabel}>free launch period</Text>
//                 </View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustValue}>Fast</Text>
//                   <Text style={styles.trustLabel}>deployment</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.highlightBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.highlightTopRow}>
//                   <View style={styles.highlightBadge}>
//                     <Text style={styles.highlightBadgeText}>PREMIUM APP</Text>
//                   </View>
//                   <View style={styles.highlightMiniPill}>
//                     <Text style={styles.highlightMiniPillText}>Best Seller</Text>
//                   </View>
//                 </View>
//                 <Text style={styles.highlightTitle}>
//                   {heroApp?.title || 'Premium Business Suite'}
//                 </Text>
//                 <Text style={styles.highlightText}>
//                   A flagship product in our catalog with advanced modules, cleaner
//                   business flows, and stronger customization potential compared to
//                   standard app packages.
//                 </Text>
//                 <View style={styles.offerBanner}>
//                   <Text style={styles.offerBannerLabel}>Launch Offer</Text>
//                   <Text style={styles.offerBannerText}>
//                     Free for the first 3 months on all app packages
//                   </Text>
//                 </View>
//                 <View style={styles.highlightTagsRow}>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Full Business Suite</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Most Requested</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Highly Customizable</Text></View>
//                 </View>
//                 <View style={styles.highlightBottomRow}>
//                   <View>
//                     <Text style={styles.highlightPriceLabel}>Premium Package</Text>
//                     <View style={styles.highlightPriceRow}>
//                       <Text style={styles.highlightOldPrice}>{heroFormattedPrice}</Text>
//                       <Text style={styles.highlightFreePrice}>Free</Text>
//                     </View>
//                     <Text style={styles.highlightPriceSubtext}>
//                       Free for the first 3 months, then standard plan pricing applies
//                     </Text>
//                   </View>
//                   <HeaderButton
//                     title="View Premium App"
//                     primary compact
//                     onPress={() => heroApp ? navigation.navigate('AppDetails', { app: heroApp, user }) : null}
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={fadeUp(sectionAnim, 10)}>
//               <View style={styles.sectionHeader}>
//                 <View style={styles.sectionHeaderLeft}>
//                   <Text style={styles.sectionEyebrow}>FEATURED APPS</Text>
//                   <Text style={styles.sectionTitle}>Designed to sell better</Text>
//                 </View>
//                 <Pressable onPress={() => navigation.navigate('Apps')}>
//                   <Text style={styles.sectionAction}>See all</Text>
//                 </Pressable>
//               </View>
//             </Animated.View>

//             <Animated.ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//             >
//               {featuredApps.map((item, index) => (
//                 <AppShowcaseCard
//                   key={item.id}
//                   item={item}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={scaleFade(cardsAnim[index], 14, 0.985)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             <Animated.View style={fadeUp(valueAnim, 12)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.valueBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
//                 <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>
//                 <View style={styles.valueList}>
//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>Premium marketplace presentation for your company apps</Text>
//                   </View>
//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>Stronger buyer confidence with polished product sections and pricing</Text>
//                   </View>
//                   <View style={styles.valueItem}>
//                     <View style={styles.valueDot} />
//                     <Text style={styles.valueText}>Launch offer included: all apps free for the first 3 months</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.ctaBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>
//                 <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>
//                 <Text style={styles.ctaText}>
//                   Build a cleaner, stronger, glass-inspired catalog experience for your
//                   products. Get started now under our launch offer — all apps are free for the first 3 months.
//                 </Text>
//                 <View style={styles.ctaOfferPill}>
//                   <Text style={styles.ctaOfferPillText}>
//                     Launch Offer • All Apps Free for the First 3 Months
//                   </Text>
//                 </View>
//                 <View style={styles.ctaButtons}>
//                   <HeaderButton title="Start Project" primary onPress={() => navigation.navigate('Contact')} />
//                   <HeaderButton title="Browse Apps"         onPress={() => navigation.navigate('Apps')} />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <CommonFooter />
//           </Animated.View>
//         </Animated.ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: { opacity: 0.92 },
//   cardPressed: { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea: { flex: 1, backgroundColor: '#141B27' },
//   pageBg: { flex: 1 },
//   container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: 'transparent' },
//   stickyHeaderWrap: { zIndex: 50, elevation: 20, marginBottom: 8 },
//   heroSection: { marginBottom: 10, position: 'relative' },
//   launchOfferBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginBottom: 12 },
//   launchOfferBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   heroBadge: { alignSelf: 'flex-start', color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
//   heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: -0.4, marginBottom: 12, maxWidth: '90%' },
//   heroSubtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: '400', lineHeight: 22, marginBottom: 18, maxWidth: '92%' },
//   heroOfferText: { color: '#67E6E8', fontSize: 14, fontWeight: '700', lineHeight: 22 },
//   heroButtons: { gap: 10, marginBottom: 18 },
//   headerButton: { minHeight: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, overflow: 'hidden' },
//   headerButtonCompact: { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
//   headerButtonPrimary: { backgroundColor: 'transparent' },
//   headerButtonPrimaryFill: { minHeight: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   headerButtonSecondary: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   headerButtonText: { fontSize: 14, fontWeight: '700' },
//   headerButtonTextPrimary: { color: '#12343A' },
//   headerButtonTextSecondary: { color: '#FFFFFF' },
//   metricRow: { minHeight: 64, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, overflow: 'hidden' },
//   metricItem: { flex: 1, alignItems: 'center' },
//   metricValue: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 3 },
//   metricLabel: { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   metricDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.10)' },
//   heroPreview: { borderRadius: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', height: Math.min(218, SCREEN_WIDTH * 0.55), marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.04)' },
//   heroPreviewImage: { width: '100%', height: '100%', backgroundColor: '#233044' },
//   heroPreviewPlaceholder: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   heroPreviewPlaceholderText: { fontSize: 32 },
//   heroPreviewOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.34)' },
//   heroPreviewContent: { position: 'absolute', left: 14, right: 14, bottom: 14, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10 },
//   heroPreviewTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
//   heroPreviewChip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
//   heroPreviewChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   heroPreviewOfferChip: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   heroPreviewOfferChipText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   heroPreviewTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   heroPreviewText: { color: 'rgba(255,255,255,0.78)', fontSize: 12, fontWeight: '400', lineHeight: 17 },
//   heroPreviewPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
//   heroPreviewOldPrice: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600', textDecorationLine: 'line-through' },
//   heroPreviewFreeText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },
//   trustStrip: { minHeight: 58, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 16, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
//   trustItem: { flex: 1, alignItems: 'center' },
//   trustValue: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   trustLabel: { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   trustDivider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.10)' },
//   highlightBlock: { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 16, marginBottom: 32, overflow: 'hidden' },
//   highlightTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
//   highlightBadge: { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
//   highlightMiniPill: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightMiniPillText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
//   highlightTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '800', lineHeight: 26, marginBottom: 8 },
//   highlightText: { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 14 },
//   offerBanner: { alignSelf: 'stretch', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16 },
//   offerBannerLabel: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
//   offerBannerText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 19 },
//   highlightTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
//   highlightTag: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightTagText: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
//   highlightBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
//   highlightPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 4 },
//   highlightPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   highlightOldPrice: { color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: '600', textDecorationLine: 'line-through' },
//   highlightFreePrice: { color: '#67E6E8', fontSize: 24, fontWeight: '800' },
//   highlightPriceSubtext: { color: 'rgba(255,255,255,0.72)', fontSize: 11, marginTop: 4, lineHeight: 16, maxWidth: 170 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
//   sectionHeaderLeft: { flex: 1, paddingRight: 12 },
//   sectionEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27 },
//   sectionAction: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
//   cardsRow: { paddingLeft: 18, paddingRight: 18, marginBottom: 32 },
//   appCardWrap: { marginRight: 14 },
//   appCard: { width: Math.min(258, SCREEN_WIDTH * 0.72), borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)' },
//   appImageWrap: { position: 'relative' },
//   appImage: { width: '100%', height: 160, backgroundColor: '#233044' },
//   appImagePlaceholder: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   appImagePlaceholderText: { fontSize: 32 },
//   appImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.14)' },
//   appContent: { padding: 14 },
//   appTopMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 },
//   appChip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   appChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   launchMiniBadge: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   launchMiniBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   appTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7, minHeight: 42 },
//   appDesc: { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '400', lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   appFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
//   priceBlock: { flex: 1, paddingRight: 10 },
//   appPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '400', marginBottom: 4 },
//   priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   appOldPrice: { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '600', textDecorationLine: 'line-through' },
//   appFreePrice: { color: '#67E6E8', fontSize: 20, fontWeight: '800' },
//   appPriceSubtext: { color: 'rgba(255,255,255,0.68)', fontSize: 10, marginTop: 4, lineHeight: 14 },
//   viewBtn: { minWidth: 76, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, overflow: 'hidden', shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   viewBtnText: { color: '#12343A', fontSize: 12, fontWeight: '700' },
//   valueBlock: { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 32, backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   valueTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27, marginBottom: 14 },
//   valueList: { gap: 14 },
//   valueItem: { flexDirection: 'row', alignItems: 'flex-start' },
//   valueDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 6, marginRight: 10 },
//   valueText: { flex: 1, color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20 },
//   ctaBlock: { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   ctaEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   ctaTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', lineHeight: 29, marginBottom: 10, maxWidth: '92%' },
//   ctaText: { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 16, maxWidth: '94%' },
//   ctaOfferPill: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16 },
//   ctaOfferPillText: { color: '#67E6E8', fontSize: 11, fontWeight: '800' },
//   ctaButtons: { gap: 10 },
//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.02)' },
//   cardTopShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.18)' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
// });


// import React, { useEffect, useMemo, useRef, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Image, Pressable, Animated, Easing, Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// function HeaderButton({ title, onPress, primary = false, compact = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.headerButton,
//         compact && styles.headerButtonCompact,
//         primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
//         pressed && styles.pressed,
//       ]}
//     >
//       {primary ? (
//         <LinearGradient
//           colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//           start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//           style={styles.headerButtonPrimaryFill}
//         >
//           <Text style={[styles.headerButtonText, styles.headerButtonTextPrimary]}>{title}</Text>
//         </LinearGradient>
//       ) : (
//         <Text style={[styles.headerButtonText, styles.headerButtonTextSecondary]}>{title}</Text>
//       )}
//     </Pressable>
//   );
// }

// function AppShowcaseCard({ item, onPress, animatedStyle }) {
//   const formattedPrice = item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : 'Free';

//   // ✅ Get primary image
//   const primaryImage = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls[0]
//     : item.imageUrl || null;

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable onPress={onPress} style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//           style={styles.appCard}
//         >
//           <View style={styles.cardGlassOverlay} />
//           <View style={styles.cardTopShine} />
//           <View style={styles.appImageWrap}>
//             {primaryImage ? (
//               <Image source={{ uri: primaryImage }} style={styles.appImage} resizeMode="cover" />
//             ) : (
//               <View style={[styles.appImage, styles.appImagePlaceholder]}>
//                 <Text style={styles.appImagePlaceholderText}>📷</Text>
//               </View>
//             )}
//             <View style={styles.appImageShade} />
//           </View>
//           <View style={styles.appContent}>
//             <View style={styles.appTopMetaRow}>
//               <View style={styles.appChip}><Text style={styles.appChipText}>{item.category}</Text></View>
//               <View style={styles.launchMiniBadge}><Text style={styles.launchMiniBadgeText}>Launch Offer</Text></View>
//             </View>
//             <Text style={styles.appTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.appDesc} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}><Text style={styles.offerStripText}>Free for the first 3 months</Text></View>
//             <View style={styles.appFooter}>
//               <View style={styles.priceBlock}>
//                 <Text style={styles.appPriceLabel}>Starting from</Text>
//                 <View style={styles.priceRow}>
//                   <Text style={styles.appOldPrice}>{formattedPrice}</Text>
//                   <Text style={styles.appFreePrice}>Free</Text>
//                 </View>
//                 <Text style={styles.appPriceSubtext}>Then standard pricing applies after 3 months</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewBtn}
//                 >
//                   <View style={styles.buttonTopShine} />
//                   <Text style={styles.viewBtnText}>View</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function HomeScreen({ navigation, route }) {
//   const { apps, refreshApps, lastRefresh } = useMarketplace();

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item.status || '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const featuredApps = approvedApps.slice(0, 3);
//   const heroApp      = featuredApps[0];

//   const heroFormattedPrice = heroApp?.price ? `₹${Number(heroApp.price).toLocaleString('en-IN')}` : 'Free';

//   // ✅ Hero primary image
//   const heroPrimaryImage = heroApp
//     ? (Array.isArray(heroApp.imageUrls) && heroApp.imageUrls.length > 0
//         ? heroApp.imageUrls[0]
//         : heroApp.imageUrl || null)
//     : null;

//   const user = useMemo(() =>
//     route?.params?.user || {
//       name: 'Guest User', fullName: 'Guest User',
//       email: 'guest@example.com', role: 'User',
//       phone: '', location: 'Hyderabad, India',
//       company: 'Apps Marketplace', department: 'Member',
//       bio: 'Welcome to your account.', image: null,
//     },
//   [route?.params?.user]);

//   // ✅ Refresh on focus — handles manual navigation
//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   // ✅ Also re-render when lastRefresh changes (admin approve triggers this instantly)
//   useEffect(() => {}, [lastRefresh]);

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const badgeAnim    = useRef(new Animated.Value(0)).current;
//   const titleAnim    = useRef(new Animated.Value(0)).current;
//   const subtitleAnim = useRef(new Animated.Value(0)).current;
//   const buttonsAnim  = useRef(new Animated.Value(0)).current;
//   const metricsAnim  = useRef(new Animated.Value(0)).current;
//   const previewAnim  = useRef(new Animated.Value(0)).current;
//   const trustAnim    = useRef(new Animated.Value(0)).current;
//   const highlightAnim= useRef(new Animated.Value(0)).current;
//   const sectionAnim  = useRef(new Animated.Value(0)).current;
//   const cardsAnim    = useMemo(() => featuredApps.map(() => new Animated.Value(0)), [featuredApps.length]);
//   const valueAnim    = useRef(new Animated.Value(0)).current;
//   const ctaAnim      = useRef(new Animated.Value(0)).current;
//   const previewFloat = useRef(new Animated.Value(0)).current;
//   const scrollY      = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerAnim,    { toValue: 1, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(badgeAnim,     { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(titleAnim,       { toValue: 1, duration: 480, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(subtitleAnim,    { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(buttonsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(metricsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(previewAnim,     { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(trustAnim,       { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(highlightAnim,   { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(sectionAnim,     { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(110, cardsAnim.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(valueAnim,       { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(ctaAnim,         { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     intro.start();

//     const floatLoop = Animated.loop(Animated.sequence([
//       Animated.timing(previewFloat, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//       Animated.timing(previewFloat, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//     ]));
//     floatLoop.start();

//     return () => { intro.stop(); floatLoop.stop(); };
//   }, [headerAnim, badgeAnim, titleAnim, subtitleAnim, buttonsAnim,
//       metricsAnim, previewAnim, trustAnim, highlightAnim, sectionAnim,
//       cardsAnim, valueAnim, ctaAnim, previewFloat]);

//   const headerScale      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.88],    extrapolate: 'clamp' });
//   const headerTranslateY = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -8],      extrapolate: 'clamp' });
//   const heroOpacity      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.02],    extrapolate: 'clamp' });
//   const heroTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -72],     extrapolate: 'clamp' });
//   const heroScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.9],     extrapolate: 'clamp' });
//   const pageTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -90],     extrapolate: 'clamp' });
//   const pageScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 1.04],    extrapolate: 'clamp' });
//   const heroImageScale   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1.06, 1.14], extrapolate: 'clamp' });

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
//     opacity: anim,
//     transform: [
//       { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) },
//       { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [fromScale, 1] }) },
//     ],
//   });

//   const previewAnimatedStyle = {
//     opacity: previewAnim,
//     transform: [
//       {
//         translateY: Animated.add(
//           previewAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }),
//           previewFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -4] })
//         ),
//       },
//       { scale: previewAnim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.pageBg}>
//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//           scrollEventThrottle={16}
//           stickyHeaderIndices={[0]}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//         >
//           {/* Sticky Header */}
//           <Animated.View style={[styles.stickyHeaderWrap, fadeUp(headerAnim, 10), {
//             transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//           }]}>
//             <CommonHeader
//               navigation={navigation}
//               title="Apps Marketplace" subtitle="Premium digital products"
//               showBack={false} rightLabel="Contact"
//               onNotificationPress={() => navigation.navigate('Notifications')}
//               onProfilePress={() => navigation.navigate('Profile', { user })}
//             />
//           </Animated.View>

//           {/* Hero Section */}
//           <Animated.View style={[styles.heroSection, {
//             opacity: heroOpacity,
//             transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
//           }]}>
//             <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
//               <Text style={styles.launchOfferBadgeText}>LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS</Text>
//             </Animated.View>

//             <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>PREMIUM APP MARKETPLACE</Animated.Text>
//             <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
//               Premium apps for{'\n'}modern businesses
//             </Animated.Text>
//             <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
//               Discover polished business applications, digital products, and custom software solutions.{'\n\n'}
//               <Text style={styles.heroOfferText}>All apps free for the first 3 months.</Text>
//             </Animated.Text>

//             <Animated.View style={fadeUp(buttonsAnim, 12)}>
//               <View style={styles.heroButtons}>
//                 <HeaderButton title="Explore Apps" primary onPress={() => navigation.navigate('Apps')} />
//                 <HeaderButton title="Upload App"   onPress={() => navigation.navigate('UploadApp')} />
//                 <HeaderButton title="Contact Us"   onPress={() => navigation.navigate('Contact')} />
//               </View>
//             </Animated.View>

//             <Animated.View style={fadeUp(metricsAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.metricRow}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>{approvedApps.length}+</Text>
//                   <Text style={styles.metricLabel}>Apps</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>10+</Text>
//                   <Text style={styles.metricLabel}>Industries</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>3 Months</Text>
//                   <Text style={styles.metricLabel}>Free Launch</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View style={{ transform: [{ translateY: pageTranslateY }, { scale: pageScale }] }}>

//             {/* Hero Preview Card */}
//             <Animated.View style={previewAnimatedStyle}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.heroPreview}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 {heroPrimaryImage ? (
//                   <Animated.Image
//                     source={{ uri: heroPrimaryImage }}
//                     style={[styles.heroPreviewImage, { transform: [{ scale: heroImageScale }] }]}
//                     resizeMode="cover"
//                   />
//                 ) : (
//                   <Animated.View style={[styles.heroPreviewImage, styles.heroPreviewPlaceholder, { transform: [{ scale: heroImageScale }] }]}>
//                     <Text style={styles.heroPreviewPlaceholderText}>📷</Text>
//                   </Animated.View>
//                 )}
//                 <View style={styles.heroPreviewOverlay} />
//                 <View style={styles.heroPreviewContent}>
//                   <View style={styles.heroPreviewTopRow}>
//                     <View style={styles.heroPreviewChip}><Text style={styles.heroPreviewChipText}>Featured Product</Text></View>
//                     <View style={styles.heroPreviewOfferChip}><Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text></View>
//                   </View>
//                   <Text style={styles.heroPreviewTitle}>{heroApp?.title || 'Premium Business App'}</Text>
//                   <Text style={styles.heroPreviewText} numberOfLines={2}>
//                     {heroApp?.description || 'Modern product presentation for your company apps.'}
//                   </Text>
//                   <View style={styles.heroPreviewPriceRow}>
//                     <Text style={styles.heroPreviewOldPrice}>{heroFormattedPrice}</Text>
//                     <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Trust Strip */}
//             <Animated.View style={fadeUp(trustAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.trustStrip}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>Trusted</Text><Text style={styles.trustLabel}>by growing teams</Text></View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>3 Months</Text><Text style={styles.trustLabel}>free launch period</Text></View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>Fast</Text><Text style={styles.trustLabel}>deployment</Text></View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Highlight Block */}
//             <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.highlightBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.highlightTopRow}>
//                   <View style={styles.highlightBadge}><Text style={styles.highlightBadgeText}>PREMIUM APP</Text></View>
//                   <View style={styles.highlightMiniPill}><Text style={styles.highlightMiniPillText}>Best Seller</Text></View>
//                 </View>
//                 <Text style={styles.highlightTitle}>{heroApp?.title || 'Premium Business Suite'}</Text>
//                 <Text style={styles.highlightText}>
//                   A flagship product in our catalog with advanced modules, cleaner business flows, and stronger customization potential.
//                 </Text>
//                 <View style={styles.offerBanner}>
//                   <Text style={styles.offerBannerLabel}>Launch Offer</Text>
//                   <Text style={styles.offerBannerText}>Free for the first 3 months on all app packages</Text>
//                 </View>
//                 <View style={styles.highlightTagsRow}>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Full Business Suite</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Most Requested</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Highly Customizable</Text></View>
//                 </View>
//                 <View style={styles.highlightBottomRow}>
//                   <View>
//                     <Text style={styles.highlightPriceLabel}>Premium Package</Text>
//                     <View style={styles.highlightPriceRow}>
//                       <Text style={styles.highlightOldPrice}>{heroFormattedPrice}</Text>
//                       <Text style={styles.highlightFreePrice}>Free</Text>
//                     </View>
//                     <Text style={styles.highlightPriceSubtext}>Free for 3 months, then standard pricing applies</Text>
//                   </View>
//                   <HeaderButton
//                     title="View Premium App" primary compact
//                     onPress={() => heroApp ? navigation.navigate('AppDetails', { app: heroApp, user }) : null}
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Featured Section Header */}
//             <Animated.View style={fadeUp(sectionAnim, 10)}>
//               <View style={styles.sectionHeader}>
//                 <View style={styles.sectionHeaderLeft}>
//                   <Text style={styles.sectionEyebrow}>FEATURED APPS</Text>
//                   <Text style={styles.sectionTitle}>Designed to sell better</Text>
//                 </View>
//                 <Pressable onPress={() => navigation.navigate('Apps')}>
//                   <Text style={styles.sectionAction}>See all</Text>
//                 </Pressable>
//               </View>
//             </Animated.View>

//             {/* Featured App Cards */}
//             <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
//               {featuredApps.map((item, index) => (
//                 <AppShowcaseCard
//                   key={item.id} item={item}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={scaleFade(cardsAnim[index], 14, 0.985)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             {/* Value Block */}
//             <Animated.View style={fadeUp(valueAnim, 12)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.valueBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
//                 <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>
//                 <View style={styles.valueList}>
//                   {['Premium marketplace presentation for your company apps',
//                     'Stronger buyer confidence with polished product sections and pricing',
//                     'Launch offer included: all apps free for the first 3 months',
//                   ].map((text, i) => (
//                     <View key={i} style={styles.valueItem}>
//                       <View style={styles.valueDot} />
//                       <Text style={styles.valueText}>{text}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* CTA Block */}
//             <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.ctaBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>
//                 <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>
//                 <Text style={styles.ctaText}>
//                   Build a cleaner, stronger catalog experience. Get started now — all apps free for the first 3 months.
//                 </Text>
//                 <View style={styles.ctaOfferPill}>
//                   <Text style={styles.ctaOfferPillText}>Launch Offer • All Apps Free for the First 3 Months</Text>
//                 </View>
//                 <View style={styles.ctaButtons}>
//                   <HeaderButton title="Start Project" primary onPress={() => navigation.navigate('Contact')} />
//                   <HeaderButton title="Browse Apps"         onPress={() => navigation.navigate('Apps')} />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <CommonFooter />
//           </Animated.View>
//         </Animated.ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: '#141B27' },
//   pageBg:        { flex: 1 },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: 'transparent' },
//   stickyHeaderWrap: { zIndex: 50, elevation: 20, marginBottom: 8 },
//   heroSection:   { marginBottom: 10, position: 'relative' },
//   launchOfferBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginBottom: 12 },
//   launchOfferBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   heroBadge:     { alignSelf: 'flex-start', color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
//   heroTitle:     { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: -0.4, marginBottom: 12, maxWidth: '90%' },
//   heroSubtitle:  { color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: '400', lineHeight: 22, marginBottom: 18, maxWidth: '92%' },
//   heroOfferText: { color: '#67E6E8', fontSize: 14, fontWeight: '700', lineHeight: 22 },
//   heroButtons:   { gap: 10, marginBottom: 18 },
//   headerButton:  { minHeight: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, overflow: 'hidden' },
//   headerButtonCompact: { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
//   headerButtonPrimary: { backgroundColor: 'transparent' },
//   headerButtonPrimaryFill: { minHeight: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   headerButtonSecondary: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   headerButtonText: { fontSize: 14, fontWeight: '700' },
//   headerButtonTextPrimary:   { color: '#12343A' },
//   headerButtonTextSecondary: { color: '#FFFFFF' },
//   metricRow:     { minHeight: 64, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, overflow: 'hidden' },
//   metricItem:    { flex: 1, alignItems: 'center' },
//   metricValue:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 3 },
//   metricLabel:   { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   metricDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.10)' },
//   heroPreview:   { borderRadius: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', height: Math.min(218, SCREEN_WIDTH * 0.55), marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.04)' },
//   heroPreviewImage:       { width: '100%', height: '100%', backgroundColor: '#233044' },
//   heroPreviewPlaceholder: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   heroPreviewPlaceholderText: { fontSize: 32 },
//   heroPreviewOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.34)' },
//   heroPreviewContent: { position: 'absolute', left: 14, right: 14, bottom: 14, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10 },
//   heroPreviewTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
//   heroPreviewChip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
//   heroPreviewChipText:{ color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   heroPreviewOfferChip:    { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   heroPreviewOfferChipText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   heroPreviewTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   heroPreviewText:  { color: 'rgba(255,255,255,0.78)', fontSize: 12, fontWeight: '400', lineHeight: 17 },
//   heroPreviewPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
//   heroPreviewOldPrice: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600', textDecorationLine: 'line-through' },
//   heroPreviewFreeText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },
//   trustStrip:    { minHeight: 58, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 16, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
//   trustItem:     { flex: 1, alignItems: 'center' },
//   trustValue:    { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   trustLabel:    { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   trustDivider:  { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.10)' },
//   highlightBlock:  { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 16, marginBottom: 32, overflow: 'hidden' },
//   highlightTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
//   highlightBadge:  { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightBadgeText:  { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
//   highlightMiniPill:   { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightMiniPillText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
//   highlightTitle:  { color: '#FFFFFF', fontSize: 21, fontWeight: '800', lineHeight: 26, marginBottom: 8 },
//   highlightText:   { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 14 },
//   offerBanner:     { alignSelf: 'stretch', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16 },
//   offerBannerLabel:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
//   offerBannerText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 19 },
//   highlightTagsRow:{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
//   highlightTag:    { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightTagText:{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
//   highlightBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
//   highlightPriceLabel:{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 4 },
//   highlightPriceRow:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   highlightOldPrice:  { color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: '600', textDecorationLine: 'line-through' },
//   highlightFreePrice: { color: '#67E6E8', fontSize: 24, fontWeight: '800' },
//   highlightPriceSubtext: { color: 'rgba(255,255,255,0.72)', fontSize: 11, marginTop: 4, lineHeight: 16, maxWidth: 170 },
//   sectionHeader:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
//   sectionHeaderLeft: { flex: 1, paddingRight: 12 },
//   sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:      { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27 },
//   sectionAction:     { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
//   cardsRow:      { paddingLeft: 18, paddingRight: 18, marginBottom: 32 },
//   appCardWrap:   { marginRight: 14 },
//   appCard:       { width: Math.min(258, SCREEN_WIDTH * 0.72), borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)' },
//   appImageWrap:  { position: 'relative' },
//   appImage:      { width: '100%', height: 160, backgroundColor: '#233044' },
//   appImagePlaceholder:    { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   appImagePlaceholderText:{ fontSize: 32 },
//   appImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.14)' },
//   appContent:    { padding: 14 },
//   appTopMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 },
//   appChip:       { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   appChipText:   { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   launchMiniBadge:    { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   launchMiniBadgeText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   appTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7, minHeight: 42 },
//   appDesc:       { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '400', lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   appFooter:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
//   priceBlock:    { flex: 1, paddingRight: 10 },
//   appPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '400', marginBottom: 4 },
//   priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   appOldPrice:   { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '600', textDecorationLine: 'line-through' },
//   appFreePrice:  { color: '#67E6E8', fontSize: 20, fontWeight: '800' },
//   appPriceSubtext:{ color: 'rgba(255,255,255,0.68)', fontSize: 10, marginTop: 4, lineHeight: 14 },
//   viewBtn:       { minWidth: 76, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, overflow: 'hidden', shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   viewBtnText:   { color: '#12343A', fontSize: 12, fontWeight: '700' },
//   valueBlock:    { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 32, backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   valueTitle:    { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27, marginBottom: 14 },
//   valueList:     { gap: 14 },
//   valueItem:     { flexDirection: 'row', alignItems: 'flex-start' },
//   valueDot:      { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 6, marginRight: 10 },
//   valueText:     { flex: 1, color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20 },
//   ctaBlock:      { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   ctaEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   ctaTitle:      { color: '#FFFFFF', fontSize: 23, fontWeight: '800', lineHeight: 29, marginBottom: 10, maxWidth: '92%' },
//   ctaText:       { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 16, maxWidth: '94%' },
//   ctaOfferPill:  { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16 },
//   ctaOfferPillText:{ color: '#67E6E8', fontSize: 11, fontWeight: '800' },
//   ctaButtons:    { gap: 10 },
//   cardGlassOverlay:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.02)' },
//   cardTopShine:  { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.18)' },
//   buttonTopShine:{ position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
// });

// import React, { useEffect, useMemo, useRef, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Image, Pressable, Animated, Easing, Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// function HeaderButton({ title, onPress, primary = false, compact = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.headerButton,
//         compact && styles.headerButtonCompact,
//         primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
//         pressed && styles.pressed,
//       ]}
//     >
//       {primary ? (
//         <LinearGradient
//           colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//           start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//           style={styles.headerButtonPrimaryFill}
//         >
//           <Text style={[styles.headerButtonText, styles.headerButtonTextPrimary]}>{title}</Text>
//         </LinearGradient>
//       ) : (
//         <Text style={[styles.headerButtonText, styles.headerButtonTextSecondary]}>{title}</Text>
//       )}
//     </Pressable>
//   );
// }

// function AppShowcaseCard({ item, onPress, animatedStyle }) {
//   const formattedPrice = item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : 'Free';

//   // ✅ Get primary image
//   const primaryImage = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls[0]
//     : item.imageUrl || null;

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable onPress={onPress} style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//           style={styles.appCard}
//         >
//           <View style={styles.cardGlassOverlay} />
//           <View style={styles.cardTopShine} />
//           <View style={styles.appImageWrap}>
//             {primaryImage ? (
//               <Image source={{ uri: primaryImage }} style={styles.appImage} resizeMode="cover" />
//             ) : (
//               <View style={[styles.appImage, styles.appImagePlaceholder]}>
//                 <Text style={styles.appImagePlaceholderText}>📷</Text>
//               </View>
//             )}
//             <View style={styles.appImageShade} />
//           </View>
//           <View style={styles.appContent}>
//             <View style={styles.appTopMetaRow}>
//               <View style={styles.appChip}><Text style={styles.appChipText}>{item.category}</Text></View>
//               <View style={styles.launchMiniBadge}><Text style={styles.launchMiniBadgeText}>Launch Offer</Text></View>
//             </View>
//             <Text style={styles.appTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.appDesc} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}><Text style={styles.offerStripText}>Free for the first 3 months</Text></View>
//             <View style={styles.appFooter}>
//               <View style={styles.priceBlock}>
//                 <Text style={styles.appPriceLabel}>Starting from</Text>
//                 <View style={styles.priceRow}>
//                   <Text style={styles.appOldPrice}>{formattedPrice}</Text>
//                   <Text style={styles.appFreePrice}>Free</Text>
//                 </View>
//                 <Text style={styles.appPriceSubtext}>Then standard pricing applies after 3 months</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewBtn}
//                 >
//                   <View style={styles.buttonTopShine} />
//                   <Text style={styles.viewBtnText}>View</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function HomeScreen({ navigation, route }) {
//   const { apps, refreshApps, lastRefresh } = useMarketplace();

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item.status || '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const featuredApps = approvedApps.slice(0, 3);
//   const heroApp      = featuredApps[0];

//   const heroFormattedPrice = heroApp?.price ? `₹${Number(heroApp.price).toLocaleString('en-IN')}` : 'Free';

//   // ✅ Hero primary image
//   const heroPrimaryImage = heroApp
//     ? (Array.isArray(heroApp.imageUrls) && heroApp.imageUrls.length > 0
//         ? heroApp.imageUrls[0]
//         : heroApp.imageUrl || null)
//     : null;

//   const user = useMemo(() =>
//     route?.params?.user || {
//       name: 'Guest User', fullName: 'Guest User',
//       email: 'guest@example.com', role: 'User',
//       phone: '', location: 'Hyderabad, India',
//       company: 'Apps Marketplace', department: 'Member',
//       bio: 'Welcome to your account.', image: null,
//     },
//   [route?.params?.user]);

//   // ✅ Refresh on focus — handles manual navigation
//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   // ✅ Also re-render when lastRefresh changes (admin approve triggers this instantly)
//   useEffect(() => {}, [lastRefresh]);

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const badgeAnim    = useRef(new Animated.Value(0)).current;
//   const titleAnim    = useRef(new Animated.Value(0)).current;
//   const subtitleAnim = useRef(new Animated.Value(0)).current;
//   const buttonsAnim  = useRef(new Animated.Value(0)).current;
//   const metricsAnim  = useRef(new Animated.Value(0)).current;
//   const previewAnim  = useRef(new Animated.Value(0)).current;
//   const trustAnim    = useRef(new Animated.Value(0)).current;
//   const highlightAnim= useRef(new Animated.Value(0)).current;
//   const sectionAnim  = useRef(new Animated.Value(0)).current;
//   const cardsAnim    = useMemo(() => featuredApps.map(() => new Animated.Value(0)), [featuredApps.length]);
//   const valueAnim    = useRef(new Animated.Value(0)).current;
//   const ctaAnim      = useRef(new Animated.Value(0)).current;
//   const previewFloat = useRef(new Animated.Value(0)).current;
//   const scrollY      = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerAnim,    { toValue: 1, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(badgeAnim,     { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(titleAnim,       { toValue: 1, duration: 480, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(subtitleAnim,    { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(buttonsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(metricsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(previewAnim,     { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(trustAnim,       { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(highlightAnim,   { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(sectionAnim,     { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(110, cardsAnim.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(valueAnim,       { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(ctaAnim,         { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     intro.start();

//     const floatLoop = Animated.loop(Animated.sequence([
//       Animated.timing(previewFloat, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//       Animated.timing(previewFloat, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//     ]));
//     floatLoop.start();

//     return () => { intro.stop(); floatLoop.stop(); };
//   }, [headerAnim, badgeAnim, titleAnim, subtitleAnim, buttonsAnim,
//       metricsAnim, previewAnim, trustAnim, highlightAnim, sectionAnim,
//       cardsAnim, valueAnim, ctaAnim, previewFloat]);

//   const headerScale      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.88],    extrapolate: 'clamp' });
//   const headerTranslateY = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -8],      extrapolate: 'clamp' });
//   const heroOpacity      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.02],    extrapolate: 'clamp' });
//   const heroTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -72],     extrapolate: 'clamp' });
//   const heroScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.9],     extrapolate: 'clamp' });
//   const pageTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -90],     extrapolate: 'clamp' });
//   const pageScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 1.04],    extrapolate: 'clamp' });
//   const heroImageScale   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1.06, 1.14], extrapolate: 'clamp' });

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
//     opacity: anim,
//     transform: [
//       { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) },
//       { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [fromScale, 1] }) },
//     ],
//   });

//   const previewAnimatedStyle = {
//     opacity: previewAnim,
//     transform: [
//       {
//         translateY: Animated.add(
//           previewAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }),
//           previewFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -4] })
//         ),
//       },
//       { scale: previewAnim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.pageBg}>
//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//           scrollEventThrottle={16}
//           stickyHeaderIndices={[0]}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//         >
//           {/* Sticky Header */}
//           <Animated.View style={[styles.stickyHeaderWrap, fadeUp(headerAnim, 10), {
//             transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//           }]}>
//             <CommonHeader
//               navigation={navigation}
//               title="Apps Marketplace" subtitle="Premium digital products"
//               showBack={false} rightLabel="Contact"
//               onNotificationPress={() => navigation.navigate('Notifications')}
//               onProfilePress={() => navigation.navigate('Profile', { user })}
//             />
//           </Animated.View>

//           {/* Hero Section */}
//           <Animated.View style={[styles.heroSection, {
//             opacity: heroOpacity,
//             transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
//           }]}>
//             <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
//               <Text style={styles.launchOfferBadgeText}>LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS</Text>
//             </Animated.View>

//             <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>PREMIUM APP MARKETPLACE</Animated.Text>
//             <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
//               Premium apps for{'\n'}modern businesses
//             </Animated.Text>
//             <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
//               Discover polished business applications, digital products, and custom software solutions.{'\n\n'}
//               <Text style={styles.heroOfferText}>All apps free for the first 3 months.</Text>
//             </Animated.Text>

//             <Animated.View style={fadeUp(buttonsAnim, 12)}>
//               <View style={styles.heroButtons}>
//                 <HeaderButton title="Explore Apps" primary onPress={() => navigation.navigate('Apps')} />
//                 <HeaderButton title="Upload App"   onPress={() => navigation.navigate('UploadApp')} />
//                 <HeaderButton title="Contact Us"   onPress={() => navigation.navigate('Contact')} />
//               </View>
//             </Animated.View>

//             <Animated.View style={fadeUp(metricsAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.metricRow}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>{approvedApps.length}+</Text>
//                   <Text style={styles.metricLabel}>Apps</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>10+</Text>
//                   <Text style={styles.metricLabel}>Industries</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>3 Months</Text>
//                   <Text style={styles.metricLabel}>Free Launch</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View style={{ transform: [{ translateY: pageTranslateY }, { scale: pageScale }] }}>

//             {/* Hero Preview Card */}
//             <Animated.View style={previewAnimatedStyle}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.heroPreview}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 {heroPrimaryImage ? (
//                   <Animated.Image
//                     source={{ uri: heroPrimaryImage }}
//                     style={[styles.heroPreviewImage, { transform: [{ scale: heroImageScale }] }]}
//                     resizeMode="cover"
//                   />
//                 ) : (
//                   <Animated.View style={[styles.heroPreviewImage, styles.heroPreviewPlaceholder, { transform: [{ scale: heroImageScale }] }]}>
//                     <Text style={styles.heroPreviewPlaceholderText}>📷</Text>
//                   </Animated.View>
//                 )}
//                 <View style={styles.heroPreviewOverlay} />
//                 <View style={styles.heroPreviewContent}>
//                   <View style={styles.heroPreviewTopRow}>
//                     <View style={styles.heroPreviewChip}><Text style={styles.heroPreviewChipText}>Featured Product</Text></View>
//                     <View style={styles.heroPreviewOfferChip}><Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text></View>
//                   </View>
//                   <Text style={styles.heroPreviewTitle}>{heroApp?.title || 'Premium Business App'}</Text>
//                   <Text style={styles.heroPreviewText} numberOfLines={2}>
//                     {heroApp?.description || 'Modern product presentation for your company apps.'}
//                   </Text>
//                   <View style={styles.heroPreviewPriceRow}>
//                     <Text style={styles.heroPreviewOldPrice}>{heroFormattedPrice}</Text>
//                     <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Trust Strip */}
//             <Animated.View style={fadeUp(trustAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.trustStrip}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>Trusted</Text><Text style={styles.trustLabel}>by growing teams</Text></View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>3 Months</Text><Text style={styles.trustLabel}>free launch period</Text></View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>Fast</Text><Text style={styles.trustLabel}>deployment</Text></View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Highlight Block */}
//             <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.highlightBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.highlightTopRow}>
//                   <View style={styles.highlightBadge}><Text style={styles.highlightBadgeText}>PREMIUM APP</Text></View>
//                   <View style={styles.highlightMiniPill}><Text style={styles.highlightMiniPillText}>Best Seller</Text></View>
//                 </View>
//                 <Text style={styles.highlightTitle}>{heroApp?.title || 'Premium Business Suite'}</Text>
//                 <Text style={styles.highlightText}>
//                   A flagship product in our catalog with advanced modules, cleaner business flows, and stronger customization potential.
//                 </Text>
//                 <View style={styles.offerBanner}>
//                   <Text style={styles.offerBannerLabel}>Launch Offer</Text>
//                   <Text style={styles.offerBannerText}>Free for the first 3 months on all app packages</Text>
//                 </View>
//                 <View style={styles.highlightTagsRow}>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Full Business Suite</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Most Requested</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Highly Customizable</Text></View>
//                 </View>
//                 <View style={styles.highlightBottomRow}>
//                   <View>
//                     <Text style={styles.highlightPriceLabel}>Premium Package</Text>
//                     <View style={styles.highlightPriceRow}>
//                       <Text style={styles.highlightOldPrice}>{heroFormattedPrice}</Text>
//                       <Text style={styles.highlightFreePrice}>Free</Text>
//                     </View>
//                     <Text style={styles.highlightPriceSubtext}>Free for 3 months, then standard pricing applies</Text>
//                   </View>
//                   <HeaderButton
//                     title="View Premium App" primary compact
//                     onPress={() => heroApp ? navigation.navigate('AppDetails', { app: heroApp, user }) : null}
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Featured Section Header */}
//             <Animated.View style={fadeUp(sectionAnim, 10)}>
//               <View style={styles.sectionHeader}>
//                 <View style={styles.sectionHeaderLeft}>
//                   <Text style={styles.sectionEyebrow}>FEATURED APPS</Text>
//                   <Text style={styles.sectionTitle}>Designed to sell better</Text>
//                 </View>
//                 <Pressable onPress={() => navigation.navigate('Apps')}>
//                   <Text style={styles.sectionAction}>See all</Text>
//                 </Pressable>
//               </View>
//             </Animated.View>

//             {/* Featured App Cards */}
//             <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
//               {featuredApps.map((item, index) => (
//                 <AppShowcaseCard
//                   key={item.id} item={item}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={scaleFade(cardsAnim[index], 14, 0.985)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             {/* Value Block */}
//             <Animated.View style={fadeUp(valueAnim, 12)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.valueBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
//                 <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>
//                 <View style={styles.valueList}>
//                   {['Premium marketplace presentation for your company apps',
//                     'Stronger buyer confidence with polished product sections and pricing',
//                     'Launch offer included: all apps free for the first 3 months',
//                   ].map((text, i) => (
//                     <View key={i} style={styles.valueItem}>
//                       <View style={styles.valueDot} />
//                       <Text style={styles.valueText}>{text}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* CTA Block */}
//             <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.ctaBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>
//                 <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>
//                 <Text style={styles.ctaText}>
//                   Build a cleaner, stronger catalog experience. Get started now — all apps free for the first 3 months.
//                 </Text>
//                 <View style={styles.ctaOfferPill}>
//                   <Text style={styles.ctaOfferPillText}>Launch Offer • All Apps Free for the First 3 Months</Text>
//                 </View>
//                 <View style={styles.ctaButtons}>
//                   <HeaderButton title="Start Project" primary onPress={() => navigation.navigate('Contact')} />
//                   <HeaderButton title="Browse Apps"         onPress={() => navigation.navigate('Apps')} />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <CommonFooter />
//           </Animated.View>
//         </Animated.ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: '#141B27' },
//   pageBg:        { flex: 1 },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: 'transparent' },
//   stickyHeaderWrap: { zIndex: 50, elevation: 20, marginBottom: 8 },
//   heroSection:   { marginBottom: 10, position: 'relative' },
//   launchOfferBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginBottom: 12 },
//   launchOfferBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   heroBadge:     { alignSelf: 'flex-start', color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
//   heroTitle:     { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: -0.4, marginBottom: 12, maxWidth: '90%' },
//   heroSubtitle:  { color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: '400', lineHeight: 22, marginBottom: 18, maxWidth: '92%' },
//   heroOfferText: { color: '#67E6E8', fontSize: 14, fontWeight: '700', lineHeight: 22 },
//   heroButtons:   { gap: 10, marginBottom: 18 },
//   headerButton:  { minHeight: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, overflow: 'hidden' },
//   headerButtonCompact: { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
//   headerButtonPrimary: { backgroundColor: 'transparent' },
//   headerButtonPrimaryFill: { minHeight: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   headerButtonSecondary: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   headerButtonText: { fontSize: 14, fontWeight: '700' },
//   headerButtonTextPrimary:   { color: '#12343A' },
//   headerButtonTextSecondary: { color: '#FFFFFF' },
//   metricRow:     { minHeight: 64, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, overflow: 'hidden' },
//   metricItem:    { flex: 1, alignItems: 'center' },
//   metricValue:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 3 },
//   metricLabel:   { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   metricDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.10)' },
//   heroPreview:   { borderRadius: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', height: Math.min(218, SCREEN_WIDTH * 0.55), marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.04)' },
//   heroPreviewImage:       { width: '100%', height: '100%', backgroundColor: '#233044' },
//   heroPreviewPlaceholder: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   heroPreviewPlaceholderText: { fontSize: 32 },
//   heroPreviewOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.34)' },
//   heroPreviewContent: { position: 'absolute', left: 14, right: 14, bottom: 14, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10 },
//   heroPreviewTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
//   heroPreviewChip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
//   heroPreviewChipText:{ color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   heroPreviewOfferChip:    { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   heroPreviewOfferChipText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   heroPreviewTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   heroPreviewText:  { color: 'rgba(255,255,255,0.78)', fontSize: 12, fontWeight: '400', lineHeight: 17 },
//   heroPreviewPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
//   heroPreviewOldPrice: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600', textDecorationLine: 'line-through' },
//   heroPreviewFreeText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },
//   trustStrip:    { minHeight: 58, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 16, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
//   trustItem:     { flex: 1, alignItems: 'center' },
//   trustValue:    { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   trustLabel:    { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   trustDivider:  { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.10)' },
//   highlightBlock:  { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 16, marginBottom: 32, overflow: 'hidden' },
//   highlightTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
//   highlightBadge:  { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightBadgeText:  { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
//   highlightMiniPill:   { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightMiniPillText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
//   highlightTitle:  { color: '#FFFFFF', fontSize: 21, fontWeight: '800', lineHeight: 26, marginBottom: 8 },
//   highlightText:   { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 14 },
//   offerBanner:     { alignSelf: 'stretch', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16 },
//   offerBannerLabel:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
//   offerBannerText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 19 },
//   highlightTagsRow:{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
//   highlightTag:    { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightTagText:{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
//   highlightBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
//   highlightPriceLabel:{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 4 },
//   highlightPriceRow:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   highlightOldPrice:  { color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: '600', textDecorationLine: 'line-through' },
//   highlightFreePrice: { color: '#67E6E8', fontSize: 24, fontWeight: '800' },
//   highlightPriceSubtext: { color: 'rgba(255,255,255,0.72)', fontSize: 11, marginTop: 4, lineHeight: 16, maxWidth: 170 },
//   sectionHeader:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
//   sectionHeaderLeft: { flex: 1, paddingRight: 12 },
//   sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:      { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27 },
//   sectionAction:     { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
//   cardsRow:      { paddingLeft: 18, paddingRight: 18, marginBottom: 32 },
//   appCardWrap:   { marginRight: 14 },
//   appCard:       { width: Math.min(258, SCREEN_WIDTH * 0.72), borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)' },
//   appImageWrap:  { position: 'relative' },
//   appImage:      { width: '100%', height: 160, backgroundColor: '#233044' },
//   appImagePlaceholder:    { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   appImagePlaceholderText:{ fontSize: 32 },
//   appImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.14)' },
//   appContent:    { padding: 14 },
//   appTopMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 },
//   appChip:       { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   appChipText:   { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   launchMiniBadge:    { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   launchMiniBadgeText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   appTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7, minHeight: 42 },
//   appDesc:       { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '400', lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   appFooter:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
//   priceBlock:    { flex: 1, paddingRight: 10 },
//   appPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '400', marginBottom: 4 },
//   priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   appOldPrice:   { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '600', textDecorationLine: 'line-through' },
//   appFreePrice:  { color: '#67E6E8', fontSize: 20, fontWeight: '800' },
//   appPriceSubtext:{ color: 'rgba(255,255,255,0.68)', fontSize: 10, marginTop: 4, lineHeight: 14 },
//   viewBtn:       { minWidth: 76, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, overflow: 'hidden', shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   viewBtnText:   { color: '#12343A', fontSize: 12, fontWeight: '700' },
//   valueBlock:    { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 32, backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   valueTitle:    { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27, marginBottom: 14 },
//   valueList:     { gap: 14 },
//   valueItem:     { flexDirection: 'row', alignItems: 'flex-start' },
//   valueDot:      { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 6, marginRight: 10 },
//   valueText:     { flex: 1, color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20 },
//   ctaBlock:      { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   ctaEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   ctaTitle:      { color: '#FFFFFF', fontSize: 23, fontWeight: '800', lineHeight: 29, marginBottom: 10, maxWidth: '92%' },
//   ctaText:       { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 16, maxWidth: '94%' },
//   ctaOfferPill:  { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16 },
//   ctaOfferPillText:{ color: '#67E6E8', fontSize: 11, fontWeight: '800' },
//   ctaButtons:    { gap: 10 },
//   cardGlassOverlay:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.02)' },
//   cardTopShine:  { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.18)' },
//   buttonTopShine:{ position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
// });

// import React, { useEffect, useMemo, useRef, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import SharedImageCarousel from '../components/SharedImageCarousel'; // ✅

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// // Card width for the horizontal featured row
// const CARD_W     = Math.min(268, SCREEN_WIDTH * 0.72);
// const CARD_SPACE = 14;

// // ── Header CTA Button ─────────────────────────────────────────
// function HeaderButton({ title, onPress, primary = false, compact = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.headerButton,
//         compact && styles.headerButtonCompact,
//         primary ? styles.headerButtonPrimary : styles.headerButtonSecondary,
//         pressed && styles.pressed,
//       ]}
//     >
//       {primary ? (
//         <LinearGradient
//           colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//           start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//           style={styles.headerButtonPrimaryFill}
//         >
//           <Text style={[styles.headerButtonText, styles.headerButtonTextPrimary]}>{title}</Text>
//         </LinearGradient>
//       ) : (
//         <Text style={[styles.headerButtonText, styles.headerButtonTextSecondary]}>{title}</Text>
//       )}
//     </Pressable>
//   );
// }

// // ── App Showcase Card — with SharedImageCarousel ──────────────
// function AppShowcaseCard({ item, onPress, animatedStyle }) {
//   const formattedPrice = item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : 'Free';

//   // All images for carousel
//   const images = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls
//     : item.imageUrl ? [item.imageUrl] : [];

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable onPress={onPress} style={({ pressed }) => [styles.appCardWrap, pressed && styles.cardPressed]}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//           style={styles.appCard}
//         >
//           <View style={styles.cardGlassOverlay} />
//           <View style={styles.cardTopShine} />

//           {/* ✅ SharedImageCarousel — arrows + dots */}
//           <View style={styles.appImageWrap}>
//             <SharedImageCarousel images={images} width={CARD_W} height={160} />
//             <View style={styles.appImageShade} pointerEvents="none" />
//           </View>

//           <View style={styles.appContent}>
//             <View style={styles.appTopMetaRow}>
//               <View style={styles.appChip}><Text style={styles.appChipText}>{item.category}</Text></View>
//               <View style={styles.launchMiniBadge}><Text style={styles.launchMiniBadgeText}>Launch Offer</Text></View>
//             </View>
//             <Text style={styles.appTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.appDesc} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}><Text style={styles.offerStripText}>Free for the first 3 months</Text></View>
//             <View style={styles.appFooter}>
//               <View style={styles.priceBlock}>
//                 <Text style={styles.appPriceLabel}>Starting from</Text>
//                 <View style={styles.priceRow}>
//                   <Text style={styles.appOldPrice}>{formattedPrice}</Text>
//                   <Text style={styles.appFreePrice}>Free</Text>
//                 </View>
//                 <Text style={styles.appPriceSubtext}>Then standard pricing applies after 3 months</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewBtn}
//                 >
//                   <View style={styles.buttonTopShine} />
//                   <Text style={styles.viewBtnText}>View</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// // ── Main Screen ───────────────────────────────────────────────
// export default function HomeScreen({ navigation, route }) {
//   const { apps, refreshApps, lastRefresh } = useMarketplace();

//   // ✅ All approved apps — not just first 3
//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item.status || '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   // Hero = first approved app
//   const heroApp             = approvedApps[0] || null;
//   const heroFormattedPrice  = heroApp?.price ? `₹${Number(heroApp.price).toLocaleString('en-IN')}` : 'Free';

//   // ✅ Hero carousel images
//   const heroImages = heroApp
//     ? (Array.isArray(heroApp.imageUrls) && heroApp.imageUrls.length > 0
//         ? heroApp.imageUrls
//         : heroApp.imageUrl ? [heroApp.imageUrl] : [])
//     : [];

//   const user = useMemo(() =>
//     route?.params?.user || {
//       name: 'Guest User', fullName: 'Guest User',
//       email: 'guest@example.com', role: 'User',
//       phone: '', location: 'Hyderabad, India',
//       company: 'Apps Marketplace', department: 'Member',
//       bio: 'Welcome to your account.', image: null,
//     },
//   [route?.params?.user]);

//   // ✅ Refresh on focus (manual nav) — real-time after admin approve
//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   // ✅ Re-render on lastRefresh (instant context update from admin approve)
//   useEffect(() => {}, [lastRefresh]);

//   // ── Animations ────────────────────────────────────────────
//   const headerAnim    = useRef(new Animated.Value(0)).current;
//   const badgeAnim     = useRef(new Animated.Value(0)).current;
//   const titleAnim     = useRef(new Animated.Value(0)).current;
//   const subtitleAnim  = useRef(new Animated.Value(0)).current;
//   const buttonsAnim   = useRef(new Animated.Value(0)).current;
//   const metricsAnim   = useRef(new Animated.Value(0)).current;
//   const previewAnim   = useRef(new Animated.Value(0)).current;
//   const trustAnim     = useRef(new Animated.Value(0)).current;
//   const highlightAnim = useRef(new Animated.Value(0)).current;
//   const sectionAnim   = useRef(new Animated.Value(0)).current;
//   const valueAnim     = useRef(new Animated.Value(0)).current;
//   const ctaAnim       = useRef(new Animated.Value(0)).current;
//   const previewFloat  = useRef(new Animated.Value(0)).current;
//   const scrollY       = useRef(new Animated.Value(0)).current;

//   // ✅ Card anims — one per approved app (not just 3)
//   const cardsAnim = useMemo(
//     () => approvedApps.map(() => new Animated.Value(0)),
//     [approvedApps.length]
//   );

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerAnim,    { toValue: 1, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(badgeAnim,     { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(titleAnim,       { toValue: 1, duration: 480, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(subtitleAnim,    { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(buttonsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(metricsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(previewAnim,     { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(trustAnim,       { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(highlightAnim,   { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(sectionAnim,     { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(110, cardsAnim.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(valueAnim,       { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(ctaAnim,         { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     intro.start();

//     const floatLoop = Animated.loop(Animated.sequence([
//       Animated.timing(previewFloat, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//       Animated.timing(previewFloat, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//     ]));
//     floatLoop.start();

//     return () => { intro.stop(); floatLoop.stop(); };
//   }, [headerAnim, badgeAnim, titleAnim, subtitleAnim, buttonsAnim,
//       metricsAnim, previewAnim, trustAnim, highlightAnim, sectionAnim,
//       cardsAnim, valueAnim, ctaAnim, previewFloat]);

//   const headerScale      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.88],    extrapolate: 'clamp' });
//   const headerTranslateY = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -8],      extrapolate: 'clamp' });
//   const heroOpacity      = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.02],    extrapolate: 'clamp' });
//   const heroTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -72],     extrapolate: 'clamp' });
//   const heroScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 0.9],     extrapolate: 'clamp' });
//   const pageTranslateY   = scrollY.interpolate({ inputRange: [0, 220], outputRange: [0, -90],     extrapolate: 'clamp' });
//   const pageScale        = scrollY.interpolate({ inputRange: [0, 220], outputRange: [1, 1.04],    extrapolate: 'clamp' });

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const scaleFade = (anim, distance = 18, fromScale = 0.97) => ({
//     opacity: anim,
//     transform: [
//       { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) },
//       { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [fromScale, 1] }) },
//     ],
//   });

//   const previewAnimatedStyle = {
//     opacity: previewAnim,
//     transform: [
//       {
//         translateY: Animated.add(
//           previewAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }),
//           previewFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -4] })
//         ),
//       },
//       { scale: previewAnim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.pageBg}>
//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//           scrollEventThrottle={16}
//           stickyHeaderIndices={[0]}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//         >
//           {/* Sticky Header */}
//           <Animated.View style={[styles.stickyHeaderWrap, fadeUp(headerAnim, 10), {
//             transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
//           }]}>
//             <CommonHeader
//               navigation={navigation}
//               title="Apps Marketplace" subtitle="Premium digital products"
//               showBack={false} rightLabel="Contact"
//               onNotificationPress={() => navigation.navigate('Notifications')}
//               onProfilePress={() => navigation.navigate('Profile', { user })}
//             />
//           </Animated.View>

//           {/* ── Hero Section ── */}
//           <Animated.View style={[styles.heroSection, {
//             opacity: heroOpacity,
//             transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
//           }]}>
//             <Animated.View style={[styles.launchOfferBadge, fadeUp(badgeAnim, 10)]}>
//               <Text style={styles.launchOfferBadgeText}>LAUNCH OFFER • ALL APPS FREE FOR 3 MONTHS</Text>
//             </Animated.View>

//             <Animated.Text style={[styles.heroBadge, fadeUp(badgeAnim, 10)]}>PREMIUM APP MARKETPLACE</Animated.Text>
//             <Animated.Text style={[styles.heroTitle, fadeUp(titleAnim, 14)]}>
//               Premium apps for{'\n'}modern businesses
//             </Animated.Text>
//             <Animated.Text style={[styles.heroSubtitle, fadeUp(subtitleAnim, 12)]}>
//               Discover polished business applications, digital products, and custom software solutions.{'\n\n'}
//               <Text style={styles.heroOfferText}>All apps free for the first 3 months.</Text>
//             </Animated.Text>

//             <Animated.View style={fadeUp(buttonsAnim, 12)}>
//               <View style={styles.heroButtons}>
//                 <HeaderButton title="Explore Apps" primary onPress={() => navigation.navigate('Apps')} />
//                 <HeaderButton title="Upload App"   onPress={() => navigation.navigate('UploadApp')} />
//                 <HeaderButton title="Contact Us"   onPress={() => navigation.navigate('Contact')} />
//               </View>
//             </Animated.View>

//             <Animated.View style={fadeUp(metricsAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.metricRow}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.metricItem}>
//                   {/* ✅ Live count from context */}
//                   <Text style={styles.metricValue}>{approvedApps.length}+</Text>
//                   <Text style={styles.metricLabel}>Apps</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>10+</Text>
//                   <Text style={styles.metricLabel}>Industries</Text>
//                 </View>
//                 <View style={styles.metricDivider} />
//                 <View style={styles.metricItem}>
//                   <Text style={styles.metricValue}>3 Months</Text>
//                   <Text style={styles.metricLabel}>Free Launch</Text>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View style={{ transform: [{ translateY: pageTranslateY }, { scale: pageScale }] }}>

//             {/* ── Hero Preview Card — SharedImageCarousel ── */}
//             <Animated.View style={previewAnimatedStyle}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.heroPreview}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />

//                 {/* ✅ Carousel for hero — full width */}
//                 <SharedImageCarousel
//                   images={heroImages}
//                   width={SCREEN_WIDTH - 36}
//                   height={Math.min(218, SCREEN_WIDTH * 0.55)}
//                 />
//                 <View style={styles.heroPreviewOverlay} pointerEvents="none" />

//                 <View style={styles.heroPreviewContent}>
//                   <View style={styles.heroPreviewTopRow}>
//                     <View style={styles.heroPreviewChip}><Text style={styles.heroPreviewChipText}>Featured Product</Text></View>
//                     <View style={styles.heroPreviewOfferChip}><Text style={styles.heroPreviewOfferChipText}>Launch Offer</Text></View>
//                   </View>
//                   <Text style={styles.heroPreviewTitle}>{heroApp?.title || 'Premium Business App'}</Text>
//                   <Text style={styles.heroPreviewText} numberOfLines={2}>
//                     {heroApp?.description || 'Modern product presentation for your company apps.'}
//                   </Text>
//                   <View style={styles.heroPreviewPriceRow}>
//                     <Text style={styles.heroPreviewOldPrice}>{heroFormattedPrice}</Text>
//                     <Text style={styles.heroPreviewFreeText}>Free for 3 months</Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Trust Strip */}
//             <Animated.View style={fadeUp(trustAnim, 10)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.trustStrip}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>Trusted</Text><Text style={styles.trustLabel}>by growing teams</Text></View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>3 Months</Text><Text style={styles.trustLabel}>free launch period</Text></View>
//                 <View style={styles.trustDivider} />
//                 <View style={styles.trustItem}><Text style={styles.trustValue}>Fast</Text><Text style={styles.trustLabel}>deployment</Text></View>
//               </LinearGradient>
//             </Animated.View>

//             {/* Highlight Block */}
//             <Animated.View style={scaleFade(highlightAnim, 14, 0.985)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.highlightBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <View style={styles.highlightTopRow}>
//                   <View style={styles.highlightBadge}><Text style={styles.highlightBadgeText}>PREMIUM APP</Text></View>
//                   <View style={styles.highlightMiniPill}><Text style={styles.highlightMiniPillText}>Best Seller</Text></View>
//                 </View>
//                 <Text style={styles.highlightTitle}>{heroApp?.title || 'Premium Business Suite'}</Text>
//                 <Text style={styles.highlightText}>
//                   A flagship product in our catalog with advanced modules, cleaner business flows, and stronger customization potential.
//                 </Text>
//                 <View style={styles.offerBanner}>
//                   <Text style={styles.offerBannerLabel}>Launch Offer</Text>
//                   <Text style={styles.offerBannerText}>Free for the first 3 months on all app packages</Text>
//                 </View>
//                 <View style={styles.highlightTagsRow}>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Full Business Suite</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Most Requested</Text></View>
//                   <View style={styles.highlightTag}><Text style={styles.highlightTagText}>Highly Customizable</Text></View>
//                 </View>
//                 <View style={styles.highlightBottomRow}>
//                   <View>
//                     <Text style={styles.highlightPriceLabel}>Premium Package</Text>
//                     <View style={styles.highlightPriceRow}>
//                       <Text style={styles.highlightOldPrice}>{heroFormattedPrice}</Text>
//                       <Text style={styles.highlightFreePrice}>Free</Text>
//                     </View>
//                     <Text style={styles.highlightPriceSubtext}>Free for 3 months, then standard pricing applies</Text>
//                   </View>
//                   <HeaderButton
//                     title="View Premium App" primary compact
//                     onPress={() => heroApp ? navigation.navigate('AppDetails', { app: heroApp, user }) : null}
//                   />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* ✅ Featured Section — ALL approved apps with carousel */}
//             <Animated.View style={fadeUp(sectionAnim, 10)}>
//               <View style={styles.sectionHeader}>
//                 <View style={styles.sectionHeaderLeft}>
//                   <Text style={styles.sectionEyebrow}>ALL APPS</Text>
//                   <Text style={styles.sectionTitle}>
//                     {approvedApps.length > 0
//                       ? `${approvedApps.length} solution${approvedApps.length !== 1 ? 's' : ''} available`
//                       : 'Designed to sell better'}
//                   </Text>
//                 </View>
//                 <Pressable onPress={() => navigation.navigate('Apps')}>
//                   <Text style={styles.sectionAction}>See all</Text>
//                 </Pressable>
//               </View>
//             </Animated.View>

//             {/* ✅ Horizontal scroll — ALL approved apps, each with carousel */}
//             {approvedApps.length > 0 ? (
//               <Animated.ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.cardsRow}
//               >
//                 {approvedApps.map((item, index) => (
//                   <AppShowcaseCard
//                     key={item.id}
//                     item={item}
//                     onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                     animatedStyle={scaleFade(cardsAnim[index] || new Animated.Value(1), 14, 0.985)}
//                   />
//                 ))}
//               </Animated.ScrollView>
//             ) : (
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.emptyAppsCard}
//               >
//                 <Text style={styles.emptyAppsText}>No approved apps yet.</Text>
//                 <Text style={styles.emptyAppsSubtext}>Check back soon — new apps are reviewed daily.</Text>
//               </LinearGradient>
//             )}

//             {/* Value Block */}
//             <Animated.View style={fadeUp(valueAnim, 12)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.valueBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.sectionEyebrow}>WHY CHOOSE US</Text>
//                 <Text style={styles.valueTitle}>Modern, professional, and business-focused</Text>
//                 <View style={styles.valueList}>
//                   {['Premium marketplace presentation for your company apps',
//                     'Stronger buyer confidence with polished product sections and pricing',
//                     'Launch offer included: all apps free for the first 3 months',
//                   ].map((text, i) => (
//                     <View key={i} style={styles.valueItem}>
//                       <View style={styles.valueDot} />
//                       <Text style={styles.valueText}>{text}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             {/* CTA Block */}
//             <Animated.View style={scaleFade(ctaAnim, 14, 0.99)}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
//                 style={styles.ctaBlock}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.cardTopShine} />
//                 <Text style={styles.ctaEyebrow}>START YOUR SHOWCASE</Text>
//                 <Text style={styles.ctaTitle}>Need a more refined marketplace?</Text>
//                 <Text style={styles.ctaText}>
//                   Build a cleaner, stronger catalog experience. Get started now — all apps free for the first 3 months.
//                 </Text>
//                 <View style={styles.ctaOfferPill}>
//                   <Text style={styles.ctaOfferPillText}>Launch Offer • All Apps Free for the First 3 Months</Text>
//                 </View>
//                 <View style={styles.ctaButtons}>
//                   <HeaderButton title="Start Project" primary onPress={() => navigation.navigate('Contact')} />
//                   <HeaderButton title="Browse Apps"         onPress={() => navigation.navigate('Apps')} />
//                 </View>
//               </LinearGradient>
//             </Animated.View>

//             <CommonFooter />
//           </Animated.View>
//         </Animated.ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: '#141B27' },
//   pageBg:        { flex: 1 },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: 'transparent' },
//   stickyHeaderWrap: { zIndex: 50, elevation: 20, marginBottom: 8 },
//   heroSection:   { marginBottom: 10, position: 'relative' },
//   launchOfferBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginBottom: 12 },
//   launchOfferBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   heroBadge:     { alignSelf: 'flex-start', color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
//   heroTitle:     { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: -0.4, marginBottom: 12, maxWidth: '90%' },
//   heroSubtitle:  { color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: '400', lineHeight: 22, marginBottom: 18, maxWidth: '92%' },
//   heroOfferText: { color: '#67E6E8', fontSize: 14, fontWeight: '700', lineHeight: 22 },
//   heroButtons:   { gap: 10, marginBottom: 18 },
//   headerButton:  { minHeight: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, overflow: 'hidden' },
//   headerButtonCompact: { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
//   headerButtonPrimary: { backgroundColor: 'transparent' },
//   headerButtonPrimaryFill: { minHeight: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   headerButtonSecondary: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   headerButtonText: { fontSize: 14, fontWeight: '700' },
//   headerButtonTextPrimary:   { color: '#12343A' },
//   headerButtonTextSecondary: { color: '#FFFFFF' },
//   metricRow:     { minHeight: 64, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, overflow: 'hidden' },
//   metricItem:    { flex: 1, alignItems: 'center' },
//   metricValue:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 3 },
//   metricLabel:   { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   metricDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.10)' },

//   // ── Hero Preview (with SharedImageCarousel) ──
//   heroPreview:   { borderRadius: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.04)' },
//   heroPreviewOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.18)' },
//   heroPreviewContent: { paddingHorizontal: 14, paddingBottom: 14, paddingTop: 10, backgroundColor: 'rgba(255,255,255,0.06)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
//   heroPreviewTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
//   heroPreviewChip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
//   heroPreviewChipText:{ color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   heroPreviewOfferChip:    { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   heroPreviewOfferChipText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   heroPreviewTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   heroPreviewText:  { color: 'rgba(255,255,255,0.78)', fontSize: 12, fontWeight: '400', lineHeight: 17 },
//   heroPreviewPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
//   heroPreviewOldPrice: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600', textDecorationLine: 'line-through' },
//   heroPreviewFreeText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },

//   trustStrip:    { minHeight: 58, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 16, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
//   trustItem:     { flex: 1, alignItems: 'center' },
//   trustValue:    { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   trustLabel:    { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
//   trustDivider:  { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.10)' },
//   highlightBlock:  { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 16, marginBottom: 32, overflow: 'hidden' },
//   highlightTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
//   highlightBadge:  { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightBadgeText:  { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
//   highlightMiniPill:   { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightMiniPillText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
//   highlightTitle:  { color: '#FFFFFF', fontSize: 21, fontWeight: '800', lineHeight: 26, marginBottom: 8 },
//   highlightText:   { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 14 },
//   offerBanner:     { alignSelf: 'stretch', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16 },
//   offerBannerLabel:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
//   offerBannerText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 19 },
//   highlightTagsRow:{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
//   highlightTag:    { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   highlightTagText:{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
//   highlightBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
//   highlightPriceLabel:{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 4 },
//   highlightPriceRow:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   highlightOldPrice:  { color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: '600', textDecorationLine: 'line-through' },
//   highlightFreePrice: { color: '#67E6E8', fontSize: 24, fontWeight: '800' },
//   highlightPriceSubtext: { color: 'rgba(255,255,255,0.72)', fontSize: 11, marginTop: 4, lineHeight: 16, maxWidth: 170 },

//   sectionHeader:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
//   sectionHeaderLeft: { flex: 1, paddingRight: 12 },
//   sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:      { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27 },
//   sectionAction:     { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // ── App cards ──
//   cardsRow:      { paddingLeft: 18, paddingRight: 18, marginBottom: 32 },
//   appCardWrap:   { marginRight: CARD_SPACE },
//   appCard:       { width: CARD_W, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)' },
//   appImageWrap:  { position: 'relative' },
//   appImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.10)' },
//   appContent:    { padding: 14 },
//   appTopMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 },
//   appChip:       { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   appChipText:   { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   launchMiniBadge:    { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   launchMiniBadgeText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   appTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7, minHeight: 42 },
//   appDesc:       { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '400', lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   appFooter:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
//   priceBlock:    { flex: 1, paddingRight: 10 },
//   appPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '400', marginBottom: 4 },
//   priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   appOldPrice:   { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '600', textDecorationLine: 'line-through' },
//   appFreePrice:  { color: '#67E6E8', fontSize: 20, fontWeight: '800' },
//   appPriceSubtext:{ color: 'rgba(255,255,255,0.68)', fontSize: 10, marginTop: 4, lineHeight: 14 },
//   viewBtn:       { minWidth: 76, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, overflow: 'hidden', shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
//   viewBtnText:   { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   // Empty state
//   emptyAppsCard:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 32, paddingHorizontal: 20, alignItems: 'center', marginBottom: 32 },
//   emptyAppsText:    { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 6 },
//   emptyAppsSubtext: { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center' },

//   valueBlock:    { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 32, backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   valueTitle:    { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27, marginBottom: 14 },
//   valueList:     { gap: 14 },
//   valueItem:     { flexDirection: 'row', alignItems: 'flex-start' },
//   valueDot:      { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 6, marginRight: 10 },
//   valueText:     { flex: 1, color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20 },
//   ctaBlock:      { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
//   ctaEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   ctaTitle:      { color: '#FFFFFF', fontSize: 23, fontWeight: '800', lineHeight: 29, marginBottom: 10, maxWidth: '92%' },
//   ctaText:       { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 16, maxWidth: '94%' },
//   ctaOfferPill:  { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16 },
//   ctaOfferPillText:{ color: '#67E6E8', fontSize: 11, fontWeight: '800' },
//   ctaButtons:    { gap: 10 },
//   cardGlassOverlay:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.02)' },
//   cardTopShine:  { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.18)' },
//   buttonTopShine:{ position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
// });


import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  Pressable, Animated, Easing, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../theme';
import { useMarketplace } from '../context/MarketplaceContext';
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
          style={styles.headerButtonPrimaryFill}
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
            {/* ✅ SharedImageCarousel — arrows + dots */}
            <SharedImageCarousel images={images} width={CARD_W} height={160} />
            <View style={styles.appImageShade} pointerEvents="none" />
          </View>

          <View style={styles.appContent}>
            <View style={styles.appTopMetaRow}>
              <View style={styles.appChip}><Text style={styles.appChipText}>{item.category}</Text></View>
              <View style={styles.launchMiniBadge}><Text style={styles.launchMiniBadgeText}>Launch Offer</Text></View>
            </View>
            <Text style={styles.appTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.appDesc} numberOfLines={3}>{item.description}</Text>
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

  // ✅ All approved apps
  const approvedApps = useMemo(() => {
    return (apps || []).filter(item =>
      String(item.status || '').trim().toLowerCase() === 'approved'
    );
  }, [apps]);

  // Hero = first approved app
  const heroApp            = approvedApps[0] || null;
  const heroFormattedPrice = heroApp?.price ? `₹${Number(heroApp.price).toLocaleString('en-IN')}` : 'Free';

  // ✅ Hero carousel images — latest hero app ki images
  const heroImages = heroApp
    ? (Array.isArray(heroApp.imageUrls) && heroApp.imageUrls.length > 0
        ? heroApp.imageUrls
        : heroApp.imageUrl ? [heroApp.imageUrl] : [])
    : [];

  const user = useMemo(() =>
    route?.params?.user || {
      name: 'Guest User', fullName: 'Guest User',
      email: 'guest@example.com', role: 'User',
      phone: '', location: 'Hyderabad, India',
      company: 'Apps Marketplace', department: 'Member',
      bio: 'Welcome to your account.', image: null,
    },
  [route?.params?.user]);

  // ✅ Refresh on focus
  useFocusEffect(
    useCallback(() => {
      if (refreshApps) refreshApps();
    }, [refreshApps])
  );

  useEffect(() => {}, [lastRefresh]);

  // ── Animations ────────────────────────────────────────────
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

  // ✅ Card anims — one per approved app
  const cardsAnim = useMemo(
    () => approvedApps.map(() => new Animated.Value(0)),
    [approvedApps.length]
  );

  useEffect(() => {
    const intro = Animated.sequence([
      Animated.parallel([
        Animated.timing(headerAnim,    { toValue: 1, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(badgeAnim,     { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.timing(titleAnim,       { toValue: 1, duration: 480, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(subtitleAnim,    { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(buttonsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(metricsAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(previewAnim,     { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(trustAnim,       { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(highlightAnim,   { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(sectionAnim,     { toValue: 1, duration: 340, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.stagger(110, cardsAnim.map(a =>
        Animated.timing(a, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      )),
      Animated.timing(valueAnim,       { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(ctaAnim,         { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]);
    intro.start();

    const floatLoop = Animated.loop(Animated.sequence([
      Animated.timing(previewFloat, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(previewFloat, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    floatLoop.start();

    return () => { intro.stop(); floatLoop.stop(); };
  }, [headerAnim, badgeAnim, titleAnim, subtitleAnim, buttonsAnim,
      metricsAnim, previewAnim, trustAnim, highlightAnim, sectionAnim,
      cardsAnim, valueAnim, ctaAnim, previewFloat]);

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

  // ✅ Helper — navigate to AppDetails with allApps always passed
  const goToDetails = (app) => {
    navigation.navigate('AppDetails', {
      app,
      user,
      allApps: approvedApps, // ✅ real Firebase apps — related section కి
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141B27" />
      <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.pageBg}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          scrollEventThrottle={16}
          stickyHeaderIndices={[0]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {/* ── Sticky Header ── */}
          <Animated.View style={[styles.stickyHeaderWrap, fadeUp(headerAnim, 10), {
            transform: [{ translateY: headerTranslateY }, { scale: headerScale }],
          }]}>
            <CommonHeader
              navigation={navigation}
              title="Apps Marketplace" subtitle="Premium digital products"
              showBack={false} rightLabel="Contact"
              onNotificationPress={() => navigation.navigate('Notifications')}
              onProfilePress={() => navigation.navigate('Profile', { user })}
            />
          </Animated.View>

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
                  {/* ✅ Live count from context */}
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

            {/* ── Hero Preview Card ── ✅ latest hero app images */}
            <Animated.View style={previewAnimatedStyle}>
              <LinearGradient
                colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)']}
                style={styles.heroPreview}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.cardTopShine} />

                {/* ✅ Hero app carousel — full width, latest images */}
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

            {/* ── Highlight Block ── ✅ heroApp tap → AppDetails with allApps */}
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
                  {/* ✅ heroApp tap → AppDetails with allApps */}
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

            {/* ✅ ALL approved apps — each card tap → AppDetails with allApps */}
            {approvedApps.length > 0 ? (
              <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsRow}
              >
                {approvedApps.map((item, index) => (
                  <AppShowcaseCard
                    key={item.id}
                    item={item}
                    onPress={() => goToDetails(item)} // ✅ allApps always passed
                    animatedStyle={scaleFade(cardsAnim[index] || new Animated.Value(1), 14, 0.985)}
                  />
                ))}
              </Animated.ScrollView>
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
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
  safeArea:      { flex: 1, backgroundColor: '#141B27' },
  pageBg:        { flex: 1 },
  container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: 'transparent' },
  stickyHeaderWrap: { zIndex: 50, elevation: 20, marginBottom: 8 },
  heroSection:   { marginBottom: 10, position: 'relative' },

  launchOfferBadge:     { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginBottom: 12 },
  launchOfferBadgeText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  heroBadge:     { alignSelf: 'flex-start', color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
  heroTitle:     { color: '#FFFFFF', fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: -0.4, marginBottom: 12, maxWidth: '90%' },
  heroSubtitle:  { color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: '400', lineHeight: 22, marginBottom: 18, maxWidth: '92%' },
  heroOfferText: { color: '#67E6E8', fontSize: 14, fontWeight: '700', lineHeight: 22 },
  heroButtons:   { gap: 10, marginBottom: 18 },

  headerButton:         { minHeight: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, overflow: 'hidden' },
  headerButtonCompact:  { minHeight: 38, borderRadius: 12, paddingHorizontal: 12 },
  headerButtonPrimary:  { backgroundColor: 'transparent' },
  headerButtonPrimaryFill: { minHeight: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
  headerButtonSecondary:{ backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
  headerButtonText:     { fontSize: 14, fontWeight: '700' },
  headerButtonTextPrimary:   { color: '#12343A' },
  headerButtonTextSecondary: { color: '#FFFFFF' },

  metricRow:     { minHeight: 64, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, overflow: 'hidden' },
  metricItem:    { flex: 1, alignItems: 'center' },
  metricValue:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 3 },
  metricLabel:   { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
  metricDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.10)' },

  heroPreview:         { borderRadius: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.04)' },
  heroPreviewOverlay:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.18)' },
  heroPreviewContent:  { paddingHorizontal: 14, paddingBottom: 14, paddingTop: 10, backgroundColor: 'rgba(255,255,255,0.06)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  heroPreviewTopRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
  heroPreviewChip:     { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
  heroPreviewChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
  heroPreviewOfferChip:     { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  heroPreviewOfferChipText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  heroPreviewTitle:    { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
  heroPreviewText:     { color: 'rgba(255,255,255,0.78)', fontSize: 12, fontWeight: '400', lineHeight: 17 },
  heroPreviewPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  heroPreviewOldPrice: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600', textDecorationLine: 'line-through' },
  heroPreviewFreeText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },

  trustStrip:    { minHeight: 58, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 16, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
  trustItem:     { flex: 1, alignItems: 'center' },
  trustValue:    { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  trustLabel:    { color: 'rgba(255,255,255,0.60)', fontSize: 10, fontWeight: '500' },
  trustDivider:  { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.10)' },

  highlightBlock:   { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 16, marginBottom: 32, overflow: 'hidden' },
  highlightTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 },
  highlightBadge:   { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  highlightBadgeText:   { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  highlightMiniPill:    { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  highlightMiniPillText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
  highlightTitle:   { color: '#FFFFFF', fontSize: 21, fontWeight: '800', lineHeight: 26, marginBottom: 8 },
  highlightText:    { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 14 },
  offerBanner:      { alignSelf: 'stretch', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16 },
  offerBannerLabel: { color: '#67E6E8', fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 4, textTransform: 'uppercase' },
  offerBannerText:  { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 19 },
  highlightTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  highlightTag:     { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  highlightTagText: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
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
  appChip:       { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  appChipText:   { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
  launchMiniBadge:     { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  launchMiniBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  appTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7, minHeight: 42 },
  appDesc:       { color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: '400', lineHeight: 18, marginBottom: 12, minHeight: 54 },
  offerStrip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
  offerStripText:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
  appFooter:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  priceBlock:    { flex: 1, paddingRight: 10 },
  appPriceLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '400', marginBottom: 4 },
  priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appOldPrice:   { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '600', textDecorationLine: 'line-through' },
  appFreePrice:  { color: '#67E6E8', fontSize: 20, fontWeight: '800' },
  appPriceSubtext:{ color: 'rgba(255,255,255,0.68)', fontSize: 10, marginTop: 4, lineHeight: 14 },
  viewBtn:       { minWidth: 76, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, overflow: 'hidden', shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
  viewBtnText:   { color: '#12343A', fontSize: 12, fontWeight: '700' },

  emptyAppsCard:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 32, paddingHorizontal: 20, alignItems: 'center', marginBottom: 32 },
  emptyAppsText:    { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  emptyAppsSubtext: { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center' },

  valueBlock:    { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', marginBottom: 32, backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
  valueTitle:    { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 27, marginBottom: 14 },
  valueList:     { gap: 14 },
  valueItem:     { flexDirection: 'row', alignItems: 'flex-start' },
  valueDot:      { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 6, marginRight: 10 },
  valueText:     { flex: 1, color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20 },

  ctaBlock:      { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden' },
  ctaEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  ctaTitle:      { color: '#FFFFFF', fontSize: 23, fontWeight: '800', lineHeight: 29, marginBottom: 10, maxWidth: '92%' },
  ctaText:       { color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: '400', lineHeight: 20, marginBottom: 16, maxWidth: '94%' },
  ctaOfferPill:  { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.26)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16 },
  ctaOfferPillText: { color: '#67E6E8', fontSize: 11, fontWeight: '800' },
  ctaButtons:    { gap: 10 },

  cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.02)' },
  cardTopShine:     { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.18)' },
  buttonTopShine:   { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
});