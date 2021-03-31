import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';

import { useCart } from '../../hooks/cart';
import FloatingCart from '../../components/FloatingCart';
import formatValue from '../../utils/formatValue';
import expireInMinutes from '../../utils/expireInMinutes';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  ButtonFinish,
  ButtonTextFinish,
  EmptyCart,
  EmptyText,
  ExpireInContainer,
  ExpireInText,
  ExpireIn
} from './styles';


const Cart = () => {
  const { increment, decrement, offers, cleanCart, cartTotal } = useCart();
  const route = useRoute();
  const navigation = useNavigation();
  const balance = route.params?.balance;

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  function handleFinishCheckout(): void {
    const date = new Date();
    const dateNow = expireInMinutes(date, - 0);

    const checkExpire = offers.filter(item => item.expireIn <= dateNow);

    if (checkExpire.length >= 1) {
      Alert.alert(
        'Aviso',
        'A ofertas expiradas em seu carrinho',
      );
      return;
    }

    if (cartTotal > balance) {
      Alert.alert(
        'Aviso',
        'Seu saldo é saldo insuficiente'
      );
      return;
    }

    const newBalance = balance - cartTotal;
    cleanCart();
    navigation.navigate('Completion', { newBalance });
  }

  return (
    <Container>
      {!offers.length ?
        <Animatable.View
          animation='bounceInLeft'
          duration={1200}
          style={EmptyCart.EmptyCartView}
        >
          <Icon name='shopping-cart' size={24} color='#3D3D4D' />
          <EmptyText> Seu carrinho está vazio.</EmptyText>
        </Animatable.View> :
        <>
          <ProductContainer>
            <ProductList
              data={offers}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{
                height: 8,
              }}
              renderItem={({ item }) => (
                <Product>
                  <ProductImage source={{ uri: item.product.image }} />
                  <ProductTitleContainer>
                    <ProductTitle>{item.product.name}</ProductTitle>
                    <ProductPriceContainer>
                      <ProductSinglePrice>
                        {formatValue(item.price)}
                      </ProductSinglePrice>
                      <ExpireInContainer>
                        <ExpireInText>Expira em: </ExpireInText>
                        <ExpireIn>{item.expireIn}</ExpireIn>
                      </ExpireInContainer>

                      <TotalContainer>
                        <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                        <ProductPrice>
                          {formatValue(item.price * item.quantity)}
                        </ProductPrice>
                      </TotalContainer>
                    </ProductPriceContainer>
                  </ProductTitleContainer>
                  <ActionContainer>
                    <ActionButton
                      testID={`increment-${item.id}`}
                      onPress={() => handleIncrement(item.id)}
                    >
                      <Icon name="plus" color="#8A05BE" size={16} />
                    </ActionButton>
                    <ActionButton
                      testID={`decrement-${item.id}`}
                      onPress={() => handleDecrement(item.id)}
                    >
                      <Icon name="minus" color="#8A05BE" size={16} />
                    </ActionButton>
                  </ActionContainer>
                </Product>
              )}
            />
          </ProductContainer>
          <ButtonFinish onPress={() => handleFinishCheckout()}>
            <ButtonTextFinish>Finalizar</ButtonTextFinish>
          </ButtonFinish>
        </>
      }
      <FloatingCart />
    </Container>
  );
};


export default Cart;
