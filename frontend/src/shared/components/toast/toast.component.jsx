import React, { useEffect } from 'react';

import { ToastContainer, ToastContent, ToastClose } from './toasts.styles';
import { useToast } from 'context/toast/toast.provider';


const Toast = ({ toast }) => {
  const { removeItem } = useToast();

  useEffect(() => {
    if(toast) {
      const timer = setTimeout(() => {
        removeItem();
      }, [toast.delay]);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [removeItem, toast]);

  if(toast === null) return null;

  return (
    <React.Fragment>
      <ToastContainer color={toast.color}>
        <ToastContent>{toast.content}</ToastContent>
        <ToastClose onClick={() => removeItem()}>&times;</ToastClose>
      </ToastContainer>
    </React.Fragment>
  )
}

export default Toast;