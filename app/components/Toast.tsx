import React, { useEffect } from 'react';


interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
      {message}
    </div>
  );
};

export default Toast;
