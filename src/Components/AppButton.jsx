import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function AppButton({ children, ...props }) {
  return (
    <Button style={styles.button} {...props}>
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
  },
});
