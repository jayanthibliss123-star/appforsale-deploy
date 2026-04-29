// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   TextInput,
//   Image,
//   Animated,
//   Easing,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';

// const { width } = Dimensions.get('window');

// const ALL_CATEGORY = 'All';
// const SORT_OPTIONS = ['Popular', 'Price', 'New'];
// const CARD_WIDTH = 292;
// const CARD_SPACING = 14;
// const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.filterChip,
//         active && styles.filterChipActive,
//         pressed && styles.pressed,
//       ]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.sortChip,
//         active && styles.sortChipActive,
//         pressed && styles.pressed,
//       ]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View
//       style={[
//         styles.smallBadge,
//         variant === 'primary' && styles.smallBadgePrimary,
//       ]}
//     >
//       <Text
//         style={[
//           styles.smallBadgeText,
//           variant === 'primary' && styles.smallBadgeTextPrimary,
//         ]}
//       >
//         {text}
//       </Text>
//     </View>
//   );
// }

// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText =
//     item.isUserUploaded
//       ? 'Uploaded'
//       : index === 0
//       ? 'Best Seller'
//       : index === 1
//       ? 'Popular'
//       : index === 2
//       ? 'New'
//       : null;

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           <View style={styles.cardImageWrap}>
//             <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
//             <View style={styles.cardImageShade} />

//             <View style={styles.cardImageTopRow}>
//               {badgeText ? (
//                 <AppBadge
//                   text={badgeText}
//                   variant={index === 0 || item.isUserUploaded ? 'primary' : 'default'}
//                 />
//               ) : (
//                 <View />
//               )}

//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [
//                   styles.saveButton,
//                   saved && styles.saveButtonActive,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>{item.price}</Text>
//             </View>

//             <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>
//               {item.description}
//             </Text>

//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>

//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>

//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={[COLORS.primarySoft, COLORS.primary]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function AppsScreen({ navigation, route }) {
//   const { apps } = useMarketplace();
//   const user = route?.params?.user || null;
//   const categoryFromRoute = route?.params?.category ?? '';

//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
//   const [selectedSort, setSelectedSort] = useState('Popular');
//   const [savedIds, setSavedIds] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const categories = useMemo(() => {
//     const unique = [...new Set(apps.map((item) => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [apps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();

//     const filtered = apps.filter((item) => {
//       const matchesCategory =
//         selectedCategory === ALL_CATEGORY || item.category === selectedCategory;

//       const matchesSearch =
//         !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);

//       return matchesCategory && matchesSearch;
//     });

//     if (selectedSort === 'Price') {
//       return [...filtered].sort((a, b) => {
//         const aPrice = Number(String(a.price).replace(/[^\d]/g, ''));
//         const bPrice = Number(String(b.price).replace(/[^\d]/g, ''));
//         return aPrice - bPrice;
//       });
//     }

//     if (selectedSort === 'New') {
//       return [...filtered].reverse();
//     }

//     return filtered;
//   }, [apps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters =
//     search.trim().length > 0 ||
//     selectedCategory !== ALL_CATEGORY ||
//     selectedSort !== 'Popular';

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const heroAnim = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim = useRef(new Animated.Value(0)).current;
//   const lowerAnim = useRef(new Animated.Value(0)).current;
//   const emptyAnim = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map(
//       (_, index) => cardAnimsRef.current[index] || new Animated.Value(0)
//     );
//   }

//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach((anim) => anim.setValue(0));

//     const sequence = Animated.sequence([
//       Animated.timing(headerAnim, {
//         toValue: 1,
//         duration: 320,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(heroAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(controlsAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(statsAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.stagger(
//         90,
//         cardAnims.map((anim) =>
//           Animated.timing(anim, {
//             toValue: 1,
//             duration: 360,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: true,
//           })
//         )
//       ),
//       Animated.timing(lowerAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(emptyAnim, {
//         toValue: 1,
//         duration: 320,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]);

//     sequence.start();
//     return () => sequence.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => {
//     setActiveIndex(0);
//   }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     const loadSavedApps = async () => {
//       try {
//         const raw = await AsyncStorage.getItem(SAVED_APPS_KEY);
//         const parsed = raw ? JSON.parse(raw) : [];
//         if (Array.isArray(parsed)) {
//           setSavedIds(parsed);
//         }
//       } catch (error) {
//         console.warn('Failed to load saved apps', error);
//       }
//     };

//     loadSavedApps();
//   }, []);

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

//   const getCardStyle = (index) => {
//     const fallback = new Animated.Value(1);
//     const anim = cardAnims[index] || fallback;

//     return {
//       opacity: anim,
//       transform: [
//         {
//           translateY: anim.interpolate({
//             inputRange: [0, 1],
//             outputRange: [18, 0],
//           }),
//         },
//         {
//           scale: anim.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0.985, 1],
//           }),
//         },
//       ],
//     };
//   };

//   const persistSavedIds = async (nextIds) => {
//     try {
//       await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds));
//     } catch (error) {
//       console.warn('Failed to save apps', error);
//     }
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id)
//       ? savedIds.filter((itemId) => itemId !== id)
//       : [...savedIds, id];

//     setSavedIds(nextIds);
//     await persistSavedIds(nextIds);
//   };

//   const openDetails = (item) => {
//     navigation.navigate('AppDetails', { app: item, user });
//   };

//   const handleHorizontalScrollEnd = (event) => {
//     const x = event.nativeEvent.contentOffset.x;
//     const index = Math.round(x / SNAP_INTERVAL);
//     const safeIndex = Math.max(0, Math.min(index, filteredApps.length - 1));
//     setActiveIndex(safeIndex);
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >
//         <Animated.View style={fadeUp(headerAnim, 10)}>
//           <CommonHeader
//             navigation={navigation}
//             title="Apps Marketplace"
//             subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//             showBack
//             showLogo={false}
//             rightLabel="Contact"
//             onRightPress={() => navigation.navigate('Contact')}
//             onNotificationPress={() => navigation.navigate('Notifications')}
//             onProfilePress={() => navigation.navigate('Profile', { user })}
//           />
//         </Animated.View>

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//             style={styles.heroBlock}
//           >
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY
//                 ? 'Find the right app for your business'
//                 : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones
//               you want to revisit, and move into product details with a cleaner flow.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(184,122,86,0.12)', 'rgba(255,255,255,0.02)']}
//             style={styles.customBanner}
//           >
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>
//                 Talk to us for tailored business solutions and premium product builds.
//               </Text>
//             </View>

//             <Pressable
//               onPress={() => navigation.navigate('Contact')}
//               style={({ pressed }) => [pressed && styles.buttonPressed]}
//             >
//               <LinearGradient
//                 colors={[COLORS.primarySoft, COLORS.primary]}
//                 style={styles.customBannerButton}
//               >
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable
//             onPress={() => navigation.navigate('UploadApp')}
//             style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}
//           >
//             <LinearGradient
//               colors={[COLORS.primarySoft, COLORS.primary]}
//               style={styles.uploadAppButtonGradient}
//             >
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//             style={styles.searchBlock}
//           >
//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters ? (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}
//               >
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             ) : null}
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.filtersRow}
//           >
//             {categories.map((category) => (
//               <FilterChip
//                 key={category}
//                 label={category}
//                 active={selectedCategory === category}
//                 onPress={() => {
//                   setSelectedCategory(category);
//                   if (category === ALL_CATEGORY) {
//                     navigation.setParams?.({ category: undefined });
//                   } else {
//                     navigation.setParams?.({ category });
//                   }
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.sortRow}
//           >
//             {SORT_OPTIONS.map((option) => (
//               <SortChip
//                 key={option}
//                 label={option}
//                 active={selectedSort === option}
//                 onPress={() => setSelectedSort(option)}
//               />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.statsRow}
//           >
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{apps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>

//             <View style={styles.statDivider} />

//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>

//             <View style={styles.statDivider} />

//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>

//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <Animated.ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               snapToAlignment="start"
//               onMomentumScrollEnd={handleHorizontalScrollEnd}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id}
//                   item={item}
//                   index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => openDetails(item)}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View
//                   key={`dot-${index}`}
//                   style={[
//                     styles.paginationDot,
//                     index === activeIndex && styles.paginationDotActive,
//                   ]}
//                 />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>No apps found</Text>
//             <Text style={styles.emptyText}>
//               Try changing the search, category, or sort option.
//             </Text>

//             <Pressable
//               onPress={clearFilters}
//               style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}
//             >
//               <LinearGradient
//                 colors={[COLORS.primarySoft, COLORS.primary]}
//                 style={styles.emptyActionButton}
//               >
//                 <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//               </LinearGradient>
//             </Pressable>
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.marketStrip}
//           >
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Premium</Text>
//               <Text style={styles.marketLabel}>design quality</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Custom</Text>
//               <Text style={styles.marketLabel}>build support</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Fast</Text>
//               <Text style={styles.marketLabel}>delivery flow</Text>
//             </View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>

//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map((category) => (
//                   <View key={category} style={styles.lowerTag}>
//                     <Text style={styles.lowerTagText}>{category}</Text>
//                   </View>
//                 ))}
//               </View>
//             </LinearGradient>

//             <LinearGradient
//               colors={['rgba(184,122,86,0.12)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>
//                 Use filters, sorting, and saved items to narrow down the right
//                 app before going deeper into product details.
//               </Text>
//             </LinearGradient>
//           </View>

//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
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

//   heroBlock: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },
//   heroEyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   heroTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 25,
//     fontWeight: '800',
//     lineHeight: 31,
//     marginBottom: 10,
//     maxWidth: '92%',
//   },
//   heroSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     maxWidth: '96%',
//   },

//   customBanner: {
//     minHeight: 76,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 14,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     gap: 12,
//   },
//   customBannerContent: {
//     flex: 1,
//     paddingRight: 8,
//   },
//   customBannerTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   customBannerText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },
//   customBannerButton: {
//     minHeight: 38,
//     minWidth: 104,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//   },
//   customBannerButtonText: {
//     color: COLORS.textDark,
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   uploadAppButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 14,
//   },
//   uploadAppButtonGradient: {
//     minHeight: 50,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   uploadAppButtonText: {
//     color: COLORS.textDark,
//     fontSize: 14,
//     fontWeight: '800',
//   },

//   searchBlock: {
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     paddingHorizontal: 14,
//     marginBottom: 14,
//   },
//   searchInput: {
//     minHeight: 52,
//     color: COLORS.textPrimary,
//     fontSize: 14,
//   },

//   controlsHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 10,
//   },
//   controlsHeaderRowSecondary: {
//     marginBottom: 10,
//   },
//   controlsHeading: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   clearFilterButton: {
//     minHeight: 30,
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   clearFilterButtonText: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '700',
//   },

//   filtersRow: {
//     paddingBottom: 12,
//     gap: 10,
//   },
//   filterChip: {
//     minHeight: 36,
//     borderRadius: 999,
//     paddingHorizontal: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   filterChipActive: {
//     backgroundColor: 'rgba(184,122,86,0.16)',
//     borderColor: COLORS.borderHighlight,
//   },
//   filterChipText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   filterChipTextActive: {
//     color: COLORS.primary,
//     fontWeight: '700',
//   },

//   sortRow: {
//     paddingBottom: 16,
//     gap: 10,
//   },
//   sortChip: {
//     minHeight: 34,
//     borderRadius: 999,
//     paddingHorizontal: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.035)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//   },
//   sortChipActive: {
//     backgroundColor: 'rgba(255,255,255,0.09)',
//     borderColor: 'rgba(255,255,255,0.14)',
//   },
//   sortChipText: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   sortChipTextActive: {
//     color: COLORS.textPrimary,
//     fontWeight: '700',
//   },

//   statsRow: {
//     minHeight: 68,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   statItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statValue: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   statLabel: {
//     color: COLORS.textMuted,
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   statDivider: {
//     width: 1,
//     height: 28,
//     backgroundColor: COLORS.border,
//   },

//   sectionHeader: {
//     marginBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     gap: 12,
//   },
//   sectionHeaderLeft: {
//     flex: 1,
//   },
//   sectionEyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 6,
//   },
//   sectionTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 28,
//   },
//   showingCount: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     fontWeight: '600',
//   },

//   cardsRow: {
//     paddingRight: 18,
//     paddingBottom: 4,
//   },
//   cardWrap: {
//     width: CARD_WIDTH,
//     marginRight: CARD_SPACING,
//   },
//   card: {
//     borderRadius: 22,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.035)',
//   },
//   cardImageWrap: {
//     position: 'relative',
//   },
//   cardImage: {
//     width: '100%',
//     height: 176,
//     backgroundColor: COLORS.elevated,
//   },
//   cardImageShade: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.10)',
//   },
//   cardImageTopRow: {
//     position: 'absolute',
//     top: 12,
//     left: 12,
//     right: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   smallBadge: {
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   smallBadgePrimary: {
//     backgroundColor: 'rgba(184,122,86,0.16)',
//     borderColor: COLORS.borderHighlight,
//   },
//   smallBadgeText: {
//     color: COLORS.textPrimary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   smallBadgeTextPrimary: {
//     color: COLORS.primary,
//   },

//   saveButton: {
//     minHeight: 32,
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(15,15,18,0.42)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//   },
//   saveButtonActive: {
//     backgroundColor: 'rgba(184,122,86,0.16)',
//     borderColor: COLORS.borderHighlight,
//   },
//   saveButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 11,
//     fontWeight: '700',
//   },
//   saveButtonTextActive: {
//     color: COLORS.primary,
//   },

//   cardBody: {
//     padding: 14,
//   },
//   cardTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 12,
//   },
//   categoryChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.10)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   categoryChipText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   cardPrice: {
//     color: COLORS.primary,
//     fontSize: 16,
//     fontWeight: '800',
//   },
//   cardTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 8,
//     minHeight: 46,
//   },
//   cardDescription: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
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
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     gap: 12,
//   },
//   metaBlock: {
//     flex: 1,
//   },
//   metaLabel: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     marginBottom: 4,
//   },
//   metaValue: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   viewButton: {
//     minWidth: 108,
//     minHeight: 40,
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   viewButtonText: {
//     color: COLORS.textDark,
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   paginationRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 14,
//     marginBottom: 24,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//   },
//   paginationDotActive: {
//     width: 20,
//     backgroundColor: COLORS.primary,
//   },

//   emptyState: {
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     padding: 18,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   emptyIcon: {
//     color: COLORS.primary,
//     fontSize: 28,
//     marginBottom: 8,
//   },
//   emptyTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 6,
//   },
//   emptyText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     textAlign: 'center',
//   },
//   emptyActionWrap: {
//     marginTop: 14,
//     borderRadius: 14,
//     overflow: 'hidden',
//   },
//   emptyActionButton: {
//     minHeight: 44,
//     minWidth: 132,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   emptyActionButtonText: {
//     color: COLORS.textDark,
//     fontSize: 12,
//     fontWeight: '800',
//   },

//   marketStrip: {
//     minHeight: 64,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 18,
//   },
//   marketItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   marketValue: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   marketLabel: {
//     color: COLORS.textMuted,
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   marketDivider: {
//     width: 1,
//     height: 26,
//     backgroundColor: COLORS.border,
//   },

//   lowerGrid: {
//     gap: 14,
//     marginBottom: 20,
//   },
//   lowerCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//   },
//   lowerCardEyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   lowerCardTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     lineHeight: 24,
//     marginBottom: 10,
//   },
//   lowerCardText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },
//   lowerTagsWrap: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginTop: 2,
//   },
//   lowerTag: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   lowerTagText: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '600',
//   },
// });


// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   TextInput,
//   Image,
//   Animated,
//   Easing,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import { fetchAppsApi } from '../utils/apiService';

// const ALL_CATEGORY = 'All';
// const SORT_OPTIONS = ['Popular', 'Price', 'New'];
// const CARD_WIDTH = Math.min(292, Dimensions.get('window').width * 0.78);
// const CARD_SPACING = 14;
// const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.filterChip,
//         active && styles.filterChipActive,
//         pressed && styles.pressed,
//       ]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.sortChip,
//         active && styles.sortChipActive,
//         pressed && styles.pressed,
//       ]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text
//         style={[
//           styles.smallBadgeText,
//           variant === 'primary' && styles.smallBadgeTextPrimary,
//         ]}
//       >
//         {text}
//       </Text>
//     </View>
//   );
// }

// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText =
//     item.isUserUploaded
//       ? 'Uploaded'
//       : index === 0
//       ? 'Best Seller'
//       : index === 1
//       ? 'Popular'
//       : index === 2
//       ? 'New'
//       : null;

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           <View style={styles.cardImageWrap}>
//             <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
//             <View style={styles.cardImageShade} />

//             <View style={styles.cardImageTopRow}>
//               {badgeText ? (
//                 <AppBadge
//                   text={badgeText}
//                   variant={index === 0 || item.isUserUploaded ? 'primary' : 'default'}
//                 />
//               ) : (
//                 <View />
//               )}

//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [
//                   styles.saveButton,
//                   saved && styles.saveButtonActive,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>{item.price}</Text>
//             </View>

//             <Text style={styles.cardTitle} numberOfLines={2}>
//               {item.title}
//             </Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>
//               {item.description}
//             </Text>

//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>

//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>

//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function AppsScreen({ navigation, route }) {
//   const { apps } = useMarketplace();
//   const user = route?.params?.user || null;
//   const categoryFromRoute = route?.params?.category ?? '';

//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
//   const [selectedSort, setSelectedSort] = useState('Popular');
//   const [savedIds, setSavedIds] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const categories = useMemo(() => {
//     const unique = [...new Set(apps.map((item) => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [apps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();

//     const filtered = apps.filter((item) => {
//       const matchesCategory =
//         selectedCategory === ALL_CATEGORY || item.category === selectedCategory;

//       const matchesSearch =
//         !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);

//       return matchesCategory && matchesSearch;
//     });

//     if (selectedSort === 'Price') {
//       return [...filtered].sort((a, b) => {
//         const aPrice = Number(String(a.price).replace(/[^\d]/g, ''));
//         const bPrice = Number(String(b.price).replace(/[^\d]/g, ''));
//         return aPrice - bPrice;
//       });
//     }

//     if (selectedSort === 'New') {
//       return [...filtered].reverse();
//     }

//     return filtered;
//   }, [apps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters =
//     search.trim().length > 0 ||
//     selectedCategory !== ALL_CATEGORY ||
//     selectedSort !== 'Popular';

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const heroAnim = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim = useRef(new Animated.Value(0)).current;
//   const lowerAnim = useRef(new Animated.Value(0)).current;
//   const emptyAnim = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map(
//       (_, index) => cardAnimsRef.current[index] || new Animated.Value(0)
//     );
//   }

//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach((anim) => anim.setValue(0));

//     const sequence = Animated.sequence([
//       Animated.timing(headerAnim, {
//         toValue: 1,
//         duration: 320,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(heroAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(controlsAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(statsAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.stagger(
//         90,
//         cardAnims.map((anim) =>
//           Animated.timing(anim, {
//             toValue: 1,
//             duration: 360,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: true,
//           })
//         )
//       ),
//       Animated.timing(lowerAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(emptyAnim, {
//         toValue: 1,
//         duration: 320,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]);

//     sequence.start();
//     return () => sequence.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => {
//     setActiveIndex(0);
//   }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     const loadSavedApps = async () => {
//       try {
//         const raw = await AsyncStorage.getItem(SAVED_APPS_KEY);
//         const parsed = raw ? JSON.parse(raw) : [];
//         if (Array.isArray(parsed)) {
//           setSavedIds(parsed);
//         }
//       } catch (error) {
//         console.warn('Failed to load saved apps', error);
//       }
//     };

//     loadSavedApps();
//   }, []);

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

//   const getCardStyle = (index) => {
//     const fallback = new Animated.Value(1);
//     const anim = cardAnims[index] || fallback;

//     return {
//       opacity: anim,
//       transform: [
//         {
//           translateY: anim.interpolate({
//             inputRange: [0, 1],
//             outputRange: [18, 0],
//           }),
//         },
//         {
//           scale: anim.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0.985, 1],
//           }),
//         },
//       ],
//     };
//   };

//   const persistSavedIds = async (nextIds) => {
//     try {
//       await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds));
//     } catch (error) {
//       console.warn('Failed to save apps', error);
//     }
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id)
//       ? savedIds.filter((itemId) => itemId !== id)
//       : [...savedIds, id];

//     setSavedIds(nextIds);
//     await persistSavedIds(nextIds);
//   };

//   const openDetails = (item) => {
//     navigation.navigate('AppDetails', { app: item, user });
//   };

//   const handleHorizontalScrollEnd = (event) => {
//     const x = event.nativeEvent.contentOffset.x;
//     const index = Math.round(x / SNAP_INTERVAL);
//     const safeIndex = Math.max(0, Math.min(index, filteredApps.length - 1));
//     setActiveIndex(safeIndex);
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <CommonHeader
//             navigation={navigation}
//             title="Apps Marketplace"
//             subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//             showBack
//             showLogo={false}
//             rightLabel="Contact"
//             onRightPress={() => navigation.navigate('Contact')}
//             onNotificationPress={() => navigation.navigate('Notifications')}
//             onProfilePress={() => navigation.navigate('Profile', { user })}
//           />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >


//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//             style={styles.heroBlock}
//           >
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY
//                 ? 'Find the right app for your business'
//                 : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones
//               you want to revisit, and move into product details with a cleaner flow.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//             style={styles.customBanner}
//           >
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>
//                 Talk to us for tailored business solutions and premium product builds.
//               </Text>
//             </View>

//             <Pressable
//               onPress={() => navigation.navigate('Contact')}
//               style={({ pressed }) => [pressed && styles.buttonPressed]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 style={styles.customBannerButton}
//               >
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable
//             onPress={() => navigation.navigate('UploadApp')}
//             style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}
//           >
//             <LinearGradient
//               colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//               style={styles.uploadAppButtonGradient}
//             >
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//             style={styles.searchBlock}
//           >
//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters ? (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}
//               >
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             ) : null}
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.filtersRow}
//           >
//             {categories.map((category) => (
//               <FilterChip
//                 key={category}
//                 label={category}
//                 active={selectedCategory === category}
//                 onPress={() => {
//                   setSelectedCategory(category);
//                   if (category === ALL_CATEGORY) {
//                     navigation.setParams?.({ category: undefined });
//                   } else {
//                     navigation.setParams?.({ category });
//                   }
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.sortRow}
//           >
//             {SORT_OPTIONS.map((option) => (
//               <SortChip
//                 key={option}
//                 label={option}
//                 active={selectedSort === option}
//                 onPress={() => setSelectedSort(option)}
//               />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.statsRow}
//           >
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{apps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>

//             <View style={styles.statDivider} />

//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>

//             <View style={styles.statDivider} />

//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>

//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <Animated.ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               snapToAlignment="start"
//               onMomentumScrollEnd={handleHorizontalScrollEnd}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id}
//                   item={item}
//                   index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => openDetails(item)}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View
//                   key={`dot-${index}`}
//                   style={[
//                     styles.paginationDot,
//                     index === activeIndex && styles.paginationDotActive,
//                   ]}
//                 />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>No apps found</Text>
//             <Text style={styles.emptyText}>
//               Try changing the search, category, or sort option.
//             </Text>

//             <Pressable
//               onPress={clearFilters}
//               style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 style={styles.emptyActionButton}
//               >
//                 <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//               </LinearGradient>
//             </Pressable>
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.marketStrip}
//           >
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Premium</Text>
//               <Text style={styles.marketLabel}>design quality</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Custom</Text>
//               <Text style={styles.marketLabel}>build support</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Fast</Text>
//               <Text style={styles.marketLabel}>delivery flow</Text>
//             </View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>

