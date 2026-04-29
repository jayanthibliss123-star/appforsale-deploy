// import React, { useEffect, useRef } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Animated,
//   Easing,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonHeader from '../components/common/CommonHeader';
// import { useNotifications } from '../context/NotificationContext';

// function formatTime(isoString) {
//   try {
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   } catch {
//     return '';
//   }
// }

// function getTypeLabel(type) {
//   if (type === 'success') return 'MARKETPLACE UPDATE';
//   if (type === 'warning') return 'IMPORTANT NOTICE';
//   if (type === 'error') return 'ACTION NEEDED';
//   return 'APP NEWS';
// }

// export default function NotificationsScreen({ navigation }) {
//   const {
//     notifications,
//     markAsRead,
//     markAllAsRead,
//     removeNotification,
//     clearAllNotifications,
//   } = useNotifications();

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const topCardAnim = useRef(new Animated.Value(0)).current;
//   const emptyAnim = useRef(new Animated.Value(0)).current;
//   const cardsAnimRef = useRef([]);

//   if (cardsAnimRef.current.length !== notifications.length) {
//     cardsAnimRef.current = notifications.map(
//       (_, index) => cardsAnimRef.current[index] || new Animated.Value(0)
//     );
//   }

//   useEffect(() => {
//     const sequence = [
//       Animated.timing(headerAnim, {
//         toValue: 1,
//         duration: 280,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(topCardAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ];

//     if (notifications.length === 0) {
//       sequence.push(
//         Animated.timing(emptyAnim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         })
//       );
//     } else {
//       sequence.push(
//         Animated.stagger(
//           110,
//           cardsAnimRef.current.map((anim) =>
//             Animated.timing(anim, {
//               toValue: 1,
//               duration: 340,
//               easing: Easing.out(Easing.cubic),
//               useNativeDriver: true,
//             })
//           )
//         )
//       );
//     }

//     const intro = Animated.sequence(sequence);
//     intro.start();

//     return () => {
//       intro.stop();
//     };
//   }, [headerAnim, topCardAnim, emptyAnim, notifications]);

//   const fadeUp = (anim, distance = 18, fromScale = 0.985) => ({
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

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >
//         <Animated.View style={fadeUp(headerAnim, 10, 1)}>
//           <CommonHeader
//             navigation={navigation}
//             title="Notifications"
//             subtitle="Apps Marketplace updates"
//             showBack
//             rightLabel="Mark all"
//             onRightPress={markAllAsRead}
//             onNotificationPress={() => {}}
//             onProfilePress={() => navigation.navigate('Profile')}
//           />
//         </Animated.View>

//         <Animated.View style={fadeUp(topCardAnim, 16, 0.99)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//             style={styles.topCard}
//           >
//             <View style={styles.topChip}>
//               <Text style={styles.topChipText}>NOTIFICATION CENTER</Text>
//             </View>

//             <Text style={styles.topTitle}>Stay updated with marketplace activity</Text>
//             <Text style={styles.topText}>
//               All marketplace updates, featured apps, pricing changes, offers,
//               product highlights, profile updates, and inquiries will appear here.
//             </Text>

//             <Pressable
//               onPress={clearAllNotifications}
//               style={({ pressed }) => [
//                 styles.clearButton,
//                 pressed && styles.buttonPressed,
//               ]}
//             >
//               <Text style={styles.clearButtonText}>Clear All</Text>
//             </Pressable>
//           </LinearGradient>
//         </Animated.View>

//         {notifications.length === 0 ? (
//           <Animated.View style={fadeUp(emptyAnim, 18, 0.99)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//               style={styles.emptyCard}
//             >
//               <Text style={styles.emptyTitle}>No marketplace notifications</Text>
//               <Text style={styles.emptyText}>
//                 New app updates, offers, and product news will appear here.
//               </Text>
//             </LinearGradient>
//           </Animated.View>
//         ) : (
//           notifications.map((item, index) => (
//             <Animated.View
//               key={item.id}
//               style={fadeUp(cardsAnimRef.current[index], 16, 0.99)}
//             >
//               <LinearGradient
//                 colors={
//                   item.read
//                     ? ['rgba(255,255,255,0.035)', 'rgba(255,255,255,0.015)']
//                     : ['rgba(184,122,86,0.12)', 'rgba(255,255,255,0.02)']
//                 }
//                 style={styles.notificationCard}
//               >
//                 <View style={styles.notificationTop}>
//                   <View style={styles.notificationHeaderLeft}>
//                     <View style={styles.typePill}>
//                       <Text style={styles.typePillText}>{getTypeLabel(item.type)}</Text>
//                     </View>
//                     {!item.read ? <View style={styles.unreadDot} /> : null}
//                   </View>

//                   <Text style={styles.notificationTime}>
//                     {formatTime(item.createdAt)}
//                   </Text>
//                 </View>

//                 <Text style={styles.notificationTitle}>{item.title}</Text>
//                 <Text style={styles.notificationMessage}>{item.message}</Text>

//                 <View style={styles.notificationActions}>
//                   {!item.read ? (
//                     <Pressable
//                       onPress={() => markAsRead(item.id)}
//                       style={({ pressed }) => [
//                         styles.actionButton,
//                         pressed && styles.buttonPressed,
//                       ]}
//                     >
//                       <Text style={styles.actionButtonText}>Mark as read</Text>
//                     </Pressable>
//                   ) : null}

//                   <Pressable
//                     onPress={() => removeNotification(item.id)}
//                     style={({ pressed }) => [
//                       styles.deleteButton,
//                       pressed && styles.buttonPressed,
//                     ]}
//                   >
//                     <Text style={styles.deleteButtonText}>Remove</Text>
//                   </Pressable>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
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

//   topCard: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },

//   topChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(184,122,86,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 12,
//   },

//   topChipText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },

//   topTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     marginBottom: 8,
//     lineHeight: 28,
//   },

//   topText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 14,
//   },

//   clearButton: {
//     minHeight: 46,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },

//   clearButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },

//   emptyCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 20,
//     alignItems: 'center',
//   },

//   emptyTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 8,
//   },

//   emptyText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     textAlign: 'center',
//     lineHeight: 20,
//   },

//   notificationCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//     marginBottom: 12,
//   },

//   notificationTop: {
//     marginBottom: 10,
//   },

//   notificationHeaderLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 6,
//   },

//   typePill: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(184,122,86,0.24)',
//     borderRadius: 999,
//     paddingHorizontal: 9,
//     paddingVertical: 5,
//   },

//   typePillText: {
//     color: COLORS.primary,
//     fontSize: 9,
//     fontWeight: '700',
//     letterSpacing: 0.6,
//   },

//   unreadDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: COLORS.primary,
//   },

//   notificationTime: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//   },

//   notificationTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 8,
//     lineHeight: 22,
//   },

//   notificationMessage: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 12,
//   },

//   notificationActions: {
//     flexDirection: 'row',
//     gap: 10,
//   },

//   actionButton: {
//     minHeight: 40,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(184,122,86,0.30)',
//   },

//   actionButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   deleteButton: {
//     minHeight: 40,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(220,53,69,0.16)',
//     borderWidth: 1,
//     borderColor: 'rgba(220,53,69,0.30)',
//   },

//   deleteButtonText: {
//     color: '#FFB8C1',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },
// });


// import React, { useEffect, useRef } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Animated,
//   Easing,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonHeader from '../components/common/CommonHeader';
// import { useNotifications } from '../context/NotificationContext';

// function formatTime(isoString) {
//   try {
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   } catch {
//     return '';
//   }
// }

// function getTypeLabel(type) {
//   if (type === 'success') return 'MARKETPLACE UPDATE';
//   if (type === 'warning') return 'IMPORTANT NOTICE';
//   if (type === 'error') return 'ACTION NEEDED';
//   return 'APP NEWS';
// }

// export default function NotificationsScreen({ navigation }) {
//   const {
//     notifications,
//     markAsRead,
//     markAllAsRead,
//     removeNotification,
//     clearAllNotifications,
//   } = useNotifications();

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const topCardAnim = useRef(new Animated.Value(0)).current;
//   const emptyAnim = useRef(new Animated.Value(0)).current;
//   const cardsAnimRef = useRef([]);

//   if (cardsAnimRef.current.length !== notifications.length) {
//     cardsAnimRef.current = notifications.map(
//       (_, index) => cardsAnimRef.current[index] || new Animated.Value(0)
//     );
//   }

//   useEffect(() => {
//     cardsAnimRef.current.forEach((anim) => anim.setValue(0));
//     emptyAnim.setValue(0);

//     const sequence = [
//       Animated.timing(headerAnim, {
//         toValue: 1,
//         duration: 280,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(topCardAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ];

//     if (notifications.length === 0) {
//       sequence.push(
//         Animated.timing(emptyAnim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         })
//       );
//     } else {
//       sequence.push(
//         Animated.stagger(
//           110,
//           cardsAnimRef.current.map((anim) =>
//             Animated.timing(anim, {
//               toValue: 1,
//               duration: 340,
//               easing: Easing.out(Easing.cubic),
//               useNativeDriver: true,
//             })
//           )
//         )
//       );
//     }

//     const intro = Animated.sequence(sequence);
//     intro.start();

//     return () => {
//       intro.stop();
//     };
//   }, [headerAnim, topCardAnim, emptyAnim, notifications]);

//   const fadeUp = (anim, distance = 18, fromScale = 0.985) => ({
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

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <CommonHeader
//             navigation={navigation}
//             title="Notifications"
//             subtitle="Apps Marketplace updates"
//             showBack
//             rightLabel="Mark all"
//             onRightPress={markAllAsRead}
//             onNotificationPress={() => {}}
//             onProfilePress={() => navigation.navigate('Profile')}
//           />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >


//         <Animated.View style={fadeUp(topCardAnim, 16, 0.99)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//             style={styles.topCard}
//           >
//             <View style={styles.topChip}>
//               <Text style={styles.topChipText}>NOTIFICATION CENTER</Text>
//             </View>

//             <Text style={styles.topTitle}>Stay updated with marketplace activity</Text>
//             <Text style={styles.topText}>
//               All marketplace updates, featured apps, pricing changes, offers,
//               product highlights, profile updates, and inquiries will appear here.
//             </Text>

//             <Pressable
//               onPress={clearAllNotifications}
//               style={({ pressed }) => [
//                 styles.clearButton,
//                 pressed && styles.buttonPressed,
//               ]}
//             >
//               <Text style={styles.clearButtonText}>Clear All</Text>
//             </Pressable>
//           </LinearGradient>
//         </Animated.View>

//         {notifications.length === 0 ? (
//           <Animated.View style={fadeUp(emptyAnim, 18, 0.99)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//               style={styles.emptyCard}
//             >
//               <Text style={styles.emptyTitle}>No marketplace notifications</Text>
//               <Text style={styles.emptyText}>
//                 New app updates, offers, and product news will appear here.
//               </Text>
//             </LinearGradient>
//           </Animated.View>
//         ) : (
//           notifications.map((item, index) => (
//             <Animated.View
//               key={item.id}
//               style={fadeUp(cardsAnimRef.current[index], 16, 0.99)}
//             >
//               <LinearGradient
//                 colors={
//                   item.read
//                     ? ['rgba(255,255,255,0.035)', 'rgba(255,255,255,0.015)']
//                     : ['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']
//                 }
//                 style={styles.notificationCard}
//               >
//                 <View style={styles.notificationTop}>
//                   <View style={styles.notificationHeaderLeft}>
//                     <View style={styles.typePill}>
//                       <Text style={styles.typePillText}>{getTypeLabel(item.type)}</Text>
//                     </View>
//                     {!item.read ? <View style={styles.unreadDot} /> : null}
//                   </View>

//                   <Text style={styles.notificationTime}>
//                     {formatTime(item.createdAt)}
//                   </Text>
//                 </View>

//                 <Text style={styles.notificationTitle}>{item.title}</Text>
//                 <Text style={styles.notificationMessage}>{item.message}</Text>

//                 <View style={styles.notificationActions}>
//                   {!item.read ? (
//                     <Pressable
//                       onPress={() => markAsRead(item.id)}
//                       style={({ pressed }) => [
//                         styles.actionButton,
//                         pressed && styles.buttonPressed,
//                       ]}
//                     >
//                       <Text style={styles.actionButtonText}>Mark as read</Text>
//                     </Pressable>
//                   ) : null}

//                   <Pressable
//                     onPress={() => removeNotification(item.id)}
//                     style={({ pressed }) => [
//                       styles.deleteButton,
//                       pressed && styles.buttonPressed,
//                     ]}
//                   >
//                     <Text style={styles.deleteButtonText}>Remove</Text>
//                   </Pressable>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
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

//   topCard: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },

//   topChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 12,
//   },

//   topChipText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },

//   topTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     marginBottom: 8,
//     lineHeight: 28,
//   },

//   topText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 14,
//   },

//   clearButton: {
//     minHeight: 46,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },

//   clearButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },

//   emptyCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 20,
//     alignItems: 'center',
//   },

//   emptyTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 8,
//   },

//   emptyText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     textAlign: 'center',
//     lineHeight: 20,
//   },

//   notificationCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//     marginBottom: 12,
//   },

//   notificationTop: {
//     marginBottom: 10,
//   },

//   notificationHeaderLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 6,
//   },

//   typePill: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.24)',
//     borderRadius: 999,
//     paddingHorizontal: 9,
//     paddingVertical: 5,
//   },

//   typePillText: {
//     color: '#67E6E8',
//     fontSize: 9,
//     fontWeight: '700',
//     letterSpacing: 0.6,
//   },

//   unreadDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: '#67E6E8',
//   },

//   notificationTime: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//   },

//   notificationTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 8,
//     lineHeight: 22,
//   },

//   notificationMessage: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 12,
//   },

//   notificationActions: {
//     flexDirection: 'row',
//     gap: 10,
//   },

//   actionButton: {
//     minHeight: 40,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.30)',
//   },

//   actionButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   deleteButton: {
//     minHeight: 40,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(220,53,69,0.16)',
//     borderWidth: 1,
//     borderColor: 'rgba(220,53,69,0.30)',
//   },

//   deleteButtonText: {
//     color: '#FFB8C1',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },
// });

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   FlatList, Pressable, RefreshControl, Animated,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import { fetchNotificationsByRoleApi, markAllNotificationsReadApi } from '../utils/apiService';

// function NotifCard({ item, index }) {
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

//   const isApproved = item.type === 'APPROVAL';
//   const isRejected = item.type === 'REJECTION';

//   const accentColor = isApproved ? '#67E6E8' : isRejected ? '#FF4D6A' : '#FFB84D';
//   const bgColor     = isApproved
//     ? 'rgba(103,230,232,0.08)'
//     : isRejected
//     ? 'rgba(255,77,106,0.08)'
//     : 'rgba(255,184,77,0.08)';
//   const borderColor = isApproved
//     ? 'rgba(103,230,232,0.20)'
//     : isRejected
//     ? 'rgba(255,77,106,0.20)'
//     : 'rgba(255,184,77,0.20)';

//   const icon = isApproved ? '✓' : isRejected ? '✕' : '•';

//   const dateStr = item.createdAt
//     ? new Date(item.createdAt).toLocaleDateString('en-IN', {
//         day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
//       })
//     : '';

//   return (
//     <Animated.View style={{ opacity: opAnim, transform: [{ translateY: slideAnim }] }}>
//       <View style={[styles.card, { backgroundColor: bgColor, borderColor }]}>
//         <View style={styles.cardLeft}>
//           <View style={[styles.iconCircle, { backgroundColor: accentColor + '22', borderColor: accentColor + '44' }]}>
//             <Text style={[styles.iconText, { color: accentColor }]}>{icon}</Text>
//           </View>
//         </View>
//         <View style={styles.cardBody}>
//           <View style={styles.cardTopRow}>
//             <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
//             {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: accentColor }]} />}
//           </View>
//           <Text style={styles.cardMessage} numberOfLines={3}>{item.message}</Text>
//           {dateStr ? <Text style={styles.cardDate}>{dateStr}</Text> : null}
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// export default function NotificationsScreen({ navigation }) {
//   const [notifications, setNotifications] = useState([]);
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);

