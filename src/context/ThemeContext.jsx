import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // ALWAYS dark mode - no localStorage check
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Always set to dark mode
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = () => {
    // Disabled - always stay in dark mode
    // setIsDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
