import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

const AdminBookings = () => {
    const [padelBookings, setPadelBookings] = useState([]);
    const [chaletBookings, setChaletBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminBookings = async () => {
            const token = localStorage.getItem('token');

            if (!token || !isTokenValid()) {
                navigate('/login');
                return;
            }

            try {
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const padelRes = await axios.get(
                    'http://localhost:3000/api/admin/padel-bookings',
                    { headers }
                );

                const chaletRes = await axios.get(
                    'http://localhost:3000/api/admin/chalet-bookings',
                    { headers }
                );

                setPadelBookings(padelRes.data);
                setChaletBookings(chaletRes.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Admin access denied');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminBookings();
    }, [navigate]);

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading admin bookings...</p>;
    }

    return (
        <div style={pageStyle}>
            <h1 style={titleStyle}>Admin Bookings</h1>

            <section style={sectionStyle}>
                <h2>🎾 All Padel Bookings</h2>

                {padelBookings.length === 0 ? (
                    <p>No padel bookings found.</p>
                ) : (
                    <div style={tableWrapperStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>User</th>
                                    <th style={thStyle}>Email</th>
                                    <th style={thStyle}>Court</th>
                                    <th style={thStyle}>Date</th>
                                    <th style={thStyle}>Time</th>
                                    <th style={thStyle}>Total</th>
                                    <th style={thStyle}>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {padelBookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td style={tdStyle}>{booking.user_name}</td>
                                        <td style={tdStyle}>{booking.user_email}</td>
                                        <td style={tdStyle}>{booking.court_name}</td>
                                        <td style={tdStyle}>{formatDate(booking.booking_date)}</td>
                                        <td style={tdStyle}>
                                            {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                                        </td>
                                        <td style={tdStyle}>${booking.total_price}</td>
                                        <td style={tdStyle}>
                                            <span style={getStatusStyle(booking.status)}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section style={sectionStyle}>
                <h2>🏡 All Chalet Bookings</h2>

                {chaletBookings.length === 0 ? (
                    <p>No chalet bookings found.</p>
                ) : (
                    <div style={tableWrapperStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>User</th>
                                    <th style={thStyle}>Email</th>
                                    <th style={thStyle}>Chalet</th>
                                    <th style={thStyle}>Type</th>
                                    <th style={thStyle}>Check-in</th>
                                    <th style={thStyle}>Check-out</th>
                                    <th style={thStyle}>Total</th>
                                    <th style={thStyle}>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {chaletBookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td style={tdStyle}>{booking.user_name}</td>
                                        <td style={tdStyle}>{booking.user_email}</td>
                                        <td style={tdStyle}>{booking.chalet_name}</td>
                                        <td style={tdStyle}>{booking.chalet_type}</td>
                                        <td style={tdStyle}>{formatDate(booking.check_in_date)}</td>
                                        <td style={tdStyle}>{formatDate(booking.check_out_date)}</td>
                                        <td style={tdStyle}>${booking.total_price}</td>
                                        <td style={tdStyle}>
                                            <span style={getStatusStyle(booking.status)}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const formatTime = (time) => {
    return time?.slice(0, 5);
};

const getStatusStyle = (status) => {
    if (status === 'cancelled') {
        return {
            ...statusStyle,
            backgroundColor: '#fee2e2',
            color: '#991b1b'
        };
    }

    return statusStyle;
};

const pageStyle = {
    padding: '40px',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '35px',
    color: '#111827'
};

const sectionStyle = {
    backgroundColor: 'white',
    padding: '28px',
    borderRadius: '18px',
    boxShadow: '0 8px 22px rgba(0,0,0,0.07)',
    marginBottom: '35px'
};

const tableWrapperStyle = {
    overflowX: 'auto',
    marginTop: '20px'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '850px'
};

const thStyle = {
    backgroundColor: '#111827',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    fontSize: '14px'
};

const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '14px',
    color: '#374151'
};

const statusStyle = {
    display: 'inline-block',
    padding: '5px 10px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 'bold'
};

export default AdminBookings;