//   const loadNotifications = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchNotificationsByRoleApi('USER');
//       setNotifications(data);
//       await markAllNotificationsReadApi('USER');
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
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       {/* Header */}
//       <LinearGradient
//         colors={['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.02)']}
//         style={styles.header}
//       >
//         <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Text style={styles.backText}>←</Text>
//         </Pressable>
//         <View>
//           <Text style={styles.headerTitle}>Notifications</Text>
//           <Text style={styles.headerSub}>{notifications.length} alerts</Text>
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
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#67E6E8" />
//           }
//           ListEmptyComponent={
//             <View style={styles.emptyWrap}>
//               <Text style={styles.emptyIcon}>🔔</Text>
//               <Text style={styles.emptyTitle}>No notifications yet</Text>
//               <Text style={styles.emptySub}>You'll be notified when your app is approved or rejected.</Text>
//             </View>
//           }
//           renderItem={({ item, index }) => <NotifCard item={item} index={index} />}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:    { flex: 1, backgroundColor: COLORS.background },
//   header:      { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)', marginBottom: 4 },
//   backBtn:     { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)' },
//   backText:    { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
//   headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
//   headerSub:   { color: 'rgba(255,255,255,0.45)', fontSize: 12 },
//   list:        { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 },
//   card:        { flexDirection: 'row', gap: 12, borderRadius: 18, borderWidth: 1, padding: 14, marginBottom: 10 },
//   cardLeft:    { paddingTop: 2 },
//   iconCircle:  { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
//   iconText:    { fontSize: 14, fontWeight: '800' },
//   cardBody:    { flex: 1 },
//   cardTopRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
//   cardTitle:   { color: '#FFFFFF', fontSize: 14, fontWeight: '800', flex: 1, marginRight: 8 },
//   unreadDot:   { width: 8, height: 8, borderRadius: 4 },
//   cardMessage: { color: 'rgba(255,255,255,0.65)', fontSize: 12, lineHeight: 18, marginBottom: 6 },
//   cardDate:    { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '500' },
//   center:      { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   loadingText: { color: '#67E6E8', fontSize: 14 },
//   emptyWrap:   { paddingTop: 80, alignItems: 'center', paddingHorizontal: 32 },
//   emptyIcon:   { fontSize: 40, marginBottom: 14 },
//   emptyTitle:  { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 8 },
//   emptySub:    { color: 'rgba(255,255,255,0.50)', fontSize: 13, textAlign: 'center', lineHeight: 19 },
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

