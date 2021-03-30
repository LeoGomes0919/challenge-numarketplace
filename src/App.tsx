import 'react-native-gesture-handler';
import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { StatusBar, View } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhd2Vzb21lY3VzdG9tZXJAZ21haWwuY29tIn0.cGT2KqtmT8KNIJhyww3T8fAzUsCD5_vxuHl5WbXtp8c';

const client = new ApolloClient({
  uri: 'https://staging-nu-needful-things.nubank.com.br/query',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${token}`
  }
});

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <ApolloProvider client={client}>
        <AppContainer>
          <StatusBar
            backgroundColor='#8A05BE'
            barStyle='light-content'
          />
          <Routes />
        </AppContainer>
      </ApolloProvider>
    </View>
  );
};

export default App;
