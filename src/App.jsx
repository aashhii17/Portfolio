import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

export default function App() {
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
  };

  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent landing in the middle on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <Router>
      <ScrollProgress />
      <Header />
      
      <Routes>
        <Route path="/" element={<Home triggerToast={triggerToast} />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects triggerToast={triggerToast} />} />
        <Route path="/contact" element={<Contact triggerToast={triggerToast} />} />
      </Routes>
      
      <Footer />

      {/* Global Toast Notification */}
      <div className={`toast-studio ${toast.show ? 'show' : ''}`} id="toastNotification">
        <i className="fa-solid fa-circle-check"></i> <span id="toastMsg">{toast.message}</span>
      </div>
    </Router>
  );
}
