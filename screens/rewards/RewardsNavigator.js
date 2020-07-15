import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RewardsHome from './RewardsHome';
import RewardsPhoneScreen from './RewardsPhoneScreen';
import VerifyCodeScreen from './VerifyCodeScreen';

const Stack = createStackNavigator();

export default function RewardsNavigator(props){
  return (
    <Stack.Navigator initialRouteName="Rewards Home" screenOptions={{headerTitleStyle: {fontSize: 18}}} >
      <Stack.Screen name="Rewards Home" component={RewardsHome} options={{title: 'Bart X Rewards', headerTitleAlign: 'center'}} />
      <Stack.Screen name="Rewards Phone Screen" component={RewardsPhoneScreen} options={{title: 'Enter Phone Number', headerTitleAlign: 'center'}} />
      <Stack.Screen name="Verify Code" component={VerifyCodeScreen} options={{title: 'Verify Code', headerTitleAlign: 'center'}} />
    </Stack.Navigator>
  )
}