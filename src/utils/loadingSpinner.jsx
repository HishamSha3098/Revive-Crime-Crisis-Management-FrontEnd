import React from 'react';
import '../utils/Loading.css'

const LoadingSpinner = () => {
  return (
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
