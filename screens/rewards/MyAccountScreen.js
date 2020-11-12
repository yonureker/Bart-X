import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, useColorScheme } from "react-native";
import firebase from "../../config/firebaseConfig";
import "@firebase/auth";
// import "firebase/firestore";

// let db = firebase.firestore();

export default function MyAccountScreen(props) {
  const [points, setPoints] = useState(null);
  const user = firebase.auth().currentUser;
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   getAccountBalance();
  // }, []);

  // const getAccountBalance = async () => {
  //   const userRef = await db
  //     .collection("users")
  //     .doc(user.uid)
  //     .get();
  //   const userPoints = await userRef.data().pointsBalance;
  //   setPoints(userPoints);
  // };

  const textStyle = colorScheme === 'dark' ? styles.darkThemeText : null;

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
            height: 3
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 8
        }}
      >
        <Image
          style={{ height: "100%", width: "100%", borderRadius: 20 }}
          source={require("../../assets/thank-you.jpg")}
        />
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "flex-start",
          marginTop: 20,
        }}
      >
        <View >
          <Text style={[styles.title, textStyle]}>You did it!</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={textStyle}>
            Thank you for signing up to BartX Rewards! You will receive a text
            when we launch the program.
          </Text>
        </View>
        {/* <TouchableOpacity
        style={styles.sendCode}
        onPress={() =>
          firebase
            .auth()
            .signOut()
            .then(props.navigation.navigate("Rewards Home"))
        }
      >
        <Text>Log Out</Text>
      </TouchableOpacity> */}
        {/* <View></View>
        <View></View>
        <View></View>
        <View></View> */}
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
    padding: 20
  },
  textInput: {
    textAlign: "center"
  },
  sendVerification: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 10
  },
  sendCode: {
    padding: 10,
    backgroundColor: "#9b59b6",
    borderRadius: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff"
  },
  darkThemeText: {
    color: "#ffffff"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
