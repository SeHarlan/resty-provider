import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ value, selectedOption, onOptionChange }) => (
  <>
    <input checked={selectedOption === value} id={value} type="radio" name="method" value={value} onChange={onOptionChange} />
    <label htmlFor={value}>{value}</label>
  </>
);
RadioButton.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onOptionChange: PropTypes.func.isRequired
};
export default RadioButton;
