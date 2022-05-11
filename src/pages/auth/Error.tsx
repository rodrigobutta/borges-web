import React from 'react';
import { Result, Button } from 'antd';

import { useKeycloak } from '@react-keycloak/web';
import settings from '../../settings';

const ErrorPage = ({ auth = null }: { auth: any }) => {
  const { keycloak } = useKeycloak();

  const handleLogoutClick = async () => {
    keycloak.logout({
      redirectUri: `${settings.url}`,
    });
  };

  const title = `Permissões insuficientes`;
  const subTitle = `O usuário ${auth ? auth.user.email : ''} tem permissões para usar o aplicativo`;

  return (
    <Result
      status='403'
      title={title}
      subTitle={subTitle}
      extra={
        <Button type='primary' key='logout' onClick={handleLogoutClick}>
          Sair
        </Button>
      }
    />
  );
};

export default ErrorPage;
