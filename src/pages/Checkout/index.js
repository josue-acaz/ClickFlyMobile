import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Client from './Client';
import Passengers from './Passengers';
import ProvideInformation from './ProvideInformation';
import Purchase from './Purchase';
import ViewPay from './ViewPay';
import ViewSlip from './ViewSlip';
import AddPay from '../AddPay';
import AddFriend from '../AddFriend';

const CheckoutStack = createStackNavigator();
const hideHeader = {headerShown: false};

export default function Checkout() {
  const routes = [
    {
      id: 1,
      name: 'Client',
      component: Client,
      options: hideHeader,
    },
    {
      id: 2,
      name: 'Passengers',
      component: Passengers,
      options: hideHeader,
    },
    {
      id: 3,
      name: 'ProvideInformation',
      component: ProvideInformation,
      options: hideHeader,
    },
    {
      id: 4,
      name: 'AddPay',
      component: AddPay,
      options: hideHeader,
    },
    {
      id: 5,
      name: 'AddFriend',
      component: AddFriend,
      options: hideHeader,
    },
    {
      id: 6,
      name: 'Purchase',
      component: Purchase,
      options: hideHeader,
    },
    {
      id: 7,
      name: 'ViewPay',
      component: ViewPay,
      options: hideHeader,
    },
    {
      id: 8,
      name: 'ViewSlip',
      component: ViewSlip,
      options: hideHeader,
    },
  ];

  return (
    <CheckoutStack.Navigator>
      {routes.map((route) => (
        <CheckoutStack.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </CheckoutStack.Navigator>
  );
}