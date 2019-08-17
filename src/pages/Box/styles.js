import React from 'react';
import s from 'styled-components/native';
import {Platform} from 'react-native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = s.View`
  padding-horizontal: 20;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0};
  flex: 1;
`;

export const BoxTitle = s.Text`
  margin-top: 50;
  text-align: center;
  font-size: 24;
  font-weight: bold;
  color: #333;
`;

export const List = s.FlatList`
  margin-top: 30;
`;

export const Separator = s.View`
  height: 1;
  backgroundColor: #EEE;
`;

export const Fab = s.TouchableOpacity`
  position: absolute;
  right: 30;
  bottom: ${30 + getBottomSpace()};
  width: 60;
  height: 60;
  backgroundColor: #7159c1;
  borderRadius: 30;
  alignItems: center;
  justifyContent: center;
`;
