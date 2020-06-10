import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const searchBarVisible = useSelector(state => state.searchBar);
  const searchBarStyle =
    colorScheme === "dark" ? styles.darkSearchBar : styles.lightSearchBar;

  if (searchBarVisible) {
    return (
      <View style={[styles.searchBar, searchBarStyle]}>
        <View>
          <TextInput
            placeholder="Search Station"
            placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
            // capitalize the first char in case autocapitalize doesn't work
            onChangeText={searchText =>
              dispatch({
                type: "SET_SEARCH_TEXT",
                payload: searchText
              })
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
            paddingRight: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: "RESET_SEARCH_TEXT",
                payload: ""
              });

              dispatch({
                type: "HIDE_SEARCH_BAR"
              });
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 30
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
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
  }
});

export default SearchBar;
