import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Searchbar, DefaultTheme, Divider, Button } from "react-native-paper";
import { PageLoading } from "../Components/Loading";
import axios from "axios";

export default function AppAds() {
  const [ads, setAds] = useState([]);
  const [pageNo, setPageNo] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [totalDocuments, setTotalDocuments] = useState(0);

  async function handleRefresh() {
    try {
      setPageNo(2);
      loadAds();
      setHasMoreData(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoadMore() {
    try {
      let response;
      if (hasMoreData) {
        response = await axios.get(`/ads/all/${pageNo}?categories=[]`);
        setAds((prev) => [...prev, ...response.data.results]);
        setPageNo((prev) => prev + 1);
      } else {
        return;
      }
      if (response.data.length < 1) {
        setHasMoreData(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadAds() {
    try {
      setIsLoading(true);
      const response = await axios.get(`/ads/all/1?categories=[]`);
      setAds(response.data.results);
      setTotalDocuments(response.data.totalDocuments);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadAds();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <View style={{ padding: 12 }}>
      <Searchbar placeholder="Search ads" />
      <Text style={{ marginTop: 12 }}>Total ads: {totalDocuments}</Text>

      <FlatList
        data={ads}
        renderItem={({ item }) => <AdList item={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item._id}
        ListFooterComponent={() => (
          <View style={{ marginTop: 16, padding: 8, marginBottom: 80 }}>
            {hasMoreData ? (
              <ActivityIndicator
                color={DefaultTheme.colors.primary}
                size="large"
              />
            ) : (
              <Text
                style={{
                  color: DefaultTheme.colors.backdrop,
                  textAlign: "center",
                }}
              >
                You have reached the end
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

function AdList({ item }) {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: item.previewImageUrl }}
      />
      <Text style={styles.bold}>Title:</Text>
      <Text>{item.title}</Text>

      <Text style={styles.bold}>Description:</Text>
      <Text>{item.description}</Text>

      <Text style={styles.bold}>Category:</Text>
      <Text>{item.category}</Text>

      <Text style={styles.bold}>Price</Text>
      <Text>{item.price}</Text>
      <Divider style={{ marginTop: 12 }} />
      <Button>View ad</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
  bold: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
