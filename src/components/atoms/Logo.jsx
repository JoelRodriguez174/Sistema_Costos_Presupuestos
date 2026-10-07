import React from 'react';
import { Scissors } from 'lucide-react';

function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <Scissors size={18} />
      </div>
      <div>
        <h1 className="logo-text">CosmetoCosts</h1>
        <p className="logo-tagline">Gestión de Costos Capilares</p>
      </div>
    </div>
  );
}

export default Logo;
