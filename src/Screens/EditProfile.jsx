import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppInput from "../Components/AppInput";
import AppButton from "../Components/AppButton";
import Screen from "../Components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PageLoading } from "../Components/Loading";
import axios from "axios";
import MainContext from "../MainContext";

export default function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { userToken } = useContext(MainContext);

  async function handleUpdate() {
    if (!firstName) return alert("Please enter firstname");
    if (!lastName) return alert("Please enter lastname");
    if (!phoneNumber) return alert("Please enter phone number");
    if (phoneNumber.length < 10) return alert("Invalid phone number");
    try {
      setIsUpdating(true);
      const response = await axios.put(
        "/user/profile/update",
        {
          firstName,
          lastName,
          phoneNumber,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      const storedAppUser = await AsyncStorage.getItem("appUser");
      let parsedAppUser = JSON.parse(storedAppUser);

      if (response.data === "Profile updated") {
        await AsyncStorage.setItem(
          "appUser",
          JSON.stringify({
            ...parsedAppUser,
            firstName,
            lastName,
            phoneNumber,
          })
        );
        alert(response.data);
        setIsUpdating(false);
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (() => {
      try {
        AsyncStorage.getItem("appUser").then((user) => {
          user = JSON.parse(user);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber(user.phoneNumber);
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (isUpdating) {
    return <PageLoading text="Updating profile..." />;
  }

  return (
    <Screen>
      <View style={{ padding: 12 }}>
        <AppInput
          mode="flat"
          label="Firstname"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <AppInput
          mode="flat"
          label="Lastname"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <AppInput
          mode="flat"
          keyboardType="numeric"
          label="Phone number"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <AppButton onPress={handleUpdate} mode="contained">
          Update your info
        </AppButton>
      </View>
    </Screen>
  );
}
