import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import categories from "../utils/categoires";

export default function AppSelect({ setCategory }) {
  const [selectedValue, setSelectedValue] = useState("Select category");

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: "100%", color: "#666" }}
        onValueChange={(itemValue) => {
          setCategory(itemValue);
          setSelectedValue(itemValue);
        }}
      >
        {categories.map((category) => {
          return (
            <Picker.Item key={category} label={category} value={category} />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderBottomColor: "#ccc",
    borderColor: "transparent",
    color: "#ccc",
    borderWidth: 2,
    marginBottom: 12,
  },
});