//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map((category) => (
//                   <View key={category} style={styles.lowerTag}>
//                     <Text style={styles.lowerTagText}>{category}</Text>
//                   </View>
//                 ))}
//               </View>
//             </LinearGradient>

//             <LinearGradient
//               colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>
//                 Use filters, sorting, and saved items to narrow down the right
//                 app before going deeper into product details.
//               </Text>
//             </LinearGradient>
//           </View>

//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
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

//   heroBlock: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },
//   heroEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   heroTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 25,
//     fontWeight: '800',
//     lineHeight: 31,
//     marginBottom: 10,
//     maxWidth: '92%',
//   },
//   heroSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     maxWidth: '96%',
//   },

//   customBanner: {
//     minHeight: 76,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.28)',
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 14,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     gap: 12,
//   },
//   customBannerContent: {
//     flex: 1,
//     paddingRight: 8,
//   },
//   customBannerTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   customBannerText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },
//   customBannerButton: {
//     minHeight: 38,
//     minWidth: 104,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//   },
//   customBannerButtonText: {
//     color: '#12343A',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   uploadAppButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 14,
//   },
//   uploadAppButtonGradient: {
//     minHeight: 50,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   uploadAppButtonText: {
//     color: '#12343A',
//     fontSize: 14,
//     fontWeight: '800',
//   },

//   searchBlock: {
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     paddingHorizontal: 14,
//     marginBottom: 14,
//   },
//   searchInput: {
//     minHeight: 52,
//     color: COLORS.textPrimary,
//     fontSize: 14,
//   },

//   controlsHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 10,
//   },
//   controlsHeaderRowSecondary: {
//     marginBottom: 10,
//   },
//   controlsHeading: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   clearFilterButton: {
//     minHeight: 30,
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   clearFilterButtonText: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '700',
//   },

//   filtersRow: {
//     paddingBottom: 12,
//     gap: 10,
//   },
//   filterChip: {
//     minHeight: 36,
//     borderRadius: 999,
//     paddingHorizontal: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   filterChipActive: {
//     backgroundColor: 'rgba(103,232,240,0.16)',
//     borderColor: 'rgba(66,221,226,0.28)',
//   },
//   filterChipText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   filterChipTextActive: {
//     color: '#67E6E8',
//     fontWeight: '700',
//   },

//   sortRow: {
//     paddingBottom: 16,
//     gap: 10,
//   },
//   sortChip: {
//     minHeight: 34,
//     borderRadius: 999,
//     paddingHorizontal: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.035)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//   },
//   sortChipActive: {
//     backgroundColor: 'rgba(255,255,255,0.09)',
//     borderColor: 'rgba(255,255,255,0.14)',
//   },
//   sortChipText: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   sortChipTextActive: {
//     color: COLORS.textPrimary,
//     fontWeight: '700',
//   },

//   statsRow: {
//     minHeight: 68,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   statItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statValue: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   statLabel: {
//     color: COLORS.textMuted,
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   statDivider: {
//     width: 1,
//     height: 28,
//     backgroundColor: COLORS.border,
//   },

//   sectionHeader: {
//     marginBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     gap: 12,
//   },
//   sectionHeaderLeft: {
//     flex: 1,
//   },
//   sectionEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 6,
//   },
//   sectionTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 28,
//   },
//   showingCount: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     fontWeight: '600',
//   },

//   cardsRow: {
//     paddingLeft: 18,
//     paddingRight: 18,
//     paddingBottom: 4,
//   },
//   cardWrap: {
//     width: CARD_WIDTH,
//     marginRight: CARD_SPACING,
//   },
//   card: {
//     borderRadius: 22,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.035)',
//   },
//   cardImageWrap: {
//     position: 'relative',
//   },
//   cardImage: {
//     width: '100%',
//     height: 176,
//     backgroundColor: COLORS.elevated,
//   },
//   cardImageShade: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.10)',
//   },
//   cardImageTopRow: {
//     position: 'absolute',
//     top: 12,
//     left: 12,
//     right: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   smallBadge: {
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   smallBadgePrimary: {
//     backgroundColor: 'rgba(103,232,240,0.16)',
//     borderColor: 'rgba(66,221,226,0.28)',
//   },
//   smallBadgeText: {
//     color: COLORS.textPrimary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   smallBadgeTextPrimary: {
//     color: '#67E6E8',
//   },

//   saveButton: {
//     minHeight: 32,
//     borderRadius: 999,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(15,15,18,0.42)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//   },
//   saveButtonActive: {
//     backgroundColor: 'rgba(103,232,240,0.16)',
//     borderColor: 'rgba(66,221,226,0.28)',
//   },
//   saveButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 11,
//     fontWeight: '700',
//   },
//   saveButtonTextActive: {
//     color: '#67E6E8',
//   },

//   cardBody: {
//     padding: 14,
//   },
//   cardTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 12,
//   },
//   categoryChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   categoryChipText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   cardPrice: {
//     color: '#67E6E8',
//     fontSize: 16,
//     fontWeight: '800',
//   },
//   cardTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 8,
//     minHeight: 46,
//   },
//   cardDescription: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//     marginBottom: 12,
//     minHeight: 54,
//   },
//   offerStrip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.28)',
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
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     gap: 12,
//   },
//   metaBlock: {
//     flex: 1,
//   },
//   metaLabel: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     marginBottom: 4,
//   },
//   metaValue: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   viewButton: {
//     minWidth: 108,
//     minHeight: 40,
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   viewButtonText: {
//     color: '#12343A',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   paginationRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 14,
//     marginBottom: 24,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//   },
//   paginationDotActive: {
//     width: 20,
//     backgroundColor: '#67E6E8',
//   },

//   emptyState: {
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     padding: 18,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   emptyIcon: {
//     color: '#67E6E8',
//     fontSize: 28,
//     marginBottom: 8,
//   },
//   emptyTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 6,
//   },
//   emptyText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     textAlign: 'center',
//   },
//   emptyActionWrap: {
//     marginTop: 14,
//     borderRadius: 14,
//     overflow: 'hidden',
//   },
//   emptyActionButton: {
//     minHeight: 44,
//     minWidth: 132,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },
//   emptyActionButtonText: {
//     color: '#12343A',
//     fontSize: 12,
//     fontWeight: '800',
//   },

//   marketStrip: {
//     minHeight: 64,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 18,
//   },
//   marketItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   marketValue: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   marketLabel: {
//     color: COLORS.textMuted,
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   marketDivider: {
//     width: 1,
//     height: 26,
//     backgroundColor: COLORS.border,
//   },

//   lowerGrid: {
//     gap: 14,
//     marginBottom: 20,
//   },
//   lowerCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//   },
//   lowerCardEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },
//   lowerCardTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     lineHeight: 24,
//     marginBottom: 10,
//   },
//   lowerCardText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },
//   lowerTagsWrap: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginTop: 2,
//   },
//   lowerTag: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },
//   lowerTagText: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '600',
//   },
// });

// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   TextInput,
//   Image,
//   Animated,
//   Easing,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// // import { fetchAppsApi } from '../utils/apiService';
// import { useMarketplace } from '../context/MarketplaceContext';
// import { useCallback } from 'react';

// const ALL_CATEGORY = 'All';
// const SORT_OPTIONS = ['Popular', 'Price', 'New'];
// const CARD_WIDTH = Math.min(292, Dimensions.get('window').width * 0.78);
// const CARD_SPACING = 14;
// const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.filterChip,
//         active && styles.filterChipActive,
//         pressed && styles.pressed,
//       ]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.sortChip,
//         active && styles.sortChipActive,
//         pressed && styles.pressed,
//       ]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>
//         {label}
//       </Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text
//         style={[
//           styles.smallBadgeText,
//           variant === 'primary' && styles.smallBadgeTextPrimary,
//         ]}
//       >
//         {text}
//       </Text>
//     </View>
//   );
// }

// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText =
//     index === 0
//       ? 'Best Seller'
//       : index === 1
//       ? 'Popular'
//       : index === 2
//       ? 'New'
//       : 'Uploaded';

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           <View style={styles.cardImageWrap}>

//             {/* ✅ Image null handle */}
//             {/* {item.image ? (
//               <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
//             ) : ( */}
//             {item.imageUrl ? (
//   <Image
//     source={{ uri: item.imageUrl }}
//     style={styles.cardImage}
//     resizeMode="cover"
//   />
// ) : (
//               <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
//                 <Text style={styles.cardImagePlaceholderText}>📷</Text>
//                 <Text style={styles.cardImagePlaceholderLabel}>No Image</Text>
//               </View>
//             )}

//             <View style={styles.cardImageShade} />

//             <View style={styles.cardImageTopRow}>
//               <AppBadge
//                 text={badgeText}
//                 variant={index === 0 ? 'primary' : 'default'}
//               />

//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [
//                   styles.saveButton,
//                   saved && styles.saveButtonActive,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               {/* <Text style={styles.cardPrice}>{item.price}</Text> */}
//               <Text style={styles.cardPrice}>
//   ₹{Number(item.price).toLocaleString('en-IN')}
// </Text>
//             </View>

//             <Text style={styles.cardTitle} numberOfLines={2}>
//               {item.title}
//             </Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>
//               {item.description}
//             </Text>

//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>

//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>

//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function AppsScreen({ navigation, route }) {
//   const user = route?.params?.user || null;
//   const categoryFromRoute = route?.params?.category ?? '';
//   //  const { apps, loading } = useMarketplace();
//    const { apps, loading, refreshApps } = useMarketplace();

//   // const [apps, setApps] = useState([]);           // ✅ DB nundi apps
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
//   const [selectedSort, setSelectedSort] = useState('Popular');
//   const [savedIds, setSavedIds] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   // const [loading, setLoading] = useState(true);   // ✅ loading state

//   // ✅ Backend nundi apps fetch
//   // useEffect(() => {
//   //   const loadApps = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const data = await fetchAppsApi();
//   //       const formatted = data.map((item) => ({
//   //         ...item,
//   //         image: item.imageUrl ? { uri: item.imageUrl } : null, // ✅ gallery image
//   //         price: item.price
//   //           ? `₹${Number(item.price).toLocaleString('en-IN')}`
//   //           : 'Free',
//   //       }));
//   //       setApps(formatted);
//   //     } catch (error) {
//   //       console.log('loadApps error:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   loadApps();
//   // }, []);

//   // const categories = useMemo(() => {
//   //   const unique = [...new Set(apps.map((item) => item.category))];
//   //   return [ALL_CATEGORY, ...unique];
//   // }, [apps]);
// // const approvedApps = useMemo(() => {
// //   return apps.filter((item) => item.status?.toLowerCase() === 'approved');
// // }, [apps]);
// const approvedApps = useMemo(() => {
//   return (apps || []).filter((item) =>
//     String(item?.status ?? '')
//       .trim()
//       .toLowerCase() === 'approved'
//   );
// }, [apps]);

// const categories = useMemo(() => {
//   const unique = [...new Set(approvedApps.map((item) => item.category))];
//   return [ALL_CATEGORY, ...unique];
// }, [approvedApps]);
//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   // const filteredApps = useMemo(() => {

//   //   const term = search.trim().toLowerCase();

//   //   const filtered = apps.filter((item) => {
//   //     const matchesCategory =
//   //       selectedCategory === ALL_CATEGORY || item.category === selectedCategory;

//   //     const matchesSearch =
//   //       !term ||
//   //       item.title.toLowerCase().includes(term) ||
//   //       item.description.toLowerCase().includes(term) ||
//   //       item.category.toLowerCase().includes(term) ||
//   //       String(item.company || '').toLowerCase().includes(term);

//   //     return matchesCategory && matchesSearch;
//   //   });

//   //   if (selectedSort === 'Price') {
//   //     return [...filtered].sort((a, b) => {
//   //       const aPrice = Number(String(a.price).replace(/[^\d]/g, ''));
//   //       const bPrice = Number(String(b.price).replace(/[^\d]/g, ''));
//   //       return aPrice - bPrice;
//   //     });
//   //   }

//   //   if (selectedSort === 'New') {
//   //     return [...filtered].reverse();
//   //   }

//   //   return filtered;
//   // }, [apps, search, selectedCategory, selectedSort]);
//   useFocusEffect(
//   useCallback(() => {
//     if (refreshApps) {
//       refreshApps();   // 🔥 reload from backend
//     }
//   }, [refreshApps])
// );
// useEffect(() => {
//   console.log("APPS DATA:", apps);
// }, [apps]);
// useEffect(() => {
//   const interval = setInterval(() => {
//     refreshApps();
//   }, 5000);

//   return () => clearInterval(interval);
// }, [refreshApps]); // ✅ IMPORTANT
//   const filteredApps = useMemo(() => {
//   const term = search.trim().toLowerCase();

//   const filtered = approvedApps.filter((item) => {   // ✅ correct
//     const matchesCategory =
//       selectedCategory === ALL_CATEGORY || item.category === selectedCategory;

//     const matchesSearch =
//       !term ||
//       item.title.toLowerCase().includes(term) ||
//       item.description.toLowerCase().includes(term) ||
//       item.category.toLowerCase().includes(term) ||
//       String(item.company || '').toLowerCase().includes(term);

//     return matchesCategory && matchesSearch;
//   });

//   if (selectedSort === 'Price') {
//     return [...filtered].sort((a, b) => {
//       const aPrice = Number(String(a.price).replace(/[^\d]/g, ''));
//       const bPrice = Number(String(b.price).replace(/[^\d]/g, ''));
//       return aPrice - bPrice;
//     });
//   }

//   if (selectedSort === 'New') {
//     return [...filtered].reverse();
//   }

//   return filtered;
// }, [approvedApps, search, selectedCategory, selectedSort]); // ✅ dependency also change

//   const hasActiveFilters =
//     search.trim().length > 0 ||
//     selectedCategory !== ALL_CATEGORY ||
//     selectedSort !== 'Popular';

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const heroAnim = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim = useRef(new Animated.Value(0)).current;
//   const lowerAnim = useRef(new Animated.Value(0)).current;
//   const emptyAnim = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map(
//       (_, index) => cardAnimsRef.current[index] || new Animated.Value(0)
//     );
//   }

//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach((anim) => anim.setValue(0));

//     const sequence = Animated.sequence([
//       Animated.timing(headerAnim, {
//         toValue: 1, duration: 320,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(heroAnim, {
//         toValue: 1, duration: 380,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(controlsAnim, {
//         toValue: 1, duration: 360,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(statsAnim, {
//         toValue: 1, duration: 360,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.stagger(
//         90,
//         cardAnims.map((anim) =>
//           Animated.timing(anim, {
//             toValue: 1, duration: 360,
//             easing: Easing.out(Easing.cubic), useNativeDriver: true,
//           })
//         )
//       ),
//       Animated.timing(lowerAnim, {
//         toValue: 1, duration: 360,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//       Animated.timing(emptyAnim, {
//         toValue: 1, duration: 320,
//         easing: Easing.out(Easing.cubic), useNativeDriver: true,
//       }),
//     ]);

//     sequence.start();
//     return () => sequence.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => {
//     setActiveIndex(0);
//   }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     const loadSavedApps = async () => {
//       try {
//         const raw = await AsyncStorage.getItem(SAVED_APPS_KEY);
//         const parsed = raw ? JSON.parse(raw) : [];
//         if (Array.isArray(parsed)) setSavedIds(parsed);
//       } catch (error) {
//         console.warn('Failed to load saved apps', error);
//       }
//     };
//     loadSavedApps();
//   }, []);

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

//   const getCardStyle = (index) => {
//     const fallback = new Animated.Value(1);
//     const anim = cardAnims[index] || fallback;
//     return {
//       opacity: anim,
//       transform: [
//         {
//           translateY: anim.interpolate({
//             inputRange: [0, 1], outputRange: [18, 0],
//           }),
//         },
//         {
//           scale: anim.interpolate({
//             inputRange: [0, 1], outputRange: [0.985, 1],
//           }),
//         },
//       ],
//     };
//   };

//   const persistSavedIds = async (nextIds) => {
//     try {
//       await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds));
//     } catch (error) {
//       console.warn('Failed to save apps', error);
//     }
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id)
//       ? savedIds.filter((itemId) => itemId !== id)
//       : [...savedIds, id];
//     setSavedIds(nextIds);
//     await persistSavedIds(nextIds);
//   };

//   const openDetails = (item) => {
//     navigation.navigate('AppDetails', { app: item, user });
//   };

//   const handleHorizontalScrollEnd = (event) => {
//     const x = event.nativeEvent.contentOffset.x;
//     const index = Math.round(x / SNAP_INTERVAL);
//     const safeIndex = Math.max(0, Math.min(index, filteredApps.length - 1));
//     setActiveIndex(safeIndex);
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <CommonHeader
//         navigation={navigation}
//         title="Apps Marketplace"
//         subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//         showBack
//         showLogo={false}
//         rightLabel="Contact"
//         onRightPress={() => navigation.navigate('Contact')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         onProfilePress={() => navigation.navigate('Profile', { user })}
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >
//         {/* ✅ Loading state */}
//         {loading ? (
//           <View style={styles.loadingWrap}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         ) : null}

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//             style={styles.heroBlock}
//           >
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY
//                 ? 'Find the right app for your business'
//                 : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones
//               you want to revisit, and move into product details with a cleaner flow.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//             style={styles.customBanner}
//           >
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>
//                 Talk to us for tailored business solutions and premium product builds.
//               </Text>
//             </View>

//             <Pressable
//               onPress={() => navigation.navigate('Contact')}
//               style={({ pressed }) => [pressed && styles.buttonPressed]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 style={styles.customBannerButton}
//               >
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable
//             onPress={() => navigation.navigate('UploadApp')}
//             style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}
//           >
//             <LinearGradient
//               colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//               style={styles.uploadAppButtonGradient}
//             >
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//             style={styles.searchBlock}
//           >
//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters ? (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}
//               >
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             ) : null}
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.filtersRow}
//           >
//             {categories.map((category) => (
//               <FilterChip
//                 key={category}
//                 label={category}
//                 active={selectedCategory === category}
//                 onPress={() => {
//                   setSelectedCategory(category);
//                   if (category === ALL_CATEGORY) {
//                     navigation.setParams?.({ category: undefined });
//                   } else {
//                     navigation.setParams?.({ category });
//                   }
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.sortRow}
//           >
//             {SORT_OPTIONS.map((option) => (
//               <SortChip
//                 key={option}
//                 label={option}
//                 active={selectedSort === option}
//                 onPress={() => setSelectedSort(option)}
//               />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.statsRow}
//           >
//             <View style={styles.statItem}>
//               {/* <Text style={styles.statValue}>{apps.length}</Text> */}
//               <Text style={styles.statValue}>{approvedApps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>
//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <Animated.ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               snapToAlignment="start"
//               onMomentumScrollEnd={handleHorizontalScrollEnd}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id}
//                   item={item}
//                   index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => openDetails(item)}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </Animated.ScrollView>

