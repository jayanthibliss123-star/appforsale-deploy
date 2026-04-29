// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import { forgotPasswordApi } from '../utils/apiService';

// export default function ForgotPasswordScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleReset = async () => {
//     if (!email.trim()) {
//       Alert.alert('Error', 'Please enter your email');
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log('📧 Sending forgot password for:', email);

//       const res = await forgotPasswordApi(email);
//       console.log('✅ Response:', res);

//       // ✅ ResetPassword screen ki navigate + email pass cheyyi
//       navigation.navigate('ResetPassword', { email: email.trim() });

//     } catch (err) {
//       console.log('❌ Error:', err.message);
//       Alert.alert('Error', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />

//       <View style={styles.container}>
//         <Text style={styles.title}>Forgot Password</Text>

//         <Text style={styles.subtitle}>
//           Enter your registered email to receive reset instructions.
//         </Text>

//         <TextInput
//           placeholder="Enter your email"
//           placeholderTextColor="rgba(255,255,255,0.5)"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <Pressable
//           onPress={handleReset}
//           style={({ pressed }) => [
//             styles.button,
//             pressed && styles.buttonPressed,
//           ]}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? 'Sending...' : 'Send Reset Link'}
//           </Text>
//         </Pressable>

//         <Pressable onPress={() => navigation.goBack()}>
//           <Text style={styles.backText}>Back to Sign In</Text>
//         </Pressable>
//       </View>
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
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: '800',
//     color: '#FFFFFF',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.7)',
//     marginBottom: 25,
//   },
//   input: {
//     height: 55,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#67E6E8',
//     paddingHorizontal: 15,
//     color: '#FFFFFF',
//     marginBottom: 20,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },
//   button: {
//     backgroundColor: '#67E6E8',
//     paddingVertical: 15,
//     borderRadius: 14,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#12343A',
//     fontSize: 16,
//     fontWeight: '800',
//   },
//   buttonPressed: {
//     opacity: 0.85,
//     transform: [{ scale: 0.97 }],
//   },
//   backText: {
//     marginTop: 20,
//     textAlign: 'center',
//     color: '#67E6E8',
//     fontWeight: '600',
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
import { forgotPasswordApi } from '../utils/apiService';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const slideAnim  = useRef(new Animated.Value(120)).current;
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

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await forgotPasswordApi(email);
      console.log('✅ Response:', res);
      navigation.navigate('ResetPassword', { email: email.trim() });
    } catch (err) {
      console.log('❌ Error:', err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

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

              {/* ── Icon ── */}
              <View style={styles.iconWrap}>
                <Text style={styles.iconText}>🔑</Text>
              </View>

              <View style={styles.miniTag}>
                <Text style={styles.miniTagText}>Password Recovery</Text>
              </View>

              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter your registered email address and we'll send you reset instructions.
              </Text>

              <View style={styles.form}>

                {/* ── Email ── */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    value={email}
                    onChangeText={(v) => {
                      setEmail(v);
                      setError('');
                    }}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255,255,255,0.42)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.input, error ? styles.inputError : null]}
                  />
                  {error ? (
                    <Text style={styles.errorText}>⚠ {error}</Text>
                  ) : null}
                </View>

                {/* ── Button Glow ── */}
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

                {/* ── Send Reset Button ── */}
                <Pressable
                  onPress={handleReset}
                  disabled={loading}
                  style={({ pressed }) => [
                    styles.resetWrap,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <LinearGradient
                    colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.resetButton}
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
                      : <Text style={styles.resetText}>Send Reset Link</Text>
                    }
                  </LinearGradient>
                </Pressable>

                {/* ── Back to Sign In ── */}
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={({ pressed }) => [
                    styles.backButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.backText}>← Back to Sign In</Text>
                </Pressable>

              </View>
            </LinearGradient>
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:     { flex: 1, backgroundColor: '#141B27' },
  container:    { flex: 1 },
  keyboardWrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },

  cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },

  cardGlowBack: {
    position: 'absolute',
    width: '97%',
    height: 460,
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
    height: 400,
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

  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(103, 232, 240, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(103, 232, 240, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: { fontSize: 26 },

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
    fontSize: 28,
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

  buttonGlowWrap: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 56,
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

  resetWrap: {
    marginTop: 10,
    borderRadius: 18,
    overflow: 'hidden',
    zIndex: 2,
  },
  resetButton: {
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
  resetText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.35,
  },

  backButton: {
    minHeight: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  backText: {
    color: '#4DEBFF',
    fontSize: 14,
    fontWeight: '600',
  },

  buttonPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.992 }],
  },
});