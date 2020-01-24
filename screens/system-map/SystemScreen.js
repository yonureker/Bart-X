import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import SundayScreen from './SundayScreen';
import WeekAndSatScreen from './WeekAndSatScreen';
import { SafeAreaView } from "react-navigation"

const SystemScreen = createMaterialTopTabNavigator({
  'Weekday & Saturday': {screen: WeekAndSatScreen},
  'Sunday': SundayScreen
}, {
  tabBarComponent: SafeAreaMaterialTopTabBar
}
)

function SafeAreaMaterialTopTabBar (props) {
  return (
    <SafeAreaView>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default SystemScreen;
