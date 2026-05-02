

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  FlatList, Pressable, RefreshControl, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchUserNotificationsApi } from '../utils/apiService';
import { useNotifications } from '../context/NotificationContext';
import { Ionicons } from '@expo/vector-icons';

const BG     = '#0D1117';
const CARD   = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.09)';
const TEAL   = '#67E6E8';

function UserNotifCard({ item, index }) {
  const slideAnim = useRef(new Animated.Value(24)).current;
  const opAnim    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 55),
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 340, useNativeDriver: true }),
        Animated.timing(opAnim,   { toValue: 1, duration: 340, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const isApproved  = item.type === 'APPROVED';
  const isRejected  = item.type === 'REJECTED';
  const accentColor = isApproved ? TEAL : isRejected ? '#FF4D6A' : '#FFB84D';
  const bgColor     = isApproved ? 'rgba(103,230,232,0.07)' : isRejected ? 'rgba(255,77,106,0.07)' : 'rgba(255,184,77,0.07)';
  const borderColor = isApproved ? 'rgba(103,230,232,0.20)' : isRejected ? 'rgba(255,77,106,0.20)' : 'rgba(255,184,77,0.20)';
  const icon        = isApproved ? '✓' : isRejected ? '✕' : '•';

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
          <View style={[styles.iconCircle, { backgroundColor: accentColor + '20', borderColor: accentColor + '50' }]}>
            <Text style={[styles.iconText, { color: accentColor }]}>{icon}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          </View>
          <Text style={styles.cardMsg} numberOfLines={3}>{item.message}</Text>
          {!!dateStr && <Text style={styles.cardDate}>{dateStr}</Text>}
        </View>
      </View>
    </Animated.View>
  );
}

export default function NotificationsScreen({ navigation, route }) {
  const userEmail = route?.params?.user?.email || null;

  // ✅ Only need markAllAsRead from context — it zeros bell + hits backend
  const { markAllAsRead } = useNotifications();

  const [notifications, setNotifications] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchUserNotificationsApi(userEmail);
      const filtered = Array.isArray(data)
        ? data.filter(n => n.type === 'APPROVED' || n.type === 'REJECTED')
        : [];
      setNotifications(filtered);
    } catch (e) {
      console.log('loadNotifications error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      // ✅ Zero the bell FIRST (optimistic) + backend mark-read
      // This way when user presses back, HomeScreen focus will fetch count=0
      await markAllAsRead(userEmail);

      // Then load the list for display
      await loadNotifications();
    };
    init();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }, []);

  const approvedCount = notifications.filter(n => n.type === 'APPROVED').length;
  const rejectedCount = notifications.filter(n => n.type === 'REJECTED').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View style={styles.header}>
        {/* <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable> */}
      <Pressable
  onPress={() => navigation.goBack()}
  style={({ pressed }) => [
    styles.backBtn,
    pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
  ]}
>
  <Ionicons name="arrow-back" size={20} color="#fff" />
</Pressable>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSub}>{notifications.length} alerts</Text>
        </View>
      </View>

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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={TEAL} />
          }
          ListHeaderComponent={
            notifications.length > 0 ? (
              <View>
                <View style={styles.summaryRow}>
                  {approvedCount > 0 && (
                    <View style={[styles.summaryChip, { backgroundColor: 'rgba(103,230,232,0.09)', borderColor: 'rgba(103,230,232,0.26)' }]}>
                      <Text style={[styles.summaryText, { color: TEAL }]}>✓ {approvedCount} Approved</Text>
                    </View>
                  )}
                  {rejectedCount > 0 && (
                    <View style={[styles.summaryChip, { backgroundColor: 'rgba(255,77,106,0.09)', borderColor: 'rgba(255,77,106,0.26)' }]}>
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
                <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} style={styles.uploadBtnGrad}>
                  <Text style={styles.uploadBtnText}>+ Upload App</Text>
                </LinearGradient>
              </Pressable>
            </View>
          }
          renderItem={({ item, index }) => <UserNotifCard item={item} index={index} />}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:     { flex: 1, backgroundColor: BG },
  header:       { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: BORDER, backgroundColor: BG },
  backBtn:      { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: CARD, borderWidth: 1, borderColor: BORDER },
  backText:     { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  headerTitle:  { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  headerSub:    { color: 'rgba(255,255,255,0.38)', fontSize: 11 },
  list:         { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 44 },
  summaryRow:   { flexDirection: 'row', gap: 7, marginBottom: 10, flexWrap: 'wrap' },
  summaryChip:  { borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 5 },
  summaryText:  { fontSize: 12, fontWeight: '800' },
  infoBox:      { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, borderRadius: 12, padding: 11, marginBottom: 14 },
  infoText:     { color: 'rgba(255,255,255,0.42)', fontSize: 11, lineHeight: 17 },
  card:         { flexDirection: 'row', gap: 11, borderRadius: 16, borderWidth: 1, padding: 13 },
  cardLeft:     { paddingTop: 2 },
  iconCircle:   { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  iconText:     { fontSize: 14, fontWeight: '800' },
  cardBody:     { flex: 1 },
  cardTopRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  cardTitle:    { color: '#FFFFFF', fontSize: 13, fontWeight: '800', flex: 1, marginRight: 7 },
  cardMsg:      { color: 'rgba(255,255,255,0.58)', fontSize: 12, lineHeight: 17, marginBottom: 4 },
  cardDate:     { color: 'rgba(255,255,255,0.26)', fontSize: 10 },
  center:       { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText:  { color: TEAL, fontSize: 13 },
  emptyWrap:    { paddingTop: 64, alignItems: 'center', paddingHorizontal: 32 },
  emptyIconWrap:{ width: 66, height: 66, borderRadius: 33, backgroundColor: 'rgba(103,230,232,0.09)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.20)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  emptyIcon:    { fontSize: 28 },
  emptyTitle:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7 },
  emptySub:     { color: 'rgba(255,255,255,0.42)', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 22 },
  uploadBtn:    { borderRadius: 13, overflow: 'hidden' },
  uploadBtnGrad:{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: 13, alignItems: 'center' },
  uploadBtnText:{ color: '#0A2A2B', fontSize: 13, fontWeight: '800' },
});