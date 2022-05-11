import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import FullpageLoader from '../../components/FullpageLoader';

const LoginPage = () => {
  const [logging, setLogging] = useState(false);
  const currentLocationState = {
    from: { pathname: '/' },
  };
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak && !logging) {
      setLogging(true);
      keycloak?.login();
    }
  }, [keycloak, logging]);

  if (keycloak?.authenticated) return <Navigate to={currentLocationState?.from} />;

  return FullpageLoader({
    visible: true,
    text: 'Carregando...',
  });
};

export default LoginPage;
