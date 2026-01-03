
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';
import { createOrUpdateMentorProfile } from '../api/mentor';

const MentorSignupScreen = ({ userId = 1 }) => {
  const [bio, setBio] = useState('');
  const [expertise, setExpertise] = useState('');
  const [goals, setGoals] = useState('');
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await createOrUpdateMentorProfile(userId, { bio, expertise, goals, available });
      Alert.alert('Success', 'Mentor profile saved!');
    } catch (e) {
      Alert.alert('Error', 'Could not save profile.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mentor Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Short bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Expertise (comma separated)"
        value={expertise}
        onChangeText={setExpertise}
      />
      <TextInput
        style={styles.input}
        placeholder="Goals/Interests (comma separated)"
        value={goals}
        onChangeText={setGoals}
      />
      <View style={styles.switchRow}>
        <Text>Available for mentees</Text>
        <Switch value={available} onValueChange={setAvailable} />
      </View>
      <Button
        title={loading ? 'Saving...' : 'Save Profile'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
});

export default MentorSignupScreen;
