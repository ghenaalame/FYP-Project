import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { isTokenValid } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

const ChaletBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        check_in_date: '',
        check_out_date: ''
    });

    const [unavailableDates, setUnavailableDates] = useState([]);

    useEffect(() => {
        const fetchUnavailableDates = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/chalet-bookings/chalet/${id}/unavailable`
                );

                setUnavailableDates(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUnavailableDates();
    }, [id]);

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

        if (booking.check_in_date < today) {
            toast.error('Check-in date cannot be in the past');
            return;
        }

        if (booking.check_out_date <= booking.check_in_date) {
            toast.error('Check-out date must be after check-in date');
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
                `${API_URL}/api/chalet-bookings`,
                {
                    chalet_id: id,
                    check_in_date: booking.check_in_date,
                    check_out_date: booking.check_out_date
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message || 'Chalet booking successful!');
            navigate('/chalets');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <button onClick={() => navigate(`/chalets/${id}`)} style={backButton}>
                    ← Back to Chalet Details
                </button>

                <div style={headerStyle}>
                    <h2>Book Chalet</h2>
                    <p>Select your check-in and check-out dates</p>
                </div>

                <div style={unavailableBoxStyle}>
                    <strong>Unavailable date ranges:</strong>

                    {unavailableDates.length === 0 ? (
                        <p style={availableTextStyle}>No bookings for this chalet yet.</p>
                    ) : (
                        <ul style={dateListStyle}>
                            {unavailableDates.map(date => (
                                <li key={date.id}>
                                    {formatDate(date.check_in_date)} → {formatDate(date.check_out_date)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label style={labelStyle}>Check-in Date</label>
                        <input
                            type="date"
                            name="check_in_date"
                            value={booking.check_in_date}
                            onChange={handleChange}
                            min={getTodayDate()}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Check-out Date</label>
                        <input
                            type="date"
                            name="check_out_date"
                            value={booking.check_out_date}
                            onChange={handleChange}
                            min={booking.check_in_date || getTodayDate()}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={infoBoxStyle}>
                        <strong>Note:</strong> The system will automatically prevent booking a chalet during unavailable date ranges.
                    </div>

                    <button type="submit" style={buttonStyle}>
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const pageStyle = {
    minHeight: 'calc(100vh - 70px)',
    background: 'linear-gradient(135deg, #eef6ff, #fff8e7)',
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
    color: '#3498db',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px',
    padding: 0
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '24px'
};

const unavailableBoxStyle = {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '22px'
};

const availableTextStyle = {
    margin: '8px 0 0 0',
    color: '#166534'
};

const dateListStyle = {
    margin: '8px 0 0 18px',
    padding: 0
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
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

const infoBoxStyle = {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '1.5'
};

const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
};

export default ChaletBooking;