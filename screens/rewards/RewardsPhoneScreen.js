import React, { useRef, useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import "@firebase/auth";

import firebaseConfig from "../../config/firebaseConfig";

export default function RewardsPhoneScreen(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  // Function to be called when requesting for a verification code
  const sendVerification = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();

    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );

    setVerificationId(verificationId);

    props.navigation.navigate("Verify Code", {
      verificationId: verificationId,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        title="Are you human?"
      />
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
            source={require("../../assets/phone.png")}
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              What is your phone number?
            </Text>
          </View>
          <View>
            <Text>
              Instead of email, password and unnecessary security questions; you
              can login to your account with only your phone number! Message and
              data rates may apply.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                style={{ height: 22, width: 34 }}
                source={require("../../assets/us-flag.png")}
              />
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Text>+1</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Enter Your Phone Number"
                onChangeText={(text) => setPhoneNumber(text)}
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
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={sendVerification}>
              <Text style={{ color: "white" }}>Confirm</Text>
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
