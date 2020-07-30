import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import firebase from "../../config/firebaseConfig";
import "@firebase/auth";
import "firebase/firestore";

let db = firebase.firestore();

export default function MyAccountScreen(props) {
  const [points, setPoints] = useState(null);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    getAccountBalance();
  }, []);

  const getAccountBalance = async () => {
    const userRef = await db
      .collection("users")
      .doc(user.uid)
      .get();
    const userPoints = await userRef.data().pointsBalance;
    setPoints(userPoints);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>You have {points} points</Text>
      </View>
      <TouchableOpacity
        style={styles.sendCode}
        onPress={() =>
          firebase
            .auth()
            .signOut()
            .then(props.navigation.navigate("Rewards Home"))
        }
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