import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import * as StoreReview from "expo-store-review";
import { useColorScheme } from "react-native-appearance";

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
    wait(1000).then(() => {
      fetchTrainDepartures();
      setRefreshing(false);
      setPullDownView(false);
    });
  }, [refreshing]);

  useEffect(() => {
    fetchTrainDepartures();
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
    const usage = await SecureStore.getItemAsync("counter");
    const askedforReview = await SecureStore.getItemAsync("askedReview");

    if (usage === "5" && askedforReview === null) {
      StoreReview.requestReview();
      await SecureStore.setItemAsync("askedReview", "true");
    }
  };

  const backgroundStyle =
    colorScheme === "dark" ? styles.darkBackground : styles.lightBackground;
  const textStyle = colorScheme === "dark" ? styles.lightText : null;

  if (selectedStation.etd === undefined) {
    return (
      <View style={{ ...styles.train, alignItems: "center" }}>
        <Text style={textStyle}>No trains available!</Text>
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
      </ScrollView>
    );
  }
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
    width: "75%",
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#3167ED",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flex: 1,
    alignSelf: "center"
  },
  destinationText: {
    fontSize: 20
  },
  platformText: {
    color: "#A2AEB1"
  },
  minutesText: {
    fontSize: 20
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
