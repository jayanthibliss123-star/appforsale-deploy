

import React, { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform, Pressable,
  SafeAreaView, ScrollView, StatusBar, StyleSheet,
  Text, TextInput, View, Image, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { uploadAppApi, uploadAppDirectApi } from '../utils/apiService';
import { COLORS } from '../theme';
import { useMarketplace } from '../context/MarketplaceContext';
import { Ionicons } from '@expo/vector-icons';

const BG     = '#0D1117';
const CARD   = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.09)';
const TEAL   = '#67E6E8';
const TEAL_DIM    = 'rgba(103,230,232,0.12)';
const TEAL_BORDER = 'rgba(103,230,232,0.26)';

const SCREEN_W = Dimensions.get('window').width;
const THUMB_W  = Math.floor((SCREEN_W - 36 - 32 - 10) / 2);
const THUMB_H  = THUMB_W;

const CATEGORIES = ['E-commerce', 'Management', 'Commerce', 'Business'];

const initialForm = {
  title: '', description: '', category: '', price: '',
  ownerName: '', ownerEmail: '', ownerPhone: '',
  company: '', features: '', images: [],
};
const initialErrors = {
  title: '', description: '', category: '', price: '',
  ownerName: '', ownerEmail: '', ownerPhone: '',
  company: '', features: '', images: '',
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
        placeholderTextColor="rgba(255,255,255,0.28)"
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

function ImageThumb({ img, index, onRemove }) {
  return (
    <View style={styles.imageThumbWrap}>
      <Image source={{ uri: img.uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.55)']}
        style={[StyleSheet.absoluteFill, { top: '50%' }]}
        pointerEvents="none"
      />
      {index === 0 && (
        <View style={styles.coverBadge}>
          <Text style={styles.coverBadgeText}>Cover</Text>
        </View>
      )}
      <View style={styles.indexBadge}>
        <Text style={styles.indexBadgeText}>{index + 1}</Text>
      </View>
      <Pressable onPress={() => onRemove(index)} style={styles.removeImageBtn} hitSlop={6}>
        <Text style={styles.removeImageBtnText}>✕</Text>
      </Pressable>
    </View>
  );
}

export default function UploadAppScreen({ navigation, route }) {
  const { refreshApps } = useMarketplace();
  // ✅ No useNotifications — user upload doesn't create local context notification

  const isAdmin = route?.params?.isAdmin === true;

  const [form,         setForm]         = useState(initialForm);
  const [errors,       setErrors]       = useState(initialErrors);
  const [pickingImage, setPickingImage] = useState(false);
  const [loading,      setLoading]      = useState(false);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const pickOneWithCrop = async () => {
    if (form.images.length >= 5) {
      Alert.alert('Max 5 images', 'Remove an image before adding more.');
      return;
    }
    try {
      setPickingImage(true);
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) { Alert.alert('Permission Required', 'Please allow photo library access.'); return; }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.88,
      });
      if (!result.canceled && result.assets?.length > 0) {
        const a = result.assets[0];
        setForm(prev => ({ ...prev, images: [...prev.images, { uri: a.uri, width: a.width, height: a.height }] }));
        setErrors(prev => ({ ...prev, images: '' }));
      }
    } catch { Alert.alert('Error', 'Unable to select image.'); }
    finally { setPickingImage(false); }
  };

  const pickMultipleNoCrop = async () => {
    if (form.images.length >= 5) {
      Alert.alert('Max 5 images', 'Remove an image before adding more.');
      return;
    }
    try {
      setPickingImage(true);
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) { Alert.alert('Permission Required', 'Please allow photo library access.'); return; }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        allowsEditing: false,
        quality: 0.88,
      });
      if (!result.canceled && result.assets?.length > 0) {
        const remaining = 5 - form.images.length;
        const newImages = result.assets.slice(0, remaining).map(a => ({ uri: a.uri, width: a.width, height: a.height }));
        setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
        setErrors(prev => ({ ...prev, images: '' }));
      }
    } catch { Alert.alert('Error', 'Unable to select images.'); }
    finally { setPickingImage(false); }
  };

  const removeImage = index => updateField('images', form.images.filter((_, i) => i !== index));

  const validate = () => {
    const e = { ...initialErrors };
    let ok = true;
    if (!form.title.trim())       { e.title = 'App title is required'; ok = false; }
    if (!form.category)           { e.category = 'Please select a category'; ok = false; }
    if (!form.description.trim()) { e.description = 'Description is required'; ok = false; }
    if (!form.price.trim())       { e.price = 'Price is required'; ok = false; }
    else if (isNaN(Number(form.price)) || Number(form.price) < 0) { e.price = 'Enter a valid positive number'; ok = false; }
    if (!form.ownerName.trim())   { e.ownerName = 'Owner name is required'; ok = false; }
    if (!form.ownerEmail.trim())  { e.ownerEmail = 'Owner email is required'; ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail.trim())) { e.ownerEmail = 'Enter a valid email'; ok = false; }
    if (!form.ownerPhone.trim())  { e.ownerPhone = 'Phone number is required'; ok = false; }
    else if (!/^[0-9]{10}$/.test(form.ownerPhone.trim())) { e.ownerPhone = 'Phone must be exactly 10 digits'; ok = false; }
    if (form.images.length === 0) { e.images = 'Upload at least one image'; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = async () => {
    if (!validate()) { Alert.alert('Validation Error', 'Please fix the errors before submitting.'); return; }
    try {
      setLoading(true);
      if (isAdmin) {
        await uploadAppDirectApi(form);
        await refreshApps();
        Alert.alert('✅ Published!', `"${form.title}" is now live in the marketplace.`,
          [{ text: 'Go to Admin Home', onPress: () => navigation.navigate('AdminHome') }]);
      } else {
        // ✅ uploadAppApi — backend creates SUBMISSION notification for ADMIN only
        await uploadAppApi(form);
        Alert.alert('✅ Submitted', 'App sent to admin for approval. It will be visible after approval.',
          [{ text: 'Go to Home', onPress: () => navigation.navigate('Home') }]);
        // ✅ NO local addNotification call — user doesn't get notified on their own upload
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Upload failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
           <Pressable
  onPress={() => navigation.goBack()}
  style={({ pressed }) => [
    styles.backBtn,
    pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
  ]}
>
  <Ionicons name="arrow-back" size={20} color="#fff" />
</Pressable>
        <View>
          {isAdmin && (
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>⚙ ADMIN</Text>
            </View>
          )}
          <Text style={styles.headerTitle}>{isAdmin ? 'Publish App' : 'Upload App'}</Text>
          <Text style={styles.headerSub}>
            {isAdmin ? 'Goes live immediately' : 'Submitted for approval'}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

          {isAdmin && (
            <View style={styles.adminBanner}>
              <Text style={styles.adminBannerIcon}>⚙</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.adminBannerTitle}>Admin Upload</Text>
                <Text style={styles.adminBannerText}>
                  This app will be published directly — no approval needed.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>App Images</Text>
            <Text style={styles.sectionSubtitle}>
              Crop each image to pick the best area, or add multiple at once. First image = cover.
            </Text>

            <View style={styles.cropTipRow}>
              <Text style={styles.cropTipIcon}>✂️</Text>
              <Text style={styles.cropTipText}>
                Use "Select & Crop" to open the crop editor and drag to pick the important area of each image.
              </Text>
            </View>

            {form.images.length > 0 && (
              <View style={styles.imageGrid}>
                {form.images.map((img, index) => (
                  <ImageThumb key={`${img.uri}-${index}`} img={img} index={index} onRemove={removeImage} />
                ))}
                {form.images.length < 5 && (
                  <Pressable
                    onPress={pickOneWithCrop}
                    style={({ pressed }) => [styles.addMoreThumb, pressed && { opacity: 0.80 }]}
                  >
                    <Text style={styles.addMoreIcon}>＋</Text>
                    <Text style={styles.addMoreText}>Crop & Add</Text>
                    <Text style={styles.addMoreCount}>{form.images.length}/5</Text>
                  </Pressable>
                )}
              </View>
            )}

            {form.images.length === 0 && (
              <Pressable
                onPress={pickOneWithCrop}
                style={({ pressed }) => [
                  styles.emptyImagePicker,
                  errors.images ? styles.imagePickerError : null,
                  pressed && { opacity: 0.80 },
                ]}
              >
                <View style={styles.emptyImagePickerInner}>
                  <View style={styles.uploadIconCircle}>
                    <Text style={styles.uploadPlaceholderIcon}>✂️</Text>
                  </View>
                  <Text style={styles.uploadPlaceholderTitle}>Select & Crop Image</Text>
                  <Text style={styles.uploadPlaceholderText}>
                    Tap to pick an image and drag to crop the area you want
                  </Text>
                  <View style={styles.uploadHintRow}>
                    <Text style={styles.uploadHint}>JPG · PNG · WEBP</Text>
                    <View style={styles.uploadHintDot} />
                    <Text style={styles.uploadHint}>Up to 5 images</Text>
                  </View>
                </View>
              </Pressable>
            )}

            {errors.images ? <Text style={[styles.errorText, { marginTop: 6 }]}>⚠ {errors.images}</Text> : null}

            <View style={styles.imageActionsRow}>
              {form.images.length < 5 && (
                <Pressable
                  onPress={pickOneWithCrop}
                  disabled={pickingImage}
                  style={({ pressed }) => [styles.cropActionBtn, pressed && { opacity: 0.80 }]}
                >
                  <Text style={styles.cropActionBtnText}>
                    {pickingImage ? 'Opening...' : '✂️  Select & Crop'}
                  </Text>
                </Pressable>
              )}
              {form.images.length < 5 && (
                <Pressable
                  onPress={pickMultipleNoCrop}
                  disabled={pickingImage}
                  style={({ pressed }) => [styles.secondaryActionBtn, pressed && { opacity: 0.80 }]}
                >
                  <Text style={styles.secondaryActionBtnText}>
                    {`📂  Add Multiple (${form.images.length}/5)`}
                  </Text>
                </Pressable>
              )}
              {form.images.length > 0 && (
                <Pressable
                  onPress={() => updateField('images', [])}
                  style={({ pressed }) => [styles.removeActionBtn, pressed && { opacity: 0.80 }]}
                >
                  <Text style={styles.removeActionBtnText}>Clear</Text>
                </Pressable>
              )}
            </View>

            {form.images.length > 0 && (
              <View style={styles.imageCountRow}>
                {form.images.map((_, i) => (
                  <View key={i} style={[styles.imageCountDot, i === 0 && styles.imageCountDotActive]} />
                ))}
                <Text style={styles.imageCountText}>
                  {form.images.length} image{form.images.length !== 1 ? 's' : ''} selected
                </Text>
              </View>
            )}

            <Field label="App Title *" value={form.title}
              onChangeText={t => updateField('title', t)}
              placeholder="Enter app title" error={errors.title} />

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.categoryRow}>
                {CATEGORIES.map(cat => (
                  <Pressable key={cat} onPress={() => updateField('category', cat)}
                    style={({ pressed }) => [
                      styles.categoryChip,
                      form.category === cat && styles.categoryChipActive,
                      pressed && { opacity: 0.80 },
                    ]}>
                    <Text style={[styles.categoryChipText, form.category === cat && styles.categoryChipTextActive]}>
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.category ? <Text style={styles.errorText}>⚠ {errors.category}</Text> : null}
            </View>

            <Field label="Description *" value={form.description} onChangeText={t => updateField('description', t)} placeholder="Enter app description" multiline error={errors.description} />
            <Field label="Price (₹) *" value={form.price} onChangeText={t => updateField('price', t.replace(/[^0-9.]/g, ''))} placeholder="e.g. 49999" keyboardType="numeric" error={errors.price} />
            <Field label="Owner Name *" value={form.ownerName} onChangeText={t => updateField('ownerName', t)} placeholder="Enter owner name" error={errors.ownerName} />
            <Field label="Owner Email *" value={form.ownerEmail} onChangeText={t => updateField('ownerEmail', t)} placeholder="owner@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.ownerEmail} />
            <Field label="Owner Phone * (10 digits)" value={form.ownerPhone} onChangeText={t => updateField('ownerPhone', t.replace(/[^0-9]/g, ''))} placeholder="10-digit mobile number" keyboardType="phone-pad" maxLength={10} error={errors.ownerPhone} />
            <Field label="Company" value={form.company} onChangeText={t => updateField('company', t)} placeholder="Enter company name" error={errors.company} />
            <Field label="Features" value={form.features} onChangeText={t => updateField('features', t)} placeholder="Enter key features" multiline error={errors.features} />

            <Pressable style={[styles.submitBtnWrap, { marginTop: 4 }]} onPress={handleSubmit} disabled={loading}>
              <LinearGradient
                colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.submitBtn}
              >
                <Text style={styles.submitBtnText}>
                  {loading
                    ? (isAdmin ? 'Publishing...' : 'Submitting...')
                    : (isAdmin ? '⚡ Publish Now' : 'Submit App')}
                </Text>
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
  safeArea:        { flex: 1, backgroundColor: BG },
  header:          { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: BORDER, backgroundColor: BG },
  backBtn:         { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: CARD, borderWidth: 1, borderColor: BORDER },
  backText:        { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  adminBadge:      { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 3, backgroundColor: 'rgba(168,85,247,0.18)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.36)', marginBottom: 2 },
  adminBadgeText:  { color: '#C084FC', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  headerTitle:     { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  headerSub:       { color: 'rgba(255,255,255,0.38)', fontSize: 11 },
  container:       { flexGrow: 1, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 40 },
  adminBanner:     { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 14, borderWidth: 1, borderColor: TEAL_BORDER, backgroundColor: TEAL_DIM, padding: 12, marginBottom: 14 },
  adminBannerIcon: { fontSize: 20 },
  adminBannerTitle:{ color: TEAL, fontSize: 12, fontWeight: '800', marginBottom: 2 },
  adminBannerText: { color: 'rgba(255,255,255,0.55)', fontSize: 11, lineHeight: 15 },
  card:            { backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, borderRadius: 20, padding: 15 },
  sectionTitle:    { color: '#FFFFFF', fontSize: 14, fontWeight: '800', marginBottom: 3 },
  sectionSubtitle: { color: 'rgba(255,255,255,0.45)', fontSize: 11, marginBottom: 10 },
  cropTipRow:      { flexDirection: 'row', alignItems: 'flex-start', gap: 7, backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER, borderRadius: 11, padding: 9, marginBottom: 13 },
  cropTipIcon:     { fontSize: 13, lineHeight: 19 },
  cropTipText:     { flex: 1, color: 'rgba(255,255,255,0.60)', fontSize: 11, lineHeight: 16 },
  imageGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 11 },
  imageThumbWrap:  { width: THUMB_W, height: THUMB_H, borderRadius: 13, overflow: 'hidden', position: 'relative', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: BORDER },
  coverBadge:      { position: 'absolute', top: 7, left: 7, backgroundColor: 'rgba(103,232,240,0.92)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  coverBadgeText:  { color: '#0A2A2B', fontSize: 8, fontWeight: '800' },
  indexBadge:      { position: 'absolute', bottom: 7, left: 7, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.65)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.20)' },
  indexBadgeText:  { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
  removeImageBtn:  { position: 'absolute', top: 7, right: 7, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,50,80,0.88)', alignItems: 'center', justifyContent: 'center' },
  removeImageBtnText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  addMoreThumb:    { width: THUMB_W, height: THUMB_H, borderRadius: 13, backgroundColor: CARD, borderWidth: 1.5, borderColor: TEAL_BORDER, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 3 },
  addMoreIcon:     { color: TEAL, fontSize: 26, fontWeight: '300', lineHeight: 30 },
  addMoreText:     { color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: '700' },
  addMoreCount:    { color: 'rgba(103,230,232,0.65)', fontSize: 9, fontWeight: '600' },
  emptyImagePicker:        { borderRadius: 16, overflow: 'hidden', marginBottom: 9, borderWidth: 1.5, borderColor: TEAL_BORDER, borderStyle: 'dashed' },
  imagePickerError:         { borderColor: '#FF5252' },
  emptyImagePickerInner:   { paddingVertical: 30, alignItems: 'center', backgroundColor: TEAL_DIM },
  uploadIconCircle:        { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(103,230,232,0.12)', borderWidth: 1, borderColor: TEAL_BORDER, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  uploadPlaceholderIcon:   { fontSize: 20 },
  uploadPlaceholderTitle:  { color: '#FFFFFF', fontSize: 14, fontWeight: '800', marginBottom: 5 },
  uploadPlaceholderText:   { color: 'rgba(255,255,255,0.50)', fontSize: 12, textAlign: 'center', marginBottom: 10, paddingHorizontal: 18 },
  uploadHintRow:           { flexDirection: 'row', alignItems: 'center', gap: 6 },
  uploadHint:              { color: 'rgba(255,255,255,0.28)', fontSize: 10, fontWeight: '600' },
  uploadHintDot:           { width: 3, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.18)' },
  imageActionsRow:         { flexDirection: 'row', gap: 7, marginBottom: 5, flexWrap: 'wrap' },
  cropActionBtn:           { flex: 1, minHeight: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: TEAL_DIM, borderWidth: 1, borderColor: TEAL_BORDER },
  cropActionBtnText:       { color: TEAL, fontSize: 11, fontWeight: '800' },
  secondaryActionBtn:      { flex: 1, minHeight: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: CARD, borderWidth: 1, borderColor: BORDER },
  secondaryActionBtnText:  { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  removeActionBtn:         { minWidth: 68, minHeight: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,80,80,0.09)', borderWidth: 1, borderColor: 'rgba(255,80,80,0.22)', paddingHorizontal: 11 },
  removeActionBtnText:     { color: '#FF5252', fontSize: 11, fontWeight: '700' },
  imageCountRow:           { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 14, marginTop: 3 },
  imageCountDot:           { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.22)' },
  imageCountDotActive:     { backgroundColor: TEAL, width: 12 },
  imageCountText:          { color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: '600', marginLeft: 3 },
  categoryRow:             { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 3 },
  categoryChip:            { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER },
  categoryChipActive:      { backgroundColor: TEAL_DIM, borderColor: TEAL_BORDER },
  categoryChipText:        { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '600' },
  categoryChipTextActive:  { color: TEAL, fontWeight: '800' },
  fieldWrap:               { marginBottom: 13 },
  label:                   { color: '#FFFFFF', fontSize: 12, fontWeight: '700', marginBottom: 7 },
  input:                   { minHeight: 48, borderRadius: 13, borderWidth: 1, borderColor: BORDER, backgroundColor: CARD, paddingHorizontal: 13, color: '#FFFFFF', fontSize: 13 },
  inputMultiline:          { minHeight: 105, textAlignVertical: 'top', paddingTop: 13 },
  inputError:              { borderColor: '#FF5252' },
  errorText:               { color: '#FF5252', fontSize: 11, marginTop: 3, fontWeight: '600' },
  submitBtnWrap:           { borderRadius: 15, overflow: 'hidden', marginBottom: 11, elevation: 4 },
  submitBtn:               { minHeight: 50, alignItems: 'center', justifyContent: 'center' },
  submitBtnText:           { color: '#0A2A2B', fontSize: 14, fontWeight: '800' },
  cancelBtn:               { minHeight: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: CARD, borderWidth: 1, borderColor: BORDER },
  cancelBtnText:           { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
});