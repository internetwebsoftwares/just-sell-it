import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Card,
  DefaultTheme,
  Headline,
  Paragraph,
  Title,
} from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";
import axios from "axios";
import { PageLoading } from "../Components/Loading";
import AppButton from "../Components/AppButton";
import AppBadge from "../Components/AppBadge";
import AppImageSlider from "../Components/AppImageSlider";
import AppImageViewer from "../Components/AppImageViewer";

export default function OneProduct({ route }) {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await axios.get(`/ad/${route.params._id}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadProduct();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

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
          <Headline>{product.title}</Headline>
          <View
            style={{ display: "flex", flexDirection: "row", marginVertical: 8 }}
          >
            <AppBadge>{product.category}</AppBadge>
          </View>

          <Paragraph>{product.description}</Paragraph>
          <View style={{ marginTop: 12 }}></View>
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
          <Title
            style={{ color: DefaultTheme.colors.primary, marginVertical: 12 }}
          >
            Price: ₹{product.price}/-
          </Title>

          <View style={{ marginTop: 50 }}>
            <AppButton
              mode="contained"
              onPress={() => console.log("Did u click me")}
            >
              Add to watch later
            </AppButton>
            <AppButton
              mode="text"
              onPress={() => console.log("Did u click me")}
            >
              Chat with owner
            </AppButton>
          </View>
        </Card.Content>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    backgroundColor: "#000",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2000,
    justifyContent: "center",
  },
});
