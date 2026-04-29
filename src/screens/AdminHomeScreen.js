// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView, Alert,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { fetchPendingAppsApi, approveAppApi, rejectAppApi } from '../utils/apiService';

// const STAT_CARDS = [
//   { label: 'Pending',  color: '#FFB84D', key: 'pending'  },
//   { label: 'Approved', color: '#67E6E8', key: 'approved' },
//   { label: 'Rejected', color: '#FF6B6B', key: 'rejected' },
// ];

// export default function AdminHomeScreen({ navigation, route }) {
//   const user = route?.params?.user;

//   const [pendingApps, setPendingApps]   = useState([]);
//   const [stats, setStats]               = useState({ pending: 0, approved: 0, rejected: 0 });
//   const [loading, setLoading]           = useState(true);
//   const [actionLoading, setActionLoading] = useState(null); // appId being acted on

//   const fadeAnim  = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;

//   useEffect(() => {
//     loadPendingApps();
//     Animated.parallel([
//       Animated.timing(fadeAnim,  { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(slideAnim, { toValue: 0, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const loadPendingApps = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchPendingAppsApi();
//       setPendingApps(data);
//       setStats(prev => ({ ...prev, pending: data.length }));
//     } catch (e) {
//       Alert.alert('Error', 'Could not load pending apps.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (app) => {
//     Alert.alert(
//       'Approve App',
//       `Approve "${app.title}"? It will go live in the marketplace.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Approve', onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await approveAppApi(app.id);
//               setStats(prev => ({ ...prev, pending: prev.pending - 1, approved: prev.approved + 1 }));
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));
//               Alert.alert('✅ Approved', `"${app.title}" is now live!`);
//             } catch (e) {
//               Alert.alert('Error', e.message);
//             } finally {
//               setActionLoading(null);
//             }
//           }
//         },
//       ]
//     );
//   };

//   const handleReject = async (app) => {
//     Alert.alert(
//       'Reject App',
//       `Reject "${app.title}"? This cannot be undone.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Reject', style: 'destructive', onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await rejectAppApi(app.id);
//               setStats(prev => ({ ...prev, pending: prev.pending - 1, rejected: prev.rejected + 1 }));
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));
//               Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//             } catch (e) {
//               Alert.alert('Error', e.message);
//             } finally {
//               setActionLoading(null);
//             }
//           }
//         },
//       ]
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />

//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>

//         {/* ── Header ── */}
//         <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.04)']}
//             style={styles.headerCard}
//           >
//             <View style={styles.headerLeft}>
//               <View style={styles.adminBadge}>
//                 <Text style={styles.adminBadgeText}>ADMIN</Text>
//               </View>
//               <Text style={styles.headerTitle}>Admin Panel</Text>
//               <Text style={styles.headerSub}>Apps Marketplace</Text>
//             </View>
//             <Pressable
//               onPress={() => navigation.replace('SignIn')}
//               style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.logoutText}>Logout</Text>
//             </Pressable>
//           </LinearGradient>
//         </Animated.View>

//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

//           {/* ── Stats Row ── */}
//           <Animated.View style={[styles.statsRow, { opacity: fadeAnim }]}>
//             {STAT_CARDS.map(card => (
//               <LinearGradient
//                 key={card.key}
//                 colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.04)']}
//                 style={styles.statCard}
//               >
//                 <Text style={[styles.statValue, { color: card.color }]}>
//                   {stats[card.key]}
//                 </Text>
//                 <Text style={styles.statLabel}>{card.label}</Text>
//               </LinearGradient>
//             ))}
//           </Animated.View>

//           {/* ── Section Title ── */}
//           <Animated.View style={{ opacity: fadeAnim }}>
//             <View style={styles.sectionRow}>
//               <Text style={styles.sectionTitle}>Pending Approvals</Text>
//               <Pressable onPress={loadPendingApps} style={styles.refreshBtn}>
//                 <Text style={styles.refreshText}>Refresh</Text>
//               </Pressable>
//             </View>
//           </Animated.View>

//           {/* ── Loading ── */}
//           {loading && (
//             <View style={styles.centerMsg}>
//               <Text style={styles.centerMsgText}>Loading pending apps...</Text>
//             </View>
//           )}

//           {/* ── Empty State ── */}
//           {!loading && pendingApps.length === 0 && (
//             <LinearGradient
//               colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)']}
//               style={styles.emptyCard}
//             >
//               <Text style={styles.emptyIcon}>✅</Text>
//               <Text style={styles.emptyTitle}>All caught up!</Text>
//               <Text style={styles.emptyText}>No apps are waiting for review.</Text>
//             </LinearGradient>
//           )}

//           {/* ── Pending App Cards ── */}
//           {pendingApps.map((app) => (
//             <Animated.View key={app.id} style={{ opacity: fadeAnim }}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
//                 style={styles.appCard}
//               >
//                 {/* App meta */}
//                 <View style={styles.appCardTopRow}>
//                   <View style={styles.categoryChip}>
//                     <Text style={styles.categoryChipText}>{app.category}</Text>
//                   </View>
//                   <View style={styles.pendingBadge}>
//                     <Text style={styles.pendingBadgeText}>PENDING</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.appTitle}>{app.title}</Text>
//                 <Text style={styles.appDesc} numberOfLines={2}>{app.description}</Text>

//                 <View style={styles.appMetaRow}>
//                   <View style={styles.metaItem}>
//                     <Text style={styles.metaLabel}>Owner</Text>
//                     <Text style={styles.metaValue}>{app.ownerName}</Text>
//                   </View>
//                   <View style={styles.metaItem}>
//                     <Text style={styles.metaLabel}>Price</Text>
//                     <Text style={styles.metaValue}>₹{app.price?.toLocaleString('en-IN') || '0'}</Text>
//                   </View>
//                   <View style={styles.metaItem}>
//                     <Text style={styles.metaLabel}>Email</Text>
//                     <Text style={styles.metaValue} numberOfLines={1}>{app.ownerEmail}</Text>
//                   </View>
//                 </View>

//                 {/* Action buttons */}
//                 <View style={styles.actionRow}>
//                   <Pressable
//                     onPress={() => handleReject(app)}
//                     disabled={actionLoading === app.id}
//                     style={({ pressed }) => [styles.rejectBtn, pressed && { opacity: 0.7 }]}
//                   >
//                     <Text style={styles.rejectBtnText}>
//                       {actionLoading === app.id ? '...' : 'Reject'}
//                     </Text>
//                   </Pressable>

//                   <Pressable
//                     onPress={() => handleApprove(app)}
//                     disabled={actionLoading === app.id}
//                     style={({ pressed }) => [pressed && { opacity: 0.85 }, { flex: 1 }]}
//                   >
//                     <LinearGradient
//                       colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                       start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                       style={styles.approveBtn}
//                     >
//                       <Text style={styles.approveBtnText}>
//                         {actionLoading === app.id ? '...' : '✓ Approve & Publish'}
//                       </Text>
//                     </LinearGradient>
//                   </Pressable>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           ))}

//           {/* ── Quick Nav ── */}
//           <Animated.View style={{ opacity: fadeAnim }}>
//             <Text style={styles.sectionTitle}>Quick Actions</Text>
//             <View style={styles.quickGrid}>
//               {[
//                 { label: 'View All Apps',    screen: 'Apps'          },
//                 { label: 'Notifications',    screen: 'Notifications' },
//                 { label: 'Contact Inbox',    screen: 'Contact'       },
//                 { label: 'User Marketplace', screen: 'Home'          },
//               ].map(item => (
//                 <Pressable
//                   key={item.label}
//                   onPress={() => navigation.navigate(item.screen)}
//                   style={({ pressed }) => [styles.quickCard, pressed && { opacity: 0.8 }]}
//                 >
//                   <LinearGradient
//                     colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
//                     style={styles.quickCardInner}
//                   >
//                     <Text style={styles.quickCardText}>{item.label}</Text>
//                     <Text style={styles.quickCardArrow}>→</Text>
//                   </LinearGradient>
//                 </Pressable>
//               ))}
//             </View>
//           </Animated.View>

//         </ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   scroll:       { paddingHorizontal: 18, paddingBottom: 44 },

//   // Header
//   header:       { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
//   headerCard: {
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
//     paddingHorizontal: 16, paddingVertical: 14,
//   },
//   headerLeft:   { gap: 4 },
//   adminBadge: {
//     alignSelf: 'flex-start', backgroundColor: 'rgba(217,44,255,0.18)',
//     borderWidth: 1, borderColor: 'rgba(217,44,255,0.40)',
//     borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4,
//   },
//   adminBadgeText: { color: '#D92CFF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
//   headerTitle:  { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
//   headerSub:    { color: 'rgba(255,255,255,0.55)', fontSize: 12 },
//   logoutBtn:    { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255,107,107,0.14)', borderWidth: 1, borderColor: 'rgba(255,107,107,0.28)' },
//   logoutText:   { color: '#FF6B6B', fontSize: 13, fontWeight: '700' },

//   // Stats
//   statsRow:     { flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 10 },
//   statCard:     { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', paddingVertical: 16, alignItems: 'center' },
//   statValue:    { fontSize: 26, fontWeight: '800', marginBottom: 4 },
//   statLabel:    { color: 'rgba(255,255,255,0.60)', fontSize: 11, fontWeight: '600' },

//   // Section
//   sectionRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
//   sectionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 12 },
//   refreshBtn:   { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   refreshText:  { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // Empty
//   emptyCard:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 32, alignItems: 'center', marginBottom: 20 },
//   emptyIcon:    { fontSize: 32, marginBottom: 10 },
//   emptyTitle:   { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptyText:    { color: 'rgba(255,255,255,0.60)', fontSize: 13 },

//   centerMsg:    { alignItems: 'center', paddingVertical: 24 },
//   centerMsgText:{ color: '#67E6E8', fontSize: 14, fontWeight: '600' },

//   // App Card
//   appCard:      { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', padding: 16, marginBottom: 14 },
//   appCardTopRow:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
//   categoryChip: { backgroundColor: 'rgba(103,232,240,0.12)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.28)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   categoryChipText: { color: '#67E6E8', fontSize: 10, fontWeight: '700' },
//   pendingBadge: { backgroundColor: 'rgba(255,184,77,0.14)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   pendingBadgeText: { color: '#FFB84D', fontSize: 10, fontWeight: '800' },
//   appTitle:     { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 6 },
//   appDesc:      { color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
//   appMetaRow:   { flexDirection: 'row', gap: 10, marginBottom: 16 },
//   metaItem:     { flex: 1 },
//   metaLabel:    { color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 3 },
//   metaValue:    { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

//   // Action
//   actionRow:    { flexDirection: 'row', gap: 10 },
//   rejectBtn:    { paddingHorizontal: 20, minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,107,107,0.12)', borderWidth: 1, borderColor: 'rgba(255,107,107,0.30)' },
//   rejectBtnText:{ color: '#FF6B6B', fontSize: 14, fontWeight: '700' },
//   approveBtn:   { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
//   approveBtnText:{ color: '#12343A', fontSize: 14, fontWeight: '800' },

//   // Quick
//   quickGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
//   quickCard:    { width: '47%' },
//   quickCardInner:{ borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   quickCardText:{ color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
//   quickCardArrow:{ color: '#67E6E8', fontSize: 16, fontWeight: '800' },
// });
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   Animated,
//   Easing,
//   ScrollView,
//   Alert,
//   Dimensions,
//   RefreshControl,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { fetchPendingAppsApi, approveAppApi, rejectAppApi } from '../utils/apiService';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // ── Bell Icon SVG-style using View shapes ─────────
// function BellIcon({ hasNotif }) {
//   return (
//     <View style={bellStyles.wrap}>
//       {/* Bell top arc */}
//       <View style={bellStyles.arc} />
//       {/* Bell body */}
//       <View style={bellStyles.body} />
//       {/* Bell bottom bar */}
//       <View style={bellStyles.bar} />
//       {/* Bell clapper */}
//       <View style={bellStyles.clapper} />
//       {/* Red dot if notification */}
//       {hasNotif && <View style={bellStyles.dot} />}
//     </View>
//   );
// }

// const bellStyles = StyleSheet.create({
//   wrap:    { width: 22, height: 24, alignItems: 'center', position: 'relative' },
//   arc:     { width: 10, height: 6, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: 'rgba(255,255,255,0.90)', marginBottom: -1 },
//   body:    { width: 18, height: 12, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: 'rgba(255,255,255,0.90)' },
//   bar:     { width: 20, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.90)', marginTop: 1 },
//   clapper: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.90)', marginTop: 1 },
//   dot:     { position: 'absolute', top: 0, right: 0, width: 9, height: 9, borderRadius: 5, backgroundColor: '#FF4D6A', borderWidth: 1.5, borderColor: '#141B27' },
// });

// // ── Stat Card ─────────────────────────────────────
// function StatCard({ label, value, color, accent, delay, fadeAnim }) {
//   const scale = useRef(new Animated.Value(0.85)).current;
//   const op    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(delay),
//       Animated.parallel([
//         Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
//         Animated.timing(op,    { toValue: 1, duration: 380, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[statStyles.wrap, { opacity: op, transform: [{ scale }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
//         style={[statStyles.card, { borderColor: accent }]}
//       >
//         <View style={[statStyles.bar, { backgroundColor: color }]} />
//         <Text style={[statStyles.value, { color }]}>{value}</Text>
//         <Text style={statStyles.label}>{label}</Text>
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// const statStyles = StyleSheet.create({
//   wrap:  { flex: 1 },
//   card:  {
//     borderRadius: 20, borderWidth: 1, paddingTop: 14, paddingBottom: 16,
//     paddingHorizontal: 10, alignItems: 'center', overflow: 'hidden',
//   },
//   bar:   { width: 28, height: 3, borderRadius: 2, marginBottom: 12 },
//   value: { fontSize: 32, fontWeight: '800', marginBottom: 4 },
//   label: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ── App Review Card ───────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(40)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 120),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 420, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[cardStyles.outer, { opacity: opAnim, transform: [{ translateY: slideAnim }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.025)']}
//         style={cardStyles.card}
//       >
//         {/* Top shine line */}
//         <View style={cardStyles.shine} />

//         {/* Header row */}
//         <View style={cardStyles.headerRow}>
//           <View style={cardStyles.categoryPill}>
//             <Text style={cardStyles.categoryText}>{app.category || 'Uncategorized'}</Text>
//           </View>
//           <View style={cardStyles.pendingPill}>
//             <View style={cardStyles.pendingDot} />
//             <Text style={cardStyles.pendingText}>PENDING</Text>
//           </View>
//         </View>

//         {/* Title */}
//         <Text style={cardStyles.title} numberOfLines={1}>{app.title}</Text>
//         <Text style={cardStyles.desc}  numberOfLines={2}>{app.description}</Text>

//         {/* Divider */}
//         <View style={cardStyles.divider} />

//         {/* Meta info grid */}
//         <View style={cardStyles.metaGrid}>
//           <View style={cardStyles.metaItem}>
//             <Text style={cardStyles.metaKey}>Owner</Text>
//             <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//           </View>
//           <View style={cardStyles.metaItem}>
//             <Text style={cardStyles.metaKey}>Price</Text>
//             <Text style={[cardStyles.metaVal, { color: '#67E6E8' }]}>
//               ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//             </Text>
//           </View>
//           <View style={cardStyles.metaItem}>
//             <Text style={cardStyles.metaKey}>Email</Text>
//             <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//           </View>
//           <View style={cardStyles.metaItem}>
//             <Text style={cardStyles.metaKey}>Phone</Text>
//             <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={cardStyles.actionRow}>
//           <Pressable
//             onPress={() => onReject(app)}
//             disabled={isLoading}
//             style={({ pressed }) => [cardStyles.rejectBtn, pressed && { opacity: 0.7 }]}
//           >
//             <Text style={cardStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
//           </Pressable>

//           <Pressable
//             onPress={() => onApprove(app)}
//             disabled={isLoading}
//             style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
//           >
//             <LinearGradient
//               colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//               start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//               style={cardStyles.approveBtn}
//             >
//               <View style={cardStyles.approveBtnShine} />
//               <Text style={cardStyles.approveText}>{isLoading ? '...' : '✓  Approve & Publish'}</Text>
//             </LinearGradient>
//           </Pressable>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// const cardStyles = StyleSheet.create({
//   outer: { marginBottom: 14 },
//   card: {
//     borderRadius: 24, borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.09)',
//     paddingHorizontal: 18, paddingVertical: 18,
//     overflow: 'hidden',
//   },
//   shine: {
//     position: 'absolute', top: 0, left: '12%', right: '12%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.14)',
//   },
//   headerRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
//   categoryPill: { backgroundColor: 'rgba(103,230,232,0.13)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   categoryText: { color: '#67E6E8', fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
//   pendingPill:  { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,184,77,0.12)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.28)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   pendingDot:   { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:  { color: '#FFB84D', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   title:        { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6, letterSpacing: -0.3 },
//   desc:         { color: 'rgba(255,255,255,0.58)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
//   divider:      { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 14 },
//   metaGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
//   metaItem:     { width: '47%' },
//   metaKey:      { color: 'rgba(255,255,255,0.38)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4, marginBottom: 3 },
//   metaVal:      { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
//   actionRow:    { flexDirection: 'row', gap: 10 },
//   rejectBtn:    { paddingHorizontal: 18, minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   rejectText:   { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:   { flex: 1, minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
//   approveBtnShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
//   approveText:  { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
// });

// // ── Quick Action Card ─────────────────────────────
// function QuickCard({ label, sublabel, emoji, onPress, accent }) {
//   const pressed = useRef(new Animated.Value(1)).current;
//   const onPressIn  = () => Animated.spring(pressed, { toValue: 0.95, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(pressed, { toValue: 1,    useNativeDriver: true }).start();

//   return (
//     <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={{ width: '47.5%' }}>
//       <Animated.View style={{ transform: [{ scale: pressed }] }}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
//           style={[quickStyles.card, { borderColor: accent || 'rgba(255,255,255,0.08)' }]}
//         >
//           <View style={quickStyles.shine} />
//           <Text style={quickStyles.emoji}>{emoji}</Text>
//           <Text style={quickStyles.label}>{label}</Text>
//           <Text style={quickStyles.sub}>{sublabel}</Text>
//           <Text style={[quickStyles.arrow, { color: accent || '#67E6E8' }]}>→</Text>
//         </LinearGradient>
//       </Animated.View>
//     </Pressable>
//   );
// }

// const quickStyles = StyleSheet.create({
//   card:  { borderRadius: 20, borderWidth: 1, padding: 16, minHeight: 110, overflow: 'hidden', position: 'relative' },
//   shine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
//   emoji: { fontSize: 22, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 3 },
//   sub:   { color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 14, bottom: 14, fontSize: 16, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // MAIN SCREEN
// // ─────────────────────────────────────────────────
// export default function AdminHomeScreen({ navigation, route }) {
//   const user = route?.params?.user;

//   const [pendingApps,   setPendingApps]   = useState([]);
//   const [stats,         setStats]         = useState({ pending: 0, approved: 0, rejected: 0 });
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);

//   // Header animations
//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-20)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;

//   // Bell pulse
//   const bellPulse = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     // Entrance animation
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start();

//     // Bell pulse loop
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bellPulse, { toValue: 1.18, duration: 180, useNativeDriver: true }),
//         Animated.timing(bellPulse, { toValue: 1,    duration: 180, useNativeDriver: true }),
//         Animated.delay(3000),
//       ])
//     ).start();

