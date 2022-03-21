import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AppSelect({ data, list, setList }) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={list}
        style={{ height: 50, width: "100%", color: "#666" }}
        onValueChange={(itemValue) => {
          setList(itemValue);
        }}
      >
        {data.map((data) => {
          return <Picker.Item key={data} label={data} value={data} />;
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
