/* eslint-disable import/first */

import React from 'react';

import { mocked } from 'ts-jest/utils';
import { render, fireEvent, act } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('@react-navigation/native', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    useNavigation: jest.fn(),
  };
});

jest.mock('../../hooks/cart.tsx', () => ({
  __esModule: true,
  useCart: jest.fn().mockReturnValue({
    addToCart: jest.fn(),
    offers: [],
  }),
}));

import { GET_DATA } from '../../pages/Store';
import { useCart } from '../../hooks/cart';
import { TouchableOpacity } from 'react-native';

describe('Store', () => {
  const mocks = [
    {
      request: {
        query: GET_DATA,
      },
      result: {
        data: {
          viewer: {
            id: 'cccc3f48-dd2c-43ba-b8de-8945e7ababab',
            name: 'Jerry Smith',
            balance: 1000000,
            offers:
            {
              id: 'offer/portal-gun',
              price: 5000,
              product: {
                id: 'product/portal-gun',
                name: 'Portal Gun',
                description: 'The Portal Gun is a gadget.',
                image: 'https://vignette.wikia.nocookie.net/rickandmorty/images/5/55/Portal_gun.png/revision/latest/scale-to-width-down/310?cb=20140509065310'
              },
            },
          },
        },
      },
    },
  ];

  it('should be able to list offers', () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <>
          {mocks.map(item => item.result.data.viewer.name)}
        </>
      </MockedProvider>
    );

    const obj = component.asJSON();
    expect(obj.children).toContain('Jerry Smith');
  });

  it('should be able to add item to cart', () => {
    const useCartMocked = mocked(useCart);

    const addToCart = jest.fn();
    useCartMocked.mockReturnValue({
      addToCart,
      offers: [],
      increment: jest.fn(),
      decrement: jest.fn(),
      cleanCart: jest.fn(),
      cartTotal: 0,
    });

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <>
          {mocks.map(item => (
            <TouchableOpacity
              key={item.result.data.viewer.offers.id}
              testID={`add-to-cart-${item.result.data.viewer.offers.id}`}
            />
          ))}
        </>
      </MockedProvider>
    );

    act(() => {
      fireEvent.press(getByTestId('add-to-cart-offer/portal-gun'));
    });
  });
});
