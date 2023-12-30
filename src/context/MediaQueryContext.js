import { createContext, useEffect, useState } from 'react';

export const MediaQueryContext = createContext();

export const MediaQueryProvider = ({ children }) => {
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Check the window width and update state accordingly
      setSmallScreen(window.innerWidth < 1528);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <MediaQueryContext.Provider value={{ smallScreen, setSmallScreen }} >
    {children}
  </MediaQueryContext.Provider>
}