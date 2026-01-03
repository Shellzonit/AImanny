
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResumeBuilderScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resume + Cover Letter Builder</Text>
      <Text style={styles.instructions}>
        Easily write or paste your resume, then let Mr. Nanny evaluate it and match you with the best AI job.
      </Text>
      <Button
        title="Open Resume Editor"
        onPress={() => navigation.navigate('ResumeEditor')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  text: { fontSize: 24, marginBottom: 16 },
  instructions: { fontSize: 16, color: '#555', marginBottom: 24, textAlign: 'center' }
});

export default ResumeBuilderScreen;
