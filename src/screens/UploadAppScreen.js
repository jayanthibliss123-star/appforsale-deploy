// import React, { useState } from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as ImagePicker from 'expo-image-picker';
// import { useMarketplace } from '../context/MarketplaceContext';
// import { COLORS } from '../theme';

// const initialForm = {
//   title: '',
//   description: '',
//   category: '',
//   price: '',
//   ownerName: '',
//   ownerEmail: '',
//   ownerPhone: '',
//   company: '',
//   features: '',
//   image: null,
// };

// function Field({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   multiline = false,
//   keyboardType = 'default',
//   autoCapitalize = 'sentences',
// }) {
//   return (
//     <View style={styles.fieldWrap}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#7F8794"
//         multiline={multiline}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//         style={[styles.input, multiline && styles.inputMultiline]}
//       />
//     </View>
//   );
// }

// export default function UploadAppScreen({ navigation }) {
//   const { addApp } = useMarketplace();
//   const [form, setForm] = useState(initialForm);
//   const [pickingImage, setPickingImage] = useState(false);

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       setPickingImage(true);

//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permissionResult.granted) {
//         Alert.alert(
//           'Permission Required',
//           'Please allow photo library access to select an app cover image.'
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         aspect: [16, 9],
//         quality: 0.9,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         updateField('image', { uri: result.assets[0].uri });
//       }
//     } catch (error) {
//       console.log('Image picker error:', error);
//       Alert.alert('Image Picker Error', 'Unable to select image right now.');
//     } finally {
//       setPickingImage(false);
//     }
//   };

//   const removeSelectedImage = () => {
//     updateField('image', null);
//   };

//   const handleSubmit = () => {
//     if (!form.title.trim()) {
//       Alert.alert('Validation', 'Please enter app title');
//       return;
//     }
//     if (!form.category.trim()) {
//       Alert.alert('Validation', 'Please enter category');
//       return;
//     }
//     if (!form.description.trim()) {
//       Alert.alert('Validation', 'Please enter description');
//       return;
//     }
//     if (!form.price.trim()) {
//       Alert.alert('Validation', 'Please enter price');
//       return;
//     }
//     if (!form.ownerName.trim()) {
//       Alert.alert('Validation', 'Please enter owner name');
//       return;
//     }
//     if (!form.ownerEmail.trim()) {
//       Alert.alert('Validation', 'Please enter owner email');
//       return;
//     }
//     if (!form.ownerPhone.trim()) {
//       Alert.alert('Validation', 'Please enter owner phone');
//       return;
//     }
//     if (!form.image) {
//       Alert.alert('Validation', 'Please upload an app cover image');
//       return;
//     }

//     try {
//       addApp(form);
//       navigation.replace('Apps');
//     } catch (error) {
//       console.log('Submit error:', error);
//       Alert.alert('Error', 'Unable to submit app. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//         >
//           <Text style={styles.eyebrow}>UPLOAD APP</Text>
//           <Text style={styles.title}>Submit Your App</Text>
//           <Text style={styles.subtitle}>
//             Fill the details below. After submission, the app will appear in the
//             Apps marketplace screen.
//           </Text>

//           <View style={styles.card}>
//             <Text style={styles.sectionTitle}>App Cover Image</Text>
//             <Text style={styles.sectionSubtext}>
//               Upload a professional marketplace cover image from your device.
//             </Text>

//             <Pressable
//               onPress={pickImageFromGallery}
//               style={({ pressed }) => [
//                 styles.imagePickerCard,
//                 pressed && styles.pressed,
//               ]}
//             >
//               {form.image ? (
//                 <>
//                   <Image
//                     source={form.image}
//                     style={styles.selectedPreviewImage}
//                     resizeMode="cover"
//                   />
//                   <View style={styles.selectedPreviewOverlay} />
//                   <View style={styles.selectedPreviewContent}>
//                     <View style={styles.selectedPreviewBadge}>
//                       <Text style={styles.selectedPreviewBadgeText}>
//                         Uploaded Cover
//                       </Text>
//                     </View>
//                     <Text style={styles.selectedPreviewTitle} numberOfLines={1}>
//                       {form.title?.trim() || 'Your App Preview'}
//                     </Text>
//                     <Text style={styles.selectedPreviewSubtitle} numberOfLines={1}>
//                       {form.category?.trim() || 'Marketplace listing image'}
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <View style={styles.uploadPlaceholder}>
//                   <Text style={styles.uploadPlaceholderIcon}>↑</Text>
//                   <Text style={styles.uploadPlaceholderTitle}>
//                     Upload Cover Image
//                   </Text>
//                   <Text style={styles.uploadPlaceholderText}>
//                     Tap to open your gallery and choose a listing image
//                   </Text>
//                 </View>
//               )}
//             </Pressable>

//             <View style={styles.imageActionsRow}>
//               <Pressable
//                 onPress={pickImageFromGallery}
//                 style={({ pressed }) => [
//                   styles.secondaryActionBtn,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={styles.secondaryActionBtnText}>
//                   {pickingImage
//                     ? 'Opening...'
//                     : form.image
//                     ? 'Change Image'
//                     : 'Choose Image'}
//                 </Text>
//               </Pressable>

