import React from "react";
import { Text, SafeAreaView, Image, StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const WeekAndSatScreen = props => {
  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/week-and-sat-system-map.png")}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default WeekAndSatScreen;