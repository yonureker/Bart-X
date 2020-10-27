import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, useColorScheme } from "react-native";
import MapView from "react-native-maps";

import CalloutText from "./calloutText";

const Callouts = props => {
  const { stationName, stationAbbr } = props;
  // const dispatch = useDispatch(); //

  const [stationData, setStationData] = useState([]);

  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    if (Platform.OS === "android") {
      fetchTrainDepartures();
    }
  }, []);

  useLayoutEffect(() => {
    if (props.showCallOut === true) {
      fetchTrainDepartures();

      const intervalId = setInterval(fetchTrainDepartures, 10000);
      return () => clearInterval(intervalId);
    }
  }, [props.showCallOut]);

  const fetchTrainDepartures = () => {
    fetch(
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${props.stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`
    )
      .then(response => response.json())
      .then(responseJson => setStationData(responseJson.root.station[0]))
      .catch(error => {
        console.log(error);
      });
  };

  const backgroundStyle = colorScheme === "dark" ? styles.darkThemeContainer : null;
  const textStyle = colorScheme === "dark" ? styles.darkThemeText : null;

  return (
    <MapView.Callout
      key={stationAbbr}
      tooltip={true}
      style={[styles.calloutContainer, backgroundStyle]}
    >
      <View style={styles.calloutHeader}>
        <Text style={[styles.stationName, textStyle]}>{stationName}</Text>
      </View>
      <View style={styles.calloutContent}>
        <CalloutText key={stationAbbr} station={stationData} colorScheme={colorScheme} />
      </View>
    </MapView.Callout>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: "#ffffff",
    borderColor: "gray",
    borderRadius: 15,
    padding: 5,
    flex: 1
  },
  darkThemeContainer: {
    backgroundColor: '#000000'
  },
  darkThemeText: {
    color: '#ffffff'
  },
  calloutHeader: {
    marginHorizontal: 5,
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#c4c1b9",
    flex: 1
  },
  calloutContent: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 8,
    flex: 1
  },
  stationName: {
    fontWeight: "bold"
  }
});

export default Callouts;
