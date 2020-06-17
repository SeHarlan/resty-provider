import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import { customFetch } from './services/custom';

const RestyContext = createContext();

//TO DO: remove form specific state from Global state and place in Form's local state for a cleaner Context Provider

const initialState = {
  selectedOption: 'GET',
  json: '',
  url: '',
  name: '',
  password: '',
  bearerToken: '',
  history: [],
  fetchData: null,
  result: []
};
function reducer(state, action) {
  switch(action.type) {
    case 'setSelectedOption':
      return { ...state, selectedOption: action.payload };
    case 'setJson':
      return { ...state, json: action.payload };
    case 'setUrl': 
      return { ...state, url: action.payload };
    case 'setName':
      return { ...state, name: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    case 'setBearerToken':
      return { ...state, bearerToken: action.payload };
    case 'setHistory':
      return { ...state, history: [...state.history, action.payload] };
    case 'setFetchData': 
      return { ...state, fetchData: action.payload };
    case 'setResult':
      return { ...state, result: action.payload };
    default:
      return state;
  }
}

const RestyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetchData } = state;

  useEffect(() => {
    if(!fetchData) return; 
    dispatch({ type: 'setResult', payload: ['...Loading (or Nothing Found)'] }); //loading state
    customFetch(fetchData).then(res => {
      if(res === []) {
        dispatch({ type: 'setResult', payload: ['No Results Found'] });
      } else {
        dispatch({ type: 'setResult', payload: res });
        dispatch({ type: 'setHistory', payload: fetchData });
      }
    });
  }, [fetchData]);

  return (
    <RestyContext.Provider value={{ state, dispatch }}>
      {children}
    </RestyContext.Provider>
  );
};

RestyProvider.propTypes = {
  children: PropTypes.node
};

export default RestyProvider;

//exports getters and setters for easier access to context provider
export const useGlobalState = () => {
  const { state } = useContext(RestyContext);
  return state;
};
export const useDispatch = () => {
  const { dispatch } = useContext(RestyContext);
  return dispatch;
};



