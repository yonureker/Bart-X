import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, StatusBar } from "react-native";

import SystemMapNavigator from "../system-map/SystemMapNavigator";
import MoreScreen from "../more/MoreScreen";
import FeedbackScreen from "../more/FeedbackScreen";

const Stack = createStackNavigator();

function MoreScreenStack() {
  return (
    <Stack.Navigator initialRouteName="Bart X">
      <Stack.Screen name="Bart X" component={MoreScreen} />
      <Stack.Screen name="System Map" component={SystemMapNavigator} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default MoreScreenStack;
