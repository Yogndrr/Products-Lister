import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const UpdateLogout = ({ setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login');
    };

    return (
        <div className="logout-container">
            <h1>Now you will be redirected to the login page</h1>
            <button className="logout-btn logout" onClick={handleLogout}>Ok</button>
        </div>
    );
};

export default UpdateLogout;
