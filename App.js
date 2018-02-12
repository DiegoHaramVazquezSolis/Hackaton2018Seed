/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './styles';
import HomeScreen from './components/HomeScreen';
import ReportScreen from './components/ReportScreen';
import ReportePerfilScreen from './components/ReportePerfilScreen';

const RootStack = StackNavigator ({
    Home: {
      screen: HomeScreen
    },
    Report: {
      screen: ReportScreen
    },
    ReportProfile: {
      screen: ReportePerfilScreen
    },
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends Component{
  render() {
    return (
        <RootStack />
    );
  }
}