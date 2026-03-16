
import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I book a tour with AVIYOURA?",
      answer: "You can book by filling out the inquiry form on our website, calling our office, or visiting us in person. Our travel consultants will guide you through the process."
    },
    {
      question: "What documents are required for visa assistance?",
      answer: "Requirements vary by country. Generally, you'll need a valid passport, photographs, bank statements, and proof of travel. We provide a detailed checklist for each country."
    },
    {
      question: "Can I customize an existing tour package?",
      answer: "Absolutely! We specialize in tailor-made experiences. You can modify any of our existing itineraries or create a completely new one from scratch."
    },
    {
      question: "What is your refund policy for cancellations?",
      answer: "Refunds depend on the timing of the cancellation and the policies of our service providers. We provide a clear cancellation schedule at the time of booking."
    },
    {
      question: "Do you provide travel insurance?",
      answer: "Yes, we highly recommend travel insurance and can assist you in selecting and purchasing a comprehensive plan for your journey."
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-orange-50 p-4 rounded-2xl text-[#FF7A00]">
              <HelpCircle size={32} />
            </div>
            <h1 className="text-4xl font-bold font-serif text-[#1A1A1A]">Frequently Asked Questions</h1>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 open:bg-white open:shadow-md">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-bold text-[#1A1A1A]">{faq.question}</span>
                  <ChevronDown size={20} className="text-gray-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
