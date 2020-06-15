import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdvisoryScreen() {
  const [advisories, setAdvisories] = useState([]);

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

  return (
    <View style={styles.container}>
      {advisories.map((advisory, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            width: "95%",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#DFE5E7',
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialCommunityIcons name="alert" size={40} color="red" />
          </View>
          <View
            style={{
              flex: 1,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 16 }}>
                {advisory.description["#cdata-section"]}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
});