//               {form.image ? (
//                 <Pressable
//                   onPress={removeSelectedImage}
//                   style={({ pressed }) => [
//                     styles.removeActionBtn,
//                     pressed && styles.pressed,
//                   ]}
//                 >
//                   <Text style={styles.removeActionBtnText}>Remove</Text>
//                 </Pressable>
//               ) : null}
//             </View>

//             <Field
//               label="App Title"
//               value={form.title}
//               onChangeText={(text) => updateField('title', text)}
//               placeholder="Enter app title"
//             />

//             <Field
//               label="Category"
//               value={form.category}
//               onChangeText={(text) => updateField('category', text)}
//               placeholder="Example: CRM, Pharmacy, E-commerce"
//             />

//             <Field
//               label="Description"
//               value={form.description}
//               onChangeText={(text) => updateField('description', text)}
//               placeholder="Enter app description"
//               multiline
//             />

//             <Field
//               label="Price"
//               value={form.price}
//               onChangeText={(text) => updateField('price', text)}
//               placeholder="Example: ₹49,999"
//             />

//             <Field
//               label="Owner Name"
//               value={form.ownerName}
//               onChangeText={(text) => updateField('ownerName', text)}
//               placeholder="Enter owner name"
//             />

//             <Field
//               label="Owner Email"
//               value={form.ownerEmail}
//               onChangeText={(text) => updateField('ownerEmail', text)}
//               placeholder="Enter owner email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />

//             <Field
//               label="Owner Phone"
//               value={form.ownerPhone}
//               onChangeText={(text) => updateField('ownerPhone', text)}
//               placeholder="Enter phone number"
//               keyboardType="phone-pad"
//             />

//             <Field
//               label="Company"
//               value={form.company}
//               onChangeText={(text) => updateField('company', text)}
//               placeholder="Enter company name"
//             />

//             <Field
//               label="Features"
//               value={form.features}
//               onChangeText={(text) => updateField('features', text)}
//               placeholder="Enter key features"
//               multiline
//             />

//             <Pressable style={styles.submitBtnWrap} onPress={handleSubmit}>
//               <LinearGradient
//                 colors={[COLORS.primarySoft, COLORS.primary]}
//                 style={styles.submitBtn}
//               >
//                 <Text style={styles.submitBtnText}>Submit App</Text>
//               </LinearGradient>
//             </Pressable>

//             <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: {
//     opacity: 0.92,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 40,
//   },
//   eyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 6,
//   },
//   title: {
//     color: COLORS.textPrimary,
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 18,
//   },
//   card: {
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 22,
//     padding: 16,
//   },
//   sectionTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   sectionSubtext: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//     marginBottom: 12,
//   },
//   imagePickerCard: {
//     height: 140,
//     borderRadius: 18,
//     overflow: 'hidden',
//     marginBottom: 12,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   uploadPlaceholder: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 18,
//   },
//   uploadPlaceholderIcon: {
//     color: COLORS.primary,
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   uploadPlaceholderTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   uploadPlaceholderText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//     textAlign: 'center',
//   },
//   selectedPreviewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   selectedPreviewOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(10,12,16,0.26)',
//   },
//   selectedPreviewContent: {
//     position: 'absolute',
//     left: 12,
//     right: 12,
//     bottom: 12,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 14,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   selectedPreviewBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.14)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     marginBottom: 6,
//   },
//   selectedPreviewBadgeText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   selectedPreviewTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   selectedPreviewSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   imageActionsRow: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 18,
//   },
//   secondaryActionBtn: {
//     flex: 1,
//     minHeight: 44,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   secondaryActionBtnText: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   removeActionBtn: {
//     minWidth: 92,
//     minHeight: 44,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     paddingHorizontal: 14,
//   },
//   removeActionBtnText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   fieldWrap: {
//     marginBottom: 14,
//   },
//   label: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   input: {
//     minHeight: 50,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     paddingHorizontal: 14,
//     color: COLORS.textPrimary,
//     fontSize: 14,
//   },
//   inputMultiline: {
//     minHeight: 110,
//     textAlignVertical: 'top',
//     paddingTop: 14,
//   },
//   submitBtnWrap: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginTop: 4,
//     marginBottom: 12,
//   },
//   submitBtn: {
//     minHeight: 52,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   submitBtnText: {
//     color: COLORS.textDark,
//     fontSize: 15,
//     fontWeight: '800',
//   },
//   cancelBtn: {
//     minHeight: 50,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   cancelBtnText: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '700',
//   },
// });

// import React, { useState } from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as ImagePicker from 'expo-image-picker';
// import { useMarketplace } from '../context/MarketplaceContext';
// import { COLORS } from '../theme';

// const initialForm = {
//   title: '',
//   description: '',
//   category: '',
//   price: '',
//   ownerName: '',
//   ownerEmail: '',
//   ownerPhone: '',
//   company: '',
//   features: '',
//   image: null,
// };

// function Field({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   multiline = false,
//   keyboardType = 'default',
//   autoCapitalize = 'sentences',
// }) {
//   return (
//     <View style={styles.fieldWrap}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#7F8794"
//         multiline={multiline}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//         style={[styles.input, multiline && styles.inputMultiline]}
//       />
//     </View>
//   );
// }

// export default function UploadAppScreen({ navigation }) {
//   const { addApp } = useMarketplace();
//   const [form, setForm] = useState(initialForm);
//   const [pickingImage, setPickingImage] = useState(false);

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       setPickingImage(true);