//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View
//                   key={`dot-${index}`}
//                   style={[
//                     styles.paginationDot,
//                     index === activeIndex && styles.paginationDotActive,
//                   ]}
//                 />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>
//               {loading ? 'Loading...' : 'No apps found'}
//             </Text>
//             <Text style={styles.emptyText}>
//               {loading
//                 ? 'Please wait while we fetch the apps.'
//                 : 'Try changing the search, category, or sort option.'}
//             </Text>
//             {!loading && (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   style={styles.emptyActionButton}
//                 >
//                   <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//                 </LinearGradient>
//               </Pressable>
//             )}
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.marketStrip}
//           >
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Premium</Text>
//               <Text style={styles.marketLabel}>design quality</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Custom</Text>
//               <Text style={styles.marketLabel}>build support</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Fast</Text>
//               <Text style={styles.marketLabel}>delivery flow</Text>
//             </View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map((category) => (
//                   <View key={category} style={styles.lowerTag}>
//                     <Text style={styles.lowerTagText}>{category}</Text>
//                   </View>
//                 ))}
//               </View>
//             </LinearGradient>

//             <LinearGradient
//               colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>
//                 Use filters, sorting, and saved items to narrow down the right
//                 app before going deeper into product details.
//               </Text>
//             </LinearGradient>
//           </View>

//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: { opacity: 0.92 },
//   cardPressed: { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },

//   safeArea: { flex: 1, backgroundColor: COLORS.background },
//   container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },

//   // ✅ Loading
//   loadingWrap: { alignItems: 'center', paddingVertical: 20 },
//   loadingText: { color: '#67E6E8', fontSize: 14, fontWeight: '600' },

//   heroBlock: {
//     borderRadius: 24, borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16,
//   },
//   heroEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   heroTitle: { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
//   heroSubtitle: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },

//   customBanner: {
//     minHeight: 76, borderRadius: 18, borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12,
//     marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12,
//   },
//   customBannerContent: { flex: 1, paddingRight: 8 },
//   customBannerTitle: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   customBannerText: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   customBannerButton: { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
//   customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   uploadAppButton: { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
//   uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//   uploadAppButtonText: { color: '#12343A', fontSize: 14, fontWeight: '800' },

//   searchBlock: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
//   searchInput: { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },

//   controlsHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
//   controlsHeaderRowSecondary: { marginBottom: 10 },
//   controlsHeading: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   clearFilterButton: {
//     minHeight: 30, borderRadius: 999, paddingHorizontal: 12,
//     alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
//   },
//   clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },

//   filtersRow: { paddingBottom: 12, gap: 10 },
//   filterChip: {
//     minHeight: 36, borderRadius: 999, paddingHorizontal: 14,
//     alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
//   },
//   filterChipActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   filterChipText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
//   filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },

//   sortRow: { paddingBottom: 16, gap: 10 },
//   sortChip: {
//     minHeight: 34, borderRadius: 999, paddingHorizontal: 14,
//     alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
//   },
//   sortChipActive: { backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
//   sortChipText: { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },

//   statsRow: {
//     minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     paddingHorizontal: 10, marginBottom: 20,
//   },
//   statItem: { flex: 1, alignItems: 'center' },
//   statValue: { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
//   statLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   statDivider: { width: 1, height: 28, backgroundColor: COLORS.border },

//   sectionHeader: { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   sectionHeaderLeft: { flex: 1 },
//   sectionEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
//   showingCount: { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },

//   cardsRow: { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
//   cardWrap: { width: CARD_WIDTH, marginRight: CARD_SPACING },
//   card: {
//     borderRadius: 22, overflow: 'hidden', borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)',
//   },
//   cardImageWrap: { position: 'relative' },
//   cardImage: { width: '100%', height: 176, backgroundColor: COLORS.elevated },

//   // ✅ Placeholder styles
//   cardImagePlaceholder: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardImagePlaceholderText: { fontSize: 32, marginBottom: 6 },
//   cardImagePlaceholderLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '600' },

//   cardImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.10)' },
//   cardImageTopRow: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

//   smallBadge: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   smallBadgePrimary: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   smallBadgeText: { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
//   smallBadgeTextPrimary: { color: '#67E6E8' },

//   saveButton: { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   saveButtonText: { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
//   saveButtonTextActive: { color: '#67E6E8' },

//   cardBody: { padding: 14 },
//   cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
//   categoryChip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   cardPrice: { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
//   cardTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
//   cardDescription: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },

//   offerStrip: { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },

//   cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   metaBlock: { flex: 1 },
//   metaLabel: { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
//   metaValue: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
//   viewButton: { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
//   viewButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   paginationRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
//   paginationDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
//   paginationDotActive: { width: 20, backgroundColor: '#67E6E8' },

//   emptyState: { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
//   emptyIcon: { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
//   emptyTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
//   emptyActionWrap: { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
//   emptyActionButton: { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
//   emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },

//   marketStrip: { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
//   marketItem: { flex: 1, alignItems: 'center' },
//   marketValue: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
//   marketLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },

//   lowerGrid: { gap: 14, marginBottom: 20 },
//   lowerCard: { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
//   lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   lowerCardTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
//   lowerCardText: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   lowerTagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
//   lowerTag: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   lowerTagText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
// });

// import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, TextInput, Image, Animated, Easing,
//   ScrollView, Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import { useMarketplace } from '../context/MarketplaceContext';

// const ALL_CATEGORY  = 'All';
// const SORT_OPTIONS  = ['Popular', 'Price', 'New'];
// const CARD_WIDTH    = Math.min(292, Dimensions.get('window').width * 0.78);
// const CARD_SPACING  = 14;
// const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.sortChip, active && styles.sortChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text style={[styles.smallBadgeText, variant === 'primary' && styles.smallBadgeTextPrimary]}>
//         {text}
//       </Text>
//     </View>
//   );
// }

// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText = index === 0 ? 'Best Seller' : index === 1 ? 'Popular' : index === 2 ? 'New' : 'Uploaded';

//   // ✅ Get primary image — first from imageUrls array or fallback to imageUrl
//   const primaryImage = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls[0]
//     : item.imageUrl || null;

//   // ✅ All images for mini carousel
//   const allImages = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls
//     : item.imageUrl ? [item.imageUrl] : [];

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           <View style={styles.cardImageWrap}>
//             {primaryImage ? (
//               <Image source={{ uri: primaryImage }} style={styles.cardImage} resizeMode="cover" />
//             ) : (
//               <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
//                 <Text style={styles.cardImagePlaceholderText}>📷</Text>
//                 <Text style={styles.cardImagePlaceholderLabel}>No Image</Text>
//               </View>
//             )}
//             <View style={styles.cardImageShade} />

//             {/* ✅ Multi-image indicator */}
//             {allImages.length > 1 && (
//               <View style={styles.multiImgBadge}>
//                 <Text style={styles.multiImgBadgeText}>+{allImages.length} photos</Text>
//               </View>
//             )}

//             <View style={styles.cardImageTopRow}>
//               <AppBadge text={badgeText} variant={index === 0 ? 'primary' : 'default'} />
//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [styles.saveButton, saved && styles.saveButtonActive, pressed && styles.pressed]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>
//                 ₹{Number(item.price).toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>
//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function AppsScreen({ navigation, route }) {
//   const user             = route?.params?.user || null;
//   const categoryFromRoute= route?.params?.category ?? '';
//   const { apps, loading, refreshApps } = useMarketplace();

//   const [search,          setSearch]          = useState('');
//   const [selectedCategory,setSelectedCategory]= useState(ALL_CATEGORY);
//   const [selectedSort,    setSelectedSort]    = useState('Popular');
//   const [savedIds,        setSavedIds]        = useState([]);
//   const [activeIndex,     setActiveIndex]     = useState(0);

//   // ✅ Only approved apps
//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item?.status ?? '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const categories = useMemo(() => {
//     const unique = [...new Set(approvedApps.map(item => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [approvedApps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   // ✅ Refresh on focus
//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     const filtered = approvedApps.filter(item => {
//       const matchesCategory = selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
//       const matchesSearch   = !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);
//       return matchesCategory && matchesSearch;
//     });

