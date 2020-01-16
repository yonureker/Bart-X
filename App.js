import React, { useState, useEffect } from "react";
import { ImageBackground, View, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import MapScreen from './components/mapScreen';

export default function App() {
  const [stationList, setStationList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [location, setLocation] = useState({ coords: { latitude: null, longitude: null }});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // call BART API
      fetch(
        "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
      )
        .then(response => response.json())
        .then(responseJson => {
          setStationList(responseJson.root.station);
          setLastUpdate(responseJson.root.time);
        })
        .catch(error => {
          console.log(error);
        });
    }, 2000);

    return () => clearInterval(intervalId);
  });

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      // setErrorMessage({
      //   errorMessage: "Permission to access location was denied"
      // });
      setLocation({ coords: { latitude: 37.792874, longitude: -122.39703 } });
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({ coords: { latitude: location.coords.latitude, longitude: location.coords.longitude }})
  };

  const cacheResources = async () => {
    const images = [
      require("./assets/splash.png"),
      require("./assets/station.png"),
      require("./assets/loading.png")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  if (!isReady) {
    return (
      // set this.state.isReady to true after images are cached.
      <AppLoading
        startAsync={() => cacheResources()}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  // wait for valid user location data to load component.
  if (location.coords.latitude !== null) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
      <MapScreen stationList={stationList} location={location} lastUpdate={lastUpdate}/>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={require("./assets/loading.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#B6ACAC"
  }
})
