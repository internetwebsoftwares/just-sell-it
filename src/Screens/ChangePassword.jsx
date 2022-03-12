import { View, Text } from "react-native";
import React, { useEffect, useContext, useState, useRef } from "react";
import AppInput from "../Components/AppInput";
import AppButton from "../Components/AppButton";
import Screen from "../Components/Screen";
import axios from "axios";
import MainContext from "../MainContext";
import { TextInput } from "react-native-paper";
import { PageLoading } from "../Components/Loading";

export default function ChangePassword() {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [isCurrPassHidden, setIsCurrPassHidden] = useState(true);
  const [isNewPassHidden, setIsNewPassHidden] = useState(true);
  const { userToken } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangePassword() {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "/user/password/change",
        { currPass, newPass },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      setIsLoading(false);
      alert(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Screen>
      <View style={{ padding: 12 }}>
        <AppInput
          secureTextEntry={isCurrPassHidden}
          right={
            <TextInput.Icon
              onPress={() => setIsCurrPassHidden((prev) => !prev)}
              name={isCurrPassHidden ? "eye" : "eye-off"}
            />
          }
          value={currPass}
          onChangeText={(text) => setCurrPass(text)}
          label="Current password"
        />

        <AppInput
          secureTextEntry={isNewPassHidden}
          right={
            <TextInput.Icon
              onPress={() => setIsNewPassHidden((prev) => !prev)}
              name={isNewPassHidden ? "eye" : "eye-off"}
            />
          }
          value={newPass}
          onChangeText={(text) => setNewPass(text)}
          label="New password"
        />

        <AppButton onPress={handleChangePassword} mode="contained">
          Change password
        </AppButton>
      </View>
    </Screen>
  );
}
