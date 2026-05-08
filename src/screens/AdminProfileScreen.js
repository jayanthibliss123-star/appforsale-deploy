// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   TextInput, Pressable, ScrollView, Animated, Easing,
//   ActivityIndicator, KeyboardAvoidingView, Platform,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as LocalAuthentication from 'expo-local-authentication';
// import { getAdminCredentials, saveAdminCredentials } from '../utils/adminStorage';
// import { setupAdminApi } from '../utils/apiService';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const BG          = '#0D1117';
// const CARD_BG     = 'rgba(255,255,255,0.04)';
// const BORDER      = 'rgba(255,255,255,0.09)';
// const TEAL        = '#67E6E8';
// const TEAL_DIM    = 'rgba(103,230,232,0.16)';
// const TEAL_BORDER = 'rgba(103,230,232,0.28)';

// // ─── Toggle Switch ───────────────────────────────
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
//       <Animated.View style={[tgStyles.track, { backgroundColor: trackBg, borderColor: value ? TEAL_BORDER : BORDER }]}>
//         <Animated.View style={[tgStyles.thumb, { left: thumbPos, backgroundColor: thumbCol }]} />
//       </Animated.View>
//     </Pressable>
//   );
// }
// const tgStyles = StyleSheet.create({
//   track: { width: 46, height: 26, borderRadius: 13, borderWidth: 1, position: 'relative' },
//   thumb: { width: 20, height: 20, borderRadius: 10, position: 'absolute', top: 3 },
// });

// // ─── Section Header ──────────────────────────────
// function SectionHead({ eyebrow, title }) {
//   return (
//     <View style={{ marginBottom: 10, marginTop: 6 }}>
//       <Text style={s.eye}>{eyebrow}</Text>
//       <Text style={s.secTitle}>{title}</Text>
//     </View>
//   );
// }

// // ─── Input Field ─────────────────────────────────
// function Field({ label, value, onChangeText, placeholder, secure, error, keyboardType, autoCapitalize }) {
//   const [show, setShow] = useState(false);
//   return (
//     <View style={{ marginBottom: 12 }}>
//       <Text style={s.label}>{label}</Text>
//       <View style={[s.inputWrap, error ? s.inputErr : null]}>
//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           placeholderTextColor="rgba(255,255,255,0.30)"
//           secureTextEntry={secure && !show}
//           keyboardType={keyboardType || 'default'}
//           autoCapitalize={autoCapitalize || 'none'}
//           autoCorrect={false}
//           style={s.input}
//         />
//         {secure && (
//           <Pressable onPress={() => setShow(p => !p)} style={s.eyeBtn} hitSlop={10}>
//             <Text style={{ fontSize: 16 }}>{show ? '🙈' : '👁️'}</Text>
//           </Pressable>
//         )}
//       </View>
//       {!!error && <Text style={s.errText}>⚠ {error}</Text>}
//     </View>
//   );
// }

// // ─── Main Screen ─────────────────────────────────
// export default function AdminProfileScreen({ navigation }) {
//   // ── state ──
//   const [creds,           setCreds]           = useState(null);
//   const [editEmail,       setEditEmail]       = useState('');
//   const [editCompany,     setEditCompany]     = useState('');
//   const [currentPwd,      setCurrentPwd]      = useState('');
//   const [newPwd,          setNewPwd]          = useState('');
//   const [confirmPwd,      setConfirmPwd]      = useState('');
//   const [fpEnabled,       setFpEnabled]       = useState(false);
//   const [fpSupported,     setFpSupported]     = useState(false);
//   const [loadingInfo,     setLoadingInfo]     = useState(false);
//   const [loadingPwd,      setLoadingPwd]      = useState(false);
//   const [loadingFp,       setLoadingFp]       = useState(false);
//   const [errors,          setErrors]          = useState({});

//   const fadeAnim  = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(20)).current;
//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   // ── load on mount ──
//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim,  { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//       Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
//     ]).start();
//     loadCreds();
//     checkFpSupport();
//   }, []);

//   const loadCreds = async () => {
//     const c = await getAdminCredentials();
//     if (c) {
//       setCreds(c);
//       setEditEmail(c.email || '');
//       setEditCompany(c.companyName || '');
//       setFpEnabled(c.fingerprintEnabled === true);
//     }
//   };

//   const checkFpSupport = async () => {
//     try {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled   = await LocalAuthentication.isEnrolledAsync();
//       setFpSupported(compatible && enrolled);
//     } catch (_) {
//       setFpSupported(false);
//     }
//   };

