import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Register from "../Screens/Register";

export default function AppBottomNavigation() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "search", title: "Search", icon: "magnify" },
    { key: "notifications", title: "Notifications", icon: "cog" },
    { key: "settings", title: "Settings", icon: "bell" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: Login,
    notifications: Register,
    settings: Home,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

const styles = StyleSheet.create({});
