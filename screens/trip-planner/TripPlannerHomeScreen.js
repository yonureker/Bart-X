import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Button, Picker } from "react-native";
import { useColorScheme } from "react-native-appearance";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import SegmentedControlTab from "react-native-segmented-control-tab";

const TripPlannerHomeScreen = (props) => {
  const {
    stations: { station },
  } = require("../../stations");
  const colorScheme = useColorScheme();
  const [dateModal, setDateModal] = useState(false);
  const [departurePicker, setDeparturePicker] = useState(false);
  const [destinationPicker, setDestinationPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(
    updateTimeFormat(new Date())
  );
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
    zipcode: "94703",
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
    zipcode: "94588",
  });

  // console.log(`selectedDate is ${selectedDate.toLocaleDateString()}`);
  // console.log(`selectedTime is ${selectedTime}`);

  // console.log(option)

  // current Selected Date Sun Jun 14 2020 16:53:29 GMT-0700 (PDT)
  // need date as mm/dd/yyyy      04/30/2020
  // need time as h:mm+am/pm      03:33pm

  function updateTimeFormat(x) {
    let splitted = x.toLocaleTimeString().split(" ");
    const time = splitted[0];
    const period = splitted[1];
    const formatted = time.slice(0, time.length - 3) + period.toLowerCase();

    return formatted;
  }

  const changeTab = (index) => {
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
            borderColor: "#E6E8ED",
            backgroundColor: "white",
            height: 40,
            marginBottom: 5,
            marginTop: 5,
          }}
          lastTabStyle={{ marginLeft: 10 }}
          borderRadius={10}
          onTabPress={changeTab}
        />
      </View>

      <View style={[styles.searchBar, searchBarStyle]}>
        <View style={{ width: "100%" }}>
          <TouchableOpacity onPress={() => setDeparturePicker(true)}>
            <Text style={{ color: colorStyle }}>{departure.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.searchBar, searchBarStyle]}>
        <View style={{ width: "100%" }}>
          <TouchableOpacity onPress={() => setDestinationPicker(true)}>
            <Text style={{ color: colorStyle }}>{destination.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.searchBar, searchBarStyle]}>
        <View style={{ width: "100%" }}>
          <TouchableOpacity onPress={() => setDateModal(true)}>
            <Text style={{ color: colorStyle }}>
              {String(selectedDate).slice(0, 15)} /{" "}
              {String(selectedDate).slice(16, 21)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.searchBar,
          searchBarStyle,
          { backgroundColor: "#4DCA55" },
        ]}
      >
          <View style={{ width: "100%",height: '100%', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("TripPlanner Results", {
                  option: option,
                  departure: departure,
                  destination: destination,
                  time: selectedTime,
                  date: selectedDate.toLocaleDateString(),
                })
              }
            >
              <Text style={{alignSelf: 'center'}}>Find Trains</Text>
            </TouchableOpacity>
          </View>
      </View>

      <Modal visible={dateModal} transparent>
        <View style={styles.modalContent}>
          <View style={styles.modalBox}>
            <View>
              {/* <Button
                title="Now"
                onPress={() => setSelectedDate(new Date())}
              ></Button> */}
            </View>
            <View>
              <Button
                title="Select"
                onPress={() => setDateModal(false)}
              ></Button>
            </View>
          </View>
          <View>
            <DateTimePicker
              mode="datetime"
              value={selectedDate}
              onChange={(event, selectedDate) => {
                setSelectedTime(updateTimeFormat(selectedDate));
                setSelectedDate(selectedDate);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={departurePicker} transparent>
        <View style={styles.modalContent}>
          <View style={styles.modalBox}>
            <View>
              {/* <Button
                title="Cancel"
                onPress={() => setDeparturePicker(false)}
              ></Button> */}
            </View>
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
              {station.map((station) => (
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
            <View>
              {/* <Button
                title="Cancel"
                onPress={() => setDestinationPicker(false)}
              ></Button> */}
            </View>
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
              {station.map((station) => (
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
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    width: "95%",
    borderColor: "#E6E8ED",
    borderRadius: 10,
    paddingLeft: 10,
    // paddingRight: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  lightSearchBar: {
    backgroundColor: "#E6E8ED",
  },
  darkSearchBar: {
    backgroundColor: "#434447",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
  },
  modalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});

export default TripPlannerHomeScreen;
