import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const StationList = props => {
  const stationList = props.stations.sort((a,b) => a.distance > b.distance ? 1 : -1);

  return (
    <FlatList
      data={stationList}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.button}>
          <View>
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text>
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
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  }
})

export default StationList;