//     if (selectedSort === 'Price') return [...filtered].sort((a, b) => a.price - b.price);
//     if (selectedSort === 'New')   return [...filtered].reverse();
//     return filtered;
//   }, [approvedApps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters = search.trim().length > 0 || selectedCategory !== ALL_CATEGORY || selectedSort !== 'Popular';

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const heroAnim     = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim    = useRef(new Animated.Value(0)).current;
//   const lowerAnim    = useRef(new Animated.Value(0)).current;
//   const emptyAnim    = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map((_, i) => cardAnimsRef.current[i] || new Animated.Value(0));
//   }
//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach(a => a.setValue(0));
//     const seq = Animated.sequence([
//       Animated.timing(headerAnim,   { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(heroAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(controlsAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(statsAnim,    { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(90, cardAnims.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(lowerAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(emptyAnim, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     seq.start();
//     return () => seq.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => { setActiveIndex(0); }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     AsyncStorage.getItem(SAVED_APPS_KEY).then(raw => {
//       const parsed = raw ? JSON.parse(raw) : [];
//       if (Array.isArray(parsed)) setSavedIds(parsed);
//     }).catch(() => {});
//   }, []);

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const getCardStyle = (index) => {
//     const anim = cardAnims[index] || new Animated.Value(1);
//     return {
//       opacity: anim,
//       transform: [
//         { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
//         { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//       ],
//     };
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id) ? savedIds.filter(i => i !== id) : [...savedIds, id];
//     setSavedIds(nextIds);
//     try { await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds)); } catch (_) {}
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
//       <CommonHeader
//         navigation={navigation}
//         title="Apps Marketplace"
//         subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//         showBack showLogo={false}
//         rightLabel="Contact"
//         onRightPress={() => navigation.navigate('Contact')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         onProfilePress={() => navigation.navigate('Profile', { user })}
//       />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
//         {loading && (
//           <View style={styles.loadingWrap}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         )}

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.heroBlock}>
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY ? 'Find the right app for your business' : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones you want to revisit.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.customBanner}>
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>Talk to us for tailored business solutions.</Text>
//             </View>
//             <Pressable onPress={() => navigation.navigate('Contact')} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//               <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.customBannerButton}>
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable onPress={() => navigation.navigate('UploadApp')} style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}>
//             <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadAppButtonGradient}>
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']} style={styles.searchBlock}>
//             <TextInput
//               value={search} onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters && (
//               <Pressable onPress={clearFilters} style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}>
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             )}
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
//             {categories.map(cat => (
//               <FilterChip key={cat} label={cat} active={selectedCategory === cat}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   navigation.setParams?.({ category: cat === ALL_CATEGORY ? undefined : cat });
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
//             {SORT_OPTIONS.map(opt => (
//               <SortChip key={opt} label={opt} active={selectedSort === opt} onPress={() => setSelectedSort(opt)} />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']} style={styles.statsRow}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{approvedApps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>
//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <Animated.ScrollView
//               horizontal showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast" snapToAlignment="start"
//               onMomentumScrollEnd={e => {
//                 const x = e.nativeEvent.contentOffset.x;
//                 setActiveIndex(Math.max(0, Math.min(Math.round(x / SNAP_INTERVAL), filteredApps.length - 1)));
//               }}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id} item={item} index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </Animated.ScrollView>
//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View key={index} style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]} />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No apps found'}</Text>
//             <Text style={styles.emptyText}>
//               {loading ? 'Please wait while we fetch the apps.' : 'Try changing the search, category, or sort option.'}
//             </Text>
//             {!loading && (
//               <Pressable onPress={clearFilters} style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}>
//                 <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.emptyActionButton}>
//                   <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//                 </LinearGradient>
//               </Pressable>
//             )}
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']} style={styles.marketStrip}>
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Premium</Text><Text style={styles.marketLabel}>design quality</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Custom</Text><Text style={styles.marketLabel}>build support</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Fast</Text><Text style={styles.marketLabel}>delivery flow</Text></View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map(cat => (
//                   <View key={cat} style={styles.lowerTag}><Text style={styles.lowerTagText}>{cat}</Text></View>
//                 ))}
//               </View>
//             </LinearGradient>
//             <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>Use filters, sorting, and saved items to narrow down the right app.</Text>
//             </LinearGradient>
//           </View>
//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: COLORS.background },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },
//   loadingWrap:   { alignItems: 'center', paddingVertical: 20 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
//   heroBlock:     { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16 },
//   heroEyebrow:   { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   heroTitle:     { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
//   heroSubtitle:  { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },
//   customBanner:  { minHeight: 76, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
//   customBannerContent: { flex: 1, paddingRight: 8 },
//   customBannerTitle:   { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   customBannerText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   customBannerButton:  { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
//   customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },
//   uploadAppButton:         { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
//   uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//   uploadAppButtonText:     { color: '#12343A', fontSize: 14, fontWeight: '800' },
//   searchBlock:   { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
//   searchInput:   { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },
//   controlsHeaderRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
//   controlsHeaderRowSecondary: { marginBottom: 10 },
//   controlsHeading:  { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   clearFilterButton:{ minHeight: 30, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },
//   filtersRow:    { paddingBottom: 12, gap: 10 },
//   filterChip:    { minHeight: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   filterChipActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   filterChipText:   { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
//   filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },
//   sortRow:       { paddingBottom: 16, gap: 10 },
//   sortChip:      { minHeight: 34, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
//   sortChipActive:{ backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
//   sortChipText:  { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },
//   statsRow:      { minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 },
//   statItem:      { flex: 1, alignItems: 'center' },
//   statValue:     { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
//   statLabel:     { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   statDivider:   { width: 1, height: 28, backgroundColor: COLORS.border },
//   sectionHeader: { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   sectionHeaderLeft: { flex: 1 },
//   sectionEyebrow:{ color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:  { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
//   showingCount:  { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   cardsRow:      { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
//   cardWrap:      { width: CARD_WIDTH, marginRight: CARD_SPACING },
//   card:          { borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)' },
//   cardImageWrap: { position: 'relative' },
//   cardImage:     { width: '100%', height: 176, backgroundColor: COLORS.elevated },
//   cardImagePlaceholder:      { backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
//   cardImagePlaceholderText:  { fontSize: 32, marginBottom: 6 },
//   cardImagePlaceholderLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '600' },
//   cardImageShade:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.10)' },
//   cardImageTopRow: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   // ✅ Multi-image badge
//   multiImgBadge: { position: 'absolute', bottom: 8, left: 10, backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
//   multiImgBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   smallBadge:    { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   smallBadgePrimary: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   smallBadgeText:    { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
//   smallBadgeTextPrimary: { color: '#67E6E8' },
//   saveButton:       { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   saveButtonText:   { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
//   saveButtonTextActive: { color: '#67E6E8' },
//   cardBody:      { padding: 14 },
//   cardTopRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
//   categoryChip:  { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   cardPrice:     { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
//   cardTitle:     { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
//   cardDescription:{ color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   cardFooter:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   metaBlock:     { flex: 1 },
//   metaLabel:     { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
//   metaValue:     { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
//   viewButton:    { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
//   viewButtonText:{ color: '#12343A', fontSize: 12, fontWeight: '700' },
//   paginationRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
//   paginationDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
//   paginationDotActive: { width: 20, backgroundColor: '#67E6E8' },
//   emptyState:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
//   emptyIcon:     { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
//   emptyTitle:    { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText:     { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
//   emptyActionWrap:   { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
//   emptyActionButton: { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
//   emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },
//   marketStrip:   { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
//   marketItem:    { flex: 1, alignItems: 'center' },
//   marketValue:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
//   marketLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },
//   lowerGrid:     { gap: 14, marginBottom: 20 },
//   lowerCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
//   lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   lowerCardTitle:   { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
//   lowerCardText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   lowerTagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
//   lowerTag:      { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   lowerTagText:  { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
// });


// import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, TextInput, Image, Animated, Easing,
//   ScrollView, Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import { useMarketplace } from '../context/MarketplaceContext';

// const ALL_CATEGORY  = 'All';
// const SORT_OPTIONS  = ['Popular', 'Price', 'New'];
// const CARD_WIDTH    = Math.min(292, Dimensions.get('window').width * 0.78);
// const CARD_SPACING  = 14;
// const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.sortChip, active && styles.sortChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text style={[styles.smallBadgeText, variant === 'primary' && styles.smallBadgeTextPrimary]}>
//         {text}
//       </Text>
//     </View>
//   );
// }

// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText = index === 0 ? 'Best Seller' : index === 1 ? 'Popular' : index === 2 ? 'New' : 'Uploaded';

//   // ✅ Get primary image — first from imageUrls array or fallback to imageUrl
//   const primaryImage = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls[0]
//     : item.imageUrl || null;

//   // ✅ All images for mini carousel
//   const allImages = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls
//     : item.imageUrl ? [item.imageUrl] : [];

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           <View style={styles.cardImageWrap}>
//             {primaryImage ? (
//               <Image source={{ uri: primaryImage }} style={styles.cardImage} resizeMode="cover" />
//             ) : (
//               <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
//                 <Text style={styles.cardImagePlaceholderText}>📷</Text>
//                 <Text style={styles.cardImagePlaceholderLabel}>No Image</Text>
//               </View>
//             )}
//             <View style={styles.cardImageShade} />

//             {/* ✅ Multi-image indicator */}
//             {allImages.length > 1 && (
//               <View style={styles.multiImgBadge}>
//                 <Text style={styles.multiImgBadgeText}>+{allImages.length} photos</Text>
//               </View>
//             )}

//             <View style={styles.cardImageTopRow}>
//               <AppBadge text={badgeText} variant={index === 0 ? 'primary' : 'default'} />
//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [styles.saveButton, saved && styles.saveButtonActive, pressed && styles.pressed]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>
//                 ₹{Number(item.price).toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>
//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </Animated.View>
//   );
// }

// export default function AppsScreen({ navigation, route }) {
//   const user             = route?.params?.user || null;
//   const categoryFromRoute= route?.params?.category ?? '';
//   const { apps, loading, refreshApps } = useMarketplace();

//   const [search,          setSearch]          = useState('');
//   const [selectedCategory,setSelectedCategory]= useState(ALL_CATEGORY);
//   const [selectedSort,    setSelectedSort]    = useState('Popular');
//   const [savedIds,        setSavedIds]        = useState([]);
//   const [activeIndex,     setActiveIndex]     = useState(0);

//   // ✅ Only approved apps
//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item?.status ?? '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const categories = useMemo(() => {
//     const unique = [...new Set(approvedApps.map(item => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [approvedApps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   // ✅ Refresh on focus
//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     const filtered = approvedApps.filter(item => {
//       const matchesCategory = selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
//       const matchesSearch   = !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);
//       return matchesCategory && matchesSearch;
//     });

//     if (selectedSort === 'Price') return [...filtered].sort((a, b) => a.price - b.price);
//     if (selectedSort === 'New')   return [...filtered].reverse();
//     return filtered;
//   }, [approvedApps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters = search.trim().length > 0 || selectedCategory !== ALL_CATEGORY || selectedSort !== 'Popular';

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const heroAnim     = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim    = useRef(new Animated.Value(0)).current;
//   const lowerAnim    = useRef(new Animated.Value(0)).current;
//   const emptyAnim    = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map((_, i) => cardAnimsRef.current[i] || new Animated.Value(0));
//   }
//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach(a => a.setValue(0));
//     const seq = Animated.sequence([
//       Animated.timing(headerAnim,   { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(heroAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(controlsAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(statsAnim,    { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(90, cardAnims.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(lowerAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(emptyAnim, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     seq.start();
//     return () => seq.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => { setActiveIndex(0); }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     AsyncStorage.getItem(SAVED_APPS_KEY).then(raw => {
//       const parsed = raw ? JSON.parse(raw) : [];
//       if (Array.isArray(parsed)) setSavedIds(parsed);
//     }).catch(() => {});
//   }, []);

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const getCardStyle = (index) => {
//     const anim = cardAnims[index] || new Animated.Value(1);
//     return {
//       opacity: anim,
//       transform: [
//         { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
//         { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//       ],
//     };
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id) ? savedIds.filter(i => i !== id) : [...savedIds, id];
//     setSavedIds(nextIds);
//     try { await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds)); } catch (_) {}
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
//       <CommonHeader
//         navigation={navigation}
//         title="Apps Marketplace"
//         subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//         showBack showLogo={false}
//         rightLabel="Contact"
//         onRightPress={() => navigation.navigate('Contact')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         onProfilePress={() => navigation.navigate('Profile', { user })}
//       />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
//         {loading && (
//           <View style={styles.loadingWrap}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         )}

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.heroBlock}>
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY ? 'Find the right app for your business' : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones you want to revisit.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.customBanner}>
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>Talk to us for tailored business solutions.</Text>
//             </View>
//             <Pressable onPress={() => navigation.navigate('Contact')} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//               <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.customBannerButton}>
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable onPress={() => navigation.navigate('UploadApp')} style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}>
//             <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadAppButtonGradient}>
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']} style={styles.searchBlock}>
//             <TextInput
//               value={search} onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters && (
//               <Pressable onPress={clearFilters} style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}>
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             )}
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
//             {categories.map(cat => (
//               <FilterChip key={cat} label={cat} active={selectedCategory === cat}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   navigation.setParams?.({ category: cat === ALL_CATEGORY ? undefined : cat });
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
//             {SORT_OPTIONS.map(opt => (
//               <SortChip key={opt} label={opt} active={selectedSort === opt} onPress={() => setSelectedSort(opt)} />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']} style={styles.statsRow}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{approvedApps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>
//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <Animated.ScrollView
//               horizontal showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast" snapToAlignment="start"
//               onMomentumScrollEnd={e => {
//                 const x = e.nativeEvent.contentOffset.x;
//                 setActiveIndex(Math.max(0, Math.min(Math.round(x / SNAP_INTERVAL), filteredApps.length - 1)));
//               }}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id} item={item} index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </Animated.ScrollView>
//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View key={index} style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]} />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No apps found'}</Text>
//             <Text style={styles.emptyText}>
//               {loading ? 'Please wait while we fetch the apps.' : 'Try changing the search, category, or sort option.'}
//             </Text>
//             {!loading && (
//               <Pressable onPress={clearFilters} style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}>
//                 <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.emptyActionButton}>
//                   <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//                 </LinearGradient>
//               </Pressable>
//             )}
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']} style={styles.marketStrip}>
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Premium</Text><Text style={styles.marketLabel}>design quality</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Custom</Text><Text style={styles.marketLabel}>build support</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Fast</Text><Text style={styles.marketLabel}>delivery flow</Text></View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map(cat => (
//                   <View key={cat} style={styles.lowerTag}><Text style={styles.lowerTagText}>{cat}</Text></View>
//                 ))}
//               </View>
//             </LinearGradient>
//             <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>Use filters, sorting, and saved items to narrow down the right app.</Text>
//             </LinearGradient>
//           </View>
//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: COLORS.background },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },
//   loadingWrap:   { alignItems: 'center', paddingVertical: 20 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
//   heroBlock:     { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16 },
//   heroEyebrow:   { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   heroTitle:     { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
//   heroSubtitle:  { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },
//   customBanner:  { minHeight: 76, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
//   customBannerContent: { flex: 1, paddingRight: 8 },
//   customBannerTitle:   { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   customBannerText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   customBannerButton:  { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
//   customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },
//   uploadAppButton:         { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
//   uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//   uploadAppButtonText:     { color: '#12343A', fontSize: 14, fontWeight: '800' },
//   searchBlock:   { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
//   searchInput:   { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },
//   controlsHeaderRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
//   controlsHeaderRowSecondary: { marginBottom: 10 },
//   controlsHeading:  { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   clearFilterButton:{ minHeight: 30, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },
//   filtersRow:    { paddingBottom: 12, gap: 10 },
//   filterChip:    { minHeight: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   filterChipActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   filterChipText:   { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
//   filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },
//   sortRow:       { paddingBottom: 16, gap: 10 },
//   sortChip:      { minHeight: 34, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
//   sortChipActive:{ backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
//   sortChipText:  { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },
//   statsRow:      { minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 },
//   statItem:      { flex: 1, alignItems: 'center' },
//   statValue:     { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
//   statLabel:     { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   statDivider:   { width: 1, height: 28, backgroundColor: COLORS.border },
//   sectionHeader: { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   sectionHeaderLeft: { flex: 1 },
//   sectionEyebrow:{ color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:  { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
//   showingCount:  { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   cardsRow:      { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
//   cardWrap:      { width: CARD_WIDTH, marginRight: CARD_SPACING },
//   card:          { borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)' },
//   cardImageWrap: { position: 'relative' },
//   cardImage:     { width: '100%', height: 176, backgroundColor: COLORS.elevated },
//   cardImagePlaceholder:      { backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
//   cardImagePlaceholderText:  { fontSize: 32, marginBottom: 6 },
//   cardImagePlaceholderLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '600' },
//   cardImageShade:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.10)' },
//   cardImageTopRow: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   // ✅ Multi-image badge
//   multiImgBadge: { position: 'absolute', bottom: 8, left: 10, backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
//   multiImgBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
//   smallBadge:    { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   smallBadgePrimary: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   smallBadgeText:    { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
//   smallBadgeTextPrimary: { color: '#67E6E8' },
//   saveButton:       { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   saveButtonText:   { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
//   saveButtonTextActive: { color: '#67E6E8' },
//   cardBody:      { padding: 14 },
//   cardTopRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
//   categoryChip:  { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   cardPrice:     { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
//   cardTitle:     { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
//   cardDescription:{ color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:{ color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   cardFooter:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   metaBlock:     { flex: 1 },
//   metaLabel:     { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
//   metaValue:     { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
//   viewButton:    { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
//   viewButtonText:{ color: '#12343A', fontSize: 12, fontWeight: '700' },
//   paginationRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
//   paginationDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
//   paginationDotActive: { width: 20, backgroundColor: '#67E6E8' },
//   emptyState:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
//   emptyIcon:     { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
//   emptyTitle:    { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText:     { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
//   emptyActionWrap:   { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
//   emptyActionButton: { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
//   emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },
//   marketStrip:   { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
//   marketItem:    { flex: 1, alignItems: 'center' },
//   marketValue:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
//   marketLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },
//   lowerGrid:     { gap: 14, marginBottom: 20 },
//   lowerCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
//   lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   lowerCardTitle:   { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
//   lowerCardText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   lowerTagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
//   lowerTag:      { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   lowerTagText:  { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
// });

// import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, TextInput, Image, Animated, Easing,
//   ScrollView, Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import { useMarketplace } from '../context/MarketplaceContext';

// const ALL_CATEGORY   = 'All';
// const SORT_OPTIONS   = ['Popular', 'Price', 'New'];
// const SCREEN_WIDTH   = Dimensions.get('window').width;
// const CARD_WIDTH     = Math.min(292, SCREEN_WIDTH * 0.78);
// const CARD_SPACING   = 14;
// const SNAP_INTERVAL  = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.sortChip, active && styles.sortChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text style={[styles.smallBadgeText, variant === 'primary' && styles.smallBadgeTextPrimary]}>
//         {text}
//       </Text>
//     </View>
//   );
// }

// // ── Image Carousel inside card ──────────────────────────────
// function CardImageCarousel({ images, cardWidth }) {
//   const [activeImg, setActiveImg] = useState(0);

//   if (!images || images.length === 0) {
//     return (
//       <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
//         <Text style={styles.cardImagePlaceholderText}>📷</Text>
//         <Text style={styles.cardImagePlaceholderLabel}>No Image</Text>
//       </View>
//     );
//   }

//   if (images.length === 1) {
//     return (
//       <Image
//         source={{ uri: images[0] }}
//         style={styles.cardImage}
//         resizeMode="cover"
//       />
//     );
//   }

//   return (
//     <View style={{ width: cardWidth, height: 176 }}>
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         style={{ width: cardWidth, height: 176 }}
//         onMomentumScrollEnd={e => {
//           const idx = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
//           setActiveImg(Math.max(0, Math.min(idx, images.length - 1)));
//         }}
//       >
//         {images.map((uri, idx) => (
//           <Image
//             key={idx}
//             source={{ uri }}
//             style={{ width: cardWidth, height: 176 }}
//             resizeMode="cover"
//           />
//         ))}
//       </ScrollView>

//       {/* Dot indicators */}
//       <View style={styles.carouselDotRow}>
//         {images.map((_, idx) => (
//           <View
//             key={idx}
//             style={[
//               styles.carouselDot,
//               activeImg === idx && styles.carouselDotActive,
//             ]}
//           />
//         ))}
//       </View>

//       {/* Counter badge */}
//       <View style={styles.carouselCounter}>
//         <Text style={styles.carouselCounterText}>{activeImg + 1}/{images.length}</Text>
//       </View>
//     </View>
//   );
// }

// // ── App Card ─────────────────────────────────────────────────
// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText = index === 0 ? 'Best Seller' : index === 1 ? 'Popular' : index === 2 ? 'New' : 'Uploaded';

//   const allImages = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls
//     : item.imageUrl ? [item.imageUrl] : [];

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           {/* ── Image Carousel ── */}
//           <View style={styles.cardImageWrap}>
//             <CardImageCarousel images={allImages} cardWidth={CARD_WIDTH} />
//             <View style={styles.cardImageShade} />

//             {/* Top row badges */}
//             <View style={styles.cardImageTopRow}>
//               <AppBadge text={badgeText} variant={index === 0 ? 'primary' : 'default'} />
//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [styles.saveButton, saved && styles.saveButtonActive, pressed && styles.pressed]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           {/* ── Card Body ── */}
//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>
//                 ₹{Number(item.price).toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>
//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
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
// export default function AppsScreen({ navigation, route }) {
//   const user              = route?.params?.user || null;
//   const categoryFromRoute = route?.params?.category ?? '';
//   const { apps, loading, refreshApps } = useMarketplace();

//   const [search,           setSearch]           = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
//   const [selectedSort,     setSelectedSort]     = useState('Popular');
//   const [savedIds,         setSavedIds]         = useState([]);
//   const [activeIndex,      setActiveIndex]      = useState(0);

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item?.status ?? '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const categories = useMemo(() => {
//     const unique = [...new Set(approvedApps.map(item => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [approvedApps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     const filtered = approvedApps.filter(item => {
//       const matchesCategory = selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
//       const matchesSearch   = !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);
//       return matchesCategory && matchesSearch;
//     });
//     if (selectedSort === 'Price') return [...filtered].sort((a, b) => a.price - b.price);
//     if (selectedSort === 'New')   return [...filtered].reverse();
//     return filtered;
//   }, [approvedApps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters = search.trim().length > 0 || selectedCategory !== ALL_CATEGORY || selectedSort !== 'Popular';

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const heroAnim     = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim    = useRef(new Animated.Value(0)).current;
//   const lowerAnim    = useRef(new Animated.Value(0)).current;
//   const emptyAnim    = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map((_, i) => cardAnimsRef.current[i] || new Animated.Value(0));
//   }
//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach(a => a.setValue(0));
//     const seq = Animated.sequence([
//       Animated.timing(headerAnim,   { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(heroAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(controlsAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(statsAnim,    { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(90, cardAnims.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(lowerAnim,  { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(emptyAnim,  { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     seq.start();
//     return () => seq.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => { setActiveIndex(0); }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     AsyncStorage.getItem(SAVED_APPS_KEY).then(raw => {
//       const parsed = raw ? JSON.parse(raw) : [];
//       if (Array.isArray(parsed)) setSavedIds(parsed);
//     }).catch(() => {});
//   }, []);

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const getCardStyle = (index) => {
//     const anim = cardAnims[index] || new Animated.Value(1);
//     return {
//       opacity: anim,
//       transform: [
//         { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
//         { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//       ],
//     };
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id) ? savedIds.filter(i => i !== id) : [...savedIds, id];
//     setSavedIds(nextIds);
//     try { await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds)); } catch (_) {}
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
//       <CommonHeader
//         navigation={navigation}
//         title="Apps Marketplace"
//         subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//         showBack showLogo={false}
//         rightLabel="Contact"
//         onRightPress={() => navigation.navigate('Contact')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         onProfilePress={() => navigation.navigate('Profile', { user })}
//       />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
//         {loading && (
//           <View style={styles.loadingWrap}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         )}

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.heroBlock}>
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY ? 'Find the right app for your business' : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones you want to revisit.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.customBanner}>
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>Talk to us for tailored business solutions.</Text>
//             </View>
//             <Pressable onPress={() => navigation.navigate('Contact')} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//               <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.customBannerButton}>
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable onPress={() => navigation.navigate('UploadApp')} style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}>
//             <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadAppButtonGradient}>
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']} style={styles.searchBlock}>
//             <TextInput
//               value={search} onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters && (
//               <Pressable onPress={clearFilters} style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}>
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             )}
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
//             {categories.map(cat => (
//               <FilterChip key={cat} label={cat} active={selectedCategory === cat}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   navigation.setParams?.({ category: cat === ALL_CATEGORY ? undefined : cat });
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
//             {SORT_OPTIONS.map(opt => (
//               <SortChip key={opt} label={opt} active={selectedSort === opt} onPress={() => setSelectedSort(opt)} />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']} style={styles.statsRow}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{approvedApps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>
//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <Animated.ScrollView
//               horizontal showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               snapToAlignment="start"
//               onMomentumScrollEnd={e => {
//                 const x = e.nativeEvent.contentOffset.x;
//                 setActiveIndex(Math.max(0, Math.min(Math.round(x / SNAP_INTERVAL), filteredApps.length - 1)));
//               }}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id}
//                   item={item}
//                   index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </Animated.ScrollView>
//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View key={index} style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]} />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No apps found'}</Text>
//             <Text style={styles.emptyText}>
//               {loading ? 'Please wait while we fetch the apps.' : 'Try changing the search, category, or sort option.'}
//             </Text>
//             {!loading && (
//               <Pressable onPress={clearFilters} style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}>
//                 <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.emptyActionButton}>
//                   <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//                 </LinearGradient>
//               </Pressable>
//             )}
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']} style={styles.marketStrip}>
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Premium</Text><Text style={styles.marketLabel}>design quality</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Custom</Text><Text style={styles.marketLabel}>build support</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Fast</Text><Text style={styles.marketLabel}>delivery flow</Text></View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map(cat => (
//                   <View key={cat} style={styles.lowerTag}><Text style={styles.lowerTagText}>{cat}</Text></View>
//                 ))}
//               </View>
//             </LinearGradient>
//             <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>Use filters, sorting, and saved items to narrow down the right app.</Text>
//             </LinearGradient>
//           </View>
//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: COLORS.background },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },
//   loadingWrap:   { alignItems: 'center', paddingVertical: 20 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
//   heroBlock:     { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16 },
//   heroEyebrow:   { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   heroTitle:     { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
//   heroSubtitle:  { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },
//   customBanner:  { minHeight: 76, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
//   customBannerContent:    { flex: 1, paddingRight: 8 },
//   customBannerTitle:      { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   customBannerText:       { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   customBannerButton:     { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
//   customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },
//   uploadAppButton:         { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
//   uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//   uploadAppButtonText:     { color: '#12343A', fontSize: 14, fontWeight: '800' },
//   searchBlock:   { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
//   searchInput:   { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },
//   controlsHeaderRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
//   controlsHeaderRowSecondary: { marginBottom: 10 },
//   controlsHeading:       { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   clearFilterButton:     { minHeight: 30, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },
//   filtersRow:    { paddingBottom: 12, gap: 10 },
//   filterChip:    { minHeight: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   filterChipActive:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   filterChipText:       { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
//   filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },
//   sortRow:       { paddingBottom: 16, gap: 10 },
//   sortChip:      { minHeight: 34, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
//   sortChipActive:     { backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
//   sortChipText:       { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },
//   statsRow:      { minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 },
//   statItem:      { flex: 1, alignItems: 'center' },
//   statValue:     { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
//   statLabel:     { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   statDivider:   { width: 1, height: 28, backgroundColor: COLORS.border },
//   sectionHeader: { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   sectionHeaderLeft: { flex: 1 },
//   sectionEyebrow:{ color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:  { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
//   showingCount:  { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   cardsRow:      { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
//   cardWrap:      { width: CARD_WIDTH, marginRight: CARD_SPACING },
//   card:          { borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)' },

//   // ── Image area ──
//   cardImageWrap: { position: 'relative' },
//   cardImage:     { width: '100%', height: 176, backgroundColor: COLORS.elevated },
//   cardImagePlaceholder:      { backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
//   cardImagePlaceholderText:  { fontSize: 32, marginBottom: 6 },
//   cardImagePlaceholderLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '600' },
//   cardImageShade:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.10)', pointerEvents: 'none' },
//   cardImageTopRow: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

//   // ── Carousel dots ──
//   carouselDotRow: {
//     position: 'absolute',
//     bottom: 6,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 5,
//   },
//   carouselDot: {
//     width: 5,
//     height: 5,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255,255,255,0.40)',
//   },
//   carouselDotActive: {
//     width: 14,
//     backgroundColor: '#67E6E8',
//   },
//   carouselCounter: {
//     position: 'absolute',
//     bottom: 8,
//     right: 10,
//     backgroundColor: 'rgba(0,0,0,0.60)',
//     borderRadius: 8,
//     paddingHorizontal: 7,
//     paddingVertical: 3,
//   },
//   carouselCounterText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },

//   // ── Badges ──
//   smallBadge:        { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   smallBadgePrimary: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   smallBadgeText:         { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
//   smallBadgeTextPrimary:  { color: '#67E6E8' },
//   saveButton:       { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   saveButtonText:       { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
//   saveButtonTextActive: { color: '#67E6E8' },

//   // ── Card body ──
//   cardBody:       { padding: 14 },
//   cardTopRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
//   categoryChip:   { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   cardPrice:      { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
//   cardTitle:      { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
//   cardDescription:{ color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:     { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText: { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   cardFooter:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   metaBlock:      { flex: 1 },
//   metaLabel:      { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
//   metaValue:      { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
//   viewButton:     { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
//   viewButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   // ── Pagination ──
//   paginationRow:      { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
//   paginationDot:      { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
//   paginationDotActive:{ width: 20, backgroundColor: '#67E6E8' },

//   // ── Empty ──
//   emptyState:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
//   emptyIcon:     { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
//   emptyTitle:    { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText:     { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
//   emptyActionWrap:       { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
//   emptyActionButton:     { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
//   emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },

//   // ── Lower ──
//   marketStrip:   { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
//   marketItem:    { flex: 1, alignItems: 'center' },
//   marketValue:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
//   marketLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },
//   lowerGrid:     { gap: 14, marginBottom: 20 },
//   lowerCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
//   lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   lowerCardTitle:   { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
//   lowerCardText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   lowerTagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
//   lowerTag:      { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   lowerTagText:  { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
// });


// import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, TextInput, Image, Animated, Easing,
//   ScrollView, Dimensions, FlatList,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import { useMarketplace } from '../context/MarketplaceContext';

// const ALL_CATEGORY   = 'All';
// const SORT_OPTIONS   = ['Popular', 'Price', 'New'];
// const SCREEN_WIDTH   = Dimensions.get('window').width;
// const CARD_WIDTH     = Math.min(292, SCREEN_WIDTH * 0.78);
// const CARD_SPACING   = 14;
// const SNAP_INTERVAL  = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.sortChip, active && styles.sortChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text style={[styles.smallBadgeText, variant === 'primary' && styles.smallBadgeTextPrimary]}>
//         {text}
//       </Text>
//     </View>
//   );
// }

// // ── Image Carousel ───────────────────────────────────────────
// function CardImageCarousel({ images }) {
//   const [activeImg, setActiveImg] = useState(0);
//   const scrollRef = useRef(null);

//   if (!images || images.length === 0) {
//     return (
//       <View style={styles.cardImage}>
//         <View style={styles.cardImagePlaceholder}>
//           <Text style={styles.cardImagePlaceholderText}>📷</Text>
//           <Text style={styles.cardImagePlaceholderLabel}>No Image</Text>
//         </View>
//       </View>
//     );
//   }

//   if (images.length === 1) {
//     return (
//       <Image
//         source={{ uri: images[0] }}
//         style={styles.cardImage}
//         resizeMode="cover"
//       />
//     );
//   }

//   return (
//     <View style={styles.carouselWrap}>
//       <ScrollView
//         ref={scrollRef}
//         horizontal
//         pagingEnabled
//         scrollEnabled
//         nestedScrollEnabled
//         directionalLockEnabled
//         showsHorizontalScrollIndicator={false}
//         decelerationRate="fast"
//         disableIntervalMomentum
//         onMomentumScrollEnd={e => {
//           const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
//           setActiveImg(Math.max(0, Math.min(idx, images.length - 1)));
//         }}
//         style={{ width: CARD_WIDTH, height: 176 }}
//         contentContainerStyle={{ width: CARD_WIDTH * images.length }}
//       >
//         {images.map((uri, idx) => (
//           <Image
//             key={idx}
//             source={{ uri }}
//             style={{ width: CARD_WIDTH, height: 176 }}
//             resizeMode="cover"
//           />
//         ))}
//       </ScrollView>

//       {/* Dot indicators */}
//       <View style={styles.carouselDotRow}>
//         {images.map((_, idx) => (
//           <View
//             key={idx}
//             style={[styles.carouselDot, activeImg === idx && styles.carouselDotActive]}
//           />
//         ))}
//       </View>

//       {/* Counter */}
//       <View style={styles.carouselCounter}>
//         <Text style={styles.carouselCounterText}>{activeImg + 1}/{images.length}</Text>
//       </View>
//     </View>
//   );
// }

// // ── App Card ─────────────────────────────────────────────────
// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText = index === 0 ? 'Best Seller' : index === 1 ? 'Popular' : index === 2 ? 'New' : 'Uploaded';

//   const allImages = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls
//     : item.imageUrl ? [item.imageUrl] : [];

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           {/* ── Image Carousel ── */}
//           <View style={styles.cardImageWrap}>
//             <CardImageCarousel images={allImages} />
//             <View style={styles.cardImageShade} pointerEvents="none" />
//             <View style={styles.cardImageTopRow} pointerEvents="box-none">
//               <AppBadge text={badgeText} variant={index === 0 ? 'primary' : 'default'} />
//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [
//                   styles.saveButton,
//                   saved && styles.saveButtonActive,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           {/* ── Card Body ── */}
//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>
//                 ₹{Number(item.price).toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>
//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>
//               <Pressable
//                 onPress={onPress}
//                 style={({ pressed }) => [pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
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
// export default function AppsScreen({ navigation, route }) {
//   const user              = route?.params?.user || null;
//   const categoryFromRoute = route?.params?.category ?? '';
//   const { apps, loading, refreshApps } = useMarketplace();

//   const [search,           setSearch]           = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
//   const [selectedSort,     setSelectedSort]     = useState('Popular');
//   const [savedIds,         setSavedIds]         = useState([]);
//   const [activeIndex,      setActiveIndex]      = useState(0);

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item?.status ?? '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const categories = useMemo(() => {
//     const unique = [...new Set(approvedApps.map(item => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [approvedApps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     const filtered = approvedApps.filter(item => {
//       const matchesCategory =
//         selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
//       const matchesSearch =
//         !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);
//       return matchesCategory && matchesSearch;
//     });
//     if (selectedSort === 'Price') return [...filtered].sort((a, b) => a.price - b.price);
//     if (selectedSort === 'New')   return [...filtered].reverse();
//     return filtered;
//   }, [approvedApps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters =
//     search.trim().length > 0 ||
//     selectedCategory !== ALL_CATEGORY ||
//     selectedSort !== 'Popular';

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const heroAnim     = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim    = useRef(new Animated.Value(0)).current;
//   const lowerAnim    = useRef(new Animated.Value(0)).current;
//   const emptyAnim    = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map(
//       (_, i) => cardAnimsRef.current[i] || new Animated.Value(0)
//     );
//   }
//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach(a => a.setValue(0));
//     const seq = Animated.sequence([
//       Animated.timing(headerAnim,   { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(heroAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(controlsAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(statsAnim,    { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(90, cardAnims.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(lowerAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(emptyAnim, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     seq.start();
//     return () => seq.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => { setActiveIndex(0); }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     AsyncStorage.getItem(SAVED_APPS_KEY).then(raw => {
//       const parsed = raw ? JSON.parse(raw) : [];
//       if (Array.isArray(parsed)) setSavedIds(parsed);
//     }).catch(() => {});
//   }, []);

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const getCardStyle = (index) => {
//     const anim = cardAnims[index] || new Animated.Value(1);
//     return {
//       opacity: anim,
//       transform: [
//         { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
//         { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//       ],
//     };
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id)
//       ? savedIds.filter(i => i !== id)
//       : [...savedIds, id];
//     setSavedIds(nextIds);
//     try { await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds)); } catch (_) {}
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
//       <CommonHeader
//         navigation={navigation}
//         title="Apps Marketplace"
//         subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//         showBack showLogo={false}
//         rightLabel="Contact"
//         onRightPress={() => navigation.navigate('Contact')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         onProfilePress={() => navigation.navigate('Profile', { user })}
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         {loading && (
//           <View style={styles.loadingWrap}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         )}

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//             style={styles.heroBlock}
//           >
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY
//                 ? 'Find the right app for your business'
//                 : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones you want to revisit.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//             style={styles.customBanner}
//           >
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>Talk to us for tailored business solutions.</Text>
//             </View>
//             <Pressable
//               onPress={() => navigation.navigate('Contact')}
//               style={({ pressed }) => [pressed && styles.buttonPressed]}
//             >
//               <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.customBannerButton}>
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable
//             onPress={() => navigation.navigate('UploadApp')}
//             style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}
//           >
//             <LinearGradient
//               colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//               style={styles.uploadAppButtonGradient}
//             >
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//             style={styles.searchBlock}
//           >
//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters && (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}
//               >
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             )}
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.filtersRow}
//           >
//             {categories.map(cat => (
//               <FilterChip
//                 key={cat}
//                 label={cat}
//                 active={selectedCategory === cat}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   navigation.setParams?.({ category: cat === ALL_CATEGORY ? undefined : cat });
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.sortRow}
//           >
//             {SORT_OPTIONS.map(opt => (
//               <SortChip
//                 key={opt}
//                 label={opt}
//                 active={selectedSort === opt}
//                 onPress={() => setSelectedSort(opt)}
//               />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.statsRow}
//           >
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{approvedApps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>
//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             {/* ── Cards as vertical FlatList rendered horizontally via ScrollView ── */}
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               snapToAlignment="start"
//               scrollEventThrottle={16}
//               onMomentumScrollEnd={e => {
//                 const x = e.nativeEvent.contentOffset.x;
//                 setActiveIndex(
//                   Math.max(0, Math.min(Math.round(x / SNAP_INTERVAL), filteredApps.length - 1))
//                 );
//               }}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id}
//                   item={item}
//                   index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </ScrollView>

//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.paginationDot,
//                     index === activeIndex && styles.paginationDotActive,
//                   ]}
//                 />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No apps found'}</Text>
//             <Text style={styles.emptyText}>
//               {loading
//                 ? 'Please wait while we fetch the apps.'
//                 : 'Try changing the search, category, or sort option.'}
//             </Text>
//             {!loading && (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   style={styles.emptyActionButton}
//                 >
//                   <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//                 </LinearGradient>
//               </Pressable>
//             )}
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.marketStrip}
//           >
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Premium</Text>
//               <Text style={styles.marketLabel}>design quality</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Custom</Text>
//               <Text style={styles.marketLabel}>build support</Text>
//             </View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}>
//               <Text style={styles.marketValue}>Fast</Text>
//               <Text style={styles.marketLabel}>delivery flow</Text>
//             </View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map(cat => (
//                   <View key={cat} style={styles.lowerTag}>
//                     <Text style={styles.lowerTagText}>{cat}</Text>
//                   </View>
//                 ))}
//               </View>
//             </LinearGradient>
//             <LinearGradient
//               colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//               style={styles.lowerCard}
//             >
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>
//                 Use filters, sorting, and saved items to narrow down the right app.
//               </Text>
//             </LinearGradient>
//           </View>
//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: COLORS.background },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },
//   loadingWrap:   { alignItems: 'center', paddingVertical: 20 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },

