

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Image, ScrollView, Pressable, TextInput, Animated,
//   KeyboardAvoidingView, Platform, Alert,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import { getProfileApi, updateProfileApi } from '../utils/apiService';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const DEFAULT_PROFILE_IMAGE = require('../../assets/images/apps/logo.png');

// function InputField({ label, value, onChangeText, placeholder,
//   multiline = false, editable = true, keyboardType = 'default' }) {
//   return (
//     <View style={styles.inputWrap}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="rgba(255,255,255,0.35)"
//         multiline={multiline}
//         editable={editable}
//         keyboardType={keyboardType}
//         style={[
//           styles.input,
//           multiline && styles.textArea,
//           !editable && styles.inputReadonly,
//         ]}
//       />
//     </View>
//   );
// }

// function StatPill({ label, value }) {
//   return (
//     <View style={styles.statPill}>
//       <Text style={styles.statValue} numberOfLines={1}>
//         {value && value.trim() ? value : '—'}
//       </Text>
//       <Text style={styles.statLabel}>{label}</Text>
//     </View>
//   );
// }

// export default function ProfileScreen({ navigation, route }) {

//   const routeUser = route?.params?.user || null;

//   const [user, setUser] = useState({
//     id: routeUser?.id || null,
//     name: routeUser?.fullName || routeUser?.name || 'User',
//     fullName: routeUser?.fullName || routeUser?.name || 'User',
//     email: routeUser?.email || '',
//     phone: routeUser?.mobile || routeUser?.phone || '',
//     role: routeUser?.role || 'User',
//     location: routeUser?.location || '',
//     company: routeUser?.company || '',
//     department: routeUser?.department || '',
//     bio: routeUser?.bio || '',
//     image: routeUser?.image || null,
//   });

//   const [form, setForm] = useState({ ...user });
//   const [isEditing, setIsEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   const slideAnim = useRef(new Animated.Value(120)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
//       Animated.timing(fadeAnim, { toValue: 1, duration: 950, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   useEffect(() => {
//     if (user.id) {
//       fetchLatestProfile();
//     }
//   }, [user.id]);

//   const fetchLatestProfile = async () => {
//     try {
//       setLoadingProfile(true);
//       const data = await getProfileApi(user.id);
//       const updated = {
//         id: data.id,
//         name: data.fullName || data.name || 'User',
//         fullName: data.fullName || data.name || 'User',
//         email: data.email || '',
//         phone: data.mobile || data.phone || '',
//         role: data.role || 'User',
//         location: data.location || '',
//         company: data.company || '',
//         department: data.department || '',
//         bio: data.bio || '',
//         image: data.image || null,
//       };
//       setUser(updated);
//       setForm(updated);
//     } catch (error) {
//       console.log('fetchLatestProfile error:', error);
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   const profileImage = user?.image ? { uri: user.image } : DEFAULT_PROFILE_IMAGE;

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleStartEdit = () => {
//     setForm({ ...user });
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setForm({ ...user });
//     setIsEditing(false);
//   };

//   const handleSaveProfile = async () => {
//     if (!user.id) {
//       showAlert('Error', 'User ID not found. Please login again.');
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         fullName: (form.name || form.fullName || '').trim(),
//         phone: (form.phone || '').trim(),
//         role: (form.role || '').trim(),
//         location: (form.location || '').trim(),
//         company: (form.company || '').trim(),
//         department: (form.department || '').trim(),
//         bio: (form.bio || '').trim(),
//       };

//       const updated = await updateProfileApi(user.id, payload);

//       const updatedUser = {
//         id: updated.id || user.id,
//         name: updated.fullName || updated.name || form.name,
//         fullName: updated.fullName || updated.name || form.name,
//         email: updated.email || user.email,
//         phone: updated.mobile || updated.phone || form.phone,
//         role: updated.role || form.role,
//         location: updated.location || form.location,
//         company: updated.company || form.company,
//         department: updated.department || form.department,
//         bio: updated.bio || form.bio,
//         image: user.image,
//       };

//       setUser(updatedUser);
//       setForm(updatedUser);
//       setIsEditing(false);

//       showAlert('✅ Success', 'Profile updated successfully!');

//     } catch (error) {
//      showAlert('Error', error.message || 'Failed to update profile.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = () => {
//     navigation.replace('SignIn');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//           >
//             <Animated.View
//               style={[styles.cardOuterWrap, {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }],
//               }]}
//             >
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.025)']}
//                 style={styles.card}
//               >
//                 <View style={styles.topShine} />

//                 {/* Top Bar */}
//                 <View style={styles.topBar}>
//                   <Pressable
//                     onPress={() => navigation.goBack()}
//                     style={({ pressed }) => [styles.topAction, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.topActionText}>Back</Text>
//                   </Pressable>

//                   <View style={styles.topBadge}>
//                     <Text style={styles.topBadgeText}>
//                       {isEditing ? 'Editing Profile' : 'My Profile'}
//                     </Text>
//                   </View>

//                   <Pressable
//                     onPress={isEditing ? handleSaveProfile : handleStartEdit}
//                     style={({ pressed }) => [
//                       styles.topAction, styles.topActionPrimary,
//                       pressed && styles.buttonPressed,
//                     ]}
//                     disabled={saving}
//                   >
//                     <Text style={styles.topActionPrimaryText}>
//                       {isEditing ? (saving ? 'Saving...' : 'Save') : 'Edit'}
//                     </Text>
//                   </Pressable>
//                 </View>

//                 {/* Profile Image + Info */}
//                 <View style={styles.profileTopSection}>
//                   <View style={styles.profileImageWrap}>
//                     <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
//                   </View>
//                   <Text style={styles.name}>{user.name}</Text>
//                   <Text style={styles.role}>{user.role || 'User'}</Text>
//                   {user.bio ? (
//                     <Text style={styles.bio}>{user.bio}</Text>
//                   ) : (
//                     <Text style={styles.bioEmpty}>Add a bio in Edit Profile</Text>
//                   )}
//                 </View>

//                 {/* Stats */}
//                 <View style={styles.statsRow}>
//                   <StatPill label="Role" value={user.role} />
//                   <StatPill label="Department" value={user.department} />
//                   <StatPill label="Location" value={user.location} />
//                 </View>

//                 {/* Fields */}
//                 <View style={styles.sectionWrap}>
//                   <Text style={styles.sectionTitle}>
//                     {isEditing ? 'Edit Details' : 'Account Details'}
//                   </Text>

//                   <InputField
//                     label="Full Name"
//                     value={isEditing ? form.name : user.name}
//                     onChangeText={(t) => updateField('name', t)}
//                     placeholder="Enter full name"
//                     editable={isEditing}
//                   />

//                   <InputField
//                     label="Role"
//                     value={isEditing ? form.role : user.role}
//                     onChangeText={(t) => updateField('role', t)}
//                     placeholder="e.g. Developer, Manager"
//                     editable={isEditing}
//                   />

//                   {/* Email — always readonly */}
//                   <InputField
//                     label="Email"
//                     value={user.email}
//                     onChangeText={() => {}}
//                     placeholder="Email"
//                     editable={false}
//                   />

//                   <InputField
//                     label="Phone"
//                     value={isEditing ? form.phone : user.phone}
//                     onChangeText={(t) => updateField('phone', t.replace(/[^0-9]/g, ''))}
//                     placeholder="10-digit mobile number"
//                     keyboardType="phone-pad"
//                     editable={isEditing}
//                   />

//                   <InputField
//                     label="Location"
//                     value={isEditing ? form.location : user.location}
//                     onChangeText={(t) => updateField('location', t)}
//                     placeholder="e.g. Hyderabad, India"
//                     editable={isEditing}
//                   />

//                   <InputField
//                     label="Company"
//                     value={isEditing ? form.company : user.company}
//                     onChangeText={(t) => updateField('company', t)}
//                     placeholder="e.g. My Company Pvt Ltd"
//                     editable={isEditing}
//                   />

//                   <InputField
//                     label="Department"
//                     value={isEditing ? form.department : user.department}
//                     onChangeText={(t) => updateField('department', t)}
//                     placeholder="e.g. Engineering, Sales"
//                     editable={isEditing}
//                   />

//                   <InputField
//                     label="Bio"
//                     value={isEditing ? form.bio : user.bio}
//                     onChangeText={(t) => updateField('bio', t)}
//                     placeholder="Write something about yourself..."
//                     multiline
//                     editable={isEditing}
//                   />
//                 </View>

