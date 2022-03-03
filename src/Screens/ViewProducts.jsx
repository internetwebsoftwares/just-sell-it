import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
  DefaultTheme,
  Badge,
  Card,
  Paragraph,
  Title,
} from "react-native-paper";
import axios from "axios";
import { PageLoading } from "../Components/Loading";
import { useNavigation } from "@react-navigation/native";
import AppFilter from "../Components/AppFilter";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageNo, setPageNo] = useState(2);
  const [hasMoreData, setHasMoreData] = useState(true);

  async function handleRefresh() {
    try {
      setIsRefreshing(true);
      const response = await axios.get(`/ads/all/1`);
      setProducts(response.data);
      setPageNo(2);
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMoreProduct() {
    try {
      if (hasMoreData) {
        const response = await axios.get(`/ads/all/${pageNo}`);
        if (response.data.length > 0) {
          setPageNo((prev) => prev + 1);
          setProducts((prev) => [...prev, ...response.data]);
        } else {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get("/ads/all/1");
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <View style={{ padding: 12 }}>
      <View style={{ paddingBottom: 12 }}>
        <AppFilter />
      </View>
      <FlatList
        keyExtractor={(item) => item._id}
        data={products}
        extraData={products}
        renderItem={({ item }) => <AppCard item={item} />}
        refreshing={isRefreshing}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        onEndReachedThreshold={10}
        onEndReached={loadMoreProduct}
      />
    </View>
  );
}

function AppCard({ item }) {
  const navigation = useNavigation();
  return (
    <Card
      onPress={() =>
        navigation.navigate("OneProduct", {
          _id: item._id,
          productName: item.title,
        })
      }
      key={item._id}
      style={{ marginBottom: 20 }}
    >
      <Card.Cover
        source={{
          uri: item.previewImageUrl,
        }}
      />
      <Badge style={styles.badge}>{item.imagesUrls.length} photos</Badge>
      <Card.Title title={item.title}></Card.Title>
      <Card.Content>
        <Paragraph>{`${item.description.slice(0, 200)}...`}</Paragraph>
        <Title style={{ color: DefaultTheme.colors.primary }}>
          Price: ₹{item.price}/-
        </Title>
      </Card.Content>
    </Card>
  );
}

function ListFooter() {
  return (
    <View>
      <ActivityIndicator
        style={{ marginVertical: 12 }}
        size="large"
        color={DefaultTheme.colors.primary}
      />
      <Text
        style={{
          textAlign: "center",
        }}
      >
        Loading more items for you...
      </Text>
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
});
