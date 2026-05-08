
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView,
//   Alert, RefreshControl, Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi, fetchAppStatsApi,
//   fetchAdminUnreadCountApi, approveAppApi, rejectAppApi,
// } from '../utils/apiService';
// import { useMarketplace } from '../context/MarketplaceContext';
// import SharedImageCarousel from '../components/SharedImageCarousel';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const BG = '#0D1117';
// const CARD_BG = 'rgba(255,255,255,0.04)';
// const BORDER = 'rgba(255,255,255,0.09)';
// const TEAL = '#67E6E8';
// const TEAL_DIM = 'rgba(103,230,232,0.16)';
// const TEAL_BORDER = 'rgba(103,230,232,0.28)';

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
//       <View style={[sStyles.card, { borderColor: accent }]}>
//         <View style={[sStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[sStyles.value, { color }]}>{value}</Text>
//         <Text style={sStyles.label}>{label}</Text>
//       </View>
//     </Animated.View>
//   );
// }
// const sStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, paddingTop: 14, paddingBottom: 16, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
//   topBar: { width: 24, height: 3, borderRadius: 2, marginBottom: 10 },
//   value:  { fontSize: 30, fontWeight: '800', marginBottom: 3 },
//   label:  { color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD
// // ─────────────────────────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(40)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;
//   const CARD_W    = Dimensions.get('window').width - 32;

//   const images = Array.isArray(app.imageUrls) && app.imageUrls.length > 0
//     ? app.imageUrls
//     : app.imageUrl ? [app.imageUrl] : [];

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 100),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 400, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 16 }}>
//       <View style={cStyles.card}>
//         <View style={{ width: '100%' }}>
//           <SharedImageCarousel images={images} width={CARD_W} height={200} />
//           <View style={cStyles.imageBadgeRow} pointerEvents="none">
//             <View style={cStyles.catPill}>
//               <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//             </View>
//             <View style={cStyles.pendingPill}>
//               <View style={cStyles.pendingDot} />
//               <Text style={cStyles.pendingText}>PENDING</Text>
//             </View>
//           </View>
//           <View style={cStyles.priceOverlay} pointerEvents="none">
//             <Text style={cStyles.priceOverlayText}>
//               ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//             </Text>
//           </View>
//         </View>

//         <View style={cStyles.body}>
//           <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>
//           <View style={cStyles.divider} />
//           <View style={cStyles.metaGrid}>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>OWNER</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>PRICE</Text>
//               <Text style={[cStyles.metaVal, { color: TEAL }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>EMAIL</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>PHONE</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {!!app.company && (
//               <View style={cStyles.metaItemFull}>
//                 <Text style={cStyles.metaKey}>COMPANY</Text>
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
//               style={({ pressed }) => [{ flex: 1, borderRadius: 14, overflow: 'hidden' }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cStyles.approveBtn}
//               >
//                 <Text style={cStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// const cStyles = StyleSheet.create({
//   card:            { borderRadius: 20, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, overflow: 'hidden' },
//   imageBadgeRow:   { position: 'absolute', top: 10, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
//   priceOverlay:    { position: 'absolute', bottom: 10, right: 12, backgroundColor: 'rgba(8,12,20,0.80)', borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, zIndex: 10 },
//   priceOverlayText:{ color: TEAL, fontSize: 12, fontWeight: '800' },
//   catPill:         { backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   catText:         { color: TEAL, fontSize: 10, fontWeight: '700' },
//   pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   pendingDot:      { width: 5, height: 5, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:     { color: '#FFB84D', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   body:            { paddingHorizontal: 16, paddingVertical: 14 },
//   title:           { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 5 },
//   desc:            { color: 'rgba(255,255,255,0.50)', fontSize: 13, lineHeight: 18, marginBottom: 12 },
//   divider:         { height: 1, backgroundColor: BORDER, marginBottom: 12 },
//   metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
//   metaItem:        { width: '47%' },
//   metaItemFull:    { width: '100%' },
//   metaKey:         { color: 'rgba(255,255,255,0.30)', fontSize: 9, fontWeight: '700', letterSpacing: 0.6, marginBottom: 2 },
//   metaVal:         { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
//   actionRow:       { flexDirection: 'row', gap: 10 },
//   rejectBtn:       { paddingHorizontal: 18, minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.10)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:      { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
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
//       <Animated.View style={[qStyles.card, { borderColor: accent || BORDER, transform: [{ scale: ps }] }]}>
//         <Text style={qStyles.emoji}>{emoji}</Text>
//         <Text style={qStyles.label}>{label}</Text>
//         <Text style={qStyles.sub}>{sublabel}</Text>
//         <Text style={qStyles.arrow}>→</Text>
//       </Animated.View>
//     </Pressable>
//   );
// }
// const qStyles = StyleSheet.create({
//   card:  { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, padding: 14, minHeight: 108, overflow: 'hidden' },
//   emoji: { fontSize: 20, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   sub:   { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 12, bottom: 12, color: TEAL, fontSize: 15, fontWeight: '800' },
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
//   const headerSlide = useRef(new Animated.Value(-16)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();
//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 350, useNativeDriver: true }),
//     ]).start();
//     loadData();
//   }, []);

//   // ✅ Refresh unread count every time screen comes into focus
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       refreshUnreadCount();
//     });
//     return unsubscribe;
//   }, [navigation]);

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
//       showAlert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   const refreshUnreadCount = async () => {
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
//     showAlert(
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
//               await refreshApps();
//               showAlert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//               setTimeout(refreshUnreadCount, 600);
//             } catch (e) {
//               showAlert('Error', e.message || 'Approve failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleReject = (app) => {
//     showAlert(
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
//               await refreshApps();
//               showAlert('❌ Rejected', `"${app.title}" has been rejected.`);
//               setTimeout(refreshUnreadCount, 600);
//             } catch (e) {
//               showAlertt('Error', e.message || 'Reject failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleLogout = () => {
//     showAlert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   // ✅ Navigate to notifications and clear badge on return
//   const handleBellPress = () => {
//     setUnreadCount(0); // optimistic clear
//     navigation.navigate('AdminNotifications');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={BG} />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       {/* ── HEADER ── */}
//       <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//         <View style={styles.headerInner}>
//           <View style={styles.headerLeft}>
//             <View style={styles.adminBadge}>
//               <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//             </View>
//             <Text style={styles.headerTitle}>Control Panel</Text>
//             <Text style={styles.headerSub}>Apps Marketplace</Text>
//           </View>
//           <View style={styles.headerRight}>
//             {/* Bell button */}
//             <Pressable
//               onPress={handleBellPress}
//               style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.iconBtnText}>🔔</Text>
//               {unreadCount > 0 && (
//                 <View style={styles.bellBadge}>
//                   <Text style={styles.bellBadgeText}>
//                     {unreadCount > 9 ? '9+' : String(unreadCount)}
//                   </Text>
//                 </View>
//               )}
//             </Pressable>
//             <Pressable
//               onPress={handleLogout}
//               style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.logoutText}>Logout</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scroll}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor={TEAL}
//               colors={[TEAL]}
//             />
//           }
//         >
//           {/* Welcome strip */}
//           <View style={styles.welcomeStrip}>
//             <View>
//               <Text style={styles.welcomeLabel}>Welcome back</Text>
//               <Text style={styles.welcomeName}>Admin Dashboard</Text>
//             </View>
//             <View style={styles.liveRow}>
//               <View style={styles.liveDot} />
//               <Text style={styles.liveText}>Live</Text>
//             </View>
//           </View>

