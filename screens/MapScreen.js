import React from 'react';
import { SafeAreaView } from 'react-native';
import MapView from "react-native-maps";
import Markers from '../components/markers'
import { useSelector } from 'react-redux';

const MapScreen = props => {
  // get user location from Redux store
  // this is used to center the map
  const { latitude, longitude } = useSelector(state => state.location.coords)

  // The MapView and Markers are static
  // We only need to update marker callouts after fetching data
  return(
    <SafeAreaView style={{flex: 1}}>
    <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude:  parseFloat(latitude) || 37.792874,
          longitude: parseFloat(longitude) || -122.39703,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06
        }}
        provider={"google"}
      >
        <Markers />
      </MapView>
      </SafeAreaView>
  )
}

export default MapScreen;