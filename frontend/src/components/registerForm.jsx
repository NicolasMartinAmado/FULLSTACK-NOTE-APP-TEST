import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import './login.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register({ username, password });
            navigate('/login');
        } catch (err) {
            alert("Error, try again or put valid information")
            console.error(err);
        }
    };

    return (
        <div id='login'> 
        <div id='log'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <a href="/login">You already have an account? Log In here!</a>
        </div>
        </div>
    );
};

export default Register;