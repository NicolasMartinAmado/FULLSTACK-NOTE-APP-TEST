import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login({ username, password });
            navigate('/notes');
        } catch (err) {
          alert("ERROR, user dont exist")
            console.error(err);
        }
    };

    return ( 
      <div id='login'> 
        <div id='log'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log-in</button>
            </form>
            <Link to="/register" > If you dont have an account Register here!  </Link>
        </div>
        </div>
    );
};

export default Login;