import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, StatusBar } from "react-native";

import SundayScreen from "./SundayScreen";
import WeekAndSatScreen from "./WeekAndSatScreen";

const Tab = createMaterialTopTabNavigator();

function SystemMapNavigator() {
  return (
    <Tab.Navigator swipeEnabled={false} style={styles.navigator}>
      <Tab.Screen name='Weekday & Saturday' component={WeekAndSatScreen} />
      <Tab.Screen name="Sunday" component={SundayScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default SystemMapNavigator;