//           {/* Stats */}
//           <View style={styles.statsRow}>
//             <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.22)"  delay={80}  />
//             <StatCard label="Approved" value={stats.approved} color={TEAL}    accent={TEAL_BORDER}             delay={150} />
//             <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.22)"  delay={220} />
//           </View>
//           <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

//           {/* Section header */}
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//               <Text style={styles.sectionTitle}>
//                 {loading
//                   ? 'Loading...'
//                   : pendingApps.length > 0
//                   ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
//                   : 'All clear ✓'}
//               </Text>
//             </View>
//             <Pressable
//               onPress={loadData}
//               style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.refreshBtnText}>↻  Refresh</Text>
//             </Pressable>
//           </View>

//           {loading && (
//             <View style={styles.loadingCard}>
//               <Text style={styles.loadingText}>Loading apps...</Text>
//             </View>
//           )}

//           {!loading && pendingApps.length === 0 && (
//             <View style={styles.emptyCard}>
//               <View style={styles.emptyIconWrap}>
//                 <Text style={styles.emptyIconText}>✓</Text>
//               </View>
//               <Text style={styles.emptyTitle}>All caught up!</Text>
//               <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
//             </View>
//           )}

//           {!loading && pendingApps.map((app, index) => (
//             <AppReviewCard
//               key={app.id}
//               app={app}
//               index={index}
//               onApprove={handleApprove}
//               onReject={handleReject}
//               actionLoading={actionLoading}
//             />
//           ))}

//           {/* Live strip */}
//           <View style={styles.liveStrip}>
//             <View>
//               <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
//               <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
//             </View>
//             <Pressable
//               onPress={() => navigation.navigate('Apps')}
//               style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.viewAllText}>View all →</Text>
//             </Pressable>
//           </View>

//           {/* Quick actions */}
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//               <Text style={styles.sectionTitle}>Navigate</Text>
//             </View>
//           </View>
//           <View style={styles.quickGrid}>
//             <QuickCard
//               label="All Apps" sublabel="Browse marketplace" emoji="🛒"
//               accent={TEAL_BORDER}
//               onPress={() => navigation.navigate('Apps')}
//             />
//             <QuickCard
//               label="Notifications" sublabel="View all alerts" emoji="🔔"
//               accent="rgba(168,85,247,0.30)"
//               onPress={handleBellPress}
//             />
//             <QuickCard
//               label="Publish App" sublabel="Add directly to marketplace" emoji="⚡"
//               accent="rgba(168,85,247,0.26)"
//               onPress={() => navigation.navigate('UploadApp', { isAdmin: true })}
//             />
//             <QuickCard
//               label="Marketplace" sublabel="User home view" emoji="🏠"
//               accent="rgba(255,77,106,0.22)"
//               onPress={() => navigation.navigate('Home')}
//             />
//           </View>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <Text style={styles.footerTitle}>Apps Marketplace</Text>
//             <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//           </View>
//         </ScrollView>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:        { flex: 1, backgroundColor: BG },
//   header:          { backgroundColor: BG, borderBottomWidth: 1, borderBottomColor: BORDER, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 12 },
//   headerInner:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   headerLeft:      { gap: 3 },
//   headerRight:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   adminBadge:      { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(168,85,247,0.20)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.40)' },
//   adminBadgeText:  { color: '#C084FC', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:     { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   headerSub:       { color: 'rgba(255,255,255,0.38)', fontSize: 11 },
//   iconBtn:         { width: 42, height: 42, borderRadius: 12, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, alignItems: 'center', justifyContent: 'center', position: 'relative' },
//   iconBtnText:     { fontSize: 18 },
//   bellBadge:       { position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FF4D6A', borderWidth: 1.5, borderColor: BG, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
//   bellBadgeText:   { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
//   logoutBtn:       { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,77,106,0.10)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.26)' },
//   logoutText:      { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },
//   scroll:          { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },
//   welcomeStrip:    { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(168,85,247,0.20)', backgroundColor: 'rgba(168,85,247,0.06)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
//   welcomeLabel:    { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
//   welcomeName:     { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
//   liveRow:         { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   liveDot:         { width: 6, height: 6, borderRadius: 3, backgroundColor: TEAL },
//   liveText:        { color: TEAL, fontSize: 10, fontWeight: '800' },
//   statsRow:        { flexDirection: 'row', gap: 8, marginBottom: 6 },
//   statsNote:       { color: 'rgba(255,255,255,0.25)', fontSize: 10, marginBottom: 20, paddingHorizontal: 2 },
//   sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
//   sectionEye:      { color: TEAL, fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
//   sectionTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER },
//   refreshBtnText:  { color: TEAL, fontSize: 11, fontWeight: '700' },
//   loadingCard:     { borderRadius: 18, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 26, alignItems: 'center', marginBottom: 14 },
//   loadingText:     { color: TEAL, fontSize: 13, fontWeight: '600' },
//   emptyCard:       { borderRadius: 20, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingVertical: 32, paddingHorizontal: 24, alignItems: 'center', marginBottom: 20 },
//   emptyIconWrap:   { width: 50, height: 50, borderRadius: 25, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
//   emptyIconText:   { color: TEAL, fontSize: 20, fontWeight: '800' },
//   emptyTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   emptySub:        { color: 'rgba(255,255,255,0.42)', fontSize: 12, textAlign: 'center', lineHeight: 18 },
//   liveStrip:       { borderRadius: 16, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   liveStripLabel:  { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
//   liveStripValue:  { color: TEAL, fontSize: 16, fontWeight: '800' },
//   viewAllBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER },
//   viewAllText:     { color: TEAL, fontSize: 11, fontWeight: '700' },
//   quickGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
//   footer:          { borderRadius: 16, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 16, alignItems: 'center' },
//   footerTitle:     { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '700', marginBottom: 3 },
//   footerSub:       { color: 'rgba(255,255,255,0.22)', fontSize: 10 },
// });


// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView,
//   RefreshControl, Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi, fetchAppStatsApi,
//   fetchAdminUnreadCountApi, approveAppApi, rejectAppApi,
// } from '../utils/apiService';
// import { useMarketplace } from '../context/MarketplaceContext';
// import SharedImageCarousel from '../components/SharedImageCarousel';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const BG          = '#0D1117';
// const CARD_BG     = 'rgba(255,255,255,0.04)';
// const BORDER      = 'rgba(255,255,255,0.09)';
// const TEAL        = '#67E6E8';
// const TEAL_DIM    = 'rgba(103,230,232,0.16)';
// const TEAL_BORDER = 'rgba(103,230,232,0.28)';

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
//       <View style={[sStyles.card, { borderColor: accent }]}>
//         <View style={[sStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[sStyles.value, { color }]}>{value}</Text>
//         <Text style={sStyles.label}>{label}</Text>
//       </View>
//     </Animated.View>
//   );
// }
// const sStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, paddingTop: 14, paddingBottom: 16, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
//   topBar: { width: 24, height: 3, borderRadius: 2, marginBottom: 10 },
//   value:  { fontSize: 30, fontWeight: '800', marginBottom: 3 },
//   label:  { color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD
// // ─────────────────────────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(40)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;
//   const CARD_W    = Dimensions.get('window').width - 32;

