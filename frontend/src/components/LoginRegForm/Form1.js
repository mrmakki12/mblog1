import React, { useState } from 'react';
// react router
import { useNavigate } from 'react-router-dom';
// styles
import './styles/form1.css';
// Api
import mBlog from '../../API/mBlog';

export const Form1 = () => {

    // used to toggle between 
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    // form state
    
    // login
    const [loginUser, setLoginUser] = useState('');
    const [loginPass, setLoginPass] = useState('');

    // registration
    const [regUser, setRegUser] = useState('');
    const [regPass, setRegPass] = useState('');
    const [repRegPass, setRepRegPass] = useState('');

    // navigation
    const navigate = useNavigate();

    // login
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await mBlog.post('/api/v1/login', {username: loginUser, password: loginPass});
        response.data.message === 'Success' ? navigate('/profile') : alert('Login Attempt Failed');
    };

    // register 
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await mBlog.post('/api/v1/register', {username: regUser, password: regPass});
        response.data.message === 'User Created!' ? toggleTab(1) : alert('User Already Exist');
        setRegPass('');
        setRepRegPass('');
        setRegUser('');
    };

    return (
        <div className="container">
            <div className="bloc-tabs">
                {/* Login Tab */}
                <button
                    id='form1-1'
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                    >
                    <h2>Login</h2>
                </button>
                {/* Register Tab */}
                <button
                    id='form1-2'
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                    >
                    <h2>Register</h2>
                </button>

            </div>

            <div className="content-tabs">
                {/* Login Form container */}
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                    >
                    {/* Form itself */}
                    <form aria-label='form'>
                        <div>
                            <label htmlFor='Username1'>Usernsame</label>
                            <input
                                id='Username1'
                                required
                                min={5}
                                max={20}
                                type='text'
                                value={loginUser}
                                onChange={(e) => setLoginUser(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='Password1'>Password</label>
                            <input 
                                id='Password1'
                                required
                                min={10}
                                max={30}
                                type='password'
                                value={loginPass}
                                onChange={(e) => setLoginPass(e.target.value)}
                            />
                        </div>
                        <div>
                            <button 
                                type='submit'
                                onClick={(e) => handleLogin(e)}
                                disabled={loginPass === '' || loginUser === '' ? true : false}
                                >Login
                            </button>
                        </div>
                    </form>
                    
                </div>
                {/* Register Form container */}
                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                    >
                    {/* Form itself  */}
                    <form aria-label='form'>
                        <div>
                            <label htmlFor='Username'>Usernsame</label>
                            <input
                                id='Username'
                                required
                                min={5}
                                max={20}
                                type='text'
                                value={regUser}
                                onChange={(e) => setRegUser(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='Password'>Password</label>
                            <input 
                                id='Password'
                                required
                                min={10}
                                max={30}
                                type='password'
                                value={regPass}
                                onChange={(e) => setRegPass(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='rPassword'>Repeat Password</label>
                            <input 
                                id='rPassword'
                                required
                                min={10}
                                max={30}
                                type='password'
                                value={repRegPass}
                                onChange={(e) => setRepRegPass(e.target.value)}
                            />
                        </div>
                        <div>
                            <button 
                                type='submit'
                                onClick={(e) => handleRegister(e)}
                                disabled={regUser === '' || regPass === '' || repRegPass === ''  || regPass !== repRegPass ? true : false }
                                >Register
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}