import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import AdminBookings from './pages/AdminBookings';
import Layout from './components/Layout';

import Padel from './pages/Padel';
import PadelDetail from './pages/PadelDetail';
import PadelBooking from './pages/PadelBooking';

import Chalets from './pages/Chalets';
import ChaletDetail from './pages/ChaletDetail';
import ChaletBooking from './pages/ChaletBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="admin/bookings" element={<AdminBookings />} />

          <Route path="padel" element={<Padel />} />
          <Route path="padel/:id" element={<PadelDetail />} />
          <Route path="padel/:id/book" element={<PadelBooking />} />

          <Route path="chalets" element={<Chalets />} />
          <Route path="chalets/:id" element={<ChaletDetail />} />
          <Route path="chalets/:id/book" element={<ChaletBooking />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;