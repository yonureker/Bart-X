import React from "react";
import { Image } from "react-native";

const WeekAndSatScreen = props => {

  return (
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require("../../assets/week-and-sat-system-map.png")}
          resizeMode="contain"
        />
  );
};

export default WeekAndSatScreen;