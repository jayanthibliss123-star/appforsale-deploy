
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { resetPasswordApi } from '../utils/apiService';

export default function ResetPasswordScreen({ navigation, route }) {
  const { email } = route.params;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(120)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const match =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const handleUpdate = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }
    if (!match) {
      Alert.alert('Error', 'Passwords not matching');
      return;
    }

    try {
      setLoading(true);
      const res = await resetPasswordApi(email, newPassword);

      Alert.alert('Success', res.message, [
        { text: 'Login', onPress: () => navigation.navigate('SignIn') },
      ]);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141B27" />

      <LinearGradient
        colors={['#141B27', '#212C3D', '#182130']}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* 🔐 Icon */}
          <View style={styles.iconWrap}>
            <Text style={styles.iconText}>🔒</Text>
          </View>

          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your new password below
          </Text>

          {/* New Password */}
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />
            <Pressable onPress={() => setShowNew(!showNew)}>
              <Text style={styles.eye}>{showNew ? '🙈' : '👁️'}</Text>
            </Pressable>
          </View>

          {/* Confirm Password */}
          <View
            style={[
              styles.inputWrap,
              match && styles.inputSuccess,
              confirmPassword && !match && styles.inputError,
            ]}
          >
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
            <Pressable onPress={() => setShowConfirm(!showConfirm)}>
              <Text style={styles.eye}>{showConfirm ? '🙈' : '👁️'}</Text>
            </Pressable>
          </View>

          {/* Match text */}
          {match && <Text style={styles.success}>Passwords match</Text>}
          {confirmPassword && !match && (
            <Text style={styles.error}>Passwords do not match</Text>
          )}

          {/* Button */}
          <Pressable onPress={handleUpdate} disabled={!match}>
            <LinearGradient
              colors={['#4DEBFF', '#4DEBFF', '#4DEBFF']}
              style={[
                styles.button,
                !match && { opacity: 0.5 },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Update Password</Text>
              )}
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Back</Text>
          </Pressable>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#141B27' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },

  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  iconWrap: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: { fontSize: 30 },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    color: '#aaa',
    marginBottom: 20,
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#67E6E8',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
  },
  eye: { fontSize: 18 },

  inputSuccess: { borderColor: '#4CAF50' },
  inputError: { borderColor: '#FF5252' },

  success: { color: '#4CAF50', marginBottom: 10 },
  error: { color: '#FF5252', marginBottom: 10 },

  button: {
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
  },

  back: {
    marginTop: 15,
    textAlign: 'center',
    color: '#67E6E8',
  },
});