//                 {/* Action Buttons */}
//                 {isEditing ? (
//                   <View style={styles.actionButtonsWrap}>
//                     <Pressable
//                       onPress={handleSaveProfile}
//                       disabled={saving}
//                       style={({ pressed }) => [styles.primaryWrap, pressed && styles.buttonPressed]}
//                     >
//                       <LinearGradient
//                         colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                         start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
//                         style={styles.primaryButton}
//                       >
//                         <View style={styles.buttonTopShine} />
//                         <Text style={styles.primaryButtonText}>
//                           {saving ? 'Saving...' : 'Save Changes'}
//                         </Text>
//                       </LinearGradient>
//                     </Pressable>

//                     <Pressable
//                       onPress={handleCancelEdit}
//                       style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                     >
//                       <Text style={styles.secondaryButtonText}>Cancel</Text>
//                     </Pressable>
//                   </View>
//                 ) : (
//                   <View style={styles.actionButtonsWrap}>
//                     <Pressable
//                       onPress={handleLogout}
//                       style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}
//                     >
//                       <Text style={styles.logoutButtonText}>Logout</Text>
//                     </Pressable>
//                   </View>
//                 )}
//               </LinearGradient>
//             </Animated.View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#141B27' },
//   container: { flex: 1 },
//   keyboardWrap: { flex: 1 },
//   scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
//   card: {
//     width: '100%', borderRadius: 30, paddingHorizontal: 22, paddingVertical: 24,
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 22,
//     shadowOffset: { width: 0, height: 12 }, elevation: 14, overflow: 'hidden',
//   },
//   topShine: {
//     position: 'absolute', top: 0, left: '18%', right: '18%',
//     height: 1, backgroundColor: 'rgba(255,255,255,0.16)',
//   },
//   topBar: {
//     flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between', marginBottom: 22, gap: 10,
//   },
//   topAction: {
//     minHeight: 38, minWidth: 68, borderRadius: 14,
//     alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14,
//     backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   topActionPrimary: {
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderColor: 'rgba(103,232,240,0.28)',
//   },
//   topActionText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   topActionPrimaryText: { color: '#D8FAFF', fontSize: 12, fontWeight: '800' },
//   topBadge: {
//     flex: 1, minHeight: 38, borderRadius: 999,
//     alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14,
//     backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.22)',
//   },
//   topBadgeText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   profileTopSection: { alignItems: 'center', marginBottom: 18 },
//   profileImageWrap: {
//     width: 108, height: 108, borderRadius: 30, overflow: 'hidden',
//     backgroundColor: '#fff', marginBottom: 16, borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   profileImage: { width: '100%', height: '100%' },
//   name: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '800', marginBottom: 5, textAlign: 'center' },
//   role: { color: '#67E6E8', fontSize: 14, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
//   bio: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 21, textAlign: 'center', maxWidth: '92%' },
//   bioEmpty: { color: 'rgba(255,255,255,0.25)', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
//   statsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
//   statPill: {
//     flex: 1, minHeight: 72, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10,
//     alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   statValue: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
//   statLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: '600', textAlign: 'center' },
//   sectionWrap: { marginBottom: 14 },
//   sectionTitle: { color: COLORS.textPrimary, fontSize: 19, fontWeight: '800', marginBottom: 14 },
//   inputWrap: { marginBottom: 14 },
//   inputLabel: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6, fontWeight: '600' },
//   input: {
//     minHeight: 52, borderRadius: 16, borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.045)',
//     color: COLORS.textPrimary, fontSize: 14, paddingHorizontal: 14, paddingVertical: 12,
//   },
//   inputReadonly: { opacity: 0.92 },
//   textArea: { minHeight: 110, textAlignVertical: 'top' },
//   actionButtonsWrap: { marginTop: 6, gap: 12 },
//   primaryWrap: { marginTop: 8, borderRadius: 16, overflow: 'hidden' },
//   primaryButton: { minHeight: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 16, overflow: 'hidden' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
//   primaryButtonText: { color: '#12343A', fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },
//   secondaryButton: {
//     minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.10)',
//   },
//   secondaryButtonText: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700' },
//   logoutButton: {
//     minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(220,53,69,0.18)', borderWidth: 1,
//     borderColor: 'rgba(220,53,69,0.38)',
//   },
//   logoutButtonText: { color: '#FFB8C1', fontSize: 14, fontWeight: '800' },
//   buttonPressed: { opacity: 0.9, transform: [{ scale: 0.995 }] },
// });


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Image, ScrollView, Pressable, TextInput, Animated,
//   KeyboardAvoidingView, Platform, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as LocalAuthentication from 'expo-local-authentication';
// import { COLORS } from '../theme';
// import { getProfileApi, updateProfileApi } from '../utils/apiService';
// import {
//   getUserFingerprintEnabled,
//   setUserFingerprintEnabled,
// } from '../utils/authStorage';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const DEFAULT_PROFILE_IMAGE = require('../../assets/images/apps/logo.png');

// // ── Toggle Switch ─────────────────────────────────
// function Toggle({ value, onToggle }) {
//   const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
//   useEffect(() => {
//     Animated.timing(anim, {
//       toValue: value ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [value]);
//   const trackBg  = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.08)', 'rgba(103,230,232,0.22)'] });
//   const thumbPos = anim.interpolate({ inputRange: [0, 1], outputRange: [3, 22] });
//   const thumbCol = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.30)', '#67E6E8'] });
//   return (
//     <Pressable onPress={onToggle}>
//       <Animated.View style={[tgStyles.track, { backgroundColor: trackBg, borderColor: value ? 'rgba(103,230,232,0.28)' : 'rgba(255,255,255,0.09)' }]}>
//         <Animated.View style={[tgStyles.thumb, { left: thumbPos, backgroundColor: thumbCol }]} />
//       </Animated.View>
//     </Pressable>
//   );
// }
// const tgStyles = StyleSheet.create({
//   track: { width: 46, height: 26, borderRadius: 13, borderWidth: 1, position: 'relative' },
//   thumb: { width: 20, height: 20, borderRadius: 10, position: 'absolute', top: 3 },
// });

// // ── Input Field ───────────────────────────────────
// function InputField({ label, value, onChangeText, placeholder,
//   multiline = false, editable = true, keyboardType = 'default' }) {
//   return (
//     <View style={styles.inputWrap}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="rgba(255,255,255,0.35)"
//         multiline={multiline}
//         editable={editable}
//         keyboardType={keyboardType}
//         style={[
//           styles.input,
//           multiline && styles.textArea,
//           !editable && styles.inputReadonly,
//         ]}
//       />
//     </View>
//   );
// }

// function StatPill({ label, value }) {
//   return (
//     <View style={styles.statPill}>
//       <Text style={styles.statValue} numberOfLines={1}>
//         {value && value.trim() ? value : '—'}
//       </Text>
//       <Text style={styles.statLabel}>{label}</Text>
//     </View>
//   );
// }

// export default function ProfileScreen({ navigation, route }) {
//   const routeUser = route?.params?.user || null;

//   const [user, setUser] = useState({
//     id:         routeUser?.id || null,
//     name:       routeUser?.fullName || routeUser?.name || 'User',
//     fullName:   routeUser?.fullName || routeUser?.name || 'User',
//     email:      routeUser?.email || '',
//     phone:      routeUser?.mobile || routeUser?.phone || '',
//     role:       routeUser?.role || 'User',
//     location:   routeUser?.location || '',
//     company:    routeUser?.company || '',
//     department: routeUser?.department || '',
//     bio:        routeUser?.bio || '',
//     image:      routeUser?.image || null,
//   });

//   const [form,           setForm]           = useState({ ...user });
//   const [isEditing,      setIsEditing]      = useState(false);
//   const [saving,         setSaving]         = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [fpEnabled,      setFpEnabled]      = useState(false);
//   const [fpSupported,    setFpSupported]    = useState(false);
//   const [loadingFp,      setLoadingFp]      = useState(false);

//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();
//   const slideAnim = useRef(new Animated.Value(120)).current;
//   const fadeAnim  = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
//       Animated.timing(fadeAnim,  { toValue: 1, duration: 950, useNativeDriver: true }),
//     ]).start();
//     checkFpSupport();
//     loadFpState();
//   }, []);

//   useEffect(() => {
//     if (user.id) fetchLatestProfile();
//   }, [user.id]);

//   const checkFpSupport = async () => {
//     try {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled   = await LocalAuthentication.isEnrolledAsync();
//       setFpSupported(compatible && enrolled);
//     } catch (_) {
//       setFpSupported(false);
//     }
//   };

