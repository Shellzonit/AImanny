import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransitionDirectoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>State-by-State AI Transition Directory</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 }
});

export default TransitionDirectoryScreen;
