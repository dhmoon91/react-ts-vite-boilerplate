import { gql } from '@apollo/client';

import { User } from '../../types/user';

export interface LoginData {
    loginUser: User;
}

export interface LoginDataInput {
    email: string;
    password: string;
}

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            id
            email
            firstName
            lastName
            isSync
        }
    }
`;
