import React, { useState, useEffect } from "react";


import StationListScreen from './StationListScreen';
import StationDetailsScreen from './StationDetailsScreen'
import { createStackNavigator } from "react-navigation-stack";

const ListScreen = createStackNavigator(
  {
    StationList: StationListScreen,
    StationDetails: StationDetailsScreen,
  },
  {
    initialRouteName: 'StationList',
  }
)



export default ListScreen;
