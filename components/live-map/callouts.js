import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector, useDispatch } from 'react-redux'

import StationCallout from './stationCallout';

const Callouts = props => {
  const trainDepartures = useSelector(state => state.trainDepartures)
  const {stationName, stationAbbr } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTrainDepartures();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 15000);
    return () => clearInterval(intervalId);
  });

  const fetchTrainDepartures = () => {
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