import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Trips from './pages/Trips';
import Itinerary from './pages/Itinerary';
import Community from './pages/Community';
import Budget from './pages/Budget';
import Calendar from './pages/Calendar';
import CitySearch from './pages/CitySearch';
import NewTrip from './pages/NewTrip';
import LogPastTrip from './pages/LogPastTrip';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
          <Route path="/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/citysearch" element={<ProtectedRoute><CitySearch /></ProtectedRoute>} />
          <Route path="/newtrip" element={<ProtectedRoute><NewTrip /></ProtectedRoute>} />
          <Route path="/log-past-trip" element={<ProtectedRoute><LogPastTrip /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
