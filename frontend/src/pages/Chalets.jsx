import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chalets = () => {
    const [chalets, setChalets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/chalets')
            .then(res => setChalets(res.data))
            .catch(err => console.error(err));
    }, []);

    const normalChalets = chalets.filter(c => c.chalet_type === 'normal');
    const proChalets = chalets.filter(c => c.chalet_type === 'pro');

    return (
        <div style={{ padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px', fontFamily: 'Arial' }}>Explore Our Chalets</h1>

            {/* --- SECTION 1: PRO CHALETS --- */}
            <div style={sectionWrapper}>
                <div style={proHeaderStyle}>
                    <h2 style={{ margin: 0 }}>⭐ Premium Pro Experience</h2>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Luxury stays with exclusive amenities</p>
                </div>
                <div style={gridStyle}>
                    {proChalets.map(chalet => (
                        <div key={chalet.id} style={proCardStyle}>
                            <div style={badgeStyle}>PRO</div>
                            <h3>{chalet.name}</h3>
                            <p>📍 {chalet.location}</p>
                            <p><strong>${chalet.price_per_night}</strong> / night</p>
                            <button onClick={() => navigate(`/chalets/${chalet.id}`)} style={proButtonStyle}>
                                View Luxury Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Space between sections */}
            <div style={{ height: '50px' }}></div>

            {/* --- SECTION 2: NORMAL CHALETS --- */}
            <div style={sectionWrapper}>
                <div style={normalHeaderStyle}>
                    <h2 style={{ margin: 0 }}>Standard Chalets</h2>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Comfortable and affordable getaways</p>
                </div>
                <div style={gridStyle}>
                    {normalChalets.map(chalet => (
                        <div key={chalet.id} style={normalCardStyle}>
                            <h3>{chalet.name}</h3>
                            <p>📍 {chalet.location}</p>
                            <p><strong>${chalet.price_per_night}</strong> / night</p>
                            <button onClick={() => navigate(`/chalets/${chalet.id}`)} style={normalButtonStyle}>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---

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
    fontWeight: 'bold'
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