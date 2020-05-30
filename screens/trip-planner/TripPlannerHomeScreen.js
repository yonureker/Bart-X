import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const TripPlannerHomeScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Trip Planner Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TripPlannerHomeScreen;
