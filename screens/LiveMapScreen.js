import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Platform } from "react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import Markers from "../components/live-map/markers";

const LiveMapScreen = React.memo(props => {
  const { latitude, longitude } = useSelector(
    state => state.userLocation.coords
  );

  const isFocused = useIsFocused();
  const customMap = require("../customMap.json");

  // The MapView and Markers are static
  // We only need to update Marker callouts after fetching data
  if (isFocused) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          region={{
            latitude: parseFloat(latitude) || 37.792874,
            longitude: parseFloat(longitude) || -122.39703,
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
        >
          <Markers />
        </MapView>
      </View>
    );
  } else {
    return <View></View>;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LiveMapScreen;
