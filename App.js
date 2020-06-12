import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { enableScreens } from "react-native-screens";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import logger from "redux-logger";

import rootReducer from "./reducers/rootReducer";
import Navigation from "./Navigation";

export default function App() {
  //for faster navigation https://github.com/kmagiera/react-native-screens
  enableScreens();

  const store = createStore(rootReducer);
  const colorScheme = useColorScheme();
  // variable to check if image caching is ready
  const [isReady, setIsReady] = useState(false);

  const cacheResources = async () => {
    const images = [
      require("./assets/splash.png"),
      require("./assets/icon.png"),
      require("./assets/station.png"),
      require("./assets/loading.png"),
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
  const statusBarStyle =
    colorScheme === "dark" ? "light-content" : "dark-content";
  const darkThemeContainer =
    colorScheme === "dark" ? styles.darkThemeContainer : null;

  return (
    <Provider store={store}>
      {/* <AppearanceProvider> */}
      <StatusBar barStyle={statusBarStyle} />
      <SafeAreaView style={[styles.container, darkThemeContainer]}>
        <Navigation />
      </SafeAreaView>
      {/* </AppearanceProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  darkThemeContainer: {
    backgroundColor: "black"
  }
});
