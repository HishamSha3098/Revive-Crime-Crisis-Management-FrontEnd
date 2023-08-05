import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';


const AdminProtectedRoute = ({ children,...rest}) => {
  console.log('Inside protected route');
  

  const admin=localStorage.getItem('admin_status')
  const staff=localStorage.getItem('Staff_status')
  

  return (
    <>
      {admin || staff ? children : <Navigate to='/login' />}
    </>
  );

};


export default AdminProtectedRoute;