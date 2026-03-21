import { useState, useEffect, useRef } from "react";
import { useTheme } from '../context/ThemeContext'

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const { isDarkMode } = useTheme()

  const faqs = [
    {
      question: "How can I book a room?",
      answer: "Simply browse our properties, select your dates and room type, then proceed to checkout. You can book online through our website with instant confirmation."
    },
    {
      question: "Do the rooms have AC?",
      answer: "Yes, all our rooms are equipped with air conditioning to ensure your comfort throughout your stay."
    },
    {
      question: "Is there sufficient parking available?",
      answer: "Yes, we provide free parking on premises for all our guests. Parking is available on a first-come, first-served basis."
    },
    {
      question: "What is the check-in and check-out time?",
      answer: "Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be available upon request."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking through the link sent to your email. Cancellation policies vary by property and booking type."
    },
    {
      question: "Are pets allowed?",
      answer: "Pet policies vary by property. Please check the specific property details or contact us directly for pet-friendly accommodations."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="py-16 px-8 text-white max-md:py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-white m-0 mb-12 max-md:mb-8 text-left"
          style={{
            fontFamily: "Petrona",
            fontWeight: 400,
            fontSize: window.innerWidth < 768 ? '36px' : '48px',
            lineHeight: "150%",
            letterSpacing: "-2.2%",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {faqs.slice(0, 3).map((faq, index) => (
              <div key={index} className="border-b border-white/20 pb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer py-2"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-base font-normal pr-4">
                    {faq.question}
                  </span>
                  <span 
                    className={`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/80 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {faqs.slice(3, 6).map((faq, index) => (
              <div key={index + 3} className="border-b border-white/20 pb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer py-2"
                  onClick={() => toggleFAQ(index + 3)}
                >
                  <span className="text-base font-normal pr-4">
                    {faq.question}
                  </span>
                  <span 
                    className={`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index + 3 ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index + 3 ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/80 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View more FAQs link */}
        <div className="text-right mt-8">
          <a
            href="#"
            className="text-white/80 text-sm hover:text-white transition-colors underline"
          >
            View more FAQs
          </a>
        </div>

        {/* Footer section */}
        <div className="mt-16 pt-8 md:mt-10">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Three Column Layout */}
            <div className="flex justify-between items-start mb-16">
              {/* Column 1: Logo, Social Icons, and Payment Methods - Left Aligned */}
              <div className="flex-shrink-0 md:-mt-11">
                <div className="md:-ml-10 mb-6">
                  <img
                    src="/hodo-white-logo.png"
                    alt="Hodo Logo"
                    className="h-32 w-auto object-contain"
                  />
                </div>
                <div className="flex gap-3 mb-6 -mt-5">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-bold">in</span>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="text-white text-sm">@</span>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-bold">f</span>
                  </div>
                </div>
                
                {/* Payment Methods with Hover Effect */}
                <div>
                  <div className="text-white/70 text-xs mb-2">We accept</div>
                  <div className="flex gap-2 items-center">
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                        <img 
                          src="/pay1.svg" 
                          alt="American Express"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[10px] font-medium">Amex</span>
                      </div>
                    </div>
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                        <img 
                          src="/pay2.svg" 
                          alt="Google Pay"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[10px] font-medium">Google Pay</span>
                      </div>
                    </div>
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                        <img 
                          src="/pay3.svg" 
                          alt="Mastercard"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[10px] font-medium">Mastercard</span>
                      </div>
                    </div>
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                        <img 
                          src="/pay4.svg" 
                          alt="Visa"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[10px] font-medium">Visa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Quick Links - Left Aligned */}
              <div className="flex-shrink-0 text-left">
                <h3 className="text-white font-semibold text-base mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <div className="text-white text-sm">Business and Groups</div>
                  <div className="text-white/80 text-sm">Blogs</div>
                  <div className="text-white/80 text-sm">Careers</div>
                </div>
              </div>

              {/* Column 3: Contact Details - Left Aligned */}
              <div className="flex-shrink-0 text-left">
                <h3 className="text-white font-semibold text-base mb-3">Contact</h3>
                <div className="space-y-2 mb-4">
                  <div className="text-white/80 text-sm">hello@hodostays.com</div>
                  <div className="text-white/80 text-sm">+91-8046395093</div>
                </div>
                
                <a 
                  href="/contact" 
                  className="text-sm font-semibold hover:underline transition-colors duration-300 inline-block"
                  style={{ color: '#DE754B' }}
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Redefining Stays Text - Full Width */}
            <div className="relative -mx-8 md:-mb-1 mb-8 overflow-hidden">
              <div 
                className="leading-none font-extrabold tracking-tighter pointer-events-none select-none w-full whitespace-nowrap"
                style={{ 
                  fontSize: 'clamp(2rem, 8vw, 6rem)', 
                  background: isDarkMode 
                    ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1), transparent)'
                    : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), transparent)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  fontFamily: 'Petrona',
                  letterSpacing: '-0.03em',
                  width: '100vw',
                  textAlign: 'center',
                  position: 'relative',
                  left: '50%',
                  marginLeft: '-50vw'
                }}
              >
                Redefining Stays, beyond Hotels
              </div>
            </div>

            {/* Horizontal Line */}
            <div className="border-t border-white/20 mb-4"></div>

            {/* Copyright and Policy Links - Desktop: Left/Right, Mobile keeps existing */}
            <div className="flex justify-between items-center">
              <div className="text-white/70 text-sm">
                © 2026 Hodo Stays. All rights reserved.
              </div>
              <div className="flex gap-6">
                <a href="/privacy-policy" className="text-white/70 text-sm hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms-of-service" className="text-white/70 text-sm hover:text-white transition-colors">
                  Terms & Conditions
                </a>
                <a href="/refund-policy" className="text-white/70 text-sm hover:text-white transition-colors">
                  Refund Policy
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Two Column Layout */}
            <div className="flex justify-between items-start gap-6 mb-6">
              {/* Left Column: Logo → Quick Links → We Accept */}
              <div className="flex-shrink-0">
                {/* Logo */}
                <div className="mb-4">    
                  <img
                    src="/hodo-white-logo.png"
                    alt="Hodo Logo"
                    className="h-32 w-auto object-contain -ml-9 -mt-13"
                  />
                </div>

                {/* Quick Links */}
                <div className="mb-4 -mt-8">
                  <h3 className="text-white font-semibold text-sm mb-2">Quick Links</h3>
                  <div className="space-y-1.5">
                    <div className="text-white text-xs">Business and Groups</div>
                    <div className="text-white/80 text-xs">Blogs</div>
                    <div className="text-white/80 text-xs">Careers</div>
                  </div>
                </div>
                
                {/* Payment Methods with Hover Effect */}
                <div>
                  <div className="text-white/70 text-xs mb-2">We accept</div>
                  <div className="flex gap-1.5 items-center">
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                        <img 
                          src="/pay1.svg" 
                          alt="American Express"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[9px] font-medium">Amex</span>
                      </div>
                    </div>
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                        <img 
                          src="/pay2.svg" 
                          alt="Google Pay"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[9px] font-medium">Google Pay</span>
                      </div>
                    </div>
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                        <img 
                          src="/pay3.svg" 
                          alt="Mastercard"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[9px] font-medium">Mastercard</span>
                      </div>
                    </div>
                    <div className="group/card relative">
                      <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                        <img 
                          src="/pay4.svg" 
                          alt="Visa"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-white/80 text-[9px] font-medium">Visa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Social Icons → Contact Us */}
              <div className="flex-shrink-0 text-left">
                {/* Social Icons */}
                <div className="flex gap-2 mb-6">
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="text-white text-xs">@</span>
                  </div>
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="mt-8">
                  <h3 className="text-white font-semibold text-sm mb-2">Contact</h3>
                  <div className="space-y-1.5 mb-3">
                    <div className="text-white/80 text-xs">hello@hodostays.com</div>
                    <div className="text-white/80 text-xs">+91-8046395093</div>
                  </div>
                  
                  <a 
                    href="/contact" 
                    className="text-xs font-semibold hover:underline transition-colors duration-300 inline-block"
                    style={{ color: '#DE754B' }}
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>

            {/* HodoStays Text - Full Width */}
            <div className="-mx-4 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8 overflow-hidden">
              <div 
                className="leading-none font-extrabold tracking-tighter pointer-events-none select-none w-full whitespace-nowrap uppercase"
                style={{ 
                  fontSize: 'clamp(4.1rem, 9vw, 8rem)', 
                  background: isDarkMode 
                    ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1), transparent)'
                    : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), transparent)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  fontFamily: 'Petrona',
                  letterSpacing: '-0.02em',
                  width: '100vw',
                  textAlign: 'center'
                }}
              >
                HodoStays
              </div>
              <div className="border-t border-white/30 pt-3 mt-3 px-4">
                <div className="flex justify-between items-center w-full">
                  <a href="/terms-of-service" className="text-white/70 text-xs hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                  <a href="/privacy-policy" className="text-white/70 text-xs hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/refund-policy" className="text-white/70 text-xs hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { isDarkMode } = useTheme();
  const [pausedRow, setPausedRow] = useState(null); // Track which row is paused

  const reviewsRow1 = [
    {
      id: 1,
      name: "Anandita",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "The place is awesome! The staff is extremely sweet and helpful. Definitely recommend it for longer stays instead of hotels.",
      date: "March 2026",
      source: "Airbnb"
    },
    {
      id: 2,
      name: "Saharsh",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Felt right at home. Very easy to access, no obstacles whatsoever. Was in Bengaluru for work trip, very apt stay. Surprised by the welcome drink. Couldn't have asked more.",
      date: "March 2026",
      source: "Airbnb"
    },
    {
      id: 3,
      name: "Ruth",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Exceptional stay! This booking.com exceeded our expectations in every way. The rooms were spacious, modern, and immaculately clean. The bed was incredibly comfortable, and the amenities were top-notch.",
      date: "March 2025",
      source: "Booking.com"
    },
    {
      id: 4,
      name: "Zothankima",
      rating: 5,
      country: "United Kingdom",
      countryCode: "GB",
      text: "Very clean and well looked after. Clean apartment and well equipped. Really enjoyed our stay.",
      date: "February 2026",
      source: "Airbnb"
    },
    {
      id: 5,
      name: "Jonathan",
      rating: 5,
      country: "United States",
      countryCode: "US",
      text: "I enjoyed my stay at Hodo Stay's. My apartment was new and clean, and the Hodo team was helpful during my stay.",
      date: "January 2026",
      source: "Airbnb"
    },
    {
      id: 6,
      name: "Madhurima",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Our stay at Hodo was so great! Very clean and spacious rooms. They had room service which was great. Very proactive with communication.",
      date: "January 2026",
      source: "Airbnb"
    },
    {
      id: 7,
      name: "Suresh",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Booked it for my collegues here, great response, great stay. No complaints. Good price for a city like bangalore.",
      date: "December 2025",
      source: "Airbnb"
    },
    {
      id: 8,
      name: "Sid",
      rating: 5,
      country: "United States",
      countryCode: "US",
      text: "Was the perfect place for our week long work trip. The flat is well maintained and the staff is extremely courteous/helpful. Will stay again in future.",
      date: "December 2025",
      source: "Airbnb"
    },
    {
      id: 9,
      name: "Navaneet",
      rating: 5,
      country: "United States",
      countryCode: "US",
      text: "Hodo has become my usual place in Bangalore to stay! Great location, apartments, staff, and covered parking!",
      date: "June 2025",
      source: "Airbnb"
    },
    {
      id: 10,
      name: "Khadeer",
      rating: 5,
      country: "Germany",
      countryCode: "DE",
      text: "Perfect place for family and friends. Nothing less than home. Spacious rooms, neat and tidy bathrooms, well structured kitchen dining living room combo. Must recommended stays to opt for short or long stays who needs peace.",
      date: "May 2025",
      source: "Airbnb"
    },
  ];

  const reviewsRow2 = [
    {
      id: 11,
      name: "Lamha",
      rating: 5,
      country: "Maldives",
      countryCode: "MV",
      text: "Our experience at Hodo Stays was amazing. The host was really helpful and accommodating as well. Highly recommend this stay for anyone staying in Bangalore!",
      date: "May 2025",
      source: "Airbnb"
    },
    {
      id: 12,
      name: "Besly",
      rating: 5,
      country: "United Kingdom",
      countryCode: "GB",
      text: "Stayed at Hodo Apartments for 2 weeks and it was a very pleasant stay. Staff were friendly and helpful. Good price point. Had good amenities. Would recommend 👍🏽",
      date: "April 2025",
      source: "Airbnb"
    },
    {
      id: 13,
      name: "Sravya",
      rating: 5,
      country: "United Arab Emirates",
      countryCode: "AE",
      text: "Honestly, I'd come here again for the people- super cooperative and helpful staff. The place is really good, as described and as per pictures.",
      date: "April 2025",
      source: "Airbnb"
    },
    {
      id: 14,
      name: "Abhishek",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "It's was very convenient stay, you should use this especially if you are on a business trip. Absolutely convenience.",
      date: "April 2025",
      source: "Airbnb"
    },
    {
      id: 15,
      name: "Bhumika D",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "The best stay i have booked. The service is topnotch. The receptionist and service people are so polite.",
      date: "March 2026",
      source: "Google"
    },
    {
      id: 16,
      name: "Priyanka Cholera",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Hodo = Good stay and memories. No matter how many days you stay at hodo, it never feels like hotel or service apartment. Asif bhai and the entire staff is extremely accomodating and so grateful for their care and attentiveness.",
      date: "February 2026",
      source: "Google"
    },
    {
      id: 17,
      name: "Danan Christadoss",
      rating: 5,
      country: "Indonesia",
      countryCode: "ID",
      text: "This is the 2nd time we have stayed here during our visit to India and the team here continues to amaze us. Wonderful hospitality! Great service! Top notch attitude!",
      date: "January 2026",
      source: "Google"
    },
    {
      id: 18,
      name: "Devesh Jhunjhunwala",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "We stayed for 3 weeks, it was very comfortable. The team is extremely prompt with service requests and house-keeping and cleanliness was great. Location is also great with nice cafes within walking distance.",
      date: "February 2026",
      source: "Google"
    },
  ];


  return (
    <div>
      {/* Combined Reviews + FAQ Section with Single Gradient */}
      <div
        className="transition-all duration-300"
        style={{
          background: isDarkMode
            ? "linear-gradient(180deg, #000000 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #000000 100%)"
            : "linear-gradient(180deg, #FFF7F0 0%, #506C60 50%, #2D3A36 75%, #000000 100%)",
        }}
      >
        {/* Reviews Section - Two Row Infinite Carousel */}
        <div className="py-16 px-8 text-gray-800 relative max-md:py-8 max-md:px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-8">
              <p 
                className="mb-2 text-sm md:text-base font-medium tracking-wider uppercase"
                style={{ 
                  color: isDarkMode ? '#DE754B' : '#0B8043',
                  fontFamily: 'Work Sans'
                }}
              >
                Guest Experiences
              </p>
              <h2
                className={`m-0 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                style={{
                  fontFamily: "Petrona",
                  fontWeight: 400,
                  fontSize: window.innerWidth < 768 ? '36px' : '48px',
                  lineHeight: "150%",
                  letterSpacing: "-2.2%",
                }}
              >
                What our Guests say
              </h2>
            </div>

            {/* CSS for infinite scroll animation */}
            <style>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              @keyframes scroll-right {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0);
                }
              }
              
              .animate-scroll-left {
                animation: scroll-left 40s linear infinite;
              }
              
              .animate-scroll-right {
                animation: scroll-right 40s linear infinite;
              }
              
              .pause-animation {
                animation-play-state: paused;
              }
            `}</style>

            {/* First Row - Scrolling Left to Right */}
            <div className="mb-6 overflow-hidden">
              <div 
                className={`flex gap-6 md:gap-6 gap-4 animate-scroll-left ${pausedRow === 1 ? 'pause-animation' : ''}`}
                style={{ width: 'max-content' }}
                onMouseEnter={() => setPausedRow(1)}
                onMouseLeave={() => setPausedRow(null)}
              >
                {/* Duplicate reviews for seamless loop */}
                {[...reviewsRow1, ...reviewsRow1].map((review, index) => (
                  <div 
                    key={`row1-${review.id}-${index}`}
                    className="group rounded-2xl p-5 md:p-5 p-4 flex-shrink-0 transition-all duration-300 hover:cursor-pointer"
                    style={{ 
                      width: window.innerWidth < 768 ? '280px' : '450px',
                      height: window.innerWidth < 768 ? 'auto' : '180px',
                      minHeight: window.innerWidth < 768 ? '220px' : '180px',
                      background: isDarkMode 
                        ? 'radial-gradient(circle at top left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)' 
                        : '#F6F0E7',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                      border: '1px solid transparent'
                    }}
                    onClick={() => setPausedRow(pausedRow === 1 ? null : 1)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#DE754B'
                      e.currentTarget.style.boxShadow = '0 12px 44px -22px rgba(222, 117, 75, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl font-bold" 
                          style={{ 
                            backgroundColor: '#4A5568',
                            fontFamily: 'Petrona'
                          }}
                        >
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div 
                            className={`font-semibold text-base mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'Petrona' }}
                          >
                            {review.name}
                          </div>
                          <div 
                            className={`flex items-center gap-2 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            style={{ fontFamily: 'Work Sans' }}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${review.countryCode.toLowerCase()}.png`}
                              alt={review.country}
                              className="w-4 h-3"
                            />
                            <span>{review.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="text-orange-500 text-sm flex">
                          {"★".repeat(review.rating)}
                        </div>
                        <span 
                          className={`mt-[3px] font-semibold text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          style={{ fontFamily: 'Work Sans' }}
                        >
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p 
                      className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}
                      style={{ 
                        fontFamily: 'Work Sans',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {review.text}
                    </p>
                    <div 
                      className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
                      style={{ fontFamily: 'Work Sans' }}
                    >
                      {review.source} • {review.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Scrolling Right to Left */}
            <div className="overflow-hidden">
              <div 
                className={`flex gap-6 md:gap-6 gap-4 animate-scroll-right ${pausedRow === 2 ? 'pause-animation' : ''}`}
                style={{ width: 'max-content' }}
                onMouseEnter={() => setPausedRow(2)}
                onMouseLeave={() => setPausedRow(null)}
              >
                {/* Duplicate reviews for seamless loop */}
                {[...reviewsRow2, ...reviewsRow2].map((review, index) => (
                  <div 
                    key={`row2-${review.id}-${index}`}
                    className="group rounded-2xl p-5 md:p-5 p-4 flex-shrink-0 transition-all duration-300 hover:cursor-pointer"
                    style={{ 
                      width: window.innerWidth < 768 ? '280px' : '450px',
                      height: window.innerWidth < 768 ? 'auto' : '180px',
                      minHeight: window.innerWidth < 768 ? '220px' : '180px',
                      background: isDarkMode 
                        ? 'radial-gradient(circle at top left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)' 
                        : '#F6F0E7',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                      border: '1px solid transparent'
                    }}
                    onClick={() => setPausedRow(pausedRow === 2 ? null : 2)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#DE754B'
                      e.currentTarget.style.boxShadow = '0 12px 44px -22px rgba(222, 117, 75, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl font-bold" 
                          style={{ 
                            backgroundColor: '#4A5568',
                            fontFamily: 'Petrona'
                          }}
                        >
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div 
                            className={`font-semibold text-base mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'Petrona' }}
                          >
                            {review.name}
                          </div>
                          <div 
                            className={`flex items-center gap-2 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            style={{ fontFamily: 'Work Sans' }}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${review.countryCode.toLowerCase()}.png`}
                              alt={review.country}
                              className="w-4 h-3"
                            />
                            <span>{review.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="text-orange-500 text-sm flex">
                          {"★".repeat(review.rating)}
                        </div>
                        <span 
                          className={`mt-[3px] font-semibold text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          style={{ fontFamily: 'Work Sans' }}
                        >
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p 
                      className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}
                      style={{ 
                        fontFamily: 'Work Sans',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {review.text}
                    </p>
                    <div 
                      className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
                      style={{ fontFamily: 'Work Sans' }}
                    >
                      {review.source} • {review.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* FAQ and Footer Section - No separate background, continues the gradient */}
        <FAQSection />
      </div>
    </div>
  );
};

export default Footer;
