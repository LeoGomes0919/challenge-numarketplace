import React from 'react';
import { Modal, View } from 'react-native';

import formartValue from '../../utils/formatValue';

import {
  ModalContent,
  ModalView,
  ProductImageModal,
  ButtonModal,
  TextButtonModal,
  TextProductName,
  TextProductDescrip,
  TextProductPrice
} from './styles';

const ModalInfoOffer = (props) => {
  const { viewerOffer, isVisible, setIsVisible } = props;

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      {viewerOffer?.product === undefined ? <View /> :
        <ModalContent>
          <ModalView>
            <ProductImageModal source={{ uri: viewerOffer?.product.image }} />
            <TextProductName>{viewerOffer?.product.name}</TextProductName>
            <TextProductDescrip>{viewerOffer?.product.description}</TextProductDescrip>
            <TextProductPrice>{formartValue(viewerOffer?.price)}</TextProductPrice>
            <ButtonModal
              activeOpacity={0.9}
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            >
              <TextButtonModal>Fechar</TextButtonModal>
            </ButtonModal>
          </ModalView>
        </ModalContent>
      }
    </Modal>
  );
}

export default ModalInfoOffer;
