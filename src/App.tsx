import React, { useEffect, useMemo, useState } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import { client } from './graphql/client';
import { GET_PROFILE } from './graphql/profile';
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Create } from './pages/Create';
import { OAuth } from './pages/OAuth';
import { ProfileContext, ProfileContextType } from './context/profile';
import { User } from './types/user';
import { Calendar } from './pages/Calendar';

const App = () => {
    // Testing
    const [profile, setProfile] = useState<User>();
    const { loading, data } = useQuery(GET_PROFILE, { client });

    useEffect(() => {
        if (!loading && data) {
            const profileData = data.getProfile;

            setProfile(profileData);
        }
    }, [loading, data]);

    const ContextValue: ProfileContextType = useMemo(
        () => ({ profile, setProfile }),
        [profile, setProfile]
    );

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <ProfileContext.Provider value={ContextValue}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/oauth" element={<OAuth />} />
                        <Route path="/calendar" element={<Calendar />} />
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </ProfileContext.Provider>
    );
};

export default App;
