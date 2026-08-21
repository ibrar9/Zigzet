import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Toast = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          {toast.type === 'info' ? (
            <Info size={20} color="#93c5fd" />
          ) : (
            <CheckCircle2 size={20} color="#86efac" />
          )}

          <div className="toast-content" style={{ flex: 1 }}>
            <h5>{toast.title}</h5>
            <p>{toast.message}</p>
          </div>

          <button 
            onClick={() => removeToast(toast.id)}
            style={{ color: '#9ca3af', padding: '2px' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
