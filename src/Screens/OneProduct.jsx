import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Card,
  DefaultTheme,
  Headline,
  Paragraph,
  Title,
} from "react-native-paper";
import AppButton from "../Components/AppButton";
import AppBadge from "../Components/AppBadge";
import AppImageSlider from "../Components/AppImageSlider";
import AppImageViewer from "../Components/AppImageViewer";

export default function OneProduct({ route }) {
  const [product, setProduct] = useState(route.params.product);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      <ScrollView>
        <AppImageSlider
          imagesUrls={product.imagesUrls}
          onPress={(index) => {
            setIsModalVisible(true);
            setImageIndex(index);
          }}
        />
        <AppImageViewer
          imagesUrls={product.imagesUrls}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          imageIndex={imageIndex}
        />

        <Card.Content style={{ marginTop: 16 }}>
          <Title
            style={{
              color: DefaultTheme.colors.primary,
            }}
          >
            Price: ₹{product.price}/-
          </Title>
          <Headline>{product.title}</Headline>
          <View
            style={{ display: "flex", flexDirection: "row", marginVertical: 8 }}
          >
            <AppBadge>{product.category}</AppBadge>
          </View>

          <Paragraph>{product.description}</Paragraph>
          <View style={{ marginVertical: 24 }}>
            <Text style={{ fontWeight: "200" }}>
              Owner:{" "}
              <Text style={{ fontWeight: "bold" }}>{product.ownerName}</Text>
            </Text>
            <Text style={{ fontWeight: "200" }}>
              Contact no:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {product.contactPhoneNumber}
              </Text>
            </Text>
          </View>

          <View>
            <AppButton
              icon="history"
              mode="contained"
              onPress={() => console.log("Did u click me")}
            >
              Add to watch later
            </AppButton>
            <AppButton onPress={() => console.log("Did u click me")}>
              Chat with owner
            </AppButton>
          </View>
        </Card.Content>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
