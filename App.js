import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { enableScreens } from "react-native-screens";

import LiveMapScreen from "./screens/LiveMapScreen";
import ListScreen from "./screens/station-schedules/ListScreen";
import SystemScreen from "./screens/system-map/SystemScreen";
import SettingsScreen from "./screens/SettingsScreen";

import rootReducer from "./reducers/rootReducer";

// initialize the redux store


export default function App() {
  //for faster navigation https://github.com/kmagiera/react-native-screens
  enableScreens();

  const store = createStore(rootReducer);

  // variable to check if image caching is ready
  const [isReady, setIsReady] = useState(false);

  const cacheResources = async () => {
    const images = [
      require("./assets/splash.png"),
      require("./assets/icon.png"),
      require("./assets/station.png"),
      require("./assets/loading.png"),
      require("./assets/train.png"),
      require("./assets/sunday-system-map.png"),
      require("./assets/week-and-sat-system-map.png")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  if (!isReady) {
    return (
      // set isReady to true after images are cached.
      <AppLoading
        startAsync={() => cacheResources()}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  tabIcon: {
    marginTop: 3
  }
});

// Bottom Tab Navigator Setup
const TabNavigator = createBottomTabNavigator(
  {
    "Station List": {
      screen: ListScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <Ionicons
            name="md-list"
            size={32}
            color="black"
            style={styles.tabIcon}
          />
        )
      }
    },
    "Live Map": {
      screen: LiveMapScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="google-maps"
            size={32}
            color="black"
            style={styles.tabIcon}
          />
        )
      }
    },
    "System Map": {
      screen: SystemScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <Ionicons
            name="ios-map"
            size={32}
            color="black"
            style={styles.tabIcon}
          />
        )
      }
    },
    // "Settings": {
    //   screen: SettingsScreen,
    //   navigationOptions: {
    //     tabBarIcon: () => (
    //       <Ionicons
    //         name="md-settings"
    //         size={32}
    //         color="black"
    //         style={styles.tabIcon}
    //       />
    //     )
    //   }
    // },
  },
  {
    initialRouteName: "Station List"
  }
);

const AppContainer = createAppContainer(TabNavigator);
