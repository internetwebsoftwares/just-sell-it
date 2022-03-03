import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "react-native-paper";

import Login from "../Screens/Login";
import Register from "../Screens/Register";
import SettingsPage from "../Screens/SettingsPage";
import AccountSecurity from "../Screens/AccountSecurity";
import EditProfile from "../Screens/EditProfile";
import ChangePassword from "../Screens/ChangePassword";
import WatchLater from "../Screens/WatchLater";
import YourAds from "../Screens/YourAds";

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: DefaultTheme.colors.primary,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="SettingsPage"
        options={{ title: "Settings" }}
        component={SettingsPage}
      />

      <Stack.Screen
        options={{ title: "Watch later" }}
        name="WatchLater"
        component={WatchLater}
      />
      <Stack.Screen
        options={{ title: "Your Ads" }}
        name="YourAds"
        component={YourAds}
      />

      <Stack.Screen
        // options={{ headerShown: false }}
        name="Login"
        component={Login}
      />

      <Stack.Screen
        // options={{ headerShown: false }}
        name="Register"
        component={Register}
      />

      <Stack.Screen
        options={{
          title: "Account Security",
        }}
        name="AccountSecurity"
        component={AccountSecurity}
      />

      <Stack.Screen
        options={{
          title: "Edit profile",
        }}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{
          title: "Change password",
        }}
        name="ChangePassword"
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
}
