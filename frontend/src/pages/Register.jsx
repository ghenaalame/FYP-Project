import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3000/api/register',
                user
            );

            alert("Success: " + response.data.message);
            setUser({ name: '', email: '', password: '' });
            navigate('/login');

        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Server error"));
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Register to book padel courts and chalets</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Full name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="auth-button" type="submit">
                        Register
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;