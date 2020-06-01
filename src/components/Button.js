import React from 'react';
import PropTypes from 'prop-types';

function styleBtn(color, width) {
  const style = { backgroundColor: color };
  style.flexBasis = width ? '50%' : '25%';
  return style;
}
function Button({ name, color, width }) {
  return <button className="key-button" type="button" style={styleBtn(color, width)}>{name}</button>;
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

Button.defaultProps = {
  color: '#FCA800',
};

export default Button;
