import { provideApollo } from 'apollo-angular';
import { InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://localhost:7030/graphql';
// 🔐 Add auth header if token exists
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});
//const link = createHttpLink({ uri });
// 🌐 Create the final HTTP link with auth
const link = authLink.concat(createHttpLink({ uri }));

export const apolloProviders = [
  provideApollo(() => ({
    link,
    cache: new InMemoryCache()
  }))
];