//   heroBlock:     { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16 },
//   heroEyebrow:   { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   heroTitle:     { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
//   heroSubtitle:  { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },

//   customBanner:        { minHeight: 76, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
//   customBannerContent: { flex: 1, paddingRight: 8 },
//   customBannerTitle:   { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   customBannerText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   customBannerButton:  { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
//   customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   uploadAppButton:         { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
//   uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//   uploadAppButtonText:     { color: '#12343A', fontSize: 14, fontWeight: '800' },

//   searchBlock: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
//   searchInput: { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },

//   controlsHeaderRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
//   controlsHeaderRowSecondary: { marginBottom: 10 },
//   controlsHeading:       { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   clearFilterButton:     { minHeight: 30, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },

//   filtersRow: { paddingBottom: 12, gap: 10 },
//   filterChip: { minHeight: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   filterChipActive:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   filterChipText:       { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
//   filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },

//   sortRow:        { paddingBottom: 16, gap: 10 },
//   sortChip:       { minHeight: 34, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
//   sortChipActive: { backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
//   sortChipText:       { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },

//   statsRow:    { minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 },
//   statItem:    { flex: 1, alignItems: 'center' },
//   statValue:   { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
//   statLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   statDivider: { width: 1, height: 28, backgroundColor: COLORS.border },

