import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            return false;
        }

        return true;
    } catch (err) {
        localStorage.removeItem('token');
        return false;
    }
};