import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useColorScheme } from "react-native-appearance";

import TripPlannerHomeScreen from "./TripPlannerHomeScreen";
import TripPlannerResultsNavigator from "./TripPlannerResultsNavigator";

const Stack = createStackNavigator();

export default function TripPlannerNavigator(props) {
  const scheme = useColorScheme();
  const {
    stations: { station }
  } = require("../../stations");

  return (
    <Stack.Navigator
      initialRouteName="TripPlanner Home"
      screenOptions={{
        gestureEnabled: false,
        headerTitleStyle: { fontSize: 18 }
      }}
    >
      <Stack.Screen
        name="TripPlanner Home"
        component={TripPlannerHomeScreen}
        options={{ title: "Trip Planner", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="TripPlanner Results Navigator"
        component={TripPlannerResultsNavigator}
        options={{ title: "Results", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
}
