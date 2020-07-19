import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import firebase from "../../config/firebaseConfig";

export default function MyAccountScreen(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sendCode}
        onPress={() => firebase.auth().signOut().then(props.navigation.navigate('Rewards Home'))}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
