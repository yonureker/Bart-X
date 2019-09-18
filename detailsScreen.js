import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import redTrain from "./assets/train-red.png";
import yellowTrain from "./assets/train-yellow.png";
import blueTrain from "./assets/train-blue.png";
import greenTrain from "./assets/train-green.png";
import orangeTrain from "./assets/train-orange.png";
import purpleTrain from "./assets/train-purple.png";

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Hello'
  };

  render() {
    const station = this.props.navigation.state.params.station;

    const trainList = function() {
      return station.etd.map((route, index) => {
        return route.estimate.map((train, index) => {
          const trainColor = function() {
            switch (train.color) {
              case "GREEN":
                return greenTrain;
              case "YELLOW":
                return yellowTrain;
              case "BLUE":
                return blueTrain;
              case "RED":
                return redTrain;
              case "ORANGE":
                return orangeTrain;
              case "PURPLE":
                return purpleTrain;
              case "WHITE":
                return yellowTrain;
              default:
                break;
            }
          };

          return (
            <View
              key={index}
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignContent: "center",
                marginTop: 5,
                marginLeft: 5,
                marginBottom: 5
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#f0ebe9"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  <Image
                    source={trainColor()}
                    style={{ width: 30, height: 30, marginBottom: 10, marginLeft: 5 }}
                  />
                </View>
                <View style={{ flex: 4, justifyContent: "center" }}>
                  <Text
                    style={{ fontSize: 20, marginBottom: 5 }}
                  >{`${route.destination}`}</Text>
                  <Text style={{ marginBottom: 10 }}>
                    {train.length} cars | Platform: {train.platform}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{ fontSize: 20 }}
                  >{`${train.minutes} mins`}</Text>
                </View>
              </View>
            </View>
          );
        });
      });
    };

    return <ScrollView>{trainList()}</ScrollView>;
  }
}
