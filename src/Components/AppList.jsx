import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme } from "react-native-paper";

export default function AppList({ text, onPress, icon, color, themeColor }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <View style={{ flexDirection: "row" }}>
        {themeColor && (
          <View
            style={{
              width: 30,
              height: 20,
              borderRadius: 5,
              backgroundColor: themeColor,
              marginRight: 10,
            }}
          ></View>
        )}
        <Text
          style={{
            color: color === "red" ? DefaultTheme.colors.error : "#000",
          }}
        >
          {text}
        </Text>
      </View>

      {icon !== "no" && (
        <MaterialCommunityIcons name="chevron-right" size={28} color="#aaa" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listGroup: {
    width: "100%",
    overflow: "hidden",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderTopColor: "#e6e6e6",
    borderStyle: "solid",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000",
    height: 50,
  },
});
