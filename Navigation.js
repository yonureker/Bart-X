import React, { useEffect } from "react";
import { StyleSheet, ImageBackground, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native-appearance";

import LiveMapScreen from "./screens/LiveMapScreen";
import SystemMapNavigator from "./screens/system-map/SystemMapNavigator";
import AboutScreen from "./screens/AboutScreen";
import AllStationsNavigator from "./screens/station-schedules/AllStationsNavigator";

export default function Navigation() {
  const dispatch = useDispatch();
  const userLocation = useSelector(state => state.userLocation);
  const scheme = useColorScheme();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    usageCounter();
  }, []);

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      dispatch({
        type: "RECEIVE_USER_LOCATION",
        payload: { coords: { latitude: 37.792874, longitude: -122.39703 } }
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy:
        Platform.OS === "android"
          ? Location.Accuracy.Low
          : Location.Accuracy.Lowest
    });

    dispatch({
      type: "RECEIVE_USER_LOCATION",
      payload: location
    });
  };

  const usageCounter = async () => {
    const usage = await SecureStore.getItemAsync("counter");

    if (usage == null) {
      await SecureStore.setItemAsync("counter", "1");
    } else {
      await SecureStore.setItemAsync("counter", String(Number(usage) + 1));
    }
  };

  const Tab = createBottomTabNavigator();

  if (userLocation.coords.latitude) {
    return (
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tab.Navigator initialRouteName="Station List">
          <Tab.Screen
            name="Station List"
            component={AllStationsNavigator}
            options={{
              tabBarIcon: () => (
                <Ionicons
                  name="md-list"
                  size={32}
                  color={scheme === "dark" ? "white" : "black"}
                  style={styles.tabIcon}
                />
              )
            }}
          />
          <Tab.Screen
            name="Live Map"
            component={LiveMapScreen}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="google-maps"
                  size={32}
                  color={scheme === "dark" ? "white" : "black"}
                  style={styles.tabIcon}
                />
              )
            }}
          />
          <Tab.Screen
            name="System Map"
            component={SystemMapNavigator}
            options={{
              tabBarIcon: () => (
                <Ionicons
                  name="ios-map"
                  size={32}
                  color={scheme === "dark" ? "white" : "black"}
                  style={styles.tabIcon}
                />
              )
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              tabBarIcon: () => (
                <Ionicons
                  name="ios-information-circle"
                  size={32}
                  color={scheme === "dark" ? "white" : "black"}
                  style={styles.tabIcon}
                />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <ImageBackground
        source={require("./assets/loading.png")}
        style={styles.imageBackground}
      ></ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  tabIcon: {
    marginTop: 3
  }
});
