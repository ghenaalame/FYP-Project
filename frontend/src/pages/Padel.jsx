import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import padelPhoto from '../assets/padel/padel_photo.jpg';

const Padel = () => {
    const [courts, setCourts] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/padel')
            .then(res => setCourts(res.data))
            .catch(err => console.error(err));
    }, []);

    const cafeMenu = [
        {
            category: '☕ Coffee',
            items: [
                { name: 'Espresso', price: '$2' },
                { name: 'Cappuccino', price: '$3' },
                { name: 'Frappe', price: '$4' }
            ]
        },
        {
            category: '🥤 Drinks',
            items: [
                { name: 'Water', price: '$1' },
                { name: 'Energy Drink', price: '$3' },
                { name: 'Fresh Juice', price: '$4' }
            ]
        },
        {
            category: '🥪 Snacks',
            items: [
                { name: 'Chicken Sandwich', price: '$5' },
                { name: 'Protein Bar', price: '$3' },
                { name: 'Chips', price: '$2' }
            ]
        },
        {
            category: '💪 Protein',
            items: [
                { name: 'Protein Shake', price: '$5' },
                { name: 'Protein Cookie', price: '$4' }
            ]
        }
    ];

    return (
        <div style={pageStyle}>
            <section style={heroStyle}>
                <p style={labelStyle}>Padel Reservations</p>

                <h1 style={titleStyle}>Choose Your Padel Court</h1>

                <p style={subtitleStyle}>
                    Browse available courts, view details, check unavailable time slots,
                    and reserve your preferred court easily.
                </p>


                <button
                    onClick={() => setShowMenu(!showMenu)}
                    style={menuButtonStyle}
                >
                    {showMenu ? 'Hide Café Menu' : 'View Café Menu'}
                </button>
            </section>

            {showMenu && (
                <section style={menuSectionStyle}>
                    <div style={menuHeaderStyle}>
                        <h2 style={{ marginBottom: '8px', color: '#065f46' }}>
                            ☕ Padel Café Menu
                        </h2>

                        <p style={{ color: '#047857', margin: 0 }}>
                            Refreshments, snacks, and protein options are available at the café counter.
                        </p>
                    </div>

                    <div style={menuGridStyle}>
                        {cafeMenu.map((section, index) => (
                            <div key={index} style={menuCardStyle}>
                                <h3>{section.category}</h3>

                                {section.items.map((item, itemIndex) => (
                                    <div key={itemIndex} style={menuItemStyle}>
                                        <span>{item.name}</span>
                                        <strong>{item.price}</strong>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div style={gridStyle}>
                {courts.map(court => (
                    <div key={court.id} style={cardStyle}>
                        <img
                            src={padelPhoto}
                            alt={court.name}
                            style={imageStyle}
                        />

                        <div style={cardContentStyle}>
                            <span style={badgeStyle}>🎾 Court</span>

                            <h3 style={courtNameStyle}>
                                {court.name}
                            </h3>

                            <p style={infoStyle}>📍 {court.location}</p>

                            <div style={pricingMiniBoxStyle}>
                                <p style={miniPriceStyle}>☀️ $15/hr before 5 PM</p>
                                <p style={miniPriceStyle}>🌙 $30/hr after 5 PM</p>
                            </div>

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
    margin: '0 auto 20px auto'
};

const pricingBoxStyle = {
    backgroundColor: '#ecfdf5',
    border: '1px solid #a7f3d0',
    padding: '15px',
    borderRadius: '14px',
    margin: '0 auto 20px auto',
    maxWidth: '520px',
    color: '#065f46',
    textAlign: 'left'
};

const pricingRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '8px',
    fontSize: '15px'
};

const menuButtonStyle = {
    padding: '12px 20px',
    backgroundColor: '#111827',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const menuSectionStyle = {
    maxWidth: '1150px',
    margin: '0 auto 30px auto',
    background: 'linear-gradient(135deg, #ecfdf5, #ffffff)',
    padding: '30px',
    borderRadius: '24px',
    boxShadow: '0 14px 35px rgba(15, 118, 110, 0.10)',
    border: '1px solid #bbf7d0'
};

const menuHeaderStyle = {
    textAlign: 'center',
    marginBottom: '24px'
};

const menuGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
    gap: '20px'
};

const menuCardStyle = {
    backgroundColor: 'white',
    padding: '22px',
    borderRadius: '18px',
    border: '1px solid #bbf7d0',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
};

const menuItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '11px 0',
    borderBottom: '1px dashed #86efac',
    color: '#374151',
    fontSize: '15px'
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
    marginBottom: '12px'
};

const pricingMiniBoxStyle = {
    backgroundColor: '#ecfdf5',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '15px',
    border: '1px solid #a7f3d0'
};

const miniPriceStyle = {
    margin: '4px 0',
    color: '#065f46',
    fontWeight: 'bold',
    fontSize: '14px'
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