//   // ── validate email/company ──
//   const validateInfo = () => {
//     const e = {};
//     if (!editEmail.trim()) {
//       e.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail.trim())) {
//       e.email = 'Enter a valid email';
//     }
//     if (!editCompany.trim()) e.company = 'Company name is required';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // ── save email/company ──
//   const handleSaveInfo = async () => {
//     if (!validateInfo()) return;
//     try {
//       setLoadingInfo(true);
//       const updated = {
//         ...creds,
//         email:       editEmail.trim().toLowerCase(),
//         companyName: editCompany.trim(),
//       };
//       // Update on server
//       await setupAdminApi({
//         email:       updated.email,
//         password:    updated.password,
//         companyName: updated.companyName,
//       });
//       // Save locally
//       await saveAdminCredentials(updated);
//       setCreds(updated);
//       showAlert('✅ Updated', 'Email & Company updated successfully.');
//     } catch (err) {
//       showAlert('Error', err?.message || 'Update failed. Try again.');
//     } finally {
//       setLoadingInfo(false);
//     }
//   };

//   // ── validate password ──
//   const validatePwd = () => {
//     const e = {};
//     if (!currentPwd.trim()) {
//       e.currentPwd = 'Current password is required';
//     } else if (currentPwd !== creds?.password) {
//       e.currentPwd = 'Current password is incorrect';
//     }
//     if (!newPwd.trim()) {
//       e.newPwd = 'New password is required';
//     } else if (newPwd.length < 6) {
//       e.newPwd = 'Min 6 characters';
//     } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPwd)) {
//       e.newPwd = 'Must include letters + numbers';
//     } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(newPwd)) {
//       e.newPwd = 'Must include a special character';
//     }
//     if (!confirmPwd.trim()) {
//       e.confirmPwd = 'Please confirm your password';
//     } else if (newPwd !== confirmPwd) {
//       e.confirmPwd = 'Passwords do not match';
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // ── change password ──
//   const handleChangePwd = async () => {
//     if (!validatePwd()) return;
//     try {
//       setLoadingPwd(true);
//       const updated = { ...creds, password: newPwd.trim() };
//       // Update on server
//       await setupAdminApi({
//         email:       updated.email,
//         password:    updated.password,
//         companyName: updated.companyName,
//       });
//       // Save locally
//       await saveAdminCredentials(updated);
//       setCreds(updated);
//       setCurrentPwd('');
//       setNewPwd('');
//       setConfirmPwd('');
//       showAlert('✅ Password Changed', 'Your admin password has been updated successfully.');
//     } catch (err) {
//       showAlert('Error', err?.message || 'Password change failed. Try again.');
//     } finally {
//       setLoadingPwd(false);
//     }
//   };

//   // ── toggle fingerprint ──
//   const handleFpToggle = async () => {
//     if (!fpSupported) {
//       showAlert(
//         'Not Available',
//         'This device does not support biometric authentication or no fingerprint is enrolled.\n\nPlease enroll a fingerprint in device Settings.'
//       );
//       return;
//     }

//     const newVal = !fpEnabled;

//     // If enabling, verify fingerprint first
//     if (newVal) {
//       try {
//         setLoadingFp(true);
//         const result = await LocalAuthentication.authenticateAsync({
//           promptMessage: 'Confirm your fingerprint to enable biometric login',
//           fallbackLabel: 'Use Password',
//           cancelLabel:   'Cancel',
//         });
//         if (!result.success) {
//           showAlert('Cancelled', 'Fingerprint verification cancelled. Biometric login not enabled.');
//           return;
//         }
//       } catch (err) {
//         showAlert('Error', 'Fingerprint verification failed.');
//         return;
//       } finally {
//         setLoadingFp(false);
//       }
//     }

//     try {
//       setLoadingFp(true);
//       const updated = { ...creds, fingerprintEnabled: newVal };
//       await saveAdminCredentials(updated);
//       setCreds(updated);
//       setFpEnabled(newVal);
//       showAlert(
//         newVal ? '✅ Fingerprint Enabled' : '❌ Fingerprint Disabled',
//         newVal
//           ? '"Sign in with Fingerprint" button will appear on the Sign In screen for instant Admin access.'
//           : 'Fingerprint login is now OFF. Sign In requires email + password credentials.'
//       );
//     } catch (_) {
//       showAlert('Error', 'Could not save fingerprint preference.');
//     } finally {
//       setLoadingFp(false);
//     }
//   };

