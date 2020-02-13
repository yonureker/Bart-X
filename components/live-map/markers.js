import React, {useState} from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from 'react-redux';

import Callouts from './callouts';
import stationLogo from '../../assets/station.png';

const Markers = React.memo((props) => {
  const stationLocations = useSelector(state => state.stationLocations);

  return stationLocations.map((station, index) => {
    return (
      <MapView.Marker
        key={station.abbr}
        coordinate={{
          latitude: parseFloat(station.gtfs_latitude),
          longitude: parseFloat(station.gtfs_longitude)
        }}
        image={stationLogo}
        zIndex={100}
        tracksInfoWindowChanges={true}
      >
      <Callouts key={station.abbr} stationName={station.name} stationAbbr={station.abbr} />
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