// function UserNotifCard({ item, index }) {
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

//   const isApproved = item.type === 'APPROVED';
//   const isRejected = item.type === 'REJECTED';

//   const accentColor = isApproved ? '#67E6E8' : isRejected ? '#FF4D6A' : '#FFB84D';
//   const bgColor     = isApproved
//     ? 'rgba(103,230,232,0.08)' : isRejected
//     ? 'rgba(255,77,106,0.08)' : 'rgba(255,184,77,0.08)';
//   const borderColor = isApproved
//     ? 'rgba(103,230,232,0.22)' : isRejected
//     ? 'rgba(255,77,106,0.22)' : 'rgba(255,184,77,0.22)';
//   const icon = isApproved ? '✓' : isRejected ? '✕' : '•';

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

// export default function NotificationsScreen({ navigation }) {
//   const [notifications, setNotifications] = useState([]);
//   const [loading,       setLoading]       = useState(true);
//   const [refreshing,    setRefreshing]    = useState(false);

//   const loadNotifications = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchNotificationsByRoleApi('USER');
//       setNotifications(data);
//       await markAllNotificationsReadApi('USER');
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

//   const approvedCount = notifications.filter((n) => n.type === 'APPROVED').length;
//   const rejectedCount = notifications.filter((n) => n.type === 'REJECTED').length;

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

