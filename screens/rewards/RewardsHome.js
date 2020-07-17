import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as SecureStore from "expo-secure-store";
import * as firebase from "firebase/app";
import "@firebase/auth";

export default function RewardsHome(props) {
  const [currentUser, setCurrentUser] = useState(null);
  
  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser(user)
        console.log(user)
      }
    })
  }, [currentUser]);

  // const checkCurrentUser = async () => {
  //   const currentUser = await firebase.auth().currentUser;
  //   console.log(currentUser);
  //   setUser(currentUser);
  // };

  // const logInUser = () => {
  //   SecureStore.setItemAsync("loggedIn", "true").then(setLoggedIn(true));
  // };

  // const logOutUser = () => {
  //   SecureStore.setItemAsync("loggedIn", "false").then(setLoggedIn(false));
  // };

  // const checkLogInStatus = async () => {
  //   const loggedIn = await SecureStore.getItemAsync("loggedIn");

  //   loggedIn === null || loggedIn === "false"
  //     ? setLoggedIn(false)
  //     : setLoggedIn(true);
  // };

  // const sendVerification = () => {
  //   const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //   phoneProvider
  //     .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
  //     .then(setVerificationId);
  // };

  // const confirmCode = () => {
  //   const credential = firebase.auth.PhoneAuthProvider.credential(
  //     verificationId,
  //     code
  //   );
  //   firebase
  //     .auth()
  //     .signInWithCredential(credential)
  //     .then(logInUser)
  //     // .then((result) => {
  //     //   console.log(result);
  //     // })
  //     .catch((error) => console.log(error));
  // };

  if (currentUser) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.sendCode} onPress={() => firebase.auth().signOut().then(setCurrentUser(null))}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
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
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Check live departures, get rewards
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text>
            Become a BartX Rewards member - it's easy and free to join. You'll
            get points for checking live departures everyday, which you can use
            to get Bart credits directly into your Clipper Card.
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
            <Text style={{ color: "white" }}>Join for free</Text>
          </TouchableOpacity>
        </View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <View style={{ borderWidth: 1 }}>
  //       <FirebaseRecaptchaVerifierModal
  //         ref={recaptchaVerifier}
  //         firebaseConfig={firebaseConfig}
  //       />
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           borderWidth: 5,
  //         }}
  //       >
  //         <View
  //           style={{
  //             width: "100%",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <Text>+1</Text>
  //         </View>
  //         <View>
  //           <TextInput
  //             placeholder="Enter Phone Number"
  //             onChangeText={setPhoneNumber}
  //             keyboardType="phone-pad"
  //             autoCompleteType="tel"
  //             style={styles.textInput}
  //           />
  //         </View>
  //       </View>

  //       <TouchableOpacity
  //         style={styles.sendVerification}
  //         onPress={sendVerification}
  //       >
  //         <Text style={styles.buttonText}>Verify Phone Number</Text>
  //       </TouchableOpacity>
  //       <TextInput
  //         placeholder="Enter Confirmation Code"
  //         onChangeText={setCode}
  //         keyboardType="number-pad"
  //         style={styles.textInput}
  //       />
  //       <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
  //         <Text style={styles.buttonText}>Confirm</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
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
});
