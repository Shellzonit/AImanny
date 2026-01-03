import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SkillAssessmentScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Skill Assessment</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 }
});

export default SkillAssessmentScreen;
