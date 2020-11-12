import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, StatusBar, Alert } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TripPlannerResults from "./TripPlannerResults";

const Tab = createMaterialTopTabNavigator();

export default function TripPlannerResultsNavigator(props) {
  const { date, departure, destination, time, option } = props.route.params;
  const [data, setData] = useState({});

  useLayoutEffect(() => {
    fetchTripResults();
  }, []);

  const fetchTripResults = () => {
    fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=${option}&orig=${departure.abbr}&dest=${destination.abbr}&date=${date}&key=MW9S-E7SL-26DU-VV8V&b=1&a=3&time=${time}&l=1&json=y`
    )
      .then(response => response.json())
      .then(responseJson => setData(responseJson.root.schedule.request))
      .catch(error =>
        Alert.alert(
          "The BART server for Trip Planner is down at the moment, please try again later."
        )
      );
  };

  if (data.trip) {
    return (
      <Tab.Navigator swipeEnabled={true} style={styles.navigator}>
        {data.trip.map((trip, index) => (
          <Tab.Screen key={index} name={`Option ${index + 1}`}>
            {props => (
              <TripPlannerResults
                {...props}
                trip={trip}
                params={props.route.params}
              />
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator swipeEnabled={true} style={styles.navigator}>
        <Tab.Screen name="Loading..." component={TripPlannerResults} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
