import React, { useRef, useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as SecureStore from "expo-secure-store";
import firebaseConfig from "../../config/firebaseConfig";
import * as firebase from "firebase";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import "@firebase/auth";

export default BartXRewards = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const recaptchaVerifier = useRef(null);

  const user = firebase.auth().currentUser;

  console.log(user);

  useEffect(() => {
    checkLogInStatus();
  }, [loggedIn]);

  const logInUser = () => {
    SecureStore.setItemAsync("loggedIn", "true").then(setLoggedIn(true))
  }

  const logOutUser = () => {
    SecureStore.setItemAsync("loggedIn", "false").then(setLoggedIn(false))
  }

  const checkLogInStatus = async () => {
    const loggedIn = await SecureStore.getItemAsync("loggedIn");

    (loggedIn === null || loggedIn === 'false') ? setLoggedIn(false) : setLoggedIn(true);
  };

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(logInUser)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  if (loggedIn) {
    return (
      <View style={styles.container}>
        <View>
        <AnimatedCircularProgress
  size={120}
  width={15}
  fill={50}
  tintColor="#00e0ff"
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" >{
    (fill) => (
      <Text>
        500
      </Text>
    )
  }
  </AnimatedCircularProgress>
        </View>
        <TouchableOpacity style={styles.sendCode} onPress={logOutUser}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <View style={{flexDirection: 'row', alignItems: "center",
    justifyContent: "center"}}>
          <View style={{width: '20%', alignItems: "center",
    justifyContent: "center"}}>
<Text>+1</Text>
          </View>
          <View >
          <TextInput
          placeholder="Enter Phone Number"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          style={styles.textInput}
        />
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerification}
        >
          <Text style={styles.buttonText}>Verify Phone Number</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Enter Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
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