import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { enableScreens } from "react-native-screens";

import rootReducer from "./reducers/rootReducer";
import AppContainer from './AppContainer';


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
