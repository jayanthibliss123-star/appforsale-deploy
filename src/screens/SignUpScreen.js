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
// // } from 'react-native';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { saveUser, setLoggedInUser } from '../utils/authStorage';

// // function InputField({
// //   label,
// //   value,
// //   onChangeText,
// //   placeholder,
// //   secureTextEntry = false,
// //   keyboardType = 'default',
// // }) {
// //   return (
// //     <View style={styles.inputGroup}>
// //       <Text style={styles.label}>{label}</Text>
// //       <TextInput
// //         value={value}
// //         onChangeText={onChangeText}
// //         placeholder={placeholder}
// //         placeholderTextColor="rgba(255,255,255,0.34)"
// //         secureTextEntry={secureTextEntry}
// //         keyboardType={keyboardType}
// //         autoCapitalize="none"
// //         style={styles.input}
// //       />
// //     </View>
// //   );
// // }

// // export default function SignUpScreen({ navigation }) {
// //   const [fullName, setFullName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [mobile, setMobile] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const slideAnim = useRef(new Animated.Value(140)).current;
// //   const fadeAnim = useRef(new Animated.Value(0)).current;
// //   const glowPulse = useRef(new Animated.Value(0.94)).current;
// //   const buttonGlow = useRef(new Animated.Value(0.84)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(slideAnim, {
// //         toValue: 0,
// //         duration: 950,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(fadeAnim, {
// //         toValue: 1,
// //         duration: 1000,
// //         useNativeDriver: true,
// //       }),
// //       Animated.loop(
// //         Animated.sequence([
// //           Animated.timing(glowPulse, {
// //             toValue: 1.08,
// //             duration: 1900,
// //             useNativeDriver: true,
// //           }),
// //           Animated.timing(glowPulse, {
// //             toValue: 0.94,
// //             duration: 1900,
// //             useNativeDriver: true,
// //           }),
// //         ])
// //       ),
// //       Animated.loop(
// //         Animated.sequence([
// //           Animated.timing(buttonGlow, {
// //             toValue: 1,
// //             duration: 1500,
// //             useNativeDriver: true,
// //           }),
// //           Animated.timing(buttonGlow, {
// //             toValue: 0.84,
// //             duration: 1500,
// //             useNativeDriver: true,
// //           }),
// //         ])
// //       ),
// //     ]).start();
// //   }, [slideAnim, fadeAnim, glowPulse, buttonGlow]);

// //   const handleSignUp = async () => {
// //     if (!fullName.trim() || !email.trim() || !mobile.trim() || !password.trim()) {
// //       Alert.alert('Missing Details', 'Please fill all fields.');
// //       return;
// //     }

// //    const user = {
// //   name: fullName.trim() || 'Bliss',
// //   fullName: fullName.trim() || 'Bliss',
// //   email: email.trim().toLowerCase() || 'bliss@example.com',
// //   mobile: mobile.trim(),
// //   phone: mobile.trim(),
// //   password: password.trim(),
// //   role: 'User',
// //   location: 'Hyderabad, India',
// //   company: 'Apps Marketplace',
// //   department: 'Member',
// //   bio: 'Welcome to your account.',
// //   image: null,
// // };

// //     try {
// //       setLoading(true);
// //       await saveUser(user);
// //       await setLoggedInUser(user);

// //       setTimeout(() => {
// //         setLoading(false);
// //         navigation.replace('Home', { user });
// //       }, 700);
// //     } catch (error) {
// //       setLoading(false);
// //       Alert.alert('Error', 'Failed to create account.');
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <StatusBar barStyle="light-content" backgroundColor="#09090C" />

// //       <LinearGradient colors={['#09090C', '#110F12', '#1A1514']} style={styles.container}>
// //         <View style={styles.background} />

// //         <KeyboardAvoidingView
// //           style={styles.keyboardWrap}
// //           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
// //         >
// //           <ScrollView
// //             showsVerticalScrollIndicator={false}
// //             contentContainerStyle={styles.scrollContent}
// //           >
// //             <Animated.View
// //               style={[
// //                 styles.cardOuterWrap,
// //                 {
// //                   opacity: fadeAnim,
// //                   transform: [{ translateY: slideAnim }],
// //                 },
// //               ]}
// //             >
// //               <Animated.View
// //                 style={[
// //                   styles.cardGlowBack,
// //                   {
// //                     opacity: glowPulse.interpolate({
// //                       inputRange: [0.94, 1.08],
// //                       outputRange: [0.5, 0.9],
// //                     }),
// //                     transform: [{ scale: glowPulse }],
// //                   },
// //                 ]}
// //               />

