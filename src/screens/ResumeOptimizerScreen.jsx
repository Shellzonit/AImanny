import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

const resumeTips = [
  'Use action verbs to describe your accomplishments.',
  'Quantify your achievements with numbers and data.',
  'Tailor your resume to the specific job you are applying for.',
  'Include keywords from the job description.',
  'Proofread your resume multiple times for spelling and grammar errors.',
];

const ResumeOptimizerScreen = () => {
  const [resumeText, setResumeText] = useState('');
  const [grade, setGrade] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const gradeResume = () => {
    setIsLoading(true);
    setGrade(null);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 31) + 70; // Random score between 70 and 100
      setGrade(score);
      setIsLoading(false);
    }, 2000); // Simulate bot thinking for 2 seconds
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nanny Bot: Resume Optimizer</Text>
      <TextInput
        style={styles.resumeInput}
        multiline
        placeholder="Paste your resume here, and I'll give you my feedback!"
        value={resumeText}
        onChangeText={setResumeText}
      />
      <TouchableOpacity style={styles.gradeButton} onPress={gradeResume} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.gradeButtonText}>Grade My Resume</Text>
        )}
      </TouchableOpacity>

      {grade !== null && (
        <View style={styles.resultsContainer}>
          <Text style={styles.gradeText}>Nanny Bot says: Your resume grade is {grade}/100!</Text>
          <Text style={styles.tipsTitle}>Here are some tips to improve your score:</Text>
          {resumeTips.map((tip, index) => (
            <Text key={index} style={styles.tipItem}>• {tip}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  resumeInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    height: 300,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 16,
  },
  gradeButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  gradeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 24,
  },
  gradeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#388e3c',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ResumeOptimizerScreen;
