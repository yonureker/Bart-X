import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { useColorScheme } from "react-native-appearance";

import StationList from "../../components/stationList";
import { TouchableOpacity } from "react-native-gesture-handler";

const StationListScreen = (props) => {
  const [searchText, setsearchText] = useState("");
  const colorScheme = useColorScheme();
  const [searchBar, setSearchBar] = useState(
    props.route.params.displaySearchBar
  );
  const userLocation = useSelector((state) => state.userLocation);
  const {
    stations: { station },
  } = require("../../stations");

  // only calculate distance once
  useEffect(() => {
    calculateDistance();
  }, []);

  // watch for the click to the search button on the header
  useEffect(() => {
    setSearchBar(props.route.params.displaySearchBar);
  }, [props.route.params]);

  // calculationg distance to each station
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

  // function for displaying the search bar
  const searchBarComponent = () => {
    if (searchBar) {
      return (
        <View style={styles.searchBar}>
          <View>
            <TextInput
              placeholder="Search Station"
              placeholderTextColor="black"
              // capitalize the first char in case autocapitalize doesn't work
              onChangeText={(searchText) =>
                setsearchText(
                  searchText.charAt(0).toUpperCase() + searchText.slice(1)
                )
              }
              autoCapitalize="words"
              autoFocus={true}
              maxLength={40}
            ></TextInput>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSearchBar(false);
                setsearchText("");
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 30,
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const containerStyle =
    colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.listContainer}>
        {searchBarComponent()}
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
    flexDirection: "row",
    height: 40,
    backgroundColor: "#E6E8ED",
    borderWidth: 1,
    borderColor: "#E6E8ED",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default StationListScreen;
