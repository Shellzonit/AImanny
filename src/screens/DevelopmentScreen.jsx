import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DevelopmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Development</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career</Text>
        <Text>Career-related content goes here.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wellness</Text>
        <Text>Wellness-related content goes here.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DevelopmentScreen;
