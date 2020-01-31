import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from 'react-redux'
import stationDetails from "../stationDetails";
import StationCallout from "./stationCallout";
import stationLogo from "../assets/station.png";

const Markers = props => {
  const stationData = useSelector(state => state.stationData)

  return stationData.map((station, index) => {
    return (
      <MapView.Marker
        key={index}
        coordinate={{
          // receives station latitude and longitude from stationDetails.js
          latitude: parseFloat(stationDetails[station.abbr].gtfs_latitude),
          longitude: parseFloat(stationDetails[station.abbr].gtfs_longitude)
        }}
        image={stationLogo}
        zIndex={100}
        tracksInfoWindowChanges={true}
      >
        <MapView.Callout
          key={index}
          tooltip={true}
          style={styles.calloutContainer}
        >
          <View style={styles.calloutHeader}>
            <Text style={{ fontWeight: "bold" }}>{station.name}</Text>
          </View>
          <View style={styles.calloutContent}>
            <StationCallout key={index} station={stationData[index]} />
          </View>
        </MapView.Callout>
      </MapView.Marker>
    );
  });
  //   <View style={styles.updateTimeContainer}>
  //   <Text style={styles.updateTimeText}>
  //     Last update at {lastUpdate}
  //   </Text>
  // </View>
};

const styles = StyleSheet.create({
  mapContainer: {
    height: "98%"
  },
  calloutContainer: {
    backgroundColor: '#ffffff',
    borderColor: 'gray',
    borderRadius: 10
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
  },
  calloutHeader: {
    marginHorizontal: 5,
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#c4c1b9"
  },
  calloutContent: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 8
  }
});

export default Markers;
