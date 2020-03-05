import React from "react";
import { View, Text, StyleSheet, Linking, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AboutScreen = props => {
  const handlePress = () => {
    Linking.openURL("https://www.linkedin.com/in/onureker/");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Version 1.3.7</Text>
      </View>
      <View style={styles.content}>
        <View>
          <Text>Built with React Native</Text>
        </View>
        <View>
          <MaterialCommunityIcons name="react" size={25} color="#61DBFB" />
        </View>
      </View>
      <View style={styles.author}>
        <Text>
          Created by{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => handlePress()}
          >
            Onur Eker
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flexDirection: "row",
    alignItems: "center"
  },
  author: {
    marginTop: 50
  }
});

export default AboutScreen;
