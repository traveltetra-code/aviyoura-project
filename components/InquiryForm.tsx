
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useApp } from '../store';

interface InquiryFormProps {
  subject: string;
  className?: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ subject, className = "" }) => {
  const { addInquiry } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      ...formData,
      subject
    });
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 5000);
  };

  if (submitted) {
    return (
      <div className={`bg-white p-8 rounded-2xl border border-[#0E4D92]/20 shadow-xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300 ${className}`}>
        <div className="w-16 h-16 bg-[#0E4D92]/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="text-[#0E4D92]" size={32} />
        </div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Inquiry Sent Successfully!</h3>
        <p className="text-gray-500 text-sm">Thank you for contacting AVIYOURA. Our travel expert will reach out to you within 24 hours.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[#0E4D92] font-semibold text-sm hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-xl ${className}`}>
      <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Plan Your Trip</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name *</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white rounded-lg outline-none transition-all text-sm"
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address *</label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white rounded-lg outline-none transition-all text-sm"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number *</label>
            <input
              required
              type="tel"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white rounded-lg outline-none transition-all text-sm"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Message (Optional)</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white rounded-lg outline-none transition-all text-sm resize-none"
            placeholder="Any specific preferences or questions?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white py-4 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          <span>Send Inquiry</span>
          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      <p className="mt-4 text-[10px] text-gray-400 text-center">
        By submitting, you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
};

export default InquiryForm;