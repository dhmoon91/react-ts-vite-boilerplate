import { gql } from '@apollo/client';

export const GET_USER = gql`
    query GetUser($id: Int!) {
        getUser(id: $id) {
            id
            name
            password
            username
        }
    }
`;

export const GET_USERS = gql`
    query {
        getUsers {
            id
            name
            password
            username
        }
    }
`;