//       {/* Header */}
//       <LinearGradient
//         colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.01)']}
//         style={styles.header}
//       >
//         <View style={styles.headerShine} />
//         <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Text style={styles.backText}>←</Text>
//         </Pressable>
//         <View>
//           <Text style={styles.headerTitle}>Notifications</Text>
//           <Text style={styles.headerSub}>{notifications.length} alerts</Text>
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
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#67E6E8" />
//           }
//           ListHeaderComponent={
//             notifications.length > 0 ? (
//               <View>
//                 {/* Summary chips */}
//                 <View style={styles.summaryRow}>
//                   {approvedCount > 0 && (
//                     <View style={[styles.summaryChip, { backgroundColor: 'rgba(103,230,232,0.10)', borderColor: 'rgba(103,230,232,0.28)' }]}>
//                       <Text style={[styles.summaryChipText, { color: '#67E6E8' }]}>✓ {approvedCount} Approved</Text>
//                     </View>
//                   )}
//                   {rejectedCount > 0 && (
//                     <View style={[styles.summaryChip, { backgroundColor: 'rgba(255,77,106,0.10)', borderColor: 'rgba(255,77,106,0.28)' }]}>
//                       <Text style={[styles.summaryChipText, { color: '#FF4D6A' }]}>✕ {rejectedCount} Rejected</Text>
//                     </View>
//                   )}
//                 </View>
//                 {/* Info box */}
//                 <View style={styles.infoBox}>
//                   <Text style={styles.infoText}>
//                     You'll be notified here whenever admin approves or rejects your submitted apps.
//                   </Text>
//                 </View>
//               </View>
//             ) : null
//           }
//           ListEmptyComponent={
//             <View style={styles.emptyWrap}>
//               <View style={styles.emptyIconWrap}>
//                 <Text style={styles.emptyIcon}>🔔</Text>
//               </View>
//               <Text style={styles.emptyTitle}>No notifications yet</Text>
//               <Text style={styles.emptySub}>
//                 Upload an app and you'll be notified here when admin reviews it.
//               </Text>
//               <Pressable
//                 onPress={() => navigation.navigate('UploadApp')}
//                 style={({ pressed }) => [styles.uploadBtn, pressed && { opacity: 0.8 }]}
//               >
//                 <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadBtnGrad}>
//                   <Text style={styles.uploadBtnText}>+ Upload App</Text>
//                 </LinearGradient>
//               </Pressable>
//             </View>
//           }
//           renderItem={({ item, index }) => <UserNotifCard item={item} index={index} />}
//           ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#0D1117' },

