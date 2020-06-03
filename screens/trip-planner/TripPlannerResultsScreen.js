import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Modal, Button, Picker } from "react-native";

const TripPlannerResultsScreen = (props) => {
  const {date, departure, destination, time, option} = props.route.params

  useEffect(() => {
    fetchTripResults()
  }, [])

  const fetchTripResults = () => {
    fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=${option}&orig=${departure.abbr}&dest=${destination.abbr}&date=${date}&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=0&time=${time}&json=y`
    )
      .then((response) => response.json())
      .then((responseJson) => console.log(responseJson));
  };
  
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );

};

export default TripPlannerResultsScreen;
