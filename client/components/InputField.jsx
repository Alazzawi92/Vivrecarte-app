import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const InputField = ({ error, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
      {error ? <Text style={styles.error}>{String(error)}</Text> : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#000",
    backgroundColor: "#fff",
  },
  error: {
    marginTop: 6,
    color: "#d11a2a",
    fontSize: 12,
  },
});