//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchPendingAppsApi();
//       setPendingApps(data);
//       setStats(prev => ({ ...prev, pending: data.length }));
//     } catch (e) {
//       Alert.alert('Error', 'Could not load pending apps.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   const handleApprove = (app) => {
//     Alert.alert(
//       'Approve App',
//       `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, Approve',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await approveAppApi(app.id);
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));
//               setStats(prev => ({ ...prev, pending: prev.pending - 1, approved: prev.approved + 1 }));
//               Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//             } catch (e) {
//               Alert.alert('Error', e.message);
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleReject = (app) => {
//     Alert.alert(
//       'Reject App',
//       `Reject "${app.title}"?\n\nThis action cannot be undone.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Reject',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await rejectAppApi(app.id);
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));
//               setStats(prev => ({ ...prev, pending: prev.pending - 1, rejected: prev.rejected + 1 }));
//               Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//             } catch (e) {
//               Alert.alert('Error', e.message);
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />

//       <LinearGradient colors={['#0E1420', '#141B2B', '#0A1218']} style={styles.bg}>

//         {/* ══════════════ HEADER ══════════════ */}
//         <Animated.View
//           style={[
//             styles.header,
//             { opacity: headerFade, transform: [{ translateY: headerSlide }] },
//           ]}
//         >
//           <LinearGradient
//             colors={['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.03)']}
//             style={styles.headerCard}
//           >
//             <View style={styles.headerShine} />

//             {/* Left: badge + title */}
//             <View style={styles.headerLeft}>
//               <LinearGradient
//                 colors={['#A855F7', '#7E22CE']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.adminBadge}
//               >
//                 <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//               </LinearGradient>
//               <Text style={styles.headerTitle}>Control Panel</Text>
//               <Text style={styles.headerSub}>Apps Marketplace</Text>
//             </View>

//             {/* Right: Bell + Logout */}
//             <View style={styles.headerRight}>
//               {/* Bell button */}
//               <Pressable
//                 onPress={() => navigation.navigate('Notifications')}
//                 style={({ pressed }) => [styles.bellBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Animated.View style={{ transform: [{ scale: bellPulse }] }}>
//                   <BellIcon hasNotif={pendingApps.length > 0} />
//                 </Animated.View>
//               </Pressable>

//               {/* Logout */}
//               <Pressable
//                 onPress={handleLogout}
//                 style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.logoutText}>Logout</Text>
//               </Pressable>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         {/* ══════════════ SCROLL CONTENT ══════════════ */}
//         <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scroll}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#67E6E8"
//                 colors={['#67E6E8']}
//               />
//             }
//           >

//             {/* ── Welcome strip ── */}
//             <LinearGradient
//               colors={['rgba(168,85,247,0.14)', 'rgba(126,34,206,0.06)']}
//               start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//               style={styles.welcomeStrip}
//             >
//               <View style={styles.welcomeStripShine} />
//               <View>
//                 <Text style={styles.welcomeLabel}>Welcome back</Text>
//                 <Text style={styles.welcomeName}>Admin Dashboard</Text>
//               </View>
//               <View style={styles.liveIndicator}>
//                 <View style={styles.liveDot} />
//                 <Text style={styles.liveText}>Live</Text>
//               </View>
//             </LinearGradient>

//             {/* ── Stats Row ── */}
//             <View style={styles.statsRow}>
//               <StatCard
//                 label="Pending"  value={stats.pending}
//                 color="#FFB84D"  accent="rgba(255,184,77,0.22)"  delay={100}
//               />
//               <StatCard
//                 label="Approved" value={stats.approved}
//                 color="#67E6E8"  accent="rgba(103,230,232,0.22)" delay={200}
//               />
//               <StatCard
//                 label="Rejected" value={stats.rejected}
//                 color="#FF4D6A"  accent="rgba(255,77,106,0.22)"  delay={300}
//               />
//             </View>

//             {/* ── Section: Pending Review ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//                 <Text style={styles.sectionTitle}>
//                   {pendingApps.length > 0
//                     ? `${pendingApps.length} app${pendingApps.length > 1 ? 's' : ''} waiting`
//                     : 'All clear'}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={loadData}
//                 style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.refreshText}>↻  Refresh</Text>
//               </Pressable>
//             </View>

//             {/* ── Loading ── */}
//             {loading && (
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.loadingCard}
//               >
//                 <Text style={styles.loadingText}>Loading pending apps...</Text>
//               </LinearGradient>
//             )}

//             {/* ── Empty state ── */}
//             {!loading && pendingApps.length === 0 && (
//               <LinearGradient
//                 colors={['rgba(103,230,232,0.08)', 'rgba(255,255,255,0.02)']}
//                 style={styles.emptyCard}
//               >
//                 <View style={styles.emptyIconWrap}>
//                   <Text style={styles.emptyIconText}>✓</Text>
//                 </View>
//                 <Text style={styles.emptyTitle}>All caught up!</Text>
//                 <Text style={styles.emptySub}>No apps are waiting for your review right now.</Text>
//               </LinearGradient>
//             )}

//             {/* ── App Review Cards ── */}
//             {!loading && pendingApps.map((app, index) => (
//               <AppReviewCard
//                 key={app.id}
//                 app={app}
//                 index={index}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 actionLoading={actionLoading}
//               />
//             ))}

//             {/* ── Quick Actions ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//                 <Text style={styles.sectionTitle}>Navigate</Text>
//               </View>
//             </View>

//             <View style={styles.quickGrid}>
//               <QuickCard
//                 label="All Apps"
//                 sublabel="Browse marketplace"
//                 emoji="🛒"
//                 accent="rgba(103,230,232,0.25)"
//                 onPress={() => navigation.navigate('Apps')}
//               />
//               <QuickCard
//                 label="Notifications"
//                 sublabel="View all alerts"
//                 emoji="🔔"
//                 accent="rgba(168,85,247,0.25)"
//                 onPress={() => navigation.navigate('Notifications')}
//               />
//               <QuickCard
//                 label="Upload App"
//                 sublabel="Add new listing"
//                 emoji="⬆️"
//                 accent="rgba(255,184,77,0.22)"
//                 onPress={() => navigation.navigate('UploadApp')}
//               />
//               <QuickCard
//                 label="Marketplace"
//                 sublabel="User home view"
//                 emoji="🏠"
//                 accent="rgba(255,77,106,0.22)"
//                 onPress={() => navigation.navigate('Home')}
//               />
//             </View>

//             {/* ── Footer info ── */}
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.01)']}
//               style={styles.footerCard}
//             >
//               <View style={styles.footerShine} />
//               <Text style={styles.footerTitle}>Apps Marketplace</Text>
//               <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//             </LinearGradient>

//           </ScrollView>
//         </Animated.View>

//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// // ─────────────────────────────────────────────────
// // STYLES
// // ─────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0E1420' },
//   bg:       { flex: 1 },

//   // ── Header ──
//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//     paddingBottom: 4,
//     zIndex: 10,
//   },
//   headerCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.09)',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   headerShine: {
//     position: 'absolute', top: 0, left: '10%', right: '10%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.13)',
//   },
//   headerLeft:  { gap: 5 },
//   headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },

//   adminBadge: {
//     alignSelf: 'flex-start', borderRadius: 999,
//     paddingHorizontal: 12, paddingVertical: 5,
//   },
//   adminBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:    { color: '#FFFFFF', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
//   headerSub:      { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '500' },

//   bellBtn: {
//     width: 42, height: 42, borderRadius: 14,
//     backgroundColor: 'rgba(255,255,255,0.07)',
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   logoutBtn: {
//     paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12,
//     backgroundColor: 'rgba(255,77,106,0.12)',
//     borderWidth: 1, borderColor: 'rgba(255,77,106,0.26)',
//   },
//   logoutText: { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },

//   // ── Scroll ──
//   scroll: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 50 },

//   // ── Welcome Strip ──
//   welcomeStrip: {
//     borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.22)',
//     paddingHorizontal: 16, paddingVertical: 14,
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     marginBottom: 16, overflow: 'hidden',
//   },
//   welcomeStripShine: {
//     position: 'absolute', top: 0, left: '15%', right: '15%',
//     height: 1, backgroundColor: 'rgba(168,85,247,0.30)',
//   },
//   welcomeLabel: { color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   welcomeName:  { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
//   liveIndicator:{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
//   liveDot:      { width: 7, height: 7, borderRadius: 4, backgroundColor: '#67E6E8' },
//   liveText:     { color: '#67E6E8', fontSize: 11, fontWeight: '800' },

//   // ── Stats ──
//   statsRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },

//   // ── Section Header ──
//   sectionHeader: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'flex-end', marginBottom: 14,
//   },
//   sectionEye:   { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
//   sectionTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn: {
//     paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
//   },
//   refreshText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // ── Loading ──
//   loadingCard: {
//     borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
//     paddingVertical: 28, alignItems: 'center', marginBottom: 14,
//   },
//   loadingText: { color: '#67E6E8', fontSize: 14, fontWeight: '600' },

//   // ── Empty ──
//   emptyCard: {
//     borderRadius: 22, borderWidth: 1, borderColor: 'rgba(103,230,232,0.15)',
//     paddingVertical: 36, paddingHorizontal: 24,
//     alignItems: 'center', marginBottom: 22,
//   },
//   emptyIconWrap: {
//     width: 56, height: 56, borderRadius: 28,
//     backgroundColor: 'rgba(103,230,232,0.14)',
//     borderWidth: 1, borderColor: 'rgba(103,230,232,0.26)',
//     alignItems: 'center', justifyContent: 'center', marginBottom: 14,
//   },
//   emptyIconText: { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
//   emptyTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptySub:      { color: 'rgba(255,255,255,0.50)', fontSize: 13, textAlign: 'center', lineHeight: 19 },

//   // ── Quick Grid ──
//   quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },

//   // ── Footer ──
//   footerCard: {
//     borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
//     paddingVertical: 18, paddingHorizontal: 18, alignItems: 'center',
//     overflow: 'hidden',
//   },
//   footerShine: {
//     position: 'absolute', top: 0, left: '20%', right: '20%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.10)',
//   },
//   footerTitle: { color: 'rgba(255,255,255,0.60)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
//   footerSub:   { color: 'rgba(255,255,255,0.30)', fontSize: 11 },
// });
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   Animated,
//   Easing,
//   ScrollView,
//   Alert,
//   Dimensions,
//   RefreshControl,
//   Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi,
//   approveAppApi,
//   rejectAppApi,
//   fetchAppStatsApi,
// } from '../utils/apiService';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // ─────────────────────────────────────────────────
// // BELL ICON
// // ─────────────────────────────────────────────────
// function BellIcon({ hasNotif }) {
//   return (
//     <View style={bellStyles.wrap}>
//       <View style={bellStyles.arc} />
//       <View style={bellStyles.body} />
//       <View style={bellStyles.bar} />
//       <View style={bellStyles.clapper} />
//       {hasNotif && <View style={bellStyles.dot} />}
//     </View>
//   );
// }

// const bellStyles = StyleSheet.create({
//   wrap:    { width: 22, height: 24, alignItems: 'center', position: 'relative' },
//   arc:     { width: 10, height: 6, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: 'rgba(255,255,255,0.90)', marginBottom: -1 },
//   body:    { width: 18, height: 12, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: 'rgba(255,255,255,0.90)' },
//   bar:     { width: 20, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.90)', marginTop: 1 },
//   clapper: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.90)', marginTop: 1 },
//   dot:     { position: 'absolute', top: 0, right: 0, width: 9, height: 9, borderRadius: 5, backgroundColor: '#FF4D6A', borderWidth: 1.5, borderColor: '#0E1420' },
// });

// // ─────────────────────────────────────────────────
// // STAT CARD — values come from DB, never reset
// // ─────────────────────────────────────────────────
// function StatCard({ label, value, color, accent, delay }) {
//   const scale = useRef(new Animated.Value(0.82)).current;
//   const op    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(delay),
//       Animated.parallel([
//         Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
//         Animated.timing(op,    { toValue: 1, duration: 380, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[statStyles.wrap, { opacity: op, transform: [{ scale }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
//         style={[statStyles.card, { borderColor: accent }]}
//       >
//         <View style={[statStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[statStyles.value, { color }]}>{value}</Text>
//         <Text style={statStyles.label}>{label}</Text>
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// const statStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   {
//     borderRadius: 20, borderWidth: 1,
//     paddingTop: 14, paddingBottom: 16, paddingHorizontal: 10,
//     alignItems: 'center', overflow: 'hidden',
//   },
//   topBar: { width: 28, height: 3, borderRadius: 2, marginBottom: 12 },
//   value:  { fontSize: 32, fontWeight: '800', marginBottom: 4 },
//   label:  { color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD — with full image
// // ─────────────────────────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(40)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 120),
//       Animated.parallel([
//         Animated.timing(slideAnim, {
//           toValue: 0, duration: 420,
//           easing: Easing.out(Easing.cubic), useNativeDriver: true,
//         }),
//         Animated.timing(opAnim, { toValue: 1, duration: 420, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[cardStyles.outer, { opacity: opAnim, transform: [{ translateY: slideAnim }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.025)']}
//         style={cardStyles.card}
//       >
//         {/* Top shine */}
//         <View style={cardStyles.shine} />

//         {/* ── Full image section ── */}
//         {app.imageUrl ? (
//           <View style={cardStyles.imageWrap}>
//             <Image
//               source={{ uri: app.imageUrl }}
//               style={cardStyles.image}
//               resizeMode="cover"
//             />
//             {/* Dark overlay so badges are readable */}
//             <View style={cardStyles.imageOverlay} />
//             {/* Badges on top of image */}
//             <View style={cardStyles.imageBadgeRow}>
//               <View style={cardStyles.categoryPill}>
//                 <Text style={cardStyles.categoryText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cardStyles.pendingPill}>
//                 <View style={cardStyles.pendingDot} />
//                 <Text style={cardStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//             {/* Price tag on image */}
//             <View style={cardStyles.priceBadge}>
//               <Text style={cardStyles.priceBadgeText}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//           </View>
//         ) : (
//           /* No image placeholder */
//           <View style={cardStyles.imagePlaceholder}>
//             <Text style={cardStyles.imagePlaceholderIcon}>📷</Text>
//             <Text style={cardStyles.imagePlaceholderLabel}>No cover image uploaded</Text>
//             <View style={cardStyles.imageBadgeRowFlat}>
//               <View style={cardStyles.categoryPill}>
//                 <Text style={cardStyles.categoryText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cardStyles.pendingPill}>
//                 <View style={cardStyles.pendingDot} />
//                 <Text style={cardStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* ── Body ── */}
//         <View style={cardStyles.body}>
//           {/* Title */}
//           <Text style={cardStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cardStyles.desc}  numberOfLines={2}>{app.description}</Text>

//           {/* Divider */}
//           <View style={cardStyles.divider} />

//           {/* Meta grid */}
//           <View style={cardStyles.metaGrid}>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Owner</Text>
//               <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Price</Text>
//               <Text style={[cardStyles.metaVal, { color: '#67E6E8' }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Email</Text>
//               <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Phone</Text>
//               <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {app.company ? (
//               <View style={cardStyles.metaItem}>
//                 <Text style={cardStyles.metaKey}>Company</Text>
//                 <Text style={cardStyles.metaVal} numberOfLines={1}>{app.company}</Text>
//               </View>
//             ) : null}
//             {app.features ? (
//               <View style={cardStyles.metaItemFull}>
//                 <Text style={cardStyles.metaKey}>Features</Text>
//                 <Text style={cardStyles.metaVal} numberOfLines={2}>{app.features}</Text>
//               </View>
//             ) : null}
//           </View>

//           {/* Action buttons */}
//           <View style={cardStyles.actionRow}>
//             <Pressable
//               onPress={() => onReject(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [cardStyles.rejectBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={cardStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => onApprove(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cardStyles.approveBtn}
//               >
//                 <View style={cardStyles.approveBtnShine} />
//                 <Text style={cardStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// const cardStyles = StyleSheet.create({
//   outer: { marginBottom: 18 },
//   card: {
//     borderRadius: 24, borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.09)',
//     overflow: 'hidden',
//   },
//   shine: {
//     position: 'absolute', top: 0, left: '12%', right: '12%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.14)', zIndex: 1,
//   },

//   // Image with badges
//   imageWrap:        { width: '100%', height: 190, position: 'relative' },
//   image:            { width: '100%', height: '100%' },
//   imageOverlay:     { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,14,20,0.32)' },
//   imageBadgeRow:    {
//     position: 'absolute', top: 12, left: 14, right: 14,
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//   },
//   priceBadge:       {
//     position: 'absolute', bottom: 12, right: 14,
//     backgroundColor: 'rgba(10,14,20,0.72)',
//     borderWidth: 1, borderColor: 'rgba(103,230,232,0.35)',
//     borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
//   },
//   priceBadgeText:   { color: '#67E6E8', fontSize: 13, fontWeight: '800' },

//   // No image placeholder
//   imagePlaceholder: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     paddingVertical: 22, paddingHorizontal: 14,
//     alignItems: 'center', gap: 8,
//   },
//   imagePlaceholderIcon:  { fontSize: 28 },
//   imagePlaceholderLabel: { color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: '600', marginBottom: 4 },
//   imageBadgeRowFlat:     { flexDirection: 'row', gap: 10, alignSelf: 'stretch', justifyContent: 'space-between' },

//   // Shared badge styles
//   categoryPill: {
//     backgroundColor: 'rgba(103,230,232,0.13)', borderWidth: 1,
//     borderColor: 'rgba(103,230,232,0.28)', borderRadius: 999,
//     paddingHorizontal: 12, paddingVertical: 5,
//   },
//   categoryText: { color: '#67E6E8', fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
//   pendingPill:  {
//     flexDirection: 'row', alignItems: 'center', gap: 6,
//     backgroundColor: 'rgba(255,184,77,0.12)', borderWidth: 1,
//     borderColor: 'rgba(255,184,77,0.28)', borderRadius: 999,
//     paddingHorizontal: 12, paddingVertical: 5,
//   },
//   pendingDot:   { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:  { color: '#FFB84D', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },

//   // Body
//   body:         { paddingHorizontal: 18, paddingVertical: 16 },
//   title:        { color: '#FFFFFF', fontSize: 19, fontWeight: '800', marginBottom: 6, letterSpacing: -0.3 },
//   desc:         { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
//   divider:      { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 14 },
//   metaGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 18 },
//   metaItem:     { width: '47%' },
//   metaItemFull: { width: '100%' },
//   metaKey:      { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4, marginBottom: 3 },
//   metaVal:      { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

//   // Buttons
//   actionRow:       { flexDirection: 'row', gap: 10 },
//   rejectBtn:       {
//     paddingHorizontal: 18, minHeight: 50, borderRadius: 14,
//     alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,77,106,0.12)',
//     borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)',
//   },
//   rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:      { flex: 1, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
//   approveBtnShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
//   approveText:     { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // QUICK ACTION CARD
// // ─────────────────────────────────────────────────
// function QuickCard({ label, sublabel, emoji, onPress, accent }) {
//   const pressScale = useRef(new Animated.Value(1)).current;

//   const onPressIn  = () => Animated.spring(pressScale, { toValue: 0.95, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(pressScale, { toValue: 1,    useNativeDriver: true }).start();

//   return (
//     <Pressable
//       onPress={onPress}
//       onPressIn={onPressIn}
//       onPressOut={onPressOut}
//       style={{ width: '47.5%' }}
//     >
//       <Animated.View style={{ transform: [{ scale: pressScale }] }}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
//           style={[quickStyles.card, { borderColor: accent || 'rgba(255,255,255,0.08)' }]}
//         >
//           <View style={quickStyles.shine} />
//           <Text style={quickStyles.emoji}>{emoji}</Text>
//           <Text style={quickStyles.label}>{label}</Text>
//           <Text style={quickStyles.sub}>{sublabel}</Text>
//           <Text style={[quickStyles.arrow, { color: accent ? accent.replace('0.25)', '0.9)') : '#67E6E8' }]}>→</Text>
//         </LinearGradient>
//       </Animated.View>
//     </Pressable>
//   );
// }

// const quickStyles = StyleSheet.create({
//   card:  {
//     borderRadius: 20, borderWidth: 1, padding: 16,
//     minHeight: 112, overflow: 'hidden', position: 'relative',
//   },
//   shine: {
//     position: 'absolute', top: 0, left: '15%', right: '15%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.12)',
//   },
//   emoji: { fontSize: 22, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 3 },
//   sub:   { color: 'rgba(255,255,255,0.42)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 14, bottom: 14, fontSize: 16, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // MAIN SCREEN
// // ─────────────────────────────────────────────────
// export default function AdminHomeScreen({ navigation, route }) {
//   const user = route?.params?.user;

//   const [pendingApps,   setPendingApps]   = useState([]);
//   const [stats,         setStats]         = useState({ pending: 0, approved: 0, rejected: 0 });
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);

