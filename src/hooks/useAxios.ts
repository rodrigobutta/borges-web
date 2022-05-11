import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
// import AlertError from '../components/AlertErrorMessage';
import type { AxiosInstance } from 'axios';
import settings from '../settings';

const UNKNOW_ERROR = 'Erro desconhecido. Entre em contato com o administrador.';

export const useAxios = (config?: any) => {
  const axiosInstance = useRef<AxiosInstance>();

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
          Authorization: initialized ? `Bearer ${kcToken}` : undefined,
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

    return () => {
      axiosInstance.current = undefined;
    };
  }, [baseURL, initialized, kcToken, config]);

  return axiosInstance;
};
