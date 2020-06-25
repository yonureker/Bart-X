import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Platform, Picker, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import Markers from "../components/live-map/markers";

const LiveMapScreen = React.memo(() => {
  const { latitude, longitude } = useSelector(
    state => state.userLocation.coords
  );
  const isFocused = useIsFocused();
  const customMap = require("../customMap.json");

  // if user is out of SF Bay Area, center the map around SF.
  const setMapRegion = () => {
    if (
      latitude < 36.6 ||
      latitude > 38.58 ||
      longitude < -122.8 ||
      longitude > -121.25
    ) {
      Alert.alert(
        "The map is centered at Embarcadero station as your location is out of the Bay Area region."
      );
      return {
        latitude: 37.792874,
        longitude: -122.39703
      };
    } else {
      return {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      };
    }
  };

  // The MapView and Markers are static
  // We only need to update Marker callouts after fetching data
  if (isFocused) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          region={{
            ...setMapRegion(),
            // latitude: parseFloat(latitude),
            // //  || 37.792874,
            // longitude: parseFloat(longitude),
            //  || -122.39703,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
          minZoomLevel={1}
          provider={null}
          loadingEnabled={true}
          mapType={"standard"}
          customMapStyle={Platform.OS === "android" ? customMap : null}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          showsCompass={true}
          showsUserLocation={true}
        >
          <Markers />
        </MapView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LiveMapScreen;
