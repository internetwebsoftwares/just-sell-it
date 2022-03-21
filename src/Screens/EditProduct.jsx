import { ScrollView, StyleSheet, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";

import AppInput from "../Components/AppInput";
import AppButton from "../Components/AppButton";
import Screen from "../Components/Screen";
import AppSelect from "../Components/AppSelect";
import VerticalSpace from "../Components/VerticalSpace";
import MainContext from "../MainContext";
import { PageLoading } from "../Components/Loading";
import { DefaultTheme } from "react-native-paper";
import axios from "axios";
import categories from "../utils/categories";

export default function EditProduct({ route }) {
  const product = route.params.product;
  const [category, setCategory] = useState(product.category);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [district, setDistrict] = useState(product.district);
  const [state, setState] = useState(product.state);
  const [city, setCity] = useState(product.city);
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useContext(MainContext);

  async function handleUpdate() {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/ad/${product._id}/edit`,
        {
          category,
          title,
          description,
          price,
          district,
          state,
          city,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (response.data === "Your advertisment has been edited") {
        setCategory("");
        setTitle("");
        setDescription("");
        setPrice("");
        setState("");
        setDistrict("");
        setCity("");
        ToastAndroid.show(response.data, ToastAndroid.SHORT);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  }

  if (isLoading) {
    return <PageLoading text="Updating your ad..." />;
  }

  return (
    <Screen>
      <ScrollView
        style={{
          padding: 12,
        }}
      >
        <AppSelect data={categories} list={category} setList={setCategory} />
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
          label="State"
          value={state}
          autoCapitalize="sentences"
          onChangeText={(text) => setState(text)}
        />
        <AppInput
          label="District"
          value={district}
          autoCapitalize="sentences"
          onChangeText={(text) => setDistrict(text)}
        />
        <AppInput
          label="City"
          value={city}
          autoCapitalize="sentences"
          onChangeText={(text) => setCity(text)}
        />

        <VerticalSpace space={16} />

        <AppButton mode="contained" onPress={handleUpdate}>
          Update
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
