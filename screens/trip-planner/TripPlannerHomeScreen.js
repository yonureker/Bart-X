import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Modal,
  Button,
  Picker,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import SegmentedControlTab from "react-native-segmented-control-tab";

import StationList from "../../components/stationList";

const TripPlannerHomeScreen = () => {
  const {
    stations: { station },
  } = require("../../stations");
  const colorScheme = useColorScheme();
  const [dateModal, setDateModal] = useState(false);
  const [departurePicker, setDeparturePicker] = useState(false);
  const [destinationPicker, setDestinationPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [departure, setDeparture] = useState({name: 'Select Departure'});
  const [destination, setDestination] = useState({name: 'Select Destination'});

  console.log(departure.name);

  const changeTab = (index) => {
    setSelectedIndex(index);
  };

  const searchBarStyle =
    colorScheme === "dark" ? styles.darkSearchBar : styles.lightSearchBar;

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
            <Text>{departure.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.searchBar, searchBarStyle]}>
        <View style={{ width: "100%" }}>
          <TouchableOpacity onPress={() => setDestinationPicker(true)}>
            <Text>{destination.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.searchBar, searchBarStyle]}>
      <View style={{ width: "100%" }}>
        <TouchableOpacity onPress={() => setDateModal(true)}>
          <Text>
            {String(selectedDate).slice(0, 15)} /{" "}
            {String(selectedDate).slice(16, 21)}
          </Text>
        </TouchableOpacity>
        </View>
      </View>

      <Modal visible={dateModal} transparent>
        <View style={styles.modalContent}>
          <View style={styles.modalBox}>
            <View>
              <Button
                title="Cancel"
                onPress={() => setDateModal(false)}
              ></Button>
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
              onChange={(event, selectedDate) => setSelectedDate(selectedDate)}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={departurePicker} transparent>
        <View style={styles.modalContent}>
          <View style={styles.modalBox}>
            <View>
              <Button
                title="Cancel"
                onPress={() => setDeparturePicker(false)}
              ></Button>
            </View>
            <View>
              <Button
                title="Select"
                onPress={() => setDeparturePicker(false)}
              ></Button>
            </View>
          </View>
          <View>
            <Picker
              selectedValue={departure}
              onValueChange={(itemValue, itemIndex) => setDeparture(itemValue)}
            >
              {station.map((station) => (
                <Picker.Item
                  key={station.abbr}
                  label={station.name}
                  value={station}
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
              <Button
                title="Cancel"
                onPress={() => setDestinationPicker(false)}
              ></Button>
            </View>
            <View>
              <Button
                title="Select"
                onPress={() => setDestinationPicker(false)}
              ></Button>
            </View>
          </View>
          <View>
            <Picker
              selectedValue={destination}
              onValueChange={(itemValue, itemIndex) =>
                setDestination(itemValue)
              }
            >
              {station.map((station) => (
                <Picker.Item
                  key={station.abbr}
                  label={station.name}
                  value={station}
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