//   sectionHeader:     { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   sectionHeaderLeft: { flex: 1 },
//   sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:      { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
//   showingCount:      { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },

//   cardsRow: { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
//   cardWrap:  { width: CARD_WIDTH, marginRight: CARD_SPACING },
//   card:      { borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)' },

//   // ── Image ──
//   cardImageWrap:  { position: 'relative', overflow: 'hidden' },
//   cardImage:      { width: CARD_WIDTH, height: 176, backgroundColor: COLORS.elevated },
//   cardImagePlaceholder:      { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   cardImagePlaceholderText:  { fontSize: 32, marginBottom: 6 },
//   cardImagePlaceholderLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '600' },
//   cardImageShade:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.10)' },
//   cardImageTopRow: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

//   // ── Carousel ──
//   carouselWrap: { width: CARD_WIDTH, height: 176, overflow: 'hidden' },
//   carouselDotRow: {
//     position: 'absolute',
//     bottom: 6,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 5,
//   },
//   carouselDot:       { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.45)' },
//   carouselDotActive: { width: 14, backgroundColor: '#67E6E8' },
//   carouselCounter:   { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.60)', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
//   carouselCounterText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },

//   // ── Badges ──
//   smallBadge:            { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   smallBadgePrimary:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   smallBadgeText:        { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
//   smallBadgeTextPrimary: { color: '#67E6E8' },
//   saveButton:       { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   saveButtonText:       { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
//   saveButtonTextActive: { color: '#67E6E8' },

//   // ── Card body ──
//   cardBody:        { padding: 14 },
//   cardTopRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
//   categoryChip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText:{ color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   cardPrice:       { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
//   cardTitle:       { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
//   cardDescription: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:      { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:  { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   cardFooter:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   metaBlock:       { flex: 1 },
//   metaLabel:       { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
//   metaValue:       { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
//   viewButton:      { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
//   viewButtonText:  { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   paginationRow:      { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
//   paginationDot:      { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
//   paginationDotActive:{ width: 20, backgroundColor: '#67E6E8' },

//   emptyState:            { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
//   emptyIcon:             { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
//   emptyTitle:            { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText:             { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
//   emptyActionWrap:       { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
//   emptyActionButton:     { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
//   emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },

//   marketStrip:   { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
//   marketItem:    { flex: 1, alignItems: 'center' },
//   marketValue:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
//   marketLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },

//   lowerGrid:        { gap: 14, marginBottom: 20 },
//   lowerCard:        { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
//   lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   lowerCardTitle:   { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
//   lowerCardText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   lowerTagsWrap:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
//   lowerTag:         { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   lowerTagText:     { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
// });

// import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, TextInput, Image, Animated, Easing,
//   ScrollView, Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import { useMarketplace } from '../context/MarketplaceContext';

// const ALL_CATEGORY   = 'All';
// const SORT_OPTIONS   = ['Popular', 'Price', 'New'];
// const SCREEN_WIDTH   = Dimensions.get('window').width;
// const CARD_WIDTH     = Math.min(292, SCREEN_WIDTH * 0.78);
// const CARD_SPACING   = 14;
// const SNAP_INTERVAL  = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.sortChip, active && styles.sortChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text style={[styles.smallBadgeText, variant === 'primary' && styles.smallBadgeTextPrimary]}>
//         {text}
//       </Text>
//     </View>
//   );
// }

// // ── Image Carousel — tap dots to navigate ────────────────────
// function CardImageCarousel({ images }) {
//   const [activeImg, setActiveImg] = useState(0);
//   const scrollRef = useRef(null);

//   const goTo = (idx) => {
//     setActiveImg(idx);
//     scrollRef.current?.scrollTo({ x: idx * CARD_WIDTH, animated: true });
//   };

//   if (!images || images.length === 0) {
//     return (
//       <View style={styles.carouselWrap}>
//         <View style={styles.cardImagePlaceholder}>
//           <Text style={styles.cardImagePlaceholderText}>📷</Text>
//           <Text style={styles.cardImagePlaceholderLabel}>No Image</Text>
//         </View>
//       </View>
//     );
//   }

//   if (images.length === 1) {
//     return (
//       <View style={styles.carouselWrap}>
//         <Image source={{ uri: images[0] }} style={styles.carouselImg} resizeMode="cover" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.carouselWrap}>
//       {/* Show current image — no scrollview needed, tap dots */}
//       <Image
//         source={{ uri: images[activeImg] }}
//         style={styles.carouselImg}
//         resizeMode="cover"
//       />

//       {/* Counter top-right */}
//       <View style={styles.carouselCounter}>
//         <Text style={styles.carouselCounterText}>{activeImg + 1}/{images.length}</Text>
//       </View>

//       {/* Tappable dot row */}
//       <View style={styles.carouselDotRow}>
//         {images.map((_, idx) => (
//           <Pressable key={idx} onPress={() => goTo(idx)} hitSlop={8}>
//             <View style={[styles.carouselDot, activeImg === idx && styles.carouselDotActive]} />
//           </Pressable>
//         ))}
//       </View>

//       {/* Left / Right arrow buttons */}
//       {activeImg > 0 && (
//         <Pressable style={styles.carouselArrowLeft} onPress={() => goTo(activeImg - 1)}>
//           <View style={styles.carouselArrowBtn}>
//             <Text style={styles.carouselArrowText}>‹</Text>
//           </View>
//         </Pressable>
//       )}
//       {activeImg < images.length - 1 && (
//         <Pressable style={styles.carouselArrowRight} onPress={() => goTo(activeImg + 1)}>
//           <View style={styles.carouselArrowBtn}>
//             <Text style={styles.carouselArrowText}>›</Text>
//           </View>
//         </Pressable>
//       )}
//     </View>
//   );
// }

// // ── App Card ─────────────────────────────────────────────────
// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText = index === 0 ? 'Best Seller' : index === 1 ? 'Popular' : index === 2 ? 'New' : 'Uploaded';

//   const allImages = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls
//     : item.imageUrl ? [item.imageUrl] : [];

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           {/* ── Image Carousel ── */}
//           <View style={styles.cardImageWrap}>
//             <CardImageCarousel images={allImages} />
//             <View style={styles.cardImageShade} pointerEvents="none" />
//             <View style={styles.cardImageTopRow} pointerEvents="box-none">
//               <AppBadge text={badgeText} variant={index === 0 ? 'primary' : 'default'} />
//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [
//                   styles.saveButton,
//                   saved && styles.saveButtonActive,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           {/* ── Card Body ── */}
//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>
//                 ₹{Number(item.price).toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>
//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
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
// export default function AppsScreen({ navigation, route }) {
//   const user              = route?.params?.user || null;
//   const categoryFromRoute = route?.params?.category ?? '';
//   const { apps, loading, refreshApps } = useMarketplace();

