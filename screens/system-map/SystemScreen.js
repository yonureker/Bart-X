import React from "react";
import { StatusBar, View, SafeAreaView } from "react-native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from "react-navigation-tabs";

import SundayScreen from "./SundayScreen";
import WeekAndSatScreen from "./WeekAndSatScreen";

const SystemScreen = createMaterialTopTabNavigator(
  {
    "Weekday & Saturday": {
      screen: WeekAndSatScreen,
      navigationOptions: {
        swipeEnabled: false
      }
    },
    Sunday: {
      screen: SundayScreen,
      navigationOptions: {
        swipeEnabled: false
      }
    }
  },
  {
    tabBarComponent: SafeAreaMaterialTopTabBar
  }
);

function SafeAreaMaterialTopTabBar(props) {
  return (
    <View>
      <StatusBar />
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}
      >
        <MaterialTopTabBar {...props} />
      </SafeAreaView>
    </View>
  );
}

export default SystemScreen;