// //               <Animated.View
// //                 style={[
// //                   styles.cardGlowSoft,
// //                   {
// //                     opacity: glowPulse.interpolate({
// //                       inputRange: [0.94, 1.08],
// //                       outputRange: [0.22, 0.4],
// //                     }),
// //                     transform: [{ scale: glowPulse }],
// //                   },
// //                 ]}
// //               />

// //               <LinearGradient
// //                 colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.025)']}
// //                 style={styles.card}
// //               >
// //                 <View style={styles.topShine} />

// //                 <View style={styles.miniTag}>
// //                   <Text style={styles.miniTagText}>Create Account</Text>
// //                 </View>

// //                 <Text style={styles.title}>Sign Up</Text>
// //                 <Text style={styles.subtitle}>
// //                   Create your account and continue with the same premium experience.
// //                 </Text>

// //                 <View style={styles.form}>
// //                   <InputField
// //                     label="Full Name"
// //                     value={fullName}
// //                     onChangeText={setFullName}
// //                     placeholder="Enter your full name"
// //                   />

// //                   <InputField
// //                     label="Email Address"
// //                     value={email}
// //                     onChangeText={setEmail}
// //                     placeholder="Enter your email"
// //                     keyboardType="email-address"
// //                   />

// //                   <InputField
// //                     label="Mobile Number"
// //                     value={mobile}
// //                     onChangeText={setMobile}
// //                     placeholder="Enter your mobile number"
// //                     keyboardType="phone-pad"
// //                   />

// //                   <InputField
// //                     label="Password"
// //                     value={password}
// //                     onChangeText={setPassword}
// //                     placeholder="Create password"
// //                     secureTextEntry
// //                   />

// //                   <Animated.View
// //                     style={[
// //                       styles.buttonGlowWrap,
// //                       {
// //                         opacity: buttonGlow.interpolate({
// //                           inputRange: [0.84, 1],
// //                           outputRange: [0.5, 0.95],
// //                         }),
// //                         transform: [{ scale: buttonGlow }],
// //                       },
// //                     ]}
// //                   >
// //                     <View style={styles.buttonGlowLayer} />
// //                   </Animated.View>

// //                   <Pressable
// //                     onPress={handleSignUp}
// //                     style={({ pressed }) => [
// //                       styles.primaryWrap,
// //                       pressed && styles.buttonPressed,
// //                     ]}
// //                   >
// //                     <LinearGradient
// //                       colors={['#D8A27A', '#B97C51', '#8D593B']}
// //                       start={{ x: 0, y: 0 }}
// //                       end={{ x: 1, y: 1 }}
// //                       style={styles.primaryButton}
// //                     >
// //                       <Text style={styles.primaryButtonText}>
// //                         {loading ? 'Creating Account...' : 'Create Account'}
// //                       </Text>
// //                     </LinearGradient>
// //                   </Pressable>

// //                   <Pressable
// //                     onPress={() => navigation.navigate('SignIn')}
// //                     style={({ pressed }) => [
// //                       styles.secondaryButton,
// //                       pressed && styles.buttonPressed,
// //                     ]}
// //                   >
// //                     <Text style={styles.secondaryButtonText}>
// //                       Already have an account? Sign In
// //                     </Text>
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
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: '#09090C',
// //   },

// //   container: {
// //     flex: 1,
// //   },

// //   background: {
// //     ...StyleSheet.absoluteFillObject,
// //   },

// //   keyboardWrap: {
// //     flex: 1,
// //   },

// //   scrollContent: {
// //     flexGrow: 1,
// //     justifyContent: 'center',
// //     paddingHorizontal: 22,
// //     paddingVertical: 28,
// //   },

// //   cardOuterWrap: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },

