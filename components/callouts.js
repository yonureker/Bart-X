import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from 'react-redux'

import StationCallout from './stationCallout';

const Callouts = props => {
  const trainDepartures = useSelector(state => state.trainDepartures)

  const {stationName, stationAbbr } = props;

  return (
    <MapView.Callout
          key={stationAbbr}
          tooltip={true}
          style={styles.calloutContainer}
        >
          <View style={styles.calloutHeader}>
            <Text style={{ fontWeight: "bold" }}>{stationName}</Text>
          </View>
          <View style={styles.calloutContent}>
            <StationCallout key={stationAbbr} station={trainDepartures.find(item => (item.abbr == stationAbbr))} />
          </View>
        </MapView.Callout>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: '#ffffff',
    borderColor: 'gray',
    borderRadius: 15,
    padding: 5
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
})

export default Callouts;
