import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { customFetch } from './services/custom';

const RestyContext = createContext();

const RestyProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('GET');
  const [json, setJson] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [history, setHistory] = useState([]);
  const [fetchData, setFetchData] = useState(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if(!fetchData) return; 
    setResult(['...Loading (or Nothing Found)']);
    customFetch(fetchData).then(res => {
      if(res === []) {
        setResult(['No Results Found']);
      } else {
        setResult(res);
        setHistory(prev => [...prev, fetchData]);
      }
    });
  }, [fetchData]);

  

  const handleJsonChange = ({ target }) => setJson(target.value);
  const handleUrlChange = ({ target }) => setUrl(target.value);
  const handleOptionChange = ({ target }) => setSelectedOption(target.value);
  const handleNameChange = ({ target }) => setName(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);
  const handleBearerTokenChange = ({ target }) => setBearerToken(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchData({
      url: url,
      method: selectedOption,
      json: json,
      username: name,
      password: password,
      bearerToken: bearerToken
    });
  };
  return (
    <RestyContext.Provider value={{
      url,
      json,
      password,
      name,
      bearerToken,
      selectedOption,
      history,
      result,
      handleSubmit,
      handleOptionChange,
      handleUrlChange,
      handleJsonChange,
      handleBearerTokenChange,
      handlePasswordChange,
      handleNameChange
    }}>
      {children}
    </RestyContext.Provider>
  );
};

RestyProvider.propTypes = {
  children: PropTypes.node
};

export default RestyProvider;

export const useGlobalState = () => {
  const state = useContext(RestyContext);
  return state;
};
