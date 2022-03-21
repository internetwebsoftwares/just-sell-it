import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { DefaultTheme, Divider } from "react-native-paper";
import VerticalSpace from "../Components/VerticalSpace";
import AppButton from "../Components/AppButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function List({ item }) {
  const navigation = useNavigation();

  function confirmDelete(item) {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete this ad permanently",
      [{ text: "cancel" }, { text: "Delete", onPress: handleDelete(item) }]
    );
  }

  async function handleDelete(item) {
    try {
      // const response = await axios.delete(`/ad/`);
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.previewImageUrl }} style={styles.image} />
      <View style={styles.innerInfo}>
        <Text style={styles.title}>{item._id}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}/-</Text>
        <Text style={styles.status}>
          Status:{" "}
          <Text
            style={{
              color: item.isSold
                ? DefaultTheme.colors.primary
                : DefaultTheme.colors.error,
            }}
          >
            {item.isSold ? "Sold" : "Unsold"}
          </Text>
        </Text>
        <VerticalSpace space={10} />
        <Divider />
        <VerticalSpace space={10} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppButton
            color={DefaultTheme.colors.primary}
            style={styles.editButton}
            icon="pencil"
            onPress={() =>
              navigation.navigate("EditProduct", { product: item })
            }
          >
            Edit
          </AppButton>
          <AppButton
            color={DefaultTheme.colors.error}
            style={styles.deleteButton}
            icon="delete"
            onPress={(item) => confirmDelete(item)}
          >
            Delete
          </AppButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 18,
  },
  container: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  innerInfo: {
    paddingHorizontal: 12,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  price: {
    color: DefaultTheme.colors.primary,
    fontWeight: "bold",
    marginBottom: 6,
  },
  status: {
    fontWeight: "bold",
    marginBottom: 6,
    width: 110,
  },
  editButton: {
    alignSelf: "flex-end",
  },
  deleteButton: {
    alignSelf: "flex-end",
  },
});
