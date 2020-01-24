import React, {useEffect} from 'react';
import { SafeAreaView } from "react-navigation"
import MapView from "react-native-maps";
import {StyleSheet} from 'react-native';
import Markers from '../components/markers'
import { useSelector, useDispatch } from 'react-redux';

const LiveMapScreen = props => {
  const dispatch = useDispatch();
  // get user location from Redux store
  // this is used to center the map
  const { latitude, longitude } = useSelector(state => state.location.coords)

  useEffect(() => {
    fetchBartData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchBartData, 10000);

    return () => clearInterval(intervalId);
  });

  const fetchBartData = () => {
    // setStationList(responseJson.root.station);
    // setLastUpdate(responseJson.root.time);)
    // call BART API
    fetch(
      "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson =>
        dispatch({
          type: "RECEIVE_STATION_DATA",
          payload: responseJson.root.station
        })
      )
      .catch(error => {
        console.log(error);
      });
  };
  // The MapView and Markers are static
  // We only need to update Marker callouts after fetching data
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LiveMapScreen;