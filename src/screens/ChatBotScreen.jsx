import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import { sendMessage as sendChatbotMessage } from '../api/chatbot';

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! I am Mr. Nanny, your AI career and wellness assistant. How can I help you today?', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = 1; // Replace with real user ID if available

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now().toString(), text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await sendChatbotMessage(userId, input);
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text: res.reply, isUser: false }]);
    } catch (e) {
      Alert.alert('Error', 'Failed to get AI response.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.disclaimer}>
        <Text style={{fontWeight: 'bold'}}>Important:</Text> Mr. Nanny is here to empower and support you on your career journey. While we can’t guarantee a job offer from every interview, we promise to give you the best tools, guidance, and encouragement to help you grow, learn, and feel truly prepared for every opportunity ahead.
      </Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatBubble message={item.text} isUser={item.isUser} />}
        keyExtractor={item => item.id}
        style={styles.chat}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <Button title={loading ? '...' : 'Send'} onPress={sendMessage} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  disclaimer: { fontSize: 13, color: '#666', marginBottom: 8, fontStyle: 'italic', textAlign: 'center' },
  chat: { flex: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginRight: 8 }
});

export default ChatBotScreen;
