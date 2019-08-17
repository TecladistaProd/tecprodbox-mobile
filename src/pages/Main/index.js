import React, {Component} from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Fab, Logo, Input, Button, TextBtn} from './styles';

import logo from '../../assets/logo.png';

class Main extends Component {
  state = {
    box_name: '',
  };

  async componentDidMount() {
    await AsyncStorage.setItem('@TecProdBox:box', '5d56d49089e10100179964e2');
    const box_id = await AsyncStorage.getItem('@TecProdBox:box');

    if (box_id) {
      this.props.navigation.navigate('Box');
    }
  }

  handleSignIn = async e => {
    let {box_name} = this.state;

    const response = await api.post('boxes', {
      title: box_name,
    });

    await AsyncStorage.setItem('@TecProdBox:box', response.data._id);

    box_name = '';
    this.setState({box_name});
    this.props.navigation.navigate('Box');
  };

  handleChangeText = box_name => {
    this.setState({box_name});
  };

  render() {
    return (
      <Container>
        <Logo source={logo} />
        <Input
          placeholder="Create a Box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={this.state.box_name}
          onChangeText={this.handleChangeText}
        />
        <Button onPress={this.handleSignIn}>
          <TextBtn>Create</TextBtn>
        </Button>
        <Fab onPress={() => {}}>
          <Icon name="folder-shared" size={24} color="#fff" />
        </Fab>
      </Container>
    );
  }
}

export default Main;
