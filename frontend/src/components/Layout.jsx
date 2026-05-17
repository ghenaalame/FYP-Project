import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        alert('Logged out successfully');
        navigate('/login');
    };

    return (
        <div>
            <nav style={navStyle}>
                <div style={leftLinksStyle}>
                    <Link to="/" style={linkStyle}>Home</Link>
                    <Link to="/padel" style={linkStyle}>Padel</Link>
                    <Link to="/chalets" style={linkStyle}>Chalets</Link>

                    {isLoggedIn && (
                        <Link to="/my-bookings" style={linkStyle}>My Bookings</Link>
                    )}
                </div>

                <div style={rightLinksStyle}>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/register" style={linkStyle}>Register</Link>
                            <Link to="/login" style={loginButtonStyle}>Login</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} style={logoutButtonStyle}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            <main style={{ padding: '20px' }}>
                <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
            </main>
        </div>
    );
};

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    padding: '1rem 2rem',
    background: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    flexWrap: 'wrap'
};

const leftLinksStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap'
};

const rightLinksStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
};

const linkStyle = {
    color: '#1f2937',
    textDecoration: 'none',
    fontWeight: '600'
};

const loginButtonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold'
};

const logoutButtonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '9px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default Layout;