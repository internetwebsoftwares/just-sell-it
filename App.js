import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { useStorage } from "@ugenc/use-storage-hook";
import TabNavigator from "./src/Navigations/TabNavigator";
import { DefaultTheme } from "react-native-paper";
import navigationTheme from "./src/Navigations/navigationTheme";
import MainContext from "./src/MainContext";

axios.defaults.baseURL = "http://api-sell-it.herokuapp.com";

// ios client id
// 848015990033-72hkbv70h5lhrfjq6nae1oavnf4dq2m8.apps.googleusercontent.com
// Android client id
// 848015990033-hmos4csdgkviq75518sp5967em03pf7d.apps.googleusercontent.com
// Web client id
// 848015990033-l3ds21mr10k3ggu80l98enshq85qlc84.apps.googleusercontent.com

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn, removeIsUserLoggedIn] =
    useStorage("isUserLoggedIn");
  const [appUser, setAppUser, removeAppUser] = useStorage("appUser");
  const [userToken, setUserToken, removeUserToken] = useStorage("appAuthToken");

  // async function clearLocalStorage() {
  //   await AsyncStorage.clear();
  // }

  // clearLocalStorage();

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
