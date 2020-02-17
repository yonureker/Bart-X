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
  const departures = useSelector(state => state.trainDepartures);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    calculateDistance();
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
      accuracy: Location.Accuracy.High
    });

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

  if (userLocation.coords.latitude !== null) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <SafeAreaView style={{ width: "100%" }}>
          <StationList
            navigate={props.navigation.navigate}
            stations={calculateDistance()}
            fetchTrainDepartures={() => fetchTrainDepartures}
          />
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View>
          <Text>Loading Stations</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator size="large" color="black" />
        </View>
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
