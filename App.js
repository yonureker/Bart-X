import React from "react";
import { ImageBackground, Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import stationDetails from "./stationDetails.js";
import stationLogo from "./assets/station.png";
import StationCallout from "./stationCallout";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stationList: [],
      lastUpdate: "",
      location: { coords: { latitude: null, longitude: null } },
      errorMessage: null,
      isReady: false
    };
  }

  componentWillMount() {
    // ask user location before component mounts
    this._getLocationAsync();
  }

  componentDidMount() {
    this.fetchTrain();
    // check real time info from BART API every 4 seconds
    this.interval = setInterval(() => this.fetchTrain(), 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
        location: { coords: { latitude: 37.792874, longitude: -122.39703 } }
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  fetchTrain() {
    // call BART API
    fetch(
      "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          stationList: responseJson.root.station,
          lastUpdate: responseJson.root.time
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderBartStations() {
    return this.state.stationList.map((station, index) => {
      // uses react-native-maps components
      return (
        <MapView.Marker
          key={index}
          coordinate={{
            // receives station latitude and longitude from stationDetails.js
            latitude: parseFloat(stationDetails[station.abbr].gtfs_latitude),
            longitude: parseFloat(stationDetails[station.abbr].gtfs_longitude)
          }}
          image={stationLogo}
          zIndex={100}
          tracksInfoWindowChanges={true}
        >
          <MapView.Callout
            key={index}
            tooltip={true}
            style={{ backgroundColor: "#ffffff" }}
          >
            <View
              style={{
                marginHorizontal: 5,
                marginTop: 2,
                borderBottomWidth: "1px",
                borderBottomColor: "#c4c1b9"
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{station.name}</Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
                marginBottom: 8
              }}
            >
              <StationCallout
                key={index}
                station={this.state.stationList[index]}
              />
            </View>
          </MapView.Callout>
        </MapView.Marker>
      );
    });
  }

  // cache images before initial opening
  async _cacheResourcesAsync() {
    const images = [
      require("./assets/splash.png"),
      require("./assets/station.png"),
      require("./assets/loading.png")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isReady) {
      return (
        // set this.state.isReady to true after images are cached.
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    // wait for valid user location data to load component.
    if (this.state.location.coords.latitude !== null) {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <MapView
            style={{
              flex: 19
            }}
            // initial MapView is centered on either user location or [37.792874, -122.39703]
            initialRegion={{
              latitude:
                parseFloat(this.state.location.coords.latitude) || 37.792874,
              longitude:
                parseFloat(this.state.location.coords.longitude) || -122.39703,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
            provider={"google"}
          >
            {this.renderBartStations()}
          </MapView>
          <View
            style={{
              flex: 1,
              backgroundColor: "#0099CC",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Text style={{ fontSize: 15, color: "white", alignSelf: "center" }}>
              Last update at {this.state.lastUpdate}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./assets/loading.png")}
          />
        </View>
      );
    }
  }
}
