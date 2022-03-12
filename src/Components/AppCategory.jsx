import { View, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import categories from "../utils/categoires";
import { Chip, DefaultTheme } from "react-native-paper";

export default function AppCategory({ appCategories, setCategories }) {
  const list = categories.map((category) => {
    return {
      _id: category.split(" ").join("").toLowerCase(),
      category,
      isSelected: false,
    };
  });
  const [listOfCategories, setListOfCategories] = useState(list);

  function handleSelect(selectedCategory) {
    let updatedList = listOfCategories.map((category) => {
      if (category._id === selectedCategory._id) {
        if (category.isSelected) {
          category.isSelected = false;
          let indexOfCategory = appCategories.indexOf(category.category);
          setCategories((prev) => {
            prev.splice(indexOfCategory, 1);
            return prev;
          });
        } else {
          category.isSelected = true;
          setCategories((prev) => [...prev, category.category]);
        }
        return category;
      } else {
        return category;
      }
    });

    setListOfCategories(updatedList);
  }

  return (
    <View style={{ padding: 10 }}>
      <ScrollView horizontal>
        {listOfCategories.map((category) => {
          return (
            <Chip
              selected={category.isSelected}
              onPress={() => handleSelect(category)}
              style={[styles.chip, category.isSelected ? styles.selected : ""]}
              key={category._id}
            >
              <Text style={{ color: category.isSelected ? "white" : "#333" }}>
                {category.category}
              </Text>
            </Chip>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: DefaultTheme.colors.primaryLight,
    marginRight: 8,
  },
  selected: {
    backgroundColor: DefaultTheme.colors.primary,
  },
});
