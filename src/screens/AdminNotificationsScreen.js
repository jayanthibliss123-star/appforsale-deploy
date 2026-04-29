// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   FlatList, Pressable, RefreshControl, Animated,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { fetchNotificationsByRoleApi, markAllNotificationsReadApi } from '../utils/apiService';

// function AdminNotifCard({ item, index }) {
//   const slideAnim = React.useRef(new Animated.Value(30)).current;
//   const opAnim    = React.useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 80),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 380, useNativeDriver: true }),
//         Animated.timing(opAnim,    { toValue: 1, duration: 380, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   const isSubmission = item.type === 'SUBMISSION';
//   const isApproval   = item.type === 'APPROVAL';

//   const accentColor = isSubmission ? '#FFB84D' : isApproval ? '#67E6E8' : '#FF4D6A';
//   const icon        = isSubmission ? '↑' : isApproval ? '✓' : '✕';

//   const dateStr = item.createdAt
//     ? new Date(item.createdAt).toLocaleDateString('en-IN', {
//         day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
//       })
//     : '';

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }] }}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.02)']}
//         style={[styles.card, { borderColor: accentColor + '33' }]}
//       >
//         <View style={styles.shine} />
//         <View style={styles.cardRow}>
//           <View style={[styles.iconCircle, { backgroundColor: accentColor + '18', borderColor: accentColor + '40' }]}>
//             <Text style={[styles.iconText, { color: accentColor }]}>{icon}</Text>
//           </View>
//           <View style={styles.cardBody}>
//             <View style={styles.cardTopRow}>
//               <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
//               {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: accentColor }]} />}
//             </View>
//             <Text style={styles.cardMessage} numberOfLines={2}>{item.message}</Text>
//             {dateStr ? <Text style={styles.cardDate}>{dateStr}</Text> : null}
//           </View>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// export default function AdminNotificationsScreen({ navigation }) {
//   const [notifications, setNotifications] = useState([]);
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);

//   const loadNotifications = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchNotificationsByRoleApi('ADMIN');
//       setNotifications(data);
//       await markAllNotificationsReadApi('ADMIN');
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { loadNotifications(); }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadNotifications();
//     setRefreshing(false);
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />

//       <LinearGradient
//         colors={['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.025)']}
//         style={styles.header}
//       >
//         <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Text style={styles.backText}>←</Text>
//         </Pressable>
//         <View style={styles.headerTextWrap}>
//           <LinearGradient
//             colors={['#A855F7', '#7E22CE']}
//             style={styles.adminBadge}
//           >
//             <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//           </LinearGradient>
//           <Text style={styles.headerTitle}>Notifications</Text>
//           <Text style={styles.headerSub}>{notifications.length} total</Text>
//         </View>
//       </LinearGradient>

//       {loading ? (
//         <View style={styles.center}>
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={notifications}
//           keyExtractor={(item) => String(item.id)}
//           contentContainerStyle={styles.list}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor="#67E6E8"
//               colors={['#67E6E8']}
//             />
//           }
//           ListEmptyComponent={
//             <View style={styles.emptyWrap}>
//               <Text style={styles.emptyIcon}>🔔</Text>
//               <Text style={styles.emptyTitle}>No notifications</Text>
//               <Text style={styles.emptySub}>New app submissions will appear here.</Text>
//             </View>
//           }
//           renderItem={({ item, index }) => <AdminNotifCard item={item} index={index} />}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:        { flex: 1, backgroundColor: '#0E1420' },
//   header:          { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)' },
//   backBtn:         { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)' },
//   backText:        { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
//   headerTextWrap:  { gap: 3 },
//   adminBadge:      { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   adminBadgeText:  { color: '#FFFFFF', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:     { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
//   headerSub:       { color: 'rgba(255,255,255,0.45)', fontSize: 12 },
//   list:            { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 },
//   card:            { borderRadius: 20, borderWidth: 1, padding: 14, marginBottom: 10, overflow: 'hidden' },
//   shine:           { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
//   cardRow:         { flexDirection: 'row', gap: 12 },
//   iconCircle:      { width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
//   iconText:        { fontSize: 15, fontWeight: '800' },
//   cardBody:        { flex: 1 },
//   cardTopRow:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
//   cardTitle:       { color: '#FFFFFF', fontSize: 13, fontWeight: '800', flex: 1, marginRight: 8 },
//   unreadDot:       { width: 8, height: 8, borderRadius: 4 },
//   cardMessage:     { color: 'rgba(255,255,255,0.58)', fontSize: 12, lineHeight: 18, marginBottom: 5 },
//   cardDate:        { color: 'rgba(255,255,255,0.30)', fontSize: 10 },
//   center:          { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   loadingText:     { color: '#67E6E8', fontSize: 14 },
//   emptyWrap:       { paddingTop: 80, alignItems: 'center', paddingHorizontal: 32 },
//   emptyIcon:       { fontSize: 36, marginBottom: 14 },
//   emptyTitle:      { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 8 },
//   emptySub:        { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },
// });
// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   FlatList, Pressable, RefreshControl, Animated,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import {
//   fetchNotificationsByRoleApi,
//   markAllNotificationsReadApi,
// } from '../utils/apiService';

