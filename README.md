## BartLiveMobile

BartLiveMobile is a mobile app that displays real-time BART departures with the help of [BART API](http://api.bart.gov/docs/overview/index.aspx).

* [Download on the Apple Store](https://apps.apple.com/us/app/bartlivemobile/id1480753570)
* Google Play app currently under review. Will be published soon.

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

### User Location

- Asks for permission to track user locations and zooms the map to their coordinates. expo-location package is used with the function below::

```javascript
const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      // location is set to [37.792874, -122.39703] if permission is not granted.
      setLocation({ coords: { latitude: 37.792874, longitude: -122.39703 } });
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      coords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
  };
```

- User's location is requested before component loads:

```javascript
useEffect(() => {
    getLocation();
  }, []);
```

### Real Time BART data

- Receiving the real time data is done by a simple fetch function. 

```javascript
const fetchBartData = () => {
    fetch(
      "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
      .then(response => response.json())
      .then(responseJson => {
        setStationList(responseJson.root.station);
        setLastUpdate(responseJson.root.time);
      })
      .catch(error => {
        console.log(error);
      });
  };
  ```



### Author

Built with :heart: by Onur Eker.
