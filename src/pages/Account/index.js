import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../../contexts/auth';
import NotLogged from '../NotLogged';
import AddPay from '../AddPay';
import AddFriend from '../AddFriend';

// Inner Pages
import Menu from './Menu';
import PersonalInformation from './PersonalInformation';
import PaymentMethods from './PaymentMethods';
import Address from './Address';
import Friends from './Friends';

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
    {
      id: 5,
      name: 'Address',
      component: Address,
      options: hideHeader,
    },
    {
      id: 6,
      name: 'Friends',
      component: Friends,
      options: hideHeader,
    },
    {
      id: 7,
      name: 'AddFriend',
      component: AddFriend,
      options: hideHeader,
    },
  ];

  function NotLoggedComponent(props) {
    return (
      <NotLogged {...props} title="Faça login para ver suas informações!" />
    );
  }

  return (
    <AccountStack.Navigator>
      {!signed ? (
        <AccountStack.Screen
          name="NotLogged"
          component={NotLoggedComponent}
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
