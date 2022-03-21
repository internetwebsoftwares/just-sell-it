import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useContext, useState, useRef } from "react";
import AppInput from "../Components/AppInput";
import AppButton from "../Components/AppButton";
import AppList from "../Components/AppList";
import Screen from "../Components/Screen";
import axios from "axios";
import MainContext from "../MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage/";
import { useNavigation } from "@react-navigation/native";

function PromptModal({ inputValue, setInputValue, setIsModalOpen }) {
  const { userToken, setIsUserLoggedIn } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  async function removeUserInfoFromStorage() {
    try {
      await AsyncStorage.removeItem("appUser");
      await AsyncStorage.removeItem("appAuthToken");
      await AsyncStorage.removeItem("isUserLoggedIn");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteAccount(inputValue) {
    let password = inputValue;
    try {
      setIsLoading(true);
      const response = await axios.delete("/user/account/delete", {
        headers: {
          Authorization: userToken,
        },
        data: {
          password,
        },
      });
      setIsLoading(false);

      if (response.data === "Your account has been deleted") {
        removeUserInfoFromStorage();
        setIsUserLoggedIn(false);
        setIsModalOpen(false);
        navigation.navigate("Login");
      } else {
        alert(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        onPress={() => setIsModalOpen(false)}
        style={styles.modalBackdrop}
      ></TouchableOpacity>
      <View style={styles.modal}>
        <AppInput
          value={inputValue}
          secureTextEntry={true}
          onChangeText={(text) => setInputValue(text)}
          label="Enter password"
        />
        <View style={styles.modalButtonContainer}>
          <AppButton
            loading={isLoading}
            disabled={isLoading}
            onPress={() => handleDeleteAccount(inputValue)}
          >
            Delete account
          </AppButton>
          <AppButton onPress={() => setIsModalOpen(false)}>Cancel</AppButton>
        </View>
      </View>
    </View>
  );
}

export default function AccountSecurity({ navigation }) {
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        {isModalOpen && (
          <PromptModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            inputValue={password}
            setInputValue={setPassword}
          />
        )}
        <AppList
          onPress={() => navigation.navigate("ChangePassword")}
          text="Change password"
        />
        <AppList
          onPress={() => setIsModalOpen(true)}
          text="Delete account"
          color="red"
          icon="no"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalBackdrop: {
    position: "absolute",
    backgroundColor: "#33333390",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    zIndex: -1,
  },
  modal: {
    backgroundColor: "#fff",
    position: "absolute",
    width: 280,
    borderRadius: 4,
  },
  modalButtonContainer: {
    flexDirection: "row-reverse",
  },
});
