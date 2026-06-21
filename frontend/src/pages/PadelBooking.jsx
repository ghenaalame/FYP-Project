import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { isTokenValid } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

const PadelBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        booking_date: '',
        start_time: '',
        end_time: ''
    });

    const [unavailableSlots, setUnavailableSlots] = useState([]);

    useEffect(() => {
        const fetchUnavailableSlots = async () => {
            if (!booking.booking_date) {
                setUnavailableSlots([]);
                return;
            }

            try {
                const response = await axios.get(
                    `${API_URL}/api/padel-bookings/court/${id}/date/${booking.booking_date}`
                );

                setUnavailableSlots(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUnavailableSlots();
    }, [booking.booking_date, id]);

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const today = getTodayDate();

        if (booking.booking_date < today) {
            toast.error('You cannot book a date in the past');
            return;
        }

        if (booking.start_time >= booking.end_time) {
            toast.error('End time must be after start time');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token || !isTokenValid()) {
            toast.error('Please login before booking');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/api/padel-bookings`,
                {
                    court_id: id,
                    booking_date: booking.booking_date,
                    start_time: booking.start_time,
                    end_time: booking.end_time
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message || 'Padel booking successful!');
            navigate('/padel');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <button onClick={() => navigate(`/padel/${id}`)} style={backButton}>
                    ← Back to Court Details
                </button>

                <div style={headerStyle}>
                    <h2>Book Padel Court</h2>
                    <p>Select your preferred date and time slot</p>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label style={labelStyle}>Booking Date</label>
                        <input
                            type="date"
                            name="booking_date"
                            value={booking.booking_date}
                            onChange={handleChange}
                            min={getTodayDate()}
                            required
                            style={inputStyle}
                        />

                        {booking.booking_date && (
                            <div style={slotsBoxStyle}>
                                <strong>Unavailable slots:</strong>

                                {unavailableSlots.length === 0 ? (
                                    <p style={availableTextStyle}>No bookings on this date yet.</p>
                                ) : (
                                    <ul style={slotsListStyle}>
                                        {unavailableSlots.map(slot => (
                                            <li key={slot.id}>
                                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    <div style={timeGridStyle}>
                        <div>
                            <label style={labelStyle}>Start Time</label>
                            <input
                                type="time"
                                name="start_time"
                                value={booking.start_time}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>End Time</label>
                            <input
                                type="time"
                                name="end_time"
                                value={booking.end_time}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div style={pricingBoxStyle}>
                        <strong>💰 Pricing</strong>
                        <p>☀️ 10:00 AM - 5:00 PM: $15 / hour</p>
                        <p>🌙 5:00 PM - 10:00 PM: $30 / hour</p>
                    </div>

                    <div style={infoBoxStyle}>
                        <strong>Note:</strong> The system will automatically prevent double bookings for the same court and time.
                    </div>

                    <button type="submit" style={buttonStyle}>
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

const formatTime = (time) => {
    return time?.slice(0, 5);
};

const pageStyle = {
    minHeight: 'calc(100vh - 70px)',
    background: 'linear-gradient(135deg, #e8f7ef, #f8fbff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px'
};

const cardStyle = {
    width: '100%',
    maxWidth: '560px',
    backgroundColor: 'white',
    padding: '35px',
    borderRadius: '18px',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.10)'
};

const backButton = {
    background: 'none',
    border: 'none',
    color: '#28a745',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px',
    padding: 0
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '28px'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
};

const timeGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#374151'
};

const inputStyle = {
    width: '100%',
    padding: '13px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none'
};

const slotsBoxStyle = {
    marginTop: '12px',
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px'
};

const availableTextStyle = {
    margin: '8px 0 0 0',
    color: '#166534'
};

const slotsListStyle = {
    margin: '8px 0 0 18px',
    padding: 0
};

const pricingBoxStyle = {
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '1.5',
    border: '1px solid #a7f3d0'
};

const infoBoxStyle = {
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '1.5'
};

const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
};

export default PadelBooking;