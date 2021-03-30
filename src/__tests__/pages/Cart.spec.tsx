/* eslint-disable import/first */

import React from 'react';

import { mocked } from 'ts-jest/utils';
import { render, fireEvent, act } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
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

import Cart from '../../pages/Cart';
import { useCart } from '../../hooks/cart';

const useCartMocked = mocked(useCart);
const useRoutMocked = mocked(useRoute);

useCartMocked.mockReturnValue({
  addToCart: jest.fn(),
  offers: [
    {
      id: 'offer/portal-gun',
      price: 400,
      quantity: 5,
      expireIn: '30/04/2021 23:30',
      product: {
        id: '1234',
        name: 'Portal Gun',
        description: 'Is description',
        image: 'Test',
      }
    },
    {
      id: 'offer/microverse-battery',
      price: 600,
      quantity: 10,
      expireIn: '30/04/2021 23:30',
      product: {
        id: '1234',
        name: 'Microverse Battery',
        description: 'Is description',
        image: 'Test',
      }
    },
  ],
  increment: jest.fn(),
  decrement: jest.fn(),
  cleanCart: jest.fn(),
  cartTotal: 80000,
});

describe('Cart', () => {
  it('should be able to list offers on the cart', async () => {
    useRoutMocked.mockReturnValue({
      key: 'Cart-qqPqWQ1pNIhPqbsdUcqGZ',
      name: 'Cart',
      params: {
        balance: 1000000
      }
    });
    const { getAllByText } = render(
      <Cart />
    );

    expect(getAllByText('Portal Gun')).toBeTruthy();
    expect(getAllByText('400')).toBeTruthy();
    expect(getAllByText('2000')).toBeTruthy();
    expect(getAllByText('5x')).toBeTruthy();

    expect(getAllByText('Microverse Battery')).toBeTruthy();
    expect(getAllByText('600')).toBeTruthy();
    expect(getAllByText('6000')).toBeTruthy();
    expect(getAllByText('10x')).toBeTruthy();
  });

  it('should be able to calculate the cart total', async () => {
    const { getByText } = render(<Cart />);

    expect(getByText('8000')).toBeTruthy();
  });

  it('should be able to calculate the cart total', async () => {
    const { getByText } = render(<Cart />);

    expect(getByText('15 itens')).toBeTruthy();
  });

  it('should be able to increment offer quantity on the cart', async () => {
    const increment = jest.fn();

    useCartMocked.mockReturnValue({
      addToCart: jest.fn(),
      offers: [
        {
          id: 'offer/portal-gun',
          price: 400,
          quantity: 5,
          expireIn: '30/04/2021 23:30',
          product: {
            id: 'product/portal-gun',
            name: 'Portal Gun',
            description: 'Is description',
            image: 'Test',
          }
        },
      ],
      increment,
      cartTotal: 2000,
      decrement: jest.fn(),
      cleanCart: jest.fn(),
    });

    const { getByTestId, getAllByText } = render(<Cart />);

    act(() => {
      fireEvent.press(getByTestId('increment-offer/portal-gun'));
    });

    expect(increment).toHaveBeenCalledWith('offer/portal-gun');
    expect(getAllByText('2000')).toBeTruthy();
  });

  it('should be able to decrement offer quantity on the cart', async () => {
    const decrement = jest.fn();

    useCartMocked.mockReturnValue({
      addToCart: jest.fn(),
      offers: [
        {
          id: 'offer/portal-gun',
          price: 400,
          quantity: 5,
          expireIn: '30/04/2021 23:30',
          product: {
            id: 'product/portal-gun',
            name: 'Portal Gun',
            description: 'Is description',
            image: 'Test',
          }
        },
      ],
      decrement,
      increment: jest.fn(),
      cleanCart: jest.fn(),
      cartTotal: 2000,
    });

    const { getByTestId, getAllByText } = render(<Cart />);

    act(() => {
      fireEvent.press(getByTestId('decrement-offer/portal-gun'));
    });

    expect(decrement).toHaveBeenCalledWith('offer/portal-gun');
    expect(getAllByText('2000')).toBeTruthy();
  });

  it('should not be able to purchase an expired offer', () => {
    const { getByText } = render(<Cart />);

    expect(getByText('30/04/2021 23:30').children[0] <= '30/04/2021 23:35').toBeTruthy();
  });

  it('should not be able to buy an offer with insufficinet balance ', () => {
    const { getByText } = render(<Cart />);
    const balance = 100;
    expect(parseInt(getByText('400').children[0].toString()) > balance).toBeTruthy();
  });
});