// function AdminNotifCard({ item, index }) {
//   const slideAnim = useRef(new Animated.Value(28)).current;
//   const opAnim    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.delay(index * 70),
//       Animated.parallel([
//         Animated.timing(slideAnim, { toValue: 0, duration: 360, useNativeDriver: true }),
//         Animated.timing(opAnim,    { toValue: 1, duration: 360, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   const isSubmission = item.type === 'SUBMISSION';
//   const isApproved   = item.type === 'APPROVED';
//   const isRejected   = item.type === 'REJECTED';

//   const accentColor = isSubmission ? '#FFB84D' : isApproved ? '#67E6E8' : '#FF4D6A';
//   const bgColor     = isSubmission
//     ? 'rgba(255,184,77,0.08)' : isApproved
//     ? 'rgba(103,230,232,0.08)' : 'rgba(255,77,106,0.08)';
//   const borderColor = isSubmission
//     ? 'rgba(255,184,77,0.22)' : isApproved
//     ? 'rgba(103,230,232,0.22)' : 'rgba(255,77,106,0.22)';
//   const icon = isSubmission ? '↑' : isApproved ? '✓' : '✕';

//   const dateStr = item.createdAt
//     ? new Date(item.createdAt).toLocaleString('en-IN', {
//         day: 'numeric', month: 'short',
//         hour: '2-digit', minute: '2-digit',
//       })
//     : '';

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }] }}>
//       <View style={[styles.card, { backgroundColor: bgColor, borderColor }]}>
//         <View style={styles.cardLeft}>
//           <View style={[styles.iconCircle, { backgroundColor: accentColor + '20', borderColor: accentColor + '50' }]}>
//             <Text style={[styles.iconText, { color: accentColor }]}>{icon}</Text>
//           </View>
//           {!item.isRead && <View style={[styles.unreadLine, { backgroundColor: accentColor }]} />}
//         </View>
//         <View style={styles.cardBody}>
//           <View style={styles.cardTopRow}>
//             <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
//             {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: accentColor }]} />}
//           </View>
//           <Text style={styles.cardMsg} numberOfLines={3}>{item.message}</Text>
//           {!!dateStr && <Text style={styles.cardDate}>{dateStr}</Text>}
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// export default function AdminNotificationsScreen({ navigation }) {
//   const [notifications, setNotifications] = useState([]);
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);
//   const [unreadCount,   setUnreadCount]   = useState(0);

//   const loadNotifications = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchNotificationsByRoleApi('ADMIN');
//       setNotifications(data);
//       setUnreadCount(data.filter((n) => !n.isRead).length);
//       // Mark all read after viewing
//       await markAllNotificationsReadApi('ADMIN');
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { loadNotifications(); }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadNotifications();
//     setRefreshing(false);
//   }, []);

//   const submissions = notifications.filter((n) => n.type === 'SUBMISSION');
//   const actions     = notifications.filter((n) => n.type !== 'SUBMISSION');

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0E1420" />

//       {/* Header */}
//       <LinearGradient
//         colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
//         style={styles.header}
//       >
//         <View style={styles.headerShine} />
//         <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Text style={styles.backText}>←</Text>
//         </Pressable>
//         <View style={styles.headerCenter}>
//           <LinearGradient colors={['#A855F7', '#7E22CE']} style={styles.adminBadge}>
//             <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
//           </LinearGradient>
//           <Text style={styles.headerTitle}>Notifications</Text>
//           <Text style={styles.headerSub}>{notifications.length} total · {unreadCount} unread</Text>
//         </View>
//       </LinearGradient>

