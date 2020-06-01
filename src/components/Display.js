import React from 'react';
import PropTypes from 'prop-types';

function Display({ finalValue }) {
  return (
    <div>{finalValue}</div>
  );
}

Display.propTypes = {
  finalValue: PropTypes.string,
};

Display.defaultProps = {
  finalValue: '0',
};

export default Display;
