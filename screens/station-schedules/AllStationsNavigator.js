import StationListScreen from "./StationListScreen";
import StationDetailsScreen from "./StationDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useColorScheme } from "react-native-appearance";
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator();

export default function AllStationsNavigator(props) {
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
          ),
          headerRight: () => (
            <MaterialIcons
              name={
                SecureStore.getItemAsync(route.params.abbr) !== "true"
                  ? "favorite"
                  : "favorite-border"
              }
              size={30}
              color="red"
              style={{ marginRight: 20 }}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}
