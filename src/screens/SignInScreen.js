


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { setLoggedInUser } from '../utils/authStorage';
// import { signInApi } from '../utils/apiService';
// import { useNotifications } from '../context/NotificationContext';

// const ADMIN_EMAIL    = 'admin@appsmarket.com';
// const ADMIN_PASSWORD = 'Admin@123';

// export default function SignInScreen({ navigation }) {
//   const [email, setEmail]                 = useState('');
//   const [password, setPassword]           = useState('');
//   const [showPassword, setShowPassword]   = useState(false);
//   const [loading, setLoading]             = useState(false);
//   const [rememberMe, setRememberMe]       = useState(false);
//   const [errors, setErrors]               = useState({ email: '', password: '' });
//   const [isAdminFilled, setIsAdminFilled] = useState(false);

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

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
//         Animated.timing(glowPulse,  { toValue: 1.04,  duration: 2200, useNativeDriver: true }),
//         Animated.timing(glowPulse,  { toValue: 0.96,  duration: 2200, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(buttonGlow, { toValue: 1,     duration: 1700, useNativeDriver: true }),
//         Animated.timing(buttonGlow, { toValue: 0.92,  duration: 1700, useNativeDriver: true }),
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

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   // ── Admin Login button — no autofill, user types manually ──
//   const handleAdminButtonPress = () => {
//     setErrors({ email: '', password: '' });
//     setIsAdminFilled(true);
//   };

//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // ── Admin Login ──
//     if (
//       enteredEmail    === ADMIN_EMAIL.toLowerCase() &&
//       enteredPassword === ADMIN_PASSWORD
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      ADMIN_EMAIL,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         Alert.alert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.container}
//       >
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View
//             style={[
//               styles.cardOuterWrap,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//               },
//             ]}
//           >
//             <Animated.View
//               style={[styles.cardGlowBack, {
//                 opacity: glowPulse.interpolate({
//                   inputRange: [0.96, 1.04],
//                   outputRange: [0.34, 0.68],
//                 }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />
//             <Animated.View
//               style={[styles.cardGlowSoft, {
//                 opacity: glowPulse.interpolate({
//                   inputRange: [0.96, 1.04],
//                   outputRange: [0.16, 0.28],
//                 }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />

//             <LinearGradient
//               colors={[
//                 'rgba(255,255,255,0.12)',
//                 'rgba(255,255,255,0.05)',
//                 'rgba(255,255,255,0.02)',
//               ]}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               <View style={styles.form}>

//                 {/* ── Email ── */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={(v) => {
//                       setEmail(v);
//                       setIsAdminFilled(false);
//                       setErrors(e => ({ ...e, email: '' }));
//                     }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[styles.input, errors.email ? styles.inputError : null]}
//                   />
//                   {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                 </View>

//                 {/* ── Password ── */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={(v) => {
//                         setPassword(v);
//                         setIsAdminFilled(false);
//                         setErrors(e => ({ ...e, password: '' }));
//                       }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       keyboardType="default"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(prev => !prev)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                     </Pressable>
//                   </View>
//                   {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                 </View>

//                 {/* ── Options Row ── */}
//                 <View style={styles.optionsRow}>
//                   <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>
//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 {/* ── Button Glow ── */}
//                 <Animated.View
//                   style={[styles.buttonGlowWrap, {
//                     opacity: buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                     transform: [{ scale: buttonGlow }],
//                   }]}
//                 >
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 {/* ── Sign In Button ── */}
//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View
//                       style={[styles.buttonSweep, { transform: [{ translateX: shineMove }, { rotate: '18deg' }] }]}
//                     />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>
//                           {isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}
//                         </Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 {/* ── Admin Login Button ── */}
//                 <Pressable
//                   onPress={handleAdminButtonPress}
//                   style={({ pressed }) => [
//                     styles.adminButton,
//                     isAdminFilled && styles.adminButtonActive,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                   <Text style={[styles.adminButtonText, isAdminFilled && styles.adminButtonTextActive]}>
//                     🔐 Admin Login
//                   </Text>
//                 </Pressable>

//                 {/* ── Sign Up ── */}
//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                 >
//                   <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   keyboardWrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
//   cardGlowBack: {
//     position: 'absolute', width: '97%', height: 520, borderRadius: 36,
//     backgroundColor: 'rgba(77, 235, 255, 0.08)',
//     shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36,
//     shadowOffset: { width: 0, height: 0 }, elevation: 18,
//   },
//   cardGlowSoft: {
//     position: 'absolute', width: '90%', height: 450, borderRadius: 34,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   card: {
//     width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30,
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden',
//   },
//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine: { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },
//   miniTag: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103, 232, 240, 0.14)', borderWidth: 1, borderColor: 'rgba(103, 232, 240, 0.24)' },
//   miniTagText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title: { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 16 },
//   form: { gap: 14 },
//   inputGroup: { marginBottom: 2 },
//   label: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input: { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77, 235, 255, 0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   inputError: { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   errorText: { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
//   passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77, 235, 255, 0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   passwordInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton: { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon: { fontSize: 18 },
//   optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap: { flexDirection: 'row', alignItems: 'center' },
//   checkbox: { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive: { backgroundColor: '#4DEBFF' },
//   checkboxInner: { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText: { color: '#FFFFFF', fontSize: 13 },
//   forgotText: { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },
//   buttonGlowWrap: { position: 'absolute', left: 8, right: 8, bottom: 108, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217, 44, 255, 0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
//   signInWrap: { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton: { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep: { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
//   adminButton:           { minHeight: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonActive:     { borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonText:       { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
//   adminButtonTextActive: { color: '#fff' },
//   secondaryButton: { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed: { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });
// screens/SignInScreen.jsx
// Admin credentials are loaded from AsyncStorage (set during AdminSetupScreen).
// No hardcoded admin email/password anymore.

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { setLoggedInUser } from '../utils/authStorage';
// import { signInApi } from '../utils/apiService';
// import { useNotifications } from '../context/NotificationContext';
// import { getAdminCredentials } from '../utils/adminStorage'; // 👈 dynamic admin creds

// export default function SignInScreen({ navigation }) {
//   const [email, setEmail]                 = useState('');
//   const [password, setPassword]           = useState('');
//   const [showPassword, setShowPassword]   = useState(false);
//   const [loading, setLoading]             = useState(false);
//   const [rememberMe, setRememberMe]       = useState(false);
//   const [errors, setErrors]               = useState({ email: '', password: '' });
//   const [isAdminFilled, setIsAdminFilled] = useState(false);

