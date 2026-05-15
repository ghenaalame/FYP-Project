import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={pageStyle}>
            <section style={heroStyle}>
                <h1>Book Padel Courts & Chalets Easily</h1>
                <p>
                    A reservation web application where users can view padel courts
                    and chalets, check details, and book without double reservations.
                </p>

                <div style={buttonWrapper}>
                    <button onClick={() => navigate('/padel')} style={primaryButton}>
                        Explore Padel Courts
                    </button>

                    <button onClick={() => navigate('/chalets')} style={secondaryButton}>
                        Explore Chalets
                    </button>
                </div>
            </section>

            <section style={cardsWrapper}>
                <div style={cardStyle}>
                    <h2>🎾 Padel Reservations</h2>
                    <p>Book one of our 4 padel courts by date and time.</p>
                </div>

                <div style={cardStyle}>
                    <h2>🏡 Chalet Reservations</h2>
                    <p>Choose from 7 chalets including standard and pro options.</p>
                </div>
            </section>

            <section style={stepsStyle}>
                <h2>How It Works</h2>
                <p>1. Register or login</p>
                <p>2. Choose padel court or chalet</p>
                <p>3. View details</p>
                <p>4. Select date/time and confirm booking</p>
            </section>
        </div>
    );
};

const pageStyle = {
    padding: '40px',
    fontFamily: 'Arial',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh'
};

const heroStyle = {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '60px 30px',
    borderRadius: '18px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    marginBottom: '35px'
};

const buttonWrapper = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
    flexWrap: 'wrap'
};

const primaryButton = {
    padding: '14px 25px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const secondaryButton = {
    padding: '14px 25px',
    backgroundColor: '#d4af37',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const cardsWrapper = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '35px'
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
    textAlign: 'center'
};

const stepsStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
    textAlign: 'center'
};

export default Home;