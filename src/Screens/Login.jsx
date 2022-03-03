import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import AppInput from "../Components/AppInput";
import AppLink from "../Components/AppLink";
import OR from "../Components/OR";
import MainContext from "../MainContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setAppUser, setUserToken, setIsUserLoggedIn } =
    useContext(MainContext);

  async function handleSubmit() {
    try {
      if (!email) {
        return alert("Please enter email address / phone number");
      }
      if (!password) {
        return alert("Please enter password");
      }
      setIsLoggingIn(true);
      const response = await axios.post("/login", { email, password });
      if (response.data.user) {
        setIsLoggingIn(false);
        setIsUserLoggedIn(true);
        setAppUser(response.data.user);
        setUserToken(response.data.token);
        setEmail("");
        setPassword("");
        navigation.pop();
        console.log(response.data);
      } else {
        setIsLoggingIn(false);
        alert(response.data);
      }
    } catch (error) {
      setIsLoggingIn(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.appLogo}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../assets/applogopurple.png")}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: DefaultTheme.colors.primary,
          }}
        >
          Welcome back
        </Text>
      </View>
      <AppInput
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        mode="flat"
        label="Enter email / phone no"
      />
      <AppInput
        secureTextEntry={isPasswordHidden}
        right={
          <TextInput.Icon
            onPress={() => setIsPasswordHidden((prev) => !prev)}
            name={isPasswordHidden ? "eye" : "eye-off"}
          />
        }
        mode="flat"
        label="Enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        icon="login"
        loading={isLoggingIn}
        mode="contained"
        onPress={handleSubmit}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? "Logging in..." : "Login"}
      </Button>
      <Text style={{ textAlign: "center", marginTop: 16 }}>
        Don't have an account?{" "}
        <AppLink onPress={() => navigation.navigate("Register")}>
          Register
        </AppLink>
      </Text>
      <OR />
      <Button color="#4285F4" icon="google" mode="contained">
        Login with google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: DefaultTheme.colors.primaryLight,
  },
  appLogo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 24,
  },
});
