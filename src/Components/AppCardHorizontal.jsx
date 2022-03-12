import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { DefaultTheme } from "react-native-paper";

export default function AppCardHorizontal({ item }) {
  return (
    <View>
      <View style={styles.container}>
        <Image source={{ uri: item.previewImageUrl }} style={styles.image} />
        <View style={{ padding: 8 }}>
          <Text style={styles.title}>{`${item.title.slice(0, 50)}...`}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {`${item.description.slice(0, 100)}...`}
          </Text>
          <Text style={styles.price}>Price: ₹{item.price}/-</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    borderRadius: 5,
    width: 300,
    height: 140,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginBottom: 12,
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 200,
  },
  title: {
    width: 170,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    width: 170,
    color: "grey",
    marginBottom: 8,
  },
  price: {
    color: DefaultTheme.colors.primary,
    fontWeight: "bold",
  },
});
