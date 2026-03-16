
import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Send, CheckCircle, ChevronRight, FileText } from 'lucide-react';
import { useApp } from '../store';
import { JobOpening } from '../types';

const Careers: React.FC = () => {
  const { jobs, addApplication } = useApp();
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    resumeText: ''
  });

  const activeJobs = jobs.filter(j => j.isActive);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    addApplication({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      ...formData
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setFormData({ fullName: '', email: '', phone: '', portfolioUrl: '', resumeText: '' });
    }, 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#0E4D92] font-bold uppercase tracking-widest text-sm mb-4 inline-block">Join Our Team</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#333333] mb-6">Build the Future of Travel</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            At AVIYOURA, we're passionate about creating unforgettable journeys. We're looking for talented individuals to help us redefine luxury travel.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Jobs List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold font-serif mb-8">Current Openings</h2>
              {activeJobs.length > 0 ? (
                activeJobs.map((job) => (
                  <div 
                    key={job.id}
                    className={`bg-white p-8 rounded-3xl border transition-all ${
                      selectedJob?.id === job.id 
                        ? 'border-[#0E4D92] shadow-xl ring-1 ring-[#0E4D92]' 
                        : 'border-gray-100 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#333333]">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                            <MapPin size={14} className="text-[#0E4D92]" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                            <Clock size={14} className="text-[#0E4D92]" /> {job.type}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedJob(job);
                          setSubmitted(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          selectedJob?.id === job.id 
                            ? 'bg-[#0E4D92] text-white' 
                            : 'bg-[#0E4D92]/10 text-[#0E4D92] hover:bg-[#0E4D92] hover:text-white'
                        }`}
                      >
                        Apply Now
                      </button>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-500">
                      <p className="mb-4">{job.description}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-none p-0">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 m-0">
                            <CheckCircle size={14} className="text-[#0E4D92] shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                  <Briefcase size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400 font-medium">No open positions at the moment. Check back soon!</p>
                </div>
              )}
            </div>

            {/* Application Sidebar Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                {!selectedJob ? (
                  <div className="bg-[#0E4D92]/5 border border-[#0E4D92]/10 p-10 rounded-3xl text-center">
                    <Briefcase size={40} className="mx-auto text-[#0E4D92] mb-6" />
                    <h3 className="text-xl font-bold mb-4">Start Your Application</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Please select an open position from the list to view requirements and submit your application.
                    </p>
                  </div>
                ) : submitted ? (
                  <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100 text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-[#0E4D92]" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Application Received!</h3>
                    <p className="text-sm text-gray-500">Thank you for your interest in AVIYOURA. Our HR team will review your profile and get back to you soon.</p>
                  </div>
                ) : (
                  <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-50">
                    <div className="mb-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#0E4D92] mb-2 block">Application Form</span>
                      <h3 className="text-2xl font-bold font-serif">{selectedJob.title}</h3>
                    </div>
                    <form onSubmit={handleApply} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Full Name *</label>
                        <input
                          required
                          className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white px-4 py-3 rounded-xl outline-none transition-all text-sm"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Email *</label>
                          <input
                            required
                            type="email"
                            className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white px-4 py-3 rounded-xl outline-none transition-all text-sm"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Phone *</label>
                          <input
                            required
                            className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white px-4 py-3 rounded-xl outline-none transition-all text-sm"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Portfolio / LinkedIn URL</label>
                        <input
                          className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white px-4 py-3 rounded-xl outline-none transition-all text-sm"
                          placeholder="https://..."
                          value={formData.portfolioUrl}
                          onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">About Your Experience *</label>
                        <textarea
                          required
                          rows={4}
                          className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] focus:bg-white px-4 py-3 rounded-xl outline-none transition-all text-sm resize-none"
                          placeholder="Tell us why you're a great fit..."
                          value={formData.resumeText}
                          onChange={e => setFormData({ ...formData, resumeText: e.target.value })}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#0E4D92] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#0E4D92]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        Submit Application <Send size={18} />
                      </button>
                    </form>
                  </div>
                )}
                
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0E4D92]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#333333]">Hiring Process</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Application Review &rarr; 1st Interview &rarr; Final Round</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
