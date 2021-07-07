import { Link } from 'react-router-dom';
import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i clLinkssName="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="!#">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}


export default Navbar;