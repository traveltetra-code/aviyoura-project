
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useApp } from '../store';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { settings } = useApp();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Domestic Tours', path: '/tours/domestic' },
    { name: 'International Tours', path: '/tours/international' },
    { name: 'Visa Services', path: '/visa-services' },
    { name: 'About Us', path: '/about' },
    { name: 'About Us', path: '/hotels' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const navBgClass = isHome 
    ? (isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4') 
    : 'bg-white shadow-sm py-2';

  const textColorClass = isHome && !isScrolled ? 'text-white' : 'text-[#1A1A1A]';
  const activeColorClass = isHome && !isScrolled ? 'text-emerald-400' : 'text-[#0E4D92]';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            {settings.logo ? (
              <img src={settings.logo} alt="AVIYOURA Logo" className={`h-10 w-auto object-contain transition-all duration-500 ${isHome && !isScrolled ? 'brightness-0 invert' : ''}`} />
            ) : (
              <span className={`text-2xl font-bold tracking-wider font-serif transition-colors duration-500 ${isHome && !isScrolled ? 'text-white' : 'text-[#0E4D92]'}`}>
                AVIYOURA
              </span>
            )}
          </Link>
          
          {/* Desktop Links & Button grouped on the right */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <div className="flex items-center space-x-3 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] lg:text-sm font-bold tracking-tight whitespace-nowrap transition-colors duration-300 ${
                    isActive(link.path) ? activeColorClass : `${textColorClass} hover:text-[#0E4D92]`
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <Link 
              to="/contact" 
              className={`px-4 lg:px-8 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-md ${
                isHome && !isScrolled 
                ? 'bg-white text-[#0E4D92] hover:bg-blue-50' 
                : 'bg-[#FF7A00] text-white hover:bg-[#E66E00]'
              }`}
            >
              Inquire Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-500 ${isHome && !isScrolled ? 'text-white' : 'text-[#1A1A1A]'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 shadow-lg absolute w-full left-0 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path) ? 'bg-[#0E4D92]/10 text-[#0E4D92]' : 'text-[#1A1A1A] hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
