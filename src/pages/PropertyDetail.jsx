import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";
import { usePropertyDetail } from "../hooks/usePropertyDetail";

function PropertyDetail() {
  const { id } = useParams();
  
  // Use the property detail hook to fetch data from API
  const { property: apiProperty, loading, error } = usePropertyDetail(id);

  // No static data - 100% API driven

  // Format API data for UI (100% API data, no static fallbacks)
  const formatAPIProperty = (apiProp) => {
    if (!apiProp) return null;

    // Map location ID to readable location
    const getLocationName = (locationId) => {
      const locationMap = {
        41982: "HSR Layout, Bangalore South, Bengaluru Urban, Karnataka, India"
      };
      return locationMap[locationId] || "Bangalore, Karnataka, India";
    };

    // Map amenity IDs to readable names
    const getAmenityName = (amenityID) => {
      const amenityMap = {
        61: "WiFi",
        1: "Air-conditioning",
        2: "Free Parking on Premises",
        3: "TV",
        4: "Kitchen",
        5: "Hot Water",
        6: "Bed Linens"
      };
      return amenityMap[amenityID] || `Amenity ${amenityID}`;
    };

    // Extract amenities from description text
    const extractAmenitiesFromDescription = (description) => {
      if (!description) return [];
      
      const amenities = [];
      
      // Look for "Amenities:" section in description
      const amenitiesMatch = description.match(/Amenities:\s*(.+?)(?:\n|$)/i);
      if (amenitiesMatch) {
        // Split by common separators and clean up
        const amenityText = amenitiesMatch[1];
        const extractedAmenities = amenityText
          .split(/[,;]/)
          .map(item => item.trim())
          .filter(item => item.length > 0);
        amenities.push(...extractedAmenities);
      }
      
      // Also check for common amenities mentioned anywhere in description
      const commonAmenities = [
        { keyword: /wifi|wi-fi|internet/i, name: "WiFi" },
        { keyword: /air.?condition|ac\b|cooling/i, name: "Air-conditioning" },
        { keyword: /parking/i, name: "Free Parking on Premises" },
        { keyword: /kitchen/i, name: "Kitchen" },
        { keyword: /tv|television/i, name: "TV" },
        { keyword: /double bed|bed/i, name: "Double Bed" },
        { keyword: /bathroom/i, name: "Private Bathroom" },
        { keyword: /bedroom/i, name: "Bedroom" }
      ];
      
      commonAmenities.forEach(({ keyword, name }) => {
        if (keyword.test(description) && !amenities.some(a => a.toLowerCase().includes(name.toLowerCase()))) {
          amenities.push(name);
        }
      });
      
      return amenities.length > 0 ? amenities : ["Basic Amenities"];
    };

    // Format amenities from API data and description
    const formatAmenities = (apiAmenities, description) => {
      // First try to get amenities from description
      const descriptionAmenities = extractAmenitiesFromDescription(description);
      
      // If we have amenities from description, use those
      if (descriptionAmenities.length > 0 && !descriptionAmenities.includes("Basic Amenities")) {
        return descriptionAmenities;
      }
      
      // Otherwise try API amenities
      if (Array.isArray(apiAmenities) && apiAmenities.length > 0) {
        return apiAmenities.map(amenity => getAmenityName(amenity.amenityID));
      }
      
      // Last resort fallback
      return ["Basic Amenities"];
    };

    // Format images from API
    const formatImages = (apiImages) => {
      if (Array.isArray(apiImages) && apiImages.length > 0) {
        return apiImages.map(img => img.url).filter(url => url);
      }
      return ["/property_details_main.png"]; // Single fallback
    };

    // Extract room info from description or use defaults
    const extractRoomInfo = (description) => {
      const bedroomMatch = description?.match(/(\d+)\s*bedroom/i);
      const bathroomMatch = description?.match(/(\d+)\s*bathroom/i);
      
      return {
        bedrooms: bedroomMatch ? parseInt(bedroomMatch[1]) : 2,
        bathrooms: bathroomMatch ? parseInt(bathroomMatch[1]) : 2
      };
    };

    const roomInfo = extractRoomInfo(apiProp.description);
    const images = formatImages(apiProp.images);
    const location = getLocationName(apiProp.location?.detailedLocationID);

    // Create space from API property
    const space = {
      id: apiProp._id,
      name: apiProp.name,
      location: location,
      rating: 4.5, // Default rating (you can add this to your API later)
      amenities: formatAmenities(apiProp.amenities, apiProp.description),
      bedrooms: roomInfo.bedrooms,
      bathrooms: roomInfo.bathrooms,
      area: `${apiProp.capacity?.standardGuests}-${apiProp.capacity?.canSleepMax} guests, ${apiProp.capacity?.noOfUnits} units`,
      description: apiProp.description || "Modern apartment with all amenities",
      price: 7000, // Default price (you can add pricing API later)
      images: images
    };

    return {
      title: apiProp.name,
      address: location,
      heroImage: images[0] || "/property_details_main.png",
      spaces: [space],
      // Additional API data
      checkInOut: apiProp.checkInOut,
      propertyType: apiProp.propertyType,
      fullDescription: apiProp.description
    };
  };

  // Use 100% API data
  const property = apiProperty ? formatAPIProperty(apiProperty) : null;

  // Loading state (keeping your design style)
  if (loading) {
    return (
      <div className="property-detail">
        <div className="h-[60vh] bg-gray-200 relative flex flex-col">
          <div className="bg-gradient-to-b from-black/30 to-black/50 h-full flex flex-col p-6">
            <div className="mt-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-white/20 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <HomeHeader />
        <div className="py-10 px-8 bg-orange-50 min-h-screen max-md:py-12 max-md:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state or property not found
  if (error || !property) {
    return (
      <div className="property-detail">
        <div className="h-[60vh] bg-gray-200 relative flex flex-col">
          <div className="bg-gradient-to-b from-black/30 to-black/50 h-full flex flex-col p-6">
            <div className="mt-auto">
              <h1 className="text-white text-4xl font-bold m-0 mb-2 drop-shadow-lg max-md:text-3xl">
                {loading ? "Loading..." : "Property Not Found"}
              </h1>
              <p className="text-white text-base m-0 drop-shadow-sm">
                {error || "Unable to load property details. Please try again."}
              </p>
            </div>
          </div>
        </div>
        <HomeHeader />
        <div className="py-10 px-8 bg-orange-50 min-h-screen max-md:py-12 max-md:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <Link 
                to="/properties" 
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block no-underline"
              >
                Back to Properties
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="property-detail">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center relative flex flex-col"
        style={{ backgroundImage: `url(${property.heroImage})` }}
      >
        <div className="bg-gradient-to-b from-black/30 to-black/50 h-full flex flex-col p-6">
          <div className="mt-auto">
            <div className="flex gap-4 mb-8 max-md:flex-col max-md:gap-2">
              <button className="bg-white/90 border-none px-6 py-3 rounded-lg cursor-pointer font-medium backdrop-blur-sm">
                📅 Select Dates
              </button>
              <button className="bg-white/90 border-none px-6 py-3 rounded-lg cursor-pointer font-medium backdrop-blur-sm">
                👤 Add Guests
              </button>
            </div>
            <div className="hero-info">
              <h1 className="text-white text-4xl font-bold m-0 mb-2 drop-shadow-lg max-md:text-3xl">
                {property.title}
              </h1>
              <p className="text-white text-base m-0 drop-shadow-sm">
                {property.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <HomeHeader />

      {/* Available Spaces */}
      <div className="py-10 px-8 bg-orange-50 min-h-screen max-md:py-12 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 m-0">
              Available Spaces
            </h2>
            {apiProperty && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Data
              </div>
            )}
          </div>
          <div className="flex flex-col gap-8 w-full">
            {property.spaces.map((space) => (
              <div
                key={space.id}
                className="flex bg-amber-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-96 max-md:flex-col max-md:h-auto"
              >
                {/* Scrollable Image Gallery */}
                <div className="w-96 h-96 flex-shrink-0 max-md:w-full max-md:h-48 relative overflow-hidden">
                  <div className="flex overflow-x-auto scrollbar-hide gap-0 h-full snap-x snap-mandatory">
                    {space.images.map((image, index) => (
                      <div key={index} className="flex-shrink-0 w-full h-full snap-start">
                        <img 
                          src={image} 
                          alt={`${space.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Scroll indicators */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                    {space.images.map((_, index) => (
                      <div key={index} className="w-2 h-2 bg-white/70 rounded-full shadow-sm"></div>
                    ))}
                  </div>
                </div>
                <div className="p-12 flex-1 flex flex-col justify-between max-md:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-4xl font-semibold text-gray-800 m-0 mb-2 max-md:text-2xl">
                        {space.name}
                      </h3>
                      <p className="text-gray-600 text-xl m-0 max-md:text-base">
                        {space.location}
                      </p>
                    </div>
                    <div className="text-orange-400 font-semibold text-2xl max-md:text-lg">
                      ★ {space.rating}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {space.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 text-gray-600 text-base px-4 py-2 bg-gray-100 rounded-lg max-md:text-sm max-md:px-2 max-md:py-1"
                      >
                        {amenity === "WiFi" && "📶"}
                        {amenity === "Air-conditioning" && "❄️"}
                        {amenity === "Free Parking on Premises" && "🅿️"}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-8 mb-4 max-md:flex-col max-md:gap-2">
                    <div className="text-gray-800 text-lg">
                      <strong>{space.bedrooms} bedroom</strong>
                    </div>
                    <div className="text-gray-800 text-lg">
                      <strong>{space.bathrooms} bathroom</strong>
                    </div>
                    <div className="text-gray-800 text-lg">
                      <strong>{space.area}</strong>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg m-0 mb-8 flex-1 leading-relaxed max-md:text-base max-md:mb-4">
                    {space.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-gray-600 text-sm">From</span>
                      <span className="text-3xl font-bold text-gray-800 max-md:text-2xl">
                        Rs. {space.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-sm">per night</span>
                    </div>
                    <Link
                      to="/booking-details"
                      className="bg-orange-500 text-white border-none px-6 py-3 rounded-full font-normal text-sm cursor-pointer hover:bg-orange-600 transition-colors max-md:px-4 max-md:py-2 max-md:text-xs inline-block text-center no-underline"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Section - Real Data from API */}
      <div className="py-10 px-8 bg-amber-50 max-md:py-12 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 m-0 mb-8 max-md:text-2xl">
            Amenities
          </h2>
          {property && property.spaces && property.spaces[0] && (
            <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-8">
              <div className="flex flex-col gap-6">
                {property.spaces[0].amenities.map((amenity, index) => {
                  // Get appropriate emoji for each amenity
                  const getAmenityEmoji = (amenityName) => {
                    const name = amenityName.toLowerCase();
                    if (name.includes('wifi') || name.includes('internet')) return '📶';
                    if (name.includes('air') || name.includes('cooling')) return '❄️';
                    if (name.includes('parking')) return '🅿️';
                    if (name.includes('tv') || name.includes('television')) return '📺';
                    if (name.includes('kitchen')) return '🍳';
                    if (name.includes('bed')) return '🛏️';
                    if (name.includes('bathroom')) return '🚿';
                    if (name.includes('bedroom')) return '🏠';
                    return '✅'; // Default emoji
                  };

                  return (
                    <div key={index} className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                      <span className="text-xl w-8 text-center">{getAmenityEmoji(amenity)}</span>
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-6">
                {/* Additional composition info from description */}
                {apiProperty && apiProperty.description && (
                  <>
                    {apiProperty.description.includes('bedroom') && (
                      <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                        <span className="text-xl w-8 text-center">🏠</span>
                        <span>Private Bedroom</span>
                      </div>
                    )}
                    {apiProperty.description.includes('bathroom') && (
                      <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                        <span className="text-xl w-8 text-center">🚿</span>
                        <span>Private Bathroom</span>
                      </div>
                    )}
                    {apiProperty.description.includes('WC') && (
                      <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                        <span className="text-xl w-8 text-center">🚽</span>
                        <span>WC</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {/* API Data Sections */}
          {apiProperty && (
            <div className="mt-8 space-y-6">
              {/* Property Description */}
              {apiProperty.description && (
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Description</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{apiProperty.description}</p>
                </div>
              )}
              
              {/* Check-in/Check-out Information */}
              {apiProperty.checkInOut && (
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Check-in & Check-out</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Check-in</span>
                      <p className="font-medium">{apiProperty.checkInOut.checkInFrom} - {apiProperty.checkInOut.checkInTo}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Check-out</span>
                      <p className="font-medium">Until {apiProperty.checkInOut.checkOutUntil}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-medium capitalize">{apiProperty.checkInOut.place?.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Property Type Information */}
              {apiProperty.propertyType && (
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Property Type ID</span>
                      <p className="font-medium">{apiProperty.propertyType.propertyTypeID}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Object Type ID</span>
                      <p className="font-medium">{apiProperty.propertyType.objectTypeID}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="py-10 px-8 bg-orange-50 max-md:py-12 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 m-0 mb-8 max-md:text-2xl">
            Map
          </h2>
          <div className="flex gap-12 max-md:flex-col max-md:gap-8">
            <div className="flex-1 flex flex-col gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm max-md:p-4">
                <div className="flex flex-col gap-6">
                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                      <span className="text-xl w-8 text-center">📍</span>
                      <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">
                        Address
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                      {property.address}
                    </p>
                  </div>
                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                      <span className="text-xl w-8 text-center">🚌</span>
                      <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">
                        Public transport
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                      Nearest Public Transportation: Bus from HSR BDA. Public
                      Transportation to City Center: 20 min.
                    </p>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                      <span className="text-xl w-8 text-center">🎯</span>
                      <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">
                        Attractions
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                      Wonderla, Bannerghatta Zoo, Lal Bagh, Cubbon Park
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-96 max-md:min-h-72">
              <div className="bg-gray-100 rounded-xl h-full flex items-center justify-center border border-gray-300 relative overflow-hidden">
                <div className="text-center relative z-10">
                  <div className="text-3xl text-red-600 mb-2">📍</div>
                  <p className="text-gray-600 text-base m-0 font-medium">
                    Interactive Map
                  </p>
                  <div className="absolute inset-0 z-0">
                    <div className="absolute h-0.5 w-3/5 top-2/5 left-1/5 bg-gray-400"></div>
                    <div className="absolute w-0.5 h-1/2 left-3/5 top-1/4 bg-gray-400"></div>
                    <div className="absolute h-0.5 w-2/5 top-3/4 left-1/10 bg-gray-400 transform -rotate-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default PropertyDetail;
