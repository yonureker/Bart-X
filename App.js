import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import stationDetails from "./stationDetails.js";
import stationLogo from "./assets/station.png";
import redTrain from "./assets/train-red.png";
import yellowTrain from "./assets/train-yellow.png";
import blueTrain from "./assets/train-blue.png";
import greenTrain from "./assets/train-green.png";
import orangeTrain from "./assets/train-orange.png";
import purpleTrain from "./assets/train-purple.png";
// import MapView from 'react-native-map-clustering';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bartStations: [],
      stationList: []
    };
  }

  componentDidMount() {
    this.fetchBartStations();
    this.fetchTrain();
    this.interval = setInterval(() => this.fetchTrain(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchSpaceStation() {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          spaceStation: responseJson.iss_position
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchBartStations() {
    fetch(
      "https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          bartStations: responseJson.root.stations.station
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchTrain() {
    fetch(
      "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          stationList: responseJson.root.station
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderBartStations() {
    // moved to top
    // const stationLogo = require("./assets/station.png");
    return this.state.bartStations.map((el, index) => (
      <MapView.Marker
        key={index}
        coordinate={{
          latitude: parseFloat(el.gtfs_latitude),
          longitude: parseFloat(el.gtfs_longitude)
        }}
        image={stationLogo}
        title={el.name}
        zIndex={-1}
      />
    ));
  }

  renderTrain() {
    const stations = this.state.stationList;

    return stations.map(station => {
      var stationAbr = station.abbr;

      return station.etd.map(route =>
        route.estimate.map((train, index) => {
          let direction = train.direction;
          let minutes = train.minutes;

          if (
            stationDetails[stationAbr]["waypoints"][direction][minutes] !==
            undefined
          ) {
            //sets train color 
            const markerColor = function() {
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
                default:
                  break;
              }
            };

            //moving South direction trains a bit so they don't overlap with North trains.
            const preventFlicker = function(){
              switch (direction) {
                case "North":
                  return stationDetails[stationAbr]["waypoints"][direction][minutes];
                case "South":
                  return ({
                    latitude: parseFloat(stationDetails[stationAbr]["waypoints"][direction][minutes]['latitude']) + 0.000085,
                    longitude: parseFloat(stationDetails[stationAbr]["waypoints"][direction][minutes]['longitude']) + 0.000085
                  })
                default:
                  break;
              }
            }

            return (
              <MapView.Marker
                key={index}
                coordinate={preventFlicker()}
                image={markerColor()}
                title={`${route.destination} Train`}
                description={`Next Station: ${station.name}`}
                zIndex={index}
              />
            );
          }
        })
      );
    });
  }

  render() {
    if (
      this.state.bartStations.length !== 0 &&
      this.state.stationList.length !== 0
    ) {
      return (
        <MapView
          style={{
            flex: 1
          }}
          initialRegion={{
            latitude: 37.870104,
            longitude: -122.268136,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          provider={"google"}
        >
          {this.renderBartStations()}
          {this.renderTrain()}
        </MapView>
      );
    } else {
      return (
        <View>
          <Text>loadinggg.......</Text>
        </View>
      );
    }
  }
}
