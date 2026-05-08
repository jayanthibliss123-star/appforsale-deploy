// // // screens/AdminSetupScreen.jsx
// // // ONE-TIME screen shown only if no admin credentials are saved locally.
// // // After setup, next launch goes directly to SignIn.

// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   SafeAreaView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   View,
// //   TextInput,
// //   Pressable,
// //   KeyboardAvoidingView,
// //   Platform,
// //   Animated,
// //   Alert,
// //   ScrollView,
// //   ActivityIndicator,
// // } from 'react-native';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { saveAdminCredentials } from '../utils/adminStorage'; // 👈 new utility
// // import { setupAdminApi } from '../utils/apiService';

// // export default function AdminSetupScreen({ navigation }) {
// //   const [adminEmail, setAdminEmail]       = useState('');
// //   const [adminPassword, setAdminPassword] = useState('');
// //   const [companyName, setCompanyName]     = useState('');
// //   const [showPassword, setShowPassword]   = useState(false);
// //   const [loading, setLoading]             = useState(false);
// //   const [errors, setErrors]               = useState({
// //     adminEmail: '', adminPassword: '', companyName: '',
// //   });

// //   // ── Animations ──────────────────────────────
// //   const slideAnim  = useRef(new Animated.Value(140)).current;
// //   const fadeAnim   = useRef(new Animated.Value(0)).current;
// //   const glowPulse  = useRef(new Animated.Value(0.96)).current;
// //   const buttonGlow = useRef(new Animated.Value(0.92)).current;
// //   const shineMove  = useRef(new Animated.Value(-220)).current;
// //   const cardBreath = useRef(new Animated.Value(0.985)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(slideAnim,  { toValue: 0,    duration: 950,  useNativeDriver: true }),
// //       Animated.timing(fadeAnim,   { toValue: 1,    duration: 1000, useNativeDriver: true }),
// //       Animated.loop(Animated.sequence([
// //         Animated.timing(glowPulse,  { toValue: 1.04, duration: 2200, useNativeDriver: true }),
// //         Animated.timing(glowPulse,  { toValue: 0.96, duration: 2200, useNativeDriver: true }),
// //       ])),
// //       Animated.loop(Animated.sequence([
// //         Animated.timing(buttonGlow, { toValue: 1,    duration: 1700, useNativeDriver: true }),
// //         Animated.timing(buttonGlow, { toValue: 0.92, duration: 1700, useNativeDriver: true }),
// //       ])),
// //       Animated.loop(Animated.sequence([
// //         Animated.timing(cardBreath, { toValue: 1,    duration: 2600, useNativeDriver: true }),
// //         Animated.timing(cardBreath, { toValue: 0.985,duration: 2600, useNativeDriver: true }),
// //       ])),
// //       Animated.loop(Animated.sequence([
// //         Animated.delay(900),
// //         Animated.timing(shineMove, { toValue: 320,  duration: 1800, useNativeDriver: true }),
// //         Animated.delay(1200),
// //         Animated.timing(shineMove, { toValue: -220, duration: 0,    useNativeDriver: true }),
// //       ])),
// //     ]).start();
// //   }, []);

// //   // ── Validation ──────────────────────────────
// //   const validate = () => {
// //     const e = { adminEmail: '', adminPassword: '', companyName: '' };
// //     let ok = true;

// //     if (!companyName.trim()) {
// //       e.companyName = 'Company name is required'; ok = false;
// //     } else if (companyName.trim().length < 2) {
// //       e.companyName = 'Must be at least 2 characters'; ok = false;
// //     }

