import React, { useContext } from 'react'
import '../assest/css/navbar.css'
import { Link, useNavigate } from 'react-router-dom' 
import { UserContext } from '../App'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className='Navbar'>
      <div className='navbar-left'>
        <Link to="/" className='navbar-brand'>
          CONTACT MS
        </Link>
      </div>
      <div className='navbar-right'>
        {
          user ? (
            <>
              <Link to="/dashboard" className='navbar-link'>Contact</Link>
              <span className='navbar-link' style={{ color: '#fff', fontWeight: 'bold' }}>
                {user.name}
              </span>
              <button onClick={handleLogout} className='navbar-link' style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className='navbar-link'>Login</Link>
              <Link to="/register" className='navbar-link'>Register</Link>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;

