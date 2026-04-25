// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Pressable,
//   Animated,
//   Easing,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonHeader from '../components/common/CommonHeader';
// import CommonFooter from '../components/CommonFooter';

// function ContactCard({ title, value, sub, animatedStyle }) {
//   return (
//     <Animated.View style={animatedStyle}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//         style={styles.infoCard}
//       >
//         <Text style={styles.infoCardTitle}>{title}</Text>
//         <Text style={styles.infoCardValue}>{value}</Text>
//         {!!sub && <Text style={styles.infoCardSub}>{sub}</Text>}
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// function InputField({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   multiline = false,
//   keyboardType = 'default',
// }) {
//   return (
//     <View style={styles.inputWrap}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="rgba(255,255,255,0.35)"
//         multiline={multiline}
//         keyboardType={keyboardType}
//         style={[styles.input, multiline && styles.textArea]}
//       />
//     </View>
//   );
// }

// function ActionButton({ title, onPress, primary = false, disabled = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       disabled={disabled}
//       style={({ pressed }) => [
//         styles.actionButton,
//         primary ? styles.actionButtonPrimary : styles.actionButtonSecondary,
//         disabled && styles.actionButtonDisabled,
//         pressed && !disabled && styles.buttonPressed,
//       ]}
//     >
//       <Text
//         style={[
//           styles.actionButtonText,
//           primary ? styles.actionButtonTextPrimary : styles.actionButtonTextSecondary,
//         ]}
//       >
//         {title}
//       </Text>
//     </Pressable>
//   );
// }

// export default function ContactScreen({ navigation, route }) {
//   const app = route?.params?.app || null;
//   const inquiryType = route?.params?.inquiryType || '';

//   const initialSubject = useMemo(() => {
//     if (inquiryType) return inquiryType;
//     if (app?.title) return `Inquiry about ${app.title}`;
//     return '';
//   }, [app, inquiryType]);

//   const initialMessage = useMemo(() => {
//     if (inquiryType === 'Request Demo') {
//       return 'Hi, I would like to request a demo for your app solutions.';
//     }
//     if (inquiryType === 'Custom Project') {
//       return 'Hi, I would like to discuss a custom project requirement.';
//     }
//     if (inquiryType === 'Sales Inquiry') {
//       return 'Hi, I would like to know more about pricing and sales details.';
//     }
//     if (app?.title) {
//       return `Hi, I would like to know more about ${app.title}.`;
//     }
//     return '';
//   }, [app, inquiryType]);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [subject, setSubject] = useState(initialSubject);
//   const [message, setMessage] = useState(initialMessage);