//   const images = Array.isArray(app.imageUrls) && app.imageUrls.length > 0
//     ? app.imageUrls
//     : app.imageUrl ? [app.imageUrl] : [];

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 100),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 400, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 16 }}>
//       <View style={cStyles.card}>
//         <View style={{ width: '100%' }}>
//           <SharedImageCarousel images={images} width={CARD_W} height={200} />
//           <View style={cStyles.imageBadgeRow} pointerEvents="none">
//             <View style={cStyles.catPill}>
//               <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//             </View>
//             <View style={cStyles.pendingPill}>
//               <View style={cStyles.pendingDot} />
//               <Text style={cStyles.pendingText}>PENDING</Text>
//             </View>
//           </View>
//           <View style={cStyles.priceOverlay} pointerEvents="none">
//             <Text style={cStyles.priceOverlayText}>
//               ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//             </Text>
//           </View>
//         </View>

//         <View style={cStyles.body}>
//           <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>
//           <View style={cStyles.divider} />
//           <View style={cStyles.metaGrid}>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>OWNER</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>PRICE</Text>
//               <Text style={[cStyles.metaVal, { color: TEAL }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>EMAIL</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>PHONE</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {!!app.company && (
//               <View style={cStyles.metaItemFull}>
//                 <Text style={cStyles.metaKey}>COMPANY</Text>
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
//               style={({ pressed }) => [{ flex: 1, borderRadius: 14, overflow: 'hidden' }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cStyles.approveBtn}
//               >
//                 <Text style={cStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// const cStyles = StyleSheet.create({
//   card:            { borderRadius: 20, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, overflow: 'hidden' },
//   imageBadgeRow:   { position: 'absolute', top: 10, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
//   priceOverlay:    { position: 'absolute', bottom: 10, right: 12, backgroundColor: 'rgba(8,12,20,0.80)', borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, zIndex: 10 },
//   priceOverlayText:{ color: TEAL, fontSize: 12, fontWeight: '800' },
//   catPill:         { backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   catText:         { color: TEAL, fontSize: 10, fontWeight: '700' },
//   pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   pendingDot:      { width: 5, height: 5, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:     { color: '#FFB84D', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   body:            { paddingHorizontal: 16, paddingVertical: 14 },
//   title:           { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 5 },
//   desc:            { color: 'rgba(255,255,255,0.50)', fontSize: 13, lineHeight: 18, marginBottom: 12 },
//   divider:         { height: 1, backgroundColor: BORDER, marginBottom: 12 },
//   metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
//   metaItem:        { width: '47%' },
//   metaItemFull:    { width: '100%' },
//   metaKey:         { color: 'rgba(255,255,255,0.30)', fontSize: 9, fontWeight: '700', letterSpacing: 0.6, marginBottom: 2 },
//   metaVal:         { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
//   actionRow:       { flexDirection: 'row', gap: 10 },
//   rejectBtn:       { paddingHorizontal: 18, minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.10)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:      { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
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
//       onPressOut={() => Animated.spring(ps, { toValue: 1,    useNativeDriver: true }).start()}
//       style={{ width: '47.5%' }}
//     >
//       <Animated.View style={[qStyles.card, { borderColor: accent || BORDER, transform: [{ scale: ps }] }]}>
//         <Text style={qStyles.emoji}>{emoji}</Text>
//         <Text style={qStyles.label}>{label}</Text>
//         <Text style={qStyles.sub}>{sublabel}</Text>
//         <Text style={qStyles.arrow}>→</Text>
//       </Animated.View>
//     </Pressable>
//   );
// }
// const qStyles = StyleSheet.create({
//   card:  { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, padding: 14, minHeight: 108, overflow: 'hidden' },
//   emoji: { fontSize: 20, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   sub:   { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 12, bottom: 12, color: TEAL, fontSize: 15, fontWeight: '800' },
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
//   const headerSlide = useRef(new Animated.Value(-16)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 350, useNativeDriver: true }),
//     ]).start();
//     loadData();
//   }, []);

//   // Refresh unread count every time screen comes into focus
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       refreshUnreadCount();
//     });
//     return unsubscribe;
//   }, [navigation]);

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
//       showAlert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   const refreshUnreadCount = async () => {
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
//     showAlert(
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
//               await refreshApps();
//               showAlert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//               setTimeout(refreshUnreadCount, 600);
//             } catch (e) {
//               showAlert('Error', e.message || 'Approve failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleReject = (app) => {
//     showAlert(
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
//               await refreshApps();
//               showAlert('❌ Rejected', `"${app.title}" has been rejected.`);
//               setTimeout(refreshUnreadCount, 600);
//             } catch (e) {
//               showAlert('Error', e.message || 'Reject failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleLogout = () => {
//     showAlert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   const handleBellPress = () => {
//     setUnreadCount(0);
//     navigation.navigate('AdminNotifications');
//   };

//   // ── Navigate to Admin Profile ──
//   const handleProfilePress = () => {
//     navigation.navigate('AdminProfile');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={BG} />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       {/* ── HEADER ── */}
//       <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//         <View style={styles.headerInner}>
//           <View style={styles.headerLeft}>
//             <View style={styles.adminBadge}>
//               <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//             </View>
//             <Text style={styles.headerTitle}>Control Panel</Text>
//             <Text style={styles.headerSub}>Apps Marketplace</Text>
//           </View>
//           <View style={styles.headerRight}>

//             {/* ── Profile Button ── */}
//             <Pressable
//               onPress={handleProfilePress}
//               style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
//             >
//               <View style={styles.profileAvatar}>
//                 <Text style={styles.profileAvatarText}>
//                   {(user?.email?.[0] || 'A').toUpperCase()}
//                 </Text>
//               </View>
//             </Pressable>

//             {/* Bell button */}
//             <Pressable
//               onPress={handleBellPress}
//               style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.iconBtnText}>🔔</Text>
//               {unreadCount > 0 && (
//                 <View style={styles.bellBadge}>
//                   <Text style={styles.bellBadgeText}>
//                     {unreadCount > 9 ? '9+' : String(unreadCount)}
//                   </Text>
//                 </View>
//               )}
//             </Pressable>

//             <Pressable
//               onPress={handleLogout}
//               style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.logoutText}>Logout</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scroll}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor={TEAL}
//               colors={[TEAL]}
//             />
//           }
//         >
//           {/* Welcome strip */}
//           <View style={styles.welcomeStrip}>
//             <View>
//               <Text style={styles.welcomeLabel}>Welcome back</Text>
//               <Text style={styles.welcomeName}>Admin Dashboard</Text>
//             </View>
//             <View style={styles.liveRow}>
//               <View style={styles.liveDot} />
//               <Text style={styles.liveText}>Live</Text>
//             </View>
//           </View>

//           {/* Stats */}
//           <View style={styles.statsRow}>
//             <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.22)"  delay={80}  />
//             <StatCard label="Approved" value={stats.approved} color={TEAL}    accent={TEAL_BORDER}             delay={150} />
//             <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.22)"  delay={220} />
//           </View>
//           <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

//           {/* Section header */}
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//               <Text style={styles.sectionTitle}>
//                 {loading
//                   ? 'Loading...'
//                   : pendingApps.length > 0
//                   ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
//                   : 'All clear ✓'}
//               </Text>
//             </View>
//             <Pressable
//               onPress={loadData}
//               style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.refreshBtnText}>↻  Refresh</Text>
//             </Pressable>
//           </View>