//   const loadFpState = async () => {
//     const enabled = await getUserFingerprintEnabled();
//     setFpEnabled(enabled);
//   };

//   const fetchLatestProfile = async () => {
//     try {
//       setLoadingProfile(true);
//       const data = await getProfileApi(user.id);
//       const updated = {
//         id:         data.id,
//         name:       data.fullName || data.name || 'User',
//         fullName:   data.fullName || data.name || 'User',
//         email:      data.email || '',
//         phone:      data.mobile || data.phone || '',
//         role:       data.role || 'User',
//         location:   data.location || '',
//         company:    data.company || '',
//         department: data.department || '',
//         bio:        data.bio || '',
//         image:      data.image || null,
//       };
//       setUser(updated);
//       setForm(updated);
//     } catch (error) {
//       console.log('fetchLatestProfile error:', error);
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   // ── Fingerprint Toggle ────────────────────────
//   const handleFpToggle = async () => {
//     if (!fpSupported) {
//       showAlert(
//         'Not Available',
//         'This device does not support biometric authentication or no fingerprint is enrolled.\n\nPlease enroll a fingerprint in device Settings.'
//       );
//       return;
//     }

//     const newVal = !fpEnabled;

//     if (newVal) {
//       try {
//         setLoadingFp(true);
//         const result = await LocalAuthentication.authenticateAsync({
//           promptMessage: 'Confirm your fingerprint to enable biometric login',
//           fallbackLabel: 'Use Password',
//           cancelLabel:   'Cancel',
//         });
//         if (!result.success) {
//           showAlert('Cancelled', 'Fingerprint verification cancelled.');
//           return;
//         }
//       } catch (_) {
//         showAlert('Error', 'Fingerprint verification failed.');
//         return;
//       } finally {
//         setLoadingFp(false);
//       }
//     }

//     try {
//       setLoadingFp(true);
//       await setUserFingerprintEnabled(newVal);
//       setFpEnabled(newVal);
//       showAlert(
//         newVal ? '✅ Fingerprint Enabled' : '❌ Fingerprint Disabled',
//         newVal
//           ? 'Next time you open Sign In, tap "Sign in with Fingerprint" to login instantly.'
//           : 'Fingerprint login is now OFF.'
//       );
//     } catch (_) {
//       showAlert('Error', 'Could not save fingerprint preference.');
//     } finally {
//       setLoadingFp(false);
//     }
//   };

//   const profileImage = user?.image ? { uri: user.image } : DEFAULT_PROFILE_IMAGE;
//   const updateField  = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
//   const handleStartEdit  = () => { setForm({ ...user }); setIsEditing(true); };
//   const handleCancelEdit = () => { setForm({ ...user }); setIsEditing(false); };

//   const handleSaveProfile = async () => {
//     if (!user.id) {
//       showAlert('Error', 'User ID not found. Please login again.');
//       return;
//     }
//     try {
//       setSaving(true);
//       const payload = {
//         fullName:   (form.name || form.fullName || '').trim(),
//         phone:      (form.phone || '').trim(),
//         role:       (form.role || '').trim(),
//         location:   (form.location || '').trim(),
//         company:    (form.company || '').trim(),
//         department: (form.department || '').trim(),
//         bio:        (form.bio || '').trim(),
//       };
//       const updated = await updateProfileApi(user.id, payload);
//       const updatedUser = {
//         id:         updated.id || user.id,
//         name:       updated.fullName || updated.name || form.name,
//         fullName:   updated.fullName || updated.name || form.name,
//         email:      updated.email || user.email,
//         phone:      updated.mobile || updated.phone || form.phone,
//         role:       updated.role || form.role,
//         location:   updated.location || form.location,
//         company:    updated.company || form.company,
//         department: updated.department || form.department,
//         bio:        updated.bio || form.bio,
//         image:      user.image,
//       };
//       setUser(updatedUser);
//       setForm(updatedUser);
//       setIsEditing(false);
//       showAlert('✅ Success', 'Profile updated successfully!');
//     } catch (error) {
//       showAlert('Error', error.message || 'Failed to update profile.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = () => navigation.replace('SignIn');

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView style={styles.keyboardWrap} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
//             <Animated.View style={[styles.cardOuterWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//               <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.025)']} style={styles.card}>
//                 <View style={styles.topShine} />

//                 {/* Top Bar */}
//                 <View style={styles.topBar}>
//                   <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.topAction, pressed && styles.buttonPressed]}>
//                     <Text style={styles.topActionText}>Back</Text>
//                   </Pressable>
//                   <View style={styles.topBadge}>
//                     <Text style={styles.topBadgeText}>{isEditing ? 'Editing Profile' : 'My Profile'}</Text>
//                   </View>
//                   <Pressable
//                     onPress={isEditing ? handleSaveProfile : handleStartEdit}
//                     style={({ pressed }) => [styles.topAction, styles.topActionPrimary, pressed && styles.buttonPressed]}
//                     disabled={saving}
//                   >
//                     <Text style={styles.topActionPrimaryText}>
//                       {isEditing ? (saving ? 'Saving...' : 'Save') : 'Edit'}
//                     </Text>
//                   </Pressable>
//                 </View>

//                 {/* Avatar */}
//                 <View style={styles.profileTopSection}>
//                   <View style={styles.profileImageWrap}>
//                     <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
//                   </View>
//                   <Text style={styles.name}>{user.name}</Text>
//                   <Text style={styles.role}>{user.role || 'User'}</Text>
//                   {user.bio
//                     ? <Text style={styles.bio}>{user.bio}</Text>
//                     : <Text style={styles.bioEmpty}>Add a bio in Edit Profile</Text>
//                   }
//                 </View>

//                 {/* Stats */}
//                 <View style={styles.statsRow}>
//                   <StatPill label="Role"       value={user.role} />
//                   <StatPill label="Department" value={user.department} />
//                   <StatPill label="Location"   value={user.location} />
//                 </View>

//                 {/* ── Fingerprint Section ── */}
//                 {!isEditing && (
//                   <View style={styles.fpCard}>
//                     <View style={styles.fpRow}>
//                       <View style={{ flex: 1 }}>
//                         <Text style={styles.fpTitle}>
//                           {fpEnabled ? '✅ Fingerprint ON' : '☝ Fingerprint Login'}
//                         </Text>
//                         <Text style={styles.fpSub}>
//                           {fpEnabled
//                             ? 'Tap fingerprint on Sign In screen to login instantly.'
//                             : 'Enable to sign in with your fingerprint next time.'}
//                         </Text>
//                       </View>
//                       {loadingFp
//                         ? <ActivityIndicator color="#67E6E8" size="small" style={{ marginLeft: 12 }} />
//                         : <Toggle value={fpEnabled} onToggle={handleFpToggle} />
//                       }
//                     </View>
//                     {!fpSupported && (
//                       <View style={styles.fpWarnBox}>
//                         <Text style={styles.fpWarnText}>
//                           ⚠️ Device does not support biometrics or no fingerprint enrolled in Settings.
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 )}

//                 {/* Fields */}
//                 <View style={styles.sectionWrap}>
//                   <Text style={styles.sectionTitle}>{isEditing ? 'Edit Details' : 'Account Details'}</Text>
//                   <InputField label="Full Name"   value={isEditing ? form.name       : user.name}       onChangeText={t => updateField('name', t)}       placeholder="Enter full name"            editable={isEditing} />
//                   <InputField label="Role"        value={isEditing ? form.role       : user.role}       onChangeText={t => updateField('role', t)}       placeholder="e.g. Developer, Manager"    editable={isEditing} />
//                   <InputField label="Email"       value={user.email}                                    onChangeText={() => {}}                          placeholder="Email"                      editable={false} />
//                   <InputField label="Phone"       value={isEditing ? form.phone      : user.phone}      onChangeText={t => updateField('phone', t.replace(/[^0-9]/g, ''))} placeholder="10-digit mobile" keyboardType="phone-pad" editable={isEditing} />
//                   <InputField label="Location"    value={isEditing ? form.location   : user.location}   onChangeText={t => updateField('location', t)}   placeholder="e.g. Hyderabad, India"      editable={isEditing} />
//                   <InputField label="Company"     value={isEditing ? form.company    : user.company}    onChangeText={t => updateField('company', t)}    placeholder="e.g. My Company Pvt Ltd"    editable={isEditing} />
//                   <InputField label="Department"  value={isEditing ? form.department : user.department} onChangeText={t => updateField('department', t)} placeholder="e.g. Engineering, Sales"    editable={isEditing} />
//                   <InputField label="Bio"         value={isEditing ? form.bio        : user.bio}        onChangeText={t => updateField('bio', t)}        placeholder="Write something about yourself..." multiline editable={isEditing} />
//                 </View>

