import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, SafeAreaView } from "react-native";
import Markers from "../components/markers";
import { useSelector, useDispatch } from "react-redux";

const LiveMapScreen = React.memo((props) => {
  const dispatch = useDispatch();
  // get user location from Redux store
  // this is used to center the map
  const { latitude, longitude } = props.screenProps.coords;

  useEffect(() => {
    fetchTrainDepartures();
  }, []);

  useEffect(() => {
    fetchStationLocation();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 10000);

    return () => clearInterval(intervalId);
  });

  const fetchStationLocation = () => {
    fetch(
      "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson =>
        dispatch({
          type: "RECEIVE_STATION_LOCATIONS",
          payload: responseJson.root.stations.station
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  const fetchTrainDepartures = () => {
    // setStationList(responseJson.root.station);
    // setLastUpdate(responseJson.root.time);)
    // call BART API
    fetch(
      "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson =>
        dispatch({
          type: "RECEIVE_TRAIN_DEPARTURE_DATA",
          payload: responseJson.root.station
        })
      )
      .catch(error => {
        console.log(error);
      });
  };
  // The MapView and Markers are static
  // We only need to update Marker callouts after fetching data
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(latitude) || 37.792874,
          longitude: parseFloat(longitude) || -122.39703,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }}
        minZoomLevel={9}
        provider={"google"}
        loadingEnabled={true}
        mapType={"standard"}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
      >
        <Markers />
      </MapView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LiveMapScreen;
