import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { DefaultTheme } from "react-native-paper";

export default function NotificationsPage({ navigation }) {
  const [notifications, setNotifications] = useState([
    {
      sender: "Salik Shaikh",
      lastMsg: "How are you bro?",
      time: "11:23PM",
      totalUnseenMsgs: 4,
    },
    {
      sender: "Yusuf Shaikh",
      lastMsg: "Are you available right now?",
      time: "07:14PM",
      totalUnseenMsgs: 214,
    },
    {
      sender: "Arsalan Khan",
      lastMsg: "Bro, from where did you fill your form?",
      time: "09:03PM",
      totalUnseenMsgs: 1,
    },
    {
      sender: "Fayyaz Rehmani",
      lastMsg: "Bro are you there?",
      time: "09:43PM",
      totalUnseenMsgs: 2,
    },
    {
      sender: "Izhar Khan",
      lastMsg: "How are you my friend?",
      time: "06:29PM",
      totalUnseenMsgs: 4,
    },
    {
      sender: "Yasir Shaikh",
      lastMsg: "Did you go to college today?",
      time: "12:23AM",
      totalUnseenMsgs: 2,
    },
    {
      sender: "Waqas Shaikh",
      lastMsg: "When will be our exam?",
      time: "12:23AM",
      totalUnseenMsgs: 2,
    },
  ]);
  return (
    <ScrollView>
      {notifications.map((notification, index) => {
        const avatarTextArr = notification.sender.split(" ");
        const avatarFirstNameFirstLetter = avatarTextArr[0][0];
        const avatarLastNameFirstLetter = avatarTextArr[1][0];
        const avatarText =
          avatarFirstNameFirstLetter + avatarLastNameFirstLetter;
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MessageScreen", {
                username: notification.sender,
              })
            }
            key={index}
            style={styles.listItem}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{avatarText}</Text>
              </View>
              <View>
                <Text style={styles.sender}>{notification.sender}</Text>
                <Text style={styles.lastMsg}>
                  {notification.lastMsg.length > 30
                    ? `${notification.lastMsg.slice(0, 30)}...`
                    : notification.lastMsg}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.time}>{notification.time}</Text>
              <View style={styles.totalUnseenMsgs}>
                <Text
                  style={{
                    color: DefaultTheme.colors.primary,
                    fontWeight: "bold",
                    fontSize: 10,
                  }}
                >
                  {notification.totalUnseenMsgs}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 12,
    backgroundColor: "#fff",
    width: "100%",
    borderStyle: "solid",
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sender: {
    fontWeight: "bold",
  },
  time: {
    fontSize: 10,
    color: DefaultTheme.colors.backdrop,
  },
  avatar: {
    backgroundColor: DefaultTheme.colors.primary,
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalUnseenMsgs: {
    backgroundColor: DefaultTheme.colors.primaryLight,
    width: 30,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  lastMsg: {
    color: DefaultTheme.colors.backdrop,
  },
});
