import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScreenProvider} from '../contexts/screen';
import {useAuth} from '../contexts/auth';

import Account from '../pages/Account';
import Booking from '../pages/Booking';
import Flight from '../pages/Flight';

const HomeTab = createBottomTabNavigator();

export default function Home() {
  const {signed} = useAuth();
  const tabBarOptions = {
    activeTintColor: '#00B2A9',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'rgb(255, 255, 255)',
    },
  };

  const routes = [
    {
      id: 1,
      name: 'Voar',
      component: Flight,
      options: ({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        return {
          tabBarVisible: routeName === 'EmptyLegs' || !routeName,
        };
      },
    },
    {
      id: 2,
      name: 'Reservas',
      component: Booking,
      options: ({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        return {
          tabBarVisible: routeName === 'Reservations' || !routeName,
        };
      },
    },
    {
      id: 3,
      name: 'Conta',
      component: Account,
      options: ({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        return {
          tabBarVisible:
            routeName === 'Menu' || routeName === 'NotLogged' || !routeName,
        };
      },
    },
  ];

  return (
    <ScreenProvider>
      <HomeTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            switch (route.name) {
              case 'Voar':
                return (
                  <MaterialIcons name="flight" size={size} color={color} />
                );
              case 'Conta':
                return <FontAwesome name="user-o" size={size} color={color} />;
              case 'Reservas':
                return <FontAwesome name="ticket" size={size} color={color} />;
              default:
                break;
            }
          },
        })}
        tabBarOptions={tabBarOptions}>
        {routes.map(function (route) {
          return (
            (!(route.name === 'Reservas') || signed) && (
              <HomeTab.Screen
                key={route.id}
                name={route.name}
                component={route.component}
                options={route.options}
              />
            )
          );
        })}
      </HomeTab.Navigator>
    </ScreenProvider>
  );
}
