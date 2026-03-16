
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, Send, CheckCircle, Users, MapPin, Tag, ChevronLeft, ChevronRight, User, ImageIcon } from 'lucide-react';
import { useApp } from '../store';
import InquiryForm from '../components/InquiryForm';

const Home: React.FC = () => {
  const { tours, settings, testimonials, addTestimonial } = useApp();
  const activeTours = tours.filter(t => t.isActive).slice(0, 3);
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, feedback: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Derived Stats for Testimonials
  const stats = useMemo(() => {
    if (approvedTestimonials.length === 0) return { avg: 0, count: 0 };
    const sum = approvedTestimonials.reduce((acc, t) => acc + t.rating, 0);
    return {
      avg: (sum / approvedTestimonials.length).toFixed(1),
      count: approvedTestimonials.length
    };
  }, [approvedTestimonials]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial({
      customerName: reviewForm.name,
      rating: reviewForm.rating,
      feedback: reviewForm.feedback
    });
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewForm({ name: '', rating: 5, feedback: '' });
    }, 5000);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center min-h-[700px] pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.heroBannerImage} 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Hero background"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#0E4D92] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 animate-pulse">
              {settings.heroBadge}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif leading-[1.1] mb-8 drop-shadow-lg">
              {settings.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed font-light max-w-xl">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Link 
                to={settings.heroPrimaryBtnLink} 
                className="bg-[#FF7A00] text-white px-10 py-4 rounded-full font-bold text-center hover:bg-[#E66E00] transition-all shadow-xl hover:shadow-[#FF7A00]/20 flex items-center justify-center gap-2 group w-full sm:w-auto text-lg"
              >
                {settings.heroPrimaryBtnText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to={settings.heroSecondaryBtnLink} 
                className="bg-[#0E4D92] text-white px-10 py-4 rounded-full font-bold text-center hover:bg-[#0A3D75] transition-all shadow-xl w-full sm:w-auto text-lg"
              >
                {settings.heroSecondaryBtnText}
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stat Card */}
        {settings.showStatsCard && (
          <div className="absolute bottom-8 right-8 hidden lg:block animate-in fade-in slide-in-from-right-10 duration-1000">
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] text-white shadow-2xl">
                <div className="flex items-center gap-5">
                  <div className="bg-[#0E4D92] p-4 rounded-2xl shadow-lg shadow-[#0E4D92]/30">
                    <Users size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{settings.statsValue}</p>
                    <p className="text-[10px] text-blue-100 font-bold uppercase tracking-[0.2em]">{settings.statsLabel}</p>
                  </div>
                </div>
             </div>
          </div>
        )}
      </section>



      {/* Featured Destinations */}
      {settings.showFeaturedTours && (
        <section className="py-32 bg-brand-sky">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <p className="text-[#0E4D92] font-bold tracking-[0.3em] uppercase text-xs mb-4">{settings.featuredToursSubheading}</p>
                <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#1A1A1A]">{settings.featuredToursHeading}</h2>
              </div>
              <Link to="/tours/domestic" className="group text-[#0E4D92] font-bold flex items-center gap-2 text-lg">
                Explore All <span className="w-8 h-8 rounded-full bg-[#0E4D92]/10 flex items-center justify-center group-hover:bg-[#0E4D92] group-hover:text-white transition-all"><ArrowRight size={18} /></span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {activeTours.map((tour) => (
                <div key={tour.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 flex flex-col h-full">
                  <div className="relative h-72 overflow-hidden">
                    <img src={tour.bannerImage} alt={tour.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] text-[#0E4D92] shadow-lg">{tour.category}</div>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-[#FF7A00]">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      {tour.cost && (
                        <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter border border-blue-100/50">
                          <Tag size={10} /> {tour.cost}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-[#0E4D92] mb-2">
                       <MapPin size={14} />
                       <span className="text-[10px] font-black uppercase tracking-[0.1em]">{tour.destination}</span>
                    </div>

                    <h3 className="text-3xl font-bold text-[#1A1A1A] mb-4 font-serif">{tour.destination}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-8 leading-relaxed flex-1">{tour.shortDescription}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{tour.duration}</span>
                      <Link to={`/tour/${tour.id}`} className="text-[#1A1A1A] font-bold text-sm underline underline-offset-8 decoration-[#0E4D92]/30 hover:decoration-[#0E4D92]">Detail View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - Side by Side Layout */}
      {settings.showTestimonials && (
        <section className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              
              {/* Left Column: Heading + Carousel */}
              <div className="space-y-12">
                <div>
                  <span className="bg-[#E7F0F9] text-[#0E4D92] font-bold tracking-widest uppercase text-[10px] px-5 py-2 rounded-full mb-6 inline-block">
                    Testimonials
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold font-serif text-[#1A1A1A] mb-6 leading-tight">
                    {settings.testimonialsHeading}
                  </h2>
                  <p className="text-gray-400 max-w-xl text-lg italic font-light">
                    {settings.testimonialsSubheading}
                  </p>
                </div>

                <div className="w-full">
                  {approvedTestimonials.length > 0 ? (
                    <div className="space-y-8">
                      <div className="bg-white rounded-[2.5rem] p-10 md:p-12 border-t-[6px] border-[#0E4D92] shadow-2xl shadow-gray-200 relative animate-in fade-in slide-in-from-left-4 duration-500 min-h-[360px] flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                          <div className="bg-[#E7F0F9] text-[#0E4D92] px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Star size={10} fill="currentColor" /> Verified Destination Trip
                          </div>
                          <div className="flex gap-0.5 text-[#FF7A00]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < approvedTestimonials[currentIndex].rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center relative mb-10">
                          <Quote className="absolute -top-6 -left-6 text-gray-50 h-16 w-16 -z-10" />
                          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed italic relative z-10">
                            "{approvedTestimonials[currentIndex].feedback}"
                          </p>
                        </div>

                        <div className="flex items-center gap-5 pt-8 border-t border-gray-50">
                          <div className="w-14 h-14 bg-[#0E4D92] rounded-full flex items-center justify-center text-white shadow-lg">
                            <User size={24} />
                          </div>
                          <div className="text-left">
                            <p className="text-lg font-bold text-[#1A1A1A]">{approvedTestimonials[currentIndex].customerName}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              {new Date(approvedTestimonials[currentIndex].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <button onClick={prevReview} className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#0E4D92] hover:border-[#0E4D92]/30 transition-all active:scale-90 shadow-md">
                            <ChevronLeft size={24} />
                          </button>
                          <button onClick={nextReview} className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#0E4D92] hover:border-[#0E4D92]/30 transition-all active:scale-90 shadow-md">
                            <ChevronRight size={24} />
                          </button>
                        </div>
                        <div className="text-[#1A1A1A] font-black text-3xl tracking-tighter">
                          <span className="text-[#0E4D92]">{String(currentIndex + 1).padStart(2, '0')}</span>
                          <span className="text-gray-200 mx-2">/</span>
                          <span className="text-gray-300">{String(approvedTestimonials.length).padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 h-[400px] rounded-[2.5rem] border border-dashed border-gray-200 flex items-center justify-center text-gray-300 italic">
                      No approved reviews yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Image Space + Review Form */}
              <div className="space-y-12">
                {/* Featured Image Space */}
                <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl group">
                  <img 
                    src={settings.testimonialSectionImage} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt="Travel Memories"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                    <div className="text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-blue-300">Making Memories</p>
                      <h4 className="text-2xl font-bold font-serif">Every journey tells a story.</h4>
                    </div>
                  </div>
                </div>

                {/* Submit Review Form Card */}
                <div className="bg-brand-sky border border-[#0E4D92]/10 rounded-[3rem] p-10 md:p-12 shadow-xl animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold font-serif mb-3">Share Your Story</h3>
                    <p className="text-sm text-gray-500 font-light">Your feedback helps us create better journeys for everyone.</p>
                  </div>
                  
                  {reviewSubmitted ? (
                    <div className="text-center py-12 animate-in fade-in zoom-in">
                      <div className="w-20 h-20 bg-blue-100 text-[#0E4D92] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle size={40} />
                      </div>
                      <h4 className="text-2xl font-bold mb-3">Thank you for your review!</h4>
                      <p className="text-gray-500">It has been sent to our team for moderation and will appear soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                          <input 
                            required
                            className="w-full bg-white border border-gray-100 focus:border-[#0E4D92] px-6 py-4 rounded-2xl outline-none transition-all text-sm shadow-sm"
                            placeholder="e.g. Michael Thorne"
                            value={reviewForm.name}
                            onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Star Rating</label>
                          <div className="relative">
                            <select 
                              className="w-full bg-white border border-gray-100 focus:border-[#0E4D92] px-6 py-4 rounded-2xl outline-none transition-all text-sm font-bold appearance-none shadow-sm"
                              value={reviewForm.rating}
                              onChange={e => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                            >
                              <option value="5">5 Stars (Excellent)</option>
                              <option value="4">4 Stars (Good)</option>
                              <option value="3">3 Stars (Average)</option>
                              <option value="2">2 Stars (Poor)</option>
                              <option value="1">1 Star (Terrible)</option>
                            </select>
                            <ChevronRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-300 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Your Experience</label>
                        <textarea 
                          required
                          rows={4}
                          className="w-full bg-white border border-gray-100 focus:border-[#0E4D92] px-6 py-4 rounded-2xl outline-none transition-all text-sm resize-none shadow-sm"
                          placeholder="Tell us about your trip with AVIYOURA..."
                          value={reviewForm.feedback}
                          onChange={e => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                        ></textarea>
                      </div>
                      <button type="submit" className="w-full bg-[#0E4D92] text-white py-5 rounded-2xl font-bold hover:bg-[#0A3B6F] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#0E4D92]/20 text-lg active:scale-[0.98]">
                        <Send size={20} /> Submit Review for Approval
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Inquiry CTA */}
      {settings.showCtaSection && (
        <section className="py-32 bg-[#0A2A4E] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="text-white">
                <h2 className="text-4xl md:text-6xl font-bold font-serif mb-10 leading-tight">Your world tour starts here.</h2>
                <p className="text-lg text-gray-300 mb-12 font-light">Join the thousands who have chosen AVIYOURA for their lifetime memories.</p>
                <div className="grid grid-cols-2 gap-8">
                  <div><h4 className="text-[#FF7A00] font-bold text-4xl mb-2 font-serif">24/7</h4><p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Support Desk</p></div>
                  <div><h4 className="text-[#FF7A00] font-bold text-4xl mb-2 font-serif">100%</h4><p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Safe Travels</p></div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-white/5 rounded-[40px] blur-2xl"></div>
                <InquiryForm subject="Premier Vacation Consultation" className="relative z-10 !bg-white/95 !backdrop-blur-sm p-12 rounded-[2.5rem] shadow-2xl" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