//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permissionResult.granted) {
//         Alert.alert(
//           'Permission Required',
//           'Please allow photo library access to select an app cover image.'
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         aspect: [16, 9],
//         quality: 0.9,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         updateField('image', { uri: result.assets[0].uri });
//       }
//     } catch (error) {
//       console.log('Image picker error:', error);
//       Alert.alert('Image Picker Error', 'Unable to select image right now.');
//     } finally {
//       setPickingImage(false);
//     }
//   };

//   const removeSelectedImage = () => {
//     updateField('image', null);
//   };

//   const handleSubmit = () => {
//     if (!form.title.trim()) {
//       Alert.alert('Validation', 'Please enter app title');
//       return;
//     }
//     if (!form.category.trim()) {
//       Alert.alert('Validation', 'Please enter category');
//       return;
//     }
//     if (!form.description.trim()) {
//       Alert.alert('Validation', 'Please enter description');
//       return;
//     }
//     if (!form.price.trim()) {
//       Alert.alert('Validation', 'Please enter price');
//       return;
//     }
//     if (!form.ownerName.trim()) {
//       Alert.alert('Validation', 'Please enter owner name');
//       return;
//     }
//     if (!form.ownerEmail.trim()) {
//       Alert.alert('Validation', 'Please enter owner email');
//       return;
//     }
//     if (!form.ownerPhone.trim()) {
//       Alert.alert('Validation', 'Please enter owner phone');
//       return;
//     }
//     if (!form.image) {
//       Alert.alert('Validation', 'Please upload an app cover image');
//       return;
//     }

//     try {
//       addApp(form);
//       navigation.replace('Apps');
//     } catch (error) {
//       console.log('Submit error:', error);
//       Alert.alert('Error', 'Unable to submit app. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//         >
//           <Text style={styles.eyebrow}>UPLOAD APP</Text>
//           <Text style={styles.title}>Submit Your App</Text>
//           <Text style={styles.subtitle}>
//             Fill the details below. After submission, the app will appear in the
//             Apps marketplace screen.
//           </Text>

//           <View style={styles.card}>
//             <Text style={styles.sectionTitle}>App Cover Image</Text>
//             <Text style={styles.sectionSubtext}>
//               Upload a professional marketplace cover image from your device.
//             </Text>

//             <Pressable
//               onPress={pickImageFromGallery}
//               style={({ pressed }) => [
//                 styles.imagePickerCard,
//                 pressed && styles.pressed,
//               ]}
//             >
//               {form.image ? (
//                 <>
//                   <Image
//                     source={form.image}
//                     style={styles.selectedPreviewImage}
//                     resizeMode="cover"
//                   />
//                   <View style={styles.selectedPreviewOverlay} />
//                   <View style={styles.selectedPreviewContent}>
//                     <View style={styles.selectedPreviewBadge}>
//                       <Text style={styles.selectedPreviewBadgeText}>
//                         Uploaded Cover
//                       </Text>
//                     </View>
//                     <Text style={styles.selectedPreviewTitle} numberOfLines={1}>
//                       {form.title?.trim() || 'Your App Preview'}
//                     </Text>
//                     <Text style={styles.selectedPreviewSubtitle} numberOfLines={1}>
//                       {form.category?.trim() || 'Marketplace listing image'}
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <View style={styles.uploadPlaceholder}>
//                   <Text style={styles.uploadPlaceholderIcon}>↑</Text>
//                   <Text style={styles.uploadPlaceholderTitle}>
//                     Upload Cover Image
//                   </Text>
//                   <Text style={styles.uploadPlaceholderText}>
//                     Tap to open your gallery and choose a listing image
//                   </Text>
//                 </View>
//               )}
//             </Pressable>

//             <View style={styles.imageActionsRow}>
//               <Pressable
//                 onPress={pickImageFromGallery}
//                 style={({ pressed }) => [
//                   styles.secondaryActionBtn,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={styles.secondaryActionBtnText}>
//                   {pickingImage
//                     ? 'Opening...'
//                     : form.image
//                     ? 'Change Image'
//                     : 'Choose Image'}
//                 </Text>
//               </Pressable>

//               {form.image ? (
//                 <Pressable
//                   onPress={removeSelectedImage}
//                   style={({ pressed }) => [
//                     styles.removeActionBtn,
//                     pressed && styles.pressed,
//                   ]}
//                 >
//                   <Text style={styles.removeActionBtnText}>Remove</Text>
//                 </Pressable>
//               ) : null}
//             </View>

//             <Field
//               label="App Title"
//               value={form.title}
//               onChangeText={(text) => updateField('title', text)}
//               placeholder="Enter app title"
//             />

//             <Field
//               label="Category"
//               value={form.category}
//               onChangeText={(text) => updateField('category', text)}
//               placeholder="Example: CRM, Pharmacy, E-commerce"
//             />

//             <Field
//               label="Description"
//               value={form.description}
//               onChangeText={(text) => updateField('description', text)}
//               placeholder="Enter app description"
//               multiline
//             />

//             <Field
//               label="Price"
//               value={form.price}
//               onChangeText={(text) => updateField('price', text)}
//               placeholder="Example: ₹49,999"
//             />

//             <Field
//               label="Owner Name"
//               value={form.ownerName}
//               onChangeText={(text) => updateField('ownerName', text)}
//               placeholder="Enter owner name"
//             />

