import React, {Component} from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Fab, Logo, Input, Button, TextBtn} from './styles';

import logo from '../../assets/logo.png';

import ModalBoxes from '../../components/ModalBoxes';

class Main extends Component {
  state = {
    box_name: '',
    opened: false,
    boxes: [],
  };

  async componentDidMount() {
    const box_id = await AsyncStorage.getItem('@TecProdBox:box');
    const {data: boxes} = await api.get('boxes');

    if (box_id) {
      this.props.navigation.navigate('Box');
    } else {
      this.setState({boxes});
    }
  }

  handleSignIn = async e => {
    let {box_name} = this.state;

    const response = await api.post('boxes', {
      title: box_name,
    });

    box_name = '';
    this.setState({box_name});
    this.enterBox(response.data._id);
  };

  enterBox = async box_id => {
    await AsyncStorage.setItem('@TecProdBox:box', box_id);
    this.props.navigation.navigate('Box');
  };

  handleChangeText = box_name => {
    this.setState({box_name});
  };

  toogleOpened = () => {
    let {opened} = this.state;
    opened = !opened;
    this.setState({opened});
  };

  render() {
    return (
      <Container>
        <ModalBoxes
          boxes={this.state.boxes}
          closeModal={this.toogleOpened}
          opened={this.state.opened}
          enterBox={this.enterBox}
        />
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
        <Fab onPress={this.toogleOpened}>
          <Icon name="folder-shared" size={24} color="#fff" />
        </Fab>
      </Container>
    );
  }
}

export default Main;
