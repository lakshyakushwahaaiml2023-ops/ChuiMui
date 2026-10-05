import React, { useEffect } from 'react';

/**
 * Luxury Glassmorphic Cart Toast Notification
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.visible, onClose]);

  if (!toast.visible || !toast.fragrance) return null;

  const { fragrance } = toast;

  return (
    <div
      className="luxury-toast-notification"
      style={{
        '--toast-accent': fragrance.accentColor || '#c99742',
      }}
      role="alert"
    >
      <div className="toast-glow" />
      <div className="toast-inner">
        <div className="toast-icon-frame">
          <span className="toast-crest">✦</span>
        </div>

        <div className="toast-content">
          <div className="toast-header-row">
            <span className="toast-status">Added to Bespoke Bag</span>
            <button className="toast-close-btn" onClick={onClose} aria-label="Dismiss Notification">
              ✕
            </button>
          </div>
          <h4 className="toast-title">{fragrance.name}</h4>
          <div className="toast-meta">
            <span className="toast-size">{fragrance.size} • Extrait de Parfum</span>
            <span className="toast-divider">•</span>
            <span className="toast-price">{fragrance.price}</span>
          </div>
        </div>
      </div>

      <div className="toast-progress-bar" />
    </div>
  );
}
