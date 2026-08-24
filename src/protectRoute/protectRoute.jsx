import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectRoute({ children }) {
    // register , login 
    if (localStorage.getItem('token')) {
        return <Navigate to='/home' />
    } else {
        return children
    }
}
