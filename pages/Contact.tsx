
import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useApp } from '../store';
import InquiryForm from '../components/InquiryForm';

const Contact: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0E4D92]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[#0E4D92] font-bold uppercase tracking-widest text-sm mb-4 inline-block">Get In Touch</span>
              <h1 className="text-4xl md:text-6xl font-bold font-serif mb-8 leading-tight">We'd love to hear from <span className="text-[#0E4D92]">you.</span></h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-md">
                Have a question or ready to plan your trip? Reach out to our team of travel experts today.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-[#0E4D92]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#0E4D92] group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-xl font-bold text-[#333333]">{settings.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-[#0E4D92]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#0E4D92] group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                    <p className="text-xl font-bold text-[#333333]">{settings.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-[#0E4D92]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#0E4D92] group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Our Office</p>
                    <p className="text-lg font-bold text-[#333333] leading-snug">{settings.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#0E4D92]/10 rounded-[40px] blur-2xl"></div>
              <InquiryForm subject="General Website Inquiry" className="relative z-10 !bg-white p-12 rounded-[32px] shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 w-full bg-gray-200">
        <div className="w-full h-full flex items-center justify-center bg-[#0E4D92]/5">
           <div className="text-center">
             <MapPin className="mx-auto text-[#0E4D92] mb-4" size={48} />
             <p className="text-gray-400 font-medium">Interactive Map Integration for {settings.address}</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
