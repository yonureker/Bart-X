import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { enableScreens } from "react-native-screens";
import { SafeAreaView } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Navigation from "./Navigation";
import rootReducer from "./reducers/rootReducer";

export default function App() {
  //for faster navigation https://github.com/kmagiera/react-native-screens
  enableScreens();

  // redux store
  const store = createStore(rootReducer);
  const colorScheme = useColorScheme();
  // variable to check if image caching is ready
  const [isReady, setIsReady] = useState(false);

  // cache assets
  const cacheResources = async () => {
    const images = [
      require("./assets/splash.png"),
      require("./assets/icon.png"),
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
      <StatusBar barStyle={statusBarStyle} />
      <SafeAreaView style={[styles.container, darkThemeContainer]}>
        <Navigation />
      </SafeAreaView>
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
