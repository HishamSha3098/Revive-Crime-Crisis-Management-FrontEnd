import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children,...rest}) => {
  console.log('Inside protected route');
  
  const userid=localStorage.getItem('user_id')
  

  return (
    <>
      {userid ? children : <Navigate to='/login' />}
    </>
  );

};


export default ProtectedRoute;