import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "react-native-paper";

import Login from "../Screens/Login";
import SettingsPage from "../Screens/SettingsPage";
import AccountSecurity from "../Screens/AccountSecurity";
import EditProfile from "../Screens/EditProfile";
import ChangePassword from "../Screens/ChangePassword";
import WatchLater from "../Screens/WatchLater";
import YourAds from "../Screens/YourAds";
import RegisterPage1 from "../Screens/RegisterPage1";
import RegisterPage2 from "../Screens/RegisterPage2";
import EditProduct from "../Screens/EditProduct";
import AdminDashboard from "../Screens/AdminDashboard";
import AppUsers from "../Screens/AppUsers";
import AppAds from "../Screens/AppAds";
import AppReports from "../Screens/AppReports";

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
        options={{ title: "Saved products" }}
        name="SavedProducts"
        component={WatchLater}
      />
      <Stack.Screen
        options={{ title: "Your Ads" }}
        name="YourAds"
        component={YourAds}
      />

      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen
        options={{ title: "Register page 1" }}
        name="RegisterPage1"
        component={RegisterPage1}
      />

      <Stack.Screen
        options={{ title: "Register page 2" }}
        name="RegisterPage2"
        component={RegisterPage2}
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
          title: "Admin dashboard",
        }}
        name="AdminDashboard"
        component={AdminDashboard}
      />
      <Stack.Screen
        options={{
          title: "Users",
        }}
        name="AppUsers"
        component={AppUsers}
      />
      <Stack.Screen
        options={{
          title: "Ads",
        }}
        name="AppAds"
        component={AppAds}
      />
      <Stack.Screen
        options={{
          title: "Reports",
        }}
        name="AppReports"
        component={AppReports}
      />

      <Stack.Screen
        options={{
          title: "Edit your Ad",
        }}
        name="EditProduct"
        component={EditProduct}
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
