import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme } from "react-native-paper";
export default function MessageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}></View>
      <View style={styles.inputContainer}>
        <TextInput multiline placeholder="Enter message" style={styles.input} />
        <TouchableOpacity style={styles.sendButton}>
          <MaterialCommunityIcons name="send" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    backgroundColor: DefaultTheme.colors.primaryLight,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DefaultTheme.colors.primaryLight,
    padding: 12,
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 25,
    fontSize: 14,
    height: 50,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: DefaultTheme.colors.primary,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginLeft: 8,
  },
  msg: {
    padding: 12,
    borderRadius: 8,
    width: 200,
  },
  friendMsg: {
    backgroundColor: "white",
  },
  myMsg: {
    backgroundColor: DefaultTheme.colors.primary,
  },
});
