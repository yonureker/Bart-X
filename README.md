## BartLiveMobile

BartLiveMobile is a mobile app that displays real-time BART departures with the data received from [BART API](http://api.bart.gov/docs/overview/index.aspx).

* [Download on Apple Store](https://apps.apple.com/us/app/bartlivemobile/id1480753570)
* [Download on Google Play](https://play.google.com/store/apps/details?id=com.onureker.bartlivemobile)

##  iPhone Screenshots

Station List | Real Time Departures | Map View | System Maps
------ | ------ | ------ | ------
![Image](https://i.imgur.com/uDjdHE9.png) | ![Image](https://i.imgur.com/YuT9EAY.png) | ![Image](https://i.imgur.com/TzzGPnC.png) | ![Image](https://i.imgur.com/2sekTXQ.png) |

## Android Screenshots

Station List | Real Time Departures | Map View | System Maps
------ | ------ | ------ | ------
![Image](https://i.imgur.com/Ew85IjH.png) | ![Image](https://i.imgur.com/aIw4RpH.png) | ![Image](https://i.imgur.com/aFm5EFs.png) | ![Image](https://i.imgur.com/bBG2Cfp.png) |

### Technologies:

- [React Native](https://facebook.github.io/react-native/)
- [React Navigation](https://reactnavigation.org/)
- [Redux](https://redux.js.org/)
- [React Native Maps](https://github.com/react-native-community/react-native-maps)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Expo](https://expo.io/)
- [Google Maps API](https://developers.google.com/maps/documentation/)
- [Bart API](https://api.bart.gov/docs/overview/index.aspx)
- Javascript


## Functionality

### Redux

The combination of Redux + React Navigation makes things very easy. Rather than passing params around with `() => props.navigation.navigate('MyScreen', params: {})`, using useSelector hook is a great way to pull whatever is needed from state.

User location, station locations and real time departures are placed in Redux store.

```javascript
import { combineReducers } from "redux";
import userLocationReducer from './userLocationReducer';
import trainDepartureReducer from './trainDepartureReducer';
import stationLocationReducer from "./stationLocationReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  trainDepartures: trainDepartureReducer,
  stationLocations: stationLocationReducer
})

export default rootReducer;
```

### Navigation

Using React Navigation for the first time, it was challenging to combine multiple navigations; but I am happy with the final product. The bottom navigator is setup in App.js file:

```javascript
const TabNavigator = createBottomTabNavigator(
  {
    "Station List": {
      screen: AllStationsScreen,
      navigationOptions: {
        //...
      }
    },
    "Live Map": {
      screen: LiveMapScreen,
      navigationOptions: {
        //...
      }
    },
    "System Map": {
      screen: SystemScreen,
      navigationOptions: {
        //...
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        //...
      }
    }
  },
  {
    initialRouteName: "Station List"
  }
);

const AppContainer = createAppContainer(TabNavigator);
```

The app also has a stack navigator to display train details screen after pressing on a station from the list:

```javascript
const AllStationsScreen = createStackNavigator(
  {
    StationList: StationListScreen,
    StationDetails: StationDetailsScreen
  },
  {
    initialRouteName: "StationList"
  }
);
```

System Map Tab features a top tab navigator for weekday vs. weekend maps:

```javascript
const SystemMapNavigator = createMaterialTopTabNavigator(
  {
    "Weekday & Saturday": {
      screen: WeekAndSatScreen,
      navigationOptions: {
        swipeEnabled: false
      }
    },
    Sunday: {
      screen: SundayScreen,
      navigationOptions: {
        swipeEnabled: false
      }
    }
  },
  {
    tabBarComponent: SafeAreaMaterialTopTabBar
  }
);
```

### User Location

- The app asks for user permission to track their location. The location is then dispatched to Redux store to be used for the calculation of closest stations and centering the map view around the coordinates.

```javascript
const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      dispatch({
        type: "RECEIVE_USER_LOCATION",
        payload: { coords: { latitude: 37.792874, longitude: -122.39703 } }
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

    dispatch({
      type: "RECEIVE_USER_LOCATION",
      payload: location
    });
  };
```

### Real Time BART data

- Receiving the real time data is done by a simple fetch function. The response is then dispatched to Redux store.

```javascript
const fetchTrainDepartures = () => {
    // setStationList(responseJson.root.station);
    // setLastUpdate(responseJson.root.time);)
    // call BART API
    fetch(
      "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson =>
        dispatch({
          type: "RECEIVE_TRAIN_DEPARTURE_DATA",
          payload: responseJson.root.station
        })
      )
      .catch(error => {
        console.log(error);
      });
  };
```

The app receives new data every 5 seconds.

```javascript
useEffect(() => {
    const intervalId = setInterval(fetchTrainDepartures, 5000);
    return () => clearInterval(intervalId);
  });
```

### Closest Stations

After receiving user location and station locations and dispatching them to redux store; the calculation is done with the help of geolib library.

```javascript
const calculateDistance = () => {
    // const userLocation = useSelector(state => state.userLocation);
    // const stations = useSelector(state => state.stationLocations);
    return stations.map(station => {
      return {
        ...station,
        distance: convertDistance(
          getDistance(
            {
              latitude: station.gtfs_latitude,
              longitude: station.gtfs_longitude
            },
            {
              latitude: String(userLocation.coords.latitude),
              longitude: String(userLocation.coords.longitude)
            }
          ),
          "mi"
        )
      };
    });
  };
```

### Author

Built with :heart: by Onur Eker - 2019.
