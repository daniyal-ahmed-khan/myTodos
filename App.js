import React, {Component} from 'react';

import {View,Text} from 'react-native'

import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import Loading from './screens/loading';
import SignUp from './screens/signup';
import Login from './screens/login';
import Home from './screens/home';

const App = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home
  },
  {
    initialRouteName: 'Loading'
  }
)

const AppContainer = createAppContainer(App);

export default AppContainer;



