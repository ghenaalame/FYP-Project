import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import padelPhoto from '../assets/padel/padel_photo.jpg';

const API_URL = import.meta.env.VITE_API_URL;

const PadelDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [court, setCourt] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/padel/${id}`)
            .then(res => setCourt(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!court) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                Loading court details...
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <button onClick={() => navigate('/padel')} style={backButtonStyle}>
                ← Back to Padel Courts
            </button>

            <div style={cardStyle}>
                <div style={imageWrapperStyle}>
                    <img
                        src={padelPhoto}
                        alt={court.name}
                        style={imageStyle}
                    />
                </div>

                <div style={contentStyle}>
                    <span style={badgeStyle}>🎾 Padel Court</span>

                    <h1 style={titleStyle}>{court.name}</h1>

                    <p style={descriptionStyle}>
                        Reserve this court by selecting your preferred date and time.
                        The system will show unavailable slots and prevent double bookings.
                    </p>

                    <div style={infoGridStyle}>
                        <div style={infoBoxStyle}>
                            <strong>📍 Location</strong>
                            <p>{court.location}</p>
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <div style={pricingCardStyle}>
                                <h3 style={pricingTitleStyle}>💰 Pricing</h3>

                                <div style={priceRowStyle}>
                                    <div>
                                        <strong>Day Session</strong>
                                        <p style={priceTimeStyle}>10:00 AM - 5:00 PM</p>
                                    </div>

                                    <span style={priceBadgeStyle}>$15/hr</span>
                                </div>

                                <div style={dividerStyle}></div>

                                <div style={priceRowStyle}>
                                    <div>
                                        <strong>Evening Session</strong>
                                        <p style={priceTimeStyle}>5:00 PM - 10:00 PM</p>
                                    </div>

                                    <span style={eveningBadgeStyle}>$30/hr</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(`/padel/${id}/book`)}
                        style={bookButtonStyle}
                    >
                        Book This Court
                    </button>
                </div>
            </div>
        </div>
    );
};


const pageStyle = {
    padding: '40px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8f7ef, #f8fafc)',
    fontFamily: 'Arial, sans-serif'
};

const backButtonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#555',
    fontSize: '15px'
};

const cardStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '22px',
    overflow: 'hidden',
    boxShadow: '0 12px 35px rgba(0,0,0,0.08)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))'
};

const imageWrapperStyle = {
    minHeight: '180px'
};

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const contentStyle = {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
};

const badgeStyle = {
    display: 'inline-block',
    width: 'fit-content',
    backgroundColor: '#ecfdf5',
    color: '#047857',
    padding: '8px 14px',
    borderRadius: '999px',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '18px'
};

const titleStyle = {
    fontSize: 'clamp(32px, 5vw, 48px)',
    margin: '0 0 18px 0',
    color: '#111827'
};

const descriptionStyle = {
    color: '#6b7280',
    lineHeight: '1.7',
    marginBottom: '25px'
};

const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
    marginBottom: '28px'
};

const infoBoxStyle = {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '14px',
    border: '1px solid #e5e7eb'
};

const pricingCardStyle = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '18px'
};

const pricingTitleStyle = {
    margin: '0 0 15px 0',
    color: '#111827'
};

const priceRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px'
};

const priceTimeStyle = {
    margin: '4px 0 0',
    color: '#6b7280',
    fontSize: '14px'
};

const dividerStyle = {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '15px 0'
};

const priceBadgeStyle = {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '8px 14px',
    borderRadius: '999px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
};

const eveningBadgeStyle = {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    padding: '8px 14px',
    borderRadius: '999px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
};

const bookButtonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: '#0f766e',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
};

export default PadelDetail;