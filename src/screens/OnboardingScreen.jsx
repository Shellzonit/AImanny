import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToastLogo from '../components/ToastLogo';

const OnboardingScreen = () => (
  <View style={styles.container}>
    <ToastLogo width={80} height={80} />
    <Text style={styles.text}>Welcome to Toast!</Text>
    <Text style={styles.tagline}>
      A toast isn’t just a toast—unless it covers multiple needs.
    </Text>
    <Text style={styles.subtext}>
      (A toast to life, nourishment, and support—your all-in-one companion.)
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8E1' },
  text: { fontSize: 28, fontWeight: 'bold', marginTop: 24, marginBottom: 12, color: '#C68642' },
  tagline: { fontSize: 18, color: '#795548', textAlign: 'center', marginHorizontal: 24, marginBottom: 12 },
  subtext: { fontSize: 14, color: '#4E342E', textAlign: 'center', marginHorizontal: 24 },
});

export default OnboardingScreen;
