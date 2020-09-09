import React, { useState, useContext, useCallback } from 'react';
import Toast from 'shared/components/toast/toast.component';

const ToastContext = React.createContext(null);

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const addToast = (content, delay = 5000, color = 'black', position = 'top') => {

    setToast({
      content,
      delay,
      color,
      position
    });
  }

  const removeItem = useCallback(() => {
    setToast(null);
  }, [setToast])

  return (
    <ToastContext.Provider value={{
      addToast,
      removeItem
    }}>
      {children}
      <Toast toast={toast}/>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
}

export default ToastProvider;