// //   cardGlowBack: {
// //     position: 'absolute',
// //     width: '96%',
// //     height: 560,
// //     borderRadius: 34,
// //     backgroundColor: 'rgba(185,124,81,0.14)',
// //     shadowColor: '#C8875B',
// //     shadowOpacity: 0.9,
// //     shadowRadius: 42,
// //     shadowOffset: { width: 0, height: 0 },
// //     elevation: 18,
// //   },

// //   cardGlowSoft: {
// //     position: 'absolute',
// //     width: '88%',
// //     height: 480,
// //     borderRadius: 30,
// //     backgroundColor: 'rgba(255,255,255,0.04)',
// //     shadowColor: '#E0AA82',
// //     shadowOpacity: 0.35,
// //     shadowRadius: 28,
// //     shadowOffset: { width: 0, height: 0 },
// //   },

// //   card: {
// //     width: '100%',
// //     borderRadius: 30,
// //     paddingHorizontal: 22,
// //     paddingVertical: 30,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.09)',
// //     backgroundColor: 'rgba(255,255,255,0.03)',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.28,
// //     shadowRadius: 22,
// //     shadowOffset: { width: 0, height: 12 },
// //     elevation: 14,
// //     overflow: 'hidden',
// //   },

// //   topShine: {
// //     position: 'absolute',
// //     top: 0,
// //     left: '18%',
// //     right: '18%',
// //     height: 1,
// //     backgroundColor: 'rgba(255,255,255,0.16)',
// //   },

// //   miniTag: {
// //     alignSelf: 'flex-start',
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     borderRadius: 999,
// //     marginBottom: 14,
// //     backgroundColor: 'rgba(216,162,122,0.12)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(216,162,122,0.26)',
// //   },

// //   miniTagText: {
// //     color: '#F1D2BC',
// //     fontSize: 11,
// //     fontWeight: '700',
// //     letterSpacing: 0.5,
// //   },

// //   title: {
// //     color: '#FFFFFF',
// //     fontSize: 30,
// //     fontWeight: '800',
// //     marginBottom: 8,
// //   },

// //   subtitle: {
// //     color: 'rgba(255,255,255,0.66)',
// //     fontSize: 14,
// //     lineHeight: 22,
// //     marginBottom: 24,
// //   },

// //   form: {
// //     gap: 14,
// //   },

// //   inputGroup: {
// //     marginBottom: 2,
// //   },

// //   label: {
// //     color: 'rgba(255,255,255,0.72)',
// //     fontSize: 12,
// //     fontWeight: '600',
// //     marginBottom: 8,
// //   },

// //   input: {
// //     minHeight: 54,
// //     borderRadius: 16,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.1)',
// //     backgroundColor: 'rgba(255,255,255,0.045)',
// //     paddingHorizontal: 16,
// //     color: '#FFFFFF',
// //     fontSize: 14,
// //   },

// //   buttonGlowWrap: {
// //     position: 'absolute',
// //     left: 8,
// //     right: 8,
// //     bottom: 62,
// //     height: 64,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     zIndex: 0,
// //   },

// //   buttonGlowLayer: {
// //     width: '94%',
// //     height: 56,
// //     borderRadius: 18,
// //     backgroundColor: 'rgba(216,162,122,0.28)',
// //     shadowColor: '#D69970',
// //     shadowOpacity: 0.9,
// //     shadowRadius: 26,
// //     shadowOffset: { width: 0, height: 0 },
// //     elevation: 14,
// //   },

// //   primaryWrap: {
// //     marginTop: 8,
// //     borderRadius: 16,
// //     overflow: 'hidden',
// //     zIndex: 2,
// //   },

// //   primaryButton: {
// //     minHeight: 54,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     borderRadius: 16,
// //     shadowColor: '#D49B72',
// //     shadowOpacity: 0.45,
// //     shadowRadius: 16,
// //     shadowOffset: { width: 0, height: 0 },
// //     elevation: 12,
// //   },

// //   primaryButtonText: {
// //     color: '#FFFFFF',
// //     fontSize: 15,
// //     fontWeight: '800',
// //     letterSpacing: 0.3,
// //   },

// //   secondaryButton: {
// //     minHeight: 46,
// //     borderRadius: 14,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginTop: 4,
// //   },

