import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1px;
  align-items: center;
  justify-content: center;
`;

export const AnimatedContainer = StyleSheet.create({
  AnimatedView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const TextSuccess = styled.Text`
  font-size: 18px;
  color: #3D3D4D;
  font-family: 'Roboto-Medium';
  text-transform: uppercase;
  margin-top: 16px;
`;

export const ButtonGoStore = styled.TouchableOpacity`
  background: transparent;
  width: 90%;
  height: 48px;
  border: 1px solid #8A05BE;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;

export const ButtonTextGoStore = styled.Text`
 font-size: 14px;
  color: #8A05BE;
  font-family: 'Roboto-Medium';
  text-transform: uppercase;
`;
