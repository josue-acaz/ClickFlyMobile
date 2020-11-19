import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';

const AppStack = createStackNavigator();
const hideHeader = {headerShown: false};

const AppRoutes = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={Home} options={hideHeader} />
  </AppStack.Navigator>
);

export default AppRoutes;
