import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { useColorScheme } from "react-native-appearance";

import StationList from "../../components/stationList";
import SearchBar from "../../components/SearchBar";

const ClosestStationListScreen = props => {
  const colorScheme = useColorScheme();
  const userLocation = useSelector(state => state.userLocation);
  const searchText = useSelector(state => state.searchText);
  const displaySearchBar = useSelector(state => state.searchBar);
  const {
    stations: { station }
  } = require("../../bartData/stations");
  const [stationData, setStationData] = useState([]);

  //only calculate distance once
  useLayoutEffect(() => {
    calculateDistance();
  }, []);

  // calculationg distance to each station
  const calculateDistance = () => {
    setStationData(
      station.map(station => {
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
      })
    );
  };

  // styling for light / dark mode
  const containerStyle =
    colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.listContainer}>
        <SearchBar display={displaySearchBar} />
        <StationList
          searchText={searchText}
          navigate={props.navigation.navigate}
          stations={stationData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  lightContainer: {
    backgroundColor: "white"
  },
  darkContainer: {
    backgroundColor: "black"
  },
  searchBar: {
    flexDirection: "row",
    height: 40,
    borderWidth: 1,
    width: "95%",
    borderColor: "#E6E8ED",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 5
  },
  lightSearchBar: {
    backgroundColor: "#E6E8ED"
  },
  darkSearchBar: {
    backgroundColor: "#434447"
  },
  serviceAdvisory: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 30
  }
});

export default ClosestStationListScreen;
