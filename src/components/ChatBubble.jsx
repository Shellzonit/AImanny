import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isUser }) => (
  <View style={[styles.bubble, isUser ? styles.user : styles.bot]}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  bubble: { padding: 10, borderRadius: 16, marginVertical: 4, maxWidth: '80%' },
  user: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
  bot: { backgroundColor: '#e5e5ea', alignSelf: 'flex-start' },
  text: { color: '#fff' }
});

export default ChatBubble;