//           {loading && (
//             <View style={styles.loadingCard}>
//               <Text style={styles.loadingText}>Loading apps...</Text>
//             </View>
//           )}

//           {!loading && pendingApps.length === 0 && (
//             <View style={styles.emptyCard}>
//               <View style={styles.emptyIconWrap}>
//                 <Text style={styles.emptyIconText}>✓</Text>
//               </View>
//               <Text style={styles.emptyTitle}>All caught up!</Text>
//               <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
//             </View>
//           )}

//           {!loading && pendingApps.map((app, index) => (
//             <AppReviewCard
//               key={app.id}
//               app={app}
//               index={index}
//               onApprove={handleApprove}
//               onReject={handleReject}
//               actionLoading={actionLoading}
//             />
//           ))}

//           {/* Live strip */}
//           <View style={styles.liveStrip}>
//             <View>
//               <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
//               <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
//             </View>
//             <Pressable
//               onPress={() => navigation.navigate('Apps')}
//               style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.viewAllText}>View all →</Text>
//             </Pressable>
//           </View>

//           {/* Quick actions */}
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//               <Text style={styles.sectionTitle}>Navigate</Text>
//             </View>
//           </View>
//           <View style={styles.quickGrid}>
//             <QuickCard
//               label="All Apps" sublabel="Browse marketplace" emoji="🛒"
//               accent={TEAL_BORDER}
//               onPress={() => navigation.navigate('Apps')}
//             />
//             <QuickCard
//               label="Notifications" sublabel="View all alerts" emoji="🔔"
//               accent="rgba(168,85,247,0.30)"
//               onPress={handleBellPress}
//             />
//             <QuickCard
//               label="Publish App" sublabel="Add directly to marketplace" emoji="⚡"
//               accent="rgba(168,85,247,0.26)"
//               onPress={() => navigation.navigate('UploadApp', { isAdmin: true })}
//             />
//             <QuickCard
//               label="My Profile" sublabel="Email, password, fingerprint" emoji="👤"
//               accent="rgba(103,230,232,0.26)"
//               onPress={handleProfilePress}
//             />
//           </View>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <Text style={styles.footerTitle}>Apps Marketplace</Text>
//             <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//           </View>
//         </ScrollView>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:        { flex: 1, backgroundColor: BG },
//   header:          { backgroundColor: BG, borderBottomWidth: 1, borderBottomColor: BORDER, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 12 },
//   headerInner:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   headerLeft:      { gap: 3 },
//   headerRight:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   adminBadge:      { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(168,85,247,0.20)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.40)' },
//   adminBadgeText:  { color: '#C084FC', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:     { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   headerSub:       { color: 'rgba(255,255,255,0.38)', fontSize: 11 },

//   // Profile avatar button in header
//   iconBtn:           { width: 42, height: 42, borderRadius: 12, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, alignItems: 'center', justifyContent: 'center', position: 'relative' },
//   iconBtnText:       { fontSize: 18 },
//   profileAvatar:     { width: 28, height: 28, borderRadius: 14, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center' },
//   profileAvatarText: { color: TEAL, fontSize: 12, fontWeight: '800' },

//   bellBadge:       { position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FF4D6A', borderWidth: 1.5, borderColor: BG, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
//   bellBadgeText:   { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
//   logoutBtn:       { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,77,106,0.10)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.26)' },
//   logoutText:      { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },
//   scroll:          { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },
//   welcomeStrip:    { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(168,85,247,0.20)', backgroundColor: 'rgba(168,85,247,0.06)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
//   welcomeLabel:    { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
//   welcomeName:     { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
//   liveRow:         { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   liveDot:         { width: 6, height: 6, borderRadius: 3, backgroundColor: TEAL },
//   liveText:        { color: TEAL, fontSize: 10, fontWeight: '800' },
//   statsRow:        { flexDirection: 'row', gap: 8, marginBottom: 6 },
//   statsNote:       { color: 'rgba(255,255,255,0.25)', fontSize: 10, marginBottom: 20, paddingHorizontal: 2 },
//   sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
//   sectionEye:      { color: TEAL, fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
//   sectionTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER },
//   refreshBtnText:  { color: TEAL, fontSize: 11, fontWeight: '700' },
//   loadingCard:     { borderRadius: 18, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 26, alignItems: 'center', marginBottom: 14 },
//   loadingText:     { color: TEAL, fontSize: 13, fontWeight: '600' },
//   emptyCard:       { borderRadius: 20, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingVertical: 32, paddingHorizontal: 24, alignItems: 'center', marginBottom: 20 },
//   emptyIconWrap:   { width: 50, height: 50, borderRadius: 25, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
//   emptyIconText:   { color: TEAL, fontSize: 20, fontWeight: '800' },
//   emptyTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   emptySub:        { color: 'rgba(255,255,255,0.42)', fontSize: 12, textAlign: 'center', lineHeight: 18 },
//   liveStrip:       { borderRadius: 16, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   liveStripLabel:  { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
//   liveStripValue:  { color: TEAL, fontSize: 16, fontWeight: '800' },
//   viewAllBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER },
//   viewAllText:     { color: TEAL, fontSize: 11, fontWeight: '700' },
//   quickGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
//   footer:          { borderRadius: 16, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 16, alignItems: 'center' },
//   footerTitle:     { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '700', marginBottom: 3 },
//   footerSub:       { color: 'rgba(255,255,255,0.22)', fontSize: 10 },
// });


// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Pressable, Animated, Easing, ScrollView,
//   RefreshControl, Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchPendingAppsApi, fetchAppStatsApi,
//   fetchAdminUnreadCountApi, approveAppApi, rejectAppApi,
// } from '../utils/apiService';
// import { useMarketplace } from '../context/MarketplaceContext';
// import SharedImageCarousel from '../components/SharedImageCarousel';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const BG          = '#0D1117';
// const CARD_BG     = 'rgba(255,255,255,0.04)';
// const BORDER      = 'rgba(255,255,255,0.09)';
// const TEAL        = '#67E6E8';
// const TEAL_DIM    = 'rgba(103,230,232,0.16)';
// const TEAL_BORDER = 'rgba(103,230,232,0.28)';

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
//       <View style={[sStyles.card, { borderColor: accent }]}>
//         <View style={[sStyles.topBar, { backgroundColor: color }]} />
//         <Text style={[sStyles.value, { color }]}>{value}</Text>
//         <Text style={sStyles.label}>{label}</Text>
//       </View>
//     </Animated.View>
//   );
// }
// const sStyles = StyleSheet.create({
//   wrap:   { flex: 1 },
//   card:   { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, paddingTop: 14, paddingBottom: 16, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
//   topBar: { width: 24, height: 3, borderRadius: 2, marginBottom: 10 },
//   value:  { fontSize: 30, fontWeight: '800', marginBottom: 3 },
//   label:  { color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4 },
// });

// // ─────────────────────────────────────────────────
// // APP REVIEW CARD
// // ─────────────────────────────────────────────────
// function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
//   const slideAnim = useRef(new Animated.Value(40)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;
//   const isLoading = actionLoading === app.id;
//   const CARD_W    = Dimensions.get('window').width - 32;

