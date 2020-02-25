import React from "react";
import { StatusBar, View, SafeAreaView } from "react-native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from "react-navigation-tabs";
import { createDrawerNavigator } from 'react-navigation-drawer';

import AllStationsScreen from "./AllStationsScreen";
import FavoriteStationsScreen from "./FavoriteStationsScreen";

const StationScreen = createDrawerNavigator(
  {
    "All Stations": {
      screen: AllStationsScreen,
    },
    "Favorite Stations": {
      screen: FavoriteStationsScreen,
    }
  },  
);

export default StationScreen;