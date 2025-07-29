import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const location = useLocation()

    if (user) {
        return children
    }

    if (loading) {
        return <div className=' flex justify-center items-center h-screen w-full'>
            <progress className="progress w-56 "></progress>
        </div>
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;