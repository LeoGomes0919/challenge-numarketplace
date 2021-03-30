import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import {
  Container,
  AnimatedContainer,
  TextSuccess,
  ButtonGoStore,
  ButtonTextGoStore
} from './styles';

const Completion = () => {
  const navigattion = useNavigation();
  const route = useRoute();
  const newBalance = route.params?.newBalance;

  function handleGoBackStore(): void {
    navigattion.navigate('Store', { newBalance });
  }

  return (
    <Container>
      <Animatable.View
        animation='bounceInLeft'
        duration={1200}
        delay={200}
        style={AnimatedContainer.AnimatedView}
      >
        <Icon name='check-circle' size={140} color='#52CD00' />
        <TextSuccess>Compra finalizada com sucesso.</TextSuccess>
      </Animatable.View>
      <ButtonGoStore onPress={handleGoBackStore}>
        <ButtonTextGoStore>Voltar a loja</ButtonTextGoStore>
      </ButtonGoStore>
    </Container>
  );
}

export default Completion;
