import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Navbar'

function Layout() {
  return (
    <div>
        <Nav/>
        <Outlet/>
         </div>
  )
}

export default Layout