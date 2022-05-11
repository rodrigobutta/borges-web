import { FETCH_SUCCESS_USER, FETCH_ERROR_USER } from '../constants';

const initialState = {
  loading: true,
  error: '',
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS_USER:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case FETCH_ERROR_USER:
      return {
        loading: true,
        data: [],
        error: 'This is not found',
      };
    default:
      return state;
  }
};

export const User = { initialState, reducer };
