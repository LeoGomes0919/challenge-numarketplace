import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Store from '../pages/Store';
import Cart from '../pages/Cart';
import Completion from '../pages/Completion';

import logoImage from '../assets/logo.png';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      headerTitleAlign: 'center',
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName='Store'
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: () => <Image source={logoImage} />,
      }}
      name='Store'
      component={Store}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        headerTitle: () => <Image source={logoImage} />,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 5,
        },

        headerBackImage: () => <Icon name='chevron-left' size={24} />,
      }}
      name='Cart'
      component={Cart}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        headerTitle: () => <Image source={logoImage} />,
        headerLeft: () => null,
      }}
      name='Completion'
      component={Completion}
    />
  </App.Navigator>
);

export default AppRoutes;
