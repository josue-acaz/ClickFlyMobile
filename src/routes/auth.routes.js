import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import HomeGuest from './app.routes';

const AuthStack = createStackNavigator();
const hideHeader = {headerShown: false};

const routes = [
  {
    id: 1,
    name: 'Main',
    component: Main,
    options: hideHeader,
  },
  {
    id: 2,
    name: 'SignIn',
    component: SignIn,
    options: hideHeader,
  },
  {
    id: 3,
    name: 'SignUp',
    component: SignUp,
    options: hideHeader,
  },
  {
    id: 4,
    name: 'ForgotPassword',
    component: ForgotPassword,
    options: hideHeader,
  },
  {
    id: 5,
    name: 'HomeGuest',
    component: HomeGuest,
    options: hideHeader,
  },
];

const AuthRoutes = () => (
  <AuthStack.Navigator>
    {routes.map((route) => (
      <AuthStack.Screen
        key={route.id}
        name={route.name}
        component={route.component}
        options={route.options}
      />
    ))}
  </AuthStack.Navigator>
);

export default AuthRoutes;
