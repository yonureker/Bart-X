import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { useColorScheme } from 'react-native-appearance';

import StationList from "../../components/stationList";

const StationListScreen = props => {
  const colorScheme = useColorScheme();
  const userLocation = useSelector(state => state.userLocation);
  const {
    stations: { station }
  } = require("../../stations");

  useEffect(() => {
    calculateDistance();
  });

  const calculateDistance = () => {
    return station.map(station => {
      return {
        ...station,
        distance: convertDistance(
          getDistance(
            {
              latitude: station.gtfs_latitude,
              longitude: station.gtfs_longitude
            },
            {
              latitude: String(userLocation.coords.latitude),
              longitude: String(userLocation.coords.longitude)
            }
          ),
          "mi"
        )
      };
    });
  };

  const containerStyle = colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.listContainer}>
        <StationList
          style={{flex: 1}}
          navigate={props.navigation.navigate}
          stations={calculateDistance()}
        />
      </View>
    </View>
  );
};



// StationListScreen.navigationOptions = ({ navigation }) => (
//   {
//   title: "Closest Stations",
//   headerForceInset: { top: "never", bottom: "never" }
//   }
// );

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { flex: 1, width: "100%" },
  lightContainer: {backgroundColor: 'white'},
  darkContainer: {backgroundColor: 'black'}
});

export default StationListScreen;