// //     if (!adminEmail.trim()) {
// //       e.adminEmail = 'Email is required'; ok = false;
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim())) {
// //       e.adminEmail = 'Enter a valid email address'; ok = false;
// //     }

// //     if (!adminPassword.trim()) {
// //       e.adminPassword = 'Password is required'; ok = false;
// //     } else if (adminPassword.length < 6) {
// //       e.adminPassword = 'Min 6 characters'; ok = false;
// //     } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(adminPassword)) {
// //       e.adminPassword = 'Must have letters + numbers'; ok = false;
// //     } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(adminPassword)) {
// //       e.adminPassword = 'Must have a special character (!@#$%^&*)'; ok = false;
// //     }

// //     setErrors(e);
// //     return ok;
// //   };

// //   // ── Save Admin Setup ────────────────────────
// //   // const handleSetup = async () => {
// //   //   if (!validate()) return;
// //   //   try {
// //   //     setLoading(true);

// //   //     // Save credentials locally (AsyncStorage)
// //   //     await saveAdminCredentials({
// //   //       email:       adminEmail.trim().toLowerCase(),
// //   //       password:    adminPassword.trim(),
// //   //       companyName: companyName.trim(),
// //   //     });

// //   //     setLoading(false);

// //   //     Alert.alert(
// //   //       '✅ Admin Setup Complete',
// //   //       `Admin credentials saved successfully!\n\nUse these to sign in as Admin from the Sign In screen.`,
// //   //       [{ text: 'Go to Sign In', onPress: () => navigation.replace('SignIn') }],
// //   //       { cancelable: false },
// //   //     );
// //   //   } catch (err) {
// //   //     setLoading(false);
// //   //     Alert.alert('Setup Failed', err.message || 'Something went wrong.');
// //   //   }
// //   // };
// // // const handleSetup = async () => {
// // //   if (!validate()) return;

// // //   try {
// // //     setLoading(true);

// // //     await setupAdminApi({
// // //       email: adminEmail.trim().toLowerCase(),
// // //       password: adminPassword.trim(),
// // //       companyName: companyName.trim(),
// // //     });

// // //     setLoading(false);

// // //     Alert.alert(
// // //       '✅ Admin Setup Complete',
// // //       'Admin created successfully!',
// // //       [
// // //         {
// // //           text: 'Go to Sign In',
// // //           onPress: () => navigation.replace('SignIn'),
// // //         },
// // //       ]
// // //     );

// // //   } catch (err) {
// // //     setLoading(false);
// // //     Alert.alert('Setup Failed', err.message || 'Something went wrong.');
// // //   }
// // // };

// // // const handleSetup = async () => {
// // //   if (!validate()) return;

// // //   try {
// // //     setLoading(true);

// // //     // 🔥 CALL BACKEND
// // //     await setupAdminApi({
// // //       email: adminEmail.trim(),
// // //       password: adminPassword.trim(),
// // //       companyName: companyName.trim(),
// // //     });

// // //     // Save locally
// // //     await saveAdminCredentials({
// // //       email: adminEmail.trim().toLowerCase(),
// // //       password: adminPassword.trim(),
// // //       companyName: companyName.trim(),
// // //     });

// // //     setLoading(false);

// // //     Alert.alert('Success', 'Admin created successfully');
// // //     navigation.replace('SignIn');

// // //   } catch (err) {
// // //     setLoading(false);
// // //     console.log("ERROR:", err);
// // //     Alert.alert('Error', err.message);
// // //   }
// // // };
// // const handleSetup = async () => {
// //   if (!validate()) return;

// //   try {
// //     setLoading(true);

// //     await setupAdminApi({
// //       email: adminEmail.trim(),
// //       password: adminPassword.trim(),
// //       companyName: companyName.trim(),
// //     });

// //     await saveAdminCredentials({
// //       email: adminEmail.trim().toLowerCase(),
// //       password: adminPassword.trim(),
// //       companyName: companyName.trim(),
// //     });

// //     setLoading(false);

// //     Alert.alert(
// //       '✅ Success',
// //       'Admin created successfully',
// //       [{ text: 'Go to Login', onPress: () => navigation.replace('SignIn') }]
// //     );

// //   } catch (err) {
// //     setLoading(false);
// //     console.log("ERROR:", err);

// //     // 🔥 HANDLE THIS CASE PROPERLY
// //     if (err.message?.toLowerCase().includes("admin already exists")) {
// //       Alert.alert(
// //         '⚠️ Admin Already Setup',
// //         'Admin is already created. Please login instead.',
// //         [
// //           { text: 'Go to Login', onPress: () => navigation.replace('SignIn') }
// //         ]
// //       );
// //     } else {
// //       Alert.alert('Setup Failed', err.message || 'Something went wrong');
// //     }
// //   }
// // };
// //   // ─────────────────────────────────────────────
// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <StatusBar barStyle="light-content" backgroundColor="#141B27" />

// //       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
// //         <KeyboardAvoidingView
// //           style={styles.keyboardWrap}
// //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         >
// //           <ScrollView
// //             showsVerticalScrollIndicator={false}
// //             contentContainerStyle={styles.scrollContent}
// //             keyboardShouldPersistTaps="handled"
// //           >
// //             <Animated.View
// //               style={[
// //                 styles.cardOuterWrap,
// //                 { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: cardBreath }] },
// //               ]}
// //             >
// //               {/* Glow Back */}
// //               <Animated.View
// //                 style={[styles.cardGlowBack, {
// //                   opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
// //                   transform: [{ scale: glowPulse }],
// //                 }]}
// //               />

// //               {/* Glow Soft */}
// //               <Animated.View
// //                 style={[styles.cardGlowSoft, {
// //                   opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
// //                   transform: [{ scale: glowPulse }],
// //                 }]}
// //               />

// //               <LinearGradient
// //                 colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
// //                 style={styles.card}
// //               >
// //                 <View style={styles.cardGlassOverlay} />
// //                 <View style={styles.topShine} />

// //                 {/* Header Badge */}
// //                 <View style={styles.miniTag}>
// //                   <Text style={styles.miniTagText}>⚙️ First-Time Setup</Text>
// //                 </View>

// //                 <Text style={styles.title}>Admin Setup</Text>
// //                 <Text style={styles.subtitle}>
// //                   Set your admin credentials once. These will be used to sign in as admin on this device.
// //                 </Text>

// //                 <View style={styles.form}>

// //                   {/* Company Name */}
// //                   <View style={styles.inputGroup}>
// //                     <Text style={styles.label}>Company Name</Text>
// //                     <TextInput
// //                       value={companyName}
// //                       onChangeText={(v) => { setCompanyName(v); setErrors(e => ({ ...e, companyName: '' })); }}
// //                       placeholder="e.g. Apps Marketplace"
// //                       placeholderTextColor="rgba(255,255,255,0.42)"
// //                       autoCapitalize="words"
// //                       autoCorrect={false}
// //                       style={[styles.input, errors.companyName ? styles.inputError : null]}
// //                     />
// //                     {errors.companyName ? <Text style={styles.errorText}>⚠ {errors.companyName}</Text> : null}
// //                   </View>

// //                   {/* Admin Email */}
// //                   <View style={styles.inputGroup}>
// //                     <Text style={styles.label}>Admin Email</Text>
// //                     <TextInput
// //                       value={adminEmail}
// //                       onChangeText={(v) => { setAdminEmail(v); setErrors(e => ({ ...e, adminEmail: '' })); }}
// //                       placeholder="admin@yourcompany.com"
// //                       placeholderTextColor="rgba(255,255,255,0.42)"
// //                       keyboardType="email-address"
// //                       autoCapitalize="none"
// //                       autoCorrect={false}
// //                       style={[styles.input, errors.adminEmail ? styles.inputError : null]}
// //                     />
// //                     {errors.adminEmail ? <Text style={styles.errorText}>⚠ {errors.adminEmail}</Text> : null}
// //                   </View>

// //                   {/* Admin Password */}
// //                   <View style={styles.inputGroup}>
// //                     <Text style={styles.label}>Admin Password</Text>
// //                     <View style={[styles.passwordWrapper, errors.adminPassword ? styles.inputError : null]}>
// //                       <TextInput
// //                         value={adminPassword}
// //                         onChangeText={(v) => { setAdminPassword(v); setErrors(e => ({ ...e, adminPassword: '' })); }}
// //                         placeholder="Create admin password"
// //                         placeholderTextColor="rgba(255,255,255,0.42)"
// //                         secureTextEntry={!showPassword}
// //                         autoCapitalize="none"
// //                         autoCorrect={false}
// //                         autoComplete="off"
// //                         textContentType="none"
// //                         style={styles.passwordInput}
// //                       />
// //                       <Pressable
// //                         onPress={() => setShowPassword(p => !p)}
// //                         style={styles.eyeButton}
// //                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// //                       >
// //                         <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
// //                       </Pressable>
// //                     </View>
// //                     {errors.adminPassword
// //                       ? <Text style={styles.errorText}>⚠ {errors.adminPassword}</Text>
// //                       : !adminPassword && (
// //                           <Text style={styles.hintText}>Min 6 chars • letters + numbers + symbol</Text>
// //                         )
// //                     }
// //                   </View>

// //                   {/* Warning Note */}
// //                   <View style={styles.noteBox}>
// //                     <Text style={styles.noteText}>
// //                       ⚠️ This setup runs only once. Store your credentials safely — they cannot be recovered without reinstalling the app.
// //                     </Text>
// //                   </View>

// //                   {/* Button Glow */}
// //                   <Animated.View
// //                     style={[styles.buttonGlowWrap, {
// //                       opacity: buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.30, 0.56] }),
// //                       transform: [{ scale: buttonGlow }],
// //                     }]}
// //                   >
// //                     <View style={styles.buttonGlowLayer} />
// //                   </Animated.View>

// //                   {/* Save Button */}
// //                   <Pressable
// //                     onPress={handleSetup}
// //                     disabled={loading}
// //                     style={({ pressed }) => [styles.primaryWrap, pressed && styles.buttonPressed]}
// //                   >
// //                     <LinearGradient
// //                       colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
// //                       start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
// //                       style={styles.primaryButton}
// //                     >
// //                       <View style={styles.buttonTopShine} />
// //                       <Animated.View
// //                         style={[styles.buttonSweep, { transform: [{ translateX: shineMove }, { rotate: '18deg' }] }]}
// //                       />
// //                       {loading
// //                         ? <ActivityIndicator color="#fff" size="small" />
// //                         : <Text style={styles.primaryButtonText}>💾 Save Admin Setup</Text>
// //                       }
// //                     </LinearGradient>
// //                   </Pressable>

// //                   {/* Skip to Sign In */}
// //                   <Pressable
// //                     onPress={() => navigation.replace('SignIn')}
// //                     style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
// //                   >
// //                     <Text style={styles.secondaryButtonText}>Skip — Go to Sign In</Text>
// //                   </Pressable>

// //                 </View>
// //               </LinearGradient>
// //             </Animated.View>
// //           </ScrollView>
// //         </KeyboardAvoidingView>
// //       </LinearGradient>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safeArea:      { flex: 1, backgroundColor: '#141B27' },
// //   container:     { flex: 1 },
// //   keyboardWrap:  { flex: 1 },
// //   scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
// //   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
// //   cardGlowBack:  {
// //     position: 'absolute', width: '97%', height: 680, borderRadius: 36,
// //     backgroundColor: 'rgba(77, 235, 255, 0.08)',
// //     shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36,
// //     shadowOffset: { width: 0, height: 0 }, elevation: 18,
// //   },
// //   cardGlowSoft: {
// //     position: 'absolute', width: '90%', height: 600, borderRadius: 34,
// //     backgroundColor: 'rgba(255,255,255,0.03)',
// //     shadowColor: '#E95CFF', shadowOpacity: 0.10, shadowRadius: 18,
// //     shadowOffset: { width: 0, height: 0 },
// //   },
// //   card: {
// //     width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30,
// //     borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
// //     backgroundColor: 'rgba(255,255,255,0.04)',
// //     shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26,
// //     shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden',
// //   },
// //   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
// //   topShine: {
// //     position: 'absolute', top: 0, left: '15%', right: '15%',
// //     height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)',
// //   },
// //   miniTag: {
// //     alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7,
// //     borderRadius: 999, marginBottom: 16,
// //     backgroundColor: 'rgba(103, 232, 240, 0.14)',
// //     borderWidth: 1, borderColor: 'rgba(103, 232, 240, 0.24)',
// //   },
// //   miniTagText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
// //   title:    { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
// //   subtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 24 },
// //   form: { gap: 14 },
// //   inputGroup: { marginBottom: 2 },
// //   label: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
// //   input: {
// //     minHeight: 56, borderRadius: 18, borderWidth: 1.3,
// //     borderColor: 'rgba(77, 235, 255, 0.34)', backgroundColor: 'rgba(255,255,255,0.05)',
// //     paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15,
// //     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 },
// //   },
// //   inputError:     { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
// //   errorText:      { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
// //   hintText:       { color: 'rgba(255,255,255,0.38)', fontSize: 11, marginTop: 5, marginLeft: 4 },
// //   passwordWrapper: {
// //     flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18,
// //     borderWidth: 1.3, borderColor: 'rgba(77, 235, 255, 0.34)',
// //     backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16,
// //     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 },
// //   },
// //   passwordInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
// //   eyeButton:     { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
// //   eyeIcon:       { fontSize: 18 },
// //   noteBox: {
// //     backgroundColor: 'rgba(255, 200, 80, 0.10)',
// //     borderWidth: 1, borderColor: 'rgba(255, 200, 80, 0.30)',
// //     borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
// //   },
// //   noteText: { color: 'rgba(255, 220, 120, 0.9)', fontSize: 12, lineHeight: 18, fontWeight: '500' },
// //   buttonGlowWrap: {
// //     position: 'absolute', left: 8, right: 8, bottom: 62,
// //     height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0,
// //   },
// //   buttonGlowLayer: {
// //     width: '95%', height: 58, borderRadius: 18,
// //     backgroundColor: 'rgba(217, 44, 255, 0.18)',
// //     shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18,
// //     shadowOffset: { width: 0, height: 0 }, elevation: 10,
// //   },
// //   primaryWrap:       { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
// //   primaryButton:     { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
// //   buttonTopShine:    { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
// //   buttonSweep:       { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
// //   primaryButtonText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
// //   secondaryButton:   { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
// //   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
// //   buttonPressed:     { opacity: 0.94, transform: [{ scale: 0.992 }] },
// // });

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   TextInput, Pressable, KeyboardAvoidingView, Platform,
//   Animated, Alert, ScrollView, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }         from 'expo-linear-gradient';
// import { saveAdminCredentials }   from '../utils/adminStorage';
// import { setupAdminApi }          from '../utils/apiService';

// export default function AdminSetupScreen({ navigation }) {
//   const [adminEmail,    setAdminEmail]    = useState('');
//   const [adminPassword, setAdminPassword] = useState('');
//   const [companyName,   setCompanyName]   = useState('');
//   const [showPassword,  setShowPassword]  = useState(false);
//   const [loading,       setLoading]       = useState(false);
//   const [errors,        setErrors]        = useState({
//     adminEmail: '', adminPassword: '', companyName: '',
//   });

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,     duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,     duration: 1000, useNativeDriver: true }),
//       Animated.loop(Animated.sequence([
//         Animated.timing(glowPulse,  { toValue: 1.04, duration: 2200, useNativeDriver: true }),
//         Animated.timing(glowPulse,  { toValue: 0.96, duration: 2200, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(buttonGlow, { toValue: 1,    duration: 1700, useNativeDriver: true }),
//         Animated.timing(buttonGlow, { toValue: 0.92, duration: 1700, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(cardBreath, { toValue: 1,     duration: 2600, useNativeDriver: true }),
//         Animated.timing(cardBreath, { toValue: 0.985, duration: 2600, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.delay(900),
//         Animated.timing(shineMove, { toValue: 320,  duration: 1800, useNativeDriver: true }),
//         Animated.delay(1200),
//         Animated.timing(shineMove, { toValue: -220, duration: 0,    useNativeDriver: true }),
//       ])),
//     ]).start();
//   }, []);

