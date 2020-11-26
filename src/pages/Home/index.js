import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../../contexts/auth';

import Account from '../Account';
import Booking from '../Booking';
import Flight from '../Flight';

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
  return (
    <HomeTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Voar') {
            return <MaterialIcons name="flight" size={size} color={color} />;
          } else if (route.name === 'Conta') {
            return <FontAwesome name="user-o" size={size} color={color} />;
          } else if (route.name === 'Reservas') {
            return <FontAwesome name="ticket" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={tabBarOptions}>
      <HomeTab.Screen
        name="Voar"
        component={Flight}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          return {
            tabBarVisible: routeName === 'EmptyLegs' || !routeName,
          };
        }}
      />
      {signed && (
        <HomeTab.Screen
          name="Reservas"
          component={Booking}
          options={({route}) => {
            const routeName = getFocusedRouteNameFromRoute(route);
            return {
              tabBarVisible: routeName === 'Reservations' || !routeName,
            };
          }}
        />
      )}
      <HomeTab.Screen
        name="Conta"
        component={Account}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          return {
            tabBarVisible:
              routeName === 'Menu' || routeName === 'NotLogged' || !routeName,
          };
        }}
      />
    </HomeTab.Navigator>
  );
}
