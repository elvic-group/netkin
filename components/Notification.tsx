
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-24 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded shadow-2xl border transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} ${type === 'success' ? 'bg-netkin-card border-green-500/50 text-white' : 'bg-netkin-card border-red-500/50 text-white'}`}>
      {type === 'success' ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />}
      <span className="text-xs font-bold uppercase tracking-wide">{message}</span>
      <button onClick={() => setIsVisible(false)} className="ml-4 text-gray-500 hover:text-white">
        <X size={14} />
      </button>
    </div>
  );
};

export default Notification;
