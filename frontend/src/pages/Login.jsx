import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { getUserRole } from '../utils/auth';
import './Auth.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { setIsLoggedIn, setRole } = useOutletContext();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3000/api/login',
                credentials
            );

            localStorage.setItem('token', response.data.token);

            setIsLoggedIn(true);
            setRole(getUserRole());

            alert("Login successful!");
            navigate('/');
        } catch (err) {
            alert("Login failed: " + (err.response?.data?.message || "Server error"));
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to continue your reservation</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="auth-button" type="submit">
                        Login
                    </button>
                </form>

                <p className="auth-footer">
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;