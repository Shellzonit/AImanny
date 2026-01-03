import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { analyzeSkills } from '../api/skillGap';
import { getLessons, updateProgress, getUserProgress } from '../api/microlearning';

const SkillGapScreen = () => {
  const [targetRole, setTargetRole] = useState('');
  const [missingSkills, setMissingSkills] = useState([]);
  const [suggestedLessons, setSuggestedLessons] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);

  const userId = 1; // Replace with real user ID if available

  const handleAnalyzeSkills = async () => {
    setLoading(true);
    try {
      const data = await analyzeSkills(userId, targetRole);
      setMissingSkills(data.missing_skills);
      // Fetch micro-lessons for each missing skill from real endpoint
      let lessons = [];
      for (const skill of data.missing_skills) {
        try {
          const skillLessons = await getLessons(skill);
          lessons = lessons.concat(skillLessons);
        } catch {}
      }
      setSuggestedLessons(lessons);
      await fetchProgress();
    } catch (e) {
      Alert.alert('Error', 'Could not analyze skills.');
    }
    setLoading(false);
  };

  const fetchProgress = async () => {
    try {
      const progArr = await getUserProgress(userId);
      // Convert to a map for easy lookup
      const progMap = {};
      for (const p of progArr) {
        progMap[p.lesson_id] = p;
      }
      setProgress(progMap);
    } catch {}
  };

  const handleCompleteLesson = async (lessonId) => {
    setLoading(true);
    try {
      await updateProgress(userId, lessonId, true, 100);
      await fetchProgress();
      Alert.alert('Success', 'Lesson marked as complete!');
    } catch {
      Alert.alert('Error', 'Could not update progress.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skill Gap Analyzer</Text>
      <TextInput
        style={styles.input}
        placeholder="Target Role (e.g. Data Scientist)"
        value={targetRole}
        onChangeText={setTargetRole}
      />
      <Button title={loading ? 'Analyzing...' : 'Analyze Skills'} onPress={handleAnalyzeSkills} disabled={loading} />
      <Text style={styles.sectionTitle}>Missing Skills:</Text>
      <FlatList
        data={missingSkills}
        keyExtractor={item => item}
        renderItem={({ item }) => <Text style={styles.skill}>{item}</Text>}
      />
      <Text style={styles.sectionTitle}>Suggested Micro-Lessons:</Text>
      <FlatList
        data={suggestedLessons}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const prog = progress[item.id];
          return (
            <View style={styles.lessonCard}>
              <Text style={styles.lessonSkill}>{item.skill}</Text>
              <Text>{item.content}</Text>
              <Text>Status: {prog?.completed ? 'Completed' : 'Incomplete'}</Text>
              {!prog?.completed && (
                <Button title="Mark Complete" onPress={() => handleCompleteLesson(item.id)} disabled={loading} />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  sectionTitle: { fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  skill: { fontSize: 16, marginBottom: 4 },
  lessonCard: { borderWidth: 1, borderColor: '#1976d2', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#e3f2fd' },
  lessonSkill: { fontWeight: 'bold', marginBottom: 4 },
});

export default SkillGapScreen;
