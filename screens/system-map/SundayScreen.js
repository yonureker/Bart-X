import React from "react";
import { Image, StatusBar, SafeAreaView, StyleSheet, View } from "react-native";
import PinchZoomView from 'react-native-pinch-zoom-view';

const SundayScreen = props => {

  return (
    <PinchZoomView minScale={1} maxScale={4}>
        <Image
          style={{ width: '100%', height: '100%'}}
          source={require("../../assets/sunday-system-map.png")}
          resizeMode="contain"
        />
        </PinchZoomView>
  );
};

export default SundayScreen;
