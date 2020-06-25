import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import * as StoreReview from "expo-store-review";
import { useColorScheme } from "react-native-appearance";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const colorScheme = useColorScheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      fetchTrainDepartures();
      setRefreshing(false);
      setPullDownView(false);
    });
  }, [refreshing]);

  useEffect(() => {
    fetchTrainDepartures();
    checkPullDownStatus();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 10000);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    const timeoutId = setTimeout(askforReview, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  const fetchTrainDepartures = () => {
    fetch(
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${props.route.params.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`
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

    //update this later
    mappedStation.sort((a, b) => (a.minutes > b.minutes ? 1 : -1));

    return mappedStation.map((train, index) => {
      return (
        <View style={[styles.train, backgroundStyle]} key={index}>
          <View style={{ ...styles.left, backgroundColor: train.color }}></View>
          <View style={styles.mid}>
            <View>
              <Text style={[styles.destinationText, textStyle]}>
                {train.destination}
              </Text>
            </View>
            <View>
              <Text style={[styles.platformText, textStyle]}>
                {train.length} cars | Platform {train.platform}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <View>
              <Text style={[styles.minutesText, textStyle]}>
                {train.minutes}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, ...textStyle }}>min</Text>
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
          <Text style={{ color: "white" }}>Pull-down for manual refresh</Text>
        </View>
      );
    }
  };

  // asking user for rating, if used the app 5 times.
  const askforReview = async () => {
    const appUsageCounter = await SecureStore.getItemAsync("counter");
    const askedforReview = await SecureStore.getItemAsync("askedReview");

    if (appUsageCounter === "10" && askedforReview === null) {
      StoreReview.requestReview();
      await SecureStore.setItemAsync("askedReview", "true");
    }
  };

  const checkPullDownStatus = async () => {
    const pullDownCounter = await SecureStore.getItemAsync("pullDownCounter");

    if (pullDownCounter == null || Number(pullDownCounter) < 4) {
      setPullDownView(true);
    } else {
      setPullDownView(false);
    }
  };

  const backgroundStyle =
    colorScheme === "dark" ? styles.darkBackground : styles.lightBackground;
  const textStyle = colorScheme === "dark" ? styles.lightText : null;

  if (selectedStation === false) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (selectedStation.etd === undefined) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          style={{ marginBottom: 80 }}
          name="train-variant"
          size={150}
          color="#0099D8"
        />
        <Text
          style={{
            fontSize: 18,
            color: colorScheme === "dark" ? "white" : "black"
          }}
        >
          There are no scheduled trains for this station.
        </Text>
      </View>
    );
  } else {
    return (
      <ScrollView
        style={backgroundStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {pullDown()}
        {sortedTrainList()}
        <View style={{ alignItems: "center", margin: 10 }}>
          <Text style={{ color: "gray" }}>
            Departures auto-refresh every 10 seconds.
          </Text>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  train: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    fontSize: 18,
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
    width: "95%",
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#3167ED",
    flex: 1,
    alignSelf: "center"
  },
  destinationText: {
    fontSize: 18
  },
  platformText: {
    color: "#A2AEB1"
  },
  minutesText: {
    fontSize: 18
  },
  darkBackground: {
    backgroundColor: "black"
  },
  lightBackground: {
    backgroundColor: "white"
  },
  lightText: {
    color: "white"
  }
});

export default StationDetailsScreen;
