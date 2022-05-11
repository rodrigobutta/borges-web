import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pt_BR';
import settings from './settings';
import Routes from './routes/Routes';
import AuthProvider from './providers/AuthProvider';

function App() {
  const keycloakInstance = Keycloak({
    url: settings.keycloak.url,
    realm: settings.keycloak.realm ?? '',
    clientId: settings.keycloak.clientId ?? '',
  });

  // keycloak.onAuthSuccess = function() { alert('authenticated22222'); }

  const eventLogger = (event: any, error: any) => {
    // console.log('eventLogger', event, error );
    // if(event === 'onAuthSuccess') {
    //   console.log('eventLogger OK WE ARE LOGGED NOW');
    // }
  };

  return (
    <ReactKeycloakProvider authClient={keycloakInstance} onEvent={eventLogger}>
      <ConfigProvider locale={locale}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ConfigProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
