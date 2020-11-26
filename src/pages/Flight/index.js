import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EmptyLegs from './EmptyLegs';
import FlightDetails from './FlightDetails';
import TripSummary from './TripSummary';
import Aircraft from '../Aircraft';

import Checkout from '../Checkout';

const FlightStack = createStackNavigator();
const hideHeader = {headerShown: false};

export default function Flight() {
  const routes = [
    {
      id: 1,
      name: 'EmptyLegs',
      component: EmptyLegs,
      options: hideHeader,
    },
    {
      id: 2,
      name: 'FlightDetails',
      component: FlightDetails,
      options: hideHeader,
    },
    {
      id: 3,
      name: 'TripSummary',
      component: TripSummary,
      options: hideHeader,
    },
    {
      id: 4,
      name: 'Checkout',
      component: Checkout,
      options: hideHeader,
    },
    {
      id: 5,
      name: 'Aircraft',
      component: Aircraft,
      options: hideHeader,
    },
  ];

  return (
    <FlightStack.Navigator>
      {routes.map((route) => (
        <FlightStack.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </FlightStack.Navigator>
  );
}
