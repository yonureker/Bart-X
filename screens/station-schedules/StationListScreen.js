import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { useColorScheme } from "react-native-appearance";

import StationList from "../../components/stationList";

const StationListScreen = (props) => {
  const [searchText, setsearchText] = useState("");
  const colorScheme = useColorScheme();
  const userLocation = useSelector((state) => state.userLocation);
  const {
    stations: { station },
  } = require("../../stations");

  useEffect(() => {
    calculateDistance();
  });

  const calculateDistance = () => {
    return station.map((station) => {
      return {
        ...station,
        distance: convertDistance(
          getDistance(
            {
              latitude: station.gtfs_latitude,
              longitude: station.gtfs_longitude,
            },
            {
              latitude: String(userLocation.coords.latitude),
              longitude: String(userLocation.coords.longitude),
            }
          ),
          "mi"
        ),
      };
    });
  };

  const displaySearchBar = () => {
    if (props.route.params !== undefined){
      return(
        <View>
            <TextInput
              style={styles.searchBar}
              placeholder="Search Station"
              placeholderTextColor="black"
              onChangeText={(searchText) => setsearchText(searchText)}
              autoCapitalize="words"
              autoFocus={true}
            ></TextInput>
          </View>
      )
    }
  }

  const containerStyle =
    colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.listContainer}>
        {displaySearchBar()}
        <StationList
          searchText={searchText}
          style={{ flex: 1 }}
          navigate={props.navigation.navigate}
          stations={calculateDistance()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { flex: 1, width: "100%" },
  lightContainer: { backgroundColor: "white" },
  darkContainer: { backgroundColor: "black" },
  searchBar: {
    height: 40,
    backgroundColor: "#E6E8ED",
    borderWidth: 1,
    borderColor: "#E6E8ED",
    borderRadius: 10,
    paddingLeft: 10,
  }
});

export default StationListScreen;