//   // Animations
//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-20)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const bellPulse   = useRef(new Animated.Value(1)).current;

//   // ── Entrance animation ──
//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  {
//           toValue: 1, duration: 500,
//           easing: Easing.out(Easing.cubic), useNativeDriver: true,
//         }),
//         Animated.timing(headerSlide, {
//           toValue: 0, duration: 500,
//           easing: Easing.out(Easing.cubic), useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start();

//     // Bell pulse loop
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bellPulse, { toValue: 1.18, duration: 180, useNativeDriver: true }),
//         Animated.timing(bellPulse, { toValue: 1,    duration: 180, useNativeDriver: true }),
//         Animated.delay(3200),
//       ])
//     ).start();

//     loadData();
//   }, []);

//   // ── Load pending apps + stats from DB ──
//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [pendingData, statsData] = await Promise.all([
//         fetchPendingAppsApi(),
//         fetchAppStatsApi(),   // ✅ stats from DB — never resets
//       ]);
//       setPendingApps(Array.isArray(pendingData) ? pendingData : []);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//     } catch (e) {
//       Alert.alert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   // ── Approve ──
//   const handleApprove = (app) => {
//     Alert.alert(
//       'Approve App',
//       `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, Approve',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await approveAppApi(app.id);
//               // Remove from pending list
//               setPendingApps((prev) => prev.filter((a) => a.id !== app.id));
//               // ✅ Update stats locally (optimistic), then re-fetch from DB
//               setStats((prev) => ({
//                 ...prev,
//                 pending:  Math.max(0, prev.pending - 1),
//                 approved: prev.approved + 1,
//               }));
//               Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//               // Re-fetch real stats from DB after 1s
//               setTimeout(async () => {
//                 const freshStats = await fetchAppStatsApi();
//                 setStats(freshStats);
//               }, 1000);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Approve failed');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   // ── Reject ──
//   const handleReject = (app) => {
//     Alert.alert(
//       'Reject App',
//       `Reject "${app.title}"?\n\nThis action cannot be undone.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Reject',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await rejectAppApi(app.id);
//               // Remove from pending list
//               setPendingApps((prev) => prev.filter((a) => a.id !== app.id));
//               // ✅ Update stats locally (optimistic), then re-fetch from DB
//               setStats((prev) => ({
//                 ...prev,
//                 pending:  Math.max(0, prev.pending - 1),
//                 rejected: prev.rejected + 1,
//               }));
//               Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//               // Re-fetch real stats from DB after 1s
//               setTimeout(async () => {
//                 const freshStats = await fetchAppStatsApi();
//                 setStats(freshStats);
//               }, 1000);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Reject failed');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   // ── Logout ──
//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   // ─────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />

//       <LinearGradient colors={['#0E1420', '#141B2B', '#0A1218']} style={styles.bg}>

//         {/* ══ HEADER ══ */}
//         <Animated.View
//           style={[
//             styles.header,
//             {
//               opacity: headerFade,
//               transform: [{ translateY: headerSlide }],
//             },
//           ]}
//         >
//           <LinearGradient
//             colors={['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.03)']}
//             style={styles.headerCard}
//           >
//             <View style={styles.headerShine} />

//             {/* Left: badge + title */}
//             <View style={styles.headerLeft}>
//               <LinearGradient
//                 colors={['#A855F7', '#7E22CE']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.adminBadge}
//               >
//                 <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//               </LinearGradient>
//               <Text style={styles.headerTitle}>Control Panel</Text>
//               <Text style={styles.headerSub}>Apps Marketplace</Text>
//             </View>

//             {/* Right: Bell + Logout */}
//             <View style={styles.headerRight}>
//               <Pressable
//                 onPress={() => navigation.navigate('AdminNotifications')}
//                 style={({ pressed }) => [styles.bellBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Animated.View style={{ transform: [{ scale: bellPulse }] }}>
//                   <BellIcon hasNotif={pendingApps.length > 0} />
//                 </Animated.View>
//                 {/* Unread count badge on bell */}
//                 {pendingApps.length > 0 && (
//                   <View style={styles.bellBadge}>
//                     <Text style={styles.bellBadgeText}>
//                       {pendingApps.length > 9 ? '9+' : pendingApps.length}
//                     </Text>
//                   </View>
//                 )}
//               </Pressable>

//               <Pressable
//                 onPress={handleLogout}
//                 style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.logoutText}>Logout</Text>
//               </Pressable>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         {/* ══ SCROLL CONTENT ══ */}
//         <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scroll}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#67E6E8"
//                 colors={['#67E6E8']}
//               />
//             }
//           >

//             {/* ── Welcome strip ── */}
//             <LinearGradient
//               colors={['rgba(168,85,247,0.14)', 'rgba(126,34,206,0.06)']}
//               start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//               style={styles.welcomeStrip}
//             >
//               <View style={styles.welcomeStripShine} />
//               <View>
//                 <Text style={styles.welcomeLabel}>Welcome back</Text>
//                 <Text style={styles.welcomeName}>Admin Dashboard</Text>
//               </View>
//               <View style={styles.liveIndicator}>
//                 <View style={styles.liveDot} />
//                 <Text style={styles.liveText}>Live</Text>
//               </View>
//             </LinearGradient>

//             {/* ── Stats Row — from DB, persistent ── */}
//             <View style={styles.statsRow}>
//               <StatCard
//                 label="Pending"
//                 value={stats.pending}
//                 color="#FFB84D"
//                 accent="rgba(255,184,77,0.22)"
//                 delay={100}
//               />
//               <StatCard
//                 label="Approved"
//                 value={stats.approved}
//                 color="#67E6E8"
//                 accent="rgba(103,230,232,0.22)"
//                 delay={200}
//               />
//               <StatCard
//                 label="Rejected"
//                 value={stats.rejected}
//                 color="#FF4D6A"
//                 accent="rgba(255,77,106,0.22)"
//                 delay={300}
//               />
//             </View>

//             {/* ── Stats info note ── */}
//             <View style={styles.statsNote}>
//               <Text style={styles.statsNoteText}>
//                 📊  Counts reflect all-time totals from the database
//               </Text>
//             </View>

//             {/* ── Section: Pending Review ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//                 <Text style={styles.sectionTitle}>
//                   {loading
//                     ? 'Loading...'
//                     : pendingApps.length > 0
//                     ? `${pendingApps.length} app${pendingApps.length > 1 ? 's' : ''} waiting`
//                     : 'All clear ✓'}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={loadData}
//                 style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.refreshText}>↻  Refresh</Text>
//               </Pressable>
//             </View>

//             {/* ── Loading state ── */}
//             {loading && (
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.loadingCard}
//               >
//                 <Text style={styles.loadingText}>Loading pending apps...</Text>
//               </LinearGradient>
//             )}

//             {/* ── Empty state ── */}
//             {!loading && pendingApps.length === 0 && (
//               <LinearGradient
//                 colors={['rgba(103,230,232,0.08)', 'rgba(255,255,255,0.02)']}
//                 style={styles.emptyCard}
//               >
//                 <View style={styles.emptyIconWrap}>
//                   <Text style={styles.emptyIconText}>✓</Text>
//                 </View>
//                 <Text style={styles.emptyTitle}>All caught up!</Text>
//                 <Text style={styles.emptySub}>
//                   No apps are waiting for review right now.{'\n'}Pull down to refresh.
//                 </Text>
//               </LinearGradient>
//             )}

//             {/* ── App Review Cards ── */}
//             {!loading && pendingApps.map((app, index) => (
//               <AppReviewCard
//                 key={app.id}
//                 app={app}
//                 index={index}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 actionLoading={actionLoading}
//               />
//             ))}

//             {/* ── Quick Actions ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//                 <Text style={styles.sectionTitle}>Navigate</Text>
//               </View>
//             </View>

//             <View style={styles.quickGrid}>
//               <QuickCard
//                 label="All Apps"
//                 sublabel="Browse marketplace"
//                 emoji="🛒"
//                 accent="rgba(103,230,232,0.25)"
//                 onPress={() => navigation.navigate('Apps')}
//               />
//               <QuickCard
//                 label="Notifications"
//                 sublabel="View all alerts"
//                 emoji="🔔"
//                 accent="rgba(168,85,247,0.25)"
//                 onPress={() => navigation.navigate('AdminNotifications')}
//               />
//               <QuickCard
//                 label="Upload App"
//                 sublabel="Add new listing"
//                 emoji="⬆️"
//                 accent="rgba(255,184,77,0.22)"
//                 onPress={() => navigation.navigate('UploadApp')}
//               />
//               <QuickCard
//                 label="Marketplace"
//                 sublabel="User home view"
//                 emoji="🏠"
//                 accent="rgba(255,77,106,0.22)"
//                 onPress={() => navigation.navigate('Home')}
//               />
//             </View>

//             {/* ── Approved apps count strip ── */}
//             <LinearGradient
//               colors={['rgba(103,230,232,0.10)', 'rgba(255,255,255,0.02)']}
//               style={styles.approvedStrip}
//             >
//               <View style={styles.approvedStripShine} />
//               <View>
//                 <Text style={styles.approvedStripLabel}>Total approved apps live</Text>
//                 <Text style={styles.approvedStripValue}>{stats.approved} apps</Text>
//               </View>
//               <Pressable
//                 onPress={() => navigation.navigate('Apps')}
//                 style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.viewAllBtnText}>View all →</Text>
//               </Pressable>
//             </LinearGradient>

//             {/* ── Footer ── */}
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.01)']}
//               style={styles.footerCard}
//             >
//               <View style={styles.footerShine} />
//               <Text style={styles.footerTitle}>Apps Marketplace</Text>
//               <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//             </LinearGradient>

//           </ScrollView>
//         </Animated.View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// // ─────────────────────────────────────────────────
// // STYLES
// // ─────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0E1420' },
//   bg:       { flex: 1 },

//   // ── Header ──
//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//     paddingBottom: 4,
//     zIndex: 10,
//   },
//   headerCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.09)',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   headerShine: {
//     position: 'absolute', top: 0, left: '10%', right: '10%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.13)',
//   },
//   headerLeft:  { gap: 5 },
//   headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },

//   adminBadge: {
//     alignSelf: 'flex-start', borderRadius: 999,
//     paddingHorizontal: 12, paddingVertical: 5,
//   },
//   adminBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:    { color: '#FFFFFF', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
//   headerSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 12, fontWeight: '500' },

//   bellBtn: {
//     width: 42, height: 42, borderRadius: 14,
//     backgroundColor: 'rgba(255,255,255,0.07)',
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
//     alignItems: 'center', justifyContent: 'center',
//     position: 'relative',
//   },
//   bellBadge: {
//     position: 'absolute', top: -4, right: -4,
//     minWidth: 18, height: 18, borderRadius: 9,
//     backgroundColor: '#FF4D6A',
//     borderWidth: 1.5, borderColor: '#0E1420',
//     alignItems: 'center', justifyContent: 'center',
//     paddingHorizontal: 3,
//   },
//   bellBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
//   logoutBtn: {
//     paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12,
//     backgroundColor: 'rgba(255,77,106,0.12)',
//     borderWidth: 1, borderColor: 'rgba(255,77,106,0.26)',
//   },
//   logoutText: { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },

//   // ── Scroll ──
//   scroll: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 50 },

//   // ── Welcome Strip ──
//   welcomeStrip: {
//     borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.22)',
//     paddingHorizontal: 16, paddingVertical: 14,
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     marginBottom: 16, overflow: 'hidden',
//   },
//   welcomeStripShine: {
//     position: 'absolute', top: 0, left: '15%', right: '15%',
//     height: 1, backgroundColor: 'rgba(168,85,247,0.30)',
//   },
//   welcomeLabel: { color: 'rgba(255,255,255,0.48)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   welcomeName:  { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
//   liveIndicator:{
//     flexDirection: 'row', alignItems: 'center', gap: 6,
//     backgroundColor: 'rgba(103,230,232,0.12)',
//     borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)',
//     borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6,
//   },
//   liveDot:  { width: 7, height: 7, borderRadius: 4, backgroundColor: '#67E6E8' },
//   liveText: { color: '#67E6E8', fontSize: 11, fontWeight: '800' },

//   // ── Stats ──
//   statsRow:       { flexDirection: 'row', gap: 10, marginBottom: 8 },
//   statsNote:      { marginBottom: 22, paddingHorizontal: 2 },
//   statsNoteText:  { color: 'rgba(255,255,255,0.30)', fontSize: 11, fontWeight: '500' },

//   // ── Section Header ──
//   sectionHeader: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'flex-end', marginBottom: 14,
//   },
//   sectionEye:   { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
//   sectionTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn: {
//     paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
//   },
//   refreshText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // ── Loading ──
//   loadingCard: {
//     borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
//     paddingVertical: 28, alignItems: 'center', marginBottom: 14,
//   },
//   loadingText: { color: '#67E6E8', fontSize: 14, fontWeight: '600' },

//   // ── Empty ──
//   emptyCard: {
//     borderRadius: 22, borderWidth: 1, borderColor: 'rgba(103,230,232,0.15)',
//     paddingVertical: 36, paddingHorizontal: 24,
//     alignItems: 'center', marginBottom: 22,
//   },
//   emptyIconWrap: {
//     width: 56, height: 56, borderRadius: 28,
//     backgroundColor: 'rgba(103,230,232,0.14)',
//     borderWidth: 1, borderColor: 'rgba(103,230,232,0.26)',
//     alignItems: 'center', justifyContent: 'center', marginBottom: 14,
//   },
//   emptyIconText: { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
//   emptyTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptySub:      {
//     color: 'rgba(255,255,255,0.48)', fontSize: 13,
//     textAlign: 'center', lineHeight: 19,
//   },

//   // ── Quick Grid ──
//   quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },

//   // ── Approved strip ──
//   approvedStrip: {
//     borderRadius: 18, borderWidth: 1, borderColor: 'rgba(103,230,232,0.18)',
//     paddingHorizontal: 16, paddingVertical: 14,
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     marginBottom: 18, overflow: 'hidden',
//   },
//   approvedStripShine: {
//     position: 'absolute', top: 0, left: '15%', right: '15%',
//     height: 1, backgroundColor: 'rgba(103,230,232,0.22)',
//   },
//   approvedStripLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   approvedStripValue: { color: '#67E6E8', fontSize: 17, fontWeight: '800' },
//   viewAllBtn: {
//     paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
//     backgroundColor: 'rgba(103,230,232,0.10)',
//     borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)',
//   },
//   viewAllBtnText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // ── Footer ──
//   footerCard: {
//     borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
//     paddingVertical: 18, paddingHorizontal: 18,
//     alignItems: 'center', overflow: 'hidden',
//   },
//   footerShine: {
//     position: 'absolute', top: 0, left: '20%', right: '20%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.10)',
//   },
//   footerTitle: { color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
//   footerSub:   { color: 'rgba(255,255,255,0.28)', fontSize: 11 },
// });
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView,
//   Alert, Dimensions, RefreshControl, Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi,
//   approveAppApi,
//   rejectAppApi,
//   fetchAppStatsApi,
//   fetchUnreadCountApi,
// } from '../utils/apiService';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // ─────────────────────────────────────────────────
// // BELL ICON
// // ─────────────────────────────────────────────────
// function BellIcon() {
//   return (
//     <View style={bellStyles.wrap}>
//       <View style={bellStyles.arc} />
//       <View style={bellStyles.body} />
//       <View style={bellStyles.bar} />
//       <View style={bellStyles.clapper} />
//     </View>
//   );
// }
// const bellStyles = StyleSheet.create({
//   wrap:    { width: 20, height: 22, alignItems: 'center' },
//   arc:     { width: 9, height: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: 'rgba(255,255,255,0.92)', marginBottom: -1 },
//   body:    { width: 17, height: 11, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: 'rgba(255,255,255,0.92)' },
//   bar:     { width: 19, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
//   clapper: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
// });

// // ─────────────────────────────────────────────────
// // STAT CARD
// // ─────────────────────────────────────────────────
// function StatCard({ label, value, color, accent, delay }) {
//   const scale = useRef(new Animated.Value(0.82)).current;
//   const op    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(delay),
//       Animated.parallel([
//         Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
//         Animated.timing(op,    { toValue: 1, duration: 400, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, [value]);

//   return (
//     <Animated.View style={[statStyles.wrap, { opacity: op, transform: [{ scale }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.03)']}
//         style={[statStyles.card, { borderColor: accent }]}
//       >
//         <View style={[statStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[statStyles.value, { color }]}>{value}</Text>
//         <Text style={statStyles.label}>{label}</Text>
//       </LinearGradient>
//     </Animated.View>
//   );
// }
// const statStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   { borderRadius: 20, borderWidth: 1, paddingTop: 16, paddingBottom: 18, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
//   topBar: { width: 28, height: 3, borderRadius: 2, marginBottom: 12 },
//   value:  { fontSize: 34, fontWeight: '800', marginBottom: 4 },
//   label:  { color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD — full image + all details
// // ─────────────────────────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(44)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 130),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 440, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 440, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 20 }}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
//         style={cardStyles.card}
//       >
//         <View style={cardStyles.shine} />

