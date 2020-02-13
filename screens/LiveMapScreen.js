import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, StatusBar, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Markers from "../components/live-map/markers";

const LiveMapScreen = React.memo((props) => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useSelector(state => state.userLocation.coords)
  // get user location from Redux store
  // this is used to center the map

  
  // The MapView and Markers are static
  // We only need to update Marker callouts after fetching data
  return (
    <View style={styles.container}>
    <StatusBar />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(latitude) || 37.792874,
          longitude: parseFloat(longitude) || -122.39703,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }}
        minZoomLevel={10}
        provider={"google"}
        loadingEnabled={true}
        mapType={"standard"}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
      >
        <Markers />
      </MapView>
      </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LiveMapScreen;
