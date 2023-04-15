import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const PrivateComponent = ({ signed }) => {
    return (
        signed ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateComponent