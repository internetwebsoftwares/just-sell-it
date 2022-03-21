import { StyleSheet, Text } from "react-native";
import React from "react";
import { DefaultTheme } from "react-native-paper";

export default function AppLink({ children, ...props }) {
  return (
    <Text {...props} style={[styles.link, props.style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: DefaultTheme.colors.primary,
  },
});
