import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <nav style={navStyle}>
                <Link title="Home" to="/">Home</Link>
                <Link title="Padel Section" to="/padel">Padel</Link>
                <Link title="Chalet Section" to="/chalets">Chalets</Link>
                <Link title="My Bookings" to="/my-bookings">My Bookings</Link>
                <Link title="Register" to="/register">Register</Link>
                <Link title="Login" to="/login">Login</Link>
            </nav>

            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '1rem',
    background: '#f4f4f4',
    alignItems: 'center',
    flexWrap: 'wrap'
};

export default Layout;