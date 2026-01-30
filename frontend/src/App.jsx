import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import LandingPage from './pages/LandingPage';
import AdminProjects from './pages/admin/AdminProjects';
import AdminClients from './pages/admin/AdminClients';
import AdminContacts from './pages/admin/AdminContacts';
import AdminNewsletters from './pages/admin/AdminNewsletters';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/newsletters" element={<AdminNewsletters />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;