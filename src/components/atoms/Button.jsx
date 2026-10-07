import React from 'react';

function Button({ children, className = '', variant = 'primary', size = 'md', ...props }) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
