import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';

const mockProjects = [
  {
    id: '1',
    user: 'John D.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    title: 'Kitchen Cabinet Assembly',
    description: 'Just got new cabinets from IKEA. Could use an extra pair of hands!',
    image: 'https://via.placeholder.com/400x200.png?text=Kitchen+Cabinets',
    isLive: true,
  },
  {
    id: '2',
    user: 'Jane S.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    title: 'Garden Weeding Marathon',
    description: 'My garden is overgrown with weeds. Anyone free to help me tackle it this weekend?',
    image: 'https://via.placeholder.com/400x200.png?text=Garden+Work',
    isLive: false,
  },
  {
    id: '3',
    user: 'Mike B.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    title: 'Painting the Fence',
    description: 'The weather is perfect for painting. I have all the supplies, just need some company.',
    image: 'https://via.placeholder.com/400x200.png?text=Fence+Painting',
    isLive: true,
  },
];

const ProjectCard = ({ project }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Image source={{ uri: project.avatar }} style={styles.avatar} />
      <Text style={styles.user}>{project.user}</Text>
      {project.isLive && <View style={styles.liveBadge}><Text style={styles.liveText}>LIVE</Text></View>}
    </View>
    <Image source={{ uri: project.image }} style={styles.projectImage} />
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{project.title}</Text>
      <Text style={styles.cardDescription}>{project.description}</Text>
    </View>
  </View>
);

const HelpIncomingScreen = () => {
  return (
    <FlatList
      style={styles.container}
      data={mockProjects}
      renderItem={({ item }) => <ProjectCard project={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={<Text style={styles.title}>Help Incoming</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  user: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  liveBadge: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 'auto',
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  projectImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HelpIncomingScreen;
