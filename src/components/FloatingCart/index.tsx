import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

const FloatingCart = (props) => {
  const { offers } = useCart();
  const navigation = useNavigation();
  const balance = props?.balance;

  const cartTotal = useMemo(() => {
    const total = offers.reduce((accumulator, offe) => {
      const offerTotal = offe.price * offe.quantity;

      return accumulator + offerTotal;
    }, 0);

    return formatValue(total);
  }, [offers]);

  const totalItensInCart = useMemo(() => {
    const total = offers.reduce((accumulator, offe) => {
      const offerQuantity = offe.quantity;

      return accumulator + offerQuantity;
    }, 0);

    return total;
  }, [offers]);

  return (
    <Container>
      <CartButton
        testID='navigate-to-cart-button'
        onPress={() => navigation.navigate('Cart', { balance })}
      >
        <Icon name='shopping-cart' size={24} color='#ffffff' />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container >
  );
};

export default FloatingCart;
