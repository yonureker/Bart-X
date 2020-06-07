import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useColorScheme } from "react-native-appearance";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const TripPlannerResultsScreen = (props) => {
  const { date, departure, destination, time, option } = props.route.params;

  const [data, setData] = useState({});
  const colorScheme = useColorScheme();

  const {
    stations: { station },
  } = require("../../stations");

  const {
    routes: { route },
  } = require("../../routes");

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

  const backgroundStyle =
    colorScheme === "dark" ? styles.darkBackground : styles.lightBackground;
  const textStyle = colorScheme === "dark" ? styles.lightText : null;

  if (data.trip) {
    return (
      <ScrollView>
        <View style={styles.container}>
          {data.trip.map((elem, index) => (
            <View style={styles.tripBox}>
              <View style={{marginLeft: 25}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>Option {index + 1}</Text></View>
              {elem.leg.map((x, index) => (
                <View>
                  <View style={[styles.train, backgroundStyle, {borderBottomWidth: 0}]}>
                    <View
                      style={[styles.left, {backgroundColor: route.find(elem => elem.routeID === x["@line"])["hexcolor"]}]}
                    ></View>
                    <View style={styles.mid}>
                      <View>
                        <Text style={[styles.destinationText, textStyle]}>
                          Board @{station.find(elem => elem.abbr === x["@origin"])["name"]}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.platformText, textStyle]}>
                          {x["@trainHeadStation"]} Train
                        </Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <View>
                        <Text style={[styles.minutesText, textStyle]}>
                          {x["@origTimeMin"]}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.train, backgroundStyle]}>
                    <View
                      style={{ ...styles.left, backgroundColor: route.find(elem => elem.routeID === x["@line"])["hexcolor"] }}
                    ></View>
                    <View style={styles.mid}>
                      <View>
                        <Text style={[styles.destinationText, textStyle]}>
                          Arrive @{station.find(elem => elem.abbr === x["@destination"])["name"]}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.platformText, textStyle]}>
                          {x["@trainHeadStation"]} Train
                        </Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <View>
                        <Text style={[styles.minutesText, textStyle]}>
                          {x["@destTimeMin"]}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {index !== elem.leg.length - 1 && (
                    <View style={[styles.train, backgroundStyle]}>
                      <View
                        style={[styles.left, {borderWidth: 0}]}
                      >
                        <MaterialCommunityIcons name="transit-connection" color="black" size={40} style={{paddingRight: 40}} />
                      </View>
                      <View style={styles.mid}>
                        <View>
                          <Text style={[styles.destinationText, textStyle]}>
                            Transfer
                          </Text>
                        </View>
                      </View>
                      <View style={styles.right}>
                        <View>
                          <Text style={[styles.minutesText, textStyle]}></Text>
                        </View>
                      </View>
                    </View>
                  )}
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
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#E6E8ED",
    borderWidth: 1,
    borderColor: "#E6E8ED",
    borderRadius: 1,
  },
  train: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#F0F4F5",
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5

  },
  left: {
    width: "3%",
    marginTop: 2,
    marginBottom: 2,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mid: {
    width: "75%",
    justifyContent: "space-evenly",
    flexDirection: "column",
    paddingLeft: 5,
  },
  right: {
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  destinationText: {
    fontSize: 16,
  },
  platformText: {
    color: "#A2AEB1",
  },
  tripTitle:{
    fontWeight: 'bold',
    fontSize: 18
  },
  minutesText: {
    fontSize: 13,
  },
  darkBackground: {
    backgroundColor: "black",
  },
  lightBackground: {
    backgroundColor: "white",
  },
  lightText: {
    color: "white",
  },
});

export default TripPlannerResultsScreen;
