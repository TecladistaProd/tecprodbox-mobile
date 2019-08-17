import React, {Component} from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import socket from 'socket.io-client';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/FontAwesome5';

import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import {Container, BoxTitle, List, Separator, Fab} from './styles';

import ListFile from '../../components/ListFile';

import Modal from '../../components/ModalChange';

class Box extends Component {
  state = {
    box: {},
    holded: false,
    opened: false,
    file: {},
  };

  async componentDidMount() {
    const box_id = await AsyncStorage.getItem('@TecProdBox:box');
    this.subscribeToNewFiles(box_id);
    try {
      const {data: box} = await api.get(`boxes/${box_id}`);
      this.setState({box});
    } catch (err) {
      await this.returnHome();
    }
  }

  subscribeToNewFiles = box_id => {
    const io = socket(
      'https://tecprodbox-backend.herokuapp.com',
      // 'http://localhost:9000',
    );
    io.emit('connect_room', box_id);
    io.on('file', data => {
      this.setState({
        box: {...this.state.box, files: [data, ...this.state.box.files]},
      });
    });
    io.on('remove', _id => {
      const {box} = this.state;
      box.files = box.files.filter(i => i._id !== _id);
      this.setState({box});
    });
    io.on('changed', file => {
      const {box} = this.state;
      let index = box.files.findIndex(i => i._id === file._id);
      box.files[index] = file;
      this.setState({box});
    });
  };

  handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async upload => {
      // fs
      if (upload.error) {
        return null;
      } else if (upload.didCancel) {
        return null;
      } else {
        // console.log(upload);
        const data = new FormData();
        const [prefix, sufix] = upload.fileName.split('.');
        const ext = sufix.toLowerCase() === 'heic' ? 'jpg' : sufix;
        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });
        await api.post(`boxes/${this.state.box._id}/files`, data);
      }
    });
  };

  openFile = async file => {
    try {
      const filepath = `${RNFS.DocumentDirectoryPath}/${file.title}`;
      await RNFS.downloadFile({
        fromUrl: file.url,
        toFile: filepath,
      });
      setTimeout(async () => await RNFS.unlink(filepath), 7000);
      await FileViewer.open(filepath);
    } catch (err) {
      return null; // Error
    }
  };

  closeModal = async cName => {
    if (cName && typeof cName === 'string') {
      try {
        await api.put(`files/${this.state.file._id}`, {
          new_name: `${cName}.${this.state.file.title.split('.')[1]}`,
        });
      } catch (err) {}
    }
    this.setState({file: {}, opened: false});
  };

  returnHome = async () => {
    await AsyncStorage.removeItem('@TecProdBox:box');
    this.props.navigation.navigate('Main');
  };

  openAlert = file => {
    Alert.alert(
      'File Managment',
      'What do you want to do ?',
      [
        {
          text: 'Edit File Name',
          onPress: async () => {
            this.setState({opened: true, file});
          },
        },
        {
          text: 'Open File',
          onPress: async () => {
            await this.openFile(file);
          },
        },
        {
          text: 'Delete File',
          onPress: async () => {
            try {
              const r = await api.delete(`files/${file._id}`);
            } catch (err) {
              console.log(err.message);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {box} = this.state;
    return (
      <Container>
        <Modal
          closeModal={this.closeModal}
          file={this.state.file}
          opened={this.state.opened}
        />
        <BoxTitle>{box.title}</BoxTitle>
        {box.files && (
          <List
            data={box.files}
            keyExtractor={file => file._id}
            ItemSeparatorComponent={() => <Separator />}
            renderItem={({item}) => (
              <ListFile item={item} openAlert={this.openAlert} />
            )}
          />
        )}
        {!this.state.holded && (
          <Fab
            onPress={this.handleUpload}
            onLongPress={() => this.setState({holded: true})}>
            <Icon name="cloud-upload" size={24} color="#fff" />
          </Fab>
        )}
        {this.state.holded && (
          <Fab
            onPress={this.returnHome}
            onLongPress={() => this.setState({holded: false})}>
            <Icon name="home" size={24} color="#fff" />
          </Fab>
        )}
      </Container>
    );
  }
}

export default Box;
