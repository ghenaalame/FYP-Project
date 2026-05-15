import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PadelBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        booking_date: '',
        start_time: '',
        end_time: ''
    });

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/padel-bookings', {
                user_id: 3,
                court_id: id,
                booking_date: booking.booking_date,
                start_time: booking.start_time,
                end_time: booking.end_time
            });

            alert(response.data.message || 'Padel booking successful!');
            navigate('/padel');
        } catch (err) {
            alert(err.response?.data?.message || 'Booking failed');
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
                            required
                            style={inputStyle}
                        />
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