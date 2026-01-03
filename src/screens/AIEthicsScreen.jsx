import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Linking, Alert } from 'react-native';
import { listScenarios, listResources, getScenario, respondScenario, getUserResponses } from '../api/aiEthics';

const AIEthicsScreen = () => {
  const [scenarios, setScenarios] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [choice, setChoice] = useState('');
  const [reflection, setReflection] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = 1; // Replace with real user ID if available

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scenarios = await listScenarios();
        setScenarios(scenarios);
      } catch {
        Alert.alert('Error', 'Could not fetch scenarios.');
      }
      try {
        const resources = await listResources();
        setResources(resources);
      } catch {
        Alert.alert('Error', 'Could not fetch resources.');
      }
      try {
        const resp = await getUserResponses(userId);
        setResponses(resp);
      } catch {}
    };
    fetchData();
  }, []);

  const handleSelectScenario = async (id) => {
    setLoading(true);
    try {
      const scenario = await getScenario(id);
      setSelectedScenario(scenario);
      setChoice('');
      setReflection('');
    } catch {
      Alert.alert('Error', 'Could not load scenario.');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!choice) {
      Alert.alert('Please select a choice.');
      return;
    }
    setLoading(true);
    try {
      await respondScenario(selectedScenario.id, userId, choice, reflection);
      Alert.alert('Response submitted!');
      setSelectedScenario(null);
      setChoice('');
      setReflection('');
      const resp = await getUserResponses(userId);
      setResponses(resp);
    } catch {
      Alert.alert('Error', 'Could not submit response.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Ethics & Impact Explorer</Text>
      <Text style={styles.sectionTitle}>Scenarios:</Text>
      {!selectedScenario ? (
        <FlatList
          data={scenarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Button title="View Scenario" onPress={() => handleSelectScenario(item.id)} />
            </View>
          )}
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedScenario.title}</Text>
          <Text>{selectedScenario.description}</Text>
          {/* Assume choices is a JSON string array */}
          {JSON.parse(selectedScenario.choices || '[]').map((c, idx) => (
            <Button
              key={idx}
              title={c}
              color={choice === c ? '#8e24aa' : undefined}
              onPress={() => setChoice(c)}
            />
          ))}
          <Text style={{ marginTop: 12 }}>Reflection (optional):</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginTop: 4, marginBottom: 8 }}
            value={reflection}
            onChangeText={setReflection}
            placeholder="Share your thoughts..."
            multiline
          />
          <Button title={loading ? 'Submitting...' : 'Submit Response'} onPress={handleSubmit} disabled={loading} />
          <Button title="Back to Scenarios" onPress={() => setSelectedScenario(null)} />
        </View>
      )}
      <Text style={styles.sectionTitle}>Your Past Responses:</Text>
      <FlatList
        data={responses}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Scenario ID: {item.scenario_id}</Text>
            <Text>Choice: {item.choice}</Text>
            {item.reflection ? <Text>Reflection: {item.reflection}</Text> : null}
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Resources:</Text>
      <FlatList
        data={resources}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.summary}</Text>
            <Button title="Open" onPress={() => Linking.openURL(item.url)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  card: { borderWidth: 1, borderColor: '#8e24aa', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#f3e5f5' },
  cardTitle: { fontWeight: 'bold', marginBottom: 4 },
});

export default AIEthicsScreen;