//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [enquiryId, setEnquiryId] = useState('');
//   const [submittedAt, setSubmittedAt] = useState('');
//   const [submittedData, setSubmittedData] = useState(null);
//   const [formError, setFormError] = useState('');

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const heroAnim = useRef(new Animated.Value(0)).current;
//   const infoCard1Anim = useRef(new Animated.Value(0)).current;
//   const infoCard2Anim = useRef(new Animated.Value(0)).current;
//   const infoCard3Anim = useRef(new Animated.Value(0)).current;
//   const highlightAnim = useRef(new Animated.Value(0)).current;
//   const formAnim = useRef(new Animated.Value(0)).current;
//   const footerAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     setSubject(initialSubject);
//     setMessage(initialMessage);
//   }, [initialSubject, initialMessage]);

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.timing(headerAnim, {
//         toValue: 1,
//         duration: 280,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(heroAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.stagger(100, [
//         Animated.timing(infoCard1Anim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(infoCard2Anim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(infoCard3Anim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(highlightAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(formAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(footerAnim, {
//         toValue: 1,
//         duration: 280,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]);

//     intro.start();

//     return () => {
//       intro.stop();
//     };
//   }, [
//     headerAnim,
//     heroAnim,
//     infoCard1Anim,
//     infoCard2Anim,
//     infoCard3Anim,
//     highlightAnim,
//     formAnim,
//     footerAnim,
//   ]);

//   const fadeUp = (anim, distance = 18, fromScale = 0.985) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [distance, 0],
//         }),
//       },
//       {
//         scale: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [fromScale, 1],
//         }),
//       },
//     ],
//   });

//   const resetForm = () => {
//     setName('');
//     setEmail('');
//     setMobile('');
//     setSubject(initialSubject);
//     setMessage(initialMessage);
//     setFormError('');
//   };

//   const handleSubmit = () => {
//     if (!name.trim()) {
//       setFormError('Please enter your full name.');
//       return;
//     }
//     if (!email.trim()) {
//       setFormError('Please enter your email address.');
//       return;
//     }
//     if (!mobile.trim()) {
//       setFormError('Please enter your mobile number.');
//       return;
//     }
//     if (!message.trim()) {
//       setFormError('Please enter your message.');
//       return;
//     }

//     setFormError('');
//     setSubmitting(true);

//     const generatedId = `ENQ-${Date.now()}`;
//     const now = new Date();
//     const formattedDate = now.toLocaleString();

//     setTimeout(() => {
//       setSubmitting(false);
//       setSubmitted(true);
//       setEnquiryId(generatedId);
//       setSubmittedAt(formattedDate);
//       setSubmittedData({
//         name: name.trim(),
//         email: email.trim(),
//         mobile: mobile.trim(),
//         subject: subject.trim(),
//         message: message.trim(),
//       });
//       resetForm();
//     }, 900);
//   };

//   const handleSubmitAnother = () => {
//     setSubmitted(false);
//     setEnquiryId('');
//     setSubmittedAt('');
//     setSubmittedData(null);
//     resetForm();
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >
//         <Animated.View style={fadeUp(headerAnim, 10, 1)}>
//           <CommonHeader
//             navigation={navigation}
//             title="Contact Us"
//             subtitle="Talk to our team"
//             showBack
//             rightLabel="Apps"
//             onRightPress={() => navigation.navigate('Apps')}
//             onNotificationPress={() => {}}
//             onProfilePress={() => navigation.navigate('Profile')}
//           />
//         </Animated.View>

//         <Animated.View style={fadeUp(heroAnim, 18, 0.985)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.025)']}
//             style={styles.heroCard}
//           >
//             <View style={styles.heroChip}>
//               <Text style={styles.heroChipText}>GET IN TOUCH</Text>
//             </View>

//             <Text style={styles.heroTitle}>
//               Let’s build your next{'\n'}premium app experience
//             </Text>

//             <Text style={styles.heroSubtitle}>
//               Reach out for demos, pricing, custom projects, app inquiries, and
//               product discussions. We help businesses launch cleaner, stronger, and
//               more polished digital products.
//             </Text>

//             <View style={styles.heroButtons}>
//               <ActionButton
//                 title="Browse Apps"
//                 onPress={() => navigation.navigate('Apps')}
//                 primary
//               />
//               <ActionButton
//                 title="View Profile"
//                 onPress={() => navigation.navigate('Profile')}
//               />
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <View style={styles.infoGrid}>
//           <ContactCard
//             title="Email"
//             value="blissierra177@gmail.com"
//             sub="For more product inquiries and demos"
//             animatedStyle={fadeUp(infoCard1Anim, 16, 0.99)}
//           />
//           <ContactCard
//             title="Phone"
//             value="9966218737"
//             sub="Mon - Sat, business hours"
//             animatedStyle={fadeUp(infoCard2Anim, 16, 0.99)}
//           />
//           <ContactCard
//             title="Location"
//             value="Plot N0 49,50,Flat No 402,Neelakanta Nilayam,kakatiya Hills,Road no 9,sy No-32,Guttalabegumpet,Madhapur,Hyderabad-500081"
//             sub="Serving clients across industries"
//             animatedStyle={fadeUp(infoCard3Anim, 16, 0.99)}
//           />
//         </View>

//         <Animated.View style={fadeUp(highlightAnim, 18, 0.99)}>
//           <LinearGradient
//             colors={['rgba(184,122,86,0.12)', 'rgba(255,255,255,0.025)']}
//             style={styles.highlightCard}
//           >
//             <Text style={styles.highlightEyebrow}>WHY CONTACT US</Text>
//             <Text style={styles.highlightTitle}>More than just a simple inquiry form</Text>
//             <Text style={styles.highlightText}>
//               Tell us whether you need a ready-made app, a custom business solution,
//               or a premium redesign for your digital product. We can help you shape
//               a cleaner and more conversion-focused experience.
//             </Text>

//             <View style={styles.tagRow}>
//               <View style={styles.tag}>
//                 <Text style={styles.tagText}>Custom Projects</Text>
//               </View>
//               <View style={styles.tag}>
//                 <Text style={styles.tagText}>Business Apps</Text>
//               </View>
//               <View style={styles.tag}>
//                 <Text style={styles.tagText}>Product Demos</Text>
//               </View>
//             </View>
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(formAnim, 20, 0.99)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//             style={styles.formCard}
//           >
//             {!submitted ? (
//               <>
//                 <Text style={styles.formTitle}>Send Inquiry</Text>

//                 <InputField
//                   label="Full Name"
//                   value={name}
//                   onChangeText={setName}
//                   placeholder="Enter your full name"
//                 />

//                 <InputField
//                   label="Email Address"
//                   value={email}
//                   onChangeText={setEmail}
//                   placeholder="Enter your email"
//                   keyboardType="email-address"
//                 />

//                 <InputField
//                   label="Mobile Number"
//                   value={mobile}
//                   onChangeText={setMobile}
//                   placeholder="Enter your mobile number"
//                   keyboardType="phone-pad"
//                 />

//                 <InputField
//                   label="Subject"
//                   value={subject}
//                   onChangeText={setSubject}
//                   placeholder="Enter inquiry subject"
//                 />

//                 <InputField
//                   label="Message"
//                   value={message}
//                   onChangeText={setMessage}
//                   placeholder="Tell us what you need"
//                   multiline
//                 />

//                 {!!formError && (
//                   <View style={styles.errorBox}>
//                     <Text style={styles.errorText}>{formError}</Text>
//                   </View>
//                 )}

//                 <Pressable
//                   onPress={handleSubmit}
//                   disabled={submitting}
//                   style={({ pressed }) => [
//                     styles.submitWrap,
//                     pressed && !submitting && styles.buttonPressed,
//                     submitting && styles.submitWrapDisabled,
//                   ]}
//                 >
//                   <LinearGradient
//                     colors={[COLORS.primarySoft, COLORS.primary]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={styles.submitButton}
//                   >
//                     <Text style={styles.submitButtonText}>
//                       {submitting ? 'Submitting...' : 'Submit Inquiry'}
//                     </Text>
//                   </LinearGradient>
//                 </Pressable>
//               </>
//             ) : (
//               <View style={styles.successCard}>
//                 <View style={styles.successBadge}>
//                   <Text style={styles.successBadgeText}>ENQUIRY SUBMITTED</Text>
//                 </View>

//                 <Text style={styles.successTitle}>Your inquiry has been received</Text>
//                 <Text style={styles.successSubtitle}>
//                   Our team will review your request and get back to you soon.
//                 </Text>

//                 <View style={styles.successInfoBox}>
//                   <View style={styles.successInfoRow}>
//                     <Text style={styles.successInfoLabel}>Enquiry ID</Text>
//                     <Text style={styles.successInfoValue}>{enquiryId}</Text>
//                   </View>

//                   <View style={styles.successDivider} />

//                   <View style={styles.successInfoRow}>
//                     <Text style={styles.successInfoLabel}>Status</Text>
//                     <Text style={styles.successInfoValue}>Pending Review</Text>
//                   </View>

//                   <View style={styles.successDivider} />

//                   <View style={styles.successInfoRow}>
//                     <Text style={styles.successInfoLabel}>Submitted At</Text>
//                     <Text style={styles.successInfoValue}>{submittedAt}</Text>
//                   </View>

//                   {submittedData?.email ? (
//                     <>
//                       <View style={styles.successDivider} />
//                       <View style={styles.successInfoRow}>
//                         <Text style={styles.successInfoLabel}>Email</Text>
//                         <Text style={styles.successInfoValue}>{submittedData.email}</Text>
//                       </View>
//                     </>
//                   ) : null}

//                   {submittedData?.mobile ? (
//                     <>
//                       <View style={styles.successDivider} />
//                       <View style={styles.successInfoRow}>
//                         <Text style={styles.successInfoLabel}>Phone</Text>
//                         <Text style={styles.successInfoValue}>{submittedData.mobile}</Text>
//                       </View>
//                     </>
//                   ) : null}
//                 </View>

//                 <View style={styles.successActions}>
//                   <ActionButton
//                     title="Submit Another Inquiry"
//                     onPress={handleSubmitAnother}
//                     primary
//                   />
//                   <ActionButton
//                     title="Back to Home"
//                     onPress={() => navigation.navigate('Home')}
//                   />
//                 </View>
//               </View>
//             )}
//           </LinearGradient>
//         </Animated.View>

//         <Animated.View style={fadeUp(footerAnim, 12, 1)}>
//           <CommonFooter navigation={navigation} app={app} />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 44,
//     backgroundColor: COLORS.background,
//   },

//   heroCard: {
//     borderRadius: 26,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 20,
//     marginBottom: 16,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//   },

//   heroChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(184,122,86,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 12,
//   },

//   heroChipText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },

//   heroTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 28,
//     fontWeight: '800',
//     lineHeight: 34,
//     marginBottom: 10,
//   },

//   heroSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 21,
//     marginBottom: 16,
//   },

//   heroButtons: {
//     gap: 10,
//   },

//   actionButton: {
//     minHeight: 48,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },

//   actionButtonPrimary: {
//     backgroundColor: COLORS.primary,
//   },

//   actionButtonSecondary: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },

//   actionButtonDisabled: {
//     opacity: 0.7,
//   },

//   actionButtonText: {
//     fontSize: 14,
//     fontWeight: '700',
//   },

//   actionButtonTextPrimary: {
//     color: COLORS.textDark,
//   },

//   actionButtonTextSecondary: {
//     color: COLORS.textPrimary,
//   },

//   infoGrid: {
//     gap: 12,
//     marginBottom: 16,
//   },

//   infoCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//   },

//   infoCardTitle: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     marginBottom: 6,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },

//   infoCardValue: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 6,
//   },

//   infoCardSub: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },

//   highlightCard: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     padding: 18,
//     marginBottom: 16,
//   },

//   highlightEyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },

//   highlightTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 28,
//     marginBottom: 10,
//   },

//   highlightText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 14,
//   },

//   tagRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },

//   tag: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },

//   tagText: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '600',
//   },

//   formCard: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },

//   formTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 21,
//     fontWeight: '800',
//     marginBottom: 16,
//   },

//   inputWrap: {
//     marginBottom: 14,
//   },

//   inputLabel: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//     marginBottom: 8,
//   },

//   input: {
//     minHeight: 52,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     color: COLORS.textPrimary,
//     paddingHorizontal: 14,
//     fontSize: 14,
//   },

//   textArea: {
//     minHeight: 110,
//     paddingTop: 12,
//     textAlignVertical: 'top',
//   },

//   errorBox: {
//     backgroundColor: 'rgba(255,120,120,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,120,120,0.20)',
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginTop: 2,
//     marginBottom: 8,
//   },

//   errorText: {
//     color: '#FFB3B3',
//     fontSize: 12,
//     lineHeight: 18,
//     fontWeight: '600',
//   },

//   submitWrap: {
//     marginTop: 8,
//     borderRadius: 16,
//     overflow: 'hidden',
//   },

//   submitWrapDisabled: {
//     opacity: 0.8,
//   },

//   submitButton: {
//     minHeight: 52,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   submitButtonText: {
//     color: COLORS.textDark,
//     fontSize: 14,
//     fontWeight: '800',
//   },

//   successCard: {
//     paddingTop: 2,
//   },

//   successBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 12,
//   },

//   successBadgeText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '800',
//     letterSpacing: 0.8,
//   },

//   successTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 24,
//     fontWeight: '800',
//     lineHeight: 30,
//     marginBottom: 8,
//   },

//   successSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 16,
//   },

//   successInfoBox: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 18,
//     padding: 14,
//     marginBottom: 16,
//   },

//   successInfoRow: {
//     gap: 4,
//   },

//   successInfoLabel: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     fontWeight: '700',
//   },

//   successInfoValue: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '700',
//     lineHeight: 20,
//   },

//   successDivider: {
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     marginVertical: 12,
//   },

//   successActions: {
//     gap: 10,
//   },

//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },
// });

// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Pressable,
//   Animated,
//   Easing,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonHeader from '../components/common/CommonHeader';
// import CommonFooter from '../components/CommonFooter';

// function ContactCard({ title, value, sub, animatedStyle }) {
//   return (
//     <Animated.View style={animatedStyle}>
//       <LinearGradient
//         colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
//         style={styles.infoCard}
//       >
//         <Text style={styles.infoCardTitle}>{title}</Text>
//         <Text style={styles.infoCardValue}>{value}</Text>
//         {!!sub && <Text style={styles.infoCardSub}>{sub}</Text>}
//       </LinearGradient>
//     </Animated.View>
//   );
// }

// function InputField({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   multiline = false,
//   keyboardType = 'default',
// }) {
//   return (
//     <View style={styles.inputWrap}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="rgba(255,255,255,0.35)"
//         multiline={multiline}
//         keyboardType={keyboardType}
//         style={[styles.input, multiline && styles.textArea]}
//       />
//     </View>
//   );
// }

// function ActionButton({ title, onPress, primary = false, disabled = false }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       disabled={disabled}
//       style={({ pressed }) => [
//         styles.actionButton,
//         primary ? styles.actionButtonPrimary : styles.actionButtonSecondary,
//         disabled && styles.actionButtonDisabled,
//         pressed && !disabled && styles.buttonPressed,
//       ]}
//     >
//       <Text
//         style={[
//           styles.actionButtonText,
//           primary ? styles.actionButtonTextPrimary : styles.actionButtonTextSecondary,
//         ]}
//       >
//         {title}
//       </Text>
//     </Pressable>
//   );
// }

// export default function ContactScreen({ navigation, route }) {
//   const app = route?.params?.app || null;
//   const inquiryType = route?.params?.inquiryType || '';

//   const initialSubject = useMemo(() => {
//     if (inquiryType) return inquiryType;
//     if (app?.title) return `Inquiry about ${app.title}`;
//     return '';
//   }, [app, inquiryType]);

//   const initialMessage = useMemo(() => {
//     if (inquiryType === 'Request Demo') {
//       return 'Hi, I would like to request a demo for your app solutions.';
//     }
//     if (inquiryType === 'Custom Project') {
//       return 'Hi, I would like to discuss a custom project requirement.';
//     }
//     if (inquiryType === 'Sales Inquiry') {
//       return 'Hi, I would like to know more about pricing and sales details.';
//     }
//     if (app?.title) {
//       return `Hi, I would like to know more about ${app.title}.`;
//     }
//     return '';
//   }, [app, inquiryType]);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [subject, setSubject] = useState(initialSubject);
//   const [message, setMessage] = useState(initialMessage);

//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [enquiryId, setEnquiryId] = useState('');
//   const [submittedAt, setSubmittedAt] = useState('');
//   const [submittedData, setSubmittedData] = useState(null);
//   const [formError, setFormError] = useState('');

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const heroAnim = useRef(new Animated.Value(0)).current;
//   const infoCard1Anim = useRef(new Animated.Value(0)).current;
//   const infoCard2Anim = useRef(new Animated.Value(0)).current;
//   const infoCard3Anim = useRef(new Animated.Value(0)).current;
//   const highlightAnim = useRef(new Animated.Value(0)).current;
//   const formAnim = useRef(new Animated.Value(0)).current;
//   const footerAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     setSubject(initialSubject);
//     setMessage(initialMessage);
//   }, [initialSubject, initialMessage]);

//   useEffect(() => {
//     const intro = Animated.sequence([
//       Animated.timing(headerAnim, {
//         toValue: 1,
//         duration: 280,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(heroAnim, {
//         toValue: 1,
//         duration: 360,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.stagger(100, [
//         Animated.timing(infoCard1Anim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(infoCard2Anim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(infoCard3Anim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(highlightAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(formAnim, {
//         toValue: 1,
//         duration: 380,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(footerAnim, {
//         toValue: 1,
//         duration: 280,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]);

//     intro.start();

//     return () => {
//       intro.stop();
//     };
//   }, [
//     headerAnim,
//     heroAnim,
//     infoCard1Anim,
//     infoCard2Anim,
//     infoCard3Anim,
//     highlightAnim,
//     formAnim,
//     footerAnim,
//   ]);

//   const fadeUp = (anim, distance = 18, fromScale = 0.985) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [distance, 0],
//         }),
//       },
//       {
//         scale: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [fromScale, 1],
//         }),
//       },
//     ],
//   });

//   const resetForm = () => {
//     setName('');
//     setEmail('');
//     setMobile('');
//     setSubject(initialSubject);
//     setMessage(initialMessage);
//     setFormError('');
//   };

//   const handleSubmit = () => {
//     if (!name.trim()) {
//       setFormError('Please enter your full name.');
//       return;
//     }
//     if (!email.trim()) {
//       setFormError('Please enter your email address.');
//       return;
//     }
//     if (!mobile.trim()) {
//       setFormError('Please enter your mobile number.');
//       return;
//     }
//     if (!message.trim()) {
//       setFormError('Please enter your message.');
//       return;
//     }

//     setFormError('');
//     setSubmitting(true);

//     const generatedId = `ENQ-${Date.now()}`;
//     const now = new Date();
//     const formattedDate = now.toLocaleString();

//     setTimeout(() => {
//       setSubmitting(false);
//       setSubmitted(true);
//       setEnquiryId(generatedId);
//       setSubmittedAt(formattedDate);
//       setSubmittedData({
//         name: name.trim(),
//         email: email.trim(),
//         mobile: mobile.trim(),
//         subject: subject.trim(),
//         message: message.trim(),
//       });
//       resetForm();
//     }, 900);
//   };

//   const handleSubmitAnother = () => {
//     setSubmitted(false);
//     setEnquiryId('');
//     setSubmittedAt('');
//     setSubmittedData(null);
//     resetForm();
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#141B27" />

//       <CommonHeader
//               navigation={navigation}
//               title="Contact Us"
//               subtitle="Talk to our team"
//               showBack
//               rightLabel="Apps"
//               onRightPress={() => navigation.navigate('Apps')}
//               onNotificationPress={() => {}}
//               onProfilePress={() => navigation.navigate('Profile')}
//             />
//       <LinearGradient
//         colors={['#141B27', '#212C3D', '#182130']}
//         style={styles.pageBg}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//         >

//           <Animated.View style={fadeUp(heroAnim, 18, 0.985)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.025)']}
//               style={styles.heroCard}
//             >
//               <View style={styles.heroChip}>
//                 <Text style={styles.heroChipText}>GET IN TOUCH</Text>
//               </View>

//               <Text style={styles.heroTitle}>
//                 Let’s build your next{'\n'}premium app experience
//               </Text>

//               <Text style={styles.heroSubtitle}>
//                 Reach out for demos, pricing, custom projects, app inquiries, and
//                 product discussions. We help businesses launch cleaner, stronger, and
//                 more polished digital products.
//               </Text>

//               <View style={styles.heroButtons}>
//                 <ActionButton
//                   title="Browse Apps"
//                   onPress={() => navigation.navigate('Apps')}
//                   primary
//                 />
//                 <ActionButton
//                   title="View Profile"
//                   onPress={() => navigation.navigate('Profile')}
//                 />
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <View style={styles.infoGrid}>
//             <ContactCard
//               title="Email"
//               value="blissierra177@gmail.com"
//               sub="For more product inquiries and demos"
//               animatedStyle={fadeUp(infoCard1Anim, 16, 0.99)}
//             />
//             <ContactCard
//               title="Phone"
//               value="9966218737"
//               sub="Mon - Sat, business hours"
//               animatedStyle={fadeUp(infoCard2Anim, 16, 0.99)}
//             />
//             <ContactCard
//               title="Location"
//               value="Plot N0 49,50,Flat No 402,Neelakanta Nilayam,kakatiya Hills,Road no 9,sy No-32,Guttalabegumpet,Madhapur,Hyderabad-500081"
//               sub="Serving clients across industries"
//               animatedStyle={fadeUp(infoCard3Anim, 16, 0.99)}
//             />
//           </View>

//           <Animated.View style={fadeUp(highlightAnim, 18, 0.99)}>
//             <LinearGradient
//               colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.025)']}
//               style={styles.highlightCard}
//             >
//               <Text style={styles.highlightEyebrow}>WHY CONTACT US</Text>
//               <Text style={styles.highlightTitle}>More than just a simple inquiry form</Text>
//               <Text style={styles.highlightText}>
//                 Tell us whether you need a ready-made app, a custom business solution,
//                 or a premium redesign for your digital product. We can help you shape
//                 a cleaner and more conversion-focused experience.
//               </Text>

//               <View style={styles.tagRow}>
//                 <View style={styles.tag}>
//                   <Text style={styles.tagText}>Custom Projects</Text>
//                 </View>
//                 <View style={styles.tag}>
//                   <Text style={styles.tagText}>Business Apps</Text>
//                 </View>
//                 <View style={styles.tag}>
//                   <Text style={styles.tagText}>Product Demos</Text>
//                 </View>
//               </View>
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(formAnim, 20, 0.99)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//               style={styles.formCard}
//             >
//               {!submitted ? (
//                 <>
//                   <Text style={styles.formTitle}>Send Inquiry</Text>

//                   <InputField
//                     label="Full Name"
//                     value={name}
//                     onChangeText={setName}
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
//                     label="Subject"
//                     value={subject}
//                     onChangeText={setSubject}
//                     placeholder="Enter inquiry subject"
//                   />

//                   <InputField
//                     label="Message"
//                     value={message}
//                     onChangeText={setMessage}
//                     placeholder="Tell us what you need"
//                     multiline
//                   />

//                   {!!formError && (
//                     <View style={styles.errorBox}>
//                       <Text style={styles.errorText}>{formError}</Text>
//                     </View>
//                   )}

//                   <Pressable
//                     onPress={handleSubmit}
//                     disabled={submitting}
//                     style={({ pressed }) => [
//                       styles.submitWrap,
//                       pressed && !submitting && styles.buttonPressed,
//                       submitting && styles.submitWrapDisabled,
//                     ]}
//                   >
//                     <LinearGradient
//                       colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       style={styles.submitButton}
//                     >
//                       <View style={styles.buttonTopShine} />
//                       <Text style={styles.submitButtonText}>
//                         {submitting ? 'Submitting...' : 'Submit Inquiry'}
//                       </Text>
//                     </LinearGradient>
//                   </Pressable>
//                 </>
//               ) : (
//                 <View style={styles.successCard}>
//                   <View style={styles.successBadge}>
//                     <Text style={styles.successBadgeText}>ENQUIRY SUBMITTED</Text>
//                   </View>

//                   <Text style={styles.successTitle}>Your inquiry has been received</Text>
//                   <Text style={styles.successSubtitle}>
//                     Our team will review your request and get back to you soon.
//                   </Text>

//                   <View style={styles.successInfoBox}>
//                     <View style={styles.successInfoRow}>
//                       <Text style={styles.successInfoLabel}>Enquiry ID</Text>
//                       <Text style={styles.successInfoValue}>{enquiryId}</Text>
//                     </View>

//                     <View style={styles.successDivider} />

//                     <View style={styles.successInfoRow}>
//                       <Text style={styles.successInfoLabel}>Status</Text>
//                       <Text style={styles.successInfoValue}>Pending Review</Text>
//                     </View>

//                     <View style={styles.successDivider} />

//                     <View style={styles.successInfoRow}>
//                       <Text style={styles.successInfoLabel}>Submitted At</Text>
//                       <Text style={styles.successInfoValue}>{submittedAt}</Text>
//                     </View>

//                     {submittedData?.email ? (
//                       <>
//                         <View style={styles.successDivider} />
//                         <View style={styles.successInfoRow}>
//                           <Text style={styles.successInfoLabel}>Email</Text>
//                           <Text style={styles.successInfoValue}>{submittedData.email}</Text>
//                         </View>
//                       </>
//                     ) : null}

//                     {submittedData?.mobile ? (
//                       <>
//                         <View style={styles.successDivider} />
//                         <View style={styles.successInfoRow}>
//                           <Text style={styles.successInfoLabel}>Phone</Text>
//                           <Text style={styles.successInfoValue}>{submittedData.mobile}</Text>
//                         </View>
//                       </>
//                     ) : null}
//                   </View>

//                   <View style={styles.successActions}>
//                     <ActionButton
//                       title="Submit Another Inquiry"
//                       onPress={handleSubmitAnother}
//                       primary
//                     />
//                     <ActionButton
//                       title="Back to Home"
//                       onPress={() => navigation.navigate('Home')}
//                     />
//                   </View>
//                 </View>
//               )}
//             </LinearGradient>
//           </Animated.View>

//           <Animated.View style={fadeUp(footerAnim, 12, 1)}>
//             <CommonFooter navigation={navigation} app={app} />
//           </Animated.View>
//         </ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#141B27',
//   },

//   pageBg: {
//     flex: 1,
//   },

//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 44,
//     backgroundColor: 'transparent',
//   },

//   heroCard: {
//     borderRadius: 26,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 20,
//     marginBottom: 16,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//   },

//   heroChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 12,
//   },

//   heroChipText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },

//   heroTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 28,
//     fontWeight: '800',
//     lineHeight: 34,
//     marginBottom: 10,
//   },

//   heroSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 21,
//     marginBottom: 16,
//   },

//   heroButtons: {
//     gap: 10,
//   },

//   actionButton: {
//     minHeight: 48,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//   },

//   actionButtonPrimary: {
//     backgroundColor: '#67E6E8',
//   },

//   actionButtonSecondary: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },

//   actionButtonDisabled: {
//     opacity: 0.7,
//   },

//   actionButtonText: {
//     fontSize: 14,
//     fontWeight: '700',
//   },

//   actionButtonTextPrimary: {
//     color: '#12343A',
//   },

//   actionButtonTextSecondary: {
//     color: COLORS.textPrimary,
//   },

//   infoGrid: {
//     gap: 12,
//     marginBottom: 16,
//   },

//   infoCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//   },

//   infoCardTitle: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     marginBottom: 6,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },

//   infoCardValue: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 6,
//   },

//   infoCardSub: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//   },

//   highlightCard: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.22)',
//     padding: 18,
//     marginBottom: 16,
//   },

//   highlightEyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 8,
//   },

//   highlightTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     lineHeight: 28,
//     marginBottom: 10,
//   },

//   highlightText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 14,
//   },

//   tagRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },

//   tag: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//   },

//   tagText: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '600',
//   },

//   formCard: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },

//   formTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 21,
//     fontWeight: '800',
//     marginBottom: 16,
//   },

//   inputWrap: {
//     marginBottom: 14,
//   },

//   inputLabel: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//     marginBottom: 8,
//   },

//   input: {
//     minHeight: 52,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     color: COLORS.textPrimary,
//     paddingHorizontal: 14,
//     fontSize: 14,
//   },

//   textArea: {
//     minHeight: 110,
//     paddingTop: 12,
//     textAlignVertical: 'top',
//   },

//   errorBox: {
//     backgroundColor: 'rgba(255,120,120,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,120,120,0.20)',
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginTop: 2,
//     marginBottom: 8,
//   },

//   errorText: {
//     color: '#FFB3B3',
//     fontSize: 12,
//     lineHeight: 18,
//     fontWeight: '600',
//   },

//   submitWrap: {
//     marginTop: 8,
//     borderRadius: 16,
//     overflow: 'hidden',
//   },

//   submitWrapDisabled: {
//     opacity: 0.8,
//   },

//   submitButton: {
//     minHeight: 52,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },

//   buttonTopShine: {
//     position: 'absolute',
//     top: 0,
//     left: 8,
//     right: 8,
//     height: 1.2,
//     backgroundColor: 'rgba(255,255,255,0.32)',
//   },

//   submitButtonText: {
//     color: '#12343A',
//     fontSize: 14,
//     fontWeight: '800',
//   },

//   successCard: {
//     paddingTop: 2,
//   },

//   successBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(103,232,240,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 12,
//   },

//   successBadgeText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '800',
//     letterSpacing: 0.8,
//   },

//   successTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 24,
//     fontWeight: '800',
//     lineHeight: 30,
//     marginBottom: 8,
//   },

//   successSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 16,
//   },

//   successInfoBox: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 18,
//     padding: 14,
//     marginBottom: 16,
//   },

//   successInfoRow: {
//     gap: 4,
//   },

//   successInfoLabel: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//     fontWeight: '700',
//   },

//   successInfoValue: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '700',
//     lineHeight: 20,
//   },

//   successDivider: {
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     marginVertical: 12,
//   },

//   successActions: {
//     gap: 10,
//   },

//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },
// });

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/CommonFooter';
import { submitContactApi } from '../utils/apiService';

function ContactCard({ title, value, sub, animatedStyle }) {
  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient
        colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.018)']}
        style={styles.infoCard}
      >
        <Text style={styles.infoCardTitle}>{title}</Text>
        <Text style={styles.infoCardValue}>{value}</Text>
        {!!sub && <Text style={styles.infoCardSub}>{sub}</Text>}
      </LinearGradient>
    </Animated.View>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.35)"
        multiline={multiline}
        keyboardType={keyboardType}
        style={[styles.input, multiline && styles.textArea]}
      />
    </View>
  );
}

