import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from '../AboutScreen'

const Drawer = createDrawerNavigator();

export default function MoreNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
    </Drawer.Navigator>
  );
};