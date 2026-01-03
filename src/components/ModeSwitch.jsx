import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ModeSwitch = ({ isWellness, onToggle }) => (
  <View style={styles.switchRow}>
    <Text style={styles.label}>Career Mode</Text>
    <Switch
      value={isWellness}
      onValueChange={onToggle}
      thumbColor={isWellness ? '#4caf50' : '#2196f3'}
      trackColor={{ false: '#b3e5fc', true: '#c8e6c9' }}
    />
    <Text style={styles.label}>Wellness Mode</Text>
  </View>
);

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});

export default ModeSwitch;
