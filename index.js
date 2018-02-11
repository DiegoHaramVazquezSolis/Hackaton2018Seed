import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import {
    Platform,
    StyleSheet,
    Text,
    View
  } from 'react-native';

const store = configureStore();

const RC = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('cualquierNombre', () => RC);
