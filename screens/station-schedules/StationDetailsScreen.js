import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, RefreshControl} from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

// for pulldown refresh
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const StationDetailsScreen = props => {
  const [refreshing, setRefreshing] = useState(false)
  const [pullDownView, setPullDownView] = useState(true)
  const departures = useSelector(state => state.trainDepartures);

  // for pulldown refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // for pulldown refresh
    wait(2000).then(() => {setRefreshing(false); setPullDownView(false)});
  }, [refreshing]);

  const selectedStation = departures.find(
    item => item.name == props.navigation.state.params.station
  );

  const sortedTrainList = () => {
    let mappedStation = [];

    selectedStation.etd.map(route => {
      route.estimate.map(train => {
        const newMap = new Object();
        newMap["destination"] = route.destination;
        newMap["platform"] = train.platform;
        newMap["length"] = train.length;
        newMap["color"] = train.hexcolor;

        if (train.minutes === "Leaving") {
          newMap["minutes"] = 0;
        } else {
          newMap["minutes"] = Number(train.minutes);
        }

        mappedStation.push(newMap);
      });
    });

    mappedStation.sort((a, b) => (a.minutes > b.minutes ? 1 : -1));

    return mappedStation.map((train, index) => {
      return (
        <View style={styles.train} key={index}>
          <View style={{ ...styles.left, backgroundColor: train.color}}></View>
          <View style={styles.mid}>
            <View>
              <Text style={{ fontSize: 20 }}>{train.destination}</Text>
            </View>
            <View>
              <Text style={{ color: "#A2AEB1" }}>
                {train.length} cars | Platform {train.platform}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <View><Text style={{ fontSize: 20 }}>{train.minutes}</Text></View>
            <View><Text style={{ fontSize: 14 }}>min</Text></View>
          </View>
        </View>
      );
    });
  };

  const pullDown = () => {
    if (pullDownView){
      return(
        <View style={styles.pullDown}><Text style={{color: 'white'}}>Pull down to refresh</Text></View>
      )
    }
  }

  if (selectedStation === undefined) {
    return (
      <View style={{ ...styles.train, alignItems: "center" }}>
        <Text>No trains available!</Text>
      </View>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {pullDown()} 
        {sortedTrainList()}
      </ScrollView>
    );
  }
};

StationDetailsScreen.navigationOptions = ({navigation}) => (
  {
  title: navigation.state.params.station,
  headerLeft: () => (
    <Ionicons
      name="md-locate"
      size={25}
      color="black"
      style={{ marginLeft: 20 }}
      onPress={() => navigation.goBack()}
    />
  ),
  // headerRight: () => (
  //   <Ionicons
  //     name="md-refresh"
  //     size={25}
  //     color="black"
  //     style={{ marginRight: 20 }}
  //     onPress={() => console.log('hello')}
  //   />
  // )
}
);

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
    width: "3%",
    marginTop: 2,
    marginBottom: 2,
    borderColor: "black",
    borderWidth: 1
    // borderRadius: 50
  },
  mid: {
    width: "72%",
    justifyContent: "space-evenly",
    flexDirection: "column",
    paddingLeft: 10
  },
  right: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  pullDown: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#0099CC',
    flex: 1,
    alignSelf: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
});

export default StationDetailsScreen;
