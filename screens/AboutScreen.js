import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AboutScreen = props => {
  const handlePress = () => {
    Linking.openURL("http://onureker.com");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Version 1.3.2</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
  author: {
    marginTop: 50
  }
});

export default AboutScreen;
