import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useColorScheme } from "react-native-appearance";

const AboutScreen = props => {
  const scheme = useColorScheme();

  const handlePress = () => {
    Linking.openURL("https://www.linkedin.com/in/onureker/");
  };

  const fontColor = scheme === "dark" ? styles.darkFont : null;

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.font, fontColor]}>Version 1.5.1</Text>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={[styles.font, fontColor]}>Built with React Native</Text>
        </View>
        <View>
          <MaterialCommunityIcons name="react" size={25} color="#61DBFB" />
        </View>
      </View>
      <View style={styles.author}>
        <Text style={[styles.font, fontColor]}>
          Created by{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={handlePress}
          >
            Onur Eker
          </Text>
          .
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
    alignItems: "center",
    justifyContent: "center"
  },
  author: {
    marginTop: 50
  },
  darkFont: {
    color: "white"
  },
  font: {
    fontSize: 18
  }
});

export default AboutScreen;
