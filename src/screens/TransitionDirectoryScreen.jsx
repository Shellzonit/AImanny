
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchTransitionChecklist } from '../api/transition';

const TransitionDirectoryScreen = () => {
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransitionChecklist().then(data => {
      setChecklist(data.transition_checklist || []);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post-Job-Offer Transition Checklist</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {checklist.map((item, idx) => (
            <View key={idx} style={styles.itemBox}>
              <Text style={styles.item}>{item.item}</Text>
              <Text style={styles.time}>{item.suggested_time}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  itemBox: { marginBottom: 18, padding: 16, backgroundColor: '#f2f6fa', borderRadius: 8, elevation: 1 },
  item: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  time: { fontSize: 14, color: '#555' }
});

export default TransitionDirectoryScreen;
