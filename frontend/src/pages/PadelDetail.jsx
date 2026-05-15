import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import padelPhoto from '../assets/padel/padel_photo.jpg';

const PadelDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [court, setCourt] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/padel/${id}`)
            .then(res => setCourt(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!court) return <p>Loading court details...</p>;

    return (
        <div style={{ padding: '30px', textAlign: 'center' }}>
            <h1>{court.name}</h1>

            <img
                src={padelPhoto}
                alt={court.name}
                style={imageStyle}
            />

            <p><strong>Location:</strong> {court.location}</p>
            <p><strong>Price:</strong> ${court.price_per_hour}/hr</p>

            <button
                onClick={() => navigate(`/padel/${id}/book`)}
                style={buttonStyle}
            >
                Book Now
            </button>
        </div>
    );
};

const imageStyle = {
    width: '100%',
    maxWidth: '600px',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '20px'
};

const buttonStyle = {
    padding: '15px 30px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
};

export default PadelDetail;