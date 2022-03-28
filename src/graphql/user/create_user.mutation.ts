import { gql } from '@apollo/client';

import { User } from '../../types/user';

export interface CreateData {
    createUser: User;
}

export interface UserInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const CREATE_USER = gql`
    mutation CreateUser($data: UserInput!) {
        createUser(data: $data) {
            id
            email
            firstName
            lastName
        }
    }
`;
