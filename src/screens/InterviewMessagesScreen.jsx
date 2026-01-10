import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const goodLuckMessages = [
  { id: '1', user: 'Community Member', message: 'You've got this! Stay confident.' },
  { id: '2', user: 'Fellow Job Seeker', message: 'Wishing you all the best! Let us know how it goes.' },
];

const congratulationsMessage = {
  interviewer: 'Jane Smith, Hiring Manager at Innovate Corp',
  message: 'Congratulations on the offer! We were very impressed with your interview and are excited to have you join our team.',
};

const InterviewMessagesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Interview Messages</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Good Luck Wishes</Text>
        {goodLuckMessages.map(item => (
          <View key={item.id} style={styles.messageCard}>
            <Text style={styles.messageUser}>{item.user}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Congratulations!</Text>
        <View style={styles.messageCard}>
          <Text style={styles.messageUser}>{congratulationsMessage.interviewer}</Text>
          <Text style={styles.messageText}>{congratulationsMessage.message}</Text>
        </View>
      </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1976d2',
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  messageUser: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#555',
  },
});

export default InterviewMessagesScreen;