//   const [search,           setSearch]           = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
//   const [selectedSort,     setSelectedSort]     = useState('Popular');
//   const [savedIds,         setSavedIds]         = useState([]);
//   const [activeIndex,      setActiveIndex]      = useState(0);

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item?.status ?? '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const categories = useMemo(() => {
//     const unique = [...new Set(approvedApps.map(item => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [approvedApps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     const filtered = approvedApps.filter(item => {
//       const matchesCategory =
//         selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
//       const matchesSearch =
//         !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);
//       return matchesCategory && matchesSearch;
//     });
//     if (selectedSort === 'Price') return [...filtered].sort((a, b) => a.price - b.price);
//     if (selectedSort === 'New')   return [...filtered].reverse();
//     return filtered;
//   }, [approvedApps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters =
//     search.trim().length > 0 ||
//     selectedCategory !== ALL_CATEGORY ||
//     selectedSort !== 'Popular';

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const heroAnim     = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim    = useRef(new Animated.Value(0)).current;
//   const lowerAnim    = useRef(new Animated.Value(0)).current;
//   const emptyAnim    = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map(
//       (_, i) => cardAnimsRef.current[i] || new Animated.Value(0)
//     );
//   }
//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach(a => a.setValue(0));
//     const seq = Animated.sequence([
//       Animated.timing(headerAnim,   { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(heroAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(controlsAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(statsAnim,    { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(90, cardAnims.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(lowerAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(emptyAnim, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     seq.start();
//     return () => seq.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => { setActiveIndex(0); }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     AsyncStorage.getItem(SAVED_APPS_KEY).then(raw => {
//       const parsed = raw ? JSON.parse(raw) : [];
//       if (Array.isArray(parsed)) setSavedIds(parsed);
//     }).catch(() => {});
//   }, []);

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const getCardStyle = (index) => {
//     const anim = cardAnims[index] || new Animated.Value(1);
//     return {
//       opacity: anim,
//       transform: [
//         { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
//         { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//       ],
//     };
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id)
//       ? savedIds.filter(i => i !== id)
//       : [...savedIds, id];
//     setSavedIds(nextIds);
//     try { await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds)); } catch (_) {}
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
//       <CommonHeader
//         navigation={navigation}
//         title="Apps Marketplace"
//         subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//         showBack showLogo={false}
//         rightLabel="Contact"
//         onRightPress={() => navigation.navigate('Contact')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         onProfilePress={() => navigation.navigate('Profile', { user })}
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         {loading && (
//           <View style={styles.loadingWrap}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         )}

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//             style={styles.heroBlock}
//           >
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY
//                 ? 'Find the right app for your business'
//                 : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones you want to revisit.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//             style={styles.customBanner}
//           >
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>Talk to us for tailored business solutions.</Text>
//             </View>
//             <Pressable
//               onPress={() => navigation.navigate('Contact')}
//               style={({ pressed }) => [pressed && styles.buttonPressed]}
//             >
//               <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.customBannerButton}>
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable
//             onPress={() => navigation.navigate('UploadApp')}
//             style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}
//           >
//             <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadAppButtonGradient}>
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//             style={styles.searchBlock}
//           >
//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters && (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}
//               >
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             )}
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
//             {categories.map(cat => (
//               <FilterChip
//                 key={cat} label={cat} active={selectedCategory === cat}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   navigation.setParams?.({ category: cat === ALL_CATEGORY ? undefined : cat });
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
//             {SORT_OPTIONS.map(opt => (
//               <SortChip key={opt} label={opt} active={selectedSort === opt} onPress={() => setSelectedSort(opt)} />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.statsRow}
//           >
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{approvedApps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>
//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               snapToAlignment="start"
//               scrollEventThrottle={16}
//               onMomentumScrollEnd={e => {
//                 const x = e.nativeEvent.contentOffset.x;
//                 setActiveIndex(Math.max(0, Math.min(Math.round(x / SNAP_INTERVAL), filteredApps.length - 1)));
//               }}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id}
//                   item={item}
//                   index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </ScrollView>

//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]}
//                 />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No apps found'}</Text>
//             <Text style={styles.emptyText}>
//               {loading
//                 ? 'Please wait while we fetch the apps.'
//                 : 'Try changing the search, category, or sort option.'}
//             </Text>
//             {!loading && (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.emptyActionButton}>
//                   <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//                 </LinearGradient>
//               </Pressable>
//             )}
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.marketStrip}
//           >
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Premium</Text><Text style={styles.marketLabel}>design quality</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Custom</Text><Text style={styles.marketLabel}>build support</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Fast</Text><Text style={styles.marketLabel}>delivery flow</Text></View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map(cat => (
//                   <View key={cat} style={styles.lowerTag}><Text style={styles.lowerTagText}>{cat}</Text></View>
//                 ))}
//               </View>
//             </LinearGradient>
//             <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>Use filters, sorting, and saved items to narrow down the right app.</Text>
//             </LinearGradient>
//           </View>
//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: COLORS.background },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },
//   loadingWrap:   { alignItems: 'center', paddingVertical: 20 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },

//   heroBlock:    { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16 },
//   heroEyebrow:  { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   heroTitle:    { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
//   heroSubtitle: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },

//   customBanner:        { minHeight: 76, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
//   customBannerContent: { flex: 1, paddingRight: 8 },
//   customBannerTitle:   { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   customBannerText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   customBannerButton:  { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
//   customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   uploadAppButton:         { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
//   uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//   uploadAppButtonText:     { color: '#12343A', fontSize: 14, fontWeight: '800' },

//   searchBlock: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
//   searchInput: { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },

//   controlsHeaderRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
//   controlsHeaderRowSecondary: { marginBottom: 10 },
//   controlsHeading:       { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   clearFilterButton:     { minHeight: 30, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },

//   filtersRow: { paddingBottom: 12, gap: 10 },
//   filterChip: { minHeight: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   filterChipActive:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   filterChipText:       { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
//   filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },

//   sortRow:        { paddingBottom: 16, gap: 10 },
//   sortChip:       { minHeight: 34, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
//   sortChipActive: { backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
//   sortChipText:       { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },

//   statsRow:    { minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 },
//   statItem:    { flex: 1, alignItems: 'center' },
//   statValue:   { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
//   statLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   statDivider: { width: 1, height: 28, backgroundColor: COLORS.border },

//   sectionHeader:     { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   sectionHeaderLeft: { flex: 1 },
//   sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:      { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
//   showingCount:      { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },

//   cardsRow: { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
//   cardWrap:  { width: CARD_WIDTH, marginRight: CARD_SPACING },
//   card:      { borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)' },

//   // ── Image wrap ──
//   cardImageWrap:  { position: 'relative' },
//   cardImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.08)' },
//   cardImageTopRow:{ position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

//   // ── Carousel ──
//   carouselWrap: {
//     width: CARD_WIDTH,
//     height: 176,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },
//   carouselImg: {
//     width: CARD_WIDTH,
//     height: 176,
//   },
//   carouselDotRow: {
//     position: 'absolute',
//     bottom: 8,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 6,
//   },
//   carouselDot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.40)' },
//   carouselDotActive: { width: 16, backgroundColor: '#67E6E8' },
//   carouselCounter: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'rgba(0,0,0,0.55)',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//   },
//   carouselCounterText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },

//   // ── Arrow buttons ──
//   carouselArrowLeft: {
//     position: 'absolute',
//     left: 8,
//     top: '50%',
//     marginTop: -18,
//   },
//   carouselArrowRight: {
//     position: 'absolute',
//     right: 8,
//     top: '50%',
//     marginTop: -18,
//   },
//   carouselArrowBtn: {
//     width: 32,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: 'rgba(0,0,0,0.50)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.15)',
//   },
//   carouselArrowText: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', lineHeight: 26 },

//   // ── placeholder ──
//   cardImagePlaceholder:      { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
//   cardImagePlaceholderText:  { fontSize: 32, marginBottom: 6 },
//   cardImagePlaceholderLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '600' },

//   // ── Badges ──
//   smallBadge:            { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   smallBadgePrimary:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   smallBadgeText:        { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
//   smallBadgeTextPrimary: { color: '#67E6E8' },
//   saveButton:       { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   saveButtonText:       { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
//   saveButtonTextActive: { color: '#67E6E8' },

//   // ── Card body ──
//   cardBody:        { padding: 14 },
//   cardTopRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
//   categoryChip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText:{ color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   cardPrice:       { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
//   cardTitle:       { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
//   cardDescription: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:      { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:  { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   cardFooter:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   metaBlock:       { flex: 1 },
//   metaLabel:       { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
//   metaValue:       { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
//   viewButton:      { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
//   viewButtonText:  { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   paginationRow:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
//   paginationDot:       { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
//   paginationDotActive: { width: 20, backgroundColor: '#67E6E8' },

//   emptyState:            { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
//   emptyIcon:             { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
//   emptyTitle:            { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText:             { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
//   emptyActionWrap:       { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
//   emptyActionButton:     { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
//   emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },

//   marketStrip:   { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
//   marketItem:    { flex: 1, alignItems: 'center' },
//   marketValue:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
//   marketLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },

//   lowerGrid:        { gap: 14, marginBottom: 20 },
//   lowerCard:        { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
//   lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   lowerCardTitle:   { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
//   lowerCardText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   lowerTagsWrap:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
//   lowerTag:         { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   lowerTagText:     { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
// });


// import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, TextInput, Animated, Easing,
//   ScrollView, Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonFooter from '../components/CommonFooter';
// import CommonHeader from '../components/common/CommonHeader';
// import { useMarketplace } from '../context/MarketplaceContext';
// import SharedImageCarousel from '../components/SharedImageCarousel'; // ✅ shared carousel

// const ALL_CATEGORY   = 'All';
// const SORT_OPTIONS   = ['Popular', 'Price', 'New'];
// const SCREEN_WIDTH   = Dimensions.get('window').width;
// const CARD_WIDTH     = Math.min(292, SCREEN_WIDTH * 0.78);
// const CARD_SPACING   = 14;
// const SNAP_INTERVAL  = CARD_WIDTH + CARD_SPACING;
// const SAVED_APPS_KEY = 'sat_saved_apps';

// function FilterChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function SortChip({ label, active, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.sortChip, active && styles.sortChipActive, pressed && styles.pressed]}
//     >
//       <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{label}</Text>
//     </Pressable>
//   );
// }

// function AppBadge({ text, variant = 'default' }) {
//   return (
//     <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
//       <Text style={[styles.smallBadgeText, variant === 'primary' && styles.smallBadgeTextPrimary]}>
//         {text}
//       </Text>
//     </View>
//   );
// }

// // ── App Card ─────────────────────────────────────────────────
// function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
//   const badgeText = index === 0 ? 'Best Seller' : index === 1 ? 'Popular' : index === 2 ? 'New' : 'Uploaded';

//   const allImages = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
//     ? item.imageUrls
//     : item.imageUrl ? [item.imageUrl] : [];

//   return (
//     <Animated.View style={animatedStyle}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//           style={styles.card}
//         >
//           {/* ── Image Carousel ── */}
//           <View style={styles.cardImageWrap}>
//             {/* ✅ SharedImageCarousel — same tap-dot/arrow UX */}
//             <SharedImageCarousel
//               images={allImages}
//               width={CARD_WIDTH}
//               height={176}
//             />
//             <View style={styles.cardImageShade} pointerEvents="none" />
//             <View style={styles.cardImageTopRow} pointerEvents="box-none">
//               <AppBadge text={badgeText} variant={index === 0 ? 'primary' : 'default'} />
//               <Pressable
//                 onPress={onToggleSave}
//                 style={({ pressed }) => [
//                   styles.saveButton,
//                   saved && styles.saveButtonActive,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
//                   {saved ? 'Saved' : 'Save'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           {/* ── Card Body ── */}
//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <View style={styles.categoryChip}>
//                 <Text style={styles.categoryChipText}>{item.category}</Text>
//               </View>
//               <Text style={styles.cardPrice}>
//                 ₹{Number(item.price).toLocaleString('en-IN')}
//               </Text>
//             </View>
//             <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//             <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
//             <View style={styles.offerStrip}>
//               <Text style={styles.offerStripText}>Free for the first 3 months</Text>
//             </View>
//             <View style={styles.cardFooter}>
//               <View style={styles.metaBlock}>
//                 <Text style={styles.metaLabel}>Ready for</Text>
//                 <Text style={styles.metaValue}>Web & Mobile</Text>
//               </View>
//               <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
//                 <LinearGradient
//                   colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={styles.viewButton}
//                 >
//                   <Text style={styles.viewButtonText}>View Details</Text>
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
// export default function AppsScreen({ navigation, route }) {
//   const user              = route?.params?.user || null;
//   const categoryFromRoute = route?.params?.category ?? '';
//   const { apps, loading, refreshApps } = useMarketplace();

//   const [search,           setSearch]           = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
//   const [selectedSort,     setSelectedSort]     = useState('Popular');
//   const [savedIds,         setSavedIds]         = useState([]);
//   const [activeIndex,      setActiveIndex]      = useState(0);

//   const approvedApps = useMemo(() => {
//     return (apps || []).filter(item =>
//       String(item?.status ?? '').trim().toLowerCase() === 'approved'
//     );
//   }, [apps]);

//   const categories = useMemo(() => {
//     const unique = [...new Set(approvedApps.map(item => item.category))];
//     return [ALL_CATEGORY, ...unique];
//   }, [approvedApps]);

//   useEffect(() => {
//     if (categoryFromRoute && categories.includes(categoryFromRoute)) {
//       setSelectedCategory(categoryFromRoute);
//     } else {
//       setSelectedCategory(ALL_CATEGORY);
//     }
//   }, [categoryFromRoute, categories]);

//   useFocusEffect(
//     useCallback(() => {
//       if (refreshApps) refreshApps();
//     }, [refreshApps])
//   );

//   const filteredApps = useMemo(() => {
//     const term = search.trim().toLowerCase();
//     const filtered = approvedApps.filter(item => {
//       const matchesCategory =
//         selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
//       const matchesSearch =
//         !term ||
//         item.title.toLowerCase().includes(term) ||
//         item.description.toLowerCase().includes(term) ||
//         item.category.toLowerCase().includes(term) ||
//         String(item.company || '').toLowerCase().includes(term);
//       return matchesCategory && matchesSearch;
//     });
//     if (selectedSort === 'Price') return [...filtered].sort((a, b) => a.price - b.price);
//     if (selectedSort === 'New')   return [...filtered].reverse();
//     return filtered;
//   }, [approvedApps, search, selectedCategory, selectedSort]);

//   const hasActiveFilters =
//     search.trim().length > 0 ||
//     selectedCategory !== ALL_CATEGORY ||
//     selectedSort !== 'Popular';

//   const headerAnim   = useRef(new Animated.Value(0)).current;
//   const heroAnim     = useRef(new Animated.Value(0)).current;
//   const controlsAnim = useRef(new Animated.Value(0)).current;
//   const statsAnim    = useRef(new Animated.Value(0)).current;
//   const lowerAnim    = useRef(new Animated.Value(0)).current;
//   const emptyAnim    = useRef(new Animated.Value(0)).current;
//   const cardAnimsRef = useRef([]);

//   if (cardAnimsRef.current.length !== filteredApps.length) {
//     cardAnimsRef.current = filteredApps.map(
//       (_, i) => cardAnimsRef.current[i] || new Animated.Value(0)
//     );
//   }
//   const cardAnims = cardAnimsRef.current;

//   useEffect(() => {
//     cardAnims.forEach(a => a.setValue(0));
//     const seq = Animated.sequence([
//       Animated.timing(headerAnim,   { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(heroAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(controlsAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(statsAnim,    { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.stagger(90, cardAnims.map(a =>
//         Animated.timing(a, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true })
//       )),
//       Animated.timing(lowerAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(emptyAnim, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]);
//     seq.start();
//     return () => seq.stop();
//   }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

//   useEffect(() => { setActiveIndex(0); }, [filteredApps, selectedCategory, selectedSort, search]);

//   useEffect(() => {
//     AsyncStorage.getItem(SAVED_APPS_KEY).then(raw => {
//       const parsed = raw ? JSON.parse(raw) : [];
//       if (Array.isArray(parsed)) setSavedIds(parsed);
//     }).catch(() => {});
//   }, []);

//   const fadeUp = (anim, distance = 16) => ({
//     opacity: anim,
//     transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
//   });

//   const getCardStyle = (index) => {
//     const anim = cardAnims[index] || new Animated.Value(1);
//     return {
//       opacity: anim,
//       transform: [
//         { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
//         { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
//       ],
//     };
//   };

//   const toggleSave = async (id) => {
//     const nextIds = savedIds.includes(id)
//       ? savedIds.filter(i => i !== id)
//       : [...savedIds, id];
//     setSavedIds(nextIds);
//     try { await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds)); } catch (_) {}
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setSelectedCategory(ALL_CATEGORY);
//     setSelectedSort('Popular');
//     navigation.setParams?.({ category: undefined });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
//       <CommonHeader
//         navigation={navigation}
//         title="Apps Marketplace"
//         subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
//         showBack showLogo={false}
//         rightLabel="Contact"
//         onRightPress={() => navigation.navigate('Contact')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         onProfilePress={() => navigation.navigate('Profile', { user })}
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         {loading && (
//           <View style={styles.loadingWrap}>
//             <Text style={styles.loadingText}>Loading apps...</Text>
//           </View>
//         )}

//         <Animated.View style={fadeUp(heroAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//             style={styles.heroBlock}
//           >
//             <Text style={styles.heroEyebrow}>
//               {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
//             </Text>
//             <Text style={styles.heroTitle}>
//               {selectedCategory === ALL_CATEGORY
//                 ? 'Find the right app for your business'
//                 : `Explore ${selectedCategory}`}
//             </Text>
//             <Text style={styles.heroSubtitle}>
//               Browse solutions by category, sort products quickly, save the ones you want to revisit.
//             </Text>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(controlsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
//             style={styles.customBanner}
//           >
//             <View style={styles.customBannerContent}>
//               <Text style={styles.customBannerTitle}>Need a custom app?</Text>
//               <Text style={styles.customBannerText}>Talk to us for tailored business solutions.</Text>
//             </View>
//             <Pressable
//               onPress={() => navigation.navigate('Contact')}
//               style={({ pressed }) => [pressed && styles.buttonPressed]}
//             >
//               <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.customBannerButton}>
//                 <Text style={styles.customBannerButtonText}>Contact Us</Text>
//               </LinearGradient>
//             </Pressable>
//           </LinearGradient>

//           <Pressable
//             onPress={() => navigation.navigate('UploadApp')}
//             style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}
//           >
//             <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadAppButtonGradient}>
//               <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
//             </LinearGradient>
//           </Pressable>

//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//             style={styles.searchBlock}
//           >
//             <TextInput
//               value={search}
//               onChangeText={setSearch}
//               placeholder="Search apps, categories, solutions..."
//               placeholderTextColor={COLORS.textMuted}
//               style={styles.searchInput}
//             />
//           </LinearGradient>

//           <View style={styles.controlsHeaderRow}>
//             <Text style={styles.controlsHeading}>Browse by category</Text>
//             {hasActiveFilters && (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}
//               >
//                 <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//               </Pressable>
//             )}
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
//             {categories.map(cat => (
//               <FilterChip
//                 key={cat} label={cat} active={selectedCategory === cat}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   navigation.setParams?.({ category: cat === ALL_CATEGORY ? undefined : cat });
//                 }}
//               />
//             ))}
//           </ScrollView>

//           <View style={styles.controlsHeaderRowSecondary}>
//             <Text style={styles.controlsHeading}>Sort results</Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
//             {SORT_OPTIONS.map(opt => (
//               <SortChip key={opt} label={opt} active={selectedSort === opt} onPress={() => setSelectedSort(opt)} />
//             ))}
//           </ScrollView>
//         </Animated.View>

//         <Animated.View style={fadeUp(statsAnim, 12)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.statsRow}
//           >
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{approvedApps.length}</Text>
//               <Text style={styles.statLabel}>Total Apps</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{categories.length - 1}</Text>
//               <Text style={styles.statLabel}>Categories</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{savedIds.length}</Text>
//               <Text style={styles.statLabel}>Saved</Text>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionHeaderLeft}>
//             <Text style={styles.sectionEyebrow}>CATALOG</Text>
//             <Text style={styles.sectionTitle}>Available solutions</Text>
//           </View>
//           <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
//         </View>

//         {filteredApps.length > 0 ? (
//           <>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.cardsRow}
//               snapToInterval={SNAP_INTERVAL}
//               decelerationRate="fast"
//               snapToAlignment="start"
//               scrollEventThrottle={16}
//               onMomentumScrollEnd={e => {
//                 const x = e.nativeEvent.contentOffset.x;
//                 setActiveIndex(Math.max(0, Math.min(Math.round(x / SNAP_INTERVAL), filteredApps.length - 1)));
//               }}
//             >
//               {filteredApps.map((item, index) => (
//                 <AppListCard
//                   key={item.id}
//                   item={item}
//                   index={index}
//                   saved={savedIds.includes(item.id)}
//                   onToggleSave={() => toggleSave(item.id)}
//                   onPress={() => navigation.navigate('AppDetails', { app: item, user })}
//                   animatedStyle={getCardStyle(index)}
//                 />
//               ))}
//             </ScrollView>

//             <View style={styles.paginationRow}>
//               {filteredApps.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]}
//                 />
//               ))}
//             </View>
//           </>
//         ) : (
//           <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
//             <Text style={styles.emptyIcon}>⌕</Text>
//             <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No apps found'}</Text>
//             <Text style={styles.emptyText}>
//               {loading
//                 ? 'Please wait while we fetch the apps.'
//                 : 'Try changing the search, category, or sort option.'}
//             </Text>
//             {!loading && (
//               <Pressable
//                 onPress={clearFilters}
//                 style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}
//               >
//                 <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.emptyActionButton}>
//                   <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
//                 </LinearGradient>
//               </Pressable>
//             )}
//           </Animated.View>
//         )}

//         <Animated.View style={fadeUp(lowerAnim, 14)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//             style={styles.marketStrip}
//           >
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Premium</Text><Text style={styles.marketLabel}>design quality</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Custom</Text><Text style={styles.marketLabel}>build support</Text></View>
//             <View style={styles.marketDivider} />
//             <View style={styles.marketItem}><Text style={styles.marketValue}>Fast</Text><Text style={styles.marketLabel}>delivery flow</Text></View>
//           </LinearGradient>

//           <View style={styles.lowerGrid}>
//             <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
//               <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
//               <View style={styles.lowerTagsWrap}>
//                 {categories.slice(1).map(cat => (
//                   <View key={cat} style={styles.lowerTag}><Text style={styles.lowerTagText}>{cat}</Text></View>
//                 ))}
//               </View>
//             </LinearGradient>
//             <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
//               <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
//               <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
//               <Text style={styles.lowerCardText}>Use filters, sorting, and saved items to narrow down the right app.</Text>
//             </LinearGradient>
//           </View>
//           <CommonFooter />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed:       { opacity: 0.92 },
//   cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
//   safeArea:      { flex: 1, backgroundColor: COLORS.background },
//   container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },
//   loadingWrap:   { alignItems: 'center', paddingVertical: 20 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },

//   heroBlock:    { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16 },
//   heroEyebrow:  { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   heroTitle:    { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
//   heroSubtitle: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },

//   customBanner:        { minHeight: 76, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
//   customBannerContent: { flex: 1, paddingRight: 8 },
//   customBannerTitle:   { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   customBannerText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   customBannerButton:  { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
//   customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   uploadAppButton:         { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
//   uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//   uploadAppButtonText:     { color: '#12343A', fontSize: 14, fontWeight: '800' },

//   searchBlock: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
//   searchInput: { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },

//   controlsHeaderRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
//   controlsHeaderRowSecondary: { marginBottom: 10 },
//   controlsHeading:       { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   clearFilterButton:     { minHeight: 30, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },

//   filtersRow: { paddingBottom: 12, gap: 10 },
//   filterChip: { minHeight: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   filterChipActive:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   filterChipText:       { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
//   filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },

//   sortRow:        { paddingBottom: 16, gap: 10 },
//   sortChip:       { minHeight: 34, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
//   sortChipActive: { backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
//   sortChipText:       { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
//   sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },

//   statsRow:    { minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 },
//   statItem:    { flex: 1, alignItems: 'center' },
//   statValue:   { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
//   statLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   statDivider: { width: 1, height: 28, backgroundColor: COLORS.border },

//   sectionHeader:     { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   sectionHeaderLeft: { flex: 1 },
//   sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   sectionTitle:      { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
//   showingCount:      { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },

//   cardsRow: { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
//   cardWrap:  { width: CARD_WIDTH, marginRight: CARD_SPACING },
//   card:      { borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)' },

//   cardImageWrap:   { position: 'relative' },
//   cardImageShade:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.08)' },
//   cardImageTopRow: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

//   smallBadge:            { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   smallBadgePrimary:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   smallBadgeText:        { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
//   smallBadgeTextPrimary: { color: '#67E6E8' },
//   saveButton:       { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
//   saveButtonText:       { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
//   saveButtonTextActive: { color: '#67E6E8' },

//   cardBody:        { padding: 14 },
//   cardTopRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
//   categoryChip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText:{ color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   cardPrice:       { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
//   cardTitle:       { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
//   cardDescription: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
//   offerStrip:      { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
//   offerStripText:  { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
//   cardFooter:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
//   metaBlock:       { flex: 1 },
//   metaLabel:       { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
//   metaValue:       { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
//   viewButton:      { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
//   viewButtonText:  { color: '#12343A', fontSize: 12, fontWeight: '700' },

//   paginationRow:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
//   paginationDot:       { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
//   paginationDotActive: { width: 20, backgroundColor: '#67E6E8' },

//   emptyState:            { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
//   emptyIcon:             { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
//   emptyTitle:            { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText:             { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
//   emptyActionWrap:       { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
//   emptyActionButton:     { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
//   emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },

//   marketStrip:   { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
//   marketItem:    { flex: 1, alignItems: 'center' },
//   marketValue:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
//   marketLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
//   marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },

//   lowerGrid:        { gap: 14, marginBottom: 20 },
//   lowerCard:        { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
//   lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
//   lowerCardTitle:   { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
//   lowerCardText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
//   lowerTagsWrap:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
//   lowerTag:         { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
//   lowerTagText:     { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
// });

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  Pressable, TextInput, Animated, Easing,
  ScrollView, Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';
import CommonFooter from '../components/CommonFooter';
import CommonHeader from '../components/common/CommonHeader';
import { useMarketplace } from '../context/MarketplaceContext';
import SharedImageCarousel from '../components/SharedImageCarousel';

const ALL_CATEGORY   = 'All';
const SORT_OPTIONS   = ['Popular', 'Price', 'New'];
const SCREEN_WIDTH   = Dimensions.get('window').width;
const CARD_WIDTH     = Math.min(292, SCREEN_WIDTH * 0.78);
const CARD_SPACING   = 14;
const SNAP_INTERVAL  = CARD_WIDTH + CARD_SPACING;
const SAVED_APPS_KEY = 'sat_saved_apps';

function FilterChip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressed]}
    >
      <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function SortChip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.sortChip, active && styles.sortChipActive, pressed && styles.pressed]}
    >
      <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function AppBadge({ text, variant = 'default' }) {
  return (
    <View style={[styles.smallBadge, variant === 'primary' && styles.smallBadgePrimary]}>
      <Text style={[styles.smallBadgeText, variant === 'primary' && styles.smallBadgeTextPrimary]}>
        {text}
      </Text>
    </View>
  );
}

