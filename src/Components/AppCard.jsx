import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { DefaultTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function AppCardHorizontal({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("OneProduct", {
          product: item,
        })
      }
    >
      <View>
        <View style={styles.container}>
          <Image source={{ uri: item.previewImageUrl }} style={styles.image} />
          <View
            style={{
              padding: 12,
              backgroundColor: DefaultTheme.colors.surface,
              flex: 1,
              width: "100%",
            }}
          >
            <Text style={styles.price}>Price: ₹{item.price}/-</Text>
            <Text style={styles.title}>{`${item.title.slice(0, 40)}...`}</Text>
            <Text style={styles.description}>
              {`${item.description.slice(0, 60)}...`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2,
    height: 400,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: DefaultTheme.colors.primaryLight,
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 12,
    color: "grey",
  },
  price: {
    color: DefaultTheme.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
});
