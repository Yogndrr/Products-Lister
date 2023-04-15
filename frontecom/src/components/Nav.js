import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = ({ loggedIn }) => {
    const location = useLocation();

    return (
        <nav>
            {loggedIn
                ? (
                    <ul className="left-links">
                        <li className={location.pathname === '/' ? 'active' : ''}>
                            <Link to="/">Product</Link>
                        </li>
                        <li className={location.pathname === '/profile' ? 'active' : ''}>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li className={location.pathname === '/logout' ? 'active' : ''}>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                )
                : (
                    <ul className="right-links">
                        <li className={location.pathname === '/login' ? 'active' : ''}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={location.pathname === '/signup' ? 'active' : ''}>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                )
            }
        </nav>
    );
};

export default Nav;
