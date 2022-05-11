import { useCallback, useReducer } from 'react';
import validator from 'utils/validator';
import { isEmpty } from 'lodash';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SUBMIT_INIT':
      return {
        ...state,
        submitting: true,
      };
    case 'SUBMIT_ATTEMPTED':
      return {
        ...state,
        submitted: true,
        submittedAttempted: true,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitting: false,
        submitted: true,
        submitSuccess: true,
        submittedAttempted: false,
      };
    case 'SUBMIT_FAILURE':
      return {
        ...state,
        submitting: false,
        submitted: true,
        submitSuccess: false,
        submittedAttempted: false,
        asyncError: action.payload.error,
      };
    case 'ENTITY_CHANGED':
      return {
        ...state,
        entity: { ...state.entity, [action.payload.key]: action.payload.value },
      };

    case 'MERGE_ENTITY':
      return {
        ...state,
        entity: { ...state.entity, ...action.payload.entity },
      };

    case 'SET_ENTITY':
      return {
        ...state,
        entity: action.payload.entity,
        submitted: false,
        submittedAttempted: false,
      };
    default:
      throw new Error();
  }
};

let useForm = (initialValues = {}, fields = []) => {
  const [state, dispatch] = useReducer(formReducer, {
    submitting: false,
    submitted: false,
    submitSuccess: false,
    submittedAttempted: false,
    entity: initialValues,
  });

  const { entity } = state;

  const handleSubmit = useCallback(
    callback => async e => {
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
      } catch (e) {
        console.log(e);
        if (e.response && e.response.status) {
          dispatch({
            type: 'SUBMIT_FAILURE',
            payload: {
              error: {
                code: e.response.status,
                message: e.response.data,
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

  let onChange = useCallback((key, value) => dispatch({ type: 'ENTITY_CHANGED', payload: { key, value } }), []);

  const mergeEntity = entity => dispatch({ type: 'MERGE_ENTITY', payload: { entity } });

  const setEntity = entity => dispatch({ type: 'SET_ENTITY', payload: { entity } });

  return {
    formState: state,
    onChange,
    setEntity,
    handleSubmit,
    mergeEntity,
    errors: validator(entity, fields),
  };
};

export default useForm;