//                 {/* Action Buttons */}
//                 {isEditing ? (
//                   <View style={styles.actionButtonsWrap}>
//                     <Pressable onPress={handleSaveProfile} disabled={saving} style={({ pressed }) => [styles.primaryWrap, pressed && styles.buttonPressed]}>
//                       <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.primaryButton}>
//                         <View style={styles.buttonTopShine} />
//                         <Text style={styles.primaryButtonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
//                       </LinearGradient>
//                     </Pressable>
//                     <Pressable onPress={handleCancelEdit} style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
//                       <Text style={styles.secondaryButtonText}>Cancel</Text>
//                     </Pressable>
//                   </View>
//                 ) : (
//                   <View style={styles.actionButtonsWrap}>
//                     <Pressable onPress={handleLogout} style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}>
//                       <Text style={styles.logoutButtonText}>Logout</Text>
//                     </Pressable>
//                   </View>
//                 )}

//               </LinearGradient>
//             </Animated.View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:      { flex: 1, backgroundColor: '#141B27' },
//   container:     { flex: 1 },
//   keyboardWrap:  { flex: 1 },
//   scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
//   card: { width: '100%', borderRadius: 30, paddingHorizontal: 22, paddingVertical: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 22, shadowOffset: { width: 0, height: 12 }, elevation: 14, overflow: 'hidden' },
//   topShine: { position: 'absolute', top: 0, left: '18%', right: '18%', height: 1, backgroundColor: 'rgba(255,255,255,0.16)' },
//   topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, gap: 10 },
//   topAction: { minHeight: 38, minWidth: 68, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   topActionPrimary: { backgroundColor: 'rgba(103,232,240,0.12)', borderColor: 'rgba(103,232,240,0.28)' },
//   topActionText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   topActionPrimaryText: { color: '#D8FAFF', fontSize: 12, fontWeight: '800' },
//   topBadge: { flex: 1, minHeight: 38, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14, backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.22)' },
//   topBadgeText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   profileTopSection: { alignItems: 'center', marginBottom: 18 },
//   profileImageWrap: { width: 108, height: 108, borderRadius: 30, overflow: 'hidden', backgroundColor: '#fff', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   profileImage: { width: '100%', height: '100%' },
//   name:     { color: COLORS.textPrimary, fontSize: 26, fontWeight: '800', marginBottom: 5, textAlign: 'center' },
//   role:     { color: '#67E6E8', fontSize: 14, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
//   bio:      { color: COLORS.textSecondary, fontSize: 13, lineHeight: 21, textAlign: 'center', maxWidth: '92%' },
//   bioEmpty: { color: 'rgba(255,255,255,0.25)', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
//   statsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
//   statPill: { flex: 1, minHeight: 72, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   statValue: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
//   statLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: '600', textAlign: 'center' },

//   // ── Fingerprint Card ──
//   fpCard:   { backgroundColor: 'rgba(103,230,232,0.05)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.18)', borderRadius: 18, padding: 14, marginBottom: 18 },
//   fpRow:    { flexDirection: 'row', alignItems: 'center' },
//   fpTitle:  { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 4 },
//   fpSub:    { color: 'rgba(255,255,255,0.42)', fontSize: 11, lineHeight: 16, paddingRight: 12 },
//   fpWarnBox:  { marginTop: 10, backgroundColor: 'rgba(255,184,77,0.08)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.28)', borderRadius: 10, padding: 10 },
//   fpWarnText: { color: 'rgba(255,210,100,0.85)', fontSize: 11, lineHeight: 17 },

//   sectionWrap:  { marginBottom: 14 },
//   sectionTitle: { color: COLORS.textPrimary, fontSize: 19, fontWeight: '800', marginBottom: 14 },
//   inputWrap:    { marginBottom: 14 },
//   inputLabel:   { color: COLORS.textMuted, fontSize: 11, marginBottom: 6, fontWeight: '600' },
//   input: { minHeight: 52, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.045)', color: COLORS.textPrimary, fontSize: 14, paddingHorizontal: 14, paddingVertical: 12 },
//   inputReadonly: { opacity: 0.92 },
//   textArea:     { minHeight: 110, textAlignVertical: 'top' },
//   actionButtonsWrap: { marginTop: 6, gap: 12 },
//   primaryWrap:   { marginTop: 8, borderRadius: 16, overflow: 'hidden' },
//   primaryButton: { minHeight: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 16, overflow: 'hidden' },
//   buttonTopShine:    { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
//   primaryButtonText: { color: '#12343A', fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },
//   secondaryButton:     { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   secondaryButtonText: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700' },
//   logoutButton:     { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(220,53,69,0.18)', borderWidth: 1, borderColor: 'rgba(220,53,69,0.38)' },
//   logoutButtonText: { color: '#FFB8C1', fontSize: 14, fontWeight: '800' },
//   buttonPressed:    { opacity: 0.9, transform: [{ scale: 0.995 }] },
// });


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   Image, ScrollView, Pressable, TextInput, Animated,
//   KeyboardAvoidingView, Platform, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as LocalAuthentication from 'expo-local-authentication';
// import { COLORS } from '../theme';
// import { getProfileApi, updateProfileApi } from '../utils/apiService';
// import {
//   getUserFingerprintEnabled,
//   setUserFingerprintEnabled,
// } from '../utils/authStorage';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const DEFAULT_PROFILE_IMAGE = require('../../assets/images/apps/logo.png');

// // ── Toggle Switch ─────────────────────────────────
// function Toggle({ value, onToggle }) {
//   const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
//   useEffect(() => {
//     Animated.timing(anim, {
//       toValue: value ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [value]);
//   const trackBg  = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.08)', 'rgba(103,230,232,0.22)'] });
//   const thumbPos = anim.interpolate({ inputRange: [0, 1], outputRange: [3, 22] });
//   const thumbCol = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.30)', '#67E6E8'] });
//   return (
//     <Pressable onPress={onToggle}>
//       <Animated.View style={[tgStyles.track, { backgroundColor: trackBg, borderColor: value ? 'rgba(103,230,232,0.28)' : 'rgba(255,255,255,0.09)' }]}>
//         <Animated.View style={[tgStyles.thumb, { left: thumbPos, backgroundColor: thumbCol }]} />
//       </Animated.View>
//     </Pressable>
//   );
// }
// const tgStyles = StyleSheet.create({
//   track: { width: 46, height: 26, borderRadius: 13, borderWidth: 1, position: 'relative' },
//   thumb: { width: 20, height: 20, borderRadius: 10, position: 'absolute', top: 3 },
// });

// // ── Input Field ───────────────────────────────────
// function InputField({ label, value, onChangeText, placeholder,
//   multiline = false, editable = true, keyboardType = 'default' }) {
//   return (
//     <View style={styles.inputWrap}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="rgba(255,255,255,0.35)"
//         multiline={multiline}
//         editable={editable}
//         keyboardType={keyboardType}
//         style={[
//           styles.input,
//           multiline && styles.textArea,
//           !editable && styles.inputReadonly,
//         ]}
//       />
//     </View>
//   );
// }

// function StatPill({ label, value }) {
//   return (
//     <View style={styles.statPill}>
//       <Text style={styles.statValue} numberOfLines={1}>
//         {value && value.trim() ? value : '—'}
//       </Text>
//       <Text style={styles.statLabel}>{label}</Text>
//     </View>
//   );
// }

// export default function ProfileScreen({ navigation, route }) {
//   const routeUser = route?.params?.user || null;

//   const [user, setUser] = useState({
//     id:         routeUser?.id || null,
//     name:       routeUser?.fullName || routeUser?.name || 'User',
//     fullName:   routeUser?.fullName || routeUser?.name || 'User',
//     email:      routeUser?.email || '',
//     phone:      routeUser?.mobile || routeUser?.phone || '',
//     role:       routeUser?.role || 'User',
//     location:   routeUser?.location || '',
//     company:    routeUser?.company || '',
//     department: routeUser?.department || '',
//     bio:        routeUser?.bio || '',
//     image:      routeUser?.image || null,
//   });

//   const [form,           setForm]           = useState({ ...user });
//   const [isEditing,      setIsEditing]      = useState(false);
//   const [saving,         setSaving]         = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [fpEnabled,      setFpEnabled]      = useState(false);
//   const [fpSupported,    setFpSupported]    = useState(false);
//   const [loadingFp,      setLoadingFp]      = useState(false);

