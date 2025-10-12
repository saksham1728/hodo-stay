import { useState } from 'react'

const CardStack = () => {
  const [activeCard, setActiveCard] = useState(0)

  const cards = [
    {
      id: 1,
      title: "Eco-Friendly Design",
      description: "Built with sustainable materials and energy-efficient systems, our aparthotel offers a green stay without compromising comfort. Embrace eco-conscious living with modern, thoughtful design.",
      image: "/card-1.png",
      background: "#202624",
      angle: 0
    },
    {
      id: 2,
      title: "Modern Amenities",
      description: "Experience luxury with our state-of-the-art facilities including high-speed WiFi, smart home controls, and premium appliances designed for the modern traveler.",
      image: "/card-2.png",
      background: "#333C3A",
      angle: -3
    },
    {
      id: 3,
      title: "Prime Locations",
      description: "Strategically located in the heart of Bangalore's most vibrant neighborhoods, offering easy access to business districts, entertainment, and cultural attractions.",
      image: "/card-3.png",
      background: "#46534F",
      angle: -6
    },
    {
      id: 4,
      title: "Flexible Stays",
      description: "Whether you're here for a night or a month, our flexible booking options and personalized services adapt to your unique travel needs and preferences.",
      image: "/card-4.png",
      background: "#5A6A65",
      angle: -9
    },
    {
      id: 5,
      title: "Community Spaces",
      description: "Connect with fellow travelers in our thoughtfully designed common areas, co-working spaces, and rooftop gardens that foster meaningful interactions.",
      image: "/card-5.png",
      background: "#6D807A",
      angle: -12
    },
    {
      id: 6,
      title: "Wellness Focus",
      description: "Prioritize your well-being with our fitness centers, meditation spaces, and wellness programs designed to keep you balanced during your stay.",
      image: "/card-6.png",
      background: "#809790",
      angle: -15
    }
  ]

  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setActiveCard((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <section className="py-20 px-8 min-h-screen flex items-center max-md:py-12 max-md:px-4" style={{ backgroundColor: '#FFF7F0' }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12 md:mb-16">
          <h2 
            className="text-black mb-4 text-3xl md:text-5xl"
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: window.innerWidth < 768 ? '36px' : '48px',
              lineHeight: '150%',
              letterSpacing: '-2.2%'
            }}
          >
            Experience the Hodo difference
          </h2>
        </div>

        <div className="flex items-center justify-center gap-16 max-lg:flex-col max-lg:gap-12 max-lg:items-center sm:pr-4">
          {/* Card Stack */}
          <div 
            className="relative flex-shrink-0 mx-auto" 
            style={{ 
              width: window.innerWidth < 768 ? '280px' : '400px', 
              height: window.innerWidth < 768 ? '350px' : '500px' 
            }}
          >
            {cards.map((card, index) => {
              const stackIndex = (index - activeCard + cards.length) % cards.length
              const isVisible = stackIndex < 6
              const isMobile = window.innerWidth < 768
              
              return (
                <div
                  key={card.id}
                  className="absolute transition-all duration-700 ease-in-out cursor-pointer"
                  style={{
                    width: isMobile ? '200px' : '285.78px',
                    height: isMobile ? '280px' : '392.65px',
                    borderRadius: '6.97px',
                    backgroundColor: card.background,
                    transform: `rotate(${card.angle - (stackIndex * 3)}deg) translateX(${stackIndex * (isMobile ? 8 : 15)}px) translateY(${stackIndex * (isMobile ? 4 : 8)}px)`,
                    zIndex: cards.length - stackIndex,
                    opacity: isVisible ? 1 : 0,
                    left: '50%',
                    top: '50%',
                    marginLeft: isMobile ? '-100px' : '-142.89px',
                    marginTop: isMobile ? '-140px' : '-196.325px'
                  }}
                  onClick={() => setActiveCard(index)}
                >
                  <div className={`${isMobile ? 'p-4' : 'p-6'} h-full flex flex-col`}>
                    <div className="flex-1 mb-4">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className={`w-full ${isMobile ? 'h-32' : 'h-48'} object-cover rounded mb-4`}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className={`text-white ${isMobile ? 'text-base' : 'text-xl'} font-semibold mb-2`}>
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Content Panel */}
          <div className="flex-shrink-0 w-full max-w-2xl flex justify-center">
            <div 
              className="rounded-3xl relative mx-auto"
              style={{ 
                width: window.innerWidth < 768 ? 'min(90vw, 350px)' : '613px',
                height: window.innerWidth < 768 ? 'auto' : '367px',
                minHeight: window.innerWidth < 768 ? '300px' : '367px',
                padding: window.innerWidth < 768 ? '24px 20px' : '38px 40px',
                boxShadow: '0px 4px 4px 0px #0000001A',
                background: '#FAF2E8'
              }}
            >
              {/* Navigation Arrows */}
              <button 
                onClick={prevCard}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextCard}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="text-center px-8 md:px-16 h-full flex flex-col justify-center py-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  {cards[activeCard].title}
                </h3>
                <p 
                  className="text-gray-700 mb-6 md:mb-8 text-sm md:text-base leading-relaxed"
                  style={{
                    fontFamily: 'Work Sans',
                    fontWeight: 400,
                    fontSize: window.innerWidth < 768 ? '16px' : '20px',
                    lineHeight: '150%',
                    letterSpacing: '-2.2%',
                    textAlign: 'center'
                  }}
                >
                  {cards[activeCard].description}
                </p>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCard(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeCard ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardStack