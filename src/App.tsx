import React, { useState } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';

import logo from './logo.svg';
import './App.css';
import { client } from './graphql/client';
import { GET_USERS } from './graphql/user/get_user.query';

const App = () => {
    const [count, setCount] = useState(0);

    // Testing
    const { data } = useQuery(GET_USERS, { client });
    console.info('data');
    console.info(data);

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Hello Vite + React!</p>
                    <p>
                        <button
                            type="button"
                            onClick={() =>
                                setCount((countUpdate) => countUpdate + 1)
                            }
                        >
                            count is:
                            {count}
                        </button>
                    </p>
                    <p>
                        Edit
                        <code>App.tsx</code>
                        and save to test HMR updates.
                    </p>
                    <p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                        {' | '}
                        <a
                            className="App-link"
                            href="https://vitejs.dev/guide/features.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Vite Docs
                        </a>
                    </p>
                </header>
            </div>
        </ApolloProvider>
    );
};

export default App;
