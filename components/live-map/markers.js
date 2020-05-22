import React from "react";
import MapView from "react-native-maps";
import { View, Text } from "react-native";

import Callouts from "./callouts";
import stationLogo from "../../assets/station.png";

const Markers = React.memo(props => {
  const {
    stations: { station }
  } = require("../../stations");

  return station.map((trainStation, index) => {
    return (
      <MapView.Marker
        key={trainStation.abbr}
        coordinate={{
          latitude: parseFloat(trainStation.gtfs_latitude),
          longitude: parseFloat(trainStation.gtfs_longitude)
        }}
        image={stationLogo}
        zIndex={100}
        tracksInfoWindowChanges={true}
      >
        <Callouts
          key={trainStation.abbr}
          stationName={trainStation.name}
          stationAbbr={trainStation.abbr}
        />
      </MapView.Marker>
    );
  });
});

export default Markers;