// //   secondaryButtonText: {
// //     color: '#E9C9B0',
// //     fontSize: 13,
// //     fontWeight: '700',
// //   },

// //   buttonPressed: {
// //     opacity: 0.92,
// //     transform: [{ scale: 0.995 }],
// //   },
// // });


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
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { saveUser, setLoggedInUser } from '../utils/authStorage';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// function InputField({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   secureTextEntry = false,
//   keyboardType = 'default',
// }) {
//   return (
//     <View style={styles.inputGroup}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="rgba(255,255,255,0.42)"
//         secureTextEntry={secureTextEntry}
//         keyboardType={keyboardType}
//         autoCapitalize="none"
//         style={styles.input}
//       />
//     </View>
//   );
// }

// export default function SignUpScreen({ navigation }) {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
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

//   const handleSignUp = async () => {
//     if (!fullName.trim() || !email.trim() || !mobile.trim() || !password.trim()) {
//       Alert.alert('Missing Details', 'Please fill all fields.');
//       return;
//     }

//     const user = {
//       name: fullName.trim() || 'Bliss',
//       fullName: fullName.trim() || 'Bliss',
//       email: email.trim().toLowerCase() || 'bliss@example.com',
//       mobile: mobile.trim(),
//       phone: mobile.trim(),
//       password: password.trim(),
//       role: 'User',
//       location: 'Hyderabad, India',
//       company: 'Apps Marketplace',
//       department: 'Member',
//       bio: 'Welcome to your account.',
//       image: null,
//     };

//     try {
//       setLoading(true);
//       await saveUser(user);
//       await setLoggedInUser(user);

//       setTimeout(() => {
//         setLoading(false);
//         navigation.replace('Home', { user });
//       }, 700);
//     } catch (error) {
//       setLoading(false);
//       Alert.alert('Error', 'Failed to create account.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />

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
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//           >
//             <Animated.View
//               style={[
//                 styles.cardOuterWrap,
//                 {
//                   opacity: fadeAnim,
//                   transform: [{ translateY: slideAnim }, { scale: cardBreath }],
//                 },
//               ]}
//             >
//               <Animated.View
//                 style={[
//                   styles.cardGlowBack,
//                   {
//                     opacity: glowPulse.interpolate({
//                       inputRange: [0.96, 1.04],
//                       outputRange: [0.34, 0.68],
//                     }),
//                     transform: [{ scale: glowPulse }],
//                   },
//                 ]}
//               />

//               <Animated.View
//                 style={[
//                   styles.cardGlowSoft,
//                   {
//                     opacity: glowPulse.interpolate({
//                       inputRange: [0.96, 1.04],
//                       outputRange: [0.16, 0.28],
//                     }),
//                     transform: [{ scale: glowPulse }],
//                   },
//                 ]}
//               />

//               <LinearGradient
//                 colors={[
//                   'rgba(255,255,255,0.12)',
//                   'rgba(255,255,255,0.05)',
//                   'rgba(255,255,255,0.02)',
//                 ]}
//                 style={styles.card}
//               >
//                 <View style={styles.cardGlassOverlay} />
//                 <View style={styles.topShine} />

//                 <View style={styles.miniTag}>
//                   <Text style={styles.miniTagText}>Create Account</Text>
//                 </View>

//                 <Text style={styles.title}>Sign Up</Text>
//                 <Text style={styles.subtitle}>
//                   Create your account and continue with the same premium experience.
//                 </Text>

//                 <View style={styles.form}>
//                   <InputField
//                     label="Full Name"
//                     value={fullName}
//                     onChangeText={setFullName}
//                     placeholder="Enter your full name"
//                   />

//                   <InputField
//                     label="Email Address"
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholder="Enter your email"
//                     keyboardType="email-address"
//                   />

//                   <InputField
//                     label="Mobile Number"
//                     value={mobile}
//                     onChangeText={setMobile}
//                     placeholder="Enter your mobile number"
//                     keyboardType="phone-pad"
//                   />

//                   <InputField
//                     label="Password"
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Create password"
//                     secureTextEntry
//                   />

