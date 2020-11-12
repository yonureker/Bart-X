import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import "@firebase/auth";

export default function RewardsHome(props) {
  const colorScheme = useColorScheme();

  const textStyle = colorScheme === "dark" ? styles.darkThemeText : null;

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 8,
        }}
      >
        <Image
          style={{ height: "100%", width: "100%", borderRadius: 20 }}
          source={require("../../assets/money.jpg")}
        />
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={[styles.title, textStyle]}>
            Check live departures, get rewards
          </Text>
        </View>
        <View>
          <Text style={textStyle}>
            Become a BartX Rewards member - it's easy and free to join. You'll
            get points for checking live departures everyday, which you can use
            to get Bart credits directly into your Clipper Card.
          </Text>
        </View>
        <View>
          <Text style={textStyle}>
            BartX rewards is being built right now. Be first to know when we
            launch.
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            backgroundColor: "#0A99CB",
            width: "100%",
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Rewards Phone Screen")}
          >
            <Text style={{ color: "white" }}>Join The List</Text>
          </TouchableOpacity>
        </View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFDD19",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textInput: {
    textAlign: "center",
  },
  sendVerification: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 10,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
  },
  title: { fontWeight: "bold", fontSize: 20 },
  darkThemeText: { color: "white" },
});
