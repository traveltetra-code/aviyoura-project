
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useApp } from '../store';

const Footer: React.FC = () => {
  const { settings } = useApp();

  return (
    <footer className="bg-[#0A2A4E] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            {settings.logo ? (
              <img src={settings.logo} alt="AVIYOURA Logo" className="h-12 w-auto mb-6 object-contain" />
            ) : (
              <h3 className="text-2xl font-bold text-[#FF7A00] font-serif mb-6 tracking-widest">AVIYOURA</h3>
            )}
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Designing premium travel experiences for the modern explorer. Your trusted partner for seamless tours and visa services.
            </p>
            <div className="flex space-x-4">
              {settings.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-[#FF7A00] transition-colors"><Facebook size={20} /></a>}
              {settings.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[#FF7A00] transition-colors"><Instagram size={20} /></a>}
              {settings.twitterUrl && <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-[#FF7A00] transition-colors"><Twitter size={20} /></a>}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link to="/tours/domestic" className="hover:text-white transition-colors">Domestic Packages</Link></li>
              <li><Link to="/tours/international" className="hover:text-white transition-colors">International Packages</Link></li>
              <li><Link to="/visa-services" className="hover:text-white transition-colors">Visa Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-[#FF7A00] transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF7A00] flex-shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FF7A00] flex-shrink-0" />
                <span>{settings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FF7A00] flex-shrink-0" />
                <span>{settings.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AVIYOURA Travel & Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;