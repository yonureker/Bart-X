import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native-appearance";

import AdvisoryScreen from "../advisories/AdvisoryScreen";

const Stack = createStackNavigator();

export default function AdvisoryNavigator() {
  const scheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Advisories"
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18
        }
      }}
    >
      <Stack.Screen name="Advisories" component={AdvisoryScreen} />
    </Stack.Navigator>
  );
}
