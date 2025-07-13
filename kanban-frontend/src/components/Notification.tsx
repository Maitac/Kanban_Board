

import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose?: () => void; 
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 4000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  const backgroundColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-blue-500'; 

  const textColor = 'text-white';

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-opacity duration-300 ${backgroundColor} ${textColor}`}
      role="alert"
    >
      <span>{message}</span>
      {}
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-2 text-white hover:text-gray-200"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Notification;