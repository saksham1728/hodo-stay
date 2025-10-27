import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer2 from "../components/Footer2";
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
  // Fallback static data (same as before)
  const fallbackProperties = [
    {
      id: 1,
      title: "Hodo Heiwa - HSR Layout",
      location: "Sector 6, HSR Layout, Bangalore",
      size: "348 x 48",
      rating: 4.6,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description:
        "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 7000,
      images: ["/card-1.png", "/card-2.png", "/card-3.png"],
    },
    {
      id: 2,
      title: "Hodo Hummus - Manyata",
      location: "Sector 370, Manyata, Bangalore",
      rating: 4.5,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description:
        "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 7000,
      images: ["/card-4.png", "/card-5.png", "/card-6.png"],
    },
    {
      id: 3,
      title: "Hodo Honeybee - Bannerghatta",
      location: "Sector 12, Bannerghatta, Bangalore",
      size: "420 x 52",
      rating: 4.7,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description:
        "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 7500,
      images: ["/card-1.png", "/card-2.png", "/card-3.png"],
    },
    {
      id: 4,
      title: "Hodo Harmony - Whitefield",
      location: "Sector 8, Whitefield, Bangalore",
      size: "380 x 50",
      rating: 4.8,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description:
        "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 8000,
      images: ["/card-4.png", "/card-5.png", "/card-6.png"],
    },
  ];

  // Use the buildings hook to fetch data from API
  const { buildings: apiBuildings, loading, error } = useBuildings();
  
  // Clean function to format buildings for Properties page display
  const formatBuildingForDisplay = (building) => {
    if (!building.units || building.units.length === 0) return null;
    
    // Use first unit for display info
    const firstUnit = building.units[0];
    const location = building.location?.detailedLocationID === 41982 
      ? "HSR Layout, Bangalore" 
      : "Bangalore, India";
    
    return {
      id: building.buildingId, // Use building ID for routing to property detail
      title: firstUnit.name || building.name,
      location: location,
      size: `${building.availableUnits} units available`,
      rating: 4.5,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description: firstUnit.description || "Modern apartments with all amenities",
      price: 7000,
      images: firstUnit.images?.length > 0 
        ? firstUnit.images.map(img => img.url).filter(url => url)
        : ["/card-1.png", "/card-2.png", "/card-3.png"]
    };
  };



  // Use buildings data or fallback to static
  const properties = apiBuildings.length > 0 
    ? apiBuildings.map(formatBuildingForDisplay).filter(Boolean)
    : fallbackProperties;

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
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">
                Unable to load properties from server. Showing sample properties instead.
              </p>
            </div>
          )}

          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* 60:40 layout on md+, stacked on mobile */}
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image carousel (60%) */}
                  <div className="w-full md:w-3/5 h-[360px] md:h-[360px] flex-shrink-0" style={{ minHeight: "300px" }}>
                    <ImageCarousel images={property.images} />
                  </div>

                  {/* Right: Content (40%) */}
                  <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col justify-between">
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

                        <div className="flex items-center gap-1 self-start sm:self-auto">
                          <span
                            className="font-medium"
                            style={{
                              fontFamily: "Petrona",
                              fontWeight: 500,
                              fontSize: "14px",
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

                      {/* Amenities (restored) */}
                      <div className="flex flex-wrap gap-2 mb-4">
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

                      <p
                        className="mb-6"
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
                        <div className="flex items-baseline gap-1">
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
                            className="text-gray-500 ml-1"
                            style={{
                              fontFamily: "Petrona",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            per night
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/property/${property.id}`}
                        className="text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto underline underline-offset-2"
                        style={{
                          fontFamily: "Petrona",
                          fontWeight: 400,
                          fontSize: "14px",
                        }}
                      >
                        View rooms
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer2 />
    </div>
  );
};

export default Properties;
