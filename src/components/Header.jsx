import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToastLogo from './ToastLogo';

const Header = ({ title }) => (
  <View style={styles.container}>
    <View style={styles.logoRow}>
      <ToastLogo width={32} height={32} />
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFF8E1', alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 12, color: '#795548' }
});

export default Header;