function ActionButton({ title, onPress, primary = false, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.actionButton,
        primary ? styles.actionButtonPrimary : styles.actionButtonSecondary,
        disabled && styles.actionButtonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text
        style={[
          styles.actionButtonText,
          primary ? styles.actionButtonTextPrimary : styles.actionButtonTextSecondary,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export default function ContactScreen({ navigation, route }) {
  const app = route?.params?.app || null;
  const inquiryType = route?.params?.inquiryType || '';

  const initialSubject = useMemo(() => {
    if (inquiryType) return inquiryType;
    if (app?.title) return `Inquiry about ${app.title}`;
    return '';
  }, [app, inquiryType]);

  const initialMessage = useMemo(() => {
    if (inquiryType === 'Request Demo') {
      return 'Hi, I would like to request a demo for your app solutions.';
    }
    if (inquiryType === 'Custom Project') {
      return 'Hi, I would like to discuss a custom project requirement.';
    }
    if (inquiryType === 'Sales Inquiry') {
      return 'Hi, I would like to know more about pricing and sales details.';
    }
    if (app?.title) {
      return `Hi, I would like to know more about ${app.title}.`;
    }
    return '';
  }, [app, inquiryType]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState(initialMessage);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');
  const [submittedAt, setSubmittedAt] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [formError, setFormError] = useState('');

  const headerAnim = useRef(new Animated.Value(0)).current;
  const heroAnim = useRef(new Animated.Value(0)).current;
  const infoCard1Anim = useRef(new Animated.Value(0)).current;
  const infoCard2Anim = useRef(new Animated.Value(0)).current;
  const infoCard3Anim = useRef(new Animated.Value(0)).current;
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSubject(initialSubject);
    setMessage(initialMessage);
  }, [initialSubject, initialMessage]);

  useEffect(() => {
    const intro = Animated.sequence([
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(heroAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.stagger(100, [
        Animated.timing(infoCard1Anim, {
          toValue: 1,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(infoCard2Anim, {
          toValue: 1,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(infoCard3Anim, {
          toValue: 1,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(highlightAnim, {
        toValue: 1,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    intro.start();

    return () => {
      intro.stop();
    };
  }, [
    headerAnim,
    heroAnim,
    infoCard1Anim,
    infoCard2Anim,
    infoCard3Anim,
    highlightAnim,
    formAnim,
    footerAnim,
  ]);

  const fadeUp = (anim, distance = 18, fromScale = 0.985) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [fromScale, 1],
        }),
      },
    ],
  });

  const resetForm = () => {
    setName('');
    setEmail('');
    setMobile('');
    setSubject(initialSubject);
    setMessage(initialMessage);
    setFormError('');
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }
    if (!mobile.trim()) {
      setFormError('Please enter your mobile number.');
      return;
    }
    if (!message.trim()) {
      setFormError('Please enter your message.');
      return;
    }

    setFormError('');
    setSubmitting(true);

    try {
      const data = await submitContactApi({
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      setSubmitted(true);
      setEnquiryId(data.inquiryId || `ENQ-${Date.now()}`);
      setSubmittedAt(
        data.submittedAt
          ? new Date(data.submittedAt).toLocaleString()
          : new Date().toLocaleString()
      );
      setSubmittedData({
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      resetForm();
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setEnquiryId('');
    setSubmittedAt('');
    setSubmittedData(null);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141B27" />

      <LinearGradient
        colors={['#141B27', '#212C3D', '#182130']}
        style={styles.pageBg}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Animated.View style={fadeUp(headerAnim, 10, 1)}>
            <CommonHeader
              navigation={navigation}
              title="Contact Us"
              subtitle="Talk to our team"
              showBack
              rightLabel="Apps"
              onRightPress={() => navigation.navigate('Apps')}
              onNotificationPress={() => {}}
              onProfilePress={() => navigation.navigate('Profile')}
            />
          </Animated.View>

          <Animated.View style={fadeUp(heroAnim, 18, 0.985)}>
            <LinearGradient
              colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.025)']}
              style={styles.heroCard}
            >
              <View style={styles.heroChip}>
                <Text style={styles.heroChipText}>GET IN TOUCH</Text>
              </View>

              <Text style={styles.heroTitle}>
                Let’s build your next{'\n'}premium app experience
              </Text>

              <Text style={styles.heroSubtitle}>
                Reach out for demos, pricing, custom projects, app inquiries, and
                product discussions. We help businesses launch cleaner, stronger, and
                more polished digital products.
              </Text>

              <View style={styles.heroButtons}>
                <ActionButton
                  title="Browse Apps"
                  onPress={() => navigation.navigate('Apps')}
                  primary
                />
                <ActionButton
                  title="View Profile"
                  onPress={() => navigation.navigate('Profile')}
                />
              </View>
            </LinearGradient>
          </Animated.View>

          <View style={styles.infoGrid}>
            <ContactCard
              title="Email"
              value="blissierra177@gmail.com"
              sub="For more product inquiries and demos"
              animatedStyle={fadeUp(infoCard1Anim, 16, 0.99)}
            />
            <ContactCard
              title="Phone"
              value="9966218737"
              sub="Mon - Sat, business hours"
              animatedStyle={fadeUp(infoCard2Anim, 16, 0.99)}
            />
            <ContactCard
              title="Location"
              value="Plot N0 49,50,Flat No 402,Neelakanta Nilayam,kakatiya Hills,Road no 9,sy No-32,Guttalabegumpet,Madhapur,Hyderabad-500081"
              sub="Serving clients across industries"
              animatedStyle={fadeUp(infoCard3Anim, 16, 0.99)}
            />
          </View>

          <Animated.View style={fadeUp(highlightAnim, 18, 0.99)}>
            <LinearGradient
              colors={['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.025)']}
              style={styles.highlightCard}
            >
              <Text style={styles.highlightEyebrow}>WHY CONTACT US</Text>
              <Text style={styles.highlightTitle}>More than just a simple inquiry form</Text>
              <Text style={styles.highlightText}>
                Tell us whether you need a ready-made app, a custom business solution,
                or a premium redesign for your digital product. We can help you shape
                a cleaner and more conversion-focused experience.
              </Text>

              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Custom Projects</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Business Apps</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Product Demos</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.View style={fadeUp(formAnim, 20, 0.99)}>
            <LinearGradient
              colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
              style={styles.formCard}
            >
              {!submitted ? (
                <>
                  <Text style={styles.formTitle}>Send Inquiry</Text>

                  <InputField
                    label="Full Name"
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                  />

                  <InputField
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                  />

                  <InputField
                    label="Mobile Number"
                    value={mobile}
                    onChangeText={setMobile}
                    placeholder="Enter your mobile number"
                    keyboardType="phone-pad"
                  />

                  <InputField
                    label="Subject"
                    value={subject}
                    onChangeText={setSubject}
                    placeholder="Enter inquiry subject"
                  />

                  <InputField
                    label="Message"
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Tell us what you need"
                    multiline
                  />

                  {!!formError && (
                    <View style={styles.errorBox}>
                      <Text style={styles.errorText}>{formError}</Text>
                    </View>
                  )}

                  <Pressable
                    onPress={handleSubmit}
                    disabled={submitting}
                    style={({ pressed }) => [
                      styles.submitWrap,
                      pressed && !submitting && styles.buttonPressed,
                      submitting && styles.submitWrapDisabled,
                    ]}
                  >
                    <LinearGradient
                      colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.submitButton}
                    >
                      <View style={styles.buttonTopShine} />
                      <Text style={styles.submitButtonText}>
                        {submitting ? 'Submitting...' : 'Submit Inquiry'}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </>
              ) : (
                <View style={styles.successCard}>
                  <View style={styles.successBadge}>
                    <Text style={styles.successBadgeText}>ENQUIRY SUBMITTED</Text>
                  </View>

                  <Text style={styles.successTitle}>Your inquiry has been received</Text>
                  <Text style={styles.successSubtitle}>
                    Our team will review your request and get back to you soon.
                  </Text>

                  <View style={styles.successInfoBox}>
                    <View style={styles.successInfoRow}>
                      <Text style={styles.successInfoLabel}>Enquiry ID</Text>
                      <Text style={styles.successInfoValue}>{enquiryId}</Text>
                    </View>

                    <View style={styles.successDivider} />

                    <View style={styles.successInfoRow}>
                      <Text style={styles.successInfoLabel}>Status</Text>
                      <Text style={styles.successInfoValue}>Pending Review</Text>
                    </View>

                    <View style={styles.successDivider} />

                    <View style={styles.successInfoRow}>
                      <Text style={styles.successInfoLabel}>Submitted At</Text>
                      <Text style={styles.successInfoValue}>{submittedAt}</Text>
                    </View>

                    {submittedData?.email ? (
                      <>
                        <View style={styles.successDivider} />
                        <View style={styles.successInfoRow}>
                          <Text style={styles.successInfoLabel}>Email</Text>
                          <Text style={styles.successInfoValue}>{submittedData.email}</Text>
                        </View>
                      </>
                    ) : null}

                    {submittedData?.mobile ? (
                      <>
                        <View style={styles.successDivider} />
                        <View style={styles.successInfoRow}>
                          <Text style={styles.successInfoLabel}>Phone</Text>
                          <Text style={styles.successInfoValue}>{submittedData.mobile}</Text>
                        </View>
                      </>
                    ) : null}
                  </View>

                  <View style={styles.successActions}>
                    <ActionButton
                      title="Submit Another Inquiry"
                      onPress={handleSubmitAnother}
                      primary
                    />
                    <ActionButton
                      title="Back to Home"
                      onPress={() => navigation.navigate('Home')}
                    />
                  </View>
                </View>
              )}
            </LinearGradient>
          </Animated.View>

          <Animated.View style={fadeUp(footerAnim, 12, 1)}>
            <CommonFooter navigation={navigation} app={app} />
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141B27',
  },

  pageBg: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 44,
    backgroundColor: 'transparent',
  },

  heroCard: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },

  heroChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(103,232,240,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(103,232,240,0.28)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },

  heroChipText: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 10,
  },

  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 16,
  },

  heroButtons: {
    gap: 10,
  },

  actionButton: {
    minHeight: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  actionButtonPrimary: {
    backgroundColor: '#67E6E8',
  },

  actionButtonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  actionButtonDisabled: {
    opacity: 0.7,
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },

  actionButtonTextPrimary: {
    color: '#12343A',
  },

  actionButtonTextSecondary: {
    color: COLORS.textPrimary,
  },

  infoGrid: {
    gap: 12,
    marginBottom: 16,
  },

  infoCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
  },

  infoCardTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 6,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  infoCardValue: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },

  infoCardSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  highlightCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(103,232,240,0.22)',
    padding: 18,
    marginBottom: 16,
  },

  highlightEyebrow: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },

  highlightTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 10,
  },

  highlightText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tag: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  tagText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },

  formCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 16,
  },

  formTitle: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 16,
  },

  inputWrap: {
    marginBottom: 14,
  },

  inputLabel: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },

  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    color: COLORS.textPrimary,
    paddingHorizontal: 14,
    fontSize: 14,
  },

  textArea: {
    minHeight: 110,
    paddingTop: 12,
    textAlignVertical: 'top',
  },

  errorBox: {
    backgroundColor: 'rgba(255,120,120,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,120,120,0.20)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 2,
    marginBottom: 8,
  },

  errorText: {
    color: '#FFB3B3',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },

  submitWrap: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },

  submitWrapDisabled: {
    opacity: 0.8,
  },

  submitButton: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  buttonTopShine: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1.2,
    backgroundColor: 'rgba(255,255,255,0.32)',
  },

  submitButtonText: {
    color: '#12343A',
    fontSize: 14,
    fontWeight: '800',
  },

  successCard: {
    paddingTop: 2,
  },

  successBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(103,232,240,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(103,232,240,0.28)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },

  successBadgeText: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  successTitle: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 8,
  },

  successSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },

  successInfoBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },

  successInfoRow: {
    gap: 4,
  },

  successInfoLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },

  successInfoValue: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  successDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 12,
  },

  successActions: {
    gap: 10,
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
});