//   const validate = () => {
//     const e = { adminEmail: '', adminPassword: '', companyName: '' };
//     let ok = true;

//     if (!companyName.trim()) {
//       e.companyName = 'Company name is required'; ok = false;
//     } else if (companyName.trim().length < 2) {
//       e.companyName = 'Must be at least 2 characters'; ok = false;
//     }

//     if (!adminEmail.trim()) {
//       e.adminEmail = 'Email is required'; ok = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim())) {
//       e.adminEmail = 'Enter a valid email address'; ok = false;
//     }

//     if (!adminPassword.trim()) {
//       e.adminPassword = 'Password is required'; ok = false;
//     } else if (adminPassword.length < 6) {
//       e.adminPassword = 'Min 6 characters'; ok = false;
//     } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(adminPassword)) {
//       e.adminPassword = 'Must have letters + numbers'; ok = false;
//     } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(adminPassword)) {
//       e.adminPassword = 'Must have a special character (!@#$%^&*)'; ok = false;
//     }

//     setErrors(e);
//     return ok;
//   };

//   // const handleSetup = async () => {
//   //   if (!validate()) return;

//   //   try {
//   //     setLoading(true);

//   //     await setupAdminApi({
//   //       email:       adminEmail.trim(),
//   //       password:    adminPassword.trim(),
//   //       companyName: companyName.trim(),
//   //     });