//             <Field
//               label="Owner Email"
//               value={form.ownerEmail}
//               onChangeText={(text) => updateField('ownerEmail', text)}
//               placeholder="Enter owner email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />

//             <Field
//               label="Owner Phone"
//               value={form.ownerPhone}
//               onChangeText={(text) => updateField('ownerPhone', text)}
//               placeholder="Enter phone number"
//               keyboardType="phone-pad"
//             />

//             <Field
//               label="Company"
//               value={form.company}
//               onChangeText={(text) => updateField('company', text)}
//               placeholder="Enter company name"
//             />

//             <Field
//               label="Features"
//               value={form.features}
//               onChangeText={(text) => updateField('features', text)}
//               placeholder="Enter key features"
//               multiline
//             />

//             <Pressable style={styles.submitBtnWrap} onPress={handleSubmit}>
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.submitBtn}
//               >
//                 <View style={styles.buttonTopShine} />
//                 <Text style={styles.submitBtnText}>Submit App</Text>
//               </LinearGradient>
//             </Pressable>

//             <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: {
//     opacity: 0.92,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     flexGrow: 1,
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 40,
//   },
//   eyebrow: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 6,
//   },
//   title: {
//     color: COLORS.textPrimary,
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 18,
//   },
//   card: {
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 22,
//     padding: 16,
//   },
//   sectionTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   sectionSubtext: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//     marginBottom: 12,
//   },
//   imagePickerCard: {
//     height: 140,
//     borderRadius: 18,
//     overflow: 'hidden',
//     marginBottom: 12,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   uploadPlaceholder: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 18,
//   },
//   uploadPlaceholderIcon: {
//     color: '#67E6E8',
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   uploadPlaceholderTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   uploadPlaceholderText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//     textAlign: 'center',
//   },
//   selectedPreviewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   selectedPreviewOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(10,12,16,0.26)',
//   },
//   selectedPreviewContent: {
//     position: 'absolute',
//     left: 12,
//     right: 12,
//     bottom: 12,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 14,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   selectedPreviewBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(103,232,240,0.14)',
//     borderWidth: 1,
//     borderColor: 'rgba(66,221,226,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     marginBottom: 6,
//   },
//   selectedPreviewBadgeText: {
//     color: '#67E6E8',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   selectedPreviewTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   selectedPreviewSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   imageActionsRow: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 18,
//   },
//   secondaryActionBtn: {
//     flex: 1,
//     minHeight: 44,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   secondaryActionBtnText: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   removeActionBtn: {
//     minWidth: 92,
//     minHeight: 44,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     paddingHorizontal: 14,
//   },
//   removeActionBtnText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   fieldWrap: {
//     marginBottom: 14,
//   },
//   label: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   input: {
//     minHeight: 50,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     paddingHorizontal: 14,
//     color: COLORS.textPrimary,
//     fontSize: 14,
//   },
//   inputMultiline: {
//     minHeight: 110,
//     textAlignVertical: 'top',
//     paddingTop: 14,
//   },
//   submitBtnWrap: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginTop: 4,
//     marginBottom: 12,
//     shadowColor: '#42DDE2',
//     shadowOpacity: 0.18,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 6,
//   },
//   submitBtn: {
//     minHeight: 52,
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
//   submitBtnText: {
//     color: '#12343A',
//     fontSize: 15,
//     fontWeight: '800',
//   },
//   cancelBtn: {
//     minHeight: 50,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   cancelBtnText: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '700',
//   },
// });

// import React, { useState } from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as ImagePicker from 'expo-image-picker';
// import { uploadAppApi } from '../utils/apiService';
// import { COLORS } from '../theme';
// import { useMarketplace } from '../context/MarketplaceContext';

// const CATEGORIES = ['E-commerce', 'Management', 'Commerce', 'Business'];

// const initialForm = {
//   title: '',
//   description: '',
//   category: '',
//   price: '',
//   ownerName: '',
//   ownerEmail: '',
//   ownerPhone: '',
//   company: '',
//   features: '',
//   image: null,
// };

// const initialErrors = {
//   title: '',
//   description: '',
//   category: '',
//   price: '',
//   ownerName: '',
//   ownerEmail: '',
//   ownerPhone: '',
//   company: '',
//   features: '',
//   image: '',
// };

// function Field({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   multiline = false,
//   keyboardType = 'default',
//   autoCapitalize = 'sentences',
//   error = '',
//   maxLength,
// }) {
//   return (
//     <View style={styles.fieldWrap}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#7F8794"
//         multiline={multiline}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//         maxLength={maxLength}
//         style={[
//           styles.input,
//           multiline && styles.inputMultiline,
//           error ? styles.inputError : null,
//         ]}
//       />
//       {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}
//     </View>
//   );
// }

// export default function UploadAppScreen({ navigation }) {
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState(initialErrors);
//   const [pickingImage, setPickingImage] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { addApp } = useMarketplace();

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     setErrors((prev) => ({ ...prev, [key]: '' })); // clear error on type
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       setPickingImage(true);
//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permissionResult.granted) {
//         Alert.alert('Permission Required', 'Please allow photo library access.');
//         return;
//       }
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         aspect: [16, 9],
//         quality: 0.9,
//       });
//       if (!result.canceled && result.assets?.length > 0) {
//         updateField('image', { uri: result.assets[0].uri });
//         setErrors((prev) => ({ ...prev, image: '' }));
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to select image right now.');
//     } finally {
//       setPickingImage(false);
//     }
//   };

