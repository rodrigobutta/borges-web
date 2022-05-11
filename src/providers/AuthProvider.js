import React, { useEffect, useState, createContext, useContext } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useAxios } from '../hooks/useAxiosV2';
import FullpageLoader from '../components/FullpageLoader';
import LoginPage from '../pages/auth/Login';
import ErrorPage from '../pages/auth/Error';
import { ALLOWED_ROLES } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';

const initialContext = {
  roles: [],
  fetchedJWT: false,
  fetchedAPI: false,
  profiles: [],
  currentProfile: null,
};

export const AuthContext = createContext(initialContext);

export function useAuth() {
  const { auth, setCurrentProfile } = useContext(AuthContext);

  return { auth, setCurrentProfile };
}

export default function AuthProvider(props) {
  const { initialized, keycloak } = useKeycloak();
  const [auth, setAuth] = useState(initialContext);
  const [fetchingApi, setFetchingApi] = useState(false);
  const { axios } = useAxios();
  const [lsUserProfile, setLsUserProfile] = useLocalStorage('currentProfile', null);

  console.log('LOCAL STORAGE CURRENT PROFILE', lsUserProfile);
  // console.log('LOCAL STORAGE AUTH', lsUserProfile);

  useEffect(() => {
    if (!auth.fetchedAPI) {
      if (!auth.fetchedJWT) {
        if (initialized && keycloak && keycloak.authenticated) {
          const jwtParsed = keycloak.tokenParsed;
          setAuth({
            user: {
              firstName: jwtParsed.given_name,
              lastName: jwtParsed.family_name,
              email: jwtParsed.email,
            },
            roles: [...jwtParsed.realm_access?.roles],
            jwt: jwtParsed,
            token: keycloak.token,
            fetchedJWT: true,
            fetchedAPI: false,
          });
        }
      } else if (axios && !fetchingApi) {
        setFetchingApi(true);

        async function fetchUser() {
          try {
            await axios.get(`auth`).then(res => {
              console.log('RES', res, auth);
              if (res.status === 200) {
                setAuth({
                  ...auth,
                  ...res.data,
                  fetchedAPI: true,
                });
              }
            });
          } catch (error) {
            console.error('FETCHING USER', error);
          }
        }
        fetchUser();
      }
    }
  }, [auth, setAuth, axios, fetchingApi, initialized, keycloak]);

  const setCurrentProfile = profile => {
    console.log('setCurrentProfile', profile);

    setLsUserProfile(profile);

    setAuth({
      ...auth,
      profile,
    });
  };

  if (!initialized || (initialized && keycloak && keycloak.authenticated && !auth.user)) {
    return FullpageLoader({
      visible: true,
      text: 'Carregando...',
    });
  }

  if (!keycloak?.authenticated) {
    return <LoginPage />;
  }

  console.log('AUTHENTICATED', auth);

  if (ALLOWED_ROLES.some(r => auth.roles.indexOf(r) < 0)) {
    console.log('Allowed roles', ALLOWED_ROLES);
    console.log('User Roles', auth.roles);
    return <ErrorPage auth={auth} />;
  } else {
    return <AuthContext.Provider value={{ auth, setCurrentProfile }}>{props.children}</AuthContext.Provider>;
  }
}
