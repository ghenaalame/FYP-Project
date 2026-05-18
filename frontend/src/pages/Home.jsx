import { useNavigate } from 'react-router-dom';
import padelPhoto from '../assets/padel/padel_photo.jpg';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={pageStyle}>
            <section style={heroStyle}>
                <div style={leftStyle}>
                    <p style={eyebrowStyle}>Reservation Platform</p>

                    <h1 style={titleStyle}>
                        Book your padel court or chalet with ease
                    </h1>

                    <p style={subtitleStyle}>
                        Explore padel courts and chalets, check unavailable slots or dates,
                        confirm reservations, and manage your bookings from one place.
                    </p>

                    <div style={actionsStyle}>
                        <button onClick={() => navigate('/padel')} style={primaryButtonStyle}>
                            Browse Padel Courts
                        </button>

                        <button onClick={() => navigate('/chalets')} style={secondaryButtonStyle}>
                            Browse Chalets
                        </button>
                    </div>
                </div>

                <div style={rightStyle}>
                    <div style={imageCardStyle}>
                        <div style={mainImageStyle}></div>

                        <div style={floatingPadelCardStyle}>
                            <img src={padelPhoto} alt="Padel court" style={padelImageStyle} />

                            <div>
                                <strong>Padel Court</strong>
                                <p>Book by time slot</p>
                            </div>
                        </div>

                        <div style={floatingChaletTagStyle}>
                            🏡 Chalet stays & 🎾 padel games
                        </div>
                    </div>
                </div>
            </section>

            <section style={featureRowStyle}>
                <div style={featureBoxStyle}>
                    <span style={featureIconStyle}>🎾</span>
                    <h3>Padel Courts</h3>
                    <p>Book courts by date and time while avoiding unavailable slots.</p>
                </div>

                <div style={featureBoxStyle}>
                    <span style={featureIconStyle}>🏡</span>
                    <h3>Chalets</h3>
                    <p>Reserve chalets by check-in and check-out dates.</p>
                </div>

                <div style={featureBoxStyle}>
                    <span style={featureIconStyle}>📋</span>
                    <h3>My Bookings</h3>
                    <p>View and cancel your reservations from your account.</p>
                </div>
            </section>

            <section style={bottomSectionStyle}>
                <div>
                    <p style={eyebrowDarkStyle}>How it works</p>
                    <h2 style={sectionTitleStyle}>A clear flow from browsing to booking</h2>
                </div>

                <div style={stepsStyle}>
                    <div style={stepStyle}>
                        <span>01</span>
                        <p>Register or login</p>
                    </div>

                    <div style={stepStyle}>
                        <span>02</span>
                        <p>Choose padel or chalet</p>
                    </div>

                    <div style={stepStyle}>
                        <span>03</span>
                        <p>Select available date</p>
                    </div>

                    <div style={stepStyle}>
                        <span>04</span>
                        <p>Confirm and manage booking</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#f7f4ef',
    padding: 'clamp(14px, 4vw, 32px)',
    fontFamily: 'Arial, sans-serif',
    color: '#1f2937'
};

const heroStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
    gap: '40px',
    alignItems: 'center',
    minHeight: '520px',
    backgroundColor: '#ffffff',
    borderRadius: '32px',
    padding: 'clamp(30px, 6vw, 70px)',
    boxShadow: '0 20px 45px rgba(0,0,0,0.08)'
};

const leftStyle = {
    maxWidth: '680px'
};

const eyebrowStyle = {
    color: '#0f766e',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '13px',
    marginBottom: '14px'
};

const titleStyle = {
    fontSize: 'clamp(36px, 6vw, 60px)',
    lineHeight: '1.05',
    margin: '0 0 22px 0',
    color: '#111827'
};

const subtitleStyle = {
    fontSize: '17px',
    lineHeight: '1.8',
    color: '#6b7280',
    maxWidth: '600px',
    marginBottom: '32px'
};

const actionsStyle = {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap'
};

const primaryButtonStyle = {
    padding: '14px 24px',
    backgroundColor: '#0f766e',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
    flex: '1 1 190px'
};

const secondaryButtonStyle = {
    padding: '14px 24px',
    backgroundColor: '#f3f4f6',
    color: '#111827',
    border: 'none',
    borderRadius: '999px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
    flex: '1 1 190px'
};

const rightStyle = {
    display: 'flex',
    justifyContent: 'center'
};

const imageCardStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
    height: '450px',
    borderRadius: '32px',
    background: 'linear-gradient(135deg, #0f766e, #2563eb)',
    padding: '18px',
    boxShadow: '0 20px 40px rgba(15,118,110,0.25)'
};

const mainImageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    background:
        'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
};

const floatingPadelCardStyle = {
    position: 'absolute',
    left: '-25px',
    bottom: '35px',
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '20px',
    width: '250px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.18)'
};

const padelImageStyle = {
    width: '74px',
    height: '74px',
    objectFit: 'cover',
    borderRadius: '16px'
};

const floatingChaletTagStyle = {
    position: 'absolute',
    right: '-18px',
    top: '35px',
    backgroundColor: '#111827',
    color: 'white',
    padding: '13px 16px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 12px 25px rgba(0,0,0,0.2)'
};

const featureRowStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
    gap: '20px',
    marginTop: '28px'
};

const featureBoxStyle = {
    backgroundColor: 'white',
    padding: '26px',
    borderRadius: '24px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.06)'
};

const featureIconStyle = {
    fontSize: '32px'
};

const bottomSectionStyle = {
    marginTop: '28px',
    backgroundColor: '#111827',
    color: 'white',
    borderRadius: '30px',
    padding: 'clamp(28px, 5vw, 36px)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: '30px',
    alignItems: 'center'
};

const eyebrowDarkStyle = {
    color: '#5eead4',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '13px'
};

const sectionTitleStyle = {
    fontSize: 'clamp(26px, 5vw, 32px)',
    lineHeight: '1.2',
    margin: 0
};

const stepsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
    gap: '16px'
};

const stepStyle = {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: '20px',
    borderRadius: '18px'
};

export default Home;