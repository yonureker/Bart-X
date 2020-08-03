import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import MoreScreen from "../more/MoreScreen";
import SchedulesScreen from "../more/SchedulesScreen";
import SystemMapNavigator from "../system-map/SystemMapNavigator";
import Rewards from "../rewards/RewardsHome";
import TripPlannerNavigator from "../trip-planner/TripPlannerNavigator";

const Stack = createStackNavigator();

function MoreScreenStack() {
  return (
    <Stack.Navigator style={styles.navigator} initialRouteName="Bart X">
      <Stack.Screen
        name="Bart X"
        component={MoreScreen}
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
        name="Trip Planner"
        component={TripPlannerNavigator}
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

export default MoreScreenStack;
