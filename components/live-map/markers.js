import React, { useState } from "react";
import MapView from "react-native-maps";

import Callouts from "./callouts";
import station_ios from "../../assets/station_ios.png";
import station_android from "../../assets/station_android.png";
import { Platform } from "react-native";

export default function Markers() {
  const {
    stations: { station }
  } = require("../../bartData/stations");

  const [clickedMarkerRef, setClickedMarkerRef] = useState({});

  return station.map((trainStation, index) => {
    return (
      <MapView.Marker
        key={trainStation.abbr}
        coordinate={{
          latitude: parseFloat(trainStation.gtfs_latitude),
          longitude: parseFloat(trainStation.gtfs_longitude)
        }}
        image={Platform.OS === "ios" ? station_ios : station_android}
        zIndex={100}
        tracksInfoWindowChanges={true}
        onPress={() => setClickedMarkerRef(index)}
      >
        <Callouts
          key={trainStation.abbr}
          stationName={trainStation.name}
          stationAbbr={trainStation.abbr}
          showCallOut={clickedMarkerRef === index}
        />
      </MapView.Marker>
    );
  });
}
