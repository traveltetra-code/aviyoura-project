
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, ArrowLeft } from 'lucide-react';
import { loginWithGoogle } from '../../firebase';
import { useApp } from '../../store';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useApp();

  // If already admin, redirect to dashboard
  useEffect(() => {
    if (isAdmin) {
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'AvIyourA592@dmiN' && password === 'eDo96@HiFen19auraTen%c') {
      sessionStorage.setItem('isAdmin', 'true');
      // Note: This legacy login doesn't provide Firebase Admin permissions
      // We should encourage Google Login for full access
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const loggedInUser = await loginWithGoogle();
      const adminEmail = "traveltetra@gmail.com";
      
      if (loggedInUser.email === adminEmail) {
        sessionStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized: This account does not have admin privileges.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-sky flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute top-8 left-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-500 hover:text-[#0E4D92] font-semibold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold font-serif text-[#1A1A1A] mb-2 tracking-widest uppercase">AVIYOURA</h2>
            <p className="text-xs font-bold text-[#0E4D92] uppercase tracking-[0.2em]">Admin Portal</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-semibold mb-6 text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group shadow-sm disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or use credentials</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white px-14 py-4 rounded-2xl outline-none transition-all placeholder:text-gray-300"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    required
                    type="password"
                    className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white px-14 py-4 rounded-2xl outline-none transition-all placeholder:text-gray-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0E4D92] text-white py-4.5 rounded-2xl font-bold hover:bg-[#0A3B6F] transition-all shadow-[0_10px_20px_rgba(14,77,146,0.2)] flex items-center justify-center gap-2 group mt-4 text-lg"
              >
                Sign In <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <Link 
              to="/" 
              className="text-sm font-semibold text-gray-400 hover:text-[#0E4D92] transition-colors"
            >
              Return to Website
            </Link>
          </div>
        </div>
        
        <p className="text-center mt-8 text-gray-400 text-xs">
          © {new Date().getFullYear()} AVIYOURA Travel & Tourism • Secure Admin Environment
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
