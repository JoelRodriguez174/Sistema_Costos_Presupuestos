import React from 'react';

function Switch({ active, onChange, label, className = '' }) {
  return (
    <div 
      className={`switch-container ${active ? 'active' : ''} ${className}`} 
      onClick={onChange}
    >
      <div className="switch-track">
        <div className="switch-thumb"></div>
      </div>
      {label && <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{label}</span>}
    </div>
  );
}

export default Switch;
