import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import proChaletPhoto from '../assets/chalet/chalet_pros.jpg';
import modernChaletPhoto from '../assets/chalet/modern_chalet.png';

const API_URL = import.meta.env.VITE_API_URL;

const Chalets = () => {
    const [chalets, setChalets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/chalets`)
            .then(res => setChalets(res.data))
            .catch(err => console.error(err));
    }, []);

    const normalChalets = chalets.filter(c => c.chalet_type === 'normal');
    const proChalets = chalets.filter(c => c.chalet_type === 'pro');

    const getChaletImage = (type) => {
        return type === 'pro' ? proChaletPhoto : modernChaletPhoto;
    };

    return (
        <div style={pageStyle}>
            <h1 style={titleStyle}>Explore Our Chalets</h1>

            <div style={sectionWrapper}>
                <div style={proHeaderStyle}>
                    <h2 style={{ margin: 0 }}>⭐ Premium Pro Experience</h2>
                    <p style={subtitleStyle}>Luxury stays with exclusive amenities</p>
                </div>

                <div style={gridStyle}>
                    {proChalets.map(chalet => (
                        <div key={chalet.id} style={proCardStyle}>
                            <div style={badgeStyle}>PRO</div>

                            <img
                                src={getChaletImage(chalet.chalet_type)}
                                alt={chalet.name}
                                style={imageStyle}
                            />

                            <h3>{chalet.name}</h3>
                            <p>📍 {chalet.location}</p>
                            <p><strong>${chalet.price_per_night}</strong> / night</p>

                            <button
                                onClick={() => navigate(`/chalets/${chalet.id}`)}
                                style={proButtonStyle}
                            >
                                View Luxury Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ height: '50px' }}></div>

            <div style={sectionWrapper}>
                <div style={normalHeaderStyle}>
                    <h2 style={{ margin: 0 }}>Standard Chalets</h2>
                    <p style={subtitleStyle}>Comfortable and affordable getaways</p>
                </div>

                <div style={gridStyle}>
                    {normalChalets.map(chalet => (
                        <div key={chalet.id} style={normalCardStyle}>
                            <img
                                src={getChaletImage(chalet.chalet_type)}
                                alt={chalet.name}
                                style={imageStyle}
                            />

                            <h3>{chalet.name}</h3>
                            <p>📍 {chalet.location}</p>
                            <p><strong>${chalet.price_per_night}</strong> / night</p>

                            <button
                                onClick={() => navigate(`/chalets/${chalet.id}`)}
                                style={normalButtonStyle}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const pageStyle = {
    padding: '40px',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh'
};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    fontFamily: 'Arial'
};

const subtitleStyle = {
    margin: '5px 0 0 0',
    fontSize: '14px'
};

const sectionWrapper = {
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    marginTop: '20px'
};

const imageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px'
};

const proHeaderStyle = {
    borderLeft: '5px solid #d4af37',
    paddingLeft: '15px',
    marginBottom: '20px'
};

const normalHeaderStyle = {
    borderLeft: '5px solid #3498db',
    paddingLeft: '15px',
    marginBottom: '20px'
};

const proCardStyle = {
    position: 'relative',
    border: '2px solid #d4af37',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: '#fffcf5'
};

const normalCardStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center'
};

const badgeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#d4af37',
    color: 'white',
    padding: '2px 8px',
    fontSize: '10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    zIndex: 2
};

const proButtonStyle = {
    cursor: 'pointer',
    background: '#d4af37',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    width: '100%',
    fontWeight: 'bold'
};

const normalButtonStyle = {
    cursor: 'pointer',
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    width: '100%'
};

export default Chalets;