//   const images = Array.isArray(app.imageUrls) && app.imageUrls.length > 0
//     ? app.imageUrls
//     : app.imageUrl ? [app.imageUrl] : [];

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 100),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(opAnim,   { toValue: 1, duration: 400, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 16 }}>
//       <View style={cStyles.card}>
//         <View style={{ width: '100%' }}>
//           <SharedImageCarousel images={images} width={CARD_W} height={200} />
//           <View style={cStyles.imageBadgeRow} pointerEvents="none">
//             <View style={cStyles.catPill}>
//               <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
//             </View>
//             <View style={cStyles.pendingPill}>
//               <View style={cStyles.pendingDot} />
//               <Text style={cStyles.pendingText}>PENDING</Text>
//             </View>
//           </View>
//           <View style={cStyles.priceOverlay} pointerEvents="none">
//             <Text style={cStyles.priceOverlayText}>
//               ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//             </Text>
//           </View>
//         </View>

//         <View style={cStyles.body}>
//           <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
//           <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>
//           <View style={cStyles.divider} />
//           <View style={cStyles.metaGrid}>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>OWNER</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>PRICE</Text>
//               <Text style={[cStyles.metaVal, { color: TEAL }]}>
//                 ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
//               </Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>EMAIL</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
//             </View>
//             <View style={cStyles.metaItem}>
//               <Text style={cStyles.metaKey}>PHONE</Text>
//               <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
//             </View>
//             {!!app.company && (
//               <View style={cStyles.metaItemFull}>
//                 <Text style={cStyles.metaKey}>COMPANY</Text>
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
//               style={({ pressed }) => [{ flex: 1, borderRadius: 14, overflow: 'hidden' }, pressed && { opacity: 0.85 }]}
//             >
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 style={cStyles.approveBtn}
//               >
//                 <Text style={cStyles.approveText}>
//                   {isLoading ? 'Processing...' : '✓  Approve & Publish'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// const cStyles = StyleSheet.create({
//   card:            { borderRadius: 20, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, overflow: 'hidden' },
//   imageBadgeRow:   { position: 'absolute', top: 10, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
//   priceOverlay:    { position: 'absolute', bottom: 10, right: 12, backgroundColor: 'rgba(8,12,20,0.80)', borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, zIndex: 10 },
//   priceOverlayText:{ color: TEAL, fontSize: 12, fontWeight: '800' },
//   catPill:         { backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   catText:         { color: TEAL, fontSize: 10, fontWeight: '700' },
//   pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   pendingDot:      { width: 5, height: 5, borderRadius: 3, backgroundColor: '#FFB84D' },
//   pendingText:     { color: '#FFB84D', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   body:            { paddingHorizontal: 16, paddingVertical: 14 },
//   title:           { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 5 },
//   desc:            { color: 'rgba(255,255,255,0.50)', fontSize: 13, lineHeight: 18, marginBottom: 12 },
//   divider:         { height: 1, backgroundColor: BORDER, marginBottom: 12 },
//   metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
//   metaItem:        { width: '47%' },
//   metaItemFull:    { width: '100%' },
//   metaKey:         { color: 'rgba(255,255,255,0.30)', fontSize: 9, fontWeight: '700', letterSpacing: 0.6, marginBottom: 2 },
//   metaVal:         { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
//   actionRow:       { flexDirection: 'row', gap: 10 },
//   rejectBtn:       { paddingHorizontal: 18, minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.10)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
//   approveBtn:      { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
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
//       onPressOut={() => Animated.spring(ps, { toValue: 1,    useNativeDriver: true }).start()}
//       style={{ width: '47.5%' }}
//     >
//       <Animated.View style={[qStyles.card, { borderColor: accent || BORDER, transform: [{ scale: ps }] }]}>
//         <Text style={qStyles.emoji}>{emoji}</Text>
//         <Text style={qStyles.label}>{label}</Text>
//         <Text style={qStyles.sub}>{sublabel}</Text>
//         <Text style={qStyles.arrow}>→</Text>
//       </Animated.View>
//     </Pressable>
//   );
// }
// const qStyles = StyleSheet.create({
//   card:  { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, padding: 14, minHeight: 108, overflow: 'hidden' },
//   emoji: { fontSize: 20, marginBottom: 8 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
//   sub:   { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '500' },
//   arrow: { position: 'absolute', right: 12, bottom: 12, color: TEAL, fontSize: 15, fontWeight: '800' },
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
//   const headerSlide = useRef(new Animated.Value(-16)).current;
//   const contentFade = useRef(new Animated.Value(0)).current;
//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(headerFade,  { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//         Animated.timing(headerSlide, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       ]),
//       Animated.timing(contentFade, { toValue: 1, duration: 350, useNativeDriver: true }),
//     ]).start();
//     loadData();
//   }, []);

//   // Refresh unread count every time screen comes into focus
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       refreshUnreadCount();
//     });
//     return unsubscribe;
//   }, [navigation]);

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
//       showAlert('Error', 'Could not load data. Pull down to retry.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   }, []);

//   const refreshUnreadCount = async () => {
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
//     showAlert(
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
//               await refreshApps();
//               showAlert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
//               setTimeout(refreshUnreadCount, 600);
//             } catch (e) {
//               showAlert('Error', e.message || 'Approve failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleReject = (app) => {
//     showAlert(
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
//               await refreshApps();
//               showAlert('❌ Rejected', `"${app.title}" has been rejected.`);
//               setTimeout(refreshUnreadCount, 600);
//             } catch (e) {
//               showAlert('Error', e.message || 'Reject failed. Try again.');
//             } finally {
//               setActionLoading(null);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleLogout = () => {
//     showAlert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//     ]);
//   };

//   const handleBellPress = () => {
//     setUnreadCount(0);
//     navigation.navigate('AdminNotifications');
//   };

//   // ── Navigate to Admin Profile ──
//   const handleProfilePress = () => {
//     navigation.navigate('AdminProfile');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={BG} />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       {/* ── HEADER ── */}
//       <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//         <View style={styles.headerInner}>
//           <View style={styles.headerLeft}>
//             <View style={styles.adminBadge}>
//               <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//             </View>
//             <Text style={styles.headerTitle}>Control Panel</Text>
//             <Text style={styles.headerSub}>Apps Marketplace</Text>
//           </View>
//           <View style={styles.headerRight}>

//             {/* ── Profile Button ── */}
//             <Pressable
//               onPress={handleProfilePress}
//               style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
//             >
//               <View style={styles.profileAvatar}>
//                 <Text style={styles.profileAvatarText}>
//                   {(user?.email?.[0] || 'A').toUpperCase()}
//                 </Text>
//               </View>
//             </Pressable>

//             {/* Bell button */}
//             <Pressable
//               onPress={handleBellPress}
//               style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.iconBtnText}>🔔</Text>
//               {unreadCount > 0 && (
//                 <View style={styles.bellBadge}>
//                   <Text style={styles.bellBadgeText}>
//                     {unreadCount > 9 ? '9+' : String(unreadCount)}
//                   </Text>
//                 </View>
//               )}
//             </Pressable>

