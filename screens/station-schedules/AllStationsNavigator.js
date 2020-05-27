import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native-appearance";
import * as SecureStore from "expo-secure-store";

import StationListScreen from "./StationListScreen";
import FavoriteListScreen from "./FavoriteListScreen";
import StationDetailsScreen from "./StationDetailsScreen";

const Stack = createStackNavigator();

export default function AllStationsNavigator(props) {
  const scheme = useColorScheme();
  const {
    stations: { station }
  } = require("../../stations");
  const [favorite, setFavorite] = useState({});

  useEffect(() => {
    getFavoriteStatus();
  }, []);

  const getFavoriteStatus = () => {
    station.map(async item => {
      const abbr = item.abbr;
      const status = await SecureStore.getItemAsync(abbr);

      setFavorite(prevState => ({ ...prevState, [abbr]: status }));
    });
  };

  const updateFavoriteStatus = async abbr => {
    const status = await SecureStore.getItemAsync(abbr);

    if (status !== "true") {
      await SecureStore.setItemAsync(abbr, "true");
      setFavorite({ ...favorite, [abbr]: "true" });
    } else {
      await SecureStore.setItemAsync(abbr, "false");
      setFavorite({ ...favorite, [abbr]: "false" });
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="StationList"
      screenOptions={{
        gestureEnabled: false
      }}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18
        }
      }}
    >
      <Stack.Screen
        name="Closest Stations"
        component={StationListScreen}
        initialParams={{ displaySearchBar: false }}
        options={({ route, navigation }) => ({
          headerRight: () => (
            <MaterialIcons
              name="search"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginRight: 10 }}
              onPress={() =>
                navigation.setParams({
                  displaySearchBar: true
                })
              }
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons
              name="heart-box"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.navigate("Favorite Stations");
              }}
            />
          )
        })}
      />
      <Stack.Screen
        name="Favorite Stations"
        component={FavoriteListScreen}
        initialParams={{ displaySearchBar: false, favorites: favorite }}
        options={({ route, navigation }) => ({
          headerRight: () => (
            <MaterialIcons
              name="search"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginRight: 10 }}
              onPress={() =>
                navigation.setParams({
                  displaySearchBar: true
                })
              }
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.navigate("Closest Stations");
              }}
            />
          )
        })}
      />
      <Stack.Screen
        name="StationDetails"
        component={StationDetailsScreen}
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerForceInset: { top: "never", bottom: "never" },
          headerLeft: () => (
            <Ionicons
              name="md-locate"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <MaterialIcons
              name={
                favorite[route.params.abbr] === "true"
                  ? "favorite"
                  : "favorite-border"
              }
              size={32}
              color="red"
              style={{ marginRight: 10 }}
              onPress={() => updateFavoriteStatus(route.params.abbr)}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}