//   return (
//     <SafeAreaView style={s.safe}>
//       <StatusBar barStyle="light-content" backgroundColor={BG} />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       {/* Header */}
//       <View style={s.header}>
//         <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.7 }]}>
//           <Text style={s.backText}>← Back</Text>
//         </Pressable>
//         <Text style={s.headerTitle}>Admin Profile</Text>
//         <View style={{ width: 60 }} />
//       </View>

//       <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//         <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={s.scroll}
//             keyboardShouldPersistTaps="handled"
//           >
//             {/* Avatar */}
//             <View style={s.avatarWrap}>
//               <LinearGradient colors={[TEAL_DIM, 'rgba(103,230,232,0.06)']} style={s.avatarCircle}>
//                 <Text style={s.avatarText}>
//                   {(editEmail?.[0] || 'A').toUpperCase()}
//                 </Text>
//               </LinearGradient>
//               <Text style={s.avatarName}>Admin User</Text>
//               <View style={s.rolePill}>
//                 <Text style={s.rolePillText}>⚙ ADMINISTRATOR</Text>
//               </View>
//             </View>

//             {/* ── SECTION 1: Account Info ── */}
//             <SectionHead eyebrow="ACCOUNT" title="Profile Info" />
//             <View style={s.card}>
//               <Field
//                 label="EMAIL ADDRESS"
//                 value={editEmail}
//                 onChangeText={v => { setEditEmail(v); setErrors(e => ({ ...e, email: '' })); }}
//                 placeholder="admin@company.com"
//                 keyboardType="email-address"
//                 error={errors.email}
//               />
//               <Field
//                 label="COMPANY NAME"
//                 value={editCompany}
//                 onChangeText={v => { setEditCompany(v); setErrors(e => ({ ...e, company: '' })); }}
//                 placeholder="Your Company"
//                 autoCapitalize="words"
//                 error={errors.company}
//               />
//               <Pressable
//                 onPress={handleSaveInfo}
//                 disabled={loadingInfo}
//                 style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8 }]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={s.primaryBtnInner}
//                 >
//                   {loadingInfo
//                     ? <ActivityIndicator color="#0A2A2B" size="small" />
//                     : <Text style={s.primaryBtnText}>💾 Save Changes</Text>
//                   }
//                 </LinearGradient>
//               </Pressable>
//             </View>

//             {/* ── SECTION 2: Change Password ── */}
//             <SectionHead eyebrow="SECURITY" title="Change Password" />
//             <View style={s.card}>
//               <Field
//                 label="CURRENT PASSWORD"
//                 value={currentPwd}
//                 onChangeText={v => { setCurrentPwd(v); setErrors(e => ({ ...e, currentPwd: '' })); }}
//                 placeholder="Enter current password"
//                 secure
//                 error={errors.currentPwd}
//               />
//               <Field
//                 label="NEW PASSWORD"
//                 value={newPwd}
//                 onChangeText={v => { setNewPwd(v); setErrors(e => ({ ...e, newPwd: '' })); }}
//                 placeholder="Min 6 chars + letter + number + symbol"
//                 secure
//                 error={errors.newPwd}
//               />
//               <Field
//                 label="CONFIRM NEW PASSWORD"
//                 value={confirmPwd}
//                 onChangeText={v => { setConfirmPwd(v); setErrors(e => ({ ...e, confirmPwd: '' })); }}
//                 placeholder="Re-enter new password"
//                 secure
//                 error={errors.confirmPwd}
//               />
//               <Pressable
//                 onPress={handleChangePwd}
//                 disabled={loadingPwd}
//                 style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8 }]}
//               >
//                 <LinearGradient
//                   colors={['#67E6E8', '#1FCFD6']}
//                   start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                   style={s.primaryBtnInner}
//                 >
//                   {loadingPwd
//                     ? <ActivityIndicator color="#0A2A2B" size="small" />
//                     : <Text style={s.primaryBtnText}>🔑 Update Password</Text>
//                   }
//                 </LinearGradient>
//               </Pressable>
//             </View>

//             {/* ── SECTION 3: Fingerprint ── */}
//             <SectionHead eyebrow="BIOMETRIC" title="Fingerprint Login" />
//             <View style={s.card}>
//               <View style={s.fpToggleRow}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={s.fpToggleLabel}>
//                     {fpEnabled ? '✅ Fingerprint ON' : '❌ Fingerprint OFF'}
//                   </Text>
//                   <Text style={s.fpToggleSub}>
//                     {fpEnabled
//                       ? '"Sign in with Fingerprint" button is visible on Sign In screen.'
//                       : 'Enable to allow instant Admin sign-in using fingerprint.'}
//                   </Text>
//                 </View>
//                 {loadingFp
//                   ? <ActivityIndicator color={TEAL} size="small" style={{ marginLeft: 12 }} />
//                   : <Toggle value={fpEnabled} onToggle={handleFpToggle} />
//                 }
//               </View>

