import React, { useState } from "react";
import MapView from "react-native-maps";

import Callouts from "./callouts";
import stationLogo from "../../assets/station.png";

export default function Markers() {
  const {
    stations: { station },
  } = require("../../stations");

  const [clickedMarkerRef, setClickedMarkerRef] = useState("");

  return station.map((trainStation, index) => {
    return (
      <MapView.Marker
        key={trainStation.abbr}
        coordinate={{
          latitude: parseFloat(trainStation.gtfs_latitude),
          longitude: parseFloat(trainStation.gtfs_longitude),
        }}
        image={stationLogo}
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
