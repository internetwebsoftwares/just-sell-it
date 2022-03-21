import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { DefaultTheme, Searchbar } from "react-native-paper";
import debounce from "../functions/debounce";
import axios from "axios";

import Screen from "../Components/Screen";

export default function SearchPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [pageNo, setPageNo] = useState(2);

  const searchInputRef = useRef();

  function handleChange({ nativeEvent }) {
    const { text } = nativeEvent;
    setHasMoreData(true);
    setSearchQuery(text);
    debounceSearch(searchQuery);
  }

  async function handleSearch() {
    if (searchQuery.length < 2) {
      setSearchedItems([]);
      return;
    }
    try {
      setIsSearching(true);
      const response = await axios.get(
        `/ads/search/1?searchQuery=${searchQuery}`
      );
      if (response.data.length < 1) setHasMoreData(false);
      setSearchedItems(response.data);
      setIsSearching(false);
    } catch (error) {
      console.log(error);
    }
  }

  const debounceSearch = debounce(handleSearch, 600);

  async function handleLoadMore() {
    try {
      let response;
      if (hasMoreData) {
        response = await axios.get(
          `/ads/search/${pageNo}?searchQuery=${searchQuery}`
        );
        if (response.data.length < 1) setHasMoreData(false);
        setSearchedItems((prev) => [...prev, ...response.data]);
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

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <Searchbar
          ref={searchInputRef}
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
          style={{
            backgroundColor: DefaultTheme.colors.primaryLight,
            shadowColor: "transparent",
            margin: 14,
          }}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            data={searchedItems}
            extraData={searchedItems}
            refreshing={isSearching}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  borderTopColor: "#e6e6e6",
                  borderTopWidth: 1,
                  padding: 8,
                }}
                onPress={() =>
                  navigation.navigate("ViewProducts", {
                    _id: item._id,
                    searchedQuery: item.title,
                  })
                }
              >
                <View>
                  <Text>{item.title}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                    in {item.category}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <View style={{ marginTop: 16, padding: 8, marginBottom: 80 }}>
                {hasMoreData && (
                  <ActivityIndicator
                    color={DefaultTheme.colors.primary}
                    size="large"
                  />
                )}
              </View>
            )}
          />
        </View>
      </View>
    </Screen>
  );
}
