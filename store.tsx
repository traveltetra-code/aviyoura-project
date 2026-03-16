
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour, VisaService, Inquiry, SiteSettings, Testimonial, JobOpening, JobApplication } from './types';
import { INITIAL_TOURS, INITIAL_VISAS } from './data';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  addDoc,
  query,
  orderBy
} from 'firebase/firestore';

interface AppContextType {
  tours: Tour[];
  visas: VisaService[];
  inquiries: Inquiry[];
  testimonials: Testimonial[];
  jobs: JobOpening[];
  applications: JobApplication[];
  settings: SiteSettings;
  user: User | null;
  isAdmin: boolean;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  updateTour: (tour: Tour) => void;
  deleteTour: (id: string) => void;
  addTour: (tour: Tour) => void;
  updateVisa: (visa: VisaService) => void;
  deleteVisa: (id: string) => void;
  addVisa: (visa: VisaService) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'status'>) => void;
  updateTestimonialStatus: (id: string, status: Testimonial['status']) => void;
  deleteTestimonial: (id: string) => void;
  updateSettings: (settings: SiteSettings) => void;
  // Careers
  addJob: (job: JobOpening) => void;
  updateJob: (job: JobOpening) => void;
  deleteJob: (id: string) => void;
  addApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  deleteApplication: (id: string) => void;
  isAuthReady: boolean;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: 'info@aviyoura.com',
  contactPhone: '+91 98765 43210',
  address: 'Suite 405, Travel Plaza, Marine Drive, Mumbai, India',
  heroBadge: 'Welcome to AVIYOURA',
  heroTitle: 'Travel the World With Confidence.',
  heroSubtitle: 'Premium, tailor-made travel experiences and expert visa services for the discerning traveler. Discover hidden gems and popular destinations with AVIYOURA.',
  heroBannerImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000',
  domesticListingBanner: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1600',
  internationalListingBanner: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1600',
  heroPrimaryBtnText: 'Explore Destinations',
  heroPrimaryBtnLink: '/tours/international',
  heroSecondaryBtnText: 'Visa Assistance',
  heroSecondaryBtnLink: '/visa-services',
  statsValue: '12,500+',
  statsLabel: 'Verified Explorers',
  showStatsCard: true,
  featuredToursHeading: 'Our Featured Journeys',
  featuredToursSubheading: 'Handpicked Selections',
  testimonialsHeading: 'What Our Customers Say',
  testimonialsSubheading: 'Real Experiences',
  testimonialSectionImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
  showFeaturedTours: true,
  showTestimonials: true,
  showCtaSection: true,
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  twitterUrl: 'https://twitter.com',
  termsOfService: 'By accessing and using the services of AVIYOURA, you agree to be bound by these Terms of Service. All bookings are subject to availability. Cancellations must be made in writing. AVIYOURA acts as an agent for various travel providers.',
  privacyPolicy: 'We collect personal information such as your name, email address, and phone number when you make a booking. Your information is used to process bookings and provide visa assistance. We implement industry-standard security measures to protect your data.'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [visas, setVisas] = useState<VisaService[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Auth state listener
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Check if admin
        const adminEmail = "traveltetra@gmail.com";
        if (firebaseUser.email === adminEmail && firebaseUser.emailVerified) {
          setIsAdmin(true);
        } else {
          // Check users collection for role
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } catch (e) {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setIsAuthReady(true);
    });

    return () => unsubAuth();
  }, []);

  // Real-time listeners
  useEffect(() => {
    if (!isAuthReady) return;

    let loadedCount = 0;
    // Public collections: tours, visas, testimonials, jobs, settings
    const publicCollections = 5;
    // Admin collections: inquiries, applications
    const adminCollections = isAdmin ? 2 : 0;
    const totalToLoad = publicCollections + adminCollections;

    const checkLoading = () => {
      loadedCount++;
      if (loadedCount >= totalToLoad) {
        setLoading(false);
      }
    };

    const unsubTours = onSnapshot(collection(db, 'tours'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Tour));
      if (data.length === 0 && snapshot.metadata.fromCache === false && isAdmin) {
        // Seed if empty (one-time)
        INITIAL_TOURS.forEach(t => setDoc(doc(db, 'tours', t.id), t));
      }
      setTours(data);
      checkLoading();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'tours');
      checkLoading();
    });

    const unsubVisas = onSnapshot(collection(db, 'visas'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as VisaService));
      if (data.length === 0 && snapshot.metadata.fromCache === false && isAdmin) {
        INITIAL_VISAS.forEach(v => setDoc(doc(db, 'visas', v.id), v));
      }
      setVisas(data);
      checkLoading();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'visas');
      checkLoading();
    });

    const unsubTestimonials = onSnapshot(query(collection(db, 'testimonials'), orderBy('createdAt', 'desc')), (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Testimonial)));
      checkLoading();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'testimonials');
      checkLoading();
    });

    const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      setJobs(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as JobOpening)));
      checkLoading();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'jobs');
      checkLoading();
    });

    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.data() as SiteSettings);
      } else if (isAdmin) {
        // Initialize settings if they don't exist
        setDoc(doc(db, 'settings', 'global'), DEFAULT_SETTINGS);
      }
      checkLoading();
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'settings/global');
      checkLoading();
    });

    // Admin Listeners
    let unsubInquiries = () => {};
    let unsubApps = () => {};

    if (isAdmin) {
      unsubInquiries = onSnapshot(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')), (snapshot) => {
        setInquiries(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Inquiry)));
        checkLoading();
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'inquiries');
        checkLoading();
      });

      unsubApps = onSnapshot(query(collection(db, 'applications'), orderBy('createdAt', 'desc')), (snapshot) => {
        setApplications(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as JobApplication)));
        checkLoading();
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'applications');
        checkLoading();
      });
    } else {
      setInquiries([]);
      setApplications([]);
    }

    return () => {
      unsubTours();
      unsubVisas();
      unsubTestimonials();
      unsubJobs();
      unsubSettings();
      unsubInquiries();
      unsubApps();
    };
  }, [isAuthReady, isAdmin]);

  const addInquiry = async (newInquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const path = 'inquiries';
    try {
      const inquiryData = {
        ...newInquiry,
        createdAt: new Date().toISOString(),
        status: 'new'
      };
      await addDoc(collection(db, path), inquiryData);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    const path = `inquiries/${id}`;
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const deleteInquiry = async (id: string) => {
    const path = `inquiries/${id}`;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const addTour = async (tour: Tour) => {
    const path = `tours/${tour.id}`;
    try {
      await setDoc(doc(db, 'tours', tour.id), tour);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const updateTour = async (tour: Tour) => {
    const path = `tours/${tour.id}`;
    try {
      await setDoc(doc(db, 'tours', tour.id), tour);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const deleteTour = async (id: string) => {
    const path = `tours/${id}`;
    try {
      await deleteDoc(doc(db, 'tours', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const addVisa = async (visa: VisaService) => {
    const path = `visas/${visa.id}`;
    try {
      await setDoc(doc(db, 'visas', visa.id), visa);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const updateVisa = async (visa: VisaService) => {
    const path = `visas/${visa.id}`;
    try {
      await setDoc(doc(db, 'visas', visa.id), visa);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const deleteVisa = async (id: string) => {
    const path = `visas/${id}`;
    try {
      await deleteDoc(doc(db, 'visas', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const addTestimonial = async (data: Omit<Testimonial, 'id' | 'createdAt' | 'status'>) => {
    const path = 'testimonials';
    try {
      const testimonialData = {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, path), testimonialData);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const updateTestimonialStatus = async (id: string, status: Testimonial['status']) => {
    const path = `testimonials/${id}`;
    try {
      await updateDoc(doc(db, 'testimonials', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const deleteTestimonial = async (id: string) => {
    const path = `testimonials/${id}`;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const addJob = async (job: JobOpening) => {
    const path = `jobs/${job.id}`;
    try {
      await setDoc(doc(db, 'jobs', job.id), job);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const updateJob = async (job: JobOpening) => {
    const path = `jobs/${job.id}`;
    try {
      await setDoc(doc(db, 'jobs', job.id), job);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const deleteJob = async (id: string) => {
    const path = `jobs/${id}`;
    try {
      await deleteDoc(doc(db, 'jobs', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const addApplication = async (data: Omit<JobApplication, 'id' | 'createdAt' | 'status'>) => {
    const path = 'applications';
    try {
      const appData = {
        ...data,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, path), appData);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const updateApplicationStatus = async (id: string, status: JobApplication['status']) => {
    const path = `applications/${id}`;
    try {
      await updateDoc(doc(db, 'applications', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const deleteApplication = async (id: string) => {
    const path = `applications/${id}`;
    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    const path = 'settings/global';
    try {
      await setDoc(doc(db, 'settings', 'global'), newSettings);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  return (
    <AppContext.Provider value={{ 
      tours, visas, inquiries, settings, testimonials, jobs, applications,
      user, isAdmin,
      addInquiry, updateInquiryStatus, deleteInquiry,
      updateTour, deleteTour, addTour,
      updateVisa, deleteVisa, addVisa,
      addTestimonial, updateTestimonialStatus, deleteTestimonial,
      addJob, updateJob, deleteJob,
      addApplication, updateApplicationStatus, deleteApplication,
      updateSettings,
      isAuthReady,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
