import { useEffect, useRef, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useKeycloak } from '@react-keycloak/web';
// import AlertError from '../components/AlertErrorMessage';
import settings from '../settings';
import { useAuth } from '../providers/AuthProvider';

const UNKNOW_ERROR = 'Error desconocido. Por favor contactese con el administrador.';

export const useAxios = (config?: any) => {
  const { auth } = useAuth();

  const axiosInstance = useRef<AxiosInstance>();
  const [axiosInitialized, setAxiosInitialized] = useState(false);

  const baseURL = settings.api.endpoint;

  const { keycloak, initialized } = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  // const showModal = useCallback((message) => {
  //   AlertError({errorMessage: message, visible: true});
  // }, []);

  useEffect(() => {
    axiosInstance.current = axios.create(
      Object.assign({}, config, {
        baseURL,
        headers: {
          Authorization: initialized ? `Bearer ${kcToken}` : '',
          ...(auth && { 'current-profile-id': auth.profile?.id }),
        },
      }),
    );

    axiosInstance.current.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        console.error(error.response?.data?.message ?? UNKNOW_ERROR);

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );

    setAxiosInitialized(true);

    return () => {
      axiosInstance.current = undefined;
      setAxiosInitialized(false);
    };
  }, [baseURL, initialized, kcToken, auth, config]);

  return { axios: axiosInstance.current, axiosInitialized };
};
