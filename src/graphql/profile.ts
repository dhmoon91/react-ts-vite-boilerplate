import { gql } from '@apollo/client';

import { USER_FRAGMENT } from './user/user.fragment';

export const GET_PROFILE = gql`
    query {
        getProfile {
          ${USER_FRAGMENT}
        }
    }
`;
