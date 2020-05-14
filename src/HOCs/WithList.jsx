import React from 'react';
import PropTypes from 'prop-types';

const withList = (ItemComponent) => {
  const WithListHOC = (props) => {
    const listItems = props.list.map(item => (
      <li key={item.id || Math.random().toString(36).substring(7)}>
        <ItemComponent {...item} />
      </li>
    ));
    return (
      <ul>
        {listItems}
      </ul>
    );
  };
  WithListHOC.displayName = `WithList(${ItemComponent.name})`;

  WithListHOC.propTypes = {
    list: PropTypes.array.isRequired
  };
  
  return WithListHOC;
};

withList.propTypes = {
  ItemComponent: PropTypes.func.isRequired,
};


export default withList;