//             <Pressable
//               onPress={handleLogout}
//               style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.logoutText}>Logout</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scroll}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor={TEAL}
//               colors={[TEAL]}
//             />
//           }
//         >
//           {/* Welcome strip */}
//           <View style={styles.welcomeStrip}>
//             <View>
//               <Text style={styles.welcomeLabel}>Welcome back</Text>
//               <Text style={styles.welcomeName}>Admin Dashboard</Text>
//             </View>
//             <View style={styles.liveRow}>
//               <View style={styles.liveDot} />
//               <Text style={styles.liveText}>Live</Text>
//             </View>
//           </View>

//           {/* Stats */}
//           <View style={styles.statsRow}>
//             <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.22)"  delay={80}  />
//             <StatCard label="Approved" value={stats.approved} color={TEAL}    accent={TEAL_BORDER}             delay={150} />
//             <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.22)"  delay={220} />
//           </View>
//           <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

//           {/* Section header */}
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionEye}>PENDING REVIEW</Text>
//               <Text style={styles.sectionTitle}>
//                 {loading
//                   ? 'Loading...'
//                   : pendingApps.length > 0
//                   ? `${pendingApps.length} app${pendingApps.length !== 1 ? 's' : ''} waiting`
//                   : 'All clear ✓'}
//               </Text>
//             </View>
//             <Pressable
//               onPress={loadData}
//               style={({ pressed }) => [styles.refreshBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.refreshBtnText}>↻  Refresh</Text>
//             </Pressable>
//           </View>

//           {loading && (
//             <View style={styles.loadingCard}>
//               <Text style={styles.loadingText}>Loading apps...</Text>
//             </View>
//           )}

//           {!loading && pendingApps.length === 0 && (
//             <View style={styles.emptyCard}>
//               <View style={styles.emptyIconWrap}>
//                 <Text style={styles.emptyIconText}>✓</Text>
//               </View>
//               <Text style={styles.emptyTitle}>All caught up!</Text>
//               <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
//             </View>
//           )}

//           {!loading && pendingApps.map((app, index) => (
//             <AppReviewCard
//               key={app.id}
//               app={app}
//               index={index}
//               onApprove={handleApprove}
//               onReject={handleReject}
//               actionLoading={actionLoading}
//             />
//           ))}

//           {/* Live strip */}
//           <View style={styles.liveStrip}>
//             <View>
//               <Text style={styles.liveStripLabel}>Apps live in marketplace</Text>
//               <Text style={styles.liveStripValue}>{stats.approved} apps</Text>
//             </View>
//             <Pressable
//               onPress={() => navigation.navigate('Apps')}
//               style={({ pressed }) => [styles.viewAllBtn, pressed && { opacity: 0.7 }]}
//             >
//               <Text style={styles.viewAllText}>View all →</Text>
//             </Pressable>
//           </View>

//           {/* Quick actions */}
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
//               <Text style={styles.sectionTitle}>Navigate</Text>
//             </View>
//           </View>
//           <View style={styles.quickGrid}>
//             <QuickCard
//               label="All Apps" sublabel="Browse marketplace" emoji="🛒"
//               accent={TEAL_BORDER}
//               onPress={() => navigation.navigate('Apps')}
//             />
//             <QuickCard
//               label="Notifications" sublabel="View all alerts" emoji="🔔"
//               accent="rgba(168,85,247,0.30)"
//               onPress={handleBellPress}
//             />
//             <QuickCard
//               label="Publish App" sublabel="Add directly to marketplace" emoji="⚡"
//               accent="rgba(168,85,247,0.26)"
//               onPress={() => navigation.navigate('UploadApp', { isAdmin: true })}
//             />
//             <QuickCard
//               label="My Profile" sublabel="Email, password, fingerprint" emoji="👤"
//               accent="rgba(103,230,232,0.26)"
//               onPress={handleProfilePress}
//             />
//           </View>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <Text style={styles.footerTitle}>Apps Marketplace</Text>
//             <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
//           </View>
//         </ScrollView>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:        { flex: 1, backgroundColor: BG },
//   header:          { backgroundColor: BG, borderBottomWidth: 1, borderBottomColor: BORDER, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 12 },
//   headerInner:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   headerLeft:      { gap: 3 },
//   headerRight:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   adminBadge:      { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(168,85,247,0.20)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.40)' },
//   adminBadgeText:  { color: '#C084FC', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:     { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
//   headerSub:       { color: 'rgba(255,255,255,0.38)', fontSize: 11 },

//   // Profile avatar button in header
//   iconBtn:           { width: 42, height: 42, borderRadius: 12, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, alignItems: 'center', justifyContent: 'center', position: 'relative' },
//   iconBtnText:       { fontSize: 18 },
//   profileAvatar:     { width: 28, height: 28, borderRadius: 14, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center' },
//   profileAvatarText: { color: TEAL, fontSize: 12, fontWeight: '800' },

//   bellBadge:       { position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FF4D6A', borderWidth: 1.5, borderColor: BG, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
//   bellBadgeText:   { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
//   logoutBtn:       { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,77,106,0.10)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.26)' },
//   logoutText:      { color: '#FF4D6A', fontSize: 12, fontWeight: '800' },
//   scroll:          { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },
//   welcomeStrip:    { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(168,85,247,0.20)', backgroundColor: 'rgba(168,85,247,0.06)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
//   welcomeLabel:    { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
//   welcomeName:     { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
//   liveRow:         { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
//   liveDot:         { width: 6, height: 6, borderRadius: 3, backgroundColor: TEAL },
//   liveText:        { color: TEAL, fontSize: 10, fontWeight: '800' },
//   statsRow:        { flexDirection: 'row', gap: 8, marginBottom: 6 },
//   statsNote:       { color: 'rgba(255,255,255,0.25)', fontSize: 10, marginBottom: 20, paddingHorizontal: 2 },
//   sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
//   sectionEye:      { color: TEAL, fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
//   sectionTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
//   refreshBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER },
//   refreshBtnText:  { color: TEAL, fontSize: 11, fontWeight: '700' },
//   loadingCard:     { borderRadius: 18, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 26, alignItems: 'center', marginBottom: 14 },
//   loadingText:     { color: TEAL, fontSize: 13, fontWeight: '600' },
//   emptyCard:       { borderRadius: 20, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingVertical: 32, paddingHorizontal: 24, alignItems: 'center', marginBottom: 20 },
//   emptyIconWrap:   { width: 50, height: 50, borderRadius: 25, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
//   emptyIconText:   { color: TEAL, fontSize: 20, fontWeight: '800' },
//   emptyTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
//   emptySub:        { color: 'rgba(255,255,255,0.42)', fontSize: 12, textAlign: 'center', lineHeight: 18 },
//   liveStrip:       { borderRadius: 16, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   liveStripLabel:  { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
//   liveStripValue:  { color: TEAL, fontSize: 16, fontWeight: '800' },
//   viewAllBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER },
//   viewAllText:     { color: TEAL, fontSize: 11, fontWeight: '700' },
//   quickGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
//   footer:          { borderRadius: 16, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 16, alignItems: 'center' },
//   footerTitle:     { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '700', marginBottom: 3 },
//   footerSub:       { color: 'rgba(255,255,255,0.22)', fontSize: 10 },
// });


import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  Pressable, Animated, Easing, ScrollView,
  RefreshControl, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  fetchPendingAppsApi, fetchAppStatsApi,
  fetchAdminUnreadCountApi, approveAppApi, rejectAppApi,
} from '../utils/apiService';
import { useMarketplace } from '../context/MarketplaceContext';
import SharedImageCarousel from '../components/SharedImageCarousel';
import useCustomAlert from '../utils/useCustomAlert';
import CustomAlertModal from '../components/CustomAlertModal';

