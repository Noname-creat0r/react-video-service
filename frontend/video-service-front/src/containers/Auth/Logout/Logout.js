import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../store/slices/authSlice';

function Logout(props) {
    const dispatch = useDispatch()
    dispatch(logOut())

    return ( <Navigate  to="/"/>);
}

export default Logout;
