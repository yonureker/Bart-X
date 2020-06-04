import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const TripPlannerResultsScreen = (props) => {
  const { date, departure, destination, time, option } = props.route.params;

  const [data, setData] = useState({});

  useEffect(() => {
    fetchTripResults();
  }, []);

  const fetchTripResults = () => {
    fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=${option}&orig=${departure.abbr}&dest=${destination.abbr}&date=${date}&key=MW9S-E7SL-26DU-VV8V&b=0&a=4&time=${time}&l=1&json=y`
    )
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.root.schedule.request));
  };

  if (data.trip) {
    return (
      <View style={styles.container}>
        {data.trip.map((elem, index) => (
          <View style={styles.elemBox}>
            <Text>Total Trip Time: {elem["@tripTime"]} min</Text>
          </View>
        ))}
      </View>
    );
  }

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tripBox: {
    width: "95%",
    backgroundColor: "blue",
    height: "20%",
    borderWidth: 1,
    borderColor: "#E6E8ED",
    borderRadius: 15,
  },
});

export default TripPlannerResultsScreen;
