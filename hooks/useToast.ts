import { useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

interface UseToastReturn {
  visible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  showToast: (message: string, options?: ToastOptions) => void;
  hideToast: () => void;
}

export const useToast = (): UseToastReturn => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');
  const [duration, setDuration] = useState(3000);
  
  const showToast = (message: string, options: ToastOptions = {}) => {
    setMessage(message);
    setType(options.type || 'success');
    setDuration(options.duration || 3000);
    setVisible(true);
  };
  
  const hideToast = () => {
    setVisible(false);
  };
  
  return {
    visible,
    message,
    type,
    duration,
    showToast,
    hideToast
  };
};
