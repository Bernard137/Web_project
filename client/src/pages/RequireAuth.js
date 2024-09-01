import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const RequireAuth = () => {
    let auth = sessionStorage.getItem("auth");
    return (
        (auth == "true" ? <Outlet /> : <Navigate to="/login" replace />)
    )
}

export default RequireAuth