//         {/* ── Image ── */}
//         {app.imageUrl ? (
//           <View style={cardStyles.imageWrap}>
//             <Image source={{ uri: app.imageUrl }} style={cardStyles.image} resizeMode="cover" />
//             <View style={cardStyles.imageOverlay} />
//             {/* Badges over image */}
//             <View style={cardStyles.imageBadgeRow}>
//               <View style={cardStyles.categoryPill}>
//                 <Text style={cardStyles.categoryText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cardStyles.pendingPill}>
//                 <View style={cardStyles.pendingDot} />
//                 <Text style={cardStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//             {/* Price over image bottom-right */}
//             <View style={cardStyles.priceOverlay}>
//               <Text style={cardStyles.priceOverlayText}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//           </View>
//         ) : (
//           <View style={cardStyles.noImageWrap}>
//             <Text style={cardStyles.noImageIcon}>📷</Text>
//             <Text style={cardStyles.noImageText}>No cover image</Text>
//             <View style={cardStyles.noImageBadges}>
//               <View style={cardStyles.categoryPill}>
//                 <Text style={cardStyles.categoryText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cardStyles.pendingPill}>
//                 <View style={cardStyles.pendingDot} />
//                 <Text style={cardStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* ── Body ── */}
//         <View style={cardStyles.body}>
//           <Text style={cardStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cardStyles.desc}  numberOfLines={2}>{app.description}</Text>

//           <View style={cardStyles.divider} />

//           <View style={cardStyles.metaGrid}>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Owner</Text>
//               <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Price</Text>
//               <Text style={[cardStyles.metaVal, { color: '#67E6E8' }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Email</Text>
//               <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cardStyles.metaItem}>
//               <Text style={cardStyles.metaKey}>Phone</Text>
//               <Text style={cardStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {!!app.company && (
//               <View style={cardStyles.metaItem}>
//                 <Text style={cardStyles.metaKey}>Company</Text>
//                 <Text style={cardStyles.metaVal} numberOfLines={1}>{app.company}</Text>
//               </View>
//             )}
//             {!!app.features && (
//               <View style={cardStyles.metaItemFull}>
//                 <Text style={cardStyles.metaKey}>Features</Text>
//                 <Text style={cardStyles.metaVal} numberOfLines={2}>{app.features}</Text>
//               </View>
//             )}
//           </View>

//           {/* Action buttons */}
//           <View style={cardStyles.actionRow}>
//             <Pressable
//               onPress={() => onReject(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [cardStyles.rejectBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={cardStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => onApprove(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cardStyles.approveBtn}
//               >
//                 <View style={cardStyles.approveBtnShine} />
//                 <Text style={cardStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// const cardStyles = StyleSheet.create({
//   card:             { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
//   shine:            { position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, backgroundColor: 'rgba(255,255,255,0.15)', zIndex: 1 },
//   imageWrap:        { width: '100%', height: 196, position: 'relative' },
//   image:            { width: '100%', height: '100%' },
//   imageOverlay:     { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(8,12,20,0.30)' },
//   imageBadgeRow:    { position: 'absolute', top: 12, left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   priceOverlay:     { position: 'absolute', bottom: 12, right: 14, backgroundColor: 'rgba(8,12,20,0.78)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.40)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
//   priceOverlayText: { color: '#67E6E8', fontSize: 13, fontWeight: '800' },
//   noImageWrap:      { backgroundColor: 'rgba(255,255,255,0.04)', paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center', gap: 6 },
//   noImageIcon:      { fontSize: 28 },
//   noImageText:      { color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: '600', marginBottom: 4 },
//   noImageBadges:    { flexDirection: 'row', gap: 10, alignSelf: 'stretch', justifyContent: 'space-between' },
//   categoryPill:     { backgroundColor: 'rgba(103,230,232,0.13)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   categoryText:     { color: '#67E6E8', fontSize: 11, fontWeight: '700' },
//   pendingPill:      { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   pendingDot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:      { color: '#FFB84D', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   body:             { paddingHorizontal: 18, paddingVertical: 16 },
//   title:            { color: '#FFFFFF', fontSize: 19, fontWeight: '800', marginBottom: 6, letterSpacing: -0.3 },
//   desc:             { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
//   divider:          { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 14 },
//   metaGrid:         { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 18 },
//   metaItem:         { width: '47%' },
//   metaItemFull:     { width: '100%' },
//   metaKey:          { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4, marginBottom: 3 },
//   metaVal:          { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
//   actionRow:        { flexDirection: 'row', gap: 10 },
//   rejectBtn:        { paddingHorizontal: 20, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.30)' },
//   rejectText:       { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:       { flex: 1, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
//   approveBtnShine:  { position: 'absolute', top: 0, left: 8, right: 8, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
//   approveText:      { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // QUICK CARD
// // ─────────────────────────────────────────────────
// function QuickCard({ label, sublabel, emoji, onPress, accent }) {
//   const pressScale = useRef(new Animated.Value(1)).current;
//   const onPressIn  = () => Animated.spring(pressScale, { toValue: 0.95, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(pressScale, { toValue: 1,    useNativeDriver: true }).start();

//   return (
//     <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={{ width: '47.5%' }}>
//       <Animated.View style={{ transform: [{ scale: pressScale }] }}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
//           style={[quickStyles.card, { borderColor: accent || 'rgba(255,255,255,0.09)' }]}
//         >
//           <View style={quickStyles.shine} />
//           <Text style={quickStyles.emoji}>{emoji}</Text>
//           <Text style={quickStyles.label}>{label}</Text>
//           <Text style={quickStyles.sub}>{sublabel}</Text>
//           <Text style={[quickStyles.arrow, { color: accent ? accent.replace('0.25)', '1)').replace('0.22)', '1)') : '#67E6E8' }]}>→</Text>
//         </LinearGradient>
//       </Animated.View>
//     </Pressable>
//   );
// }
// const quickStyles = StyleSheet.create({
//   card:  { borderRadius: 20, borderWidth: 1, padding: 16, minHeight: 112, overflow: 'hidden', position: 'relative' },
//   shine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
//   emoji: { fontSize: 22, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 3 },
//   sub:   { color: 'rgba(255,255,255,0.42)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 14, bottom: 14, fontSize: 16, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // MAIN SCREEN
// // ─────────────────────────────────────────────────
// export default function AdminHomeScreen({ navigation, route }) {
//   const user = route?.params?.user;

//   const [pendingApps,    setPendingApps]    = useState([]);
//   const [stats,          setStats]          = useState({ pending: 0, approved: 0, rejected: 0 });
//   const [unreadCount,    setUnreadCount]    = useState(0);   // ✅ bell badge
//   const [loading,        setLoading]        = useState(true);
//   const [refreshing,     setRefreshing]     = useState(false);
//   const [actionLoading,  setActionLoading]  = useState(null);

//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-20)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const bellPulse   = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     // Entrance animation
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start();

//     // Bell pulse loop
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bellPulse, { toValue: 1.20, duration: 160, useNativeDriver: true }),
//         Animated.timing(bellPulse, { toValue: 1,    duration: 160, useNativeDriver: true }),
//         Animated.delay(3400),
//       ])
//     ).start();

//     loadData();
//   }, []);

//   // ✅ Load everything together — pending apps + stats + unread bell count
//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [pendingData, statsData, unread] = await Promise.all([
//         fetchPendingAppsApi(),
//         fetchAppStatsApi(),
//         fetchUnreadCountApi('ADMIN'),   // ✅ bell badge count
//       ]);
//       setPendingApps(Array.isArray(pendingData) ? pendingData : []);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (e) {
//       Alert.alert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   // ✅ Re-fetch fresh stats + unread from DB after action
//   const refreshStatsAndBell = async () => {
//     try {
//       const [statsData, unread] = await Promise.all([
//         fetchAppStatsApi(),
//         fetchUnreadCountApi('ADMIN'),
//       ]);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (_) {}
//   };

//   // ── Approve ──
//   const handleApprove = (app) => {
//     Alert.alert(
//       'Approve App',
//       `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, Approve',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await approveAppApi(app.id);
//               // Remove from list immediately
//               setPendingApps((prev) => prev.filter((a) => a.id !== app.id));
//               // Optimistic stat update
//               setStats((prev) => ({
//                 pending:  Math.max(0, prev.pending - 1),
//                 approved: prev.approved + 1,
//                 rejected: prev.rejected,
//               }));
//               Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//               // Re-fetch real counts from DB after short delay
//               setTimeout(refreshStatsAndBell, 800);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Approve failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   // ── Reject ──
//   const handleReject = (app) => {
//     Alert.alert(
//       'Reject App',
//       `Reject "${app.title}"?\n\nThis cannot be undone.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Reject',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await rejectAppApi(app.id);
//               setPendingApps((prev) => prev.filter((a) => a.id !== app.id));
//               setStats((prev) => ({
//                 pending:  Math.max(0, prev.pending - 1),
//                 approved: prev.approved,
//                 rejected: prev.rejected + 1,
//               }));
//               Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//               setTimeout(refreshStatsAndBell, 800);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Reject failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   // ─────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />
//       <LinearGradient colors={['#0E1420', '#141B2B', '#0A1218']} style={styles.bg}>

//         {/* ══ HEADER ══ */}
//         <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
//             style={styles.headerCard}
//           >
//             <View style={styles.headerShine} />

//             <View style={styles.headerLeft}>
//               <LinearGradient colors={['#A855F7', '#7E22CE']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.adminBadge}>
//                 <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//               </LinearGradient>
//               <Text style={styles.headerTitle}>Control Panel</Text>
//               <Text style={styles.headerSub}>Apps Marketplace</Text>
//             </View>

//             <View style={styles.headerRight}>
//               {/* ✅ Bell with red badge showing unread count */}
//               <Pressable
//                 onPress={() => navigation.navigate('AdminNotifications')}
//                 style={({ pressed }) => [styles.bellBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Animated.View style={{ transform: [{ scale: bellPulse }] }}>
//                   <BellIcon />
//                 </Animated.View>
//                 {/* ✅ Red badge — shows when unreadCount > 0 */}
//                 {unreadCount > 0 && (
//                   <View style={styles.bellBadge}>
//                     <Text style={styles.bellBadgeText}>
//                       {unreadCount > 9 ? '9+' : String(unreadCount)}
//                     </Text>
//                   </View>
//                 )}
//               </Pressable>

//               <Pressable
//                 onPress={handleLogout}
//                 style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.logoutText}>Logout</Text>
//               </Pressable>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         {/* ══ CONTENT ══ */}
//         <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scroll}
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#67E6E8" colors={['#67E6E8']} />
//             }
//           >

//             {/* ── Welcome ── */}
//             <LinearGradient
//               colors={['rgba(168,85,247,0.15)', 'rgba(126,34,206,0.06)']}
//               start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//               style={styles.welcomeStrip}
//             >
//               <View style={styles.welcomeShine} />
//               <View>
//                 <Text style={styles.welcomeLabel}>Welcome back</Text>
//                 <Text style={styles.welcomeName}>Admin Dashboard</Text>
//               </View>
//               <View style={styles.liveRow}>
//                 <View style={styles.liveDot} />
//                 <Text style={styles.liveText}>Live</Text>
//               </View>
//             </LinearGradient>

//             {/* ✅ Stats — from /api/apps/stats, persistent across refreshes */}
//             <View style={styles.statsRow}>
//               <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.25)"  delay={80}  />
//               <StatCard label="Approved" value={stats.approved} color="#67E6E8" accent="rgba(103,230,232,0.25)" delay={160} />
//               <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.25)"  delay={240} />
//             </View>

//             <Text style={styles.statsNote}>All-time totals from database · pull down to refresh</Text>

//             {/* ── Pending Review section ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//                 <Text style={styles.sectionTitle}>
//                   {loading
//                     ? 'Loading...'
//                     : pendingApps.length > 0
//                     ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
//                     : 'All clear ✓'}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={loadData}
//                 style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.refreshBtnText}>↻  Refresh</Text>
//               </Pressable>
//             </View>

//             {/* Loading */}
//             {loading && (
//               <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} style={styles.loadingCard}>
//                 <Text style={styles.loadingText}>Loading apps...</Text>
//               </LinearGradient>
//             )}

//             {/* Empty */}
//             {!loading && pendingApps.length === 0 && (
//               <LinearGradient colors={['rgba(103,230,232,0.08)', 'rgba(255,255,255,0.02)']} style={styles.emptyCard}>
//                 <View style={styles.emptyIconWrap}>
//                   <Text style={styles.emptyIconText}>✓</Text>
//                 </View>
//                 <Text style={styles.emptyTitle}>All caught up!</Text>
//                 <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
//               </LinearGradient>
//             )}

//             {/* Cards */}
//             {!loading && pendingApps.map((app, index) => (
//               <AppReviewCard
//                 key={app.id}
//                 app={app}
//                 index={index}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 actionLoading={actionLoading}
//               />
//             ))}

//             {/* ── Quick Actions ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//                 <Text style={styles.sectionTitle}>Navigate</Text>
//               </View>
//             </View>
//             <View style={styles.quickGrid}>
//               <QuickCard label="All Apps"      sublabel="Browse marketplace"  emoji="🛒" accent="rgba(103,230,232,0.25)" onPress={() => navigation.navigate('Apps')} />
//               <QuickCard label="Notifications" sublabel="View all alerts"     emoji="🔔" accent="rgba(168,85,247,0.25)" onPress={() => navigation.navigate('AdminNotifications')} />
//               <QuickCard label="Upload App"    sublabel="Add new listing"     emoji="⬆️" accent="rgba(255,184,77,0.22)" onPress={() => navigation.navigate('UploadApp')} />
//               <QuickCard label="Marketplace"   sublabel="User home view"      emoji="🏠" accent="rgba(255,77,106,0.22)" onPress={() => navigation.navigate('Home')} />
//             </View>

//             {/* ── Live count strip ── */}
//             <LinearGradient
//               colors={['rgba(103,230,232,0.10)', 'rgba(255,255,255,0.02)']}
//               style={styles.liveStrip}
//             >
//               <View style={styles.liveStripShine} />
//               <View>
//                 <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
//                 <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
//               </View>
//               <Pressable
//                 onPress={() => navigation.navigate('Apps')}
//                 style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.viewAllText}>View all →</Text>
//               </Pressable>
//             </LinearGradient>

//             {/* Footer */}
//             <LinearGradient colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.01)']} style={styles.footer}>
//               <View style={styles.footerShine} />
//               <Text style={styles.footerTitle}>Apps Marketplace</Text>
//               <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//             </LinearGradient>

//           </ScrollView>
//         </Animated.View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// // ─────────────────────────────────────────────────
// // STYLES
// // ─────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0E1420' },
//   bg:       { flex: 1 },

//   header:      { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, zIndex: 10 },
//   headerCard:  { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' },
//   headerShine: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.14)' },
//   headerLeft:  { gap: 5 },
//   headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },

//   adminBadge:     { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   adminBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:    { color: '#FFFFFF', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
//   headerSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 12 },

//   // ✅ Bell button with badge
//   bellBtn: {
//     width: 44, height: 44, borderRadius: 14,
//     backgroundColor: 'rgba(255,255,255,0.07)',
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.11)',
//     alignItems: 'center', justifyContent: 'center',
//     position: 'relative',
//   },
//   bellBadge: {
//     position: 'absolute', top: -5, right: -5,
//     minWidth: 20, height: 20, borderRadius: 10,
//     backgroundColor: '#FF4D6A',
//     borderWidth: 2, borderColor: '#0E1420',
//     alignItems: 'center', justifyContent: 'center',
//     paddingHorizontal: 4,
//     zIndex: 10,
//   },
//   bellBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', lineHeight: 12 },

//   logoutBtn:  { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   logoutText: { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },

//   scroll: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },

//   // Welcome
//   welcomeStrip: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.22)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
//   welcomeShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(168,85,247,0.32)' },
//   welcomeLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   welcomeName:  { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
//   liveRow:      { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
//   liveDot:      { width: 7, height: 7, borderRadius: 4, backgroundColor: '#67E6E8' },
//   liveText:     { color: '#67E6E8', fontSize: 11, fontWeight: '800' },

//   // Stats
//   statsRow:  { flexDirection: 'row', gap: 10, marginBottom: 8 },
//   statsNote: { color: 'rgba(255,255,255,0.28)', fontSize: 11, marginBottom: 22, paddingHorizontal: 2 },

//   // Section header
//   sectionHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
//   sectionEye:     { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
//   sectionTitle:   { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   refreshBtnText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // Loading / empty
//   loadingCard: { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 28, alignItems: 'center', marginBottom: 14 },
//   loadingText: { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
//   emptyCard:   { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(103,230,232,0.16)', paddingVertical: 36, paddingHorizontal: 24, alignItems: 'center', marginBottom: 24 },
//   emptyIconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(103,230,232,0.14)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
//   emptyIconText: { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
//   emptyTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptySub:      { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },

//   // Quick grid
//   quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },

//   // Live strip
//   liveStrip:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(103,230,232,0.20)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, overflow: 'hidden' },
//   liveStripShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(103,230,232,0.24)' },
//   liveStripLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   liveStripValue: { color: '#67E6E8', fontSize: 17, fontWeight: '800' },
//   viewAllBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(103,230,232,0.10)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.26)' },
//   viewAllText:    { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // Footer
//   footer:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 18, alignItems: 'center', overflow: 'hidden' },
//   footerShine: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
//   footerTitle: { color: 'rgba(255,255,255,0.52)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
//   footerSub:   { color: 'rgba(255,255,255,0.25)', fontSize: 11 },
// });

// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView,
//   Alert, RefreshControl, Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi,
//   fetchAppStatsApi,
//   fetchAdminUnreadCountApi,
//   approveAppApi,
//   rejectAppApi,
// } from '../utils/apiService';
// import { useMarketplace } from '../context/MarketplaceContext';

// // ─────────────────────────────────────────────────
// // STAT CARD
// // ─────────────────────────────────────────────────
// function StatCard({ label, value, color, accent, delay }) {
//   const scale = useRef(new Animated.Value(0.82)).current;
//   const op    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     scale.setValue(0.82);
//     op.setValue(0);
//     Animated.sequence([
//       Animated.delay(delay),
//       Animated.parallel([
//         Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
//         Animated.timing(op,    { toValue: 1, duration: 400, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, [value]);

//   return (
//     <Animated.View style={[sStyles.wrap, { opacity: op, transform: [{ scale }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.03)']}
//         style={[sStyles.card, { borderColor: accent }]}
//       >
//         <View style={[sStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[sStyles.value, { color }]}>{value}</Text>
//         <Text style={sStyles.label}>{label}</Text>
//       </LinearGradient>
//     </Animated.View>
//   );
// }
// const sStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   { borderRadius: 20, borderWidth: 1, paddingTop: 16, paddingBottom: 18, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
//   topBar: { width: 28, height: 3, borderRadius: 2, marginBottom: 12 },
//   value:  { fontSize: 34, fontWeight: '800', marginBottom: 4 },
//   label:  { color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD
// // ─────────────────────────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(44)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 120),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 420, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 18 }}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
//         style={cStyles.card}
//       >
//         <View style={cStyles.shine} />

//         {/* Image */}
//         {app.imageUrl ? (
//           <View style={cStyles.imageWrap}>
//             <Image source={{ uri: app.imageUrl }} style={cStyles.image} resizeMode="cover" />
//             <View style={cStyles.imageOverlay} />
//             <View style={cStyles.imageBadgeRow}>
//               <View style={cStyles.catPill}>
//                 <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cStyles.pendingPill}>
//                 <View style={cStyles.pendingDot} />
//                 <Text style={cStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//             <View style={cStyles.priceOverlay}>
//               <Text style={cStyles.priceOverlayText}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//           </View>
//         ) : (
//           <View style={cStyles.noImgWrap}>
//             <Text style={cStyles.noImgIcon}>📷</Text>
//             <Text style={cStyles.noImgText}>No cover image</Text>
//             <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
//               <View style={cStyles.catPill}>
//                 <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cStyles.pendingPill}>
//                 <View style={cStyles.pendingDot} />
//                 <Text style={cStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Body */}
//         <View style={cStyles.body}>
//           <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>

