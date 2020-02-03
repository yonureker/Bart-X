import React from "react";
import { Image } from "react-native";
import { Dimensions, Animated } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

const SundayScreen = props => {

  return (
        <Image
          style={{ width: '100%', height: '100%'}}
          source={require("../../assets/sunday-system-map.png")}
          resizeMode="contain"
        />
  );
};

export default SundayScreen;
