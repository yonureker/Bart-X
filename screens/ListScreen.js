import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getDistance, convertDistance } from "geolib";

import StationList from "../components/stationList";
import { SafeAreaView } from "react-navigation";

const ListScreen = props => {
  const dispatch = useDispatch();
  const userLocation = useSelector(state => state.userLocation);
  const stations = useSelector(state => state.stationLocations);

  

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
    calculateDistance();
  });

  useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 10000);
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

    let location = await Location.getCurrentPositionAsync({});

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
        console.log(error);
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
        console.log(error);
      });
  };

  const calculateDistance = () => {
    return stations.map(station => {
      return( {...station, distance:
      convertDistance(getDistance(
        {
          latitude: parseFloat(station.gtfs_latitude),
          longitude: parseFloat(station.gtfs_longitude)
        },
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude
        }
      ), 'mi')});
    });
  };

  const stationsWithDistance = calculateDistance();

  if (userLocation.coords.latitude !== null) {
    return (
      <View style={styles.container}>
        <StatusBar/>
        <SafeAreaView><StationList stations={stationsWithDistance}/></SafeAreaView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default ListScreen;
