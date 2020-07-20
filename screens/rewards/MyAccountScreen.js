import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import firebase from "../../config/firebaseConfig";
import "@firebase/auth";
import "firebase/firestore";

let db = firebase.firestore();

export default function MyAccountScreen(props) {
  const [points, setPoints] = useState(0);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    getAccountBalance()
  }, [])

  const getAccountBalance = async () => {
    const userRef = await db.collection('users').doc(user.uid).get()
    const userPoints = await userRef.data().pointsBalance
    setPoints(userPoints)
  }

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

            elevation: 6,
          }}
        ><Text>You have {points} points</Text></View>
      <TouchableOpacity
        style={styles.sendCode}
        onPress={() => firebase.auth().signOut().then(props.navigation.navigate('Rewards Home'))}
      >
        <Text>Log Out</Text>
        <Text>{user.uid}</Text>
        
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
