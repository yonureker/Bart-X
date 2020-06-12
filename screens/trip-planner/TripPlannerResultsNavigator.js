import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TripPlannerResults from "../../components/TripPlannerResults";

const Tab = createMaterialTopTabNavigator();

export default function TripPlannerResultsNavigator(props) {
  const { date, departure, destination, time, option } = props.route.params;
  const [data, setData] = useState({});

  useLayoutEffect(() => {
    fetchTripResults();
  }, []);

  const fetchTripResults = () => {
    fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=${option}&orig=${departure.abbr}&dest=${destination.abbr}&date=${date}&key=MW9S-E7SL-26DU-VV8V&b=0&a=4&time=${time}&l=1&json=y`
    )
      .then(response => response.json())
      .then(responseJson => setData(responseJson.root.schedule.request));
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
