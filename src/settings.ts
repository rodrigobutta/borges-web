const settings = {
  url: process.env.REACT_APP_BORGES_DEALERS_URL,
  api: {
    endpoint: process.env.REACT_APP_BORGES_API_CONSUMER_ENDPOINT,
  },
  keycloak: {
    url: process.env.REACT_APP_BORGES_KEYCLOAK_URL,
    realm: process.env.REACT_APP_BORGES_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_BORGES_DEALERS_KEYCLOAK_CLIENT_ID,
  },
};

export default settings;
