import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme } from "react-native-paper";

export default function AppFilterHeader({ onPress }) {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          alignSelf: "flex-end",
        }}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          style={{ color: DefaultTheme.colors.backdrop }}
          size={20}
          name="filter-variant"
        />
        <Text
          style={{ marginHorizontal: 8, color: DefaultTheme.colors.backdrop }}
        >
          Filters
        </Text>
        <MaterialCommunityIcons
          style={{ color: DefaultTheme.colors.backdrop }}
          size={20}
          name="chevron-down"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
