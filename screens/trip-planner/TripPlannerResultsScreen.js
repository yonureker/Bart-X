import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useColorScheme } from "react-native-appearance";

const TripPlannerResultsScreen = (props) => {
  const { date, departure, destination, time, option } = props.route.params;

  const [data, setData] = useState({});
  const colorScheme = useColorScheme();

  useEffect(() => {
    fetchTripResults();
  }, []);

  const fetchTripResults = () => {
    fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=${option}&orig=${departure.abbr}&dest=${destination.abbr}&date=${date}&key=MW9S-E7SL-26DU-VV8V&b=2&a=4&time=${time}&l=1&json=y`
    )
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.root.schedule.request));
  };

  const backgroundStyle =
    colorScheme === "dark" ? styles.darkBackground : styles.lightBackground;
  const textStyle = colorScheme === "dark" ? styles.lightText : null;

  if (data.trip) {
    return (
      <ScrollView>
      <View style={styles.container}>
        {/* departure here */}
        
        {/* transfers here */}
        {/* destination here */}
        {data.trip.map((elem, index) => (
          <View style={styles.tripBox}>
            {elem.leg.map((leg, index) => (
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View><Text>{leg["@origin"]}</Text></View>
              <View><Text>{leg["@origTimeMin"]}</Text></View>
            </View>
            ))}
          </View>
        ))}
      </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Not found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tripBox: {
    padding: 15,
    marginBottom: 20,
    width: "95%",
    backgroundColor: "#E6E8ED",
    borderWidth: 1,
    borderColor: "#E6E8ED",
    borderRadius: 15,
  },
});

export default TripPlannerResultsScreen;
