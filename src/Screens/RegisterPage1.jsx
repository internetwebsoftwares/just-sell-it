import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import AppInput from "../Components/AppInput";
import AppLink from "../Components/AppLink";
import Screen from "../Components/Screen";

export default function RegisterPage1({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
          label="Enter FirstName"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <AppInput
          label="Enter LastName"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <AppInput
          label="Enter phone no"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="numeric"
          maxLength={10}
        />
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("RegisterPage2", {
              firstName,
              lastName,
              phoneNumber,
            })
          }
        >
          Next
        </Button>
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
