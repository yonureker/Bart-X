import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalloutText = props => {

  const textStyle = props.colorScheme === "dark" ? styles.darkThemeText : null;

  if (props.station.etd !== undefined) {
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

        return <Text style={textStyle}>{trainText}</Text>;
      };

      return <View key={index}>{approachingTrains()}</View>;
    });
  } else {
    return (
      <View>
        <Text style={textStyle}>No trains are scheduled for departure!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  darkThemeText: {
    color: '#ffffff'
  }
})

export default CalloutText;
