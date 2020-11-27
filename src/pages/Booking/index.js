import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Reservations from './Reservations';
import Tickets from './Tickets';
import Instructions from './Instructions';

const BookingStack = createStackNavigator();
const hideHeader = {headerShown: false};

export default function Booking() {
  const routes = [
    {
      id: 1,
      name: 'Reservations',
      component: Reservations,
      options: hideHeader,
    },
    {
      id: 2,
      name: 'Tickets',
      component: Tickets,
      options: hideHeader,
    },
    {
      id: 3,
      name: 'Instructions',
      component: Instructions,
      options: hideHeader,
    },
  ];

  return (
    <BookingStack.Navigator>
      {routes.map((route) => (
        <BookingStack.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </BookingStack.Navigator>
  );
}
