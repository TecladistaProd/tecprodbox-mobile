import React, {Component} from 'react';

import {
  Modal,
  ModalContainer,
  ModalView,
  Input,
  FileName,
  Button,
  TextBtn,
} from './styles';

class ModalChange extends Component {
  state = {
    new_name: '',
  };

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.props.opened}
        onRequestClose={() => {}}>
        <ModalContainer>
          <ModalView>
            {this.props.file.title && (
              <FileName>{this.props.file.title.split('.')[0]}</FileName>
            )}
            <Input
              placeholder="New Name"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              value={this.state.new_name}
              onChangeText={new_name => this.setState({new_name})}
            />
            <Button
              onPress={() => {
                let {new_name} = this.state;
                this.setState({new_name: ''});
                return this.props.closeModal(new_name);
              }}>
              <TextBtn>Change</TextBtn>
            </Button>
            <Button color="#dc2a3a" onPress={this.props.closeModal}>
              <TextBtn>Cancel</TextBtn>
            </Button>
          </ModalView>
        </ModalContainer>
      </Modal>
    );
  }
}

export default ModalChange;
