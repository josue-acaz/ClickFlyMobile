import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Airplane from './Airplane';
import Discover from './Discover';

const AircraftStack = createStackNavigator();
const hideHeader = {headerShown: false};

export default function Aircraft() {
  const routes = [
    {
      name: "Airplane",
      component: Airplane,
      options: hideHeader,
    },
    {
      name: "Discover",
      component: Discover,
      options: hideHeader,
    },
  ];

  return (
    <AircraftStack.Navigator>
      {routes.map((route, index) => (
        <AircraftStack.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </AircraftStack.Navigator>
  );
}
