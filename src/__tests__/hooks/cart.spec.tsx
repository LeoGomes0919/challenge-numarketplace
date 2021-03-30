/* eslint-disable import/first */

import React from 'react';
import { mocked } from 'ts-jest/utils';
import { View, Text, TouchableOpacity } from 'react-native';

import {
  render,
  fireEvent,
  act,
  wait,
  cleanup,
} from '@testing-library/react-native';

jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(),
    removeItem: jest.fn(),
    getItem: jest.fn().mockReturnValue(null),
    clear: jest.fn(),
  },
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartProvider, useCart } from '../../hooks/cart';

const TestComponent = () => {
  const { offers, addToCart, increment, decrement } = useCart();

  function handleAddToCart(): void {
    addToCart({
      id: 'offer/portal-gun',
      price: 5000,
      quantity: 0,
      expireIn: '30/04/2021 23:30',
      product: {
        id: 'product/portal-gun',
        name: 'Portal Gun',
        description: 'The Portal Gun is a gadget.',
        image: 'test'
      }
    });
  }

  function handleIncrement(): void {
    increment('offer/portal-gun');
  }

  function handleDecrement(): void {
    decrement('offer/portal-gun');
  }

  return (
    <>
      <TouchableOpacity testID="add-to-cart" onPress={handleAddToCart}>
        Add to cart
      </TouchableOpacity>

      <TouchableOpacity testID="increment" onPress={handleIncrement}>
        Increment
      </TouchableOpacity>

      <TouchableOpacity testID="decrement" onPress={handleDecrement}>
        Decrement
      </TouchableOpacity>

      {offers.map(offer => (
        <View key={offer.id}>
          <Text>{offer.product.name}</Text>
          <Text>{offer.quantity}</Text>
        </View>
      ))}
    </>
  );
};

const mockedAsyncStorage = mocked(AsyncStorage);

describe('Cart Contex', () => {
  afterEach(() => {
    mockedAsyncStorage.setItem.mockClear();
    mockedAsyncStorage.getItem.mockClear();

    cleanup();
  });

  it('should be able to add offers to the cart', async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await wait(() => expect(getByText('Portal Gun')).toBeTruthy());
    await wait(() => expect(getByText('1')).toBeTruthy())
  });

  it('should be able to increment quantity', async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('increment'));
    });

    await wait(async () => expect(getByText('2')).toBeTruthy());
  });

  it('should be able to decrement quantity', async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('increment'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('decrement'));
    });

    await wait(() => expect(getByText('1')).toBeTruthy());
  });

  it('should load offers from AsyncStorage', async () => {
    mockedAsyncStorage.getItem.mockReturnValue(
      new Promise(resolve =>
        resolve(
          JSON.stringify([
            {
              id: 'cccc3f48-dd2c-43ba-b8de-8945e7ababab',
              price: 5000,
              quantity: 0,
              expireIn: '30/04/2021 23:30',
              product: {
                id: 'product/portal-gun',
                name: 'Portal Gun',
                description: 'The Portal Gun is gun',
                image: 'https://localhost:33333/image'
              },
            },
          ]),
        ),
      ),
    );

    const { getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await wait(() => expect(getByText('Portal Gun')).toBeTruthy());

    await wait(() => expect(getByText('Portal Gun')).toBeTruthy());
  });

  it('should store offers in AsyncStorage while adding, incrementing and decrementing', async () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('increment'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('decrement'));
    });

    await wait(() =>
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledTimes(1),
    );
  }, 10000);
});