//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();
//   const slideAnim = useRef(new Animated.Value(120)).current;
//   const fadeAnim  = useRef(new Animated.Value(0)).current;

//   // ── isMounted ref — navigation back prevent చేయడానికి ──
//   const isMounted = useRef(true);
//   useEffect(() => {
//     isMounted.current = true;
//     return () => { isMounted.current = false; };
//   }, []);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
//       Animated.timing(fadeAnim,  { toValue: 1, duration: 950, useNativeDriver: true }),
//     ]).start();
//     checkFpSupport();
//     loadFpState();
//   }, []);

//   useEffect(() => {
//     if (user.id) fetchLatestProfile();
//   }, [user.id]);

//   const checkFpSupport = async () => {
//     try {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled   = await LocalAuthentication.isEnrolledAsync();
//       if (isMounted.current) setFpSupported(compatible && enrolled);
//     } catch (_) {
//       if (isMounted.current) setFpSupported(false);
//     }
//   };

//   const loadFpState = async () => {
//     const enabled = await getUserFingerprintEnabled();
//     if (isMounted.current) setFpEnabled(enabled);
//   };

//   const fetchLatestProfile = async () => {
//     try {
//       setLoadingProfile(true);
//       const data = await getProfileApi(user.id);
//       const updated = {
//         id:         data.id,
//         name:       data.fullName || data.name || 'User',
//         fullName:   data.fullName || data.name || 'User',
//         email:      data.email || '',
//         phone:      data.mobile || data.phone || '',
//         role:       data.role || 'User',
//         location:   data.location || '',
//         company:    data.company || '',
//         department: data.department || '',
//         bio:        data.bio || '',
//         image:      data.image || null,
//       };
//       if (isMounted.current) {
//         setUser(updated);
//         setForm(updated);
//       }
//     } catch (error) {
//       console.log('fetchLatestProfile error:', error);
//     } finally {
//       if (isMounted.current) setLoadingProfile(false);
//     }
//   };

//   // ── Fingerprint Toggle — back కి వెళ్ళకుండా fix చేశాను ──
//   const handleFpToggle = async () => {
//     // Already loading అయితే skip
//     if (loadingFp) return;

//     if (!fpSupported) {
//       showAlert(
//         'Not Available',
//         'This device does not support biometric authentication or no fingerprint is enrolled.\n\nPlease enroll a fingerprint in device Settings.'
//       );
//       return;
//     }

//     const newVal = !fpEnabled;

//     // Enable చేసేటప్పుడు fingerprint verify చేయి
//     if (newVal) {
//       let authResult = false;
//       try {
//         setLoadingFp(true);
//         const result = await LocalAuthentication.authenticateAsync({
//           promptMessage: 'Confirm fingerprint to enable biometric login',
//           fallbackLabel: 'Use Password',
//           cancelLabel:   'Cancel',
//         });
//         authResult = result.success;
//       } catch (_) {
//         authResult = false;
//       } finally {
//         // setLoadingFp(false) ని ఇక్కడ చేయకూడదు — below లో చేస్తాం
//       }

//       if (!authResult) {
//         // Cancelled or failed — state మార్చకుండా loading reset
//         if (isMounted.current) setLoadingFp(false);
//         return;  // ← ఇక్కడ return — alert చూపించకుండా, navigate చేయకుండా
//       }
//     }

//     // Save to storage
//     try {
//       await setUserFingerprintEnabled(newVal);
//       if (isMounted.current) {
//         setFpEnabled(newVal);
//         setLoadingFp(false);
//         // Alert లో navigation call లేదు — screen అలాగే ఉంటుంది
//         showAlert(
//           newVal ? '✅ Fingerprint Enabled' : '❌ Fingerprint Disabled',
//           newVal
//             ? 'Next time you open Sign In, tap "Sign in with Fingerprint" to login instantly.'
//             : 'Fingerprint login is now OFF. Sign In requires email & password.'
//         );
//       }
//     } catch (_) {
//       if (isMounted.current) {
//         setLoadingFp(false);
//         showAlert('Error', 'Could not save fingerprint preference.');
//       }
//     }
//   };

//   const profileImage = user?.image ? { uri: user.image } : DEFAULT_PROFILE_IMAGE;
//   const updateField  = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
//   const handleStartEdit  = () => { setForm({ ...user }); setIsEditing(true); };
//   const handleCancelEdit = () => { setForm({ ...user }); setIsEditing(false); };

//   const handleSaveProfile = async () => {
//     if (!user.id) {
//       showAlert('Error', 'User ID not found. Please login again.');
//       return;
//     }
//     try {
//       setSaving(true);
//       const payload = {
//         fullName:   (form.name || form.fullName || '').trim(),
//         phone:      (form.phone || '').trim(),
//         role:       (form.role || '').trim(),
//         location:   (form.location || '').trim(),
//         company:    (form.company || '').trim(),
//         department: (form.department || '').trim(),
//         bio:        (form.bio || '').trim(),
//       };
//       const updated = await updateProfileApi(user.id, payload);
//       const updatedUser = {
//         id:         updated.id || user.id,
//         name:       updated.fullName || updated.name || form.name,
//         fullName:   updated.fullName || updated.name || form.name,
//         email:      updated.email || user.email,
//         phone:      updated.mobile || updated.phone || form.phone,
//         role:       updated.role || form.role,
//         location:   updated.location || form.location,
//         company:    updated.company || form.company,
//         department: updated.department || form.department,
//         bio:        updated.bio || form.bio,
//         image:      user.image,
//       };
//       if (isMounted.current) {
//         setUser(updatedUser);
//         setForm(updatedUser);
//         setIsEditing(false);
//         showAlert('✅ Success', 'Profile updated successfully!');
//       }
//     } catch (error) {
//       if (isMounted.current) showAlert('Error', error.message || 'Failed to update profile.');
//     } finally {
//       if (isMounted.current) setSaving(false);
//     }
//   };

//   const handleLogout = () => navigation.replace('SignIn');

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView style={styles.keyboardWrap} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
//             <Animated.View style={[styles.cardOuterWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//               <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.025)']} style={styles.card}>
//                 <View style={styles.topShine} />

//                 {/* Top Bar */}
//                 <View style={styles.topBar}>
//                   <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.topAction, pressed && styles.buttonPressed]}>
//                     <Text style={styles.topActionText}>Back</Text>
//                   </Pressable>
//                   <View style={styles.topBadge}>
//                     <Text style={styles.topBadgeText}>{isEditing ? 'Editing Profile' : 'My Profile'}</Text>
//                   </View>
//                   <Pressable
//                     onPress={isEditing ? handleSaveProfile : handleStartEdit}
//                     style={({ pressed }) => [styles.topAction, styles.topActionPrimary, pressed && styles.buttonPressed]}
//                     disabled={saving}
//                   >
//                     <Text style={styles.topActionPrimaryText}>
//                       {isEditing ? (saving ? 'Saving...' : 'Save') : 'Edit'}
//                     </Text>
//                   </Pressable>
//                 </View>

//                 {/* Avatar */}
//                 <View style={styles.profileTopSection}>
//                   <View style={styles.profileImageWrap}>
//                     <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
//                   </View>
//                   <Text style={styles.name}>{user.name}</Text>
//                   <Text style={styles.role}>{user.role || 'User'}</Text>
//                   {user.bio
//                     ? <Text style={styles.bio}>{user.bio}</Text>
//                     : <Text style={styles.bioEmpty}>Add a bio in Edit Profile</Text>
//                   }
//                 </View>

//                 {/* Stats */}
//                 <View style={styles.statsRow}>
//                   <StatPill label="Role"       value={user.role} />
//                   <StatPill label="Department" value={user.department} />
//                   <StatPill label="Location"   value={user.location} />
//                 </View>

//                 {/* ── Fingerprint Section ── */}
//                 {!isEditing && (
//                   <View style={styles.fpCard}>
//                     <View style={styles.fpRow}>
//                       <View style={{ flex: 1 }}>
//                         <Text style={styles.fpTitle}>
//                           {fpEnabled ? '✅ Fingerprint ON' : '☝ Fingerprint Login'}
//                         </Text>
//                         <Text style={styles.fpSub}>
//                           {fpEnabled
//                             ? 'Tap fingerprint on Sign In screen to login instantly.'
//                             : 'Enable to sign in with your fingerprint next time.'}
//                         </Text>
//                       </View>
//                       {loadingFp
//                         ? <ActivityIndicator color="#67E6E8" size="small" style={{ marginLeft: 12 }} />
//                         : <Toggle value={fpEnabled} onToggle={handleFpToggle} />
//                       }
//                     </View>
//                     {!fpSupported && (
//                       <View style={styles.fpWarnBox}>
//                         <Text style={styles.fpWarnText}>
//                           ⚠️ Device does not support biometrics or no fingerprint enrolled in Settings.
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 )}

