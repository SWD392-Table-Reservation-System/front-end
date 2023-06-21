import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let location = useLocation();

    if(!localStorage.getItem('token')) {
        return <Navigate to="/admin" state={{ from: location}} replace />
    }
 return children
  
};

export default ProtectedRoute;