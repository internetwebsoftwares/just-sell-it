import axios from "axios";
import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import AppInput from "../Components/AppInput";
import AppLink from "../Components/AppLink";
import Screen from "../Components/Screen";
import MainContext from "../MainContext";

export default function RegisterPage2({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { setAppUser, setUserToken, setIsUserLoggedIn } =
    useContext(MainContext);
  const [isRegistering, setIsRegistering] = useState(false);

  async function handleRegister() {
    setIsRegistering(true);
    try {
      const response = await axios.post("/register", {
        firstName: route.params.firstName,
        lastName: route.params.lastName,
        phoneNumber: route.params.phoneNumber,
        email,
        password,
      });
      if (response.data.user) {
        setIsRegistering(false);
        setIsUserLoggedIn(true);
        setAppUser(response.data.user);
        setUserToken(response.data.token);
        setPassword("");
        navigation.popToTop();
      } else {
        setIsRegistering(false);
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.appLogo}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/applogofacebookblue.png")}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Create a new account
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 16,
            color: DefaultTheme.colors.backdrop,
          }}
        >
          Already have an account?{" "}
          <AppLink onPress={() => navigation.navigate("Login")}>Login</AppLink>
        </Text>

        <AppInput
          label="Enter email address"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <AppInput
          secureTextEntry={isPasswordHidden}
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordHidden((prev) => !prev)}
              name={isPasswordHidden ? "eye" : "eye-off"}
            />
          }
          label="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => navigation.navigate("RegisterPage1")}
          >
            Back
          </Button>
          <Button
            loading={isRegistering}
            disabled={isRegistering}
            mode="contained"
            onPress={handleRegister}
          >
            {isRegistering ? "Creating account..." : "Register"}
          </Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  appLogo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    overflow: "hidden",
  },
});
