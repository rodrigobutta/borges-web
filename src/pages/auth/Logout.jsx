import { useKeycloak } from '@react-keycloak/web';
import settings from '../../settings';
import FullpageLoader from '../../components/FullpageLoader';

const LogoutPage = () => {
  const { keycloak } = useKeycloak();

  const logoutCallbackUri = `${settings.url}`;

  if (keycloak?.authenticated) {
    keycloak?.logout({
      redirectUri: logoutCallbackUri,
    });
  }

  return FullpageLoader({ visible: true, text: 'Saindo...' });
};

export default LogoutPage;
