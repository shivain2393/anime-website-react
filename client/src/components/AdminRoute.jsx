import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const AdminRoute = () => {

    const { currentUser } = useSelector(state => state.user)

    return currentUser.role === 'admin' ? <Outlet />  : <Navigate to="/profile" />
}

export default AdminRoute
