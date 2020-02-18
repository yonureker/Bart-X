import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";

import StationList from "../../components/stationList";

const StationListScreen = props => {
  const userLocation = useSelector(state => state.userLocation)
  const { stations : { station } } = require('../../stations');

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

    return (
      <View style={styles.container}>
        <StatusBar />
        <SafeAreaView style={{ width: "100%" }}>
          <StationList
            navigate={props.navigation.navigate}
            stations={calculateDistance()}
            fetchTrainDepartures={() => fetchTrainDepartures}
          />
        </SafeAreaView>
      </View>
    )
};

StationListScreen.navigationOptions = {
  title: "Closest Stations"
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default StationListScreen;
