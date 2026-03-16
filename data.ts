
import { Tour, VisaService } from './types';

export const INITIAL_TOURS: Tour[] = [
  {
    id: 'hp-1',
    category: 'Domestic',
    destination: 'Himachal Pradesh',
    bannerImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    shortDescription: 'Explore the majestic Himalayas and beautiful valleys of Shimla, Manali, and Dharamshala.',
    highlights: ['3 Star Hotel Stay', 'Private Car Transfers', 'Daily Breakfast & Dinner', 'Local Sightseeing'],
    tourHighlights: ['Solang Valley Adventures', 'Shimla Ridge Walk', 'Spiti Valley Expedition', 'Paragliding in Bir Billing'],
    cost: '₹18,500',
    itinerary: [
      { day: 1, title: 'Arrival in Shimla', description: 'Arrive at Chandigarh airport/railway station and transfer to Shimla.' },
      { day: 2, title: 'Shimla Sightseeing', description: 'Explore the Ridge, Mall Road, and Kufri.' },
      { day: 3, title: 'Transfer to Manali', description: 'Scenic drive to Manali via Kullu Valley.' }
    ],
    duration: '6 Nights / 7 Days',
    bestTimeToVisit: 'March to June',
    gallery: [
      'https://images.unsplash.com/photo-1605649440417-063052674697?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&q=80&w=400'
    ],
    isActive: true
  },
  {
    id: 'swiss-1',
    category: 'International',
    destination: 'Switzerland',
    bannerImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200',
    shortDescription: 'Experience luxury, chocolates, and breathtaking Alpine views in Switzerland.',
    highlights: ['Swiss Travel Pass (8 Days)', 'Mountain Excursions Included', 'Luxury Hotel Stays', 'Expert Multilingual Guide'],
    tourHighlights: ['Mount Titlis Rotair', 'Lucerne Chapel Bridge', 'Interlaken Paragliding', 'Zermatt Matterhorn Views'],
    cost: '$2,450',
    itinerary: [
      { day: 1, title: 'Arrive in Zurich', description: 'Check-in at Zurich hotel and evening lake stroll.' },
      { day: 2, title: 'Lucerne & Mt. Titlis', description: 'Experience the world\'s first revolving cable car.' },
      { day: 3, title: 'Interlaken Adventure', description: 'Free day for paragliding or exploring Interlaken.' }
    ],
    duration: '8 Nights / 9 Days',
    bestTimeToVisit: 'June to August',
    gallery: [
      'https://images.unsplash.com/photo-1516448398574-8d27030d659d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1492107376256-4026437926cd?auto=format&fit=crop&q=80&w=400'
    ],
    isActive: true
  }
];

export const INITIAL_VISAS: VisaService[] = [
  {
    id: 'v1',
    type: 'Tourist Visa',
    country: 'Switzerland / Schengen',
    description: 'Get your Schengen visa for seamless travel across Europe.',
    requirements: ['Passport (6 months validity)', 'Bank Statements (3 months)', 'Photos', 'Flight & Hotel Bookings'],
    isActive: true
  }
];
