// // import React, { useEffect, useMemo, useRef, useState } from 'react';
// // import {
// //   SafeAreaView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   View,
// //   Pressable,
// //   Image,
// //   Animated,
// //   Easing,
// //   ScrollView,
// //   Share,
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { COLORS } from '../theme';
// // import { appsData } from '../data/appsData';
// // import CommonFooter from '../components/CommonFooter';

// // const SAVED_APPS_KEY = 'sat_saved_apps';

// // function InfoChip({ label, primary = false }) {
// //   return (
// //     <View style={[styles.infoChip, primary && styles.infoChipPrimary]}>
// //       <Text style={[styles.infoChipText, primary && styles.infoChipTextPrimary]}>
// //         {label}
// //       </Text>
// //     </View>
// //   );
// // }

// // function ActionButton({ title, onPress, primary = false }) {
// //   return (
// //     <Pressable
// //       onPress={onPress}
// //       style={({ pressed }) => [pressed && styles.buttonPressed]}
// //     >
// //       <LinearGradient
// //         colors={
// //           primary
// //             ? [COLORS.primarySoft, COLORS.primary]
// //             : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
// //         }
// //         style={[
// //           styles.actionButton,
// //           !primary && styles.actionButtonSecondary,
// //         ]}
// //       >
// //         <Text
// //           style={[
// //             styles.actionButtonText,
// //             primary ? styles.actionButtonTextPrimary : styles.actionButtonTextSecondary,
// //           ]}
// //         >
// //           {title}
// //         </Text>
// //       </LinearGradient>
// //     </Pressable>
// //   );
// // }

// // function FeatureItem({ title, text }) {
// //   return (
// //     <View style={styles.featureItem}>
// //       <View style={styles.featureDot} />
// //       <View style={styles.featureTextWrap}>
// //         <Text style={styles.featureTitle}>{title}</Text>
// //         <Text style={styles.featureText}>{text}</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // function RelatedAppCard({ item, onPress }) {
// //   return (
// //     <Pressable
// //       onPress={onPress}
// //       style={({ pressed }) => [styles.relatedCardWrap, pressed && styles.pressed]}
// //     >
// //       <LinearGradient
// //         colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
// //         style={styles.relatedCard}
// //       >
// //         <Image source={item.image} style={styles.relatedImage} resizeMode="cover" />
// //         <View style={styles.relatedBody}>
// //           <View style={styles.relatedChip}>
// //             <Text style={styles.relatedChipText}>{item.category}</Text>
// //           </View>
// //           <Text style={styles.relatedTitle} numberOfLines={2}>
// //             {item.title}
// //           </Text>
// //           <Text style={styles.relatedPrice}>{item.price}</Text>
// //         </View>
// //       </LinearGradient>
// //     </Pressable>
// //   );
// // }

// // export default function AppDetailsScreen({ navigation, route }) {
// //   const passedApp = route?.params?.app;
// //   const app = passedApp || appsData[0];

// //   const [saved, setSaved] = useState(false);
// //   const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

// //   const heroAnim = useRef(new Animated.Value(0)).current;
// //   const contentAnim = useRef(new Animated.Value(0)).current;
// //   const sectionAnim = useRef(new Animated.Value(0)).current;
// //   const ctaAnim = useRef(new Animated.Value(0)).current;
// //   const footerAnim = useRef(new Animated.Value(0)).current;

// //   const galleryImages = useMemo(() => {
// //     if (Array.isArray(app.gallery) && app.gallery.length > 0) {
// //       return app.gallery;
// //     }
// //     return [app.image];
// //   }, [app.gallery, app.image]);

