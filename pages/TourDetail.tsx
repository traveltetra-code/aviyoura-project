
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, MapPin, ChevronLeft, Image as ImageIcon, Wallet, ListChecks, Map, Star } from 'lucide-react';
import { useApp } from '../store';
import InquiryForm from '../components/InquiryForm';

const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tours } = useApp();
  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Tour not found.</h2>
        <button onClick={() => navigate(-1)} className="text-[#0E4D92] mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img src={tour.bannerImage} className="w-full h-full object-cover" alt={tour.destination} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <button 
              onClick={() => navigate(-1)}
              className="mb-8 flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} /> Back to Tours
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="bg-[#0E4D92] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                  {tour.category} Destination
                </span>
                <h1 className="text-5xl md:text-7xl font-bold font-serif">{tour.destination}</h1>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 min-w-[140px]">
                  <p className="text-[10px] text-gray-300 uppercase font-bold mb-1">Duration</p>
                  <p className="font-bold flex items-center gap-2"><Clock size={16} className="text-[#FF7A00]" /> {tour.duration}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 min-w-[140px]">
                  <p className="text-[10px] text-gray-300 uppercase font-bold mb-1">Starting Price</p>
                  <p className="font-bold flex items-center gap-2 text-[#FF7A00]"><Wallet size={16} /> {tour.cost || 'On Request'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 min-w-[140px]">
                  <p className="text-[10px] text-gray-300 uppercase font-bold mb-1">Best Time</p>
                  <p className="font-bold flex items-center gap-2"><Calendar size={16} className="text-[#FF7A00]" /> {tour.bestTimeToVisit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 font-serif">About {tour.destination}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {tour.shortDescription}
              </p>
            </div>

            {/* Highlights Columns (What You Get vs Tour Highlights) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What You Get / Inclusions */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <ListChecks className="text-[#0E4D92]" size={28} />
                  <h2 className="text-2xl font-bold font-serif">What You Get</h2>
                </div>
                <div className="space-y-4">
                  {(tour.highlights || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-8 h-8 bg-[#0E4D92]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={18} className="text-[#0E4D92]" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Highlights / Attractions */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <Star className="text-orange-400" size={28} />
                  <h2 className="text-2xl font-bold font-serif">Highlights of Tour</h2>
                </div>
                <div className="space-y-4">
                  {(tour.tourHighlights || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-orange-50/50 rounded-2xl">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-orange-500" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                  {(!tour.tourHighlights || tour.tourHighlights.length === 0) && (
                    <p className="text-gray-400 italic text-sm">Tour highlights details are being updated.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Day Wide Itinerary */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-10">
                <Map className="text-[#0E4D92]" size={28} />
                <h2 className="text-2xl font-bold font-serif">Day Wide Itinerary</h2>
              </div>
              <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100 z-0"></div>
                
                {(tour.itinerary || []).map((item, idx) => (
                  <div key={idx} className="relative z-10 flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#0E4D92] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-[#0E4D92]/20">
                      {item.day}
                    </div>
                    <div className="pb-4">
                      <h3 className="text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
                {(!tour.itinerary || tour.itinerary.length === 0) && (
                  <p className="text-gray-400 italic">Itinerary details are coming soon. Contact us for the full plan.</p>
                )}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <ImageIcon className="text-[#0E4D92]" size={28} />
                <h2 className="text-2xl font-bold font-serif">Visual Journey</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(tour.gallery || []).map((img, idx) => (
                  <div key={idx} className="h-64 rounded-2xl overflow-hidden group">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={`Gallery ${idx}`} 
                    />
                  </div>
                ))}
                <div className="h-64 rounded-2xl bg-[#0E4D92]/5 border-2 border-dashed border-[#0E4D92]/20 flex flex-col items-center justify-center text-center p-6">
                  <p className="text-[#0E4D92] text-sm font-semibold">More memories await you!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <InquiryForm subject={`Inquiry for ${tour.destination}`} />
              
              <div className="mt-8 bg-[#0E4D92] text-white p-8 rounded-3xl shadow-xl">
                <h4 className="text-xl font-bold mb-4">Why AVIYOURA?</h4>
                <ul className="space-y-4 text-sm text-blue-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>No hidden costs, fully transparent process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>24/7 on-tour emergency support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Customizable itineraries to suit your taste</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
