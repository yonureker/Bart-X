import React, {useState} from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';

const StationList = props => {
  const stationList = props.stations.sort((a,b) => a.distance > b.distance ? 1 : -1);

  return (
    <FlatList
      data={stationList}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.button} onPress={() => props.navigate('StationDetails', {
          abbr: item.abbr,
          name: item.name,
        })}>
          <View>
            <Text style={styles.stationTitle}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.stationDistance}>
              {(item.distance).toFixed(2)} miles
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.abbr}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderColor: '#F0F4F5',
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 10
  },
  stationTitle: {
    fontSize: 20
  },
  stationDistance: {
    fontSize: 12
  }
})

export default StationList;
