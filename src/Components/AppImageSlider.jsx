import React from "react";
import { DefaultTheme } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";

export default function AppImageSlider({ imagesUrls, onPress }) {
  return (
    <SliderBox
      images={imagesUrls}
      dotColor={DefaultTheme.colors.primary}
      imageLoadingColor={DefaultTheme.colors.primary}
      sliderBoxHeight={200}
      onCurrentImagePressed={(index) => onPress(index)}
    />
  );
}
