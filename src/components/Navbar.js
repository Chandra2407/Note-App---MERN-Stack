import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (props) => {
  let location = useLocation();
  useEffect(() => {

  }, [location])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a className="navbar-brand" href="/">Note App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`} to="/users">Users </Link>
            </li>
          </ul>
          <form className='d-flex nav-btn'>
              <Link className='btn btn-primary' to='/login' role='button'>Login</Link>    
              <Link className='btn btn-primary mx-2' to='/signup' role='button'>Sign up</Link>
          </form>
        </div>
      </nav>

    </>
  )
}
export default Navbar;