// ── App Card ─────────────────────────────────────────────────
function AppListCard({ item, onPress, animatedStyle, saved, onToggleSave, index }) {
  const badgeText = index === 0 ? 'Best Seller' : index === 1 ? 'Popular' : index === 2 ? 'New' : 'Uploaded';

  const allImages = Array.isArray(item.imageUrls) && item.imageUrls.length > 0
    ? item.imageUrls
    : item.imageUrl ? [item.imageUrl] : [];

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
          style={styles.card}
        >
          {/* ── Image Carousel ── */}
          <View style={styles.cardImageWrap}>
            <SharedImageCarousel
              images={allImages}
              width={CARD_WIDTH}
              height={176}
            />
            <View style={styles.cardImageShade} pointerEvents="none" />
            <View style={styles.cardImageTopRow} pointerEvents="box-none">
              <AppBadge text={badgeText} variant={index === 0 ? 'primary' : 'default'} />
              <Pressable
                onPress={onToggleSave}
                style={({ pressed }) => [
                  styles.saveButton,
                  saved && styles.saveButtonActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
                  {saved ? 'Saved' : 'Save'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* ── Card Body ── */}
          <View style={styles.cardBody}>
            <View style={styles.cardTopRow}>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryChipText}>{item.category}</Text>
              </View>
              <Text style={styles.cardPrice}>
                ₹{Number(item.price).toLocaleString('en-IN')}
              </Text>
            </View>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
            <View style={styles.offerStrip}>
              <Text style={styles.offerStripText}>Free for the first 3 months</Text>
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>Ready for</Text>
                <Text style={styles.metaValue}>Web & Mobile</Text>
              </View>
              <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.buttonPressed]}>
                <LinearGradient
                  colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.viewButton}
                >
                  <Text style={styles.viewButtonText}>View Details</Text>
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
export default function AppsScreen({ navigation, route }) {
  const user              = route?.params?.user || null;
  const categoryFromRoute = route?.params?.category ?? '';
  const { apps, loading, refreshApps } = useMarketplace();

  const [search,           setSearch]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [selectedSort,     setSelectedSort]     = useState('Popular');
  const [savedIds,         setSavedIds]         = useState([]);
  const [activeIndex,      setActiveIndex]      = useState(0);

  const approvedApps = useMemo(() => {
    return (apps || []).filter(item =>
      String(item?.status ?? '').trim().toLowerCase() === 'approved'
    );
  }, [apps]);

  const categories = useMemo(() => {
    const unique = [...new Set(approvedApps.map(item => item.category))];
    return [ALL_CATEGORY, ...unique];
  }, [approvedApps]);

  useEffect(() => {
    if (categoryFromRoute && categories.includes(categoryFromRoute)) {
      setSelectedCategory(categoryFromRoute);
    } else {
      setSelectedCategory(ALL_CATEGORY);
    }
  }, [categoryFromRoute, categories]);

  useFocusEffect(
    useCallback(() => {
      if (refreshApps) refreshApps();
    }, [refreshApps])
  );

  const filteredApps = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = approvedApps.filter(item => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        String(item.company || '').toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
    if (selectedSort === 'Price') return [...filtered].sort((a, b) => a.price - b.price);
    if (selectedSort === 'New')   return [...filtered].reverse();
    return filtered;
  }, [approvedApps, search, selectedCategory, selectedSort]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    selectedCategory !== ALL_CATEGORY ||
    selectedSort !== 'Popular';

  const headerAnim   = useRef(new Animated.Value(0)).current;
  const heroAnim     = useRef(new Animated.Value(0)).current;
  const controlsAnim = useRef(new Animated.Value(0)).current;
  const statsAnim    = useRef(new Animated.Value(0)).current;
  const lowerAnim    = useRef(new Animated.Value(0)).current;
  const emptyAnim    = useRef(new Animated.Value(0)).current;
  const cardAnimsRef = useRef([]);

  if (cardAnimsRef.current.length !== filteredApps.length) {
    cardAnimsRef.current = filteredApps.map(
      (_, i) => cardAnimsRef.current[i] || new Animated.Value(0)
    );
  }
  const cardAnims = cardAnimsRef.current;

  useEffect(() => {
    cardAnims.forEach(a => a.setValue(0));
    const seq = Animated.sequence([
      Animated.timing(headerAnim,   { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(heroAnim,     { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(controlsAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(statsAnim,    { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.stagger(90, cardAnims.map(a =>
        Animated.timing(a, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      )),
      Animated.timing(lowerAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(emptyAnim, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]);
    seq.start();
    return () => seq.stop();
  }, [headerAnim, heroAnim, controlsAnim, statsAnim, lowerAnim, emptyAnim, cardAnims]);

  useEffect(() => { setActiveIndex(0); }, [filteredApps, selectedCategory, selectedSort, search]);

  useEffect(() => {
    AsyncStorage.getItem(SAVED_APPS_KEY).then(raw => {
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setSavedIds(parsed);
    }).catch(() => {});
  }, []);

  const fadeUp = (anim, distance = 16) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
  });

  const getCardStyle = (index) => {
    const anim = cardAnims[index] || new Animated.Value(1);
    return {
      opacity: anim,
      transform: [
        { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
        { scale:      anim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
      ],
    };
  };

  const toggleSave = async (id) => {
    const nextIds = savedIds.includes(id)
      ? savedIds.filter(i => i !== id)
      : [...savedIds, id];
    setSavedIds(nextIds);
    try { await AsyncStorage.setItem(SAVED_APPS_KEY, JSON.stringify(nextIds)); } catch (_) {}
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory(ALL_CATEGORY);
    setSelectedSort('Popular');
    navigation.setParams?.({ category: undefined });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <CommonHeader
        navigation={navigation}
        title="Apps Marketplace"
        subtitle={selectedCategory === ALL_CATEGORY ? 'Explore all products' : selectedCategory}
        showBack showLogo={false}
        rightLabel="Contact"
        onRightPress={() => navigation.navigate('Contact')}
        onNotificationPress={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('Profile', { user })}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {loading && (
          <View style={styles.loadingWrap}>
            <Text style={styles.loadingText}>Loading apps...</Text>
          </View>
        )}

        <Animated.View style={fadeUp(heroAnim, 14)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
            style={styles.heroBlock}
          >
            <Text style={styles.heroEyebrow}>
              {selectedCategory === ALL_CATEGORY ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
            </Text>
            <Text style={styles.heroTitle}>
              {selectedCategory === ALL_CATEGORY
                ? 'Find the right app for your business'
                : `Explore ${selectedCategory}`}
            </Text>
            <Text style={styles.heroSubtitle}>
              Browse solutions by category, sort products quickly, save the ones you want to revisit.
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={fadeUp(controlsAnim, 12)}>
          <LinearGradient
            colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']}
            style={styles.customBanner}
          >
            <View style={styles.customBannerContent}>
              <Text style={styles.customBannerTitle}>Need a custom app?</Text>
              <Text style={styles.customBannerText}>Talk to us for tailored business solutions.</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('Contact')}
              style={({ pressed }) => [pressed && styles.buttonPressed]}
            >
              <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.customBannerButton}>
                <Text style={styles.customBannerButtonText}>Contact Us</Text>
              </LinearGradient>
            </Pressable>
          </LinearGradient>

          <Pressable
            onPress={() => navigation.navigate('UploadApp')}
            style={({ pressed }) => [styles.uploadAppButton, pressed && styles.pressed]}
          >
            <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadAppButtonGradient}>
              <Text style={styles.uploadAppButtonText}>+ Upload Your App</Text>
            </LinearGradient>
          </Pressable>

          <LinearGradient
            colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
            style={styles.searchBlock}
          >
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search apps, categories, solutions..."
              placeholderTextColor={COLORS.textMuted}
              style={styles.searchInput}
            />
          </LinearGradient>

          <View style={styles.controlsHeaderRow}>
            <Text style={styles.controlsHeading}>Browse by category</Text>
            {hasActiveFilters && (
              <Pressable
                onPress={clearFilters}
                style={({ pressed }) => [styles.clearFilterButton, pressed && styles.pressed]}
              >
                <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
              </Pressable>
            )}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
            {categories.map(cat => (
              <FilterChip
                key={cat} label={cat} active={selectedCategory === cat}
                onPress={() => {
                  setSelectedCategory(cat);
                  navigation.setParams?.({ category: cat === ALL_CATEGORY ? undefined : cat });
                }}
              />
            ))}
          </ScrollView>

          <View style={styles.controlsHeaderRowSecondary}>
            <Text style={styles.controlsHeading}>Sort results</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
            {SORT_OPTIONS.map(opt => (
              <SortChip key={opt} label={opt} active={selectedSort === opt} onPress={() => setSelectedSort(opt)} />
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View style={fadeUp(statsAnim, 12)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
            style={styles.statsRow}
          >
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{approvedApps.length}</Text>
              <Text style={styles.statLabel}>Total Apps</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{categories.length - 1}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{savedIds.length}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Text style={styles.sectionEyebrow}>CATALOG</Text>
            <Text style={styles.sectionTitle}>Available solutions</Text>
          </View>
          <Text style={styles.showingCount}>Showing {filteredApps.length} apps</Text>
        </View>

        {filteredApps.length > 0 ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsRow}
              snapToInterval={SNAP_INTERVAL}
              decelerationRate="fast"
              snapToAlignment="start"
              scrollEventThrottle={16}
              onMomentumScrollEnd={e => {
                const x = e.nativeEvent.contentOffset.x;
                setActiveIndex(Math.max(0, Math.min(Math.round(x / SNAP_INTERVAL), filteredApps.length - 1)));
              }}
            >
              {filteredApps.map((item, index) => (
                <AppListCard
                  key={item.id}
                  item={item}
                  index={index}
                  saved={savedIds.includes(item.id)}
                  onToggleSave={() => toggleSave(item.id)}
                  // ✅ approvedApps అన్నీ pass చేస్తున్నాం — related apps కి
                  onPress={() => navigation.navigate('AppDetails', {
                    app: item,
                    user,
                    allApps: approvedApps,
                  })}
                  animatedStyle={getCardStyle(index)}
                />
              ))}
            </ScrollView>

            <View style={styles.paginationRow}>
              {filteredApps.map((_, index) => (
                <View
                  key={index}
                  style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]}
                />
              ))}
            </View>
          </>
        ) : (
          <Animated.View style={[styles.emptyState, fadeUp(emptyAnim, 14)]}>
            <Text style={styles.emptyIcon}>⌕</Text>
            <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No apps found'}</Text>
            <Text style={styles.emptyText}>
              {loading
                ? 'Please wait while we fetch the apps.'
                : 'Try changing the search, category, or sort option.'}
            </Text>
            {!loading && (
              <Pressable
                onPress={clearFilters}
                style={({ pressed }) => [styles.emptyActionWrap, pressed && styles.buttonPressed]}
              >
                <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.emptyActionButton}>
                  <Text style={styles.emptyActionButtonText}>Reset Filters</Text>
                </LinearGradient>
              </Pressable>
            )}
          </Animated.View>
        )}

        <Animated.View style={fadeUp(lowerAnim, 14)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
            style={styles.marketStrip}
          >
            <View style={styles.marketItem}><Text style={styles.marketValue}>Premium</Text><Text style={styles.marketLabel}>design quality</Text></View>
            <View style={styles.marketDivider} />
            <View style={styles.marketItem}><Text style={styles.marketValue}>Custom</Text><Text style={styles.marketLabel}>build support</Text></View>
            <View style={styles.marketDivider} />
            <View style={styles.marketItem}><Text style={styles.marketValue}>Fast</Text><Text style={styles.marketLabel}>delivery flow</Text></View>
          </LinearGradient>

          <View style={styles.lowerGrid}>
            <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
              <Text style={styles.lowerCardEyebrow}>BROWSE BY CATEGORY</Text>
              <Text style={styles.lowerCardTitle}>Solutions across multiple business needs</Text>
              <View style={styles.lowerTagsWrap}>
                {categories.slice(1).map(cat => (
                  <View key={cat} style={styles.lowerTag}><Text style={styles.lowerTagText}>{cat}</Text></View>
                ))}
              </View>
            </LinearGradient>
            <LinearGradient colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']} style={styles.lowerCard}>
              <Text style={styles.lowerCardEyebrow}>MARKETPLACE FLOW</Text>
              <Text style={styles.lowerCardTitle}>Compare, shortlist, and move to details</Text>
              <Text style={styles.lowerCardText}>Use filters, sorting, and saved items to narrow down the right app.</Text>
            </LinearGradient>
          </View>
          <CommonFooter />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressed:       { opacity: 0.92 },
  cardPressed:   { opacity: 0.96, transform: [{ scale: 0.992 }] },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
  safeArea:      { flex: 1, backgroundColor: COLORS.background },
  container:     { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 44, backgroundColor: COLORS.background },
  loadingWrap:   { alignItems: 'center', paddingVertical: 20 },
  loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },

  heroBlock:    { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 16 },
  heroEyebrow:  { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  heroTitle:    { color: COLORS.textPrimary, fontSize: 25, fontWeight: '800', lineHeight: 31, marginBottom: 10, maxWidth: '92%' },
  heroSubtitle: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, maxWidth: '96%' },

  customBanner:        { minHeight: 76, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  customBannerContent: { flex: 1, paddingRight: 8 },
  customBannerTitle:   { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
  customBannerText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
  customBannerButton:  { minHeight: 38, minWidth: 104, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  customBannerButtonText: { color: '#12343A', fontSize: 12, fontWeight: '700' },

  uploadAppButton:         { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
  uploadAppButtonGradient: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  uploadAppButtonText:     { color: '#12343A', fontSize: 14, fontWeight: '800' },

  searchBlock: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 14 },
  searchInput: { minHeight: 52, color: COLORS.textPrimary, fontSize: 14 },

  controlsHeaderRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 },
  controlsHeaderRowSecondary: { marginBottom: 10 },
  controlsHeading:       { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
  clearFilterButton:     { minHeight: 30, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  clearFilterButtonText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' },

  filtersRow:           { paddingBottom: 12, gap: 10 },
  filterChip:           { minHeight: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  filterChipActive:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
  filterChipText:       { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
  filterChipTextActive: { color: '#67E6E8', fontWeight: '700' },

  sortRow:        { paddingBottom: 16, gap: 10 },
  sortChip:       { minHeight: 34, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.035)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  sortChipActive: { backgroundColor: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.14)' },
  sortChipText:       { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
  sortChipTextActive: { color: COLORS.textPrimary, fontWeight: '700' },

  statsRow:    { minHeight: 68, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 },
  statItem:    { flex: 1, alignItems: 'center' },
  statValue:   { color: COLORS.textPrimary, fontSize: 17, fontWeight: '800', marginBottom: 2 },
  statLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
  statDivider: { width: 1, height: 28, backgroundColor: COLORS.border },

  sectionHeader:     { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  sectionHeaderLeft: { flex: 1 },
  sectionEyebrow:    { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  sectionTitle:      { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800', lineHeight: 28 },
  showingCount:      { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },

  cardsRow: { paddingLeft: 18, paddingRight: 18, paddingBottom: 4 },
  cardWrap:  { width: CARD_WIDTH, marginRight: CARD_SPACING },
  card:      { borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.035)' },

  cardImageWrap:   { position: 'relative' },
  cardImageShade:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.08)' },
  cardImageTopRow: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  smallBadge:            { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  smallBadgePrimary:     { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
  smallBadgeText:        { color: COLORS.textPrimary, fontSize: 10, fontWeight: '700' },
  smallBadgeTextPrimary: { color: '#67E6E8' },
  saveButton:       { minHeight: 32, borderRadius: 999, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,15,18,0.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
  saveButtonActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.28)' },
  saveButtonText:       { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
  saveButtonTextActive: { color: '#67E6E8' },

  cardBody:        { padding: 14 },
  cardTopRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 12 },
  categoryChip:    { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  categoryChipText:{ color: '#67E6E8', fontSize: 10, fontWeight: '700' },
  cardPrice:       { color: '#67E6E8', fontSize: 16, fontWeight: '800' },
  cardTitle:       { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 8, minHeight: 46 },
  cardDescription: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12, minHeight: 54 },
  offerStrip:      { alignSelf: 'flex-start', backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(66,221,226,0.28)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 14 },
  offerStripText:  { color: '#67E6E8', fontSize: 10, fontWeight: '800', lineHeight: 14 },
  cardFooter:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 },
  metaBlock:       { flex: 1 },
  metaLabel:       { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
  metaValue:       { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
  viewButton:      { minWidth: 108, minHeight: 40, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  viewButtonText:  { color: '#12343A', fontSize: 12, fontWeight: '700' },

  paginationRow:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 24 },
  paginationDot:       { width: 8, height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)' },
  paginationDotActive: { width: 20, backgroundColor: '#67E6E8' },

  emptyState:            { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 18, alignItems: 'center', marginBottom: 20 },
  emptyIcon:             { color: '#67E6E8', fontSize: 28, marginBottom: 8 },
  emptyTitle:            { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginBottom: 6 },
  emptyText:             { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  emptyActionWrap:       { marginTop: 14, borderRadius: 14, overflow: 'hidden' },
  emptyActionButton:     { minHeight: 44, minWidth: 132, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  emptyActionButtonText: { color: '#12343A', fontSize: 12, fontWeight: '800' },

  marketStrip:   { minHeight: 64, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 18 },
  marketItem:    { flex: 1, alignItems: 'center' },
  marketValue:   { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 2 },
  marketLabel:   { color: COLORS.textMuted, fontSize: 10, fontWeight: '500' },
  marketDivider: { width: 1, height: 26, backgroundColor: COLORS.border },

  lowerGrid:        { gap: 14, marginBottom: 20 },
  lowerCard:        { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16 },
  lowerCardEyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  lowerCardTitle:   { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 10 },
  lowerCardText:    { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
  lowerTagsWrap:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
  lowerTag:         { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  lowerTagText:     { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
});