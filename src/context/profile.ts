import { createContext } from 'react';

import { User } from '../types/user';

export interface ProfileContextType {
    profile: User;
    setProfile: () => void;
}

export const ProfileContext = createContext<ProfileContextType>({
    profile: {} as User,
    setProfile: () => undefined,
});
