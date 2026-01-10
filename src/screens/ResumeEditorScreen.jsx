
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { generateCoverLetter } from '../utils/coverLetterGenerator';
import { evaluateResume } from '../api/resume';
import QRCode from 'qrcode.react';


const ResumeEditorScreen = () => {
  const [resume, setResume] = useState('');
  const [feedback, setFeedback] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);

  const handleEvaluate = async () => {
    setLoading(true);
    const result = await evaluateResume(resume);
    setFeedback(result.feedback);
    setLoading(false);
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
      <Button title={loading ? "Evaluating..." : "Evaluate Resume"} onPress={handleEvaluate} disabled={loading} />
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <TouchableOpacity style={styles.qrBtn} onPress={() => setQrVisible(true)} disabled={!resume}>
        <Text style={styles.qrBtnText}>Generate QR Code for Resume</Text>
      </TouchableOpacity>
      <Modal visible={qrVisible} transparent animationType="slide" onRequestClose={() => setQrVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Scan or Save Your Resume QR Code</Text>
            <QRCode value={resume || ' '} size={220} />
            <TouchableOpacity style={styles.closeBtn} onPress={() => setQrVisible(false)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  qrBtn: { backgroundColor: '#e6f0ff', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 12 },
  qrBtnText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center', width: 300 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  closeBtn: { marginTop: 18, backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24 },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  coverLetterBox: { marginTop: 20, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 8 },
  coverLetterTitle: { fontWeight: 'bold', marginBottom: 8 },
  coverLetter: { fontSize: 16, color: '#333' }
});

export default ResumeEditorScreen;