const BG          = '#0D1117';
const CARD_BG     = 'rgba(255,255,255,0.04)';
const BORDER      = 'rgba(255,255,255,0.09)';
const TEAL        = '#67E6E8';
const TEAL_DIM    = 'rgba(103,230,232,0.16)';
const TEAL_BORDER = 'rgba(103,230,232,0.28)';

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
      <View style={[sStyles.card, { borderColor: accent }]}>
        <View style={[sStyles.topBar, { backgroundColor: color }]} />
        <Text style={[sStyles.value, { color }]}>{value}</Text>
        <Text style={sStyles.label}>{label}</Text>
      </View>
    </Animated.View>
  );
}
const sStyles = StyleSheet.create({
  wrap:   { flex: 1 },
  card:   { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, paddingTop: 14, paddingBottom: 16, paddingHorizontal: 8, alignItems: 'center', overflow: 'hidden' },
  topBar: { width: 24, height: 3, borderRadius: 2, marginBottom: 10 },
  value:  { fontSize: 30, fontWeight: '800', marginBottom: 3 },
  label:  { color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: '600', letterSpacing: 0.4 },
});

// ─────────────────────────────────────────────────
// APP REVIEW CARD
// ─────────────────────────────────────────────────
function AppReviewCard({ app, index, onApprove, onReject, actionLoading }) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opAnim    = useRef(new Animated.Value(0)).current;
  const isLoading = actionLoading === app.id;
  const CARD_W    = Dimensions.get('window').width - 32;

  const images = Array.isArray(app.imageUrls) && app.imageUrls.length > 0
    ? app.imageUrls
    : app.imageUrl ? [app.imageUrl] : [];

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 100),
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(opAnim,   { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }], marginBottom: 16 }}>
      <View style={cStyles.card}>
        <View style={{ width: '100%' }}>
          <SharedImageCarousel images={images} width={CARD_W} height={200} />
          <View style={cStyles.imageBadgeRow} pointerEvents="none">
            <View style={cStyles.catPill}>
              <Text style={cStyles.catText}>{app.category || 'Uncategorized'}</Text>
            </View>
            <View style={cStyles.pendingPill}>
              <View style={cStyles.pendingDot} />
              <Text style={cStyles.pendingText}>PENDING</Text>
            </View>
          </View>
          <View style={cStyles.priceOverlay} pointerEvents="none">
            <Text style={cStyles.priceOverlayText}>
              ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
            </Text>
          </View>
        </View>

        <View style={cStyles.body}>
          <Text style={cStyles.title} numberOfLines={1}>{app.title}</Text>
          <Text style={cStyles.desc}  numberOfLines={2}>{app.description}</Text>
          <View style={cStyles.divider} />
          <View style={cStyles.metaGrid}>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>OWNER</Text>
              <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerName || '—'}</Text>
            </View>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>PRICE</Text>
              <Text style={[cStyles.metaVal, { color: TEAL }]}>
                ₹{app.price ? Number(app.price).toLocaleString('en-IN') : '0'}
              </Text>
            </View>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>EMAIL</Text>
              <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerEmail || '—'}</Text>
            </View>
            <View style={cStyles.metaItem}>
              <Text style={cStyles.metaKey}>PHONE</Text>
              <Text style={cStyles.metaVal} numberOfLines={1}>{app.ownerPhone || '—'}</Text>
            </View>
            {!!app.company && (
              <View style={cStyles.metaItemFull}>
                <Text style={cStyles.metaKey}>COMPANY</Text>
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
              style={({ pressed }) => [{ flex: 1, borderRadius: 14, overflow: 'hidden' }, pressed && { opacity: 0.85 }]}
            >
              <LinearGradient
                colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={cStyles.approveBtn}
              >
                <Text style={cStyles.approveText}>
                  {isLoading ? 'Processing...' : '✓  Approve & Publish'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const cStyles = StyleSheet.create({
  card:            { borderRadius: 20, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, overflow: 'hidden' },
  imageBadgeRow:   { position: 'absolute', top: 10, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
  priceOverlay:    { position: 'absolute', bottom: 10, right: 12, backgroundColor: 'rgba(8,12,20,0.80)', borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, zIndex: 10 },
  priceOverlayText:{ color: TEAL, fontSize: 12, fontWeight: '800' },
  catPill:         { backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  catText:         { color: TEAL, fontSize: 10, fontWeight: '700' },
  pendingPill:     { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,184,77,0.13)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.30)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  pendingDot:      { width: 5, height: 5, borderRadius: 3, backgroundColor: '#FFB84D' },
  pendingText:     { color: '#FFB84D', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  body:            { paddingHorizontal: 16, paddingVertical: 14 },
  title:           { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 5 },
  desc:            { color: 'rgba(255,255,255,0.50)', fontSize: 13, lineHeight: 18, marginBottom: 12 },
  divider:         { height: 1, backgroundColor: BORDER, marginBottom: 12 },
  metaGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  metaItem:        { width: '47%' },
  metaItemFull:    { width: '100%' },
  metaKey:         { color: 'rgba(255,255,255,0.30)', fontSize: 9, fontWeight: '700', letterSpacing: 0.6, marginBottom: 2 },
  metaVal:         { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  actionRow:       { flexDirection: 'row', gap: 10 },
  rejectBtn:       { paddingHorizontal: 18, minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,77,106,0.10)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
  rejectText:      { color: '#FF4D6A', fontSize: 13, fontWeight: '800' },
  approveBtn:      { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
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
      onPressOut={() => Animated.spring(ps, { toValue: 1,    useNativeDriver: true }).start()}
      style={{ width: '47.5%' }}
    >
      <Animated.View style={[qStyles.card, { borderColor: accent || BORDER, transform: [{ scale: ps }] }]}>
        <Text style={qStyles.emoji}>{emoji}</Text>
        <Text style={qStyles.label}>{label}</Text>
        <Text style={qStyles.sub}>{sublabel}</Text>
        <Text style={qStyles.arrow}>→</Text>
      </Animated.View>
    </Pressable>
  );
}
const qStyles = StyleSheet.create({
  card:  { borderRadius: 18, borderWidth: 1, backgroundColor: CARD_BG, padding: 14, minHeight: 108, overflow: 'hidden' },
  emoji: { fontSize: 20, marginBottom: 8 },
  label: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  sub:   { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '500' },
  arrow: { position: 'absolute', right: 12, bottom: 12, color: TEAL, fontSize: 15, fontWeight: '800' },
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
  const headerSlide = useRef(new Animated.Value(-16)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const { alertConfig, showAlert, hideAlert } = useCustomAlert();

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerFade,  { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.timing(contentFade, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start();
    loadData();
  }, []);

  // Refresh unread count every time screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshUnreadCount();
    });
    return unsubscribe;
  }, [navigation]);

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
      showAlert('Error', 'Could not load data. Pull down to retry.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const refreshUnreadCount = async () => {
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
    showAlert(
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
              showAlert('✅ Published!', `"${app.title}" is now live in the marketplace.`);
              setTimeout(refreshUnreadCount, 600);
            } catch (e) {
              showAlert('Error', e.message || 'Approve failed. Try again.');
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  const handleReject = (app) => {
    showAlert(
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
              showAlert('❌ Rejected', `"${app.title}" has been rejected.`);
              setTimeout(refreshUnreadCount, 600);
            } catch (e) {
              showAlert('Error', e.message || 'Reject failed. Try again.');
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  const handleBellPress = () => {
    setUnreadCount(0);
    navigation.navigate('AdminNotifications');
  };

  const handleProfilePress = () => {
    navigation.navigate('AdminProfile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      <CustomAlertModal config={alertConfig} onHide={hideAlert} />

      {/* ── HEADER ── */}
      <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
        <View style={styles.headerInner}>
          <View style={styles.headerLeft}>
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
            </View>
            <Text style={styles.headerTitle}>Control Panel</Text>
            <Text style={styles.headerSub}>Apps Marketplace</Text>
          </View>

          {/* ── HEADER RIGHT: Bell → Profile (Logout removed) ── */}
          <View style={styles.headerRight}>

            {/* Bell button */}
            <Pressable
              onPress={handleBellPress}
              style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.iconBtnText}>🔔</Text>
              {unreadCount > 0 && (
                <View style={styles.bellBadge}>
                  <Text style={styles.bellBadgeText}>
                    {unreadCount > 9 ? '9+' : String(unreadCount)}
                  </Text>
                </View>
              )}
            </Pressable>

            {/* Profile Button — moved to right end */}
            <Pressable
              onPress={handleProfilePress}
              style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
            >
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>
                  {(user?.email?.[0] || 'A').toUpperCase()}
                </Text>
              </View>
            </Pressable>

          </View>
        </View>
      </Animated.View>

      <Animated.View style={[{ flex: 1 }, { opacity: contentFade }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={TEAL}
              colors={[TEAL]}
            />
          }
        >
          {/* Welcome strip */}
          <View style={styles.welcomeStrip}>
            <View>
              <Text style={styles.welcomeLabel}>Welcome back</Text>
              <Text style={styles.welcomeName}>Admin Dashboard</Text>
            </View>
            <View style={styles.liveRow}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <StatCard label="Pending"  value={stats.pending}  color="#FFB84D" accent="rgba(255,184,77,0.22)"  delay={80}  />
            <StatCard label="Approved" value={stats.approved} color={TEAL}    accent={TEAL_BORDER}             delay={150} />
            <StatCard label="Rejected" value={stats.rejected} color="#FF4D6A" accent="rgba(255,77,106,0.22)"  delay={220} />
          </View>
          <Text style={styles.statsNote}>All-time totals · pull down to refresh</Text>

          {/* Section header */}
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
            <View style={styles.loadingCard}>
              <Text style={styles.loadingText}>Loading apps...</Text>
            </View>
          )}

          {!loading && pendingApps.length === 0 && (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconWrap}>
                <Text style={styles.emptyIconText}>✓</Text>
              </View>
              <Text style={styles.emptyTitle}>All caught up!</Text>
              <Text style={styles.emptySub}>No apps waiting for review.{'\n'}Pull down to refresh.</Text>
            </View>
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

          {/* Live strip */}
          <View style={styles.liveStrip}>
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
          </View>

          {/* Quick actions */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEye}>QUICK ACTIONS</Text>
              <Text style={styles.sectionTitle}>Navigate</Text>
            </View>
          </View>
          <View style={styles.quickGrid}>
            <QuickCard
              label="All Apps" sublabel="Browse marketplace" emoji="🛒"
              accent={TEAL_BORDER}
              onPress={() => navigation.navigate('Apps')}
            />
            <QuickCard
              label="Notifications" sublabel="View all alerts" emoji="🔔"
              accent="rgba(168,85,247,0.30)"
              onPress={handleBellPress}
            />
            <QuickCard
              label="Publish App" sublabel="Add directly to marketplace" emoji="⚡"
              accent="rgba(168,85,247,0.26)"
              onPress={() => navigation.navigate('UploadApp', { isAdmin: true })}
            />
            <QuickCard
              label="My Profile" sublabel="Email, password, fingerprint" emoji="👤"
              accent="rgba(103,230,232,0.26)"
              onPress={handleProfilePress}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Apps Marketplace</Text>
            <Text style={styles.footerSub}>Admin Panel · Pull down to refresh</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:        { flex: 1, backgroundColor: BG },
  header:          { backgroundColor: BG, borderBottomWidth: 1, borderBottomColor: BORDER, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 12 },
  headerInner:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft:      { gap: 3 },
  headerRight:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
  adminBadge:      { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(168,85,247,0.20)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.40)' },
  adminBadgeText:  { color: '#C084FC', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  headerTitle:     { color: '#FFFFFF', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  headerSub:       { color: 'rgba(255,255,255,0.38)', fontSize: 11 },

  iconBtn:           { width: 42, height: 42, borderRadius: 12, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  iconBtnText:       { fontSize: 18 },
  profileAvatar:     { width: 28, height: 28, borderRadius: 14, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { color: TEAL, fontSize: 12, fontWeight: '800' },

  bellBadge:       { position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FF4D6A', borderWidth: 1.5, borderColor: BG, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  bellBadgeText:   { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
  scroll:          { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 56 },
  welcomeStrip:    { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(168,85,247,0.20)', backgroundColor: 'rgba(168,85,247,0.06)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  welcomeLabel:    { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
  welcomeName:     { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  liveRow:         { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  liveDot:         { width: 6, height: 6, borderRadius: 3, backgroundColor: TEAL },
  liveText:        { color: TEAL, fontSize: 10, fontWeight: '800' },
  statsRow:        { flexDirection: 'row', gap: 8, marginBottom: 6 },
  statsNote:       { color: 'rgba(255,255,255,0.25)', fontSize: 10, marginBottom: 20, paddingHorizontal: 2 },
  sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  sectionEye:      { color: TEAL, fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
  sectionTitle:    { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  refreshBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER },
  refreshBtnText:  { color: TEAL, fontSize: 11, fontWeight: '700' },
  loadingCard:     { borderRadius: 18, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 26, alignItems: 'center', marginBottom: 14 },
  loadingText:     { color: TEAL, fontSize: 13, fontWeight: '600' },
  emptyCard:       { borderRadius: 20, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingVertical: 32, paddingHorizontal: 24, alignItems: 'center', marginBottom: 20 },
  emptyIconWrap:   { width: 50, height: 50, borderRadius: 25, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  emptyIconText:   { color: TEAL, fontSize: 20, fontWeight: '800' },
  emptyTitle:      { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 5 },
  emptySub:        { color: 'rgba(255,255,255,0.42)', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  liveStrip:       { borderRadius: 16, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: 'rgba(103,230,232,0.05)', paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  liveStripLabel:  { color: 'rgba(255,255,255,0.40)', fontSize: 10, fontWeight: '600', marginBottom: 2 },
  liveStripValue:  { color: TEAL, fontSize: 16, fontWeight: '800' },
  viewAllBtn:      { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER },
  viewAllText:     { color: TEAL, fontSize: 11, fontWeight: '700' },
  quickGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  footer:          { borderRadius: 16, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD_BG, paddingVertical: 16, alignItems: 'center' },
  footerTitle:     { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: '700', marginBottom: 3 },
  footerSub:       { color: 'rgba(255,255,255,0.22)', fontSize: 10 },
});
