import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({type, size = 'md', inline = false }) => {
  let spinnerSize;

  switch (size) {
    case 'sm':
      spinnerSize = 'spinner-border-sm';
      break;
    case 'lg':
      spinnerSize = 'spinner-border-lg';
      break;
    default:
      spinnerSize = '';
  }

  return (
    <div className={`loader-container ${inline ? 'loader-inline' : ''}`}>
      <Spinner animation="border" role="status" className={spinnerSize}>
        <span className="sr-only">{type!=='button' && 'Loading...'}</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
