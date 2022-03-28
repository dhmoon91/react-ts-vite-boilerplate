import React, {
    ChangeEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useMutation } from '@apollo/client';

import { GOOGLE_LOGIN_URL } from '../../Config';
import {
    LOGIN_USER,
    LoginData,
    LoginDataInput,
} from '../graphql/user/login.mutation';

interface LoginProps {
    className?: string;
}

export const Login: FunctionComponent<LoginProps> = ({ className }) => {
    Login.defaultProps = {
        className: '',
    };

    const [loginInfo, setLoginInfo] = useState<LoginDataInput>({
        email: '',
        password: '',
    });

    const [loginUserMut] = useMutation<LoginData, LoginDataInput>(LOGIN_USER);

    const loginUser = useCallback(
        async (data: LoginDataInput) => {
            try {
                const res = await loginUserMut({
                    variables: {
                        email: data.email,
                        password: data.password,
                    },
                });

                if (res.data?.loginUser) {
                    window.location.replace('/');
                }
            } catch (err) {
                console.info(err);
            }
        },
        [loginUserMut]
    );

    useEffect(
        () =>
            setLoginInfo({
                email: '',
                password: '',
            }),
        []
    );

    return (
        <div className={className}>
            email:{' '}
            <input
                required
                type="email"
                name="email"
                value={loginInfo.email}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setLoginInfo({
                        ...loginInfo,
                        email: evt.target.value,
                    });
                }}
            />
            <br />
            password:{' '}
            <input
                required
                type="password"
                name="password"
                value={loginInfo.password}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setLoginInfo({
                        ...loginInfo,
                        password: evt.target.value,
                    });
                }}
            />
            <br />
            <input
                type="submit"
                onClick={() => {
                    loginUser(loginInfo);
                }}
            />
            <div>
                <a href={GOOGLE_LOGIN_URL} className="a">
                    google login
                </a>
            </div>
        </div>
    );
};