//                 {/* Fields */}
//                 <View style={styles.sectionWrap}>
//                   <Text style={styles.sectionTitle}>{isEditing ? 'Edit Details' : 'Account Details'}</Text>
//                   <InputField label="Full Name"   value={isEditing ? form.name       : user.name}       onChangeText={t => updateField('name', t)}       placeholder="Enter full name"            editable={isEditing} />
//                   <InputField label="Role"        value={isEditing ? form.role       : user.role}       onChangeText={t => updateField('role', t)}       placeholder="e.g. Developer, Manager"    editable={isEditing} />
//                   <InputField label="Email"       value={user.email}                                    onChangeText={() => {}}                          placeholder="Email"                      editable={false} />
//                   <InputField label="Phone"       value={isEditing ? form.phone      : user.phone}      onChangeText={t => updateField('phone', t.replace(/[^0-9]/g, ''))} placeholder="10-digit mobile" keyboardType="phone-pad" editable={isEditing} />
//                   <InputField label="Location"    value={isEditing ? form.location   : user.location}   onChangeText={t => updateField('location', t)}   placeholder="e.g. Hyderabad, India"      editable={isEditing} />
//                   <InputField label="Company"     value={isEditing ? form.company    : user.company}    onChangeText={t => updateField('company', t)}    placeholder="e.g. My Company Pvt Ltd"    editable={isEditing} />
//                   <InputField label="Department"  value={isEditing ? form.department : user.department} onChangeText={t => updateField('department', t)} placeholder="e.g. Engineering, Sales"    editable={isEditing} />
//                   <InputField label="Bio"         value={isEditing ? form.bio        : user.bio}        onChangeText={t => updateField('bio', t)}        placeholder="Write something about yourself..." multiline editable={isEditing} />
//                 </View>

//                 {/* Action Buttons */}
//                 {isEditing ? (
//                   <View style={styles.actionButtonsWrap}>
//                     <Pressable onPress={handleSaveProfile} disabled={saving} style={({ pressed }) => [styles.primaryWrap, pressed && styles.buttonPressed]}>
//                       <LinearGradient colors={['#67E6E8', '#42DDE2', '#1FCFD6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.primaryButton}>
//                         <View style={styles.buttonTopShine} />
//                         <Text style={styles.primaryButtonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
//                       </LinearGradient>
//                     </Pressable>
//                     <Pressable onPress={handleCancelEdit} style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
//                       <Text style={styles.secondaryButtonText}>Cancel</Text>
//                     </Pressable>
//                   </View>
//                 ) : (
//                   <View style={styles.actionButtonsWrap}>
//                     <Pressable onPress={handleLogout} style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}>
//                       <Text style={styles.logoutButtonText}>Logout</Text>
//                     </Pressable>
//                   </View>
//                 )}

//               </LinearGradient>
//             </Animated.View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:      { flex: 1, backgroundColor: '#141B27' },
//   container:     { flex: 1 },
//   keyboardWrap:  { flex: 1 },
//   scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
//   card: { width: '100%', borderRadius: 30, paddingHorizontal: 22, paddingVertical: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 22, shadowOffset: { width: 0, height: 12 }, elevation: 14, overflow: 'hidden' },
//   topShine: { position: 'absolute', top: 0, left: '18%', right: '18%', height: 1, backgroundColor: 'rgba(255,255,255,0.16)' },
//   topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, gap: 10 },
//   topAction: { minHeight: 38, minWidth: 68, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   topActionPrimary: { backgroundColor: 'rgba(103,232,240,0.12)', borderColor: 'rgba(103,232,240,0.28)' },
//   topActionText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' },
//   topActionPrimaryText: { color: '#D8FAFF', fontSize: 12, fontWeight: '800' },
//   topBadge: { flex: 1, minHeight: 38, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14, backgroundColor: 'rgba(103,232,240,0.10)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.22)' },
//   topBadgeText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   profileTopSection: { alignItems: 'center', marginBottom: 18 },
//   profileImageWrap: { width: 108, height: 108, borderRadius: 30, overflow: 'hidden', backgroundColor: '#fff', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   profileImage: { width: '100%', height: '100%' },
//   name:     { color: COLORS.textPrimary, fontSize: 26, fontWeight: '800', marginBottom: 5, textAlign: 'center' },
//   role:     { color: '#67E6E8', fontSize: 14, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
//   bio:      { color: COLORS.textSecondary, fontSize: 13, lineHeight: 21, textAlign: 'center', maxWidth: '92%' },
//   bioEmpty: { color: 'rgba(255,255,255,0.25)', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
//   statsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
//   statPill: { flex: 1, minHeight: 72, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
//   statValue: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
//   statLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: '600', textAlign: 'center' },
//   fpCard:   { backgroundColor: 'rgba(103,230,232,0.05)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.18)', borderRadius: 18, padding: 14, marginBottom: 18 },
//   fpRow:    { flexDirection: 'row', alignItems: 'center' },
//   fpTitle:  { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 4 },
//   fpSub:    { color: 'rgba(255,255,255,0.42)', fontSize: 11, lineHeight: 16, paddingRight: 12 },
//   fpWarnBox:  { marginTop: 10, backgroundColor: 'rgba(255,184,77,0.08)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.28)', borderRadius: 10, padding: 10 },
//   fpWarnText: { color: 'rgba(255,210,100,0.85)', fontSize: 11, lineHeight: 17 },
//   sectionWrap:  { marginBottom: 14 },
//   sectionTitle: { color: COLORS.textPrimary, fontSize: 19, fontWeight: '800', marginBottom: 14 },
//   inputWrap:    { marginBottom: 14 },
//   inputLabel:   { color: COLORS.textMuted, fontSize: 11, marginBottom: 6, fontWeight: '600' },
//   input: { minHeight: 52, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(255,255,255,0.045)', color: COLORS.textPrimary, fontSize: 14, paddingHorizontal: 14, paddingVertical: 12 },
//   inputReadonly: { opacity: 0.92 },
//   textArea:     { minHeight: 110, textAlignVertical: 'top' },
//   actionButtonsWrap: { marginTop: 6, gap: 12 },
//   primaryWrap:   { marginTop: 8, borderRadius: 16, overflow: 'hidden' },
//   primaryButton: { minHeight: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 16, overflow: 'hidden' },
//   buttonTopShine:    { position: 'absolute', top: 0, left: 8, right: 8, height: 1.2, backgroundColor: 'rgba(255,255,255,0.32)' },
//   primaryButtonText: { color: '#12343A', fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },
//   secondaryButton:     { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
//   secondaryButtonText: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700' },
//   logoutButton:     { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(220,53,69,0.18)', borderWidth: 1, borderColor: 'rgba(220,53,69,0.38)' },
//   logoutButtonText: { color: '#FFB8C1', fontSize: 14, fontWeight: '800' },
//   buttonPressed:    { opacity: 0.9, transform: [{ scale: 0.995 }] },
// });


import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  Image, ScrollView, Pressable, TextInput, Animated,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { COLORS } from '../theme';
import { getProfileApi, updateProfileApi } from '../utils/apiService';
import { getUserFingerprintEnabled, setUserFingerprintEnabled } from '../utils/authStorage';
import useCustomAlert from '../utils/useCustomAlert';
import CustomAlertModal from '../components/CustomAlertModal';

const DEFAULT_PROFILE_IMAGE = require('../../assets/images/apps/logo.png');

