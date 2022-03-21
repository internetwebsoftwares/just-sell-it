import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OneProduct from "../Screens/OneProduct";
import SearchPage from "../Screens/SearchPage";
import Home from "../Screens/Home";
import NotificationsPage from "../Screens/NotificationsPage";
import { DefaultTheme } from "react-native-paper";
import AppHeader from "../Components/AppHeader";
import ViewProducts from "../Screens/ViewProducts";
import Login from "../Screens/Login";
import RegisterPage1 from "../Screens/RegisterPage1";
import RegisterPage2 from "../Screens/RegisterPage2";
import MessageScreen from "../Screens/MessageScreen";

const Stack = createNativeStackNavigator();

export default function FeedNavigator() {
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
        options={{
          headerTitle: (props) => <AppHeader {...props} />,
        }}
        name="Feed"
        component={Home}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.product.title })}
        name="OneProduct"
        component={OneProduct}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.searchedQuery })}
        name="ViewProducts"
        component={ViewProducts}
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
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="Messages" component={NotificationsPage} />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.username })}
        name="MessageScreen"
        component={MessageScreen}
      />
    </Stack.Navigator>
  );
}
