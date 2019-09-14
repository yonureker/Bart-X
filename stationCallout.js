import React from "react";
import { View, Text } from "react-native";

export default class StationCallout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.station.etd.map((route, index) => {

      const approachingTrains = function() {
        trainText = `${route.destination} in`;

        route.estimate.map((train, index) => {
          if (index === 0) {
            if (train.minutes === "Leaving") {
              trainText += ` 0`;
            } else {
              trainText += ` ${train.minutes}`;
            }
          } else {
            if (train.minutes === "Leaving") {
              trainText += `, 0`;
            } else {
              trainText += `, ${train.minutes}`;
            }
        }});

        trainText += " mins";

        return (
          <Text>
            {trainText}
          </Text>
        )
      };

      return (
          <View key={index}>
            {approachingTrains()}
          </View>
      );
    });

    // return (
    //   <View>
    //     <Text>{this.props.stationList.length}</Text>
    //   </View>
    // );
  }
}
