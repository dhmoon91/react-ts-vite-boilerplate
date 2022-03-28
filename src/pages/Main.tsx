import React, { FunctionComponent, useState, useContext } from 'react';

import logo from '../logo.svg';
import { ProfileContext } from '../context/profile';

interface MainProps {
    className?: string;
}

export const Main: FunctionComponent<MainProps> = ({ className }) => {
    Main.defaultProps = {
        className: '',
    };
    const [count, setCount] = useState(1);
    const { profile } = useContext(ProfileContext);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button
                        className={className}
                        type="button"
                        onClick={() =>
                            setCount((countUpdate) => countUpdate * 2)
                        }
                    >
                        count is:
                        {count}
                    </button>
                </p>
                {profile ? (
                    <p>
                        {profile.firstName} {profile.lastName} Logined
                    </p>
                ) : (
                    <p>
                        Edit
                        <code>App.tsx</code>
                        and save to test HMR updates.
                    </p>
                )}
                <p>
                    <a href="/login" className="App-link">
                        Login
                    </a>
                    {' | '}
                    <a href="/create" className="App-link">
                        Create
                    </a>
                    {' | '}
                    <a href="/oauth" className="App-link">
                        google sso
                    </a>
                    {' | '}
                    <a href="/calendar" className="App-link">
                        synchronize with Google Calendar
                    </a>
                </p>
            </header>
        </div>
    );
};
