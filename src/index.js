import React from 'react';
import {YellowBox, View, StyleSheet, StatusBar} from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from './routes';

const App = () => (
  <View style={view}>
    <StatusBar backgroundColor="rgba(20,20,20, .3)" />
    <Routes />
  </View>
);

export default App;

const {view} = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