//   //     await saveAdminCredentials({
//   //       email:       adminEmail.trim().toLowerCase(),
//   //       password:    adminPassword.trim(),
//   //       companyName: companyName.trim(),
//   //     });

//   //     setLoading(false);

//   //     Alert.alert(
//   //       '✅ Success',
//   //       'Admin created successfully',
//   //       [{ text: 'Go to Login', onPress: () => navigation.replace('SignIn') }]
//   //     );

//   //   } catch (err) {
//   //     setLoading(false);

//   //     if (err.message?.toLowerCase().includes('admin already exists')) {
//   //       Alert.alert(
//   //         '⚠️ Admin Already Setup',
//   //         'Admin is already created. Please login instead.',
//   //         [{ text: 'Go to Login', onPress: () => navigation.replace('SignIn') }]
//   //       );
//   //     } else {
//   //       Alert.alert('Setup Failed', err.message || 'Something went wrong');
//   //     }
//   //   }
//   // };
// // const handleSetup = async () => {
// //   if (!validate()) return;

// //   try {
// //     setLoading(true);

// //     const result = await setupAdminApi({
// //       email:       adminEmail.trim(),
// //       password:    adminPassword.trim(),
// //       companyName: companyName.trim(),
// //     });

// //     console.log('setupAdminApi result:', result);

