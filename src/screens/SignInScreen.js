


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
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// export default function SignInScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const slideAnim = useRef(new Animated.Value(140)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const glowPulse = useRef(new Animated.Value(0.96)).current;
//   const buttonGlow = useRef(new Animated.Value(0.92)).current;
//   const shineMove = useRef(new Animated.Value(-220)).current;
//   const cardBreath = useRef(new Animated.Value(0.985)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 950,
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(glowPulse, {
//             toValue: 1.04,
//             duration: 2200,
//             useNativeDriver: true,
//           }),
//           Animated.timing(glowPulse, {
//             toValue: 0.96,
//             duration: 2200,
//             useNativeDriver: true,
//           }),
//         ])
//       ),
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(buttonGlow, {
//             toValue: 1,
//             duration: 1700,
//             useNativeDriver: true,
//           }),
//           Animated.timing(buttonGlow, {
//             toValue: 0.92,
//             duration: 1700,
//             useNativeDriver: true,
//           }),
//         ])
//       ),
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(cardBreath, {
//             toValue: 1,
//             duration: 2600,
//             useNativeDriver: true,
//           }),
//           Animated.timing(cardBreath, {
//             toValue: 0.985,
//             duration: 2600,
//             useNativeDriver: true,
//           }),
//         ])
//       ),
//       Animated.loop(
//         Animated.sequence([
//           Animated.delay(900),
//           Animated.timing(shineMove, {
//             toValue: 320,
//             duration: 1800,
//             useNativeDriver: true,
//           }),
//           Animated.delay(1200),
//           Animated.timing(shineMove, {
//             toValue: -220,
//             duration: 0,
//             useNativeDriver: true,
//           }),
//         ])
//       ),
//     ]).start();
//   }, [slideAnim, fadeAnim, glowPulse, buttonGlow, shineMove, cardBreath]);

//   const handleLogin = () => {
//     if (!email.trim() || !password.trim()) return;

//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       navigation.replace('Home', {
//         user: {
//           name: 'Bliss',
//           role: 'Admin',
//           email: email || 'Bliss123.com',
//           phone: '+91 9876543210',
//           location: 'Hyderabad, India',
//           company: 'Apps Marketplace',
//           department: 'Administration',
//           bio: 'Welcome back to your account.',
//           image: null,
//         },
//       });
//     }, 700);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#1D2433" />

//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.container}
//       >
//         <View style={styles.background} />

//         <KeyboardAvoidingView
//           style={styles.keyboardWrap}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         >
//           <ScrollView
//             contentContainerStyle={styles.scrollContent}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
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
//               style={[
//                 styles.cardGlowBack,
//                 {
//                   opacity: glowPulse.interpolate({
//                     inputRange: [0.96, 1.04],
//                     outputRange: [0.34, 0.68],
//                   }),
//                   transform: [{ scale: glowPulse }],
//                 },
//               ]}
//             />

//             <Animated.View
//               style={[
//                 styles.cardGlowSoft,
//                 {
//                   opacity: glowPulse.interpolate({
//                     inputRange: [0.96, 1.04],
//                     outputRange: [0.16, 0.28],
//                   }),
//                   transform: [{ scale: glowPulse }],
//                 },
//               ]}
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
//                     onChangeText={setEmail}
//                     placeholder="Enter your email"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     style={styles.input}
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Password</Text>
//                   <TextInput
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Enter your password"
//                     placeholderTextColor="rgba(255,255,255,0.42)"
//                     secureTextEntry
//                     style={styles.input}
//                   />
//                 </View>

//                 <Animated.View
//                   style={[
//                     styles.buttonGlowWrap,
//                     {
//                       opacity: buttonGlow.interpolate({
//                         inputRange: [0.92, 1],
//                         outputRange: [0.36, 0.68],
//                       }),
//                       transform: [{ scale: buttonGlow }],
//                     },
//                   ]}
//                 >
//                   <View style={styles.buttonGlowLayer} />
//                 </Animated.View>

//                 <Pressable
//                   onPress={handleLogin}
//                   style={({ pressed }) => [
//                     styles.signInWrap,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                  <LinearGradient
//   colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//   start={{ x: 0, y: 0 }}
//   end={{ x: 1, y: 0 }}
//   style={styles.signInButton}
// >
//   <View style={styles.buttonTopShine} />
//   <Animated.View
//     style={[
//       styles.buttonSweep,
//       { transform: [{ translateX: shineMove }, { rotate: '18deg' }] },
//     ]}
//   />
//   <Text style={styles.signInText}>
//     {loading ? 'Signing In...' : 'Sign In'}
//   </Text>
// </LinearGradient>
//                 </Pressable>

//                 <Pressable
//                   onPress={() => navigation.navigate('SignUp')}
//                   style={({ pressed }) => [
//                     styles.secondaryButton,
//                     pressed && styles.buttonPressed,
//                   ]}
//                 >
//                   <Text style={styles.secondaryButtonText}>
//                     Don’t have an account? Sign Up
//                   </Text>
//                 </Pressable>
//               </View>
//             </LinearGradient>
//           </Animated.View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#141B27',
//   },

//   container: {
//     flex: 1,
//   },

//   background: {
//     ...StyleSheet.absoluteFillObject,
//   },

//   keyboardWrap: {
//     flex: 1,
//     paddingHorizontal: 22,
//   },

//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingVertical: 24,
//   },

//   cardOuterWrap: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   cardGlowBack: {
//     position: 'absolute',
//     width: '97%',
//     height: Math.min(470, SCREEN_HEIGHT * 0.55),
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
//     height: Math.min(400, SCREEN_HEIGHT * 0.47),
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
//     marginBottom: 24,
//   },

//   form: {
//     gap: 14,
//   },

//   inputGroup: {
//     marginBottom: 2,
//   },

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

//   buttonGlowWrap: {
//     position: 'absolute',
//     left: 8,
//     right: 8,
//     bottom: 62,
//     height: 66,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 0,
//   },

//  buttonGlowLayer: {
//   width: '95%',
//   height: 58,
//   borderRadius: 18,
//   backgroundColor: 'rgba(217, 44, 255, 0.18)',
//   shadowColor: '#4DEBFF',
//   shadowOpacity: 0.5,
//   shadowRadius: 18,
//   shadowOffset: { width: 0, height: 0 },
//   elevation: 10,
// },
//   signInWrap: {
//     marginTop: 10,
//     borderRadius: 18,
//     overflow: 'hidden',
//     zIndex: 2,
//   },

// signInButton: {
//   minHeight: 58,
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: 18,
//   shadowColor: '#4DEBFF',
//   shadowOpacity: 0.24,
//   shadowRadius: 12,
//   shadowOffset: { width: 0, height: 0 },
//   elevation: 7,
//   overflow: 'hidden',
// },
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
//     color: '#2E1C10',
//     fontSize: 17,
//     fontWeight: '800',
//     letterSpacing: 0.35,
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

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { setLoggedInUser } from '../utils/authStorage';
import { signInApi } from '../utils/apiService';

export default function SignInScreen({ navigation }) {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Field-level errors
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Animations
  const slideAnim  = useRef(new Animated.Value(140)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const glowPulse  = useRef(new Animated.Value(0.96)).current;
  const buttonGlow = useRef(new Animated.Value(0.92)).current;
  const shineMove  = useRef(new Animated.Value(-220)).current;
  const cardBreath = useRef(new Animated.Value(0.985)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim,  { toValue: 0,     duration: 950,  useNativeDriver: true }),
      Animated.timing(fadeAnim,   { toValue: 1,     duration: 1000, useNativeDriver: true }),
      Animated.loop(Animated.sequence([
        Animated.timing(glowPulse,  { toValue: 1.04,  duration: 2200, useNativeDriver: true }),
        Animated.timing(glowPulse,  { toValue: 0.96,  duration: 2200, useNativeDriver: true }),
      ])),
      Animated.loop(Animated.sequence([
        Animated.timing(buttonGlow, { toValue: 1,     duration: 1700, useNativeDriver: true }),
        Animated.timing(buttonGlow, { toValue: 0.92,  duration: 1700, useNativeDriver: true }),
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

  // ── Client-side Validation ──────────────────
  const validateLocally = () => {
    const newErrors = { email: '', password: '' };
    let valid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ── Handle Sign In ──────────────────────────
  const handleLogin = async () => {
    if (!validateLocally()) return;

    try {
      setLoading(true);
      setErrors({ email: '', password: '' });

      const data = await signInApi({
        email:    email.trim().toLowerCase(),
        password: password.trim(),
      });

      await setLoggedInUser(data.user);
      navigation.replace('Home', { user: data.user });

    } catch (error) {
      setLoading(false);
      if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...error.fieldErrors }));
      } else {
        Alert.alert('Sign In Failed', error.message);
      }
    }
  };

  // ───────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1D2433" />

      <LinearGradient
        colors={['#141B27', '#212C3D', '#182130']}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Animated.View
            style={[
              styles.cardOuterWrap,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: cardBreath }],
              },
            ]}
          >
            {/* Glow Back */}
            <Animated.View
              style={[styles.cardGlowBack, {
                opacity: glowPulse.interpolate({
                  inputRange: [0.96, 1.04],
                  outputRange: [0.34, 0.68],
                }),
                transform: [{ scale: glowPulse }],
              }]}
            />

            {/* Glow Soft */}
            <Animated.View
              style={[styles.cardGlowSoft, {
                opacity: glowPulse.interpolate({
                  inputRange: [0.96, 1.04],
                  outputRange: [0.16, 0.28],
                }),
                transform: [{ scale: glowPulse }],
              }]}
            />

            <LinearGradient
              colors={[
                'rgba(255,255,255,0.12)',
                'rgba(255,255,255,0.05)',
                'rgba(255,255,255,0.02)',
              ]}
              style={styles.card}
            >
              <View style={styles.cardGlassOverlay} />
              <View style={styles.topShine} />

              <View style={styles.miniTag}>
                <Text style={styles.miniTagText}>Secure Access</Text>
              </View>

              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.subtitle}>
                Enter your credentials to continue with a premium experience.
              </Text>

              <View style={styles.form}>

                {/* ── Email ── */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    value={email}
                    onChangeText={(v) => {
                      setEmail(v);
                      setErrors(e => ({ ...e, email: '' }));
                    }}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255,255,255,0.42)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.input, errors.email ? styles.inputError : null]}
                  />
                  {errors.email
                    ? <Text style={styles.errorText}>⚠ {errors.email}</Text>
                    : null
                  }
                </View>

                {/* ── Password with Eye Toggle ── */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={[
                    styles.passwordWrapper,
                    errors.password ? styles.inputError : null,
                  ]}>
                    <TextInput
                      value={password}
                      onChangeText={(v) => {
                        setPassword(v);
                        setErrors(e => ({ ...e, password: '' }));
                      }}
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(255,255,255,0.42)"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      textContentType="none"
                      keyboardType="default"
                      style={styles.passwordInput}
                    />
                    <Pressable
                      onPress={() => setShowPassword(prev => !prev)}
                      style={styles.eyeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.eyeIcon}>
                        {showPassword ? '🙈' : '👁️'}
                      </Text>
                    </Pressable>
                  </View>
                  {errors.password
                    ? <Text style={styles.errorText}>⚠ {errors.password}</Text>
                    : null
                  }
                </View>
                <View style={styles.optionsRow}>
  {/* Remember Me */}
  <Pressable
    onPress={() => setRememberMe(!rememberMe)}
    style={styles.rememberWrap}
  >
    <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
      {rememberMe && <View style={styles.checkboxInner} />}
    </View>
    <Text style={styles.rememberText}>Remember Me</Text>
  </Pressable>

  {/* Forgot Password */}
  <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={styles.forgotText}>Forgot Password?</Text>
  </Pressable>
</View>

                {/* Button Glow */}
                <Animated.View
                  style={[styles.buttonGlowWrap, {
                    opacity: buttonGlow.interpolate({
                      inputRange: [0.92, 1],
                      outputRange: [0.36, 0.68],
                    }),
                    transform: [{ scale: buttonGlow }],
                  }]}
                >
                  <View style={styles.buttonGlowLayer} />
                </Animated.View>

                {/* Sign In Button */}
                <Pressable
                  onPress={handleLogin}
                  disabled={loading}
                  style={({ pressed }) => [
                    styles.signInWrap,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <LinearGradient
                    colors={['#FF59DD', '#D92CFF', '#7E1FFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.signInButton}
                  >
                    <View style={styles.buttonTopShine} />
                    <Animated.View
                      style={[
                        styles.buttonSweep,
                        { transform: [{ translateX: shineMove }, { rotate: '18deg' }] },
                      ]}
                    />
                    {loading
                      ? <ActivityIndicator color="#fff" size="small" />
                      : <Text style={styles.signInText}>Sign In</Text>
                    }
                  </LinearGradient>
                </Pressable>

                {/* Go to Sign Up */}
                <Pressable
                  onPress={() => navigation.navigate('SignUp')}
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.secondaryButtonText}>
                    Don't have an account? Sign Up
                  </Text>
                </Pressable>

              </View>
            </LinearGradient>
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea:     { flex: 1, backgroundColor: '#141B27' },
  container:    { flex: 1 },
  keyboardWrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },

  cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },

  cardGlowBack: {
    position: 'absolute',
    width: '97%',
    height: 520,
    borderRadius: 36,
    backgroundColor: 'rgba(77, 235, 255, 0.08)',
    shadowColor: '#4DEBFF',
    shadowOpacity: 0.85,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 0 },
    elevation: 18,
  },
  cardGlowSoft: {
    position: 'absolute',
    width: '90%',
    height: 450,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.03)',
    shadowColor: '#F6C7A1',
    shadowOpacity: 0.18,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 0 },
  },
  card: {
    width: '100%',
    borderRadius: 32,
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
    elevation: 16,
    overflow: 'hidden',
  },
  cardGlassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  topShine: {
    position: 'absolute',
    top: 0,
    left: '15%',
    right: '15%',
    height: 1.2,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },

  miniTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 16,
    backgroundColor: 'rgba(103, 232, 240, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(103, 232, 240, 0.24)',
  },
  miniTagText: {
    color: '#D8FAFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },

  form: { gap: 14 },

  inputGroup: { marginBottom: 2 },
  label: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1.3,
    borderColor: 'rgba(77, 235, 255, 0.34)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 15,
    shadowColor: '#4DEBFF',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  inputError: {
    borderColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    marginLeft: 4,
  },

  // ── Password Eye Toggle ──
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1.3,
    borderColor: 'rgba(77, 235, 255, 0.34)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    shadowColor: '#4DEBFF',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 0,
  },
  eyeButton: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 18,
  },

  // ── Buttons ──
  buttonGlowWrap: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 62,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  buttonGlowLayer: {
    width: '95%',
    height: 58,
    borderRadius: 18,
    backgroundColor: 'rgba(217, 44, 255, 0.18)',
    shadowColor: '#4DEBFF',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  signInWrap: {
    marginTop: 10,
    borderRadius: 18,
    overflow: 'hidden',
    zIndex: 2,
  },
  signInButton: {
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    overflow: 'hidden',
  },
  buttonTopShine: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    height: 1.4,
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  buttonSweep: {
    position: 'absolute',
    top: -8,
    width: 52,
    height: 84,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  signInText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.35,
  },
  secondaryButton: {
    minHeight: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  secondaryButtonText: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.992 }],
  },
  optionsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},

rememberWrap: {
  flexDirection: 'row',
  alignItems: 'center',
},

checkbox: {
  width: 18,
  height: 18,
  borderWidth: 1.5,
  borderColor: '#4DEBFF',
  borderRadius: 4,
  marginRight: 8,
  alignItems: 'center',
  justifyContent: 'center',
},

checkboxActive: {
  backgroundColor: '#4DEBFF',
},

checkboxInner: {
  width: 8,
  height: 8,
  backgroundColor: '#0D1B2A',
  borderRadius: 2,
},

rememberText: {
  color: '#FFFFFF',
  fontSize: 13,
},

forgotText: {
  color: '#4DEBFF',
  fontSize: 13,
  fontWeight: '600',
},
});