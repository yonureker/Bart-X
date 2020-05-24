import React from "react";
import { View, Text } from "react-native";

const CalloutText = props => {
  if (props.station !== undefined) {
    return props.station.etd.map((route, index) => {
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
          }
        });

        trainText += " mins";

        return <Text>{trainText}</Text>;
      };

      return <View key={index}>{approachingTrains()}</View>;
    });
  } else {
    return (
      <View>
        <Text>No trains!</Text>
      </View>
    );
  }
};

export default CalloutText;
