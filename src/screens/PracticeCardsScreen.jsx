import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const practiceCards = [
  {
    question: 'What are your salary expectations?',
    answer: 'Research the average salary for this role in your location. Give a range, not a specific number.',
  },
  {
    question: 'Why should we hire you?',
    answer: 'Highlight your unique skills and experience that align with the job description. Connect your accomplishments to the company's goals.',
  },
  {
    question: 'Do you have any questions for us?',
    answer: 'Always have a few thoughtful questions prepared. Ask about the team, the company culture, or the challenges of the role.',
  },
];

const PracticeCardsScreen = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    if (currentCardIndex < practiceCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nanny Bot: Practice Cards</Text>
      <TouchableOpacity style={styles.card} onPress={() => setIsFlipped(!isFlipped)}>
        <Text style={styles.cardText}>
          {isFlipped ? practiceCards[currentCardIndex].answer : practiceCards[currentCardIndex].question}
        </Text>
      </TouchableOpacity>
      
      {currentCardIndex < practiceCards.length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={nextCard}>
          <Text style={styles.nextButtonText}>Next Card</Text>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
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

export default PracticeCardsScreen;