//           <View style={cStyles.divider} />

//           <View style={cStyles.metaGrid}>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Owner</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Price</Text>
//               <Text style={[cStyles.metaVal, { color: '#67E6E8' }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Email</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Phone</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {!!app.company && (
//               <View style={cStyles.metaItemFull}>
//                 <Text style={cStyles.metaKey}>Company</Text>
//                 <Text style={cStyles.metaVal}>{app.company}</Text>
//               </View>
//             )}
//           </View>

//           {/* Buttons */}
//           <View style={cStyles.actionRow}>
//             <Pressable
//               onPress={() => onReject(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [cStyles.rejectBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={cStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => onApprove(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cStyles.approveBtn}
//               >
//                 <View style={cStyles.approveBtnShine} />
//                 <Text style={cStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );
// }
// const cStyles = StyleSheet.create({
//   card:            { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
//   shine:           { position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, backgroundColor: 'rgba(255,255,255,0.15)', zIndex: 1 },
//   imageWrap:       { width: '100%', height: 190, position: 'relative' },
//   image:           { width: '100%', height: '100%' },
//   imageOverlay:    { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(8,12,20,0.28)' },
//   imageBadgeRow:   { position: 'absolute', top: 12, left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between' },
//   priceOverlay:    { position: 'absolute', bottom: 12, right: 14, backgroundColor: 'rgba(8,12,20,0.78)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.40)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
//   priceOverlayText:{ color: '#67E6E8', fontSize: 13, fontWeight: '800' },
//   noImgWrap:       { backgroundColor: 'rgba(255,255,255,0.04)', paddingVertical: 22, paddingHorizontal: 16, alignItems: 'center' },
//   noImgIcon:       { fontSize: 28, marginBottom: 4 },
//   noImgText:       { color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: '600' },
//   catPill:         { backgroundColor: 'rgba(103,230,232,0.13)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   catText:         { color: '#67E6E8', fontSize: 11, fontWeight: '700' },
//   pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   pendingDot:      { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:     { color: '#FFB84D', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   body:            { paddingHorizontal: 18, paddingVertical: 16 },
//   title:           { color: '#FFFFFF', fontSize: 19, fontWeight: '800', marginBottom: 6 },
//   desc:            { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
//   divider:         { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 14 },
//   metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
//   metaItem:        { width: '47%' },
//   metaItemFull:    { width: '100%' },
//   metaKey:         { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4, marginBottom: 3 },
//   metaVal:         { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
//   actionRow:       { flexDirection: 'row', gap: 10 },
//   rejectBtn:       { paddingHorizontal: 20, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.30)' },
//   rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:      { flex: 1, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
//   approveBtnShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
//   approveText:     { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // QUICK CARD
// // ─────────────────────────────────────────────────
// function QuickCard({ label, sublabel, emoji, onPress, accent }) {
//   const ps = useRef(new Animated.Value(1)).current;
//   return (
//     <Pressable
//       onPress={onPress}
//       onPressIn={() => Animated.spring(ps, { toValue: 0.95, useNativeDriver: true }).start()}
//       onPressOut={() => Animated.spring(ps, { toValue: 1, useNativeDriver: true }).start()}
//       style={{ width: '47.5%' }}
//     >
//       <Animated.View style={{ transform: [{ scale: ps }] }}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
//           style={[qStyles.card, { borderColor: accent || 'rgba(255,255,255,0.09)' }]}
//         >
//           <View style={qStyles.shine} />
//           <Text style={qStyles.emoji}>{emoji}</Text>
//           <Text style={qStyles.label}>{label}</Text>
//           <Text style={qStyles.sub}>{sublabel}</Text>
//           <Text style={[qStyles.arrow, { color: '#67E6E8' }]}>→</Text>
//         </LinearGradient>
//       </Animated.View>
//     </Pressable>
//   );
// }
// const qStyles = StyleSheet.create({
//   card:  { borderRadius: 20, borderWidth: 1, padding: 16, minHeight: 112, overflow: 'hidden', position: 'relative' },
//   shine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
//   emoji: { fontSize: 22, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 3 },
//   sub:   { color: 'rgba(255,255,255,0.42)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 14, bottom: 14, fontSize: 16, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // MAIN SCREEN
// // ─────────────────────────────────────────────────
// export default function AdminHomeScreen({ navigation, route }) {
//   const user = route?.params?.user;
//   const { refreshApps } = useMarketplace();
//   const [pendingApps,   setPendingApps]   = useState([]);
//   const [stats,         setStats]         = useState({ pending: 0, approved: 0, rejected: 0 });
//   const [unreadCount,   setUnreadCount]   = useState(0);
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);

//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-20)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const bellPulse   = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start();

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bellPulse, { toValue: 1.20, duration: 160, useNativeDriver: true }),
//         Animated.timing(bellPulse, { toValue: 1,    duration: 160, useNativeDriver: true }),
//         Animated.delay(3400),
//       ])
//     ).start();

//     loadData();
//   }, []);

//   // ── Load all data from DB ─────────────────────
//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [pendingData, statsData, unread] = await Promise.all([
//         fetchPendingAppsApi(),
//         fetchAppStatsApi(),          // ✅ persistent counts from DB
//         fetchAdminUnreadCountApi(),  // ✅ bell badge count
//       ]);
//       setPendingApps(Array.isArray(pendingData) ? pendingData : []);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (e) {
//       Alert.alert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   // Re-fetch stats + bell after approve/reject
//   const refreshStats = async () => {
//     try {
//       const [statsData, unread] = await Promise.all([
//         fetchAppStatsApi(),
//         fetchAdminUnreadCountApi(),
//       ]);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (_) {}
//   };

//   // ── Approve ──────────────────────────────────
//   // const handleApprove = (app) => {
//   //   Alert.alert(
//   //     'Approve App',
//   //     `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
//   //     [
//   //       { text: 'Cancel', style: 'cancel' },
//   //       {
//   //         text: 'Yes, Approve',
//   //         onPress: async () => {
//   //           try {
//   //             setActionLoading(app.id);
//   //             await approveAppApi(app.id);
//   //             // Remove from pending list
//   //             setPendingApps(prev => prev.filter(a => a.id !== app.id));
//   //             Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//   //             // Re-fetch real DB counts
//   //             setTimeout(refreshStats, 600);
//   //           } catch (e) {
//   //             Alert.alert('Error', e.message || 'Approve failed. Try again.');
//   //           } finally {
//   //             setActionLoading(null);
//   //           }
//   //         },
//   //       },
//   //     ]
//   //   );
//   // };
//   const handleApprove = (app) => {
//   Alert.alert(
//     'Approve App',
//     `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
//     [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Yes, Approve',
//         onPress: async () => {
//           try {
//             setActionLoading(app.id);
//             await approveAppApi(app.id);
//             setPendingApps(prev => prev.filter(a => a.id !== app.id));

//             // ✅ THIS IS THE KEY FIX — refresh context immediately
//             await refreshApps();

//             Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//             setTimeout(refreshStats, 600);
//           } catch (e) {
//             Alert.alert('Error', e.message || 'Approve failed. Try again.');
//           } finally {
//             setActionLoading(null);
//           }
//         },
//       },
//     ]
//   );
// };

//   // ── Reject ───────────────────────────────────
//   // const handleReject = (app) => {
//   //   Alert.alert(
//   //     'Reject App',
//   //     `Reject "${app.title}"?\n\nThis cannot be undone.`,
//   //     [
//   //       { text: 'Cancel', style: 'cancel' },
//   //       {
//   //         text: 'Reject',
//   //         style: 'destructive',
//   //         onPress: async () => {
//   //           try {
//   //             setActionLoading(app.id);
//   //             await rejectAppApi(app.id);
//   //             setPendingApps(prev => prev.filter(a => a.id !== app.id));
//   //             Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//   //             setTimeout(refreshStats, 600);
//   //           } catch (e) {
//   //             Alert.alert('Error', e.message || 'Reject failed. Try again.');
//   //           } finally {
//   //             setActionLoading(null);
//   //           }
//   //         },
//   //       },
//   //     ]
//   //   );
//   // };
//   const handleReject = (app) => {
//   Alert.alert(
//     'Reject App',
//     `Reject "${app.title}"?\n\nThis cannot be undone.`,
//     [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Reject',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             setActionLoading(app.id);
//             await rejectAppApi(app.id);
//             setPendingApps(prev => prev.filter(a => a.id !== app.id));

//             // ✅ refresh context immediately
//             await refreshApps();

//             Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//             setTimeout(refreshStats, 600);
//           } catch (e) {
//             Alert.alert('Error', e.message || 'Reject failed. Try again.');
//           } finally {
//             setActionLoading(null);
//           }
//         },
//       },
//     ]
//   );
// };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   // ── Render ───────────────────────────────────
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />
//       <LinearGradient colors={['#0E1420', '#141B2B', '#0A1218']} style={styles.bg}>

//         {/* ══ HEADER ══ */}
//         <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
//             style={styles.headerCard}
//           >
//             <View style={styles.headerShine} />

//             <View style={styles.headerLeft}>
//               <LinearGradient
//                 colors={['#A855F7', '#7E22CE']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.adminBadge}
//               >
//                 <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//               </LinearGradient>
//               <Text style={styles.headerTitle}>Control Panel</Text>
//               <Text style={styles.headerSub}>Apps Marketplace</Text>
//             </View>

//             <View style={styles.headerRight}>
//               {/* ✅ Bell with red badge */}
//               <Pressable
//                 onPress={() => navigation.navigate('AdminNotifications')}
//                 style={({ pressed }) => [styles.bellBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Animated.View style={{ transform: [{ scale: bellPulse }] }}>
//                   <View style={styles.bellIconWrap}>
//                     <View style={styles.bellArc} />
//                     <View style={styles.bellBody} />
//                     <View style={styles.bellBar} />
//                     <View style={styles.bellClapper} />
//                   </View>
//                 </Animated.View>
//                 {/* ✅ Red dot badge */}
//                 {unreadCount > 0 && (
//                   <View style={styles.bellBadge}>
//                     <Text style={styles.bellBadgeText}>
//                       {unreadCount > 9 ? '9+' : String(unreadCount)}
//                     </Text>
//                   </View>
//                 )}
//               </Pressable>

//               <Pressable
//                 onPress={handleLogout}
//                 style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.logoutText}>Logout</Text>
//               </Pressable>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         {/* ══ CONTENT ══ */}
//         <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scroll}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#67E6E8"
//                 colors={['#67E6E8']}
//               />
//             }
//           >
//             {/* ── Welcome ── */}
//             <LinearGradient
//               colors={['rgba(168,85,247,0.15)', 'rgba(126,34,206,0.06)']}
//               start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//               style={styles.welcomeStrip}
//             >
//               <View style={styles.welcomeShine} />
//               <View>
//                 <Text style={styles.welcomeLabel}>Welcome back</Text>
//                 <Text style={styles.welcomeName}>Admin Dashboard</Text>
//               </View>
//               <View style={styles.liveRow}>
//                 <View style={styles.liveDot} />
//                 <Text style={styles.liveText}>Live</Text>
//               </View>
//             </LinearGradient>

//             {/* ✅ Stats — DB se real counts */}
//             <View style={styles.statsRow}>
//               <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.25)"  delay={80}  />
//               <StatCard label="Approved" value={stats.approved} color="#67E6E8" accent="rgba(103,230,232,0.25)" delay={160} />
//               <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.25)"  delay={240} />
//             </View>
//             <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

//             {/* ── Pending Review ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//                 <Text style={styles.sectionTitle}>
//                   {loading
//                     ? 'Loading...'
//                     : pendingApps.length > 0
//                     ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
//                     : 'All clear ✓'}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={loadData}
//                 style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.refreshBtnText}>↻  Refresh</Text>
//               </Pressable>
//             </View>

//             {/* Loading */}
//             {loading && (
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.loadingCard}
//               >
//                 <Text style={styles.loadingText}>Loading apps...</Text>
//               </LinearGradient>
//             )}

//             {/* Empty */}
//             {!loading && pendingApps.length === 0 && (
//               <LinearGradient
//                 colors={['rgba(103,230,232,0.08)', 'rgba(255,255,255,0.02)']}
//                 style={styles.emptyCard}
//               >
//                 <View style={styles.emptyIconWrap}>
//                   <Text style={styles.emptyIconText}>✓</Text>
//                 </View>
//                 <Text style={styles.emptyTitle}>All caught up!</Text>
//                 <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
//               </LinearGradient>
//             )}

//             {/* ✅ App review cards */}
//             {!loading && pendingApps.map((app, index) => (
//               <AppReviewCard
//                 key={app.id}
//                 app={app}
//                 index={index}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 actionLoading={actionLoading}
//               />
//             ))}

//             {/* ── Live count strip ── */}
//             <LinearGradient
//               colors={['rgba(103,230,232,0.10)', 'rgba(255,255,255,0.02)']}
//               style={styles.liveStrip}
//             >
//               <View style={styles.liveStripShine} />
//               <View>
//                 <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
//                 <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
//               </View>
//               <Pressable
//                 onPress={() => navigation.navigate('Apps')}
//                 style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.viewAllText}>View all →</Text>
//               </Pressable>
//             </LinearGradient>

//             {/* ── Quick Actions ── */}
//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//                 <Text style={styles.sectionTitle}>Navigate</Text>
//               </View>
//             </View>
//             <View style={styles.quickGrid}>
//               <QuickCard label="All Apps"      sublabel="Browse marketplace"  emoji="🛒" accent="rgba(103,230,232,0.25)" onPress={() => navigation.navigate('Apps')} />
//               <QuickCard label="Notifications" sublabel="View all alerts"     emoji="🔔" accent="rgba(168,85,247,0.25)" onPress={() => navigation.navigate('AdminNotifications')} />
//               <QuickCard label="Upload App"    sublabel="Add new listing"     emoji="⬆️" accent="rgba(255,184,77,0.22)" onPress={() => navigation.navigate('UploadApp')} />
//               <QuickCard label="Marketplace"   sublabel="User home view"      emoji="🏠" accent="rgba(255,77,106,0.22)" onPress={() => navigation.navigate('Home')} />
//             </View>

//             {/* Footer */}
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.01)']}
//               style={styles.footer}
//             >
//               <View style={styles.footerShine} />
//               <Text style={styles.footerTitle}>Apps Marketplace</Text>
//               <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//             </LinearGradient>

//           </ScrollView>
//         </Animated.View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0E1420' },
//   bg:       { flex: 1 },

//   // Header
//   header:         { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, zIndex: 10 },
//   headerCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' },
//   headerShine:    { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.14)' },
//   headerLeft:     { gap: 5 },
//   headerRight:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   adminBadge:     { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   adminBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:    { color: '#FFFFFF', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
//   headerSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 12 },

//   // Bell
//   bellBtn:      { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.11)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
//   bellIconWrap: { width: 20, height: 22, alignItems: 'center' },
//   bellArc:      { width: 9, height: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: 'rgba(255,255,255,0.92)', marginBottom: -1 },
//   bellBody:     { width: 17, height: 11, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: 'rgba(255,255,255,0.92)' },
//   bellBar:      { width: 19, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
//   bellClapper:  { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
//   bellBadge:    { position: 'absolute', top: -5, right: -5, minWidth: 20, height: 20, borderRadius: 10, backgroundColor: '#FF4D6A', borderWidth: 2, borderColor: '#0E1420', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, zIndex: 10 },
//   bellBadgeText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '800', lineHeight: 12 },

//   logoutBtn:  { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   logoutText: { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },

//   scroll: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },

//   // Welcome
//   welcomeStrip: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.22)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
//   welcomeShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(168,85,247,0.32)' },
//   welcomeLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   welcomeName:  { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
//   liveRow:      { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
//   liveDot:      { width: 7, height: 7, borderRadius: 4, backgroundColor: '#67E6E8' },
//   liveText:     { color: '#67E6E8', fontSize: 11, fontWeight: '800' },

//   // Stats
//   statsRow:  { flexDirection: 'row', gap: 10, marginBottom: 8 },
//   statsNote: { color: 'rgba(255,255,255,0.28)', fontSize: 11, marginBottom: 22, paddingHorizontal: 2 },

//   // Section
//   sectionHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
//   sectionEye:     { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
//   sectionTitle:   { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   refreshBtnText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // Loading / Empty
//   loadingCard:   { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 28, alignItems: 'center', marginBottom: 14 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
//   emptyCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(103,230,232,0.16)', paddingVertical: 36, paddingHorizontal: 24, alignItems: 'center', marginBottom: 24 },
//   emptyIconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(103,230,232,0.14)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
//   emptyIconText: { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
//   emptyTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptySub:      { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },

//   // Live strip
//   liveStrip:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(103,230,232,0.20)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, overflow: 'hidden' },
//   liveStripShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(103,230,232,0.24)' },
//   liveStripLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   liveStripValue: { color: '#67E6E8', fontSize: 17, fontWeight: '800' },
//   viewAllBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(103,230,232,0.10)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.26)' },
//   viewAllText:    { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   // Quick grid
//   quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },

//   // Footer
//   footer:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 18, alignItems: 'center', overflow: 'hidden' },
//   footerShine: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
//   footerTitle: { color: 'rgba(255,255,255,0.52)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
//   footerSub:   { color: 'rgba(255,255,255,0.25)', fontSize: 11 },
// });
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView,
//   Alert, RefreshControl, Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi,
//   fetchAppStatsApi,
//   fetchAdminUnreadCountApi,
//   approveAppApi,
//   rejectAppApi,
// } from '../utils/apiService';
// import { useMarketplace } from '../context/MarketplaceContext';  // ✅ ADD THIS

// // ─────────────────────────────────────────────────
// // STAT CARD
// // ─────────────────────────────────────────────────
// function StatCard({ label, value, color, accent, delay }) {
//   const scale = useRef(new Animated.Value(0.82)).current;
//   const op    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     scale.setValue(0.82);
//     op.setValue(0);
//     Animated.sequence([
//       Animated.delay(delay),
//       Animated.parallel([
//         Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
//         Animated.timing(op,    { toValue: 1, duration: 400, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, [value]);

//   return (
//     <Animated.View style={[sStyles.wrap, { opacity: op, transform: [{ scale }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.03)']}
//         style={[sStyles.card, { borderColor: accent }]}
//       >
//         <View style={[sStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[sStyles.value, { color }]}>{value}</Text>
//         <Text style={sStyles.label}>{label}</Text>
//       </LinearGradient>
//     </Animated.View>
//   );
// }
// const sStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   { borderRadius: 20, borderWidth: 1, paddingTop: 16, paddingBottom: 18, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
//   topBar: { width: 28, height: 3, borderRadius: 2, marginBottom: 12 },
//   value:  { fontSize: 34, fontWeight: '800', marginBottom: 4 },
//   label:  { color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD
// // ─────────────────────────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(44)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 120),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 420, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 18 }}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
//         style={cStyles.card}
//       >
//         <View style={cStyles.shine} />

