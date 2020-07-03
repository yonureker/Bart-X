import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdvisoryScreen from "../advisories/AdvisoryScreen";

const Stack = createStackNavigator();

export default function AdvisoryNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Advisories"
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18
        }
      }}
    >
      <Stack.Screen
        name="Advisories"
        component={AdvisoryScreen}
        options={() => ({ headerTitleAlign: "center" })}
      />
    </Stack.Navigator>
  );
}
