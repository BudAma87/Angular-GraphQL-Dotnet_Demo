
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://localhost:7030/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Attach Authorization header with token from localStorage
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

export const apolloProviders = [
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  }
];
