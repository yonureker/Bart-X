# BartLive!

BartLiveMobile is a mobile application which you track Bart trains on a map in real time. 

View on [Snack](https://snack.expo.io/@onureker/587be4). 


# Functionality

- Trains are colored by their routes.
- Trains and stations display snippets on p ress.
- The location of trains are updated by fetching data from Bart API.
- Asks for permission to track user locations and zooms the map to their coordinates.


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