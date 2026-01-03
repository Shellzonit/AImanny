import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToastLogo from '../components/ToastLogo';

const ProfileScreen = () => (
  <View style={styles.container}>
    <ToastLogo width={56} height={56} />
    <Text style={styles.tagline}>A toast isn’t just a toast—unless it covers multiple needs.</Text>
    <Text style={styles.text}>Profile Screen</Text>
  </View>
);

  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#FFF8E1' },
    logo: { marginTop: 32, marginBottom: 12 },
    tagline: { fontSize: 16, color: '#795548', textAlign: 'center', marginBottom: 8, fontStyle: 'italic', maxWidth: 320 },
    name: { fontSize: 24, fontWeight: 'bold', marginTop: 8, color: '#C68642' },
    info: { fontSize: 16, color: '#4E342E', marginTop: 4, marginBottom: 8 },
    card: { backgroundColor: '#FFF8E1', borderRadius: 12, padding: 18, marginVertical: 12, width: '90%', shadowColor: '#C68642', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F5DEB3' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#795548' },
    editButton: { marginTop: 16, width: 180, backgroundColor: '#F5DEB3', borderRadius: 8 },
  });

export default ProfileScreen;
