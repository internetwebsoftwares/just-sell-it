import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import categories from "../utils/categoires";
import { Chip, DefaultTheme } from "react-native-paper";

export default function AppFilter() {
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
        category.isSelected
          ? (category.isSelected = false)
          : (category.isSelected = true);
        return category;
      } else {
        return category;
      }
    });

    setListOfCategories(updatedList);
  }

  return (
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
