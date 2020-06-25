import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { useColorScheme } from "react-native-appearance";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StationList from "../../components/stationList";
import { useIsFocused } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";

const FavoriteListScreen = props => {
  const colorScheme = useColorScheme();
  const userLocation = useSelector(state => state.userLocation);
  const searchText = useSelector(state => state.searchText);
  const displaySearchBar = useSelector(state => state.searchBar);

  const {
    stations: { station }
  } = require("../../stations");

  const [favorite, setFavorite] = useState({});
  const isFocused = useIsFocused();

  // const favorites = props.route.params.favorites;

  useEffect(() => {
    getFavoriteStatus();
  }, [isFocused]);

  const getFavoriteStatus = () => {
    station.map(async item => {
      const abbr = item.abbr;
      const status = await SecureStore.getItemAsync(abbr);

      setFavorite(prevState => ({ ...prevState, [abbr]: status }));
    });
  };

  // only calculate distance once
  useEffect(() => {
    calculateDistance();
  }, []);

  const favoriteStations = station.filter(
    elem => favorite[elem.abbr] === "true"
  );

  // calculationg distance to each station
  const calculateDistance = () => {
    return favoriteStations.map(station => {
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

  // styling for light / dark mode
  const containerStyle =
    colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;
  const searchBarStyle =
    colorScheme === "dark" ? styles.darkSearchBar : styles.lightSearchBar;

  if (!Object.values(favorite).includes("true")) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          style={{ marginBottom: 80 }}
          name="heart-multiple"
          size={150}
          color="red"
        />
        <Text
          style={{
            fontSize: 20,
            color: colorScheme === "dark" ? "white" : "black"
          }}
        >
          No favorites yet? See{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => props.navigation.navigate("Closest Stations")}
          >
            closest stations
          </Text>
          .
        </Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.listContainer}>
          <SearchBar display={displaySearchBar} />
          <StationList
            searchText={searchText}
            navigate={props.navigation.navigate}
            stations={calculateDistance()}
          />
        </View>
      </View>
    );
  }
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
    justifyContent: "space-between"
  },
  lightSearchBar: {
    backgroundColor: "#E6E8ED"
  },
  darkSearchBar: {
    backgroundColor: "#434447"
  }
});

export default FavoriteListScreen;
