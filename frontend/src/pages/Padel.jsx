import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import padelPhoto from '../assets/padel/padel_photo.jpg';

const Padel = () => {
    const [courts, setCourts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/padel')
            .then(res => setCourts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={pageStyle}>
            <section style={heroStyle}>
                <p style={labelStyle}>Padel Reservations</p>
                <h1 style={titleStyle}>Choose Your Padel Court</h1>
                <p style={subtitleStyle}>
                    Browse available courts, view details, check unavailable time slots,
                    and reserve your preferred court easily.
                </p>
            </section>

            <div style={gridStyle}>
                {courts.map(court => (
                    <div key={court.id} style={cardStyle}>
                        <img src={padelPhoto} alt={court.name} style={imageStyle} />

                        <div style={cardContentStyle}>
                            <span style={badgeStyle}>🎾 Court</span>
                            <h3 style={courtNameStyle}>{court.name}</h3>

                            <p style={infoStyle}>📍 {court.location}</p>
                            <p style={priceStyle}>${court.price_per_hour} / hour</p>

                            <button
                                onClick={() => navigate(`/padel/${court.id}`)}
                                style={buttonStyle}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8f7ef, #f8fafc)',
    padding: 'clamp(16px, 4vw, 40px)',
    fontFamily: 'Arial, sans-serif'
};

const heroStyle = {
    maxWidth: '820px',
    margin: '0 auto 28px auto',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 'clamp(20px, 4vw, 32px)',
    borderRadius: '22px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.06)'
};

const labelStyle = {
    display: 'inline-block',
    color: '#0f766e',
    backgroundColor: '#ecfdf5',
    padding: '8px 14px',
    borderRadius: '999px',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '14px'
};

const titleStyle = {
    fontSize: 'clamp(28px, 5vw, 40px)',
    margin: '0 0 10px 0',
    color: '#111827'
};

const subtitleStyle = {
    color: '#6b7280',
    lineHeight: '1.6',
    fontSize: '15px',
    maxWidth: '580px',
    margin: '0 auto'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: '25px',
    maxWidth: '1150px',
    margin: '0 auto'
};

const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '22px',
    overflow: 'hidden',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb'
};

const imageStyle = {
    width: '100%',
    height: '210px',
    objectFit: 'cover'
};

const cardContentStyle = {
    padding: '22px'
};

const badgeStyle = {
    display: 'inline-block',
    backgroundColor: '#ecfdf5',
    color: '#047857',
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '12px'
};

const courtNameStyle = {
    margin: '0 0 10px 0',
    color: '#111827',
    fontSize: '22px'
};

const infoStyle = {
    color: '#6b7280',
    marginBottom: '8px'
};

const priceStyle = {
    fontWeight: 'bold',
    color: '#0f766e',
    fontSize: '18px',
    marginBottom: '18px'
};

const buttonStyle = {
    width: '100%',
    padding: '13px',
    backgroundColor: '#0f766e',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px'
};

export default Padel;