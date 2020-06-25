import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import MoreScreen from "../more/MoreScreen";
import SchedulesScreen from "../more/SchedulesScreen";
import SystemMapNavigator from "../system-map/SystemMapNavigator";

const Stack = createStackNavigator();

function MoreScreenStack() {
  return (
    <Stack.Navigator initialRouteName="Bart X">
      <Stack.Screen name="Bart X" component={MoreScreen} />
      <Stack.Screen name="System Map" component={SystemMapNavigator} />
      <Stack.Screen name="Schedules" component={SchedulesScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default MoreScreenStack;
