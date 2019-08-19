import React from "react";
import { Platform, Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import stationDetails from "./stationDetails.js";
import stationLogo from "./assets/station.png";
import redTrain from "./assets/train-red.png";
import yellowTrain from "./assets/train-yellow.png";
import blueTrain from "./assets/train-blue.png";
import greenTrain from "./assets/train-green.png";
import orangeTrain from "./assets/train-orange.png";
import purpleTrain from "./assets/train-purple.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bartStations: [],
      stationList: [],
      location: {coords: null},
      errorMessage: null
    };
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount() {
    this.fetchBartStations();
    this.fetchTrain();
    this.interval = setInterval(() => this.fetchTrain(), 500000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

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
    return this.state.bartStations.map((el, index) => (
      <MapView.Marker
        key={index}
        coordinate={{
          latitude: parseFloat(el.gtfs_latitude),
          longitude: parseFloat(el.gtfs_longitude)
        }}
        image={stationLogo}
        title={el.name}
        zIndex={-2}
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
                case "WHITE":
                  return yellowTrain;
                default:
                  break;
              }
            };

            //moving South direction trains a bit so they don't overlap with North trains.
            const preventFlicker = function() {
              switch (direction) {
                case "North":
                  return {
                    latitude:
                      parseFloat(
                        stationDetails[stationAbr]["waypoints"][direction][
                          minutes
                        ]["latitude"]
                      ) - 0.0004,
                    longitude:
                      parseFloat(
                        stationDetails[stationAbr]["waypoints"][direction][
                          minutes
                        ]["longitude"]
                      ) - 0.0004
                  };
                case "South":
                  return {
                    latitude:
                      parseFloat(
                        stationDetails[stationAbr]["waypoints"][direction][
                          minutes
                        ]["latitude"]
                      ) + 0.0004,
                    longitude:
                      parseFloat(
                        stationDetails[stationAbr]["waypoints"][direction][
                          minutes
                        ]["longitude"]
                      ) + 0.0004
                  };
                default:
                  break;
              }
            };

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
      this.state.stationList.length !== 0 &&
      this.state.location.coords !== undefined
    ) {
      return (
        <MapView
          style={{
            flex: 1
          }}
          initialRegion={{
            // latitude: ,
            // longitude: ,
            latitude: parseFloat(this.state.location.coords.latitude),
            longitude: parseFloat(this.state.location.coords.longitude),
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>BartLiveMobile</Text>
          <Text>Loading....</Text>
        </View>
      );
    }
  }
}
