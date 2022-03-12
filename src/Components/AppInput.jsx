import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function AppInput({ ...props }) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});