//   header:      { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)', overflow: 'hidden' },
//   headerShine: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
//   backBtn:     { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)' },
//   backText:    { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
//   headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
//   headerSub:   { color: 'rgba(255,255,255,0.42)', fontSize: 12 },

//   list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 44 },

//   summaryRow:      { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
//   summaryChip:     { borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 7 },
//   summaryChipText: { fontSize: 13, fontWeight: '800' },

//   infoBox:  { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 12, marginBottom: 16 },
//   infoText: { color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 18 },

//   card:      { flexDirection: 'row', gap: 12, borderRadius: 18, borderWidth: 1, padding: 14 },
//   cardLeft:  { paddingTop: 2 },
//   iconCircle:{ width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
//   iconText:  { fontSize: 15, fontWeight: '800' },
//   cardBody:  { flex: 1 },
//   cardTopRow:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
//   cardTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', flex: 1, marginRight: 8 },
//   unreadDot: { width: 8, height: 8, borderRadius: 4 },
//   cardMsg:   { color: 'rgba(255,255,255,0.62)', fontSize: 12, lineHeight: 18, marginBottom: 5 },
//   cardDate:  { color: 'rgba(255,255,255,0.28)', fontSize: 10 },

//   center:      { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   loadingText: { color: '#67E6E8', fontSize: 14 },

