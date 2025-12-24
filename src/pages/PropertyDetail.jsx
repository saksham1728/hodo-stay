import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import FooterSimple from "../components/FooterSimple";
import HomeHeader from "../components/HomeHeader";
import DateRangePicker from "../components/DateRangePicker";

function PropertyDetail() {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [unitTypes, setUnitTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Search state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [pricingData, setPricingData] = useState({});
  const [searchError, setSearchError] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  const overviewRef = useRef(null);
  const aboutRef = useRef(null);
  const roomsRef = useRef(null);
  const accessibilityRef = useRef(null);
  const policiesRef = useRef(null);

  useEffect(() => {
    const fetchBuildingWithTypes = async () => {
      try {
        setLoading(true);
        const { buildingService } = await import('../api/buildings/buildingService');
        const response = await buildingService.getBuildingWithUnitTypes(id);
        
        if (response.success) {
          setBuilding(response.data.building);
          setUnitTypes(response.data.unitTypes);
        } else {
          setError('Building not found');
        }
      } catch (err) {
        console.error('Error fetching building:', err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchBuildingWithTypes();
    }
  }, [id]);

  // Auto-update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: overviewRef, name: 'overview' },
        { ref: aboutRef, name: 'about' },
        { ref: roomsRef, name: 'rooms' },
        { ref: accessibilityRef, name: 'accessibility' },
        { ref: policiesRef, name: 'policies' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const yOffset = -80;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handle search for available rooms with pricing
  const handleSearch = async () => {
    if (!checkIn || !checkOut || !guests) {
      setSearchError('Please fill in all fields');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setSearchError('Check-out date must be after check-in date');
      return;
    }

    setSearchLoading(true);
    setSearchError('');
    const newPricingData = {};

    try {
      const { buildingService } = await import('../api/buildings/buildingService');

      // Get pricing for each unit type
      for (const unitTypeData of unitTypes) {
        try {
          const response = await buildingService.getBestAvailableUnit({
            unitType: unitTypeData.unitType,
            buildingId: id,
            checkIn,
            checkOut,
            guests: parseInt(guests)
          });

          if (response.success) {
            newPricingData[unitTypeData.unitType] = {
              unit: response.data.unit,
              pricing: response.data.pricing,
              available: true
            };
          }
        } catch (err) {
          console.error(`Error getting pricing for ${unitTypeData.unitType}:`, err);
          newPricingData[unitTypeData.unitType] = {
            available: false,
            error: err.response?.data?.message || 'Not available'
          };
        }
      }

      setPricingData(newPricingData);
      setSearchPerformed(true);
      
      // Scroll to rooms section
      if (roomsRef.current) {
        setTimeout(() => scrollToSection(roomsRef), 300);
      }
    } catch (err) {
      console.error('Error searching:', err);
      setSearchError('Failed to search. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle date change from DateRangePicker
  const handleDateChange = (startDate, endDate) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  };

  // Format date for display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).format('MMM DD, YYYY');
  };

  // Get images for hero grid
  const getHeroImages = () => {
    if (!building || !building.images || building.images.length === 0) {
      return [
        '/property_1.png',
        '/property_2.jpg',
        '/property_3.png',
        '/property_4.jpg',
        '/property_5.jpg'
      ];
    }
    
    const images = building.images.map(img => img.url).filter(url => url);
    while (images.length < 5) {
      images.push(...images.slice(0, Math.min(images.length, 5 - images.length)));
    }
    return images.slice(0, 5);
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
        <HomeHeader />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
        </div>
        <FooterSimple />
      </div>
    );
  }

  if (error || !building) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
        <HomeHeader />
        <div className="text-center py-20 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "Unable to load property details"}</p>
          <Link 
            to="/properties" 
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block no-underline"
          >
            Back to Properties
          </Link>
        </div>
        <FooterSimple />
      </div>
    );
  }

  const heroImages = getHeroImages();
  const location = building.location?.city 
    ? `${building.location.address || ''}, ${building.location.city}, ${building.location.state || ''}, ${building.location.country || 'India'}`.replace(/,\s*,/g, ',').trim()
    : "Bangalore, Karnataka, India";

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
      <HomeHeader />
      
      {/* Hero Image Grid - EXACTLY 5 images */}
      <div className="px-8 max-md:px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 h-[400px] max-md:h-[300px]">
          {/* Left: 1 Large image (50% width) */}
          <div className="w-1/2 max-md:w-full">
            <img 
              src={heroImages[0]} 
              alt={building.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Right: 4 small images in 2x2 grid (50% width) */}
          <div className="w-1/2 flex flex-col gap-2 max-md:hidden">
            <div className="flex gap-2 h-1/2">
              <img 
                src={heroImages[1]} 
                alt={building.name}
                className="w-1/2 h-full object-cover rounded-lg"
              />
              <img 
                src={heroImages[2]} 
                alt={building.name}
                className="w-1/2 h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-2 h-1/2">
              <img 
                src={heroImages[3]} 
                alt={building.name}
                className="w-1/2 h-full object-cover rounded-lg"
              />
              <img 
                src={heroImages[4]} 
                alt={building.name}
                className="w-1/2 h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Navigation - Simple sticky */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-8 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex gap-8 max-md:gap-4 overflow-x-auto">
            {[
              { name: 'Overview', ref: overviewRef, id: 'overview' },
              { name: 'About', ref: aboutRef, id: 'about' },
              { name: 'Rooms', ref: roomsRef, id: 'rooms' },
              { name: 'Accessibility', ref: accessibilityRef, id: 'accessibility' },
              { name: 'Policies', ref: policiesRef, id: 'policies' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? 'border-blue-600 text-blue-600 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'Petrona', fontSize: '16px' }}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - Clean sections with NO overlapping */}
      <div className="px-8 max-md:px-4 py-8 max-md:py-6">
        <div className="max-w-7xl mx-auto">
        
        {/* Overview Section */}
        <section ref={overviewRef} className="mb-16">
          <h1 
            className="text-gray-900 mb-3 max-md:text-3xl"
            style={{ fontFamily: 'Petrona', fontSize: '48px', fontWeight: 600 }}
          >
            {building.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-700 text-white px-2 py-1 rounded font-bold text-sm">
              9.8
            </div>
            <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
              Exceptional
            </span>
          </div>
          
          <p 
            className="text-gray-600 mb-6"
            style={{ fontFamily: 'Petrona', fontSize: '16px' }}
          >
            {location}
          </p>
          
          {/* Amenities */}
          {building.amenities && building.amenities.length > 0 && (
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 mt-6">
              {building.amenities.slice(0, 6).map((amenity, index) => {
                const amenityName = typeof amenity === 'string' ? amenity : amenity.amenityID || '';
                return (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                      {amenityName}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="mb-16">
          <h2 
            className="text-gray-900 mb-6 max-md:text-2xl"
            style={{ fontFamily: 'Petrona', fontSize: '36px', fontWeight: 600 }}
          >
            About this property
          </h2>
          <p 
            className="text-gray-700"
            style={{ fontFamily: 'Petrona', fontSize: '16px', lineHeight: '160%' }}
          >
            {building.description || `Experience comfort and luxury at ${building.name}. Located in ${building.location?.city || 'Bangalore'}, this property offers modern amenities and exceptional service for both short and long stays.`}
          </p>
        </section>

        {/* Search Section - Before Rooms */}
        <section className="mb-12 relative">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-6" style={{ fontFamily: 'Petrona', fontSize: '24px', fontWeight: 600 }}>
              Check Availability & Pricing
            </h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Check-in Date */}
              <div className="flex-1">
                <label className="block text-gray-700 mb-2" style={{ fontFamily: 'Petrona', fontSize: '14px', fontWeight: 500 }}>
                  Check-in
                </label>
                <div
                  onClick={() => setIsDatePickerOpen(true)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500 bg-white flex items-center justify-between transition-colors"
                  style={{ fontFamily: 'Petrona' }}
                >
                  <span className={checkIn ? 'text-gray-900' : 'text-gray-400'}>
                    {checkIn ? formatDateDisplay(checkIn) : 'Select date'}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Check-out Date */}
              <div className="flex-1">
                <label className="block text-gray-700 mb-2" style={{ fontFamily: 'Petrona', fontSize: '14px', fontWeight: 500 }}>
                  Check-out
                </label>
                <div
                  onClick={() => setIsDatePickerOpen(true)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500 bg-white flex items-center justify-between transition-colors"
                  style={{ fontFamily: 'Petrona' }}
                >
                  <span className={checkOut ? 'text-gray-900' : 'text-gray-400'}>
                    {checkOut ? formatDateDisplay(checkOut) : 'Select date'}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Guests with +/- buttons */}
              <div className="w-full md:w-48">
                <label className="block text-gray-700 mb-2" style={{ fontFamily: 'Petrona', fontSize: '14px', fontWeight: 500 }}>
                  Guests
                </label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="px-4 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-colors"
                    style={{ fontFamily: 'Petrona' }}
                  >
                    −
                  </button>
                  <div className="flex-1 text-center py-4 font-medium" style={{ fontFamily: 'Petrona' }}>
                    {guests}
                  </div>
                  <button
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="px-4 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-colors"
                    style={{ fontFamily: 'Petrona' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={searchLoading || !checkIn || !checkOut || !guests}
                  className="w-full md:w-auto bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  style={{ fontFamily: 'Petrona', fontSize: '16px', fontWeight: 500 }}
                >
                  {searchLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            {searchError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800" style={{ fontFamily: 'Petrona', fontSize: '14px' }}>
                  {searchError}
                </p>
              </div>
            )}

            {/* Date Range Picker Dropdown */}
            <DateRangePicker
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              checkIn={checkIn}
              checkOut={checkOut}
              onDateChange={handleDateChange}
            />
          </div>
        </section>

        {/* Rooms Section */}
        <section ref={roomsRef} className="mb-16">
          <h2 
            className="text-gray-900 mb-6 max-md:text-2xl"
            style={{ fontFamily: 'Petrona', fontSize: '36px', fontWeight: 600 }}
          >
            Rooms
          </h2>
          <div className="space-y-6 max-md:space-y-4">
            {unitTypes.map((unitTypeData) => {
              const rep = unitTypeData.representativeUnit;
              const images = rep?.images?.length > 0 
                ? rep.images.map(img => img.url).filter(url => url)
                : ["/card-1.png"];

              // Get pricing data for this unit type
              const unitPricing = pricingData[unitTypeData.unitType];
              const hasPrice = unitPricing && unitPricing.available;
              const priceError = unitPricing && !unitPricing.available ? unitPricing.error : null;

              return (
                <div
                  key={unitTypeData.unitType}
                  className="bg-white rounded-2xl max-md:rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="w-full md:w-3/5 h-[200px] md:h-[450px]">
                      <img 
                        src={images[0]} 
                        alt={unitTypeData.unitType}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-2/5 p-3 md:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 md:mb-3">
                          <h3
                            className="text-black max-md:text-xl"
                            style={{
                              fontFamily: "Petrona",
                              fontWeight: 600,
                              fontSize: "30px",
                            }}
                          >
                            {unitTypeData.unitType}
                          </h3>

                          <div className="flex items-center gap-1 md:gap-2">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-green-600 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span
                              className="text-green-600 font-medium max-md:text-sm"
                              style={{ fontFamily: "Petrona", fontWeight: 600, fontSize: "18px" }}
                            >
                              4.5
                            </span>
                          </div>
                        </div>

                        <p
                          className="text-gray-600 mb-2 md:mb-4 max-md:text-xs"
                          style={{ fontFamily: "Petrona", fontSize: "14px" }}
                        >
                          {rep?.standardGuests || 2} guests • {rep?.compositionRooms?.length || 1} bedroom
                        </p>

                        <p
                          className="hidden md:block mb-6"
                          style={{
                            color: "#8B8B8B",
                            fontFamily: "Petrona",
                            fontSize: "18px",
                          }}
                        >
                          Comfortable, thoughtfully designed spaces for short & long stays.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 md:gap-4">
                        {/* Pricing Display */}
                        <div>
                          {hasPrice ? (
                            <>
                              <span
                                className="text-gray-500 block mb-1 max-md:text-xs"
                                style={{ fontFamily: "Petrona", fontSize: "12px" }}
                              >
                                Total for {unitPricing.pricing.nights} nights
                              </span>
                              <div className="flex items-baseline gap-1 md:gap-2">
                                <span
                                  className="max-md:text-xl"
                                  style={{
                                    color: "#4A4A4A",
                                    fontFamily: "Petrona",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                  }}
                                >
                                  $ {Math.round(unitPricing.pricing.price).toLocaleString()}
                                </span>
                                <span
                                  className="text-gray-500 max-md:text-xs"
                                  style={{ fontFamily: "Petrona", fontSize: "14px" }}
                                >
                                  ($ {Math.round(unitPricing.pricing.pricePerNight).toLocaleString()}/night)
                                </span>
                              </div>
                            </>
                          ) : priceError ? (
                            <div className="p-2 md:p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-red-800 text-xs md:text-sm" style={{ fontFamily: "Petrona" }}>
                                {priceError}
                              </p>
                            </div>
                          ) : (
                            <>
                              <span
                                className="text-gray-500 block mb-1 max-md:text-xs"
                                style={{ fontFamily: "Petrona", fontSize: "12px" }}
                              >
                                from
                              </span>
                              <div className="flex items-baseline">
                                <span
                                  className="max-md:text-xl"
                                  style={{
                                    color: "#4A4A4A",
                                    fontFamily: "Petrona",
                                    fontWeight: 600,
                                    fontSize: "30px",
                                  }}
                                >
                                  $ 70
                                </span>
                                <span
                                  className="text-gray-500 max-md:text-xs"
                                  style={{ fontFamily: "Petrona", fontSize: "12px", marginLeft: "2px" }}
                                >
                                  per night
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Book Now Button */}
                        {hasPrice ? (
                          <Link
                            to={`/booking-details/${unitPricing.unit._id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                            className="bg-orange-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-orange-600 no-underline font-medium text-center max-md:text-sm"
                            style={{ fontFamily: "Petrona", fontSize: "16px" }}
                          >
                            Book now
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-400 text-white px-6 md:px-8 py-2 md:py-3 rounded-full cursor-not-allowed font-medium max-md:text-sm"
                            style={{ fontFamily: "Petrona", fontSize: "16px" }}
                          >
                            {searchPerformed ? 'Not Available' : 'Search to Book'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Accessibility Section */}
        <section ref={accessibilityRef} className="mb-16">
          <h2 
            className="text-gray-900 mb-6 max-md:text-2xl"
            style={{ fontFamily: 'Petrona', fontSize: '36px', fontWeight: 600 }}
          >
            Accessibility
          </h2>
          <p 
            className="text-gray-700 mb-6"
            style={{ fontFamily: 'Petrona', fontSize: '16px' }}
          >
            If you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking.
          </p>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 
              className="text-gray-900 mb-4"
              style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 600 }}
            >
              Common areas
            </h3>
            <ul className="space-y-2 text-gray-700" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
              <li>• No elevator</li>
              <li>• Well-lit path to entrance</li>
            </ul>
          </div>
        </section>

        {/* Policies Section */}
        <section ref={policiesRef} className="mb-16">
          <h2 
            className="text-gray-900 mb-6 max-md:text-2xl"
            style={{ fontFamily: 'Petrona', fontSize: '36px', fontWeight: 600 }}
          >
            Policies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 
                className="text-gray-900 mb-4"
                style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 600 }}
              >
                Check-in
              </h3>
              <div className="space-y-2 text-gray-700" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                <p>Check-in start time: 2:00 PM</p>
                <p>Check-in end time: midnight</p>
                <p>Minimum check-in age: 18</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 
                className="text-gray-900 mb-4"
                style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 600 }}
              >
                Check-out
              </h3>
              <div className="space-y-2 text-gray-700" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                <p>Check-out before noon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 
              className="text-gray-900 mb-4"
              style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 600 }}
            >
              Special check-in instructions
            </h3>
            <div className="space-y-2 text-gray-700" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
              <p>Front desk staff will greet guests on arrival at the property.</p>
              <p>If you are planning to arrive after 6:00 PM, please contact the property in advance.</p>
            </div>
          </div>
        </section>
      </div>
      </div>

      <FooterSimple />
    </div>
  );
}

export default PropertyDetail;