//         {app.imageUrl ? (
//           <View style={cStyles.imageWrap}>
//             <Image source={{ uri: app.imageUrl }} style={cStyles.image} resizeMode="cover" />
//             <View style={cStyles.imageOverlay} />
//             <View style={cStyles.imageBadgeRow}>
//               <View style={cStyles.catPill}>
//                 <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cStyles.pendingPill}>
//                 <View style={cStyles.pendingDot} />
//                 <Text style={cStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//             <View style={cStyles.priceOverlay}>
//               <Text style={cStyles.priceOverlayText}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//           </View>
//         ) : (
//           <View style={cStyles.noImgWrap}>
//             <Text style={cStyles.noImgIcon}>📷</Text>
//             <Text style={cStyles.noImgText}>No cover image</Text>
//             <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
//               <View style={cStyles.catPill}>
//                 <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cStyles.pendingPill}>
//                 <View style={cStyles.pendingDot} />
//                 <Text style={cStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         <View style={cStyles.body}>
//           <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>

//           <View style={cStyles.divider} />

//           <View style={cStyles.metaGrid}>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Owner</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Price</Text>
//               <Text style={[cStyles.metaVal, { color: '#67E6E8' }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Email</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Phone</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {!!app.company && (
//               <View style={cStyles.metaItemFull}>
//                 <Text style={cStyles.metaKey}>Company</Text>
//                 <Text style={cStyles.metaVal}>{app.company}</Text>
//               </View>
//             )}
//           </View>

//           <View style={cStyles.actionRow}>
//             <Pressable
//               onPress={() => onReject(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [cStyles.rejectBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={cStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => onApprove(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cStyles.approveBtn}
//               >
//                 <View style={cStyles.approveBtnShine} />
//                 <Text style={cStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );
// }
// const cStyles = StyleSheet.create({
//   card:            { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
//   shine:           { position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, backgroundColor: 'rgba(255,255,255,0.15)', zIndex: 1 },
//   imageWrap:       { width: '100%', height: 190, position: 'relative' },
//   image:           { width: '100%', height: '100%' },
//   imageOverlay:    { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(8,12,20,0.28)' },
//   imageBadgeRow:   { position: 'absolute', top: 12, left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between' },
//   priceOverlay:    { position: 'absolute', bottom: 12, right: 14, backgroundColor: 'rgba(8,12,20,0.78)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.40)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
//   priceOverlayText:{ color: '#67E6E8', fontSize: 13, fontWeight: '800' },
//   noImgWrap:       { backgroundColor: 'rgba(255,255,255,0.04)', paddingVertical: 22, paddingHorizontal: 16, alignItems: 'center' },
//   noImgIcon:       { fontSize: 28, marginBottom: 4 },
//   noImgText:       { color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: '600' },
//   catPill:         { backgroundColor: 'rgba(103,230,232,0.13)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   catText:         { color: '#67E6E8', fontSize: 11, fontWeight: '700' },
//   pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   pendingDot:      { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:     { color: '#FFB84D', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   body:            { paddingHorizontal: 18, paddingVertical: 16 },
//   title:           { color: '#FFFFFF', fontSize: 19, fontWeight: '800', marginBottom: 6 },
//   desc:            { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
//   divider:         { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 14 },
//   metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
//   metaItem:        { width: '47%' },
//   metaItemFull:    { width: '100%' },
//   metaKey:         { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4, marginBottom: 3 },
//   metaVal:         { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
//   actionRow:       { flexDirection: 'row', gap: 10 },
//   rejectBtn:       { paddingHorizontal: 20, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.30)' },
//   rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:      { flex: 1, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
//   approveBtnShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
//   approveText:     { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // QUICK CARD
// // ─────────────────────────────────────────────────
// function QuickCard({ label, sublabel, emoji, onPress, accent }) {
//   const ps = useRef(new Animated.Value(1)).current;
//   return (
//     <Pressable
//       onPress={onPress}
//       onPressIn={() => Animated.spring(ps, { toValue: 0.95, useNativeDriver: true }).start()}
//       onPressOut={() => Animated.spring(ps, { toValue: 1, useNativeDriver: true }).start()}
//       style={{ width: '47.5%' }}
//     >
//       <Animated.View style={{ transform: [{ scale: ps }] }}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
//           style={[qStyles.card, { borderColor: accent || 'rgba(255,255,255,0.09)' }]}
//         >
//           <View style={qStyles.shine} />
//           <Text style={qStyles.emoji}>{emoji}</Text>
//           <Text style={qStyles.label}>{label}</Text>
//           <Text style={qStyles.sub}>{sublabel}</Text>
//           <Text style={[qStyles.arrow, { color: '#67E6E8' }]}>→</Text>
//         </LinearGradient>
//       </Animated.View>
//     </Pressable>
//   );
// }
// const qStyles = StyleSheet.create({
//   card:  { borderRadius: 20, borderWidth: 1, padding: 16, minHeight: 112, overflow: 'hidden', position: 'relative' },
//   shine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
//   emoji: { fontSize: 22, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 3 },
//   sub:   { color: 'rgba(255,255,255,0.42)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 14, bottom: 14, fontSize: 16, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // MAIN SCREEN
// // ─────────────────────────────────────────────────
// export default function AdminHomeScreen({ navigation, route }) {
//   const user = route?.params?.user;
//   const { refreshApps } = useMarketplace();  // ✅ ADD THIS

//   const [pendingApps,   setPendingApps]   = useState([]);
//   const [stats,         setStats]         = useState({ pending: 0, approved: 0, rejected: 0 });
//   const [unreadCount,   setUnreadCount]   = useState(0);
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);

//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-20)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const bellPulse   = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start();

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bellPulse, { toValue: 1.20, duration: 160, useNativeDriver: true }),
//         Animated.timing(bellPulse, { toValue: 1,    duration: 160, useNativeDriver: true }),
//         Animated.delay(3400),
//       ])
//     ).start();

//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [pendingData, statsData, unread] = await Promise.all([
//         fetchPendingAppsApi(),
//         fetchAppStatsApi(),
//         fetchAdminUnreadCountApi(),
//       ]);
//       setPendingApps(Array.isArray(pendingData) ? pendingData : []);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (e) {
//       Alert.alert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   const refreshStats = async () => {
//     try {
//       const [statsData, unread] = await Promise.all([
//         fetchAppStatsApi(),
//         fetchAdminUnreadCountApi(),
//       ]);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (_) {}
//   };

//   // ✅ FIXED handleApprove — calls refreshApps() to update context immediately
//   const handleApprove = (app) => {
//     Alert.alert(
//       'Approve App',
//       `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, Approve',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await approveAppApi(app.id);

//               // ✅ Remove from pending list
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));

//               // ✅ THIS IS THE KEY FIX — push update to HomeScreen + AppsScreen instantly
//               await refreshApps();

//               Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//               setTimeout(refreshStats, 600);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Approve failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   // ✅ FIXED handleReject — calls refreshApps() to update context immediately
//   const handleReject = (app) => {
//     Alert.alert(
//       'Reject App',
//       `Reject "${app.title}"?\n\nThis cannot be undone.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Reject',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await rejectAppApi(app.id);

//               // ✅ Remove from pending list
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));

//               // ✅ refresh context immediately
//               await refreshApps();

//               Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//               setTimeout(refreshStats, 600);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Reject failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />
//       <LinearGradient colors={['#0E1420', '#141B2B', '#0A1218']} style={styles.bg}>

//         <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
//             style={styles.headerCard}
//           >
//             <View style={styles.headerShine} />

//             <View style={styles.headerLeft}>
//               <LinearGradient
//                 colors={['#A855F7', '#7E22CE']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.adminBadge}
//               >
//                 <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//               </LinearGradient>
//               <Text style={styles.headerTitle}>Control Panel</Text>
//               <Text style={styles.headerSub}>Apps Marketplace</Text>
//             </View>

//             <View style={styles.headerRight}>
//               <Pressable
//                 onPress={() => navigation.navigate('AdminNotifications')}
//                 style={({ pressed }) => [styles.bellBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Animated.View style={{ transform: [{ scale: bellPulse }] }}>
//                   <View style={styles.bellIconWrap}>
//                     <View style={styles.bellArc} />
//                     <View style={styles.bellBody} />
//                     <View style={styles.bellBar} />
//                     <View style={styles.bellClapper} />
//                   </View>
//                 </Animated.View>
//                 {unreadCount > 0 && (
//                   <View style={styles.bellBadge}>
//                     <Text style={styles.bellBadgeText}>
//                       {unreadCount > 9 ? '9+' : String(unreadCount)}
//                     </Text>
//                   </View>
//                 )}
//               </Pressable>

//               <Pressable
//                 onPress={handleLogout}
//                 style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.logoutText}>Logout</Text>
//               </Pressable>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scroll}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#67E6E8"
//                 colors={['#67E6E8']}
//               />
//             }
//           >
//             <LinearGradient
//               colors={['rgba(168,85,247,0.15)', 'rgba(126,34,206,0.06)']}
//               start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//               style={styles.welcomeStrip}
//             >
//               <View style={styles.welcomeShine} />
//               <View>
//                 <Text style={styles.welcomeLabel}>Welcome back</Text>
//                 <Text style={styles.welcomeName}>Admin Dashboard</Text>
//               </View>
//               <View style={styles.liveRow}>
//                 <View style={styles.liveDot} />
//                 <Text style={styles.liveText}>Live</Text>
//               </View>
//             </LinearGradient>

//             <View style={styles.statsRow}>
//               <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.25)"  delay={80}  />
//               <StatCard label="Approved" value={stats.approved} color="#67E6E8" accent="rgba(103,230,232,0.25)" delay={160} />
//               <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.25)"  delay={240} />
//             </View>
//             <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//                 <Text style={styles.sectionTitle}>
//                   {loading
//                     ? 'Loading...'
//                     : pendingApps.length > 0
//                     ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
//                     : 'All clear ✓'}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={loadData}
//                 style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.refreshBtnText}>↻  Refresh</Text>
//               </Pressable>
//             </View>

//             {loading && (
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.loadingCard}
//               >
//                 <Text style={styles.loadingText}>Loading apps...</Text>
//               </LinearGradient>
//             )}

//             {!loading && pendingApps.length === 0 && (
//               <LinearGradient
//                 colors={['rgba(103,230,232,0.08)', 'rgba(255,255,255,0.02)']}
//                 style={styles.emptyCard}
//               >
//                 <View style={styles.emptyIconWrap}>
//                   <Text style={styles.emptyIconText}>✓</Text>
//                 </View>
//                 <Text style={styles.emptyTitle}>All caught up!</Text>
//                 <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
//               </LinearGradient>
//             )}

//             {!loading && pendingApps.map((app, index) => (
//               <AppReviewCard
//                 key={app.id}
//                 app={app}
//                 index={index}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 actionLoading={actionLoading}
//               />
//             ))}

//             <LinearGradient
//               colors={['rgba(103,230,232,0.10)', 'rgba(255,255,255,0.02)']}
//               style={styles.liveStrip}
//             >
//               <View style={styles.liveStripShine} />
//               <View>
//                 <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
//                 <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
//               </View>
//               <Pressable
//                 onPress={() => navigation.navigate('Apps')}
//                 style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.viewAllText}>View all →</Text>
//               </Pressable>
//             </LinearGradient>

//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//                 <Text style={styles.sectionTitle}>Navigate</Text>
//               </View>
//             </View>
//             <View style={styles.quickGrid}>
//               <QuickCard label="All Apps"      sublabel="Browse marketplace"  emoji="🛒" accent="rgba(103,230,232,0.25)" onPress={() => navigation.navigate('Apps')} />
//               <QuickCard label="Notifications" sublabel="View all alerts"     emoji="🔔" accent="rgba(168,85,247,0.25)" onPress={() => navigation.navigate('AdminNotifications')} />
//               <QuickCard label="Upload App"    sublabel="Add new listing"     emoji="⬆️" accent="rgba(255,184,77,0.22)" onPress={() => navigation.navigate('UploadApp')} />
//               <QuickCard label="Marketplace"   sublabel="User home view"      emoji="🏠" accent="rgba(255,77,106,0.22)" onPress={() => navigation.navigate('Home')} />
//             </View>

//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.01)']}
//               style={styles.footer}
//             >
//               <View style={styles.footerShine} />
//               <Text style={styles.footerTitle}>Apps Marketplace</Text>
//               <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//             </LinearGradient>

//           </ScrollView>
//         </Animated.View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0E1420' },
//   bg:       { flex: 1 },

//   header:         { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, zIndex: 10 },
//   headerCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' },
//   headerShine:    { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.14)' },
//   headerLeft:     { gap: 5 },
//   headerRight:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   adminBadge:     { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   adminBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:    { color: '#FFFFFF', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
//   headerSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 12 },

//   bellBtn:      { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.11)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
//   bellIconWrap: { width: 20, height: 22, alignItems: 'center' },
//   bellArc:      { width: 9, height: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: 'rgba(255,255,255,0.92)', marginBottom: -1 },
//   bellBody:     { width: 17, height: 11, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: 'rgba(255,255,255,0.92)' },
//   bellBar:      { width: 19, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
//   bellClapper:  { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
//   bellBadge:    { position: 'absolute', top: -5, right: -5, minWidth: 20, height: 20, borderRadius: 10, backgroundColor: '#FF4D6A', borderWidth: 2, borderColor: '#0E1420', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, zIndex: 10 },
//   bellBadgeText:{ color: '#FFFFFF', fontSize: 10, fontWeight: '800', lineHeight: 12 },

//   logoutBtn:  { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   logoutText: { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },

//   scroll: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },

//   welcomeStrip: { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.22)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
//   welcomeShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(168,85,247,0.32)' },
//   welcomeLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   welcomeName:  { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
//   liveRow:      { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
//   liveDot:      { width: 7, height: 7, borderRadius: 4, backgroundColor: '#67E6E8' },
//   liveText:     { color: '#67E6E8', fontSize: 11, fontWeight: '800' },

//   statsRow:  { flexDirection: 'row', gap: 10, marginBottom: 8 },
//   statsNote: { color: 'rgba(255,255,255,0.28)', fontSize: 11, marginBottom: 22, paddingHorizontal: 2 },

//   sectionHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
//   sectionEye:     { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
//   sectionTitle:   { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   refreshBtnText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   loadingCard:   { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 28, alignItems: 'center', marginBottom: 14 },
//   loadingText:   { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
//   emptyCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(103,230,232,0.16)', paddingVertical: 36, paddingHorizontal: 24, alignItems: 'center', marginBottom: 24 },
//   emptyIconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(103,230,232,0.14)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
//   emptyIconText: { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
//   emptyTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptySub:      { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },

//   liveStrip:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(103,230,232,0.20)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, overflow: 'hidden' },
//   liveStripShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(103,230,232,0.24)' },
//   liveStripLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   liveStripValue: { color: '#67E6E8', fontSize: 17, fontWeight: '800' },
//   viewAllBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(103,230,232,0.10)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.26)' },
//   viewAllText:    { color: '#67E6E8', fontSize: 12, fontWeight: '700' },

//   quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },

//   footer:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 18, alignItems: 'center', overflow: 'hidden' },
//   footerShine: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
//   footerTitle: { color: 'rgba(255,255,255,0.52)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
//   footerSub:   { color: 'rgba(255,255,255,0.25)', fontSize: 11 },
// });


// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView,
//   Alert, RefreshControl, Image, Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi, fetchAppStatsApi,
//   fetchAdminUnreadCountApi, approveAppApi, rejectAppApi,
// } from '../utils/apiService';
// import { useMarketplace } from '../context/MarketplaceContext';

// // ─────────────────────────────────────────────────
// // STAT CARD
// // ─────────────────────────────────────────────────
// function StatCard({ label, value, color, accent, delay }) {
//   const scale = useRef(new Animated.Value(0.82)).current;
//   const op    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     scale.setValue(0.82);
//     op.setValue(0);
//     Animated.sequence([
//       Animated.delay(delay),
//       Animated.parallel([
//         Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
//         Animated.timing(op,    { toValue: 1, duration: 400, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, [value]);

//   return (
//     <Animated.View style={[sStyles.wrap, { opacity: op, transform: [{ scale }] }]}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.03)']}
//         style={[sStyles.card, { borderColor: accent }]}
//       >
//         <View style={[sStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[sStyles.value, { color }]}>{value}</Text>
//         <Text style={sStyles.label}>{label}</Text>
//       </LinearGradient>
//     </Animated.View>
//   );
// }
// const sStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   { borderRadius: 20, borderWidth: 1, paddingTop: 16, paddingBottom: 18, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
//   topBar: { width: 28, height: 3, borderRadius: 2, marginBottom: 12 },
//   value:  { fontSize: 34, fontWeight: '800', marginBottom: 4 },
//   label:  { color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD
// // ─────────────────────────────────────────────────
// // function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
// //   const slideAnim = useRef(new Animated.Value(44)).current;
// //   const opAnim    = useRef(new Animated.Value(0)).current;
// //   const isLoading = actionLoading === app.id;

// //   // ✅ Build images array from imageUrls or fallback to imageUrl
// //   const images = Array.isArray(app.imageUrls) && app.imageUrls.length > 0
// //     ? app.imageUrls
// //     : app.imageUrl
// //     ? [app.imageUrl]
// //     : [];

// //   useEffect(() => {
// //     Animated.sequence([
// //       Animated.delay(index * 120),
// //       Animated.parallel([
// //         Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
// //         Animated.timing(opAnim,   { toValue: 1, duration: 420, useNativeDriver: true }),
// //       ]),
// //     ]).start();
// //   }, []);

// //   return (
// //     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 18 }}>
// //       <LinearGradient
// //         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
// //         style={cStyles.card}
// //       >
// //         <View style={cStyles.shine} />

// //         {/* ✅ Multi-image carousel */}
// //         {images.length > 0 ? (
// //           <View style={cStyles.imageWrap}>
// //             <ScrollView
// //               horizontal
// //               pagingEnabled
// //               showsHorizontalScrollIndicator={false}
// //               style={{ width: '100%', height: 190 }}
// //             >
// //               {images.map((url, idx) => (
// //                 <View key={idx} style={cStyles.imageSlide}>
// //                   <Image source={{ uri: url }} style={cStyles.image} resizeMode="cover" />
// //                   <View style={cStyles.imageOverlay} />
// //                   {idx === 0 && (
// //                     <View style={cStyles.imageBadgeRow}>
// //                       <View style={cStyles.catPill}>
// //                         <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
// //                       </View>
// //                       <View style={cStyles.pendingPill}>
// //                         <View style={cStyles.pendingDot} />
// //                         <Text style={cStyles.pendingText}>PENDING</Text>
// //                       </View>
// //                     </View>
// //                   )}
// //                   {images.length > 1 && (
// //                     <View style={cStyles.imgCountBadge}>
// //                       <Text style={cStyles.imgCountText}>{idx + 1}/{images.length}</Text>
// //                     </View>
// //                   )}
// //                 </View>
// //               ))}
// //             </ScrollView>

// //             {/* Dot indicators */}
// //             {images.length > 1 && (
// //               <View style={cStyles.dotRow}>
// //                 {images.map((_, idx) => (
// //                   <View key={idx} style={cStyles.dot} />
// //                 ))}
// //               </View>
// //             )}