//               {!fpSupported && (
//                 <View style={s.fpUnsupportedNote}>
//                   <Text style={s.fpUnsupportedText}>
//                     ⚠️ This device does not support biometric auth or no fingerprint is enrolled in device Settings.
//                   </Text>
//                 </View>
//               )}

//               {fpEnabled && fpSupported && (
//                 <View style={s.fpEnabledNote}>
//                   <Text style={s.fpEnabledText}>
//                     🔒 Next time you open Sign In, tap "Sign in with Fingerprint" to login as Admin instantly — no password needed.
//                   </Text>
//                 </View>
//               )}

//               {!fpEnabled && fpSupported && (
//                 <View style={s.fpDisabledNote}>
//                   <Text style={s.fpDisabledText}>
//                     Sign In requires email + password when fingerprint is OFF.
//                   </Text>
//                 </View>
//               )}
//             </View>

//             {/* ── Danger Zone ── */}
//             <SectionHead eyebrow="NAVIGATION" title="Actions" />
//             <View style={s.card}>
//               <Pressable
//                 onPress={() => navigation.goBack()}
//                 style={({ pressed }) => [s.ghostBtn, pressed && { opacity: 0.6 }]}
//               >
//                 <Text style={s.ghostBtnText}>← Back to Dashboard</Text>
//               </Pressable>
//               <Pressable
//                 onPress={() => {
//                   showAlert('Logout', 'Are you sure you want to logout?', [
//                     { text: 'Cancel', style: 'cancel' },
//                     { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
//                   ]);
//                 }}
//                 style={({ pressed }) => [s.logoutBtn, pressed && { opacity: 0.7 }]}
//               >
//                 <Text style={s.logoutBtnText}>🚪 Logout</Text>
//               </Pressable>
//             </View>

//             <View style={{ height: 40 }} />
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

// const s = StyleSheet.create({
//   safe:       { flex: 1, backgroundColor: BG },
//   header:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 42, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: BORDER, backgroundColor: BG },
//   backBtn:    { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 9, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER },
//   backText:   { color: TEAL, fontSize: 12, fontWeight: '700' },
//   headerTitle:{ color: '#FFF', fontSize: 17, fontWeight: '800' },
//   scroll:     { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 40 },

//   // Avatar
//   avatarWrap:   { alignItems: 'center', marginBottom: 22 },
//   avatarCircle: { width: 72, height: 72, borderRadius: 36, borderWidth: 1.5, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
//   avatarText:   { color: TEAL, fontSize: 26, fontWeight: '800' },
//   avatarName:   { color: '#FFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
//   rolePill:     { backgroundColor: 'rgba(168,85,247,0.18)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.38)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
//   rolePillText: { color: '#C084FC', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },

//   // Section
//   eye:      { color: TEAL, fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
//   secTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },

//   // Card
//   card: { backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, borderRadius: 18, padding: 14, marginBottom: 18 },

//   // Label + Input
//   label:    { color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginBottom: 6 },
//   inputWrap:{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', borderRadius: 12, paddingHorizontal: 12, minHeight: 48 },
//   inputErr: { borderColor: '#FF4D6A' },
//   input:    { flex: 1, color: '#FFF', fontSize: 13, paddingVertical: 0 },
//   eyeBtn:   { paddingLeft: 8 },
//   errText:  { color: '#FF4D6A', fontSize: 11, fontWeight: '500', marginTop: 4, marginBottom: 2 },

//   // Button
//   primaryBtn:      { borderRadius: 13, overflow: 'hidden', marginTop: 4 },
//   primaryBtnInner: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
//   primaryBtnText:  { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },

//   // Ghost / Logout
//   ghostBtn:     { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: 'rgba(103,230,232,0.06)', borderWidth: 1, borderColor: TEAL_BORDER, marginBottom: 10 },
//   ghostBtnText: { color: TEAL, fontSize: 12, fontWeight: '700' },
//   logoutBtn:    { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: 'rgba(255,77,106,0.08)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
//   logoutBtnText:{ color: '#FF4D6A', fontSize: 12, fontWeight: '700' },