//   const validate = () => {
//     const newErrors = { ...initialErrors };
//     let valid = true;

//     if (!form.title.trim()) {
//       newErrors.title = 'App title is required';
//       valid = false;
//     }

//     if (!form.category) {
//       newErrors.category = 'Please select a category';
//       valid = false;
//     }

//     if (!form.description.trim()) {
//       newErrors.description = 'Description is required';
//       valid = false;
//     }

//     if (!form.price.trim()) {
//       newErrors.price = 'Price is required';
//       valid = false;
//     } else if (isNaN(Number(form.price)) || Number(form.price) < 0) {
//       newErrors.price = 'Price must be a valid positive number';
//       valid = false;
//     }

//     if (!form.ownerName.trim()) {
//       newErrors.ownerName = 'Owner name is required';
//       valid = false;
//     }

//     if (!form.ownerEmail.trim()) {
//       newErrors.ownerEmail = 'Owner email is required';
//       valid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail.trim())) {
//       newErrors.ownerEmail = 'Enter a valid email (e.g. owner@gmail.com)';
//       valid = false;
//     }

//     if (!form.ownerPhone.trim()) {
//       newErrors.ownerPhone = 'Phone number is required';
//       valid = false;
//     } else if (!/^[0-9]{10}$/.test(form.ownerPhone.trim())) {
//       newErrors.ownerPhone = 'Phone must be exactly 10 digits';
//       valid = false;
//     }

//     if (!form.image) {
//       newErrors.image = 'Please upload an app cover image';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//  // const handleSubmit = async () => { 
//   //   if (!validate()) {
//   //     Alert.alert('Validation Error', 'Please fix the errors before submitting.');
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     await uploadAppApi(form);
//   //     Alert.alert('✅ Success', 'App submitted successfully!', [
//   //       { text: 'Go to Home', onPress: () => navigation.navigate('Home') },
//   //     ]);
//   //   } catch (error) {
//   //     Alert.alert('Error', error.message || 'Upload failed. Try again.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmit = async () => {
//   if (!validate()) {
//     Alert.alert('Validation Error', 'Please fix the errors before submitting.');
//     return;
//   }

//   try {
//     setLoading(true);

//     const newApp = await uploadAppApi(form);

//     // 🔥 ADD TO CONTEXT
//     addApp({
//       ...form,
//       image: form.image,
//     });

//     Alert.alert('✅ Success', 'App submitted successfully!', [
//       { text: 'Go to Home', onPress: () => navigation.navigate('Home') },
//     ]);
//   } catch (error) {
//     Alert.alert('Error', error.message || 'Upload failed. Try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//         >
//           <Text style={styles.eyebrow}>UPLOAD APP</Text>
//           <Text style={styles.title}>Submit Your App</Text>
//           <Text style={styles.subtitle}>
//             Fill in the details below. Submitted apps appear in the marketplace.
//           </Text>

//           <View style={styles.card}>

//             {/* ✅ Cover Image */}
//             <Text style={styles.sectionTitle}>App Cover Image</Text>
//             <Pressable
//               onPress={pickImageFromGallery}
//               style={({ pressed }) => [
//                 styles.imagePickerCard,
//                 errors.image ? styles.imagePickerError : null,
//                 pressed && styles.pressed,
//               ]}
//             >
//               {form.image ? (
//                 <>
//                   <Image source={form.image} style={styles.selectedPreviewImage} resizeMode="cover" />
//                   <View style={styles.selectedPreviewOverlay} />
//                   <View style={styles.selectedPreviewContent}>
//                     <Text style={styles.selectedPreviewTitle} numberOfLines={1}>
//                       {form.title?.trim() || 'Your App Preview'}
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <View style={styles.uploadPlaceholder}>
//                   <Text style={styles.uploadPlaceholderIcon}>↑</Text>
//                   <Text style={styles.uploadPlaceholderTitle}>Upload Cover Image</Text>
//                   <Text style={styles.uploadPlaceholderText}>Tap to choose from gallery</Text>
//                 </View>
//               )}
//             </Pressable>
//             {errors.image ? <Text style={styles.errorText}>⚠ {errors.image}</Text> : null}

//             <View style={styles.imageActionsRow}>
//               <Pressable
//                 onPress={pickImageFromGallery}
//                 style={({ pressed }) => [styles.secondaryActionBtn, pressed && styles.pressed]}
//               >
//                 <Text style={styles.secondaryActionBtnText}>
//                   {pickingImage ? 'Opening...' : form.image ? 'Change Image' : 'Choose Image'}
//                 </Text>
//               </Pressable>
//               {form.image && (
//                 <Pressable
//                   onPress={() => updateField('image', null)}
//                   style={({ pressed }) => [styles.removeActionBtn, pressed && styles.pressed]}
//                 >
//                   <Text style={styles.removeActionBtnText}>Remove</Text>
//                 </Pressable>
//               )}
//             </View>

//             {/* ✅ App Title */}
//             <Field
//               label="App Title *"
//               value={form.title}
//               onChangeText={(t) => updateField('title', t)}
//               placeholder="Enter app title"
//               error={errors.title}
//             />

