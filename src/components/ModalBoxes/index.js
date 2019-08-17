import React, {Component} from 'react';

import {
  Modal,
  ModalContainer,
  ModalView,
  Button,
  TextBtn,
  List,
  Separator,
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
            <List
              data={this.props.boxes}
              keyExtractor={box => box._id}
              ItemSeparatorComponent={() => <Separator />}
              renderItem={({item}) => {
                return (
                  <Button onPress={() => this.props.enterBox(item._id)}>
                    <TextBtn>{item.title}</TextBtn>
                  </Button>
                );
              }}
            />
            <Button color="#dc2a3a" onPress={this.props.closeModal}>
              <TextBtn>Close</TextBtn>
            </Button>
          </ModalView>
        </ModalContainer>
      </Modal>
    );
  }
}

export default ModalChange;
