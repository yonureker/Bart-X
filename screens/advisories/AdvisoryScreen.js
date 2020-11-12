import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdvisoryScreen(props) {
  const [advisories, setAdvisories] = useState([]);
  const scheme = useColorScheme();
  const fontColor = scheme === "dark" ? styles.darkThemeFont : null;
  const backgroundColor = scheme === "dark" ? styles.darkThemeBackground : null;

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="refresh"
          size={32}
          color={scheme === "dark" ? "white" : "black"}
          style={{ marginRight: 10 }}
          onPress={fetchAdvisories}
        />
      ),
    });
  }, []);

  useEffect(() => {
    fetchAdvisories();
  }, []);

  const fetchAdvisories = () => {
    fetch(
      `https://api.bart.gov/api/bsa.aspx?cmd=bsa&key=MW9S-E7SL-26DU-VV8V&json=y`
    )
      .then((response) => response.json())
      .then((responseJson) => setAdvisories(responseJson.root.bsa))
      .catch((error) => {
        console.log(error);
      });
  };

  if (advisories == false) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (advisories[0].description["#cdata-section"] === "No delays reported.") {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          style={{ marginBottom: 80 }}
          name="bell-off-outline"
          size={150}
          color="#0099D8"
        />
        <Text
          style={{
            fontSize: 18,
            color: scheme === "dark" ? "white" : "black",
          }}
        >
          There are no delays reported at the moment.
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {advisories.map((advisory, index) => (
          <View key={index} style={[styles.advisoryItem, backgroundColor]}>
            <View style={styles.advisoryItemLogo}>
              <MaterialCommunityIcons name="alert" size={40} color="red" />
            </View>
            <View
              style={
                advisory.description["#cdata-section"] === "No delays reported"
                  ? styles.advisoryItemText
                  : [styles.advisoryItemText, { alignItems: "center" }]
              }
            >
              <View>
                <Text style={[styles.advisoryItemTextFont, fontColor]}>
                  {advisory.description["#cdata-section"]}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  advisoryItem: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#DFE5E7",
    backgroundColor: "white",
  },
  advisoryItemLogo: { justifyContent: "center", alignItems: "center", flex: 1 },
  advisoryItemText: {
    flex: 5,
    padding: 10,
    justifyContent: "center",
  },
  darkThemeFont: {
    color: "white",
  },
  darkThemeBackground: {
    backgroundColor: "black",
  },
  advisoryItemTextFont: { fontSize: 16 },
});
