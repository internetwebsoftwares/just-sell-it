import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import AddProducts from "../Screens/AddProducts";
import AddProductButton from "./AddProductButton";
import SettingsNavigator from "./SettingsNavigator";
import MainContext from "../MainContext";
import { DefaultTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ iconSize, iconColor }) {
  const { isUserLoggedIn } = useContext(MainContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "#aaa",
        tabBarActiveTintColor: iconColor,
        headerStyle: {
          backgroundColor: DefaultTheme.colors.primary,
        },
        // tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={iconSize}
              color={color}
              name="home-variant-outline"
            />
          ),
        }}
      />
      {isUserLoggedIn && (
        <Tab.Screen
          name="AddProduct"
          component={AddProducts}
          options={({ navigation }) => ({
            title: "Add your product",
            headerTintColor: "#fff",
            tabBarLabel: "Add products",
            tabBarButton: () => (
              <AddProductButton
                onPress={() => navigation.navigate("AddProduct")}
              />
            ),
          })}
        />
      )}

      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={iconSize}
              color={color}
              name="cog-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
