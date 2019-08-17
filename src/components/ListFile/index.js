import React, {Component} from 'react';

import {distanceInWords} from 'date-fns';
import en from 'date-fns/locale/en';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {File, FileInfo, FileTitle, FileDate} from './styles.js';

export default class ListFile extends Component {
  state = {
    lastPress: 0,
    timeout: null,
  };

  render() {
    const {item, openAlert} = this.props;
    return (
      <File onPress={() => openAlert(item)}>
        <FileInfo>
          <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
          <FileTitle>{item.title}</FileTitle>
        </FileInfo>
        <FileDate>
          {distanceInWords(item.createdAt, new Date(), {locale: en})} ago
        </FileDate>
      </File>
    );
  }
}
