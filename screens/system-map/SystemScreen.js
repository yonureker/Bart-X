import React from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { SafeAreaView } from 'react-navigation';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import SundayScreen from './SundayScreen';
import WeekAndSatScreen from './WeekAndSatScreen';

const SystemScreen = createMaterialTopTabNavigator({
  'Weekday & Saturday': {screen: WeekAndSatScreen},
  'Sunday': SundayScreen
}, {
  tabBarComponent: SafeAreaMaterialTopTabBar
}
)

function SafeAreaMaterialTopTabBar (props) {
  return (
    <View style={{flex: 1}}>
    <StatusBar />
    <SafeAreaView style={styles.container} >
      <MaterialTopTabBar {...props} />
      </SafeAreaView>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default SystemScreen;