// //   useEffect(() => {
// //     const sequence = Animated.sequence([
// //       Animated.timing(heroAnim, {
// //         toValue: 1,
// //         duration: 420,
// //         easing: Easing.out(Easing.cubic),
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(contentAnim, {
// //         toValue: 1,
// //         duration: 380,
// //         easing: Easing.out(Easing.cubic),
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(sectionAnim, {
// //         toValue: 1,
// //         duration: 380,
// //         easing: Easing.out(Easing.cubic),
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(ctaAnim, {
// //         toValue: 1,
// //         duration: 380,
// //         easing: Easing.out(Easing.cubic),
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(footerAnim, {
// //         toValue: 1,
// //         duration: 340,
// //         easing: Easing.out(Easing.cubic),
// //         useNativeDriver: true,
// //       }),
// //     ]);

// //     sequence.start();
// //     return () => sequence.stop();
// //   }, [heroAnim, contentAnim, sectionAnim, ctaAnim, footerAnim]);

// //   useEffect(() => {
// //     const loadSavedState = async () => {
// //       try {
// //         const raw = await AsyncStorage.getItem(SAVED_APPS_KEY);
// //         const parsed = raw ? JSON.parse(raw) : [];
// //         setSaved(Array.isArray(parsed) && parsed.includes(app.id));
// //       } catch (error) {
// //         console.warn('Failed to load saved apps', error);
// //       }
// //     };

// //     loadSavedState();
// //   }, [app.id]);

// //   useEffect(() => {
// //     setActiveGalleryIndex(0);
// //   }, [app.id]);

// //   const fadeUp = (anim, distance = 16) => ({
// //     opacity: anim,
// //     transform: [
// //       {
// //         translateY: anim.interpolate({
// //           inputRange: [0, 1],
// //           outputRange: [distance, 0],
// //         }),
// //       },
// //     ],
// //   });

// //   const features = useMemo(
// //     () => [
// //       {
// //         title: 'Premium UI/UX',
// //         text: 'Clean, modern interface designed for strong visual impact and better user engagement.',
// //       },
// //       {
// //         title: 'Business Ready Modules',
// //         text: 'Structured flows for operations, management, tracking, communication, and admin control.',
// //       },
// //       {
// //         title: 'Customizable Build',
// //         text: 'Can be adapted to your exact business workflow, brand, and required functionality.',
// //       },
// //       {
// //         title: 'Web & Mobile Ready',
// //         text: 'Suitable for mobile-first apps and scalable product ecosystems with admin panels.',
// //       },
// //     ],
// //     []
// //   );

// //   const relatedApps = useMemo(
// //     () => appsData.filter((item) => item.id !== app.id).slice(0, 3),
// //     [app.id]
// //   );

// //   const toggleSaved = async () => {
// //     try {
// //       const raw = await AsyncStorage.getItem(SAVED_APPS_KEY);
// //       const parsed = raw ? JSON.parse(raw) : [];
// //       const savedIds = Array.isArray(parsed) ? parsed : [];

// //       let nextIds;
// //       let nextSaved;
// //       if (savedIds.includes(app.id)) {
// //         nextIds = savedIds.filter((id) => id !== app.id);
// //         nextSaved = false;
// //       } else {
// //         nextIds = [...savedIds, app.id];
// //         nextSaved = true;
// //       }

// //       await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds));
// //       setSaved(nextSaved);
// //     } catch (error) {
// //       console.warn('Failed to save app', error);
// //     }
// //   };

// //   const handleShare = async () => {
// //     try {
// //       await Share.share({
// //         title: app.title,
// //         message: `${app.title}\n${app.description}\nStarting from ${app.price}\nExplore more with Sat Apps.`,
// //       });
// //     } catch (error) {
// //       console.warn('Share failed', error);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

// //       <View style={styles.screenWrap}>
// //         <ScrollView
// //           showsVerticalScrollIndicator={false}
// //           contentContainerStyle={styles.container}
// //         >
// //           <View style={styles.topBar}>
// //             <Pressable
// //               onPress={() => navigation.goBack()}
// //               style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
// //             >
// //               <Text style={styles.iconButtonText}>Back</Text>
// //             </Pressable>

// //             <Text style={styles.topBarTitle}>App Details</Text>

// //             <View style={styles.topActions}>
// //               <Pressable
// //                 onPress={toggleSaved}
// //                 style={({ pressed }) => [
// //                   styles.smallTopButton,
// //                   saved && styles.smallTopButtonActive,
// //                   pressed && styles.pressed,
// //                 ]}
// //               >
// //                 <Text
// //                   style={[
// //                     styles.smallTopButtonText,
// //                     saved && styles.smallTopButtonTextActive,
// //                   ]}
// //                 >
// //                   {saved ? 'Saved' : 'Save'}
// //                 </Text>
// //               </Pressable>

// //               <Pressable
// //                 onPress={handleShare}
// //                 style={({ pressed }) => [styles.smallTopButton, pressed && styles.pressed]}
// //               >
// //                 <Text style={styles.smallTopButtonText}>Share</Text>
// //               </Pressable>
// //             </View>
// //           </View>

// //           <Animated.View style={fadeUp(heroAnim, 16)}>
// //             <LinearGradient
// //               colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
// //               style={styles.heroCard}
// //             >
// //               <Image
// //                 source={galleryImages[activeGalleryIndex]}
// //                 style={styles.heroImage}
// //                 resizeMode="cover"
// //               />
// //               <View style={styles.heroOverlay} />

// //               <View style={styles.heroContent}>
// //                 <View style={styles.heroBadgeRow}>
// //                   <InfoChip label={app.category} primary />
// //                   <InfoChip label="Best Seller" />
// //                 </View>

// //                 <Text style={styles.appTitle}>{app.title}</Text>
// //                 <Text style={styles.appDescription}>{app.description}</Text>

// //                 <View style={styles.heroBottomRow}>
// //                   <View>
// //                     <Text style={styles.priceLabel}>Starting from</Text>
// //                     <Text style={styles.priceValue}>{app.price}</Text>
// //                   </View>

// //                   <View style={styles.heroMeta}>
// //                     <Text style={styles.heroMetaText}>Web & Mobile</Text>
// //                     <Text style={styles.heroMetaDivider}>•</Text>
// //                     <Text style={styles.heroMetaText}>Customizable</Text>
// //                   </View>
// //                 </View>
// //               </View>
// //             </LinearGradient>
// //           </Animated.View>

// //           {galleryImages.length > 1 ? (
// //             <Animated.View style={fadeUp(contentAnim, 10)}>
// //               <ScrollView
// //                 horizontal
// //                 showsHorizontalScrollIndicator={false}
// //                 contentContainerStyle={styles.galleryThumbRow}
// //               >
// //                 {galleryImages.map((image, index) => (
// //                   <Pressable
// //                     key={`gallery-${index}`}
// //                     onPress={() => setActiveGalleryIndex(index)}
// //                     style={({ pressed }) => [
// //                       styles.galleryThumbWrap,
// //                       index === activeGalleryIndex && styles.galleryThumbWrapActive,
// //                       pressed && styles.pressed,
// //                     ]}
// //                   >
// //                     <Image source={image} style={styles.galleryThumb} resizeMode="cover" />
// //                   </Pressable>
// //                 ))}
// //               </ScrollView>
// //             </Animated.View>
// //           ) : null}

// //           <Animated.View style={fadeUp(contentAnim, 12)}>
// //             <LinearGradient
// //               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
// //               style={styles.trustStrip}
// //             >
// //               <View style={styles.trustItem}>
// //                 <Text style={styles.trustValue}>Demo</Text>
// //                 <Text style={styles.trustLabel}>Available</Text>
// //               </View>
// //               <View style={styles.trustDivider} />
// //               <View style={styles.trustItem}>
// //                 <Text style={styles.trustValue}>Custom</Text>
// //                 <Text style={styles.trustLabel}>Build</Text>
// //               </View>
// //               <View style={styles.trustDivider} />
// //               <View style={styles.trustItem}>
// //                 <Text style={styles.trustValue}>Fast</Text>
// //                 <Text style={styles.trustLabel}>Delivery</Text>
// //               </View>
// //             </LinearGradient>
// //           </Animated.View>

// //           <Animated.View style={fadeUp(contentAnim, 14)}>
// //             <LinearGradient
// //               colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
// //               style={styles.summaryBlock}
// //             >
// //               <Text style={styles.sectionEyebrow}>OVERVIEW</Text>
// //               <Text style={styles.sectionTitle}>Built for strong business presentation</Text>
// //               <Text style={styles.summaryText}>
// //                 {app.title} is designed as a premium digital product that can be positioned
// //                 for real business use, product demos, client delivery, or marketplace sales.
// //                 It combines clean presentation, strong functional structure, and room for
// //                 future expansion.
// //               </Text>

// //               <View style={styles.chipsWrap}>
// //                 <InfoChip label="Custom UI" />
// //                 <InfoChip label="Scalable Modules" />
// //                 <InfoChip label="Admin Ready" />
// //                 <InfoChip label="Premium Branding" />
// //               </View>
// //             </LinearGradient>
// //           </Animated.View>

// //           <Animated.View style={fadeUp(sectionAnim, 14)}>
// //             <LinearGradient
// //               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
// //               style={styles.featuresBlock}
// //             >
// //               <Text style={styles.sectionEyebrow}>FEATURE HIGHLIGHTS</Text>
// //               <Text style={styles.sectionTitle}>What this product includes</Text>

// //               <View style={styles.featuresList}>
// //                 {features.map((feature) => (
// //                   <FeatureItem
// //                     key={feature.title}
// //                     title={feature.title}
// //                     text={feature.text}
// //                   />
// //                 ))}
// //               </View>
// //             </LinearGradient>
// //           </Animated.View>

// //           <Animated.View style={fadeUp(sectionAnim, 12)}>
// //             <View style={styles.dualRow}>
// //               <LinearGradient
// //                 colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
// //                 style={styles.infoCard}
// //               >
// //                 <Text style={styles.sectionEyebrow}>DELIVERY</Text>
// //                 <Text style={styles.infoCardTitle}>What you can expect</Text>
// //                 <Text style={styles.infoCardText}>
// //                   Product setup, premium interface, customizable flow structure, and support
// //                   for adapting the app to your exact business use case.
// //                 </Text>
// //               </LinearGradient>

// //               <LinearGradient
// //                 colors={['rgba(184,122,86,0.12)', 'rgba(255,255,255,0.02)']}
// //                 style={styles.infoCard}
// //               >
// //                 <Text style={styles.sectionEyebrow}>IDEAL FOR</Text>
// //                 <Text style={styles.infoCardTitle}>Teams and businesses</Text>
// //                 <Text style={styles.infoCardText}>
// //                   Suitable for companies looking to launch, showcase, sell, or scale their
// //                   digital products with a more premium product experience.
// //                 </Text>
// //               </LinearGradient>
// //             </View>
// //           </Animated.View>

// //           {relatedApps.length > 0 ? (
// //             <Animated.View style={fadeUp(sectionAnim, 12)}>
// //               <View style={styles.relatedHeader}>
// //                 <View>
// //                   <Text style={styles.sectionEyebrow}>RELATED APPS</Text>
// //                   <Text style={styles.sectionTitle}>You may also like</Text>
// //                 </View>
// //               </View>

// //               <ScrollView
// //                 horizontal
// //                 showsHorizontalScrollIndicator={false}
// //                 contentContainerStyle={styles.relatedRow}
// //               >
// //                 {relatedApps.map((item) => (
// //                   <RelatedAppCard
// //                     key={item.id}
// //                     item={item}
// //                     onPress={() => navigation.push('AppDetails', { app: item })}
// //                   />
// //                 ))}
// //               </ScrollView>
// //             </Animated.View>
// //           ) : null}

// //           <Animated.View style={fadeUp(ctaAnim, 14)}>
// //             <LinearGradient
// //               colors={['rgba(20,20,22,0.96)', 'rgba(20,20,22,0.88)']}
// //               style={styles.ctaBlock}
// //             >
// //               <Text style={styles.ctaEyebrow}>NEXT STEP</Text>
// //               <Text style={styles.ctaTitle}>Want this app customized for your business?</Text>
// //               <Text style={styles.ctaText}>
// //                 Contact us for a tailored version, product consultation, or demo flow.
// //               </Text>

// //               <View style={styles.ctaButtons}>
// //                 <ActionButton
// //                   title="Request Demo"
// //                   primary
// //                   onPress={() => navigation.navigate('Contact', { app })}
// //                 />
// //                 <ActionButton
// //                   title="Contact Us"
// //                   onPress={() => navigation.navigate('Contact', { app })}
// //                 />
// //               </View>
// //             </LinearGradient>
// //           </Animated.View>

// //           <Animated.View style={fadeUp(footerAnim, 14)}>
// //             <CommonFooter navigation={navigation} />
// //           </Animated.View>

// //           <View style={styles.bottomSpacer} />
// //         </ScrollView>

// //         <View style={styles.stickyBar}>
// //           <Pressable
// //             onPress={() => navigation.navigate('Contact', { app })}
// //             style={({ pressed }) => [styles.stickyButtonWrap, pressed && styles.buttonPressed]}
// //           >
// //             <LinearGradient
// //               colors={[COLORS.primarySoft, COLORS.primary]}
// //               style={styles.stickyButton}
// //             >
// //               <Text style={styles.stickyButtonText}>Request Demo</Text>
// //             </LinearGradient>
// //           </Pressable>
// //         </View>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   pressed: {
// //     opacity: 0.92,
// //   },
// //   buttonPressed: {
// //     opacity: 0.9,
// //     transform: [{ scale: 0.97 }],
// //   },

// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: COLORS.background,
// //   },
// //   screenWrap: {
// //     flex: 1,
// //     backgroundColor: COLORS.background,
// //   },
// //   container: {
// //     paddingHorizontal: 18,
// //     paddingTop: 10,
// //     paddingBottom: 110,
// //     backgroundColor: COLORS.background,
// //   },

// //   topBar: {
// //     minHeight: 58,
// //     borderRadius: 18,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     backgroundColor: 'rgba(20,20,22,0.88)',
// //     paddingHorizontal: 14,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 18,
// //   },
// //   topBarTitle: {
// //     color: COLORS.textPrimary,
// //     fontSize: 16,
// //     fontWeight: '800',
// //   },
// //   topActions: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 8,
// //   },
// //   iconButton: {
// //     minWidth: 64,
// //     minHeight: 36,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: 'rgba(255,255,255,0.05)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //   },
// //   iconButtonText: {
// //     color: COLORS.textPrimary,
// //     fontSize: 12,
// //     fontWeight: '700',
// //   },
// //   smallTopButton: {
// //     minWidth: 58,
// //     minHeight: 36,
// //     borderRadius: 12,
// //     paddingHorizontal: 10,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: 'rgba(255,255,255,0.05)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //   },
// //   smallTopButtonActive: {
// //     backgroundColor: 'rgba(184,122,86,0.16)',
// //     borderColor: COLORS.borderHighlight,
// //   },
// //   smallTopButtonText: {
// //     color: COLORS.textPrimary,
// //     fontSize: 11,
// //     fontWeight: '700',
// //   },
// //   smallTopButtonTextActive: {
// //     color: COLORS.primary,
// //   },

// //   heroCard: {
// //     borderRadius: 24,
// //     overflow: 'hidden',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     marginBottom: 16,
// //   },
// //   heroImage: {
// //     width: '100%',
// //     height: 260,
// //     backgroundColor: COLORS.elevated,
// //   },
// //   heroOverlay: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: 'rgba(10,12,16,0.28)',
// //   },
// //   heroContent: {
// //     position: 'absolute',
// //     left: 14,
// //     right: 14,
// //     bottom: 14,
// //     backgroundColor: 'rgba(20,20,22,0.56)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     borderRadius: 18,
// //     padding: 14,
// //   },
// //   heroBadgeRow: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     gap: 8,
// //     marginBottom: 10,
// //   },

// //   galleryThumbRow: {
// //     paddingBottom: 6,
// //     marginBottom: 12,
// //   },
// //   galleryThumbWrap: {
// //     width: 86,
// //     height: 62,
// //     borderRadius: 14,
// //     overflow: 'hidden',
// //     marginRight: 10,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //   },
// //   galleryThumbWrapActive: {
// //     borderColor: COLORS.borderHighlight,
// //     borderWidth: 1.4,
// //   },
// //   galleryThumb: {
// //     width: '100%',
// //     height: '100%',
// //     backgroundColor: COLORS.elevated,
// //   },

// //   appTitle: {
// //     color: COLORS.textPrimary,
// //     fontSize: 24,
// //     fontWeight: '800',
// //     lineHeight: 30,
// //     marginBottom: 8,
// //   },
// //   appDescription: {
// //     color: COLORS.textSecondary,
// //     fontSize: 13,
// //     lineHeight: 20,
// //     marginBottom: 14,
// //   },
// //   heroBottomRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-end',
// //     gap: 12,
// //   },
// //   priceLabel: {
// //     color: COLORS.textMuted,
// //     fontSize: 11,
// //     marginBottom: 4,
// //   },
// //   priceValue: {
// //     color: COLORS.primary,
// //     fontSize: 22,
// //     fontWeight: '800',
// //   },
// //   heroMeta: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   heroMetaText: {
// //     color: COLORS.textPrimary,
// //     fontSize: 11,
// //     fontWeight: '600',
// //   },
// //   heroMetaDivider: {
// //     color: COLORS.textMuted,
// //     marginHorizontal: 6,
// //     fontSize: 10,
// //   },

// //   trustStrip: {
// //     minHeight: 62,
// //     borderRadius: 18,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.07)',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 10,
// //     marginBottom: 16,
// //   },
// //   trustItem: {
// //     flex: 1,
// //     alignItems: 'center',
// //   },
// //   trustValue: {
// //     color: COLORS.textPrimary,
// //     fontSize: 13,
// //     fontWeight: '800',
// //     marginBottom: 2,
// //   },
// //   trustLabel: {
// //     color: COLORS.textMuted,
// //     fontSize: 10,
// //     fontWeight: '500',
// //   },
// //   trustDivider: {
// //     width: 1,
// //     height: 24,
// //     backgroundColor: COLORS.border,
// //   },

// //   summaryBlock: {
// //     borderRadius: 22,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     padding: 16,
// //     marginBottom: 16,
// //   },
// //   sectionEyebrow: {
// //     color: COLORS.primary,
// //     fontSize: 10,
// //     fontWeight: '700',
// //     letterSpacing: 1,
// //     marginBottom: 8,
// //   },
// //   sectionTitle: {
// //     color: COLORS.textPrimary,
// //     fontSize: 21,
// //     fontWeight: '800',
// //     lineHeight: 27,
// //     marginBottom: 10,
// //   },
// //   summaryText: {
// //     color: COLORS.textSecondary,
// //     fontSize: 13,
// //     lineHeight: 20,
// //     marginBottom: 14,
// //   },
// //   chipsWrap: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     gap: 8,
// //   },

// //   infoChip: {
// //     backgroundColor: 'rgba(255,255,255,0.05)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     borderRadius: 999,
// //     paddingHorizontal: 10,
// //     paddingVertical: 6,
// //   },
// //   infoChipPrimary: {
// //     backgroundColor: 'rgba(184,122,86,0.16)',
// //     borderColor: COLORS.borderHighlight,
// //   },
// //   infoChipText: {
// //     color: COLORS.textPrimary,
// //     fontSize: 11,
// //     fontWeight: '700',
// //   },
// //   infoChipTextPrimary: {
// //     color: COLORS.primary,
// //   },

// //   featuresBlock: {
// //     borderRadius: 22,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     padding: 16,
// //     marginBottom: 16,
// //   },
// //   featuresList: {
// //     gap: 14,
// //   },
// //   featureItem: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //   },
// //   featureDot: {
// //     width: 8,
// //     height: 8,
// //     borderRadius: 99,
// //     backgroundColor: COLORS.primary,
// //     marginTop: 7,
// //     marginRight: 10,
// //   },
// //   featureTextWrap: {
// //     flex: 1,
// //   },
// //   featureTitle: {
// //     color: COLORS.textPrimary,
// //     fontSize: 14,
// //     fontWeight: '800',
// //     marginBottom: 4,
// //   },
// //   featureText: {
// //     color: COLORS.textSecondary,
// //     fontSize: 12,
// //     lineHeight: 18,
// //   },

// //   dualRow: {
// //     gap: 14,
// //     marginBottom: 16,
// //   },
// //   infoCard: {
// //     borderRadius: 22,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     padding: 16,
// //   },
// //   infoCardTitle: {
// //     color: COLORS.textPrimary,
// //     fontSize: 18,
// //     fontWeight: '800',
// //     lineHeight: 24,
// //     marginBottom: 8,
// //   },
// //   infoCardText: {
// //     color: COLORS.textSecondary,
// //     fontSize: 12,
// //     lineHeight: 18,
// //   },

// //   relatedHeader: {
// //     marginBottom: 12,
// //   },
// //   relatedRow: {
// //     paddingRight: 18,
// //     marginBottom: 16,
// //   },
// //   relatedCardWrap: {
// //     width: 220,
// //     marginRight: 12,
// //   },
// //   relatedCard: {
// //     borderRadius: 20,
// //     overflow: 'hidden',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //   },
// //   relatedImage: {
// //     width: '100%',
// //     height: 130,
// //     backgroundColor: COLORS.elevated,
// //   },
// //   relatedBody: {
// //     padding: 12,
// //   },
// //   relatedChip: {
// //     alignSelf: 'flex-start',
// //     backgroundColor: 'rgba(184,122,86,0.10)',
// //     borderWidth: 1,
// //     borderColor: COLORS.borderHighlight,
// //     borderRadius: 999,
// //     paddingHorizontal: 9,
// //     paddingVertical: 4,
// //     marginBottom: 8,
// //   },
// //   relatedChipText: {
// //     color: COLORS.primary,
// //     fontSize: 10,
// //     fontWeight: '700',
// //   },
// //   relatedTitle: {
// //     color: COLORS.textPrimary,
// //     fontSize: 14,
// //     fontWeight: '800',
// //     marginBottom: 6,
// //     minHeight: 38,
// //   },
// //   relatedPrice: {
// //     color: COLORS.primary,
// //     fontSize: 14,
// //     fontWeight: '800',
// //   },

// //   ctaBlock: {
// //     borderRadius: 24,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     padding: 18,
// //   },
// //   ctaEyebrow: {
// //     color: COLORS.primary,
// //     fontSize: 10,
// //     fontWeight: '700',
// //     letterSpacing: 1,
// //     marginBottom: 8,
// //   },
// //   ctaTitle: {
// //     color: COLORS.textPrimary,
// //     fontSize: 22,
// //     fontWeight: '800',
// //     lineHeight: 28,
// //     marginBottom: 8,
// //   },
// //   ctaText: {
// //     color: COLORS.textSecondary,
// //     fontSize: 13,
// //     lineHeight: 20,
// //     marginBottom: 16,
// //   },
// //   ctaButtons: {
// //     gap: 10,
// //   },

// //   actionButton: {
// //     minHeight: 48,
// //     borderRadius: 14,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingHorizontal: 16,
// //   },
// //   actionButtonSecondary: {
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //   },
// //   actionButtonText: {
// //     fontSize: 14,
// //     fontWeight: '700',
// //   },
// //   actionButtonTextPrimary: {
// //     color: COLORS.textDark,
// //   },
// //   actionButtonTextSecondary: {
// //     color: COLORS.textPrimary,
// //   },

// //   stickyBar: {
// //     position: 'absolute',
// //     left: 18,
// //     right: 18,
// //     bottom: 18,
// //   },
// //   stickyButtonWrap: {
// //     borderRadius: 16,
// //     overflow: 'hidden',
// //   },
// //   stickyButton: {
// //     minHeight: 52,
// //     borderRadius: 16,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingHorizontal: 16,
// //   },
// //   stickyButtonText: {
// //     color: COLORS.textDark,
// //     fontSize: 14,
// //     fontWeight: '800',
// //   },
// //   bottomSpacer: {
// //     height: 8,
// //   },
// // });

// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   Image,
//   Animated,
//   Easing,
//   ScrollView,
//   Share,
//   Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// import { appsData } from '../data/appsData';
// import CommonFooter from '../components/CommonFooter';

// const SAVED_APPS_KEY = 'sat_saved_apps';

// function InfoChip({ label, primary = false }) {
//   return (
//     <View style={[styles.infoChip, primary && styles.infoChipPrimary]}>
//       <Text style={[styles.infoChipText, primary && styles.infoChipTextPrimary]}>
//         {label}
//       </Text>
//     </View>
//   );
// }

// function ActionButton({ title, onPress, primary = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [pressed && styles.buttonPressed]}
//     >
//       <LinearGradient
//         colors={
//           primary
//             ? ['#67E6E8', '#42DDE2', '#1FCFD6']
//             : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
//         }
//         style={[
//           styles.actionButton,
//           !primary && styles.actionButtonSecondary,
//         ]}
//       >
//         <Text
//           style={[
//             styles.actionButtonText,
//             primary ? styles.actionButtonTextPrimary : styles.actionButtonTextSecondary,
//           ]}
//         >
//           {title}
//         </Text>
//       </LinearGradient>
//     </Pressable>
//   );
// }

// function FeatureItem({ title, text }) {
//   return (
//     <View style={styles.featureItem}>
//       <View style={styles.featureDot} />
//       <View style={styles.featureTextWrap}>
//         <Text style={styles.featureTitle}>{title}</Text>
//         <Text style={styles.featureText}>{text}</Text>
//       </View>
//     </View>
//   );
// }

// function RelatedAppCard({ item, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.relatedCardWrap, pressed && styles.pressed]}
//     >
//       <LinearGradient
//         colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//         style={styles.relatedCard}
//       >
//         <Image source={item.image} style={styles.relatedImage} resizeMode="cover" />
//         <View style={styles.relatedBody}>
//           <View style={styles.relatedChip}>
//             <Text style={styles.relatedChipText}>{item.category}</Text>
//           </View>
//           <Text style={styles.relatedTitle} numberOfLines={2}>
//             {item.title}
//           </Text>
//           <Text style={styles.relatedPrice}>{item.price}</Text>
//         </View>
//       </LinearGradient>
//     </Pressable>
//   );
// }

// export default function AppDetailsScreen({ navigation, route }) {
//   const passedApp = route?.params?.app;
//   const app = passedApp || appsData[0];

//   const [saved, setSaved] = useState(false);
//   const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

//   const heroAnim = useRef(new Animated.Value(0)).current;
//   const contentAnim = useRef(new Animated.Value(0)).current;
//   const sectionAnim = useRef(new Animated.Value(0)).current;
//   const ctaAnim = useRef(new Animated.Value(0)).current;
//   const footerAnim = useRef(new Animated.Value(0)).current;

//   const galleryImages = useMemo(() => {
//     if (Array.isArray(app.gallery) && app.gallery.length > 0) {
//       return app.gallery;
//     }
//     return [app.image];
//   }, [app.gallery, app.image]);

//   useEffect(() => {
//     const sequence = Animated.sequence([
//       Animated.timing(heroAnim, {
//         toValue: 1,
//         duration: 420,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(contentAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(sectionAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(ctaAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(footerAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]);

//     sequence.start();
//     return () => sequence.stop();
//   }, [heroAnim, contentAnim, sectionAnim, ctaAnim, footerAnim]);

//   useEffect(() => {
//     const loadSavedState = async () => {
//       try {
//         const raw = await AsyncStorage.getItem(SAVED_APPS_KEY);
//         const parsed = raw ? JSON.parse(raw) : [];
//         setSaved(Array.isArray(parsed) && parsed.includes(app.id));
//       } catch (error) {
//         console.warn('Failed to load saved apps', error);
//       }
//     };

//     loadSavedState();
//   }, [app.id]);

//   useEffect(() => {
//     setActiveGalleryIndex(0);
//   }, [app.id]);

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

//   const features = useMemo(
//     () => [
//       {
//         title: 'Premium UI/UX',
//         text: 'Clean, modern interface designed for strong visual impact and better user engagement.',
//       },
//       {
//         title: 'Business Ready Modules',
//         text: 'Structured flows for operations, management, tracking, communication, and admin control.',
//       },
//       {
//         title: 'Customizable Build',
//         text: 'Can be adapted to your exact business workflow, brand, and required functionality.',
//       },
//       {
//         title: 'Web & Mobile Ready',
//         text: 'Suitable for mobile-first apps and scalable product ecosystems with admin panels.',
//       },
//     ],
//     []
//   );

//   const relatedApps = useMemo(
//     () => appsData.filter((item) => item.id !== app.id).slice(0, 3),
//     [app.id]
//   );

//   const toggleSaved = async () => {
//     try {
//       const raw = await AsyncStorage.getItem(SAVED_APPS_KEY);
//       const parsed = raw ? JSON.parse(raw) : [];
//       const savedIds = Array.isArray(parsed) ? parsed : [];

//       let nextIds;
//       let nextSaved;
//       if (savedIds.includes(app.id)) {
//         nextIds = savedIds.filter((id) => id !== app.id);
//         nextSaved = false;
//       } else {
//         nextIds = [...savedIds, app.id];
//         nextSaved = true;
//       }

//       await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds));
//       setSaved(nextSaved);
//     } catch (error) {
//       console.warn('Failed to save app', error);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         title: app.title,
//         message: `${app.title}\n${app.description}\nStarting from ${app.price}\nExplore more with Sat Apps.`,
//       });
//     } catch (error) {
//       console.warn('Share failed', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <View style={styles.screenWrap}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//         >
//           <View style={styles.topBar}>
//             <Pressable
//               onPress={() => navigation.goBack()}
//               style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
//             >
//               <Text style={styles.iconButtonText}>Back</Text>
//             </Pressable>

//             <Text style={styles.topBarTitle}>App Details</Text>

//             <View style={styles.topActions}>
//               <Pressable
//                 onPress={toggleSaved}
//                 style={({ pressed }) => [
//                   styles.smallTopButton,
//                   saved && styles.smallTopButtonActive,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.smallTopButtonText,
//                     saved && styles.smallTopButtonTextActive,
//                   ]}
//                 >
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>

//               <Pressable
//                 onPress={handleShare}
//                 style={({ pressed }) => [styles.smallTopButton, pressed && styles.pressed]}
//               >
//                 <Text style={styles.smallTopButtonText}>Share</Text>
//               </Pressable>
//             </View>
//           </View>

//           <Animated.View style={fadeUp(heroAnim, 16)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.heroCard}
//             >
//               <Image
//                 source={galleryImages[activeGalleryIndex]}
//                 style={styles.heroImage}
//                 resizeMode="cover"
//               />
//               <View style={styles.heroOverlay} />

//               <View style={styles.heroContent}>
//                 <View style={styles.heroBadgeRow}>
//                   <InfoChip label={app.category} primary />
//                   <InfoChip label="Best Seller" />
//                 </View>

//                 <Text style={styles.appTitle}>{app.title}</Text>
//                 <Text style={styles.appDescription}>{app.description}</Text>

//                 <View style={styles.heroBottomRow}>
//                   <View>
//                     <Text style={styles.priceLabel}>Starting from</Text>
//                     <Text style={styles.priceValue}>{app.price}</Text>
//                   </View>

//                   <View style={styles.heroMeta}>
//                     <Text style={styles.heroMetaText}>Web & Mobile</Text>
//                     <Text style={styles.heroMetaDivider}>•</Text>
//                     <Text style={styles.heroMetaText}>Customizable</Text>
//                   </View>
//                 </View>
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           {galleryImages.length > 1 ? (
//             <Animated.View style={fadeUp(contentAnim, 10)}>
//               <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.galleryThumbRow}
//               >
//                 {galleryImages.map((image, index) => (
//                   <Pressable
//                     key={`gallery-${index}`}
//                     onPress={() => setActiveGalleryIndex(index)}
//                     style={({ pressed }) => [
//                       styles.galleryThumbWrap,
//                       index === activeGalleryIndex && styles.galleryThumbWrapActive,
//                       pressed && styles.pressed,
//                     ]}
//                   >
//                     <Image source={image} style={styles.galleryThumb} resizeMode="cover" />
//                   </Pressable>
//                 ))}
//               </ScrollView>
//             </Animated.View>
//           ) : null}

//           <Animated.View style={fadeUp(contentAnim, 12)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//               style={styles.trustStrip}
//             >
//               <View style={styles.trustItem}>
//                 <Text style={styles.trustValue}>Demo</Text>
//                 <Text style={styles.trustLabel}>Available</Text>
//               </View>
//               <View style={styles.trustDivider} />
//               <View style={styles.trustItem}>
//                 <Text style={styles.trustValue}>Custom</Text>
//                 <Text style={styles.trustLabel}>Build</Text>
//               </View>
//               <View style={styles.trustDivider} />
//               <View style={styles.trustItem}>
//                 <Text style={styles.trustValue}>Fast</Text>
//                 <Text style={styles.trustLabel}>Delivery</Text>
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(contentAnim, 14)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//               style={styles.summaryBlock}
//             >
//               <Text style={styles.sectionEyebrow}>OVERVIEW</Text>
//               <Text style={styles.sectionTitle}>Built for strong business presentation</Text>
//               <Text style={styles.summaryText}>
//                 {app.title} is designed as a premium digital product that can be positioned
//                 for real business use, product demos, client delivery, or marketplace sales.
//                 It combines clean presentation, strong functional structure, and room for
//                 future expansion.
//               </Text>

//               <View style={styles.chipsWrap}>
//                 <InfoChip label="Custom UI" />
//                 <InfoChip label="Scalable Modules" />
//                 <InfoChip label="Admin Ready" />
//                 <InfoChip label="Premium Branding" />
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(sectionAnim, 14)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//               style={styles.featuresBlock}
//             >
//               <Text style={styles.sectionEyebrow}>FEATURE HIGHLIGHTS</Text>
//               <Text style={styles.sectionTitle}>What this product includes</Text>

//               <View style={styles.featuresList}>
//                 {features.map((feature) => (
//                   <FeatureItem
//                     key={feature.title}
//                     title={feature.title}
//                     text={feature.text}
//                   />
//                 ))}
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(sectionAnim, 12)}>
//             <View style={styles.dualRow}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//                 style={styles.infoCard}
//               >
//                 <Text style={styles.sectionEyebrow}>DELIVERY</Text>
//                 <Text style={styles.infoCardTitle}>What you can expect</Text>
//                 <Text style={styles.infoCardText}>
//                   Product setup, premium interface, customizable flow structure, and support
//                   for adapting the app to your exact business use case.
//                 </Text>
//               </LinearGradient>

//               <LinearGradient
//                 colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//                 style={styles.infoCard}
//               >
//                 <Text style={styles.sectionEyebrow}>IDEAL FOR</Text>
//                 <Text style={styles.infoCardTitle}>Teams and businesses</Text>
//                 <Text style={styles.infoCardText}>
//                   Suitable for companies looking to launch, showcase, sell, or scale their
//                   digital products with a more premium product experience.
//                 </Text>
//               </LinearGradient>
//             </View>
//           </Animated.View>

//           {relatedApps.length > 0 ? (
//             <Animated.View style={fadeUp(sectionAnim, 12)}>
//               <View style={styles.relatedHeader}>
//                 <View>
//                   <Text style={styles.sectionEyebrow}>RELATED APPS</Text>
//                   <Text style={styles.sectionTitle}>You may also like</Text>
//                 </View>
//               </View>

//               <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.relatedRow}
//               >
//                 {relatedApps.map((item) => (
//                   <RelatedAppCard
//                     key={item.id}
//                     item={item}
//                     onPress={() => navigation.push('AppDetails', { app: item })}
//                   />
//                 ))}
//               </ScrollView>
//             </Animated.View>
//           ) : null}

//           <Animated.View style={fadeUp(ctaAnim, 14)}>
//             <LinearGradient
//               colors={['rgba(20,20,22,0.96)', 'rgba(20,20,22,0.88)']}
//               style={styles.ctaBlock}
//             >
//               <Text style={styles.ctaEyebrow}>NEXT STEP</Text>
//               <Text style={styles.ctaTitle}>Want this app customized for your business?</Text>
//               <Text style={styles.ctaText}>
//                 Contact us for a tailored version, product consultation, or demo flow.
//               </Text>

//               <View style={styles.ctaButtons}>
//                 <ActionButton
//                   title="Request Demo"
//                   primary
//                   onPress={() => navigation.navigate('Contact', { app })}
//                 />
//                 <ActionButton
//                   title="Contact Us"
//                   onPress={() => navigation.navigate('Contact', { app })}
//                 />
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(footerAnim, 14)}>
//             <CommonFooter navigation={navigation} />
//           </Animated.View>

//           <View style={styles.bottomSpacer} />
//         </ScrollView>

//         <View style={styles.stickyBar}>
//           <Pressable
//             onPress={() => navigation.navigate('Contact', { app })}
//             style={({ pressed }) => [styles.stickyButtonWrap, pressed && styles.buttonPressed]}
//           >
//             <LinearGradient
//               colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//               style={styles.stickyButton}
//             >
//               <Text style={styles.stickyButtonText}>Request Demo</Text>
//             </LinearGradient>
//           </Pressable>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: {
//     opacity: 0.92,
//   },
//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },

//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   screenWrap: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 110,
//     backgroundColor: COLORS.background,
//   },

//   topBar: {
//     minHeight: 58,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(20,20,22,0.88)',
//     paddingHorizontal: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 18,
//   },
//   topBarTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 16,
//     fontWeight: '800',
//   },
//   topActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   iconButton: {
//     minWidth: 64,
//     minHeight: 36,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   iconButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   smallTopButton: {
//     minWidth: 58,
//     minHeight: 36,
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   smallTopButtonActive: {
//     backgroundColor: 'rgba(103,232,240,0.16)',
//     borderColor: 'rgba(103,232,240,0.28)',
//   },
//   smallTopButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 11,
//     fontWeight: '700',
//   },
//   smallTopButtonTextActive: {
//     color: '#67E6E8',
//   },

//   heroCard: {
//     borderRadius: 24,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     marginBottom: 16,
//   },
//   heroImage: {
//     width: '100%',
//     height: Math.min(260, SCREEN_WIDTH * 0.6),
//     backgroundColor: COLORS.elevated,
//   },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(10,12,16,0.28)',
//   },
//   heroContent: {
//     position: 'absolute',
//     left: 14,
//     right: 14,
//     bottom: 14,
//     backgroundColor: 'rgba(20,20,22,0.56)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 18,
//     padding: 14,
//   },
//   heroBadgeRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 10,
//   },

//   galleryThumbRow: {
//     paddingBottom: 6,
//     marginBottom: 12,
//   },
//   galleryThumbWrap: {
//     width: 86,
//     height: 62,
//     borderRadius: 14,
//     overflow: 'hidden',
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   galleryThumbWrapActive: {
//     borderColor: 'rgba(103,232,240,0.28)',
//     borderWidth: 1.4,
//   },
//   galleryThumb: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: COLORS.elevated,
//   },

//   appTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 24,
//     fontWeight: '800',
//     lineHeight: 30,
//     marginBottom: 8,
//   },
//   appDescription: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 14,
//   },
//   heroBottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     gap: 12,
//   },
//   priceLabel: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     marginBottom: 4,
//   },
//   priceValue: {
//     color: '#67E6E8',
//     fontSize: 22,
//     fontWeight: '800',
//   },
//   heroMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   heroMetaText: {
//     color: COLORS.textPrimary,
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   heroMetaDivider: {
//     color: COLORS.textMuted,
//     marginHorizontal: 6,
//     fontSize: 10,
//   },

//   trustStrip: {
//     minHeight: 62,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 16,
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

//   summaryBlock: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//     marginBottom: 16,
//   },
//   sectionEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   sectionTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 21,
//     fontWeight: '800',
//     lineHeight: 27,
//     marginBottom: 10,
//   },
//   summaryText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 14,
//   },
//   chipsWrap: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },

//   infoChip: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   infoChipPrimary: {
//     backgroundColor: 'rgba(103,232,240,0.16)',
//     borderColor: 'rgba(103,232,240,0.28)',
//   },
//   infoChipText: {
//     color: COLORS.textPrimary,
//     fontSize: 11,
//     fontWeight: '700',
//   },
//   infoChipTextPrimary: {
//     color: '#67E6E8',
//   },

//   featuresBlock: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//     marginBottom: 16,
//   },
//   featuresList: {
//     gap: 14,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   featureDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: '#67E6E8',
//     marginTop: 7,
//     marginRight: 10,
//   },
//   featureTextWrap: {
//     flex: 1,
//   },
//   featureTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   featureText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },

//   dualRow: {
//     gap: 14,
//     marginBottom: 16,
//   },
//   infoCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//   },
//   infoCardTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     lineHeight: 24,
//     marginBottom: 8,
//   },
//   infoCardText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },

//   relatedHeader: {
//     marginBottom: 12,
//   },
//   relatedRow: {
//     paddingLeft: 18,
//     paddingRight: 18,
//     marginBottom: 16,
//   },
//   relatedCardWrap: {
//     width: Math.min(220, SCREEN_WIDTH * 0.6),
//     marginRight: 12,
//   },
//   relatedCard: {
//     borderRadius: 20,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   relatedImage: {
//     width: '100%',
//     height: 130,
//     backgroundColor: COLORS.elevated,
//   },
//   relatedBody: {
//     padding: 12,
//   },
//   relatedChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 9,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   relatedChipText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   relatedTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '800',
//     marginBottom: 6,
//     minHeight: 38,
//   },
//   relatedPrice: {
//     color: '#67E6E8',
//     fontSize: 14,
//     fontWeight: '800',
//   },

//   ctaBlock: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//   },
//   ctaEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   ctaTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 28,
//     marginBottom: 8,
//   },
//   ctaText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 16,
//   },
//   ctaButtons: {
//     gap: 10,
//   },

//   actionButton: {
//     minHeight: 48,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   actionButtonSecondary: {
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   actionButtonText: {
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   actionButtonTextPrimary: {
//     color: '#12343A',
//   },
//   actionButtonTextSecondary: {
//     color: COLORS.textPrimary,
//   },

//   stickyBar: {
//     position: 'absolute',
//     left: 18,
//     right: 18,
//     bottom: 18,
//   },
//   stickyButtonWrap: {
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   stickyButton: {
//     minHeight: 52,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   stickyButtonText: {
//     color: '#12343A',
//     fontSize: 14,
//     fontWeight: '800',
//   },
//   bottomSpacer: {
//     height: 8,
//   },
// });

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Animated,
  Easing,
  ScrollView,
  Share,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { appsData } from '../data/appsData';
import CommonFooter from '../components/CommonFooter';

const SAVED_APPS_KEY = 'sat_saved_apps';

function InfoChip({ label, primary = false }) {
  return (
    <View style={[styles.infoChip, primary && styles.infoChipPrimary]}>
      <Text style={[styles.infoChipText, primary && styles.infoChipTextPrimary]}>
        {label}
      </Text>
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
        style={[
          styles.actionButton,
          !primary && styles.actionButtonSecondary,
        ]}
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

function FeatureItem({ title, text }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureDot} />
      <View style={styles.featureTextWrap}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureText}>{text}</Text>
      </View>
    </View>
  );
}

function RelatedAppCard({ item, onPress }) {
  // Support both local (image) and remote (imageUrl / imageUrls) sources
  const imageSource = useMemo(() => {
    if (Array.isArray(item.imageUrls) && item.imageUrls.length > 0) {
      return { uri: item.imageUrls[0] };
    }
    if (item.imageUrl) return { uri: item.imageUrl };
    if (item.image)    return item.image;
    return null;
  }, [item]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.relatedCardWrap, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
        style={styles.relatedCard}
      >
        {imageSource ? (
          <Image source={imageSource} style={styles.relatedImage} resizeMode="cover" />
        ) : (
          <View style={[styles.relatedImage, styles.relatedImagePlaceholder]} />
        )}
        <View style={styles.relatedBody}>
          <View style={styles.relatedChip}>
            <Text style={styles.relatedChipText}>{item.category}</Text>
          </View>
          <Text style={styles.relatedTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.relatedPrice}>
            {item.price
              ? `₹${Number(item.price).toLocaleString('en-IN')}`
              : item.priceLabel || ''}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export default function AppDetailsScreen({ navigation, route }) {
  const passedApp = route?.params?.app;
  const app       = passedApp || appsData[0];

  // ✅ Real apps passed from AppsScreen
  const allApps = route?.params?.allApps || [];

  const [saved, setSaved]                     = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const heroAnim    = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const sectionAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim     = useRef(new Animated.Value(0)).current;
  const footerAnim  = useRef(new Animated.Value(0)).current;

  // Support both local gallery and remote imageUrls
  const galleryImages = useMemo(() => {
    if (Array.isArray(app.imageUrls) && app.imageUrls.length > 0) {
      return app.imageUrls.map(uri => ({ uri }));
    }
    if (app.imageUrl) return [{ uri: app.imageUrl }];
    if (Array.isArray(app.gallery) && app.gallery.length > 0) return app.gallery;
    if (app.image)    return [app.image];
    return [];
  }, [app]);

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(heroAnim, {
        toValue: 1, duration: 420,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1, duration: 380,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(sectionAnim, {
        toValue: 1, duration: 380,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(ctaAnim, {
        toValue: 1, duration: 380,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(footerAnim, {
        toValue: 1, duration: 340,
        easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
    ]);
    sequence.start();
    return () => sequence.stop();
  }, [heroAnim, contentAnim, sectionAnim, ctaAnim, footerAnim]);

  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const raw    = await AsyncStorage.getItem(SAVED_APPS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        setSaved(Array.isArray(parsed) && parsed.includes(app.id));
      } catch (error) {
        console.warn('Failed to load saved apps', error);
      }
    };
    loadSavedState();
  }, [app.id]);

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [app.id]);

  const fadeUp = (anim, distance = 16) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange:  [0, 1],
          outputRange: [distance, 0],
        }),
      },
    ],
  });

  const features = useMemo(
    () => [
      {
        title: 'Premium UI/UX',
        text:  'Clean, modern interface designed for strong visual impact and better user engagement.',
      },
      {
        title: 'Business Ready Modules',
        text:  'Structured flows for operations, management, tracking, communication, and admin control.',
      },
      {
        title: 'Customizable Build',
        text:  'Can be adapted to your exact business workflow, brand, and required functionality.',
      },
      {
        title: 'Web & Mobile Ready',
        text:  'Suitable for mobile-first apps and scalable product ecosystems with admin panels.',
      },
    ],
    []
  );

  // ✅ Related apps — from real Firebase apps, excluding current app
  const relatedApps = useMemo(
    () => allApps.filter((item) => item.id !== app.id).slice(0, 5),
    [allApps, app.id]
  );

  const toggleSaved = async () => {
    try {
      const raw     = await AsyncStorage.getItem(SAVED_APPS_KEY);
      const parsed  = raw ? JSON.parse(raw) : [];
      const savedIds = Array.isArray(parsed) ? parsed : [];

      let nextIds;
      let nextSaved;
      if (savedIds.includes(app.id)) {
        nextIds   = savedIds.filter((id) => id !== app.id);
        nextSaved = false;
      } else {
        nextIds   = [...savedIds, app.id];
        nextSaved = true;
      }

      await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds));
      setSaved(nextSaved);
    } catch (error) {
      console.warn('Failed to save app', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title:   app.title,
        message: `${app.title}\n${app.description}\nStarting from ${app.price}\nExplore more with Sat Apps.`,
      });
    } catch (error) {
      console.warn('Share failed', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.screenWrap}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* ── Top Bar ── */}
          <View style={styles.topBar}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            >
              <Text style={styles.iconButtonText}>Back</Text>
            </Pressable>

            <Text style={styles.topBarTitle}>App Details</Text>

            <View style={styles.topActions}>
              <Pressable
                onPress={toggleSaved}
                style={({ pressed }) => [
                  styles.smallTopButton,
                  saved && styles.smallTopButtonActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.smallTopButtonText,
                    saved && styles.smallTopButtonTextActive,
                  ]}
                >
                  {saved ? 'Saved' : 'Save'}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleShare}
                style={({ pressed }) => [styles.smallTopButton, pressed && styles.pressed]}
              >
                <Text style={styles.smallTopButtonText}>Share</Text>
              </Pressable>
            </View>
          </View>

          {/* ── Hero Card ── */}
          <Animated.View style={fadeUp(heroAnim, 16)}>
            <LinearGradient
              colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
              style={styles.heroCard}
            >
              {galleryImages.length > 0 ? (
                <Image
                  source={galleryImages[activeGalleryIndex]}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.heroImage, styles.heroImagePlaceholder]} />
              )}
              <View style={styles.heroOverlay} />

              <View style={styles.heroContent}>
                <View style={styles.heroBadgeRow}>
                  <InfoChip label={app.category} primary />
                  <InfoChip label="Best Seller" />
                </View>

                <Text style={styles.appTitle}>{app.title}</Text>
                <Text style={styles.appDescription}>{app.description}</Text>

                <View style={styles.heroBottomRow}>
                  <View>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.priceValue}>
                      {app.price
                        ? `₹${Number(app.price).toLocaleString('en-IN')}`
                        : app.priceLabel || ''}
                    </Text>
                  </View>

                  <View style={styles.heroMeta}>
                    <Text style={styles.heroMetaText}>Web & Mobile</Text>
                    <Text style={styles.heroMetaDivider}>•</Text>
                    <Text style={styles.heroMetaText}>Customizable</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── Gallery Thumbnails ── */}
          {galleryImages.length > 1 ? (
            <Animated.View style={fadeUp(contentAnim, 10)}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryThumbRow}
              >
                {galleryImages.map((image, index) => (
                  <Pressable
                    key={`gallery-${index}`}
                    onPress={() => setActiveGalleryIndex(index)}
                    style={({ pressed }) => [
                      styles.galleryThumbWrap,
                      index === activeGalleryIndex && styles.galleryThumbWrapActive,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Image source={image} style={styles.galleryThumb} resizeMode="cover" />
                  </Pressable>
                ))}
              </ScrollView>
            </Animated.View>
          ) : null}

          {/* ── Trust Strip ── */}
          <Animated.View style={fadeUp(contentAnim, 12)}>
            <LinearGradient
              colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
              style={styles.trustStrip}
            >
              <View style={styles.trustItem}>
                <Text style={styles.trustValue}>Demo</Text>
                <Text style={styles.trustLabel}>Available</Text>
              </View>
              <View style={styles.trustDivider} />
              <View style={styles.trustItem}>
                <Text style={styles.trustValue}>Custom</Text>
                <Text style={styles.trustLabel}>Build</Text>
              </View>
              <View style={styles.trustDivider} />
              <View style={styles.trustItem}>
                <Text style={styles.trustValue}>Fast</Text>
                <Text style={styles.trustLabel}>Delivery</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── Overview ── */}
          <Animated.View style={fadeUp(contentAnim, 14)}>
            <LinearGradient
              colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
              style={styles.summaryBlock}
            >
              <Text style={styles.sectionEyebrow}>OVERVIEW</Text>
              <Text style={styles.sectionTitle}>Built for strong business presentation</Text>
              <Text style={styles.summaryText}>
                {app.title} is designed as a premium digital product that can be positioned
                for real business use, product demos, client delivery, or marketplace sales.
                It combines clean presentation, strong functional structure, and room for
                future expansion.
              </Text>

              <View style={styles.chipsWrap}>
                <InfoChip label="Custom UI" />
                <InfoChip label="Scalable Modules" />
                <InfoChip label="Admin Ready" />
                <InfoChip label="Premium Branding" />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── Features ── */}
          <Animated.View style={fadeUp(sectionAnim, 14)}>
            <LinearGradient
              colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
              style={styles.featuresBlock}
            >
              <Text style={styles.sectionEyebrow}>FEATURE HIGHLIGHTS</Text>
              <Text style={styles.sectionTitle}>What this product includes</Text>

              <View style={styles.featuresList}>
                {features.map((feature) => (
                  <FeatureItem
                    key={feature.title}
                    title={feature.title}
                    text={feature.text}
                  />
                ))}
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── Delivery / Ideal For ── */}
          <Animated.View style={fadeUp(sectionAnim, 12)}>
            <View style={styles.dualRow}>
              <LinearGradient
                colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
                style={styles.infoCard}
              >
                <Text style={styles.sectionEyebrow}>DELIVERY</Text>
                <Text style={styles.infoCardTitle}>What you can expect</Text>
                <Text style={styles.infoCardText}>
                  Product setup, premium interface, customizable flow structure, and support
                  for adapting the app to your exact business use case.
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
                style={styles.infoCard}
              >
                <Text style={styles.sectionEyebrow}>IDEAL FOR</Text>
                <Text style={styles.infoCardTitle}>Teams and businesses</Text>
                <Text style={styles.infoCardText}>
                  Suitable for companies looking to launch, showcase, sell, or scale their
                  digital products with a more premium product experience.
                </Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* ── Related Apps ── ✅ Real Firebase apps */}
          {relatedApps.length > 0 ? (
            <Animated.View style={fadeUp(sectionAnim, 12)}>
              <View style={styles.relatedHeader}>
                <View>
                  <Text style={styles.sectionEyebrow}>RELATED APPS</Text>
                  <Text style={styles.sectionTitle}>You may also like</Text>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedRow}
              >
                {relatedApps.map((item) => (
                  <RelatedAppCard
                    key={item.id}
                    item={item}
                    onPress={() =>
                      navigation.push('AppDetails', { app: item, allApps })
                    }
                  />
                ))}
              </ScrollView>
            </Animated.View>
          ) : null}

          {/* ── CTA ── */}
          <Animated.View style={fadeUp(ctaAnim, 14)}>
            <LinearGradient
              colors={['rgba(20,20,22,0.96)', 'rgba(20,20,22,0.88)']}
              style={styles.ctaBlock}
            >
              <Text style={styles.ctaEyebrow}>NEXT STEP</Text>
              <Text style={styles.ctaTitle}>Want this app customized for your business?</Text>
              <Text style={styles.ctaText}>
                Contact us for a tailored version, product consultation, or demo flow.
              </Text>

              <View style={styles.ctaButtons}>
                <ActionButton
                  title="Request Demo"
                  primary
                  onPress={() => navigation.navigate('Contact', { app })}
                />
                <ActionButton
                  title="Contact Us"
                  onPress={() => navigation.navigate('Contact', { app })}
                />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── Footer ── */}
          <Animated.View style={fadeUp(footerAnim, 14)}>
            <CommonFooter navigation={navigation} />
          </Animated.View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* ── Sticky CTA ── */}
        <View style={styles.stickyBar}>
          <Pressable
            onPress={() => navigation.navigate('Contact', { app })}
            style={({ pressed }) => [styles.stickyButtonWrap, pressed && styles.buttonPressed]}
          >
            <LinearGradient
              colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
              style={styles.stickyButton}
            >
              <Text style={styles.stickyButtonText}>Request Demo</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressed:       { opacity: 0.92 },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },

  safeArea:   { flex: 1, backgroundColor: COLORS.background },
  screenWrap: { flex: 1, backgroundColor: COLORS.background },
  container:  {
    paddingHorizontal: 18,
    paddingTop:        10,
    paddingBottom:     110,
    backgroundColor:   COLORS.background,
  },

  topBar: {
    minHeight:       58,
    borderRadius:    18,
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(20,20,22,0.88)',
    paddingHorizontal: 14,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    marginBottom:    18,
  },
  topBarTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '800' },
  topActions:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton:  {
    minWidth:        64,
    minHeight:       36,
    borderRadius:    12,
    alignItems:      'center',
    justifyContent:  'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.08)',
  },
  iconButtonText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
  smallTopButton: {
    minWidth:        58,
    minHeight:       36,
    borderRadius:    12,
    paddingHorizontal: 10,
    alignItems:      'center',
    justifyContent:  'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.08)',
  },
  smallTopButtonActive:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(103,232,240,0.28)' },
  smallTopButtonText:       { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
  smallTopButtonTextActive: { color: '#67E6E8' },

  heroCard: {
    borderRadius: 24,
    overflow:     'hidden',
    borderWidth:  1,
    borderColor:  'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  heroImage: {
    width:           '100%',
    height:          Math.min(260, SCREEN_WIDTH * 0.6),
    backgroundColor: COLORS.elevated,
  },
  heroImagePlaceholder: { backgroundColor: 'rgba(255,255,255,0.05)' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,12,16,0.28)',
  },
  heroContent: {
    position:        'absolute',
    left:            14,
    right:           14,
    bottom:          14,
    backgroundColor: 'rgba(20,20,22,0.56)',
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.08)',
    borderRadius:    18,
    padding:         14,
  },
  heroBadgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },

  galleryThumbRow: { paddingBottom: 6, marginBottom: 12 },
  galleryThumbWrap: {
    width:        86,
    height:       62,
    borderRadius: 14,
    overflow:     'hidden',
    marginRight:  10,
    borderWidth:  1,
    borderColor:  'rgba(255,255,255,0.08)',
  },
  galleryThumbWrapActive: { borderColor: 'rgba(103,232,240,0.28)', borderWidth: 1.4 },
  galleryThumb: { width: '100%', height: '100%', backgroundColor: COLORS.elevated },

  appTitle:       { color: COLORS.textPrimary, fontSize: 24, fontWeight: '800', lineHeight: 30, marginBottom: 8 },
  appDescription: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, marginBottom: 14 },
  heroBottomRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  priceLabel:     { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
  priceValue:     { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
  heroMeta:       { flexDirection: 'row', alignItems: 'center' },
  heroMetaText:   { color: COLORS.textPrimary, fontSize: 11, fontWeight: '600' },
  heroMetaDivider:{ color: COLORS.textMuted, marginHorizontal: 6, fontSize: 10 },

  trustStrip: {
    minHeight:      62,
    borderRadius:   18,
    borderWidth:    1,
    borderColor:    'rgba(255,255,255,0.07)',
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom:   16,
  },
  trustItem:    { flex: 1, alignItems: 'center' },
  trustValue:   { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800', marginBottom: 2 },
  trustLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
  trustDivider: { width: 1, height: 24, backgroundColor: COLORS.border },

  summaryBlock: {
    borderRadius: 22,
    borderWidth:  1,
    borderColor:  'rgba(255,255,255,0.08)',
    padding:      16,
    marginBottom: 16,
  },
  sectionEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  sectionTitle:   { color: COLORS.textPrimary, fontSize: 21, fontWeight: '800', lineHeight: 27, marginBottom: 10 },
  summaryText:    { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, marginBottom: 14 },
  chipsWrap:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  infoChip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.08)',
    borderRadius:    999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  infoChipPrimary:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(103,232,240,0.28)' },
  infoChipText:        { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
  infoChipTextPrimary: { color: '#67E6E8' },

  featuresBlock: {
    borderRadius: 22,
    borderWidth:  1,
    borderColor:  'rgba(255,255,255,0.08)',
    padding:      16,
    marginBottom: 16,
  },
  featuresList:   { gap: 14 },
  featureItem:    { flexDirection: 'row', alignItems: 'flex-start' },
  featureDot:     { width: 8, height: 8, borderRadius: 99, backgroundColor: '#67E6E8', marginTop: 7, marginRight: 10 },
  featureTextWrap:{ flex: 1 },
  featureTitle:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 4 },
  featureText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },

  dualRow: { gap: 14, marginBottom: 16 },
  infoCard: {
    borderRadius: 22,
    borderWidth:  1,
    borderColor:  'rgba(255,255,255,0.08)',
    padding:      16,
  },
  infoCardTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 8 },
  infoCardText:  { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },

  relatedHeader:  { marginBottom: 12 },
  relatedRow:     { paddingLeft: 18, paddingRight: 18, marginBottom: 16 },
  relatedCardWrap:{ width: Math.min(220, SCREEN_WIDTH * 0.6), marginRight: 12 },
  relatedCard:    { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  relatedImage:   { width: '100%', height: 130, backgroundColor: COLORS.elevated },
  relatedImagePlaceholder: { backgroundColor: 'rgba(255,255,255,0.05)' },
  relatedBody:    { padding: 12 },
  relatedChip:    {
    alignSelf:       'flex-start',
    backgroundColor: 'rgba(103,232,240,0.10)',
    borderWidth:     1,
    borderColor:     'rgba(103,232,240,0.28)',
    borderRadius:    999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginBottom:    8,
  },
  relatedChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
  relatedTitle:    { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 6, minHeight: 38 },
  relatedPrice:    { color: '#67E6E8', fontSize: 14, fontWeight: '800' },

  ctaBlock: {
    borderRadius: 24,
    borderWidth:  1,
    borderColor:  'rgba(255,255,255,0.08)',
    padding:      18,
  },
  ctaEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  ctaTitle:   { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28, marginBottom: 8 },
  ctaText:    { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, marginBottom: 16 },
  ctaButtons: { gap: 10 },

  actionButton: {
    minHeight:      48,
    borderRadius:   14,
    alignItems:     'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actionButtonSecondary:     { borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  actionButtonText:          { fontSize: 14, fontWeight: '700' },
  actionButtonTextPrimary:   { color: '#12343A' },
  actionButtonTextSecondary: { color: COLORS.textPrimary },

  stickyBar:       { position: 'absolute', left: 18, right: 18, bottom: 18 },
  stickyButtonWrap:{ borderRadius: 16, overflow: 'hidden' },
  stickyButton:    { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  stickyButtonText:{ color: '#12343A', fontSize: 14, fontWeight: '800' },
  bottomSpacer:    { height: 8 },
});