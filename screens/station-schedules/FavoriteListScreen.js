import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { useColorScheme } from "react-native-appearance";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StationList from "../../components/stationList";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const FavoriteListScreen = (props) => {
  const [searchText, setsearchText] = useState("");
  const colorScheme = useColorScheme();
  const [searchBar, setSearchBar] = useState(
    props.route.params.displaySearchBar
  );
  const userLocation = useSelector((state) => state.userLocation);
  const {
    stations: { station },
  } = require("../../stations");

  const [favorite, setFavorite] = useState({});
  const isFocused = useIsFocused();

  
  // const favorites = props.route.params.favorites;

  useEffect(() => {
      getFavoriteStatus()
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

  // watch for the click to the search button on the header
  useEffect(() => {
    setSearchBar(props.route.params.displaySearchBar);
  }, [props.route.params]);

  const favoriteStations = station.filter(elem => favorite[elem.abbr] === "true");

  // calculationg distance to each station
  const calculateDistance = () => {
    return favoriteStations.map((station) => {
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
        <View style={[styles.searchBar, searchBarStyle]}>
          <View>
            <TextInput
              placeholder="Search Station"
              placeholderTextColor={colorScheme === "dark" ? 'white' : 'black'}
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

    if (!Object.values(favorite).includes("true")){
      return (
        <View style={styles.container}>
          <MaterialCommunityIcons style={{marginBottom: 80}} name="heart-multiple" size={150} color="red" />
          <Text style={{fontSize: 20, color: colorScheme === "dark" ? 'white' : 'black'}}>No favorites yet? See <Text style={{textDecorationLine: 'underline'}} onPress={() => props.navigation.navigate('Closest Stations')}>closest stations</Text>.</Text>
        </View>
      )
    } else {
      return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.listContainer}>
          {searchBarComponent()}
          <StationList
            searchText={searchText}
            navigate={props.navigation.navigate}
            stations={calculateDistance()}
          />
      </View>
    </View>
      )
    }
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
  },
  lightSearchBar: {
    backgroundColor: "#E6E8ED",
  },
  darkSearchBar: {
    backgroundColor: "#434447",
  },
});

export default FavoriteListScreen;
