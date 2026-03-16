
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Tag } from 'lucide-react';
import { useApp } from '../store';
import { TourCategory } from '../types';

const TourListing: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { tours, settings } = useApp();
  
  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Tour';
  const filteredTours = tours.filter(t => t.isActive && t.category.toLowerCase() === category?.toLowerCase());

  const bannerImage = category === 'domestic' 
    ? settings.domesticListingBanner 
    : settings.internationalListingBanner;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Banner */}
      <div className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={bannerImage} 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt={`${displayCategory} Banner`}
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{displayCategory} Tours</h1>
          <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-semibold text-[#FF7A00]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span>{displayCategory}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 flex flex-wrap items-center justify-between gap-4 border border-gray-100">
          <div>
            <span className="text-sm text-gray-400">Showing {filteredTours.length} destinations</span>
          </div>
          <div className="flex gap-4">
            <select className="bg-gray-50 border border-gray-200 text-sm px-4 py-2 rounded-lg outline-none focus:border-[#0E4D92]">
              <option>Sort By: Default</option>
              <option>Price: Low to High</option>
              <option>Duration: Shortest</option>
            </select>
          </div>
        </div>

        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 group hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={tour.bannerImage} 
                    alt={tour.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase text-[#0E4D92] shadow-sm">
                    {tour.duration}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-[#0E4D92]">
                      <div className="bg-[#0E4D92]/10 p-1 rounded-md">
                        <MapPin size={14} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-[0.15em]">{tour.destination}</span>
                    </div>
                    {tour.cost && (
                      <div className="flex items-center gap-1.5 text-[#0E4D92] bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50 shadow-sm">
                        <Tag size={12} className="shrink-0" />
                        <span className="text-xs font-black tracking-tight">{tour.cost}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[#333333] font-serif">{tour.destination}</h3>
                  <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed flex-1">
                    {tour.shortDescription}
                  </p>
                  <Link 
                    to={`/tour/${tour.id}`}
                    className="w-full inline-block bg-[#0E4D92] text-white text-center py-4 rounded-xl font-bold hover:bg-[#0A3B6F] transition-all shadow-lg hover:shadow-[#0E4D92]/20 active:scale-[0.98]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <h3 className="text-xl font-medium text-gray-400">No tours found in this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourListing;
