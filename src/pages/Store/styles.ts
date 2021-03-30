import styled from 'styled-components/native';
import { FlatList } from 'react-native';

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

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const BalanceContainer = styled.View`
  background: #F3E6F8;
  width: 90%;
  border-radius: 4px;
  padding: 16px 16px 16px 8px;
  margin-top: 25%;

  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #3D3D4D;
  font-family: 'Roboto-Regular';
`;

export const MoneyAccount = styled.Text`
  font-size: 16px;
  color: #8A05B3;
  font-family: 'Roboto-Bold';
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

export const HeaderTextList = styled.Text`
  color: #8A05BE;
  font-family: 'Roboto-Regular';
`;

export const ProductList = styled(
  FlatList as new () => FlatList<Offer>,
).attrs({
  numColumns: 2,
})`
  flex: 1;
  padding: 0 10px;
`;

export const Product = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 4px;
  margin: 8px;
  flex: 1;
`;

export const ProductImage = styled.Image`
  height: 122px;
  width: 122px;
  border-radius: 2px;
  align-self: center;
  margin-top: 16px;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  color: #3D3D4D;
  font-family: 'Roboto-Regular';
`;

export const PriceContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 10px;
  margin-top: auto;
`;

export const OptionsContainer = styled.View`
  align-items: flex-end;
  width: 100%;
  margin-top: 8px;
`;

export const ProductPrice = styled.Text`
  font-size: 14px;
  color: #E83F5B;
  font-family: 'Roboto-Bold';
`;

export const ProductButton = styled.TouchableOpacity`
  width: auto;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
`;

export const ProductButtonInfo = styled.TouchableOpacity`
  position: absolute;
  right: 4px;
  top: 4px;
  width: auto;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
`;

