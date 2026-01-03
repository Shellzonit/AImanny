import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { findMentorMatches, assignMentor } from '../api/mentor';

const MentorMatchScreen = ({ userId = 1 }) => {
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFindMentors = async () => {
    setLoading(true);
    try {
      const query = [interests, goals].filter(Boolean).join(',');
      const mentors = await findMentorMatches(userId, query);
      setMatches(mentors);
    } catch (e) {
      Alert.alert('Error', 'Could not fetch mentors.');
    }
    setLoading(false);
  };

  const handleAssign = async (mentor) => {
    try {
      await assignMentor(userId, mentor.id);
      Alert.alert('Mentor Assigned', `You have been assigned to mentor #${mentor.id}`);
    } catch (e) {
      Alert.alert('Error', 'Could not assign mentor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Mentor</Text>
      <TextInput
        style={styles.input}
        placeholder="Your interests (comma separated)"
        value={interests}
        onChangeText={setInterests}
      />
      <TextInput
        style={styles.input}
        placeholder="Your goals (comma separated)"
        value={goals}
        onChangeText={setGoals}
      />
      <Button title={loading ? 'Searching...' : 'Find Mentors'} onPress={handleFindMentors} disabled={loading} />
      <FlatList
        data={matches}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.mentorCard}>
            <Text style={styles.mentorBio}>{item.bio}</Text>
            <Text>Expertise: {item.expertise}</Text>
            <Text>Goals: {item.goals}</Text>
            <Button title="Request Mentor" onPress={() => handleAssign(item)} />
          </View>
        )}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  mentorCard: { borderWidth: 1, borderColor: '#1976d2', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#e3f2fd' },
  mentorBio: { fontWeight: 'bold', marginBottom: 4 },
});

export default MentorMatchScreen;
