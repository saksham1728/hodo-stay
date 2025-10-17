import { Link } from "react-router-dom";
import Footer2 from "../components/Footer2";
import HomeHeader from "../components/HomeHeader";

const Properties = () => {
  const properties = [
    {
      id: 1,
      title: "Hodo Heiwa - HSR Layout",
      location: "Sector 6, HSR Layout, Bangalore",
      size: "348 x 48",
      rating: 4.6,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description: "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 7000,
      image: "/property_1.png",
    },
    {
      id: 2,
      title: "Hodo Hummus - Manyata",
      location: "Sector 370, Manyata, Bangalore",
      rating: 4.5,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description: "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 7000,
      image: "/property_2.jpg",
    },
    {
      id: 3,
      title: "Hodo Honeybee - Bannerghatta",
      location: "Sector 12, Bannerghatta, Bangalore",
      size: "420 x 52",
      rating: 4.7,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description: "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 7500,
      image: "/property_4.jpg",
    },
    {
      id: 4,
      title: "Hodo Harmony - Whitefield",
      location: "Sector 8, Whitefield, Bangalore",
      size: "380 x 50",
      rating: 4.8,
      amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
      description: "Luxury, eco-friendly apartments in the heart of HSR Layout. Fully equipped with modern comforts for work and relaxation...",
      price: 8000,
      image: "/property_5.jpg",
    },
  ]

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
                fontSize: "48px",
                lineHeight: "100%",
              }}
            >
              Our Properties
            </h2>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto"
              style={{
                fontFamily: 'Petrona',
                fontWeight: 400,
                fontSize: '14px'
              }}
            >
              View all →
            </a>
          </div>

          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden"
              >
                <div className="w-full h-48 md:w-82 md:h-76 flex-shrink-0 rounded-xl overflow-hidden md:rounded-xl">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                    <div className="flex-1">
                      <h3
                        className="text-black mb-1"
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 600,
                          fontSize: '30px',
                          lineHeight: '100%',
                          letterSpacing: '-2.2%'
                        }}
                      >
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        {/* <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          {property.size}
                        </span> */}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 self-start sm:self-auto">
                      <span className="text-orange-400 text-sm">★</span>
                      <span
                        className="font-medium"
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 500,
                          fontSize: '14px'
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
                    {property.description}
                  </p>

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
                      className="text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto"
                      style={{
                        fontFamily: "Petrona",
                        fontWeight: 400,
                        fontSize: "14px",
                      }}
                    >
                      View rooms →
                    </Link>
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
