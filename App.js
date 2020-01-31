import React, { useState, useEffect } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import LiveMapScreen from "./screens/LiveMapScreen";
import rootReducer from "./reducers/rootReducer";
import SystemScreen from './screens/system-map/SystemScreen';

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
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  tabIcon:{
    marginTop: 5
  }
});

const TabNavigator = createBottomTabNavigator({
  'Live Map': {
    screen: LiveMapScreen,
    navigationOptions: {
      tabBarIcon: () => <MaterialCommunityIcons name="google-maps" size={32} color="black" style={styles.tabIcon}/>
    },
    defaultNavigationOptions: {
      title: 'Live Map'
    }
  },
  'System Map': {
    screen: SystemScreen,
    navigationOptions: {
      tabBarIcon: () => <Ionicons name="ios-map" size={32} color="black" style={styles.tabIcon}/>
    },
    defaultNavigationOptions: {
      title: 'System Map'
    }
  }
});



const AppContainer = createAppContainer(TabNavigator);
