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
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Padel Courts</h1>

            <div style={gridStyle}>
                {courts.map(court => (
                    <div key={court.id} style={cardStyle}>
                        <img
                            src={padelPhoto}
                            alt={court.name}
                            style={cardImageStyle}
                        />

                        <h3>{court.name}</h3>
                        <p style={{ color: '#666' }}>📍 {court.location}</p>
                        <p><strong>${court.price_per_hour}</strong> / hour</p>

                        <button
                            onClick={() => navigate(`/padel/${court.id}`)}
                            style={buttonStyle}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px'
};

const cardStyle = {
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    backgroundColor: 'white'
};

const cardImageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px'
};

const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold'
};

export default Padel;