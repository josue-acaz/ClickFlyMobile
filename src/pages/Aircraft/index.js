import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ViewAircraft from './ViewAircraft';
import Discover from './Discover';

const AircraftStack = createStackNavigator();
const hideHeader = {headerShown: false};

export default function Aircraft() {
  const routes = [
    {
      id: 1,
      name: 'ViewAircraft',
      component: ViewAircraft,
      options: hideHeader,
    },
    {
      id: 2,
      name: 'Discover',
      component: Discover,
      options: hideHeader,
    },
  ];

  return (
    <AircraftStack.Navigator>
      {routes.map((route) => (
        <AircraftStack.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </AircraftStack.Navigator>
  );
}
