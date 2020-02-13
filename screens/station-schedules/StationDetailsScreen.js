import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const StationDetailsScreen = props => {
  const departures = useSelector(state => state.trainDepartures);

  const selectedStation = departures.find(
    item => item.name == props.navigation.state.params.station
  );

  const trainList = () =>
    selectedStation.etd.map((route) => {
      return route.estimate.map((train, index) => {
        const color = train.color.toLowerCase();

        return (
          <View style={styles.train} key={index}>
            <View style={{ ...styles.left, backgroundColor: color }}></View>
            <View style={styles.mid}>
              <View>
                <Text style={{ fontSize: 20 }}>{route.destination}</Text>
              </View>
              <View>
                <Text style={{ color: "#A2AEB1" }}>
                  {train.length} cars | Platform {train.platform}
                </Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={{ fontSize: 20 }}>{train.minutes}</Text>
            </View>
          </View>
        );
      });
    });

  if (selectedStation === undefined) {
    return(
      <View style={{...styles.train, alignItems: 'center'}}><Text>No trains available!</Text></View>
    )
  } else {
    return <ScrollView>{trainList()}</ScrollView>;
  }
};

StationDetailsScreen.navigationOptions = ({navigation}) => ({
  title: navigation.state.params.station,
  headerLeft: () => (
    <Ionicons
      name="md-locate"
      size={25}
      color="black"
      style={{marginLeft: 20}}
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: () => (
    <Ionicons
      name="md-refresh"
      size={25}
      color="black"
      style={{marginRight: 20}}
      onPress={() => navigation.state.params.fetchTrainDepartures()}
    />
  )
});

const styles = StyleSheet.create({
  train: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    fontSize: 20,
    borderColor: "#F0F4F5",
    borderBottomWidth: 1,
    paddingLeft: 1,
    paddingRight: 10
  },
  left: {
    width: "5%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 50
  },
  mid: {
    width: "70%",
    justifyContent: "space-evenly",
    flexDirection: "column",
    paddingLeft: 10
  },
  right: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StationDetailsScreen;
