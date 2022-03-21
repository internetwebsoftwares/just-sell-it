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

import AppCard from "../Components/AppCard";
import AppFilterHeader from "../Components/AppFilterHeader";
import FilterModal from "../Components/FilterModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([5000, 200000]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("1");

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
        response = await axios.get(`/ads/all/${pageNo}?categories=[]`);
        setProducts((prev) => [...prev, ...response.data.results]);
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
      const response = await axios.get(`/ads/all/1?categories=[]`);
      setProducts(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <HomePageLoading />}

      <AppFilterHeader onPress={() => setIsFilterOpen(true)} />
      <FilterModal
        showCategory={true}
        visible={isFilterOpen}
        setIsFilterVisible={setIsFilterOpen}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCategories={setCategories}
        appCategories={categories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        handleLoadProduct={loadProducts}
      />

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
