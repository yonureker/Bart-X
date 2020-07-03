import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Button,
  Picker,
  Alert,
  Platform
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import SegmentedControlTab from "react-native-segmented-control-tab";
import moment from "moment";

const TripPlannerHomeScreen = props => {
  const {
    stations: { station }
  } = require("../../stations");
  const colorScheme = useColorScheme();
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [departurePicker, setDeparturePicker] = useState(false);
  const [destinationPicker, setDestinationPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [option, setOption] = useState("depart");

  const [departure, setDeparture] = useState({
    abbr: "ASHB",
    address: "3100 Adeline Street",
    city: "Berkeley",
    county: "alameda",
    gtfs_latitude: "37.852803",
    gtfs_longitude: "-122.270062",
    name: "Ashby",
    state: "CA",
    zipcode: "94703"
  });
  const [destination, setDestination] = useState({
    abbr: "DUBL",
    address: "5801 Owens Dr.",
    city: "Pleasanton",
    county: "alameda",
    gtfs_latitude: "37.701687",
    gtfs_longitude: "-121.899179",
    name: "Dublin/Pleasanton",
    state: "CA",
    zipcode: "94588"
  });

  const selectedLocalTime = moment(selectedTime).format("hh:mma");
  const selectedLocalDate = moment(selectedDate).format("MM/DD/YYYY");

  const changeTab = index => {
    setSelectedIndex(index);

    if (index === 0) {
      setOption("depart");
    } else {
      setOption("arrive");
    }
  };

  const searchBarStyle =
    colorScheme === "dark" ? styles.darkSearchBar : styles.lightSearchBar;

  const colorStyle = colorScheme === "dark" ? "white" : "black";

  return (
    <View style={styles.container}>
      <View style={{ width: "95%" }}>
        <SegmentedControlTab
          values={["Depart At", "Arrive At"]}
          selectedIndex={selectedIndex}
          tabStyle={{
            borderRadius: 10,
            borderColor: colorScheme === "dark" ? "black" : "white",
            backgroundColor: "white",
            height: 40,
            marginBottom: 5,
            marginTop: 5
          }}
          lastTabStyle={{ marginLeft: 10 }}
          borderRadius={10}
          onTabPress={changeTab}
        />
      </View>

      <View style={{ width: "95%" }}>
        <View style={[styles.searchBar, searchBarStyle]}>
          <View style={{ width: "100%" }}>
            {Platform.OS === "ios" && (
              <TouchableOpacity onPress={() => setDeparturePicker(true)}>
                <Text style={{ color: colorStyle }}>{departure.name}</Text>
              </TouchableOpacity>
            )}

            {Platform.OS === "android" && (
              <Picker
                selectedValue={departure.name}
                onValueChange={(itemValue, itemIndex) =>
                  setDeparture(station[itemIndex])
                }
              >
                {station.map(station => (
                  <Picker.Item
                    key={station.name}
                    label={station.name}
                    value={station.name}
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>
        <View style={[styles.searchBar, searchBarStyle]}>
          <View style={{ width: "100%" }}>
            {Platform.OS === "ios" && (
              <TouchableOpacity onPress={() => setDestinationPicker(true)}>
                <Text style={{ color: colorStyle }}>{destination.name}</Text>
              </TouchableOpacity>
            )}

            {Platform.OS === "android" && (
              <Picker
                selectedValue={destination.name}
                onValueChange={(itemValue, itemIndex) =>
                  setDestination(station[itemIndex])
                }
              >
                {station.map(station => (
                  <Picker.Item
                    key={station.name}
                    label={station.name}
                    value={station.name}
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.searchBar, searchBarStyle, { width: "48%" }]}>
            <View>
              <TouchableOpacity onPress={() => setDateModal(true)}>
                <Text style={{ color: colorStyle }}>{selectedLocalDate}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.searchBar, searchBarStyle, { width: "48%" }]}>
            <View>
              <TouchableOpacity onPress={() => setTimeModal(true)}>
                <Text style={{ color: colorStyle }}>{selectedLocalTime}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.searchBar,
            searchBarStyle,
            { backgroundColor: "#4DCA55" }
          ]}
        >
          <View
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <TouchableOpacity
              onPress={() => {
                if (departure.name === destination.name) {
                  return Alert.alert(
                    `Destination and departure can't be the same`
                  );
                }

                props.navigation.navigate("TripPlanner Results Navigator", {
                  option: option,
                  departure: departure,
                  destination: destination,
                  time: selectedLocalTime,
                  date: selectedLocalDate
                });
              }}
            >
              <Text style={{ alignSelf: "center" }}>Find Trains</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {Platform.OS === "ios" && (
        <Modal visible={dateModal} transparent>
          <View style={styles.modalContent}>
            {Platform.OS === "ios" && (
              <View style={styles.modalBox}>
                <View></View>
                <View>
                  <Button
                    title="Select Date"
                    onPress={() => setDateModal(false)}
                  ></Button>
                </View>
              </View>
            )}

            <View>
              <DateTimePicker
                mode="date"
                value={selectedDate}
                onChange={(event, date) => {
                  setSelectedDate(date);
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === "android" && dateModal && (
        <DateTimePicker
          mode="date"
          value={selectedDate}
          onChange={(event, date) => {
            if (date === undefined) {
              setDateModal(false);
            } else {
              setDateModal(false);
              setSelectedDate(date);
            }
          }}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={timeModal} transparent>
          <View style={styles.modalContent}>
            <View style={styles.modalBox}>
              <View></View>
              <View>
                <Button
                  title="Select Time"
                  onPress={() => setTimeModal(false)}
                ></Button>
              </View>
            </View>
            <View>
              <DateTimePicker
                mode="time"
                value={selectedTime}
                onChange={(event, time) => {
                  setSelectedTime(time);
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === "android" && timeModal && (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={selectedTime}
          onChange={(event, time) => {
            if (time === undefined) {
              setTimeModal(false);
            } else {
              setTimeModal(false);
              setSelectedTime(time);
            }
          }}
        />
      )}

      <Modal visible={departurePicker} transparent>
        <View style={styles.modalContent}>
          <View style={styles.modalBox}>
            <View></View>
            <View>
              <Button
                title="Select Departure"
                onPress={() => setDeparturePicker(false)}
              ></Button>
            </View>
          </View>
          <View>
            <Picker
              selectedValue={departure.name}
              onValueChange={(itemValue, itemIndex) =>
                setDeparture(station[itemIndex])
              }
            >
              {station.map(station => (
                <Picker.Item
                  key={station.name}
                  label={station.name}
                  value={station.name}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      <Modal visible={destinationPicker} transparent>
        <View style={styles.modalContent}>
          <View style={styles.modalBox}>
            <View></View>
            <View>
              <Button
                title="Select Destination"
                onPress={() => setDestinationPicker(false)}
              ></Button>
            </View>
          </View>
          <View>
            <Picker
              selectedValue={destination.name}
              onValueChange={(itemValue, itemIndex) =>
                setDestination(station[itemIndex])
              }
            >
              {station.map(station => (
                <Picker.Item
                  key={station.name}
                  label={station.name}
                  value={station.name}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    // width: "95%",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 5
  },
  lightSearchBar: {
    backgroundColor: "#E6E8ED"
  },
  darkSearchBar: {
    backgroundColor: "#434447"
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%"
  },
  modalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  }
});

export default TripPlannerHomeScreen;

// <DatePicker