//             {/* ✅ Category — Chips */}
//             <View style={styles.fieldWrap}>
//               <Text style={styles.label}>Category *</Text>
//               <View style={styles.categoryRow}>
//                 {CATEGORIES.map((cat) => (
//                   <Pressable
//                     key={cat}
//                     onPress={() => updateField('category', cat)}
//                     style={({ pressed }) => [
//                       styles.categoryChip,
//                       form.category === cat && styles.categoryChipActive,
//                       pressed && styles.pressed,
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.categoryChipText,
//                         form.category === cat && styles.categoryChipTextActive,
//                       ]}
//                     >
//                       {cat}
//                     </Text>
//                   </Pressable>
//                 ))}
//               </View>
//               {errors.category ? <Text style={styles.errorText}>⚠ {errors.category}</Text> : null}
//             </View>

//             {/* ✅ Description */}
//             <Field
//               label="Description *"
//               value={form.description}
//               onChangeText={(t) => updateField('description', t)}
//               placeholder="Enter app description"
//               multiline
//               error={errors.description}
//             />

//             {/* ✅ Price — numbers only */}
//             <Field
//               label="Price (₹) *"
//               value={form.price}
//               onChangeText={(t) => updateField('price', t.replace(/[^0-9.]/g, ''))}
//               placeholder="Enter price (numbers only, e.g. 49999)"
//               keyboardType="numeric"
//               error={errors.price}
//             />

//             {/* ✅ Owner Name */}
//             <Field
//               label="Owner Name *"
//               value={form.ownerName}
//               onChangeText={(t) => updateField('ownerName', t)}
//               placeholder="Enter owner name"
//               error={errors.ownerName}
//             />

//             {/* ✅ Owner Email with format validation */}
//             <Field
//               label="Owner Email *"
//               value={form.ownerEmail}
//               onChangeText={(t) => updateField('ownerEmail', t)}
//               placeholder="owner@example.com"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               error={errors.ownerEmail}
//             />

//             {/* ✅ Owner Phone — 10 digits only */}
//             <Field
//               label="Owner Phone * (10 digits)"
//               value={form.ownerPhone}
//               onChangeText={(t) => updateField('ownerPhone', t.replace(/[^0-9]/g, ''))}
//               placeholder="10-digit mobile number"
//               keyboardType="phone-pad"
//               maxLength={10}
//               error={errors.ownerPhone}
//             />

//             {/* Company */}
//             <Field
//               label="Company"
//               value={form.company}
//               onChangeText={(t) => updateField('company', t)}
//               placeholder="Enter company name"
//               error={errors.company}
//             />

//             {/* Features */}
//             <Field
//               label="Features"
//               value={form.features}
//               onChangeText={(t) => updateField('features', t)}
//               placeholder="Enter key features"
//               multiline
//               error={errors.features}
//             />

//             {/* ✅ Submit Button */}
//             <Pressable style={styles.submitBtnWrap} onPress={handleSubmit} disabled={loading}>
//               <LinearGradient
//                 colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.submitBtn}
//               >
//                 <Text style={styles.submitBtnText}>
//                   {loading ? 'Submitting...' : 'Submit App'}
//                 </Text>
//               </LinearGradient>
//             </Pressable>

//             <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: { opacity: 0.88 },
//   safeArea: { flex: 1, backgroundColor: COLORS.background },
//   container: { flexGrow: 1, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 40 },
//   eyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
//   title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 8 },
//   subtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 20, marginBottom: 18 },
//   card: {
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 22,
//     padding: 16,
//   },
//   sectionTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 12 },

//   // Image picker
//   imagePickerCard: {
//     height: 140, borderRadius: 18, overflow: 'hidden', marginBottom: 8,
//     backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   imagePickerError: { borderColor: '#FF5252' },
//   uploadPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
//   uploadPlaceholderIcon: { color: '#67E6E8', fontSize: 28, fontWeight: '800', marginBottom: 8 },
//   uploadPlaceholderTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 4 },
//   uploadPlaceholderText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, textAlign: 'center' },
//   selectedPreviewImage: { width: '100%', height: '100%' },
//   selectedPreviewOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.26)' },
//   selectedPreviewContent: {
//     position: 'absolute', left: 12, right: 12, bottom: 12,
//     backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14,
//     paddingHorizontal: 10, paddingVertical: 8,
//   },
//   selectedPreviewTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
//   imageActionsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
//   secondaryActionBtn: {
//     flex: 1, minHeight: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
//   },
//   secondaryActionBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
//   removeActionBtn: {
//     minWidth: 92, minHeight: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,80,80,0.10)', borderWidth: 1, borderColor: 'rgba(255,80,80,0.24)',
//     paddingHorizontal: 14,
//   },
//   removeActionBtnText: { color: '#FF5252', fontSize: 13, fontWeight: '700' },

//   // Category chips
//   categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
//   categoryChip: {
//     paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999,
//     backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
//   },
//   categoryChipActive: {
//     backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.40)',
//   },
//   categoryChipText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
//   categoryChipTextActive: { color: '#67E6E8', fontWeight: '800' },

//   // Fields
//   fieldWrap: { marginBottom: 14 },
//   label: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginBottom: 8 },
//   input: {
//     minHeight: 50, borderRadius: 14, borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)',
//     paddingHorizontal: 14, color: '#FFFFFF', fontSize: 14,
//   },
//   inputMultiline: { minHeight: 110, textAlignVertical: 'top', paddingTop: 14 },
//   inputError: { borderColor: '#FF5252' },
//   errorText: { color: '#FF5252', fontSize: 12, marginTop: 4, fontWeight: '600' },

