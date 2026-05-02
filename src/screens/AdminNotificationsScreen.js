
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
import { Ionicons } from '@expo/vector-icons';

const BG     = '#0D1117';
const CARD   = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.09)';
const TEAL   = '#67E6E8';

function AdminNotifCard({ item, index }) {
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

  // ✅ Admin sees SUBMISSION notifications only
  const isSubmission = item.type === 'SUBMISSION';
  const accentColor  = '#FFB84D';
  const bgColor      = 'rgba(255,184,77,0.07)';
  const borderColor  = 'rgba(255,184,77,0.20)';
  const icon         = '↑';

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
      const list = Array.isArray(data) ? data : [];

      // ✅ FIX: Admin ki only SUBMISSION type chupinchu
      // APPROVED/REJECTED notifications admin ki raakoodadu
      const filtered = list.filter(n => n.type === 'SUBMISSION');

      setNotifications(filtered);
      setUnreadCount(filtered.filter(n => !n.isRead).length);

      // ✅ Mark all as read — badge resets to 0 when user returns to AdminHome
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

  // ✅ Since we only show SUBMISSION, these counts reflect that
  const submissionsCount = notifications.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
           <Pressable
  onPress={() => navigation.goBack()}
  style={({ pressed }) => [
    styles.backBtn,
    pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
  ]}
>
  <Ionicons name="arrow-back" size={20} color="#fff" />
</Pressable>
        <View style={styles.headerCenter}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
          </View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSub}>
            {notifications.length} total · {unreadCount} unread
          </Text>
        </View>
      </View>

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
              tintColor={TEAL}
              colors={[TEAL]}
            />
          }
          ListHeaderComponent={
            notifications.length > 0 ? (
              <View style={styles.summaryRow}>
                <View style={[styles.summaryChip, { borderColor: 'rgba(255,184,77,0.28)', backgroundColor: 'rgba(255,184,77,0.09)' }]}>
                  <Text style={[styles.summaryText, { color: '#FFB84D' }]}>↑ {submissionsCount} New Submissions</Text>
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
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:       { flex: 1, backgroundColor: BG },
  header:         { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: BORDER, backgroundColor: BG },
  backBtn:        { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: CARD, borderWidth: 1, borderColor: BORDER },
  backText:       { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  headerCenter:   { gap: 2 },
  adminBadge:     { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 3, backgroundColor: 'rgba(168,85,247,0.18)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.36)' },
  adminBadgeText: { color: '#C084FC', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  headerTitle:    { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  headerSub:      { color: 'rgba(255,255,255,0.38)', fontSize: 11 },
  list:           { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 44 },
  summaryRow:     { flexDirection: 'row', gap: 7, marginBottom: 14, flexWrap: 'wrap' },
  summaryChip:    { borderRadius: 999, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 5 },
  summaryText:    { fontSize: 11, fontWeight: '800' },
  card:           { flexDirection: 'row', gap: 11, borderRadius: 16, borderWidth: 1, padding: 13 },
  cardLeft:       { alignItems: 'center', gap: 5 },
  iconCircle:     { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  iconText:       { fontSize: 14, fontWeight: '800' },
  unreadLine:     { width: 2, flex: 1, borderRadius: 1, minHeight: 16 },
  cardBody:       { flex: 1 },
  cardTopRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  cardTitle:      { color: '#FFFFFF', fontSize: 13, fontWeight: '800', flex: 1, marginRight: 7 },
  unreadDot:      { width: 7, height: 7, borderRadius: 4 },
  cardMsg:        { color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 17, marginBottom: 5 },
  cardDate:       { color: 'rgba(255,255,255,0.26)', fontSize: 10 },
  center:         { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText:    { color: TEAL, fontSize: 13 },
  emptyWrap:      { paddingTop: 72, alignItems: 'center', paddingHorizontal: 32 },
  emptyIcon:      { fontSize: 36, marginBottom: 12 },
  emptyTitle:     { color: '#FFFFFF', fontSize: 17, fontWeight: '800', marginBottom: 7 },
  emptySub:       { color: 'rgba(255,255,255,0.42)', fontSize: 12, textAlign: 'center', lineHeight: 18 },
});