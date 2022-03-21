import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MainContext from "../MainContext";
import { PageLoading } from "../Components/Loading";
import List from "../Components/List";

export default function YourAds() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useContext(MainContext);

  useEffect(() => {
    async function loadMyAds() {
      try {
        const response = await axios.get("/ads/mine/all", {
          headers: {
            Authorization: userToken,
          },
        });
        setAds(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadMyAds();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <View style={{ padding: 12 }}>
      <FlatList
        data={ads}
        refreshing={isLoading}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <List item={item} />}
      />
    </View>
  );
}