//   // Runtime admin credentials (loaded from storage)
//   const [adminCreds, setAdminCreds] = useState(null); // { email, password, companyName }
//   const [adminSetupDone, setAdminSetupDone] = useState(true); // assume true; check on mount

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   useEffect(() => {
//     // Load admin credentials from storage
//     (async () => {
//       const creds = await getAdminCredentials();
//       if (!creds) {
//         // Admin not set up yet — redirect to setup
//         setAdminSetupDone(false);
//         navigation.replace('AdminSetup');
//         return;
//       }
//       setAdminCreds(creds);
//       setAdminSetupDone(true);
//     })();

//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,    duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,    duration: 1000, useNativeDriver: true }),
//       Animated.loop(Animated.sequence([
//         Animated.timing(glowPulse,  { toValue: 1.04, duration: 2200, useNativeDriver: true }),
//         Animated.timing(glowPulse,  { toValue: 0.96, duration: 2200, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(buttonGlow, { toValue: 1,    duration: 1700, useNativeDriver: true }),
//         Animated.timing(buttonGlow, { toValue: 0.92, duration: 1700, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(cardBreath, { toValue: 1,    duration: 2600, useNativeDriver: true }),
//         Animated.timing(cardBreath, { toValue: 0.985,duration: 2600, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.delay(900),
//         Animated.timing(shineMove, { toValue: 320,  duration: 1800, useNativeDriver: true }),
//         Animated.delay(1200),
//         Animated.timing(shineMove, { toValue: -220, duration: 0,    useNativeDriver: true }),
//       ])),
//     ]).start();
//   }, []);

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   // ── Admin button press — marks state only, user types manually ──
//   // const handleAdminButtonPress = () => {
//   //   if (!adminCreds) {
//   //     Alert.alert('Admin Not Set Up', 'Please complete admin setup first.');
//   //     navigation.navigate('AdminSetup');
//   //     return;
//   //   }
//   //   setErrors({ email: '', password: '' });
//   //   setIsAdminFilled(true);
//   //   // Show a hint that admin credentials should be entered
//   //   Alert.alert(
//   //     '🔐 Admin Login',
//   //     `Enter your admin credentials:\nEmail: ${adminCreds.email}`,
//   //     [{ text: 'OK' }]
//   //   );
//   // };
// const handleAdminButtonPress = () => {
//   if (!adminCreds) {
//     Alert.alert('Admin Not Set Up', 'Please complete admin setup first.');
//     navigation.navigate('AdminSetup');
//     return;
//   }

//   setErrors({ email: '', password: '' });
//   setIsAdminFilled(true);

//   // Simple message without email
//   Alert.alert(
//     '🔐 Admin Login',
//     'Please fill the credentials',
//     [{ text: 'OK' }]
//   );
// };
//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // ── Admin Login — compare against locally stored credentials ──
//     if (
//       adminCreds &&
//       enteredEmail === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     // ── Regular user email format validation ──
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         Alert.alert('Sign In Failed', error.message);
//       }
//     }
//   };

//   // Don't render if we're redirecting to AdminSetup
//   if (!adminSetupDone) return null;

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.container}
//       >
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View
//             style={[
//               styles.cardOuterWrap,
//               { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: cardBreath }] },
//             ]}
//           >
//             <Animated.View
//               style={[styles.cardGlowBack, {
//                 opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />
//             <Animated.View
//               style={[styles.cardGlowSoft, {
//                 opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />

//             <LinearGradient
//               colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               {/* Show company name if admin is set up */}
//               {adminCreds?.companyName && (
//                 <View style={styles.companyBadge}>
//                   <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                 </View>
//               )}

//               <View style={styles.form}>

//                 {/* ── Email ── */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={(v) => {
//                       setEmail(v);
//                       setIsAdminFilled(false);
//                       setErrors(e => ({ ...e, email: '' }));
//                     }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[styles.input, errors.email ? styles.inputError : null]}
//                   />
//                   {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                 </View>

//                 {/* ── Password ── */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={(v) => {
//                         setPassword(v);
//                         setIsAdminFilled(false);
//                         setErrors(e => ({ ...e, password: '' }));
//                       }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       keyboardType="default"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(prev => !prev)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                     </Pressable>
//                   </View>
//                   {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                 </View>

//                 {/* ── Options Row ── */}
//                 <View style={styles.optionsRow}>
//                   <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>
//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 {/* ── Button Glow ── */}
//                 <Animated.View
//                   style={[styles.buttonGlowWrap, {
//                     opacity: buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                     transform: [{ scale: buttonGlow }],
//                   }]}
//                 >
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 {/* ── Sign In Button ── */}
//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View
//                       style={[styles.buttonSweep, { transform: [{ translateX: shineMove }, { rotate: '18deg' }] }]}
//                     />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>
//                           {isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}
//                         </Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 {/* ── Admin Login Button — shown only if admin is set up ── */}
//                 {adminCreds && (
//                   <Pressable
//                     onPress={handleAdminButtonPress}
//                     style={({ pressed }) => [
//                       styles.adminButton,
//                       isAdminFilled && styles.adminButtonActive,
//                       pressed && styles.buttonPressed,
//                     ]}
//                   >
//                     <Text style={[styles.adminButtonText, isAdminFilled && styles.adminButtonTextActive]}>
//                       🔐 Admin Login
//                     </Text>
//                   </Pressable>
//                 )}

//                 {/* ── Sign Up ── */}
//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                 >
//                   <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   keyboardWrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
//   cardOuterWrap:{ justifyContent: 'center', alignItems: 'center' },
//   cardGlowBack: {
//     position: 'absolute', width: '97%', height: 580, borderRadius: 36,
//     backgroundColor: 'rgba(77, 235, 255, 0.08)',
//     shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36,
//     shadowOffset: { width: 0, height: 0 }, elevation: 18,
//   },
//   cardGlowSoft: {
//     position: 'absolute', width: '90%', height: 510, borderRadius: 34,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   card: {
//     width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30,
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden',
//   },
//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine: {
//     position: 'absolute', top: 0, left: '15%', right: '15%',
//     height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)',
//   },
//   miniTag: {
//     alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7,
//     borderRadius: 999, marginBottom: 16,
//     backgroundColor: 'rgba(103, 232, 240, 0.14)',
//     borderWidth: 1, borderColor: 'rgba(103, 232, 240, 0.24)',
//   },
//   miniTagText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title:    { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },
//   companyBadge: {
//     alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5,
//     borderRadius: 999, marginBottom: 14,
//     backgroundColor: 'rgba(255,200,80,0.12)',
//     borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)',
//   },
//   companyBadgeText: { color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },
//   form: { gap: 14 },
//   inputGroup: { marginBottom: 2 },
//   label: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input: {
//     minHeight: 56, borderRadius: 18, borderWidth: 1.3,
//     borderColor: 'rgba(77, 235, 255, 0.34)', backgroundColor: 'rgba(255,255,255,0.05)',
//     paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15,
//     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 },
//   },
//   inputError: { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   errorText:  { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
//   passwordWrapper: {
//     flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18,
//     borderWidth: 1.3, borderColor: 'rgba(77, 235, 255, 0.34)',
//     backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16,
//     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 },
//   },
//   passwordInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:     { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon:       { fontSize: 18 },
//   optionsRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap:  { flexDirection: 'row', alignItems: 'center' },
//   checkbox:      { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive:{ backgroundColor: '#4DEBFF' },
//   checkboxInner: { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText:  { color: '#FFFFFF', fontSize: 13 },
//   forgotText:    { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },
//   buttonGlowWrap: {
//     position: 'absolute', left: 8, right: 8, bottom: 108,
//     height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0,
//   },
//   buttonGlowLayer: {
//     width: '95%', height: 58, borderRadius: 18,
//     backgroundColor: 'rgba(217, 44, 255, 0.18)',
//     shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18,
//     shadowOffset: { width: 0, height: 0 }, elevation: 10,
//   },
//   signInWrap:    { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton:  { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine:{ position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:   { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:    { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
//   adminButton:         { minHeight: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonActive:   { borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonText:     { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
//   adminButtonTextActive: { color: '#fff' },
//   secondaryButton:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:       { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });


// screens/SignInScreen.jsx
// ✅ FIX: useEffect లో adminCreds check తీసేశాం
// Admin Login button అస్సలు లేదు — normal SignIn మాత్రమే
// Backend role బట్టి AdminHome లేదా Home కి navigate చేస్తుంది

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   TextInput, Pressable, KeyboardAvoidingView, Platform,
//   Animated, Alert, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }    from 'expo-linear-gradient';
// import { setLoggedInUser }   from '../utils/authStorage';
// import { signInApi }         from '../utils/apiService';
// import { useNotifications }  from '../context/NotificationContext';
// import { getAdminCredentials } from '../utils/adminStorage';

// export default function SignInScreen({ navigation }) {
//   const [email,        setEmail]        = useState('');
//   const [password,     setPassword]     = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading,      setLoading]      = useState(false);
//   const [rememberMe,   setRememberMe]   = useState(false);
//   const [errors,       setErrors]       = useState({ email: '', password: '' });
//   const [adminCreds,   setAdminCreds]   = useState(null);

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   useEffect(() => {
//     // ✅ FIX: adminCreds లేకపోయినా AdminSetup కి push చేయట్లేదు
//     // Simply load చేయి — null అయినా OK
//     (async () => {
//       const creds = await getAdminCredentials();
//       setAdminCreds(creds); // null అయినా fine
//     })();

//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,    duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,    duration: 1000, useNativeDriver: true }),
//       Animated.loop(Animated.sequence([
//         Animated.timing(glowPulse,  { toValue: 1.04, duration: 2200, useNativeDriver: true }),
//         Animated.timing(glowPulse,  { toValue: 0.96, duration: 2200, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(buttonGlow, { toValue: 1,    duration: 1700, useNativeDriver: true }),
//         Animated.timing(buttonGlow, { toValue: 0.92, duration: 1700, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(cardBreath, { toValue: 1,    duration: 2600, useNativeDriver: true }),
//         Animated.timing(cardBreath, { toValue: 0.985,duration: 2600, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.delay(900),
//         Animated.timing(shineMove, { toValue: 320,  duration: 1800, useNativeDriver: true }),
//         Animated.delay(1200),
//         Animated.timing(shineMove, { toValue: -220, duration: 0,    useNativeDriver: true }),
//       ])),
//     ]).start();
//   }, []);

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // ── Step 1: Admin credentials తో match చేయి ──
//     if (
//       adminCreds &&
//       enteredEmail    === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     // ── Step 2: Email format check ──
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     // ── Step 3: Normal user — Backend API call ──
//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         Alert.alert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View style={[styles.cardOuterWrap, {
//             opacity: fadeAnim,
//             transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//           }]}>

//             <Animated.View style={[styles.cardGlowBack, {
//               opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//               transform: [{ scale: glowPulse }],
//             }]} />
//             <Animated.View style={[styles.cardGlowSoft, {
//               opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//               transform: [{ scale: glowPulse }],
//             }]} />

//             <LinearGradient
//               colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               {/* Company badge — adminCreds ఉంటే చూపించు */}
//               {adminCreds?.companyName && (
//                 <View style={styles.companyBadge}>
//                   <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                 </View>
//               )}

//               <View style={styles.form}>

//                 {/* Email */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={v => { setEmail(v); setErrors(e => ({ ...e, email: '' })); }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[styles.input, errors.email ? styles.inputError : null]}
//                   />
//                   {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                 </View>

//                 {/* Password */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={v => { setPassword(v); setErrors(e => ({ ...e, password: '' })); }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(p => !p)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                     </Pressable>
//                   </View>
//                   {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                 </View>

//                 {/* Options Row */}
//                 <View style={styles.optionsRow}>
//                   <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>
//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 {/* Button Glow */}
//                 <Animated.View style={[styles.buttonGlowWrap, {
//                   opacity: buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                   transform: [{ scale: buttonGlow }],
//                 }]}>
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 {/* Sign In Button */}
//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View style={[styles.buttonSweep, {
//                       transform: [{ translateX: shineMove }, { rotate: '18deg' }],
//                     }]} />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>Sign In</Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 {/* ✅ Admin Setup link — adminCreds లేకపోతే మాత్రమే చూపించు */}
//                 {!adminCreds && (
//                   <Pressable
//                     onPress={() => navigation.navigate('AdminSetup')}
//                     style={({ pressed }) => [styles.adminSetupLink, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.adminSetupLinkText}>⚙️ Setup Admin Access</Text>
//                   </Pressable>
//                 )}

//                 {/* Sign Up */}
//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                 >
//                   <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:      { flex: 1, backgroundColor: '#141B27' },
//   container:     { flex: 1 },
//   keyboardWrap:  { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },
//   cardGlowBack: {
//     position: 'absolute', width: '97%', height: 560, borderRadius: 36,
//     backgroundColor: 'rgba(77,235,255,0.08)',
//     shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36,
//     shadowOffset: { width: 0, height: 0 }, elevation: 18,
//   },
//   cardGlowSoft: {
//     position: 'absolute', width: '90%', height: 490, borderRadius: 34,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   card: {
//     width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30,
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden',
//   },
//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine: {
//     position: 'absolute', top: 0, left: '15%', right: '15%',
//     height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)',
//   },
//   miniTag: {
//     alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7,
//     borderRadius: 999, marginBottom: 16,
//     backgroundColor: 'rgba(103,232,240,0.14)',
//     borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)',
//   },
//   miniTagText:  { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title:        { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle:     { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },
//   companyBadge: {
//     alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5,
//     borderRadius: 999, marginBottom: 14,
//     backgroundColor: 'rgba(255,200,80,0.12)',
//     borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)',
//   },
//   companyBadgeText: { color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },
//   form:         { gap: 14 },
//   inputGroup:   { marginBottom: 2 },
//   label:        { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input: {
//     minHeight: 56, borderRadius: 18, borderWidth: 1.3,
//     borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)',
//     paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15,
//     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 },
//   },
//   inputError:      { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   errorText:       { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
//   passwordWrapper: {
//     flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18,
//     borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)',
//     backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16,
//     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 },
//   },
//   passwordInput:   { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:       { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon:         { fontSize: 18 },
//   optionsRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap:    { flexDirection: 'row', alignItems: 'center' },
//   checkbox:        { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive:  { backgroundColor: '#4DEBFF' },
//   checkboxInner:   { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText:    { color: '#FFFFFF', fontSize: 13 },
//   forgotText:      { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },
//   buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 118, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
//   signInWrap:      { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton:    { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine:  { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:     { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:      { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
//   adminSetupLink:  { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(77,235,255,0.3)', marginTop: 4 },
//   adminSetupLinkText: { color: 'rgba(77,235,255,0.8)', fontSize: 13, fontWeight: '600' },
//   secondaryButton: { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:   { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });



// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   TextInput, Pressable, KeyboardAvoidingView, Platform,
//   Animated, Alert, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }          from 'expo-linear-gradient';
// import { setLoggedInUser }         from '../utils/authStorage';
// import { signInApi }               from '../utils/apiService';
// import { useNotifications }        from '../context/NotificationContext';
// import { getAdminCredentials }     from '../utils/adminStorage';

// export default function SignInScreen({ navigation }) {
//   const [email,        setEmail]        = useState('');
//   const [password,     setPassword]     = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading,      setLoading]      = useState(false);
//   const [rememberMe,   setRememberMe]   = useState(false);
//   const [errors,       setErrors]       = useState({ email: '', password: '' });
//   const [adminCreds,   setAdminCreds]   = useState(null);

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   useEffect(() => {
//     (async () => {
//       const creds = await getAdminCredentials();
//       setAdminCreds(creds);
//     })();

//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,    duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,    duration: 1000, useNativeDriver: true }),
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

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // Step 1: Check admin credentials locally
//     if (
//       adminCreds &&
//       enteredEmail    === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     // Step 2: Email format check
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     // Step 3: Regular user — backend API
//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         Alert.alert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View style={[styles.cardOuterWrap, {
//             opacity: fadeAnim,
//             transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//           }]}>

//             <Animated.View style={[styles.cardGlowBack, {
//               opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//               transform: [{ scale: glowPulse }],
//             }]} />
//             <Animated.View style={[styles.cardGlowSoft, {
//               opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//               transform: [{ scale: glowPulse }],
//             }]} />

//             <LinearGradient
//               colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               {adminCreds?.companyName && (
//                 <View style={styles.companyBadge}>
//                   <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                 </View>
//               )}

//               <View style={styles.form}>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={v => { setEmail(v); setErrors(e => ({ ...e, email: '' })); }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[styles.input, errors.email ? styles.inputError : null]}
//                   />
//                   {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={v => { setPassword(v); setErrors(e => ({ ...e, password: '' })); }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(p => !p)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                     </Pressable>
//                   </View>
//                   {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                 </View>

//                 <View style={styles.optionsRow}>
//                   <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>
//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 <Animated.View style={[styles.buttonGlowWrap, {
//                   opacity: buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                   transform: [{ scale: buttonGlow }],
//                 }]}>
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View style={[styles.buttonSweep, {
//                       transform: [{ translateX: shineMove }, { rotate: '18deg' }],
//                     }]} />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>Sign In</Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 {!adminCreds && (
//                   <Pressable
//                     onPress={() => navigation.navigate('AdminSetup')}
//                     style={({ pressed }) => [styles.adminSetupLink, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.adminSetupLinkText}>⚙️ Setup Admin Access</Text>
//                   </Pressable>
//                 )}

//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                 >
//                   <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:        { flex: 1, backgroundColor: '#141B27' },
//   container:       { flex: 1 },
//   keyboardWrap:    { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
//   cardOuterWrap:   { justifyContent: 'center', alignItems: 'center' },
//   cardGlowBack:    { position: 'absolute', width: '97%', height: 560, borderRadius: 36, backgroundColor: 'rgba(77,235,255,0.08)', shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36, shadowOffset: { width: 0, height: 0 }, elevation: 18 },
//   cardGlowSoft:    { position: 'absolute', width: '90%', height: 490, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26, shadowOffset: { width: 0, height: 0 } },
//   card:            { width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26, shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden' },
//   cardGlassOverlay:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine:        { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },
//   miniTag:         { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
//   miniTagText:     { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title:           { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle:        { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },
//   companyBadge:    { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 14, backgroundColor: 'rgba(255,200,80,0.12)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)' },
//   companyBadgeText:{ color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },
//   form:            { gap: 14 },
//   inputGroup:      { marginBottom: 2 },
//   label:           { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input:           { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   inputError:      { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   errorText:       { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
//   passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   passwordInput:   { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:       { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon:         { fontSize: 18 },
//   optionsRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap:    { flexDirection: 'row', alignItems: 'center' },
//   checkbox:        { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive:  { backgroundColor: '#4DEBFF' },
//   checkboxInner:   { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText:    { color: '#FFFFFF', fontSize: 13 },
//   forgotText:      { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },
//   buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 118, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
//   signInWrap:      { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton:    { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine:  { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:     { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:      { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
//   adminSetupLink:  { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(77,235,255,0.3)', marginTop: 4 },
//   adminSetupLinkText: { color: 'rgba(77,235,255,0.8)', fontSize: 13, fontWeight: '600' },
//   secondaryButton: { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:   { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   TextInput, Pressable, KeyboardAvoidingView, Platform,
//   Animated, Alert, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }      from 'expo-linear-gradient';
// import { setLoggedInUser }     from '../utils/authStorage';
// import { signInApi }           from '../utils/apiService';
// import { useNotifications }    from '../context/NotificationContext';
// import { getAdminCredentials } from '../utils/adminStorage';

// export default function SignInScreen({ navigation }) {
//   const [email,        setEmail]        = useState('');
//   const [password,     setPassword]     = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading,      setLoading]      = useState(false);
//   const [rememberMe,   setRememberMe]   = useState(false);
//   const [errors,       setErrors]       = useState({ email: '', password: '' });
//   const [adminCreds,   setAdminCreds]   = useState(null);

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   useEffect(() => {
//     (async () => {
//       const creds = await getAdminCredentials();
//       console.log('SignIn: adminCreds loaded =', creds?.email);
//       setAdminCreds(creds);
//     })();

//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,    duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,    duration: 1000, useNativeDriver: true }),
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

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // Step 1: Admin credentials match చేయి — locally
//     if (
//       adminCreds &&
//       enteredEmail    === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     // Step 2: Email format check
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     // Step 3: Regular user — backend API
//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         Alert.alert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />
//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View style={[styles.cardOuterWrap, {
//             opacity: fadeAnim,
//             transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//           }]}>

//             <Animated.View style={[styles.cardGlowBack, {
//               opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//               transform: [{ scale: glowPulse }],
//             }]} />
//             <Animated.View style={[styles.cardGlowSoft, {
//               opacity: glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//               transform: [{ scale: glowPulse }],
//             }]} />

//             <LinearGradient
//               colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               {/* Secure Access Badge */}
//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>🔒 Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               {/* ✅ Company badge — admin setup అయిన తర్వాత కనిపిస్తుంది */}
//               {adminCreds?.companyName ? (
//                 <View style={styles.companyBadge}>
//                   <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                 </View>
//               ) : null}

//               <View style={styles.form}>

//                 {/* Email */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={v => { setEmail(v); setErrors(e => ({ ...e, email: '' })); }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[styles.input, errors.email ? styles.inputError : null]}
//                   />
//                   {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                 </View>

//                 {/* Password */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={v => { setPassword(v); setErrors(e => ({ ...e, password: '' })); }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(p => !p)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                     </Pressable>
//                   </View>
//                   {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                 </View>

//                 {/* Remember Me + Forgot Password */}
//                 <View style={styles.optionsRow}>
//                   <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>
//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 {/* Button Glow */}
//                 <Animated.View style={[styles.buttonGlowWrap, {
//                   opacity: buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                   transform: [{ scale: buttonGlow }],
//                 }]}>
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 {/* Sign In Button */}
//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View style={[styles.buttonSweep, {
//                       transform: [{ translateX: shineMove }, { rotate: '18deg' }],
//                     }]} />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>Sign In</Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 {/* ✅ Setup Admin — adminCreds లేకపోతే మాత్రమే కనిపిస్తుంది */}
//                 {!adminCreds && (
//                   <Pressable
//                     onPress={() => navigation.navigate('AdminSetup')}
//                     style={({ pressed }) => [styles.adminSetupLink, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.adminSetupLinkText}>⚙️ Setup Admin Access</Text>
//                   </Pressable>
//                 )}

//                 {/* Sign Up */}
//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                 >
//                   <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:        { flex: 1, backgroundColor: '#141B27' },
//   container:       { flex: 1 },
//   keyboardWrap:    { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
//   cardOuterWrap:   { justifyContent: 'center', alignItems: 'center' },
//   cardGlowBack:    { position: 'absolute', width: '97%', height: 560, borderRadius: 36, backgroundColor: 'rgba(77,235,255,0.08)', shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36, shadowOffset: { width: 0, height: 0 }, elevation: 18 },
//   cardGlowSoft:    { position: 'absolute', width: '90%', height: 490, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26, shadowOffset: { width: 0, height: 0 } },
//   card:            { width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26, shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden' },
//   cardGlassOverlay:{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine:        { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },
//   miniTag:         { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
//   miniTagText:     { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title:           { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle:        { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },
//   companyBadge:    { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 14, backgroundColor: 'rgba(255,200,80,0.12)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)' },
//   companyBadgeText:{ color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },
//   form:            { gap: 14 },
//   inputGroup:      { marginBottom: 2 },
//   label:           { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input:           { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   inputError:      { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   errorText:       { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },
//   passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   passwordInput:   { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:       { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon:         { fontSize: 18 },
//   optionsRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap:    { flexDirection: 'row', alignItems: 'center' },
//   checkbox:        { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive:  { backgroundColor: '#4DEBFF' },
//   checkboxInner:   { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText:    { color: '#FFFFFF', fontSize: 13 },
//   forgotText:      { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },
//   buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 118, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
//   signInWrap:      { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton:    { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine:  { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:     { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:      { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
//   adminSetupLink:  { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(77,235,255,0.3)', marginTop: 4 },
//   adminSetupLinkText: { color: 'rgba(77,235,255,0.8)', fontSize: 13, fontWeight: '600' },
//   secondaryButton: { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:   { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }      from 'expo-linear-gradient';
// import { setLoggedInUser }     from '../utils/authStorage';
// import { signInApi }           from '../utils/apiService';
// import { useNotifications }    from '../context/NotificationContext';
// import { getAdminCredentials } from '../utils/adminStorage';

// export default function SignInScreen({ navigation }) {
//   const [email,         setEmail]         = useState('');
//   const [password,      setPassword]      = useState('');
//   const [showPassword,  setShowPassword]  = useState(false);
//   const [loading,       setLoading]       = useState(false);
//   const [rememberMe,    setRememberMe]    = useState(false);
//   const [errors,        setErrors]        = useState({ email: '', password: '' });
//   const [isAdminFilled, setIsAdminFilled] = useState(false);
//   const [adminCreds,    setAdminCreds]    = useState(null);

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   useEffect(() => {
//     // Load admin credentials from local storage (saved after AdminSetup)
//     (async () => {
//       const creds = await getAdminCredentials();
//       console.log('SignIn: adminCreds loaded =', creds?.email);
//       setAdminCreds(creds);
//     })();

//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,     duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,     duration: 1000, useNativeDriver: true }),
//       Animated.loop(Animated.sequence([
//         Animated.timing(glowPulse,  { toValue: 1.04,  duration: 2200, useNativeDriver: true }),
//         Animated.timing(glowPulse,  { toValue: 0.96,  duration: 2200, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(buttonGlow, { toValue: 1,     duration: 1700, useNativeDriver: true }),
//         Animated.timing(buttonGlow, { toValue: 0.92,  duration: 1700, useNativeDriver: true }),
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

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   // ── Admin Login button — marks fields visually, user types manually ──
//   const handleAdminButtonPress = () => {
//     setErrors({ email: '', password: '' });
//     setIsAdminFilled(true);
//   };

//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // ── Step 1: Check against dynamic admin credentials from DB ──
//     if (
//       adminCreds &&
//       enteredEmail    === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     // ── Step 2: Email format validation ──
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     // ── Step 3: Regular user — backend API ──
//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         Alert.alert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.container}
//       >
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View
//             style={[
//               styles.cardOuterWrap,
//               {
//                 opacity:   fadeAnim,
//                 transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//               },
//             ]}
//           >
//             <Animated.View
//               style={[styles.cardGlowBack, {
//                 opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />
//             <Animated.View
//               style={[styles.cardGlowSoft, {
//                 opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />

//             <LinearGradient
//               colors={[
//                 'rgba(255,255,255,0.12)',
//                 'rgba(255,255,255,0.05)',
//                 'rgba(255,255,255,0.02)',
//               ]}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               {/* ── Secure Access Badge ── */}
//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>🔒 Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               {/* ── Company Badge — visible after AdminSetup ── */}
//               {adminCreds?.companyName ? (
//                 <View style={styles.companyBadge}>
//                   <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                 </View>
//               ) : null}

//               <View style={styles.form}>

//                 {/* ── Email ── */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={(v) => {
//                       setEmail(v);
//                       setIsAdminFilled(false);
//                       setErrors(e => ({ ...e, email: '' }));
//                     }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[styles.input, errors.email ? styles.inputError : null]}
//                   />
//                   {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                 </View>

//                 {/* ── Password ── */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={(v) => {
//                         setPassword(v);
//                         setIsAdminFilled(false);
//                         setErrors(e => ({ ...e, password: '' }));
//                       }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       keyboardType="default"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(prev => !prev)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                     </Pressable>
//                   </View>
//                   {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                 </View>

//                 {/* ── Remember Me + Forgot Password ── */}
//                 <View style={styles.optionsRow}>
//                   <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>
//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 {/* ── Button Glow ── */}
//                 <Animated.View
//                   style={[styles.buttonGlowWrap, {
//                     opacity:   buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                     transform: [{ scale: buttonGlow }],
//                   }]}
//                 >
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 {/* ── Sign In Button ── */}
//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View
//                       style={[styles.buttonSweep, {
//                         transform: [{ translateX: shineMove }, { rotate: '18deg' }],
//                       }]}
//                     />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>
//                           {isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}
//                         </Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 {/* ── Admin Login Button — always visible ── */}
//                 <Pressable
//                   onPress={handleAdminButtonPress}
//                   style={({ pressed }) => [
//                     styles.adminButton,
//                     isAdminFilled && styles.adminButtonActive,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                   <Text style={[styles.adminButtonText, isAdminFilled && styles.adminButtonTextActive]}>
//                     🔐 Admin Login
//                   </Text>
//                 </Pressable>

//                 {/* ── Setup Admin — only if no admin registered yet ── */}
//                 {!adminCreds && (
//                   <Pressable
//                     onPress={() => navigation.navigate('AdminSetup')}
//                     style={({ pressed }) => [styles.adminSetupLink, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.adminSetupLinkText}>⚙️ Setup Admin Access</Text>
//                   </Pressable>
//                 )}

//                 {/* ── Sign Up ── */}
//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                 >
//                   <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   keyboardWrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },

//   cardGlowBack: {
//     position: 'absolute', width: '97%', height: 580, borderRadius: 36,
//     backgroundColor: 'rgba(77, 235, 255, 0.08)',
//     shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36,
//     shadowOffset: { width: 0, height: 0 }, elevation: 18,
//   },
//   cardGlowSoft: {
//     position: 'absolute', width: '90%', height: 510, borderRadius: 34,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   card: {
//     width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30,
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26,
//     shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden',
//   },

//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine: {
//     position: 'absolute', top: 0, left: '15%', right: '15%',
//     height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)',
//   },

//   miniTag: {
//     alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7,
//     borderRadius: 999, marginBottom: 16,
//     backgroundColor: 'rgba(103, 232, 240, 0.14)',
//     borderWidth: 1, borderColor: 'rgba(103, 232, 240, 0.24)',
//   },
//   miniTagText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },

//   title:    { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },

//   companyBadge: {
//     alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5,
//     borderRadius: 999, marginBottom: 14,
//     backgroundColor: 'rgba(255,200,80,0.12)',
//     borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)',
//   },
//   companyBadgeText: { color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },

//   form:       { gap: 14 },
//   inputGroup: { marginBottom: 2 },
//   label:      { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },

//   input: {
//     minHeight: 56, borderRadius: 18, borderWidth: 1.3,
//     borderColor: 'rgba(77, 235, 255, 0.34)',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15,
//     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   inputError:  { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   errorText:   { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 5, marginLeft: 4 },

//   passwordWrapper: {
//     flexDirection: 'row', alignItems: 'center', minHeight: 56,
//     borderRadius: 18, borderWidth: 1.3,
//     borderColor: 'rgba(77, 235, 255, 0.34)',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     paddingHorizontal: 16,
//     shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   passwordInput: { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:     { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon:       { fontSize: 18 },

//   optionsRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap:{ flexDirection: 'row', alignItems: 'center' },
//   checkbox:    { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive: { backgroundColor: '#4DEBFF' },
//   checkboxInner:  { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText:   { color: '#FFFFFF', fontSize: 13 },
//   forgotText:     { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },

//   buttonGlowWrap: {
//     position: 'absolute', left: 8, right: 8, bottom: 148,
//     height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0,
//   },
//   buttonGlowLayer: {
//     width: '95%', height: 58, borderRadius: 18,
//     backgroundColor: 'rgba(217, 44, 255, 0.18)',
//     shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18,
//     shadowOffset: { width: 0, height: 0 }, elevation: 10,
//   },

//   signInWrap:   { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton: { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:    { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:     { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },

//   adminButton: {
//     minHeight: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
//     borderWidth: 1, borderColor: '#4DEBFF',
//     backgroundColor: 'rgba(77,235,255,0.08)',
//   },
//   adminButtonActive:     { borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonText:       { color: '#4DEBFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
//   adminButtonTextActive: { color: '#fff' },

//   adminSetupLink: {
//     minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
//     borderWidth: 1, borderColor: 'rgba(77,235,255,0.3)', marginTop: 2,
//   },
//   adminSetupLinkText: { color: 'rgba(77,235,255,0.8)', fontSize: 13, fontWeight: '600' },

//   secondaryButton:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:       { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }      from 'expo-linear-gradient';
// import { setLoggedInUser }     from '../utils/authStorage';
// import { signInApi }           from '../utils/apiService';
// import { useNotifications }    from '../context/NotificationContext';
// import { getAdminCredentials } from '../utils/adminStorage';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// export default function SignInScreen({ navigation, route }) {
//   // ✅ AdminSetup నుండి prefillEmail వస్తే email field లో auto-fill అవుతుంది
//   const prefillEmail = route?.params?.prefillEmail || '';

//   const [email,         setEmail]         = useState(prefillEmail);
//   const [password,      setPassword]      = useState('');
//   const [showPassword,  setShowPassword]  = useState(false);
//   const [loading,       setLoading]       = useState(false);
//   const [rememberMe,    setRememberMe]    = useState(false);
//   const [errors,        setErrors]        = useState({ email: '', password: '' });
//   const [isAdminFilled, setIsAdminFilled] = useState(!!prefillEmail);
//   const [adminCreds,    setAdminCreds]    = useState(null);

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;
  
//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   useEffect(() => {
//     (async () => {
//       const creds = await getAdminCredentials();
//       setAdminCreds(creds);
//     })();

//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,     duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,     duration: 1000, useNativeDriver: true }),
//       Animated.loop(Animated.sequence([
//         Animated.timing(glowPulse,  { toValue: 1.04,  duration: 2200, useNativeDriver: true }),
//         Animated.timing(glowPulse,  { toValue: 0.96,  duration: 2200, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(buttonGlow, { toValue: 1,     duration: 1700, useNativeDriver: true }),
//         Animated.timing(buttonGlow, { toValue: 0.92,  duration: 1700, useNativeDriver: true }),
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

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleAdminButtonPress = () => {
//     setErrors({ email: '', password: '' });
//     setIsAdminFilled(true);
//   };

//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // ── Step 1: Dynamic admin credentials check ──
//     if (
//       adminCreds &&
//       enteredEmail    === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     // ── Step 2: Email format check ──
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     // ── Step 3: Regular user API ──
//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         showAlert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />
//          <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.container}
//       >
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View
//             style={[styles.cardOuterWrap, {
//               opacity:   fadeAnim,
//               transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//             }]}
//           >
//             <Animated.View style={[styles.cardGlowBack, {
//               opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//               transform: [{ scale: glowPulse }],
//             }]} />
//             <Animated.View style={[styles.cardGlowSoft, {
//               opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//               transform: [{ scale: glowPulse }],
//             }]} />

//             <LinearGradient
//               colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               {/* Secure Access Badge */}
//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>🔒 Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               {/* ✅ Green banner — AdminSetup తర్వాత వచ్చినప్పుడు మాత్రమే */}
//               {prefillEmail ? (
//                 <View style={styles.adminHintBanner}>
//                   <Text style={styles.adminHintText}>
//                     ✅ Admin setup complete! Your email is pre-filled. Enter your password to sign in as Admin.
//                   </Text>
//                 </View>
//               ) : null}

//               {/* Company Badge */}
//               {adminCreds?.companyName ? (
//                 <View style={styles.companyBadge}>
//                   <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                 </View>
//               ) : null}

//               <View style={styles.form}>

//                 {/* Email */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={(v) => {
//                       setEmail(v);
//                       setIsAdminFilled(false);
//                       setErrors(e => ({ ...e, email: '' }));
//                     }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[
//                       styles.input,
//                       errors.email  ? styles.inputError : null,
//                       isAdminFilled ? styles.inputAdmin  : null,
//                     ]}
//                   />
//                   {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                 </View>

//                 {/* Password */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[
//                     styles.passwordWrapper,
//                     errors.password ? styles.inputError : null,
//                     isAdminFilled   ? styles.inputAdmin  : null,
//                   ]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={(v) => {
//                         setPassword(v);
//                         setIsAdminFilled(false);
//                         setErrors(e => ({ ...e, password: '' }));
//                       }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       keyboardType="default"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(prev => !prev)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                     </Pressable>
//                   </View>
//                   {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                 </View>

//                 {/* Remember Me + Forgot Password */}
//                 <View style={styles.optionsRow}>
//                   <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>
//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 {/* Button Glow */}
//                 <Animated.View style={[styles.buttonGlowWrap, {
//                   opacity:   buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                   transform: [{ scale: buttonGlow }],
//                 }]}>
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 {/* Sign In Button */}
//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View style={[styles.buttonSweep, {
//                       transform: [{ translateX: shineMove }, { rotate: '18deg' }],
//                     }]} />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>
//                           {isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}
//                         </Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 {/* Admin Login Button — always visible */}
//                 <Pressable
//                   onPress={handleAdminButtonPress}
//                   style={({ pressed }) => [
//                     styles.adminButton,
//                     isAdminFilled && styles.adminButtonActive,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                   <Text style={[styles.adminButtonText, isAdminFilled && styles.adminButtonTextActive]}>
//                     🔐 Admin Login
//                   </Text>
//                 </Pressable>

//                 {/* Setup Admin — adminCreds లేకపోతే మాత్రమే */}
//                 {!adminCreds && (
//                   <Pressable
//                     onPress={() => navigation.navigate('AdminSetup')}
//                     style={({ pressed }) => [styles.adminSetupLink, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.adminSetupLinkText}>⚙️ Setup Admin Access</Text>
//                   </Pressable>
//                 )}

//                 {/* Sign Up */}
//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                 >
//                   <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   keyboardWrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },

//   cardGlowBack: { position: 'absolute', width: '97%', height: 640, borderRadius: 36, backgroundColor: 'rgba(77,235,255,0.08)', shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36, shadowOffset: { width: 0, height: 0 }, elevation: 18 },
//   cardGlowSoft: { position: 'absolute', width: '90%', height: 570, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26, shadowOffset: { width: 0, height: 0 } },

//   card: { width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26, shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden' },
//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine:     { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },

//   miniTag:     { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
//   miniTagText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },

//   title:    { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },

//   // ✅ Green success banner
//   adminHintBanner: { backgroundColor: 'rgba(0,220,130,0.12)', borderWidth: 1, borderColor: 'rgba(0,220,130,0.30)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12 },
//   adminHintText:   { color: 'rgba(100,255,180,0.9)', fontSize: 12, lineHeight: 18, fontWeight: '600' },

//   companyBadge:     { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 14, backgroundColor: 'rgba(255,200,80,0.12)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)' },
//   companyBadgeText: { color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },

//   form:       { gap: 14 },
//   inputGroup: { marginBottom: 2 },
//   label:      { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },

//   input:      { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   inputError: { borderColor: '#FF6B6B', shadowColor: '#FF6B6B' },
//   inputAdmin: { borderColor: '#4DEBFF', borderWidth: 1.8, shadowColor: '#4DEBFF', shadowOpacity: 0.25 },

//   passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, shadowColor: '#4DEBFF', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
//   passwordInput:   { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:       { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },
//   eyeIcon:         { fontSize: 18 },

//   optionsRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap: { flexDirection: 'row', alignItems: 'center' },
//   checkbox:     { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive: { backgroundColor: '#4DEBFF' },
//   checkboxInner:  { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText: { color: '#FFFFFF', fontSize: 13 },
//   forgotText:   { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },

//   buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 148, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },

//   signInWrap:     { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton:   { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:    { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:     { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },

//   adminButton:           { minHeight: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#4DEBFF', backgroundColor: 'rgba(77,235,255,0.08)' },
//   adminButtonActive:     { borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonText:       { color: '#4DEBFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
//   adminButtonTextActive: { color: '#fff' },

//   adminSetupLink:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(77,235,255,0.3)', marginTop: 2 },
//   adminSetupLinkText: { color: 'rgba(77,235,255,0.8)', fontSize: 13, fontWeight: '600' },

//   secondaryButton:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:       { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });

// ========================


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   ActivityIndicator,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { setLoggedInUser } from '../utils/authStorage';
// import { signInApi } from '../utils/apiService';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// const ADMIN_EMAIL    = 'admin@appsmarket.com';
// const ADMIN_PASSWORD = 'Admin@123';

// export default function SignInScreen({ navigation }) {
//   const [email, setEmail]                 = useState('');
//   const [password, setPassword]           = useState('');
//   const [showPassword, setShowPassword]   = useState(false);
//   const [loading, setLoading]             = useState(false);
//   const [rememberMe, setRememberMe]       = useState(false);
//   const [errors, setErrors]               = useState({ email: '', password: '' });
//   const [isAdminFilled, setIsAdminFilled] = useState(false);

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(slideAnim,  { toValue: 0,     duration: 950,  useNativeDriver: true }),
//       Animated.timing(fadeAnim,   { toValue: 1,     duration: 1000, useNativeDriver: true }),
//       Animated.loop(Animated.sequence([
//         Animated.timing(glowPulse,  { toValue: 1.04,  duration: 2200, useNativeDriver: true }),
//         Animated.timing(glowPulse,  { toValue: 0.96,  duration: 2200, useNativeDriver: true }),
//       ])),
//       Animated.loop(Animated.sequence([
//         Animated.timing(buttonGlow, { toValue: 1,     duration: 1700, useNativeDriver: true }),
//         Animated.timing(buttonGlow, { toValue: 0.92,  duration: 1700, useNativeDriver: true }),
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

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   const fillAdmin = () => {
//     setIsAdminFilled(true);
//     setErrors({ email: '', password: '' });
//   };

//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     if (
//       enteredEmail    === ADMIN_EMAIL.toLowerCase() &&
//       enteredPassword === ADMIN_PASSWORD
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      ADMIN_EMAIL,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);
//       navigation.replace('Home', { user: data.user });

//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         showAlert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />

//       {/* ✅ FIXED: ఇది లేకపోవడం వల్ల web లో alert రావడం లేదు */}
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.container}
//       >
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <Animated.View
//             style={[
//               styles.cardOuterWrap,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//               },
//             ]}
//           >
//             <Animated.View
//               style={[styles.cardGlowBack, {
//                 opacity: glowPulse.interpolate({
//                   inputRange: [0.96, 1.04],
//                   outputRange: [0.34, 0.68],
//                 }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />

//             <Animated.View
//               style={[styles.cardGlowSoft, {
//                 opacity: glowPulse.interpolate({
//                   inputRange: [0.96, 1.04],
//                   outputRange: [0.16, 0.28],
//                 }),
//                 transform: [{ scale: glowPulse }],
//               }]}
//             />

//             <LinearGradient
//               colors={[
//                 'rgba(255,255,255,0.12)',
//                 'rgba(255,255,255,0.05)',
//                 'rgba(255,255,255,0.02)',
//               ]}
//               style={styles.card}
//             >
//               <View style={styles.cardGlassOverlay} />
//               <View style={styles.topShine} />

//               <View style={styles.miniTag}>
//                 <Text style={styles.miniTagText}>Secure Access</Text>
//               </View>

//               <Text style={styles.title}>Sign In</Text>
//               <Text style={styles.subtitle}>
//                 Enter your credentials to continue with a premium experience.
//               </Text>

//               <View style={styles.form}>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Email Address</Text>
//                   <TextInput
//                     value={email}
//                     onChangeText={(v) => {
//                       setEmail(v);
//                       setIsAdminFilled(false);
//                       setErrors(e => ({ ...e, email: '' }));
//                     }}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     style={[styles.input, errors.email ? styles.inputError : null]}
//                   />
//                   {errors.email
//                     ? <Text style={styles.errorText}>⚠ {errors.email}</Text>
//                     : null
//                   }
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <View style={[
//                     styles.passwordWrapper,
//                     errors.password ? styles.inputError : null,
//                   ]}>
//                     <TextInput
//                       value={password}
//                       onChangeText={(v) => {
//                         setPassword(v);
//                         setIsAdminFilled(false);
//                         setErrors(e => ({ ...e, password: '' }));
//                       }}
//                       placeholder="Enter your password"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       secureTextEntry={!showPassword}
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       autoComplete="off"
//                       textContentType="none"
//                       keyboardType="default"
//                       style={styles.passwordInput}
//                     />
//                     <Pressable
//                       onPress={() => setShowPassword(prev => !prev)}
//                       style={styles.eyeButton}
//                       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                     >
//                       <Text style={styles.eyeIcon}>
//                         {showPassword ? '🙈' : '👁️'}
//                       </Text>
//                     </Pressable>
//                   </View>
//                   {errors.password
//                     ? <Text style={styles.errorText}>⚠ {errors.password}</Text>
//                     : null
//                   }
//                 </View>

//                 <View style={styles.optionsRow}>
//                   <Pressable
//                     onPress={() => setRememberMe(!rememberMe)}
//                     style={styles.rememberWrap}
//                   >
//                     <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                       {rememberMe && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.rememberText}>Remember Me</Text>
//                   </Pressable>

//                   <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                   </Pressable>
//                 </View>

//                 <Animated.View
//                   style={[styles.buttonGlowWrap, {
//                     opacity: buttonGlow.interpolate({
//                       inputRange: [0.92, 1],
//                       outputRange: [0.36, 0.68],
//                     }),
//                     transform: [{ scale: buttonGlow }],
//                   }]}
//                 >
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 <Pressable
//                   onPress={handleLogin}
//                   disabled={loading}
//                   style={({ pressed }) => [
//                     styles.signInWrap,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                   <LinearGradient
//                     colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={styles.signInButton}
//                   >
//                     <View style={styles.buttonTopShine} />
//                     <Animated.View
//                       style={[
//                         styles.buttonSweep,
//                         { transform: [{ translateX: shineMove }, { rotate: '18deg' }] },
//                       ]}
//                     />
//                     {loading
//                       ? <ActivityIndicator color="#fff" size="small" />
//                       : <Text style={styles.signInText}>
//                           {isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}
//                         </Text>
//                     }
//                   </LinearGradient>
//                 </Pressable>

//                 <Pressable
//                   onPress={fillAdmin}
//                   style={({ pressed }) => [
//                     styles.adminButton,
//                     isAdminFilled && styles.adminButtonActive,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                   <Text style={[
//                     styles.adminButtonText,
//                     isAdminFilled && styles.adminButtonTextActive,
//                   ]}>
//                     🔐 Admin Login
//                   </Text>
//                 </Pressable>

//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [
//                     styles.secondaryButton,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                   <Text style={styles.secondaryButtonText}>
//                     Don't have an account? Sign Up
//                   </Text>
//                 </Pressable>

//               </View>
//             </LinearGradient>
//           </Animated.View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   keyboardWrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },

//   cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },

//   cardGlowBack: {
//     position: 'absolute',
//     width: '97%',
//     height: 520,
//     borderRadius: 36,
//     backgroundColor: 'rgba(77, 235, 255, 0.08)',
//     shadowColor: '#4DEBFF',
//     shadowOpacity: 0.85,
//     shadowRadius: 36,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 18,
//   },
//   cardGlowSoft: {
//     position: 'absolute',
//     width: '90%',
//     height: 450,
//     borderRadius: 34,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#F6C7A1',
//     shadowOpacity: 0.18,
//     shadowRadius: 26,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   card: {
//     width: '100%',
//     borderRadius: 32,
//     paddingHorizontal: 22,
//     paddingVertical: 30,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 26,
//     shadowOffset: { width: 0, height: 14 },
//     elevation: 16,
//     overflow: 'hidden',
//   },
//   cardGlassOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//   },
//   topShine: {
//     position: 'absolute',
//     top: 0,
//     left: '15%',
//     right: '15%',
//     height: 1.2,
//     backgroundColor: 'rgba(255,255,255,0.22)',
//   },

//   miniTag: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 14,
//     paddingVertical: 7,
//     borderRadius: 999,
//     marginBottom: 16,
//     backgroundColor: 'rgba(103, 232, 240, 0.14)',
//     borderWidth: 1,
//     borderColor: 'rgba(103, 232, 240, 0.24)',
//   },
//   miniTagText: {
//     color: '#D8FAFF',
//     fontSize: 11,
//     fontWeight: '700',
//     letterSpacing: 0.4,
//   },

//   title: {
//     color: '#FFFFFF',
//     fontSize: 30,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: 'rgba(255,255,255,0.72)',
//     fontSize: 14,
//     lineHeight: 22,
//     marginBottom: 16,
//   },

//   form: { gap: 14 },

//   inputGroup: { marginBottom: 2 },
//   label: {
//     color: 'rgba(255,255,255,0.9)',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   input: {
//     minHeight: 56,
//     borderRadius: 18,
//     borderWidth: 1.3,
//     borderColor: 'rgba(77, 235, 255, 0.34)',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     paddingHorizontal: 16,
//     color: '#FFFFFF',
//     fontSize: 15,
//     shadowColor: '#4DEBFF',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   inputError: {
//     borderColor: '#FF6B6B',
//     shadowColor: '#FF6B6B',
//   },
//   errorText: {
//     color: '#FF6B6B',
//     fontSize: 12,
//     fontWeight: '500',
//     marginTop: 5,
//     marginLeft: 4,
//   },

//   passwordWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     minHeight: 56,
//     borderRadius: 18,
//     borderWidth: 1.3,
//     borderColor: 'rgba(77, 235, 255, 0.34)',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     paddingHorizontal: 16,
//     shadowColor: '#4DEBFF',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   passwordInput: {
//     flex: 1,
//     color: '#FFFFFF',
//     fontSize: 15,
//     paddingVertical: 0,
//   },
//   eyeButton: {
//     paddingLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   eyeIcon: { fontSize: 18 },

//   optionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   rememberWrap: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 18,
//     height: 18,
//     borderWidth: 1.5,
//     borderColor: '#4DEBFF',
//     borderRadius: 4,
//     marginRight: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxActive:  { backgroundColor: '#4DEBFF' },
//   checkboxInner:   { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText:    { color: '#FFFFFF', fontSize: 13 },
//   forgotText:      { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },

//   buttonGlowWrap: {
//     position: 'absolute',
//     left: 8,
//     right: 8,
//     bottom: 108,
//     height: 66,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 0,
//   },
//   buttonGlowLayer: {
//     width: '95%',
//     height: 58,
//     borderRadius: 18,
//     backgroundColor: 'rgba(217, 44, 255, 0.18)',
//     shadowColor: '#4DEBFF',
//     shadowOpacity: 0.5,
//     shadowRadius: 18,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 10,
//   },
//   signInWrap: {
//     marginTop: 10,
//     borderRadius: 18,
//     overflow: 'hidden',
//     zIndex: 2,
//   },
//   signInButton: {
//     minHeight: 58,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 18,
//     overflow: 'hidden',
//   },
//   buttonTopShine: {
//     position: 'absolute',
//     top: 0,
//     left: 10,
//     right: 10,
//     height: 1.4,
//     backgroundColor: 'rgba(255,255,255,0.42)',
//   },
//   buttonSweep: {
//     position: 'absolute',
//     top: -8,
//     width: 52,
//     height: 84,
//     backgroundColor: 'rgba(255,255,255,0.14)',
//   },
//   signInText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '800',
//     letterSpacing: 0.35,
//   },

//   adminButton: {
//     minHeight: 50,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#4DEBFF',
//     backgroundColor: '#4DEBFF',
//   },
//   adminButtonActive: {
//     borderColor: '#4DEBFF',
//     backgroundColor: '#4DEBFF',
//   },
//   adminButtonText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '700',
//     letterSpacing: 0.3,
//   },
//   adminButtonTextActive: {
//     color: '#fff',
//   },

//   secondaryButton: {
//     minHeight: 46,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 6,
//   },
//   secondaryButtonText: {
//     color: 'rgba(255,255,255,0.84)',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   buttonPressed: {
//     opacity: 0.94,
//     transform: [{ scale: 0.992 }],
//   },
// });


// =============*******************============

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   TextInput, Pressable, KeyboardAvoidingView, Platform,
//   Animated, ScrollView, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }      from 'expo-linear-gradient';
// import * as LocalAuthentication from 'expo-local-authentication';
// import { setLoggedInUser }     from '../utils/authStorage';
// import { signInApi }           from '../utils/apiService';
// import { useNotifications }    from '../context/NotificationContext';
// import { getAdminCredentials } from '../utils/adminStorage';
// import useCustomAlert from '../utils/useCustomAlert';
// import CustomAlertModal from '../components/CustomAlertModal';

// export default function SignInScreen({ navigation, route }) {
//   const prefillEmail = route?.params?.prefillEmail || '';

//   const [email,         setEmail]         = useState(prefillEmail);
//   const [password,      setPassword]      = useState('');
//   const [showPassword,  setShowPassword]  = useState(false);
//   const [loading,       setLoading]       = useState(false);
//   const [fpLoading,     setFpLoading]     = useState(false);
//   const [rememberMe,    setRememberMe]    = useState(false);
//   const [errors,        setErrors]        = useState({ email: '', password: '' });
//   const [isAdminFilled, setIsAdminFilled] = useState(!!prefillEmail);
//   const [adminCreds,    setAdminCreds]    = useState(null);
//   const [fpEnabled,     setFpEnabled]     = useState(false);   // ← fingerprint toggle state

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   useEffect(() => {
//     loadAdminCreds();
//     startAnimations();
//   }, []);

//   // Re-check fingerprint every time screen focuses (in case user toggled in Profile)
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       loadAdminCreds();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const loadAdminCreds = async () => {
//     const creds = await getAdminCredentials();
//     setAdminCreds(creds);
//     setFpEnabled(creds?.fingerprintEnabled === true);
//   };

//   const startAnimations = () => {
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
//   };

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleAdminButtonPress = () => {
//     setErrors({ email: '', password: '' });
//     setIsAdminFilled(true);
//   };

//   // ── Fingerprint Login ──────────────────────────
//   const handleFingerprintLogin = async () => {
//     try {
//       setFpLoading(true);

//       // Check hardware support
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled   = await LocalAuthentication.isEnrolledAsync();

//       if (!compatible || !enrolled) {
//         showAlert(
//           'Not Available',
//           'Biometric hardware not found or no fingerprint is enrolled.\n\nPlease go to device Settings → Security → Fingerprint and enroll.'
//         );
//         return;
//       }

//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage:  'Sign in as Admin',
//         fallbackLabel:  'Use Password',
//         cancelLabel:    'Cancel',
//         disableDeviceFallback: false,
//       });

//       if (result.success) {
//         const creds = await getAdminCredentials();
//         const adminUser = {
//           name:       'Admin',
//           fullName:   'Admin User',
//           email:      creds.email,
//           role:       'ADMIN',
//           phone:      '',
//           location:   'Hyderabad, India',
//           company:    creds.companyName || 'Apps Marketplace',
//           department: 'Administration',
//           bio:        'Marketplace Administrator',
//           image:      null,
//         };
//         await setLoggedInUser(adminUser);
//         navigation.replace('AdminHome', { user: adminUser });
//       } else if (result.error === 'user_cancel') {
//         // User cancelled — do nothing
//       } else {
//         showAlert('Verification Failed', 'Fingerprint not recognized. Please use your password.');
//       }
//     } catch (err) {
//       showAlert('Error', 'Fingerprint authentication failed. Please use your password.');
//     } finally {
//       setFpLoading(false);
//     }
//   };

//   // ── Password Login ─────────────────────────────
//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // Step 1: Dynamic admin credentials check
//     if (
//       adminCreds &&
//       enteredEmail    === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     // Step 2: Email format check
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     // Step 3: Regular user API
//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });

//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);

//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);

//       navigation.replace('Home', { user: data.user });
//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         showAlert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
//             keyboardShouldPersistTaps="handled"
//           >
//             <Animated.View
//               style={[styles.cardOuterWrap, {
//                 opacity:   fadeAnim,
//                 transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//               }]}
//             >
//               <Animated.View style={[styles.cardGlowBack, {
//                 opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//                 transform: [{ scale: glowPulse }],
//               }]} />
//               <Animated.View style={[styles.cardGlowSoft, {
//                 opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//                 transform: [{ scale: glowPulse }],
//               }]} />

//               <LinearGradient
//                 colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.card}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.topShine} />

//                 <View style={styles.miniTag}>
//                   <Text style={styles.miniTagText}>🔒 Secure Access</Text>
//                 </View>

//                 <Text style={styles.title}>Sign In</Text>
//                 <Text style={styles.subtitle}>
//                   Enter your credentials to continue with a premium experience.
//                 </Text>

//                 {prefillEmail ? (
//                   <View style={styles.adminHintBanner}>
//                     <Text style={styles.adminHintText}>
//                       ✅ Admin setup complete! Your email is pre-filled. Enter your password to sign in as Admin.
//                     </Text>
//                   </View>
//                 ) : null}

//                 {adminCreds?.companyName ? (
//                   <View style={styles.companyBadge}>
//                     <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                   </View>
//                 ) : null}

//                 <View style={styles.form}>

//                   {/* ── Fingerprint Button — shows only when fpEnabled is true ── */}
//                   {fpEnabled && (
//                     <>
//                       <Pressable
//                         onPress={handleFingerprintLogin}
//                         disabled={fpLoading}
//                         style={({ pressed }) => [styles.fpBtn, pressed && { opacity: 0.8 }]}
//                       >
//                         {fpLoading ? (
//                           <ActivityIndicator color="#67E6E8" size="small" />
//                         ) : (
//                           <>
//                             <Text style={styles.fpIcon}>☝</Text>
//                             <Text style={styles.fpLabel}>Sign in with Fingerprint</Text>
//                             <Text style={styles.fpSub}>Admin access · Touch sensor to verify</Text>
//                           </>
//                         )}
//                       </Pressable>

//                       <View style={styles.orRow}>
//                         <View style={styles.orLine} />
//                         <Text style={styles.orText}>or use password</Text>
//                         <View style={styles.orLine} />
//                       </View>
//                     </>
//                   )}

//                   {/* Email */}
//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Email Address</Text>
//                     <TextInput
//                       value={email}
//                       onChangeText={(v) => {
//                         setEmail(v);
//                         setIsAdminFilled(false);
//                         setErrors(e => ({ ...e, email: '' }));
//                       }}
//                       placeholder="Enter your email"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       style={[
//                         styles.input,
//                         errors.email  ? styles.inputError : null,
//                         isAdminFilled ? styles.inputAdmin  : null,
//                       ]}
//                     />
//                     {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                   </View>

//                   {/* Password */}
//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Password</Text>
//                     <View style={[
//                       styles.passwordWrapper,
//                       errors.password ? styles.inputError : null,
//                       isAdminFilled   ? styles.inputAdmin  : null,
//                     ]}>
//                       <TextInput
//                         value={password}
//                         onChangeText={(v) => {
//                           setPassword(v);
//                           setIsAdminFilled(false);
//                           setErrors(e => ({ ...e, password: '' }));
//                         }}
//                         placeholder="Enter your password"
//                         placeholderTextColor="rgba(255,255,255,0.42)"
//                         secureTextEntry={!showPassword}
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         autoComplete="off"
//                         textContentType="none"
//                         style={styles.passwordInput}
//                       />
//                       <Pressable
//                         onPress={() => setShowPassword(prev => !prev)}
//                         style={styles.eyeButton}
//                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                       >
//                         <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                       </Pressable>
//                     </View>
//                     {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                   </View>

//                   {/* Remember Me + Forgot Password */}
//                   <View style={styles.optionsRow}>
//                     <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                       <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                         {rememberMe && <View style={styles.checkboxInner} />}
//                       </View>
//                       <Text style={styles.rememberText}>Remember Me</Text>
//                     </Pressable>
//                     <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                       <Text style={styles.forgotText}>Forgot Password?</Text>
//                     </Pressable>
//                   </View>

//                   {/* Button Glow */}
//                   <Animated.View style={[styles.buttonGlowWrap, {
//                     opacity:   buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                     transform: [{ scale: buttonGlow }],
//                   }]}>
//                     <View style={styles.buttonGlowLayer} />
//                   </Animated.View>

//                   {/* Sign In Button */}
//                   <Pressable
//                     onPress={handleLogin}
//                     disabled={loading}
//                     style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}
//                   >
//                     <LinearGradient
//                       colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                       start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                       style={styles.signInButton}
//                     >
//                       <View style={styles.buttonTopShine} />
//                       <Animated.View style={[styles.buttonSweep, {
//                         transform: [{ translateX: shineMove }, { rotate: '18deg' }],
//                       }]} />
//                       {loading
//                         ? <ActivityIndicator color="#fff" size="small" />
//                         : <Text style={styles.signInText}>
//                             {isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}
//                           </Text>
//                       }
//                     </LinearGradient>
//                   </Pressable>

//                   {/* Admin Login Button */}
//                   <Pressable
//                     onPress={handleAdminButtonPress}
//                     style={({ pressed }) => [
//                       styles.adminButton,
//                       isAdminFilled && styles.adminButtonActive,
//                       pressed && styles.buttonPressed,
//                     ]}
//                   >
//                     <Text style={[styles.adminButtonText, isAdminFilled && styles.adminButtonTextActive]}>
//                       🔐 Admin Login
//                     </Text>
//                   </Pressable>

//                   {/* Setup Admin — show only when no adminCreds */}
//                   {!adminCreds && (
//                     <Pressable
//                       onPress={() => navigation.navigate('AdminSetup')}
//                       style={({ pressed }) => [styles.adminSetupLink, pressed && styles.buttonPressed]}
//                     >
//                       <Text style={styles.adminSetupLinkText}>⚙️ Setup Admin Access</Text>
//                     </Pressable>
//                   )}

//                   {/* Sign Up */}
//                   <Pressable
//                     onPress={() => navigation.navigate('SignUp')}
//                     style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
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
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   keyboardWrap: { flex: 1, paddingHorizontal: 22 },
//   cardOuterWrap:{ justifyContent: 'center', alignItems: 'center' },

//   cardGlowBack: { position: 'absolute', width: '97%', height: 700, borderRadius: 36, backgroundColor: 'rgba(77,235,255,0.08)', shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36, shadowOffset: { width: 0, height: 0 }, elevation: 18 },
//   cardGlowSoft: { position: 'absolute', width: '90%', height: 630, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26, shadowOffset: { width: 0, height: 0 } },

//   card: { width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26, shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden' },
//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine:     { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },

//   miniTag:     { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
//   miniTagText: { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title:    { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },

//   adminHintBanner: { backgroundColor: 'rgba(0,220,130,0.12)', borderWidth: 1, borderColor: 'rgba(0,220,130,0.30)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12 },
//   adminHintText:   { color: 'rgba(100,255,180,0.9)', fontSize: 12, lineHeight: 18, fontWeight: '600' },
//   companyBadge:     { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 14, backgroundColor: 'rgba(255,200,80,0.12)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)' },
//   companyBadgeText: { color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },

//   form:       { gap: 14 },
//   inputGroup: { marginBottom: 2 },
//   label:      { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input:      { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15 },
//   inputError: { borderColor: '#FF6B6B' },
//   inputAdmin: { borderColor: '#4DEBFF', borderWidth: 1.8 },
//   errorText:  { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 4 },

//   passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16 },
//   passwordInput:   { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:       { paddingLeft: 10, justifyContent: 'center' },
//   eyeIcon:         { fontSize: 18 },

//   optionsRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap: { flexDirection: 'row', alignItems: 'center' },
//   checkbox:       { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive: { backgroundColor: '#4DEBFF' },
//   checkboxInner:  { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText: { color: '#FFFFFF', fontSize: 13 },
//   forgotText:   { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },

//   // ── Fingerprint button ──
//   fpBtn:   { backgroundColor: 'rgba(103,230,232,0.07)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)', borderRadius: 18, paddingVertical: 16, alignItems: 'center', gap: 4 },
//   fpIcon:  { fontSize: 26, marginBottom: 2 },
//   fpLabel: { color: '#67E6E8', fontSize: 14, fontWeight: '800' },
//   fpSub:   { color: 'rgba(103,230,232,0.55)', fontSize: 11 },
//   orRow:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   orLine:  { flex: 1, height: 0.5, backgroundColor: 'rgba(255,255,255,0.12)' },
//   orText:  { color: 'rgba(255,255,255,0.30)', fontSize: 11 },

//   buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 148, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },

//   signInWrap:     { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton:   { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:    { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:     { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },

//   adminButton:           { minHeight: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#4DEBFF', backgroundColor: 'rgba(77,235,255,0.08)' },
//   adminButtonActive:     { borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonText:       { color: '#4DEBFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
//   adminButtonTextActive: { color: '#fff' },

//   adminSetupLink:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(77,235,255,0.3)', marginTop: 2 },
//   adminSetupLinkText: { color: 'rgba(77,235,255,0.8)', fontSize: 13, fontWeight: '600' },

//   secondaryButton:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   buttonPressed:       { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView, StatusBar, StyleSheet, Text, View,
//   TextInput, Pressable, KeyboardAvoidingView, Platform,
//   Animated, ScrollView, ActivityIndicator,
// } from 'react-native';
// import { LinearGradient }        from 'expo-linear-gradient';
// import * as LocalAuthentication  from 'expo-local-authentication';
// import { setLoggedInUser, getLoggedInUser, getUserFingerprintEnabled } from '../utils/authStorage';
// import { signInApi }             from '../utils/apiService';
// import { useNotifications }      from '../context/NotificationContext';
// import { getAdminCredentials }   from '../utils/adminStorage';
// import useCustomAlert            from '../utils/useCustomAlert';
// import CustomAlertModal          from '../components/CustomAlertModal';

// export default function SignInScreen({ navigation, route }) {
//   const prefillEmail = route?.params?.prefillEmail || '';

//   const [email,         setEmail]         = useState(prefillEmail);
//   const [password,      setPassword]      = useState('');
//   const [showPassword,  setShowPassword]  = useState(false);
//   const [loading,       setLoading]       = useState(false);
//   const [fpLoading,     setFpLoading]     = useState(false);
//   const [userFpLoading, setUserFpLoading] = useState(false);
//   const [rememberMe,    setRememberMe]    = useState(false);
//   const [errors,        setErrors]        = useState({ email: '', password: '' });
//   const [isAdminFilled, setIsAdminFilled] = useState(!!prefillEmail);
//   const [adminCreds,    setAdminCreds]    = useState(null);
//   const [adminFpEnabled, setAdminFpEnabled] = useState(false);
//   const [userFpEnabled,  setUserFpEnabled]  = useState(false);
//   const [tapCount,      setTapCount]      = useState(0); // secret tap

//   const { setUserEmail, refreshUnreadCount } = useNotifications();

//   const slideAnim  = useRef(new Animated.Value(140)).current;
//   const fadeAnim   = useRef(new Animated.Value(0)).current;
//   const glowPulse  = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove  = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   const { alertConfig, showAlert, hideAlert } = useCustomAlert();

//   useEffect(() => {
//     loadCreds();
//     startAnimations();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', loadCreds);
//     return unsubscribe;
//   }, [navigation]);

//   const loadCreds = async () => {
//     // Admin creds
//     const creds = await getAdminCredentials();
//     setAdminCreds(creds);
//     setAdminFpEnabled(creds?.fingerprintEnabled === true);

//     // User fingerprint
//     const userFp = await getUserFingerprintEnabled();
//     setUserFpEnabled(userFp);
//   };

//   const startAnimations = () => {
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
//   };

//   const validateLocally = () => {
//     const newErrors = { email: '', password: '' };
//     let valid = true;
//     if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
//     if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleAdminButtonPress = () => {
//     setErrors({ email: '', password: '' });
//     setIsAdminFilled(true);
//   };

//   // ── Secret tap — 5 సార్లు version tap చేస్తే AdminSetup ──
//   const handleSecretTap = () => {
//     const next = tapCount + 1;
//     setTapCount(next);
//     if (next >= 5) {
//       setTapCount(0);
//       navigation.navigate('AdminSetup');
//     }
//   };

//   // ── Admin Fingerprint Login ────────────────────
//   const handleAdminFingerprintLogin = async () => {
//     try {
//       setFpLoading(true);
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled   = await LocalAuthentication.isEnrolledAsync();
//       if (!compatible || !enrolled) {
//         showAlert('Not Available', 'Biometric hardware not found or no fingerprint enrolled.');
//         return;
//       }
//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage:  'Sign in as Admin',
//         fallbackLabel:  'Use Password',
//         cancelLabel:    'Cancel',
//         disableDeviceFallback: false,
//       });
//       if (result.success) {
//         const creds = await getAdminCredentials();
//         const adminUser = {
//           name:       'Admin',
//           fullName:   'Admin User',
//           email:      creds.email,
//           role:       'ADMIN',
//           phone:      '',
//           location:   'Hyderabad, India',
//           company:    creds.companyName || 'Apps Marketplace',
//           department: 'Administration',
//           bio:        'Marketplace Administrator',
//           image:      null,
//         };
//         await setLoggedInUser(adminUser);
//         navigation.replace('AdminHome', { user: adminUser });
//       } else if (result.error !== 'user_cancel') {
//         showAlert('Verification Failed', 'Fingerprint not recognized. Please use your password.');
//       }
//     } catch (_) {
//       showAlert('Error', 'Fingerprint authentication failed.');
//     } finally {
//       setFpLoading(false);
//     }
//   };

//   // ── User Fingerprint Login ─────────────────────
//   const handleUserFingerprintLogin = async () => {
//     try {
//       setUserFpLoading(true);
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled   = await LocalAuthentication.isEnrolledAsync();
//       if (!compatible || !enrolled) {
//         showAlert('Not Available', 'Biometric hardware not found or no fingerprint enrolled.');
//         return;
//       }
//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage:  'Sign in to your account',
//         fallbackLabel:  'Use Password',
//         cancelLabel:    'Cancel',
//         disableDeviceFallback: false,
//       });
//       if (result.success) {
//         // Last logged in user ని retrieve చేయి
//         const lastUser = await getLoggedInUser();
//         if (!lastUser || !lastUser.email) {
//           showAlert('Not Found', 'No saved user found. Please sign in with email & password first.');
//           return;
//         }
//         setUserEmail(lastUser.email);
//         await refreshUnreadCount(lastUser.email);
//         navigation.replace('Home', { user: lastUser });
//       } else if (result.error !== 'user_cancel') {
//         showAlert('Verification Failed', 'Fingerprint not recognized. Please use your password.');
//       }
//     } catch (_) {
//       showAlert('Error', 'Fingerprint authentication failed.');
//     } finally {
//       setUserFpLoading(false);
//     }
//   };

//   // ── Password Login ─────────────────────────────
//   const handleLogin = async () => {
//     if (!validateLocally()) return;

//     const enteredEmail    = email.trim().toLowerCase();
//     const enteredPassword = password.trim();

//     // Admin check
//     if (
//       adminCreds &&
//       enteredEmail    === adminCreds.email.toLowerCase() &&
//       enteredPassword === adminCreds.password
//     ) {
//       const adminUser = {
//         name:       'Admin',
//         fullName:   'Admin User',
//         email:      adminCreds.email,
//         role:       'ADMIN',
//         phone:      '',
//         location:   'Hyderabad, India',
//         company:    adminCreds.companyName || 'Apps Marketplace',
//         department: 'Administration',
//         bio:        'Marketplace Administrator',
//         image:      null,
//       };
//       await setLoggedInUser(adminUser);
//       navigation.replace('AdminHome', { user: adminUser });
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
//       setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
//       return;
//     }

//     try {
//       setLoading(true);
//       setErrors({ email: '', password: '' });
//       const data = await signInApi({ email: enteredEmail, password: enteredPassword });
//       await setLoggedInUser(data.user);
//       setUserEmail(data.user.email);
//       await refreshUnreadCount(data.user.email);
//       navigation.replace('Home', { user: data.user });
//     } catch (error) {
//       setLoading(false);
//       if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
//         setErrors(prev => ({ ...prev, ...error.fieldErrors }));
//       } else {
//         showAlert('Sign In Failed', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />
//       <CustomAlertModal config={alertConfig} onHide={hideAlert} />

//       <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
//         <KeyboardAvoidingView style={styles.keyboardWrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
//             keyboardShouldPersistTaps="handled"
//           >
//             <Animated.View style={[styles.cardOuterWrap, {
//               opacity:   fadeAnim,
//               transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//             }]}>
//               <Animated.View style={[styles.cardGlowBack, {
//                 opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.34, 0.68] }),
//                 transform: [{ scale: glowPulse }],
//               }]} />
//               <Animated.View style={[styles.cardGlowSoft, {
//                 opacity:   glowPulse.interpolate({ inputRange: [0.96, 1.04], outputRange: [0.16, 0.28] }),
//                 transform: [{ scale: glowPulse }],
//               }]} />

//               <LinearGradient
//                 colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
//                 style={styles.card}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.topShine} />

//                 <View style={styles.miniTag}>
//                   <Text style={styles.miniTagText}>🔒 Secure Access</Text>
//                 </View>

//                 <Text style={styles.title}>Sign In</Text>
//                 <Text style={styles.subtitle}>
//                   Enter your credentials to continue with a premium experience.
//                 </Text>

//                 {prefillEmail ? (
//                   <View style={styles.adminHintBanner}>
//                     <Text style={styles.adminHintText}>
//                       ✅ Admin setup complete! Your email is pre-filled. Enter your password to sign in as Admin.
//                     </Text>
//                   </View>
//                 ) : null}

//                 {adminCreds?.companyName ? (
//                   <View style={styles.companyBadge}>
//                     <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
//                   </View>
//                 ) : null}

//                 <View style={styles.form}>

//                   {/* ── Admin Fingerprint Button ── */}
//                   {adminFpEnabled && (
//                     <>
//                       <Pressable
//                         onPress={handleAdminFingerprintLogin}
//                         disabled={fpLoading}
//                         style={({ pressed }) => [styles.fpBtn, styles.fpBtnAdmin, pressed && { opacity: 0.8 }]}
//                       >
//                         {fpLoading ? (
//                           <ActivityIndicator color="#67E6E8" size="small" />
//                         ) : (
//                           <>
//                             <Text style={styles.fpIcon}>☝</Text>
//                             <Text style={styles.fpLabel}>Sign in as Admin</Text>
//                             <Text style={styles.fpSub}>Admin access · Touch sensor to verify</Text>
//                           </>
//                         )}
//                       </Pressable>
//                       <View style={styles.orRow}>
//                         <View style={styles.orLine} />
//                         <Text style={styles.orText}>or use password</Text>
//                         <View style={styles.orLine} />
//                       </View>
//                     </>
//                   )}

//                   {/* ── User Fingerprint Button ── */}
//                   {userFpEnabled && (
//                     <>
//                       <Pressable
//                         onPress={handleUserFingerprintLogin}
//                         disabled={userFpLoading}
//                         style={({ pressed }) => [styles.fpBtn, styles.fpBtnUser, pressed && { opacity: 0.8 }]}
//                       >
//                         {userFpLoading ? (
//                           <ActivityIndicator color="#A78BFA" size="small" />
//                         ) : (
//                           <>
//                             <Text style={styles.fpIcon}>☝</Text>
//                             <Text style={[styles.fpLabel, { color: '#A78BFA' }]}>Sign in with Fingerprint</Text>
//                             <Text style={[styles.fpSub, { color: 'rgba(167,139,250,0.55)' }]}>User access · Touch sensor to verify</Text>
//                           </>
//                         )}
//                       </Pressable>
//                       <View style={styles.orRow}>
//                         <View style={styles.orLine} />
//                         <Text style={styles.orText}>or use password</Text>
//                         <View style={styles.orLine} />
//                       </View>
//                     </>
//                   )}

//                   {/* Email */}
//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Email Address</Text>
//                     <TextInput
//                       value={email}
//                       onChangeText={v => { setEmail(v); setIsAdminFilled(false); setErrors(e => ({ ...e, email: '' })); }}
//                       placeholder="Enter your email"
//                       placeholderTextColor="rgba(255,255,255,0.42)"
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       style={[styles.input, errors.email ? styles.inputError : null, isAdminFilled ? styles.inputAdmin : null]}
//                     />
//                     {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
//                   </View>

//                   {/* Password */}
//                   <View style={styles.inputGroup}>
//                     <Text style={styles.label}>Password</Text>
//                     <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null, isAdminFilled ? styles.inputAdmin : null]}>
//                       <TextInput
//                         value={password}
//                         onChangeText={v => { setPassword(v); setIsAdminFilled(false); setErrors(e => ({ ...e, password: '' })); }}
//                         placeholder="Enter your password"
//                         placeholderTextColor="rgba(255,255,255,0.42)"
//                         secureTextEntry={!showPassword}
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         autoComplete="off"
//                         textContentType="none"
//                         style={styles.passwordInput}
//                       />
//                       <Pressable onPress={() => setShowPassword(p => !p)} style={styles.eyeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
//                         <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//                       </Pressable>
//                     </View>
//                     {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
//                   </View>

//                   {/* Remember Me + Forgot */}
//                   <View style={styles.optionsRow}>
//                     <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
//                       <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
//                         {rememberMe && <View style={styles.checkboxInner} />}
//                       </View>
//                       <Text style={styles.rememberText}>Remember Me</Text>
//                     </Pressable>
//                     <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
//                       <Text style={styles.forgotText}>Forgot Password?</Text>
//                     </Pressable>
//                   </View>

//                   {/* Glow */}
//                   <Animated.View style={[styles.buttonGlowWrap, {
//                     opacity:   buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
//                     transform: [{ scale: buttonGlow }],
//                   }]}>
//                     <View style={styles.buttonGlowLayer} />
//                   </Animated.View>

//                   {/* Sign In Button */}
//                   <Pressable onPress={handleLogin} disabled={loading} style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}>
//                     <LinearGradient colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.signInButton}>
//                       <View style={styles.buttonTopShine} />
//                       <Animated.View style={[styles.buttonSweep, { transform: [{ translateX: shineMove }, { rotate: '18deg' }] }]} />
//                       {loading
//                         ? <ActivityIndicator color="#fff" size="small" />
//                         : <Text style={styles.signInText}>{isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}</Text>
//                       }
//                     </LinearGradient>
//                   </Pressable>

//                   {/* Admin Login Button */}
//                   <Pressable
//                     onPress={handleAdminButtonPress}
//                     style={({ pressed }) => [styles.adminButton, isAdminFilled && styles.adminButtonActive, pressed && styles.buttonPressed]}
//                   >
//                     <Text style={[styles.adminButtonText, isAdminFilled && styles.adminButtonTextActive]}>
//                       🔐 Admin Login
//                     </Text>
//                   </Pressable>

//                   {/* Sign Up */}
//                   <Pressable onPress={() => navigation.navigate('SignUp')} style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
//                     <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
//                   </Pressable>

//                   {/* Secret tap — version text */}
//                   <Pressable onPress={handleSecretTap}>
//                     <Text style={styles.versionText}>v1.0.0</Text>
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
//   safeArea:     { flex: 1, backgroundColor: '#141B27' },
//   container:    { flex: 1 },
//   keyboardWrap: { flex: 1, paddingHorizontal: 22 },
//   cardOuterWrap:{ justifyContent: 'center', alignItems: 'center' },
//   cardGlowBack: { position: 'absolute', width: '97%', height: 700, borderRadius: 36, backgroundColor: 'rgba(77,235,255,0.08)', shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36, shadowOffset: { width: 0, height: 0 }, elevation: 18 },
//   cardGlowSoft: { position: 'absolute', width: '90%', height: 630, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26, shadowOffset: { width: 0, height: 0 } },
//   card: { width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26, shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden' },
//   cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
//   topShine:     { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },
//   miniTag:      { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
//   miniTagText:  { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
//   title:        { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
//   subtitle:     { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },
//   adminHintBanner: { backgroundColor: 'rgba(0,220,130,0.12)', borderWidth: 1, borderColor: 'rgba(0,220,130,0.30)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12 },
//   adminHintText:   { color: 'rgba(100,255,180,0.9)', fontSize: 12, lineHeight: 18, fontWeight: '600' },
//   companyBadge:     { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 14, backgroundColor: 'rgba(255,200,80,0.12)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)' },
//   companyBadgeText: { color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },
//   form:         { gap: 14 },
//   inputGroup:   { marginBottom: 2 },
//   label:        { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input:        { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15 },
//   inputError:   { borderColor: '#FF6B6B' },
//   inputAdmin:   { borderColor: '#4DEBFF', borderWidth: 1.8 },
//   errorText:    { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 4 },
//   passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16 },
//   passwordInput:   { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
//   eyeButton:       { paddingLeft: 10, justifyContent: 'center' },
//   eyeIcon:         { fontSize: 18 },
//   optionsRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
//   rememberWrap: { flexDirection: 'row', alignItems: 'center' },
//   checkbox:       { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
//   checkboxActive: { backgroundColor: '#4DEBFF' },
//   checkboxInner:  { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
//   rememberText: { color: '#FFFFFF', fontSize: 13 },
//   forgotText:   { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },

//   // ── Fingerprint buttons ──
//   fpBtn:      { borderRadius: 18, paddingVertical: 16, alignItems: 'center', gap: 4 },
//   fpBtnAdmin: { backgroundColor: 'rgba(103,230,232,0.07)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)' },
//   fpBtnUser:  { backgroundColor: 'rgba(167,139,250,0.07)', borderWidth: 1, borderColor: 'rgba(167,139,250,0.28)' },
//   fpIcon:     { fontSize: 26, marginBottom: 2 },
//   fpLabel:    { color: '#67E6E8', fontSize: 14, fontWeight: '800' },
//   fpSub:      { color: 'rgba(103,230,232,0.55)', fontSize: 11 },
//   orRow:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   orLine:     { flex: 1, height: 0.5, backgroundColor: 'rgba(255,255,255,0.12)' },
//   orText:     { color: 'rgba(255,255,255,0.30)', fontSize: 11 },

//   buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 148, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
//   buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
//   signInWrap:     { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
//   signInButton:   { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
//   buttonTopShine: { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
//   buttonSweep:    { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
//   signInText:     { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
//   adminButton:           { minHeight: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#4DEBFF', backgroundColor: 'rgba(77,235,255,0.08)' },
//   adminButtonActive:     { borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
//   adminButtonText:       { color: '#4DEBFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
//   adminButtonTextActive: { color: '#fff' },
//   secondaryButton:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
//   secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
//   versionText:  { color: 'rgba(255,255,255,0.12)', fontSize: 10, textAlign: 'center', marginTop: 8 },
//   buttonPressed: { opacity: 0.94, transform: [{ scale: 0.992 }] },
// });


import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, View,
  TextInput, Pressable, KeyboardAvoidingView, Platform,
  Animated, ScrollView, ActivityIndicator,
} from 'react-native';
import { LinearGradient }        from 'expo-linear-gradient';
import * as LocalAuthentication  from 'expo-local-authentication';
import { setLoggedInUser, getLoggedInUser, getUserFingerprintEnabled } from '../utils/authStorage';
import { signInApi }             from '../utils/apiService';
import { useNotifications }      from '../context/NotificationContext';
import { getAdminCredentials }   from '../utils/adminStorage';
import useCustomAlert            from '../utils/useCustomAlert';
import CustomAlertModal          from '../components/CustomAlertModal';

export default function SignInScreen({ navigation, route }) {
  const prefillEmail = route?.params?.prefillEmail || '';

  const [email,          setEmail]          = useState(prefillEmail);
  const [password,       setPassword]       = useState('');
  const [showPassword,   setShowPassword]   = useState(false);
  const [loading,        setLoading]        = useState(false);
  const [fpLoading,      setFpLoading]      = useState(false);
  const [userFpLoading,  setUserFpLoading]  = useState(false);
  const [rememberMe,     setRememberMe]     = useState(false);
  const [errors,         setErrors]         = useState({ email: '', password: '' });
  const [isAdminFilled,  setIsAdminFilled]  = useState(!!prefillEmail);
  const [adminCreds,     setAdminCreds]     = useState(null);
  const [adminFpEnabled, setAdminFpEnabled] = useState(false);
  const [userFpEnabled,  setUserFpEnabled]  = useState(false);
  const [tapCount,       setTapCount]       = useState(0);

  const { setUserEmail, refreshUnreadCount } = useNotifications();

  const slideAnim  = useRef(new Animated.Value(140)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const glowPulse  = useRef(new Animated.Value(0.96)).current;
  const buttonGlow = useRef(new Animated.Value(0.92)).current;
  const shineMove  = useRef(new Animated.Value(-220)).current;
  const cardBreath = useRef(new Animated.Value(0.985)).current;

  const { alertConfig, showAlert, hideAlert } = useCustomAlert();

  useEffect(() => { loadCreds(); startAnimations(); }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadCreds);
    return unsubscribe;
  }, [navigation]);

  const loadCreds = async () => {
    const creds = await getAdminCredentials();
    setAdminCreds(creds);
    setAdminFpEnabled(creds?.fingerprintEnabled === true);
    const userFp = await getUserFingerprintEnabled();
    setUserFpEnabled(userFp);
  };

  const startAnimations = () => {
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
  };

  const validateLocally = () => {
    const newErrors = { email: '', password: '' };
    let valid = true;
    if (!email.trim())    { newErrors.email    = 'Email is required';    valid = false; }
    if (!password.trim()) { newErrors.password = 'Password is required'; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const handleAdminButtonPress = () => {
    setErrors({ email: '', password: '' });
    setIsAdminFilled(true);
  };

  const handleSecretTap = () => {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 5) { setTapCount(0); navigation.navigate('AdminSetup'); }
  };

  const handleAdminFingerprintLogin = async () => {
    try {
      setFpLoading(true);
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled   = await LocalAuthentication.isEnrolledAsync();
      if (!compatible || !enrolled) {
        showAlert('Not Available', 'Biometric hardware not found or no fingerprint enrolled.');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sign in as Admin', fallbackLabel: 'Use Password',
        cancelLabel: 'Cancel', disableDeviceFallback: false,
      });
      if (result.success) {
        const creds = await getAdminCredentials();
        const adminUser = {
          name: 'Admin', fullName: 'Admin User', email: creds.email, role: 'ADMIN',
          phone: '', location: 'Hyderabad, India',
          company: creds.companyName || 'Apps Marketplace',
          department: 'Administration', bio: 'Marketplace Administrator', image: null,
        };
        await setLoggedInUser(adminUser);
        navigation.replace('AdminHome', { user: adminUser });
      } else if (result.error !== 'user_cancel') {
        showAlert('Verification Failed', 'Fingerprint not recognized. Please use your password.');
      }
    } catch (_) { showAlert('Error', 'Fingerprint authentication failed.'); }
    finally { setFpLoading(false); }
  };

  const handleUserFingerprintLogin = async () => {
    try {
      setUserFpLoading(true);
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled   = await LocalAuthentication.isEnrolledAsync();
      if (!compatible || !enrolled) {
        showAlert('Not Available', 'Biometric hardware not found or no fingerprint enrolled.');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sign in to your account', fallbackLabel: 'Use Password',
        cancelLabel: 'Cancel', disableDeviceFallback: false,
      });
      if (result.success) {
        const lastUser = await getLoggedInUser();
        if (!lastUser || !lastUser.email) {
          showAlert('Not Found', 'No saved user found. Please sign in with email & password first.');
          return;
        }
        setUserEmail(lastUser.email);
        await refreshUnreadCount(lastUser.email);
        navigation.replace('Home', { user: lastUser });
      } else if (result.error !== 'user_cancel') {
        showAlert('Verification Failed', 'Fingerprint not recognized. Please use your password.');
      }
    } catch (_) { showAlert('Error', 'Fingerprint authentication failed.'); }
    finally { setUserFpLoading(false); }
  };

  const handleLogin = async () => {
    if (!validateLocally()) return;
    const enteredEmail    = email.trim().toLowerCase();
    const enteredPassword = password.trim();

    if (adminCreds && enteredEmail === adminCreds.email.toLowerCase() && enteredPassword === adminCreds.password) {
      const adminUser = {
        name: 'Admin', fullName: 'Admin User', email: adminCreds.email, role: 'ADMIN',
        phone: '', location: 'Hyderabad, India',
        company: adminCreds.companyName || 'Apps Marketplace',
        department: 'Administration', bio: 'Marketplace Administrator', image: null,
      };
      await setLoggedInUser(adminUser);
      navigation.replace('AdminHome', { user: adminUser });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
      setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
      return;
    }

    try {
      setLoading(true);
      setErrors({ email: '', password: '' });
      const data = await signInApi({ email: enteredEmail, password: enteredPassword });
      await setLoggedInUser(data.user);
      setUserEmail(data.user.email);
      await refreshUnreadCount(data.user.email);
      navigation.replace('Home', { user: data.user });
    } catch (error) {
      setLoading(false);
      if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...error.fieldErrors }));
      } else {
        showAlert('Sign In Failed', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1D2433" />
      <CustomAlertModal config={alertConfig} onHide={hideAlert} />

      <LinearGradient colors={['#141B27', '#212C3D', '#182130']} style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardWrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
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
                  <Text style={styles.miniTagText}>🔒 Secure Access</Text>
                </View>

                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subtitle}>
                  Enter your credentials to continue with a premium experience.
                </Text>

                {prefillEmail ? (
                  <View style={styles.adminHintBanner}>
                    <Text style={styles.adminHintText}>
                      ✅ Admin setup complete! Your email is pre-filled. Enter your password to sign in as Admin.
                    </Text>
                  </View>
                ) : null}

                {adminCreds?.companyName ? (
                  <View style={styles.companyBadge}>
                    <Text style={styles.companyBadgeText}>🏢 {adminCreds.companyName}</Text>
                  </View>
                ) : null}

                <View style={styles.form}>

                  {/* ── Fingerprint Buttons — side by side ── */}
                  {(adminFpEnabled || userFpEnabled) && (
                    <>
                      <View style={styles.fpRow}>
                        {adminFpEnabled && (
                          <Pressable
                            onPress={handleAdminFingerprintLogin}
                            disabled={fpLoading}
                            style={({ pressed }) => [styles.fpBtn, styles.fpBtnAdmin, pressed && { opacity: 0.8 }]}
                          >
                            {fpLoading ? (
                              <ActivityIndicator color="#67E6E8" size="small" />
                            ) : (
                              <>
                                <Text style={styles.fpIcon}>☝</Text>
                                <Text style={styles.fpLabel}>Sign in as Admin</Text>
                                <Text style={styles.fpSub}>Admin · Touch to verify</Text>
                              </>
                            )}
                          </Pressable>
                        )}
                        {userFpEnabled && (
                          <Pressable
                            onPress={handleUserFingerprintLogin}
                            disabled={userFpLoading}
                            style={({ pressed }) => [styles.fpBtn, styles.fpBtnUser, pressed && { opacity: 0.8 }]}
                          >
                            {userFpLoading ? (
                              <ActivityIndicator color="#A78BFA" size="small" />
                            ) : (
                              <>
                                <Text style={styles.fpIcon}>☝</Text>
                                <Text style={[styles.fpLabel, { color: '#A78BFA' }]}>Sign in with FP</Text>
                                <Text style={[styles.fpSub, { color: 'rgba(167,139,250,0.55)' }]}>User · Touch to verify</Text>
                              </>
                            )}
                          </Pressable>
                        )}
                      </View>
                      <View style={styles.orRow}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>or use password</Text>
                        <View style={styles.orLine} />
                      </View>
                    </>
                  )}

                  {/* Email */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                      value={email}
                      onChangeText={v => { setEmail(v); setIsAdminFilled(false); setErrors(e => ({ ...e, email: '' })); }}
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(255,255,255,0.42)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[styles.input, errors.email ? styles.inputError : null, isAdminFilled ? styles.inputAdmin : null]}
                    />
                    {errors.email ? <Text style={styles.errorText}>⚠ {errors.email}</Text> : null}
                  </View>

                  {/* Password */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null, isAdminFilled ? styles.inputAdmin : null]}>
                      <TextInput
                        value={password}
                        onChangeText={v => { setPassword(v); setIsAdminFilled(false); setErrors(e => ({ ...e, password: '' })); }}
                        placeholder="Enter your password"
                        placeholderTextColor="rgba(255,255,255,0.42)"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        textContentType="none"
                        style={styles.passwordInput}
                      />
                      <Pressable onPress={() => setShowPassword(p => !p)} style={styles.eyeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                      </Pressable>
                    </View>
                    {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}
                  </View>

                  {/* Remember Me + Forgot */}
                  <View style={styles.optionsRow}>
                    <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberWrap}>
                      <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                        {rememberMe && <View style={styles.checkboxInner} />}
                      </View>
                      <Text style={styles.rememberText}>Remember Me</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </Pressable>
                  </View>

                  {/* Glow */}
                  <Animated.View style={[styles.buttonGlowWrap, {
                    opacity:   buttonGlow.interpolate({ inputRange: [0.92, 1], outputRange: [0.36, 0.68] }),
                    transform: [{ scale: buttonGlow }],
                  }]}>
                    <View style={styles.buttonGlowLayer} />
                  </Animated.View>

                  {/* Sign In Button */}
                  <Pressable onPress={handleLogin} disabled={loading} style={({ pressed }) => [styles.signInWrap, pressed && styles.buttonPressed]}>
                    <LinearGradient colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.signInButton}>
                      <View style={styles.buttonTopShine} />
                      <Animated.View style={[styles.buttonSweep, { transform: [{ translateX: shineMove }, { rotate: '18deg' }] }]} />
                      {loading
                        ? <ActivityIndicator color="#fff" size="small" />
                        : <Text style={styles.signInText}>{isAdminFilled ? '🔐 Sign In as Admin' : 'Sign In'}</Text>
                      }
                    </LinearGradient>
                  </Pressable>

                  {/* Admin Login Button */}
                  <Pressable
                    onPress={handleAdminButtonPress}
                    style={({ pressed }) => [styles.adminButton, isAdminFilled && styles.adminButtonActive, pressed && styles.buttonPressed]}
                  >
                    <Text style={[styles.adminButtonText, isAdminFilled && styles.adminButtonTextActive]}>
                      🔐 Admin Login
                    </Text>
                  </Pressable>

                  {/* Sign Up */}
                  <Pressable onPress={() => navigation.navigate('SignUp')} style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
                    <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
                  </Pressable>

                  {/* Secret tap */}
                  <Pressable onPress={handleSecretTap}>
                    <Text style={styles.versionText}>v1.0.0</Text>
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
  safeArea:     { flex: 1, backgroundColor: '#141B27' },
  container:    { flex: 1 },
  keyboardWrap: { flex: 1, paddingHorizontal: 22 },
  cardOuterWrap:{ justifyContent: 'center', alignItems: 'center' },
  cardGlowBack: { position: 'absolute', width: '97%', height: 700, borderRadius: 36, backgroundColor: 'rgba(77,235,255,0.08)', shadowColor: '#4DEBFF', shadowOpacity: 0.85, shadowRadius: 36, shadowOffset: { width: 0, height: 0 }, elevation: 18 },
  cardGlowSoft: { position: 'absolute', width: '90%', height: 630, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.03)', shadowColor: '#F6C7A1', shadowOpacity: 0.18, shadowRadius: 26, shadowOffset: { width: 0, height: 0 } },
  card:         { width: '100%', borderRadius: 32, paddingHorizontal: 22, paddingVertical: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 26, shadowOffset: { width: 0, height: 14 }, elevation: 16, overflow: 'hidden' },
  cardGlassOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.03)' },
  topShine:     { position: 'absolute', top: 0, left: '15%', right: '15%', height: 1.2, backgroundColor: 'rgba(255,255,255,0.22)' },
  miniTag:      { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, marginBottom: 16, backgroundColor: 'rgba(103,232,240,0.14)', borderWidth: 1, borderColor: 'rgba(103,232,240,0.24)' },
  miniTagText:  { color: '#D8FAFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
  title:        { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8 },
  subtitle:     { color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  adminHintBanner: { backgroundColor: 'rgba(0,220,130,0.12)', borderWidth: 1, borderColor: 'rgba(0,220,130,0.30)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12 },
  adminHintText:   { color: 'rgba(100,255,180,0.9)', fontSize: 12, lineHeight: 18, fontWeight: '600' },
  companyBadge:     { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 14, backgroundColor: 'rgba(255,200,80,0.12)', borderWidth: 1, borderColor: 'rgba(255,200,80,0.28)' },
  companyBadgeText: { color: 'rgba(255,220,120,0.9)', fontSize: 12, fontWeight: '600' },
  form:         { gap: 14 },
  inputGroup:   { marginBottom: 2 },
  label:        { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input:        { minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, color: '#FFFFFF', fontSize: 15 },
  inputError:   { borderColor: '#FF6B6B' },
  inputAdmin:   { borderColor: '#4DEBFF', borderWidth: 1.8 },
  errorText:    { color: '#FF6B6B', fontSize: 12, fontWeight: '500', marginTop: 4 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderRadius: 18, borderWidth: 1.3, borderColor: 'rgba(77,235,255,0.34)', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16 },
  passwordInput:   { flex: 1, color: '#FFFFFF', fontSize: 15, paddingVertical: 0 },
  eyeButton:       { paddingLeft: 10, justifyContent: 'center' },
  eyeIcon:         { fontSize: 18 },
  optionsRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  rememberWrap: { flexDirection: 'row', alignItems: 'center' },
  checkbox:       { width: 18, height: 18, borderWidth: 1.5, borderColor: '#4DEBFF', borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: '#4DEBFF' },
  checkboxInner:  { width: 8, height: 8, backgroundColor: '#0D1B2A', borderRadius: 2 },
  rememberText: { color: '#FFFFFF', fontSize: 13 },
  forgotText:   { color: '#4DEBFF', fontSize: 13, fontWeight: '600' },

  // ── Fingerprint ──
  fpRow:      { flexDirection: 'row', gap: 10 },
  fpBtn:      { flex: 1, borderRadius: 18, paddingVertical: 16, alignItems: 'center', gap: 4 },
  fpBtnAdmin: { backgroundColor: 'rgba(103,230,232,0.07)', borderWidth: 1, borderColor: 'rgba(103,230,232,0.28)' },
  fpBtnUser:  { backgroundColor: 'rgba(167,139,250,0.07)', borderWidth: 1, borderColor: 'rgba(167,139,250,0.28)' },
  fpIcon:     { fontSize: 24, marginBottom: 2 },
  fpLabel:    { color: '#67E6E8', fontSize: 13, fontWeight: '800', textAlign: 'center' },
  fpSub:      { color: 'rgba(103,230,232,0.55)', fontSize: 10, textAlign: 'center' },
  orRow:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  orLine:     { flex: 1, height: 0.5, backgroundColor: 'rgba(255,255,255,0.12)' },
  orText:     { color: 'rgba(255,255,255,0.30)', fontSize: 11 },

  buttonGlowWrap:  { position: 'absolute', left: 8, right: 8, bottom: 148, height: 66, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
  buttonGlowLayer: { width: '95%', height: 58, borderRadius: 18, backgroundColor: 'rgba(217,44,255,0.18)', shadowColor: '#4DEBFF', shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
  signInWrap:     { marginTop: 10, borderRadius: 18, overflow: 'hidden', zIndex: 2 },
  signInButton:   { minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, overflow: 'hidden' },
  buttonTopShine: { position: 'absolute', top: 0, left: 10, right: 10, height: 1.4, backgroundColor: 'rgba(255,255,255,0.42)' },
  buttonSweep:    { position: 'absolute', top: -8, width: 52, height: 84, backgroundColor: 'rgba(255,255,255,0.14)' },
  signInText:     { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.35 },
  adminButton:           { minHeight: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#4DEBFF', backgroundColor: 'rgba(77,235,255,0.08)' },
  adminButtonActive:     { borderColor: '#4DEBFF', backgroundColor: '#4DEBFF' },
  adminButtonText:       { color: '#4DEBFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  adminButtonTextActive: { color: '#fff' },
  secondaryButton:     { minHeight: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  secondaryButtonText: { color: 'rgba(255,255,255,0.84)', fontSize: 13, fontWeight: '600' },
  versionText:  { color: 'rgba(255,255,255,0.12)', fontSize: 10, textAlign: 'center', marginTop: 8 },
  buttonPressed: { opacity: 0.94, transform: [{ scale: 0.992 }] },
});