//       {loading ? (
//         <View style={styles.center}>
//           <Text style={styles.loadingText}>Loading notifications...</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={notifications}
//           keyExtractor={(item) => String(item.id)}
//           contentContainerStyle={styles.list}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#67E6E8" colors={['#67E6E8']} />
//           }
//           ListHeaderComponent={
//             notifications.length > 0 ? (
//               <View style={styles.summaryRow}>
//                 <View style={[styles.summaryChip, { borderColor: 'rgba(255,184,77,0.30)', backgroundColor: 'rgba(255,184,77,0.10)' }]}>
//                   <Text style={[styles.summaryChipText, { color: '#FFB84D' }]}>↑ {submissions.length} New</Text>
//                 </View>
//                 <View style={[styles.summaryChip, { borderColor: 'rgba(103,230,232,0.30)', backgroundColor: 'rgba(103,230,232,0.10)' }]}>
//                   <Text style={[styles.summaryChipText, { color: '#67E6E8' }]}>✓ {actions.filter(n => n.type === 'APPROVED').length} Approved</Text>
//                 </View>
//                 <View style={[styles.summaryChip, { borderColor: 'rgba(255,77,106,0.30)', backgroundColor: 'rgba(255,77,106,0.10)' }]}>
//                   <Text style={[styles.summaryChipText, { color: '#FF4D6A' }]}>✕ {actions.filter(n => n.type === 'REJECTED').length} Rejected</Text>
//                 </View>
//               </View>
//             ) : null
//           }
//           ListEmptyComponent={
//             <View style={styles.emptyWrap}>
//               <Text style={styles.emptyIcon}>🔔</Text>
//               <Text style={styles.emptyTitle}>No notifications yet</Text>
//               <Text style={styles.emptySub}>New app submissions will appear here.</Text>
//             </View>
//           }
//           renderItem={({ item, index }) => <AdminNotifCard item={item} index={index} />}
//           ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0E1420' },

//   header:       { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
//   headerShine:  { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
//   backBtn:      { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   backText:     { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
//   headerCenter: { gap: 3 },
//   adminBadge:   { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
//   adminBadgeText:{ color: '#FFFFFF', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
//   headerTitle:  { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
//   headerSub:    { color: 'rgba(255,255,255,0.42)', fontSize: 12 },

//   list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 44 },

//   summaryRow:      { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
//   summaryChip:     { borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6 },
//   summaryChipText: { fontSize: 12, fontWeight: '800' },

//   card:      { flexDirection: 'row', gap: 12, borderRadius: 18, borderWidth: 1, padding: 14 },
//   cardLeft:  { alignItems: 'center', gap: 6 },
//   iconCircle:{ width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
//   iconText:  { fontSize: 15, fontWeight: '800' },
//   unreadLine:{ width: 2, flex: 1, borderRadius: 1, minHeight: 20 },
//   cardBody:  { flex: 1 },
//   cardTopRow:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
//   cardTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', flex: 1, marginRight: 8 },
//   unreadDot: { width: 8, height: 8, borderRadius: 4 },
//   cardMsg:   { color: 'rgba(255,255,255,0.58)', fontSize: 12, lineHeight: 18, marginBottom: 5 },
//   cardDate:  { color: 'rgba(255,255,255,0.28)', fontSize: 10 },

//   center:      { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   loadingText: { color: '#67E6E8', fontSize: 14 },
//   emptyWrap:   { paddingTop: 80, alignItems: 'center', paddingHorizontal: 32 },
//   emptyIcon:   { fontSize: 40, marginBottom: 14 },
//   emptyTitle:  { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 8 },
//   emptySub:    { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },
// });


import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  FlatList, Pressable, RefreshControl, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  fetchAdminNotificationsApi,
  markAdminNotificationsReadApi,
} from '../utils/apiService';

function AdminNotifCard({ item, index }) {
  const slideAnim = useRef(new Animated.Value(28)).current;
  const opAnim    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 65),
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 360, useNativeDriver: true }),
        Animated.timing(opAnim,   { toValue: 1, duration: 360, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const isSubmission = item.type === 'SUBMISSION';
  const isApproved   = item.type === 'APPROVED';

  const accentColor = isSubmission ? '#FFB84D' : isApproved ? '#67E6E8' : '#FF4D6A';
  const bgColor     = isSubmission
    ? 'rgba(255,184,77,0.08)' : isApproved
    ? 'rgba(103,230,232,0.08)' : 'rgba(255,77,106,0.08)';
  const borderColor = isSubmission
    ? 'rgba(255,184,77,0.22)' : isApproved
    ? 'rgba(103,230,232,0.22)' : 'rgba(255,77,106,0.22)';
  const icon = isSubmission ? '↑' : isApproved ? '✓' : '✕';

  const dateStr = item.createdAt
    ? new Date(item.createdAt).toLocaleString('en-IN', {
        day: 'numeric', month: 'short',
        hour: '2-digit', minute: '2-digit',
      })
    : '';

  return (
    <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }] }}>
      <View style={[styles.card, { backgroundColor: bgColor, borderColor }]}>
        <View style={styles.cardLeft}>
          <View style={[styles.iconCircle, {
            backgroundColor: accentColor + '22',
            borderColor: accentColor + '55',
          }]}>
            <Text style={[styles.iconText, { color: accentColor }]}>{icon}</Text>
          </View>
          {!item.isRead && <View style={[styles.unreadLine, { backgroundColor: accentColor }]} />}
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: accentColor }]} />}
          </View>
          <Text style={styles.cardMsg} numberOfLines={3}>{item.message}</Text>
          {!!dateStr && <Text style={styles.cardDate}>{dateStr}</Text>}
        </View>
      </View>
    </Animated.View>
  );
}

