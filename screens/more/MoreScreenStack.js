import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, StatusBar } from "react-native";

import SystemMapNavigator from '../system-map/SystemMapNavigator';
import MoreScreen from '../more/MoreScreen';

const Stack = createStackNavigator();

function MoreScreenStack() {
  return (
    <Stack.Navigator initialRouteName="More Screen">
      <Stack.Screen name="More Screen" component={MoreScreen} />
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