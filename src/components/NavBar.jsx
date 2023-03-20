import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const NavBar = ({ user }) => {

    const navigate = useNavigate()

    return (
        <div>
            <nav className='grey darken-4'>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">TODO</Link>
                    <Link to="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {user ?
                            <>
                                <li><Link to="/dashboard" className='btn waves-effect waves-light orange darken-2'>Dashboard</Link></li>
                                <li>
                                    <button className='waves-effect waves-light btn deep-orange' style={{ marginRight: '15px' }} onClick={() => {
                                        auth.signOut()
                                        window.M.toast({ html: `Logged out successfully!`, classes: "green darken-1" })
                                        navigate('/')
                                    }}>Logout</button>
                                </li>
                            </> :
                            <>
                                <li><Link to="/login" className='btn waves-effect waves-light orange darken-2'>Login</Link></li>
                                <li><Link to="/signup" className='btn waves-effect waves-light  light-green darken-2'>Signup</Link></li>
                            </>}
                    </ul>
                </div>
            </nav>
        </div >
    )
}

export default NavBar