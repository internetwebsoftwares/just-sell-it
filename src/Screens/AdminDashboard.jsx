import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppList from "../Components/AppList";

export default function AdminDashboard({ navigation }) {
  return (
    <View>
      <AppList
        onPress={() => navigation.navigate("AppUsers")}
        icon="yes"
        text="Users"
      />
      <AppList
        onPress={() => navigation.navigate("AppAds")}
        icon="yes"
        text="Ads"
      />
      <AppList
        onPress={() => navigation.navigate("AppReports")}
        icon="yes"
        text="Reports"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
