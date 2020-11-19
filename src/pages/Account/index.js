import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../../contexts/auth';
import NotLogged from '../NotLogged';
import AddPay from '../AddPay';

// Inner Pages
import Menu from './Menu';
import PersonalInformation from './PersonalInformation';
import PaymentMethods from './PaymentMethods';

const AccountStack = createStackNavigator();
const hideHeader = {headerShown: false};

export default function Account() {
  const {signed} = useAuth();

  const routes = [
    {
      id: 1,
      name: 'Menu',
      component: Menu,
      options: hideHeader,
    },
    {
      id: 2,
      name: 'PersonalInformation',
      component: PersonalInformation,
      options: hideHeader,
    },
    {
      id: 3,
      name: 'PaymentMethods',
      component: PaymentMethods,
      options: hideHeader,
    },
    {
      id: 4,
      name: 'AddPay',
      component: AddPay,
      options: hideHeader,
    },
  ];

  return (
    <AccountStack.Navigator>
      {!signed ? (
        <AccountStack.Screen
          name="NotLogged"
          component={() => (
            <NotLogged title="Faça login para ver suas informações" />
          )}
          options={hideHeader}
        />
      ) : (
        routes.map((route) => (
          <AccountStack.Screen
            key={route.id}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      )}
    </AccountStack.Navigator>
  );
}
