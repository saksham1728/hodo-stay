import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import HomeHeader from '../components/HomeHeader'
import FooterSimple from '../components/FooterSimple'

const ContactUs = () => {
  const { isDarkMode } = useTheme()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
      <HomeHeader />
      
      <main className="pt-32 pb-20 max-md:pt-24 max-md:pb-12">
        <div className="px-8 max-md:px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <p 
              className="text-xs tracking-[0.22em] uppercase mb-4"
              style={{ 
                color: isDarkMode ? '#DE754B' : '#0B8043',
                fontFamily: 'Work Sans'
              }}
            >
              Get in Touch
            </p>
            
            <h1 
              className={`text-3xl md:text-5xl font-semibold tracking-tight mb-8 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona' }}
            >
              Contact Us
            </h1>
            
            <p 
              className={`mb-16 max-w-2xl leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              style={{ fontFamily: 'Work Sans' }}
            >
              Have a question about our properties or need assistance with your stay? We're here to help.
            </p>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-5 gap-16 max-md:gap-10">
              {/* Form - Left Side */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label 
                        className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        style={{ fontFamily: 'Work Sans' }}
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className={`flex h-10 w-full rounded-md border-2 px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          isDarkMode
                            ? 'bg-[#1a1a1a] border-[#333333] text-white placeholder-gray-500 focus:border-[#DE754B] focus:ring-[#DE754B]'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0B8043] focus:ring-[#0B8043]'
                        }`}
                        style={{ fontFamily: 'Work Sans' }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label 
                        className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        style={{ fontFamily: 'Work Sans' }}
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className={`flex h-10 w-full rounded-md border-2 px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          isDarkMode
                            ? 'bg-[#1a1a1a] border-[#333333] text-white placeholder-gray-500 focus:border-[#DE754B] focus:ring-[#DE754B]'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0B8043] focus:ring-[#0B8043]'
                        }`}
                        style={{ fontFamily: 'Work Sans' }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label 
                      className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ fontFamily: 'Work Sans' }}
                      htmlFor="subject"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className={`flex h-10 w-full rounded-md border-2 px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isDarkMode
                          ? 'bg-[#1a1a1a] border-[#333333] text-white placeholder-gray-500 focus:border-[#DE754B] focus:ring-[#DE754B]'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0B8043] focus:ring-[#0B8043]'
                      }`}
                      style={{ fontFamily: 'Work Sans' }}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label 
                      className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ fontFamily: 'Work Sans' }}
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      required
                      rows="6"
                      className={`flex w-full rounded-md border-2 px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none ${
                        isDarkMode
                          ? 'bg-[#1a1a1a] border-[#333333] text-white placeholder-gray-500 focus:border-[#DE754B] focus:ring-[#DE754B]'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0B8043] focus:ring-[#0B8043]'
                      }`}
                      style={{ fontFamily: 'Work Sans' }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-300 h-10 px-8 text-white hover:opacity-90"
                    style={{ 
                      backgroundColor: isDarkMode ? '#DE754B' : '#0B8043',
                      fontFamily: 'Work Sans'
                    }}
                  >
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </form>
              </div>

              {/* Contact Info - Right Side */}
              <div className="lg:col-span-2 space-y-10">
                {/* Reach Us Directly */}
                <div>
                  <h3 
                    className={`text-lg font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontFamily: 'Petrona' }}
                  >
                    Reach Us Directly
                  </h3>
                  <div className="space-y-4">
                    <a 
                      href="mailto:hello@hodostays.com" 
                      className={`flex items-start gap-3 transition-colors duration-300 group ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5" style={{ color: isDarkMode ? '#DE754B' : '#0B8043' }}>
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      <div style={{ fontFamily: 'Work Sans' }}>
                        <p className={`transition-colors duration-300 ${isDarkMode ? 'text-white group-hover:text-[#DE754B]' : 'text-gray-900 group-hover:text-[#0B8043]'}`}>hello@hodostays.com</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>General inquiries</p>
                      </div>
                    </a>
                    
                    <a 
                      href="mailto:bookings@hodostays.com" 
                      className={`flex items-start gap-3 transition-colors duration-300 group ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5" style={{ color: isDarkMode ? '#DE754B' : '#0B8043' }}>
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      <div style={{ fontFamily: 'Work Sans' }}>
                        <p className={`transition-colors duration-300 ${isDarkMode ? 'text-white group-hover:text-[#DE754B]' : 'text-gray-900 group-hover:text-[#0B8043]'}`}>bookings@hodostays.com</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reservations &amp; stays</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Our Location */}
                <div>
                  <h3 
                    className={`text-lg font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontFamily: 'Petrona' }}
                  >
                    Our Location
                  </h3>
                  <div className={`flex items-start gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5" style={{ color: isDarkMode ? '#DE754B' : '#0B8043' }}>
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div style={{ fontFamily: 'Work Sans' }}>
                      <p className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bangalore, India</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Serving urban professionals across major cities</p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className={`pt-6 border-t transition-colors duration-300`} style={{ borderColor: isDarkMode ? '#333333' : '#e5e7eb' }}>
                  <h3 
                    className={`text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontFamily: 'Petrona' }}
                  >
                    Response Time
                  </h3>
                  <p 
                    className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    style={{ fontFamily: 'Work Sans' }}
                  >
                    We typically respond within 24 hours during business days. For urgent booking matters, please include your confirmation number.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSimple />
    </div>
  )
}

export default ContactUs
