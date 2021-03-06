import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DefaultTheme } from "react-native-paper";

export default function OR() {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text
        style={{ marginHorizontal: 12, color: DefaultTheme.colors.backdrop }}
      >
        or
      </Text>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: "#ccc",
  },
});
