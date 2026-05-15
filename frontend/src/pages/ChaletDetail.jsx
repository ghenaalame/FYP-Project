import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    return (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
            <button
                onClick={() => navigate('/chalets')}
                style={{
                    cursor: 'pointer',
                    marginBottom: '10px',
                    border: 'none',
                    background: 'none',
                    color: '#666'
                }}
            >
                ← Back to Selection
            </button>

            <div style={{ border: `3px solid ${themeColor}`, borderRadius: '15px', overflow: 'hidden' }}>
                <div
                    style={{
                        backgroundColor: themeColor,
                        color: 'white',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <h1 style={{ margin: 0 }}>{chalet.name}</h1>

                    <span
                        style={{
                            background: 'white',
                            color: themeColor,
                            padding: '5px 15px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        {isPro ? '⭐ PRO ELITE' : 'STANDARD'}
                    </span>
                </div>

                <div style={{ padding: '30px', display: 'flex', gap: '30px' }}>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                width: '100%',
                                height: '200px',
                                background: '#eee',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            [ Chalet Image ]
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3>Details</h3>

                        <p><strong>Location:</strong> {chalet.location}</p>
                        <p><strong>Rooms:</strong> {chalet.rooms} Bedrooms</p>
                        <p><strong>Pool:</strong> {chalet.has_pool ? '✅ Included' : '❌ Not Available'}</p>

                        <h2 style={{ color: themeColor }}>
                            ${chalet.price_per_night} / Night
                        </h2>

                        <button
                            onClick={() => navigate(`/chalets/${id}/book`)}
                            style={{
                                width: '100%',
                                padding: '15px',
                                backgroundColor: themeColor,
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold'
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

export default ChaletDetail;