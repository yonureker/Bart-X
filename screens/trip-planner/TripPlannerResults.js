import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";

export default function TripPlannerResults(props) {
  const { trip } = props;
  const colorScheme = useColorScheme();

  const backgroundStyle =
    colorScheme === "dark" ? styles.darkBackground : styles.lightBackground;
  const textStyle = colorScheme === "dark" ? styles.lightText : null;

  const {
    stations: { station }
  } = require("../../bartData/stations");

  const {
    routes: { route }
  } = require("../../bartData/routes");

  if (trip) {
    return (
      <ScrollView style={backgroundStyle}>
        <View style={styles.container}>
          <View style={styles.tripBox}>
            <View
              style={{
                marginTop: 30,
                marginBottom: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: "33%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={textStyle}>Departs</Text>
                <Text style={[textStyle, { fontWeight: "bold" }]}>
                  {trip["@origTimeMin"]}
                </Text>
              </View>
              <View
                style={{
                  width: "33%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={textStyle}>Trip Time</Text>
                <Text style={[textStyle, { fontWeight: "bold" }]}>
                  {trip["@tripTime"]} mins
                </Text>
              </View>
              <View
                style={{
                  width: "33%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={textStyle}>Arrives</Text>
                <Text style={[textStyle, { fontWeight: "bold" }]}>
                  {trip["@destTimeMin"]}
                </Text>
              </View>
            </View>
            {trip.leg.map((x, index) => (
              <View key={index}>
                <View
                  style={[
                    styles.train,
                    backgroundStyle,
                    { borderBottomWidth: 0 }
                  ]}
                >
                  <View
                    style={[
                      styles.left,
                      {
                        backgroundColor: route.find(
                          elem => elem.routeID === x["@line"]
                        )["hexcolor"]
                      }
                    ]}
                  ></View>
                  <View style={styles.mid}>
                    <View>
                      <Text style={[styles.destinationText, textStyle]}>
                        Board @
                        {
                          station.find(elem => elem.abbr === x["@origin"])[
                            "name"
                          ]
                        }
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
                    style={{
                      ...styles.left,
                      backgroundColor: route.find(
                        elem => elem.routeID === x["@line"]
                      )["hexcolor"]
                    }}
                  ></View>
                  <View style={styles.mid}>
                    <View>
                      <Text style={[styles.destinationText, textStyle]}>
                        Arrive @
                        {
                          station.find(elem => elem.abbr === x["@destination"])[
                            "name"
                          ]
                        }
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

                {index !== trip.leg.length - 1 && (
                  <View style={[styles.train, backgroundStyle]}>
                    <View style={[styles.left, { borderWidth: 0 }]}>
                      <MaterialCommunityIcons
                        name="transit-connection"
                        color={colorScheme === "dark" ? "white" : "black"}
                        size={40}
                        style={{ paddingRight: 40 }}
                      />
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
          <View style={{ width: "70%" }}>
            <Text style={{ textAlign: "center", color: "gray" }}>
              Departures are subject to delays and may vary from real-time data.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tripBox: {
    marginBottom: 30,
    width: "100%",
    borderColor: "#E6E8ED"
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
    justifyContent: "center",
    alignItems: "center"
  },
  mid: {
    width: "75%",
    justifyContent: "space-evenly",
    flexDirection: "column",
    paddingLeft: 5
  },
  right: {
    width: "18%",
    justifyContent: "center",
    alignItems: "center"
  },
  destinationText: {
    fontSize: 16
  },
  platformText: {
    color: "#A2AEB1"
  },
  tripTitle: {
    fontWeight: "bold",
    fontSize: 18
  },
  minutesText: {
    fontSize: 13
  },
  darkBackground: {
    backgroundColor: "black"
  },
  lightBackground: {
    backgroundColor: "white"
  },
  lightText: {
    color: "white"
  }
});
