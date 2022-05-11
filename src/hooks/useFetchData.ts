import { useEffect, useReducer } from 'react';
import { useAxios } from './useAxiosV2';
import dot from 'dot-object';

export const useFetchData = ({
  url,
  initialQuery,
  transform,
  initialSort,
  method = 'GET',
  dottedNotation = false,
}: any) => {
  const { axios } = useAxios();

  const dataFetchReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };

      case 'FETCH_SUCCESS':
        const rows = dottedNotation ? payload.rows.map((r: any) => dot.dot(r)) : payload.rows;

        return {
          ...state,
          isLoading: false,
          isError: false,
          data: rows,
          count: payload.count,
        };

      case 'ADD_ITEM':
        return {
          ...state,
          addedItems: [...state.addedItems, payload],
        };

      case 'QUERY_CHANGED':
        return {
          ...state,
          query: { ...state.query, [payload.key]: payload.value },
          page: 1,
        };

      case 'SET_PAGE':
        return {
          ...state,
          page: payload,
        };

      case 'SET_SORT':
        return {
          ...state,
          s: payload,
        };

      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
          asyncError: payload.error,
        };

      case 'MERGE_QUERY':
        return {
          ...state,
          query: { ...state.query, ...payload.query },
        };

      case 'UPDATE':
        return {
          ...state,
          updates: state.updates + 1,
        };

      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: [],
    page: 1,
    query: initialQuery,
    s: initialSort,
    updates: 0,
  });

  const { query, page, s, updates } = state;

  const onChange = (key: any, value?: any) => {
    dispatch({ type: 'QUERY_CHANGED', payload: { key, value } });
  };

  const mergeQuery = (query: any) => dispatch({ type: 'MERGE_QUERY', payload: { query } });

  const update = () => {
    dispatch({ type: 'UPDATE', payload: {} });
  };

  const setPage = (page: any) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const setSort = (sort: any) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const filters: any = transform ? transform(query) : query;

        // const requestFn = () => method === 'POST'
        //   ? !!axios && axios.get
        //   : !!axios && axios.post

        if (method === 'POST') {
          !!axios &&
            axios.post(url, { filters, page, sort: s }).then(res => {
              if (res.status < 500 && res.data) {
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
              } else {
                dispatch({
                  type: 'FETCH_FAILURE',
                  payload: {
                    error: {
                      code: res.status,
                      message: res.data,
                    },
                  },
                });
              }
            });
        } else {
          !!axios &&
            axios.get(url, { params: { filters, page, sort: s } }).then(res => {
              if (res.status < 500 && res.data) {
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
              } else {
                dispatch({
                  type: 'FETCH_FAILURE',
                  payload: {
                    error: {
                      code: res.status,
                      message: res.data,
                    },
                  },
                });
              }
            });
        }

        // if(result.status < 500 && result.data) {
        //   dispatch({ type: "FETCH_SUCCESS", payload: result });
        // }
        // else {
        //   dispatch({
        //     type: "FETCH_FAILURE",
        //     payload: {
        //       error: {
        //         code: result.status,
        //         message: result.data,
        //       },
        //     },
        //   });
        // }
      } catch (e: any) {
        if (e.response && e.response.status) {
          dispatch({
            type: 'FETCH_FAILURE',
            payload: {
              error: {
                code: e.response.status,
                message: e.response.data,
              },
            },
          });
        } else {
          dispatch({
            type: 'FETCH_FAILURE',
            payload: {
              error: { message: 'Lamentamos, ocorreu um erro.' },
            },
          });
        }
      }
    };

    fetchData();
  }, [axios, url, query, page, s, transform, updates, method]);
  // }, [axios, url, query, page, s, transform, updates, method]);

  return {
    state,
    onChange,
    setPage,
    setSort,
    update,
    mergeQuery,
  };
};
