import { Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PageLoading } from "../Components/Loading";
import List from "../Components/List";

export default function WatchLater() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedAdsIds, setSavedAdsIds] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);

  async function loadSavedProducts() {
    try {
      const response = await axios.get(`/ads/saved?savedAdsIds=${savedAdsIds}`);
      setSavedProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("savedProductsIds").then((ids) => {
      setSavedAdsIds(ids);
    });
    loadSavedProducts();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <View style={{ padding: 12 }}>
      <FlatList
        data={savedProducts}
        refreshing={isLoading}
        ListEmptyComponent={() => (
          <Text>Look's like you have saved nothing</Text>
        )}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <List item={item} />}
      />
    </View>
  );
}
