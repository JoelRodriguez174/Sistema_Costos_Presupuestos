import React from 'react';

function Badge({ children, variant = 'primary', className = '' }) {
  const variantMap = {
    primary: 'badge-purple',
    rose: 'badge-rose',
    purple: 'badge-purple',
    emerald: 'badge-emerald',
    amber: 'badge-amber',
    cyan: 'badge-cyan'
  };
  
  const badgeClass = variantMap[variant] || 'badge-rose';
  
  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
