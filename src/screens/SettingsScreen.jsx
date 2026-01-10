
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Button
        title="Robot Device & Food Ordering Opt-In"
        color="#d00"
        onPress={() => navigation.navigate('RobotOptIn')}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  text: { fontSize: 24, marginBottom: 24 }
});

export default SettingsScreen;
