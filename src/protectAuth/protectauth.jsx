import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
export default function Protectauth({ children }) {
    //  profile ,home
    if (!localStorage.getItem('token')) {
        return <Navigate to='/' />
    } else {
        return children
    }
}
