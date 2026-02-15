import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const [ credentials , setCredentials] = useState({
        email : '',
        password : ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials , [e.target.name] : e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
                'http://localhost:3000/api/login',credentials
            );
            localStorage.setItem('token', response.data.token); // Save the token for future use
            alert("Login successful!");
            navigate('/'); // Redirect to home page after successful login
        }catch(err){
            alert("Login failed: " + (err.response?.data?.message || "Server error"));
        }
    };

    return(
        <div style={{ padding: "20px" }}>
            <h2>Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );

};

export default Login;