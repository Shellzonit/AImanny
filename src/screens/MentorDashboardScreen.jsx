import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { getMenteesForMentor } from '../api/mentor';

const MentorDashboardScreen = ({ mentorId = 1 }) => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMentees = async () => {
      setLoading(true);
      try {
        const menteeList = await getMenteesForMentor(mentorId);
        setMentees(menteeList);
      } catch (e) {
        Alert.alert('Error', 'Could not fetch mentees.');
      }
      setLoading(false);
    };
    fetchMentees();
  }, [mentorId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Mentees</Text>
      <FlatList
        data={mentees}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menteeCard}>
            <Text style={styles.menteeName}>{item.name || 'Mentee'}</Text>
            {/* Add more mentee info here */}
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 24 }}>{loading ? 'Loading...' : 'No mentees assigned yet.'}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  menteeCard: { borderWidth: 1, borderColor: '#388e3c', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#e8f5e9' },
  menteeName: { fontWeight: 'bold', marginBottom: 4 },
});

export default MentorDashboardScreen;
