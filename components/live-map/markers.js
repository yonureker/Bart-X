import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

import Callouts from './callouts';
import stationLogo from '../../assets/station.png';

const Markers = React.memo((props) => {
  const { stations : { station } } = require('../../stations');

  return station.map((trainStation, index) => {
    return (
      <MapView.Marker
        key={trainStation.abbr}
        coordinate={{
          latitude: parseFloat(trainStation.gtfs_latitude),
          longitude: parseFloat(trainStation.gtfs_longitude)
        }}
        image={stationLogo}
        zIndex={100}
        tracksInfoWindowChanges={true}
      >
      <Callouts key={trainStation.abbr} stationName={trainStation.name} stationAbbr={trainStation.abbr} />
      </MapView.Marker>
    );
  });
  //   <View style={styles.updateTimeContainer}>
  //   <Text style={styles.updateTimeText}>
  //     Last update at {lastUpdate}
  //   </Text>
  // </View>
});

const styles = StyleSheet.create({
  mapContainer: {
    height: "98%"
  },
  updateTimeContainer: {
    height: "5%",
    backgroundColor: "#D1CCCC",
    justifyContent: "center",
    alignContent: "center"
  },
  updateTimeText: {
    fontSize: 15,
    color: "black",
    alignSelf: "center"
  }
});

export default Markers;
