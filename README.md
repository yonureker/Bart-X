# BartLive!

BartLiveMobile is a mobile app that displays real-time estimated departures using the data fetched from [BART API](http://api.bart.gov/docs/overview/index.aspx).

![](https://i.ibb.co/b2ZKBYK/Slice-1.png)

View on [Snack](https://snack.expo.io/@onureker/587be4). 


# Functionality

- Asks for permission to track user locations and zooms the map to their coordinates. expo-location package is used with the function below:

```_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };```

- User's location is requested before component loads:

```componentWillMount() {
    this._getLocationAsync();
  }```


- Stations display snippets on press.
- Real-time departure times are received from BART API.


# Technologies and Technical Challenges

## Technologies:

- Frontend: [React Native](https://facebook.github.io/react-native/)
- [Google Maps API](https://developers.google.com/maps/documentation/)
- [Bart API](https://api.bart.gov/docs/overview/index.aspx)
- [React-native-maps](https://github.com/react-native-community/react-native-maps)

## Technical Challenges:

Although, BART provides real time data on arrival times; it doesn't provide the exact location of trains. Therefore, we need to calculate the position of the train given the arrival data to a station. 

Each station has a list of waypoints given estimated arrival time(minutes):

```{
  "12TH": {
    name: "12th St. Oakland City Center",
    gtfs_latitude: "37.803768",
    gtfs_longitude: "-122.271450",
    waypoints: {
      South: {
        Leaving: {
          latitude: "37.803768",
          longitude: "-122.271450"
        },
        "1": {
          latitude: "37.806312",
          longitude: "-122.269998"
        }
      },
      North: {
        Leaving: {
          latitude: "37.803768",
          longitude: "-122.271450"
        },
        "3": {
          latitude: "37.803091",
          longitude: "-122.289439"
        },
        "2": {
          latitude: "37.801531",
          longitude: "-122.283603"
        },
        "1": {
          latitude: "37.798886",
          longitude: "-122.276479"
        }
      }
    }
  }
}```