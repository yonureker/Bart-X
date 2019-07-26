import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spaceStation: {},
      bartStations: []
    };
  }

  componentDidMount() {
    this.fetchBartStations();
    this.fetchSpaceStation();
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



  renderSpaceStation(){
    const stationLogo = require("./assets/space_station.png");
    const spaceStationLatitude = this.state.spaceStation.latitude;
    const spaceStationLongitude = this.state.spaceStation.longitude;

    return(
      
      <MapView.Marker
          key={1}
          coordinate={{ latitude: spaceStationLatitude, longitude: spaceStationLongitude }}
          image={stationLogo}
        />
    )
  }

  renderBartStations(){
    const stationLogo = require("./assets/station.png");
    this.state.bartStations.map((station, index) => 
      (
        <MapView.Marker
            key={index}
            coordinate={{ latitude: station.gtfs_latitude, longitude: station.gtfs_longitude }}
            image={stationLogo}
          />
      )
    )
  }

  render() {
    
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider={"google"}
      >
        {this.renderSpaceStation()}
        {this.renderBartStations()}
      </MapView>
    );
  }
}