// //             <View style={cStyles.priceOverlay}>
// //               <Text style={cStyles.priceOverlayText}>
// //                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
// //               </Text>
// //             </View>
// //           </View>
// //         ) : (
// //           <View style={cStyles.noImgWrap}>
// //             <Text style={cStyles.noImgIcon}>📷</Text>
// //             <Text style={cStyles.noImgText}>No cover image</Text>
// //             <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
// //               <View style={cStyles.catPill}>
// //                 <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
// //               </View>
// //               <View style={cStyles.pendingPill}>
// //                 <View style={cStyles.pendingDot} />
// //                 <Text style={cStyles.pendingText}>PENDING</Text>
// //               </View>
// //             </View>
// //           </View>
// //         )}

// //         {/* Body */}
// //         <View style={cStyles.body}>
// //           <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
// //           <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>
// //           <View style={cStyles.divider} />
// //           <View style={cStyles.metaGrid}>
// //             <View style={cStyles.metaItem}>
// //               <Text style={cStyles.metaKey}>Owner</Text>
// //               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
// //             </View>
// //             <View style={cStyles.metaItem}>
// //               <Text style={cStyles.metaKey}>Price</Text>
// //               <Text style={[cStyles.metaVal, { color: '#67E6E8' }]}>
// //                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
// //               </Text>
// //             </View>
// //             <View style={cStyles.metaItem}>
// //               <Text style={cStyles.metaKey}>Email</Text>
// //               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
// //             </View>
// //             <View style={cStyles.metaItem}>
// //               <Text style={cStyles.metaKey}>Phone</Text>
// //               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
// //             </View>
// //             {!!app.company && (
// //               <View style={cStyles.metaItemFull}>
// //                 <Text style={cStyles.metaKey}>Company</Text>
// //                 <Text style={cStyles.metaVal}>{app.company}</Text>
// //               </View>
// //             )}
// //           </View>

// //           <View style={cStyles.actionRow}>
// //             <Pressable
// //               onPress={() => onReject(app)}
// //               disabled={isLoading}
// //               style={({ pressed }) => [cStyles.rejectBtn, pressed && { opacity: 0.7 }]}
// //             >
// //               <Text style={cStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
// //             </Pressable>
// //             <Pressable
// //               onPress={() => onApprove(app)}
// //               disabled={isLoading}
// //               style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
// //             >
// //               <LinearGradient
// //                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
// //                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
// //                 style={cStyles.approveBtn}
// //               >
// //                 <View style={cStyles.approveBtnShine} />
// //                 <Text style={cStyles.approveText}>
// //                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
// //                 </Text>
// //               </LinearGradient>
// //             </Pressable>
// //           </View>
// //         </View>
// //       </LinearGradient>
// //     </Animated.View>
// //   );
// // }
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(44)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;
//   const [activeImg, setActiveImg] = useState(0);

//   const CARD_W = Dimensions.get('window').width - 32; // full width minus padding

//   const images = Array.isArray(app.imageUrls) && app.imageUrls.length > 0
//     ? app.imageUrls
//     : app.imageUrl
//     ? [app.imageUrl]
//     : [];

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 120),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 420, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 18 }}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
//         style={cStyles.card}
//       >
//         <View style={cStyles.shine} />

//         {images.length > 0 ? (
//           <View style={{ width: '100%' }}>
//             {/* ── Image Pager ── */}
//             <ScrollView
//               horizontal
//               pagingEnabled
//               showsHorizontalScrollIndicator={false}
//               style={{ width: CARD_W, height: 220 }}
//               onMomentumScrollEnd={e => {
//                 const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_W);
//                 setActiveImg(idx);
//               }}
//             >
//               {images.map((url, idx) => (
//                 <View key={idx} style={{ width: CARD_W, height: 220 }}>
//                   <Image
//                     source={{ uri: url }}
//                     style={{ width: CARD_W, height: 220 }}
//                     resizeMode="cover"
//                   />
//                   <View style={cStyles.imageOverlay} />

//                   {/* Badges only on first image */}
//                   {idx === 0 && (
//                     <View style={cStyles.imageBadgeRow}>
//                       <View style={cStyles.catPill}>
//                         <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//                       </View>
//                       <View style={cStyles.pendingPill}>
//                         <View style={cStyles.pendingDot} />
//                         <Text style={cStyles.pendingText}>PENDING</Text>
//                       </View>
//                     </View>
//                   )}

//                   {/* Image counter */}
//                   {images.length > 1 && (
//                     <View style={cStyles.imgCountBadge}>
//                       <Text style={cStyles.imgCountText}>{idx + 1}/{images.length}</Text>
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </ScrollView>

//             {/* Dot indicators */}
//             {images.length > 1 && (
//               <View style={cStyles.dotRow}>
//                 {images.map((_, idx) => (
//                   <View
//                     key={idx}
//                     style={[
//                       cStyles.dot,
//                       activeImg === idx && cStyles.dotActive,
//                     ]}
//                   />
//                 ))}
//               </View>
//             )}

//             {/* Price overlay */}
//             <View style={cStyles.priceOverlay}>
//               <Text style={cStyles.priceOverlayText}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//           </View>
//         ) : (
//           <View style={cStyles.noImgWrap}>
//             <Text style={cStyles.noImgIcon}>📷</Text>
//             <Text style={cStyles.noImgText}>No cover image</Text>
//             <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
//               <View style={cStyles.catPill}>
//                 <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//               </View>
//               <View style={cStyles.pendingPill}>
//                 <View style={cStyles.pendingDot} />
//                 <Text style={cStyles.pendingText}>PENDING</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Body */}
//         <View style={cStyles.body}>
//           <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>
//           <View style={cStyles.divider} />
//           <View style={cStyles.metaGrid}>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Owner</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Price</Text>
//               <Text style={[cStyles.metaVal, { color: '#67E6E8' }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Email</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>Phone</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {!!app.company && (
//               <View style={cStyles.metaItemFull}>
//                 <Text style={cStyles.metaKey}>Company</Text>
//                 <Text style={cStyles.metaVal}>{app.company}</Text>
//               </View>
//             )}
//           </View>

//           <View style={cStyles.actionRow}>
//             <Pressable
//               onPress={() => onReject(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [cStyles.rejectBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={cStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
//             </Pressable>
//             <Pressable
//               onPress={() => onApprove(app)}
//               disabled={isLoading}
//               style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cStyles.approveBtn}
//               >
//                 <View style={cStyles.approveBtnShine} />
//                 <Text style={cStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// const cStyles = StyleSheet.create({
//   card:            { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
//   shine:           { position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, backgroundColor: 'rgba(255,255,255,0.15)', zIndex: 1 },
//   imageWrap:       { width: '100%', position: 'relative' },
//   imageSlide:      { width: '100%', height: 190, position: 'relative' },
//   image:           { width: '100%', height: '100%' },
//   imageOverlay:    { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(8,12,20,0.28)' },
//   imageBadgeRow:   { position: 'absolute', top: 12, left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between' },
//   imgCountBadge:   { position: 'absolute', bottom: 10, right: 14, backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
//   imgCountText:    { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
//   // dotRow:          { flexDirection: 'row', justifyContent: 'center', gap: 5, paddingVertical: 6, backgroundColor: 'rgba(0,0,0,0.3)' },
//   // dot:             { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.55)' },
//   dotRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 6,
//     paddingVertical: 8,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255,255,255,0.35)',
//   },
//     dotActive: {
//     width: 18,
//     backgroundColor: '#67E6E8',
//   },
//   priceOverlay: {
//     position: 'absolute',
//     bottom: 44,   // dot row height కి above
//     right: 14,
//     backgroundColor: 'rgba(8,12,20,0.78)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,230,232,0.40)',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   // priceOverlay:    { position: 'absolute', bottom: 36, right: 14, backgroundColor: 'rgba(8,12,20,0.78)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.40)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
//   priceOverlayText:{ color: '#67E6E8', fontSize: 13, fontWeight: '800' },
//   noImgWrap:       { backgroundColor: 'rgba(255,255,255,0.04)', paddingVertical: 22, paddingHorizontal: 16, alignItems: 'center' },
//   noImgIcon:       { fontSize: 28, marginBottom: 4 },
//   noImgText:       { color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: '600' },
//   catPill:         { backgroundColor: 'rgba(103,230,232,0.13)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   catText:         { color: '#67E6E8', fontSize: 11, fontWeight: '700' },
//   pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   pendingDot:      { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:     { color: '#FFB84D', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   body:            { paddingHorizontal: 18, paddingVertical: 16 },
//   title:           { color: '#FFFFFF', fontSize: 19, fontWeight: '800', marginBottom: 6 },
//   desc:            { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
//   divider:         { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 14 },
//   metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
//   metaItem:        { width: '47%' },
//   metaItemFull:    { width: '100%' },
//   metaKey:         { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4, marginBottom: 3 },
//   metaVal:         { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
//   actionRow:       { flexDirection: 'row', gap: 10 },
//   rejectBtn:       { paddingHorizontal: 20, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.30)' },
//   rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:      { flex: 1, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
//   approveBtnShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
//   approveText:     { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // QUICK CARD
// // ─────────────────────────────────────────────────
// function QuickCard({ label, sublabel, emoji, onPress, accent }) {
//   const ps = useRef(new Animated.Value(1)).current;
//   return (
//     <Pressable
//       onPress={onPress}
//       onPressIn={() => Animated.spring(ps, { toValue: 0.95, useNativeDriver: true }).start()}
//       onPressOut={() => Animated.spring(ps, { toValue: 1, useNativeDriver: true }).start()}
//       style={{ width: '47.5%' }}
//     >
//       <Animated.View style={{ transform: [{ scale: ps }] }}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
//           style={[qStyles.card, { borderColor: accent || 'rgba(255,255,255,0.09)' }]}
//         >
//           <View style={qStyles.shine} />
//           <Text style={qStyles.emoji}>{emoji}</Text>
//           <Text style={qStyles.label}>{label}</Text>
//           <Text style={qStyles.sub}>{sublabel}</Text>
//           <Text style={[qStyles.arrow, { color: '#67E6E8' }]}>→</Text>
//         </LinearGradient>
//       </Animated.View>
//     </Pressable>
//   );
// }
// const qStyles = StyleSheet.create({
//   card:  { borderRadius: 20, borderWidth: 1, padding: 16, minHeight: 112, overflow: 'hidden', position: 'relative' },
//   shine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
//   emoji: { fontSize: 22, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 3 },
//   sub:   { color: 'rgba(255,255,255,0.42)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 14, bottom: 14, fontSize: 16, fontWeight: '800' },
// });

// // ─────────────────────────────────────────────────
// // MAIN SCREEN
// // ─────────────────────────────────────────────────
// export default function AdminHomeScreen({ navigation, route }) {
//   const user = route?.params?.user;
//   const { refreshApps } = useMarketplace();

//   const [pendingApps,   setPendingApps]   = useState([]);
//   const [stats,         setStats]         = useState({ pending: 0, approved: 0, rejected: 0 });
//   const [unreadCount,   setUnreadCount]   = useState(0);
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);

//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-20)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const bellPulse   = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start();

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bellPulse, { toValue: 1.20, duration: 160, useNativeDriver: true }),
//         Animated.timing(bellPulse, { toValue: 1,    duration: 160, useNativeDriver: true }),
//         Animated.delay(3400),
//       ])
//     ).start();

//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [pendingData, statsData, unread] = await Promise.all([
//         fetchPendingAppsApi(),
//         fetchAppStatsApi(),
//         fetchAdminUnreadCountApi(),
//       ]);
//       setPendingApps(Array.isArray(pendingData) ? pendingData : []);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (e) {
//       Alert.alert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   const refreshStats = async () => {
//     try {
//       const [statsData, unread] = await Promise.all([
//         fetchAppStatsApi(),
//         fetchAdminUnreadCountApi(),
//       ]);
//       setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
//       setUnreadCount(unread || 0);
//     } catch (_) {}
//   };

//   const handleApprove = (app) => {
//     Alert.alert(
//       'Approve App',
//       `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, Approve',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await approveAppApi(app.id);
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));
//               // ✅ KEY FIX — update context so HomeScreen + AppsScreen refresh instantly
//               await refreshApps();
//               Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//               setTimeout(refreshStats, 600);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Approve failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleReject = (app) => {
//     Alert.alert(
//       'Reject App',
//       `Reject "${app.title}"?\n\nThis cannot be undone.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Reject',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               setActionLoading(app.id);
//               await rejectAppApi(app.id);
//               setPendingApps(prev => prev.filter(a => a.id !== app.id));
//               // ✅ KEY FIX
//               await refreshApps();
//               Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
//               setTimeout(refreshStats, 600);
//             } catch (e) {
//               Alert.alert('Error', e.message || 'Reject failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />
//       <LinearGradient colors={['#0E1420', '#141B2B', '#0A1218']} style={styles.bg}>

//         <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
//             style={styles.headerCard}
//           >
//             <View style={styles.headerShine} />
//             <View style={styles.headerLeft}>
//               <LinearGradient
//                 colors={['#A855F7', '#7E22CE']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={styles.adminBadge}
//               >
//                 <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//               </LinearGradient>
//               <Text style={styles.headerTitle}>Control Panel</Text>
//               <Text style={styles.headerSub}>Apps Marketplace</Text>
//             </View>
//             <View style={styles.headerRight}>
//               <Pressable
//                 onPress={() => navigation.navigate('AdminNotifications')}
//                 style={({ pressed }) => [styles.bellBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Animated.View style={{ transform: [{ scale: bellPulse }] }}>
//                   <View style={styles.bellIconWrap}>
//                     <View style={styles.bellArc} />
//                     <View style={styles.bellBody} />
//                     <View style={styles.bellBar} />
//                     <View style={styles.bellClapper} />
//                   </View>
//                 </Animated.View>
//                 {unreadCount > 0 && (
//                   <View style={styles.bellBadge}>
//                     <Text style={styles.bellBadgeText}>
//                       {unreadCount > 9 ? '9+' : String(unreadCount)}
//                     </Text>
//                   </View>
//                 )}
//               </Pressable>
//               <Pressable
//                 onPress={handleLogout}
//                 style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.logoutText}>Logout</Text>
//               </Pressable>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scroll}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#67E6E8"
//                 colors={['#67E6E8']}
//               />
//             }
//           >
//             <LinearGradient
//               colors={['rgba(168,85,247,0.15)', 'rgba(126,34,206,0.06)']}
//               start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//               style={styles.welcomeStrip}
//             >
//               <View style={styles.welcomeShine} />
//               <View>
//                 <Text style={styles.welcomeLabel}>Welcome back</Text>
//                 <Text style={styles.welcomeName}>Admin Dashboard</Text>
//               </View>
//               <View style={styles.liveRow}>
//                 <View style={styles.liveDot} />
//                 <Text style={styles.liveText}>Live</Text>
//               </View>
//             </LinearGradient>

//             <View style={styles.statsRow}>
//               <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.25)"  delay={80}  />
//               <StatCard label="Approved" value={stats.approved} color="#67E6E8" accent="rgba(103,230,232,0.25)" delay={160} />
//               <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.25)"  delay={240} />
//             </View>
//             <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//                 <Text style={styles.sectionTitle}>
//                   {loading
//                     ? 'Loading...'
//                     : pendingApps.length > 0
//                     ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
//                     : 'All clear ✓'}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={loadData}
//                 style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.refreshBtnText}>↻  Refresh</Text>
//               </Pressable>
//             </View>

//             {loading && (
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.loadingCard}
//               >
//                 <Text style={styles.loadingText}>Loading apps...</Text>
//               </LinearGradient>
//             )}

//             {!loading && pendingApps.length === 0 && (
//               <LinearGradient
//                 colors={['rgba(103,230,232,0.08)', 'rgba(255,255,255,0.02)']}
//                 style={styles.emptyCard}
//               >
//                 <View style={styles.emptyIconWrap}>
//                   <Text style={styles.emptyIconText}>✓</Text>
//                 </View>
//                 <Text style={styles.emptyTitle}>All caught up!</Text>
//                 <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
//               </LinearGradient>
//             )}

//             {!loading && pendingApps.map((app, index) => (
//               <AppReviewCard
//                 key={app.id}
//                 app={app}
//                 index={index}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 actionLoading={actionLoading}
//               />
//             ))}

//             <LinearGradient
//               colors={['rgba(103,230,232,0.10)', 'rgba(255,255,255,0.02)']}
//               style={styles.liveStrip}
//             >
//               <View style={styles.liveStripShine} />
//               <View>
//                 <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
//                 <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
//               </View>
//               <Pressable
//                 onPress={() => navigation.navigate('Apps')}
//                 style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={styles.viewAllText}>View all →</Text>
//               </Pressable>
//             </LinearGradient>

//             <View style={styles.sectionHeader}>
//               <View>
//                 <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//                 <Text style={styles.sectionTitle}>Navigate</Text>
//               </View>
//             </View>
//             <View style={styles.quickGrid}>
//               <QuickCard label="All Apps"      sublabel="Browse marketplace" emoji="🛒" accent="rgba(103,230,232,0.25)" onPress={() => navigation.navigate('Apps')} />
//               <QuickCard label="Notifications" sublabel="View all alerts"    emoji="🔔" accent="rgba(168,85,247,0.25)" onPress={() => navigation.navigate('AdminNotifications')} />
//               <QuickCard label="Upload App"    sublabel="Add new listing"    emoji="⬆️" accent="rgba(255,184,77,0.22)" onPress={() => navigation.navigate('UploadApp')} />
//               <QuickCard label="Marketplace"   sublabel="User home view"     emoji="🏠" accent="rgba(255,77,106,0.22)" onPress={() => navigation.navigate('Home')} />
//             </View>

//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.01)']}
//               style={styles.footer}
//             >
//               <View style={styles.footerShine} />
//               <Text style={styles.footerTitle}>Apps Marketplace</Text>
//               <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//             </LinearGradient>
//           </ScrollView>
//         </Animated.View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:       { flex: 1, backgroundColor: '#0E1420' },
//   bg:             { flex: 1 },
//   header:         { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, zIndex: 10 },
//   headerCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' },
//   headerShine:    { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.14)' },
//   headerLeft:     { gap: 5 },
//   headerRight:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   adminBadge:     { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
//   adminBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:    { color: '#FFFFFF', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
//   headerSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 12 },
//   bellBtn:        { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.11)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
//   bellIconWrap:   { width: 20, height: 22, alignItems: 'center' },
//   bellArc:        { width: 9, height: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: 'rgba(255,255,255,0.92)', marginBottom: -1 },
//   bellBody:       { width: 17, height: 11, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: 'rgba(255,255,255,0.92)' },
//   bellBar:        { width: 19, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
//   bellClapper:    { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
//   bellBadge:      { position: 'absolute', top: -5, right: -5, minWidth: 20, height: 20, borderRadius: 10, backgroundColor: '#FF4D6A', borderWidth: 2, borderColor: '#0E1420', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, zIndex: 10 },
//   bellBadgeText:  { color: '#FFFFFF', fontSize: 10, fontWeight: '800', lineHeight: 12 },
//   logoutBtn:      { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   logoutText:     { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },
//   scroll:         { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },
//   welcomeStrip:   { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.22)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
//   welcomeShine:   { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(168,85,247,0.32)' },
//   welcomeLabel:   { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   welcomeName:    { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
//   liveRow:        { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
//   liveDot:        { width: 7, height: 7, borderRadius: 4, backgroundColor: '#67E6E8' },
//   liveText:       { color: '#67E6E8', fontSize: 11, fontWeight: '800' },
//   statsRow:       { flexDirection: 'row', gap: 10, marginBottom: 8 },
//   statsNote:      { color: 'rgba(255,255,255,0.28)', fontSize: 11, marginBottom: 22, paddingHorizontal: 2 },
//   sectionHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
//   sectionEye:     { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
//   sectionTitle:   { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   refreshBtnText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
//   loadingCard:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 28, alignItems: 'center', marginBottom: 14 },
//   loadingText:    { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
//   emptyCard:      { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(103,230,232,0.16)', paddingVertical: 36, paddingHorizontal: 24, alignItems: 'center', marginBottom: 24 },
//   emptyIconWrap:  { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(103,230,232,0.14)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
//   emptyIconText:  { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
//   emptyTitle:     { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   emptySub:       { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },
//   liveStrip:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(103,230,232,0.20)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, overflow: 'hidden' },
//   liveStripShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(103,230,232,0.24)' },
//   liveStripLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
//   liveStripValue: { color: '#67E6E8', fontSize: 17, fontWeight: '800' },
//   viewAllBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(103,230,232,0.10)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.26)' },
//   viewAllText:    { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
//   quickGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
//   footer:         { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 18, alignItems: 'center', overflow: 'hidden' },
//   footerShine:    { position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
//   footerTitle:    { color: 'rgba(255,255,255,0.52)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
//   footerSub:      { color: 'rgba(255,255,255,0.25)', fontSize: 11 },
// });


