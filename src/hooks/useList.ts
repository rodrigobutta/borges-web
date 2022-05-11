import { useEffect, useReducer, useState } from 'react';
import dot from 'dot-object';
import { useAxios } from './useAxiosV2';
import { ITEMS_PER_PAGE } from '../constants';

interface UseListHookProps {
  url: string;
  initialQuery?: any;
  transform?: any;
  initialSort?: any;
  method?: string;
  dottedNotation?: boolean;
}

export const useList = ({
  url,
  initialQuery,
  transform,
  initialSort,
  method = 'GET',
  dottedNotation = false,
}: UseListHookProps) => {
  const { axios } = useAxios();

  const [fetching, setFetching] = useState(false);

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

      case 'SET_ITEMS_PER_PAGE':
        return {
          ...state,
          itemsPerPage: payload,
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

      case 'SET_QUERY':
        return {
          ...state,
          query: { ...payload.query },
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
    addedItems: [],
    page: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    query: initialQuery,
    s: initialSort,
    sort: initialSort,
    updates: 0,
  });

  const { query, page, s, addedItems, updates } = state;

  const onChange = (key: string, value: any) => {
    dispatch({ type: 'QUERY_CHANGED', payload: { key, value } });
  };

  const mergeQuery = (query: any) => dispatch({ type: 'MERGE_QUERY', payload: { query } });

  const setQuery = (query: any) => dispatch({ type: 'SET_QUERY', payload: { query } });

  const update = () => {
    dispatch({ type: 'UPDATE', payload: {} });
  };

  const setPage = (page: any) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const setItemsPerPage = (ipp: any) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: ipp });
  };

  const setSort = (sort: any) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      setFetching(true);

      try {
        const filters = transform ? transform(query) : query;

        // const requestFn = () => method === 'POST'
        //   ? !!axios && axios.get
        //   : !!axios && axios.post

        if (method === 'POST') {
          !!axios &&
            axios.post(url, { filters, ...query, page, sort: s }).then(res => {
              if (res.status < 500 && res.data) {
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });

                res.data?.itemsPerPage && setItemsPerPage(res.data?.itemsPerPage);

                setFetching(false);
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
                setFetching(false);
              }
            });
        } else {
          !!axios &&
            axios
              .get(url, {
                params: { filters, ...query, page, sort: s },
              })
              .then(res => {
                if (res.status < 500 && res.data) {
                  dispatch({ type: 'FETCH_SUCCESS', payload: res.data });

                  res.data?.itemsPerPage && setItemsPerPage(res.data?.itemsPerPage);

                  setFetching(false);
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
                  setFetching(false);
                }
              });
        }
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
          setFetching(false);
        } else {
          dispatch({
            type: 'FETCH_FAILURE',
            payload: {
              error: { message: 'Lo lamentamos mucho, algo salio mal.' },
            },
          });
          setFetching(false);
        }
      }
    };

    fetchData();
  }, [axios, url, query, page, s, transform, addedItems, updates, method]);

  return {
    state,
    onChange,
    setPage,
    setItemsPerPage,
    setSort,
    update,
    mergeQuery,
    setQuery,
    fetching,
  };
};
