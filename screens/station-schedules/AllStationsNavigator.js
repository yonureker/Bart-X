import { createStackNavigator } from "react-navigation-stack";

import StationListScreen from "./StationListScreen";
import StationDetailsScreen from "./StationDetailsScreen";

const AllStationsNavigator = createStackNavigator(
  {
    StationList: StationListScreen,
    StationDetails: StationDetailsScreen
  },
  {
    initialRouteName: "StationList"
  }
);

export default AllStationsNavigator;
