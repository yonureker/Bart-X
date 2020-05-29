import React, { useEffect, useState, useLayoutEffect, u } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { useColorScheme } from "react-native-appearance";
import { TouchableOpacity } from "react-native-gesture-handler";

import StationList from "../../components/stationList";


const ClosestStationListScreen = (props) => {
  const [searchText, setsearchText] = useState("");
  const colorScheme = useColorScheme();
  const [searchBar, setSearchBar] = useState(
    props.route.params.displaySearchBar
  );
  const userLocation = useSelector((state) => state.userLocation);
  const {
    stations: { station },
  } = require("../../stations");
  const [stationData, setStationData] = useState([]);

  //only calculate distance once
  useLayoutEffect(() => {
    calculateDistance();
  }, []);

  // watch for the click to the search button on the header
  useEffect(() => {
    setSearchBar(props.route.params.displaySearchBar);
  }, [props.route.params]);

  // calculationg distance to each station
  const calculateDistance = () => {
    setStationData(
      station.map((station) => {
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
      })
    );
  };

  // function for displaying the search bar
  const searchBarComponent = () => {
    if (searchBar) {
      return (
        <View style={[styles.searchBar, searchBarStyle]}>
          <View>
            <TextInput
              placeholder="Search Station"
              placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
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

  // styling for light / dark mode
  const containerStyle =
    colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;
  const searchBarStyle =
    colorScheme === "dark" ? styles.darkSearchBar : styles.lightSearchBar;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.listContainer}>
        {searchBarComponent()}
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
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  lightContainer: {
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: "black",
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
    backgroundColor: "#E6E8ED",
  },
  darkSearchBar: {
    backgroundColor: "#434447",
  },
  serviceAdvisory: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 30
  },
});

export default ClosestStationListScreen;