// //     // Always save locally — new or existing admin
// //     await saveAdminCredentials({
// //       email:       adminEmail.trim().toLowerCase(),
// //       password:    adminPassword.trim(),
// //       companyName: companyName.trim(),
// //     });

// //     setLoading(false);

// //     Alert.alert(
// //       '✅ Success',
// //       result?.alreadyExists
// //         ? 'Admin credentials saved locally. You can now login.'
// //         : 'Admin created successfully! You can now login.',
// //       [{ text: 'Go to Login', onPress: () => navigation.replace('SignIn') }]
// //     );

// //   } catch (err) {
// //     setLoading(false);
// //     console.log('handleSetup error:', err);
// //     Alert.alert('Setup Failed', err.message || 'Something went wrong');
// //   }
// // };
//  const handleSetup = async () => {
//   console.log('🔥 handleSetup called');
  
//   if (!validate()) {
//     console.log('❌ Validation failed');
//     return;
//   }

//   console.log('✅ Validation passed');
//   console.log('📧 Email:', adminEmail.trim());
//   console.log('🏢 Company:', companyName.trim());

//   try {
//     setLoading(true);
//     console.log('📡 Calling setupAdminApi...');

//     const result = await setupAdminApi({
//       email:       adminEmail.trim(),
//       password:    adminPassword.trim(),
//       companyName: companyName.trim(),
//     });

//     console.log('✅ setupAdminApi result:', JSON.stringify(result));

//     console.log('💾 Saving to AsyncStorage...');
//     await saveAdminCredentials({
//       email:       adminEmail.trim().toLowerCase(),
//       password:    adminPassword.trim(),
//       companyName: companyName.trim(),
//     });
//     console.log('✅ AsyncStorage saved');

//     setLoading(false);

//     Alert.alert(
//       '✅ Success',
//       result?.alreadyExists
//         ? 'Admin credentials saved. You can now login.'
//         : 'Admin created successfully! You can now login.',
//       [{ text: 'Go to Login', onPress: () => navigation.replace('SignIn') }]
//     );

//   } catch (err) {
//     setLoading(false);
//     console.log('❌ handleSetup ERROR:', err);
//     console.log('❌ Error message:', err?.message);
//     console.log('❌ Error stack:', err?.stack);
    
//     Alert.alert(
//       'Setup Failed',
//       err?.message || 'Unknown error occurred',
//       [{ text: 'OK' }]
//     );
//   }
// };

// return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//             keyboardShouldPersistTaps="handled"
//           >
//             <Animated.View style={[styles.cardOuterWrap, {
//               opacity: fadeAnim,
//               transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//             }]}>

//               <Animated.View style={[styles.cardGlowBack, {
//                 opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//                 transform: [{ scale: glowPulse }],
//               }]} />

//               <Animated.View style={[styles.cardGlowSoft, {
//                 opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//                 transform: [{ scale: glowPulse }],
//               }]} />

//               <LinearGradient
//                 colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.card}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.topShine} />

//                 <View style={styles.miniTag}>
//                   <Text style={styles.miniTagText}>⚙️ First-Time Setup</Text>
//                 </View>

//                 <Text style={styles.title}>Admin Setup</Text>
//                 <Text style={styles.subtitle}>
//                   Set your admin credentials once. These will be used to sign in as admin on this device.
//                 </Text>

