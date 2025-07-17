import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading) {
        return <p>...Loading</p>
    }

    if(!user || role !== 'admin'){
        return  <Navigate to="/" replace />;
    }
    return children;
};

export default AdminRoute;