//   // Fingerprint
//   fpToggleRow:      { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   fpToggleLabel:    { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 3 },
//   fpToggleSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 11, lineHeight: 16, paddingRight: 12 },
//   fpEnabledNote:    { backgroundColor: 'rgba(103,230,232,0.07)', borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 10, padding: 11 },
//   fpEnabledText:    { color: 'rgba(103,230,232,0.85)', fontSize: 11, lineHeight: 17 },
//   fpDisabledNote:   { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: BORDER, borderRadius: 10, padding: 11 },
//   fpDisabledText:   { color: 'rgba(255,255,255,0.38)', fontSize: 11 },
//   fpUnsupportedNote:{ backgroundColor: 'rgba(255,184,77,0.08)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.28)', borderRadius: 10, padding: 11, marginTop: 8 },
//   fpUnsupportedText:{ color: 'rgba(255,210,100,0.85)', fontSize: 11, lineHeight: 17 },
// });

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  TextInput, Pressable, ScrollView, Animated, Easing,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { getAdminCredentials, saveAdminCredentials } from '../utils/adminStorage';
import { updateAdminApi } from '../utils/apiService';   // ← setupAdminApi బదులు updateAdminApi
import useCustomAlert from '../utils/useCustomAlert';
import CustomAlertModal from '../components/CustomAlertModal';

const BG          = '#0D1117';
const CARD_BG     = 'rgba(255,255,255,0.04)';
const BORDER      = 'rgba(255,255,255,0.09)';
const TEAL        = '#67E6E8';
const TEAL_DIM    = 'rgba(103,230,232,0.16)';
const TEAL_BORDER = 'rgba(103,230,232,0.28)';

// ─── Toggle Switch ───────────────────────────────
function Toggle({ value, onToggle }) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);
  const trackBg  = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.08)', 'rgba(103,230,232,0.22)'] });
  const thumbPos = anim.interpolate({ inputRange: [0, 1], outputRange: [3, 22] });
  const thumbCol = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.30)', '#67E6E8'] });
  return (
    <Pressable onPress={onToggle}>
      <Animated.View style={[tgStyles.track, { backgroundColor: trackBg, borderColor: value ? TEAL_BORDER : BORDER }]}>
        <Animated.View style={[tgStyles.thumb, { left: thumbPos, backgroundColor: thumbCol }]} />
      </Animated.View>
    </Pressable>
  );
}
const tgStyles = StyleSheet.create({
  track: { width: 46, height: 26, borderRadius: 13, borderWidth: 1, position: 'relative' },
  thumb: { width: 20, height: 20, borderRadius: 10, position: 'absolute', top: 3 },
});

// ─── Section Header ──────────────────────────────
function SectionHead({ eyebrow, title }) {
  return (
    <View style={{ marginBottom: 10, marginTop: 6 }}>
      <Text style={s.eye}>{eyebrow}</Text>
      <Text style={s.secTitle}>{title}</Text>
    </View>
  );
}

