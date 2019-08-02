import React from "react";
import { Text, View, AppRegistry, Platform } from "react-native";
import MapView from "react-native-maps";
// import MapView from 'react-native-map-clustering';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spaceStation: {},
      bartStations: [],
      stationList: []
    };
  }

  componentDidMount() {
    this.fetchBartStations();
    this.fetchTrain();
    this.interval = setInterval(() => this.fetchTrain(), 10000)
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  fetchSpaceStation() {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          spaceStation: responseJson.iss_position,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }



  fetchBartStations() {
    fetch("https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y")
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

  fetchTrain(){
    fetch('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          stationList: responseJson.root.station
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderSpaceStation(){
    const spaceStationLogo = require("./assets/space_station.png");
    const spaceStationLatitude = this.state.spaceStation.latitude;
    const spaceStationLongitude = this.state.spaceStation.longitude;

    return(
      <MapView.Marker
          key={1}
          coordinate={{ latitude: spaceStationLatitude, longitude: spaceStationLongitude }}
          image={spaceStationLogo}
        />
    )
  }

  renderBartStations(){
    const stationLogo = require("./assets/station.png");
    return(
    this.state.bartStations.map((el, index) => 
          <MapView.Marker
              key={index}
              coordinate={{ latitude: parseFloat(el.gtfs_latitude), longitude: parseFloat(el.gtfs_longitude) }}
              image={stationLogo}
              zIndex={-1}
            />
        )
    )
  }

  renderTrain(){
    const stationDetails = require('./stationDetails.js');
    const redTrain = require('./assets/train-red.png');
    const yellowTrain = require('./assets/train-yellow.png');
    const blueTrain = require('./assets/train-blue.png');
    const greenTrain = require('./assets/train-green.png');
    const orangeTrain = require('./assets/train-orange.png');
    const purpleTrain = require('./assets/train-purple.png');
    const stations = this.state.stationList;
  
    return(
      stations.map((station) => {
        var stationAbr = station.abbr;

        return(
          station.etd.map(route => 
            route.estimate.map((train, index) => {
              let direction = train.direction;
              let minutes = train.minutes;

              if (stationDetails[stationAbr]["waypoints"][direction][minutes] !== undefined){

                const markerColor = function(){
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
                }

                return(
                  <MapView.Marker
                    key={index}
                    coordinate={stationDetails[stationAbr]["waypoints"][direction][minutes]}
                    image={markerColor()}
                    zIndex={index}
                  />
                )
              }
            })
            )
        )
    
      }
      )
    )
  }

  render() {
    

    if (this.state.bartStations.length !== 0 && this.state.stationList.length !== 0 ){
    
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
    )
      } else {
        return(
          <View>
            <Text>loadinggg.......</Text>
          </View>
        )
      }
  }
}
