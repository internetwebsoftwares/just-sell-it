import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Searchbar, DefaultTheme, Divider, Button } from "react-native-paper";
import { PageLoading } from "../Components/Loading";
import axios from "axios";
import MainContext from "../MainContext";

export default function AppUsers() {
  const [users, setUsers] = useState([]);
  const [pageNo, setPageNo] = useState(2);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { userToken } = useContext(MainContext);

  async function handleRefresh() {
    try {
      setPageNo(2);
      loadUsers();
      setHasMoreData(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoadMore() {
    try {
      let response;
      if (hasMoreData) {
        response = await axios.get(`/admin/users/all/${pageNo}`, {
          headers: {
            Authorization: userToken,
          },
        });
        setUsers((prev) => [...prev, ...response.data.results]);
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

  async function loadUsers() {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/users/all/1`, {
        headers: {
          Authorization: userToken,
        },
      });
      setUsers(response.data.results);
      setTotalDocuments(response.data.totalDocuments);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <View style={{ padding: 12 }}>
      <Searchbar placeholder="Search users" />
      <Text style={{ marginTop: 12 }}>Total users: {totalDocuments}</Text>

      <FlatList
        data={users}
        renderItem={({ item }) => <UserList item={item} />}
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

function UserList({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Name:</Text>
      <Text>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.bold}>Email:</Text>

      <Text>{item.email}</Text>
      <Text style={styles.bold}>Phone number:</Text>

      <Text>{item.phoneNumber}</Text>
      <Divider style={{ marginTop: 12 }} />
      <Button>View user</Button>
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
