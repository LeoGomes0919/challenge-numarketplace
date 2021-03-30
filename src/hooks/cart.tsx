import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import expireInMinutes from '../utils/expireInMinutes';

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

interface CartContext {
  offers: Offer[];
  addToCart(item: Omit<Offer, 'quantity' | 'expireIn'>): void;
  increment(id: string): void;
  decrement(id: string): void;
  cleanCart(): void;
  cartTotal: number;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider = ({ children }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  useEffect(() => {
    async function loadOffers(): Promise<void> {
      const offerStorage = await AsyncStorage.getItem(
        '@NuMarketplace:offer',
      );
      if (offerStorage) {
        setOffers(JSON.parse(offerStorage));
      }
    }

    loadOffers();
  }, []);

  const addToCart = useCallback(
    async (offer: Offer) => {
      try {
        const checkOfferInCart = offers.find(item => item.id === offer.id);

        if (checkOfferInCart) {
          const newOffers = offers;

          const offerIndex = newOffers.findIndex(item => item.id === offer.id);
          newOffers[offerIndex].quantity += 1;

          setOffers([...newOffers]);

          await AsyncStorage.setItem(
            '@NuMarketplace:offers',
            JSON.stringify(newOffers),
          );
        } else {
          const expireDate = new Date();
          const formattedOffer: Offer = {
            id: offer.id,
            price: offer.price,
            quantity: 1,
            expireIn: expireInMinutes(expireDate, 1),
            product: {
              id: offer.product.id,
              name: offer.product.name,
              description: offer.product.description,
              image: offer.product.image,
            }
          };
          const newOffers = [...offers, formattedOffer];
          setOffers(newOffers);
          await AsyncStorage.setItem(
            '@NuMarketplace:offers',
            JSON.stringify(newOffers),
          );
        }
      } catch (error) {
        throw new Error('An error occurred while trying to add the item to the cart.')
      }
    },
    [offers]
  );

  const increment = useCallback(
    async id => {
      try {
        const newOffers = offers;
        const offerIndex = offers.findIndex(item => item.id === id);
        newOffers[offerIndex].quantity += 1;

        setOffers([...newOffers]);

        await AsyncStorage.setItem(
          '@NuMarketplace:offers',
          JSON.stringify(newOffers),
        );
      } catch (error) {
        throw new Error('An error occurred while trying to add one more item to the quantity.');
      }
    },
    [offers],
  );

  const decrement = useCallback(
    async id => {
      try {
        const offer = offers;
        const offerIdex = offers.findIndex(item => item.id === id);
        offer[offerIdex].quantity -= 1;
        if (offer[offerIdex].quantity <= 0) {
          offer.splice(offerIdex, 1);
        }

        setOffers([...offer]);

        await AsyncStorage.setItem(
          '@NuMarketplace:offers',
          JSON.stringify(offer),
        );
      } catch (error) {
        throw new Error('There was an error trying to remove the item from the cart.');
      }
    },
    [offers],
  );

  const cartTotal = useMemo(() => {
    const total = offers.reduce((accumulator, offe) => {
      const offerTotal = offe.price * offe.quantity;

      return accumulator + offerTotal;
    }, 0);

    return total;
  }, [offers]);

  const cleanCart = useCallback(
    async () => {
      try {
        await AsyncStorage.removeItem('@NuMarketplace:offers');
        setOffers([]);

        await AsyncStorage.setItem(
          '@NuMarketplace:offers',
          JSON.stringify(offers),
        );
      } catch (error) {
        throw new Error('There was an error in finalizing the purchase.');
      }
    },
    [offers],
  );

  const value = useMemo(
    () => ({ addToCart, increment, decrement, cleanCart, offers, cartTotal }),
    [offers, addToCart, increment, decrement, cleanCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
