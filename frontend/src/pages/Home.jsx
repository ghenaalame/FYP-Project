import { useNavigate } from 'react-router-dom';

import chaletHome from '../assets/home/chalet_home.jpg';
import padelHome from '../assets/home/Padel-Courts.jpg';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={pageStyle}>
            <div style={headerStyle}>
                <span style={badgeStyle}>Reservation Platform</span>

                <h1 style={titleStyle}>
                    Choose Your Experience
                </h1>

                <p style={subtitleStyle}>
                    Whether you're planning a competitive padel match or a relaxing chalet getaway,
                    everything can be reserved in a few clicks.
                </p>
            </div>

            <section style={splitSectionStyle}>
                {/* PADEL */}
                <div style={cardStyle}>
                    <img
                        src={padelHome}
                        alt="Padel Courts"
                        style={imageStyle}
                    />

                    <div style={overlayStyle}></div>

                    <div style={contentStyle}>
                        <span style={tagStyle}>🎾 Sports & Competition</span>

                        <h2 style={cardTitleStyle}>
                            Padel Courts
                        </h2>

                        <p style={cardTextStyle}>
                            Browse available courts, check unavailable time slots,
                            and reserve your preferred court quickly and easily.
                        </p>

                        <button
                            onClick={() => navigate('/padel')}
                            style={buttonStyle}
                        >
                            Explore Padel Courts
                        </button>
                    </div>
                </div>

                {/* CHALET */}
                <div style={cardStyle}>
                    <img
                        src={chaletHome}
                        alt="Chalets"
                        style={imageStyle}
                    />

                    <div style={overlayStyle}></div>

                    <div style={contentStyle}>
                        <span style={tagStyle}>🏡 Relax & Stay</span>

                        <h2 style={cardTitleStyle}>
                            Chalets
                        </h2>

                        <p style={cardTextStyle}>
                            Discover beautiful chalets, view availability,
                            and reserve the perfect stay for your next escape.
                        </p>

                        <button
                            onClick={() => navigate('/chalets')}
                            style={buttonStyle}
                        >
                            Explore Chalets
                        </button>
                    </div>
                </div>
            </section>

            <section style={bottomSectionStyle}>
                <div style={featureStyle}>
                    <span style={numberStyle}>01</span>
                    <h3>Browse</h3>
                    <p>Choose padel courts or chalets.</p>
                </div>

                <div style={featureStyle}>
                    <span style={numberStyle}>02</span>
                    <h3>Check Availability</h3>
                    <p>View unavailable slots and dates.</p>
                </div>

                <div style={featureStyle}>
                    <span style={numberStyle}>03</span>
                    <h3>Book</h3>
                    <p>Reserve instantly with your account.</p>
                </div>

                <div style={featureStyle}>
                    <span style={numberStyle}>04</span>
                    <h3>Manage</h3>
                    <p>View and cancel bookings anytime.</p>
                </div>
            </section>
        </div>
    );
};

const pageStyle = {
    minHeight: '100vh',
    padding: '30px',
    background: '#f4f7f6',
    fontFamily: 'Arial, sans-serif'
};

const headerStyle = {
    textAlign: 'center',
    maxWidth: '850px',
    margin: '0 auto 40px auto'
};

const badgeStyle = {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '8px 15px',
    borderRadius: '999px',
    fontWeight: 'bold',
    fontSize: '13px'
};

const titleStyle = {
    fontSize: 'clamp(38px, 6vw, 64px)',
    marginTop: '20px',
    marginBottom: '15px',
    color: '#111827'
};

const subtitleStyle = {
    color: '#6b7280',
    fontSize: '17px',
    lineHeight: '1.8'
};

const splitSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
    marginBottom: '40px'
};

const cardStyle = {
    position: 'relative',
    height: '420px',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
};

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background:
        'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))'
};

const contentStyle = {
    position: 'absolute',
    bottom: '35px',
    left: '30px',
    right: '30px',
    color: 'white'
};

const tagStyle = {
    display: 'inline-block',
    backgroundColor: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    padding: '8px 14px',
    borderRadius: '999px',
    marginBottom: '15px',
    fontWeight: 'bold'
};

const cardTitleStyle = {
    fontSize: '42px',
    marginBottom: '15px'
};

const cardTextStyle = {
    lineHeight: '1.7',
    marginBottom: '25px',
    color: '#f3f4f6'
};

const buttonStyle = {
    backgroundColor: '#0f766e',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px'
};

const bottomSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
};

const featureStyle = {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
};

const numberStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0f766e'
};

export default Home;