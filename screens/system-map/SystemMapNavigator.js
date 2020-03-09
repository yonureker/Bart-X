import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SundayScreen from "./SundayScreen";
import WeekAndSatScreen from "./WeekAndSatScreen";

const Tab = createMaterialTopTabNavigator();

function SystemMapNavigator() {
  return (
    <Tab.Navigator swipeEnabled={false}>
      <Tab.Screen name="Weekday & Saturday" component={WeekAndSatScreen} />
      <Tab.Screen name="Sunday" component={SundayScreen} />
    </Tab.Navigator>
  );
}

export default SystemMapNavigator;
