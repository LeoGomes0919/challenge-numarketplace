import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import { useQuery, gql } from '@apollo/client';

import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';
import FloatingCart from '../../components/FloatingCart';
import ModalInfoOffer from '../../components/ModalInfoOffer';

import {
  Container,
  BalanceContainer,
  Title,
  ProductContainer,
  MoneyAccount,
  ProductList,
  HeaderTextList,
  Product,
  ProductTitle,
  ProductImage,
  PriceContainer,
  ProductPrice,
  OptionsContainer,
  ProductButton,
  ProductButtonInfo
} from './styles';

interface Offer {
  id: string;
  price: number;
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
  },
}

interface QueryData {
  viewer: {
    id: string,
    name: string,
    balance: number,
    offers: Offer[],
  }
}

export const GET_DATA = gql`
  query {
    viewer {
      id,
      name,
      balance,
      offers {
        id,
        price,
        product {
          id,
          name,
          description,
          image
        }
      }
    }
  }
`;

const Store = () => {
  const { addToCart } = useCart();
  const route = useRoute();
  const [isVisible, setIsVisible] = useState(false);
  const [viewerOffer, setViewerOffer] = useState<Offer | undefined>({} as Offer);
  const { loading, data, } = useQuery<QueryData>(
    GET_DATA
  );

  const offers = data?.viewer.offers;
  const customer = data?.viewer;

  let balance;

  if (route.params === undefined) {
    balance = customer?.balance
  } else {
    balance = route.params?.newBalance;
  }

  function handleAddToCart(item: Offer): void {
    addToCart(item);
  }

  function handleViewMoreInfoOffer(id: string): void {
    const offer = offers?.find(item => item.id === id);
    setViewerOffer(offer);
    setIsVisible(!isVisible);
  }

  return (
    <Container>
      {loading
        ? (<ActivityIndicator size='large' color='#8A05BE' />)
        : (
          <>
            <ModalInfoOffer
              isVisible={isVisible}
              viewerOffer={viewerOffer}
              setIsVisible={setIsVisible}
            />

            <BalanceContainer>
              <Title>Olá, {customer?.name}</Title>
              <MoneyAccount>{formatValue(balance || 0)}</MoneyAccount>
            </BalanceContainer>
            <ProductContainer>
              <ProductList
                data={offers}
                keyExtractor={item => item.id}
                ListHeaderComponent={<HeaderTextList>Ofertas</HeaderTextList>}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{
                  height: 80,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Product>
                    <ProductButtonInfo
                      onPress={() => handleViewMoreInfoOffer(item.id)}
                    >
                      <Icon size={18} name='info' color='#C4C4C4' />
                    </ProductButtonInfo>
                    <ProductImage source={{ uri: item.product.image }} />
                    <ProductTitle>{item.product.name}</ProductTitle>
                    <PriceContainer>
                      <ProductPrice>{formatValue(item.price)}</ProductPrice>
                      <OptionsContainer>
                        <ProductButton
                          testID={`add-to-cart-${item.id}`}
                          onPress={() => handleAddToCart(item)}
                        >
                          <Icon size={20} name='plus' color='#C4C4C4' />
                        </ProductButton>
                      </OptionsContainer>
                    </PriceContainer>
                  </Product>
                )}
              />
            </ProductContainer>
          </>
        )
      }
      <FloatingCart balance={balance} />
    </Container >
  );
};

export default Store;
