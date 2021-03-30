/* eslint-disable import/first */

import React from 'react';

import { mocked } from 'ts-jest/utils';
import { render, fireEvent, act } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
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

jest.mock('../../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(value => value),
}));

jest.mock('../../utils/expireInMinutes.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(value => value),
}));

import FloatingCart from '../../components/FloatingCart';
import { useCart } from '../../hooks/cart';

const useCartMocked = mocked(useCart);

useCartMocked.mockReturnValue({
  addToCart: jest.fn(),
  offers: [
    {
      id: 'cccc3f48-dd2c-43ba-b8de-8945e7ababab',
      price: 400,
      expireIn: '30/04/2021 23:30',
      quantity: 5,
      product: {
        id: 'product/portal-gun',
        name: 'Portal Gun',
        description: 'The Portal Gun is a gadget that allow the user(s).',
        image: 'https://vignette.wikia.nocookie.net/rickandmorty/images/5/55/Portal_gun.png/revision/latest/scale-to-width-down/310?cb=20140509065310'
      }
    },
    {
      id: 'cccc3f48-dd2c-43ba-b8de-8945e7hy7dku',
      price: 600,
      expireIn: '30/04/2021 23:30',
      quantity: 10,
      product: {
        id: 'product/microverse-battery',
        name: 'Microverse Battery',
        description: 'The Microverse Battery contains a minuature.',
        image: 'https://vignette.wikia.nocookie.net/rickandmorty/images/5/55/Portal_gun.png/revision/latest/scale-to-width-down/310?cb=20140509065310'
      }
    },
  ],
  increment: jest.fn(),
  decrement: jest.fn(),
  cleanCart: jest.fn(),
  cartTotal: 0
});

const useNavigationMocked = mocked(useNavigation);

const navigate = jest.fn();

useNavigationMocked.mockReturnValue({
  navigate,
} as any)

describe('Store', () => {
  it('should be able to calculate the cart total', async () => {
    const { getByText } = render(<FloatingCart />);

    expect(getByText('8000')).toBeTruthy();
  });

  it('should be able to show the total quantity of itens in the cart', async () => {
    const { getByText } = render(<FloatingCart />);

    expect(getByText('15 itens')).toBeTruthy();
  });

  it('should be able to navigate to the cart', async () => {
    const { getByTestId } = render(<FloatingCart />);

    act(() => {
      fireEvent.press(getByTestId('navigate-to-cart-button'));
    });

    expect(navigate).toHaveBeenCalledWith('Cart', { balance: undefined });
  });
});
