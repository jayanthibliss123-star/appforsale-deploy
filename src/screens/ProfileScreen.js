

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  Image, ScrollView, Pressable, TextInput, Animated,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';
import { getProfileApi, updateProfileApi } from '../utils/apiService';

const DEFAULT_PROFILE_IMAGE = require('../../assets/images/apps/logo.png');

function InputField({ label, value, onChangeText, placeholder,
  multiline = false, editable = true, keyboardType = 'default' }) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.35)"
        multiline={multiline}
        editable={editable}
        keyboardType={keyboardType}
        style={[
          styles.input,
          multiline && styles.textArea,
          !editable && styles.inputReadonly,
        ]}
      />
    </View>
  );
}

function StatPill({ label, value }) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statValue} numberOfLines={1}>
        {value && value.trim() ? value : '—'}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation, route }) {

  const routeUser = route?.params?.user || null;

  const [user, setUser] = useState({
    id: routeUser?.id || null,
    name: routeUser?.fullName || routeUser?.name || 'User',
    fullName: routeUser?.fullName || routeUser?.name || 'User',
    email: routeUser?.email || '',
    phone: routeUser?.mobile || routeUser?.phone || '',
    role: routeUser?.role || 'User',
    location: routeUser?.location || '',
    company: routeUser?.company || '',
    department: routeUser?.department || '',
    bio: routeUser?.bio || '',
    image: routeUser?.image || null,
  });

  const [form, setForm] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const slideAnim = useRef(new Animated.Value(120)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 950, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchLatestProfile();
    }
  }, [user.id]);

  const fetchLatestProfile = async () => {
    try {
      setLoadingProfile(true);
      const data = await getProfileApi(user.id);
      const updated = {
        id: data.id,
        name: data.fullName || data.name || 'User',
        fullName: data.fullName || data.name || 'User',
        email: data.email || '',
        phone: data.mobile || data.phone || '',
        role: data.role || 'User',
        location: data.location || '',
        company: data.company || '',
        department: data.department || '',
        bio: data.bio || '',
        image: data.image || null,
      };
      setUser(updated);
      setForm(updated);
    } catch (error) {
      console.log('fetchLatestProfile error:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const profileImage = user?.image ? { uri: user.image } : DEFAULT_PROFILE_IMAGE;

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleStartEdit = () => {
    setForm({ ...user });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setForm({ ...user });
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    if (!user.id) {
      Alert.alert('Error', 'User ID not found. Please login again.');
      return;
    }

    try {
      setSaving(true);

      const payload = {
        fullName: (form.name || form.fullName || '').trim(),
        phone: (form.phone || '').trim(),
        role: (form.role || '').trim(),
        location: (form.location || '').trim(),
        company: (form.company || '').trim(),
        department: (form.department || '').trim(),
        bio: (form.bio || '').trim(),
      };

      const updated = await updateProfileApi(user.id, payload);

      const updatedUser = {
        id: updated.id || user.id,
        name: updated.fullName || updated.name || form.name,
        fullName: updated.fullName || updated.name || form.name,
        email: updated.email || user.email,
        phone: updated.mobile || updated.phone || form.phone,
        role: updated.role || form.role,
        location: updated.location || form.location,
        company: updated.company || form.company,
        department: updated.department || form.department,
        bio: updated.bio || form.bio,
        image: user.image,
      };

      setUser(updatedUser);
      setForm(updatedUser);
      setIsEditing(false);

      Alert.alert('✅ Success', 'Profile updated successfully!');

    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    navigation.replace('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141B27" />

      <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Animated.View
              style={[styles.cardOuterWrap, {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }]}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.025)']}
                style={styles.card}
              >
                <View style={styles.topShine} />

                {/* Top Bar */}
                <View style={styles.topBar}>
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={({ pressed }) => [styles.topAction, pressed && styles.buttonPressed]}
                  >
                    <Text style={styles.topActionText}>Back</Text>
                  </Pressable>

                  <View style={styles.topBadge}>
                    <Text style={styles.topBadgeText}>
                      {isEditing ? 'Editing Profile' : 'My Profile'}
                    </Text>
                  </View>

                  <Pressable
                    onPress={isEditing ? handleSaveProfile : handleStartEdit}
                    style={({ pressed }) => [
                      styles.topAction, styles.topActionPrimary,
                      pressed && styles.buttonPressed,
                    ]}
                    disabled={saving}
                  >
                    <Text style={styles.topActionPrimaryText}>
                      {isEditing ? (saving ? 'Saving...' : 'Save') : 'Edit'}
                    </Text>
                  </Pressable>
                </View>

                {/* Profile Image + Info */}
                <View style={styles.profileTopSection}>
                  <View style={styles.profileImageWrap}>
                    <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
                  </View>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.role}>{user.role || 'User'}</Text>
                  {user.bio ? (
                    <Text style={styles.bio}>{user.bio}</Text>
                  ) : (
                    <Text style={styles.bioEmpty}>Add a bio in Edit Profile</Text>
                  )}
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                  <StatPill label="Role" value={user.role} />
                  <StatPill label="Department" value={user.department} />
                  <StatPill label="Location" value={user.location} />
                </View>

                {/* Fields */}
                <View style={styles.sectionWrap}>
                  <Text style={styles.sectionTitle}>
                    {isEditing ? 'Edit Details' : 'Account Details'}
                  </Text>

                  <InputField
                    label="Full Name"
                    value={isEditing ? form.name : user.name}
                    onChangeText={(t) => updateField('name', t)}
                    placeholder="Enter full name"
                    editable={isEditing}
                  />

                  <InputField
                    label="Role"
                    value={isEditing ? form.role : user.role}
                    onChangeText={(t) => updateField('role', t)}
                    placeholder="e.g. Developer, Manager"
                    editable={isEditing}
                  />

                  {/* Email — always readonly */}
                  <InputField
                    label="Email"
                    value={user.email}
                    onChangeText={() => {}}
                    placeholder="Email"
                    editable={false}
                  />

                  <InputField
                    label="Phone"
                    value={isEditing ? form.phone : user.phone}
                    onChangeText={(t) => updateField('phone', t.replace(/[^0-9]/g, ''))}
                    placeholder="10-digit mobile number"
                    keyboardType="phone-pad"
                    editable={isEditing}
                  />

                  <InputField
                    label="Location"
                    value={isEditing ? form.location : user.location}
                    onChangeText={(t) => updateField('location', t)}
                    placeholder="e.g. Hyderabad, India"
                    editable={isEditing}
                  />

                  <InputField
                    label="Company"
                    value={isEditing ? form.company : user.company}
                    onChangeText={(t) => updateField('company', t)}
                    placeholder="e.g. My Company Pvt Ltd"
                    editable={isEditing}
                  />

                  <InputField
                    label="Department"
                    value={isEditing ? form.department : user.department}
                    onChangeText={(t) => updateField('department', t)}
                    placeholder="e.g. Engineering, Sales"
                    editable={isEditing}
                  />

                  <InputField
                    label="Bio"
                    value={isEditing ? form.bio : user.bio}
                    onChangeText={(t) => updateField('bio', t)}
                    placeholder="Write something about yourself..."
                    multiline
                    editable={isEditing}
                  />
                </View>

                {/* Action Buttons */}
                {isEditing ? (
                  <View style={styles.actionButtonsWrap}>
                    <Pressable
                      onPress={handleSaveProfile}
                      disabled={saving}
                      style={({ pressed }) => [styles.primaryWrap, pressed && styles.buttonPressed]}
                    >
                      <LinearGradient
                        colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.primaryButton}
                      >
                        <View style={styles.buttonTopShine} />
                        <Text style={styles.primaryButtonText}>
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Text>
                      </LinearGradient>
                    </Pressable>

                    <Pressable
                      onPress={handleCancelEdit}
                      style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                    >
                      <Text style={styles.secondaryButtonText}>Cancel</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.actionButtonsWrap}>
                    <Pressable
                      onPress={handleLogout}
                      style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}
                    >
                      <Text style={styles.logoutButtonText}>Logout</Text>
                    </Pressable>
                  </View>
                )}
              </LinearGradient>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#141B27' },
  container: { flex: 1 },
  keyboardWrap: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
  cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '100%', borderRadius: 30, paddingHorizontal: 22, paddingVertical: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 }, elevation: 14, overflow: 'hidden',
  },
  topShine: {
    position: 'absolute', top: 0, left: '18%', right: '18%',
    height: 1, backgroundColor: 'rgba(255,255,255,0.16)',
  },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 22, gap: 10,
  },
  topAction: {
    minHeight: 38, minWidth: 68, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  topActionPrimary: {
    backgroundColor: 'rgba(103,232,240,0.12)',
    borderColor: 'rgba(103,232,240,0.28)',
  },
  topActionText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
  topActionPrimaryText: { color: '#D8FAFF', fontSize: 12, fontWeight: '800' },
  topBadge: {
    flex: 1, minHeight: 38, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14,
    backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1,
    borderColor: 'rgba(103,232,240,0.22)',
  },
  topBadgeText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
  profileTopSection: { alignItems: 'center', marginBottom: 18 },
  profileImageWrap: {
    width: 108, height: 108, borderRadius: 30, overflow: 'hidden',
    backgroundColor: '#fff', marginBottom: 16, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  profileImage: { width: '100%', height: '100%' },
  name: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '800', marginBottom: 5, textAlign: 'center' },
  role: { color: '#67E6E8', fontSize: 14, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  bio: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 21, textAlign: 'center', maxWidth: '92%' },
  bioEmpty: { color: 'rgba(255,255,255,0.25)', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  statPill: {
    flex: 1, minHeight: 72, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statValue: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
  statLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: '600', textAlign: 'center' },
  sectionWrap: { marginBottom: 14 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 19, fontWeight: '800', marginBottom: 14 },
  inputWrap: { marginBottom: 14 },
  inputLabel: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6, fontWeight: '600' },
  input: {
    minHeight: 52, borderRadius: 16, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.045)',
    color: COLORS.textPrimary, fontSize: 14, paddingHorizontal: 14, paddingVertical: 12,
  },
  inputReadonly: { opacity: 0.92 },
  textArea: { minHeight: 110, textAlignVertical: 'top' },
  actionButtonsWrap: { marginTop: 6, gap: 12 },
  primaryWrap: { marginTop: 8, borderRadius: 16, overflow: 'hidden' },
  primaryButton: { minHeight: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 16, overflow: 'hidden' },
  buttonTopShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
  primaryButtonText: { color: '#12343A', fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },
  secondaryButton: {
    minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  secondaryButtonText: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700' },
  logoutButton: {
    minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(220,53,69,0.18)', borderWidth: 1,
    borderColor: 'rgba(220,53,69,0.38)',
  },
  logoutButtonText: { color: '#FFB8C1', fontSize: 14, fontWeight: '800' },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.995 }] },
});