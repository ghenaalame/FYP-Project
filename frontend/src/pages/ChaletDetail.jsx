import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import proChaletPhoto from '../assets/chalet/pro_chalet.jpg';
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

    const chaletImage = isPro
        ? proChaletPhoto
        : modernChaletPhoto;

    return (
        <div style={pageStyle}>
            <button
                onClick={() => navigate('/chalets')}
                style={backButtonStyle}
            >
                ← Back to Chalets
            </button>

            <div
                style={{
                    ...cardStyle,
                    border: `3px solid ${themeColor}`
                }}
            >
                <div
                    style={{
                        ...headerStyle,
                        backgroundColor: themeColor
                    }}
                >
                    <h1 style={{ margin: 0 }}>
                        {chalet.name}
                    </h1>

                    <span
                        style={{
                            ...tagStyle,
                            color: themeColor
                        }}
                    >
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
                        <h2 style={{ color: themeColor }}>
                            ${chalet.price_per_night} / Night
                        </h2>

                        <div style={infoBoxStyle}>
                            <p>
                                <strong>📍 Location:</strong> {chalet.location}
                            </p>

                            <p>
                                <strong>🛏 Rooms:</strong> {chalet.rooms}
                            </p>

                            <p>
                                <strong>🏊 Pool:</strong>{' '}
                                {chalet.has_pool
                                    ? 'Available'
                                    : 'Not Available'}
                            </p>

                            <p>
                                <strong>🏡 Type:</strong>{' '}
                                {isPro ? 'Pro Chalet' : 'Standard Chalet'}
                            </p>
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
    padding: '40px',
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
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 12px 35px rgba(0,0,0,0.08)',
    maxWidth: '1000px',
    margin: '0 auto'
};

const headerStyle = {
    padding: '25px 30px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
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
    gap: '30px',
    padding: '30px',
    flexWrap: 'wrap'
};

const imageContainerStyle = {
    flex: '1 1 350px'
};

const imageStyle = {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '16px'
};

const detailsStyle = {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
};

const infoBoxStyle = {
    backgroundColor: '#f9fafb',
    padding: '18px',
    borderRadius: '12px',
    lineHeight: '1.8',
    margin: '20px 0'
};

const bookButtonStyle = {
    width: '100%',
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px'
};

export default ChaletDetail;