//   // Buttons
//   submitBtnWrap: {
//     borderRadius: 16, overflow: 'hidden', marginTop: 4, marginBottom: 12,
//     shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 }, elevation: 6,
//   },
//   submitBtn: { minHeight: 52, alignItems: 'center', justifyContent: 'center' },
//   submitBtnText: { color: '#12343A', fontSize: 15, fontWeight: '800' },
//   cancelBtn: {
//     minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
//   },
//   cancelBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
// });

import React, { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform, Pressable,
  SafeAreaView, ScrollView, StatusBar, StyleSheet,
  Text, TextInput, View, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { uploadAppApi } from '../utils/apiService';
import { COLORS } from '../theme';
import { useMarketplace } from '../context/MarketplaceContext';
import { useNotifications } from '../context/NotificationContext';

const CATEGORIES = ['E-commerce', 'Management', 'Commerce', 'Business'];

const initialForm = {
  title: '', description: '', category: '', price: '',
  ownerName: '', ownerEmail: '', ownerPhone: '',
  company: '', features: '', image: null,
};

const initialErrors = {
  title: '', description: '', category: '', price: '',
  ownerName: '', ownerEmail: '', ownerPhone: '',
  company: '', features: '', image: '',
};

function Field({ label, value, onChangeText, placeholder, multiline = false,
  keyboardType = 'default', autoCapitalize = 'sentences', error = '', maxLength }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7F8794"
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        style={[styles.input, multiline && styles.inputMultiline, error ? styles.inputError : null]}
      />
      {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}
    </View>
  );
}

