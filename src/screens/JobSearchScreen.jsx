import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Switch } from 'react-native';

const mockJobs = [
  { id: '1', title: 'AI/ML Engineer', company: 'Innovate Corp', location: 'San Francisco, CA', pay: '$150,000 - $180,000' },
  { id: '2', title: 'Data Scientist', company: 'Data Insights', location: 'New York, NY', pay: '$130,000 - $160,000' },
  { id: '3', title: 'Robotics Engineer', company: 'Future Bots', location: 'Boston, MA', pay: '$140,000 - $170,000' },
  { id: '4', title: 'NLP Specialist', company: 'LingoTech', location: 'Remote', pay: '$120,000 - $150,000' },
];

const JobCard = ({ job }) => (
  <View style={styles.jobCard}>
    <Text style={styles.jobTitle}>{job.title}</Text>
    <Text style={styles.jobCompany}>{job.company}</Text>
    <Text style={styles.jobLocation}>{job.location}</Text>
    <Text style={styles.jobPay}>{job.pay}</Text>
  </View>
);

const JobSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [useLocation, setUseLocation] = useState(true);

  const filteredJobs = mockJobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = !useLocation || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return titleMatch && locationMatch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find AI Jobs</Text>
      <View style={styles.filtersContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Search by title..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.locationContainer}>
          <Text style={styles.disclaimer}>Enable Location-Based Search</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={useLocation ? "#1976d2" : "#f4f3f4"}
            onValueChange={() => setUseLocation(!useLocation)}
            value={useLocation}
          />
        </View>
        <TextInput 
          style={[styles.input, !useLocation && styles.disabledInput]}
          placeholder="Filter by location..."
          value={locationFilter}
          onChangeText={setLocationFilter}
          editable={useLocation}
        />
      </View>
      <FlatList
        data={filteredJobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={item => item.id}
      />
    </View>
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
  filtersContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 16,
    color: '#666',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
    color: '#999',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  jobCompany: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginVertical: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
  },
  jobPay: {
    fontSize: 14,
    color: '#388e3c',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default JobSearchScreen;
