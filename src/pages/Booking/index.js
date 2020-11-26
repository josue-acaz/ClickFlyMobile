import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screen} from '../../components';

import Reservations from './Reservations';
import Tickets from './Tickets';
import BookingDetails from './BookingDetails';

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
      id: 2,
      name: 'BookingDetails',
      component: BookingDetails,
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
