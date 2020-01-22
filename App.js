import React, { useState, useEffect } from "react";
import { ImageBackground, View, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Provider, useDispatch } from "react-redux";
import { createStore } from "redux";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

import ListScreen from "./screens/ListScreen";
import MapScreen from "./screens/MapScreen";
import rootReducer from "./reducers/rootReducer";

// const initialState = {
//   location = { coords: { latitude: null, longitude: null }},
// };

export default function App() {
  const store = createStore(rootReducer);
  

  const [location, setLocation] = useState({
    coords: { latitude: null, longitude: null }
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setLocation({ coords: { latitude: 37.792874, longitude: -122.39703 } });
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      coords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
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
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
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
    backgroundColor: "#D1CCCC"
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  }
});

const TabNavigator = createBottomTabNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      tabBarIcon: () => (<Ionicons name="ios-list" size={32} color="black" />)
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarIcon: () => (<Ionicons name="ios-map" size={32} color="black" />)
    }
}}
);

const AppContainer = createAppContainer(TabNavigator);
