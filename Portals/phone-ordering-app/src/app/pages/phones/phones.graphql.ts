import gql from 'graphql-tag';

export const GET_PHONES = gql`
  query {
    phones {
      id
      name
      price
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($username: String!, $phoneId: Int!, $quantity: Int!) {
    placeOrder(username: $username, phoneId: $phoneId, quantity: $quantity)
  }
`;
