
import React from 'react';
import { Lock } from 'lucide-react';
import { useApp } from '../store';

const PrivacyPolicy: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
              <Lock size={32} />
            </div>
            <h1 className="text-4xl font-bold font-serif text-[#1A1A1A]">Privacy Policy</h1>
          </div>
          
          <div className="prose prose-emerald max-w-none text-gray-600 whitespace-pre-wrap leading-relaxed">
            {settings.privacyPolicy || 'Privacy Policy content will appear here.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
