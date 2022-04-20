import React, { useEffect, useState } from "react";
// router components
import { Link, useNavigate } from 'react-router-dom';
// styles 
import './styles/nav.css';
// Api
import mBlog from "../../API/mBlog";

export const Nav = () => {

    // user state
    const [user, setUser] = useState({});

    // get user
    useEffect(() => {
        const fetchUser = async () => {
            const result = await mBlog.get('/api/v1/user');
            setUser(result.data[0]);
        };
        fetchUser();
    }, []);

    console.log(user);

    // navigate page paths
    const navigate = useNavigate();

    // logout and return to login page
    const handleLogout = async (e) => {
        e.preventDefault();
        // api call here
        await mBlog.post('/api/v1/logout');
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
                    <div className="profile">{user.username && user.username[0]}</div>
                </Link>
            </div>
        </nav>
    )
}