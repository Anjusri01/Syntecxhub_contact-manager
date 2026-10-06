 import React, { createContext , useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Contact from './Pages/Contact.jsx'   
import AddContact from './Pages/addContact'
import Dashboard from './Pages/Dashboard'

export const UserContext = createContext(null)

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          { path: '/dashboard', element: <Contact />},
          { path: '/dashboard/add-contact', element: <AddContact /> } 
        ]
      }
    ]
  }
])

const App = () => {
  const [user, setUser] = useState(null); 
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{user,setUser}}>
       <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App;
