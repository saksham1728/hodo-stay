import { createContext, useContext, useReducer } from 'react'

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
}

// Action types
export const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
}

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTION_TYPES.SET_USER:
      return { ...state, user: action.payload, loading: false }
    case ACTION_TYPES.SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    case ACTION_TYPES.CLEAR_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
}

// Create context
const AppContext = createContext()

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const value = {
    ...state,
    dispatch,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}