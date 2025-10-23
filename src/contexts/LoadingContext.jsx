import React, { useState, useContext, createContext } from 'react';
import LoadingScreen from '../components/shared/LoadingScreen';

// 1. Create the context
const LoadingContext = createContext({
  showLoading: () => {},
  hideLoading: () => {},
});

// 2. Create the Provider component
// This is what you will wrap around your app
export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // Functions to control the state
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  // Memoize the value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({ showLoading, hideLoading }),
    [showLoading, hideLoading] // This dependency array is correct as showLoading/hideLoading are stable
  );

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
}

// 3. Create the custom hook
// This is what components will use to access the context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};