//   emptyWrap:    { paddingTop: 70, alignItems: 'center', paddingHorizontal: 32 },
//   emptyIconWrap:{ width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(103,230,232,0.10)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.22)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
//   emptyIcon:    { fontSize: 32 },
//   emptyTitle:   { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 8 },
//   emptySub:     { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19, marginBottom: 24 },
//   uploadBtn:    { borderRadius: 14, overflow: 'hidden' },
//   uploadBtnGrad:{ paddingHorizontal: 24, paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
//   uploadBtnText:{ color: '#0A2A2B', fontSize: 14, fontWeight: '800' },
// });

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  FlatList, Pressable, RefreshControl, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  fetchUserNotificationsApi,
  markUserNotificationsReadApi,
} from '../utils/apiService';

function UserNotifCard({ item, index }) {
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

  const isApproved = item.type === 'APPROVED';
  const isRejected = item.type === 'REJECTED';

  const accentColor = isApproved ? '#67E6E8' : isRejected ? '#FF4D6A' : '#FFB84D';
  const bgColor     = isApproved
    ? 'rgba(103,230,232,0.08)' : isRejected
    ? 'rgba(255,77,106,0.08)'  : 'rgba(255,184,77,0.08)';
  const borderColor = isApproved
    ? 'rgba(103,230,232,0.22)' : isRejected
    ? 'rgba(255,77,106,0.22)'  : 'rgba(255,184,77,0.22)';
  const icon = isApproved ? '✓' : isRejected ? '✕' : '•';

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

export default function NotificationsScreen({ navigation, route }) {
  // ✅ Get user email from route params to filter their notifications
  const userEmail = route?.params?.user?.email || null;

  const [notifications, setNotifications] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      // ✅ Pass email — backend returns only THIS user's notifications
      const data = await fetchUserNotificationsApi(userEmail);
      setNotifications(Array.isArray(data) ? data : []);
      // Mark as read
      await markUserNotificationsReadApi(userEmail);
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

  const approvedCount = notifications.filter(n => n.type === 'APPROVED').length;
  const rejectedCount = notifications.filter(n => n.type === 'REJECTED').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

      {/* Header */}
      <LinearGradient
        colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.01)']}
        style={styles.header}
      >
        <View style={styles.headerShine} />
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSub}>{notifications.length} alerts</Text>
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.center}>
          <Text style={styles.loadingText}>Loading...</Text>
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
            />
          }
          ListHeaderComponent={
            notifications.length > 0 ? (
              <View>
                <View style={styles.summaryRow}>
                  {approvedCount > 0 && (
                    <View style={[styles.summaryChip, { backgroundColor: 'rgba(103,230,232,0.10)', borderColor: 'rgba(103,230,232,0.28)' }]}>
                      <Text style={[styles.summaryText, { color: '#67E6E8' }]}>✓ {approvedCount} Approved</Text>
                    </View>
                  )}
                  {rejectedCount > 0 && (
                    <View style={[styles.summaryChip, { backgroundColor: 'rgba(255,77,106,0.10)', borderColor: 'rgba(255,77,106,0.28)' }]}>
                      <Text style={[styles.summaryText, { color: '#FF4D6A' }]}>✕ {rejectedCount} Rejected</Text>
                    </View>
                  )}
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    You'll be notified here when admin approves or rejects your submitted apps.
                  </Text>
                </View>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <View style={styles.emptyIconWrap}>
                <Text style={styles.emptyIcon}>🔔</Text>
              </View>
              <Text style={styles.emptyTitle}>No notifications yet</Text>
              <Text style={styles.emptySub}>
                Upload an app and you'll be notified here when admin reviews it.
              </Text>
              <Pressable
                onPress={() => navigation.navigate('UploadApp')}
                style={({ pressed }) => [styles.uploadBtn, pressed && { opacity: 0.8 }]}
              >
                <LinearGradient
                  colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                  style={styles.uploadBtnGrad}
                >
                  <Text style={styles.uploadBtnText}>+ Upload App</Text>
                </LinearGradient>
              </Pressable>
            </View>
          }
          renderItem={({ item, index }) => <UserNotifCard item={item} index={index} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0D1117' },

  header:      { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)', overflow: 'hidden' },
  headerShine: { position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
  backBtn:     { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)' },
  backText:    { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  headerSub:   { color: 'rgba(255,255,255,0.42)', fontSize: 12 },

  list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 44 },

  summaryRow:  { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  summaryChip: { borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 7 },
  summaryText: { fontSize: 13, fontWeight: '800' },

  infoBox:  { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 12, marginBottom: 16 },
  infoText: { color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 18 },

  card:       { flexDirection: 'row', gap: 12, borderRadius: 18, borderWidth: 1, padding: 14 },
  cardLeft:   { paddingTop: 2 },
  iconCircle: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  iconText:   { fontSize: 15, fontWeight: '800' },
  cardBody:   { flex: 1 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle:  { color: '#FFFFFF', fontSize: 14, fontWeight: '800', flex: 1, marginRight: 8 },
  unreadDot:  { width: 8, height: 8, borderRadius: 4 },
  cardMsg:    { color: 'rgba(255,255,255,0.62)', fontSize: 12, lineHeight: 18, marginBottom: 5 },
  cardDate:   { color: 'rgba(255,255,255,0.28)', fontSize: 10 },

  center:      { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#67E6E8', fontSize: 14 },

  emptyWrap:    { paddingTop: 70, alignItems: 'center', paddingHorizontal: 32 },
  emptyIconWrap:{ width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(103,230,232,0.10)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.22)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyIcon:    { fontSize: 32 },
  emptyTitle:   { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 8 },
  emptySub:     { color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', lineHeight: 19, marginBottom: 24 },
  uploadBtn:    { borderRadius: 14, overflow: 'hidden' },
  uploadBtnGrad:{ paddingHorizontal: 24, paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
  uploadBtnText:{ color: '#0A2A2B', fontSize: 14, fontWeight: '800' },
});