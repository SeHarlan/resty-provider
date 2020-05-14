import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import { customFetch } from './services/custom';

const RestyContext = createContext();

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
    dispatch({ type: 'setResult', payload: ['...Loading (or Nothing Found)'] });
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

export const useGlobalState = () => {
  const { state } = useContext(RestyContext);
  return state;
};
export const useDispatch = () => {
  const { dispatch } = useContext(RestyContext);
  return dispatch;
};

export const useHandleSubmit = (e) => {
  e.preventDefault();
  const { url, selectedOption, json, name, password, bearerToken } = useGlobalState();
  const dispatch = useDispatch();
  dispatch({ type: 'setFetchData', payload: ({
    url: url,
    method: selectedOption,
    json: json,
    username: name,
    password: password,
    bearerToken: bearerToken
  })
  });
};
export const useHandleChange = ({ target }, toChange) => {
  const dispatch = useDispatch();
  dispatch({ type: toChange, payload: target.value });
};

