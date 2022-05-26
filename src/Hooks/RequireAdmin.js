import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../Firebase.init';
import Loading from '../Shared/Loading';
import useAdmin from './useAdmin';



const RequireAdmin = ({children}) => {
    const [user,loading]=useAuthState(auth)
    const location=useLocation();
    const [admin,adminLoadin]=useAdmin(user)
    if(loading || adminLoadin){
        return <Loading></Loading>
    }

    if(!user || !admin){
        signOut(auth)
        return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
    }
    return children;
};

export default RequireAdmin;