export default function UploadAppScreen({ navigation }) {
  const { addApp } = useMarketplace();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [pickingImage, setPickingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const pickImageFromGallery = async () => {
    try {
      setPickingImage(true);
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow photo library access.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.9,
      });
      if (!result.canceled && result.assets?.length > 0) {
        updateField('image', { uri: result.assets[0].uri });
        setErrors((prev) => ({ ...prev, image: '' }));
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to select image right now.');
    } finally {
      setPickingImage(false);
    }
  };

  const validate = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (!form.title.trim()) { newErrors.title = 'App title is required'; valid = false; }
    if (!form.category) { newErrors.category = 'Please select a category'; valid = false; }
    if (!form.description.trim()) { newErrors.description = 'Description is required'; valid = false; }
    if (!form.price.trim()) {
      newErrors.price = 'Price is required'; valid = false;
    } else if (isNaN(Number(form.price)) || Number(form.price) < 0) {
      newErrors.price = 'Price must be a valid positive number'; valid = false;
    }
    if (!form.ownerName.trim()) { newErrors.ownerName = 'Owner name is required'; valid = false; }
    if (!form.ownerEmail.trim()) {
      newErrors.ownerEmail = 'Owner email is required'; valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail.trim())) {
      newErrors.ownerEmail = 'Enter a valid email (e.g. owner@gmail.com)'; valid = false;
    }
    if (!form.ownerPhone.trim()) {
      newErrors.ownerPhone = 'Phone number is required'; valid = false;
    } else if (!/^[0-9]{10}$/.test(form.ownerPhone.trim())) {
      newErrors.ownerPhone = 'Phone must be exactly 10 digits'; valid = false;
    }
    if (!form.image) { newErrors.image = 'Please upload an app cover image'; valid = false; }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    try {
      setLoading(true);

      // ✅ Step 1: Backend ki save cheyyi
      await uploadAppApi(form);

      // ✅ Step 2: Context lo add cheyyi (HomeScreen + AppsScreen instantly update avutai)
      await addApp(form);

      // ✅ Step 3: Real notification add cheyyi
      addNotification(
        `New App Listed: ${form.title}`,
        `"${form.title}" has been successfully submitted to the ${form.category} category. It is now live in the marketplace.`,
        'success'
      );

      // ✅ Step 4: Success alert + Home navigate
      Alert.alert('✅ Success', 'App submitted successfully!', [
        { text: 'Go to Home', onPress: () => navigation.navigate('Home') },
      ]);

    } catch (error) {
      Alert.alert('Error', error.message || 'Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Text style={styles.eyebrow}>UPLOAD APP</Text>
          <Text style={styles.title}>Submit Your App</Text>
          <Text style={styles.subtitle}>Fill in the details below. Submitted apps appear in the marketplace.</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>App Cover Image</Text>
            <Pressable
              onPress={pickImageFromGallery}
              style={({ pressed }) => [
                styles.imagePickerCard,
                errors.image ? styles.imagePickerError : null,
                pressed && styles.pressed,
              ]}
            >
              {form.image ? (
                <>
                  <Image source={form.image} style={styles.selectedPreviewImage} resizeMode="cover" />
                  <View style={styles.selectedPreviewOverlay} />
                  <View style={styles.selectedPreviewContent}>
                    <Text style={styles.selectedPreviewTitle} numberOfLines={1}>
                      {form.title?.trim() || 'Your App Preview'}
                    </Text>
                  </View>
                </>
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Text style={styles.uploadPlaceholderIcon}>↑</Text>
                  <Text style={styles.uploadPlaceholderTitle}>Upload Cover Image</Text>
                  <Text style={styles.uploadPlaceholderText}>Tap to choose from gallery</Text>
                </View>
              )}
            </Pressable>
            {errors.image ? <Text style={styles.errorText}>⚠ {errors.image}</Text> : null}

            <View style={styles.imageActionsRow}>
              <Pressable
                onPress={pickImageFromGallery}
                style={({ pressed }) => [styles.secondaryActionBtn, pressed && styles.pressed]}
              >
                <Text style={styles.secondaryActionBtnText}>
                  {pickingImage ? 'Opening...' : form.image ? 'Change Image' : 'Choose Image'}
                </Text>
              </Pressable>
              {form.image && (
                <Pressable
                  onPress={() => updateField('image', null)}
                  style={({ pressed }) => [styles.removeActionBtn, pressed && styles.pressed]}
                >
                  <Text style={styles.removeActionBtnText}>Remove</Text>
                </Pressable>
              )}
            </View>

            <Field label="App Title *" value={form.title}
              onChangeText={(t) => updateField('title', t)}
              placeholder="Enter app title" error={errors.title} />

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.categoryRow}>
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat}
                    onPress={() => updateField('category', cat)}
                    style={({ pressed }) => [
                      styles.categoryChip,
                      form.category === cat && styles.categoryChipActive,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={[styles.categoryChipText, form.category === cat && styles.categoryChipTextActive]}>
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.category ? <Text style={styles.errorText}>⚠ {errors.category}</Text> : null}
            </View>

            <Field label="Description *" value={form.description}
              onChangeText={(t) => updateField('description', t)}
              placeholder="Enter app description" multiline error={errors.description} />

            <Field label="Price (₹) *" value={form.price}
              onChangeText={(t) => updateField('price', t.replace(/[^0-9.]/g, ''))}
              placeholder="Enter price (numbers only, e.g. 49999)"
              keyboardType="numeric" error={errors.price} />

            <Field label="Owner Name *" value={form.ownerName}
              onChangeText={(t) => updateField('ownerName', t)}
              placeholder="Enter owner name" error={errors.ownerName} />

            <Field label="Owner Email *" value={form.ownerEmail}
              onChangeText={(t) => updateField('ownerEmail', t)}
              placeholder="owner@example.com" keyboardType="email-address"
              autoCapitalize="none" error={errors.ownerEmail} />

            <Field label="Owner Phone * (10 digits)" value={form.ownerPhone}
              onChangeText={(t) => updateField('ownerPhone', t.replace(/[^0-9]/g, ''))}
              placeholder="10-digit mobile number" keyboardType="phone-pad"
              maxLength={10} error={errors.ownerPhone} />

            <Field label="Company" value={form.company}
              onChangeText={(t) => updateField('company', t)}
              placeholder="Enter company name" error={errors.company} />

            <Field label="Features" value={form.features}
              onChangeText={(t) => updateField('features', t)}
              placeholder="Enter key features" multiline error={errors.features} />

            <Pressable style={styles.submitBtnWrap} onPress={handleSubmit} disabled={loading}>
              <LinearGradient
                colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.submitBtn}
              >
                <Text style={styles.submitBtnText}>{loading ? 'Submitting...' : 'Submit App'}</Text>
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.88 },
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flexGrow: 1, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 40 },
  eyebrow: { color: '#67E6E8', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 20, marginBottom: 18 },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 22, padding: 16 },
  sectionTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 12 },
  imagePickerCard: { height: 140, borderRadius: 18, overflow: 'hidden', marginBottom: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  imagePickerError: { borderColor: '#FF5252' },
  uploadPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  uploadPlaceholderIcon: { color: '#67E6E8', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  uploadPlaceholderTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 4 },
  uploadPlaceholderText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, textAlign: 'center' },
  selectedPreviewImage: { width: '100%', height: '100%' },
  selectedPreviewOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,16,0.26)' },
  selectedPreviewContent: { position: 'absolute', left: 12, right: 12, bottom: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 8 },
  selectedPreviewTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  imageActionsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  secondaryActionBtn: { flex: 1, minHeight: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  secondaryActionBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  removeActionBtn: { minWidth: 92, minHeight: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,80,80,0.10)', borderWidth: 1, borderColor: 'rgba(255,80,80,0.24)', paddingHorizontal: 14 },
  removeActionBtnText: { color: '#FF5252', fontSize: 13, fontWeight: '700' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
  categoryChipActive: { backgroundColor: 'rgba(103,232,240,0.16)', borderColor: 'rgba(66,221,226,0.40)' },
  categoryChipText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  categoryChipTextActive: { color: '#67E6E8', fontWeight: '800' },
  fieldWrap: { marginBottom: 14 },
  label: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginBottom: 8 },
  input: { minHeight: 50, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)', paddingHorizontal: 14, color: '#FFFFFF', fontSize: 14 },
  inputMultiline: { minHeight: 110, textAlignVertical: 'top', paddingTop: 14 },
  inputError: { borderColor: '#FF5252' },
  errorText: { color: '#FF5252', fontSize: 12, marginTop: 4, fontWeight: '600' },
  submitBtnWrap: { borderRadius: 16, overflow: 'hidden', marginTop: 4, marginBottom: 12, shadowColor: '#42DDE2', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
  submitBtn: { minHeight: 52, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { color: '#12343A', fontSize: 15, fontWeight: '800' },
  cancelBtn: { minHeight: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  cancelBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});