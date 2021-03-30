import styled from 'styled-components/native';

export const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  background: #FFF;
  border-radius: 10px;
  padding: 22px;
  width: 95%;
  border: 1px solid #8A05BE;
`;

export const ProductImageModal = styled.Image`
  width: 100%;
  height: 122px;
  border-radius: 4px;
  align-self: center;
  margin-top: 16px;
`;

export const ButtonModal = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 16px;
  background: #8A05BE;
  justify-content: center;
  align-items: center;
`;

export const TextButtonModal = styled.Text`
  color: #fff;
  font-family: 'Roboto-Regular';
`;

export const TextProductName = styled.Text`
  font-size: 16px;
  color: #3D3D4D;
  font-family: 'Roboto-Medium';
  margin: 8px 0;
`;

export const TextProductDescrip = styled.Text`
  font-size: 14px;
  color: #3D3D4D;
  font-family: 'Roboto-Regular';
  margin-bottom: 8px;
`;

export const TextProductPrice = styled.Text`
  font-size: 14px;
  color: #E83F5B;
  font-family: 'Roboto-Medium';
  margin-bottom: 24px;
`;
