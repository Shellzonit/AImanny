
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { getAttireAdvice, getCompanyCulture } from '../utils/interviewAdvice';

const InterviewPracticeScreen = () => {
  const [companyType, setCompanyType] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [attireAdvice, setAttireAdvice] = useState('');
  const [cultureAdvice, setCultureAdvice] = useState('');

  const handleAttireAdvice = () => {
    setAttireAdvice(getAttireAdvice(companyType.trim().toLowerCase(), role.trim().toLowerCase()));
  };

  const handleCultureAdvice = () => {
    setCultureAdvice(getCompanyCulture(companyName.trim()));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Interview Practice</Text>

      <Text style={styles.sectionTitle}>Get Attire Advice</Text>
      <TextInput
        style={styles.input}
        value={companyType}
        onChangeText={setCompanyType}
        placeholder="Company type (e.g. tech, finance, creative, corporate)"
      />
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRole}
        placeholder="Role (e.g. engineer, designer, manager)"
      />
      <Button title="Get Attire Advice" onPress={handleAttireAdvice} />
      {attireAdvice ? <Text style={styles.advice}>{attireAdvice}</Text> : null}

      <Text style={styles.sectionTitle}>Get Company Culture Insight</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={setCompanyName}
        placeholder="Company name (e.g. Google, Meta)"
      />
      <Button title="Get Culture Advice" onPress={handleCultureAdvice} />
      {cultureAdvice ? <Text style={styles.advice}>{cultureAdvice}</Text> : null}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', padding: 24 },
  text: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  advice: { marginTop: 8, fontSize: 16, color: '#007bff', backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 }
});

export default InterviewPracticeScreen;
