import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FeatureCard = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

const CareerScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Career Hub</Text>
      
      <FeatureCard
        title="Find AI Jobs"
        description="Search for jobs by location, pay, and qualifications."
        onPress={() => navigation.navigate('JobSearch')}
      />
      <FeatureCard
        title="Resume Optimizer"
        description="Get resume tips and a grade for your current resume."
        onPress={() => navigation.navigate('ResumeOptimizer')}
      />
      <FeatureCard
        title="Interview Practice"
        description="Prepare with mock interviews and practice cards."
        onPress={() => navigation.navigate('InterviewPractice')}
      />
      <FeatureCard
        title="Interview Messages"
        description="View good luck wishes and congratulatory messages."
        onPress={() => navigation.navigate('InterviewMessages')}
      />

      <TouchableOpacity 
        style={styles.homelifeButton} 
        onPress={() => navigation.navigate('Homelife')}
      >
        <Text style={styles.homelifeButtonText}>After you get the job</Text>
      </TouchableOpacity>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
  },
  homelifeButton: {
    backgroundColor: '#388e3c',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    alignItems: 'center',
  },
  homelifeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CareerScreen;
