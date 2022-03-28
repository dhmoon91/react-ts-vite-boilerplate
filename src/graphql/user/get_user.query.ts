import { gql } from '@apollo/client';

import { USER_FRAGMENT } from './user.fragment';

export const GET_USER = gql`
    query GetUser($id: Int!) {
        getUser(id: $id) {
          ${USER_FRAGMENT}
        }
    }
`;

export const GET_USERS = gql`
    query {
        getUsers {
          ${USER_FRAGMENT}
        }
    }
`;
