import React, { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { createAppContainer } from "react-navigation";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LiveMapScreen from "./screens/LiveMapScreen";
import ListScreen from "./screens/station-schedules/ListScreen";
import SystemScreen from "./screens/system-map/SystemScreen";
import AboutScreen from "./screens/AboutScreen";

export default function AppContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    fetchTrainDepartures();
  }, []);

  useEffect(() => {
    fetchStationLocation();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 5000);
    return () => clearInterval(intervalId);
  });

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      dispatch({
        type: "RECEIVE_USER_LOCATION",
        payload: { coords: { latitude: 37.792874, longitude: -122.39703 } }
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

    dispatch({
      type: "RECEIVE_USER_LOCATION",
      payload: location
    });
  };

  const fetchStationLocation = () => {
    fetch(
      "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson =>
        dispatch({
          type: "RECEIVE_STATION_LOCATIONS",
          payload: responseJson.root.stations.station
        })
      )
      .catch(error => {
        Alert.alert(error);
      });
  };

  const fetchTrainDepartures = () => {
    // setStationList(responseJson.root.station);
    // setLastUpdate(responseJson.root.time);)
    // call BART API
    fetch(
      "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson =>
        dispatch({
          type: "RECEIVE_TRAIN_DEPARTURE_DATA",
          payload: responseJson.root.station
        })
      )
      .catch(error => {
        Alert.alert(error);
      });
  };

  return <AppWrapper />;
}

// Bottom Tab Navigator Setup
const TabNavigator = createBottomTabNavigator(
  {
    "Station List": {
      screen: ListScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <Ionicons
            name="md-list"
            size={32}
            color="black"
            style={styles.tabIcon}
          />
        )
      }
    },
    "Live Map": {
      screen: LiveMapScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="google-maps"
            size={32}
            color="black"
            style={styles.tabIcon}
          />
        )
      }
    },
    "System Map": {
      screen: SystemScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <Ionicons
            name="ios-map"
            size={32}
            color="black"
            style={styles.tabIcon}
          />
        )
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <Ionicons
            name="ios-information-circle"
            size={32}
            color="black"
            style={styles.tabIcon}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Station List"
  }
);

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

const AppWrapper = createAppContainer(TabNavigator);
