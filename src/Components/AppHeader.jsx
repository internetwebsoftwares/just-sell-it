import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainContext from "../MainContext";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLogo({ props }) {
  const { isUserLoggedIn } = useContext(MainContext);
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "96%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...props}
    >
      <Image
        style={{
          width: 65,
          height: 30,
          marginRight: 8,
        }}
        source={require("../assets/applogowhitefull.png")}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MaterialCommunityIcons
            style={{ marginRight: 16 }}
            name="magnify"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        {isUserLoggedIn && (
          <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
            <MaterialCommunityIcons
              name="chat-processing-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
