import { ScrollView, View } from "react-native";
import React, { useContext, useState } from "react";

import MainContext from "../MainContext";
import axios from "axios";
import { PageLoading } from "../Components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppList from "../Components/AppList";

export default function SettingsPage({ navigation }) {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setAppUser,
    userToken,
    setUserToken,
  } = useContext(MainContext);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      const response = await axios.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      await AsyncStorage.removeItem("appUser");
      await AsyncStorage.removeItem("appAuthToken");
      setIsLoggingOut(false);
      setAppUser({});
      setUserToken("");
      setIsUserLoggedIn(false);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoggingOut) {
    return <PageLoading text="Logging out..." />;
  }

  return (
    <ScrollView>
      <View>
        {!isUserLoggedIn && (
          <>
            <AppList
              onPress={() => navigation.navigate("Login")}
              text="Login"
            />

            <AppList
              text="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </>
        )}
        {isUserLoggedIn && (
          <>
            <AppList
              text="Account Security"
              onPress={() => navigation.navigate("AccountSecurity")}
            />
            <AppList
              text="Edit your information"
              onPress={() => navigation.navigate("EditProfile")}
            />
            <AppList
              text="Your Ads"
              onPress={() => navigation.navigate("YourAds")}
            />
          </>
        )}
        <AppList
          text="Watch later"
          onPress={() => navigation.navigate("WatchLater")}
        />
        <AppList text="Share this app" icon="no" />
        {isUserLoggedIn && (
          <AppList text="Logout" icon="no" color="red" onPress={handleLogout} />
        )}
      </View>
    </ScrollView>
  );
}
