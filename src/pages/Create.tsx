import React, {
    ChangeEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import {
    CREATE_USER,
    CreateData,
    UserInput,
} from '../graphql/user/create_user.mutation';

interface CreateProps {
    className?: string;
}

export const Create: FunctionComponent<CreateProps> = ({ className }) => {
    Create.defaultProps = {
        className: '',
    };
    const navigate = useNavigate();

    const [createInfo, setCreateInfo] = useState<UserInput>({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const [createUserMut] = useMutation<CreateData, { data: UserInput }>(
        CREATE_USER
    );

    const createUser = useCallback(
        async (data: UserInput) => {
            try {
                const res = await createUserMut({
                    variables: {
                        data: {
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            password: data.password,
                        },
                    },
                });

                if (res.data?.createUser) navigate('/login');
            } catch (err) {
                console.info(err);
            }
        },
        [createUserMut]
    );

    useEffect(
        () =>
            setCreateInfo({
                email: '',
                firstName: '',
                lastName: '',
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
                value={createInfo.email}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setCreateInfo({
                        ...createInfo,
                        email: evt.target.value,
                    });
                }}
            />
            <br />
            firstName:{' '}
            <input
                required
                type="text"
                name="firstName"
                value={createInfo.firstName}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setCreateInfo({
                        ...createInfo,
                        firstName: evt.target.value,
                    });
                }}
            />
            <br />
            lastName:{' '}
            <input
                required
                type="text"
                name="lastName"
                value={createInfo.lastName}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setCreateInfo({
                        ...createInfo,
                        lastName: evt.target.value,
                    });
                }}
            />
            <br />
            password:{' '}
            <input
                required
                type="password"
                name="password"
                value={createInfo.password}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setCreateInfo({
                        ...createInfo,
                        password: evt.target.value,
                    });
                }}
            />
            <br />
            <input
                type="submit"
                onClick={() => {
                    createUser(createInfo);
                }}
            />
        </div>
    );
};
