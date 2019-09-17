import React from "react";
import { View, Text } from "react-native";

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>This is the details screen</Text>
      </View>
    );
  }
}