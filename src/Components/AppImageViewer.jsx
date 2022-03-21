import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import { DefaultTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppImageViewer({
  imagesUrls,
  isModalVisible,
  setIsModalVisible,
  imageIndex,
}) {
  return (
    <Modal
      onRequestClose={() => setIsModalVisible(false)}
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
    >
      <ImageViewer
        imageUrls={imagesUrls.map((image) => {
          return { url: image };
        })}
        loadingRender={() => (
          <ActivityIndicator size="large" color={DefaultTheme.colors.primary} />
        )}
        enableSwipeDown={true}
        onSwipeDown={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        index={imageIndex}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    color: DefaultTheme.colors.primary,
    fontSize: 16,
    textAlign: "right",
    padding: 12,
  },
});
