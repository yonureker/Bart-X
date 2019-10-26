### The App

BartLiveMobile is a mobile app that displays real-time estimated departures using the data fetched from [BART API](http://api.bart.gov/docs/overview/index.aspx).

[Download on the Apple Store](https://apps.apple.com/us/app/bartlivemobile/id1480753570)

![](https://i.ibb.co/b2ZKBYK/Slice-1.png)

### Functionality

- Asks for permission to track user locations and zooms the map to their coordinates. expo-location package is used with the function below::

```
_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
```

- User's location is requested before component loads:

```
componentWillMount() {
    this._getLocationAsync();
  }
```

- Stations display snippets on press.
- Real-time departure times are received from BART API.

### Technologies:

- Frontend: [React Native](https://facebook.github.io/react-native/)
- Javascript
- [Expo](https://expo.io/)
- [Google Maps API](https://developers.google.com/maps/documentation/)
- [Bart API](https://api.bart.gov/docs/overview/index.aspx)
- [React-native-maps](https://github.com/react-native-community/react-native-maps)