export default function AdminNotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);
  const [unreadCount,   setUnreadCount]   = useState(0);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminNotificationsApi();
      setNotifications(Array.isArray(data) ? data : []);
      setUnreadCount((Array.isArray(data) ? data : []).filter(n => !n.isRead).length);
      // Mark all as read after viewing
      await markAdminNotificationsReadApi();
    } catch (e) {
      console.log('loadNotifications error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadNotifications(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }, []);

  const submissions = notifications.filter(n => n.type === 'SUBMISSION');
  const approved    = notifications.filter(n => n.type === 'APPROVED');
  const rejected    = notifications.filter(n => n.type === 'REJECTED');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1420" />

      {/* Header */}
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
        style={styles.header}
      >
        <View style={styles.headerShine} />
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <LinearGradient colors={['#A855F7', '#7E22CE']} style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
          </LinearGradient>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSub}>
            {notifications.length} total · {unreadCount} unread
          </Text>
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.center}>
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#67E6E8"
              colors={['#67E6E8']}
            />
          }
          ListHeaderComponent={
            notifications.length > 0 ? (
              <View style={styles.summaryRow}>
                <View style={[styles.summaryChip, { borderColor: 'rgba(255,184,77,0.30)', backgroundColor: 'rgba(255,184,77,0.10)' }]}>
                  <Text style={[styles.summaryText, { color: '#FFB84D' }]}>↑ {submissions.length} New</Text>
                </View>
                <View style={[styles.summaryChip, { borderColor: 'rgba(103,230,232,0.30)', backgroundColor: 'rgba(103,230,232,0.10)' }]}>
                  <Text style={[styles.summaryText, { color: '#67E6E8' }]}>✓ {approved.length} Approved</Text>
                </View>
                <View style={[styles.summaryChip, { borderColor: 'rgba(255,77,106,0.30)', backgroundColor: 'rgba(255,77,106,0.10)' }]}>
                  <Text style={[styles.summaryText, { color: '#FF4D6A' }]}>✕ {rejected.length} Rejected</Text>
                </View>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={styles.emptyTitle}>No notifications yet</Text>
              <Text style={styles.emptySub}>New app submissions will appear here.</Text>
            </View>
          }
          renderItem={({ item, index }) => <AdminNotifCard item={item} index={index} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0E1420' },

  header:        { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  headerShine:   { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
  backBtn:       { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
  backText:      { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  headerCenter:  { gap: 3 },
  adminBadge:    { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  adminBadgeText:{ color: '#FFFFFF', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  headerTitle:   { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  headerSub:     { color: 'rgba(255,255,255,0.42)', fontSize: 12 },

  list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 44 },

  summaryRow:  { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  summaryChip: { borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6 },
  summaryText: { fontSize: 12, fontWeight: '800' },

  card:       { flexDirection: 'row', gap: 12, borderRadius: 18, borderWidth: 1, padding: 14 },
  cardLeft:   { alignItems: 'center', gap: 6 },
  iconCircle: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  iconText:   { fontSize: 15, fontWeight: '800' },
  unreadLine: { width: 2, flex: 1, borderRadius: 1, minHeight: 20 },
  cardBody:   { flex: 1 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle:  { color: '#FFFFFF', fontSize: 13, fontWeight: '800', flex: 1, marginRight: 8 },
  unreadDot:  { width: 8, height: 8, borderRadius: 4 },
  cardMsg:    { color: 'rgba(255,255,255,0.58)', fontSize: 12, lineHeight: 18, marginBottom: 5 },
  cardDate:   { color: 'rgba(255,255,255,0.28)', fontSize: 10 },

  center:      { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#67E6E8', fontSize: 14 },
  emptyWrap:   { paddingTop: 80, alignItems: 'center', paddingHorizontal: 32 },
  emptyIcon:   { fontSize: 40, marginBottom: 14 },
  emptyTitle:  { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 8 },
  emptySub:    { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19 },
});