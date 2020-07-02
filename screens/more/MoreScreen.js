import React from "react";
import { View, Text, StyleSheet, Linking, Share, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native-appearance";
import { TouchableOpacity } from "react-native-gesture-handler";

const MoreScreen = props => {
  const scheme = useColorScheme();
  const fontColor = scheme === "dark" ? styles.darkThemeFont : null;
  const backgroundColor = scheme === "dark" ? styles.darkThemeBackground : null;

  const boxes = [
    {
      title: "DEVELOPER",
      items: [
        {
          iconName: "dev-to",
          title: "Onur Eker",
          link: () => {
            Linking.openURL("https://www.linkedin.com/in/onureker/");
          }
        }
      ]
    },
    {
      title: "SUPPORT THE APP",
      items: [
        {
          iconName: "star-box",
          title: "Rate Bart X",
          link: () => {
            if (Platform.OS === "ios") {
              Linking.openURL(
                "https://apps.apple.com/us/app/bart-x/id1480753570?action=write-review"
              );
            } else {
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.onureker.bartlivemobile&hl=en_US"
              );
            }
          }
        },
        {
          iconName: "share",
          title: "Share with Friends",
          link: () => {
            Share.share({
              url: "https://apps.apple.com/us/app/bartlivemobile/id1480753570"
            });
          }
        }
      ]
    },
    {
      title: "EXTRAS",
      items: [
        {
          iconName: "map-legend",
          title: "BART System Maps",
          link: () => props.navigation.navigate("System Map")
        },
        {
          iconName: "clock",
          title: "BART Schedules in PDF",
          link: () => props.navigation.navigate("Schedules")
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {boxes.map((box, index) => (
        <View key={index} style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={fontColor}>{box.title}</Text>
          </View>
          {box.items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.link}
              style={{ borderBottomWidth: 1, borderBottomColor: "#F0F4F5" }}
            >
              <View style={[styles.item, backgroundColor]} key={index}>
                <View style={styles.itemLeft}>
                  <MaterialCommunityIcons
                    name={item.iconName}
                    size={35}
                    color={scheme === "dark" ? "white" : "black"}
                  />
                </View>
                <View style={styles.itemMid}>
                  <Text style={[styles.font, fontColor]}>{item.title}</Text>
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
      ))}
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={{ color: "gray" }}>Version 1.6.2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  box: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%"
  },
  boxTitle: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20
  },
  darkThemeFont: {
    color: "white"
  },
  darkThemeBackground: {
    backgroundColor: "black"
  },
  font: {
    fontSize: 18
  },
  item: {
    width: "100%",
    height: 45,
    borderColor: "#CFCFD0",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white"
  },
  itemLeft: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  itemMid: {
    width: "70%"
  },
  itemRight: {
    width: "20%"
  }
});

export default MoreScreen;
