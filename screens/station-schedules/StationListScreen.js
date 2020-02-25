import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { getDistance, convertDistance } from "geolib";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import StationList from "../../components/stationList";

const StationListScreen = props => {
  const userLocation = useSelector(state => state.userLocation)
  const { stations : { station } } = require('../../stations');

  console.log(props);
  
  useEffect(() => {
    calculateDistance();
  });

  const calculateDistance = () => {
    return station.map(station => {
      return {
        ...station,
        distance: convertDistance(
          getDistance(
            {
              latitude: station.gtfs_latitude,
              longitude: station.gtfs_longitude
            },
            {
              latitude: String(userLocation.coords.latitude),
              longitude: String(userLocation.coords.longitude)
            }
          ),
          "mi"
        )
      };
    });
  };

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, width: "100%" }}>
          <StationList
            style={{flex: 1}}
            navigate={props.navigation.navigate}
            stations={calculateDistance()}
          />
        </View>
      </View>
    )
};

StationListScreen.navigationOptions = ({navigation}) => ( {
  title: "Closest Stations",
  headerMode: 'screen',
  headerRight: () => (
    <MaterialIcons
      name="settings"
      size={30}
      color="blue"
      style={{ marginRight: 20 }}
      onPress={() => navigation.toggleDrawer()}
    />
  )
});

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default StationListScreen;
