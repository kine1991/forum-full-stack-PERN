import React, { useState, useEffect, useContext } from 'react';

const SnackbarContext = React.createContext(null);

export const useSnackbar = () => {
  return useContext(SnackbarContext);
}

export const SnackbarProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('!!!');
  const [color, setColor] = useState(null);
  // const [position, setPosition] = useState('');
  const [delay, setDelay] = useState(5000);

  // const subSetTimeout;

  useEffect(() => {
    return () => {
      console.log('clear');
      // subSetTimeout().uns
    }
  }, []);

  const addSnackbar = (message, {
    color,
    delay
  }) => {
    setIsActive(true);
    setMessage(message);
    setColor(color)
    // subSetTimeout = setTimeout(() => {
    //   setIsActive(false)
    // }, [delay = 5000]);
    // setIsActive(prev => !prev);
  }
  return (
    <SnackbarContext.Provider value={{
      isActive: isActive,
      addSnackbar: addSnackbar,
      message: message,
      color
    }}>
      {children}
    </SnackbarContext.Provider>
  )
}
