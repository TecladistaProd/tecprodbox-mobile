import React from 'react';

import {Dimensions} from 'react-native';

import s from 'styled-components/native';
const {width, height} = Dimensions.get('window');

export const ModalContainer = s.View`
  flex: 1;
  background-color: rgba(0, 0, 0, .7);
  justify-content: center;
  align-items: center;
`;

export const ModalView = s.View`
  padding-horizontal: 20;
  padding-vertical: 20;
  background-color: #fff;
  border-radius: 10;
  align-items: stretch;
  width: 290;
  min-height: 100;
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

export const Modal = s.Modal`
  flex: 1;
`;

export const Button = s.TouchableOpacity`
  height: 48;
  border-radius: 4;
  padding-horizontal: 20;
  margin-top: 10;
  background-color: ${props => props.color || '#7159c1'};
  justify-content: center;
  align-items: center;
`;

export const TextBtn = s.Text`
  font-weight: bold;
  font-size: 16;
  color: #fff;
`;

export const List = s.FlatList`
  margin-bottom: 10;
`;

export const Separator = s.View`
  height: 1;
  backgroundColor: #EEE;
`;
