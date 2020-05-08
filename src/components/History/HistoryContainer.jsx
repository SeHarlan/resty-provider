import React from 'react';
import PropTypes from 'prop-types';
import withList from '../../HOCs/WithList';

import style from './HistoryContainer.css';
import { useGlobalState } from '../../RestyProvider';

const HistoryItem = ({ url, method }) => (
  <>
    <h2>{method}</h2>
    <p>{url}</p>
  </>
);

HistoryItem.propTypes = {
  method: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

const HistoryElements = withList(HistoryItem);

const HistoryContainer = () => {
  const { history } = useGlobalState();
  return (
    <section className={style.HistoryContainer}>
      <h3>History</h3>
      <HistoryElements list={history} />
    </section>
  );

};

HistoryContainer.propTypes = {
  history: PropTypes.array
};

export default HistoryContainer;
