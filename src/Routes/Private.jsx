import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
  return (
    localStorage.getItem("user") ? <Outlet />
: <Navigate to="/" />  )
}

export default Private
