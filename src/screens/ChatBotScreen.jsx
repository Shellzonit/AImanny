
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import { sendMessage as sendChatbotMessage } from '../api/chatbot';
import { jobbotGlossary } from '../api/jobbotGlossary';

const ChatBotScreen = () => {

  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome! I am Mr. Nanny, your expert AI career and wellness mentor. I am here to guide you with proven strategies, insider tips, and practical wisdom for every step of your journey. Ask me anything—soak up the knowledge and let’s set you up for success!', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [glossaryVisible, setGlossaryVisible] = useState(false);

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
      <TouchableOpacity style={styles.glossaryBtn} onPress={() => setGlossaryVisible(true)}>
        <Text style={styles.glossaryBtnText}>❓ See what you can ask your expert coach</Text>
      </TouchableOpacity>
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
      <Modal
        visible={glossaryVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setGlossaryVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Expert Guidance: Questions to Ask Your Mentor</Text>
            <Text style={{fontSize:13, color:'#666', marginBottom:10, textAlign:'center'}}>
              These are the kinds of questions top performers ask their mentors. Don’t hesitate to dig deep, take notes, and soak up every insight—your growth is our mission!
            </Text>
            <ScrollView style={{maxHeight: 350}}>
              {jobbotGlossary.map((q, idx) => (
                <View key={idx} style={styles.qBox}>
                  <Text style={styles.qQ}>{q.question}</Text>
                  <Text style={styles.qA}>{q.answer}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setGlossaryVisible(false)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  disclaimer: { fontSize: 13, color: '#666', marginBottom: 8, fontStyle: 'italic', textAlign: 'center' },
  glossaryBtn: { alignSelf: 'center', backgroundColor: '#e6f0ff', padding: 8, borderRadius: 8, marginBottom: 8 },
  glossaryBtnText: { color: '#007AFF', fontWeight: 'bold' },
  chat: { flex: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginRight: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', maxWidth: 400, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  qBox: { marginBottom: 16, backgroundColor: '#f2f6fa', borderRadius: 8, padding: 12 },
  qQ: { fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  qA: { fontSize: 14, color: '#444' },
  closeBtn: { marginTop: 10, backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24 },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});

export default ChatBotScreen;
