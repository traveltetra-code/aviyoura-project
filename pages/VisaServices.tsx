
import React, { useState } from 'react';
import { ShieldCheck, FileText, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../store';
import InquiryForm from '../components/InquiryForm';

const VisaServices: React.FC = () => {
  const { visas } = useApp();
  const activeVisas = visas.filter(v => v.isActive);
  const [selectedVisa, setSelectedVisa] = useState(activeVisas[0] || null);

  if (!selectedVisa) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold">No visa services available at the moment.</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#0E4D92] font-bold uppercase tracking-widest text-sm mb-4 inline-block">Hassle-Free Process</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#333333] mb-6">Expert Visa Assistance</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Navigating visa applications can be complex. Our dedicated team simplifies the process for tourist, business, and study visas for countries worldwide.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Visa Options List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeVisas.map((visa) => (
                  <div 
                    key={visa.id}
                    onClick={() => setSelectedVisa(visa)}
                    className={`p-8 rounded-3xl border transition-all cursor-pointer ${
                      selectedVisa.id === visa.id 
                      ? 'bg-white border-[#0E4D92] shadow-xl ring-1 ring-[#0E4D92]' 
                      : 'bg-white border-gray-100 hover:border-[#0E4D92]/50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden ${
                        selectedVisa.id === visa.id ? 'bg-[#0E4D92] text-white' : 'bg-gray-100 text-[#0E4D92]'
                      }`}>
                        {visa.image ? (
                            <img src={visa.image} className="w-full h-full object-cover" alt={visa.country} />
                        ) : (
                            <FileText size={24} />
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 px-2 py-1 rounded text-gray-400">
                        {visa.country}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{visa.type}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">
                      {visa.description}
                    </p>
                    <div className="flex items-center text-[#0E4D92] text-sm font-bold gap-2">
                      View Requirements <ArrowRight size={16} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Requirement Details */}
              <div className="bg-[#1a1a1a] text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E4D92]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl font-bold mb-8 font-serif flex items-center gap-3">
                  <ShieldCheck className="text-[#0E4D92]" size={28} />
                  {selectedVisa.type} Requirements: {selectedVisa.country}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {selectedVisa.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <CheckCircle2 className="text-[#0E4D92] flex-shrink-0" size={18} />
                      <span className="text-sm font-medium">{req}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-[#0E4D92]/20 rounded-2xl border border-[#0E4D92]/30 text-blue-200 text-xs leading-relaxed italic">
                  Note: Documentation may vary based on individual profiles and specific country embassy guidelines. Contact our experts for a personalized checklist.
                </div>
              </div>
            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <InquiryForm subject={`Visa Inquiry for ${selectedVisa.type} (${selectedVisa.country})`} />
                
                <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-[#0E4D92]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe size={32} className="text-[#0E4D92]" />
                  </div>
                  <h4 className="font-bold mb-2">Global Visa Support</h4>
                  <p className="text-sm text-gray-500 mb-0 leading-relaxed">
                    We also handle Canada, UK, Australia, and Middle Eastern visas. Get in touch for others.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaServices;
