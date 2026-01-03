import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmployerPortalScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Employer Job Posting Portal</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 }
});

export default EmployerPortalScreen;
