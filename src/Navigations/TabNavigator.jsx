import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import FeedNavigator from "./FeedNavigator";
import AddProducts from "../Screens/AddProducts";
import AddProductButton from "./AddProductButton";
import SettingsNavigator from "./SettingsNavigator";
import MainContext from "../MainContext";
import { DefaultTheme } from "react-native-paper";
import Login from "../Screens/Login";

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
      }}
    >
      <Tab.Screen
        name="Home"
        component={FeedNavigator}
        options={{
          title: "Home",
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
      <Tab.Screen
        name="AddProduct"
        component={AddProducts}
        options={({ navigation }) => ({
          title: "Add your product",
          headerTintColor: "#fff",
          tabBarLabel: "Add products",
          tabBarButton: () => (
            <AddProductButton
              onPress={() => {
                if (isUserLoggedIn) {
                  navigation.navigate("AddProduct");
                } else {
                  Alert.alert(
                    "Message",
                    "Please login / register to sell your products",
                    [
                      { text: "cancel" },
                      {
                        text: "login",
                        onPress: () => navigation.navigate("Login"),
                      },
                    ]
                  );
                }
              }}
            />
          ),
        })}
      />
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