function Toggle({ value, onToggle }) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: value ? 1 : 0, duration: 200, useNativeDriver: false }).start();
  }, [value]);
  const trackBg  = anim.interpolate({ inputRange: [0,1], outputRange: ['rgba(255,255,255,0.08)','rgba(103,230,232,0.25)'] });
  const thumbPos = anim.interpolate({ inputRange: [0,1], outputRange: [3,22] });
  const thumbCol = anim.interpolate({ inputRange: [0,1], outputRange: ['rgba(255,255,255,0.30)','#67E6E8'] });
  return (
    <Pressable onPress={onToggle}>
      <Animated.View style={[tgStyles.track, { backgroundColor: trackBg, borderColor: value ? 'rgba(103,230,232,0.35)' : 'rgba(255,255,255,0.12)' }]}>
        <Animated.View style={[tgStyles.thumb, { left: thumbPos, backgroundColor: thumbCol }]} />
      </Animated.View>
    </Pressable>
  );
}
const tgStyles = StyleSheet.create({
  track: { width: 48, height: 28, borderRadius: 14, borderWidth: 1.5, position: 'relative' },
  thumb: { width: 22, height: 22, borderRadius: 11, position: 'absolute', top: 2 },
});

function InputField({ label, value, onChangeText, placeholder, multiline = false, editable = true, keyboardType = 'default' }) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.25)"
        multiline={multiline}
        editable={editable}
        keyboardType={keyboardType}
        style={[styles.input, multiline && styles.textArea, !editable && styles.inputReadonly]}
      />
    </View>
  );
}

