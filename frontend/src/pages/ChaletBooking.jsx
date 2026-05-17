import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChaletBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        check_in_date: '',
        check_out_date: ''
    });

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please login before booking');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/api/chalet-bookings',
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

            alert(response.data.message || 'Chalet booking successful!');
            navigate('/chalets');
        } catch (err) {
            alert(err.response?.data?.message || 'Booking failed');
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

                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label style={labelStyle}>Check-in Date</label>
                        <input
                            type="date"
                            name="check_in_date"
                            value={booking.check_in_date}
                            onChange={handleChange}
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
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={infoBoxStyle}>
                        <strong>Note:</strong> The system will automatically prevent double bookings for the same chalet and overlapping dates.
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
    background: 'linear-gradient(135deg, #fff7df, #f8fbff)',
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
    color: '#d4af37',
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
    backgroundColor: '#fffbeb',
    color: '#92400e',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '1.5'
};

const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#d4af37',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
};

export default ChaletBooking;