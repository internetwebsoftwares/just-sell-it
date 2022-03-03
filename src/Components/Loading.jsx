import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { DefaultTheme } from "react-native-paper";

export function PageLoading({ text = "Loading..." }) {
  return (
    <View
      style={{
        marginTop: 12,
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={DefaultTheme.colors.primary} />
      <Text style={{ marginTop: 8 }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
