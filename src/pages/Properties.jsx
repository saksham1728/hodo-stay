import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FooterSimple from "../components/FooterSimple";
import HomeHeader from "../components/HomeHeader";
import { useBuildings } from "../hooks/useBuildings";

/**
 * ImageCarousel used on the listing page.
 */
const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    setIndex(0)
  }, [images]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goTo = (i) => setIndex(i);

  const onTouchStart = (e) => {
    dragging.current = true;
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };
  const onTouchMove = (e) => {
    if (!dragging.current) return;
    currentX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!dragging.current) return;
    const dx = currentX.current - startX.current;
    const threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    dragging.current = false;
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="relative w-full h-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)`, height: "100%" }}
        >
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full h-full">
              <img
                src={src}
                alt={`slide-${i}`}
                className="w-full h-full object-cover object-center"
                style={{ minHeight: "300px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows (desktop only) */}
      <button
        aria-label="Previous image"
        onClick={prev}
        className="hidden md:flex items-center justify-center absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:opacity-90 z-20"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        aria-label="Next image"
        onClick={next}
        className="hidden md:flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:opacity-90 z-20"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-3 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? "bg-yellow-400" : "bg-white/80"}`}
            style={{ boxShadow: "0 0 0 2px rgba(0,0,0,0.06) inset" }}
          />
        ))}
      </div>
    </div>
  );
};

const Properties = () => {
  // Use the buildings hook to fetch data from API
  const { buildings: apiBuildings, loading, error } = useBuildings();
  
  // Clean function to format buildings for Properties page display
  const formatBuildingForDisplay = (building) => {
    // Format location
    const location = building.location?.city 
      ? `${building.location.address || ''}, ${building.location.city}`.trim().replace(/^,\s*/, '')
      : "Bangalore, India";
    
    // Get images - use building images or default
    const images = building.images?.length > 0 
      ? building.images.map(img => img.url).filter(url => url)
      : ["/card-1.png", "/card-2.png", "/card-3.png"];
    
    return {
      id: building._id, // Use MongoDB _id for routing to property detail
      title: building.name,
      location: location,
      size: `${building.totalUnits || building.availableUnits || 0} units available`,
      rating: 4.5,
      amenities: building.amenities?.slice(0, 3) || ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description: building.description || "Modern apartments with all amenities",
      price: 70,
      images: images
    };
  };

  // Use buildings data from API only
  const properties = apiBuildings.map(formatBuildingForDisplay).filter(Boolean);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF7F0" }}>
      <div className="sticky top-0 z-50">
        <HomeHeader />
      </div>

      <div className="py-10 px-8 max-md:py-12 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2
              className="text-black"
              style={{
                fontFamily: "Petrona",
                fontWeight: 400,
                fontSize: isMobile ? "36px" : "48px",
                lineHeight: "100%",
              }}
            >
              Our Properties
            </h2>
            {/* <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto"
              style={{
                fontFamily: "Petrona",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              View all →
            </a> */}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
                <p className="text-gray-600" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                  Loading properties...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                Unable to load properties. Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* 60:40 layout on md+, stacked on mobile */}
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image carousel (60%) */}
                  <div className="w-full md:w-3/5 h-[400px] md:h-[450px] flex-shrink-0" style={{ minHeight: "350px" }}>
                    <ImageCarousel images={property.images} />
                  </div>

                  {/* Right: Content (40%) */}
                  <Link 
                    to={`/property/${property.id}`}
                    className="w-full md:w-2/5 p-4 md:p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                        <div className="flex-1">
                          <h3
                            className="text-black mb-1"
                            style={{
                              fontFamily: "Petrona",
                              fontWeight: 600,
                              fontSize: "30px",
                              lineHeight: "100%",
                              letterSpacing: "-2.2%",
                            }}
                          >
                            {property.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <svg className="w-6 h-6 text-green-600 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span
                            className="text-green-600 font-medium"
                            style={{
                              fontFamily: "Petrona",
                              fontWeight: 600,
                              fontSize: "18px"
                            }}
                          >
                            {property.rating}
                          </span>
                        </div>
                      </div>

                      <p
                        className="text-gray-600 mb-4"
                        style={{
                          fontFamily: "Petrona",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "140%",
                        }}
                      >
                        {property.location}
                      </p>

                      {/* Amenities - hidden on mobile */}
                      <div className="hidden md:flex flex-wrap gap-2 mb-4">
                        {property.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 text-gray-600 px-2 py-1 bg-gray-50 rounded-md"
                            style={{
                              fontFamily: "Petrona",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            {amenity === "WiFi" && "📶"}
                            {amenity === "Air-conditioning" && "❄️"}
                            {amenity === "Free Parking on Premises" && "🅿️"}
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {/* Description - hidden on mobile */}
                      <p
                        className="hidden md:block mb-6"
                        style={{
                          color: "#8B8B8B",
                          fontFamily: "Petrona",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "150%",
                          letterSpacing: "-2.2%",
                        }}
                      >
                        Comfortable, thoughtfully designed spaces for short & long stays.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                      <div className="flex flex-col">
                        <span
                          className="text-gray-500 mb-1"
                          style={{
                            fontFamily: "Petrona",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          from
                        </span>
                        <div className="flex items-baseline">
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Petrona",
                              fontWeight: 600,
                              fontSize: "30px",
                              lineHeight: "100%",
                              letterSpacing: "-2.2%",
                            }}
                          >
                            Rs. {property.price.toLocaleString()}
                          </span>
                          <span
                            className="text-gray-500"
                            style={{
                              fontFamily: "Petrona",
                              fontWeight: 400,
                              fontSize: "12px",
                              marginLeft: "2px"
                            }}
                          >
                            per night
                          </span>
                        </div>
                      </div>

                      <span
                        className="text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto underline underline-offset-2"
                        style={{
                          fontFamily: "Petrona",
                          fontWeight: 400,
                          fontSize: "14px",
                        }}
                      >
                        View rooms
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FooterSimple />
    </div>
  );
};

export default Properties;
