import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isTokenValid } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

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
                    `${API_URL}/api/admin/padel-bookings`,
                    { headers }
                );

                const chaletRes = await axios.get(
                    `${API_URL}/api/admin/chalet-bookings`,
                    { headers }
                );

                setPadelBookings(padelRes.data);
                setChaletBookings(chaletRes.data);
            } catch (err) {
                toast.error(err.response?.data?.message || 'Admin access denied');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminBookings();
    }, [navigate]);

    const cancelPadelBooking = async (bookingId) => {
        const confirmCancel = window.confirm('Are you sure you want to cancel this padel booking?');
        if (!confirmCancel) return;

        try {
            const token = localStorage.getItem('token');

            await axios.put(
                `${API_URL}/api/admin/padel-bookings/${bookingId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPadelBookings(prev =>
                prev.map(booking =>
                    booking.id === bookingId
                        ? { ...booking, status: 'cancelled' }
                        : booking
                )
            );

            toast.success('Padel booking cancelled successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to cancel padel booking');
        }
    };

    const cancelChaletBooking = async (bookingId) => {
        const confirmCancel = window.confirm('Are you sure you want to cancel this chalet booking?');
        if (!confirmCancel) return;

        try {
            const token = localStorage.getItem('token');

            await axios.put(
                `${API_URL}/api/admin/chalet-bookings/${bookingId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setChaletBookings(prev =>
                prev.map(booking =>
                    booking.id === bookingId
                        ? { ...booking, status: 'cancelled' }
                        : booking
                )
            );

            toast.success('Chalet booking cancelled successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to cancel chalet booking');
        }
    };

    const totalPadelBookings = padelBookings.length;
    const totalChaletBookings = chaletBookings.length;
    const totalBookings = totalPadelBookings + totalChaletBookings;

    const totalRevenue =
        padelBookings.reduce((sum, booking) => sum + Number(booking.total_price), 0) +
        chaletBookings.reduce((sum, booking) => sum + Number(booking.total_price), 0);

    const activeBookings =
        padelBookings.filter(booking => booking.status === 'confirmed').length +
        chaletBookings.filter(booking => booking.status === 'confirmed').length;

    const cancelledBookings =
        padelBookings.filter(booking => booking.status === 'cancelled').length +
        chaletBookings.filter(booking => booking.status === 'cancelled').length;

    if (loading) {
        return (
            <p style={{ textAlign: 'center', marginTop: '40px' }}>
                Loading admin bookings...
            </p>
        );
    }

    return (
        <div style={pageStyle}>
            <h1 style={titleStyle}>Admin Bookings</h1>

            <div style={statsGridStyle}>
                <div style={statCardStyle}>
                    <span style={statIconStyle}>🎾</span>
                    <h3 style={statNumberStyle}>{totalPadelBookings}</h3>
                    <p style={statLabelStyle}>Padel Bookings</p>
                </div>

                <div style={statCardStyle}>
                    <span style={statIconStyle}>🏡</span>
                    <h3 style={statNumberStyle}>{totalChaletBookings}</h3>
                    <p style={statLabelStyle}>Chalet Bookings</p>
                </div>

                <div style={statCardStyle}>
                    <span style={statIconStyle}>📅</span>
                    <h3 style={statNumberStyle}>{totalBookings}</h3>
                    <p style={statLabelStyle}>Total Reservations</p>
                </div>

                <div style={statCardStyle}>
                    <span style={statIconStyle}>💰</span>
                    <h3 style={statNumberStyle}>${totalRevenue.toFixed(2)}</h3>
                    <p style={statLabelStyle}>Total Revenue</p>
                </div>

                <div style={statCardStyle}>
                    <span style={statIconStyle}>✅</span>
                    <h3 style={statNumberStyle}>{activeBookings}</h3>
                    <p style={statLabelStyle}>Active Bookings</p>
                </div>

                <div style={statCardStyle}>
                    <span style={statIconStyle}>❌</span>
                    <h3 style={statNumberStyle}>{cancelledBookings}</h3>
                    <p style={statLabelStyle}>Cancelled</p>
                </div>
            </div>

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
                                    <th style={thStyle}>Phone</th>
                                    <th style={thStyle}>Court</th>
                                    <th style={thStyle}>Date</th>
                                    <th style={thStyle}>Time</th>
                                    <th style={thStyle}>Total</th>
                                    <th style={thStyle}>Status</th>
                                    <th style={thStyle}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {padelBookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td style={tdStyle}>{booking.user_name}</td>
                                        <td style={tdStyle}>{booking.user_email}</td>
                                        <td style={tdStyle}>{booking.user_phone || 'N/A'}</td>
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
                                        <td style={tdStyle}>
                                            {booking.status === 'confirmed' ? (
                                                <button
                                                    onClick={() => cancelPadelBooking(booking.id)}
                                                    style={cancelButtonStyle}
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span style={disabledTextStyle}>No action</span>
                                            )}
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
                                    <th style={thStyle}>Phone</th>
                                    <th style={thStyle}>Chalet</th>
                                    <th style={thStyle}>Type</th>
                                    <th style={thStyle}>Check-in</th>
                                    <th style={thStyle}>Check-out</th>
                                    <th style={thStyle}>Total</th>
                                    <th style={thStyle}>Status</th>
                                    <th style={thStyle}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {chaletBookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td style={tdStyle}>{booking.user_name}</td>
                                        <td style={tdStyle}>{booking.user_email}</td>
                                        <td style={tdStyle}>{booking.user_phone || 'N/A'}</td>
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
                                        <td style={tdStyle}>
                                            {booking.status === 'confirmed' ? (
                                                <button
                                                    onClick={() => cancelChaletBooking(booking.id)}
                                                    style={cancelButtonStyle}
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span style={disabledTextStyle}>No action</span>
                                            )}
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
    padding: 'clamp(16px, 4vw, 40px)',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '35px',
    color: '#111827'
};

const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))',
    gap: '18px',
    marginBottom: '35px'
};

const statCardStyle = {
    backgroundColor: 'white',
    padding: '22px',
    borderRadius: '18px',
    boxShadow: '0 8px 22px rgba(0,0,0,0.07)',
    textAlign: 'center',
    border: '1px solid #e5e7eb'
};

const statIconStyle = {
    fontSize: '30px'
};

const statNumberStyle = {
    margin: '10px 0 4px',
    fontSize: '26px',
    color: '#111827'
};

const statLabelStyle = {
    margin: 0,
    color: '#6b7280',
    fontWeight: 'bold',
    fontSize: '14px'
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
    minWidth: '1050px'
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

const cancelButtonStyle = {
    padding: '7px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px'
};

const disabledTextStyle = {
    color: '#9ca3af',
    fontSize: '13px'
};

export default AdminBookings;