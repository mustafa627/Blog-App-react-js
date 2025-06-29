import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
//   return (
// //     localStorage.getItem("user") ? <Outlet />
// // : <Navigate to="/" />  
// )

 const role = JSON.parse(localStorage.getItem("userObj"))?.type
  return (
    // localStorage.getItem("user") && role == "user" ?
    //   <Outlet /> : <Navigate to={"/"} />
    localStorage.getItem("user") ?
      role === "user" ?
        <Outlet />
        : <Navigate to="/dashboard/admin" /> :
        <Navigate to="/" />
  )
}

export default Private
