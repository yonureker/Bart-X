import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import MoreMainScreen from "./MoreMainScreen";
import SchedulesScreen from "./SchedulesScreen";
import SystemMapNavigator from "../system-map/SystemMapNavigator";
import RewardsNavigator from "../rewards/RewardsNavigator";

const Stack = createStackNavigator();

function MoreScreenNavigator() {
  return (
    <Stack.Navigator style={styles.navigator} initialRouteName="Bart X">
      <Stack.Screen
        name="Bart X"
        component={MoreMainScreen}
        options={() => ({ headerTitleAlign: "center" })}
      />
      <Stack.Screen
        name="System Map"
        component={SystemMapNavigator}
        options={() => ({ headerTitleAlign: "center" })}
      />
      <Stack.Screen
        name="Schedules"
        component={SchedulesScreen}
        options={() => ({ headerTitleAlign: "center" })}
      />
      <Stack.Screen
        name="Rewards"
        component={RewardsNavigator}
        options={() => ({ headerTitleAlign: "center" })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default MoreScreenNavigator;
