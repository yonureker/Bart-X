import React, { useState, useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../../config/firebaseConfig";

import RewardsHome from "./RewardsHome";
import RewardsPhoneScreen from "./RewardsPhoneScreen";
import VerifyCodeScreen from "./VerifyCodeScreen";
import MyAccountScreen from "./MyAccountScreen";

const Stack = createStackNavigator();

export default function RewardsNavigator(props) {
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={currentUser ? "My Account" : "Rewards Home"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Rewards Home"
        component={RewardsHome}
        options={{
          title: "Bart X Rewards",
          headerTitleAlign: "center",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Rewards Phone Screen"
        component={RewardsPhoneScreen}
      />
      <Stack.Screen
        name="Verify Code"
        component={VerifyCodeScreen}
      />
      <Stack.Screen
        name="My Account"
        component={MyAccountScreen}
      />
    </Stack.Navigator>
  );
}