// ─── Input Field ─────────────────────────────────
function Field({ label, value, onChangeText, placeholder, secure, error, keyboardType, autoCapitalize }) {
  const [show, setShow] = useState(false);
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={s.label}>{label}</Text>
      <View style={[s.inputWrap, error ? s.inputErr : null]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.30)"
          secureTextEntry={secure && !show}
          keyboardType={keyboardType || 'default'}
          autoCapitalize={autoCapitalize || 'none'}
          autoCorrect={false}
          style={s.input}
        />
        {secure && (
          <Pressable onPress={() => setShow(p => !p)} style={s.eyeBtn} hitSlop={10}>
            <Text style={{ fontSize: 16 }}>{show ? '🙈' : '👁️'}</Text>
          </Pressable>
        )}
      </View>
      {!!error && <Text style={s.errText}>⚠ {error}</Text>}
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────
export default function AdminProfileScreen({ navigation }) {
  const [creds,           setCreds]           = useState(null);
  const [editEmail,       setEditEmail]       = useState('');
  const [editCompany,     setEditCompany]     = useState('');
  const [currentPwd,      setCurrentPwd]      = useState('');
  const [newPwd,          setNewPwd]          = useState('');
  const [confirmPwd,      setConfirmPwd]      = useState('');
  const [fpEnabled,       setFpEnabled]       = useState(false);
  const [fpSupported,     setFpSupported]     = useState(false);
  const [loadingInfo,     setLoadingInfo]     = useState(false);
  const [loadingPwd,      setLoadingPwd]      = useState(false);
  const [loadingFp,       setLoadingFp]       = useState(false);
  const [errors,          setErrors]          = useState({});

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const { alertConfig, showAlert, hideAlert } = useCustomAlert();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    loadCreds();
    checkFpSupport();
  }, []);

  const loadCreds = async () => {
    const c = await getAdminCredentials();
    if (c) {
      setCreds(c);
      setEditEmail(c.email || '');
      setEditCompany(c.companyName || '');
      setFpEnabled(c.fingerprintEnabled === true);
    }
  };

  const checkFpSupport = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled   = await LocalAuthentication.isEnrolledAsync();
      setFpSupported(compatible && enrolled);
    } catch (_) {
      setFpSupported(false);
    }
  };

  // ── Validate email/company ──
  const validateInfo = () => {
    const e = {};
    if (!editEmail.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail.trim())) {
      e.email = 'Enter a valid email';
    }
    if (!editCompany.trim()) e.company = 'Company name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save email/company ──
  const handleSaveInfo = async () => {
    if (!validateInfo()) return;
    try {
      setLoadingInfo(true);
      const updated = {
        ...creds,
        email:       editEmail.trim().toLowerCase(),
        companyName: editCompany.trim(),
      };

      // PUT /api/admin/update — database lo update cheyyi
      await updateAdminApi({
        oldEmail:    creds.email,           // find cheyyataniki
        email:       updated.email,
        password:    updated.password,
        companyName: updated.companyName,
      });

      // Local storage lo save
      await saveAdminCredentials(updated);
      setCreds(updated);
      showAlert('✅ Updated', 'Email & Company updated successfully.');
    } catch (err) {
      showAlert('Error', err?.message || 'Update failed. Try again.');
    } finally {
      setLoadingInfo(false);
    }
  };

  // ── Validate password ──
  const validatePwd = () => {
    const e = {};
    if (!currentPwd.trim()) {
      e.currentPwd = 'Current password is required';
    } else if (currentPwd !== creds?.password) {
      e.currentPwd = 'Current password is incorrect';
    }
    if (!newPwd.trim()) {
      e.newPwd = 'New password is required';
    } else if (newPwd.length < 6) {
      e.newPwd = 'Min 6 characters';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPwd)) {
      e.newPwd = 'Must include letters + numbers';
    } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(newPwd)) {
      e.newPwd = 'Must include a special character';
    }
    if (!confirmPwd.trim()) {
      e.confirmPwd = 'Please confirm your password';
    } else if (newPwd !== confirmPwd) {
      e.confirmPwd = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Change password ──
  const handleChangePwd = async () => {
    if (!validatePwd()) return;
    try {
      setLoadingPwd(true);
      const updated = { ...creds, password: newPwd.trim() };

      // PUT /api/admin/update — new password database lo save
      await updateAdminApi({
        oldEmail:    creds.email,
        email:       updated.email,
        password:    updated.password,      // ← new password ఇక్కడ
        companyName: updated.companyName,
      });

      // Local storage lo save
      await saveAdminCredentials(updated);
      setCreds(updated);
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      showAlert('✅ Password Changed', 'Your admin password has been updated successfully.');
    } catch (err) {
      showAlert('Error', err?.message || 'Password change failed. Try again.');
    } finally {
      setLoadingPwd(false);
    }
  };

  // ── Toggle fingerprint ──
  const handleFpToggle = async () => {
    if (!fpSupported) {
      showAlert(
        'Not Available',
        'This device does not support biometric authentication or no fingerprint is enrolled.\n\nPlease enroll a fingerprint in device Settings.'
      );
      return;
    }

    const newVal = !fpEnabled;

    if (newVal) {
      try {
        setLoadingFp(true);
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Confirm your fingerprint to enable biometric login',
          fallbackLabel: 'Use Password',
          cancelLabel:   'Cancel',
        });
        if (!result.success) {
          showAlert('Cancelled', 'Fingerprint verification cancelled. Biometric login not enabled.');
          return;
        }
      } catch (err) {
        showAlert('Error', 'Fingerprint verification failed.');
        return;
      } finally {
        setLoadingFp(false);
      }
    }

    try {
      setLoadingFp(true);
      const updated = { ...creds, fingerprintEnabled: newVal };
      await saveAdminCredentials(updated);
      setCreds(updated);
      setFpEnabled(newVal);
      showAlert(
        newVal ? '✅ Fingerprint Enabled' : '❌ Fingerprint Disabled',
        newVal
          ? '"Sign in with Fingerprint" button will appear on the Sign In screen.'
          : 'Fingerprint login is now OFF.'
      );
    } catch (_) {
      showAlert('Error', 'Could not save fingerprint preference.');
    } finally {
      setLoadingFp(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      <CustomAlertModal config={alertConfig} onHide={hideAlert} />

      {/* Header */}
      <View style={s.header}>
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.7 }]}>
          <Text style={s.backText}>← Back</Text>
        </Pressable>
        <Text style={s.headerTitle}>Admin Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled"
          >
            {/* Avatar */}
            <View style={s.avatarWrap}>
              <LinearGradient colors={[TEAL_DIM, 'rgba(103,230,232,0.06)']} style={s.avatarCircle}>
                <Text style={s.avatarText}>
                  {(editEmail?.[0] || 'A').toUpperCase()}
                </Text>
              </LinearGradient>
              <Text style={s.avatarName}>Admin User</Text>
              <View style={s.rolePill}>
                <Text style={s.rolePillText}>⚙ ADMINISTRATOR</Text>
              </View>
            </View>

            {/* ── SECTION 1: Account Info ── */}
            <SectionHead eyebrow="ACCOUNT" title="Profile Info" />
            <View style={s.card}>
              <Field
                label="EMAIL ADDRESS"
                value={editEmail}
                onChangeText={v => { setEditEmail(v); setErrors(e => ({ ...e, email: '' })); }}
                placeholder="admin@company.com"
                keyboardType="email-address"
                error={errors.email}
              />
              <Field
                label="COMPANY NAME"
                value={editCompany}
                onChangeText={v => { setEditCompany(v); setErrors(e => ({ ...e, company: '' })); }}
                placeholder="Your Company"
                autoCapitalize="words"
                error={errors.company}
              />
              <Pressable
                onPress={handleSaveInfo}
                disabled={loadingInfo}
                style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8 }]}
              >
                <LinearGradient
                  colors={['#67E6E8', '#1FCFD6']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={s.primaryBtnInner}
                >
                  {loadingInfo
                    ? <ActivityIndicator color="#0A2A2B" size="small" />
                    : <Text style={s.primaryBtnText}>💾 Save Changes</Text>
                  }
                </LinearGradient>
              </Pressable>
            </View>

            {/* ── SECTION 2: Change Password ── */}
            <SectionHead eyebrow="SECURITY" title="Change Password" />
            <View style={s.card}>
              <Field
                label="CURRENT PASSWORD"
                value={currentPwd}
                onChangeText={v => { setCurrentPwd(v); setErrors(e => ({ ...e, currentPwd: '' })); }}
                placeholder="Enter current password"
                secure
                error={errors.currentPwd}
              />
              <Field
                label="NEW PASSWORD"
                value={newPwd}
                onChangeText={v => { setNewPwd(v); setErrors(e => ({ ...e, newPwd: '' })); }}
                placeholder="Min 6 chars + letter + number + symbol"
                secure
                error={errors.newPwd}
              />
              <Field
                label="CONFIRM NEW PASSWORD"
                value={confirmPwd}
                onChangeText={v => { setConfirmPwd(v); setErrors(e => ({ ...e, confirmPwd: '' })); }}
                placeholder="Re-enter new password"
                secure
                error={errors.confirmPwd}
              />
              <Pressable
                onPress={handleChangePwd}
                disabled={loadingPwd}
                style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8 }]}
              >
                <LinearGradient
                  colors={['#67E6E8', '#1FCFD6']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={s.primaryBtnInner}
                >
                  {loadingPwd
                    ? <ActivityIndicator color="#0A2A2B" size="small" />
                    : <Text style={s.primaryBtnText}>🔑 Update Password</Text>
                  }
                </LinearGradient>
              </Pressable>
            </View>

            {/* ── SECTION 3: Fingerprint ── */}
            <SectionHead eyebrow="BIOMETRIC" title="Fingerprint Login" />
            <View style={s.card}>
              <View style={s.fpToggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.fpToggleLabel}>
                    {fpEnabled ? '✅ Fingerprint ON' : '❌ Fingerprint OFF'}
                  </Text>
                  <Text style={s.fpToggleSub}>
                    {fpEnabled
                      ? '"Sign in with Fingerprint" button is visible on Sign In screen.'
                      : 'Enable to allow instant Admin sign-in using fingerprint.'}
                  </Text>
                </View>
                {loadingFp
                  ? <ActivityIndicator color={TEAL} size="small" style={{ marginLeft: 12 }} />
                  : <Toggle value={fpEnabled} onToggle={handleFpToggle} />
                }
              </View>

              {!fpSupported && (
                <View style={s.fpUnsupportedNote}>
                  <Text style={s.fpUnsupportedText}>
                    ⚠️ This device does not support biometric auth or no fingerprint is enrolled in device Settings.
                  </Text>
                </View>
              )}

              {fpEnabled && fpSupported && (
                <View style={s.fpEnabledNote}>
                  <Text style={s.fpEnabledText}>
                    🔒 Next time you open Sign In, tap "Sign in with Fingerprint" to login as Admin instantly.
                  </Text>
                </View>
              )}

              {!fpEnabled && fpSupported && (
                <View style={s.fpDisabledNote}>
                  <Text style={s.fpDisabledText}>
                    Sign In requires email + password when fingerprint is OFF.
                  </Text>
                </View>
              )}
            </View>

            {/* ── Actions ── */}
            <SectionHead eyebrow="NAVIGATION" title="Actions" />
            <View style={s.card}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [s.ghostBtn, pressed && { opacity: 0.6 }]}
              >
                <Text style={s.ghostBtnText}>← Back to Dashboard</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  showAlert('Logout', 'Are you sure you want to logout?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('SignIn') },
                  ]);
                }}
                style={({ pressed }) => [s.logoutBtn, pressed && { opacity: 0.7 }]}
              >
                <Text style={s.logoutBtnText}>🚪 Logout</Text>
              </Pressable>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: BG },
  header:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 42, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: BORDER, backgroundColor: BG },
  backBtn:    { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 9, backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER },
  backText:   { color: TEAL, fontSize: 12, fontWeight: '700' },
  headerTitle:{ color: '#FFF', fontSize: 17, fontWeight: '800' },
  scroll:     { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 40 },

  avatarWrap:   { alignItems: 'center', marginBottom: 22 },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, borderWidth: 1.5, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText:   { color: TEAL, fontSize: 26, fontWeight: '800' },
  avatarName:   { color: '#FFF', fontSize: 18, fontWeight: '800', marginBottom: 6 },
  rolePill:     { backgroundColor: 'rgba(168,85,247,0.18)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.38)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
  rolePillText: { color: '#C084FC', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },

  eye:      { color: TEAL, fontSize: 9, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
  secTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },

  card: { backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, borderRadius: 18, padding: 14, marginBottom: 18 },

  label:    { color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginBottom: 6 },
  inputWrap:{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', borderRadius: 12, paddingHorizontal: 12, minHeight: 48 },
  inputErr: { borderColor: '#FF4D6A' },
  input:    { flex: 1, color: '#FFF', fontSize: 13, paddingVertical: 0 },
  eyeBtn:   { paddingLeft: 8 },
  errText:  { color: '#FF4D6A', fontSize: 11, fontWeight: '500', marginTop: 4, marginBottom: 2 },

  primaryBtn:      { borderRadius: 13, overflow: 'hidden', marginTop: 4 },
  primaryBtnInner: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText:  { color: '#0A2A2B', fontSize: 13, fontWeight: '800' },

  ghostBtn:     { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: 'rgba(103,230,232,0.06)', borderWidth: 1, borderColor: TEAL_BORDER, marginBottom: 10 },
  ghostBtnText: { color: TEAL, fontSize: 12, fontWeight: '700' },
  logoutBtn:    { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: 'rgba(255,77,106,0.08)', borderWidth: 1, borderColor: 'rgba(255,77,106,0.28)' },
  logoutBtnText:{ color: '#FF4D6A', fontSize: 12, fontWeight: '700' },

  fpToggleRow:      { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  fpToggleLabel:    { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 3 },
  fpToggleSub:      { color: 'rgba(255,255,255,0.42)', fontSize: 11, lineHeight: 16, paddingRight: 12 },
  fpEnabledNote:    { backgroundColor: 'rgba(103,230,232,0.07)', borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 10, padding: 11 },
  fpEnabledText:    { color: 'rgba(103,230,232,0.85)', fontSize: 11, lineHeight: 17 },
  fpDisabledNote:   { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: BORDER, borderRadius: 10, padding: 11 },
  fpDisabledText:   { color: 'rgba(255,255,255,0.38)', fontSize: 11 },
  fpUnsupportedNote:{ backgroundColor: 'rgba(255,184,77,0.08)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.28)', borderRadius: 10, padding: 11, marginTop: 8 },
  fpUnsupportedText:{ color: 'rgba(255,210,100,0.85)', fontSize: 11, lineHeight: 17 },
});
