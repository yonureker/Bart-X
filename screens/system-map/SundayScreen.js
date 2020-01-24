import React from "react";
import { Image, StyleSheet, Dimensions, Animated } from "react-native";
import { PinchGestureHandler, State, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";

const SundayScreen = props => {
  const { width } = Dimensions.get("window");
  const scale = new Animated.Value(1);

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scale }
      }
    ],
    {
      useNativeDriver: true
    }
  );

  const onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={onZoomStateChange}
      >
        <Animated.Image
          style={{ width: width, height: '100%', transform: [{ scale: scale }] }}
          source={require("../../assets/sunday-system-map.png")}
          resizeMode="contain"
        />
      </PinchGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SundayScreen;
