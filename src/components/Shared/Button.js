import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, buttonText, buttonType, isLoading, type, isDisabled = false }) => {

  let buttonClassName;

  if (buttonType === 'confirm') {
    buttonClassName = 'btn btn-success';
  } else if (buttonType === 'cancel' || buttonType === 'previous') {
    buttonClassName = 'btn bg_darkgray mr-2';
  } else {
    buttonClassName = 'btn btn-darkbrule';
  }

  return (
    <button className={buttonClassName} onClick={onClick} disabled={isLoading || isDisabled} type={type}>
      {isLoading ? (
        <span>
          <i className="spinner-border spinner-border-sm mr-1"></i> {buttonText}
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
};
Button.propTypes = {
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    buttonText: PropTypes.string,
    buttonType: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null, undefined]),
    ]),
    isDisabled: PropTypes.bool,
    onClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf([null, undefined]),
    ])
};
export default Button;
