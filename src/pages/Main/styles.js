import React from 'react';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import s from 'styled-components/native';

export const Container = s.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding-horizontal: 30;
`;

export const Logo = s.Image`
  align-self: center;
`;

export const Input = s.TextInput`
  height: 48;
  border-width: 1;
  border-color: #ddd;
  border-radius: 4;
  font-size: 16;
  padding-horizontal: 20;
  margin-top: 30;
`;

export const Button = s.TouchableOpacity`
  height: 48;
  border-radius: 4;
  padding-horizontal: 20;
  margin-top: 10;
  background-color: #7159c1;
  justify-content: center;
  align-items: center;
`;

export const TextBtn = s.Text`
  font-weight: bold;
  font-size: 16;
  color: #fff;
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
