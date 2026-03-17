import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading({ label = 'Loading...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2bd3bd" />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#2bd3bd',
  },
});