//                   <Animated.View
//                     style={[
//                       styles.buttonGlowWrap,
//                       {
//                         opacity: buttonGlow.interpolate({
//                           inputRange: [0.92, 1],
//                           outputRange: [0.30, 0.56],
//                         }),
//                         transform: [{ scale: buttonGlow }],
//                       },
//                     ]}
//                   >
//                     <View style={styles.buttonGlowLayer} />
//                   </Animated.View>

//                   <Pressable
//                     onPress={handleSignUp}
//                     style={({ pressed }) => [
//                       styles.primaryWrap,
//                       pressed && styles.buttonPressed,
//                     ]}
//                   >
//                     <LinearGradient
//                       colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 0 }}
//                       style={styles.primaryButton}
//                     >
//                       <View style={styles.buttonTopShine} />
//                       <Animated.View
//                         style={[
//                           styles.buttonSweep,
//                           { transform: [{ translateX: shineMove }, { rotate: '18deg' }] },
//                         ]}
//                       />
//                       <Text style={styles.primaryButtonText}>
//                         {loading ? 'Creating Account...' : 'Create Account'}
//                       </Text>
//                     </LinearGradient>
//                   </Pressable>

//                   <Pressable
//                     onPress={() => navigation.navigate('SignIn')}
//                     style={({ pressed }) => [
//                       styles.secondaryButton,
//                       pressed && styles.buttonPressed,
//                     ]}
//                   >
//                     <Text style={styles.secondaryButtonText}>
//                       Already have an account? Sign In
//                     </Text>
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
//   },

//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 22,
//     paddingVertical: 28,
//   },

//   cardOuterWrap: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   cardGlowBack: {
//     position: 'absolute',
//     width: '97%',
//     height: Math.min(610, SCREEN_HEIGHT * 0.65),
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
//     height: Math.min(530, SCREEN_HEIGHT * 0.57),
//     borderRadius: 34,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     shadowColor: '#E95CFF',
//     shadowOpacity: 0.10,
//     shadowRadius: 18,
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

//   buttonGlowLayer: {
//     width: '95%',
//     height: 58,
//     borderRadius: 18,
//     backgroundColor: 'rgba(233, 92, 255, 0.16)',
//     shadowColor: '#E95CFF',
//     shadowOpacity: 0.42,
//     shadowRadius: 18,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 10,
//   },

//   primaryWrap: {
//     marginTop: 10,
//     borderRadius: 18,
//     overflow: 'hidden',
//     zIndex: 2,
//   },

//   primaryButton: {
//     minHeight: 58,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 18,
//     shadowColor: '#E95CFF',
//     shadowOpacity: 0.2,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 7,
//     overflow: 'hidden',
//   },

//   buttonTopShine: {
//     position: 'absolute',
//     top: 0,
//     left: 10,
//     right: 10,
//     height: 1.4,
//     backgroundColor: 'rgba(255,255,255,0.48)',
//   },

//   buttonSweep: {
//     position: 'absolute',
//     top: -8,
//     width: 52,
//     height: 84,
//     backgroundColor: 'rgba(255,255,255,0.14)',
//   },

//   primaryButtonText: {
//     color: '#FFFFFF',
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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { saveUser, setLoggedInUser } from '../utils/authStorage';
import { signUpApi } from '../utils/apiService';

// ─────────────────────────────────────────────
// Reusable Input Field (except password)
// ─────────────────────────────────────────────
function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error = '',
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.42)"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.input, error ? styles.inputError : null]}
      />
      {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}
    </View>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────
