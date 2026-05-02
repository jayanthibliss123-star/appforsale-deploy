

import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';
import CommonFooter from '../components/CommonFooter';
import CommonHeader from '../components/common/CommonHeader';

export default function ManagementPlatformsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CommonHeader
        navigation={navigation}
        title="Management Platforms"
        subtitle="Scalable solutions for operations and control"
        showBack
        showLogo={false}
        onBackPress={() => navigation.goBack()}
        rightLabel="Contact"
        onRightPress={() => navigation.navigate('Contact')}
        onNotificationPress={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        <LinearGradient
          colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
          style={styles.heroBlock}
        >
          <View style={styles.heroEyebrowWrap}>
            <Text style={styles.heroEyebrow}>CATEGORY</Text>
          </View>
          <Text style={styles.heroTitle}>Management Platforms</Text>
          <Text style={styles.heroSubtitle}>
            Access powerful management platforms for operations, tracking, communication,
            and administration, built for scalability and efficiency.
          </Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Management Platforms</Text>
          <Text style={styles.sectionText}>
            • Enterprise Resource Planning (ERP){'\n'}
            • Project & Task Management{'\n'}
            • Analytics & Reporting Dashboards{'\n'}
            • Workflow Automation Tools{'\n'}
            • Communication & Collaboration Platforms
          </Text>
        </View>

        <CommonFooter app="Management Platforms" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 44,
    backgroundColor: COLORS.background,
  },
  heroBlock: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  heroEyebrowWrap: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(103,230,232,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(103,230,232,0.30)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  heroEyebrow: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 31,
    marginBottom: 10,
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});