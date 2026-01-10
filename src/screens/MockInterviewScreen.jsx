import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';

const interviewQuestions = [
  "Tell me about yourself.",
  "What are your biggest strengths and weaknesses?",
  "Where do you see yourself in five years?",
  "Why do you want to work for this company?",
  "Describe a challenging situation you've faced at work and how you handled it.",
];

const MockInterviewScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of interview
      setCurrentQuestionIndex(interviewQuestions.length);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nanny Bot: Mock Interview</Text>
      <View style={styles.questionCard}>
        {currentQuestionIndex < interviewQuestions.length ? (
          <Text style={styles.questionText}>{interviewQuestions[currentQuestionIndex]}</Text>
        ) : (
          <Text style={styles.endText}>Great job! You've completed the mock interview.</Text>
        )}
      </View>
      
      {currentQuestionIndex < interviewQuestions.length && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
  },
  endText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#388e3c',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MockInterviewScreen;
