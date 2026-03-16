
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Map as MapIcon, FileCheck, Inbox, Settings, LogOut, 
  Plus, Trash2, Edit2, CheckCircle, ImageIcon, X, Save, Upload, 
  PlusCircle, Globe, MessageSquare, Star, Eye, EyeOff,
  Phone, ImagePlus, ListChecks, 
  Layers, Briefcase, FileUser, Link as LinkIcon
} from 'lucide-react';
import { useApp } from '../../store';
import { logout } from '../../firebase';
import { Tour, VisaService, Inquiry, SiteSettings, JobOpening, JobApplication } from '../../types';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { 
    tours, visas, inquiries, settings, testimonials, jobs, applications,
    deleteInquiry, updateInquiryStatus, 
    addTour, updateTour, deleteTour,
    addVisa, updateVisa, deleteVisa,
    updateTestimonialStatus, deleteTestimonial,
    addJob, updateJob, deleteJob,
    updateApplicationStatus, deleteApplication,
    updateSettings 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tours' | 'visas' | 'inquiries' | 'testimonials' | 'careers' | 'settings'>('dashboard');
  
  // State for Editing
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [editingVisa, setEditingVisa] = useState<VisaService | null>(null);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  
  // State for View Modals
  const [viewingApplication, setViewingApplication] = useState<JobApplication | null>(null);
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);
  
  // State for Global Settings
  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  // Refs for File Inputs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const visaImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const homeHeroInputRef = useRef<HTMLInputElement>(null);
  const domesticBannerInputRef = useRef<HTMLInputElement>(null);
  const internationalBannerInputRef = useRef<HTMLInputElement>(null);
  const testimonialImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
    setTempSettings(settings);
  }, [navigate, settings]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleLogout = async () => {
    try {
      await logout();
      sessionStorage.removeItem('isAdmin');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove session and navigate even if firebase logout fails
      sessionStorage.removeItem('isAdmin');
      navigate('/');
    }
  };

  // Helper for Base64 File Uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file as Blob);
    }
  };

  // --- DELETE HANDLERS ---
  const handleDeleteTour = (id: string) => {
    deleteTour(id);
    triggerToast('Destination deleted successfully.');
  };

  const handleDeleteVisa = (id: string) => {
    deleteVisa(id);
    triggerToast('Visa service removed.');
  };

  const handleDeleteInquiry = (id: string) => {
    deleteInquiry(id);
    triggerToast('Enquiry deleted.');
  };

  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonial(id);
    triggerToast('Review removed.');
  };

  const handleDeleteJob = (id: string) => {
    deleteJob(id);
    triggerToast('Job post deleted.');
  };

  const handleDeleteApplication = (id: string) => {
    deleteApplication(id);
    triggerToast('Application removed.');
  };

  // --- Tour Management Helpers ---
  const createNewTour = () => {
    const newTour: Tour = {
      id: 'tour-' + Date.now(),
      category: 'Domestic',
      destination: '',
      bannerImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200',
      shortDescription: '',
      highlights: ['3 Star Hotel', 'Breakfast Included'],
      tourHighlights: ['Local Sightseeing'],
      itinerary: [{ day: 1, title: 'Arrival', description: 'Meet and greet at airport.' }],
      cost: '₹0',
      duration: '1 Night / 2 Days',
      bestTimeToVisit: 'Year-round',
      gallery: [],
      isActive: true
    };
    setEditingTour(newTour);
  };

  const handleSaveTour = () => {
    if (!editingTour) return;
    if (!editingTour.destination) {
      alert('Destination name is required.');
      return;
    }
    const exists = tours.some(t => t.id === editingTour.id);
    if (exists) updateTour(editingTour);
    else addTour(editingTour);
    setEditingTour(null);
    triggerToast('Destination published live!');
  };

  const handleUnpublishTour = () => {
    if (!editingTour) return;
    const updated = { ...editingTour, isActive: false };
    updateTour(updated);
    setEditingTour(null);
    triggerToast('Destination unpublished.');
  };

  // --- Visa Management Helpers ---
  const createNewVisa = () => {
    const newVisa: VisaService = {
      id: 'visa-' + Date.now(),
      type: 'Tourist Visa',
      country: '',
      description: '',
      requirements: ['Valid Passport', 'Recent Photograph'],
      isActive: true
    };
    setEditingVisa(newVisa);
  };

  const handleSaveVisa = () => {
    if (!editingVisa) return;
    if (!editingVisa.country) {
      alert('Country name is required.');
      return;
    }
    const exists = visas.some(v => v.id === editingVisa.id);
    if (exists) updateVisa(editingVisa);
    else addVisa(editingVisa);
    setEditingVisa(null);
    triggerToast('Visa service saved!');
  };

  // --- Career Management Helpers ---
  const createNewJob = () => {
    const newJob: JobOpening = {
      id: 'job-' + Date.now(),
      title: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: [],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setEditingJob(newJob);
  };

  // --- Sidebar Component ---
  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => { 
        setActiveTab(id); 
        setEditingTour(null); 
        setEditingVisa(null); 
        setEditingJob(null); 
        setViewingApplication(null); 
        setViewingInquiry(null); 
      }}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all mb-2 font-semibold ${
        activeTab === id ? 'bg-[#0E4D92] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-brand-sky flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-white border-b lg:border-r border-gray-100 flex flex-col p-6 lg:sticky lg:top-0 lg:h-screen shrink-0 overflow-y-auto">
        <div className="mb-10 px-4 text-center">
          <div className="flex justify-center mb-4">
             {settings.logo ? (
                <img src={settings.logo} className="h-10 w-auto object-contain" />
             ) : (
                <h2 className="text-2xl font-bold font-serif text-[#0E4D92] tracking-widest uppercase">AVIYOURA</h2>
             )}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Management Console</p>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <SidebarItem id="inquiries" label="Enquiries" icon={Inbox} />
          <SidebarItem id="testimonials" label="Testimonials" icon={MessageSquare} />
          <SidebarItem id="tours" label="Manage Tours" icon={MapIcon} />
          <SidebarItem id="visas" label="Visa Services" icon={FileCheck} />
          <SidebarItem id="careers" label="Careers" icon={Briefcase} />
          <SidebarItem id="settings" label="Site CMS" icon={Settings} />
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-6 flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 font-semibold transition-all"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Panel Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        {showToast && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-[#0E4D92] text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] font-bold animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-3">
            <CheckCircle size={20} /> {showToast}
          </div>
        )}
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8 md:mb-12 text-[#1A1A1A]">System Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
              {[
                { label: 'New Enquiries', value: inquiries.filter(i => i.status === 'new').length, color: 'text-orange-600', bg: 'bg-orange-50', icon: <Inbox /> },
                { label: 'Job Applications', value: applications.length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <FileUser /> },
                { label: 'Total Tours', value: tours.length, color: 'text-[#0E4D92]', bg: 'bg-blue-50', icon: <MapIcon /> },
                { label: 'Pending Reviews', value: testimonials.filter(t => t.status === 'pending').length, color: 'text-purple-600', bg: 'bg-purple-50', icon: <MessageSquare /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>{stat.icon}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
               <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Latest Enquiries</h3>
                  <button onClick={() => setActiveTab('inquiries')} className="text-xs font-bold text-[#0E4D92] hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {inquiries.slice(0, 5).map(iq => (
                    <div key={iq.id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">{iq.fullName}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{iq.subject}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${
                        iq.status === 'new' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {iq.status}
                      </span>
                    </div>
                  ))}
                  {inquiries.length === 0 && <p className="text-gray-400 italic text-sm">No enquiries yet.</p>}
                </div>
              </div>
              
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Recent Testimonials</h3>
                <div className="space-y-4">
                  {testimonials.slice(0, 5).map(t => (
                    <div key={t.id} className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-sm">{t.customerName}</p>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                          t.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 line-clamp-1 italic">"{t.feedback}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOURS TAB - FULL CMS */}
        {activeTab === 'tours' && (
          <div>
            {editingTour ? (
              <div className="max-w-5xl bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-bold font-serif">{editingTour.destination || 'New Destination'}</h2>
                    <p className="text-sm text-gray-400 font-medium">Configure destination details, itineraries, and media.</p>
                  </div>
                  <div className="flex gap-4">
                    {editingTour.id && tours.some(t => t.id === editingTour.id && t.isActive) && (
                      <button 
                        onClick={handleUnpublishTour}
                        className="bg-gray-100 text-gray-600 px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-all"
                      >
                        <EyeOff size={18} /> Unpublish
                      </button>
                    )}
                    <button 
                      onClick={handleSaveTour}
                      className="bg-[#0E4D92] text-white px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-xl shadow-[#0E4D92]/20"
                    >
                      <Save size={18} /> Publish Changes
                    </button>
                    <button onClick={() => setEditingTour(null)} className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200"><X size={20} /></button>
                  </div>
                </div>
                
                <form className="space-y-16" onSubmit={e => e.preventDefault()}>
                  {/* Basic Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Destination Name</label>
                        <input className="w-full bg-gray-50 border px-6 py-4 rounded-2xl outline-none font-bold" value={editingTour.destination} onChange={e => setEditingTour({...editingTour, destination: e.target.value})} placeholder="e.g. Switzerland" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                          <select className="w-full bg-gray-50 border px-6 py-4 rounded-2xl outline-none" value={editingTour.category} onChange={e => setEditingTour({...editingTour, category: e.target.value as any})}>
                            <option value="Domestic">Domestic</option>
                            <option value="International">International</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Starting Cost</label>
                          <input className="w-full bg-gray-50 border px-6 py-4 rounded-2xl outline-none" value={editingTour.cost} onChange={e => setEditingTour({...editingTour, cost: e.target.value})} placeholder="e.g. ₹45,000" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Short Description</label>
                      <textarea className="w-full bg-gray-50 border px-6 py-4 rounded-2xl outline-none h-full min-h-[160px] resize-none" value={editingTour.shortDescription} onChange={e => setEditingTour({...editingTour, shortDescription: e.target.value})} placeholder="A catchy summary for listings..." />
                    </div>
                  </div>

                  {/* Media Section */}
                  <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                    <h3 className="text-lg font-bold font-serif mb-8 flex items-center gap-2"><ImageIcon className="text-[#0E4D92]" /> Banner & Gallery</h3>
                    <div className="space-y-10">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Master Listing Banner</label>
                        <div className="flex gap-8 items-start">
                          <div className="w-80 aspect-video bg-white rounded-2xl border overflow-hidden relative group">
                            {editingTour.bannerImage ? (
                                <>
                                  <img src={editingTour.bannerImage} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white transition-opacity">
                                    <button type="button" onClick={() => bannerInputRef.current?.click()} className="p-2 bg-white/20 rounded-lg hover:bg-white/40"><Upload /></button>
                                    <button type="button" onClick={() => setEditingTour({...editingTour, bannerImage: ''})} className="p-2 bg-red-500/80 rounded-lg hover:bg-red-50"><Trash2 /></button>
                                  </div>
                                </>
                            ) : (
                                <button type="button" onClick={() => bannerInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#0E4D92] hover:bg-[#0E4D92]/5">
                                    <PlusCircle size={32} />
                                    <span className="text-xs font-bold mt-2">Upload Banner</span>
                                </button>
                            )}
                          </div>
                          <input type="file" hidden ref={bannerInputRef} onChange={(e) => handleFileUpload(e, (b) => setEditingTour({...editingTour, bannerImage: b}))} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Gallery Carousel Images</label>
                        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                          {editingTour.gallery.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                              <img src={img} className="w-full h-full object-cover" />
                              <button type="button" onClick={() => setEditingTour({...editingTour, gallery: editingTour.gallery.filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                            </div>
                          ))}
                          <button type="button" onClick={() => galleryInputRef.current?.click()} className="aspect-square bg-white rounded-xl border-2 border-dashed border-[#0E4D92]/20 flex flex-col items-center justify-center text-[#0E4D92] hover:bg-[#0E4D92]/5 transition-colors">
                            <PlusCircle size={24} />
                            <span className="text-[10px] font-bold uppercase mt-2">Add Photo</span>
                          </button>
                        </div>
                        <input type="file" hidden ref={galleryInputRef} multiple onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            Array.from(files).forEach((file) => {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setEditingTour(prev => prev ? { ...prev, gallery: [...prev.gallery, reader.result as string] } : null);
                              };
                              reader.readAsDataURL(file as Blob);
                            });
                          }
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Highlights Manager */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#0E4D92] mb-6 flex items-center gap-2"><ListChecks size={18} /> Inclusions (What You Get)</h3>
                      <div className="space-y-3">
                        {editingTour.highlights.map((h, i) => (
                          <div key={i} className="flex gap-2">
                            <input className="flex-1 bg-gray-50 border px-4 py-2 rounded-xl text-sm" value={h} onChange={e => {
                              const newH = [...editingTour.highlights];
                              newH[i] = e.target.value;
                              setEditingTour({...editingTour, highlights: newH});
                            }} />
                            <button type="button" onClick={() => setEditingTour({...editingTour, highlights: editingTour.highlights.filter((_, idx) => idx !== i)})} className="text-red-400"><Trash2 size={16} /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => setEditingTour({...editingTour, highlights: [...editingTour.highlights, '']})} className="w-full py-2 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-[#0E4D92]">+ Add Inclusion</button>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-6 flex items-center gap-2"><Star size={18} /> Tour Attractions</h3>
                      <div className="space-y-3">
                        {editingTour.tourHighlights.map((h, i) => (
                          <div key={i} className="flex gap-2">
                            <input className="flex-1 bg-gray-50 border px-4 py-2 rounded-xl text-sm" value={h} onChange={e => {
                              const newH = [...editingTour.tourHighlights];
                              newH[i] = e.target.value;
                              setEditingTour({...editingTour, tourHighlights: newH});
                            }} />
                            <button type="button" onClick={() => setEditingTour({...editingTour, tourHighlights: editingTour.tourHighlights.filter((_, idx) => idx !== i)})} className="text-red-400"><Trash2 size={16} /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => setEditingTour({...editingTour, tourHighlights: [...editingTour.tourHighlights, '']})} className="w-full py-2 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-orange-500">+ Add Highlight</button>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary Manager */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold font-serif flex items-center gap-2 text-[#1A1A1A]"><Layers className="text-[#0E4D92]" /> Day-wise Itinerary</h3>
                      <button type="button" onClick={() => {
                        const nextDay = (editingTour.itinerary.length > 0 ? editingTour.itinerary[editingTour.itinerary.length - 1].day : 0) + 1;
                        setEditingTour({...editingTour, itinerary: [...editingTour.itinerary, { day: nextDay, title: '', description: '' }]});
                      }} className="bg-[#0E4D92]/10 text-[#0E4D92] px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#0E4D92] hover:text-white transition-all">Add Next Day</button>
                    </div>
                    
                    <div className="space-y-6">
                      {editingTour.itinerary.map((step, idx) => (
                        <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative">
                          <div className="flex gap-6">
                            <div className="w-12 h-12 bg-[#0E4D92] text-white rounded-xl flex items-center justify-center font-bold shrink-0 shadow-lg">D{step.day}</div>
                            <div className="flex-1 space-y-4">
                              <input className="w-full bg-white border border-gray-100 px-6 py-3 rounded-xl outline-none font-bold text-sm" placeholder="Day Title (e.g. Arrival & Leisure)" value={step.title} onChange={e => {
                                const newItin = [...editingTour.itinerary];
                                newItin[idx].title = e.target.value;
                                setEditingTour({...editingTour, itinerary: newItin});
                              }} />
                              <textarea className="w-full bg-white border border-gray-100 px-6 py-3 rounded-xl outline-none text-sm resize-none h-24" placeholder="Detailed plan for the day..." value={step.description} onChange={e => {
                                const newItin = [...editingTour.itinerary];
                                newItin[idx].description = e.target.value;
                                setEditingTour({...editingTour, itinerary: newItin});
                              }} />
                            </div>
                            <button type="button" onClick={() => setEditingTour({...editingTour, itinerary: editingTour.itinerary.filter((_, i) => i !== idx)})} className="text-red-400 self-start mt-2 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={20} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-12">
                  <h1 className="text-4xl font-bold font-serif text-[#1A1A1A]">Destination Management</h1>
                  <button onClick={createNewTour} className="bg-[#0E4D92] text-white px-8 py-4 rounded-[1.5rem] font-bold flex items-center gap-2 hover:shadow-xl shadow-[#0E4D92]/20 transition-all">
                    <Plus size={22} /> Add New Destination
                  </button>
                </div>
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-10 py-6">Destination</th>
                        <th className="px-10 py-6">Price Point</th>
                        <th className="px-10 py-6 text-center">Visibility</th>
                        <th className="px-10 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {tours.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                              <img src={t.bannerImage} className="w-12 h-8 rounded-lg object-cover shadow-sm" />
                              <span className="font-bold text-[#1A1A1A]">{t.destination}</span>
                            </div>
                          </td>
                          <td className="px-10 py-6 font-bold text-[#0E4D92]">{t.cost}</td>
                          <td className="px-10 py-6">
                            <div className="flex justify-center">
                              <button onClick={() => updateTour({...t, isActive: !t.isActive})} className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest transition-all ${t.isActive ? 'bg-blue-100 text-[#0E4D92]' : 'bg-gray-100 text-gray-400'}`}>
                                {t.isActive ? 'Live' : 'Hidden'}
                              </button>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-3">
                              <button onClick={() => setEditingTour(t)} className="p-3 text-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"><Edit2 size={16} /></button>
                              <button onClick={() => handleDeleteTour(t.id)} className="p-3 text-red-600 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VISAS TAB - FULL CMS */}
        {activeTab === 'visas' && (
          <div>
            {editingVisa ? (
              <div className="max-w-4xl bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold font-serif text-[#1A1A1A]">{editingVisa.country || 'New Visa Support'}</h2>
                  <div className="flex gap-4">
                    <button onClick={handleSaveVisa} className="bg-[#0E4D92] text-white px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2">
                      <Save size={18} /> Update Visa Service
                    </button>
                    <button onClick={() => setEditingVisa(null)} className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200"><X size={20} /></button>
                  </div>
                </div>
                
                <form className="space-y-10" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Target Country</label>
                      <input className="w-full bg-gray-50 border px-6 py-4 rounded-2xl outline-none" value={editingVisa.country} onChange={e => setEditingVisa({...editingVisa, country: e.target.value})} placeholder="e.g. United Kingdom" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Service Type</label>
                      <input className="w-full bg-gray-50 border px-6 py-4 rounded-2xl outline-none" value={editingVisa.type} onChange={e => setEditingVisa({...editingVisa, type: e.target.value})} placeholder="e.g. Standard Tourist Visa" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Visa Feature Icon/Image</label>
                    <div className="flex gap-8 items-start">
                      <div className="w-48 aspect-square bg-gray-50 rounded-2xl border overflow-hidden relative group border-dashed border-gray-200">
                        {editingVisa.image ? (
                            <>
                              <img src={editingVisa.image} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white transition-opacity">
                                <button type="button" onClick={() => visaImageInputRef.current?.click()} className="p-2 bg-white/20 rounded-lg hover:bg-white/40"><Upload /></button>
                                <button type="button" onClick={() => setEditingVisa({...editingVisa, image: ''})} className="p-2 bg-red-500/80 rounded-lg hover:bg-red-50"><Trash2 /></button>
                              </div>
                            </>
                        ) : (
                            <button type="button" onClick={() => visaImageInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#0E4D92] hover:bg-[#0E4D92]/5">
                                <ImagePlus size={32} />
                                <span className="text-xs font-bold mt-2 text-center">Upload Visa<br/>Icon</span>
                            </button>
                        )}
                      </div>
                      <input type="file" hidden ref={visaImageInputRef} onChange={(e) => handleFileUpload(e, (b) => setEditingVisa({...editingVisa, image: b}))} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Brief Overview</label>
                    <textarea className="w-full bg-gray-50 border px-6 py-4 rounded-2xl outline-none h-32 resize-none" value={editingVisa.description} onChange={e => setEditingVisa({...editingVisa, description: e.target.value})} placeholder="Describe the visa process or duration..." />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Documentation Checklist</label>
                    <div className="space-y-4">
                      {editingVisa.requirements.map((req, i) => (
                        <div key={i} className="flex gap-2">
                          <input className="flex-1 bg-gray-50 border px-5 py-3 rounded-xl text-sm" value={req} onChange={e => {
                            const newR = [...editingVisa.requirements];
                            newR[i] = e.target.value;
                            setEditingVisa({...editingVisa, requirements: newR});
                          }} />
                          <button type="button" onClick={() => setEditingVisa({...editingVisa, requirements: editingVisa.requirements.filter((_, idx) => idx !== i)})} className="p-2 text-red-400"><Trash2 size={16} /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => setEditingVisa({...editingVisa, requirements: [...editingVisa.requirements, '']})} className="w-full py-3 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-[#0E4D92] transition-colors">+ Add Requirement Field</button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-12">
                  <h1 className="text-4xl font-bold font-serif text-[#1A1A1A]">Visa Support CMS</h1>
                  <button onClick={createNewVisa} className="bg-[#0E4D92] text-white px-8 py-4 rounded-[1.5rem] font-bold flex items-center gap-2">
                    <Plus size={22} /> Add Visa Category
                  </button>
                </div>
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <tr><th className="px-10 py-6">Country</th><th className="px-10 py-6 text-center">Status</th><th className="px-10 py-6 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {visas.map(v => (
                        <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                                {v.image ? (
                                    <img src={v.image} className="w-8 h-8 rounded object-cover border" />
                                ) : (
                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[#0E4D92]"><Globe size={16} /></div>
                                )}
                                <div>
                                    <p className="font-bold text-[#1A1A1A]">{v.country}</p>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">{v.type}</p>
                                </div>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <div className="flex justify-center">
                              <button onClick={() => updateVisa({...v, isActive: !v.isActive})} className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest ${v.isActive ? 'bg-blue-100 text-[#0E4D92]' : 'bg-gray-100 text-gray-400'}`}>
                                {v.isActive ? 'Active' : 'Disabled'}
                              </button>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-3">
                              <button onClick={() => setEditingVisa(v)} className="p-3 text-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"><Edit2 size={16} /></button>
                              <button onClick={() => handleDeleteVisa(v.id)} className="p-3 text-red-600 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {visas.length === 0 && <tr><td colSpan={3} className="px-10 py-20 text-center text-gray-400 italic">No visa services configured yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div>
            <h1 className="text-4xl font-bold font-serif mb-12 text-[#1A1A1A]">Client Enquiries</h1>
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <tr><th className="px-10 py-6">Client Info</th><th className="px-10 py-6">Subject</th><th className="px-10 py-6 text-center">Process Status</th><th className="px-10 py-6 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {inquiries.map(iq => (
                    <tr key={iq.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <p className="font-bold text-[#1A1A1A]">{iq.fullName}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{iq.email} | {iq.phone}</p>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-xs font-bold text-[#0E4D92] uppercase bg-blue-50 px-3 py-1 rounded-full">{iq.subject}</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex justify-center">
                          <select 
                            className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full border-none outline-none cursor-pointer ${
                              iq.status === 'new' ? 'bg-orange-100 text-orange-700' : 
                              iq.status === 'contacted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                            }`}
                            value={iq.status}
                            onChange={(e) => updateInquiryStatus(iq.id, e.target.value as any)}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setViewingInquiry(iq)} className="p-3 text-emerald-600 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-all"><Eye size={16} /></button>
                          <button onClick={() => handleDeleteInquiry(iq.id)} className="p-3 text-red-600 bg-red-50 rounded-2xl hover:bg-red-100 transition-all"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && <tr><td colSpan={4} className="px-10 py-20 text-center text-gray-400 italic">No inquiries received yet.</td></tr>}
                </tbody>
               </table>
            </div>

            {viewingInquiry && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
                <div className="bg-white rounded-[3rem] w-full max-w-xl p-12 shadow-2xl relative animate-in zoom-in-95 duration-200">
                  <button onClick={() => setViewingInquiry(null)} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100"><X size={20} /></button>
                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0E4D92] mb-2 inline-block">Message Detail</span>
                    <h3 className="text-3xl font-bold font-serif text-[#1A1A1A]">{viewingInquiry.fullName}</h3>
                    <p className="text-sm text-gray-400">{viewingInquiry.email} • {viewingInquiry.phone}</p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-[2rem] text-gray-600 leading-relaxed italic mb-10 border border-gray-100">
                    "{viewingInquiry.message || "No specific message provided."}"
                  </div>
                  <div className="flex gap-4">
                    <a href={`mailto:${viewingInquiry.email}`} className="flex-1 bg-[#0E4D92] text-white py-4 rounded-2xl font-bold text-center hover:shadow-xl transition-all">Reply via Email</a>
                    <button onClick={() => { updateInquiryStatus(viewingInquiry.id, 'contacted'); setViewingInquiry(null); }} className="flex-1 bg-[#FF7A00] text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all">Mark Processed</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS / SITE CMS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-12 pb-20">
            <h1 className="text-4xl font-bold font-serif text-[#1A1A1A]">Global Content Management</h1>
            
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 space-y-20">
              {/* BRANDING */}
              <section>
                <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-[#0E4D92] pl-6 text-[#1A1A1A]">Corporate Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Official Logo (Dark Preferred)</label>
                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                      <div className="w-24 h-24 bg-white rounded-2xl border flex items-center justify-center overflow-hidden">
                        {tempSettings.logo ? <img src={tempSettings.logo} className="w-full h-full object-contain" /> : <ImageIcon className="text-gray-200" size={32} />}
                      </div>
                      <div className="space-y-3">
                        <input type="file" hidden ref={logoInputRef} onChange={(e) => handleFileUpload(e, (b) => setTempSettings({...tempSettings, logo: b}))} />
                        <div className="flex gap-2">
                            <button onClick={() => logoInputRef.current?.click()} className="bg-white border px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 hover:border-[#0E4D92] transition-all"><Upload size={12} /> Replace</button>
                            {tempSettings.logo && <button onClick={() => setTempSettings({...tempSettings, logo: ''})} className="bg-red-50 text-red-500 border border-red-100 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-100"><Trash2 size={12} /></button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* HERO VISUALS */}
              <section className="pt-12 border-t border-gray-50">
                <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-orange-400 pl-6 text-[#1A1A1A]">Landing Hero Experience</h3>
                <div className="space-y-10">
                  <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Hero Background Image</label>
                      <div className="flex gap-4">
                        <input className="flex-1 bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm" value={tempSettings.heroBannerImage || ''} onChange={e => setTempSettings({...tempSettings, heroBannerImage: e.target.value})} placeholder="Direct URL or Upload..." />
                        <input type="file" hidden ref={homeHeroInputRef} onChange={(e) => handleFileUpload(e, (b) => setTempSettings({...tempSettings, heroBannerImage: b}))} />
                        <button onClick={() => homeHeroInputRef.current?.click()} className="p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all text-[#0E4D92]"><ImagePlus size={20} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Floating Hero Badge</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-xs font-bold text-[#0E4D92]" value={tempSettings.heroBadge || ''} onChange={e => setTempSettings({...tempSettings, heroBadge: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Main Headline</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-bold" value={tempSettings.heroTitle || ''} onChange={e => setTempSettings({...tempSettings, heroTitle: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Sub-Headline Text</label>
                      <textarea className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm h-32 resize-none leading-relaxed" value={tempSettings.heroSubtitle || ''} onChange={e => setTempSettings({...tempSettings, heroSubtitle: e.target.value})} placeholder="Enter the descriptive text shown below the headline..." />
                    </div>

                    {/* HERO BUTTONS CONTROL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="p-6 bg-white rounded-3xl border border-gray-100">
                        <p className="text-[10px] font-black uppercase text-[#FF7A00] mb-4 flex items-center gap-2"><LinkIcon size={14} /> Primary CTA Button</p>
                        <div className="space-y-4">
                          <input className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] px-4 py-3 rounded-xl text-xs font-bold" value={tempSettings.heroPrimaryBtnText || ''} onChange={e => setTempSettings({...tempSettings, heroPrimaryBtnText: e.target.value})} placeholder="Button Text" />
                          <input className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] px-4 py-3 rounded-xl text-xs" value={tempSettings.heroPrimaryBtnLink || ''} onChange={e => setTempSettings({...tempSettings, heroPrimaryBtnLink: e.target.value})} placeholder="Target Link (e.g. /tours/domestic)" />
                        </div>
                      </div>
                      <div className="p-6 bg-white rounded-3xl border border-gray-100">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-4 flex items-center gap-2"><LinkIcon size={14} /> Secondary Button</p>
                        <div className="space-y-4">
                          <input className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] px-4 py-3 rounded-xl text-xs font-bold" value={tempSettings.heroSecondaryBtnText || ''} onChange={e => setTempSettings({...tempSettings, heroSecondaryBtnText: e.target.value})} placeholder="Button Text" />
                          <input className="w-full bg-gray-50 border border-transparent focus:border-[#0E4D92] px-4 py-3 rounded-xl text-xs" value={tempSettings.heroSecondaryBtnLink || ''} onChange={e => setTempSettings({...tempSettings, heroSecondaryBtnLink: e.target.value})} placeholder="Target Link" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* TOURS SECTION CMS */}
              <section className="pt-12 border-t border-gray-50">
                <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-emerald-500 pl-6 text-[#1A1A1A]">Tours Section Management</h3>
                <div className="space-y-10">
                  <div className="bg-gray-50 p-8 rounded-3xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Featured Tours Heading</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-bold" value={tempSettings.featuredToursHeading || ''} onChange={e => setTempSettings({...tempSettings, featuredToursHeading: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Featured Tours Subheading</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-bold" value={tempSettings.featuredToursSubheading || ''} onChange={e => setTempSettings({...tempSettings, featuredToursSubheading: e.target.value})} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Domestic Listing Banner</label>
                        <div className="aspect-video bg-white rounded-2xl border overflow-hidden relative group">
                          {tempSettings.domesticListingBanner ? (
                            <>
                              <img src={tempSettings.domesticListingBanner} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white transition-opacity">
                                <button type="button" onClick={() => domesticBannerInputRef.current?.click()} className="p-2 bg-white/20 rounded-lg hover:bg-white/40"><Upload /></button>
                                <button type="button" onClick={() => setTempSettings({...tempSettings, domesticListingBanner: ''})} className="p-2 bg-red-500/80 rounded-lg hover:bg-red-50"><Trash2 /></button>
                              </div>
                            </>
                          ) : (
                            <button type="button" onClick={() => domesticBannerInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#0E4D92] hover:bg-[#0E4D92]/5">
                              <PlusCircle size={32} />
                              <span className="text-xs font-bold mt-2">Upload Domestic Banner</span>
                            </button>
                          )}
                        </div>
                        <input type="file" hidden ref={domesticBannerInputRef} onChange={(e) => handleFileUpload(e, (b) => setTempSettings({...tempSettings, domesticListingBanner: b}))} />
                        <input className="w-full bg-white border border-gray-200 px-6 py-3 rounded-xl text-xs" value={tempSettings.domesticListingBanner || ''} onChange={e => setTempSettings({...tempSettings, domesticListingBanner: e.target.value})} placeholder="Or enter Image URL..." />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">International Listing Banner</label>
                        <div className="aspect-video bg-white rounded-2xl border overflow-hidden relative group">
                          {tempSettings.internationalListingBanner ? (
                            <>
                              <img src={tempSettings.internationalListingBanner} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white transition-opacity">
                                <button type="button" onClick={() => internationalBannerInputRef.current?.click()} className="p-2 bg-white/20 rounded-lg hover:bg-white/40"><Upload /></button>
                                <button type="button" onClick={() => setTempSettings({...tempSettings, internationalListingBanner: ''})} className="p-2 bg-red-500/80 rounded-lg hover:bg-red-50"><Trash2 /></button>
                              </div>
                            </>
                          ) : (
                            <button type="button" onClick={() => internationalBannerInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#0E4D92] hover:bg-[#0E4D92]/5">
                              <PlusCircle size={32} />
                              <span className="text-xs font-bold mt-2">Upload International Banner</span>
                            </button>
                          )}
                        </div>
                        <input type="file" hidden ref={internationalBannerInputRef} onChange={(e) => handleFileUpload(e, (b) => setTempSettings({...tempSettings, internationalListingBanner: b}))} />
                        <input className="w-full bg-white border border-gray-200 px-6 py-3 rounded-xl text-xs" value={tempSettings.internationalListingBanner || ''} onChange={e => setTempSettings({...tempSettings, internationalListingBanner: e.target.value})} placeholder="Or enter Image URL..." />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FLOATING STATS CONTROL */}
              <section className="pt-12 border-t border-gray-50">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold font-serif border-l-4 border-blue-500 pl-6 text-[#1A1A1A]">Floating Statistics Card</h3>
                  <button 
                    onClick={() => setTempSettings({...tempSettings, showStatsCard: !tempSettings.showStatsCard})}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${tempSettings.showStatsCard ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {tempSettings.showStatsCard ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                <div className="bg-gray-50 p-8 rounded-3xl">
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Stat Value (e.g. 12,500+)</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-lg font-bold text-[#0E4D92]" value={tempSettings.statsValue || ''} onChange={e => setTempSettings({...tempSettings, statsValue: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Stat Label (e.g. Verified Explorers)</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest" value={tempSettings.statsLabel || ''} onChange={e => setTempSettings({...tempSettings, statsLabel: e.target.value})} />
                      </div>
                   </div>
                </div>
              </section>

              {/* TESTIMONIALS CONFIG */}
              <section className="pt-12 border-t border-gray-50">
                <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-emerald-400 pl-6 text-[#1A1A1A]">Testimonials & Experience</h3>
                <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Feature Image (Side-by-Side)</label>
                    <div className="flex gap-4">
                      <div className="w-32 aspect-video bg-white rounded-xl border overflow-hidden shrink-0">
                        <img src={tempSettings.testimonialSectionImage} className="w-full h-full object-cover" />
                      </div>
                      <input type="file" hidden ref={testimonialImageInputRef} onChange={(e) => handleFileUpload(e, (b) => setTempSettings({...tempSettings, testimonialSectionImage: b}))} />
                      <button onClick={() => testimonialImageInputRef.current?.click()} className="flex-1 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all text-[#0E4D92] font-bold text-xs uppercase tracking-widest">Replace Section Image</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Section Heading</label>
                      <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-bold" value={tempSettings.testimonialsHeading || ''} onChange={e => setTempSettings({...tempSettings, testimonialsHeading: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Section Subheading</label>
                      <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-bold" value={tempSettings.testimonialsSubheading || ''} onChange={e => setTempSettings({...tempSettings, testimonialsSubheading: e.target.value})} />
                    </div>
                  </div>
                </div>
              </section>

              {/* CONTACT DETAILS CMS */}
              <section className="pt-12 border-t border-gray-50">
                <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-gray-400 pl-6 text-[#1A1A1A]">Corporate Contact Info</h3>
                <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Official Phone</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-bold" value={tempSettings.contactPhone || ''} onChange={e => setTempSettings({...tempSettings, contactPhone: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Official Email</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm font-bold" value={tempSettings.contactEmail || ''} onChange={e => setTempSettings({...tempSettings, contactEmail: e.target.value})} />
                      </div>
                   </div>
                   <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Physical Office Address</label>
                      <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm" value={tempSettings.address || ''} onChange={e => setTempSettings({...tempSettings, address: e.target.value})} />
                   </div>
                </div>
              </section>

              {/* SOCIAL MEDIA CMS */}
              <section className="pt-12 border-t border-gray-50">
                <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-blue-400 pl-6 text-[#1A1A1A]">Social Media Profiles</h3>
                <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Facebook URL</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm" value={tempSettings.facebookUrl || ''} onChange={e => setTempSettings({...tempSettings, facebookUrl: e.target.value})} placeholder="https://facebook.com/yourpage" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Instagram URL</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm" value={tempSettings.instagramUrl || ''} onChange={e => setTempSettings({...tempSettings, instagramUrl: e.target.value})} placeholder="https://instagram.com/yourprofile" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">X (Twitter) URL</label>
                        <input className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm" value={tempSettings.twitterUrl || ''} onChange={e => setTempSettings({...tempSettings, twitterUrl: e.target.value})} placeholder="https://x.com/yourhandle" />
                      </div>
                   </div>
                </div>
              </section>

              {/* LEGAL CONTENT CMS */}
              <section className="pt-12 border-t border-gray-50">
                <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-blue-400 pl-6 text-[#1A1A1A]">Legal Content</h3>
                <div className="bg-gray-50 p-8 rounded-3xl space-y-8">
                   <div>
                     <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Terms of Service</label>
                     <textarea 
                       className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm h-48 resize-none leading-relaxed" 
                       value={tempSettings.termsOfService || ''} 
                       onChange={e => setTempSettings({...tempSettings, termsOfService: e.target.value})} 
                       placeholder="Enter your Terms of Service content..."
                     />
                   </div>
                   <div>
                     <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Privacy Policy</label>
                     <textarea 
                       className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl text-sm h-48 resize-none leading-relaxed" 
                       value={tempSettings.privacyPolicy || ''} 
                       onChange={e => setTempSettings({...tempSettings, privacyPolicy: e.target.value})} 
                       placeholder="Enter your Privacy Policy content..."
                     />
                   </div>
                </div>
              </section>

              {/* PUBLISH */}
              <div className="pt-16">
                <button 
                  onClick={() => { updateSettings(tempSettings); triggerToast('Site config published live!'); }}
                  className="w-full bg-[#0E4D92] text-white px-10 py-7 rounded-[2rem] font-bold shadow-2xl flex items-center justify-center gap-4 text-xl hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <Save size={28} /> Synchronize Global Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TESTIMONIALS MODERATION */}
        {activeTab === 'testimonials' && (
          <div>
            <h1 className="text-4xl font-bold font-serif mb-12 text-[#1A1A1A]">Customer Voice</h1>
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <tr><th className="px-10 py-6">Customer</th><th className="px-10 py-6">Feedback</th><th className="px-10 py-6 text-center">Moderation</th><th className="px-10 py-6 text-right">Delete</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {testimonials.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <p className="font-bold text-[#1A1A1A]">{t.customerName}</p>
                        <div className="flex gap-1 text-[#FF7A00] mt-1">
                          {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-xs text-gray-500 italic max-w-sm leading-relaxed">"{t.feedback}"</td>
                      <td className="px-10 py-6">
                        <div className="flex justify-center gap-3">
                          {t.status === 'pending' ? (
                            <>
                              <button onClick={() => updateTestimonialStatus(t.id, 'approved')} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-emerald-600 hover:text-white transition-all">Approve</button>
                              <button onClick={() => updateTestimonialStatus(t.id, 'rejected')} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all">Reject</button>
                            </>
                          ) : (
                            <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full ${t.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {t.status}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button onClick={() => handleDeleteTestimonial(t.id)} className="p-3 text-red-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                  {testimonials.length === 0 && <tr><td colSpan={4} className="px-10 py-20 text-center text-gray-400 italic">No testimonials received yet.</td></tr>}
                </tbody>
               </table>
            </div>
          </div>
        )}

        {/* CAREERS TAB */}
        {activeTab === 'careers' && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-bold font-serif text-[#1A1A1A]">Talent Acquisition</h1>
              <button onClick={createNewJob} className="bg-[#0E4D92] text-white px-8 py-4 rounded-[1.5rem] font-bold flex items-center gap-2 hover:shadow-xl transition-all">
                <Plus size={22} /> Post New Role
              </button>
            </div>
            
            {editingJob ? (
               <div className="max-w-4xl bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold font-serif text-[#1A1A1A]">{editingJob.title || 'New Job Posting'}</h2>
                  <div className="flex gap-4">
                    <button onClick={() => { 
                      const exists = jobs.some(j => j.id === editingJob.id);
                      if (exists) updateJob(editingJob); else addJob(editingJob);
                      setEditingJob(null); 
                      triggerToast('Job listing published!'); 
                    }} className="bg-[#0E4D92] text-white px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2">
                      <Save size={18} /> Save Job
                    </button>
                    <button onClick={() => setEditingJob(null)} className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200"><X size={20} /></button>
                  </div>
                </div>
                
                <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Job Title</label>
                        <input className="w-full bg-gray-50 border border-gray-100 px-6 py-3 rounded-xl outline-none text-sm font-bold" value={editingJob.title} onChange={e => setEditingJob({...editingJob, title: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                        <input className="w-full bg-gray-50 border border-gray-100 px-6 py-3 rounded-xl outline-none text-sm" value={editingJob.location} onChange={e => setEditingJob({...editingJob, location: e.target.value})} />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Employment Type</label>
                        <select className="w-full bg-gray-50 border border-gray-100 px-6 py-3 rounded-xl outline-none text-sm" value={editingJob.type} onChange={e => setEditingJob({...editingJob, type: e.target.value as any})}>
                           <option value="Full-time">Full-time</option>
                           <option value="Part-time">Part-time</option>
                           <option value="Contract">Contract</option>
                           <option value="Internship">Internship</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button 
                          onClick={() => setEditingJob({...editingJob, isActive: !editingJob.isActive})}
                          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${editingJob.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}
                        >
                          {editingJob.isActive ? 'Status: Active' : 'Status: Draft'}
                        </button>
                      </div>
                   </div>
                   <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea className="w-full bg-gray-50 border border-gray-100 px-6 py-3 rounded-xl outline-none text-sm h-32 resize-none" value={editingJob.description} onChange={e => setEditingJob({...editingJob, description: e.target.value})} />
                   </div>
                   <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Key Requirements (One per line)</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-100 px-6 py-3 rounded-xl outline-none text-sm h-32 resize-none" 
                      value={editingJob.requirements.join('\n')} 
                      onChange={e => setEditingJob({...editingJob, requirements: e.target.value.split('\n')})} 
                    />
                   </div>
                </form>
               </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Job List */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden h-fit">
                  <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                      <h3 className="font-bold flex items-center gap-2"><Briefcase className="text-[#0E4D92]" /> Current Vacancies</h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                      {jobs.map(job => (
                        <div key={job.id} className="p-6 flex items-center justify-between group">
                          <div>
                            <p className="font-bold text-[#1A1A1A]">{job.title}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{job.location} • {job.type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setEditingJob(job)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))}
                      {jobs.length === 0 && <p className="p-10 text-center text-gray-300 italic">No active job posts.</p>}
                  </div>
                </div>

                {/* Applications Pool */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden h-fit">
                  <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                      <h3 className="font-bold flex items-center gap-2"><FileUser className="text-[#0E4D92]" /> Applicant Pool</h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                      {applications.map(app => (
                        <div key={app.id} className="p-6 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#1A1A1A]">{app.fullName}</p>
                            <p className="text-[10px] text-[#0E4D92] font-bold uppercase">{app.jobTitle}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                              app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 
                              app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {app.status}
                            </span>
                            <button onClick={() => setViewingApplication(app)} className="bg-blue-50 text-[#0E4D92] px-4 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-[#0E4D92] hover:text-white transition-all">Review</button>
                            <button onClick={() => handleDeleteApplication(app.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))}
                      {applications.length === 0 && <p className="p-10 text-center text-gray-300 italic">No applications yet.</p>}
                  </div>
                </div>
              </div>
            )}

            {viewingApplication && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
                <div className="bg-white rounded-[3rem] w-full max-w-xl p-12 shadow-2xl relative animate-in zoom-in-95 duration-200">
                  <button onClick={() => setViewingApplication(null)} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100"><X size={20} /></button>
                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0E4D92] mb-2 inline-block">Application Profile</span>
                    <h3 className="text-3xl font-bold font-serif text-[#1A1A1A]">{viewingApplication.fullName}</h3>
                    <p className="text-sm text-gray-400">{viewingApplication.email} • {viewingApplication.phone}</p>
                    {viewingApplication.portfolioUrl && (
                      <a href={viewingApplication.portfolioUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 flex items-center gap-1 mt-2 hover:underline">
                        <LinkIcon size={12} /> Portfolio / LinkedIn
                      </a>
                    )}
                  </div>
                  <div className="bg-gray-50 p-8 rounded-[2rem] mb-10 border border-gray-100 max-h-60 overflow-y-auto">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-3">Professional Summary / Note</p>
                    <p className="text-sm text-gray-600 leading-relaxed italic">"{viewingApplication.resumeText}"</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => { updateApplicationStatus(viewingApplication.id, 'accepted'); setViewingApplication(null); triggerToast('Candidate accepted.'); }} className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all">Accept Candidate</button>
                    <button onClick={() => { updateApplicationStatus(viewingApplication.id, 'rejected'); setViewingApplication(null); }} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold">Reject</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
