
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { generateCoverLetter } from '../utils/coverLetterGenerator';

const ResumeEditorScreen = ({ onEvaluate }) => {
  const [resume, setResume] = useState('');
  const [feedback, setFeedback] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleEvaluate = () => {
    if (onEvaluate) {
      const result = onEvaluate(resume);
      setFeedback(result.feedback);
    }
  };

  const handleGenerateCoverLetter = () => {
    // For demo, userInfo is empty; can be extended to include user profile
    const letter = generateCoverLetter(resume, jobDescription, {});
    setCoverLetter(letter);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Write or Paste Your Resume</Text>
      <TextInput
        style={styles.input}
        value={resume}
        onChangeText={setResume}
        placeholder="Type or paste your resume here..."
        multiline
        numberOfLines={12}
      />
      <Button title="Evaluate Resume" onPress={handleEvaluate} />
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <Text style={styles.title}>Generate Cover Letter</Text>
      <TextInput
        style={styles.input}
        value={jobDescription}
        onChangeText={setJobDescription}
        placeholder="Paste the job description here..."
        multiline
        numberOfLines={6}
      />
      <Button title="Generate Cover Letter" onPress={handleGenerateCoverLetter} />
      {coverLetter ? (
        <View style={styles.coverLetterBox}>
          <Text style={styles.coverLetterTitle}>Your AI-Generated Cover Letter:</Text>
          <Text style={styles.coverLetter}>{coverLetter}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, minHeight: 80, marginBottom: 12, textAlignVertical: 'top' },
  feedback: { marginTop: 16, fontSize: 16, color: '#007bff' },
  coverLetterBox: { marginTop: 20, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 8 },
  coverLetterTitle: { fontWeight: 'bold', marginBottom: 8 },
  coverLetter: { fontSize: 16, color: '#333' }
});

export default ResumeEditorScreen;
