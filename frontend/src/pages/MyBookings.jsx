import { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
    const [padelBookings, setPadelBookings] = useState([]);
    const [chaletBookings, setChaletBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const padelRes = await axios.get(
                    'http://localhost:3000/api/padel-bookings/my-bookings',
                    { headers }
                );

                const chaletRes = await axios.get(
                    'http://localhost:3000/api/chalet-bookings/my-bookings',
                    { headers }
                );

                setPadelBookings(padelRes.data);
                setChaletBookings(chaletRes.data);
            } catch (err) {
                console.error(err);
                alert('Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading bookings...</p>;
    }

    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <div style={pageStyle}>
                <div style={sectionStyle}>
                    <h1 style={titleStyle}>My Bookings</h1>
                    <p style={{ textAlign: 'center', color: '#6b7280' }}>
                        Please login to view your bookings.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <h1 style={titleStyle}>My Bookings</h1>

            <section style={sectionStyle}>
                <h2>🎾 Padel Bookings</h2>

                {padelBookings.length === 0 ? (
                    <p style={emptyStyle}>No padel bookings yet.</p>
                ) : (
                    <div style={gridStyle}>
                        {padelBookings.map(booking => (
                            <div key={booking.id} style={cardStyle}>
                                <h3>{booking.court_name}</h3>
                                <p><strong>Location:</strong> {booking.location}</p>
                                <p><strong>Date:</strong> {formatDate(booking.booking_date)}</p>
                                <p><strong>Time:</strong> {booking.start_time} - {booking.end_time}</p>
                                <p><strong>Total:</strong> ${booking.total_price}</p>
                                <span style={statusStyle}>{booking.status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section style={sectionStyle}>
                <h2>🏡 Chalet Bookings</h2>

                {chaletBookings.length === 0 ? (
                    <p style={emptyStyle}>No chalet bookings yet.</p>
                ) : (
                    <div style={gridStyle}>
                        {chaletBookings.map(booking => (
                            <div key={booking.id} style={cardStyle}>
                                <h3>{booking.chalet_name}</h3>
                                <p><strong>Type:</strong> {booking.chalet_type}</p>
                                <p><strong>Location:</strong> {booking.location}</p>
                                <p><strong>Check-in:</strong> {formatDate(booking.check_in_date)}</p>
                                <p><strong>Check-out:</strong> {formatDate(booking.check_out_date)}</p>
                                <p><strong>Nights:</strong> {booking.total_nights}</p>
                                <p><strong>Total:</strong> ${booking.total_price}</p>
                                <span style={statusStyle}>{booking.status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const pageStyle = {
    padding: '40px',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh'
};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '35px',
    color: '#1f2937'
};

const sectionStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
    marginBottom: '35px'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px'
};

const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 3px 8px rgba(0,0,0,0.04)'
};

const emptyStyle = {
    color: '#6b7280',
    marginTop: '15px'
};

const statusStyle = {
    display: 'inline-block',
    marginTop: '10px',
    padding: '5px 12px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold'
};

export default MyBookings;