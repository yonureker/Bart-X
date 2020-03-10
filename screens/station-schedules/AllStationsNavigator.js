import StationListScreen from "./StationListScreen";
import StationDetailsScreen from "./StationDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useColorScheme } from "react-native-appearance";

const Stack = createStackNavigator();

export default function AllStationsNavigator() {
  const scheme = useColorScheme();

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
          headerForceInset: { top: "never", bottom: "never" },
          headerLeft: () => (
            <Ionicons
              name="md-locate"
              size={30}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.goBack()}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}