import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  Pressable, Animated, Easing, ScrollView,
  Alert, RefreshControl, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  fetchPendingAppsApi, fetchAppStatsApi,
  fetchAdminUnreadCountApi, approveAppApi, rejectAppApi,
} from '../utils/apiService';
import { useMarketplace } from '../context/MarketplaceContext';
import SharedImageCarousel from '../components/SharedImageCarousel'; // ✅

// ─────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────
function StatCard({ label, value, color, accent, delay }) {
  const scale = useRef(new Animated.Value(0.82)).current;
  const op    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scale.setValue(0.82);
    op.setValue(0);
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, friction: 7, tension: 80, useNativeDriver: true }),
        Animated.timing(op,    { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, [value]);

  return (
    <Animated.View style={[sStyles.wrap, { opacity: op, transform: [{ scale }] }]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.03)']}
        style={[sStyles.card, { borderColor: accent }]}
      >
        <View style={[sStyles.topBar, { backgroundColor: color }]} />
        <Text style={[sStyles.value, { color }]}>{value}</Text>
        <Text style={sStyles.label}>{label}</Text>
      </LinearGradient>
    </Animated.View>
  );
}
const sStyles = StyleSheet.create({
  wrap:   { flex: 1 },
  card:   { borderRadius: 20, borderWidth: 1, paddingTop: 16, paddingBottom: 18, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
  topBar: { width: 28, height: 3, borderRadius: 2, marginBottom: 12 },
  value:  { fontSize: 34, fontWeight: '800', marginBottom: 4 },
  label:  { color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
});

// ─────────────────────────────────────────────────
// APP REVIEW CARD — uses SharedImageCarousel ✅
// ─────────────────────────────────────────────────
function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
  const slideAnim = useRef(new Animated.Value(44)).current;
  const opAnim    = useRef(new Animated.Value(0)).current;
  const isLoading = actionLoading === app.id;

  const CARD_W = Dimensions.get('window').width - 32;

  // Build images array
  const images = Array.isArray(app.imageUrls) && app.imageUrls.length > 0
    ? app.imageUrls
    : app.imageUrl ? [app.imageUrl] : [];

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 120),
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(opAnim,   { toValue: 1, duration: 420, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 18 }}>
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
        style={cStyles.card}
      >
        <View style={cStyles.shine} />

        {/* ── SharedImageCarousel with overlaid badges ── */}
        <View style={{ width: '100%', position: 'relative' }}>
          <SharedImageCarousel
            images={images}
            width={CARD_W}
            height={220}
          />

          {/* Badges overlay — category + pending */}
          <View style={cStyles.imageBadgeRow} pointerEvents="none">
            <View style={cStyles.catPill}>
              <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
            </View>
            <View style={cStyles.pendingPill}>
              <View style={cStyles.pendingDot} />
              <Text style={cStyles.pendingText}>PENDING</Text>
            </View>
          </View>

          {/* Price badge — bottom right, above dots */}
          <View style={cStyles.priceOverlay} pointerEvents="none">
            <Text style={cStyles.priceOverlayText}>
              ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
            </Text>
          </View>
        </View>

        {/* Body */}
        <View style={cStyles.body}>
          <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
          <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>
          <View style={cStyles.divider} />
          <View style={cStyles.metaGrid}>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>Owner</Text>
              <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
            </View>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>Price</Text>
              <Text style={[cStyles.metaVal, { color: '#67E6E8' }]}>
                ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
              </Text>
            </View>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>Email</Text>
              <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
            </View>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>Phone</Text>
              <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
            </View>
            {!!app.company && (
              <View style={cStyles.metaItemFull}>
                <Text style={cStyles.metaKey}>Company</Text>
                <Text style={cStyles.metaVal}>{app.company}</Text>
              </View>
            )}
          </View>

          <View style={cStyles.actionRow}>
            <Pressable
              onPress={() => onReject(app)}
              disabled={isLoading}
              style={({ pressed }) => [cStyles.rejectBtn, pressed && { opacity: 0.7 }]}
            >
              <Text style={cStyles.rejectText}>{isLoading ? '...' : '✕  Reject'}</Text>
            </Pressable>
            <Pressable
              onPress={() => onApprove(app)}
              disabled={isLoading}
              style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.85 }]}
            >
              <LinearGradient
                colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={cStyles.approveBtn}
              >
                <View style={cStyles.approveBtnShine} />
                <Text style={cStyles.approveText}>
                  {isLoading ? 'Processing...' : '✓  Approve & Publish'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const cStyles = StyleSheet.create({
  card:            { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
  shine:           { position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, backgroundColor: 'rgba(255,255,255,0.15)', zIndex: 1 },
  // Badge overlay — sits on top of SharedImageCarousel
  imageBadgeRow:   { position: 'absolute', top: 12, left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
  priceOverlay:    {
    position: 'absolute',
    // above the dot row (dot row is at bottom: 8, height ~22) → 38
    bottom: 38,
    right: 14,
    backgroundColor: 'rgba(8,12,20,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(103,230,232,0.40)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
  },
  priceOverlayText:{ color: '#67E6E8', fontSize: 13, fontWeight: '800' },
  catPill:         { backgroundColor: 'rgba(103,230,232,0.13)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  catText:         { color: '#67E6E8', fontSize: 11, fontWeight: '700' },
  pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  pendingDot:      { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB84D' },
  pendingText:     { color: '#FFB84D', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  body:            { paddingHorizontal: 18, paddingVertical: 16 },
  title:           { color: '#FFFFFF', fontSize: 19, fontWeight: '800', marginBottom: 6 },
  desc:            { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
  divider:         { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 14 },
  metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  metaItem:        { width: '47%' },
  metaItemFull:    { width: '100%' },
  metaKey:         { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4, marginBottom: 3 },
  metaVal:         { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  actionRow:       { flexDirection: 'row', gap: 10 },
  rejectBtn:       { paddingHorizontal: 20, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.30)' },
  rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
  approveBtn:      { flex: 1, minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  approveBtnShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' },
  approveText:     { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
});

// ─────────────────────────────────────────────────
// QUICK CARD
// ─────────────────────────────────────────────────
function QuickCard({ label, sublabel, emoji, onPress, accent }) {
  const ps = useRef(new Animated.Value(1)).current;
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => Animated.spring(ps, { toValue: 0.95, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(ps, { toValue: 1, useNativeDriver: true }).start()}
      style={{ width: '47.5%' }}
    >
      <Animated.View style={{ transform: [{ scale: ps }] }}>
        <LinearGradient
          colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
          style={[qStyles.card, { borderColor: accent || 'rgba(255,255,255,0.09)' }]}
        >
          <View style={qStyles.shine} />
          <Text style={qStyles.emoji}>{emoji}</Text>
          <Text style={qStyles.label}>{label}</Text>
          <Text style={qStyles.sub}>{sublabel}</Text>
          <Text style={[qStyles.arrow, { color: '#67E6E8' }]}>→</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}
const qStyles = StyleSheet.create({
  card:  { borderRadius: 20, borderWidth: 1, padding: 16, minHeight: 112, overflow: 'hidden', position: 'relative' },
  shine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
  emoji: { fontSize: 22, marginBottom: 8 },
  label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 3 },
  sub:   { color: 'rgba(255,255,255,0.42)', fontSize: 10, fontWeight: '500' },
  arrow: { position: 'absolute', right: 14, bottom: 14, fontSize: 16, fontWeight: '800' },
});

// ─────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────
export default function AdminHomeScreen({ navigation, route }) {
  const user = route?.params?.user;
  const { refreshApps } = useMarketplace();

  const [pendingApps,   setPendingApps]   = useState([]);
  const [stats,         setStats]         = useState({ pending: 0, approved: 0, rejected: 0 });
  const [unreadCount,   setUnreadCount]   = useState(0);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const headerFade  = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const bellPulse   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerFade,  { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bellPulse, { toValue: 1.20, duration: 160, useNativeDriver: true }),
        Animated.timing(bellPulse, { toValue: 1,    duration: 160, useNativeDriver: true }),
        Animated.delay(3400),
      ])
    ).start();

    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pendingData, statsData, unread] = await Promise.all([
        fetchPendingAppsApi(),
        fetchAppStatsApi(),
        fetchAdminUnreadCountApi(),
      ]);
      setPendingApps(Array.isArray(pendingData) ? pendingData : []);
      setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
      setUnreadCount(unread || 0);
    } catch (e) {
      Alert.alert('Error', 'Could not load data. Pull down to retry.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const refreshStats = async () => {
    try {
      const [statsData, unread] = await Promise.all([
        fetchAppStatsApi(),
        fetchAdminUnreadCountApi(),
      ]);
      setStats(statsData || { pending: 0, approved: 0, rejected: 0 });
      setUnreadCount(unread || 0);
    } catch (_) {}
  };

  const handleApprove = (app) => {
    Alert.alert(
      'Approve App',
      `Approve "${app.title}"?\n\nIt will go live in the marketplace immediately.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Approve',
          onPress: async () => {
            try {
              setActionLoading(app.id);
              await approveAppApi(app.id);
              setPendingApps(prev => prev.filter(a => a.id !== app.id));
              await refreshApps();
              Alert.alert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
              setTimeout(refreshStats, 600);
            } catch (e) {
              Alert.alert('Error', e.message || 'Approve failed. Try again.');
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  const handleReject = (app) => {
    Alert.alert(
      'Reject App',
      `Reject "${app.title}"?\n\nThis cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              setActionLoading(app.id);
              await rejectAppApi(app.id);
              setPendingApps(prev => prev.filter(a => a.id !== app.id));
              await refreshApps();
              Alert.alert('❌ Rejected', `"${app.title}" has been rejected.`);
              setTimeout(refreshStats, 600);
            } catch (e) {
              Alert.alert('Error', e.message || 'Reject failed. Try again.');
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1420" />
      <LinearGradient colors={['#0E1420', '#141B2B', '#0A1218']} style={styles.bg}>

        <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
          <LinearGradient
            colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
            style={styles.headerCard}
          >
            <View style={styles.headerShine} />
            <View style={styles.headerLeft}>
              <LinearGradient
                colors={['#A855F7', '#7E22CE']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.adminBadge}
              >
                <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
              </LinearGradient>
              <Text style={styles.headerTitle}>Control Panel</Text>
              <Text style={styles.headerSub}>Apps Marketplace</Text>
            </View>
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => navigation.navigate('AdminNotifications')}
                style={({ pressed }) => [styles.bellBtn, pressed && { opacity: 0.7 }]}
              >
                <Animated.View style={{ transform: [{ scale: bellPulse }] }}>
                  <View style={styles.bellIconWrap}>
                    <View style={styles.bellArc} />
                    <View style={styles.bellBody} />
                    <View style={styles.bellBar} />
                    <View style={styles.bellClapper} />
                  </View>
                </Animated.View>
                {unreadCount > 0 && (
                  <View style={styles.bellBadge}>
                    <Text style={styles.bellBadgeText}>
                      {unreadCount > 9 ? '9+' : String(unreadCount)}
                    </Text>
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={handleLogout}
                style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#67E6E8"
                colors={['#67E6E8']}
              />
            }
          >
            <LinearGradient
              colors={['rgba(168,85,247,0.15)', 'rgba(126,34,206,0.06)']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.welcomeStrip}
            >
              <View style={styles.welcomeShine} />
              <View>
                <Text style={styles.welcomeLabel}>Welcome back</Text>
                <Text style={styles.welcomeName}>Admin Dashboard</Text>
              </View>
              <View style={styles.liveRow}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Live</Text>
              </View>
            </LinearGradient>

            <View style={styles.statsRow}>
              <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.25)"  delay={80}  />
              <StatCard label="Approved" value={stats.approved} color="#67E6E8" accent="rgba(103,230,232,0.25)" delay={160} />
              <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.25)"  delay={240} />
            </View>
            <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEye}>PENDING REVIEW</Text>
                <Text style={styles.sectionTitle}>
                  {loading
                    ? 'Loading...'
                    : pendingApps.length > 0
                    ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
                    : 'All clear ✓'}
                </Text>
              </View>
              <Pressable
                onPress={loadData}
                style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
              >
                <Text style={styles.refreshBtnText}>↻  Refresh</Text>
              </Pressable>
            </View>

            {loading && (
              <LinearGradient
                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                style={styles.loadingCard}
              >
                <Text style={styles.loadingText}>Loading apps...</Text>
              </LinearGradient>
            )}

            {!loading && pendingApps.length === 0 && (
              <LinearGradient
                colors={['rgba(103,230,232,0.08)', 'rgba(255,255,255,0.02)']}
                style={styles.emptyCard}
              >
                <View style={styles.emptyIconWrap}>
                  <Text style={styles.emptyIconText}>✓</Text>
                </View>
                <Text style={styles.emptyTitle}>All caught up!</Text>
                <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
              </LinearGradient>
            )}

            {!loading && pendingApps.map((app, index) => (
              <AppReviewCard
                key={app.id}
                app={app}
                index={index}
                onApprove={handleApprove}
                onReject={handleReject}
                actionLoading={actionLoading}
              />
            ))}

            <LinearGradient
              colors={['rgba(103,230,232,0.10)', 'rgba(255,255,255,0.02)']}
              style={styles.liveStrip}
            >
              <View style={styles.liveStripShine} />
              <View>
                <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
                <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
              </View>
              <Pressable
                onPress={() => navigation.navigate('Apps')}
                style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
              >
                <Text style={styles.viewAllText}>View all →</Text>
              </Pressable>
            </LinearGradient>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
                <Text style={styles.sectionTitle}>Navigate</Text>
              </View>
            </View>
            <View style={styles.quickGrid}>
              <QuickCard label="All Apps"      sublabel="Browse marketplace" emoji="🛒" accent="rgba(103,230,232,0.25)" onPress={() => navigation.navigate('Apps')} />
              <QuickCard label="Notifications" sublabel="View all alerts"    emoji="🔔" accent="rgba(168,85,247,0.25)" onPress={() => navigation.navigate('AdminNotifications')} />
              <QuickCard label="Upload App"    sublabel="Add new listing"    emoji="⬆️" accent="rgba(255,184,77,0.22)" onPress={() => navigation.navigate('UploadApp')} />
              <QuickCard label="Marketplace"   sublabel="User home view"     emoji="🏠" accent="rgba(255,77,106,0.22)" onPress={() => navigation.navigate('Home')} />
            </View>

            <LinearGradient
              colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.01)']}
              style={styles.footer}
            >
              <View style={styles.footerShine} />
              <Text style={styles.footerTitle}>Apps Marketplace</Text>
              <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
            </LinearGradient>
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:       { flex: 1, backgroundColor: '#0E1420' },
  bg:             { flex: 1 },
  header:         { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, zIndex: 10 },
  headerCard:     { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' },
  headerShine:    { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.14)' },
  headerLeft:     { gap: 5 },
  headerRight:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  adminBadge:     { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  adminBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  headerTitle:    { color: '#FFFFFF', fontSize: 21, fontWeight: '800', letterSpacing: -0.4 },
  headerSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 12 },
  bellBtn:        { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.11)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  bellIconWrap:   { width: 20, height: 22, alignItems: 'center' },
  bellArc:        { width: 9, height: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: 'rgba(255,255,255,0.92)', marginBottom: -1 },
  bellBody:       { width: 17, height: 11, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: 'rgba(255,255,255,0.92)' },
  bellBar:        { width: 19, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
  bellClapper:    { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.92)', marginTop: 1 },
  bellBadge:      { position: 'absolute', top: -5, right: -5, minWidth: 20, height: 20, borderRadius: 10, backgroundColor: '#FF4D6A', borderWidth: 2, borderColor: '#0E1420', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, zIndex: 10 },
  bellBadgeText:  { color: '#FFFFFF', fontSize: 10, fontWeight: '800', lineHeight: 12 },
  logoutBtn:      { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: 'rgba(255,77,106,0.12)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
  logoutText:     { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },
  scroll:         { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },
  welcomeStrip:   { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.22)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
  welcomeShine:   { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(168,85,247,0.32)' },
  welcomeLabel:   { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
  welcomeName:    { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  liveRow:        { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.24)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  liveDot:        { width: 7, height: 7, borderRadius: 4, backgroundColor: '#67E6E8' },
  liveText:       { color: '#67E6E8', fontSize: 11, fontWeight: '800' },
  statsRow:       { flexDirection: 'row', gap: 10, marginBottom: 8 },
  statsNote:      { color: 'rgba(255,255,255,0.28)', fontSize: 11, marginBottom: 22, paddingHorizontal: 2 },
  sectionHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
  sectionEye:     { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  sectionTitle:   { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  refreshBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
  refreshBtnText: { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
  loadingCard:    { borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 28, alignItems: 'center', marginBottom: 14 },
  loadingText:    { color: '#67E6E8', fontSize: 14, fontWeight: '600' },
  emptyCard:      { borderRadius: 22, borderWidth: 1, borderColor: 'rgba(103,230,232,0.16)', paddingVertical: 36, paddingHorizontal: 24, alignItems: 'center', marginBottom: 24 },
  emptyIconWrap:  { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(103,230,232,0.14)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  emptyIconText:  { color: '#67E6E8', fontSize: 22, fontWeight: '800' },
  emptyTitle:     { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
  emptySub:       { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },
  liveStrip:      { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(103,230,232,0.20)', paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, overflow: 'hidden' },
  liveStripShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(103,230,232,0.24)' },
  liveStripLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '600', marginBottom: 3 },
  liveStripValue: { color: '#67E6E8', fontSize: 17, fontWeight: '800' },
  viewAllBtn:     { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: 'rgba(103,230,232,0.10)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.26)' },
  viewAllText:    { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
  quickGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  footer:         { borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingVertical: 18, alignItems: 'center', overflow: 'hidden' },
  footerShine:    { position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
  footerTitle:    { color: 'rgba(255,255,255,0.52)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
  footerSub:      { color: 'rgba(255,255,255,0.25)', fontSize: 11 },
}); 