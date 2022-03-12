import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DefaultTheme } from "react-native-paper";
import axios from "axios";
import { HomePageLoading } from "../Components/Loading";

import AppCategory from "../Components/AppCategory";
import AppCard from "../Components/AppCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);

  async function handleRefresh() {
    try {
      setPageNo(2);
      loadProducts();
      setHasMoreData(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoadMore() {
    try {
      let response;
      if (hasMoreData) {
        response = await axios.get(
          `/ads/all/${pageNo}?categories=${JSON.stringify(categories)}`
        );
        setProducts((prev) => [...prev, ...response.data]);
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

  async function loadProducts() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/ads/all/1?categories=${JSON.stringify(categories)}`
      );
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setHasMoreData(true);
    loadProducts();
  }, [categories]);

  return (
    <View style={{ flex: 1 }}>
      <AppCategory appCategories={categories} setCategories={setCategories} />
      {isLoading && <HomePageLoading />}

      <View>
        <FlatList
          numColumns={2}
          keyExtractor={(item) => item._id}
          data={products}
          onEndReached={handleLoadMore}
          refreshing={isLoading}
          onRefresh={handleRefresh}
          onEndReachedThreshold={1}
          renderItem={({ item }) => <AppCard item={item} />}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: DefaultTheme.colors.backdrop,
                textAlign: "center",
              }}
            >
              No product found
            </Text>
          )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: DefaultTheme.colors.primary,
  },
  heading: {
    fontWeight: "400",
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
  },
});
