import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  Button,
  DefaultTheme,
  RadioButton,
  Title,
  Divider,
  TextInput,
} from "react-native-paper";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppCategory from "../Components/AppCategory";
import VerticalSpace from "../Components/VerticalSpace";

export default function FilterModal({
  visible,
  setIsFilterVisible,
  showCategory,
  sortBy,
  setSortBy,
  setCategories,
  appCategories,
  handleLoadProduct,
}) {
  return (
    <Modal
      onRequestClose={() => setIsFilterVisible(false)}
      statusBarTranslucent
      transparent
      animationType="slide"
      visible={visible}
    >
      <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => setIsFilterVisible(false)}>
            <MaterialCommunityIcons
              name="close-circle"
              size={28}
              color={DefaultTheme.colors.backdrop}
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableWithoutFeedback>
          <ScrollView>
            {showCategory && (
              <>
                <Title>Select categories:</Title>
                <AppCategory
                  appCategories={appCategories}
                  setCategories={setCategories}
                />
              </>
            )}

            <VerticalSpace space={30} />
            <Title>Sort by price:</Title>
            <RadioButton.Group
              onValueChange={(newValue) => setSortBy(newValue)}
              value={sortBy}
            >
              <View style={styles.radioContainer}>
                <RadioButton color={DefaultTheme.colors.primary} value="1" />
                <Text>Low to High</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton color={DefaultTheme.colors.primary} value="-1" />
                <Text>High to Low</Text>
              </View>
            </RadioButton.Group>
            <VerticalSpace space={30} />
            <Divider />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button onPress={() => setIsFilterVisible(false)}>Cancel</Button>
              <Button onPress={handleLoadProduct}>Apply filters</Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 14,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
