import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getDistance, convertDistance } from "geolib";

import StationList from "../../components/stationList";

const StationListScreen = props => {
  const dispatch = useDispatch();
  const userLocation = useSelector(state => state.userLocation);
  const stations = useSelector(state => state.stationLocations);
  const departures = useSelector(state => state.trainDepartures)

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    fetchTrainDepartures();
  }, []);

  useEffect(() => {
    fetchStationLocation();
  }, []);

  // useEffect(() => {
  //   calculateDistance();
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 5000);
    return () => clearInterval(intervalId);
    
  });

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

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      dispatch({
        type: "RECEIVE_USER_LOCATION",
        payload: { coords: { latitude: 37.792874, longitude: -122.39703 } }
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});

    dispatch({
      type: "RECEIVE_USER_LOCATION",
      payload: location
    });
  };

  const calculateDistance = () => {
    return stations.map(station => {
      return {
        ...station,
        distance: convertDistance(
          getDistance(
            {
              latitude: station.gtfs_latitude,
              longitude: station.gtfs_longitude
            },
            {
              latitude: String(userLocation.coords.latitude),
              longitude: String(userLocation.coords.longitude)
            }
          ),
          "mi"
        )
      };
    });
  };

  const stationsWithDistance = calculateDistance();

  if (userLocation && stations.length !== 0 && departures.length !== 0) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <SafeAreaView style={{ width: "100%" }}>
          <StationList
            navigate={props.navigation.navigate}
            stations={stationsWithDistance}
            fetchTrainDepartures={() => fetchTrainDepartures}
          />
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading Stations</Text>
        <ActivityIndicator size="large" color="blue"/>
      </View>
    );
  }
};

StationListScreen.navigationOptions = {
  title: "Closest Stations"
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default StationListScreen;
