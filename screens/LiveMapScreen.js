import React from "react";
import MapView, { Polyline } from "react-native-maps";
import { StyleSheet, View, Platform, Picker, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";

import Markers from "../components/live-map/Markers";

const LiveMapScreen = React.memo(() => {
  const { latitude, longitude } = useSelector(
    state => state.userLocation.coords
  );
  const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  const customMap = require("../customMap.json");
  const {
    routes: { route }
  } = require("../bartData/routeDetails");

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
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
          
          minZoomLevel={1}
          provider={null}
          loadingEnabled={true}
          mapType={Platform.OS === "ios" ? "mutedStandard" : "standard"}
          customMapStyle={
            Platform.OS === "android" && colorScheme === "dark"
              ? customMap
              : null
          }
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          showsCompass={true}
          showsUserLocation={true}
        >
          {route.map((line, index) => (
            <Polyline
              coordinates={line.coordinates.map(elem => {
                if (index % 2 === 0) {
                  return {
                    latitude: elem.latitude - index * 0.00002,
                    longitude: elem.longitude + index * 0.00002
                  };
                } else {
                  return {
                    latitude: elem.latitude + index * 0.00002,
                    longitude: elem.longitude - index * 0.00002
                  };
                }
              })}
              key={index}
              strokeColor={line.hexcolor}
              strokeWidth={3}
            />
          ))}
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
