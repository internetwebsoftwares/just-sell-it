import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppButton({ children, ...props }) {
  return (
    <Button style={styles.button} {...props}>
      {children}
    </Button>
  );
}

export function GoogleButton({ text, onPress, ...props }) {
  return (
    <TouchableNativeFeedback onPress={onPress} {...props}>
      <View
        style={[
          styles.socialButton,
          {
            backgroundColor: "#FF450015",
          },
        ]}
      >
        <MaterialCommunityIcons color="#FF4500" name="google" size={20} />
        <Text
          style={[
            styles.socialButtonText,
            {
              color: "#FF4500",
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

export function FacebookButton({ text, onPress, ...props }) {
  return (
    <TouchableNativeFeedback onPress={onPress} {...props}>
      <View
        style={[
          styles.socialButton,
          { backgroundColor: DefaultTheme.colors.primary + "20" },
        ]}
      >
        <MaterialCommunityIcons
          color={DefaultTheme.colors.primary}
          name="facebook"
          size={20}
        />
        <Text
          style={[
            styles.socialButtonText,
            {
              color: DefaultTheme.colors.primary,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 4,
  },
  socialButtonText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "bold",
  },
});