//                 <View style={styles.form}>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Company Name</Text>
//                     <TextInput
//                       value={companyName}
//                       onChangeText={v => { setCompanyName(v); setErrors(e => ({ ...e, companyName: '' })); }}
//                       placeholder="e.g. Apps Marketplace"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       autoCapitalize="words"
//                       autoCorrect={false}
//                       style={[styles.input, errors.companyName ? styles.inputError : null]}
//                     />
//                     {errors.companyName ? <Text style={styles.errorText}>⚠ {errors.companyName}</Text> : null}
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Admin Email</Text>
//                     <TextInput
//                       value={adminEmail}
//                       onChangeText={v => { setAdminEmail(v); setErrors(e => ({ ...e, adminEmail: '' })); }}
//                       placeholder="admin@yourcompany.com"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       style={[styles.input, errors.adminEmail ? styles.inputError : null]}
//                     />
//                     {errors.adminEmail ? <Text style={styles.errorText}>⚠ {errors.adminEmail}</Text> : null}
//                   </View>

//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Admin Password</Text>
//                     <View style={[styles.passwordWrapper, errors.adminPassword ? styles.inputError : null]}>
//                       <TextInput
//                         value={adminPassword}
//                         onChangeText={v => { setAdminPassword(v); setErrors(e => ({ ...e, adminPassword: '' })); }}
//                         placeholder="Create admin password"
//                         placeholderTextColor="rgba(255,255,255,0.42)"
//                         secureTextEntry={!showPassword}
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         autoComplete="off"
//                         textContentType="none"
//                         style={styles.passwordInput}
//                       />
//                       <Pressable
//                         onPress={() => setShowPassword(p => !p)}
//                         style={styles.eyeButton}
//                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                       >
//                         <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                       </Pressable>
//                     </View>
//                     {errors.adminPassword
//                       ? <Text style={styles.errorText}>⚠ {errors.adminPassword}</Text>
//                       : !adminPassword
//                         ? <Text style={styles.hintText}>Min 6 chars • letters + numbers + symbol</Text>
//                         : null
//                     }
//                   </View>

//                   <View style={styles.noteBox}>
//                     <Text style={styles.noteText}>
//                       ⚠️ This setup runs only once. Store your credentials safely — they cannot be recovered without reinstalling the app.
//                     </Text>
//                   </View>

//                   <Animated.View style={[styles.buttonGlowWrap, {
//                     opacity: buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.30, 0.56] }),
//                     transform: [{ scale: buttonGlow }],
//                   }]}>
//                     <View style={styles.buttonGlowLayer} />
//                   </Animated.View>

//                   <Pressable
//                     onPress={handleSetup}
//                     disabled={loading}
//                     style={({ pressed }) => [styles.primaryWrap, pressed && styles.buttonPressed]}
//                   >
//                     <LinearGradient
//                       colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                       start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                       style={styles.primaryButton}
//                     >
//                       <View style={styles.buttonTopShine} />
//                       <Animated.View style={[styles.buttonSweep, {
//                         transform: [{ translateX: shineMove }, { rotate: '18deg' }],
//                       }]} />
//                       {loading
//                         ? <ActivityIndicator color="#fff" size="small" />
//                         : <Text style={styles.primaryButtonText}>💾 Save Admin Setup</Text>
//                       }
//                     </LinearGradient>
//                   </Pressable>

//                   <Pressable
//                     onPress={() => navigation.replace('SignIn')}
//                     style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.secondaryButtonText}>Skip — Go to Sign In</Text>
//                   </Pressable>

//                 </View>
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
//   cardGlowBack: {
//     position: 'absolute', width: '97%', height: 680, borderRadius: 36,
//     backgroundColor: 'rgba(77,235,255,0.08)',
//     shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36,
//     shadowOffset: { width: 0, height: 0 }, elevation: 18,
//   },
//   cardGlowSoft: {
//     position: 'absolute', width: '90%', height: 600, borderRadius: 34,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#E95CFF', shadowOpacity: 0.10, shadowRadius: 18,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   card: {
//     width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30,
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden',
//   },
//   cardGlassOverlay:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine:          { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },
//   miniTag:           { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
//   miniTagText:       { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title:             { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle:          { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 24 },
//   form:              { gap: 14 },
//   inputGroup:        { marginBottom: 2 },
//   label:             { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input:             { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   inputError:        { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   errorText:         { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
//   hintText:          { color: 'rgba(255,255,255,0.38)', fontSize: 11, marginTop: 5, marginLeft: 4 },
//   passwordWrapper:   { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   passwordInput:     { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:         { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon:           { fontSize: 18 },
//   noteBox:           { backgroundColor: 'rgba(255,200,80,0.10)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.30)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
//   noteText:          { color: 'rgba(255,220,120,0.9)', fontSize: 12, lineHeight: 18, fontWeight: '500' },
//   buttonGlowWrap:    { position: 'absolute', left: 8, right: 8, bottom: 62, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer:   { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
//   primaryWrap:       { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   primaryButton:     { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine:    { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:       { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   primaryButtonText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
//   secondaryButton:   { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:     { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  TextInput, Pressable, KeyboardAvoidingView, Platform,
  Animated, Alert, ScrollView, ActivityIndicator,
} from 'react-native';
import { LinearGradient }       from 'expo-linear-gradient';
import { saveAdminCredentials, markAdminSetupDone } from '../utils/adminStorage';
import { setupAdminApi }        from '../utils/apiService';
import { showAlert } from '../components/CrossPlatformAlert';
import useCustomAlert from '../utils/useCustomAlert';
import CustomAlertModal from '../components/CustomAlertModal';

