
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Home from './pages/Home';
import TourListing from './pages/TourListing';
import TourDetail from './pages/TourDetail';
import VisaServices from './pages/VisaServices';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminPanel';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';

const AboutPlaceholder = () => (
  <div className="py-24 max-w-4xl mx-auto px-4 text-center">
    <h1 className="text-5xl font-bold font-serif mb-8">About AVIYOURA</h1>
    <p className="text-lg text-gray-500 leading-relaxed">
      Founded on the principles of trust and luxury, AVIYOURA is a premier travel concierge dedicated to creating world-class travel experiences. We specialize in both inbound and outbound tourism, providing curated packages and professional visa support.
    </p>
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-8 bg-gray-50 rounded-2xl">
        <h3 className="text-xl font-bold mb-2">Our Vision</h3>
        <p className="text-sm text-gray-400">To be the most trusted name in personalized global travel.</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-2xl">
        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
        <p className="text-sm text-gray-400">Simplifying international travel through expert guidance.</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-2xl">
        <h3 className="text-xl font-bold mb-2">Our Values</h3>
        <p className="text-sm text-gray-400">Integrity, Excellence, and Customer-Centricity.</p>
      </div>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const { loading } = useApp();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-sky">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0E4D92] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold font-serif text-gray-900">AVIYOURA</h2>
          <p className="text-sm text-gray-400 mt-2 font-medium">Synchronizing global data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours/:category" element={<TourListing />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/visa-services" element={<VisaServices />} />
          <Route path="/about" element={<AboutPlaceholder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
