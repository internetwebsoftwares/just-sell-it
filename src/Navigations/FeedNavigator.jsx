import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OneProduct from "../Screens/OneProduct";
import SearchPage from "../Screens/SearchPage";
import Home from "../Screens/Home";
import NotificationsPage from "../Screens/NotificationsPage";
import { DefaultTheme } from "react-native-paper";
import AppHeader from "../Components/AppHeader";

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
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.productName })}
        name="OneProduct"
        component={OneProduct}
      />
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="Messages" component={NotificationsPage} />
    </Stack.Navigator>
  );
}
