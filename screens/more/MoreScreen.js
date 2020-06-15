import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native-appearance";
import { TouchableOpacity } from "react-native-gesture-handler";

const MoreScreen = (props) => {
  const scheme = useColorScheme();
  const fontColor = scheme === "dark" ? styles.darkFont : null;

  const handlePress = () => {
    Linking.openURL("https://www.linkedin.com/in/onureker/");
  };

  const items = [
    {
      iconName: "star-box",
      iconLibrary: "MaterialCommunityIcons",
      title: "Rate Bart X",
      link: () => {
        Linking.openURL(
          "https://apps.apple.com/us/app/bart-x/id1480753570?action=write-review"
        );
      },
    },
    {
      iconName: "email-box",
      iconLibrary: "MaterialCommunityIcons",
      title: "Send Feedback",
      link: () => {
        Linking.openURL("mailto:yonureker@gmail.com");
      },
    },
    {
      iconName: "map-legend",
      iconLibrary: "MaterialCommunityIcons",
      title: "System Maps",
      link: () => props.navigation.navigate("System Map"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View>
        <Text style={[styles.font, fontColor]}>Version 1.5.2</Text>
      </View> */}
      {/* <View style={styles.content}>
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
      </View> */}
      <View style={styles.container}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.link}
            style={{ alignItems: "center" }}
          >
            <View style={styles.item} key={index}>
              <View style={styles.itemLeft}>
                <MaterialCommunityIcons
                  name={item.iconName}
                  size={35}
                  color="black"
                />
              </View>
              <View style={styles.itemMid}>
                <Text style={styles.font}>{item.title}</Text>
              </View>
              <View style={styles.itemRight}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={35}
                  color="gray"
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    marginTop: 50,
  },
  darkFont: {
    color: "white",
  },
  font: {
    fontSize: 18,
  },
  item: {
    width: "85%",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#CFCFD0",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  itemLeft: {
    width: "12%",
  },
  itemMid: {
    width: "75%",
  },
  itemRight: {
    width: "25%",
  },
});

export default MoreScreen;