export default function AdminSetupScreen({ navigation }) {
  const [adminEmail,    setAdminEmail]    = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [companyName,   setCompanyName]   = useState('');
  const [showPassword,  setShowPassword]  = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [errors,        setErrors]        = useState({
    adminEmail: '', adminPassword: '', companyName: '',
  });

  const slideAnim  = useRef(new Animated.Value(140)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const glowPulse  = useRef(new Animated.Value(0.96)).current;
  const buttonGlow = useRef(new Animated.Value(0.92)).current;
  const shineMove  = useRef(new Animated.Value(-220)).current;
  const cardBreath = useRef(new Animated.Value(0.985)).current;
   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim,  { toValue: 0,     duration: 950,  useNativeDriver: true }),
      Animated.timing(fadeAnim,   { toValue: 1,     duration: 1000, useNativeDriver: true }),
      Animated.loop(Animated.sequence([
        Animated.timing(glowPulse,  { toValue: 1.04, duration: 2200, useNativeDriver: true }),
        Animated.timing(glowPulse,  { toValue: 0.96, duration: 2200, useNativeDriver: true }),
      ])),
      Animated.loop(Animated.sequence([
        Animated.timing(buttonGlow, { toValue: 1,    duration: 1700, useNativeDriver: true }),
        Animated.timing(buttonGlow, { toValue: 0.92, duration: 1700, useNativeDriver: true }),
      ])),
      Animated.loop(Animated.sequence([
        Animated.timing(cardBreath, { toValue: 1,     duration: 2600, useNativeDriver: true }),
        Animated.timing(cardBreath, { toValue: 0.985, duration: 2600, useNativeDriver: true }),
      ])),
      Animated.loop(Animated.sequence([
        Animated.delay(900),
        Animated.timing(shineMove, { toValue: 320,  duration: 1800, useNativeDriver: true }),
        Animated.delay(1200),
        Animated.timing(shineMove, { toValue: -220, duration: 0,    useNativeDriver: true }),
      ])),
    ]).start();
  }, []);

  const validate = () => {
    const e = { adminEmail: '', adminPassword: '', companyName: '' };
    let ok = true;

    if (!companyName.trim()) {
      e.companyName = 'Company name is required'; ok = false;
    } else if (companyName.trim().length < 2) {
      e.companyName = 'Must be at least 2 characters'; ok = false;
    }

    if (!adminEmail.trim()) {
      e.adminEmail = 'Email is required'; ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim())) {
      e.adminEmail = 'Enter a valid email address'; ok = false;
    }

    if (!adminPassword.trim()) {
      e.adminPassword = 'Password is required'; ok = false;
    } else if (adminPassword.length < 6) {
      e.adminPassword = 'Min 6 characters'; ok = false;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(adminPassword)) {
      e.adminPassword = 'Must have letters + numbers'; ok = false;
    } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(adminPassword)) {
      e.adminPassword = 'Must have a special character (!@#$%^&*)'; ok = false;
    }

    setErrors(e);
    return ok;
  };

  const handleSetup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const result = await setupAdminApi({
        email:       adminEmail.trim(),
        password:    adminPassword.trim(),
        companyName: companyName.trim(),
      });

      // Always save locally — new or existing admin
      await saveAdminCredentials({
        email:       adminEmail.trim().toLowerCase(),
        password:    adminPassword.trim(),
        companyName: companyName.trim(),
      });
    await markAdminSetupDone();
      setLoading(false);

      const savedEmail = adminEmail.trim().toLowerCase();

      showAlert(
        '✅ Setup Complete',
        result?.alreadyExists
          ? `Admin credentials saved!\n\nSign in using:\n📧 ${savedEmail}`
          : `Admin created successfully!\n\nSign in using:\n📧 ${savedEmail}`,
        [{
          text: 'Go to Sign In',
          onPress: () =>
            // ✅ Pass prefillEmail so SignIn screen auto-fills the admin email
            navigation.replace('SignIn', { prefillEmail: savedEmail }),
        }]
      );

    } catch (err) {
      setLoading(false);
      showAlert('Setup Failed', err?.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141B27" />
       <CustomAlertModal config={alertConfig} onHide={hideAlert} />
      <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={[styles.cardOuterWrap, {
              opacity:   fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: cardBreath }],
            }]}>

              <Animated.View style={[styles.cardGlowBack, {
                opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
                transform: [{ scale: glowPulse }],
              }]} />

              <Animated.View style={[styles.cardGlowSoft, {
                opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
                transform: [{ scale: glowPulse }],
              }]} />

              <LinearGradient
                colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                style={styles.card}
              >
                <View style={styles.cardGlassOverlay} />
                <View style={styles.topShine} />

                <View style={styles.miniTag}>
                  <Text style={styles.miniTagText}>⚙️ First-Time Setup</Text>
                </View>

                <Text style={styles.title}>Admin Setup</Text>
                <Text style={styles.subtitle}>
                  Set your admin credentials once. After saving, you'll be taken to Sign In to login as admin.
                </Text>

                <View style={styles.form}>

                  {/* Company Name */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Company Name</Text>
                    <TextInput
                      value={companyName}
                      onChangeText={v => { setCompanyName(v); setErrors(e => ({ ...e, companyName: '' })); }}
                      placeholder="e.g. Apps Marketplace"
                      placeholderTextColor="rgba(255,255,255,0.42)"
                      autoCapitalize="words"
                      autoCorrect={false}
                      style={[styles.input, errors.companyName ? styles.inputError : null]}
                    />
                    {errors.companyName ? <Text style={styles.errorText}>⚠ {errors.companyName}</Text> : null}
                  </View>

                  {/* Admin Email */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Admin Email</Text>
                    <TextInput
                      value={adminEmail}
                      onChangeText={v => { setAdminEmail(v); setErrors(e => ({ ...e, adminEmail: '' })); }}
                      placeholder="admin@yourcompany.com"
                      placeholderTextColor="rgba(255,255,255,0.42)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[styles.input, errors.adminEmail ? styles.inputError : null]}
                    />
                    {errors.adminEmail ? <Text style={styles.errorText}>⚠ {errors.adminEmail}</Text> : null}
                  </View>

                  {/* Admin Password */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Admin Password</Text>
                    <View style={[styles.passwordWrapper, errors.adminPassword ? styles.inputError : null]}>
                      <TextInput
                        value={adminPassword}
                        onChangeText={v => { setAdminPassword(v); setErrors(e => ({ ...e, adminPassword: '' })); }}
                        placeholder="Create admin password"
                        placeholderTextColor="rgba(255,255,255,0.42)"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        textContentType="none"
                        style={styles.passwordInput}
                      />
                      <Pressable
                        onPress={() => setShowPassword(p => !p)}
                        style={styles.eyeButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                      </Pressable>
                    </View>
                    {errors.adminPassword
                      ? <Text style={styles.errorText}>⚠ {errors.adminPassword}</Text>
                      : !adminPassword
                        ? <Text style={styles.hintText}>Min 6 chars • letters + numbers + symbol</Text>
                        : null
                    }
                  </View>

                  {/* Warning Note */}
                  <View style={styles.noteBox}>
                    <Text style={styles.noteText}>
                      ⚠️ After setup, use these credentials to sign in as Admin from the Sign In screen.
                      Store them safely — they cannot be recovered without reinstalling the app.
                    </Text>
                  </View>

                  {/* Button Glow */}
                  <Animated.View style={[styles.buttonGlowWrap, {
                    opacity:   buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.30, 0.56] }),
                    transform: [{ scale: buttonGlow }],
                  }]}>
                    <View style={styles.buttonGlowLayer} />
                  </Animated.View>

                  {/* Save Button */}
                  <Pressable
                    onPress={handleSetup}
                    disabled={loading}
                    style={({ pressed }) => [styles.primaryWrap, pressed && styles.buttonPressed]}
                  >
                    <LinearGradient
                      colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.primaryButton}
                    >
                      <View style={styles.buttonTopShine} />
                      <Animated.View style={[styles.buttonSweep, {
                        transform: [{ translateX: shineMove }, { rotate: '18deg' }],
                      }]} />
                      {loading
                        ? <ActivityIndicator color="#fff" size="small" />
                        : <Text style={styles.primaryButtonText}>💾 Save Admin Setup</Text>
                      }
                    </LinearGradient>
                  </Pressable>

                  {/* Skip */}
                  <Pressable
                    onPress={() => navigation.replace('SignIn')}
                    style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                  >
                    <Text style={styles.secondaryButtonText}>Skip — Go to Sign In</Text>
                  </Pressable>

                </View>
              </LinearGradient>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:      { flex: 1, backgroundColor: '#141B27' },
  container:     { flex: 1 },
  keyboardWrap:  { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 22, paddingVertical: 28 },
  cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
  cardGlowBack:  { position: 'absolute', width: '97%', height: 680, borderRadius: 36, backgroundColor: 'rgba(77,235,255,0.08)', shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36, shadowOffset: { width: 0, height: 0 }, elevation: 18 },
  cardGlowSoft:  { position: 'absolute', width: '90%', height: 600, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#E95CFF', shadowOpacity: 0.10, shadowRadius: 18, shadowOffset: { width: 0, height: 0 } },
  card:          { width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26, shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden' },
  cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
  topShine:      { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },
  miniTag:       { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
  miniTagText:   { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
  title:         { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
  subtitle:      { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 24 },
  form:          { gap: 14 },
  inputGroup:    { marginBottom: 2 },
  label:         { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input:         { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  inputError:    { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
  errorText:     { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
  hintText:      { color: 'rgba(255,255,255,0.38)', fontSize: 11, marginTop: 5, marginLeft: 4 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  passwordInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
  eyeButton:     { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
  eyeIcon:       { fontSize: 18 },
  noteBox:       { backgroundColor: 'rgba(255,200,80,0.10)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.30)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
  noteText:      { color: 'rgba(255,220,120,0.9)', fontSize: 12, lineHeight: 18, fontWeight: '500' },
  buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 62, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
  buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
  primaryWrap:       { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
  primaryButton:     { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
  buttonTopShine:    { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
  buttonSweep:       { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
  primaryButtonText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
  secondaryButton:   { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
  buttonPressed:     { opacity: 0.94, transform: [{ scale: 0.992 }] },
});