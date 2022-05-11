import { useCallback, useEffect, useReducer, useState } from 'react';
import validator from 'utils/validator';
import { isEmpty } from 'lodash';
import dot from 'dot-object';
import { useAxios } from './useAxiosV2';

const err_MESSAGE = 'Lamentamos, ocorreu um erro.';

const useEntityReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        fetching: true,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        fetching: false,
        entity: action.payload,
        original: action.payload,
        dirty: false,
      };

    case 'SUBMIT_INIT':
      return {
        ...state,
        submitting: true,
      };

    case 'SUBMIT_ATTEMPTED':
      return {
        ...state,
        submitted: true,
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitting: false,
        dirty: false,
        original: state.entity,
      };

    case 'SUBMIT_FAILURE':
      return {
        ...state,
        submitting: false,
        asyncError: action.payload.error,
      };

    case 'ENTITY_CHANGED':
      let key = action.payload.key;
      let updatedValue;

      if (Array.isArray(key)) {
        if (key.length === 2) {
          updatedValue = {
            [key[0]]: {
              ...state.entity[key[0]],
              [key[1]]: action.payload.value,
            },
          };
        } else {
          updatedValue = { [key[0]]: action.payload.value };
        }
      } else {
        updatedValue = { [key]: action.payload.value };
      }

      return {
        ...state,
        entity: { ...state.entity, ...updatedValue },
        dirty: true,
      };

    case 'ASYNC_FAILURE':
      return {
        ...state,
        submitting: false,
        fetching: false,
        asyncError: action.payload.error,
      };

    case 'SET_ENTITY':
      return {
        ...state,
        entity: { ...state.entity, ...action.payload.entity },
      };

    default:
      throw new Error();
  }
};

export const useEntity = ({
  entityId,
  endPoint,
  queryParams = {},
  fields = [],
  onFetchSuccess = null,
  omitProperties = [],
  dottedNotation = false,
}: any) => {
  const [state, dispatch] = useReducer(useEntityReducer, {
    fetching: false,
    entity: {},
    original: {},
    dirty: false,
  });
  const [props] = useState<any>({
    queryParams,
    onFetchSuccess,
    omitProperties,
    dottedNotation,
  });

  const { axios } = useAxios();

  const { entity } = state;

  const handleSubmit = useCallback(
    (callback: () => any) => async (e: any) => {
      if (e && e.preventDefault) {
        e.preventDefault();
        e.persist();
      }

      dispatch({ type: 'SUBMIT_ATTEMPTED' });
      try {
        if (isEmpty(validator(entity, fields))) {
          dispatch({ type: 'SUBMIT_INIT' });
          await callback();
          dispatch({ type: 'SUBMIT_SUCCESS' });
        }
      } catch (e: any) {
        console.log(e);
        if (e.response && e.response.status) {
          dispatch({
            type: 'SUBMIT_FAILURE',
            payload: {
              error: {
                code: e.response.status,
                message: typeof e.response.data === 'string' ? e.response.data : err_MESSAGE,
              },
            },
          });
        } else {
          dispatch({
            type: 'SUBMIT_FAILURE',
            payload: {
              error: { message: 'Lamentamos, ocorreu um erro.' },
            },
          });
        }
      }
    },
    [entity, fields],
  );

  const handleSave = useCallback(
    (callback: () => any) => async (e: any) => {
      if (e && e.preventDefault) {
        e.preventDefault();
        e.persist();
      }
      dispatch({ type: 'SUBMIT_ATTEMPTED' });
      try {
        dispatch({ type: 'SUBMIT_INIT' });
        await callback();
        dispatch({ type: 'SUBMIT_SUCCESS' });
      } catch (e: any) {
        console.log(e);
        if (e.response && e.response.status) {
          dispatch({
            type: 'SUBMIT_FAILURE',
            payload: {
              error: {
                code: e.response.status,
                message: typeof e.response.data === 'string' ? e.response.data : err_MESSAGE,
              },
            },
          });
        } else {
          dispatch({
            type: 'SUBMIT_FAILURE',
            payload: {
              error: { message: 'Lo lamentamos mucho, algo salio mal.' },
            },
          });
        }
      }
    },
    [],
  );

  const fetchEntity = useCallback(
    async (entityId: any) => {
      dispatch({ type: 'FETCH_INIT' });
      const { omitProperties, onFetchSuccess, queryParams } = props;

      try {
        !!axios &&
          axios.get(`${endPoint}/${entityId}`, { params: queryParams }).then(res => {
            // return object before trimming or processing it
            onFetchSuccess && onFetchSuccess(res.data);

            const data = { ...res.data };

            omitProperties.forEach((prop: any) => {
              delete data[prop];
            });

            const entityData = dottedNotation ? dot.dot(data) : data;
            dispatch({ type: 'FETCH_SUCCESS', payload: entityData });
          });
      } catch (e: any) {
        /*try { 
      // ESTE BLOQUE ESTA DIFERENTE EN DEALERS!
      const result = await get(`${endPoint}/${entityId}`);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    }*/ console.log(e);
        if (e.response && e.response.status) {
          dispatch({
            type: 'ASYNC_FAILURE',
            payload: {
              error: {
                code: e.response.status,
                message: typeof e.response.data === 'string' ? e.response.data : err_MESSAGE,
              },
            },
          });
        } else {
          dispatch({
            type: 'ASYNC_FAILURE',
            payload: {
              error: { message: err_MESSAGE },
            },
          });
        }
      }
    },
    [axios, dottedNotation, endPoint, props],
  );

  useEffect(() => {
    entityId && fetchEntity(entityId);
  }, [entityId, fetchEntity]);

  const onChange = (key: any, value: any) => dispatch({ type: 'ENTITY_CHANGED', payload: { key, value } });

  const mergeEntity = (entity: any) => dispatch({ type: 'SET_ENTITY', payload: { entity } });

  return {
    onChange,
    state,
    mergeEntity,
    handleSubmit,
    handleSave,
    errors: validator(entity, fields),
  };
};
