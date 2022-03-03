import {
  FlatList,
  StyleSheet,
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

export default function SearchPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);
  const searchInputRef = useRef();

  function handleChange({ nativeEvent }) {
    const { text } = nativeEvent;
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
      setNothingFound(false);
      const response = await axios.get(
        `/ads/search/1?searchQuery=${searchQuery}`
      );
      setSearchedItems(response.data);
      setIsSearching(false);
      if (!response.data.length) setNothingFound(true);
    } catch (error) {
      console.log(error);
    }
  }

  const debounceSearch = debounce(handleSearch, 600);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
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
      {nothingFound && (
        <Text style={{ textAlign: "center", color: "grey" }}>
          Cannot found what you are looking for :(
        </Text>
      )}
      {isSearching && (
        <View>
          <ActivityIndicator size="large" color={DefaultTheme.colors.primary} />
          <Text style={{ textAlign: "center", marginTop: 8 }}>
            Searching...
          </Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ paddingBottom: 100 }}
          data={searchedItems}
          extraData={searchedItems}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderTopColor: "#e6e6e6",
                borderTopWidth: 1,
              }}
              onPress={() =>
                navigation.navigate("OneProduct", {
                  _id: item._id,
                  productName: item.title,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Image
                  style={{ width: 40, height: 40, marginRight: 8 }}
                  source={{ uri: item.previewImageUrl }}
                />
                <View>
                  <Text>{item.title}</Text>
                  <Text numberOfLines={1} style={{ color: "grey", flex: 1 }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
