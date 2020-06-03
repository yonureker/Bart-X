import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Button, Picker } from "react-native";

const TripPlannerResultsScreen = (props) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );

  const fetchTripResults = () => {
    fetch(
      "http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=ASHB&dest=CIVC&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=0&time=3:33pm&json=y"
    )
      .then((response) => response.json())
      .then((responseJson) => setResults);
  };
};

export default TripPlannerResultsScreen;
