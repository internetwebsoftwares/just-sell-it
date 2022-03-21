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

export default function AppReports() {
  const [reports, setReports] = useState([]);
  const [pageNo, setPageNo] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const { userToken } = useContext(MainContext);

  async function handleRefresh() {
    try {
      setPageNo(2);
      loadReports();
      setHasMoreData(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoadMore() {
    try {
      let response;
      if (hasMoreData) {
        response = await axios.get(`/reports/all/${pageNo}`, {
          headers: {
            Authorization: userToken,
          },
        });
        setReports((prev) => [...prev, ...response.data.results]);
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

  async function loadReports() {
    try {
      setIsLoading(true);
      const response = await axios.get(`/reports/all/1`, {
        headers: {
          Authorization: userToken,
        },
      });
      setReports(response.data.results);
      setTotalDocuments(response.data.totalDocuments);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <View style={{ padding: 12 }}>
      <Searchbar placeholder="Search reports" />
      <Text style={{ marginTop: 12 }}>Total reports: {totalDocuments}</Text>
      <FlatList
        data={reports}
        renderItem={({ item }) => <ReportList item={item} />}
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

function ReportList({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Ad id:</Text>
      <Text>{item.adId}</Text>

      <Text style={styles.bold}>Ad title:</Text>
      <Text>{item.addTitle}</Text>

      <Text style={styles.bold}>Ad link:</Text>
      <Text>{item.addLink}</Text>

      <Text style={styles.bold}>reported by:</Text>
      <Text>{item.reportedByUserId}</Text>

      <Text style={styles.bold}>Subject</Text>
      <Text>{item.reportSubject}</Text>

      <Text style={styles.bold}>Comment</Text>
      <Text>{item.comment}</Text>
      <Divider style={{ marginTop: 12 }} />
      <Button>View report</Button>
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
