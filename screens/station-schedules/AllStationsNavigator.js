import StationListScreen from "./StationListScreen";
import StationDetailsScreen from "./StationDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Stack = createStackNavigator();

export default function AllStationsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="StationList"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Closest Stations" component={StationListScreen} />
      <Stack.Screen
        name="StationDetails"
        component={StationDetailsScreen}
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerLeft: () => (
            <Ionicons
              name="md-locate"
              size={30}
              color="black"
              style={{ marginLeft: 20 }}
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
};