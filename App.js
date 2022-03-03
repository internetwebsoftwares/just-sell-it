import React from "react";
import { StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { useStorage } from "@ugenc/use-storage-hook";
import TabNavigator from "./src/Navigations/TabNavigator";
import { DefaultTheme } from "react-native-paper";
import navigationTheme from "./src/Navigations/navigationTheme";
import MainContext from "./src/MainContext";

axios.defaults.baseURL = "http://api-sell-it.herokuapp.com";

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn, removeIsUserLoggedIn] =
    useStorage("isUserLoggedIn");
  const [appUser, setAppUser, removeAppUser] = useStorage("appUser");
  const [userToken, setUserToken, removeUserToken] = useStorage("appAuthToken");

  return (
    <MainContext.Provider
      value={{
        appUser,
        setAppUser,
        removeAppUser,
        userToken,
        setUserToken,
        removeUserToken,
        isUserLoggedIn,
        setIsUserLoggedIn,
        removeIsUserLoggedIn,
      }}
    >
      <StatusBar
        animated
        backgroundColor={DefaultTheme.colors.primary}
        barStyle="light-content"
      />
      <NavigationContainer theme={navigationTheme}>
        <TabNavigator iconSize={24} iconColor={DefaultTheme.colors.primary} />
      </NavigationContainer>
    </MainContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
});
