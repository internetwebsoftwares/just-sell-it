import React, { useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from "react-native";
import {
  Card,
  DefaultTheme,
  Headline,
  Paragraph,
  Title,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../Components/AppButton";
import AppBadge from "../Components/AppBadge";
import AppInput from "../Components/AppInput";
import AppSelect from "../Components/AppSelect";
import AppImageSlider from "../Components/AppImageSlider";
import AppImageViewer from "../Components/AppImageViewer";
import VerticalSpace from "../Components/VerticalSpace";
import reportReasons from "../utils/reportReasons";
import axios from "axios";
import MainContext from "../MainContext";

export default function OneProduct({ route }) {
  const [product, setProduct] = useState(route.params.product);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportSubject, setReportSubject] = useState("Fraud");
  const [comment, setComment] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const { userToken, isUserLoggedIn } = useContext(MainContext);

  // async function handleSaveProduct() {
  //   try {
  //     const savedProductsIds = await AsyncStorage.getItem("savedProductsIds");
  //     if (savedProductsIds) {
  //       let currentIds = JSON.parse(savedProductsIds);
  //       if (currentIds.includes(product._id.toString())) {
  //         ToastAndroid.show(
  //           "This product is already saved",
  //           ToastAndroid.SHORT
  //         );
  //         return;
  //       }
  //       let newIds = currentIds.concat(product._id.toString());
  //       await AsyncStorage.setItem("savedProductsIds", JSON.stringify(newIds));
  //     } else {
  //       await AsyncStorage.setItem(
  //         "savedProductsIds",
  //         JSON.stringify([product._id.toString()])
  //       );
  //     }
  //     ToastAndroid.show("Product saved", ToastAndroid.SHORT);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handleReport() {
    try {
      setIsReporting(true);
      const response = await axios.post(
        `/report/${product._id}/post`,
        {
          reportSubject,
          comment,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response.data === "Your report has been submitted") {
        setIsReporting(false);
        ToastAndroid.show(response.data, ToastAndroid.SHORT);
        setIsReportModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ScrollView>
        <Modal
          onRequestClose={() => setIsReportModalVisible(false)}
          visible={isReportModalVisible}
          animationType="slide"
          statusBarTranslucent
          transparent
        >
          <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
            <View
              style={{
                padding: 12,
                paddingTop: 20,
                backgroundColor: "#fff",
                position: "absolute",
                width: "100%",
                bottom: 0,
                height: "80%",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            >
              <Text>Select reasons:</Text>
              <AppSelect
                data={reportReasons}
                list={reportSubject}
                setList={setReportSubject}
              />
              <AppInput
                multiline
                numberOfLines={5}
                label="Describe your reasons"
                value={comment}
                onChangeText={setComment}
              />
              <AppButton
                disabled={isReporting}
                loading={isReporting}
                onPress={handleReport}
                mode="contained"
              >
                Report
              </AppButton>
              <AppButton onPress={() => setIsReportModalVisible(false)}>
                Cancel
              </AppButton>
            </View>
          </View>
        </Modal>
        <AppImageSlider
          imagesUrls={product.imagesUrls}
          onPress={(index) => {
            setIsModalVisible(true);
            setImageIndex(index);
          }}
        />
        <AppImageViewer
          imagesUrls={product.imagesUrls}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          imageIndex={imageIndex}
        />

        <Card.Content style={{ marginTop: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title
              style={{
                color: DefaultTheme.colors.primary,
              }}
            >
              Price: ₹{product.price}/-
            </Title>
            {isUserLoggedIn && (
              <View style={{ flexDirection: "row", marginVertical: 8 }}>
                <TouchableOpacity
                  onPress={() => setIsReportModalVisible(true)}
                  style={styles.actionIcon}
                >
                  <MaterialCommunityIcons
                    color={DefaultTheme.colors.primary}
                    size={22}
                    name="exclamation-thick"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Headline>{product.title}</Headline>
          <View style={{ marginVertical: 12 }}>
            <Text style={{ fontWeight: "bold" }}>
              Owner:{" "}
              <Text style={{ fontWeight: "200" }}>{product.ownerName}</Text>
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginVertical: 8 }}
          >
            <AppBadge>{product.category}</AppBadge>
          </View>

          <Paragraph style={styles.paragraph}>{product.description}</Paragraph>

          <View>
            {/* <AppButton
              icon="bookmark"
              mode="contained"
              onPress={handleSaveProduct}
            >
              Save to watch later
            </AppButton> */}
            <AppButton
              icon="chat"
              mode="contained"
              onPress={() => console.log("Did u click me")}
            >
              Chat with the owner
            </AppButton>
          </View>
        </Card.Content>
        <VerticalSpace space={50} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    backgroundColor: DefaultTheme.colors.primaryLight,
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  paragraph: {
    color: DefaultTheme.colors.backdrop,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
  },
});
