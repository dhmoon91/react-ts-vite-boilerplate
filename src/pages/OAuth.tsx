import React, { FunctionComponent, useContext } from 'react';

import { GOOGLE_LOGIN_URL } from '../../Config';
import { ProfileContext } from '../context/profile';

interface OAuthContentProps {
    className?: string;
}

export const OAuth: FunctionComponent<OAuthContentProps> = ({ className }) => {
    OAuth.defaultProps = {
        className: '',
    };

    const { profile } = useContext(ProfileContext);

    if (!profile || !profile.isSync) {
        return (
            <div className={className}>
                <a href={GOOGLE_LOGIN_URL} className="a">
                    google login
                </a>
            </div>
        );
    }

    return <div>You already login via Google</div>;
};
