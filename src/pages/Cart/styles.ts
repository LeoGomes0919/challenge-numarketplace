import styled from 'styled-components/native';
import { FlatList, StyleSheet } from 'react-native';

interface Offer {
  id: string;
  price: number;
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
  },
  quantity: number;
  expireIn: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  margin-bottom: 32px;
  flex: 1;
  flex-direction: row;
`;

export const ProductList = styled(FlatList as new () => FlatList<Offer>)`
  padding: 0 10px;
`;

export const Product = styled.View`
  background: #fff;
  padding: 15px 10px;
  border-radius: 5px;
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

export const ProductImage = styled.Image`
  height: 92px;
  width: 92px;
  border-radius: 2px;
`;

export const ProductTitleContainer = styled.View`
  font-size: 14px;
  width: 55%;
  margin-left: 8px;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  color: #3D3D4D;
  font-family: 'Roboto-Regular';
`;

export const ProductPriceContainer = styled.View`
  flex-direction: column;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
`;

export const ProductSinglePrice = styled.Text`
  font-size: 12px;
  color: #A0A0B3;
  margin-top: 8px;
  font-family: 'Roboto-Medium';
`;

export const ProductPrice = styled.Text`
  margin-top: 5px;
  font-size: 16px;
  color: #E83F5B;
  font-family: 'Roboto-Bold';
`;

export const ProductQuantity = styled.Text`
  margin-top: 5px;
  margin-right: 10px;

  font-size: 14px;
  color: #E83F5B;
  font-family: 'Roboto-Bold';
`;

export const ActionContainer = styled.View`
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;

  margin-left: auto;
`;

export const ActionButton = styled.TouchableOpacity`
  background: rgba(138, 5, 190, 0.1);
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 5px;
`;

export const ButtonFinish = styled.TouchableOpacity`
  width: 90%;
  height: 48px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #8A05BE;
  justify-content: center;
  align-items: center;
  margin-bottom: 90px;
`;

export const ButtonTextFinish = styled.Text`
  font-size: 14px;
  color: #8A05BE;
  font-family: 'Roboto-Medium';
  text-transform: uppercase;
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  color: #3D3D4D;
  font-family: 'Roboto-Medium';
`;

export const EmptyCart = StyleSheet.create({
  EmptyCartView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const ExpireInContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 4px;
`;

export const ExpireInText = styled.Text`
  font-size: 10px;
  color: #E83F5B;
  font-family: 'Roboto-Regular';
`;

export const ExpireIn = styled.Text`
  font-size: 10px;
  color: #E83F5B;
  font-family: 'Roboto-Regular';
`;