export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName]       = useState('');
  const [email, setEmail]             = useState('');
  const [mobile, setMobile]           = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);

  // Field-level errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
  });

  // ── Animations ──────────────────────────────
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
    const newErrors = { fullName: '', email: '', mobile: '', password: '' };
    let valid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must have at least one letter and one number';
      valid = false;
    } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      newErrors.password = 'Password must have at least one special character (!@#$%^&*)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ── Handle Sign Up ──────────────────────────
  const handleSignUp = async () => {
    // 1. Local validation first
    if (!validateLocally()) return;

    try {
      setLoading(true);
      setErrors({ fullName: '', email: '', mobile: '', password: '' });

      // 2. Call backend API
      const data = await signUpApi({
        fullName: fullName.trim(),
        email:    email.trim().toLowerCase(),
        mobile:   mobile.trim(),
        password: password.trim(),
      });

      // 3. Save user locally
      await saveUser(data.user);
      await setLoggedInUser(data.user);

      setLoading(false);

      // 4. ✅ Success Alert → go to SignIn
      Alert.alert(
        '🎉 Account Created!',
        'Your account has been created successfully.\nPlease sign in to continue.',
        [
          {
            text: 'Sign In',
            onPress: () => navigation.replace('SignIn'),
          },
        ],
        { cancelable: false }
      );

    } catch (error) {
      setLoading(false);

      // 5. Show backend field errors inline
      if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...error.fieldErrors }));
      } else {
        Alert.alert('Sign Up Failed', error.message);
      }
    }
  };

  // ───────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141B27" />

      <LinearGradient
        colors={['#141B27', '#212C3D', '#182130']}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.keyboardWrap}
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
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
                  <Text style={styles.miniTagText}>Create Account</Text>
                </View>

                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>
                  Create your account and continue with the same premium experience.
                </Text>

                <View style={styles.form}>

                  {/* Full Name */}
                  <InputField
                    label="Full Name"
                    value={fullName}
                    onChangeText={(v) => {
                      setFullName(v);
                      setErrors(e => ({ ...e, fullName: '' }));
                    }}
                    placeholder="Enter your full name"
                    error={errors.fullName}
                  />

                  {/* Email */}
                  <InputField
                    label="Email Address"
                    value={email}
                    onChangeText={(v) => {
                      setEmail(v);
                      setErrors(e => ({ ...e, email: '' }));
                    }}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    error={errors.email}
                  />

                  {/* Mobile */}
                  <InputField
                    label="Mobile Number"
                    value={mobile}
                    onChangeText={(v) => {
                      setMobile(v);
                      setErrors(e => ({ ...e, mobile: '' }));
                    }}
                    placeholder="Enter your mobile number"
                    keyboardType="phone-pad"
                    error={errors.mobile}
                  />

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
                        placeholder="Create password"
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
                    {/* Password hint */}
                    {!errors.password && password.length === 0 && (
                      <Text style={styles.hintText}>
                        Min 6 chars • letters + numbers + symbol (!@#$%^&*)
                      </Text>
                    )}
                  </View>

                  {/* Button Glow */}
                  <Animated.View
                    style={[styles.buttonGlowWrap, {
                      opacity: buttonGlow.interpolate({
                        inputRange: [0.92, 1],
                        outputRange: [0.30, 0.56],
                      }),
                      transform: [{ scale: buttonGlow }],
                    }]}
                  >
                    <View style={styles.buttonGlowLayer} />
                  </Animated.View>

                  {/* Create Account Button */}
                  <Pressable
                    onPress={handleSignUp}
                    disabled={loading}
                    style={({ pressed }) => [
                      styles.primaryWrap,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <LinearGradient
                      colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.primaryButton}
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
                        : <Text style={styles.primaryButtonText}>Create Account</Text>
                      }
                    </LinearGradient>
                  </Pressable>

                  {/* Already have account */}
                  <Pressable
                    onPress={() => navigation.navigate('SignIn')}
                    style={({ pressed }) => [
                      styles.secondaryButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.secondaryButtonText}>
                      Already have an account? Sign In
                    </Text>
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

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea:      { flex: 1, backgroundColor: '#141B27' },
  container:     { flex: 1 },
  keyboardWrap:  { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 28,
  },

  cardOuterWrap: { justifyContent: 'center', alignItems: 'center' },

  cardGlowBack: {
    position: 'absolute',
    width: '97%',
    height: 700,
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
    height: 620,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.03)',
    shadowColor: '#E95CFF',
    shadowOpacity: 0.10,
    shadowRadius: 18,
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

  inputGroup:  { marginBottom: 2 },
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
  hintText: {
    color: 'rgba(255,255,255,0.38)',
    fontSize: 11,
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
    shadowColor: '#D92CFF',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  primaryWrap: {
    marginTop: 10,
    borderRadius: 18,
    overflow: 'hidden',
    zIndex: 2,
  },
  primaryButton: {
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
  primaryButtonText: {
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
});