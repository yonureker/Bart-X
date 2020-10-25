import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../../config/firebaseConfig";
import "@firebase/auth";
import "firebase/firestore";

// this is needed because of an issue with Firebase JS SDK with React Native
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// initialize database
let db = firebase.firestore();

export default function VerifyCodeScreen(props) {
  const [code, setCode] = useState("");

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      props.route.params.verificationId,
      code
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(result => {
        if (result.user) {
          props.navigation.navigate("My Account");
        }

        if (result.additionalUserInfo.isNewUser) {
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              pointsBalance: 10,
              clippercardNumber: null,
              phoneNumber: firebase.auth().currentUser.phoneNumber
            });
        }
      })
      .catch(error => Alert.alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
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

            elevation: 6
          }}
        >
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 20 }}
            source={require("../../assets/verify.jpg")}
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "space-evenly",
            marginTop: 10
          }}
        >
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Verify your phone number
            </Text>
          </View>
          <View>
            <Text>Enter the 6-digit code you received via SMS.</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <MaterialCommunityIcons
                name="cellphone-message"
                size={20}
                color="black"
                style={{ paddingLeft: 10, paddingRight: 10 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Enter Confirmation Code"
                onChangeText={code => setCode(code)}
                keyboardType="phone-pad"
                autoCompleteType="tel"
                returnKeyType="done"
                style={{ borderBottomWidth: 1, borderBottomColor: "#DDDDDD" }}
              ></TextInput>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#0A99CB",
              width: "100%",
              height: 40,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={confirmCode}>
              <Text style={{ color: "white" }}>Confirm Code</Text>
            </TouchableOpacity>
          </View>
          <View></View>
          <View></View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
