import React from "react";
import { Image } from "react-native";
import PinchZoomView from "react-native-pinch-zoom-view";

export default function SundayScreen() {
  return (
    <PinchZoomView minScale={1} maxScale={4}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{
          uri:
            "https://bart-system-maps.s3-us-west-1.amazonaws.com/sunday-system-map.png"
        }}
        resizeMode="contain"
      />
    </PinchZoomView>
  );
}
