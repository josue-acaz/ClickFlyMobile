import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../../contexts/auth';
import NotLogged from '../NotLogged';
import AddPay from '../AddPay';
import AddFriend from '../AddFriend';
import EditAddress from '../Address';

// Inner Pages
import Menu from './Menu';
import PersonalInformation from './PersonalInformation';
import PaymentMethods from './PaymentMethods';
import Addresses from './Addresses';
import Friends from './Friends';
import Photo from './Photo';

const AccountStack = createStackNavigator();
const hideHeader = {headerShown: false};

export default function Account() {
  const {signed} = useAuth();

  const routes = [
    {
      name: "Menu",
      component: Menu,
      options: hideHeader,
    },
    {
      name: "PersonalInformation",
      component: PersonalInformation,
      options: hideHeader,
    },
    {
      name: "PaymentMethods",
      component: PaymentMethods,
      options: hideHeader,
    },
    {
      name: "AddPay",
      component: AddPay,
      options: hideHeader,
    },
    {
      name: "Addresses",
      component: Addresses,
      options: hideHeader,
    },
    {
      name: "Friends",
      component: Friends,
      options: hideHeader,
    },
    {
      name: "AddFriend",
      component: AddFriend,
      options: hideHeader,
    },
    {
      name: 'Photo',
      component: Photo,
      options: hideHeader,
    },
    {
      name: 'EditAddress',
      component: EditAddress,
      options: hideHeader,
    }
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
        routes.map((route, index) => (
          <AccountStack.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      )}
    </AccountStack.Navigator>
  );
}
