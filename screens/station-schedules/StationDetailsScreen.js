import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import * as StoreReview from "expo-store-review";

// for pulldown refresh
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const StationDetailsScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [pullDownView, setPullDownView] = useState(true);
  const [selectedStation, setSelectedStation] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      setPullDownView(false);
    });
  }, [refreshing]);

  useEffect(() => {
    fetchTrainDepartures();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 15000);
    return () => clearInterval(intervalId);
  });

  // useEffect(() => {
  //   getFavoriteStatus();
  // }, [])

  useEffect(() => {
    const timeoutId = setTimeout(askforReview, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  // const getFavoriteStatus = async() => {
  //   const result = await SecureStore.getItemAsync(props.navigation.state.params.abbr)

  //   props.navigation.setParams({favorite: result});
  // }

  const fetchTrainDepartures = () => {
    fetch(
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${props.navigation.state.params.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`
    )
      .then(response => response.json())
      .then(responseJson => setSelectedStation(responseJson.root.station[0]))
      .catch(error => {
        console.log(error);
      });
  };

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
          <View style={{ ...styles.left, backgroundColor: train.color }}></View>
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
            <View>
              <Text style={{ fontSize: 20 }}>{train.minutes}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14 }}>min</Text>
            </View>
          </View>
        </View>
      );
    });
  };

  const pullDown = () => {
    if (pullDownView) {
      return (
        <View style={styles.pullDown}>
          <Text style={{ color: "white" }}>Pull down to refresh</Text>
        </View>
      );
    }
  };

  const askforReview = async () => {
    const usage = await SecureStore.getItemAsync("counter");
    const askedforReview = await SecureStore.getItemAsync("askedReview");

    if (usage === "2" && askedforReview === null) {
      StoreReview.requestReview();
      await SecureStore.setItemAsync("askedReview", "true");
    }
  };

  if (selectedStation.etd === undefined) {
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

StationDetailsScreen.navigationOptions = ({ navigation }) => {
  const { name, abbr, favorite } = navigation.state.params;

  return {
    title: name,
    headerForceInset: { top: 'never', bottom: 'never' },
    headerLeft: () => (
      <Ionicons
        name="md-locate"
        size={30}
        color="black"
        style={{ marginLeft: 20 }}
        onPress={() => navigation.goBack()}
      />
    )
    // headerRight: () => (

    //   <MaterialIcons
    //     name={ SecureStore.getItemAsync(abbr) === 'true' ? 'favorite' : 'favorite-border'}
    //     size={30}
    //     color="red"
    //     style={{ marginRight: 20 }}
    //     onPress={async() => {
    //       if (favorite === 'true'){
    //         SecureStore.setItemAsync(String(abbr), 'false').then(navigation.setParams({favorite: 'false'}))
    //       } else {
    //         SecureStore.setItemAsync(String(abbr), 'true').then(navigation.setParams({favorite: 'true'}))
    //       }
    //     }}

    //   />
    // )
  };
};

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
    alignItems: "center"
  },
  pullDown: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    backgroundColor: "#0099CC",
    flex: 1,
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default StationDetailsScreen;

// SecureStore.setItemAsync(String(navigation.state.params.abbr), 'favorite').then(value => navigation.setParams({favorite: !navigation.state.params.favorite}))