export default function ProfileScreen({ navigation, route }) {
  const routeUser = route?.params?.user || null;

  const [user, setUser] = useState({
    id:         routeUser?.id || null,
    name:       routeUser?.fullName || routeUser?.name || 'User',
    fullName:   routeUser?.fullName || routeUser?.name || 'User',
    email:      routeUser?.email || '',
    phone:      routeUser?.mobile || routeUser?.phone || '',
    role:       routeUser?.role || 'User',
    location:   routeUser?.location || '',
    company:    routeUser?.company || '',
    department: routeUser?.department || '',
    bio:        routeUser?.bio || '',
    image:      routeUser?.image || null,
  });

  const [form,           setForm]           = useState({ ...user });
  const [isEditing,      setIsEditing]      = useState(false);
  const [saving,         setSaving]         = useState(false);
  const [fpEnabled,      setFpEnabled]      = useState(false);
  const [fpSupported,    setFpSupported]    = useState(false);
  const [loadingFp,      setLoadingFp]      = useState(false);

  const { alertConfig, showAlert, hideAlert } = useCustomAlert();
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
    checkFpSupport();
    loadFpState();
  }, []);

  useEffect(() => {
    if (user.id) fetchLatestProfile();
  }, [user.id]);

  const checkFpSupport = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled   = await LocalAuthentication.isEnrolledAsync();
      if (isMounted.current) setFpSupported(compatible && enrolled);
    } catch (_) { if (isMounted.current) setFpSupported(false); }
  };

  const loadFpState = async () => {
    const enabled = await getUserFingerprintEnabled();
    if (isMounted.current) setFpEnabled(enabled);
  };

  const fetchLatestProfile = async () => {
    try {
      const data = await getProfileApi(user.id);
      const updated = {
        id: data.id, name: data.fullName || data.name || 'User',
        fullName: data.fullName || data.name || 'User', email: data.email || '',
        phone: data.mobile || data.phone || '', role: data.role || 'User',
        location: data.location || '', company: data.company || '',
        department: data.department || '', bio: data.bio || '', image: data.image || null,
      };
      if (isMounted.current) { setUser(updated); setForm(updated); }
    } catch (e) { console.log('fetchLatestProfile error:', e); }
  };

  const handleFpToggle = async () => {
    if (loadingFp) return;
    if (!fpSupported) {
      showAlert('Not Available', 'This device does not support biometrics or no fingerprint is enrolled in device Settings.');
      return;
    }
    const newVal = !fpEnabled;
    if (newVal) {
      let authResult = false;
      try {
        setLoadingFp(true);
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Confirm fingerprint to enable biometric login',
          fallbackLabel: 'Use Password', cancelLabel: 'Cancel',
        });
        authResult = result.success;
      } catch (_) { authResult = false; }
      if (!authResult) { if (isMounted.current) setLoadingFp(false); return; }
    }
    try {
      await setUserFingerprintEnabled(newVal);
      if (isMounted.current) {
        setFpEnabled(newVal);
        setLoadingFp(false);
        showAlert(
          newVal ? '✅ Enabled' : '❌ Disabled',
          newVal ? 'Fingerprint login is now active on Sign In screen.' : 'Fingerprint login is turned OFF.'
        );
      }
    } catch (_) {
      if (isMounted.current) { setLoadingFp(false); showAlert('Error', 'Could not save fingerprint preference.'); }
    }
  };

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSaveProfile = async () => {
    if (!user.id) { showAlert('Error', 'User ID not found. Please login again.'); return; }
    try {
      setSaving(true);
      const payload = {
        fullName: (form.name || form.fullName || '').trim(),
        phone: (form.phone || '').trim(), role: (form.role || '').trim(),
        location: (form.location || '').trim(), company: (form.company || '').trim(),
        department: (form.department || '').trim(), bio: (form.bio || '').trim(),
      };
      const updated = await updateProfileApi(user.id, payload);
      const updatedUser = {
        id: updated.id || user.id,
        name: updated.fullName || updated.name || form.name,
        fullName: updated.fullName || updated.name || form.name,
        email: updated.email || user.email,
        phone: updated.mobile || updated.phone || form.phone,
        role: updated.role || form.role, location: updated.location || form.location,
        company: updated.company || form.company, department: updated.department || form.department,
        bio: updated.bio || form.bio, image: user.image,
      };
      if (isMounted.current) {
        setUser(updatedUser); setForm(updatedUser);
        setIsEditing(false); showAlert('✅ Success', 'Profile updated successfully!');
      }
    } catch (error) {
      if (isMounted.current) showAlert('Error', error.message || 'Failed to update profile.');
    } finally { if (isMounted.current) setSaving(false); }
  };

  const profileImage = user?.image ? { uri: user.image } : DEFAULT_PROFILE_IMAGE;
  const initials = (user.name || 'U').charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <CustomAlertModal config={alertConfig} onHide={hideAlert} />

      <View style={styles.headerBar}>
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}>
          <Text style={styles.headerBtnText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Profile' : 'My Profile'}</Text>
        <Pressable
          onPress={isEditing ? handleSaveProfile : () => { setForm({ ...user }); setIsEditing(true); }}
          disabled={saving}
          style={({ pressed }) => [styles.headerBtnPrimary, pressed && styles.pressed]}
        >
          <Text style={styles.headerBtnPrimaryText}>
            {isEditing ? (saving ? 'Saving…' : 'Save') : 'Edit'}
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

            {/* ── Hero Card ── */}
            <LinearGradient colors={['rgba(103,230,232,0.12)','rgba(103,230,232,0.03)','transparent']} style={styles.heroCard}>
              <View style={styles.avatarWrap}>
                {user.image
                  ? <Image source={profileImage} style={styles.avatarImg} resizeMode="cover" />
                  : (
                    <LinearGradient colors={['rgba(103,230,232,0.3)','rgba(103,230,232,0.1)']} style={styles.avatarFallback}>
                      <Text style={styles.avatarInitial}>{initials}</Text>
                    </LinearGradient>
                  )
                }
                <View style={styles.avatarOnline} />
              </View>
              <Text style={styles.heroName}>{user.name}</Text>
              <View style={styles.roleChip}>
                <Text style={styles.roleChipText}>{user.role || 'User'}</Text>
              </View>
              {user.email ? <Text style={styles.heroEmail}>{user.email}</Text> : null}
              {user.bio
                ? <Text style={styles.heroBio}>{user.bio}</Text>
                : <Text style={styles.heroBioEmpty}>Add a bio in Edit Profile</Text>
              }

              {/* Stats row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{user.department || '—'}</Text>
                  <Text style={styles.statLbl}>Department</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{user.location || '—'}</Text>
                  <Text style={styles.statLbl}>Location</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statVal}>{user.company || '—'}</Text>
                  <Text style={styles.statLbl}>Company</Text>
                </View>
              </View>
            </LinearGradient>

            {/* ── Fingerprint Card ── */}
            {!isEditing && (
              <View style={styles.fpCard}>
                <View style={styles.fpTop}>
                  <LinearGradient
                    colors={fpEnabled ? ['rgba(103,230,232,0.25)','rgba(103,230,232,0.08)'] : ['rgba(255,255,255,0.08)','rgba(255,255,255,0.03)']}
                    style={styles.fpIconBox}
                  >
                    <Text style={styles.fpIconText}>☝</Text>
                  </LinearGradient>
                  <View style={styles.fpTextWrap}>
                    <Text style={styles.fpTitle}>Fingerprint Login</Text>
                    <Text style={styles.fpSub}>
                      {fpEnabled
                        ? 'Active — tap on Sign In to login instantly'
                        : 'Enable quick login with your fingerprint'}
                    </Text>
                  </View>
                  {loadingFp
                    ? <ActivityIndicator color="#67E6E8" size="small" />
                    : <Toggle value={fpEnabled} onToggle={handleFpToggle} />
                  }
                </View>

                <View style={[styles.fpStatus, fpEnabled ? styles.fpStatusOn : styles.fpStatusOff]}>
                  <Text style={[styles.fpStatusTxt, fpEnabled ? styles.fpStatusTxtOn : styles.fpStatusTxtOff]}>
                    {fpEnabled ? '● Fingerprint is enabled' : '○ Fingerprint is disabled'}
                  </Text>
                </View>

                {!fpSupported && (
                  <View style={styles.fpWarn}>
                    <Text style={styles.fpWarnTxt}>⚠️ No biometric hardware or fingerprint not enrolled in Settings.</Text>
                  </View>
                )}
              </View>
            )}

            {/* ── Account Details ── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{isEditing ? '✏️ Edit Details' : '👤 Account Details'}</Text>

              <InputField label="Full Name"  value={isEditing ? form.name       : user.name}       onChangeText={t => updateField('name', t)}       placeholder="Enter full name"         editable={isEditing} />
              <InputField label="Role"       value={isEditing ? form.role       : user.role}       onChangeText={t => updateField('role', t)}       placeholder="e.g. Developer"          editable={isEditing} />
              <InputField label="Email"      value={user.email}                                    onChangeText={() => {}}                          placeholder="Email"                   editable={false} />
              <InputField label="Phone"      value={isEditing ? form.phone      : user.phone}      onChangeText={t => updateField('phone', t.replace(/[^0-9]/g,''))} placeholder="Mobile number" keyboardType="phone-pad" editable={isEditing} />
              <InputField label="Location"   value={isEditing ? form.location   : user.location}   onChangeText={t => updateField('location', t)}   placeholder="e.g. Hyderabad, India"   editable={isEditing} />
              <InputField label="Company"    value={isEditing ? form.company    : user.company}    onChangeText={t => updateField('company', t)}    placeholder="Company name"             editable={isEditing} />
              <InputField label="Department" value={isEditing ? form.department : user.department} onChangeText={t => updateField('department', t)} placeholder="e.g. Engineering"        editable={isEditing} />
              <InputField label="Bio"        value={isEditing ? form.bio        : user.bio}        onChangeText={t => updateField('bio', t)}        placeholder="Write about yourself…"   multiline editable={isEditing} />
            </View>

            {/* ── Buttons ── */}
            {isEditing ? (
              <View style={styles.btnWrap}>
                <Pressable onPress={handleSaveProfile} disabled={saving} style={({ pressed }) => [pressed && styles.pressed]}>
                  <LinearGradient colors={['#67E6E8','#1FCFD6']} start={{ x:0,y:0 }} end={{ x:1,y:0 }} style={styles.btnPrimary}>
                    <Text style={styles.btnPrimaryTxt}>{saving ? 'Saving…' : '💾 Save Changes'}</Text>
                  </LinearGradient>
                </Pressable>
                <Pressable onPress={() => { setForm({ ...user }); setIsEditing(false); }} style={({ pressed }) => [styles.btnSecondary, pressed && styles.pressed]}>
                  <Text style={styles.btnSecondaryTxt}>Cancel</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.btnWrap}>
                <Pressable
                  onPress={() => showAlert('Logout', 'Are you sure you want to logout?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
                  ])}
                  style={({ pressed }) => [styles.btnLogout, pressed && styles.pressed]}
                >
                  <Text style={styles.btnLogoutTxt}>🚪 Logout</Text>
                </Pressable>
              </View>
            )}

            <View style={{ height: 40 }} />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0D1117' },
  scroll:   { paddingHorizontal: 16, paddingBottom: 40 },
  pressed:  { opacity: 0.75 },

  // ── Header ──
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 46, paddingBottom: 14, backgroundColor: '#0D1117', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerBtn:        { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  headerBtnText:    { color: '#67E6E8', fontSize: 12, fontWeight: '700' },
  headerTitle:      { color: '#FFF', fontSize: 16, fontWeight: '800' },
  headerBtnPrimary: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 10, backgroundColor: 'rgba(103,230,232,0.15)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.30)' },
  headerBtnPrimaryText: { color: '#67E6E8', fontSize: 12, fontWeight: '800' },

  // ── Hero Card ──
  heroCard:      { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(103,230,232,0.15)', padding: 20, marginTop: 16, marginBottom: 14, alignItems: 'center' },
  avatarWrap:    { position: 'relative', marginBottom: 14 },
  avatarImg:     { width: 88, height: 88, borderRadius: 28, borderWidth: 2, borderColor: 'rgba(103,230,232,0.30)' },
  avatarFallback:{ width: 88, height: 88, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(103,230,232,0.30)' },
  avatarInitial: { color: '#67E6E8', fontSize: 34, fontWeight: '800' },
  avatarOnline:  { position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderRadius: 7, backgroundColor: '#22C55E', borderWidth: 2, borderColor: '#0D1117' },
  heroName:      { color: '#FFF', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  roleChip:      { backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.25)', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 8 },
  roleChipText:  { color: '#67E6E8', fontSize: 11, fontWeight: '800', letterSpacing: 0.6 },
  heroEmail:     { color: 'rgba(255,255,255,0.40)', fontSize: 12, marginBottom: 8 },
  heroBio:       { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 20, textAlign: 'center', maxWidth: '90%', marginBottom: 16 },
  heroBioEmpty:  { color: 'rgba(255,255,255,0.20)', fontSize: 12, fontStyle: 'italic', marginBottom: 16 },
  statsRow:      { flexDirection: 'row', width: '100%', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingTop: 14, marginTop: 4 },
  statItem:      { flex: 1, alignItems: 'center' },
  statVal:       { color: '#FFF', fontSize: 12, fontWeight: '700', marginBottom: 3, textAlign: 'center' },
  statLbl:       { color: 'rgba(255,255,255,0.35)', fontSize: 10, textAlign: 'center' },
  statDivider:   { width: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginHorizontal: 4 },

  // ── Fingerprint Card ──
  fpCard:       { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.15)', borderRadius: 20, padding: 16, marginBottom: 14 },
  fpTop:        { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  fpIconBox:    { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  fpIconText:   { fontSize: 22 },
  fpTextWrap:   { flex: 1, marginRight: 10 },
  fpTitle:      { color: '#FFF', fontSize: 14, fontWeight: '800', marginBottom: 3 },
  fpSub:        { color: 'rgba(255,255,255,0.40)', fontSize: 11, lineHeight: 16 },
  fpStatus:     { borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center' },
  fpStatusOn:   { backgroundColor: 'rgba(103,230,232,0.08)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.20)' },
  fpStatusOff:  { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  fpStatusTxt:  { fontSize: 12, fontWeight: '700' },
  fpStatusTxtOn:  { color: '#67E6E8' },
  fpStatusTxtOff: { color: 'rgba(255,255,255,0.30)' },
  fpWarn:    { marginTop: 10, backgroundColor: 'rgba(255,184,77,0.07)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.25)', borderRadius: 10, padding: 10 },
  fpWarnTxt: { color: 'rgba(255,210,100,0.80)', fontSize: 11, lineHeight: 17 },

  // ── Section ──
  section:      { backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: 16, marginBottom: 14 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: '800', marginBottom: 16 },
  inputWrap:    { marginBottom: 14 },
  inputLabel:   { color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginBottom: 6, textTransform: 'uppercase' },
  input:        { minHeight: 50, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)', color: '#FFF', fontSize: 14, paddingHorizontal: 14, paddingVertical: 12 },
  inputReadonly:{ opacity: 0.55 },
  textArea:     { minHeight: 100, textAlignVertical: 'top' },

  // ── Buttons ──
  btnWrap:        { gap: 10, marginBottom: 6 },
  btnPrimary:     { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  btnPrimaryTxt:  { color: '#0A2A2B', fontSize: 14, fontWeight: '800' },
  btnSecondary:   { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  btnSecondaryTxt:{ color: 'rgba(255,255,255,0.70)', fontSize: 14, fontWeight: '700' },
  btnLogout:      { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(220,53,69,0.12)', borderWidth: 1, borderColor: 'rgba(220,53,69,0.28)' },
  btnLogoutTxt:   { color: '#FFB8C1', fontSize: 14, fontWeight: '800' },
});