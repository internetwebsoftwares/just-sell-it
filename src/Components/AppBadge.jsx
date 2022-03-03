import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DefaultTheme } from "react-native-paper";

export default function AppBadge({ children }) {
  return (
    <View style={styles.badge}>
      <Text style={{ color: DefaultTheme.colors.primary, fontWeight: "bold" }}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    padding: 2,
    paddingHorizontal: 4,
    marginRight: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: DefaultTheme.colors.primaryLight,
  },
});
