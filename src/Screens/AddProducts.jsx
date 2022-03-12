import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppInput from "../Components/AppInput";
import AppButton from "../Components/AppButton";
import Screen from "../Components/Screen";
import AppLink from "../Components/AppLink";
import AppSelect from "../Components/AppSelect";
import VerticalSpace from "../Components/VerticalSpace";
import * as ImagePicker from "expo-image-picker";
import MainContext from "../MainContext";
import { PageLoading } from "../Components/Loading";
import { DefaultTheme } from "react-native-paper";

export default function AddProducts() {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const horizontalScrollRef = useRef();
  const { userToken } = useContext(MainContext);

  async function handleImagePicker() {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [3, 3],
      });
      if (!response.cancelled) {
        setImages((prev) => [
          ...prev,
          {
            uri: response.uri,
            _id: new Date().getTime(),
          },
        ]);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageRemove(uri) {
    let updatedImageList = images.filter((image) => image.uri !== uri);
    setImages(updatedImageList);
  }

  async function requestPermissions() {
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        alert("You need to enable permissions to access camera");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpload() {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("category", category);
      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("city", city);
      data.append("contactPhoneNumber", contactPhoneNumber);

      images.forEach((image) => {
        data.append("images", {
          name: image.uri,
          uri: image.uri,
          type: "images/png",
        });
      });

      const response = await fetch("http://api-sell-it.herokuapp.com/ad/new", {
        method: "POST",
        headers: {
          Authorization: userToken,
          "Content-Type": "multipart/form-data",
        },
        body: data,
      });

      const textResponse = await response.text();

      if (textResponse === "Ad has been created") {
        setImages([]);
        setCategory("");
        setTitle("");
        setDescription("");
        setPrice("");
        setCity("");
        setContactPhoneNumber("");
        ToastAndroid.show(textResponse, ToastAndroid.SHORT);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  if (isLoading) {
    return <PageLoading text="Uploading..." />;
  }

  return (
    <Screen>
      <ScrollView
        style={{
          padding: 12,
        }}
      >
        <ScrollView
          horizontal
          style={{
            marginBottom: 12,
          }}
          ref={horizontalScrollRef}
          onContentSizeChange={() => horizontalScrollRef.current.scrollToEnd()}
        >
          {images.length > 0 &&
            images.map((image) => (
              <View key={image._id}>
                <TouchableOpacity
                  onPress={() => handleImageRemove(image.uri)}
                  style={styles.removeImageBtn}
                >
                  <MaterialCommunityIcons name="close" size={18} />
                </TouchableOpacity>
                <Image source={{ uri: image.uri }} style={styles.imageList} />
              </View>
            ))}
          {images.length < 5 && (
            <TouchableOpacity
              style={styles.imagePickerIcon}
              onPress={handleImagePicker}
            >
              <MaterialCommunityIcons name="camera" size={32} />
            </TouchableOpacity>
          )}
        </ScrollView>
        <AppSelect setCategory={setCategory} />
        <AppInput
          label="Title"
          placeholder="eg: 32 inches LED TV"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <AppInput
          label="Description"
          placeholder="eg: LED TV in extremely good condition"
          value={description}
          multiline
          numberOfLines={3}
          onChangeText={(text) => setDescription(text)}
        />
        <AppInput
          label="Price"
          value={price}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />
        <AppInput
          label="City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <AppInput
          label="Contact phone number"
          value={contactPhoneNumber}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(text) => setContactPhoneNumber(text)}
        />

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Want to try our premium services? </Text>
          <AppLink>Learn more</AppLink>
        </View>
        <VerticalSpace space={16} />

        <AppButton mode="contained" onPress={handleUpload}>
          Upload
        </AppButton>

        <VerticalSpace space={50} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  removeImageBtn: {
    backgroundColor: "rgba(255, 255, 255,.65)",
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    right: 12,
    top: 5,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 10,
  },
  imagePickerIcon: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: DefaultTheme.colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  imageList: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 5,
  },
});
