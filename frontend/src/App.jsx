import { BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
// import Home from './pages/Home';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <nav style={{ padding: "10px" , borderBottom: "1px solid #ccc"}}>
        <Link to="/">Home</Link>
        <Link to="/register" style={{ margin: "0 10px"}}>Register</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
