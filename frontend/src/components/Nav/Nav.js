import React from "react";
// router components
import { Link, useNavigate } from 'react-router-dom';
// styles 
import './styles/nav.css';
// fake data
import { fakeUser } from "../../utils/fakedata";
// Api


export const Nav = () => {
    // temp fake user
    const user = fakeUser;

    // navigate page paths
    const navigate = useNavigate();

    // logout and return to login page
    const handleLogout = (e) => {
        e.preventDefault();
        // api call here
        navigate('/');
    }

    return (
        <nav className="nav-container">
            <div>
                <Link to='/articles'>All Articles</Link>
            </div>
            <div className="logout-prof">
                <button onClick={(e) => handleLogout(e)}>Logout</button>
                <Link to='/profile'>
                    <div className="profile">{user.username[0]}</div>
                </Link>
            </div>
        </nav>
    )
}