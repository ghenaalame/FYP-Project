import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import proChaletPhoto from '../assets/chalet/chalet_pros.jpg';
import modernChaletPhoto from '../assets/chalet/modern_chalet.png';

const ChaletDetail = () => {
    const { id } = useParams();
    const [chalet, setChalet] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/chalets/${id}`)
            .then(res => setChalet(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!chalet) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                Loading...
            </div>
        );
    }

    const isPro = chalet.chalet_type === 'pro';
    const themeColor = isPro ? '#d4af37' : '#3498db';
    const chaletImage = isPro ? proChaletPhoto : modernChaletPhoto;

    return (
        <div style={pageStyle}>
            <button onClick={() => navigate('/chalets')} style={backButtonStyle}>
                ← Back to Chalets
            </button>

            <div style={{ ...cardStyle, border: `3px solid ${themeColor}` }}>
                <div style={{ ...headerStyle, backgroundColor: themeColor }}>
                    <div>
                        <h1 style={{ margin: 0 }}>{chalet.name}</h1>
                        <p style={headerSubtitleStyle}>📍 {chalet.location}</p>
                    </div>

                    <span style={{ ...tagStyle, color: themeColor }}>
                        {isPro ? '⭐ PRO CHALET' : 'STANDARD CHALET'}
                    </span>
                </div>

                <div style={contentStyle}>
                    <div style={imageContainerStyle}>
                        <img
                            src={chaletImage}
                            alt={chalet.name}
                            style={imageStyle}
                        />
                    </div>

                    <div style={detailsStyle}>
                        <h2 style={{ color: themeColor, marginTop: 0 }}>
                            ${chalet.price_per_night} / Night
                        </h2>

                        <div style={descriptionBoxStyle}>
                            <h3 style={{ marginTop: 0 }}>About this chalet</h3>
                            <p>{chalet.description}</p>
                        </div>

                        <div style={featuresGridStyle}>
                            <div style={featureBoxStyle}>
                                <strong>🛏 Bedrooms</strong>
                                <p>{chalet.rooms} bedrooms</p>
                            </div>

                            <div style={featureBoxStyle}>
                                <strong>🏊 Pool</strong>
                                <p>{chalet.has_pool ? 'Private pool' : 'Not available'}</p>
                            </div>

                            <div style={featureBoxStyle}>
                                <strong>🔥 BBQ</strong>
                                <p>Outdoor BBQ area</p>
                            </div>

                            <div style={featureBoxStyle}>
                                <strong>🌿 Balcony</strong>
                                <p>Private balconies</p>
                            </div>
                        </div>

                        
                        <button
                            onClick={() => navigate(`/chalets/${id}/book`)}
                            style={{
                                ...bookButtonStyle,
                                backgroundColor: themeColor
                            }}
                        >
                            Book This Chalet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const pageStyle = {
    padding: 'clamp(16px, 4vw, 40px)',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eef6ff, #f8fafc)',
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
    backgroundColor: 'white',
    borderRadius: 'clamp(16px, 4vw, 22px)',
    overflow: 'hidden',
    boxShadow: '0 12px 35px rgba(0,0,0,0.08)',
    maxWidth: '900px',
    margin: '0 auto'
};

const headerStyle = {
    padding: 'clamp(18px, 4vw, 25px) clamp(18px, 4vw, 30px)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
};

const headerSubtitleStyle = {
    margin: '8px 0 0',
    opacity: 0.95
};

const tagStyle = {
    backgroundColor: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '14px'
};

const contentStyle = {
    display: 'flex',
    gap: 'clamp(18px, 4vw, 30px)',
    padding: 'clamp(18px, 4vw, 30px)',
    flexWrap: 'wrap'
};

const imageContainerStyle = {
    flex: '1 1 360px'
};

const imageStyle = {
    width: '100%',
    height: 'clamp(260px, 50vw, 420px)',
    objectFit: 'cover',
    borderRadius: '18px'
};

const detailsStyle = {
    flex: '1 1 380px',
    display: 'flex',
    flexDirection: 'column'
};

const descriptionBoxStyle = {
    backgroundColor: '#f9fafb',
    padding: '18px',
    borderRadius: '14px',
    border: '1px solid #e5e7eb',
    marginBottom: '18px',
    lineHeight: '1.7',
    color: '#4b5563'
};

const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '14px',
    marginBottom: '18px'
};

const featureBoxStyle = {
    backgroundColor: '#f8fafc',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
};

const layoutBoxStyle = {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '18px',
    marginBottom: '20px'
};

const layoutItemStyle = {
    backgroundColor: '#f9fafb',
    padding: '14px',
    borderRadius: '12px',
    marginTop: '12px',
    lineHeight: '1.6',
    color: '#4b5563'
};

const bookButtonStyle = {
    width: '100%',
    padding: '15px',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
};

export default ChaletDetail;