import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadVoice, getVoiceMessages, startVideoSession, getVideoSessions } from '../api/voiceVideo';

const VoiceMultimodalScreen = () => {
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [videoSessions, setVideoSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = 1; // Replace with real user ID if available

  const handleUploadVoice = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
      if (result.type === 'success') {
        setLoading(true);
        await uploadVoice(userId, result);
        Alert.alert('Success', 'Voice message uploaded!');
        await fetchVoiceMessages();
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to upload voice message.');
    }
    setLoading(false);
  };

  const fetchVoiceMessages = async () => {
    setLoading(true);
    try {
      const msgs = await getVoiceMessages(userId);
      setVoiceMessages(msgs);
    } catch {
      Alert.alert('Error', 'Failed to fetch voice messages.');
    }
    setLoading(false);
  };

  const handleStartVideo = async () => {
    setLoading(true);
    try {
      await startVideoSession(userId, 'General Q&A');
      Alert.alert('Success', 'Video session started!');
      await fetchVideoSessions();
    } catch {
      Alert.alert('Error', 'Failed to start video session.');
    }
    setLoading(false);
  };

  const fetchVideoSessions = async () => {
    setLoading(true);
    try {
      const sessions = await getVideoSessions(userId);
      setVideoSessions(sessions);
    } catch {
      Alert.alert('Error', 'Failed to fetch video sessions.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice & Multimodal Interaction</Text>
      <Button title="Upload Voice Message" onPress={handleUploadVoice} disabled={loading} />
      <Button title="Fetch Voice Messages" onPress={fetchVoiceMessages} disabled={loading} />
      <FlatList
        data={voiceMessages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Voice: {item.file_url}</Text>
            <Text>Transcript: {item.transcript}</Text>
          </View>
        )}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Voice Messages</Text>}
      />
      <Button title="Start Video Q&A" onPress={handleStartVideo} disabled={loading} />
      <Button title="Fetch Video Sessions" onPress={fetchVideoSessions} disabled={loading} />
      <FlatList
        data={videoSessions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Topic: {item.topic}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Video Sessions</Text>}
      />
      <Text style={styles.desc}>AR/VR career exploration coming soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  desc: { fontSize: 16, marginBottom: 24, textAlign: 'center' },
  sectionTitle: { fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  card: { borderWidth: 1, borderColor: '#1976d2', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#e3f2fd' },
});

export default VoiceMultimodalScreen;
