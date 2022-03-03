import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { DefaultTheme } from "react-native-paper";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      sender: "Salik Shaikh",
      lastMsg: "How are you bro",
      time: "11:23PM",
      totalUnseenMsgs: 4,
    },
    {
      sender: "Yusuf Shaikh",
      lastMsg: "Wafa awo bhai rice khane chalte",
      time: "07:14PM",
      totalUnseenMsgs: 214,
    },
    {
      sender: "Arsalan Khan",
      lastMsg: "Bhai form bharne ka hai",
      time: "09:03PM",
      totalUnseenMsgs: 1,
    },
    {
      sender: "Fayyaz Rehmani",
      lastMsg: "Bhai zinda hai",
      time: "09:43PM",
      totalUnseenMsgs: 2,
    },
    {
      sender: "Izhar Khan",
      lastMsg: "Kaisa hai Ata seth",
      time: "06:29PM",
      totalUnseenMsgs: 4,
    },
    {
      sender: "Yasir Shaikh",
      lastMsg: "Bhai college chalne ka hai kal",
      time: "12:23AM",
      totalUnseenMsgs: 2,
    },
  ]);
  return (
    <ScrollView>
      {notifications.map((notification, index) => {
        return (
          <TouchableOpacity key={index} style={styles.listItem}>
            <View>
              <Text style={styles.sender}>{notification.sender}</Text>
              <Text style={styles.lastMsg}>{notification.lastMsg}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.time}>{notification.time}</Text>
              <View style={styles.totalUnseenMsgs}>
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}
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
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sender: {
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "grey",
  },
  totalUnseenMsgs: {
    backgroundColor: DefaultTheme.colors.primary,
    width: 35,
    height: 24,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});
