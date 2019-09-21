import React from "react";
import {
  Platform,
  Text,
  ImageBackground,
  View
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import stationDetails from "./stationDetails.js";
import stationLogo from "./assets/station.png";
import StationCallout from "./stationCallout";
import DetailsScreen from "./detailsScreen";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from "react-navigation";
// import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
// import redTrain from "./assets/train-red.png";
// import yellowTrain from "./assets/train-yellow.png";
// import blueTrain from "./assets/train-blue.png";
// import greenTrain from "./assets/train-green.png";
// import orangeTrain from "./assets/train-orange.png";
// import purpleTrain from "./assets/train-purple.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stationList: [],
      lastUpdate: "",
      location: { coords: { latitude: 37.792874, longitude: -122.39703 } },
      errorMessage: null,
      isReady: false
    };
  }

  static navigationOptions = {
    title: "Live Map"
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  componentDidMount() {
    this.fetchTrain();
    this.interval = setInterval(() => this.fetchTrain(), 5000);
    // this.interval2 = setInterval(() => this.renderBartStations(), 1000);
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

  fetchTrain() {
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
      return (
        <MapView.Marker
          key={index}
          coordinate={{
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
            // onPress={() => this.props.navigation.navigate('Details', { station: this.state.stationList[index]})}
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

  // renderTrain() {
  //   const stations = this.state.stationList;
  //   const transferStations = ["MCAR", "12TH", "WOAK", "LAKE", "BAYF"];

  //   return stations.map(station => {
  //     var stationAbr = station.abbr;

  //     return station.etd.map(route =>
  //       route.estimate.map((train, index) => {
  //         let direction = train.direction;
  //         let minutes = train.minutes;

  //         if (transferStations.includes(stationAbr)) {
  //           minutesLeft =
  //             stationDetails[stationAbr]["waypoints"][train.color][direction][
  //               minutes
  //             ];
  //         } else {
  //           minutesLeft =
  //             stationDetails[stationAbr]["waypoints"][direction][minutes];
  //         }

  //         if (minutesLeft !== undefined) {
  //           //sets train color
  //           const markerColor = function() {
  //             switch (train.color) {
  //               case "GREEN":
  //                 return greenTrain;
  //               case "YELLOW":
  //                 return yellowTrain;
  //               case "BLUE":
  //                 return blueTrain;
  //               case "RED":
  //                 return redTrain;
  //               case "ORANGE":
  //                 return orangeTrain;
  //               case "PURPLE":
  //                 return purpleTrain;
  //               case "WHITE":
  //                 return yellowTrain;
  //               default:
  //                 break;
  //             }
  //           };

  //           //moving South direction trains a bit so they don't overlap with North trains on the same location and flicker.
  //           const preventFlicker = function() {
  //             switch (direction) {
  //               case "North":
  //                 return {
  //                   latitude: parseFloat(minutesLeft["latitude"]) - 0.0001,
  //                   longitude: parseFloat(minutesLeft["longitude"]) - 0.0001
  //                 };
  //               case "South":
  //                 return {
  //                   latitude: parseFloat(minutesLeft["latitude"]) + 0.0001,
  //                   longitude: parseFloat(minutesLeft["longitude"]) + 0.0001
  //                 };
  //               default:
  //                 break;
  //             }
  //           };

  //           const nextStation = function() {
  //             switch (minutes) {
  //               case "Leaving":
  //                 return `Leaving ${station.name}`;
  //               case "1":
  //                 return `Next Station: ${station.name} in ${minutes} min`;
  //               default:
  //                 return `Next Station: ${station.name} in ${minutes} mins`;
  //             }
  //           };

  //           return (
  //             <MapView.Marker
  //               key={index}
  //               coordinate={preventFlicker()}
  //               image={markerColor()}
  //               title={`${route.destination} Train`}
  //               description={nextStation()}
  //               zIndex={index}
  //             />
  //           );
  //         }
  //       })
  //     );
  //   });
  // }

  async _cacheResourcesAsync() {
    const images = [require('./assets/splash.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      ); }


      return (
        <View
          style={{
            flex: 1
          }}
        >
          <MapView
            style={{
              flex: 1
            }}
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
            {/* {this.renderTrain()} */}
          </MapView>
          <View style={{backgroundColor: '#0099CC' }}>
          <Text style={{fontSize: 12, color: 'white', marginLeft: 5}}>Last update at {this.state.lastUpdate}</Text>
          </View>
        </View>
      );
    // } else {
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <ImageBackground
    //         style={{ width: "100%", height: "100%" }}
    //         source={require("./assets/loading.png")}
    //       />
    //     </View>
    //   );
    // }
  }
}

// disabling tabs for now
//
// const AppNavigator = createStackNavigator({
//   Home: App,
//   Details: DetailsScreen
// });

// export default createAppContainer(AppNavigator);
