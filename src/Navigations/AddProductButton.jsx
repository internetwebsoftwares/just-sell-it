import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme } from "react-native-paper";

export default function AddProductButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <MaterialCommunityIcons color="white" size={25} name="plus-circle" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DefaultTheme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 50,
    bottom: 20,
    borderColor: "#fff",
    borderWidth: 4,
    borderStyle: "solid",
  },
});
