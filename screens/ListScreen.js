import React, {useEffect} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import { useDispatch } from "react-redux";

const ListScreen = props => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchBartData();
    console.log("intial fetching")
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchBartData, 10000);
    console.log("subsequent fetching")

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
      .then(responseJson => dispatch({type: 'RECEIVE_STATION_DATA', payload: responseJson.root.station}))
      .catch(error => {
        console.log(error);
      });
  };

  return(
    <SafeAreaView style={styles.container}>
      <Text>List Screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})

export default ListScreen;