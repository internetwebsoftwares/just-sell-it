import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
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

export function HomePageLoading() {
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../assets/homeskeletonplaceholder.gif")}
    />
  );
}

const styles = StyleSheet.create({});
