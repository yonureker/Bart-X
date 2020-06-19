import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native-appearance";
import { TouchableOpacity } from "react-native-gesture-handler";

const MoreScreen = props => {
  const scheme = useColorScheme();
  const fontColor = scheme === "dark" ? styles.darkFont : null;

  const items = [
    {
      iconName: "star-box",
      title: "Rate Bart X",
      link: () => {
        Linking.openURL(
          "https://apps.apple.com/us/app/bart-x/id1480753570?action=write-review"
        );
      }
    },
    // {
    //   iconName: "email-box",
    //   title: "Send Feedback",
    //   link: () => props.navigation.navigate("Feedback")
    // },
    {
      iconName: "map-legend",
      title: "System Maps",
      link: () => props.navigation.navigate("System Map")
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.author}>
        <View><Text style={styles.font}>Developer: Onur Eker</Text></View>
        <View><MaterialCommunityIcons
                  name="linkedin-box"
                  size={30}
                  color="gray"
                /></View>
        <View><MaterialCommunityIcons
                  name="github-box"
                  size={30}
                  color="gray"
                /></View>
      </View>
      <View style={styles.box}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.link}
            style={{borderBottomWidth:1, borderBottomColor: '#F0F4F5'}}
            // style={{alignItems: 'center', justifyContent: 'center'}}
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
    width: '100%',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  author: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    borderWidth: 1,
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderColor: "#CFCFD0"
  },
  darkFont: {
    color: "white"
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
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  itemLeft: {
    width: "20%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemMid: {
    width: "65%",
  },
  itemRight: {
    width: "20%",
  }
});

export default MoreScreen;
